var viewModel = function () {
    var self = this;
    var table = null, ExportTotal, MESUserID, ClassOne, ClassTwo;
    var Namearry = [];

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            var Listdata = data.PT0191213000001;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
        }
    });

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
        var Code = $("#CustomerCode").val();
        var Name = $("#CustomerName").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/CustomerExport?Token=' + token + '&Code=' + Code + '&Name=' + Name;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/CustomerImport',
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

        var emouserID = data.CustomerID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.Code + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Name + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remarks + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Name,
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
            tableID: "31",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //分类查询
    this.ClassOneSearch = function () {
        ClassOneTable.goForwordSafely(function () {
            ClassOneTable.loadData(null, null, 1);
        }, null);
    };

    //分类查询
    this.ClassTwoSearch = function () {
        ClassTwoTable.goForwordSafely(function () {
            ClassTwoTable.loadData(null, null, 1);
        }, null);
    };

    //业务员查询
    this.CodeSearch = function () {
        ClerkTable.goForwordSafely(function () {
            ClerkTable.loadData(null, null, 1);
        }, null);
    };

    //设置业务员表格
    var ClerkTable = new mf.Table("#ClerkTable", {
        uniqueId: "MESUserID",
        editable: false,
        LastWidth: "62",
        paginationBar: new mf.PaginationBar("#paginagionClerkBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ClerkCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.EmployeeCode, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'UserName', title: fields.EmployeeName, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: "正常" }, { value: 0, text: "作废" }]),
            }
        ]
    });

    //设置分类一表格
    var ClassOneTable = new mf.Table("#ClassOneTable", {
        uniqueId: "ParameterID",
        editable: false,
        LastWidth: "231",
        paginationBar: new mf.PaginationBar("#paginagionClassOneBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ClassOneNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getClassList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Type:"CST" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 230,
        columns: [
            {
                field: 'Code', title: fields.ClassCode, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'Name', title: fields.ClassName, align: "center", 
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            }
        ]
    });

    //设置分类二表格
    var ClassTwoTable = new mf.Table("#ClassTwoTable", {
        uniqueId: "ParameterID",
        editable: false,
        LastWidth: "231",
        paginationBar: new mf.PaginationBar("#paginagionClassTwoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ClassTwoNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getClassList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Type: "CST" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 230,
        columns: [
            {
                field: 'Code', title: fields.ClassCode, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'Name', title: fields.ClassName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            }
        ]
    });

    //设置客户资料维护表格
    table = new mf.Table("#CustomerTable", {
        uniqueId: "CustomerID",
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#CustomerCode").val();
            var Name = $("#CustomerName").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00007getList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Name:Name }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00007Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentParameter/Inf00007Delete",
                data: JSON.stringify({ CustomerID: rowData.CustomerID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata) {
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            var emailValue = table.getEditingColumnValue($row, "Email");
            if (emailValue.length > 0) {
                if (!reg.test(emailValue)) {
                    return fields.EmailIsError;
                }
            }
            return null;
        },
        focusField: "Code",
        focusEditField: "Contacts",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.Code, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.Name, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 120 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.NameIsNull)
                ],
            },
            {
                field: 'Contacts', title: fields.Contact, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 }),
            },
            {
                field: 'Email', title: fields.Email, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, title: "title" }),
            },
            {
                field: 'MESUserCode', title: fields.ClerkCode, align: "center", width: "150",
                rander: new mf.FKRander("#ClerkDialog",
                                        "#ClerkDialog #commit",
                                        ClerkTable,
                                        new mf.TextRander(
                                            {
                                                size: 10, readonly: 'readonly', title: "title"
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                        }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "MESUserCode", e.data.Emplno);
                    table.setEditingColumnValue($row, "MESUserName", e.data.UserName);
                    MESUserID = e.data.MESUserID;
                }
            },
            //业务员代号
            {
                field: 'MESUserID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return MESUserID;
                })
            },
            {
                field: 'MESUserName', title: fields.ClerkName, align: "center", width: "110",
                rander: new mf.TextRander({ size: 8, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ClassOneCode', title: fields.ClassifyOne, align: "center", width: "150",
                rander: new mf.FKRander("#ClassOneDialog",
                                       "#ClassOneCommit",
                                        ClassOneTable,
                                       new mf.TextRander(
                                           {
                                               size: 10, readonly: 'readonly', title: "title"
                                           }
                                       ),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassOneCode", e.data.Code);
                    ClassOne = e.data.ParameterID;
                }
            },
            {
                field: 'ClassOne', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ClassOne;
                })
            },
            {
                field: 'ClassTwoCode', title: fields.ClassifyTwo, align: "center", width: "150",
                rander: new mf.FKRander("#ClassTwoDialog",
                                       "#ClassTwoCommit",
                                        ClassTwoTable,
                                       new mf.TextRander(
                                           {
                                               size: 10, readonly: 'readonly', title: "title"
                                           }
                                       ),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassTwoCode", e.data.Code);
                    ClassTwo = e.data.ParameterID;
                }
            },
            {
                field: 'ClassTwo', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ClassTwo;
                })
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(Namearry),
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
                field: 'Modifier', title: fields.LastModifyPerson, align: 'center', width: "110",
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

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };


}

var URL = "/MES/IntelligentParameters/INF00007";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00007", "INF00007");

var model = new viewModel();