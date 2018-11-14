var viewModel = function () {
    var self = this;
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

        var emouserID = data.InspectionProjectID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.TestItemsNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.TestItemsDec + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.TestItemsDec,
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
            tableID: "66",
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
        window.location.href = mf.domain + '/MES/api/ExportFile/Qcs00002ProjectExport?Token=' + token + '&Code=' + Code + '&Status=' + Status;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00002ProjectImport',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
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
    var table = new mf.Table("#TestItemsTable", {
        uniqueId: "InspectionProjectID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00002GetProjectList',
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
                url: '/MES/api/QualityManagement/Qcs00002ProjectSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00002ProjectDelete',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        focusField: "Code",
        focusEditField: "Attribute",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.TestItemsNo, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 7, maxLength: 30, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.TestItemsNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.TestItemsDec, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.TestItemsDecIsNull)
                ],
            },
            {
                field: 'Attribute', title: fields.MeasuredvalueSet, align: "center", width: "120",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000052, { IsBoolean: false, title: true }),
            },
            {
                field: 'InspectionStandard', title: fields.TestStandard, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title" }),
            },
            {
                field: 'InspectionLevel', title: fields.InspectionLevel, align: "center", width: "120",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001A, { IsBoolean: false, title: true }),
            },
            {
                field: 'Disadvantages', title: fields.Disadvantages, align: "center", width: "120",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001D, { IsBoolean: false, title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "90",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000001, { IsBoolean: false, title: true }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

}

var URL = "/MES/QualityManagement/QCS00002TestItems";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "TestItemsNo", "TestItemsDec", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "Langwage", "MeasuredvalueSet",
    "TestStandard", "InspectionLevel", "Disadvantages", "TestItemsNoIsNull", "TestItemsDecIsNull",
    "Delete"
];

words = arrayWord.join();

var model = null;
var parameters = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000052,019121300001A,019121300001D,0191213000001" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
            var Listdata = parameters.PT0191213000001
            $("#Status").append("<option></option>");
            for (var i = 0; i < Listdata.length; i++) {
                $("#Status").append("<option value='" + Listdata[i].value + "'>" + Listdata[i].text + "</option>");
            }
        }
    });
};