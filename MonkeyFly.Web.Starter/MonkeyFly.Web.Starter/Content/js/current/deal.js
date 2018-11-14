/**
* 处理数据的库
*/

mf.deal = {};


/** 
* json格式转树状结构 
* @param   {json}      json数据 
* @param   {String}    id的字符串 
* @param   {String}    父id的字符串 
* @param   {String}    children的字符串 
* @return  {Array}     数组 
*/
mf.deal.toTreeData = function (a, idStr, pidStr, childrenStr) {
    var r = [],
        hash = {},
        len = (a || []).length;
    for (var i=0; i < len; i++) {
        hash[a[i][idStr]] = a[i];
    }
    for (var j=0; j < len; j++) {
        var aVal = a[j], hashVP = hash[aVal[pidStr]];
        if (hashVP) {
            !hashVP[childrenStr] && (hashVP[childrenStr] = []);
            hashVP[childrenStr].push(aVal); 
        } else {
            r.push(aVal);
        }
    }
    return r;
}

/**
* Author ：Duke
* 格式化年月显示方式
* 用法:mf.deal.formatMonth（date）";
*/
mf.deal.formatMonth = function (v) {
    var date = mf.deal.formatDate(v, "yyyy-MM-dd");
    date = date.slice(0,7);
    return date;
}
/**
* Author:Duke
* 格式化时间年月显示方式
* 用法:format="yyyy-MM";mf.deal.Date
* FireFox中Date.Parse()函数不能识别“2017/01”这种情况,只能识别("2017/01/01"以及“2017-01”)格式，。
*/
mf.deal.formatMonthDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else {
            d = new Date(Date.parse(v));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
        }
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


/**
* 格式化时间显示方式
* 用法:format="yyyy-MM-dd hh:mm:ss";
*/
mf.deal.formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else {
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }}
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/*
* 添加属性
* @param {Array}  对象数组
* @param {addPro} 需要添加的属性
* @param {copyPro}复制属性的值
* @return{pro}  是否有该属性
* @return{Array} 返回数组
*/
mf.deal.addCPropertyAndCopy = function (arr, addPro, copyPro, pro) {
    arr = arr || [];
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            //判断是否有children属性
            if (arr[i].hasOwnProperty(pro)) {//有pro属性
                //判断pro是否有子节点
                if (arr[i][pro] instanceof Array && arr[i][pro].length > 0) {//有子节点
                    //arr[i]['state'] = { "opened": true };
                    arr[i]['icon'] = 'fa fa-flag';
                    this.addCPropertyAndCopy(arr[i][pro],addPro,copyPro,pro)//递归
                }
            }
            else {
                //没有children属性，表示终止节点
                arr[i]['icon'] = 'fa fa-home';
            }
        }
    }
    return arr;
};

/**
* 过滤obj的属性
* @param {obj} 对象
* @param {props}  包含的属性
* @param {ignore} 是否忽略属性
* @return{obj} 处理后的对象
* 用法：
* 1）mf.deal.filterProperties(obj, ['Name as text']),替换对象的属性名；
* 2）mf.deal.filterProperties(obj, ['ID'], true),删除对象的属性。
*/
mf.deal.filterProperties = function (obj, props, ignore) {
    var ret;
    if (obj instanceof Array || Object.prototype.toString.call(obj) === "[object Array]") {
        ret = [];
        for (var k in obj) {
            ret.push(mf.deal.filterProperties(obj[k], props, ignore));
        }
    }
    else if (typeof obj === 'object') {
        ret = {};
        if (ignore) {
            var map = {};
            for (var k in props)
                map[props[k]] = true;

            for (var i in obj) {
                if (!map[i]) ret[i] = obj[i];
            }
        }
        else {
            for (var i in props) {
                var arr = props[i].split(" as ");
                ret[arr[1] || arr[0]] = obj[arr[0]];
            }
        }
    }
    else {
        ret = obj;
    }
    return ret;
};

