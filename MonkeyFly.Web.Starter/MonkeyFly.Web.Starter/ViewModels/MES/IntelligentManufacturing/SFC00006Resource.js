var URL = "/MES/IntelligentManufacturing/SFC00006Resource";
var Paparameters = window.top.page_parameters.GetParameters(URL);
var iframe_url = [
    "/MES/IntelligentManufacturing/SFC00006Equipment",
    "/MES/IntelligentManufacturing/SFC00006Artificial",
    "/MES/IntelligentManufacturing/SFC00006Other"
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

var arrayWord = ["Equipment", "Artificial", "Other", "Back", "Cancel"];

words = arrayWord.join();

// 返回
var ResourceBackClick = function () {
    var parameter = Paparameters.parentMID;
    window.top.page_parameters.Caching.push({ URL: Paparameters.parentUrl, Parameters: parameter });
    window.location.href = Paparameters.parentUrl;
}