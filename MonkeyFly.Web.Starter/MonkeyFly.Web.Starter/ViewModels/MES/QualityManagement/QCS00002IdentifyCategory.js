var viewModel = function () {
    var self = this;
    var ExportTotal, ID;

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
    //抽检设定关闭
    this.CleartableClick = function () {
        if (!SamplingSetTable)
            return;
        SamplingSetTable.goForword(function () {
            SamplingSetTable.loadData();
            $('#SamplingSetDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#SamplingSetDialog').modal("hide");
        }, fields.Isleave);
    };
    //抽检设定编辑
    this.ChangeSamplingSetClick = function () {
        if (!SamplingSetTable)
            return;
        SamplingSetTable.editRow();
    };
    //抽检设定保存
    this.SaveSamplingSetClick = function () {
        if (!SamplingSetTable)
            return;
        SamplingSetTable.save(null, null, true);
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
            '&nbsp;<label>' + fields.CategoryCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.CategoryDec + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.CategoryDec,
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

        window.location.href = mf.domain + '/MES/api/ExportFile/Qcs00002TypeExport?Token=' + token + '&Code=' + Code;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00002TypeImport',
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

    //抽检设定原因   
    this.SamplingSetClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        ID = row.ParameterID;
        SamplingSetTable.loadData();
        $("#CategoryCode").attr("title", row.Code);
        $("#CategoryDec").attr("title", row.Name);
        $("#CategoryDec").val(row.Name);
        $("#CategoryCode").val(row.Code);
        $("#CategoryDec").val(row.Name);
        $('#SamplingSetDialog').modal("show");
    };

    //设置抽检设定表格
    var SamplingSetTable = new mf.Table("#SamplingSetTable", {
        uniqueId: "InspectionMethod",
        LastWidth: "130",
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00002GetTypeDetailsList',
                data: ({ TypeID: ID }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00002TypeDetailsSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        focusEditField: "IsEnable",
        height: 350,
        columns: [
            {
                field: 'InspectionMethodCode', title: fields.CheckWay, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'One', title: fields.AlevelSerious, align: "center", width: "110",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001C, { IsBoolean: false, title: true, noSearchSelectedText:"" }),
            },
            {
                field: 'Two', title: fields.BlevelSerious, align: "center", width: "110",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001C, { IsBoolean: false, title: true, noSearchSelectedText: "" }),
            },
            {
                field: 'Three', title: fields.Main, align: "center", width: "110",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001C, { IsBoolean: false, title: true, noSearchSelectedText: "" }),
            },
            {
                field: 'Four', title: fields.Minor, align: "center", width: "110",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001C, { IsBoolean: false, title: true, noSearchSelectedText: "" }),
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
            },
            {
                field: 'CategoryID', title: "",visible:false,
                rander: new mf.TextRander({ size: 10, title: "title" }),
            }
        ]
    });

    //设置表格
    var table = new mf.Table("#IdentifyCategoryTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00002GetTypeList',
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
                url: '/MES/api/QualityManagement/Qcs00002TypeSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $SamplingSetClickEditingCell = $row.find("#SamplingSetClick");
            if (isAdding) {
                $SamplingSetClickEditingCell.attr('disabled', true);
            }
            else {
                $SamplingSetClickEditingCell.attr('disabled', false);
            }
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00002TypeDelete',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isFrozenColumn: true,
        operateColumWidth: "90px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:90px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="SamplingSetClick" onclick="model.SamplingSetClick(this)" title="抽檢設定" >' + fields.SamplingSet + '</button>');
            return $td;
        },
        focusField: "Code",
        focusEditField: "IsEnable",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.CategoryCode, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 30, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CategoryCodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.CategoryDec, require: true, align: "center", width: "160",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CategoryDecIsNull)
                ],
            },        
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180", require: true,
                rander: new mf.TextRander({ size: 17, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.RemarkIsNull)
                ],
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "90",
                rander: new mf.AutoSelectRander("value", "text", [{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }], {  title: true }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "107",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "107",
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

var URL = "/MES/QualityManagement/QCS00002IdentifyCategory";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "CategoryCode", "CategoryDec", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "Langwage", "CategoryCodeIsNull",
    "CategoryDecIsNull", "SamplingSet", "AlevelSerious", "BlevelSerious", "Main", "Minor", "PleaseSelectRecord",
    "Comfirm", "CheckWay", "Isleave", "RemarkIsNull", "Normal", "Invalid", "Delete"
];

words = arrayWord.join();

var model = null;
var parameters = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "019121300001C" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};