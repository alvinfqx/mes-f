var parameters = window.top.page_parameters.GetParameters("/MES/Util/CNCLanguages");
var model = null,
    columns = [],
    LanguagesCodeList = [];
var viewModel = function () {
    var self = this;

    columns[0] = {
        field: 'LanguageCode', title: fields.LanguageCode, halign: 'center', align: 'center', width: "150", require: true,
        rander: new mf.SelectRander(LanguagesCodeList),
        checkers: [new mf.TextNotEmptyChecker(fields.PleaseSelectLanguage)]
    };

    for (var i = 0; i < parameters.columns.length; i++) {
        parameters.columns[i].rander = new mf.TextRander({ size: 15, title: "title" });

        if (parameters.columns[i].require) {
            parameters.columns[i].checkers = [new mf.TextNotEmptyChecker(fields.PleaseFillLanguageContent)];
        }

        columns[i + 1] = parameters.columns[i];
    }

    columns[columns.length] = {
        field: 'Creator', title: fields.CreatedBy,
        halign: 'center', align: 'center', width: "100",
        rander: new mf.StaticValueRander()
    };

    columns[columns.length] = {
        field: 'CreateTime', title: fields.CreatedDate,
        halign: 'center', align: 'center', width: "130",
        rander: new mf.TextTimeRander()
    };

    columns[columns.length] = {
        field: 'Modifier', title: fields.LastChangedBy,
        halign: 'center', align: 'center', width: "110",
        rander: new mf.StaticValueRander()
    };

    columns[columns.length] = {
        field: 'ModifiedTime', title: fields.LastChangedDate,
        halign: 'center', align: 'center', width: "130",
        rander: new mf.TextTimeRander()
    };

    var table = new mf.Table("#LanguagesTable", {
        uniqueId: "LanguageLibID",
        undefinedText: "",
        height: window.innerHeight - 126,
        columns: columns,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/CNCGetLanguageList",
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
                        msg.info(fields.Prompt, fields.LanguageRepeats);
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
                url: '/MES/api/IntelligentParameter/CNCLanguageSave',
                data: JSON.stringify(saveData),
                async: false,
                success: function (data) {
                    success(data);
                }
            });
        }
    });

    table.loadData();

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

};

//语系词组
var arrayWord = parameters.arrayWord;

//拼接字符串
words = arrayWord.join();
console.log(LanguagesCodeList)

//初始化界面数据
initPage = function () {

    $(".J-search").html(parameters.rowData);

    mf.ajax({
        type: 'Get',
        url: "/MES/api/IntelligentParameter/GetLanguageList",
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                LanguagesCodeList[i] = { value: data.rows[i].ParameterID, text: data.rows[i].Code + "-" + data.rows[i].Name };
            }
            model = new viewModel();
        }
    });
};