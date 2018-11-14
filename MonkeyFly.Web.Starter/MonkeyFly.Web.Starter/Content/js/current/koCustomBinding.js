/*
 * koCustomBinding.js
 * Tom 2016年10月31日17:42:58
 * ko的通用自定义绑定
 */

// 对iCheck封装的绑定,针对radio组
ko.bindingHandlers.iCheckRadio = {
    init: function (el, valueAccessor) {
        var observable = valueAccessor();
        $(el).on("ifChanged", function () {
            if (this.checked)
                observable($(el).val());
        });
    },

    update: function (el, valueAccessor) {
        var val = valueAccessor();
        if (val() == $(el).val()) {
            $(el).iCheck('check');
        } else {
            $(el).iCheck('uncheck');
        }
    }
};

// 对iCheck封装的绑定,针对单个checkbox是否选中
ko.bindingHandlers.iCheckCheckbox = {
    init: function (el, valueAccessor) {
        var observable = valueAccessor();//valueAccessor —JavaScript函数，通过valueAccessor()可以得到应用到这个绑定的model上的当前属性值。
        $(el).on("ifChanged", function () {
            if (this.checked)
                observable("Y");
            else
                observable("N");
        });
    },
    update: function (el, valueAccessor) {
        var val = valueAccessor();
        if (val() == "Y") {
            $(el).iCheck('check');
        } else {
            $(el).iCheck('uncheck');
        }
    }
};

// 如果select的options可以直接写在页面的话，用该绑定会方便点，因为
// 不用再用js动态创建options数组
ko.bindingHandlers.selected = {
    init: function (el, valueAccessor) {
        var observable = valueAccessor();
        var $el = $(el);
        $el.change(function () {
            observable($el.val());
        });
    },

    update: function (el, valueAccessor) {
        var val = valueAccessor();
        $(el).val(val());
    }
};

// 对datepicker封装的自定义绑定，用于获取日期，这里用到了Rander.js里的DateRander来
// 生成对象，所以要先引用Rander.js
ko.bindingHandlers.datepicker = {
    init: function (el, valueAccessor) {
        var observable = valueAccessor();
        var $el = $(el);
        var dateRander = new mf.DateRander();
        $el.append(
            dateRander.createEditingCell("", function () {
                observable(dateRander.getEditingCellValue($(this)));
            }));
    },

    update: function (el, valueAccessor) {
        var val = valueAccessor();
        var dateRander = new mf.DateRander();
        dateRander.setEditingCellValue($(el).find("input"), val());
    }
};

// 对datepicker封装的自定义绑定，用于获取日期
ko.bindingHandlers.datepickerInput = {
    init: function (el, valueAccessor) {
        var observable = valueAccessor();
        var $el = $(el);
        //$el.datepicker().setData();
        $el.datepicker().on("changeDate", function (e) {
            observable($(el).val());
        });
    },

    update: function (el, valueAccessor) {
        var val = valueAccessor();
        $(el).val(val());
    }
};

// 对iCheck封装的绑定,针对单个checkbox是否选中
ko.bindingHandlers.iCheckCheckboxONE = {
    init: function (el, valueAccessor) {
        var observable = valueAccessor();//valueAccessor —JavaScript函数，通过valueAccessor()可以得到应用到这个绑定的model上的当前属性值。
        $(el).on("ifChanged", function () {
            if (this.checked)
                observable(1);
            else
                observable(0);
        });
    },
    update: function (el, valueAccessor) {
        var val = valueAccessor();
        if (val() == 1) {
            $(el).iCheck('check');
        } else {
            $(el).iCheck('uncheck');
        }
    }
};
