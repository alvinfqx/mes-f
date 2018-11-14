var iframe_url = [
    "/MES/IntelligentParameters/INF00009ClassificationGroup",
    "/MES/IntelligentParameters/INF00009ClassificationCode"
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