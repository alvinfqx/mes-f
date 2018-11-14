
var URL = "/MES/IntelligentParameters/SCP00004";

var MID = window.top.page_parameters.GetParameters(URL);

var fields = GetField("/Data/tables/MES/IntelligentParameters/SCP00004", "SCP00004");

mf.toolBar("#container");

//时间插件翻译
function lang() {
    var lang = [];
    var Lang;
    if (language.length > 2) {
        lang = language.split('-');
        var Lang = lang[0] + '-' + lang[1].toString().toUpperCase();
    }
    else {
        Lang = "en";
    }
    return Lang;
}

var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal;
    var Lang = lang();

    //alert(language);    
    //alert(Lang);

    //时间控件绑定
    $("#startDate").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        language: Lang,
    });
    //    .on('changeDate', function (e) {
    //    var startTime = e.date;
    //    $('#startDate').datetimepicker('setStartDate', startTime);
    //});

    $("#endDate").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        language: Lang,
    });
    //    .on('changeDate', function (e) {
    //    var endTime = e.date;
    //    $('#endDate').datetimepicker('setEndDate', endTime);
    //});

    //日志管理表
    table = new mf.Table("#logTable", {
        uniqueId: "ID",
        paginationBar: new mf.PaginationBar("#paginationBar"),
        focusField: "Account",
        IsSetTableWidth: true,
        LastWidth: "130",
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'Account', title: fields.Account, align: "center", width: "134",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "135",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Position', title: fields.Position, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Type', title: fields.Type, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Request', title: fields.Target, align: "center", width: "175",
                rander: new mf.StaticValueRander({ title: "title" })
            },            
            {
                field: 'Result', title: fields.Message, align: "center", width: "175",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreateTime, align: "center",
                rander: new mf.TextTimeRander()
            }
        ],
        fn_getData: function (pagination,searchData, success) {
            searchData.StartTime = $("#startDate").val();
            searchData.EndTime = $("#endDate").val();
            mf.ajax({
                type: 'Get',
                url: "/MES/api/IntelligentParameter/SCP00004List",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            //mf.ajax({
            //    type: 'Post',
            //    url: "/MES/api/IntelligentParameter/SCP00004Save",
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        success(data);
            //    }
            //});
        }
    });

    if(!table){
        console.error("create table faild");
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
            table.loadData();
        }, null);
    };
};
var model = new viewModel();