/**
* 格式化字符串
* 用法:
.formatString("{0}-{1}","a","b");
*/
mf.deal.formatString = function () {
    for (var i = 1; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        arguments[0] = arguments[0].replace(exp, arguments[i]);
    }
    return arguments[0];
};

/**
* 遍历树函数
* @param {treeData} 树结构数据
* @param {eachHandler} 处理函数
*/
mf.deal.eachTreeRow = function (treeData, eachHandler) {
    for (var i in treeData) {
        if (eachHandler(treeData[i]) == false) break;
        if (treeData[i].children)
            mf.deal.eachTreeRow(treeData[i].children, eachHandler);
    }
};

/**
* 判断两个节点的关系，一个节点是不是另一个节点的子节点
* @return {isChild} boolean
*/
mf.deal.isInChild = function (treeData, pid, id) {

    var isChild = false;

    //遍历树节点
    mf.deal.eachTreeRow(treeData, function (curNode) {
        if (curNode.id == pid) {
            mf.deal.eachTreeRow([curNode], function (row) {
                if (row.id == id) {
                    isChild = true;
                    return false;
                }
            });
            return false;
        }
    });

    return isChild;
};

//转成时间
mf.deal.toDate = function (value) {
    var date = value.split('T')[0];
    var time = value.split('T')[1];
    return new Date(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2], time.split(':')[0], time.split(':')[1], time.split(':')[2]);
}

//为数据添加Icon字段（项目、阶段、任务专用）
mf.deal.addIconForPST = function (data) {
    data = data.rows || data;
    tagIcon = 'icon-tag_blue';
    projectIcon = 'icon-book';
    stageIcon = 'icon-book_open';
    taskIcon = 'icon-page_white_text';
    defaultIcon = '';
    for (var i = 0; i < data.length; i++) {
        switch (data[i].TID.substr(5, 3)) {
            case '020': data[i].iconCls = tagIcon; break;
            case '030': data[i].iconCls = projectIcon; break;
            case '031': data[i].iconCls = stageIcon; break;
            case '032': data[i].iconCls = taskIcon; break;
            default: data[i].iconCls = defaultIcon; break;
        }
        if (data[i].ChildernCount || data[i].TasksCount) {
            data[i].state = "closed";
        }
    }
    return data;
}

//复制属性
mf.deal.copyProperty = function (obj, sourcePropertyName, newPropertyName, overWrite) {
    if (obj instanceof Array || Object.prototype.toString.call(obj) === "[object Array]") {
        for (var k in obj)
            mf.deal.copyProperty(obj[k], sourcePropertyName, newPropertyName);
    }
    else if (typeof obj === 'object') {
        if (sourcePropertyName instanceof Array || Object.prototype.toString.call(sourcePropertyName) === "[object Array]") {
            for (var i in sourcePropertyName) {
                mf.deal.copyProperty(obj, sourcePropertyName[i], newPropertyName[i]);
            }
        }
        else if (typeof sourcePropertyName === 'string') {
            if ((obj[newPropertyName] && overWrite) || (!obj[newPropertyName]))
                obj[newPropertyName] = obj[sourcePropertyName];
        }
    }
    return obj;
};

//语系转换
mf.deal.language_conversion = function (data, code) {
    if (!language) return data;
    if (language == "en") return data;
    
    var url = "Data/options/" + code + "/" + code + "-" + language + ".js";
    $.ajax({
        url: url,
        async: false,
        contentType: 'application/json',
        success: function (items) {
            items = eval(items);
            var datastr = JSON.stringify(data);
            for (var i = 0; i < items.length; i++) {
                datastr = datastr.replace(new RegExp("\"Name\":\"" + items[i].name + "\"", "gm"), "\"Name\":\"" + items[i].value + "\"");
            }
            data = eval(datastr);
        }
    });

    return data;
}

//GUID
mf.deal.guid = function() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//Trim
mf.deal.Trim = function (str) {
    var value = "";

    if (str.replace(/(^\s*)|(\s*$)/g, "").length > 0)
        value = str.replace(/(^\s*)|(\s*$)/g, "");

    return value;
};

