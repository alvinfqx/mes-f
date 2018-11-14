mf.dialog = function (domStr, options) {

    //默认属性
    var defaults = {
        url: false,
        backdrop: 'static',
        onBeforeShow: function () { },
        onBehindShow: function () { },
        onBeforeClose: function () { },
        onBehindClose: function () { },
        onLoadURL: function () { },
        viewModel: function () {
            var self = this;
        }
    };

    var options = $.extend({}, defaults, options);

    //解除ko的绑定
    var cleanBind = function ($node) {
        $node.find("*").each(function () {
            $(this).unbind();
        });
        ko.cleanNode($node[0]);
    };

    //弹窗前事件
    $(domStr).off('show.bs.modal') && $(domStr).on('show.bs.modal', function (e) {               
        ko.applyBindings(new options.viewModel(), $(domStr)[0]); options.onBeforeShow(e);
    });

    //弹窗后事件
    $(domStr).off('shown.bs.modal') && $(domStr).on('shown.bs.modal', options.onBehindShow);

    //关窗前事件
    $(domStr).off('hide.bs.modal') && $(domStr).on('hide.bs.modal', options.onBeforeClose);

    //关窗后事件
    $(domStr).off('hidden.bs.modal') && $(domStr).on('hidden.bs.modal', function (e) {          
        options.onBehindClose(e); cleanBind($(domStr));  
    });

    //加载链接页面后事件
    $(domStr).off('loaded.bs.modal') && $(domStr).on('loaded.bs.modal', options.onLoadURL);     
    
    //设置弹窗属性
    $(domStr).modal({
        backdrop: options.backdrop,
        remote: options.url,
        show: true
    });
}