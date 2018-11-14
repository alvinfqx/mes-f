/*
 * EditChecker.js
 * Tom 2016年10月14日14:44:55
 */

mf.EditChecker = function (message) {

    // 检查列值 
    // message为检查不通过时返回的提醒信息
    this.check = function(value) {
        console.error("you have not override check");
    };
};

// 文字非空判断器
mf.TextNotEmptyChecker = function (message) {
    this.check = function (value) {
        if (!value || value.length <= 0)
            return message;
        return null;
    }
};
mf.TextNotEmptyChecker.prototype = new mf.EditChecker();