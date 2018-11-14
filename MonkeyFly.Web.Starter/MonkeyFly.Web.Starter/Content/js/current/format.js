mf.format = {};

mf.format.SpacialTime = function (value) {
    return mf.deal.formatDate(value, 'M/d/yyyy hh:mm:ss');
}

mf.format.Time = function (value) {
    return mf.deal.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
}

mf.format.SpacialDate = function (value) {
    return mf.deal.formatDate(value, 'M/d/yyyy');
}

mf.format.Date = function (value) {
    return mf.deal.formatDate(value, 'yyyy-MM-dd');
}

mf.format.toDate = function (value) {
    var date = value.split('T')[0];
    var time = value.split('T')[1];
    return new Date(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2], time.split(':')[0], time.split(':')[1], time.split(':')[2]);
}

//MFC获取参数
//根据多个参数类型码获取参数数据json
//TypeIDs     多参数类型码，用','分隔
//async       是否异步（可空）
//return      json数据
mf.format.getParameters = function (TypeIDs) {
    var result = null;

    mf.ajax({
        async: false,
        type: "GET",
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": TypeIDs },
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            result = data;
        }
    });

    return result;
}

//MES获取参数
//根据多个参数类型码获取参数数据json
//TypeIDs     多参数类型码，用','分隔
//async       是否异步（可空）
//return      json数据
mf.format.getMesParameters = function (TypeIDs) {
    var result = null;
    mf.ajax({
        async: false,
        type: "GET",
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": TypeIDs },
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {         
            result = data;
        }
    });

    return result;
}

/**
* 转换成boolean类型
* 用法:var b = utils.toBoolean(str);
*/
mf.format.toBoolean = function (value) {
    switch (String(value).toLowerCase()) {
        case "true":
        case "1":
        case "yes":
        case "y":
        case "on":
            return true;
        case "false":
        case "0":
        case "no":
        case "n":
        case "off":
            return false;
        default:
            return undefined;
    }
};
/**
* 格式化字符串
* 用法:
.formatString("{0}-{1}","a","b");
*/

mf.format.formatString = function () {
  
    for (var i = 1; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i - 1) + '\\}', '');
        arguments[0] = arguments[0].replace(exp, arguments[i]);
    }
    return arguments[0];
};


//格式化checkbox
mf.format.Checkbox = function (value) {
    var checked = mf.format.toBoolean(value);
    return mf.format.formatString('<img value={0} src="/Content/img/{1}"/>', checked, checked ? "yes.png" : "no.png");
};

//具有编辑状态的checkbox
mf.format.CheckboxForEdit = function (value) {
    var checked = mf.format.toBoolean(value);

    if (checked === undefined) {
        return value;
    }
    else {
        return mf.format.formatString('<img value={0} src="/Content/img/{1}"/>', checked, checked ? "yes.png" : "no.png");
    }
};

//省略内容
mf.format.Content = function (value) {
    var theValue = value.replace(/(\s*$)/g, "");
    if (theValue.length > 25) {       
       return theValue.substring(0, 25) + '...';
    }
    else {
        return value;
    }
}

