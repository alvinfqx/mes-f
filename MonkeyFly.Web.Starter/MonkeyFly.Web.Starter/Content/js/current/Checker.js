/*
 * Checker.js
 * Tom 2016年10月14日14:44:55
 */

mf.Checker = function (message) {

    // 检查列值 
    // message为检查不通过时返回的提醒信息
    this.check = function(value) {
        console.error("you have not override check");
    };
};

// 文字非空判断器
mf.TextNotEmptyChecker = function (message) {
    this.check = function (value) {
        if (!(value && value.length > 0)) {
            return message;
        }
        return null;
    }
};
mf.TextNotEmptyChecker.prototype = new mf.Checker();

//判断只能输入数字和小数点
mf.IsPercentageChecker = function (message) {
    
    this.check = function (value) {
        var reg = '/^$|^\\d+(\\.\\d{1,20})?$/';
        if (!(eval(reg).test(Number(value)))) 
            return message;  
        return null;
    }
};
mf.IsPercentageChecker.prototype = new mf.Checker();


//判断0-100数字
mf.IsNumberChecker = function (message) {

    this.check = function (value) {
        var reg = '/(^\d$)|(^\d\d$)|(^100$)/';
        if (!(/(^\d$)|(^\d\d$)|(^100$)/.test($.trim(value))))
            return message;
        return null;
    }
};
mf.IsNumberChecker.prototype = new mf.Checker();

//判断是否只有数字
mf.IsOnlyNumberChecker = function (message) {

    this.check = function (value) {
        if (!/^\d*$/.test(value)) {
            return message;
        }
        return null;
    }
};
mf.IsOnlyNumberChecker.prototype = new mf.Checker();

//判断字符长度是否符合
mf.IsStringLengthChecker = function (message, strLength) {
    
    this.check = function (value) {
        var str = $.trim(value);
        if (strLength != str.length) {
            return message;
        }
        return null;
    }
};
mf.IsStringLengthChecker.prototype = new mf.Checker();

//Amanda
//判断数字是否是小数在0-99.99之间，不能大于2位小数且只能数字和点
mf.IsNunbertwoChecker = function (message, messageone, messagetwo) {

    this.check = function (value) {

        var str = $.trim(value);

        if (str < 0 || str > 99.99) {
            return message;
        }

        var point = str.indexOf(".");

        if (point > 0) {
            floatnum = str.toString().split(".")[1].length;
        }
        else {
            floatnum = 0;
        }
        if (floatnum > 2) {
            return messageone;
        }

        var reg = '/^$|^\\d+(\\.\\d{1,20})?$/';
        if (!(eval(reg).test(Number(value)))) {
            return messagetwo;
        }
            

        return null;
    }
};
mf.IsNunbertwoChecker.prototype = new mf.Checker();

//判断数字是否为空或与某值相等
mf.TextNotRangeChecker = function (message, Vvalue) {

    this.check = function (value) {

        var str = $.trim(value);
        
        if (str == Vvalue || str == "") {
            return message;
        }

        return null;
    }
};
mf.TextNotRangeChecker.prototype = new mf.Checker();

//2017-3-6
//Amanda
//判断输入值是否与设置位数符合，且只能数字和点
mf.IsNunberbitsChecker = function (messageint, messagedec, message, Lenint, Lendec) {

    this.check = function (value) {

        var rateInt, rateDec, ratePoint;

        var rate = $.trim(value);

        var reg = '/^$|^\\d+(\\.\\d{1,20})?$/';
        if (!(eval(reg).test(Number(value)))) {
            return message;
        }
        if (rate != "") {
            rateInt = rate.toString().split(".")[0].length;
            ratePoint = rate.indexOf(".");
            if (ratePoint > 0) {
                rateDec = rate.toString().split(".")[1].length;
            }
            else {
                rateDec = 0;
            }
            if (rateDec != Lendec) {
                return messagedec;
            }
            if (rateInt != Lenint) {
                return messageint;
            }
        }

        return null;
    }
};
mf.IsNunberbitsChecker.prototype = new mf.Checker();

//Amanda
//判断值是否大于0小于等于100
mf.IsNunberTruerangeChecker = function (message) {

    this.check = function (value) {

        var str = $.trim(value);

        if (str < 0 || str > 100 || str == 0) {
            return message;
        }

        return null;
    }
};
mf.IsNunberTruerangeChecker.prototype = new mf.Checker();

//Amanda
//判断值是否0<=X<100.
mf.IsTruerangeChecker = function (message) {

    this.check = function (value) {

        var str = $.trim(value);

        if (str < 0 || str > 100 || str == 100) {
            return message;
        }

        return null;
    }
};
mf.IsTruerangeChecker.prototype = new mf.Checker();

//2017-3-15
//Amanda
//判断输入值只能四位数，限定只能数字不能字母和点
mf.IsSequenceChecker = function (message) {

    this.check = function (value) {

        var rate = $.trim(value);

        var reg = '/^$|^\\d+(\\d{1,20})?$/';
        if (!(eval(reg).test(Number(value)))) {
            return message;
        }

        if (rate != "") {
            var rateInt = rate.toString().length;
            if (rateInt != 4) {
                return message;
            }
            //alert(rateInt);
        }

        return null;
    }
};
mf.IsSequenceChecker.prototype = new mf.Checker();

//2017-5-15
//Jack
//判断值是否为大于0的数值
mf.IsPositiveNumberChecker = function (message) {
    this.check = function (value) {
        value = Number($.trim(value));

        if (isNaN(value)) {
            return message;
        }
        else if (value <= 0) {
            return message;
        }
        
        return null;
    }
};
mf.IsPositiveNumberChecker.prototype = new mf.Checker();

