var iframe_url = [
    "/MES/IntelligentParameters/INF00018WorkOrderMaster",
    "/MES/IntelligentParameters/INF00018ProcessMaster",
    "/MES/IntelligentParameters/INF00018WorkCenter"
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
        //var editingRow1 = $("#iframe1")[0].contentWindow.$("#INF00018WorkCenterTable").find("tbody").find(".editingRow");
        //var editingRow2 = $("#iframe2")[0].contentWindow.$("#INF00018ProcessTable").find("tbody").find(".editingRow");
        //var editingRow3 = $("#iframe3")[0].contentWindow.$("#INF00018WorkOrderTable").find("tbody").find(".editingRow");
        //if (editingRow1.length > 0 || editingRow2.length > 0 || editingRow3.length > 0) {

        //}
}

var arrayWord = ["WorkOrderMaster", "ProcessMaster", "WorkCenter"];

words = arrayWord.join();