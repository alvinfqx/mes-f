var URL = "/MES/IntelligentManufacturing/SFC00017";
var Parameters = window.top.page_parameters.GetParameters(URL);
var MID = Parameters.MID;
var viewModel = function () {

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00017", Parameters: Parameters.MID });
        window.location.href = "/MES/IntelligentManufacturing/SFC00017";
    };

    //打印
    this.printClick = function () {
        $(".J-toolbar").hide();
        $(".J-content").addClass("contentBorder");
        window.print();
        $(".J-content").removeClass("contentBorder");
        $(".J-toolbar").show();
    };

    $(".title1").text(fields.DirectedrateAnalysis);
    $("#items").html('<span class="title3">' + fields.DateLable + '：' + mf.format.Date(new Date()) + '</span><span class="title3">' + fields.UserLable + '：' + window.top.username + '</span><span class="title3">' + fields.PageLable + '：' + Parameters.page + "/" + Parameters.total + '</span>');

    //设置表格
    var table = new mf.Table("#PrintTable", {
        uniqueId: "ParameterID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            searchData = Parameters.PrintSearchData;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00017GetList',
                data: $.extend({ page: Parameters.page, rows: Parameters.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Date', title: fields.Modate, require: true, align: "center", width: "120",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'Code', title: fields.Part, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "190",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.Specification, require: true, align: "center", width: "190",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ThroughRate', title: fields.ThroughRate, require: true, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();


}

var URL = "/MES/IntelligentManufacturing/SFC00017Print";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "StartOrderNumber", "EndOrderNumber", "StartItemCode", "EndItemCode", "MoNo", "Modate", "Part", "GoodsName",
    "Specification", "ThroughRate", "Details", "MoSeq", "Status", "MoNoMasterFile", "Search", "Cancel", "Comfirm",
    "ItemNo", "SupplyType", "ItemMasterFile", "ProcessSequence", "ProcessNo", "ProcessDescription", "PreTransferQty",
    "BadNumber", "Yield", "OrderStraightforwardDetails", "DateLable", "PageLable", "UserLable", "Back", "Print",
    "DirectedrateAnalysis"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};