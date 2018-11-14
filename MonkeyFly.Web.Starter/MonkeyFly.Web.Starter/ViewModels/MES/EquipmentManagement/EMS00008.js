var iframe_url = [
     "/MES/EquipmentManagement/EMS00008MaintenanceList",
    "/MES/EquipmentManagement/EMS00008MaintenanceItem",
    "/MES/EquipmentManagement/EMS00008MaintenanceType"
];
var loadData = function () {
    var tabs = $("#liTab li");
    var tabs_active;
    for (var i = 0; i < tabs.length; i++) {
        if ($(tabs[i]).attr('class') && $(tabs[i]).attr('class') == 'active') {
            tabs_active = i;
        }
    }
    $("iframe").hide();

    var iframe_show = $("iframe").eq(tabs_active);
    if (iframe_show && iframe_show.attr("src").length == 0) {
        iframe_show.attr("src", iframe_url[tabs_active]);
    }
    iframe_show.show();
}

var arrayWord = ["MaintenanceItem", "MaintenanceType", "MaintenanceList"];

words = arrayWord.join();

//var URL = "/MES/EquipmentManagement/EMS00008";
//var MID = window.top.page_parameters.GetParameters(URL);
//mf.toolBar("#container");
//var model = null;

//var viewModel = function () {

//    var self = this;
//    var table = null, ExportTotal, ID, Namearry = [], NamearryOne = [], NamearryTwo = [], ItemID;
//    //var User;

//    ////获取用户信息
//    //mf.ajax({
//    //    type: 'Get',
//    //    async: false,
//    //    url: "/MES/api/Util/GetUser",
//    //    data: {},
//    //    success: function (data) {
//    //        User = data;
//    //    }
//    //});

//    //查询
//    this.searchClick = function () {
//        table.goForwordSafely(function () {
//            table.loadData();
//        }, null);
//    };

//    // 刷新
//    this.refreshClick = function () {
//        if (!table)
//            return;
//        table.goForword(function () {
//            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
//            window.location.reload();
//        }, function () {
//            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
//            window.location.reload();
//        });
//    };
//}

//var arrayWord = ["InspectionNoStart"
   
//];

//words = arrayWord.join();

////初始页面数据，包括获取语系数据等
//initPage = function () {
//    model = new viewModel();
//};