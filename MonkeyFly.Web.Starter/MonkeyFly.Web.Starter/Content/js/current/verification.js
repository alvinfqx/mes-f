
mf.verification = {};

//请输入大于目前进度的数。
mf.verification.Progress = function (value, parm) {

    if(value > 0 && value > parm && value < 100)
    {
        return true;
    }
    
    return false;
};

//请输入正整数。
mf.verification.PositiveInteger = function (value) {
    return /^[1-9]\d*$/.test($.trim(value));
};

//自然数，请输入正整数(包含零)。
mf.verification.NaturalNumber = function (value) {
    return /^[1-9]\d*|0$/.test($.trim(value));
};

//项目编号，请输入10000到99999之内的正整数。
mf.verification.ProjectCode = function (value) {
    return /^[1-9]\d{4}$/.test($.trim(value));
};

//请输入0到100之内的正整数
mf.verification.NaturalNum = function (value) {
    return /(^\d$)|(^\d\d$)|(^100$)/.test($.trim(value));
};

//小数
mf.verification.Decimal = function (value, digit) {
    digit = digit || 2;
    var reg = '/^\\d+(\\.\\d{1,' + digit + '})?$/';
    $.fn.validatebox.defaults.rules.Decimal.message = '请输入数字(可带' + digit + '位小数)';
    return eval(reg).test($.trim(value));
};

//标签语言
mf.verification.LableLanguage = function (value) {
    return !(/\<.[^<>]*\>/.test($.trim(value)));
};

//小时格式(hh:mm)
mf.verification.Hour = function (value) {
    return /^(\d{1}|0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/.test($.trim(value));
};

//时间要大于现在
mf.verification.AfterNow = function (value) {
    return new Date(Date.parse(value.replace(/-/g, '\/'))) > new Date;
};

//时间要不大于现在
mf.verification.BeforeNow = function (value) {
    return new Date(Date.parse(value.replace(/-/g, '\/'))) <= new Date;
};

//手机号码验证
mf.verification.Mobile = function (value) {
    return /^1(3[0-9]|4[0-9]|5[0-9]|8[0-9]|7[0-9])\d{8}$/.test($.trim(value));
};

//身份证
mf.verification.IDcard = function (value) {
    return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($.trim(value));
};

//时间验证
mf.verification.CTime = function (value) {
    if ((/^20\d{2}-((0[1-9]{1})|(1[0-2]{1}))-((0[1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/.test($.trim(value)))) {
        return new Date();
    }
};

//图片
mf.verification.CImg = function (value) {
    return /\.(?:png|jpg|bmp|gif|jpeg)$/.test($.trim(value));
};

//合同
mf.verification.CContract = function (value) {
    return /^[-_a-zA-Z0-9]+$/.test($.trim(value));
};

//金额
mf.verification.MoneyNumber = function (value) {
    return /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test($.trim(value));
};

//email
mf.verification.Email = function (value) {
    return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test($.trim(value));
};

//数字
mf.verification.Number = function (value) {
    return /^\d*$/.test($.trim(value));
};