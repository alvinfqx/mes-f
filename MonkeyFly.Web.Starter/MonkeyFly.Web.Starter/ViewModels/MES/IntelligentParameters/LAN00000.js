var viewModel = function () {
    var self = this;
    var table = null, ExportTotal;

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

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(tips.info, tips.NoDataExport);
            return;
        }
        var Code = $("#Code").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Lan00000Export?Token=' + token + '&Code=' + Code;
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


                    $.ajax({
                        type: 'POST',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Lan00000Import',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            if (d.status == 200) {
                                msg.success(tips.info, d.msg, function () {
                                    $('#inputDialog').modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.info(tips.info, d.msg);
                            }
                        }
                    });
                })
            }
        });
    };

    //设置語系资料维护表格
    table = new mf.Table("#LanguageTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Lan00000GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Lan00000Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        focusField: "Code",
        focusEditField: "Name",
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'Code', title: fields.Code, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.Name, require: true, align: "center", width: "160",
                rander: new mf.TextRander({ size: 16, title: "title", maxLength: 60 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.NameIsNull)
                ],
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.normal }, { value: 0, text: fields.invalid }]),
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center", width: "169",
                rander: new mf.TextRander({ size: 18, title: "title", maxLength: 120 }),
            },
            {
                field: 'Creator', title: fields.CreatePerson, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreateDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastModifyPerson, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),

            },
            {
                field: 'ModifiedTime', title: fields.LastModifyDate, align: "center",
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

var URL = "/MES/IntelligentParameters/LAN00000";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MES/IntelligentParameters/LAN00000", "LAN00000");

var model = new viewModel();