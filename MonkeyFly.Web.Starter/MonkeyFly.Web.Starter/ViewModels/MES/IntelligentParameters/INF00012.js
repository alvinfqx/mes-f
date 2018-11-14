var viewModel = function () {
    var self = this;
    var table = null, PlantID, ExportTotal;

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
        var Code = $("#WarehouseCode").val();
        var Status = $("#Status").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/WarehouseExport?Token=' + token + '&Code=' + Code + '&Status=' + Status;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/WarehouseImport',
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

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.OrganizationID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.WarehouseCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.WarehouseName + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remarks + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.WarehouseName,
                halign: 'center',
                align: 'center',
                width: "150",
                require: true
            },
            {
                field: 'Comments',
                title: fields.Remarks,
                halign: 'center',
                align: 'center',
                width: "150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "5",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //设置厂别表格
    var SiteTable = new mf.Table("#SiteTable", {
        uniqueId: "OrganizationID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionSiteBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#SiteCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetPlantList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 350,
        columns: [
            {
                field: 'Code', title: fields.SiteCode, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'Name', title: fields.SiteDescription, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.normal }, { value: 0, text: fields.invalid }]),
            },
            {
                field: 'Creator', title: fields.CreatePerson, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreateDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastModifyPerson, align: 'center', width: "110",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastModifyDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    //设置倉庫表格
    table = new mf.Table("#WarehouseTable", {
        uniqueId: "OrganizationID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#WarehouseCode").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00012GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Status: Status }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00012Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            var ID = rowData.OrganizationID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentParameter/Inf00012Delete",
                data: JSON.stringify({ OrganizationID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        focusField: "Code",
        focusEditField: "Name",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.WarehouseCode, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WarehouseCodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.WarehouseName, require: true, align: "center", width: "160",
                rander: new mf.TextRander({ size: 15, title: "title", maxLength: 60 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WarehouseNameIsNull)
                ],
            },
            {
                field: 'PlantCode', title: fields.HomeSite, align: "center", width: "150",
                rander: new mf.FKRander("#SiteDialog",
                                         "#SiteDialog #commit",
                                         SiteTable,
                                         new mf.TextRander(
                                             {
                                                 size: 11, readonly: 'readonly'
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "PlantCode", e.data.Code);
                    PlantID = e.data.OrganizationID;
                }
            },
            {
                field: 'ParentOrganizationID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return PlantID;
                })
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center", width: "180",
                rander: new mf.TextRander({ size: 18, title: "title", maxLength: 120 }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.normal }, { value: 0, text: fields.invalid }]),
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

    //弹窗查询
    this.CodeSearch = function () {
        SiteTable.goForwordSafely(function () {
            SiteTable.loadData(null, null, 1);
        }, null);
    };

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

}

var URL = "/MES/IntelligentParameters/INF00012";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00012", "INF00012");

var model = new viewModel();