var iframe_url = [
    "/MES/IntelligentParameters/INF00001Site",
    "/MES/IntelligentParameters/INF00001PlantArea"
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

    //if (tabs_active == 0 || tabs_active == 1) {
    //    iframe_show.attr("src", iframe_url[tabs_active]);
    //}
    if (iframe_show && iframe_show.attr("src").length == 0) {
        iframe_show.attr("src", iframe_url[tabs_active]);
    }

    iframe_show.show();
}