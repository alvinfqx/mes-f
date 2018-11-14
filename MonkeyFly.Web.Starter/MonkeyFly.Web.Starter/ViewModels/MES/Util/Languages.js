var viewModel = function () {
    var self = this;

    var table;

    var columns = [];

    var LanguagesCodeList = [];

    var heightIframe;

    if (!parameters.height) {
        heightIframe = Number(110);
    }
    else {
        heightIframe = Number(parameters.height);        
    }
    
    mf.ajax({
        async: false,
        type: 'Get',
        url: "/MES/api/IntelligentParameter/GetLanguageList",
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                LanguagesCodeList[i] = { value: data.rows[i].ParameterID, text: data.rows[i].Code + "-" + data.rows[i].Name };
            }

            columns[0] = {
                field: 'LanguageCode',
                title: fields.LanguageCode,
                halign: 'center',
                align: 'center',
                width: "170",            
                rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(LanguagesCodeList)),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.LanguageCodeIsNull)
                ],
                require: true
            };

            for (var i = 0; i < parameters.columns.length; i++) {
                parameters.columns[i].rander = new mf.TextRander({ size: 14, title: "title" });
                if (parameters.columns[i].require) {
                    parameters.columns[i].checkers = [new mf.TextNotEmptyChecker(fields.LanguageContentIsNull)];
                }
                columns[i + 1] = parameters.columns[i];
            }

            columns[columns.length] = {
                field: 'Creator',
                title: fields.CreatePerson,
                halign: 'center',
                align: 'center',
                width: "110",
                rander: new mf.StaticValueRander()
            };

            columns[columns.length] = {
                field: 'CreateTime',
                title: fields.CreateDate,
                halign: 'center',
                align: 'center',
                width: "140",
                rander: new mf.TextTimeRander()
            };

            columns[columns.length] = {
                field: 'Modifier',
                title: fields.LastModifyPerson,
                halign: 'center',
                align: 'center',
                width: "110",
                rander: new mf.StaticValueRander()
            };

            columns[columns.length] = {
                field: 'ModifiedTime',
                title: fields.LastModifyDate,
                halign: 'center',
                align: 'center',
                width: "140",
                rander: new mf.TextTimeRander()
            };

            columns[columns.length] = {
                field: 'placeholder',
                title: '',
                rander: new mf.PlaceholderRander()
            };

        }
    });

    //新增
    this.addClick = function () {
        table.addRow();
    };

    //编辑
    this.editClick = function () {
        table.editRow();
    };

    //删除
    this.deleteClick = function () {
        table.deleteRow();
    };

    //确认
    this.comfirmClick = function () {
        table.save(function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, null, true);
    };

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
        window.location.href = parameters.parentUrl;
    };

    $(".J-search").html(parameters.rowData);
    table = new mf.Table( "#LanguagesTable",
            {
                undefinedText: "",
                height: window.innerHeight - heightIframe,
                uniqueId: "LanguageLibID",
                LastWidth: "29",
                IsSetTableWidth: true,
                columns: columns,
                fn_getData: function (pagination, searchData, success) {
                    mf.ajax({
                        type: "Get",
                        url: "/MES/api/IntelligentParameter/NCGetLanguageList",
                        data: { id: parameters.rowID, TableID: parameters.tableID },
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
                                msg.info(tips.Info, tips.LanguageCodeIsRepeat);
                                return;
                            }
                        }
                    }

                    for (var i = 0; i < saveData.inserted.length; i++) {
                        saveData.inserted[i].RowID = parameters.rowID;
                        saveData.inserted[i].TableID = parameters.tableID;
                    }

                    mf.ajax({
                        type: 'Post',
                        url: '/MES/api/IntelligentParameter/LanguageSave',
                        data: JSON.stringify(saveData),
                        async: false,
                        beforeSend: function () {
                            // 禁用按钮防止重复提交
                            $("#btn_comfirm").attr("disabled", true);
                        },
                        success: function (data) {
                            success(data);
                        },
                        complete: function () {
                            $("#btn_comfirm").removeAttr("disabled");
                        }
                    });
                }
            });
    
    table.loadData();

};

var parameters = window.top.page_parameters.GetParameters("/CommenLanguageModule");
var fields = GetField("/Data/tables/MES/Util/Languages", "Languages");
var model = new viewModel();