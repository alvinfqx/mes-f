/* 
 * tab.js
 * tab插件
 * Tom 2016年10月20日20:36:45
 */

mf.tab = function (ulStr, tabContentStr, tabs) {
    if (!ulStr || ulStr.length <= 0)
        return false;

    if (!tabContentStr || tabContentStr.length <= 0)
        return false;

    var $ul = $(ulStr);
    if ($ul.length <= 0)
        return false;

    var $tabContent = $(tabContentStr);
    if ($tabContent.length <= 0)
        return false;

    if (!tabs && tabs.length <= 0)
        return false;

    $ul.addClass("nav nav-tabs");
    $tabContent.addClass("tab-content");

    $.each(tabs, function (i, tab) {
        var $li =
            $('<li>' +
                '<a data-toggle="tab" aria-expanded="false" href="#' + tab.title + '">' +
                    tab.title +
                '</a>' +
            '</li>');                
        $ul.append($li);

        var $content = $('<div role="tabpanel" class="tab-pane fade" style="width:100%;height:100%;" id="' + tab.title + '" >');
        var $iframe = $('<iframe id="iframe" style="width:100%;height:100%;border:none;"></iframe>');
        $tabContent.append(
            $content.append($iframe));

        $li.find("a").bind("click", function () {
            if (!$iframe.attr("src")) // 延迟加载
                $iframe.attr("src", tab.href);
        });
        
        if (tab.active) {
            $li.addClass("active");
            $content.addClass("in active");
            $iframe.attr("src", tab.href);
        }
    });

    return true;
};