//2017-5-25
//Jack
//判断值是否为非负数的数值
mf.IsNonNegativeNumberChecker = function (message) {
    this.check = function (value) {
        value = Number($.trim(value));

        if (isNaN(value)) {
            return message;
        }
        else if (value < 0) {
            return message;
        }

        return null;
    }
};
mf.IsNonNegativeNumberChecker.prototype = new mf.Checker();

//2017-5-26
//Jack
//判断值是否为Email
mf.IsEmailChecker = function (message) {
    this.check = function (value) {
        value = $.trim(value);

        if (value && value.length > 0) {
            if (!(/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(value))) {
                return message;
            }
        }

        return null;
    }
};
mf.IsEmailChecker.prototype = new mf.Checker();

//2017-5-26
//Jack
//可配置的检验器
mf.ConfigurableChecker = function (message, fn_checking) {
    this.check = function (value, $row) {
        value = $.trim(value);
        if (typeof fn_checking == 'function') {
            if (fn_checking(value, $row)) {
                return message;
            }
            return null;
        }
        return "fn_checking is error";
    }
};
mf.ConfigurableChecker.prototype = new mf.Checker();

//2017-6-6
//Jack
//判断值是否超过整数、小数位数
mf.IsOverDecimalChecker = function (messageInt, messageDec, message, lenInt, lenDec) {
    this.check = function (value) {
        value = $.trim(value);
        if (value.length == 0) {
            return null;
        }

        var rate = Number(value);
        if (isNaN(rate)) {
            return message;
        }

        rate = value.split(".");

        var rateInt = rate[0].length;
        if (rateInt > lenInt) {
            return messageInt;
        }

        if (rate.length > 1) {
            var rateDec = rate[1].length;
            if (rateDec > lenDec) {
                return messageDec;
            }
        }
        
        return null;
    }
};
mf.IsOverDecimalChecker.prototype = new mf.Checker();


//判断 value < 2
mf.IsGreaterThanTwoChecker = function (message) {
    this.check = function (value) {
        var Num = $.trim(Number(value));
        if (Num && Num < 2) {
            return message;
        }
        return null;
    }
};
mf.IsGreaterThanTwoChecker.prototype = new mf.Checker();

//2017-7-14
//Amanda
//判断只可输入时分秒（hh:mm:ss）
mf.IsOnlyTimeChecker = function (message) {

    this.check = function (value) {
        if (value && value.length > 0) {      
            if (value == 0) {
                return null;
            }

            if (!/^(\d*):([0-5]{0,1}[0-9]{1}):([0-5]{0,1}[0-9]{1})$/.test(value)) {
                        return message;
           }
        }
        
        return null;
    }
};
mf.IsOnlyTimeChecker.prototype = new mf.Checker();

//2017-07-25
//Jack
//是否时分，HH:mm
mf.IsHoursChecker = function (message) {
    this.check = function (value) {
        if (value && value.length > 0) {
            if (value == 0) {
                return null;
            }
            if (!/^([01]\d|2[0123]):([0-5]\d)$/.test(value)) {
                return message;
            }
        }
        return null;
    }
};
mf.IsHoursChecker.prototype = new mf.Checker();
//2017-08-02
//Mars
//是否英數字
mf.IsLatterOrNumberChecker = function (message) {
    this.check = function (value) {
        if (value && value.length > 0) {
            if (value == 0) {
                return null;
            }
            if (!/^[a-zA-Z0-9*]+$/.test(value)) {
                return message;
            }
        }
        return null;
    }
};
mf.IsLatterOrNumberChecker.prototype = new mf.Checker();


//2017-8-23
//Johnny
//判断只可输入时分秒（hh:mm:ss）或者负数的时分秒
mf.IsOnlyTimeChecker2 = function (message) {

    this.check = function (value) {
        if (value && value.length > 0) {
            if (value == 0) {
                return null;
            }

            if (!/^(-?)(\d*):([0-5]{0,1}[0-9]{1}):([0-5]{0,1}[0-9]{1})$/.test(value)) {
                return message;
            }
        }

        return null;
    }
};
mf.IsOnlyTimeChecker2.prototype = new mf.Checker();

//2017-9-26
//Johnny
//判断是否未输入（值与默认值一样）
mf.IsNotChange = function (message, defaultValue) {

    this.check = function (value) {
        if (!defaultValue) {
            if (typeof (defaultValue) == typeof (value)) {
                return message;
            }
        } else {
            if (defaultValue === value) {
                return message;
            }
        }
        return null;
    }
};
mf.IsNotChange.prototype = new mf.Checker();

//检查结束日期是否大于起始日期
/*
*param: message :要弹窗信息
* firstDate: 起始日期
*            格式 : 2017-09-29
*/
mf.IsLastDateMoreThanFirstDate = function (message, firstDate) {
    this.check = function (value) {
        var end = firstDate,
           start = value;
        var arr1 = end.split("-"),
            arr2 = start.split("-");

        var err = false;

        if (Number(arr1[0]) >= Number(arr2[0])) {//年
            if (Number(arr1[1]) >= Number(arr2[1])) {//Month月
                if (Number(arr1[2]) >= Number(arr2[2])) {//日
                } else {
                    err = true;
                }
            } else {
                err = true;
            }
        } else {
            err = true;
        }
        if (err) {
            return message;
        }
    }  
}

mf.IsLastDateMoreThanFirstDate.prototype = new mf.Checker();


