var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var params = mf.format.getMesParameters('0191213000058,0191213000001,0191213000013,0191213000066');
    var ProcessMasterFlag = true; //判断数据是否有左右移动
    var process_id = null, operation_id = null;
    mf.TableLang = null;
    if (mf.TableLang == null) {
        mf.TableLang = GetField("/Data/options/table", "table");
    }

    lang = mf.TableLang;

    var statuslist = [
        { value: 1, text: fields.Normal },
        { value: 0, text: fields.Invalid }
    ];
    var formData = {
        Code: ko.observable(),
        Status: ko.observable(),
        StatusList: ko.observableArray(statuslist)
    };
    ko.applyBindings(formData);

   //工序主档开窗
    var OperationMasterTable = new mf.Table("#OperationMasterTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionOperationMasterBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#OperationNo").val();
            searchData.typeID = "000016";
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/getParameterList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        height:260,
        columns: [

             {
                 field: 'Code', title: fields.WorkOrderNo, align: "center", width: '200px', require: true,
                 rander: new mf.TextRander({ title: 'title', size: 12 })
             },
             {
                 field: 'Name', title: fields.WorkOrderDescription, width: '250px', align: "center",
                 rander: new mf.TextRander({ title: 'title', size: 15 })
             },
              {
                  field: 'Comments', title: fields.Remark, align: "center", width: "300",
                  rander: new mf.TextRander({ size: 16, maxLength: 120, title: true }),
              },
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    $("#dialog_search").click(function () {
        OperationMasterTable.loadData(null, null, 1);
    });


    ////工序明细表格
    //var DetailTable = new mf.Table("#DetailTable", {
    //    uniqueId: "ProcessOperationID",
    //    editable: true,
    //    dblclick_editable: false,
    //    paginationBar: new mf.PaginationBar("#paginagionDataBar"),
    //    fn_getData: function (pagination, searchData, success) {
    //        if (!searchData)
    //        searchData = {};
    //        searchData.ProcessID = process_id;           
    //        mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/IntelligentParameter/Inf00018ProcessGetOperationList',                
    //            data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
    //            success: function (data) {
                    
    //                success(data);
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success) {
    //        mf.ajax({
    //            type: 'Post',
    //            url: '/MES/api/IntelligentParameter/Inf00018ProcessOperationSave',
    //            data: JSON.stringify(saveData),
    //            success: function (data) {
    //                console.log(data);               
    //                success(data);
    //            }
    //        });
    //    },       
    //    height: 260,
    //    columns: [
    //        {
    //            field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "160", require: true,
    //            rander: new mf.WirteOnceOnlyRander(new mf.FKRander("#OperationDetailDialog",
    //                               "#OperationDetailDialog #OperationComfire",
    //                               OperationMasterTable,
    //                               new mf.TextRander({ readonly: 'readonly', size: 8 }),
    //                               {
    //                                   btnTitle: "",
    //                                   btnClass: "btn btn-success btn-xs",
    //                                   searchID: [{ value: "#OperationNo", text: "" }]
    //                               })),
    //            fn_onEditingChange: function (table, $row, $cell, field, e) {
    //                table.setEditingColumnValue($row, "OperationCode", e.data.Code);
    //                table.setEditingColumnValue($row, "OperationName", e.data.Name);
    //                table.setEditingColumnValue($row, "Comments", e.data.Comments);
    //                operation_id = e.data.ParameterID;

    //            },
    //            checkers: [
    //                       new mf.TextNotEmptyChecker(fields.WorkOrderNoIsNull)
    //            ]
    //        },
    //         //工序流水号
    //       {
    //            field: 'OperationID', title: "", visible: false,
    //            rander: new mf.DynamicValueRander(function () {
    //                      return operation_id;
    //                  })
    //       },
    //         //该条制程流水号
    //       {
    //           field: 'ProcessID', title: "", visible: false,
    //           rander: new mf.DynamicValueRander(function () {
    //               return process_id;
    //           })
    //       },
    //        {
    //            field: 'OperationName', title: fields.WorkOrderDescription, align: "center", width: "180",
    //            rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, maxLength: 60, title: true, readonly: 'readonly' })),

    //        },
    //        {
    //            field: 'Comments', title: fields.Remark, align: "center", width: "200",
    //            rander:new mf.WirteOnceOnlyRander( new mf.TextRander({ size: 14, maxLength: 120, title: "title", readonly: 'readonly' }))
    //        },           
    //        {
    //            field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
    //            rander: new mf.StaticValueRander()
    //        },
    //        {
    //            field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
    //            rander: new mf.TextTimeRander()
    //        },
    //        //{
    //        //    field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
    //        //    rander: new mf.StaticValueRander()

    //        //},
    //        //{
    //        //    field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
    //        //    rander: new mf.TextTimeRander(),
    //        //},
    //        {
    //            field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
    //        }
    //    ]
    //});

    var table = new mf.Table("#INF00018ProcessTable", {
        uniqueId: "ParameterID",
        focusField: "Code",
        focusEditField: "Name",
        isFrozenColumn: true,
        LastWidth: "35",
        IsSetTableWidth: true,
        height: window.innerHeight - 155,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            //var IsDefault = data['IsDefault'];
            //var $DatavalueClickEditingCell = $row.find("#DetailsClick");
            //if (isAdding || !IsDefault) {
            //    $DatavalueClickEditingCell.attr('disabled', true);
            //}
            //else {
            //    $DatavalueClickEditingCell.attr('disabled', false);
            //}
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {

            var ID = rowData.ParameterID;

            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00018ProcessDeleted",
                data: JSON.stringify({ ProcessID: ID }),
                success: function (data) {
                    if (data.status == "200") {
                        msg.success(fields.info, data.msg);
                        table.loadData();
                    }
                    else {
                        msg.error(fields.info, data.msg);
                    }
                }
            });

        },
        operateColumWidth: "200px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:200px;'> "); 
            $td.append('<button class="btn btn-success btn-xs" id="WorkOrderSetting" onclick="model.WorkOrderSettingClick(this)" title="' + fields.WorkOrderSetting + '" >' + fields.WorkOrderSetting + '</button>&nbsp;' +
               '<button class="btn btn-success btn-xs" id="WorkCenter" onclick="model.WorkCenterClick(this)" title="" >' + fields.WorkCenter + '</button>' + '</td>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00018GetProcessList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00018ProcessSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.ProcessDescription, require: true, align: "center", width: "140",
                rander: new mf.TextRander({ size: 12, maxLength: 60, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessDescriptionIsNull)
                ],
            },
             {
                 field: 'IsDefault', title: fields.EnableProcess, align: "center", width: "80",
                 rander: new mf.SelectRander([{ value: false, text: "N" }, { value: true, text: "Y" }])
             },
             {
                 field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                 rander: new mf.SelectRander(statuslist)
             },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: true }),
            },

            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "125",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "125",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ]
    });
    table.loadData();



    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    // 刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });

    };

    // 添加
    this.addClick = function () {
        if (!table) {
            return;
        }
        table.addRow();
    }

    // 编辑
    this.editClick = function () {
        if (!table) {
            return;
        }
        table.editRow();
    };

    // 删除
    this.deleteClick = function () {
        if (!table) {
            return;
        }
        table.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }
        table.save(null, null, true);
    };

    //工序設定開窗
    var WorkOrderSettingCode, WorkOrderSettingName, WorkOrderSettingParameterID;
    this.WorkOrderSettingClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#WorkOrderSettingDialog', {
            viewModel: function () {
                WorkOrderSettingCode = row.Code;
                WorkOrderSettingName = row.Name;
                WorkOrderSettingParameterID = row.ParameterID;
                $('#ProcessNoCondition').val(WorkOrderSettingCode);
                $('#DescriptionCondition').val(WorkOrderSettingName);
                WorkOrderSettingTable.loadData();
                WorkOrderSettingChangeTable.loadData();
            }
        });
    };

    var WorkOrderSettingTable = new mf.Table("#WorkOrderSettingTable", {
        uniqueId: "Id",
        height: 375,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedWorkOrder"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.ProcessID = WorkOrderSettingParameterID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetNoOperationList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [

            {
                field: 'Id', title: fields.WorkOrderNo, align: "center", require: true, width: "100",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkOrderNo', title: fields.WorkOrderNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkOrderDescription', title: fields.WorkOrderDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    var WorkOrderSettingChangeTable = new mf.Table("#WorkOrderSettingChangeTable", {
        uniqueId: "Id",
        height: 375,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedWorkOrderChange"  onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ProcessID = WorkOrderSettingParameterID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetOperationList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Id', title: fields.WorkOrderNo, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkOrderNo', title: fields.WorkOrderNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkOrderDescription', title: fields.WorkOrderDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    //左表格全选check
    this.checkboxClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');

        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
            

        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });

        }
    };

    //右表格全选check
    this.checkboxChangeClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
            
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });
        }
    };

    //右移
    this.WorkOrderSettingMoveRightClick = function () {

        var $selectedRows = WorkOrderSettingTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = WorkOrderSettingTable.getRowData($selectedRow);
            WorkOrderSettingChangeTable.pushRow(rowData);
        });

        WorkOrderSettingTable.deleteMultiSelectedRows();

        $("#IsCheckedWorkOrder").prop("checked", false);
        $("#IsCheckedWorkOrderChange").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;

    };

    //左移
    this.WorkOrderSettingMoveLeftClick = function () {
        //1.帐号
        var $selectedRows = WorkOrderSettingChangeTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = WorkOrderSettingChangeTable.getRowData($selectedRow);
            WorkOrderSettingTable.pushRow(rowData);
        });
        WorkOrderSettingChangeTable.deleteMultiSelectedRows();

        $("#IsCheckedWorkOrder").prop("checked", false);
        $("#IsCheckedWorkOrderChange").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.WorkOrderSettingSaveClick = function () {
        var saveData = {};
        var table_data = WorkOrderSettingChangeTable.getAllRowData();
        for (i = 0; i < table_data.length ; i++) {
            table_data[i].ProcessID = WorkOrderSettingParameterID;
        };
        saveData.data = table_data;
        saveData.ProcessID = WorkOrderSettingParameterID;
        //saveData.EquipmentMaintenanceListID = Id;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018MasterProcessOperationSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                    WorkOrderSettingChangeTable.loadData();
                    WorkOrderSettingTable.loadData();
                    $('#WorkOrderSettingDialog').modal('hide');
                    ProcessMasterFlag = true;
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    };

    //工作中心開窗
    var WorkCenterCode, WorkCenterName, WorkCenterParameterID;
    this.WorkCenterClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#WorkCenterDialog', {
            viewModel: function () {
                WorkCenterCode = row.Code;
                WorkCenterName = row.Name;
                WorkCenterParameterID = row.ParameterID;
                $('#ProgramCodeCondition').val(WorkCenterCode);
                $('#ProgramCodeDescriptionCondition').val(WorkCenterName);
                WorkCenterTable.loadData();
                WorkCenterChangeTable.loadData();
            }
        });
    };

    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "Id",
        height: 400,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedWorkCenter"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.ProcessID = WorkCenterParameterID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetNoWorkCenterProcessList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Id', title: fields.Id, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkCenterNo', title: fields.WorkCenterNo, align: "center", require: true, width: "100", 
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkCenterDescription', title: fields.WorkCenterDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", require: false, width: "100",
                rander: new mf.SelectRander(params.PT0191213000058),
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    var WorkCenterChangeTable = new mf.Table("#WorkCenterChangeTable", {
        uniqueId: "Id",
        height: 400,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedWorkCenterChange"  onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.ProcessID = WorkCenterParameterID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetWorkCenterProcessList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Id', title: fields.Id, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkCenterNo', title: fields.WorkCenterNo, align: "center", require: true, width: "100", 
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'WorkCenterDescription', title: fields.WorkCenterDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", require: false, width: "100",
                rander: new mf.SelectRander(params.PT0191213000058)
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    //左表格全选check
    this.checkboxClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');

        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
            
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });

        }
    };

    //右表格全选check
    this.checkboxChangeClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
            
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });
        }
    };

    //右移
    this.WorkCenterMoveRightClick = function () {

        var $selectedRows = WorkCenterTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = WorkCenterTable.getRowData($selectedRow);
            WorkCenterChangeTable.pushRow(rowData);
        });

        WorkCenterTable.deleteMultiSelectedRows();

        $("#IsCheckedWorkCenterChange").prop("checked", false);
        $("#IsCheckedWorkCenter").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;

    };

    //左移
    this.WorkCenterMoveLeftClick = function () {
        //1.帐号
        var $selectedRows = WorkCenterChangeTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = WorkCenterChangeTable.getRowData($selectedRow);
            WorkCenterTable.pushRow(rowData);
        });
        WorkCenterChangeTable.deleteMultiSelectedRows();

        $("#IsCheckedWorkCenterChange").prop("checked", false);
        $("#IsCheckedWorkCenter").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.WorkCenterSaveClick = function () {
        var saveData = {};
        var table_data = WorkCenterChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.ProcessID = WorkCenterParameterID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018ProcessWorkCenterSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                    WorkCenterChangeTable.loadData();
                    WorkCenterTable.loadData();
                    $('#WorkCenterDialog').modal('hide');
                    });
                    ProcessMasterFlag = true;
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    };

    this.clearData = function (node) {
       // var multiSelectedRowList = $(e).parents(node).find("tbody").find(".multiSelected");
        if (WorkCenterChangeTable.hasChange() || WorkCenterTable.hasChange() ||
            WorkOrderSettingChangeTable.hasChange() || WorkOrderSettingTable.hasChange()) {
            msg.warnings(fields.Prompt, fields.IsOrSave,
                function () {
                    if (node == '#WorkOrderSettingDialog') { setTimeout(function () { self.WorkOrderSettingSaveClick() }, 300); }
                    else if (node == '#WorkCenterDialog') { setTimeout(function () { self.WorkCenterSaveClick() }, 300);}
                    
                },
                function () { $(node).modal("hide") })
        } else {
            $(node).modal("hide")
        }
        $("#DetailAddMaintenanceItems").val("");
        $("#DetailAddMaintenanceDescription").val("");
        $("#IsCheckedWorkCenterChange").prop("checked", false);
        $("#IsCheckedWorkCenter").prop("checked", false);
        $("#IsCheckedWorkOrderChange").prop("checked", false);
        $("#IsCheckedWorkOrder").prop("checked", false);
    };

    //明细
    //this.DetailsClick = function (obj) {
    //    var $tr = $(obj).parent().parent();
    //    var row = table.getRowData($tr);

    //    if (!row) {
    //        msg.info(fields.info, fields.PropertyNumberIsEdit);
    //        return;
    //    }
    //    console.log(row);
    //    mf.dialog('#DetailDialog', {
    //        viewModel: function () {
    //            $("#ProcessNoID").val(row.Code);
    //            $("#ProcessDescriptionID").val(row.Name);
    //            $("#ProcessNoID").attr("title", row.Code);
    //            $("#ProcessDescriptionID").attr("title", row.Name);
    //            process_id = row.ParameterID;
    //            DetailTable.loadData();
    //            //提交数据
    //            $("#DetailComfirm").click(function () {
    //                DetailTable.save(null, null, true);
            
    //            })
    //        }
    //    });
    //};

    //验证明细在编辑状态关系弹窗
    //this.clearDataBtn = function () {
    //    if (!DetailTable) {
    //        return;
    //    }
    //    DetailTable.goForwordSafely(function () {
    //        DetailTable.loadData();
    //        $('#DetailDialog').modal('hide');
    //    }, function () {
    //        DetailTable.loadData();
    //        $('#DetailDialog').modal('hide');
    //    });
       
    //}

    //// 明细添加
    //this.addDataClick = function () {
    //    DetailTable.addRow();
    //}

    //// 明细编辑
    //this.editDataClick = function () {
    //    DetailTable.editRow();
    //};

    //// 明细删除
    //this.deleteDataClick = function () {
    //    DetailTable.deleteRow();
    //};

    //语序
    this.languagesClick = function () {
        if (!table) {
            return;
        }

        var row = table.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
        }

        if (!(row.ParameterID && row.ParameterID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.ProcessNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.ProcessDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Code', title: fields.ProcessNo,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.ProcessDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00018ProcessMaster",
            parentMID: "MID",
            tableID: "20",
            rowID: row.ParameterID,
            rowData: rowData,
            columns: columns,
            arrayWord: arrayWord
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/Util/CNCLanguages", Parameters: parameters });
            window.location.href = '/MES/Util/CNCLanguages';
        }, null);
    };

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#INF00018ProcessTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00018ProcessExport?Token=' + encodeURIComponent(token);

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (typeof (formData.Status()) != "undefined") {
                exportUrl = exportUrl + '&Status=' + formData.Status();
            }

            window.location.href = exportUrl;
        });
    };

    //导入    
    this.importClick = function () {
        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnBrowse").unbind();
        $("#BtnImport").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectFile);
            }
        });
        $("#BtnBrowse").click(function () {
            $("#BtnFile").click();
        });
        $("#BtnImport").click(function () {
            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00018ProcessImport',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            table.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    }
                    else {
                        msg.error(fields.Prompt, ret.msg);
                    }
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };
}

var URL = "/MES/IntelligentParameters/INF00018ProcessMaster";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "ProcessNo", "ProcessDescription", "Remark", "Status", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Normal", "Invalid", "Cancel", "Browse", "Comfirm",
    "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "ProcessNoIsNull", "ProcessDescriptionIsNull", "EnableProcess", "Details", "ProcessAndOperationRelationship",
    "WorkOrderNo", "WorkOrderDescription", "WorkOrderMaster", "WorkOrderNoIsNull", "WorkOrderSetting", "WorkCenter", "AddWorkOrderSetting", "WorkCenterSetting", "WorkCenterNo", "WorkCenterDescription", "InoutMark", "Description", "ProgramCode", "info",
    "NoSelect", "Select", "IsOrSave"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};