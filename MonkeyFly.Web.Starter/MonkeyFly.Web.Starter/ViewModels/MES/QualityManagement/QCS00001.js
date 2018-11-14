var URL = "/MES/QualityManagement/QCS00001";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var checkTestSettingID = null;
    var actions = mf.actionButton();
    var formData = {
        InspectionMethod: ko.observable(""),
        InspectionMethodList: ko.observableArray(parameters.PT019121300001B)
    };
    ko.applyBindings(formData);

    //获取list的text
    function getValue(value, list) {
        var result = "";
        for (var i = 0; i < list.length; i++) {
            if (value == list[i].value) {
                result = list[i].text;
                break;
            }
        }
        return result;
    }

    //检查输入框的值
    function checkNumber($cell) {
        var value = $.trim($cell.val());
        //if (!(value && value.length > 0)) {
        //    $cell.val(0);
        //}
        //var checkData = Number(value);
        //if (!isNaN(checkData)) {
        //    var list = value.split(".");
        //    var Integer = Number(list[0]);
        //    var Decimal = "";
        //    if (list.length > 1) {
        //        Decimal = Number(list[1]);
        //    }
        //    $cell.val("" + Integer+"."+Decimal);
        //}
    }

    //主列表
    var table = new mf.Table("#QCS00001Table", {
        uniqueId: "CheckTestSettingID",
        deleteId: "CheckTestSettingID",
        isFrozenColumn: true,
        focusField: "InspectionLevel",
        focusEditField: "InspectionLevel",
        height: window.innerHeight - 145,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "90px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:90px;text-align:center;">');
            var actionLength = actions.length;
            for (var i = 0; i < actionLength; i++) {
                $btn = $('<button id="' + actions[i].Code +
                        'Click" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.' +
                        actions[i].Code + 'Click(this)" >' + actions[i].Name + '</button> ');
                $td.append($btn);
            }
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $BtnCheckSetClick = $row.find("#CheckSetClick");
            if (isAdding) {
                $BtnCheckSetClick.hide();
            }
            else {
                $BtnCheckSetClick.show();
            }
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Type = formData.InspectionMethod();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/QualityManagement/Qcs00001GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00001Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00001Delete',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'InspectionLevel', title: fields.InspectionLevel, align: "center", width: "120", require: true,
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001A, { title: true, noSearchSelectedText: "", MaxWidth: "90px" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.InspectionLevelIsNull)
                ]
            },
            {
                field: 'InspectionMethod', title: fields.InspectionMethod, align: "center", width: "120", require: true,
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001B, { title: true, noSearchSelectedText: "", MaxWidth: "90px" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.InspectionMethodIsNull)
                ]
            },
            {
                field: 'AQL', title: fields.AQL, align: "center", width: "100", require: true,
                rander: new mf.AutoSelectRander("value", "text", parameters.PT019121300001C, { title: true, noSearchSelectedText: "", MaxWidth: "100px" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.AQLIsNull)
                ]
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: true })),
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


    //抽验设定列表
    var CheckTestSettingDetailsTable = new mf.Table("#CheckTestSettingDetailsTable", {
        uniqueId: "ID",
        focusField: "StartBatch",
        height: 300,
        fn_onTableEnterPress: function () {
            $trs = $("#CheckTestSettingDetailsTable").find("tr");
            $trlength = $trs.length;
            if ($trlength > 1) {
                var data = CheckTestSettingDetailsTable.getRowData($trs.eq($trlength - 2));
                $("#Sequence").val(Number(data.Sequence) + 1);
            }
            else {
                $("#Sequence").val(1);
            }
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.CheckTestSettingID = checkTestSettingID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/QualityManagement/Qcs00001GetDetailsList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].CheckTestSettingID = checkTestSettingID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00001DetailsSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "50",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander(
                        { size: 2, title: "", readonly: 'readonly' }))
            },
            {
                field: 'StartBatch', title: fields.StartBatch, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 11, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.StartBatchIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.StartBatchIsMaxInteger, fields.StartBatchIsMaxDecimal,
                        fields.StartBatchIsNonNegativeNumber, 14, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'EndBatch', title: fields.EndBatch, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 11, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.EndBatchIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.EndBatchIsMaxInteger, fields.EndBatchIsMaxDecimal,
                        fields.EndBatchIsNonNegativeNumber, 14, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'SamplingQuantity', title: fields.SamplingQuantity, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 11, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.SamplingQuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.SamplingQuantityIsMaxInteger, fields.SamplingQuantityIsMaxDecimal,
                        fields.SamplingQuantityIsNonNegativeNumber, 14, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'AcQuantity', title: fields.AcQuantity, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 11, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AcQuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AcQuantityIsMaxInteger, fields.AcQuantityIsMaxDecimal,
                        fields.AcQuantityIsNonNegativeNumber, 14, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'ReQuantity', title: fields.ReQuantity, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 11, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ReQuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ReQuantityIsMaxInteger, fields.ReQuantityIsMaxDecimal,
                        fields.ReQuantityIsNonNegativeNumber, 14, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

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
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
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

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#QCS00001Table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Qcs00001Export?Token=' + token;

            if (formData.InspectionMethod() && formData.InspectionMethod().length > 0) {
                exportUrl = exportUrl + '&Type=' + formData.InspectionMethod();
            }

            console.log(exportUrl);
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
                url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00001Import',
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
                        var message = ret.msg;
                        if (message.length > 250) {
                            message = message.substring(0, 250) + "……"
                        }
                        msg.error(fields.Prompt, message);
                    }
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };

    this.CheckSetClick = function (obj) {
        $row = $(obj).parents("tr");
        var row = table.getRowData($row);
        if (!(row.CheckTestSettingID && row.CheckTestSettingID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst);
            return;
        }
        checkTestSettingID = row.CheckTestSettingID;
        CheckTestSettingDetailsTable.clean();
        CheckTestSettingDetailsTable.loadData();

        $("#TextInspectionLevel").val(getValue(row.InspectionLevel, parameters.PT019121300001A));
        $("#TextInspectionMethod").val(getValue(row.InspectionMethod, parameters.PT019121300001B));
        $("#TextAQL").val(getValue(row.AQL, parameters.PT019121300001C));

        $("#CheckSetNewBtn").unbind();
        $("#CheckSetChangeBtn").unbind();
        $("#CheckSetDeletionBtn").unbind();
        $("#CheckSetConfirmBtn").unbind();
        $("#CheckSetNewBtn").click(function () {
            CheckTestSettingDetailsTable.addRow();
            $trs = $("#CheckTestSettingDetailsTable").find("tr");
            $trlength = $trs.length;
            if ($trlength > 1) {
                var data = CheckTestSettingDetailsTable.getRowData($trs.eq($trlength - 2));
                $("#Sequence").val(Number(data.Sequence) + 1);
            }
            else {
                $("#Sequence").val(1);
            }
        });
        $("#CheckSetChangeBtn").click(function () {
            CheckTestSettingDetailsTable.editRow();
        });
        $("#CheckSetDeletionBtn").click(function () {
            CheckTestSettingDetailsTable.deleteRow();
        });
        $("#CheckSetConfirmBtn").click(function () {
            CheckTestSettingDetailsTable.save(null, null, true);
        });

        $("#CheckSetDialog").modal({ backdrop: 'static', keyboard: false });
        $("#CheckSetDialog").modal('show');
    };
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "SamplingInspectionSetMaintenance", "CheckSet", "InspectionStandard", "InspectionLevel", "Sequence",
    "InspectionMethod", "AQL", "StartBatch", "EndBatch", "SamplingQuantity", "AcQuantity", "ReQuantity",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Normal", "Invalid",
    "Cancel", "Browse", "Comfirm", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "SourceDetailMaintenance",
    "PleaseSaveDataFirst", "PleaseSelectFile", "InspectionLevelIsNull", "InspectionMethodIsNull", "AQLIsNull",
    "StartBatchIsNonNegativeNumber",  "EndBatchIsNonNegativeNumber", "SamplingQuantityIsNonNegativeNumber", 
    "AcQuantityIsNonNegativeNumber", "ReQuantityIsNonNegativeNumber", "StartBatchIsMaxDecimal", "EndBatchIsMaxDecimal",
    "SamplingQuantityIsMaxDecimal", "AcQuantityIsMaxDecimal", "ReQuantityIsMaxDecimal", "StartBatchIsMaxInteger", 
    "EndBatchIsMaxInteger", "SamplingQuantityIsMaxInteger", "AcQuantityIsMaxInteger", "ReQuantityIsMaxInteger"
];
words = arrayWord.join();

initPage = function () {
    mf.toolBar('#container');
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,019121300001A,019121300001B,019121300001C" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};
