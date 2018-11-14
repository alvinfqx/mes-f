var viewModel = function () {
    var self = this;

    var table;

    var columns = [], Languagearry = [];

    var LanguagesCodeList = [];

    var heightIframe;

    if (!parameters.height) {
        heightIframe = Number(100);
    }
    else {
        heightIframe = Number(parameters.height);
    }

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentParameter/GetLanguageList",
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            var Listdata = data.rows;
            for (var i = 0; i < Listdata.length; i++) {
                Languagearry[i] = { value: Listdata[i].ParameterID, text: Listdata[i].Code + "-" + Listdata[i].Name }
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
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, null, true);
    };

    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
        window.location.href = parameters.parentUrl;
    };
    $(".J-search").html(parameters.rowData);

    table = new mf.Table("#LanguagesTable", {
        uniqueId: "LanguageLibID",
        dblclick_editable:false,
        fn_getData: function (pagination, searchData, success) {
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentParameter/Inf00007GetLanguageList',
                    data: ({ id: parameters.rowID }),
                    success: function (data) {
                        success(data);
                    }
                });

        },
        fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00007LanguageSave',
                    data: JSON.stringify(saveData),
                    async: false,
                    success: function (data) {
                        console.log(data);
                        success(data);
                    }
                });
        },
        focusField: "LanguageCode",
        height: window.innerHeight - 143,
        columns: [
            {
                field: 'LanguageCode', title: fields.Language, align: "center", width: "250",
                rander: new mf.SelectRander(Languagearry),
            },
            {
                field: 'Name', title: fields.Name, require: true, align: "center", width: "300",
                rander: new mf.TextRander({ size: 45 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DescriptionIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remarks, require: true, align: "center", width: "300",
                rander: new mf.TextRander({ size: 45 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DescriptionIsNull)
                ],
            },
            {
                field: 'RowID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return parameters.rowID;
                })
            },
            {
                field: 'IsDefault', title: fields.Public, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.yes }, { value: 0, text: fields.no }]),
            }
        ]
    });

    table.loadData();
};

var parameters = window.top.page_parameters.GetParameters("/INF00007Language");

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00007", "INF00007");

var model = new viewModel();