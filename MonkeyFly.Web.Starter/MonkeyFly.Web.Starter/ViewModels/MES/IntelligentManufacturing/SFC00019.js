var iframe_url = [
    "/MES/IntelligentManufacturing/SFC00019Product",
    "/MES/IntelligentManufacturing/SFC00019WorkCenter"
    
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

var arrayWord = [
    "Product", "WorkCenter"
];

words = arrayWord.join();