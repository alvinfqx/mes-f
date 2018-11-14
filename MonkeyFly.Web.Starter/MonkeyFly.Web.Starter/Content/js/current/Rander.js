/*
 * Rander.js
 * Tom 2016年10月14日12:49:46
 */

// Base class
mf.Rander = function () {
    this.createCell = function (field, value) {
        console.error("you have not override createCell");
    };

    this.createEditingCell = function (field, fn_onChange) {
        console.error("you have not override createEditingCell");
    };

    this.getEditingCellValue = function ($cell) {
        console.error("you have not override getEditingCellValue");
    };

    this.setEditingCellValue = function ($cell, value) {
        console.error("you have not override setEditingCellValue");
    };

    this.createAddingCell = function (field, fn_onChange) {
        return this.createEditingCell(field, fn_onChange);
    };

    this.getAddingCellValue = function ($cell) {
        return this.getEditingCellValue($cell);
    };

    this.setAddingCellValue = function ($cell, value) {
        return this.setEditingCellValue($cell, value);
    };

    this.createSearchCell = function (field, fn_onChange) {
        return this.createEditingCell(field, fn_onChange);
    };

    this.getSearchCellValue = function ($cell) {
        return this.getEditingCellValue($cell);
    };

    this.getRelateToData = function ($cell) {
        return this.getEditingCellValue($cell);
    }
};
mf.Rander.Lang = {};

// input text
mf.TextRander = function (option, fieldOne) {

    // option maxLength size
    this.option = option;
    this.createCell = function (field, value, rowData) {
        var $text = $('<span>');

        if (value !== null) {
            $text.text(value);
        }

        if (option) {
            for (var key in option) {
                if (key == "id") {
                    continue;
                }
                if (key == "color") {
                    if (rowData[fieldOne]) {
                        $text.css(key, option[key]);
                    }
                    continue;
                }
                if (key == "title") {
                    $text.attr(key, value);
                }
                else {
                    $text.attr(key, option[key]);
                }
            }
        }

        return $text;
    };

    this.createEditingCell = function (field, fn_onChange) {

        var $text = $('<input id="' + field + '" type="text" class="search-input" style="margin-right:2px;"/>');

        
        if (option) {
            if (option.event && option.eventName) { //添加事件，new mf.TextRander（{event:keyup,eventName:model.test(this)}）-->this.test = function(){}
                var $text = $('<input id="' + field + '" type="text" class="search-input" style="margin-right:2px;"' + ' ' + 'on' + option.event + '="' + option.eventName + '"/>');
            }
            for (var key in option) {
                if (key == "id" || key == "title" || key == "event" || key == "eventName")
                    continue;
                $text.attr(key, option[key]);
            }
        }

        $text.change(fn_onChange);

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        return $text.val();
    };

    this.setEditingCellValue = function ($text, value) {
        $text.val(value);
        return true;
    };
};
mf.TextRander.prototype = new mf.Rander();

// input number
mf.TextNumberRander = function (option) {

    // option maxLength size
    this.option = option;
    this.createCell = function (field, value) {
        var $span = $("<span>");

        if (value !== null) {
            $span.text(value);
        }

        if (option) {
            for (var key in option) {
                if (key == "id") {
                    continue;
                }
                if (key == "title") {
                    $span.attr(key, value);
                }
                else {
                    $span.attr(key, option[key]);
                }
            }
        }
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $text = $('<input id="' + field + '" type="text"/>');
        $text.change(fn_onChange);

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        return Number($text.val());
    };

    this.setEditingCellValue = function ($text, value) {
        $text.val(value);
        return true;
    };
};
mf.TextNumberRander.prototype = new mf.Rander();


//@author Alvin 2017年3月7日09:35:13
//控制input type = number 的宽度
//$text.css({"width":"20px","color":"#fff"});
// input number
mf.CrotroNumberRander = function (option) {

    // option width color
    this.option = option;
    this.createCell = function (field, value) {
        return value;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $text = $('<input id="' + field + '" type="text"/>');
        if (option) {
            for (var key in option) {
                if (key == "id") {
                    continue;
                }
                if (key == "title") {
                    $text.attr(key, value);
                }
                else {
                    $text.attr(key, option[key]);
                }
            }
        }

        $text.change(fn_onChange);

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        return Number($text.val());
    };

    this.setEditingCellValue = function ($text, value) {
        $text.val(value);
        return true;
    };
};
mf.CrotroNumberRander.prototype = new mf.Rander();

// a标签
mf.ALineRander = function (option) {
    // option maxLength size
    this.option = option;
    this.createCell = function (field, value) {
        var $text = $('<a id="' + field + '" style="color:blue;">' + value + '</a>');
        return  $text;
    };

    this.createEditingCell = function (field, fn_onChange) {       
        $text.change(fn_onChange);

        return $text;
    };
    this.getEditingCellValue = function ($text) {
        return $text.val();
    };
    this.setEditingCellValue = function ($text, value) {
        $text.val(value);
        return true;
    };
};
mf.ALineRander.prototype = new mf.Rander();

