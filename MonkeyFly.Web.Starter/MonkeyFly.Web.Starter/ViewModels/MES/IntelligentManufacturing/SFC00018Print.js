var URL = "/MES/IntelligentManufacturing/SFC00018";
var Parameters = window.top.page_parameters.GetParameters(URL);
var MID = Parameters.MID;
var viewModel = function () {

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00018", Parameters: Parameters.MID });
        window.location.href = "/MES/IntelligentManufacturing/SFC00018";
    };

    //打印
    this.printClick = function () {
        $(".J-toolbar").hide();
        $(".J-content").addClass("contentBorder");
        window.print();
        $(".J-content").removeClass("contentBorder");
        $(".J-toolbar").show();
    };

    $(".title1").text(fields.PrintedMaterialConsumptionAnalysis);
    $("#items").html('<span class="title3">' + fields.DateLable + '：' + mf.format.Date(new Date()) + '</span><span class="title3">' + fields.UserLable + '：' + window.top.username + '</span><span class="title3">' + fields.PageLable + '：' + Parameters.page + "/" + Parameters.total + '</span>');

    //设置表格
    var table = new mf.Table("#PrintTable", {
        uniqueId: "ParameterID",
        editable: false,

        fn_getData: function (pagination, searchData, success) {

            searchData = Parameters.PrintSearchData;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00018GetList',
                data: $.extend({ page: Parameters.page, rows: Parameters.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        LastWidth: "140",
        IsSetTableWidth: true,
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.ChildPartNo, require: true, align: "center", width: "120",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UseQuantity', title: fields.UsageAmount, align: "center", width: "70",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ActualQuantity', title: fields.ActualDosage, require: true, align: "center", width: "70",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DifferenceNum', title: fields.DifferenceNumber, require: true, align: "center", width: "70",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ChildGoodsName, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.PartsSpecification, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemCode', title: fields.ProductCode, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Quantity', title: fields.ProductionNum, require: true, align: "center", width: "70",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemName', title: fields.ProductNames, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemSpecification', title: fields.ProductSpecification, require: true, align: "center",
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

var URL = "/MES/IntelligentManufacturing/SFC00018Print";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "StartOrderNumber", "EndOrderNumber", "StartSingleDate", "EndSingleDate", "MoNo", "Modate", "Part", "GoodsName",
    "Specification", "MoSeq", "Status", "MoNoMasterFile", "Search", "Cancel", "Comfirm", "ProductSpecification",
    "ItemNo", "SupplyType", "ItemMasterFile", "ProcessSequence", "ProcessNo", "ProcessDescription", "PreTransferQty",
    "BadNumber", "Yield", "OrderStraightforwardDetails", "info", "NoRecord", "ProductNames", "ProductionNum", "ProductCode",
    "PartsSpecification", "ChildGoodsName", "DifferenceNumber", "ActualDosage", "UsageAmount", "ProcessNo", "ChildPartNo",
    "DateLable", "PageLable", "UserLable", "Back", "Print", "PrintedMaterialConsumptionAnalysis"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};