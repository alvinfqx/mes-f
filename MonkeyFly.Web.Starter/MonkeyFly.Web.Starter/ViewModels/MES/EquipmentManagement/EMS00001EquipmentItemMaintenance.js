var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var IsInit = true;
    var ifCollection = [{ value: "true", text: "Y" }, { value: "false", text: "N" }];
    var formData = {
        Code: ko.observable("")
    };
    ko.applyBindings(formData);

    var EquipmentContentHeight = $(".EquipmentContent").parent().height() - 45;
    var EquipmentProjectContentHeight = $(".EquipmentContent").parent().height() - 106;

    //项目列表
    var ProjectTable = new mf.Table("#ProjectTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionProjectBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ProjectNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetProjectList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ProjectCode, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Description', title: fields.ProjectDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Attribute', title: fields.ProjectAttributes, align: "center", width: "100",
                rander: new mf.SelectRander(parameters.PT0191213000052)
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", 
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            }
        ]
    });
    $("#ProjectSearch").click(function () {
        ProjectTable.loadData(null, null, 1);
    });

    //感知器列表
    var SensorTable = new mf.Table("#SensorTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionSensorBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#SensorNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetSensorList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.SensorNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" }))
            },
            {
                field: 'Name', title: fields.SensorDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'Brand', title: fields.Brand, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 60, title: "title" })
            },
            {
                field: 'Type', title: fields.ModelType, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 60, title: "title" })
            },
            {
                field: 'ManufacturerCode', title: fields.VendorNo, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 60, title: "title" })
            },
            {
                field: 'ManufacturerName', title: fields.VendorDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, readonly: "readonly", title: "title" })
            },
            {
                field: 'MaxAlarmTime', title: fields.MaxAlarmTime, align: "center", width: "100",
                rander: new mf.TextRander({ size: 9, maxLength: 10, title: "title" })
            },
            {
                field: 'MinAlarmTime', title: fields.MinAlarmTime, align: "center", width: "100",
                rander: new mf.TextRander({ size: 9, maxLength: 10, title: "title" })
            }
        ]
    });
    $("#SensorSearch").click(function () {
        SensorTable.loadData(null, null, 1);
    });

    //设备主档
    var EquipmentMasterFileTable = new mf.Table("#EquipmentMasterFileTable", {
        editable: false,
        allowRowClick: true,
        uniqueId: "ID",
        focusField: "Code",
        focusEditField: "Status",
        height: EquipmentContentHeight,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();

            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00001List',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        LastWidth: "180",
        IsSetTableWidth: true,
        fn_saveData: function (saveData, success) { },
        fn_onRowClick: function (row) {
            $("#TextEquipmentCode").val(row.Code);
            $("#TextEquipmentDescription").val(row.Name);
            $("#TextEquipmentRemark").val(row.Comments);
            $("#TextEquipmentCode").attr("title", row.Code);
            $("#TextEquipmentDescription").attr("title", row.Name);
            $("#TextEquipmentRemark").attr("title", row.Comments);

            EquipmentProjectTable.goForwordSafely(
                function () {
                    EquipmentProjectTable.loadData();
                }, function () {
                    EquipmentProjectTable.loadData();
                });
        },
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EquipmentCodeIsNull)
                ]
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: true }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true })),
            }
        ]
    });
    EquipmentMasterFileTable.loadData();

    //设备项目明细列表
    var EquipmentProjectTable = new mf.Table("#EquipmentProjectTable", {
        uniqueId: "EquipmentProjectID",
        deleteId: "EquipmentProjectID",
        focusField: "ProjectDescription",
        focusEditField: "Status",
        height: EquipmentProjectContentHeight,
        paginationBar: new mf.PaginationBar("#paginagionEquipmentProjectBar"),
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            if (!isAdding) {
                var $CollectionWayCell = $row.find("#CollectionWay");
                var $SensorCodeCell = $row.find("#SensorCode");
                
                if (data.IfCollection != null) {
                    $CollectionWayCell.attr('disabled', false);
                    $SensorCodeCell.find("button").attr('disabled', false);
                    if (data.CollectionWay != null) {
                        if (data.CollectionWay.substring(5, data.CollectionWay.length) != "0201213000027") {
                            $SensorCodeCell.find("button").attr('disabled', false);
                        }
                        else {
                            $SensorCodeCell.find("button").attr('disabled', true);
                        }
                    }
                }
                else {
                    $CollectionWayCell.attr('disabled', true);
                    $SensorCodeCell.find("button").attr('disabled', true);
                }
            }
        },
        fn_getData: function (pagination, searchData, success) {
            if (IsInit) {
                success([]);
                return;
            }

            var row = EquipmentMasterFileTable.getSelectedData();
            if (!row) {
                console.log("fn_getData：EquipmentMasterFileTable.getSelectedData is null");
                success([]);
                return;
            }

            searchData = {};
            searchData.EquipmentID = row.EquipmentID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00001GetProjectList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            var row = EquipmentMasterFileTable.getSelectedData();
            if (!row) {
                return;
            }

            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].EquipmentID = row.EquipmentID;
            }
            $("#btn_save").attr("disabled", true);
            mf.ajax({
                type: 'post',
                url: '/MES/api/EquipmentManagement/Ems00001ProjectSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    $("#btn_save").attr("disabled", false);
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00001ProjectDelete',
                data: JSON.stringify({ EquipmentProjectID: rowData.EquipmentProjectID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'ProjectID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProjectCode', title: fields.ProjectCode, align: "center", width: "150", require: true,
                rander: new mf.FKRander(
                    "#ProjectDialog",
                    "#ProjectConfirmBtn",
                    ProjectTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ProjectNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ProjectID", e.data.ProjectID);
                    table.setEditingColumnValue($row, "ProjectCode", e.data.Code);
                    table.setEditingColumnValue($row, "ProjectDescription", e.data.Description);
                    for (var i = 0, length = parameters.PT0191213000052.length; i < length; i++) {
                        if (e.data.Attribute == parameters.PT0191213000052[i].value) {
                            table.setEditingColumnValue($row, "AttributeName", parameters.PT0191213000052[i].text);
                            break;
                        }
                    }
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProjectIsNull)
                ]
            },
            {
                field: 'ProjectDescription', title: fields.ProjectDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'AttributeName', title: fields.ProjectAttributes, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'IfCollection', title: fields.IfCollection, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", ifCollection, { title: true, IsBoolean: true }),
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var $CollectionWayCell = $row.find("#CollectionWay");
                    var $SensorIDCell = $row.find("#SensorID");
                    var $SensorCodeCell = $row.find("#SensorCode");
                    var $SensorNameCell = $row.find("#SensorName");
                    var value = table.getEditingColumnValue($row, 'IfCollection');
                    if (value) {
                        $CollectionWayCell.attr('disabled', false);
                        $SensorCodeCell.find("button").attr('disabled', false);
                    }
                    else {
                        $CollectionWayCell.attr('disabled', true);
                        $SensorCodeCell.find("button").attr('disabled', true);
                        $CollectionWayCell.val("");
                        $SensorIDCell.val("");
                        $SensorCodeCell.find("input").val("");
                        $SensorNameCell.val("");
                    }
                }
            },
            {
                field: 'CollectionWay', title: fields.CollectionWay, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000056,
                    { noSearchSelectedText: "", title: true }),
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var $SensorIDCell = $row.find("#SensorID");
                    var $SensorCodeCell = $row.find("#SensorCode");
                    var $SensorNameCell = $row.find("#SensorName");

                    var value = table.getEditingColumnValue($row, 'CollectionWay');
                    if (value.substring(5, value.length) != "0201213000027") {
                        $SensorCodeCell.find("button").attr('disabled', false);
                    }
                    else {
                        $SensorCodeCell.find("button").attr('disabled', true);
                        $SensorIDCell.val("");
                        $SensorCodeCell.find("input").val("");
                        $SensorNameCell.val("");
                    }
                }
            },
            {
                field: 'SensorID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'SensorCode', title: fields.SensorNo, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#SensorDialog",
                    "#SensorConfirmBtn",
                    SensorTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#SensorNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "SensorID", e.data.SensorID);
                    table.setEditingColumnValue($row, "SensorCode", e.data.Code);
                    table.setEditingColumnValue($row, "SensorName", e.data.Name);
                }
            },
            {
                field: 'SensorName', title: fields.SensorDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'StandardValue', title: fields.StandardValue, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: true }),
                checkers: [
                    new mf.ConfigurableChecker(fields.StandardValueIsIncorrect, function (value, $row) {
                        var attribute = $row.find("#AttributeName").val();
                        if (attribute == "数值型（D）") {
                            if (isNaN(Number(value))) {
                                return true;
                            }
                        }
                        return false;
                    })
                ]
            },
            {
                field: 'MaxValue', title: fields.MaxValue, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: true }),
                checkers: [
                    new mf.ConfigurableChecker(fields.MaxValueIsIncorrect, function (value, $row) {
                        var attribute = $row.find("#AttributeName").val();
                        if (attribute == "数值型（D）") {
                            if (isNaN(Number(value))) {
                                return true;
                            }
                        }
                        return false;
                    })
                ]
            },
            {
                field: 'MinValue', title: fields.MinValue, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: true }),
                checkers: [
                    new mf.ConfigurableChecker(fields.MinValueIsIncorrect, function (value, $row) {
                        var attribute = $row.find("#AttributeName").val();
                        if (attribute == "数值型（D）") {
                            if (isNaN(Number(value))) {
                                return true;
                            }
                        }
                        return false;
                    })
                ]
            },
            {
                field: 'MaxAlarmValue', title: fields.MaxAlarmValue, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: true }),
            },
            {
                field: 'MinAlarmValue', title: fields.MinAlarmValue, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: true }),
            },
            {
                field: 'MaxAlarmTime', title: fields.MaxAlarmTime, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, maxLength: 20, title: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.MaxAlarmTimeIsIncorrect)
                ]
            },
            {
                field: 'MinAlarmTime', title: fields.MinAlarmTime, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, maxLength: 20, title: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.MinAlarmTimeIsIncorrect)
                ]
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, maxLength: 120, title: true })),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: "title" }),
            }
        ]
    });
    EquipmentProjectTable.loadData();

    //查询
    this.searchClick = function () {
        EquipmentProjectTable.goForwordSafely(function () {
            EquipmentMasterFileTable.loadData();
            EquipmentProjectTable.clean();
        }, function () {
            EquipmentMasterFileTable.loadData();
            EquipmentProjectTable.clean();
        });
    };

    // 刷新
    this.refreshClick = function () {
        EquipmentProjectTable.goForword(function () {
            window.location.reload();
        }, function () {
            window.location.reload();
        });
    };

    // 添加
    this.addClick = function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        EquipmentProjectTable.addRow();
    }

    // 编辑
    this.editClick = function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        EquipmentProjectTable.editRow();
    };

    // 删除
    this.deleteClick = function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        EquipmentProjectTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        EquipmentProjectTable.save(null, null, true);
    };

    //导出
    this.exportClick = function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
        }

        EquipmentProjectTable.loadDataBack(null, function () {

            var $trLength = $("#EquipmentProjectTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Ems00001ProjectExport?Token=' +
                            token + '&EquipmentID=' + row.EquipmentID;
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
            if (!(document.getElementById('BtnFile').files[0])) {
                msg.info(fields.info, fields.PleaseSelectFile)
                return;
            }
            $("#BtnImport").attr("disabled", true);
            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Ems00001ProjectImportV1',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (d) {
                    $("#BtnImport").attr("disabled", false);
                    if (d.Isreason) {
                        msg.infoCall(fields.info, d.msg, function () {
                            window.location.href = mf.domain + '/MES/api/Util/ImportDownload?Token=' + token + '&Name=' + d.FileName;
                            $('#ImportDialog').modal('hide');
                            EquipmentMasterFileTable.loadData();
                        });
                    }
                    else {
                        msg.success(fields.info, d.msg, function () {
                            $('#ImportDialog').modal('hide');
                            EquipmentMasterFileTable.loadData();
                        });
                    }
                    //if (ret.status == 200) {
                    //    msg.success(fields.Prompt, ret.msg, function () {
                    //        EquipmentMasterFileTable.loadDataBack(null, function () {
                    //            EquipmentProjectTable.clean();
                    //            $('#ImportDialog').modal('hide');
                    //        });
                    //    });
                    //}
                    //else {
                    //    msg.error(fields.Prompt, ret.msg);
                    //}
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };

    IsInit = false;
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Normal", "Invalid", "Cancel", "Browse", "Comfirm", "LanguageCode", "IsDefault",
    "PleaseSelectLanguage", "PleaseFillLanguageContent", "LanguageRepeats", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "EquipmentCode", "EquipmentDescription", "ProjectCode", "ProjectDescription", "ProjectAttributes",
    "SensorNo", "SensorDescription", "IfCollection", "CollectionWay", "StandardValue", "MaxValue", "MinValue",
    "MaxAlarmTime", "MinAlarmTime", "ProjectIsNull", "ProjectInformation", "Brand", "ModelType", "VendorNo",
    "VendorDescription", "SensorInformation", "StandardValueIsIncorrect", "MaxValueIsIncorrect", "MinValueIsIncorrect",
    "MaxAlarmTimeIsIncorrect", "MinAlarmTimeIsIncorrect", "MaxAlarmValue", "MinAlarmValue", "info"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000013,0191213000052,0191213000055,0191213000056" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};