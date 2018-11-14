var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal;

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };
    // 刷新
    this.refreshClick = function () {
        if (!table)
            return;
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
        if (!table)
            return;
        table.addRow();
    }
    // 编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };
    // 删除
    this.deleteClick = function () {
        if (!table)
            return;
        table.deleteRow();
    };
    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.ParameterID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.ReasonGroupCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Description + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Description,
                halign: 'center',
                align: 'center',
                width: "150",
                require: true
            },
            {
                field: 'Comments',
                title: fields.Remark,
                halign: 'center',
                align: 'center',
                width: "150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "20",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var Code = $("#Code").val();
        var Status = $("#Status").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00017GroupExport?Token=' + token + '&Code=' + Code + '&Status=' + Status;
    };
    //导入    
    this.importClick = function () {
        mf.dialog("#inputDialog", {
            viewModel: function () {
                var importSelf = this;
                $("#FileName").text(fields.PleaseSelectFile);
                $("#BtnFile").val("");

                $("#BtnFile").unbind();
                $("#BtnBrowse").unbind();
                $("#addFile").unbind();

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
                $('#addFile').click(function () {

                    var formdata = new FormData();
                    formdata.append("file", document.getElementById('BtnFile').files[0]);
                    formdata.append("Token", window.top.mf.token);

                    $("#addFile").attr("disabled", true);
                    $.ajax({
                        type: 'POST',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00017GroupImport',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            $("#addFile").attr("disabled", false);
                            if (d.status == 200) {
                                msg.success(fields.info, d.msg, function () {
                                    $('#inputDialog').modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.info(fields.info, d.msg);
                            }
                        }
                    });
                })
            }
        });
    };

    //设置表格
    table = new mf.Table("#GroupTable", {
        uniqueId: "ParameterID",
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00017GetGroupList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Status: Status }),
                success: function (data) {
                    ExportTotal = data.total;
                    console.log(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            $("#btn_save").attr("disabled", true);
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00017GroupSave',
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
                url: '/MES/api/IntelligentParameter/Inf00017GroupCodeDeleted',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        focusField: "Code",
        focusEditField: "IsEnable",
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'Code', title: fields.ReasonGroupCode, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 8, maxLength: 20, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonGroupCodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.Description, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 60, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DescriptionIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "170",
                rander: new mf.TextRander({ size: 17, maxLength: 120, title: "title" }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "89.5",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: "title" }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

}

var URL = "/MES/IntelligentParameters/INF00017ReasonGroupCode";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "ReasonGroupCode", "Description", "Remark",  "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", 
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status","NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "ReasonGroupCodeIsNull", "DescriptionIsNull"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};