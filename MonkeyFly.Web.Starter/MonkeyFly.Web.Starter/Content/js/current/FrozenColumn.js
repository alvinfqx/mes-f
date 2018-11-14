/**
 * FrozenColumn.js
 * @author Tom
 * @class mf.FrozenColumn
 * @classdesc 冻结列类
 * @param {string} domStr - 列表ID
 */
mf.FrozenColumn = function (domStr) {
    if (!(domStr && domStr.length > 0)) {
        console.log("DomStr is undefine.");
        return;
    }

    $(domStr).parent().parent().scroll(function () {
        var left = $(this).scrollLeft() - 1;
        var $head_tr = $(this).find(".mf-head-table").find("tr");
        var $tr = $(domStr).find("tr");
        $head_tr.each(function (index) {
            $(this).children().eq(0).css({
                "box-shadow": "1px 1px #e7eaec",
                "background-color": "white",
                "padding-left": "3px",
                "position": "relative",
                "top": "0px",
                "left": left
            });
            $(this).children().eq(1).css({
                "box-shadow": "1px 1px #e7eaec",
                "background-color": "white",
                "padding-left": "3px",
                "position": "relative",
                "top": "0px",
                "left": left
            });
        });
        $tr.each(function (index) {
            $(this).children().eq(0).css({
                "box-shadow": "1px 1px #e7eaec",
                "background-color": "white",
                "padding-left": "3px",
                "position": "relative",
                "top": "0px",
                "left": left
            });
            $(this).children().eq(1).css({
                "box-shadow": "1px 1px #e7eaec",
                "background-color": "white",
                "padding-left": "3px",
                "position": "relative",
                "top": "0px",
                "left": left
            });
        });
    });
};