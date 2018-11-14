var URL = "/MES/IntelligentParameters/INF00008";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;

    var formData = {
        Code: ko.observable(""),
        Type: ko.observable(""),
        TypeList: ko.observableArray(parameters.PT0191213000050)
    };
    ko.applyBindings(formData);
    
    //采购员表
    var MESUserTable = new mf.Table("#MESUserTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionMESUserBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#UserCode").val();
            console.log("UserCode:" + Code);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
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
                field: 'Emplno', title: fields.EmployeeCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });
    $("#MESUserSearch").click(function () {
        MESUserTable.loadData(null, null, 1);
    });

    //分类一表
    var ClassOneTable = new mf.Table("#ClassOneTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionClassOneBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#OneCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getClassList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Type: "VEN" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 250,
        columns: [
            {
                field: 'Code', title: fields.ClassCode, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ClassDescription, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });
    $("#ClassOneSearch").click(function () {
        ClassOneTable.loadData(null,null,1);
    });

    //分类二表格
    var ClassTwoTable = new mf.Table("#ClassTwoTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionClassTwoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#TwoCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getClassList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Type: "VEN" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 250,
        columns: [
            {
                field: 'Code', title: fields.ClassCode, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ClassDescription, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });
    $("#ClassTwoSearch").click(function () {
        ClassTwoTable.loadData(null, null, 1);
    });

    var table = new mf.Table("#INF00008Table", {
        uniqueId: "ID",
        focusField: "Code",
        focusEditField: "Contacts",
        LastWidth: "130",
        IsSetTableWidth: true,
        height: window.innerHeight - 146,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Type = formData.Type();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00008getList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00008Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00008ManufacturerDelete',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        columns: [
            {
                field: 'Type', title: fields.Class, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.SelectRander(parameters.PT0191213000050)),
                defaultValue: mf.systemID + "0201213000011"             
            },
            {
                field: 'Code', title: fields.VendorNo, align: "center", width: "120", require: true,
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 9, title: "title", maxLength: 10 })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.VendorNoIsNull)
                ]
            },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Contacts', title: fields.Contacts, align: "center", width: "120",
                rander: new mf.TextRander({ size: 8, title: "title", maxLength: 10 })
            },
            {
                field: 'Email', title: fields.Email, align: "center", width: "160",
                rander: new mf.TextRander({ size: 18, title: "title" }),
                checkers: [
                    new mf.IsEmailChecker(fields.EmailIsTrue)
                ]
            },
            {
                field: 'MESUserID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Emplno', title: fields.BuyerCode, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#MESUserDialog",
                    "#MESUserConfirmBtn",
                    MESUserTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#UserCode", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "MESUserID", e.data.MESUserID);
                    table.setEditingColumnValue($row, "Emplno", e.data.Emplno);
                    table.setEditingColumnValue($row, "MESUserName", e.data.UserName);
                }
            },
            {
                field: 'MESUserName', title: fields.Buyer, align: "center", width: "120",
                rander: new mf.TextRander({ size: 8, title: "title", readonly: 'readonly' })
            },
            {
                field: 'ClassOne', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ClassOneCode', title: fields.Class1, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#ClassOneDialog",
                    "#ClassOneCommit",
                    ClassOneTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#OneCode", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassOne", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ClassOneCode", e.data.Code);
                }
            },
            {
                field: 'ClassTwo', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ClassTwoCode', title: fields.Class2, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#ClassTwoDialog",
                    "#ClassTwoCommit",
                    ClassTwoTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#TwoCode", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassTwo", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ClassTwoCode", e.data.Code);
                }
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(parameters.PT0191213000001),
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
        table.goForwordSafely(
            function () {
                table.loadData(null, null, 1);
            }, null);
    };

    //刷新
    this.refreshClick = function () {
        console.log("refreshClick：" + table.hasChange());
        table.goForword(
            function () {
                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                window.location.reload();
            }, function () {
                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                window.location.reload();
            });
    };

    //添加
    this.addClick = function () {
        if (!table) {
            return;
        }
        table.addRow();
    };

    //编辑
    this.editClick = function () {
        if (!table) {
            return;
        }
        table.editRow();
    };

    //删除
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

    //导出
    this.exportClick = function () {
        table.loadDataBack(null, function () {

            var $trLength = $("#INF00008Table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/ManufacturerExport?Token=' + token;

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (formData.Type() && formData.Type().length > 0) {
                exportUrl = exportUrl + '&Type=' + formData.Type();
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
                url: window.top.mf.domain + '/MES/api/ImportFile/ManufacturerImport',
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

    //语系
    this.languagesClick = function () {
        if (!table) {
            return;
        }

        var row = table.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
        }

        if (!(row.ManufacturerID && row.ManufacturerID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.VendorNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.VendorDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Name', title: fields.VendorDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "32",
            rowID: row.ManufacturerID,
            rowData: rowData,
            columns: columns,
            arrayWord: arrayWord
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };
};

//语系词组
var arrayWord = [
    "VendorNo", "Class", "VendorDescription", "Contacts", "Email", "BuyerCode",
    "Buyer", "Class1", "Class2", "Remark", "Status", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Import", "Cancel", "Browse", "Comfirm",
    "Close", "Search", "EmployeeInformation", "EmployeeCode", "ClassCode", "ClassDescription",
    "Normal", "Invalid", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord",
    "PleaseSaveDataFirst", "PleaseSelectFile", "New", "Deletion", "LanguageCode",
    "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "Department", "Name", "VendorNoIsNull", "EmailIsTrue"
];

//拼接字符串
words = arrayWord.join();

mf.toolBar('#container');

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000050" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};

