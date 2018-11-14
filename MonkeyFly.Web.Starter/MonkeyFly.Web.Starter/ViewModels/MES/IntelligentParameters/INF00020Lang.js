var viewModel = function () {
    var self = this;
    var LanguagesCodeList = [];

    mf.ajax({
        async: false,
        type: 'Get',
        url: "/MES/api/IntelligentParameter/GetLanguageList",
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                LanguagesCodeList[i] = { value: data.rows[i].ParameterID, text: data.rows[i].Code + "-" + data.rows[i].Name };
            }
        }
    });

    $(".J-search").html(parameters.rowData);

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


    //设置表格
    table = new mf.Table("#table", {
        uniqueId: "ParameterID",
        LastWidth: "140",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00020GetLanguageList',
                data: ({ id: parameters.rowID }),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].RowID = parameters.rowID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00020LanguageSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            if (parameters.Setting.substring(5, parameters.Setting.length) != "02012130000A9") {
                $row.find("#Value").attr('disabled', true);
            }
            else {
                $row.find("#Value").attr('disabled', false);
            }
        },
        focusEditField: "Name",
        height: window.innerHeight - 120,
        columns: [
            {
                field: 'LanguageCode', title: fields.LanguageCode, align: "center", width: "150",require: true,
                rander: new mf.SelectRander(LanguagesCodeList),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.LanguageCodeIsNull)
                ]
            },
            {
                field: 'Name', title: fields.ParameterName, align: "center", width: "160", require: true,
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.LanguageNameIsNull)
                ]
            },
            //{
            //    field: 'Value', title: fields.SetValue, align: "center", width: "120",
            //    rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
            //},
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 18, maxLength: 120, title: "title" }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "140",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
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

}

var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentParameters/INF00020Lang");

var arrayWord = [
    "LanguageCode", "ParameterName", "Remark", "SetValue", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Cancel", "Add", "Change", "Delete", "Comfirm", "LanguageCodeIsNull", "LanguageNameIsNull"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};