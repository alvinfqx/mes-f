var mf = {
    systemID: "10039",
    token: token,
    domain: "https://202api.monkeyfly.net",
    toolURL: '/MES/api/Bar/ARenderToolbar',
    actionURL: '/MES/api/Bar/ARenderActionbar',
};

mf.ajax = function (options) {

    options = $.extend({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',     
        showLoading: true,
        data: {}
    }, options);

    if (typeof options.data == "string") {
        options.data = JSON.parse(options.data);
        options.data.Token = window.top.mf.token;
        options.data = JSON.stringify(options.data);

    }
    else {
        options.data.Token = window.top.mf.token;
    }

    options.url = mf.domain + options.url;
    var _success = options.success;
    options.success = function (data, textStatus) {
        $("#ajax_tip").remove();
        if (data && data.status == "403") {
            window.top.logout && window.top.logout();
        }
        _success(data, textStatus);
    };
    
    var _error = options.error;
    options.error = function (data) {
        var textTips;
        if (language == "zh-tw") {
            textTips = "網絡異常";
        }
        else if (language == "zh-cn") {
            textTips = "网络异常";
        }
        else {
            textTips = "Network Anomaly";
        }
        $("#ajax_tip span").text(textTips);
        setTimeout(function () {
            $("#ajax_tip").remove();
        }, "5000")       
        _error && _error(data);
    };

    var _beforeSend = options.beforeSend;
    options.beforeSend = function (data) {
        // 禁用按钮防止重复提交
        var w = window.innerWidth;
        var h = window.innerHeight;
        var h2 = h / 2;
        if (options.type.toLowerCase() == "post") {
            $("body").append("<div id='ajax_tip' style='z-index: 99999; opacity: 0.5; background-color: #000; width:" + w + "px;height:" + h + "px;position: absolute;top: 0; left: 0; text-align:center;'>" +
            "<div style='margin-top:" + h2 + "px;'><span style='font-size:22px;'>Loading..</span></div></div>");
        }
        _beforeSend && _beforeSend();
    };

    $.ajax(options);
};

/**
 * @callback mf.ajax~SuccessCallback
 * @param {Object} data - 返回的数据
 */

/**
 * 发送http get请求
 * @param {string} url - 接口相对路径
 * @param {Object} data - 请求数据
 * @param {mf.ajax~SuccessCallback} success - 请求成功回调
 * @author Tom
 * @todo 检查输入参数合法性
 * @example 
 * mf.httpGet("/EMO/api/BaseInformation/Sys10150GetList", {name:"TEST"}, function (data) {
      console.log("get data success");
      console.dir(data);
   })
 */
mf.httpGet = function (url, data, success) {
    if (data == null)
        data = {};

    mf.ajax({
        url: url,
        type: "GET",
        data: data,
        async: false,
        success: success

    });
};

/**
 * 发送http post请求
 * @param {string} url - 接口相对路径
 * @param {Object} data - 请求数据
 * @param {mf.ajax~SuccessCallback} success - 请求成功回调
 * @author Tom
 * @todo 检查输入参数合法性
 * @example 
 * mf.httpPost("/EMO/api/BaseInformation/Sys10150Save", {name:"TEST"}, function (data) {
      console.log("post data success");
      console.dir(data);
   })
 */
mf.httpPost = function (url, data, success) {
    mf.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        success: success
    });
};
