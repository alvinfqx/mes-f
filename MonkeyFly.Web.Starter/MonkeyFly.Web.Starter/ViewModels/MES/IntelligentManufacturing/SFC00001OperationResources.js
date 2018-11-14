var URL = "/MES/IntelligentManufacturing/SFC00001OperationResources";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var iframe_url = [
    "/MES/IntelligentManufacturing/SFC00001OperationResourcesEquipment",
    "/MES/IntelligentManufacturing/SFC00001OperationResourcesArtificial",
    "/MES/IntelligentManufacturing/SFC00001OperationResourcesOther"
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

var arrayWord = ["Equipment", "Artificial", "Other", "Back"];

words = arrayWord.join();

// 返回
function backClick() {
    window.top.page_parameters.Caching.push({
        URL: PageParameters.BackURL,
        Parameters: PageParameters
    });
    window.location.href = PageParameters.BackURL;
}