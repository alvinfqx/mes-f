
var URL = "/MES/IntelligentParameters/INF00023";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var model = null, parameters = null;
var viewModel = function () {
    var self = this;
    var table = null,RecordTable = null, RecordDetailTable = null;
    var ExportTotal, ID, AutoNumberID;
    var Length = 0;

    //批号自动编号维护表
    table = new mf.Table("#classTable", {
        uniqueId: "AutoNumberID",
        paginationBar: new mf.PaginationBar("#paginationBar"),
        height: window.innerHeight - 148,        
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#classCode").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00023GetList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00023Save",
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $RecordEditingCell = $row.find("#Record");
            if (isAdding) {
                $RecordEditingCell.attr('disabled', true);
            }
            else {
                $RecordEditingCell.attr('disabled', false);
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var Len = table.getEditingColumnValue($row, "Length");
            if (Len == 0)
            {
              //  return fields.BatchNotSet;
            }
            return null;
        },
        isFrozenColumn: true,
        operateColumWidth: "100px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:100px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Record" onclick="model.RecordClick(this)" title="' + fields.Record + '" >' + fields.Record + '</button>');
            return $td;
        },
        focusField: "Code",
        focusEditField: "DefaultCharacter",
        LastWidth: "15",
        IsSetTableWidth: true,
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentParameter/Inf00023Delete",
                data: JSON.stringify({ AutoNumberID: rowData.AutoNumberID }),
                success: function (data) {
                    success(data);
                }
           });
        },
        columns: [
             {
                 field: 'Code', title: fields.CategoryCode, align: "center", require: true, width: "120",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxlength: 20, title: "title" })),
                 checkers: [
                     new mf.TextNotEmptyChecker(fields.CategoryCodeIsNull)
                 ]
             },
            {
                field: 'Description', title: fields.Description, align: "center", require: true, width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxlength: 60 })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DescriptionIsNull)
                ]
            },
            {
                field: 'DefaultCharacter', title: fields.PresetCharacter, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, title: "title", maxlength: 30 }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var DefaultCharacter = table.getEditingColumnValue($row, "DefaultCharacter");
                    var DefaultCharacterLen =  DefaultCharacter.length;
                    var YearLength = table.getEditingColumnValue($row, "YearLength");
                    var MonthLength = table.getEditingColumnValue($row, "MonthLength");
                    var DateLength = table.getEditingColumnValue($row, "DateLength");
                    var NumLength = table.getEditingColumnValue($row, "NumLength");
                    var NumLength = Number(NumLength);
                    if (isNaN(NumLength)) {
                        NumLength = 0;
                    }
                    Length = DefaultCharacterLen + YearLength + MonthLength + DateLength + NumLength;
                    table.setEditingColumnValue($row, "Length", Length);
                },
            },
            {
                field: 'YearLength', title: fields.YearCode, align: "center", width: "100",
                rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 4, text: fields.yes }]),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var DefaultCharacter = table.getEditingColumnValue($row, "DefaultCharacter");
                    var DefaultCharacterLen = DefaultCharacter.length;
                    var YearLength = table.getEditingColumnValue($row, "YearLength");
                    var MonthLength = table.getEditingColumnValue($row, "MonthLength");
                    var DateLength = table.getEditingColumnValue($row, "DateLength");
                    var NumLength = table.getEditingColumnValue($row, "NumLength");
                    var NumLength = Number(NumLength);
                    if (isNaN(NumLength)) {
                        NumLength = 0;
                    }
                    Length = DefaultCharacterLen + YearLength + MonthLength + DateLength + NumLength;
                    table.setEditingColumnValue($row, "Length", Length);
                },

            },
            {
                field: 'MonthLength', title: fields.MonthCode, align: "center", width: "100",
                rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 2, text: fields.yes }]),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var DefaultCharacter = table.getEditingColumnValue($row, "DefaultCharacter");
                    var DefaultCharacterLen = DefaultCharacter.length;
                    var YearLength = table.getEditingColumnValue($row, "YearLength");
                    var MonthLength = table.getEditingColumnValue($row, "MonthLength");
                    var DateLength = table.getEditingColumnValue($row, "DateLength");
                    var NumLength = table.getEditingColumnValue($row, "NumLength");
                    var NumLength = Number(NumLength);
                    if (isNaN(NumLength)) {
                        NumLength = 0;
                    }
                    Length = DefaultCharacterLen + YearLength + MonthLength + DateLength + NumLength;
                    table.setEditingColumnValue($row, "Length", Length);
                },
            },
            {
                field: 'DateLength', title: fields.DateCode, align: "center", width: "100",
                rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 2, text: fields.yes }]),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var DefaultCharacter = table.getEditingColumnValue($row, "DefaultCharacter");
                    var DefaultCharacterLen = DefaultCharacter.length;
                    var YearLength = table.getEditingColumnValue($row, "YearLength");
                    var MonthLength = table.getEditingColumnValue($row, "MonthLength");
                    var DateLength = table.getEditingColumnValue($row, "DateLength");
                    var NumLength = table.getEditingColumnValue($row, "NumLength");
                    var NumLength = Number(NumLength);
                    if (isNaN(NumLength)) {
                        NumLength = 0;
                    }
                    Length = DefaultCharacterLen + YearLength + MonthLength + DateLength + NumLength;                   
                    table.setEditingColumnValue($row, "Length", Length);
                },
            },
            {
                field: 'NumLength', title: fields.SerialNnmberLenght, align: "center", width: "110", require: true,
                rander: new mf.TextRander({ size: 8, title: "title", event: "input", eventName: "oninputnum(this)" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var DefaultCharacter = table.getEditingColumnValue($row, "DefaultCharacter");
                    var DefaultCharacterLen = DefaultCharacter.length;
                    var YearLength = table.getEditingColumnValue($row, "YearLength");
                    var MonthLength = table.getEditingColumnValue($row, "MonthLength");
                    var DateLength = table.getEditingColumnValue($row, "DateLength");
                    var NumLength = table.getEditingColumnValue($row, "NumLength");
                    var NumLength = Number(NumLength);
                    if (isNaN(NumLength)) {
                        NumLength = 0;
                    }
                    Length = DefaultCharacterLen + YearLength + MonthLength + DateLength + NumLength;
                    table.setEditingColumnValue($row, "Length", Length);
                },
                defaultValue: 0,
                checkers: [
                    new mf.IsOnlyNumberChecker(fields.SerialNnmberLenghtIsOnlyNumber),
                    new mf.TextNotEmptyChecker(fields.SerialNnmberLenghtIsNull)
                ]
            },
            {
                field: 'Length', title: fields.BatchLength, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, title: "title", disabled: "disabled", event: "input", eventName: "oninputnum(this)" }),
                defaultValue: Length,
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxlength: 120 }))
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "140",
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000001,
                    {
                        title: true
                    })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" })
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ],
    });

    //批号记录档表
    RecordTable = new mf.Table("#RecordTable", {
        uniqueId: "AutoNumberID",
        paginationBar: new mf.PaginationBar("#paginagionDataBar"),
        foucsField: "Code",
        height: 200,
        columns: [
            {
                field: 'Code', title: fields.CategoryCode, align: 'center', width: '120', require: true,
                rander: new mf.StaticValueRander({title: "title" })
            },
            {
                field: 'Description', title: fields.Description, align: "center", require: true, width: "200",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Prevchar', title: fields.RunningNo, align: "center", width: "160", require: true,
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Num', title: fields.CurrentNumber, align: "center", width: "160", require: true,
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ],
        fn_getData: function (pagination, searchData, success) {
            searchData.AutoNumberID = ID;
            searchData.Code = $("#class_search_code").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00023RecordGetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {                                      
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData,success) { },
        fn_onRowClick: function (row) {
            AutoNumberID = row.AutoNumberID;
            RecordDetailTable.loadData();
        }
    });

    RecordDetailTable = new mf.Table("#RecordDetailTable", {
        uniqueId: "BatchNo",
        paginationBar: new mf.PaginationBar("#paginagionDataBar_Detail"),
        foucsField: "Code",
        height: 200,
        columns: [
             {
                 field: 'BatchNo', title: fields.LotNo, align: 'center', width: '100', require: true,
                 rander: new mf.StaticValueRander({ title: "title" })
             },
            {
                field: 'CompletionNo', title: fields.FinishNo, align: "center", require: true, width: "140",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'TaskNo', title: fields.TaskNo, align: "center", width: "160", require: true,
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "140", require: true,
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "80", require: true,
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80", require: true,
                rander: new mf.StaticValueRander({ title: "title" })
            }
        ],
        fn_getData: function (pagination, searchData, success) {
            searchData.AutoNumberRecordID = AutoNumberID;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00023RecordDetailList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        }
    });

    //点击弹窗
    this.RecordClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        if (!row) {
            msg.info(fields.info, fields.CodeIsEdit);
            return;
        }
        mf.dialog('#RecordDialog', {
            viewModel: function () {
                ID = row.AutoNumberID;              
                RecordTable.loadData();
               
            }
        });
    };

    //彈窗查詢
    this.CodeSearch = function () {
        RecordTable.goForwordSafely(function () {
            RecordTable.loadData(null, null, 1);
        }, null);
    };

    //清空开窗查询内容
    this.clearSearchData = function () {
        $("#class_search_code").val("");
    };

    if (!table) {
        console.log("create table faild");
        return;
    }

    table.loadData();

    //刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            table.loadData();
        });
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //添加
    this.addClick = function () {
        if (!table)
            return;
        table.addRow();
    };

    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };

    //编辑
    this.editClick = function () {
        if (!table)
            return;
        table.editRow();
    };

    //删除
    this.deleteClick = function () {
        if (!table)
            return;
        table.deleteRow();
        //var data = table.getSelectedData();//取得被選取的資料列
        //if (!data)
        //    return;

        //var ID = data.AutoNumberID;
        //if (!ID && ID.length <= 0) {
        //    console.error("can't get AutoNumberID from table");
        //    return;
        //}

        //msg.warning(fields.info, fields.WhetherToDelete + fields.CodeNamed + data.Code + fields.TheData,
        //    function () {
        //        mf.ajax({
        //            type: "post",
        //            url: "/MES/api/IntelligentParameter/Inf00023Delete",
        //            data: JSON.stringify({ Token: token, AutoNumberID: ID }),
        //            success: function (data) {
        //                if (data.status == "200") {
        //                    msg.success(fields.info, data.msg);
        //                    table.loadData();
        //                }
        //                else {
        //                    msg.error(fields.info, data.msg);
        //                }
        //            }
        //        });
        //    });
    };

    //语系
    this.languagesClick = function () {
        if (!table)
            return;
        var data = table.getSelectedData();
        if (!data)
            return;
        var emouserID = data.AutoNumberID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }
        var rowData =
           '&nbsp;<label>' + fields.CategoryCode + '</label>' +
           '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" disabled="disabled" value="' + data.Code + '"/>' +
           '&nbsp;&nbsp;<label>' + fields.Description + '</label>' +
           '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" disabled="disabled" value="' + (data.Description == null ? "" : data.Description) + '" />' +
           '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
           '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" disabled="disabled" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Description,
                halign: 'center',
                align: "center",
                width: "150",
                require:true
            },
            {
                field: 'Comments',
                title: fields.Remark,
                halign: "center",
                align: "center",
                width:"150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "41",
            rowID: emouserID,
            rowData: rowData,
            columns:columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //导入
    this.importClick = function () {
        mf.dialog("#importDialog", {
            viewModel: function () {
                var importSelf = this;
                $("#FileName").text(fields.PleaseSelectFile);
                $("#btn_browse").click(function () {
                    $("#File").click();
                });
                $("#File").change(function () {
                    var fileName = $("#File").val();
                    $("#FileName").text(fileName)
                });
                $("#addFile").click(function () {
                    var formdata = new FormData();
                    formdata.append("file", document.getElementById("File").files[0]);
                    formdata.append("Token", window.top.mf.token);
                    $.ajax({
                        type: "POST",
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00023Import',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (data) {

                            if (data.status == 200) {
                                msg.success(fields.Prompt, data.msg, function () {
                                    table.loadData();
                                    $("#importDialog").modal('hide');
                                    
                                });
                            } else {
                                msg.info(fields.Prompt, data.msg);
                            }
                        }
                    });
                });
            }
        });
    };

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var Code = $("#classCode").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00023Export?Token=' + token + '&Code=' + Code;
    };

};

var arrayWord = [
    "CategoryCode", "Description", "PresetCharacter", "YearCode", "MonthCode", "DateCode", "SerialNnmberLenght",
    "BatchLength", "Remark", "Button", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate","Prompt",
    "Batch number automatic maintenance", "CodeIsNull", "DescriptionIsNull", "no", "yes", "LotRecordFile", "Cancel",
    "Comfirm", "RunningNo", "CurrentNumber", "Search", "Import", "No file selected", "Close", "Browse", "PleaseSelectFile",
    "NoDataExport", "info", "Record", "BatchNotSet", "Status", "WhetherToDelete", "CodeNamed", "TheData", "FinishNo","CategoryCodeIsNull",
    "LotNo", "TaskNo", "MoNo", "MoSeq", "SerialNnmberLenghtIsNull"
];
words = arrayWord.join();

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};