/**
* author Jack
* 将秒转换成小时，输出格式：HH:mm:ss
*/
mf.deal.HourConverter = function (value) {
    var  hour = 0, minute = 0, second = parseInt(value);
    if (second >= 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute >= 60) {
            hour = parseInt(minute / 60);
            minute = parseInt(minute % 60);
        }
    }

    second = (Array(2).join(0) + second).slice(-2);
    minute = (Array(2).join(0) + minute).slice(-2);

    return hour + ":" + minute + ":" + second;
}

/**
* author Jack
* 去除输入值的空格，判断值是否数字；不是数字会给default（默认值）
*/
mf.deal.ValueCheckNumber = function (value, defaultValue) {
    value = $.trim(value);
    if (!(value && value.length > 0)) {
        return defaultValue;
    }

    value = Number(value);
    if (isNaN(value)) {
        return defaultValue;
    }

    return value;
}


//补零算法
//@author Alvin 2017年3月9日10:58:56
mf.deal.pad = function (Source, Length) {
    var strTemp = "";
    for (var i = 1; i <= Length - Source.toString().length; i++) {
        strTemp += "0";
    }
    return strTemp + Source;
};


/**
 * @author Alvin 2017年7月6日15:29:21
 * @description 起始日期-结束日期  xxxx-xx-xx
 * @parameters $Start
 * @parameters $End
**/
mf.deal.initStartEndData = function ($Start, $End) {
    var lang = [];
    var langStr = "EN";
    if (language != 'en') {
        lang = language.split('-');
        langStr = 'zh-' + lang[1].toUpperCase();
    }
   
    $Start.datepicker({
        language: langStr,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $End.datepicker('setStartDate', startTime);
    });

    $End.datepicker({
        language: langStr,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var endTime = e.date;
        $Start.datepicker('setEndDate', endTime);
    });
};

/*
 * @author Jack 2017年7月10日16:57:59
 * @description 起始日期-结束日期,初始化设定；模仿initStartEndData
 * @parameters StartDateID
 * @parameters EndDateID
 * 将language.toUpperCase().replace("ZH", "zh")改成了language
**/
mf.deal.InitDateGroup = function (StartDateID, EndDateID) {
    if (!(StartDateID && StartDateID.length > 0)) {
        console.error("StartDateID is null");
        return;
    }

    if (!(EndDateID && EndDateID.length > 0)) {
        console.error("EndDateID is null");
        return;
    }

    var $Start = $("#" + StartDateID);
    var $End = $("#" + EndDateID);

    $Start.datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        $End.datepicker('setStartDate', e.date);
    });

    $End.datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        $Start.datepicker('setEndDate', e.date);
    });
};

/*
 * @author Jack 2017年7月12日09:37:16
 * @description 批量初始化日期
 * @parameters DateIDs
**/
mf.deal.InitDateList = function (DateIDs) {

    if (!(DateIDs && DateIDs.length > 0)) {
        console.error("InitDateList is error.");
        return;
    }

    var DateList = DateIDs.split(",");

    for (var i = 0; i < DateList.length; i++) {
        $("#"+DateList[i]).datepicker({
            language: language.toUpperCase().replace("ZH", "zh"),
            format: 'yyyy-mm-dd',
            autoclose: true,
            startView: 'month',
            todayBtn: "linked"
        });
    }
};

/*
 * @author Jack 2017年7月25日15:48:52
 * @description 计算时间
 * @parameters times HH:mm
**/
mf.deal.getTimeSpan = function (times) {
    if (!/^([01]\d|2[0123]):([0-5]\d)$/.test(times)) {
        console.error("times is error.");
        return 0;
    }
    var timeList = times.split(":");
    return Number(timeList[0]) * 3600 + Number(timeList[1]) * 60;
};

/*
 * @author Amanda 2017年9月4日17:25:55
 * @获取当前年月日时分秒
**/
mf.deal.InitHour = function () {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var initHour = mf.format.Date(date) + " " + hour +':'+ minute + ':' + second; 
    return initHour;
};
