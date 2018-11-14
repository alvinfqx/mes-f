﻿var model = null;
var viewModel = function () {

    var formData = {
        MaintenanceItem: ko.observable(""),
        MaintenanceDescription: ko.observable(""),
    };
    ko.applyBindings(formData);

    //设备主档
    var table = new mf.Table("#MaintenanceTypeTable", {
        uniqueId: "ParameterID",
        deleteId: "ParameterID",
        isFrozenColumn: true,
        focusField: "Code",
        LastWidth: "130",
        IsSetTableWidth: true,
        focusEditField: "Name",
        height: window.innerHeight - 128,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {

        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            var data = table.getSelectedData();
            if (!data)
                return;

            var ID = data.ParameterID;
            if (!ID && ID.length <= 0) {
                console.error("can't get ParameterID from table");
                return;
            }

            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems00008TypeDelete",
                data: JSON.stringify({ ParameterID: ID }),
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
            searchData.Code = formData.MaintenanceItem();
            searchData.Name = formData.MaintenanceDescription();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/EMS00008GetTypeList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00008TypeSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            //    //rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true })) 可新增不可修改
            //    //rander: new mf.StaticValueRander({ readonly: 'readonly', title: "title" })不可新增修改
                    //rander: new mf.TextRander({ size: 20, maxLength: 30, title: "title" }) 可新增修改
            
            {
                field: 'Code', title: fields.MaintenanceTypes, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 10, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CheckMaintenanceTypesIsNull)
                ]
            },
            {
                field: 'Name', title: fields.MaintenanceDescription, align: "center", require: true, width: "149",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CheckMaintenanceTypesDescriptionIsNull)
                ]
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", require: false, width: "170",
                rander: new mf.TextRander({ size: 16, maxLength: 120, title: "title" })
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", require: false, width: "130",
                rander: new mf.TextTimeRander({ title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", require: false,
                rander: new mf.TextTimeRander({ title: "title" })
            }

        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

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
            window.location.reload();
        }, function () {
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
            '&nbsp;<label>' + fields.MaintenanceTypes + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" readonly="readonly" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.MaintenanceDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" readonly="readonly" style="width: 176px;" value="' + row.Name + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" readonly="readonly" style="width: 176px;" value="' + row.Comments + '" />';

        var columns = [
            {
                field: 'Name', title: fields.MaintenanceDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/EquipmentManagement/EMS00008MaintenanceType",
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

            var $trLength = $("#MaintenanceTypeTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Ems00008TypeExport?Token=' + token;

            if (formData.MaintenanceItem() && formData.MaintenanceItem().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.MaintenanceItem();
            }

            if (formData.MaintenanceDescription() && formData.MaintenanceDescription().length > 0) {
                exportUrl = exportUrl + '&Name=' + formData.MaintenanceDescription();
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
                url: window.top.mf.domain + '/MES/api/ImportFile/Ems00008TypeImport',
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

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Cancel", "Comfirm", "LanguageCode", "IsDefault", "LanguageRepeats",
    "MaintenanceTypes", "MaintenanceTypeDescription", "AttributeFlag", "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "CheckMaintenanceItemsIsNull", "CheckMaintenanceDescriptionIsNull", "CheckAttributeFlagIsNull", "Normal", "Invalid",
    "Prompt", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectLanguage", "PleaseFillLanguageContent", "LanguageRepeats", "CheckMaintenanceTypesDescriptionIsNull", "CheckMaintenanceTypesIsNull", "Browse", "IsDelete", "info", "MaintenanceDescription", "PleaseSelectFile"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};