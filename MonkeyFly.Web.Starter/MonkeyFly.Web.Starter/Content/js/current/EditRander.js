/*
 * EditRander.js
 * Tom 2016年10月14日12:49:46
 */

// Base class
mf.EditRander = function () {
    this.getHtml = function (field) {
        console.error("you have not override getHtml");
    };

    this.getValue = function ($col) {
        console.error("you have not override getValue");
    };

    // bootstrap table的列Formatter
    this.bootstrapTableFormatter = function (value, rowObj, index) {
        return null;
    };

    this.setValue = function ($col, value) {
        console.error("you have not override setValue");
    };
};

// input text
mf.TextRander = function (isRequired) {
    this.getHtml = function (field) {
        var html = "";
        if (isRequired) {
            html = "<span class='J-required'>*</span>";
        }
        html += '<input id="' + field + '" type="text"/>';
        return html;
    };

    this.getValue = function ($text) {
        return $text.val();
    };

    this.setValue = function ($text, value) {
        $text.val(value);
        return true;
    };

    this.bootstrapTableFormatter = function (value, rowObj, index) {
        return value;
    };
};
mf.TextRander.prototype = new mf.EditRander();

// select
mf.SelectRander = function (isRequired, options) {

    // options格式: [{value:"v1", text:"t1"},{value:"v2", text:"t2"}]
    this.options = options;

    this.getHtml = function (field) {
        var optionsHtml = "";

        $.each(options, function (i, option) {
            optionsHtml +=
                '<option value="' + option.value + '">' +
                    option.text +
                '</option>';
        });

        var html = "";

        if (isRequired) {
            html = "<span class='J-required'>*</span>";
        }

        html += '<select id=' + field + '>' + optionsHtml + '</select>';

        return html;
    };

    this.getValue = function ($select) {
        return $select.val();
    };

    this.setValue = function ($select, value) {
        $select.val(value);
        return true;
    };

    this.bootstrapTableFormatter = function (value, rowObj, index) {
        for (var i = 0, length = options.length; i < length; i++) {
            var option = options[i];
            if (option.value == value)
                return option.text;
        }

        return value;
    };
};
mf.SelectRander.prototype = new mf.EditRander();

// 单个checkbox
mf.SingleCheckBoxRander = function (option) {

    // option格式: {yes:"1",no:"0"}
    this.option = option;

    this.getHtml = function (field) {
        return '<input id="' + field + '" type="checkbox" />'
    };

    this.getValue = function ($checkbox) {
        return $checkbox.prop("checked") ? option.yes : option.no;
    };

    this.setValue = function ($checkbox, value) {
        if (value == option.yes)
            $checkbox.prop("checked", true);
        else if (value == option.no)
            $checkbox.removeAttr("checked");
        else {
            console.error("invaild SingleCheckBox value:" + value);
            return false;
        }

        return true;
    };

    this.bootstrapTableFormatter = function (value, rowObj, index) {
        if (value == option.yes)
            return '<img src="/Content/img/yes.png"/>';
        else if (value == option.no)
            return '<img src="/Content/img/no.png"/>';
        else {            
            return value;
        }   
    };
};

mf.SingleCheckBoxRander.prototype = new mf.EditRander();


