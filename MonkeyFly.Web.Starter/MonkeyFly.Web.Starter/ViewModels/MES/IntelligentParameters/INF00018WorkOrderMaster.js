var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var statuslist = [{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }];
    var enablelist = [{ value: true, text: fields.yes }, { value: false, text: fields.no }];
    var formData = {
        Code: ko.observable(),
        Status: ko.observable(),
        StatusList: ko.observableArray(statuslist)
    };
    ko.applyBindings(formData);
    var ProcessMasterFlag = true;
    var table = new mf.Table("#INF00018WorkOrderTable", {
        uniqueId: "ParameterID",
        focusField: "Code",
        focusEditField: "IsEnable",
        LastWidth: "130",
        IsSetTableWidth: true,
        height: window.innerHeight - 150,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {

            var ID = rowData.ParameterID;

            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00018OperationDelete",
                data: JSON.stringify({ OperationID: ID }),
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
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();            
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00018GetOperationList',
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
                url: '/MES/api/IntelligentParameter/Inf00018OperationSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        operateColumWidth: "100px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:100px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="ProcessSettingButton" onclick="model.ProcessSettingClick(this)" title="" >' + fields.ProcessSetting + '</button>' + '</td>');
            return $td;
        },
        columns: [
            {
                field: 'Code', title: fields.WorkOrderNo, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WorkOrderNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.WorkOrderDescription, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 60, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WorkOrderDescriptionIsNull)
                ],
            },
             {
                 field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                 rander: new mf.SelectRander(statuslist)
             },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 120, title: true }),
            },
           
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
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
                rander: new mf.TextTimeRander({title:true}),
            }
        ]
    });
    table.loadData();

    //製程設定開窗
    var ProcessSettingCode, ProcessSettingName, ProcessSettingParameterID, ProcessSettingId;
    this.ProcessSettingClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#ProcessSettingDialog', {
            viewModel: function () {
                ProcessSettingCode = row.Code;
                ProcessSettingName = row.Name;
                ProcessSettingId = row.ParameterID;
                ProcessSettingParameterID = row.ParameterID;
                $("#ProcessSettingWorkOrderNo").val(ProcessSettingCode);
                $("#ProcessSettingWorkOrderDescription").val(ProcessSettingName);
                ProcessSettingTable.loadData();
                ProcessSettingChangeTable.loadData();
            }
        });
    };

    var ProcessSettingTable = new mf.Table("#ProcessSettingTable", {
        uniqueId: "id",
        height: 375,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.OperationID = ProcessSettingId;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetNoProcessList",
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
                field: 'id', title: fields.ProcessNo, align: "center", require: true, width: "100",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessNo', title: fields.ProcessNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'EnableProcess', title: fields.EnableProcess, align: "center", require: true, width: "100",
                rander: new mf.SelectRander(enablelist)
                //rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    var ProcessSettingChangeTable = new mf.Table("#ProcessSettingChangeTable", {
        uniqueId: "id",
        height: 375,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedRight"  onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.OperationID = ProcessSettingId;
            //searchData.Code = $("#DetailAddMaintenanceItems").val();
            //searchData.Name = $("#DetailAddMaintenanceDescription").val();
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentParameter/Inf00018GetNoPageProcessList",
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
                field: 'id', title: fields.ProcessNo, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessNo', title: fields.ProcessNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'EnableProcess', title: fields.EnableProcess, align: "center", require: true, width: "100",
                rander: new mf.SelectRander(enablelist)
                //rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
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
    this.ProcessSettingMoveRightClick = function () {

        var $selectedRows = ProcessSettingTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessSettingTable.getRowData($selectedRow);
            ProcessSettingChangeTable.pushRow(rowData);
        });

        ProcessSettingTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;

    };

    //左移
    this.ProcessSettingMoveLeftClick = function () {
        //1.帐号
        var $selectedRows = ProcessSettingChangeTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
            ProcessSettingTable.pushRow(rowData);
        });
        ProcessSettingChangeTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsCheckedRight").prop("checked", false);
        
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.ProcessSettingSaveClick = function () {
        var saveData = {};
        var table_data = ProcessSettingChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.OperationID = ProcessSettingId;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018OperationProcessSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        ProcessSettingChangeTable.loadData();
                        ProcessSettingTable.loadData();
                        $('#ProcessSettingDialog').modal('hide');
                        ProcessMasterFlag = true;
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    };

    this.clearData = function (node) {
        if (ProcessSettingChangeTable.hasChange() || ProcessSettingTable.hasChange() ) {
            msg.warnings(fields.Prompt, fields.IsOrSave,
                function () {
                    setTimeout(function(){self.ProcessSettingSaveClick()},300) 
                   // else if (node == '#WorkCenterDialog') { self.WorkCenterSaveClick() }

                },
                function () { $(node).modal("hide") })
        } else {
            $(node).modal("hide")
        }

        $("#DetailAddMaintenanceItems").val("");
        $("#DetailAddMaintenanceDescription").val("");
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsCheckedRight").prop("checked", false);
        
    };

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

        //if (!table) {
        //    return;
        //}
        //var data = table.getSelectedData();
        //if (!data)
        //    return;

        //var ID = data.EquipmentMaintenanceListID;
        //if (!ID && ID.length <= 0) {
        //    console.error("can't get EquipmentMaintenanceListID from table");
        //    return;
        //}

        //msg.warning(fields.info, fields.IsDelete + data.Code,
        //    function () {
        //        mf.ajax({
        //            type: "post",
        //            url: "/MES/api/EquipmentManagement/Ems00008Delete",
        //            data: JSON.stringify({ EquipmentMaintenanceListID: ID }),
        //            success: function (data) {
        //                if (data.status == "200") {
        //                    msg.success(fields.info, data.msg);
        //                    table.loadData();
        //                }
        //                else {
        //                    msg.error(fields.info, data.msg);
        //                }
        //            }
        //        });
        //    });
    };

    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }
        table.save(null, null, true);
    };

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
            '&nbsp;<label>' + fields.WorkOrderNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.WorkOrderDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Code', title: fields.WorkOrderNo,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.WorkOrderDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00018WorkOrderMaster",
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

            var $trLength = $("#INF00018WorkOrderTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00018OperationExport?Token=' + encodeURIComponent(token);

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
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00018OperationImport',
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

var URL = "/MES/IntelligentParameters/INF00018WorkOrderMaster";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "WorkOrderNo", "WorkOrderDescription", "Remark", "Status", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Normal", "Invalid", "Cancel", "Browse", "Comfirm",
    "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "WorkOrderNoIsNull", "WorkOrderDescriptionIsNull", "ProcessSetting", "ProcessNo", "ProcessDescription", "EnableProcess", "yes", "no", "info", "Select", "NoSelect",
    "IsOrSave"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};