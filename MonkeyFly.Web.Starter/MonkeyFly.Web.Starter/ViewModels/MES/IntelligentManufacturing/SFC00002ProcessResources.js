var URL = "/MES/IntelligentManufacturing/SFC00002ProcessResources";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var iframe_url = [
    "/MES/IntelligentManufacturing/SFC00002ProcessResourcesEquipment",
    "/MES/IntelligentManufacturing/SFC00002ProcessResourcesArtificial",
    "/MES/IntelligentManufacturing/SFC00002ProcessResourcesOther"
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
        URL: PageParameters.TopBackURL,
        Parameters: PageParameters.TopMID
    });
    window.location.href = PageParameters.TopBackURL;
}