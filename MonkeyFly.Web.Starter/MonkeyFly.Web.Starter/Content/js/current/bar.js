mf.toolBar = function (domStr) {
    mf.ajax({
        type: "Get",
        url: mf.toolURL,
        data: { Url: URL, MID: MID },
        async: false,
        success: function (d) {
            d = window.top.mf.deal.language_conversion(d, "button");
            var html = '';
            for (var i = 0; i < d.length; i++) {
                html += ' <button id="btn_' + d[i].Code + '" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="left" title="' + d[i].Name + '" onclick="model.' + d[i].Code + 'Click()"><i class="fa ' + d[i].Icon + '"></i> ' + d[i].Name + '</button> ';
            }
            $(domStr).append(html);
        }
    });
}

mf.actionBar = function () {
    var html = '';

    mf.ajax({
        type: "Get",
        url: mf.actionURL,
        data: { Url: URL, MID: MID },
        async: false,
        success: function (d) {
            d = window.top.mf.deal.language_conversion(d, "action");
            for (var i = 0; i < d.length; i++) {
                html += ' <button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="left" title="' + d[i].Name + '" onclick="' + d[i].Code + 'Click()"><i class="fa ' + d[i].Icon + '"></i> ' + d[i].Name + '</button> ';
            }
        }
    });

    return html;
}

mf.actionButton = function () {
    var buttons = [];

    mf.ajax({
        type: "Get",
        url: mf.actionURL,
        data: { Url: URL, MID: MID },
        async: false,
        success: function (d) {
            buttons = window.top.mf.deal.language_conversion(d, "action");
        }
    });

    return buttons;
}