var iframe_url = [
    "/MES/EquipmentManagement/EMS00001EquipmentMasterFile",
    "/MES/EquipmentManagement/EMS00001EquipmentItemMaintenance",
    "/MES/EquipmentManagement/EMS00001EquipmentPicture",
    "/MES/EquipmentManagement/EMS00001ConditionSet"
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

var arrayWord = ["EquipmentMasterFile", "EquipmentItemMaintenance", "EquipmentPicture", "ConditionSet"];

words = arrayWord.join();