// select
mf.SelectRander = function (options, option) {

    // options格式: [{value:"v1", text:"t1"},{value:"v2", text:"t2"}]
    // option: noSearchSelectedText
    this.options = options;
    this.searchOptions = $.extend([], options);
    if (option && option.hasOwnProperty("noSearchSelectedText")) {
        this.searchOptions.unshift({
            value: "mf-noSearchSelected",
            text: option.noSearchSelectedText
        });
    }

    this.createCell = function (field, value) {        

        var $span = $("<span>");
        for (var i = 0, length = options.length; i < length; i++) {
            var item = options[i];
            if (options[i].value == value) {
                if (option && option.hasOwnProperty("title")) {
                    $span.attr("title", item.text);
                }


                return $span.text(item.text);
            }
        }

        console.log("Can't find option field value:" + value);
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {

        var optionsHtml = "";
        
        $.each(options, function (i, option) {
            optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
        });

        if (option && option.hasOwnProperty("noSearchSelectedText")) {
            optionsHtml = '<option value=""></option>' + optionsHtml;
        }

        var $select = $('<select id="' + field + '" class="search-select">' +
                            optionsHtml +
                        '</select>');
        $select
            .change(fn_onChange);

        return $select;
    };

    this.getEditingCellValue = function ($select) {
        var index = parseInt($select.val());
        if (isNaN(index))
            return null;
        return options[index].value;
    };

    this.setEditingCellValue = function ($select, value) {
        $.each(options, function (i, option) {
            if (option.value == value)
                $select.val(i);

        });        
        return true;
    };

    this.createSearchCell = function (field, fn_onChange) {
        var optionsHtml = "";
        $.each(this.searchOptions, function (i, option) {
            optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
        });
        var $select = $('<select id="' + field + '">' +
                        optionsHtml +
                      '</select>');
        $select.change(fn_onChange);
        return $select;
    };

    this.getSearchCellValue = function ($select) {
        var index = parseInt($select.val());
        var value = this.searchOptions[index].value;
        if (value == "mf-noSearchSelected")
            return null;
        return value;
    };
};
mf.SelectRander.prototype = new mf.Rander();

// Amanda 2017年3月1日15：42：00
// 无值时整个select不显示
mf.DisplayableSelectRander = function (options, option) {

    // options格式: [{value:"v1", text:"t1"},{value:"v2", text:"t2"}]
    // option: noSearchSelectedText
    this.options = options;
    this.searchOptions = $.extend([], options);
    if (option && option.hasOwnProperty("noSearchSelectedText")) {
        this.searchOptions.unshift({
            value: "mf-noSearchSelected",
            text: option.noSearchSelectedText
        });
    }

    this.createCell = function (field, value) {
       
        if (value == null || value.length <= 0 ) {
            return ""; 
        }

        for (var i = 0, length = options.length; i < length; i++) {
            var option = options[i];
            if (option.value == value)
                return option.text;
        }

        console.warn("can't find option value:" + value);
        return "";
    };

    this.createEditingCell = function (field, fn_onChange) {
        
        var optionsHtml = "";
        $.each(options, function (i, option) {
            optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
        });

        var $select = $('<select id="' + field + '">' +
                            optionsHtml +
                        '</select>');
        $select
            .change(fn_onChange);

        return $select;
    };

    this.getEditingCellValue = function ($select) {
        if ($select.css('display') == "none") {
            return '';
        }
        var index = parseInt($select.val());
        return options[index].value;
    };

    this.setEditingCellValue = function ($select, value) {
        $.each(options, function (i, option) {
            if (option.value === value)
                $select.val(i);
        });

        if (value == null) {
            $select.css('display', "none");
        }
        return true;
    };

    this.createSearchCell = function (field, fn_onChange) {
        var optionsHtml = "";
        $.each(this.searchOptions, function (i, option) {
            optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
        });
        var $select = $('<select id="' + field + '">' +
                        optionsHtml +
                      '</select>');
        $select.change(fn_onChange);
        return $select;
    };
    this.getSearchCellValue = function ($select) {
        var index = parseInt($select.val());
        var value = this.searchOptions[index].value;
        if (value == "mf-noSearchSelected")
            return "";
        return value;
    };
};
mf.DisplayableSelectRander.prototype = new mf.Rander();


//@author Alvin 2017年2月28日16:21:46
// DontSelect
// 新增时候只能显示一个默认值,编辑获取所有值
mf.DontSelectRander = function (options, option) {
    this.options = options;
    this.searchOptions = $.extend([], options);

    if (option && option.hasOwnProperty("noSearchSelectedText")) {
        this.searchOptions.unshift({
            value: "mf-noSearchSelected",
            text: option.noSearchSelectedText
        });
    }

    this.createCell = function (field, value) {

        for (var i = 0, length = options.length; i < length; i++) {
            var option = options[i];
            if (option.value == value)
                return option.text;
        }

        console.warn("can't find option value:" + value);
        return "";
    };

    this.createAddingCell = function (field, fn_onChange) {

        var optionsHtml = "";
        $.each(options, function (i, option) {
            if (i == 0) {
                optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
            }

        });

        var $select = $('<select id="' + field + '">' +
                            optionsHtml +
                        '</select>');
        $select
            .change(fn_onChange);

        return $select;
    };

    this.createEditingCell = function (field, fn_onChange) {

        var optionsHtml = "";

        $.each(options, function (i, option) {
            optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
        });

        if (option && option.hasOwnProperty("noSearchSelectedText")) {
            optionsHtml = '<option value=""></option>' + optionsHtml;
        }

        var $select = $('<select id="' + field + '">' +
                            optionsHtml +
                        '</select>');
        $select
            .change(fn_onChange);

        return $select;
    };

    this.getEditingCellValue = function ($select) {
        var index = parseInt($select.val());
        return options[index].value;
    };

    this.setEditingCellValue = function ($select, value) {
        $.each(options, function (i, option) {
            if (option.value == value)
                $select.val(i);
        });
        return true;
    };

    this.createSearchCell = function (field, fn_onChange) {
        var optionsHtml = "";
        $.each(this.searchOptions, function (i, option) {
            optionsHtml +=
                '<option value="' + i + '">' +
                    option.text +
                '</option>';
        });
        var $select = $('<select id="' + field + '">' +
                        optionsHtml +
                      '</select>');
        $select.change(fn_onChange);
        return $select;
    };
    this.getSearchCellValue = function ($select) {
        var index = parseInt($select.val());
        var value = this.searchOptions[index].value;
        if (value == "mf-noSearchSelected")
            return null;
        return value;
    };
};
mf.DontSelectRander.prototype = new mf.Rander();


// 单个checkbox
mf.SingleCheckBoxRander = function (option) {

    // option格式: {yes:"1", no:"0"，disabled: true}
    this.option = option;

    this.createCell = function (field, value) {
        if (value == option.yes)
            return '<img src="/Content/img/yes.png"/>';
        else if (value == option.no)
            return '<img src="/Content/img/no.png"/>';
        else {
            console.error("invaild SingleCheckBox value:" + value);
            return null;
        }
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $checkbox = $('<input id="' + field + '" type="checkbox"/>');
        $checkbox.change(fn_onChange);

        if (option && option.hasOwnProperty("disabled")) {
            $checkbox.attr("disabled", option.disabled);
        }

        return $checkbox;
    };

    this.getEditingCellValue = function ($checkbox) {
        return $checkbox.is(":checked") ? option.yes : option.no;
    };

    this.setEditingCellValue = function ($checkbox, value) {
        if (value === option.yes)
            $checkbox.prop("checked", true);
        else if (value === option.no)
            $checkbox.prop("checked", false);
        else {
            console.error("invaild SingleCheckBox value:" + value);
            return false;
        }
        return true;
    };
};
mf.SingleCheckBoxRander.prototype = new mf.Rander();

// 三态checkbox
mf.TristateCheckBoxRander = function (option) {
    // option格式: {yes:"1",no:"0",invalid:"-1"}
    this.option = option;

    this.createCell = function (field, value) {
        if (value == option.yes)
            return '<img src="/Content/img/yes.png"/>';
        else if (value == option.no)
            return '<img src="/Content/img/no.png"/>';
        else if (value === option.invalid)
            return "";
        else {
            console.error("invaild SingleCheckBox value:" + value);
            return null;
        }
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $checkbox = $('<input id="' + field + '" type="checkbox"/>');
        $checkbox.change(fn_onChange);
        return $checkbox;
    };

    this.getEditingCellValue = function ($checkbox) {
        if ($checkbox.hasClass("invaild"))
            return option.invalid;

        return $checkbox.is(":checked") ? option.yes : option.no;
    };

    this.setEditingCellValue = function ($checkbox, value) {
        if (value == option.yes) {
            $checkbox.removeClass("invaild");
            $checkbox.show();
            $checkbox.prop("checked", true);
        } else if (value == option.no) {
            $checkbox.removeClass("invaild");
            $checkbox.show();
            $checkbox.prop("checked", false);
        }            
        else if (value === option.invalid) {
            $checkbox.addClass("invaild");
            $checkbox.hide();
        } else {
            console.error("invalid TristateCheckBox value:" + value);
            return false;
        }

        return true;
    };
};
mf.TristateCheckBoxRander.prototype = new mf.Rander();

// radio group
mf.RadioGroupRander = function (options) {

    // options格式: [{ value: "v1", text: "t1" }, { value: "v2", text: "t2" }]
    this.options = options;

    this.createCell = function (field, value) {
        var $cell = $('<span>');
        $.each(options, function (i, option) {
            var $radio = $("<span>");            
            if (value == option.value)
                $radio.append('<span class="mf-radio-pic-yes"><img src="/Content/img/yes.png"/></span>');
            else
                $radio.append('<span class="mf-radio-pic-yes"><img src="/Content/img/no.png"/></span>');
            $radio.append('<span class="mf-radio-label">' + option.text + '</span>');

            $cell.append($radio);
        });

        return $cell;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $cell = $('<span id="' + field + '">');
        $.each(options, function (i, option) {
            var $radio = $("<label>")                    
                    .append('<span class="mf-radio"><input name="' + field + '" type="radio" value=' + i + ' /></span>')
                    .append('<span class="mf-radio-label" style="position: relative;top: -2px;margin:0px 5px;">' + option.text + '</span>');
            $radio.css({ "font-weight": "500", "margin-left": "5px" });
            $radio.find("input").change(fn_onChange);
            $cell.append($radio);
        });

        return $cell;
    };

    this.getEditingCellValue = function ($cell) {
        var $radio = $cell.find(".mf-radio input:radio:checked");
        if ($radio.length <= 0)
            return null;

        var index = parseInt($radio.val());
        return options[index].value;
    };

    this.setEditingCellValue = function ($cell, value) {
        for (var i = 0, length = options.length; i < length; i++) {
            var option = options[i];
            if (option.value == value) {
                var $radio = $cell.find('[value=' + i + ']');
                if ($radio.length <= 0)
                    return false;

                $radio.attr("checked", true);
                return true;
            }
        }
        return false;
    };
};
mf.RadioGroupRander.prototype = new mf.Rander();

// 占位列
mf.PlaceholderRander = function () {
    this.createCell = function (field, value) {
        return "<span><span>";
    };

    this.createEditingCell = function (field, fn_onChange) {
        return '<span id="' + field + '"><span>';
    };

    this.getEditingCellValue = function ($cell) {
        return "";
    };

    this.setEditingCellValue = function ($cell, value) {
        return true;
    };
};
mf.PlaceholderRander.prototype = new mf.Rander();

mf.Rander.Lang.DateRander = GetField("/Data/options/bootstrap-datepicker", "bootstrap-datepicker");
$.fn.datepicker.dates["mf-lang"] = mf.Rander.Lang.DateRander;

// 日期显示（精确到时分秒）
mf.HourRander = function (option) {
    this.defaultOption = {

    };
    this.createCell = function (field, value) {
        var $span = $("<span>");
        var date = mf.deal.formatDate(value, 'yyyy-MM-dd hh:mm:ss');

        if (option && option.hasOwnProperty("title")) {
            $span.attr("title", date);
        }
        $span.text(date);
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $date = $('<input id="' + field + '" readonly size=14/>');
        option = $.extend(this.defaultOption, option);
        option.format = "yyyy-mm-dd hh:ii:ss"; // 
        option.language = "mf-lang";  // 设置语言
        option.autoclose = true;
        option.todayBtn = true;
        $date
            .datetimepicker(option)
            .on("changeDate", fn_onChange);
        return $date;
    };

    this.getEditingCellValue = function ($cell) {
        var date = $cell.datetimepicker("getDate");
        return mf.format.Date(date);
    };

    this.setEditingCellValue = function ($cell, value) {
        $cell.datetimepicker("update", mf.format.Date(value));
        return true;
    };
};
mf.HourRander.prototype = new mf.Rander();

// 日期选择（年月日）
mf.DateRander = function (option) {
    
    this.defaultOption = {

    };

    this.createCell = function (field, value) {
        var $span = $("<span>");
        var date = mf.format.Date(value);

        //if (option && option.hasOwnProperty("title")) {
        //    $span.attr("title", date);
        //}
        $span.attr("title", date);
        $span.text(date);
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $date = $('<input id="' + field + '" maxLength=10 size=10  readonly/>');
            option = $.extend(this.defaultOption, option);
            option.format = "yyyy-mm-dd"; // 固定格式为yyyy-mm-dd,否则setEditingCellValue会设置不正确
            option.language = "mf-lang";  // 设置语言
            option.autoclose = true;
            $date
                .datepicker(option)
                .on("changeDate", fn_onChange);

        return $date;
    };

    this.getEditingCellValue = function ($cell) {
        var date = $cell.datepicker("getDate");
        return mf.format.Date(date);
    };

    this.setEditingCellValue = function ($cell, value) {
        $cell.datepicker("update", mf.format.Date(value));
        return true;
    };
};
mf.DateRander.prototype = new mf.Rander();

// 日期选择(年月）
mf.MonthRander = function (option) {

    this.defaultOption = {

    };

    this.createCell = function (field, value) {
        var $span = $("<span>");
        var date = mf.deal.formatMonthDate(value, "yyyy-MM");

        if (option && option.hasOwnProperty("title")) {
            $span.attr("title", date);
        }
        $span.text(date);
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $date = $('<input id="' + field + '" maxLength=7 size=7 readonly/>');

        option = $.extend(this.defaultOption, option);
        option.format = "yyyy-mm"; // 固定格式为yyyy-mm,否则setEditingCellValue会设置不正确
        option.language = "mf-lang";  // 设置语言
        option.autoclose = true;
        option.startView = 'year';
        option.maxViewMode = 2;
        option.minViewMode =  1;
        option.todayBtn = "linked";
        $date
            .datepicker(option)
            .on("changeDate", fn_onChange);
        return $date;
    };

    this.getEditingCellValue = function ($cell) {
        var date = $cell.datepicker("getDate");
        return mf.deal.formatMonthDate(date, "yyyy-MM");
    };

    this.setEditingCellValue = function ($cell, value) {
        $cell.datepicker("update", mf.deal.formatMonthDate(value, "yyyy-MM"));
        return true;
    };
};
mf.MonthRander.prototype = new mf.Rander();

// Amanda
// 日期选择（年月日时分秒）
mf.TimeRander = function (option) {

    this.defaultOption = {

    };

    this.createCell = function (field, value) {
        var $span = $("<span>");
        var date = mf.format.Time(value);

        if (option && option.hasOwnProperty("title")) {
            $span.attr("title", date);
        }
        $span.text(date);
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {        
        var $date = $('<input id="' + field + '" maxLength=20 size=16  readonly/>');
        option = $.extend(this.defaultOption, option);
        option.format = "yyyy-mm-dd hh:ii:ss"; // 固定格式为yyyy-mm-dd  hh::mm:ss,否则setEditingCellValue会设置不正确
        option.language = language;  // 设置语言
        option.autoclose = true;
        option.todayBtn = true;
        $date
            .datetimepicker(option)
            .on("changeDate", fn_onChange);

        return $date;
    };

    this.getEditingCellValue = function ($cell) {
        var date = $cell.datetimepicker("getDate");
        return mf.format.Time(date);
    };

    this.setEditingCellValue = function ($cell, value) {
        $cell.datetimepicker("update", mf.format.Time(value));
        return true;
    };
};
mf.TimeRander.prototype = new mf.Rander();

// 指定一个rander,控制其可以只在新增状态才可以编辑
mf.WirteOnceOnlyRander = function (rander) {
    this.createCell = function (field, value) {
        return rander.createCell(field, value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        // 先返回一个span,当table.js调用setEditingCellValue
        // 再替换span为rander.createCell的返回的html
        return '<span id="' + field + '">';
    };

    this.getEditingCellValue = function ($cell) {
        return $cell.data("mfWirteOnceOnlyRanderValue");
      
    };

    this.setEditingCellValue = function ($cell, value) {
        var field = $cell.attr("id");
        var $randerCell = $("<span>")
                                .append(rander.createCell(field, value));
        //if ($randerCell.length <= 0)
        //    $cell.text(randerCell);
        //else 
            $cell.append($randerCell);
        $cell.data("mfWirteOnceOnlyRanderValue", value);
        return true;
    };

    this.createAddingCell = function (field, fn_onChange) {
        return rander.createAddingCell(field, fn_onChange);
    };

    this.getAddingCellValue = function ($cell) {
        return rander.getAddingCellValue($cell);
    };

    this.setAddingCellValue = function ($cell, value) {
        return rander.setAddingCellValue($cell, value);
    };

    this.createSearchCell = function (field) {
        return rander.createSearchCell(field);
    };

    this.getSearchCellValue = function ($cell) {
        return rander.getSearchCellValue($cell);
    };
};
mf.WirteOnceOnlyRander.prototype = new mf.Rander();

// 自定义操作按钮
mf.WithButtonRander = function (rander, option) {
    this.defaultOption = {
        btnClass: "btn btn-default btn-xs",
        btnTitle: "",
        iconClass: "fa fa-plus-square",
        fn_onBtnClick: null // fn_onBtnClick($randerEditingCell, rander, $cell, field)
    };

    option = $.extend(this.defaultOption, option);
    this.createCell = function (field, value) {
        return rander.createCell(field, value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $cell = $('<span id="' + field + '">');
        var $randerEditingCell = rander.createEditingCell("with-btn-sub-cell");
        var $btnOperate = $(
            '<button type="button" class="' + option.btnClass + '">' +
                '<span class="' + option.iconClass + '">' + option.btnTitle + '</span>' +
            '</button>');

        var fn_onBtnClick = option.fn_onBtnClick;
        if (fn_onBtnClick) {
            $btnOperate.click(function () {
                fn_onBtnClick($randerEditingCell, rander, $cell, field, fn_onChange);
            });
        }
        
        $cell
            .append($randerEditingCell)
            .append($btnOperate);

        return $cell;
    };

    this.getEditingCellValue = function ($cell) {
        var $randerCell = $cell.find("#with-btn-sub-cell");
        return rander.getEditingCellValue($randerCell);
    };

    this.setEditingCellValue = function ($cell, value) {
        var $randerCell = $cell.find("#with-btn-sub-cell");
        return rander.setEditingCellValue($randerCell, value);
    };
};
mf.WithButtonRander.prototype = new mf.Rander();

// 外键处理
mf.FKRander = function (modalStr, modalComfirmBtnStr, table, rander, option) {

    if (!modalStr || modalStr.length <= 0) {
        console.error("modalStr is null");
        return null;
    }

    var $modal = $(modalStr);
  
    if ($modal.length <= 0) {
        console.error("invild modalStr");
        return null;
    }

    if (!table) {
        console.error("table is null");
        return null;
    }
    
    if (!(table instanceof mf.Table)) {
        console.error("table is not instanceof mf.Table");
        return null;
    }

    this.defaultOption = {
        btnClass: "btn btn-default btn-xs",
        btnTitle: "",
        iconClass: "fa fa-desktop",
        fn_onBtnClick: null, // fn_onBtnClick($randerEditingCell, rander, $cell, field)    
        searchID: [],
    };

    option = $.extend(this.defaultOption, option);
    option.fn_onBtnClick = function ($randerEditingCell, rander, $cell, field, fn_onChange) {        
        if (modalComfirmBtnStr && modalComfirmBtnStr.length > 0) {
            var $modalComfirmBtn = $(modalComfirmBtnStr);
            if ($modalComfirmBtn.length > 0) {
                $modalComfirmBtn.click(function () {
                    var rowData = table.getSelectedData();
                    if (rowData == null)
                        return;

                    // 创建jquery event对象
                    var e = {
                        currentTarget: $cell[0],
                        data: rowData
                    };
                    fn_onChange && fn_onChange(e);
                    $modal.modal("hide");
                });
            }

        }
        /*@author Alvin 2017年3月1日18:02:02
          开窗时清空开窗的查询字段
          配置  searchID: [{ value: "#GroupNo", text: "" }]
        */
        for (var i = 0; i <option.searchID.length; i++) {
            $(option.searchID[i].value).val(option.searchID[i].text);
        }
        table.loadData();
        $modal.modal({ backdrop: 'static', keyboard: false });
        $modal.modal("show");
    };
    
    var withButtonRander = new mf.WithButtonRander(rander, option);

    this.createCell = function (field, value) {
        return withButtonRander.createCell(field, value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        return withButtonRander.createEditingCell(field, fn_onChange);
    };

    this.getEditingCellValue = function ($cell) {
        return withButtonRander.getEditingCellValue($cell);
    };

    this.setEditingCellValue = function ($cell, value) {
        return withButtonRander.setEditingCellValue($cell, value);
    };
};
mf.FKRander.prototype = new mf.Rander();


//Author:Duke
//外键处理
// 查询条件以及table 中具有相同的弹窗时，对确认按钮的处理

mf.FKRanderWithUnbind = function (modalStr, modalComfirmBtnStr, table, rander, option) {

    if (!modalStr || modalStr.length <= 0) {
        console.error("modalStr is null");
        return null;
    }

    var $modal = $(modalStr);
    if ($modal.length <= 0) {
        console.error("invild modalStr");
        return null;
    }

    if (!table) {
        console.error("table is null");
        return null;
    }

    if (!(table instanceof mf.Table)) {
        console.error("table is not instanceof mf.Table");
        return null;
    }

    this.defaultOption = {
        btnClass: "btn btn-default btn-xs",
        btnTitle: "",
        iconClass: "fa fa-industry",
        fn_onBtnClick: null, // fn_onBtnClick($randerEditingCell, rander, $cell, field)    
        searchID: [],
    };

    option = $.extend(this.defaultOption, option);
    option.fn_onBtnClick = function ($randerEditingCell, rander, $cell, field, fn_onChange) {
        if (modalComfirmBtnStr && modalComfirmBtnStr.length > 0) {
            var $modalComfirmBtn = $(modalComfirmBtnStr);
            if ($modalComfirmBtn.length > 0) {
                $modalComfirmBtn.unbind('click');
                $modalComfirmBtn.click(function () {
                    var rowData = table.getSelectedData();
                    if (rowData == null)
                        return;

                    // 创建jquery event对象
                    var e = {
                        currentTarget: $cell[0],
                        data: rowData
                    };
                    fn_onChange && fn_onChange(e);
                    $modal.modal("hide");
                });
            }
        }

        for (var i = 0; i < option.searchID.length; i++) {
            $(option.searchID[i].value).val(option.searchID[i].text);
        }

        $modal.modal("show");       
    };




    // 打开弹出框时加载数据
    $modal.on("show.bs.modal", function () {
        table.loadData();
    });

    var withButtonRander = new mf.WithButtonRander(rander, option);

    this.createCell = function (field, value) {
        return withButtonRander.createCell(field, value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        return withButtonRander.createEditingCell(field, fn_onChange);
    };

    this.getEditingCellValue = function ($cell) {
        return withButtonRander.getEditingCellValue($cell);
    };

    this.setEditingCellValue = function ($cell, value) {
        return withButtonRander.setEditingCellValue($cell, value);
    };
};
mf.FKRanderWithUnbind.prototype = new mf.Rander();

// 动态值
mf.DynamicValueRander = function (fn_getValue) {

    if (fn_getValue == null || typeof fn_getValue != "function") {
        console.error("you have configured a invail fn_getValue in mf.DynamicValueRander");
        return null;
    }

    this.createCell = function (field, value) {
        return fn_getValue(value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        return fn_getValue();
    };

    this.getEditingCellValue = function ($text) {
        return fn_getValue();
    };

    this.setEditingCellValue = function ($text, value) {
        return true;
    };
};
mf.DynamicValueRander.prototype = new mf.Rander();

// 静态值
// modifier: Jack 2017年3月10日
// content: 修改输出数据，是否显示title
mf.StaticValueRander = function(option) {
    this.defaultOption = {
        class: "static-rander-class"
    };
    option = $.extend(this.defaultOption, option);

    this.createCell = function(field, value) {
        if (value == null) {
            value = "";
        }
        
        //切割后台返回的字符串，option.splitSymbol为切割的地方，option.splitIndex取哪一段
        if (option.splitIndex >= 0 && (option.splitSymbol == " " || option.splitSymbol)) {
            value = value.split(option.splitSymbol)[option.splitIndex]
        }

        var $span = $('<span class="' + option.class + '">').text(value);

        if (option && option.title) {
            $span.attr("title", value);
        }

        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        return '<span id="' + field + '" class="' + option.class + '"></span>';
    };

    this.getEditingCellValue = function($cell) {
        return $cell.text();
    };

    this.setEditingCellValue = function ($cell, value) {

        //切割后台返回的字符串，option.splitSymbol为切割的地方，option.splitSymbol取哪一段
        if (option.splitIndex >= 0 && (option.splitSymbol == " " || option.splitSymbol)) {
            value = value.split(option.splitSymbol)[option.splitIndex]
        }
        $cell.text(value);
        return true;
    };
};
mf.StaticValueRander.prototype = new mf.Rander();

// 输入数字
mf.NumberRander = function (option) {

    this.defaultOption = {
        max: 100,
        min: 0,
        step: 1
    };
    option = $.extend(this.defaultOption, option);

    this.createCell = function (field, value) {
        return value;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $text = $('<input id="' + field + '" type="number"/>');
        for (var key in option) {
            if (key == "id")
                continue;
            $text.attr(key, option[key]);
        }
        $text.change(fn_onChange);

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        return Number($text.val());
    };

    this.setEditingCellValue = function ($text, value) {
        $text.val(value);
        return true;
    };
};
mf.NumberRander.prototype = new mf.Rander();

// 显示系统获取的日期和时间
// modifier: May 2017年7月7日
// content: 是否显示title
mf.TextTimeRander = function (option) {

    // option maxLength size
    this.defaultOption = {
        class: "static-rander-class"
    };
    option = $.extend(this.defaultOption, option);

    this.createCell = function (field, value) {
        if (value != null) {
            value = value.substring(0, 19);
            value = value.replace('T', " ");            
        }
        else {
            value = "";
        }
        var $span = $('<span class="' + option.class + '">').text(value);

        if (option && option.title) {
            $span.attr("title", value);
        }
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        return '<span id="' + field + '" class="' + option.class + '"></span>';
    };


    this.getEditingCellValue = function ($cell) {
        return $cell.text();
    };

    this.setEditingCellValue = function ($cell, value) {
        if (value != null) {
            value = value.substring(0, 19);
            value = value.replace('T', " ");
        }
        $cell.text(value);
        return true;
    };
};
mf.TextTimeRander.prototype = new mf.Rander();

// 显示系统获取的日期
mf.TextTimeDateRander = function (option) {

    // option maxLength size
    this.defaultOption = {
        class: "static-rander-class"
    };
    option = $.extend(this.defaultOption, option);

    this.createCell = function (field, value) {
        if (value != null) {
            var str = value;
            value = str.substring(0,10);
        }
        return value;
    };

    this.createEditingCell = function (field, fn_onChange) {
        return '<span id="' + field + '" class="' + option.class + '"></span>';
    };


    this.getEditingCellValue = function ($cell) {
        return $cell.text();
    };

    this.setEditingCellValue = function ($cell, value) {
        if (value != null) {
            var str = value;
            value = str.substring(0, 10);
        }
        $cell.text(value);
        return true;
    };
};
mf.TextTimeDateRander.prototype = new mf.Rander();

// Amanda 2017-03-08
// 输入字符，保存时成数字类型
mf.TextNumberstrRander = function (option) {

    // option maxLength size
    this.option = option;
    this.createCell = function (field, value) {
        
        return value;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $text = $('<input id="' + field + '" type="text"/>');
        if (option) {
            for (var key in option) {
                if (key == "id")
                    continue;
                $text.attr(key, option[key]);
            }
        }

        $text.change(fn_onChange);

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        return $text.val();
    };

    this.setEditingCellValue = function ($text, value) {
        $text.val(Number(value));
        return true;
    };
};
mf.TextNumberstrRander.prototype = new mf.Rander();

//层级Rander
mf.LevelRander = function (option) {
    this.defaultOption = {
        general :null,
        color_array: ["#f6f8bf", "#f6e73f", "#b8f3a1", "#fbd496", "#f7b963", "#8acbeb", "#cbc4f6", "#bd6bf6", "#f6a1b9", "#f24b92"],
    };
    option = $.extend(this.defaultOption, option);
    this.createCell = function (field, value) {
        var maxLevel = 0;
        if (option.general != null) {
            maxLevel = option.general();
        }
        var $text = '<div style="text-align:center;width:100%;">';
        for(var i = 1; i <= maxLevel; i++){
            if(i<value){
                $text += '<span style="border:1px solid #808080;padding:7px 11px;background-color:white;">&nbsp;&nbsp;</span>';
            }else if(i == value){
                $text += '<span style="border:1px solid #808080;padding:7px 11px;background-color:' + option.color_array[value] + ';">' + value + '</span>';
            }else if(i > value){
                $text += '<span style="border:1px solid #808080;padding:7px 11px;background-color:' + option.color_array[value] + ';">&nbsp;&nbsp;</span>';
            }
        }
        $text += ('</div>');
        return $text;
    };
    this.createEditingCell = function (field, fn_onChange) {
        var $text = $('<input id="' + field + '" type="text"/>');
        if (option) {
            for (var key in option) {
                if (key == "id")
                    continue;
                $text.attr(key, option[key]);
            }
        }

        $text.change(fn_onChange);

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        return Number($text.val());
    };

    this.setEditingCellValue = function ($text, value) {
        var maxLevel = 0;
        if (option.general != null) {
            maxLevel = option.general();
        }
        var $div = '<div style="text-align:center;width:100%;">';
        for (var i = 1; i <= maxLevel; i++) {
            if (i == value) {
                $div += '<span style="border:1px solid #808080;padding:7px 11px;background-color:' + option.color_array[value] + ';">' + value + '</span>';
            } else {
                $div += '<span style="border:1px solid #808080;padding:7px 11px;background-color:' + option.color_array[value] + ';">&nbsp&nbsp</span>';
            }
        }
        $div += ('</div>');
        return true;
    };

};
mf.LevelRander.prototype = new mf.Rander();

// Jack 2017-05-19
// 自定义设置下来框的字段
mf.AutoSelectRander = function (fieldValue, fieldText, data, option) {

    //if (option && option.hasOwnProperty("noSearchSelectedText")) {
    //    var firstItem = JSON.parse('{ "'+ fieldValue+ '": "mf-noSearchSelected", "'+ fieldText + '": "' + option.noSearchSelectedText + '" }');
    //    data.unshift(firstItem);
    //    console.log(data);
    //}
    
    this.createCell = function (field, value) {
        value += "";
        var $span = $("<span>");
        for (var i = 0, length = data.length; i < length; i++) {
            var item = data[i];
            if (value == item[fieldValue]) {
                if (option && option.hasOwnProperty("title")) {
                    $span.attr("title", item[fieldText]);
                }
                return $span.text(item[fieldText]);
            }
        }

        console.log("Can't find option field value:" + value);
        return $span;
    };

    this.createAddingCell = function (field, fn_onChange, value) {
        var itemsHtml = "";
        $.each(data, function (i, item) {
            itemsHtml += '<option value="' + item[fieldValue] + '">' + item[fieldText].replace(/>/g, '&gt;').replace(/</g, '&lt;') + '</option>';
        });

        if (option && option.hasOwnProperty("noSearchSelectedText")) {
            itemsHtml = '<option value="">' + option.noSearchSelectedText + '</option>' + itemsHtml;
        }

        var $select = $('<select id="' + field + '" class="search-select">' + itemsHtml + '</select>');
        if (option && option.hasOwnProperty("MaxWidth")) {
            $select.css("max-width", option.MaxWidth);
        }
        if (option && option.hasOwnProperty("disabled")) {
            $select.attr("disabled", option.disabled);
        }

        $select.change(fn_onChange);

        return $select;
    };

    this.getAddingCellValue = function ($select) {
        if (option.IsBoolean) {
            return $select.val() == "true" ? true : false;
        }
        return $select.val();
    };

    this.setAddingCellValue = function ($select, value) {
        $select.val(value + "");
        return true;
    };

    this.createEditingCell = function (field, fn_onChange, value) {
        var list = data;
        if (typeof option.fn_onSetEditingValue == "function") {
            list = option.fn_onSetEditingValue(value);
        }
        var itemsHtml = "";
        $.each(list, function (i, item) {
            itemsHtml += '<option value="' + item[fieldValue] + '"><span>' + item[fieldText].replace(/>/g, '&gt;').replace(/</g, '&lt;') + '</span></option>';
        });

        if (option && option.hasOwnProperty("noSearchSelectedText")) {
            itemsHtml = '<option value="">' + option.noSearchSelectedText + '</option>' + itemsHtml;
        }

        var $select = $('<select id="' + field + '" class="search-select">' + itemsHtml + '</select>');
        if (option && option.hasOwnProperty("MaxWidth")) {
            $select.css("max-width", option.MaxWidth);
        }
        if (option && option.hasOwnProperty("disabled")) {
            $select.attr("disabled", option.disabled);
        }

        $select.change(fn_onChange);

        return $select;
    };

    this.getEditingCellValue = function ($select) {
        if (option.IsBoolean) {
            return $select.val() == "true" ? true : false;
        }
        return $select.val();
    };

    this.setEditingCellValue = function ($select, value) {
        $select.val(value + "");
        return true;
    };
};
mf.AutoSelectRander.prototype = new mf.Rander();


/*
  选中不同列内容,外键处理
  在不同的列表选中不同的值
  同一列点击开窗,获取不同的开窗内容
*/
mf.OtherFKRander = function (modalStr, modalComfirmBtnStr, table, rander, option) {
    var isInit = true;
    if (!modalStr || modalStr.length <= 0) {
        console.error("modalStr is null");
        return null;
    }

    var $modal = $(modalStr);

    if ($modal.length <= 0) {
        console.error("invild modalStr");
        return null;
    }

    if (!table) {
        console.error("table is null");
        return null;
    }

    if (!(table instanceof mf.Table)) {
        console.error("table is not instanceof mf.Table");
        return null;
    }

    this.defaultOption = {
        btnClass: "btn btn-default btn-xs",
        btnTitle: "",
        iconClass: "fa fa-desktop",
        fn_onBtnClick: null
    };
    option = $.extend(this.defaultOption, option);
    if (!isInit) {   //isInit=true 初始化的时候不让它触发该函数,等到加载完成后重新调用才可以触发
        option.fn_onBtnClick();
    }
    // 打开弹出框时加载数据
    //$modal.on("show.bs.modal", function () {
    //    table.loadData();
    //});

    var withButtonRander = new mf.WithButtonRander(rander, option);

    this.createCell = function (field, value) {
        return withButtonRander.createCell(field, value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        return withButtonRander.createEditingCell(field, fn_onChange);
    };

    this.getEditingCellValue = function ($cell) {
        return withButtonRander.getEditingCellValue($cell);
    };

    this.setEditingCellValue = function ($cell, value) {
        return withButtonRander.setEditingCellValue($cell, value);
    };

    isInit = false;
};
mf.OtherFKRander.prototype = new mf.Rander();


// Amanda 2017-06-05
// 弹窗添加询问事件处理
mf.FKRanderIsSrue = function (modalStr, modalComfirmBtnStr, table, rander, option, url, tips, tipstext) {

    if (!modalStr || modalStr.length <= 0) {
        console.error("modalStr is null");
        return null;
    }

    var $modal = $(modalStr);

    if ($modal.length <= 0) {
        console.error("invild modalStr");
        return null;
    }

    if (!table) {
        console.error("table is null");
        return null;
    }

    if (!(table instanceof mf.Table)) {
        console.error("table is not instanceof mf.Table");
        return null;
    }

    this.defaultOption = {
        btnClass: "btn btn-default btn-xs",
        btnTitle: "",
        iconClass: "fa fa-desktop",
        fn_onBtnClick: null, // fn_onBtnClick($randerEditingCell, rander, $cell, field)    
        searchID: [],
    };

    option = $.extend(this.defaultOption, option);
    option.fn_onBtnClick = function ($randerEditingCell, rander, $cell, field, fn_onChange) {
        if (modalComfirmBtnStr && modalComfirmBtnStr.length > 0) {
            var $modalComfirmBtn = $(modalComfirmBtnStr);
            if ($modalComfirmBtn.length > 0) {
                $modalComfirmBtn.click(function () {
                    var rowData = table.getSelectedData();
                    if (rowData == null)
                        return;

                    // 创建jquery event对象
                    var e = {
                        currentTarget: $cell[0],
                        data: rowData
                    };

                    mf.ajax({
                        type: 'Get',
                        async: false,
                        url: url,
                        data: { EquipmentID: rowData.EquipmentID },
                        success: function (data) {
                            getValue = data;
                        }
                    });

                    if (getValue) {
                        msg.warningOne(tips, rowData.Code + tipstext,
                        function () {
                            fn_onChange && fn_onChange(e);
                        }, function () { });
                    }
                    else {
                        fn_onChange && fn_onChange(e);
                    }
                                                           
                    $modal.modal("hide");               
                });
            }

        }
        /*@author Alvin 2017年3月1日18:02:02
          开窗时清空开窗的查询字段
          配置  searchID: [{ value: "#GroupNo", text: "" }]
        */
        for (var i = 0; i < option.searchID.length; i++) {
            $(option.searchID[i].value).val(option.searchID[i].text);
        }
        $modal.modal({ backdrop: 'static', keyboard: false });


        $modal.modal("show");
    };

    // 打开弹出框时加载数据
    $modal.on("show.bs.modal", function () {
        table.loadData();
    });

    var withButtonRander = new mf.WithButtonRander(rander, option);

    this.createCell = function (field, value) {
        return withButtonRander.createCell(field, value);
    };

    this.createEditingCell = function (field, fn_onChange) {
        return withButtonRander.createEditingCell(field, fn_onChange);
    };

    this.getEditingCellValue = function ($cell) {
        return withButtonRander.getEditingCellValue($cell);
    };

    this.setEditingCellValue = function ($cell, value) {
        return withButtonRander.setEditingCellValue($cell, value);
    };
};
mf.FKRanderIsSrue.prototype = new mf.Rander();

// Jack 2017-07-24
// 时间：HH:mm
mf.KendoTimeRander = function (option) {
    this.createCell = function (field, value) {
        var $span = $("<span>");
        if (value) {
            var array = value.split(":");
            value = array[0] + ":" + array[1];
            $span.text(value);
            if (option && option.hasOwnProperty("title")) {
                $span.attr("title", value);
            }
        }
        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $date = $('<input id="' + field + '" style="width:100px;" />');
        if (option) {
            for (var key in option) {
                if (key == "id" || key == "title")
                    continue;
                $date.attr(key, option[key]);
            }
        }
        return $date;
    };

    this.getEditingCellValue = function ($cell) {
        return $cell.val();
    };

    this.setEditingCellValue = function ($cell, value) {
        $cell.val(value);
        return true;
    };
};
mf.KendoTimeRander.prototype = new mf.Rander();

// Amanda 2017-07-28
// Select Color
mf.SelectColorRander = function (options, option) {

    this.defaultOption = {

    };

    this.createCell = function (field, value) {
        var $span;
        if (value) {
            $span = $("<div style='background-color:" + value + "; width:80px; height:20px; margin-left:20px;'></div>");
        }
        else {
            $span = $("<div style='background-color:#ffffff; width:80px; height:20px; margin-left:20px;'></div>");
        }

        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        var $date = $('<div class="input-group colorpicker-component">' +
            '<input id="' + field + '" type="text" value="#ffffff" class="form-control" />' +
           '<span class="input-group-addon"><i></i></span></div>');
        option = $.extend(this.defaultOption, option);
        $date
            .colorpicker();

        return $date;
    };

    this.getEditingCellValue = function ($cell) {
        console.log($cell);
        return $cell.val();
    };

    this.setEditingCellValue = function ($cell, value) {
        console.log($cell);
        $cell.find("i").css("background-color",value);
        $cell.find("input").val(value);
        return true;
    };
};
mf.SelectColorRander.prototype = new mf.Rander();

// Amanda 2017-08-14
// 根据参数值的不同，以不同的形式显示数据，下拉框，勾选或输入框(只适合用于MES系统)
mf.MultiDisplayRander = function (fieldOne, fieldTwo, Inputoption, Checkoption, option) {

    var Status;
    // option maxLength size
    this.Inputoption = Inputoption;

    // option格式: {yes:"1", no:"0"，disabled: true}
    this.Checkoption = Checkoption;

    this.Selectoptions;

    this.createCell = function (field, value, rowData) {
        Status = rowData[fieldOne];
        Selectoptions = rowData[fieldTwo];
        Selectoptions = eval(Selectoptions);

        if (Status.substring(5, Status.length) == "02012130000A8") {
            var $span = $("<span>");
            for (var i = 0, length = Selectoptions.length; i < length; i++) {
                var item = Selectoptions[i];
                if (Selectoptions[i].value == value) {
                    //if (Selectoptions && Selectoptions.hasOwnProperty("title")) {
                    //    $span.attr("title", item.text);
                    //}
                    $span.attr("title", item.text);
                    return $span.text(item.text);
                }
            }

            console.log("Can't find option field value:" + value);
            return $span;
        }
        else if (Status.substring(5, Status.length) == "02012130000A7") {
                if (value == Checkoption.yes)
                    return '<img src="/Content/img/yes.png"/>';
                else if (value == Checkoption.no)
                    return '<img src="/Content/img/no.png"/>';
                else {
                    console.error("invaild SingleCheckBox value:" + value);
                    return null;
                }
        }
        else {
            var $text = $('<span>');

            if (value !== null) {
                $text.text(value);
            }

            if (Inputoption) {
                for (var key in Inputoption) {
                    if (key == "id") {
                        continue;
                    }
                    if (key == "title") {
                        $text.attr(key, value);
                    }
                    else {
                        $text.attr(key, Inputoption[key]);
                    }
                }
            }

            return $text;
        }
                
    };

    this.createEditingCell = function (field, fn_onChange, value, rowData) {
        Status = rowData[fieldOne];
        Selectoptions = rowData[fieldTwo];
        Selectoptions = eval(Selectoptions);

        if (Status.substring(5, Status.length) == "02012130000A8") {
            var optionsHtml = "";
            $.each(Selectoptions, function (i, option) {
                optionsHtml +=
                    '<option value="' + i + '">' +
                        option.text +
                    '</option>';
            });

            if (option && option.hasOwnProperty("noSearchSelectedText")) {
                optionsHtml = '<option value=""></option>' + optionsHtml;
            }
            console.log("optionsHtml:" + optionsHtml);

            var $select = $('<select id="' + field + '" class="search-select" style="width:100px;">' +
                                optionsHtml +
                            '</select>');
            $select
                .change(fn_onChange);

            return $select;
            
        }
        else if (Status.substring(5, Status.length) == "02012130000A7") {
            var $checkbox = $('<input id="' + field + '" type="checkbox"/>');
            $checkbox.change(fn_onChange);

            if (Checkoption && Checkoption.hasOwnProperty("disabled")) {
                $checkbox.attr("disabled", Checkoption.disabled);
            }

            return $checkbox;
        }
        else {
            var $text = $('<input id="' + field + '" type="text" class="search-input" style="margin-right:2px;"/>');
            if (Inputoption) {
                for (var key in Inputoption) {
                    if (key == "id" || key == "title")
                        continue;
                    $text.attr(key, Inputoption[key]);
                }
            }

            $text.change(fn_onChange);

            return $text;
        }
        
    };

    this.getEditingCellValue = function ($text) {

        if (Status.substring(5, Status.length) == "02012130000A8") {
            var index = parseInt($text.val());
            if (isNaN(index))
                return null;
            return Selectoptions[index].value;
        }
        else if (Status.substring(5, Status.length) == "02012130000A7") {
            return $text.is(":checked") ? Checkoption.yes : Checkoption.no;
        }
        else {
            return $text.val();
        }
        
    };

    this.setEditingCellValue = function ($text, value, rowData) {
        Status = rowData[fieldOne];
        Selectoptions = rowData[fieldTwo];
        Selectoptions = eval(Selectoptions);

        if (Status.substring(5, Status.length) == "02012130000A8") {
            $.each(Selectoptions, function (i, option) {
                if (option.value == value)
                    $text.val(i);
            });
            return true;
        }
        else if (Status.substring(5, Status.length) == "02012130000A7") {
            if (value === Checkoption.yes)
                $text.prop("checked", true);
            else if (value === Checkoption.no)
                $text.prop("checked", false);
            else {
                console.error("invaild SingleCheckBox value:" + value);
                return false;
            }
            return true;           
        }
        else {
            $text.val(value);
            return true;
        }
        
    };
};
mf.MultiDisplayRander.prototype = new mf.Rander();

// 时分秒输入框
mf.HoursInputRander = function (option) {
    this.option = option;
    this.createCell = function (field, value) {
        var $text = $('<span>');

        if (value !== null) {
            $text.text(value);
        }

        if (option) {
            for (var key in option) {
                if (key == "id") {
                    continue;
                }
                if (key == "title") {
                    $text.attr(key, value);
                }
                else {
                    $text.attr(key, option[key]);
                }
            }
        }
        return $text;
    };

    this.createEditingCell = function (field, fn_onChange) {

        var $text = $('<div  id="' + field + '"><input id="hours" type="text" class="search-input" maxlength="10" style="width:50px; margin-right:2px;"/>:' +
            '<input id="minutes" type="text" class="search-input" maxlength="2" style="width:40px; margin-right:2px;"/>:' +
            '<input id="seconds" type="text" class="search-input" maxlength="2" style="width:40px; margin-right:2px;"/></div>');
       
        $text.find("#hours").keyup(function () {
            this.value = this.value.replace(/[^\d]/g, "");  //清除“数字”以外的字符
            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        });
        $text.find("#minutes").keyup(function () {
            this.value = this.value.replace(/[^\d]/g, "");  //清除“数字”以外的字符
            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            if (this.value > 59) {
                this.value = 59;
            }
        });
        $text.find("#seconds").keyup(function () {
            this.value = this.value.replace(/[^\d]/g, "");  //清除“数字”以外的字符
            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            if (this.value > 59) {
                this.value = 59;
            }
        });

        return $text;
    };

    this.getEditingCellValue = function ($text) {
        var hours = $text.find("#hours").val();
        var minutes = $text.find("#minutes").val();
        var seconds = $text.find("#seconds").val();
        var value = hours + ":" + minutes + ":" + seconds;
        return value;
    };

    this.setEditingCellValue = function ($text, value) {
        var ValueLen = value.length;
        var hours = value.substring(0, ValueLen - 6);
        var minutes = value.substring(ValueLen - 5, ValueLen - 3);
        var seconds = value.substring(ValueLen - 2, ValueLen);
        $text.find("#hours").val(hours);
        $text.find("#minutes").val(minutes);
        $text.find("#seconds").val(seconds);
        return true;
    };
};
mf.HoursInputRander.prototype = new mf.Rander();

/*
    Jim 2017年10月11日11:27:10
     根据参数值的不同，以不同的形式显示数据，下拉框，勾选或输入框,和上面MultiDisplayRander()不同的是,判断参数自定义输入
    fieldOne:返回的字段名，需要根据该字段名拿到进行判断样式
    fieldTwo:返回的字段名，根据该字段拿到的数据应该是一个数组[{value:"",text:""},{}]
            （必须是这种格式，且用到判断的流水号必须是放到value字段，显示字段必须放到text）,
    value是流水号，text:根据value判断要显示的值
    Inputoption:输入框样式设置参数对象
    Checkoption:{yes:"1", no:"0"}
    ConditionArr:数组，["15614545","1516516"],第一个是决定为下拉列表的流水号，第二个则为判断为勾选框的条件
    option:设置该栏位的参数对象
    用于EMS00010 判断是勾选框还是输入框
*/
mf.MultipleRanderOne = function (fieldOne, fieldTwo, ConditionArr, Checkoption, option, Inputoption) {

    var Status;

    this.Inputoption = Inputoption;

    this.Checkoption = Checkoption;

    this.Selectoptions;

    this.createCell = function (field, value, rowData) {

        Status = rowData[fieldOne];
        Selectoptions = rowData[fieldTwo];
        Selectoptions = eval(Selectoptions);

        if (ConditionArr[0] && Status && Status.substring(5, Status.length) == ConditionArr[0]) {//下拉
            var $span = $("<span>");
            for (var i = 0, length = Selectoptions.length; i < length; i++) {
                var item = Selectoptions[i];
                if (Selectoptions[i].value == value) {
                    $span.attr("title", item.text);
                    return $span.text(item.text);
                }
            }

            console.log("Can't find option field value:" + value);
            console.log(value)
            return $span;
        }
        else if (ConditionArr[1] && Status && Status.substring(5, Status.length) == ConditionArr[1]) {//选框
            if (value == Checkoption.yes) {
                return '<img src="/Content/img/yes.png"/>';
            }
            else if (!value || value == Checkoption.no) {
                return '<img src="/Content/img/no.png"/>';
            }
            else {
                console.error("invaild SingleCheckBox value:" + value);
                return null;
            }
        }
        else {//input
            var $text = $('<span>');
            console.log(value)
            //根据“-”切割字符串
            if (option.ableSplit && value.indexOf("-") > 0) {
                value = value.split("-")[0]
            }

            if (value !== null) {
                $text.text(value);
            }

            if (Inputoption) {
                for (var key in Inputoption) {
                    if (key == "id") {
                        continue;
                    }
                    if (key == "title") {
                        $text.attr(key, value);
                    }
                    else {
                        $text.attr(key, Inputoption[key]);
                    }
                }
            }

            return $text;
        }

    };

    this.createEditingCell = function (field, fn_onChange, value, rowData) {
        Status = rowData[fieldOne];
        Selectoptions = rowData[fieldTwo];
        Selectoptions = eval(Selectoptions);

        if (ConditionArr[0] && Status && Status.substring(5, Status.length) == ConditionArr[0]) {//下拉列表
            var optionsHtml = "";
            $.each(Selectoptions, function (i, option) {
                optionsHtml +=
                    '<option value="' + i + '">' +
                        option.text +
                    '</option>';
            });

            if (option && option.hasOwnProperty("noSearchSelectedText")) {
                optionsHtml = '<option value=""></option>' + optionsHtml;
            }
            console.log("optionsHtml:" + optionsHtml);

            var $select = $('<select id="' + field + '" class="search-select" style="width:100px;">' +
                                optionsHtml +
                            '</select>');
            $select
                .change(fn_onChange);

            return $select;

        }
        else if (ConditionArr[1] && Status && Status.substring(5, Status.length) == ConditionArr[1]) {//勾选框
            var $checkbox = $('<input id="' + field + '" type="checkbox"/>');
            $checkbox.change(fn_onChange);

            if (Checkoption && Checkoption.hasOwnProperty("disabled")) {
                $checkbox.attr("disabled", Checkoption.disabled);
            }

            return $checkbox;
        }
        else {//输入框
            var $text = $('<input id="' + field + '" type="text" class="search-input" style="margin-right:2px;"/>');
            if (Inputoption) {
                for (var key in Inputoption) {
                    if (key == "id" || key == "title")
                        continue;
                    $text.attr(key, Inputoption[key]);
                }
            }

            $text.change(fn_onChange);

            return $text;
        }

    };

    this.getEditingCellValue = function ($text) {

        if (ConditionArr[0] && Status && Status.substring(5, Status.length) == ConditionArr[0]) {
            var index = parseInt($text.val());
            console.log(index)
            console.log($text[0])
            if (isNaN(index))
                return null;
            console.log(Selectoptions[index].value)

            return Selectoptions[index].value;
        }
        else if (ConditionArr[1] && Status && Status.substring(5, Status.length) == ConditionArr[1]) {
            return $text.is(":checked") ? Checkoption.yes : Checkoption.no;
        }
        else {
            return $text.val();
        }

    };

    this.setEditingCellValue = function ($text, value, rowData) {
        Status = rowData[fieldOne];
        Selectoptions = rowData[fieldTwo];
        Selectoptions = eval(Selectoptions);

        if (ConditionArr[0] && Status && Status.substring(5, Status.length) == ConditionArr[0]) {
            $.each(Selectoptions, function (i, option) {
                if (option.value == value)
                    $text.val(i);
            });
            $text.attr(option)
            console.log($text[0])
            return true;
        }
        else if (ConditionArr[1] && Status && Status.substring(5, Status.length) == ConditionArr[1]) {
            if (value === Checkoption.yes)
                $text.prop("checked", true);
            else if (!value || value === Checkoption.no)
                $text.prop("checked", false);
            else {
                console.error("invaild SingleCheckBox value:" + value);
                return false;
            }
            return true;
        }
        else {
            $text.val(value);
            return true;
        }

    };
};
mf.MultipleRanderOne.prototype = new mf.Rander();


// 静态值
// modifier: Jim 2017年11月1日
//根据条件判断栏位字体是否要显示红色
mf.StaticColorValueRander = function (option, ConditionValue, AccordValue, independentValueOne, independentValueTwo, isRander) {
    this.defaultOption = {
        class: "static-rander-class"
    };
    option = $.extend(this.defaultOption, option);

    var rowDatas = "";
    this.createCell = function (field, value, rowData) {
        if (value == null) {
            value = "";
        }
        rowDatas = rowData;
        console.log(value)
        //切割后台返回的字符串，option.splitSymbol为切割的地方，option.splitIndex取哪一段
        if (option.splitIndex >= 0 && (option.splitSymbol == " " || option.splitSymbol)) {
            value = value.split(option.splitSymbol)[option.splitIndex]
        }

        var $span = $('<span class="' + option.class + '">').text(value);

        if (option && option.title) {
            $span.attr("title", value);
        }

        var ConditionStr = "";//根据该值判断数据是什么类型
        //  var JudgStr = rowData[JudgValue];//根据该值判断
        var AccordStr = rowData[AccordValue];//参数标准值

        var independentStrOne = rowData[independentValueOne];//优先根据该字段去判断
        var independentStrTwo = rowData[independentValueTwo];//优先根据该字段去判断
        var isContinue = false;
        var IsRanderNull = "";
        if (rowData.hasOwnProperty(isRander)) {
            IsRanderNull = rowData[isRander]
        }

        if (independentStrOne && independentStrOne.length > 0) {
            independentStrOne = rowData[independentValueOne].substring(5, rowData[independentValueOne].length)
            console.log(222)

        }

        if (independentStrTwo && independentStrTwo.length > 0) {
            independentStrTwo = independentStrTwo.substring(5, independentStrTwo.length)
        }

        if (IsRanderNull && independentStrOne == "02012130000C8") {
            console.log("点检结果异常")
            $span.attr("style", "color:red;");
            isContinue = true;

        }
        if (IsRanderNull && independentStrTwo == "02012130000C8") {
            console.log("抽检结果异常")

            $span.attr("style", "color:red;")
            isContinue = true;
        }

        if (!isContinue) {


            if (rowData[ConditionValue] && rowData[ConditionValue].length > 0) {
                ConditionStr = rowData[ConditionValue].substring(5, rowData[ConditionValue].length)
            }

            if (ConditionStr == "02012130000C0") {//数值
                if (AccordStr != value) {
                    console.log("数值不符合")
                    $span.attr("style", "color:red;")
                }
            }
            if (ConditionStr == "02012130000C1") {//数值范围
                if (AccordStr.indexOf("-") > 0) {
                    var numArr = AccordStr.split("-")
                    if (isNaN(value)) {
                        console.log("请填入数字");
                        return
                    }
                    if (parseFloat(numArr[0]) > parseFloat(value) || parseFloat(numArr[1]) < parseFloat(value)) {
                        console.log("数值范围不符合")

                        $span.attr("style", "color:red;")
                    }
                }

            }
            if (ConditionStr == "02012130000C3") {//文字
                if (AccordStr != value) {
                    console.log("文字不符合")

                    $span.attr("style", "color:red;")
                }
            }
            if (ConditionStr == "02012130000C2") {//YN
                if (AccordStr != value) {
                    console.log("YN不符合")

                    $span.attr("style", "color:red;")
                }
            }
        }

        return $span;
    };

    this.createEditingCell = function (field, fn_onChange) {
        return '<span id="' + field + '" class="' + option.class + '"></span>';
    };

    this.getEditingCellValue = function ($cell) {
        return $cell.text();
    };

    this.setEditingCellValue = function ($span, value) {

        //切割后台返回的字符串，option.splitSymbol为切割的地方，option.splitSymbol取哪一段
        if (option.splitIndex >= 0 && (option.splitSymbol == " " || option.splitSymbol)) {
            value = value.split(option.splitSymbol)[option.splitIndex]
        }



        $span.text(value);
        return true;
    };
};
mf.StaticColorValueRander.prototype = new mf.Rander();
