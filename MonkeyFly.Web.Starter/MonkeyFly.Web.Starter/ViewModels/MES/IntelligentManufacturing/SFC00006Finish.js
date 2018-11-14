var URL = "/MES/IntelligentManufacturing/SFC00006Finish";

var MID = window.top.page_parameters.GetParameters(URL);



var viewModel = function () {
    var self = this;
    var parameters = MID;
    var rowData = parameters.rowData


    $("#TackNo").val(rowData.TaskNo);
    $("#WorkOrderNumber").val(rowData.MoNo);
    $("#WorkCenter").val(rowData.WorkCenterName);
    $("#Part").val(rowData.ItemCode);
    $("#ItemDescription").val(rowData.ItemName);
    $("#ItemSpecification").val(rowData.Specification);
    $("#DispatchAmount").val(rowData.AssignQty);


    //返回
    this.FinishBackClick = function () {
        if (!FinishTable)
            return;
        FinishTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, fields.Isleave);

    };

    //刷新
    this.FinishRefreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Finish", Parameters: parameters });
        window.location.href = "/MES/IntelligentManufacturing/SFC00006Finish";

    }

    // 添加
    this.addClick = function () {
        if (!FinishTable)
            return;

        FinishTable.addRow();
    }
    // 编辑
    this.editClick = function () {
        if (!FinishTable)
            return;

        FinishTable.editRow();
    };
    // 删除
    this.deleteClick = function () {
        if (!FinishTable)
            return;

        FinishTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (!FinishTable)
            return;

        FinishTable.save(null, null, true);
    };




    //完工视窗之任务单号弹窗表格
    var TaskTable = new mf.Table("#TaskTable", {
        uniqueId: "TaskID",
        height: 200,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionTask"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.MoNo, align: "center", require: false, width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.SequenceNo, require: false, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.Version, align: "center", require: false, width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.LotNo, require: false, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.ProcessSequence, require: false, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    })

    //完工按钮
    this.FinishClick = function () {
        mf.dialog("#FinishDialog", {
            viewModel: function () {
                FinishTable.loadData()
                $("#FinishSave").click(function () {
                    if (!FinishTable)
                        return;
                    FinishTable.save(null, null, true)
                })
            }
        })
    };

    //完工视窗表格
    var FinishTable = new mf.Table("#FinishTable", {
        uniqueId: "FinishId",
        height: window.innerHeight - 182,
        operateColumWidth: "260px",
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#FinishPageBar"),

        fn_getData: function (pagination, searchData, success) {
      
            searchData = {};
               mf.ajax({
                   type: 'Get',
                   url: '/MES/api/IntelligentManufacturing/SFC00007GetList',
                   data: ({ page: pagination.page, rows: pagination.rows, TaskDispatchID: rowData.TaskDispatchID }),
                   success: function (data) {
  
                       success(data)
                   }
               });
        },
        fn_saveData: function (saveData, success) { },
        fn_createBtn: function () {
            var $td = $("<td style='text-align:center; width:260px;'> ");
            $td.append('<button id="abnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalNoClick(this)">' + fields.AberrantAmount + '</button>&nbsp;&nbsp;' +
                      '<button id="invalidClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.InvalidClick(this)">' + fields.InvalidWorkHour + '</button>&nbsp;&nbsp;' + '</button>' +
                      '<button id="attributeClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AttributeClick(this)">' + fields.LotsProperty + '</button>&nbsp;&nbsp;' + '</button>' +
                      '<button id="comfirmClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ComfirmClick(this)">' + fields.Comfirm + '</button>&nbsp;&nbsp;' + '</button>' + '</button>');
            return $td;

        },
        columns: [
            {
                field: 'TaskNo', title: fields.FinishNo, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.TaskNo, align: "center", width: "140px",
                rander: new mf.FKRander("#TaskDialog",
                                         "#TaskComfirm",
                                         TaskTable,
                                          new mf.TextRander(
                                           {
                                               size: 12, readonly: 'readonly', title: "title"
                                           }
                                       ),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "Code", e.data.Code);
                    // GroupParameterID = e.data.ProjectID;
                },
            },
            {
                field: 'WorkOrderNumber', title: fields.WorkOrderNumber, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Part', title: fields.Part, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'ItemDescription', title: fields.ItemDescription, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'AuxiliaryUnit', title: fields.AuxiliaryUnit, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'FinProQtyAbleU', title: fields.FinProQtyAbleU, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'FinProQtyAble', title: fields.FinProQtyAble, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'FinQuantity', title: fields.FinQuantity, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'ScrappedQty', title: fields.ScrappedQty, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'DifferenceQty', title: fields.DifferenceQty, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'ReworkQty', title: fields.ReworkQty, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'LaborHour', title: fields.LaborHour, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'InvalidLaborHour', title: fields.InvalidLaborHour, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'MachineHour', title: fields.MachineHour, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'nullMachineHour', title: fields.NullMachineHour, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'Remark', title: fields.Remark, align: "center", width: "120px",
                rander: new mf.TextRander({ size: 14, readonly: false, title: "title" })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'NextProcess', title: fields.NextProcess, align: "center", width: "120px",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
        ]
    })

    FinishTable.loadData()

    //关闭
    this.FinishCloseClick = function () {
        if (!FinishTable)
            return;
        FinishTable.goForword(function () {
            FinishTable.loadData();
            $('#FinishDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#FinishDialog').modal("hide");
        }, fields.Isleave);
    }

    //修改
    this.FinishChangeClick = function () {
        if (!FinishTable) {
            return;
        }
        FinishTable.editRow();
    }

    //异常数量之原因码表格（原因群組主檔）
    var ReasonNoTable = new mf.Table("#ReasonNoTable", {
        uniqueId: "ReasonNoID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionReasonNo"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
            {
                field: 'Code', title: fields.ReasonGroupCode, align: "center", require: true, width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.Description, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "100",
                rander: new mf.HourRander()
            },
        ]
    })

    //关闭
    this.clearReasonClick = function () {
        $("#ReasonCode").val("")
        ReasonNoTable.loadData();
    }


    //异常数量按钮
    this.AbnormalNoClick = function (obj) {
        $Row = $(obj).parents("tr");
        var row = FinishTable.getRowData($Row);

        mf.dialog("#AbnormalDecDialog", {
            viewModel: function () {
                AbnormalNoTable.loadData();
                $("#AbnormalNoSave").click(function () {
                    if (!AbnormalNoTable)
                        return;
                    AbnormalNoTable.save(null, null, true)
                })
            }
        })
        //判断OP状态则隐藏新增、修改、删除、保存按钮
        if (row.Status.substring(5, 18) == "0201213000001") { //OP
            $("#AbnormalNoNew,#AbnormalNoChange,#AbnormalNoDel,#AbnormalNoSave").hide();
        }
        else {
            $("#AbnormalNoNew,#AbnormalNoChange,#AbnormalNoDel,#AbnormalNoSave").show();
        }
    };

    // 异常数量表格
    var AbnormalNoTable = new mf.Table("#AbnormalNoTable", {
        uniqueId: "AbnormalNoID",
        height: "240",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionAbnormalNo"),
        fn_getData: function (pagination, searchData, success) {
            /*   mf.ajax({
                   type: 'get',
                   url: '/MES/api/EquipmentManagement/EMS00003GetList',
                   data: ({ page: pagination.page, rows: pagination.rows }),
                   success: function (data) {
                       success(data)
                   }
               }) */
            success(data);
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: "Type", title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.AutoSelectRander("value", "text", [
                { value: 0, text: fields.ScrappedQty },
                { value: 1, text: fields.DifferenceQty },
                { value: 2, text: fields.ReworkQty }
                ],
                {
                    title: true
                }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "Code", e.data.text);
                    //ClassID = e.data.ClassID;
                },
            },
            {
                field: "ReasonId", title: fields.ReasonCo, align: "center", width: "120", visible: false,
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "ReasonDescription", title: fields.ReasonDescription, align: "center", width: "100",
                rander: new mf.FKRander("#ReasonNoDialog",
                                        "#ReasonNoComfirm",
                                        ReasonNoTable,
                                        new mf.TextRander(
                                            {
                                                size: 11, readonly: 'readonly', title: "title"
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                        }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.ReasonDescription);
                }
            },
            {
                field: "Qty", title: fields.Quantity, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.QuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.QuantityIsMaxInteger, fields.QuantityIsMaxDecimal,
                        fields.QuantityIsNonNegativeNumber, 12, 6)
                ],
            }
        ]
    })

    //关闭
    this.clearAbnormalDecClick = function () {
        if (!AbnormalNoTable)
            return;
        AbnormalNoTable.goForword(function () {
            AbnormalNoTable.loadData();
            $('#AbnormalDecDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#AbnormalDecDialog').modal("hide");
        }, fields.Isleave);
    }

    //新增
    this.AbNoNewClick = function () {
        if (!AbnormalNoTable)
            return;
        AbnormalNoTable.addRow();
    }

    //修改
    this.AbNoChangeClick = function () {
        if (!AbnormalNoTable) {
            return;
        }
        AbnormalNoTable.editRow();
    }

    //删除
    this.AbNoDelClick = function () {
        if (!AbnormalNoTable) {
            return;
        }
        AbnormalNoTable.deleteRow();
    }

    //无效工时之原因码表格（原因群組主檔）
    var InvalidReasonTable = new mf.Table("#InvalidReasonTable", {
        uniqueId: "InvalidReaID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionInvalidReason"),
        fn_getData: function (pagination, searchData, success) {
            /*    mf.ajax({
                    type: 'get',
                    url: '/MES/api/EquipmentManagement/EMS00003GetList',
                    data: ({ page: pagination.page, rows: pagination.rows }),
                    success: function (data) {
                        success(data)
                    }
                })*/
            success(data)
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'Code', title: fields.ReasonGroupCode, align: "center", require: true, width: "90",
                 rander: new mf.StaticValueRander({ title: true }),
             },
            {
                field: 'Name', title: fields.Description, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    })

    //关闭
    this.clearClick = function () {
        $("#InReasonCode").val("");
        InvalidReasonTable.loadData();
    };


    //无效工时按钮
    this.InvalidClick = function (obj) {
        $Row = $(obj).parents("tr");
        var row = FinishTable.getRowData($Row);

        mf.dialog("#InvalidHoursDialog", {
            viewModel: function () {
                InvalidHoursTable.loadData();
                $("#InvalidHoursSave").click(function () {
                    if (!InvalidHoursTable)
                        return;
                    InvalidHoursTable.save(null, null, true)
                })
            }
        })

        //判断OP状态则隐藏新增、修改、删除、保存按钮
        if (row.Status.substring(5, 18) == "0201213000001") {
            $("#InvalidHoursNew,#InvalidHoursChange,#InvalidHoursDel,#InvalidHoursSave").hide();
        } else {
            $("#InvalidHoursNew,#InvalidHoursChange,#InvalidHoursDel,#InvalidHoursSave").show();
        }

    };

    //无效工时表格
    var InvalidHoursTable = new mf.Table("#InvalidHoursTable", {
        uniqueId: "InvalidHoursID",
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionInvalidHours"),
        fn_getData: function (pagination, searchData, success) {
            success(data);
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: "Type", title: fields.ResourceType, align: "center", width: "100",
                 rander: new mf.SelectRander([
                 { value: 0, text: fields.ArtificialL },
                 { value: 1, text: fields.Machine },

                 ])
             },
            {
                field: "ReasonID", title: fields.ReasonCo, align: "center", width: "120", visible: false,
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "ReasonDescription", title: fields.ReasonDescription, align: "center", width: "100",
                rander: new mf.FKRander("#InvalidReasonDialog",
                                        "#InvalidReasonComfirm",
                                        InvalidReasonTable,
                                        new mf.TextRander(
                                            {
                                                size: 11, readonly: 'readonly', title: "title"
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                        }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ReasonID", e.data.ReasonName);
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.ReasonName);
                },
            },
            {
                field: "Code", title: fields.Quantity, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.HourIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.HourIsMaxInteger, fields.HourIsMaxDecimal,
                        fields.HourIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {

                }
            }
        ]
    })

    //关闭
    this.clearInvalidClick = function () {
        if (!InvalidHoursTable)
            return;
        InvalidHoursTable.goForword(function () {
            InvalidHoursTable.loadData();
            $('#InvalidHoursDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#InvalidHoursDialog').modal("hide");
        }, fields.Isleave);
    }

    //新增
    this.InvalidHoursNewClick = function () {
        if (!InvalidHoursTable) return;
        InvalidHoursTable.addRow();
    }

    //修改
    this.InvalidHoursChangeClick = function () {
        if (!InvalidHoursTable) return;
        InvalidHoursTable.editRow()
    }

    //删除
    this.InvalidHoursDelClick = function () {
        if (!InvalidHoursTable) return;
        InvalidHoursTable.deleteRow()
    }



    //批号属性之取号按钮
    this.GetNoClick = function (e) {
        //var row = e.parentNode.parentNode 点击的时候取到该行的节点
        mf.dialog("#GetCodeDialog", {
            viewModel: function () {
                GetNoTable.loadData();
                $("#getCodeComfirm").click(function () {
                    var row = GetNoTable.getSelectedData();
                    if (!row) return;
                    $("#GetCodeDialog").modal("hide")
                })
            }
        })
    }

    //取号表格
    var GetNoTable = new mf.Table("#GetCodeTable", {
        uniqueId: "GetNoID",
        height: 220,
        paginationBar: new mf.PaginationBar("#paginagionGetCode"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: "Code", title: fields.CategoryCode, align: "center", width: "100",
                 rander: new mf.StaticValueRander({ title: true })
             },
            {
                field: "Code", title: fields.CategoryDec, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "Code", title: fields.RunningNo, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "Code", title: fields.CurrentNumber, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true })
            }
        ]
    })

    //资料值表格
    var ResourceDocTable = new mf.Table("#ResourceDocTable", {
        uniqueId: "ResourceDocID",
        height: 200,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResourceDoc"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {

                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'Code', title: fields.MoNo, align: "center", require: false, width: "60",
                 rander: new mf.StaticValueRander({ title: true }),
             },
            {
                field: 'Code', title: fields.SequenceNo, require: false, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.Version, align: "center", require: false, width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.LotNo, require: false, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.ProcessSequence, require: false, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    })



    //批号属性之属性弹窗
    this.AttrClick = function (obj) {
        $Row = $(obj).parents("tr");
        var row = FinishTable.getRowData($Row);
        mf.dialog("#GetAttrDialog", {
            viewModel: function () {
                GetAttrTable.loadData();
                $("#GetAttrSave").click(function () {
                    if (!GetAttrTable) return;
                    GetAttrTable.save(null, null, true)
                })
            }
        });
        if (row.Status.substring(5, 18) != "02012130000011") {
            $("#GetAttrChange,#GetAttrSave").hide();
        } else {
            $("#GetAttrChange,#GetAttrSave").show();
        }
    }

    //属性表格
    var GetAttrTable = new mf.Table("#GetAttrTable", {
        uniqueId: "AttrID",
        height: 220,
        paginationBar: new mf.PaginationBar("#paginagionGetAttr"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: "Code", title: fields.Attributes, align: "center", width: "100",
                 rander: new mf.StaticValueRander({ title: true })
             },
            {
                field: "Code", title: fields.Description, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "Code", title: fields.Datavalue, align: "center", width: "130",
                rander: new mf.FKRander("#ResourceDocDialog",
                                        "#ResourceDocComfirm",
                                        ResourceDocTable,
                                         new mf.TextRander(
                                             {
                                                 size: 11, readonly: 'readonly', title: "title"
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs"
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    //  table.setEditingColumnValue($row, "Code", e.data.Code);
                    //ClassID = e.data.ClassID;
                },

            },
            {
                field: "Code", title: fields.Remark, align: "center", width: "100",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title" })
            }
        ]

    })

    //修改
    this.GetAttrChangeClick = function () {
        if (!GetAttrTable) return;
        GetAttrTable.editRow();
    }



    //批号属性按钮
    this.AttributeClick = function (obj) {

        $Row = $(obj).parents("tr");
        var row = FinishTable.getRowData($Row);
        BatchTable.loadData();
        $("#BatchAttributeDialog").modal("show");

        /*     mf.dialog("#BatchAttributeDialog", {
                 viewModel: function () {
                     
                     $("#BatchSave").click(function () {
                         if (!BatchTable)
                             return;
                         BatchTable.save(null, null, true)
                     })
                 }
             });*/

        //判断OP状态则隐藏新增、修改、删除、保存按钮
        if (row.Status.substring(5, 18) == "0201213000028") {
            // $("#BatchNew,#BatchChange,#BatchDel,#BatchSave").hide();
        } else {
            $("#BatchNew,#BatchChange,#BatchDel,#BatchSave").show();
        }
    }

    //批号属性表格
    var BatchTable = new mf.Table("#BatchTable", {
        uniqueId: "BatchID",
        editable: true,
        height: 200,
        operateColumWidth: "100px",
        paginationBar: new mf.PaginationBar("#paginagionBatch"),
        fn_getData: function (pagination, searchData, success) {
            /*  mf.ajax({
                  type: 'get',
                  url: '/MES/api/EquipmentManagement/EMS00003GetList',
                  data: ({ page: pagination.page, rows: pagination.rows }),
                  success: function (data) {
                      success(data)
                  }
              })*/
            success(data)
        },
        fn_saveData: function (saveData, success) {

        },
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:100px;'> ");
            if (data.LotControl == "Y") {
                // 判断任务单分派资料的“是否依资源报工”字段，当其为Y时显示，N时则不显示
                $td.append('<button class="btn btn-success btn-xs" onclick="model.GetNoClick(this)" title="取號">' + fields.GetNo + '</button>&nbsp;&nbsp;');
                $td.append('<button class="btn btn-success btn-xs" onclick="model.AttrClick(this)" title="屬性" >' + fields.Attributes + '</button>');
            } else {
                $td.append('<button class="btn btn-success btn-xs" onclick="model.GetNoClick(this)" title="取號" disabled="disabled">' + fields.GetNo + '</button>&nbsp;&nbsp;');
                $td.append('<button class="btn btn-success btn-xs" onclick="model.AttrClick(this)" title="屬性" >' + fields.Attributes + '</button>');
            }
            var row = FinishTable.getRowData($Row);

            return $td;
        },
        columns: [

            {
                field: 'CompeletedNo', title: fields.FinishNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'TaskCardNo', title: fields.ResourceType, align: "center", width: "100",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "80",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'LotNo', title: fields.LotNo, align: "center", width: "80",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
            },
            {
                field: "Qty", title: fields.Quantity, align: "center", width: "100",
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.QuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.QuantityIsMaxInteger, fields.QuantityIsMaxDecimal,
                        fields.QuantityIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                }
            },
            {
                field: "Code", title: fields.EffectDate, align: "center", width: "100",
                rander: new mf.DateRander({ autoclose: true }),
            }
        ]
    });

    //保存
    this.BatchSaveClick = function () {
        if (!BatchTable)
            return;
        BatchTable.save(null, null, true)
        //  $("#BatchAttributeDialog").modal("hide");
    }

    //关闭
    this.clearBatchClick = function () {
        if (!BatchTable)
            return;
        BatchTable.goForword(function () {
            BatchTable.loadData();
            $('#BatchAttributeDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#BatchAttributeDialog').modal("hide");
        }, fields.Isleave);
    }

    //新增
    this.BatchNewClick = function () {
        if (!BatchTable) return;
        BatchTable.addRow();
    }

    //修改
    this.BatchChangeClick = function () {
        if (!BatchTable) return;
        BatchTable.editRow()
    }

    //删除
    this.BatchDelClick = function () {
        if (!BatchTable) return;
        BatchTable.deleteRow();
    }

    //确认
    this.ComfirmClick = function () {

    }



}

