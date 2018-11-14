var viewModel = function () {
    var self = this, ClassID, EquipmentID;
    var NowDate = mf.format.Date(new Date());
    var Namearry = [], NamearryOne = [], NamearryTwo = [];
    var Aqty = 0, Astatus;
    var showData;
    var prowData = parameters.rowData;
    if (prowData.FabMoOperationID === null) {
        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentManufacturing/Sfc00004GetFabMoProcess',
            data: ({ FabMoProcessID: prowData.FabMoProcessID }),
            success: function (data) {
                showData = data;
                var Num = Number(showData.AssignQuantity) + Number(showData.NAAssignQuantity);
                $("#TaskMoNo").val(showData.MoNo);
                $("#TaskProductCode").val(showData.ItemCode);
                $("#TaskQty").val(showData.Quantity);
                $("#TaskAssignedAmount").val(showData.TaskAssignQuantity);
                $("#TaskProcessNo").val(showData.ProcessCode);
                $("#TaskOperation").val(showData.OperationCode);
                $("#PreTransferQty").val(showData.PreProQuantity);
                $("#OrderQuantity").val(showData.OrderQuantity);
                $("#CumulativeCompletion").val(showData.FinProQuantity);
                $("#DifferenceQty").val(showData.TaskDiffQuantity);
                $("#TaskMoNo").attr("title", showData.MoNo);
                $("#TaskProductCode").attr("title", showData.ItemCode);
                $("#TaskQty").attr("title", showData.Quantity);
                $("#TaskAssignedAmount").attr("title", showData.TaskAssignQuantity);
                $("#TaskProcessNo").attr("title", showData.ProcessCode);
                $("#TaskOperation").attr("title", showData.OperationCode);
                $("#PreTransferQty").attr("title", showData.PreProQuantity);
                $("#OrderQuantity").attr("title", showData.OrderQuantity);
                $("#CumulativeCompletion").attr("title", showData.FinProQuantity);
                $("#DifferenceQty").attr("title", showData.TaskDiffQuantity);
            }
        });
    }
    else {
        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentManufacturing/Sfc00004GetFabMoOperation',
            data: ({ FabMoOperationID: prowData.FabMoOperationID }),
            success: function (data) {
                //alert(JSON.stringify(data));
                showData = data;
                $("#TaskMoNo").val(showData.MoNo);
                $("#TaskProductCode").val(showData.ItemCode);
                $("#TaskQty").val(showData.Quantity);
                $("#TaskAssignedAmount").val(showData.TaskAssignQuantity);
                $("#TaskProcessNo").val(showData.ProcessCode);
                $("#TaskOperation").val(showData.OperationCode);
                $("#PreTransferQty").val(showData.PreProQuantity);
                $("#OrderQuantity").val(showData.OrderQuantity);
                $("#CumulativeCompletion").val(showData.FinProQuantity);
                $("#DifferenceQty").val(showData.TaskDiffQuantity);
                $("#TaskMoNo").attr("title", showData.MoNo);
                $("#TaskProductCode").attr("title", showData.ItemCode);
                $("#TaskQty").attr("title", showData.Quantity);
                $("#TaskAssignedAmount").attr("title", showData.TaskAssignQuantity);
                $("#TaskProcessNo").attr("title", showData.ProcessCode);
                $("#TaskOperation").attr("title", showData.OperationCode);
                $("#PreTransferQty").attr("title", showData.PreProQuantity);
                $("#OrderQuantity").attr("title", showData.OrderQuantity);
                $("#CumulativeCompletion").attr("title", showData.FinProQuantity);
                $("#DifferenceQty").attr("title", showData.TaskDiffQuantity);
            }
        });
    }


    //设置状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000005" },
        success: function (data) {
            var Listdata = data.PT0191213000005;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
            }

            for (var j = 0, i = 0; i < Listdata.length; i++) {
                if (Listdata[i].value.substring(5, Listdata[i].value.length) == "0201213000087" || Listdata[i].value.substring(5, Listdata[i].value.length) == "020121300008C") {
                    NamearryOne[j] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                    j++;
                }
            }
            for (var k = 0, i = 0; i < Listdata.length; i++) {
                if (Listdata[i].value.substring(5, Listdata[i].value.length) == "0201213000088" || Listdata[i].value.substring(5, Listdata[i].value.length) == "020121300008B" || Listdata[i].value.substring(5, Listdata[i].value.length) == "020121300008C") {
                    NamearryTwo[k] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                    k++;
                }
            }
        }
    });

    // 返回
    this.backClick = function () {
        if (!table)
            return;
        if (table.SaveOrNotStatus()) {
            msg.warning(fields.info,
                    fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
                        window.location.href = parameters.parentUrl;
                    }, function () {
                        // 取消查询
                    });
        }
        else {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }
        //table.goForword(function () {
        //    window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
        //    window.location.href = parameters.parentUrl;
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
        //    window.location.href = parameters.parentUrl;
        //}, fields.Isleave);
    }
    // 刷新
    this.refreshClick = function () {
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004TaskAssignment", Parameters: parameters });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004TaskAssignment';
        }, function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004TaskAssignment", Parameters: parameters });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004TaskAssignment';
        });
    };
    // 添加
    this.addClick = function () {
        if (!table)
            return;
        var SequenceNum;

        table.addRow();

        var $tr = $("#TaskAssignTable").find("tr");
        var $lasttr = $tr.eq($tr.length - 2);
        var data = $lasttr.find("td").eq(0).text();
        var TaskNoNum = $lasttr.find("td").eq(3).text();
        data = parseInt(data);
        if (TaskNoNum != "") {
            data = data + 1;
        }
        else {
            data = 1;
        }      
        if (prowData.FabMoOperationID != null) {
            SequenceNum = prowData.MoNo + "-" + prowData.SplitSequence + "-" + prowData.ProcessSequence +
            "-" + prowData.ProcessCode + "-" + prowData.OperationSequence + "-" + prowData.OperationCode + "-" + data;
        }
        else {            
            SequenceNum = prowData.MoNo + "-" + prowData.SplitSequence + "-" + prowData.ProcessSequence +
            "-" + prowData.ProcessCode + "-" + data;
        }
        $tr.eq($tr.length - 1).find("td").eq(3).find("input").val(SequenceNum);

    }
    // 编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };
    //保存
    this.comfirmClick = function () {
        if (!table)
            return;

        table.save(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004TaskAssignment", Parameters: parameters });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004TaskAssignment';
        }, null, true);
    };

    //項目設定显示
    this.ItemSetClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = DetailTable.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        DetailTable.goForword(function () {
            ItemSetTable.loadData();
            $('#ItemSetDialog').modal("show");
        }, null, fields.Isleave);

    };
    //項目設定关闭
    this.ClearItemSettableClick = function () {
        if (!ItemSetTable)
            return;
        ItemSetTable.goForword(function () {
            ItemSetTable.loadData();
            $('#ItemSetDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004TaskAssignment", Parameters: parameters });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004TaskAssignment';
            $('#ItemSetDialog').modal("hide");
        }, fields.Isleave);
    };
    //項目設定添加
    this.AddItemSetClick = function () {
        if (!ItemSetTable)
            return;
        ItemSetTable.addRow();
        $("#ItemSetTable #Code input").focus();
    }
    //項目設定编辑
    this.ChangeItemSetClick = function () {
        if (!ItemSetTable)
            return;
        ItemSetTable.editRow();
    };
    //項目設定删除
    this.DeleteItemSetClick = function () {
        if (!ItemSetTable)
            return;
        ItemSetTable.deleteRow();
    };
    //項目設定保存
    this.SaveItemSetClick = function () {
        if (!ItemSetTable)
            return;
        ItemSetTable.save(null, null, true);
    };

    //列印
    this.PrintClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        var parameter = {
            parentUrl: URL,
            parentMID: MID,
            Parameters: parameters,
            TaskDispatchID: row.TaskDispatchID
        };

        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004Print", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004Print';
        }, null, fields.Isleave);

    };


    //資源明細显示
    this.SourceDetail = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        var parameter = {
            parentUrl: URL,
            parentMID: MID,
            Parameters: parameters,
            rowData: row
        }; 

        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004Resources", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004Resources';
        }, function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004Resources", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004Resources';
        }, fields.Isleave);

    };

    //班别弹窗查询
    this.ShiftNoSearch = function () {
        ShiftTable.goForwordSafely(function () {
            ShiftTable.loadData(null, null, 1);
        }, null);
    };

    //设置班别弹窗列表
    var ShiftTable = new mf.Table("#ShiftTable", {
        uniqueId: "ClassID",
        editable: false,
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionShiftBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ShiftCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/GetSYSClassList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {

                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 250,
        columns: [
           {
               field: 'Code', title: fields.ShiftNo, align: "center", width: "100",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Name', title: fields.ShiftDescription, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Comments', title: fields.Remark, align: "center", width: "130",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Status', title: fields.Status, align: "center",
               rander: new mf.StaticValueRander({ title: true }),

           }
        ]

    });

    //设置表格
    var table = new mf.Table("#TaskAssignTable", {
        uniqueId: "TaskDispatchID",
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_onTableEnterPress: function () {
            var $tr = $("#TaskAssignTable").find("tr");
            var $lasttr = $tr.eq($tr.length - 2);
            var data = $lasttr.find("td").eq(0).text();
            var TaskNoNum = $lasttr.find("td").eq(3).text();
            data = parseInt(data);
            if (TaskNoNum != "") {
                data = data + 1;
            }
            else {
                data = 1;
            }
            if (prowData.FabMoOperationID != null) {
                SequenceNum = prowData.MoNo + "-" + prowData.SplitSequence + "-" + prowData.ProcessSequence +
                "-" + prowData.ProcessCode + "-" + prowData.OperationSequence + "-" + prowData.OperationCode + "-" + data;
            }
            else {
                SequenceNum = prowData.MoNo + "-" + prowData.SplitSequence + "-" + prowData.ProcessSequence +
                "-" + prowData.ProcessCode + "-" + data;
            }
            $tr.eq($tr.length - 1).find("td").eq(3).find("input").val(SequenceNum);
            
        },
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00004GetDispatchList',
                data: ({ page: pagination.page, rows: pagination.rows, FabMoOperationID: prowData.FabMoOperationID, FabMoProcessID: prowData.FabMoProcessID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].FabMoProcessID = prowData.FabMoProcessID;
                saveData.inserted[i].FabMoOperationID = prowData.FabMoOperationID;
                saveData.inserted[i].FabricatedMotherID = prowData.FabricatedMotherID;
                saveData.inserted[i].ItemID = prowData.ItemID;
                saveData.inserted[i].OperationID = prowData.OperationID;
                saveData.inserted[i].ProcessID = prowData.ProcessID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00004Save',
                data: JSON.stringify(saveData),
                //beforeSend: function () {
                //    // 禁用按钮防止重复提交
                //    $("#btn_comfirm").attr("disabled", true);
                //},
                success: function (data) {
                    success(data);
                }
                //complete: function () {
                //    $("#btn_comfirm").removeAttr("disabled");
                //}
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var CreateTime = data['CreateTime'];
            Aqty = data['DispatchQuantity'];
            Astatus = data['Status'];
            var Status = data['Status'];
            var $IsEnableEditingCell = $row.find("#IsDispatch");
            var $StatusEditingCell = $row.find("#Status");
            var $SourceDetailEditingCell = $row.find("#SourceDetail");
            var $PrintEditingCell = $row.find("#Print");

            var $CommentsEditingCell = $row.find("#Comments");
            var $StartDateEditingCell = $row.find("#StartDate");
            var $FinishDateEditingCell = $row.find("#FinishDate");
            var $DispatchQuantityEditingCell = $row.find("#DispatchQuantity");
            var $ShiftCodebuttonEditingCell = $row.find("#ClassCode button");

            if (isAdding) {
                $IsEnableEditingCell.attr('disabled', true);
                $StatusEditingCell.attr('disabled', true);
                $SourceDetailEditingCell.attr('disabled', true);
                $PrintEditingCell.attr('disabled', true);
            }
            else {
                if (CreateTime == "") {
                    $IsEnableEditingCell.attr('disabled', true);
                    $StatusEditingCell.attr('disabled', true);
                    $SourceDetailEditingCell.attr('disabled', true);
                    $PrintEditingCell.attr('disabled', true);              
                }
                else {
                    if (Status.substring(5, Status.length) == "0201213000087") {
                        $IsEnableEditingCell.attr('disabled', false);
                    }
                    else {
                        $IsEnableEditingCell.attr('disabled', true);
                    }
                    if (Status.substring(5, Status.length) == "0201213000087" || Status.substring(5, Status.length) == "0201213000088" || Status.substring(5, Status.length) == "020121300008B") {
                        $StatusEditingCell.attr('disabled', false);
                    }
                    else {
                        $StatusEditingCell.attr('disabled', true);
                    }
                    
                    $SourceDetailEditingCell.attr('disabled', false);
                    $PrintEditingCell.attr('disabled', false);
                }
                //if (Status.substring(5, Status.length) != "0201213000089") {
                //    $DispatchQuantityEditingCell.attr('disabled', false);                   
                //}
                //else {
                //    $DispatchQuantityEditingCell.attr('disabled', true);
                //}
                if (Status.substring(5, Status.length) != "0201213000088" && Status.substring(5, Status.length) != "0201213000089") {
                    $CommentsEditingCell.attr('disabled', false);
                    $StartDateEditingCell.attr('disabled', false);
                    $FinishDateEditingCell.attr('disabled', false);
                    $DispatchQuantityEditingCell.attr('disabled', false);
                    //$ShiftCodebuttonEditingCell.attr('disabled', true);                    
                }
                else {
                    $CommentsEditingCell.attr('disabled', true);
                    $StartDateEditingCell.attr('disabled', true);
                    $FinishDateEditingCell.attr('disabled', true);
                    $DispatchQuantityEditingCell.attr('disabled', true);
                    //$ShiftCodebuttonEditingCell.attr('disabled', false);
                }
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 检查开工日期和完工日期
            var StartDate = table.getEditingColumnValue($row, "StartDate");
            var FinishDate = table.getEditingColumnValue($row, "FinishDate");
            var dateStart = new Date(Date.parse(StartDate));
            var dateEnd = new Date(Date.parse(FinishDate));
            if (dateStart > dateEnd)
                return fields.StartDateMoreFinishDate;

            return null;
        },
        fn_checkeditable: function ($selectedRow) {
            var row = table.getRowData($selectedRow);
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == row.Status) {
                    Statustext = Namearry[i].text;
                }
            }
            if (row.Status.substring(5, row.Status.length) == "020121300008B" || row.Status.substring(5, row.Status.length) == "020121300008C") {
                msg.info(fields.info, row.TaskNo + fields.StatusIs + Statustext + fields.Isnotedit);
                return true;
            }
            else {
                return false;
            }
        },
        isFrozenColumn: true,
        operateColumWidth: "142px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:142px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="SourceDetail" onclick="model.SourceDetail(this)" title="資源明細" >' + fields.SourceDetail + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="Print" onclick="model.PrintClick(this)" title="列印" >' + fields.Print + '</button>');
            return $td;
        },
        height: window.innerHeight - 182,
        focusField: "Comments",
        focusEditField: "IsEnable",
        columns: [
            {
                field: 'IsDispatch', title: fields.Dispatch, align: "center", width: "60",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    if ($cell.prop("checked")) {
                        msg.warningOne(fields.info, fields.IsDispatch, function () {
                            table.setEditingColumnValue($row, "IsDispatch", true);
                        }, function () {
                            table.setEditingColumnValue($row, "IsDispatch", false);
                        })
                    }
                },
                defaultValue: false,
            },
            {
                field: 'TaskNo', title: fields.TaskCardNo, align: "center", width: "250",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 30, maxLength: 120, title: "title", readonly: "readonly" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, maxLength: 120, title: "title" }),
            },
            {
                field: 'StartDate', title: fields.StartWorkD, align: "center", width: "110",
                rander: new mf.DateRander(),
                defaultValue: NowDate,
            },
            {
                field: 'FinishDate', title: fields.EndWorkD, align: "center", width: "110",
                rander: new mf.DateRander(),
                defaultValue: NowDate,
            },
            {
                field: 'DispatchQuantity', title: fields.DispatchAmount, require: true, align: "center", width: "110",
                rander: new mf.TextRander({ size: 6, maxLength: 20, title: "title", event: "input",eventName:"oninputnum(this)" }),
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData, isAdding) {
                    var DispatchQuantity = table.getEditingColumnValue($row, 'DispatchQuantity');
                    var index = $row.data("index");
                    var rowdata = rowsData[index];
                    var TaskDispatchID = rowdata.TaskDispatchID;
                    var $DispatchQuantityEditingCell = $row.find("#DispatchQuantity");
                    if (!isAdding) {
                        if (!(isNaN(DispatchQuantity))) {
                            mf.ajax({
                                type: 'Get',
                                url: '/MES/api/IntelligentManufacturing/Sfc00004CheckDispatchQuantityV1',
                                data: ({ DispatchQuantity: DispatchQuantity, FabMoProcessID: prowData.FabMoProcessID, FabMoOperationID: prowData.FabMoOperationID, TaskDispatchID: TaskDispatchID }),
                                success: function (data) {
                                    if (data != "OK") {
                                        msg.infoCall(fields.info, data, function () {
                                            table.setEditingColumnValue($row, "DispatchQuantity", Aqty);
                                            $DispatchQuantityEditingCell.focus();
                                        });
                                    }
                                }
                            });
                        }
                    }
                    else {
                        if (!(isNaN(DispatchQuantity))) {
                            mf.ajax({
                                type: 'Get',
                                url: '/MES/api/IntelligentManufacturing/Sfc00004CheckDispatchQuantityV1',
                                data: ({ DispatchQuantity: DispatchQuantity, FabMoProcessID: prowData.FabMoProcessID, FabMoOperationID: prowData.FabMoOperationID, TaskDispatchID: null }),
                                success: function (data) {
                                    if (data != "OK") {
                                        msg.infoCall(fields.info, data, function () {
                                            table.setEditingColumnValue($row, "DispatchQuantity", Aqty);
                                            $DispatchQuantityEditingCell.focus();
                                        });
                                    }
                                }
                            });
                        }
                    }
                    
                    
                                      
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.QuantityDispatchIsNull),
                    new mf.IsOverDecimalChecker(fields.AssignQtyIsMaxInteger, fields.AssignQtyIsMaxDecimal, fields.AssignQtyIsTrue, 12, 6)
                ],
            },
            {
                field: 'FinishQuantity', title: fields.FinProQty, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ClassCode', title: fields.Shift, align: "center", width: "145",
                rander: new mf.FKRander("#ShiftDialog",
                                         "#ShifCommit",
                                         ShiftTable,
                                         new mf.TextRander(
                                             {
                                                 size: 9, readonly: 'readonly', title: "title"
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassCode", e.data.Code);
                    table.setEditingColumnValue($row, "ClassID", e.data.ClassID);
                }
            },
            //班别流水号
            {
                field: 'ClassID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "110",
                rander: new mf.AutoSelectRander(
                    "value", "text", Namearry,
                    {
                        title: true,
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            if (value.substring(5, value.length) == "0201213000087") {
                                list = NamearryOne;
                            }
                            else if (value.substring(5, value.length) == "0201213000088") {
                                list = NamearryTwo;
                            }
                            else {
                                list = Namearry;
                            }
                            return list;
                        }
                    }),
                 fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                     var Status = table.getEditingColumnValue($row, 'Status');
                     if (Status.substring(5, Status.length) == "020121300008C") {
                         mf.ajax({
                             type: 'Get',
                             url: '/MES/api/IntelligentManufacturing/Sfc00004CheckStatus',
                             data: ({ FabMoProcessID: prowData.FabMoProcessID, FabMoOperationID: prowData.FabMoOperationID }),
                             success: function (data) {
                                 if (!data) {
                                     msg.infoCall(fields.info, fields.ReportIrrevocable, function () {
                                         table.setEditingColumnValue($row, "Status", Astatus);
                                     });
                                 }
                             }
                         });
                     }                    
                 },
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            },
            //制程流水号
            {
                field: 'FabMoProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            //工序流水号
            {
                field: 'FabMoOperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            //制令流水号
            {
                field: 'FabricatedMotherID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            //项目流水号
            {
                field: 'ItemID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            //工序流水号
            {
                field: 'OperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            //制程流水号
            {
                field: 'ProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

}

var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00004TaskAssignment");

var URL = "/MES/IntelligentManufacturing/SFC00004TaskAssignment";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "TaskAssignment", "MoNo", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Version",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "SequenceNo", "LotNo", "ProcessSequence",
    "ProcessNo", "ProcessDescription", "ProcessSerialNo", "WorkOrderNo", "WorkOrderDescription", "ProcessReport",
    "WorkCenter", "CenterDescription", "InoutMark", "Part", "Quantity", "DepartmentNoOrManufacturersNo", "StartWorkD",
    "EndWorkD", "PropertyNumberIsEdit", "AssignedAmount", "Qty", "TaskProductCode", "ProductCode", "Operation",
    "AssignedAmount", "Comfirm", "Shift", "DispatchAmount", "Dispatch", "TaskCardNo", "Add", "Isleave", "SourceDetail",
    "Print", "ShiftMasterFile", "ShiftNo", "ShiftDescription", "ItemSet", "EquipmentCode", "EquipmentDescription","info",
    "MainResource", "SourceClass", "MechanicalCondition", "SourceCode", "SourceDescription", "Resource", "BeginEquipmentCode",
    "EndEquipmentCode", "EquipmentCodeIsNull", "WorkCenterNo", "WorkCenterDescription", "ProjectCode", "ProjectDescription",
    "ProjectInformation", "ProjectIsNull", "yes", "no", "IfCollection", "CollectionWay", "SensorNo", "StandardValue", "MaxValue",
    "MinValue", "Isrecorded", "IsDispatch", "AssignQtyIsTrue", "AssignQtyIsMaxDecimal", "AssignQtyIsMaxInteger", "QuantityDispatchIsNull",
    "ResourcesIsNull", "OutOfAssignQty", "StatusIs", "Isnotedit", "StartDateMoreFinishDate", "ReportIrrevocable", "SaveOrNot",
    "OrderQuantity", "PreTransferQty", "FinProQty", "CumulativeCompletion", "DifferenceQty"
];

words = arrayWord.join();

var model = null;


function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};