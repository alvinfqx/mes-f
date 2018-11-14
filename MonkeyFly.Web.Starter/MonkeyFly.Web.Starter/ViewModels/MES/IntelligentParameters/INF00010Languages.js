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
    var rowData =
        '<label>' + fields.ClassCode + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + parameters.row.Code + '"/>';
    rowData += '<label>' + fields.ItemName + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + (parameters.row.Name == null ? "" : parameters.row.Name) + '"/>';
    rowData += '<label>' + fields.ItemSpecifications + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + (parameters.row.Specification == null ? "" : parameters.row.Specification) + '"/>';
    rowData += '<label>' + fields.Remarks + '</label>';
    rowData += '<input type="text" class="search-input information" disabled="disabled" value="' + (parameters.row.Comments == null ? "" : parameters.row.Comments) + '"/>';

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
            window.location.href = URL;
        }, null);
    };

    //返回
    this.backClick = function () {
        window.location.href = URL;
    };

    $(".J-search").html(parameters.rowData);
    table = new mf.Table("#LanguagesTable", {
        uniqueId: "LanguageLibID",
        height: window.innerHeight - 130,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: "Get",
                url: '/MES/api/IntelligentParameter/Inf00010GetLanguageList',
                data: { id: parameters.row.ItemID },
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
                        msg.info(fields.info, fields.LanguageCodeIsRepeat);
                        return;
                    }
                }
            }
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].RowID = parameters.row.ItemID;

            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00010LanguageSave',
                data: JSON.stringify(saveData),
                async: false,
                success: function (data) {
                    success(data);
                }
            });

        },
        columns: [
               {
                   field: 'LanguageCode', title: fields.Language, align: "center", width: "100px",
                   rander: new mf.SelectRander(LanguagesCodeList),
                   checkers: [
                             new mf.TextNotEmptyChecker(fields.LanguageCodeIsNull)
                   ],
                   require: true
               },
               {
                    field: 'Name', title: fields.ItemName, require: true, align: "center", width: "120px",
                    rander: new mf.TextRander({ title: 'title', size: 15, maxLength: 120 }),
                    checkers: [
                        new mf.TextNotEmptyChecker(fields.ClassDescriptionIsNull)
                    ],
                },
               {
                   field: 'Specification', title: fields.ItemSpecifications, align: "center", width: "120px",
                   rander: new mf.TextRander({ size: 15, title: "title", maxLength: 60 }),

               },
               {
                   field: 'Comments', title: fields.Remarks, align: "center", width: "120px",
                   rander: new mf.TextRander({ size: 15, title: "title", maxLength: 120 }),
               },
               {
                   field: 'RowID', title: "", visible: false, width: "100px",
                   rander: new mf.DynamicValueRander(function () {
                       return parameters.rowID;
                   })
               },
                {
                    field: 'Creator', title: fields.CreatePerson, align: "center", width: '130px',
                    rander: new mf.StaticValueRander(),
                },
                {
                    field: 'CreateTime', title: fields.CreateDate, align: "center", width: '130px',
                    rander: new mf.TextTimeRander(),
                },
                {
                    field: 'Modifier', title: fields.LastModifyPerson, align: "center", width: '130px',
                    rander: new mf.StaticValueRander(),
                },
               {
                   field: 'ModifiedTime', title: fields.LastModifyDate, align: "center", width: '130px',
                   rander: new mf.TextTimeRander(),
               }
        ]
    });

    table.loadData();
};


var URL = "/MES/IntelligentParameters/INF00010";

var parameters = window.top.page_parameters.GetParameters(URL);

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00010", "INF00010");

var model = new viewModel();