var arrayWord = ["FinishNo", "TaskNo", "NullMachineHour", "WorkCenterDescription", "MoSeq", "OrderNum", "SequenceNo",
"Version", "LotNo", "ItemNo", "DepartmentDesOrManufacturersDes", "ScrappedQty", "DifferenceQty", "ReworkQty", "AbNoReason",
"Class", "ExceptionDescription", "ArtificialL", "Machine", "GetNo", "Property", "EffectDate", "BatchAttribute", "CategoryCode",
"CategoryDec", "RunningNo", "CurrentNumber", "LotsAutoNumberingMainTable", "Datavalue", "QuantityIsNonNegativeNumber",
"QuantityIsMaxInteger", "QuantityIsMaxDecimal", "QuantityIsNonNegativeNumber", "ResourceType", "ReasonCode", "Search", "WhetherToDelete",
"TaskCardNo", "Back", "Refresh", "Add", "Change", "Deletion", "Save", "Part", "ItemDescription", "ItemSpecification", "AuxiliaryUnit", "FinProQtyAbleU",
"FinProQtyAble", "FinQuantity", "ScrappedQty", "DifferenceQty", "ReworkQty", "LaborHour", "InvalidLaborHour", "MachineHour", "NullMachineHour", "Remark",
"Status", "NextProcess", "WorkOrderNumber", "WorkCenter", "DispatchAmount", "AberrantAmount", "InvalidWorkHour", "LotsProperty", "Comfirm", "Close",
"ReasonDescription", "Quantity", "New", "ReasonGroupCode", "Description", "CreatedBy", "CreatedDate", "TaskDoc", "MoNo", "ProcessSequence", "Attributes"
];


words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};