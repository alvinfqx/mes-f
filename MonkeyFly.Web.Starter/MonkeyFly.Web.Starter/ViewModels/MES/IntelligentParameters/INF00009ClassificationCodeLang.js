 var viewModel = function () {
    var self = this;
    var table;
    var columns = [];
    var LanguagesCodeList = [];
    var Description_Input = parameters.row.Description;
    var Comments_Input = parameters.row.Comments;
    if (!Description_Input) {
        Description_Input = "";
    }
    if (!Comments_Input) {
        Comments_Input = "";
    }
    var rowData = '<label>' + fields.ClassNo + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + parameters.row.Code + '"/>';
    rowData += '<label>' + fields.ClassDescription + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + Description_Input + '"/>';
    rowData += '<label>' + fields.Remark + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + Comments_Input + '"/>';
    $(".J-search").html(rowData);

    mf.ajax({
        async: false,
        type: 'Get',
        url: '/MES/api/IntelligentParameter/GetLanguageList?page=1&rows=1000000',
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                LanguagesCodeList[i] = {
                    value: data.rows[i].ParameterID,
                    text: data.rows[i].Code + "-" + data.rows[i].Name
                };
            }
        }
    });

    this.addClick = function () {
        table.addRow();
    };

    this.deleteClick = function () {
        table.deleteRow();
    };

    this.comfirmClick = function () {
        table.save(function () {
            //window.top.page_parameters.Caching.push({ URL: URL });
            window.location.href = URL;
        }, null);
    };

    this.backClick = function () {
        //window.top.page_parameters.Caching.push({ URL: URL });
        window.location.href = URL;
    };

    $(".J-search").html(parameters.rowData);







    table = new mf.Table("#LanguagesTable",
            {
                undefinedText: "",
                height: window.innerHeight - 103,
                uniqueId: "LanguageLibID",
                dblclick_editable: false,
                columns: [
                    {
                        field: 'LanguageCode', title: fields.LanguageCode, halign: 'center', align: 'center', width: "130",
                        rander: new mf.SelectRander(LanguagesCodeList),
                        checkers: [
                            new mf.TextNotEmptyChecker(fields.LanguageCodeIsNull)
                        ],
                        require: true
                    },
                    //{
                    //    field: 'ClassNo', title: fields.ClassNo, align: "center", width: '120px', require: true,
                    //    rander: new mf.TextRander({ size: 10, title: 'title' }),
                    //    checkers: [
                    //       new mf.TextNotEmptyChecker(fields.CodeIsNull)
                    //    ]
                    //},
                   {
                       field: 'Name', title: fields.ClassDescription, width: '130px', align: "center",
                       rander: new mf.TextRander({ size: 12, title: 'title' })
                   },
                   {
                       field: 'Comments', title: fields.Remark, align: "center", width: '180px',
                       rander: new mf.TextRander({ size: 14, title: 'title' })
                   },
                   {
                       field: 'IsDefault',
                       title: fields.IsDefault,
                       halign: 'center',
                       align: 'center',
                       width: "80",
                       rander: new mf.SingleCheckBoxRander({ yes: 1, no: 0 }),
                       fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                           if ($cell.prop("checked") && rowsData.length > 1) {
                               for (var i = 0; i < rowsData.length; i++) {
                                   if ($row.data("index") != i) {
                                       table.updateCellValue(i, 4, field, 0);
                                   }
                               }
                           }
                       }
                   },
                   {
                       field: 'Creator', title: fields.CreatedBy, align: "center", width: '100px',
                       rander: new mf.StaticValueRander()
                   },
                 {
                     field: 'CreateTime', title: fields.CreatedDate, align: "center", width: '120px',
                     rander: new mf.TextTimeRander()
                 },
                 {
                     field: 'Modifier', title: fields.LastChangedBy, align: "center", width: '100px',
                     rander: new mf.StaticValueRander()
                 },
                 {
                     field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: '120px',
                     rander: new mf.TextTimeRander()
                 }
                   ],
                fn_getData: function (pagination, searchData, success) {
                    mf.ajax({
                        type: "Get",
                        url: '/MES/api/IntelligentParameter/NCGetLanguageList',
                        data: { id: parameters.row.ParameterID, TableID: "20" },
                        contentType: 'application/json',
                        success: function (data) {
                            success({ rows: data });
                        }
                    });
                },
                fn_saveData: function (saveData, success, rowsData) {
                    for (var i = 0; i < rowsData.length; i++) {
                        for (var j = 0; j < rowsData.length; j++) {
                            if (i != j && rowsData[i].LanguageCode == rowsData[j].LanguageCode) {
                                msg.info(tips.info, tips.LanguageCodeIsRepeat);
                                return;
                            }
                        }
                    }

                    for (var i = 0; i < saveData.inserted.length; i++) {
                        saveData.inserted[i].RowID = parameters.row.ParameterID;
                        saveData.inserted[i].TableID = "20";
                    }

                    mf.ajax({
                        type: 'Post',
                        url: '/MES/api/IntelligentParameter/LanguageSave',
                        data: JSON.stringify(saveData),
                        async: false,
                        success: function (data) {
                            success(data);
                        }
                    });
                }
            });

    table.loadData();
};

var URL = "/MES/IntelligentParameters/INF00009ClassificationCode";
var parameters = window.top.page_parameters.GetParameters(URL);
var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00009", "INF00009");
var model = new viewModel();