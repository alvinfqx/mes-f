var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal, ManufacturerID, Namearry = [];

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            var Listdata = data.PT0191213000001;
            $("#Status").append("<option></option>");
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
                $("#Status").append("<option value='"+ Listdata[i].value + "'>"+ Listdata[i].text +"</option>");
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

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.SensorID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.SensorNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.SensorDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.SensorDescription,
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
            tableID: "49",
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
        window.location.href = mf.domain + '/MES/api/ExportFile/Iot00001Export?Token=' + token + '&Code=' + Code + '&Status=' + Status;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Iot00001Import',
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

    //设置厂商表格
    var SiteTable = new mf.Table("#SiteTable", {
        uniqueId: "ManufacturerID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionSiteBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#SiteCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetManufacturerList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 350,
        columns: [
            {
                field: 'Code', title: fields.VendorNo, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 120, title: "title" })),
            }
        ]
    });

    //设置表格
    table = new mf.Table("#SensorTable", {
        uniqueId: "SensorID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentCouplet/lot00001GetList',
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
                url: '/MES/api/IntelligentCouplet/lot00001Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 检查启用日期和失效日期
            var sdate = table.getEditingColumnValue($row, "EnabledDate");
            var edate = table.getEditingColumnValue($row, "FailureDate");
            var dateStart = new Date(Date.parse(sdate));
            var dateEnd = new Date(Date.parse(edate));
            if (dateStart > dateEnd)
                return fields.EnabledDateIsFailureDate;

            return null;
        },
        focusField: "Code",
        focusEditField: "Status",
        height: window.innerHeight - 145,
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.SensorNo, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SensorNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.SensorDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 15, maxLength: 60, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SensorDescriptionIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(Namearry),
            },
            {
                field: 'EnabledDate', title: fields.EnabledDate, align: "center", width: "130",
                rander: new mf.DateRander(),
            },
            {
                field: 'FailureDate', title: fields.FailureDate, align: "center", width: "130",
                rander: new mf.DateRander(),
            },
            {
                field: 'Brand', title: fields.Brand, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 60, title: "title" }),
            },
            {
                field: 'Type', title: fields.ModelType, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 60, title: "title" }),
            },
            {
                field: 'ManufacturerCode', title: fields.VendorNo, align: "center", width: "150",
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
                    table.setEditingColumnValue($row, "ManufacturerCode", e.data.Code);
                    table.setEditingColumnValue($row, "ManufacturerName", e.data.Name);
                    ManufacturerID = e.data.ManufacturerID;
                }
            },
            {
                field: 'ManufacturerID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ManufacturerID;
                })
            },
            {
                field: 'ManufacturerName', title: fields.VendorDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" }),
            },
            {
                field: 'MaxValue', title: fields.MaxValue, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title", maxLength: 19 })),
                checkers: [
                    new mf.IsOverDecimalChecker(fields.MaxValueIntIsOver, fields.MaxValueDecIsOver, fields.MaxValueIsTrue, 12, 6)
                ],
            },
            {
                field: 'MinValue', title: fields.MinValue, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title", maxLength: 19 })),
                checkers: [
                    new mf.IsOverDecimalChecker(fields.MinValueIntIsOver, fields.MinValueDecIsOver, fields.MinValueIsTrue, 12, 6)
                ],
            },
            {
                field: 'IsWarning', title: fields.IsWarning, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 0, text: fields.no },{ value: 1, text: fields.yes }]),
            },
            {
                field: 'MaxAlarmTime', title: fields.MaxAlarmTime, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 10, title: "title" }),
                checkers: [
                    new mf.IsOnlyNumberChecker(fields.IsOnlyNumber)
                ],
            },
            {
                field: 'MinAlarmTime', title: fields.MinAlarmTime, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 10, title: "title" }),
                checkers: [
                    new mf.IsOnlyNumberChecker(fields.IsOnlyNumber)
                ],
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

var URL = "/MES/IntelligentCouplet/IOT00001";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "SensorNo", "SensorDescription", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "EnabledDate", "FailureDate", "Brand",
    "ModelType", "VendorNo", "VendorDescription", "VendorMasterFile", "Comfirm", "yes", "no", "IsWarning",
    "MaxAlarmTime", "MinAlarmTime", "SensorNoIsNull", "SensorDescriptionIsNull", "IsOnlyNumber", "EnabledDateIsFailureDate",
    "MinValue", "MaxValue", "MaxValueIntIsOver", "MaxValueDecIsOver", "MaxValueIsTrue", "MinValueIsTrue",
    "MinValueIntIsOver", "MinValueDecIsOver"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};