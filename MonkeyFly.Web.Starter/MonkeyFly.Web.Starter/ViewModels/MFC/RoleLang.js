var viewModel = function () {
    var self = this;

    var table;

    var columns = [];


    var LanguagesCodeList = [];

    var rowData = '<label>' + fields.Name + '</label><input type="text" class="search-input information" readonly="readonly" value="' + parameters.row.Name + '"/><label>'
                                + fields.Comments + '</label><input type="text" class="search-input information" readonly="readonly" value="' + parameters.row.Comments + '"/><label>'
                                ;

    $(".J-search").html(rowData);

    mf.ajax({
        async: false,
        type: 'Get',
        url: '/MES/api/IntelligentParameter/GetLanguageList',
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            var Listdata = data.rows;
            for (var i = 0; i < Listdata.length; i++) {
                LanguagesCodeList[i] = { value: Listdata[i].ParameterID, text: Listdata[i].Code + "-" + Listdata[i].Name};
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
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: parameters.MID });
            window.location.href = URL;
        }, null);
    };

    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: parameters.MID });
        window.location.href = URL;
    };

    $(".J-search").html(parameters.rowData);

    table = new mf.Table(
            "#LanguagesTable",
            {
                undefinedText: "",
                height: window.innerHeight - 103,
                uniqueId: "RoleID",
                dblclick_editable: false,
                columns: [{
                    field: 'LanguageCode', title: fields.LanguageCode, halign: 'center', align: 'center', width: "200",
              rander: new mf.SelectRander(LanguagesCodeList),
                    checkers: [
                        new mf.TextNotEmptyChecker(fields.LanguageCodeIsNull)
                    ],
                    require: true
                    },
                    {
                        field: 'Name', title: fields.Name, halign: 'center', align: 'center', width: "200",
                        rander: new mf.TextRander(),
                       
                    }, {
                        field: 'Description', title: fields.Comments, halign: 'center', align: 'center', width: "200",
                        rander: new mf.TextRander()
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
                    }],
                fn_getData: function (pagination, searchData, success) {
                    mf.ajax({
                        type: "Get",
                        url: "/MES/api/IntelligentParameter/Inf00004GetPlantLanguageList?id=" + parameters.row.RoleID,

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
                        saveData.inserted[i].RoleID = parameters.row.RoleID;
                    }

                    for (var i = 0; i < saveData.deleted.length; i++) {
                        saveData.deleted[i].rowid = parameters.row.RoleID;
                    }

                    mf.ajax({
                        type: 'Post',
                        url: '/MES/api/IntelligentParameter/Inf00004PlantLanguageSave',
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

var URL = "/Role";

var parameters = window.top.page_parameters.GetParameters(URL);

var  fields = GetField("/Data/tables/MFC/Role", "Role");

var model = new viewModel();