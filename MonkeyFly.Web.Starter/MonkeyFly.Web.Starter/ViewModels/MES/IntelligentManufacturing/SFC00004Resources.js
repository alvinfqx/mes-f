var Paparameters = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00004Resources");
var iframe_url = [
    "/MES/IntelligentManufacturing/SFC00004Equipment",
    "/MES/IntelligentManufacturing/SFC00004Artificial",
    "/MES/IntelligentManufacturing/SFC00004Other"
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

var arrayWord = ["Equipment", "Artificial", "Other", "Cancel"];

words = arrayWord.join();

// 返回
var backClick = function () {
    var parameter = Paparameters.Parameters;
    window.top.page_parameters.Caching.push({ URL: Paparameters.parentUrl, Parameters: parameter });
    window.location.href = Paparameters.parentUrl;
}