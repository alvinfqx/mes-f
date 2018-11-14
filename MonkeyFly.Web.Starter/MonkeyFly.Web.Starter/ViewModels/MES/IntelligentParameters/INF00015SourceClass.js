var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var statuslist = [{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }];
    var formData = {
        Code: ko.observable(""),
        Status: ko.observable(""),
        StatusList: ko.observableArray(statuslist)
    };
    ko.applyBindings(formData);

    var table = new mf.Table("#INF00015Table", {
        uniqueId: "ParameterID",
        deleteId: "ParameterID",
        focusField: "Code",
        focusEditField: "IsEnable",
        height: window.innerHeight - 130,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00015GetClassList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            $("#btn_save").attr("disabled", true);
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00015ClassSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    $("#btn_save").attr("disabled", false);
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00015ClassDelete',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        columns: [
            {
                field: 'Code', title: fields.SourceClassNumber, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceClassNumberIsNull)
                ],
            },
            {
                field: 'Name', title: fields.SourceClassDescription, require: true, align: "center", width: "154",
                rander: new mf.TextRander({ size: 14, maxLength: 60, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceClassDescriptionIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "175",
                rander: new mf.TextRander({ size: 17, maxLength: 120, title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(statuslist),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
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
            '&nbsp;<label>' + fields.SourceClassNumber + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.SourceClassDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Code', title: fields.SourceClassNumber,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.SourceClassDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00015SourceClass",
            parentMID: "MID",
            tableID: "32",
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

            var $trLength = $("#INF00015Table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00015ClassExport?Token=' + token;

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (formData.Status() && formData.Status().length > 0) {
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
            $("#BtnImport").attr("disabled", true);
            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00015ClassImport',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    $("#BtnImport").attr("disabled", false);
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
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "SourceClassNumber", "SourceClassDescription", "Remark", "Status", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Normal", "Invalid", "Cancel", "Browse", "Comfirm",
    "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "SourceClassNumberIsNull", "SourceClassDescriptionIsNull"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};