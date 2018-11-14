var viewModel = function () {
    var self = this;
    var useListArray = [];
    var params = mf.format.getMesParameters('019121300000E,019121300000D');
    var form = {
        Use: ko.observable(),
        UseArray: ko.observableArray()
    }
    ko.applyBindings(form);

    var useList = params.PT019121300000D;
    for (var i = 0; i < useList.length; i++) {       
        useListArray[i] = { value: useList[i].value, text: useList[i].Code + "-" + useList[i].text };       
    }
    form.UseArray(useListArray);

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
    // 编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };
    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
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
            '&nbsp;<label>' + fields.ParameterNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.ParameterName + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        if (data.Setting.substring(5, data.Setting.length) == "02012130000A9") {
            rowData = rowData + '&nbsp;&nbsp;<label>' + fields.SetValue + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Value == null ? "" : data.Value) + '" />';
        }

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            rowID: emouserID,
            rowData: rowData,
            Setting: data.Setting
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00020Lang", Parameters: parameters });
            window.location.href = '/MES/IntelligentParameters/INF00020Lang';
        }, null);
    };

    //设置表格
    table = new mf.Table("#table", {
        uniqueId: "ParameterID",
        LastWidth: "145",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Module = form.Use();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00020GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Module: Module }),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00020Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        focusEditField: "Value",
        height: window.innerHeight - 128,
        columns: [
            {
                field: 'ModuleValue', title: fields.ModuleGroup, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'Code', title: fields.ParameterNo, align: "center", width: "140", visible: false,
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ParameterName, align: "center", width: "180",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'SettingName', title: fields.SettingName, align: "center", width: "120", visible: false,
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'Value', title: fields.SetValue, align: "center", width: "140", 
                rander: new mf.MultiDisplayRander("Setting","Option",{ size: 10, maxLength: 30, title: "title" },{ yes:'True' , no:'False' }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "260",
                rander: new mf.TextRander({ size: 30, maxLength: 120, title: "title" }),
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

var URL = "/MES/IntelligentParameters/INF00020";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "ModuleGroup", "ParameterNo", "ParameterName", "SetValue", "Remark", "LastChangedBy", "LastChangedDate", "SettingName"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};