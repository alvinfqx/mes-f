
/**
 * table.js
 * @author Tom
 */

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global
    GetField, mf
*/

"use strict";

/** 
 * @global
 * @type {Object}
 * @description 语言包对象
 */
mf.TableLang = null;

/**
 * @callback mf.Table~GetData
 * @param {Object} pagination - 分页数据
 * @param {Object} searchData - 搜索数据
 * @param {Object} success - 成功回调
 */

/**
 * @class mf.Table
 * @classdesc 列表类
 * @param {string} domStr - 列表div查找串
 * @param {Object} option - 列表选项
 * @param {boolean} [option.noNumColumn=false] - 指定不添加序号列
 * @param {boolean} [option.editable=true] - 指定是否可以编辑
 * @param {string} option.uniqueId - 数据唯一标识字段名
 * @param {string} [option.undefinedText=-] - 默认显示数据
 * @param {Object=} option.paginationBar - 分页条对象
 * @param {string=} option.searchBarStr - 搜索栏查找串
 * @param {boolean} [option.dblclick_editable=true] - 是否可以双击行编辑
 * @param {boolean} [option.enter_addble=true] - 是否可以回车新增
 * @param {mf.Table~GetData} option.fn_getData - 获取数据回调
 */
mf.Table = function (domStr, option) {
    // --------------------------------------------------------------------
    //                            private
    // --------------------------------------------------------------------
    var self = this, rowsData, lang, $table, $thead, $tbody, $wrapper, $searchBar, defaultOption,
        createThHeader, createRow, createRows, createCell, updateRows, setRowSelectClass,
        finishEditing, checkEditingRow, getEditingRowData, setColumnStyle, defaultColumn,
        createSearchBar, getSearchData, createModal, createForm, getRanderByField, setSumRow,
        onRowClick, onTableKeyPress, onPaginationBarChange, onEditingCellChange, onRowDblClick,
        isAdding = false, isEditing = false, records = [], isLoadData = true, columnWidth = 1;
    // --------------------------------------------------------------------

    // 加载语言包
    if (mf.TableLang == null) {
        mf.TableLang = GetField("/Data/options/table", "table");
    }

    lang = mf.TableLang;
    if (!lang) {
        console.error("load language packget fail");
        return null;
    }

    // --------------------------------------------------------------------
    //                       default option
    // --------------------------------------------------------------------
    defaultOption = {
        noNumColumn: false, // 指定不添加序号列
        editable: true, // 指定是否可以编辑
        uniqueId: null, // 数据唯一标识字段名
        undefinedText: "-",
        paginationBar: null, // mf.PaginationBar对象
        searchBarStr: null, // 搜索栏查找串
        dblclick_editable: true,  //是否可以双击行编辑
        enter_addble: true, //是否可以回车新增
        fn_getData: null, // * fn_getData(pagination, searchData, success) 获取数据 pagination 分页数据 searchData 搜索数据 success(data) 成功回调 data:{rows:数据数组, total:数组行数}
        fn_saveData: null, // * fn_saveData(data, success, fail) 保存数据 data 要保存的数据 {inserted:[],updated:[],deleted:[]} success(data) 成功回调
        fn_onRowClick: null, // fn_onRowClick(data) 行点击事件 data 行数据
        fn_onRowDBlClick: null, // fn_onRowDBlClick() 行双击事件
        fn_onTableEnterPress: null, //fn_onTableEnterPress() 列表回车事件
        fn_onEditingRowRandFinish: null, // fn_onEditingRowRandFinish($row) 编辑行创建完毕事件 $row 编辑行jquery对象
        fn_onEditingRowArgsCheck: null, // fn_onEditingRowArgsCheck($row) 编辑行输入合法性检查事件，当各列设置的Checker通过后才触法此事件 $row 编辑行jquery对象
        fn_checkeditable: null,
        columns: [], // field title rander defaultValue focusField class align width visible require searchable searchClass searchTitle
        focusEditField: null,
        operateColumTitle: lang.operateColumTitle,
        operateColumWidth: "200px",
        fn_createBtn: null, // fn_createBtn(rowData) 创建操作按钮,返回操作按钮jquery对象 rowData当前行的所有数据  
        enableMultiSelectColumn: false,
        multiSelectColumnIndex: 0, // 多选列位置，从0开始，只有enableMultiSelectColumn为true时才有效
        multiSelectColumnTitle: "", // 多选列表头，只有enableMultiSelectColumn为true时才有效     
        sumColumn: null, // [ {columnName:"col1", columnTitle:"合计", columnStyle:"", columnClass: ""} ]
        rowDraggable: false, // 设置行是否可以拖动
        rowDroppable: false, // 设置行是否可以被放入
        rowDroppableAccept: null,
        fn_rowDrop: null, // 行被放入回调 fn_rowDrop(event, obj)
        isFrozenColumn: false, //是否冻结列，默认值为false
        allowRowClick: false, //允许行点击事件可以一直触发，否则只触发一次
        isRealDelete: false, //是否单个实时删除
        fn_realDelete: null, //实时删除的回调函数fn_realDelete(rowData, success)
        fn_ResetRow: null, //创建编辑行状态后，重置编辑器，主要针对部分Rander
        LastWidth: null, //设置最后一列宽度
        IsSetTableWidth: false, //自动计算宽度是否开启
        fn_paginationBarisload: null, //判断点击分页后是否重新加载表格
        fn_paginationBarClick: null, //如果分页点击了的触发事件
        columnDraggable: false, //是否可移动列
    };

    defaultColumn = {
        visible: true,
        require: false,
        searchable: false,
        Isborder: false //Isborder是否移除边框。默认false不移除  
    };
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                             event
    // --------------------------------------------------------------------
    // 点击列表行事件
    onRowClick = function () {
        var $row = $(this);

        var isAreadlySelected = $row.hasClass("active");

        // 当列表中存在编辑行且用户点击到列表其它地方则自动结束编辑行
        if (!$row.hasClass("editingRow")) {
            if (finishEditing()) {
                setRowSelectClass($row);
            }
        } else {
            setRowSelectClass($row);
        }

        if (!isAreadlySelected || option.allowRowClick) {
            var fn_onRowClick = option.fn_onRowClick;
            if (fn_onRowClick) {
                fn_onRowClick(self.getSelectedData());
            }
        }
    };

    // 双击列表行事件
    onRowDblClick = function () {
        if (option.dblclick_editable) {

            var fn_onRowDBlClick = option.fn_onRowDBlClick;

            if (fn_onRowDBlClick) {
                fn_onRowDBlClick();
            }

            self.editRow();
        }
    };

    // 列表按键事件
    onTableKeyPress = function (e) {
        // 捕获回车键
        if (e.which === 13) {
            if (option.enter_addble) {

                self.addRow();

                var fn_onTableEnterPress = option.fn_onTableEnterPress;

                if (fn_onTableEnterPress) {
                    fn_onTableEnterPress();
                }               
            }
        }
    };

    // 分页条变动事件
    onPaginationBarChange = function () {
        //self.loadData();
        var result = option.fn_paginationBarisload && option.fn_paginationBarisload();
        if (result == null || result) {
            self.loadData();
        }
        else {
            var fn_paginationBarClick = option.fn_paginationBarClick;
            if (fn_paginationBarClick) {
                fn_paginationBarClick();
            }
        }
        
    };

    // 编辑行的编辑元素值改变事件
    onEditingCellChange = function (e) {
        var $cell = $(e.currentTarget);
        var $row = $cell.parents("tr");
        var field = $cell.attr("id");
        var columns = option.columns;
        var column = columns.find(function (c) {
            return c.field === field;
        });
        if (column) {
            var fn_onEditingChange = column.fn_onEditingChange;
            if (fn_onEditingChange) {
                fn_onEditingChange(self, $row, $cell, field, e, rowsData, isAdding);
            }
        }
    };
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                            function
    // --------------------------------------------------------------------


    setColumnStyle = function ($column, column) {
        if (column.hasOwnProperty("class")) {
            $column.addClass(column.class);
        }

        if (column.hasOwnProperty("align")) {
            $column.css("text-align", column.align);
        }

        if (column.hasOwnProperty("width")) {
            $column.css("width", column.width);
        }
    };

    getRanderByField = function (field) {
        var column = option.columns.find(function (c) {
            return c.field === field;
        });

        if (column) {
            return column.rander;
        } else {
            return null;
        }
    };

    // 生成表头
    createThHeader = function (columns) {
        var $theadTmp = $("<thead>"),
            $theadTr = $("<tr>");           

        $theadTmp.append($theadTr);

        if (!option.noNumColumn) {      
            $theadTr.append('<th style="width:40px;text-align:center;">' + lang.SerialNumber + '</th>'); // 序号
            columnWidth += 40;
        }

        var fn_createBtn = option.fn_createBtn;
        if (fn_createBtn) {
            $theadTr.append('<th style="width:' + option.operateColumWidth + ';text-align:center;">' + option.operateColumTitle + '</th>'); // 操作列
            var operateColumWidth = parseInt(option.operateColumWidth);
            if (!isNaN(operateColumWidth)) {
                columnWidth = columnWidth + operateColumWidth;
            }
        }

        if (option.LastWidth != null) {
            var LastWidth = parseInt(option.LastWidth);
            if (!isNaN(LastWidth)) {
                columnWidth = columnWidth + LastWidth;
            }
        }

        $.each(columns, function (i, column) {
            if (option.enableMultiSelectColumn) {
                if (option.multiSelectColumnIndex === i) {
                    // 设置多选列
                    $theadTr.append($('<th style="width:40px;text-align:center;" >' + option.multiSelectColumnTitle + '</th>'));
                    columnWidth += 40;
                }

            }
            if (column.visible) {
                var $th = $("<th title='" + column.title + "'>" + column.title + "</th>");
                $th.data("field", column.field);
                if (option.columnDraggable) {
                    $th.draggable({ containment: "parent", revert: true, opacity: 0.7, helper: "clone" });
                    $th.droppable({
                        drop: function (event, ui) {
                            var $dragTh = ui.draggable,
                                dragField = $dragTh.data("field"),
                                targetField = $(event.target).data("field"),
                                dragColumn, dragIndex, targetColumn, targetIndex;
                            for (var i = 0; i < columns.length; i++) {
                                if (columns[i].field === dragField) {
                                    dragColumn = columns[i], dragIndex = i;
                                } else if (columns[i].field === targetField) {
                                    targetColumn = columns[i], targetIndex = i;
                                }
                            }

                            columns.splice(dragIndex, 1);
                            columns.splice(targetIndex, 0, dragColumn);
                            var $thead = createThHeader(columns);
                            $("thead").replaceWith($thead);
                            self.loadData();
                        }
                    })
                }               
                setColumnStyle($th, column);
                $theadTr.append($th);
                if (column.hasOwnProperty("width")) {
                    var evercolumnWidth = parseInt(column.width);
                    if (!isNaN(evercolumnWidth)) {
                        columnWidth = columnWidth + evercolumnWidth;
                    }
                }
            }
        });
        return $theadTmp;
    };

    // 生成包含在列里的html或对象
    createCell = function (field, rander, rowData) {
        if (!(rowData && rowData.hasOwnProperty(field))) {
            return "";
        }

        var value = rowData[field];
        if (!rander) {
            return value;
        }

        if (!isAdding && !isEditing) {
            return rander.createCell(field, value, rowData);
        }

        var $cell = null;
        if (isAdding) {
            $cell = $(rander.createAddingCell(field, onEditingCellChange, value, rowData));
            if (value != null) {
                rander.setAddingCellValue($cell, value, rowData);
            }
        } else if (isEditing) {
            $cell = $(rander.createEditingCell(field, onEditingCellChange, value, rowData));
            if (value != null) {
                rander.setEditingCellValue($cell, value, rowData);
            }
        }

        return $cell;
    };

    // 生成一行
    createRow = function (index, columns, uniqueIdName, data, undefinedText) {
        if (!data) {
            console.error("receive a null data when create row index of:" + index);
            return null;
        }

        var $row = $("<tr>")
                        .data("index", index)
                        .data("uniqueId", data[uniqueIdName]);

        if (!option.noNumColumn) {
            $row.append('<td style="width:40px;text-align:center;">' + (index + 1) + '</td>'); // 序号
        }

        // 生成操作列
        var fn_createBtn = option.fn_createBtn;
        if (fn_createBtn) {
            var $operateBtn = fn_createBtn(data);
            if ($operateBtn)
                $row.append($operateBtn);
        }

        $.each(columns, function (i, column) {

            if (option.enableMultiSelectColumn) {

                if (option.multiSelectColumnIndex === i) {

                    // 设置多选列
                    var $td = $('<td style="width:40px;text-align:center;">');
                    var $checkbox = $('<input type="checkbox" class="mf-option" />');
                    $checkbox.change(function () {
                        if ($checkbox.is(":checked")) {
                            $row.addClass("multiSelected");
                        } else {
                            $row.removeClass("multiSelected");
                        }
                    });
                    $td.append($checkbox);
                    $row.append($td);
                }
            }

            var $td = column.visible ? $("<td>") : $("<td style='display: none;'>"); //單元格判斷是否隱藏，主要用於開窗ID字段保存
            var field = column.field;
            var rander = column.rander;

            if (data.hasOwnProperty(field)) {
                if ((isAdding || isEditing) && column.hasOwnProperty("require") && column.require) {
                    $td.append('<span class="J-required">*</span>'); // 添加必填样式
                }
                $td.append(createCell(field, column.rander, data));
            } else if (rander) {
                $td.append(createCell(field, column.rander, null));
            } else {
                $td.text(undefinedText);
            }
            setColumnStyle($td, column);
            $row.append($td);

            if (option.rowDraggable) {
                $row.draggable({
                    helper: "clone",
                    revert: "invalid"
                });
            }
        });

        $row.unbind("click", onRowClick); // 用click、on、bind会执行两次click事件
        $row.unbind("dblclick", onRowDblClick); //双击行事件

        var fn_onEditingRowRandFinish = option.fn_onEditingRowRandFinish;
        if (fn_onEditingRowRandFinish) {
            fn_onEditingRowRandFinish($row, isAdding, data, isEditing);
        }

        return $row;
    };

    // 生成添加或编辑表单
    createForm = function (data, columns) {
        var $form = $(
            '<form class="form-horizontal" role="form"></form>');

        var $formGroupList = [];
        $.each(columns, function (i, column) {
            var rander = column.rander;
            if (!rander) {
                return;
            }

            //设置默认CSS
            var FormCss = "form-control";
            if (column.Isborder)//判断是否需要用到特殊的样式
                FormCss = "mf-form-control";

            var title = column.title;
            if (column.require) {
                title = '<span class="J-required">*</span>' + title;
            }

            var field = column.field;
            var $formGroup = $(
                '<div class="form-group">' +
                    '<label for="' + field + '" class="col-sm-2 control-label">' + title + '</label>' +
                    '<div class="col-sm-10"></div>' +
                '</div>');

            $formGroup.find(".col-sm-10")
                .append(
                    createCell(field, rander, data)
                        .addClass(FormCss));

            $formGroupList.push($formGroup);
        });

        return $form.append($formGroupList);
    };

    // 生成添加或编辑模态框
    createModal = function (title, data, onBtnOkClick) {
        var $modal = $(
            '<div class="modal fade">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">' + lang.Close + '</span></button>' +
                            '<h4 class="modal-title">' + title + '</h4>' +
                        '</div>' +
                        '<div class="modal-body"></div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-default" id="btnClose" data-dismiss="modal">' + lang.Close + '</button>' +
                            '<button type="button" class="btn btn-success" id="btnOk">' + lang.OK + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');

        var $modalBody = $modal.find(".modal-body");
        var $form = createForm(data, option.columns);
        $modalBody.append($form);

        $modal.find("#btnOk").click(function () {
            var columns = option.columns;
            var checkResult = checkEditingRow($form, columns);
            if (checkResult) {
                msg.info(lang.info, checkResult);
                return;
            }

            var newData = getEditingRowData($form, columns);
            data = $.extend(data, newData);
            onBtnOkClick && onBtnOkClick(data, function (result) {
                var message = "";
                if (result.status === "200") {
                    if (isAdding) {
                        message = lang.AddSuccess;
                    } else if (isEditing) {
                        message = lang.EditSuccess;
                    }

                    msg.success(lang.info, message, function () {
                        isAdding = false;
                        isEditing = false;
                        $modal.modal("hide");
                        self.loadData();
                    });
                } else {
                    if (isAdding) {
                        message = lang.AddFail;
                    } else if (isEditing) {
                        message = lang.EditFail;
                    }

                    message += ":" + result.msg;
                    msg.error(lang.info, message);
                }
            });
        });

        $modal.on("hidden.bs.modal", function () {
            isAdding = false;
            isEditing = false;
            $modal.remove();
        });

        return $modal;
    };

    // 根据数据生成所有行
    createRows = function (rowsData) {
        var columns = option.columns,
            uniqueId = option.uniqueId,
            undefinedText = option.undefinedText,
            $rows = [];

        $.each(rowsData, function (i, data) {
            $rows.push(createRow(i, columns, uniqueId, data, undefinedText));
        });

        return $rows;
    };

    // 生成搜索栏
    createSearchBar = function (columns) {
        var searchCells = [];
        $.each(columns, function (i, column) {
            if (column.hasOwnProperty("searchable") && column.searchable) {
                var rander = column.rander;
                if (!rander) {
                    return;
                }

                var field = column.field;
                var title = column.title;
                if (column.hasOwnProperty("searchTitle")) {
                    title = column.searchTitle;
                }

                var $cell = $(rander.createSearchCell(field + "-search"));
                if ($cell) {
                    var $searchNameCell =
                        $('<span id="' + field + '-search-name">')
                            .text(title + ":");
                    var $searchCell =
                        $("<span>")
                            .append($searchNameCell)
                            .append($cell);

                    var searchClass = column.searchClass;
                    if (searchClass) {
                        $searchCell.addClass(searchClass);
                    }
                    searchCells.push($searchCell);
                }
            }
        });

        return searchCells;
    };

    // 获取搜索栏数据
    getSearchData = function (columns) {
        if (!$searchBar || $searchBar.length <= 0) {
            return null;
        }

        var data = {};
        $.each(columns, function (i, column) {
            if (column.hasOwnProperty("searchable") && column.searchable) {
                var rander = column.rander;
                if (!rander) {
                    return;
                }

                var field = column.field;
                var $searchCell = $searchBar.find("#" + field + "-search");
                if ($searchCell.length <= 0) {
                    return;
                }

                var value = rander.getSearchCellValue($searchCell);
                if (value != null) {
                    data[field] = value;
                }
            }
        });

        return data;
    };

    //列表和
    setSumRow = function (sumColumnOptions, rowsData) {
        if (!sumColumnOptions || sumColumnOptions.length <= 0)
            return null;

        var $sumRow = $tbody.find(".sum-row");
        if ($sumRow.length <= 0) {
            $sumRow = $('<tr class="sum-row">');
            $tbody.append($sumRow);
        } else {
            $sumRow.empty();
        }

        var columnCount = $thead.find("th").length, i;
        for (i = 0; i < columnCount; i++) {
            $sumRow.append('<th id="sum-row-th-' + i + '">');
        }

        $.each(sumColumnOptions, function (i, sumColumn) {
            var sum = 0;
            $.each(rowsData, function (i, rowData) {
                sum += Number(rowData[sumColumn.columnName]);
            });
            var $sumTh = $sumRow.find("#sum-row-th-" + sumColumn.sumIndex);
            $sumTh.addClass(sumColumn.columnClass)
                  .text(sumColumn.columnTitle + ":" + sum)
                  .css(sumColumn.columnStyle);
        });
    };

    // 根据数据更新列表里的行
    updateRows = function (rowsData) {
        $tbody.empty();
        if (rowsData && rowsData.length > 0) {
            $tbody
                .append(createRows(rowsData))
                .find("tr")
                    .click(onRowClick)
                    .dblclick(onRowDblClick);
        }

        setSumRow(option.sumColumnOptions, rowsData);

        $wrapper.animate({ scrollLeft: 0 }, 10);

        //找到table的parent id，
        var $tableScroll = $parent.find('.fix-table');
        //将滚动条处于顶部，取消默认为了记忆之前访问的位置，通常不会处理
        $tableScroll.animate({ scrollTop: 0 }, 500);

    };

    // 设置选中行样式
    setRowSelectClass = function ($row) {
        $tbody.find("tr").removeClass("active");
        $row.addClass("active");
    };

    // 检查编辑行输入是否合法
    checkEditingRow = function ($row, columns) {
        var errorMessage = null;

        columns.some(function (column) {

            var rander = column.rander;
            if (!rander) {
                return false;
            }

            var id = column.field;
            var $cell = $row.find("#" + id);

            var value = null;
            if (isAdding) {
                value = rander.getAddingCellValue($cell);
            } else if (isEditing) {
                value = rander.getEditingCellValue($cell);
            }

            var checkers = column.checkers;
            if (!checkers || checkers.length <= 0) {
                return false;
            }

            var hasError = checkers.some(function (checker) {
                var message = checker.check(value, $row);
                if (message) {
                    errorMessage = message;
                    return true;
                }
            });
            return hasError;
        });

        if (errorMessage == null) {
            var fn_onEditingRowArgsCheck = option.fn_onEditingRowArgsCheck;
            if (fn_onEditingRowArgsCheck) {
                var index = $row.data("index");
                var rowdata = rowsData[index];
                errorMessage = fn_onEditingRowArgsCheck($row, rowdata, isAdding);
            }
        }

        return errorMessage;
    };

    // 获取编辑行里的行数据
    getEditingRowData = function ($editingRow, columns) {
        var data = {};
        $.each(columns, function (i, column) {
            var rander = column.rander;
            if (!rander) {
                return;
            }

            var field = column.field;
            var $cell = $editingRow.find("#" + field);

            if (isAdding) {
                data[field] = rander.getAddingCellValue($cell);
            } else if (isEditing) {
                data[field] = rander.getEditingCellValue($cell);
            }
        });
        return data;
    };

    // 结束添加行或编辑行
    finishEditing = function (fn_checkPass, fn_checkFail) {
        $table.focus(); // 让列表获取一下焦点使列表能及时接受点击回车事件

        var $editingRow = $tbody.find(".editingRow");
        if ($editingRow.length <= 0) {
            fn_checkPass && fn_checkPass();
            return true;
        }

        var columns = option.columns;
        var checkResult = checkEditingRow($editingRow, columns);

        if (checkResult) {
            /*
            @editor Alvin
            @time 2017年5月19日15:15:47
            @function 修改检查必输项可修改可刷新的操作
            */
            msg.info(lang.info, checkResult, fn_checkFail);
            return false;
        }

        var index = $editingRow.data("index");
        var oldData = rowsData[index];
        var newData = $.extend(
            oldData,
            getEditingRowData($editingRow, columns));

        if (isAdding) {
            records[newData[option.uniqueId]] = { type: "add", data: newData };
        } else if (isEditing) {
            var id = newData[option.uniqueId];
            if (records.hasOwnProperty(id)) {
                var oldRecord = records[id];
                if (oldRecord.type === "add") {
                    oldRecord.data = newData;
                }
            } else {
                records[id] = { type: "edit", data: newData };
            }
        }

        isAdding = false;
        isEditing = false;

        var $row = createRow(index, columns, option.uniqueId, newData, option.undefinedText);
        $editingRow.replaceWith($row);
        $row.click(onRowClick);
        $row.dblclick(onRowDblClick);
        rowsData[index] = newData;

        fn_checkPass && fn_checkPass();

        return true;
    };


    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                             public
    // --------------------------------------------------------------------

    /**
   * 获取table的Option
   * @author Duke
   * @public
   * @param {newoption}  table的newOption
   * @example
   * var table = new mf.Table(...);
   * table.setOption({
        editable: false
     });
   */
    this.setOption = function (newOption) {
        option = $.extend({}, self.getOption(), newOption);
    }
    /**
    * 获取table的Option
    * @author Duke
    * @public  
    */
    this.getOption = function () {
        return option;
    }

    this.loadData = function (searchData, isRemainRecord, resetpage) {
        if (!finishEditing()) {
            return false;
        }

        var paginationBar = option.paginationBar,
            pagination = null, rows = null;
        searchData = $.extend(getSearchData(option.columns), searchData);

        if (paginationBar) {
            pagination = paginationBar.getPagination();
            //返回第一页
            if (resetpage) {
                pagination.page = resetpage;
            }
        }
        option.fn_getData(pagination, searchData, function (data) {
            if (data.hasOwnProperty("rows")) {
                rows = data.rows;
            } else {
                rows = data;
            }
            //返回第一页
            if (resetpage) {
                paginationBar.setPage(resetpage);
            }

            if (!(Object.prototype.toString.call(rows) === "[object Array]")) {
                console.error("data that get from loadData is not a array.");
                return;
            }
            if (data.hasOwnProperty("total")) {
                if (paginationBar) {
                    paginationBar.setTotal(data.total);
                } else {
                    console.warn("you have configure a paginationBar but data have no 'total'");
                }
            }
            

            updateRows(rows);
            rowsData = rows;
            

            if (!isRemainRecord) {
                records = [];
            }
            if (option.isFrozenColumn) {
                console.log("FrozenColumn");
                $(domStr).parent().parent().scroll(function () {
                    var left = $(this).scrollLeft() - 1;
                    var $head_tr = $(this).find(".mf-head-table").find("tr");
                    var $tr = $(domStr).find("tr");
                    $head_tr.each(function (index) {
                        $(this).children().eq(0).css({
                            "box-shadow": "1px 1px #e7eaec",
                            "background-color": "white",
                            "padding-left": "3px",
                            "position": "relative",
                            "top": "0px",
                            "left": left
                        });
                        $(this).children().eq(1).css({
                            "box-shadow": "1px 1px #e7eaec",
                            "background-color": "white",
                            "padding-left": "3px",
                            "position": "relative",
                            "top": "0px",
                            "left": left
                        });
                    });
                    $tr.each(function (index) {
                        $(this).children().eq(0).css({
                            "box-shadow": "1px 1px #e7eaec",
                            "background-color": "white",
                            "padding-left": "3px",
                            "position": "relative",
                            "top": "0px",
                            "left": left
                        });
                        $(this).children().eq(1).css({
                            "box-shadow": "1px 1px #e7eaec",
                            "background-color": "white",
                            "padding-left": "3px",
                            "position": "relative",
                            "top": "0px",
                            "left": left
                        });
                    });
                });
            }

            isLoadData = false;

        });

        return true;
    };

    this.addRow = function () {
        if (!option.editable) {
            return false;
        }

        if (!finishEditing()) {
            return false;
        }
        console.log(isLoadData);
        if (isLoadData == true) {
            return false;
        }


        isAdding = true;

        var data = {};
        var uniqueId = option.uniqueId;
        var columns = option.columns;

        $.each(columns, function (i, column) {
            if (column.hasOwnProperty("defaultValue")) {
                data[column.field] = column.defaultValue;
            } else {
                data[column.field] = null;
            }
        });
        data[uniqueId] = mf.deal.guid();

        var $trs = $tbody.find("tr");
        var index = 0;
        if ($trs.length > 0) {
            index = $tbody.find("tr").last().data("index") + 1;
        }
        var $row = createRow(index, columns, option.uniqueId, data, option.undefinedText);
        $row.addClass("editingRow");
        $tbody.append($row);
        setRowSelectClass($row);
        $row.find("#" + option.focusField).focus();
        if (!rowsData) {
            rowsData = {};
        }
        rowsData[index] = data;
        option.fn_ResetRow && option.fn_ResetRow(data);
        return true;
    };

    //设置编辑状态；
    this.seteditStatus = function (Status) {
        if (Status) {
            option.editable = true;
        }
        else {
            option.editable = false;
        }

    }

    this.editRow = function () {
        var $selectedRow = $tbody.find(".active");
        var result = option.fn_checkeditable && option.fn_checkeditable($selectedRow);

        if (isLoadData == true) {
            return false;
        }

        if (result) {
            return false;
        }

        if (!option.editable) {
            return false;
        }

        if (!finishEditing()) {
            return false;
        }

        if ($selectedRow.length <= 0) {
            msg.info(lang.info, lang.selectFirst);
            return false;
        }

        isEditing = true;

        var index = $selectedRow.data("index");
        if (index < 0 || index >= rowsData.length) {
            console.error("index:" + index + " get from row is invild");
            return false;
        }

        var data = rowsData[index];
        var $row = createRow(index, option.columns, option.uniqueId, data, option.undefinedText);
        $row.addClass("editingRow");
        setRowSelectClass($row);
        $selectedRow.replaceWith($row);
        if (option.focusEditField && option.focusEditField.length > 0) {
            $row.find("#" + option.focusEditField).focus();
        }
        else {
            $row.find("#" + option.focusField).focus();
        }
        option.fn_ResetRow && option.fn_ResetRow(data);
        return true;
    };

    //删除table行
    this.deleteRow = function (cancelcall) { //该函数按取消的时候执行，可为空,2017年9月11日10:07:20 Jim
        if (!option.editable) {
            return false;
        }
 
        var $selectedRow = $tbody.find(".active");
        if ($selectedRow.length <= 0) {
            msg.info(lang.info, lang.selectFirst);
            return false;
        }

        var index = $selectedRow.data("index");
        var id = null, data = null;
        if ($selectedRow.hasClass("editingRow")) {
            if (isAdding) {
                $selectedRow.remove();
                rowsData.splice(index, 1);
                isAdding = false;
                return true;
            }
            isEditing = false;
        }

        if (index < 0 || index >= rowsData.length) {
            console.error("index:" + index + " get from row is invild");
            return false;
        }
        
        data = rowsData[index];
        id = data[option.uniqueId];

        if (option.isRealDelete) {
           
            if (!cancelcall) {
                msg.warning(lang.info, lang.ComfirmDelete,
                function () {
                    if (records.hasOwnProperty(id) && records[id].type == "add") {
                        msg.success(lang.info, lang.DeleteSuccess);
                        delete records[id];
                        rowsData.splice(index, 1);
                        updateRows(rowsData);
                        return;
                    }
                    option.fn_realDelete && option.fn_realDelete(data, function (result) {
                        if (result.status === "200") {
                            msg.success(lang.info, lang.DeleteSuccess);
                            if (records.hasOwnProperty(id)) {
                                delete records[id];
                            }
                            rowsData.splice(index, 1);
                            updateRows(rowsData);
                        } else {
                            msg.error(lang.info, lang.DeleteFail + ":" + result.msg);
                        }
                    });
                }, null);
            } else {
                msg.warning(lang.info, lang.ComfirmDelete,
               function () {
                   if (records.hasOwnProperty(id) && records[id].type == "add") {
                       msg.success(lang.info, lang.DeleteSuccess);
                       delete records[id];
                       rowsData.splice(index, 1);
                       updateRows(rowsData);
                       return;
                   }
                   option.fn_realDelete && option.fn_realDelete(data, function (result) {
                       if (result.status === "200") {
                           msg.success(lang.info, lang.DeleteSuccess);
                           if (records.hasOwnProperty(id)) {
                               delete records[id];
                           }
                           rowsData.splice(index, 1);
                           updateRows(rowsData);
                       } else {
                           msg.error(lang.info, lang.DeleteFail + ":" + result.msg);
                       }
                   });
               }, cancelcall);//按取消的时候执行
            }
        }
        else {
            if (records.hasOwnProperty(id)) {
                var oldRecord = records[id];
                if (oldRecord.type === "add") {
                    delete records[id];
                } else if (oldRecord.type === "edit") {
                    oldRecord.type = "delete";
                }
            } else {
                if (data[option.uniqueId]) {
                    records[data[option.uniqueId]] = { type: "delete", data: data };
                }
                else {
                    records[data[option.deleteId]] = { type: "delete", data: data };
                }
            }
            rowsData.splice(index, 1);
            updateRows(rowsData);
        }

        return true;
    };

    this.hasChange = function () {
        return Object.keys(records).length > 0;
    };

    this.hasSelected = function () {
        return $tbody.find(".active").length > 0;
    };

    // 保证数据与后台同步后再进行下一步与数据有关的操作
    // forwordCallback() 当数据安全时调用
    // waitCallback() 当判断出不能进行下一步时调用
    this.goForwordSafely = function (forwordCallback, waitCallback) {
        finishEditing(function () {
            // 通过checker的参数检查
            if (self.hasChange()) {
                // 有修改
                msg.warning(lang.info,
                    lang.SaveOrNot,
                    function () {

                        // 确认保存
                        self.save(function () {
                            // 保存成功
                            forwordCallback && forwordCallback();
                        },
                            function () {
                                // 保存失败
                                waitCallback && waitCallback();
                            },
                            false);
                    },
                    function () {
                        // 取消保存
                        waitCallback && waitCallback();
                    });
            } else {
                // 没有修改
                forwordCallback && forwordCallback();
            }
        },
           function () {

               // 没有通过checker的参数检查

               // 编辑行状态下不执行waitCallback
               if (isAdding || isEditing) {
                   return;
               }
               waitCallback && waitCallback();
           });
    };

    // @author Alvin 2017年3月1日11:06:41
    // 控制操作列按钮在编辑(self.hasChange()==true)状态时,验证按钮操作
    // forwordCallback() 有数据改变且保存成功
    // waitCallback() 有数据改变且保存失败或者有数据改变但是取消保存
    //cancelCallback()当table没数据改变时执行回调
    this.goForwordSafelyOpeButton = function (forwordCallback, waitCallback, cancelCallback) {
        finishEditing(function () {
            if (self.hasChange()) {
                msg.warning(lang.info,
                    lang.SaveOrNot,
                    function () {
                        self.save(function () {
                            forwordCallback && forwordCallback();
                        },
                            function () {
                                waitCallback && waitCallback();
                            },
                            false);
                    },
                    function () {
                        waitCallback && waitCallback();
                    });
            } else {
                cancelCallback && cancelCallback();
            }
        });
    };

    // @author Jack 2017年6月6日19:08:21
    // 保证数据与后台同步后再进行下一步与数据有关的操作
    // forwordCallback() 当数据安全时调用
    // waitCallback() 当判断出不能进行下一步时调用
    this.goForword = function (forwordCallback, waitCallback, tips) {
        $table.focus();
  
        var $editingRow = $tbody.find(".editingRow");
        if ($editingRow.length > 0) {
            var columns = option.columns;
            var checkResult = checkEditingRow($editingRow, columns);

            if (checkResult && checkResult.length > 0) {
                tips = tips && tips.length > 0 ? tips : lang.IsReloadOrNot;
                msg.warning(lang.info, tips,
                    function () {
                        waitCallback && waitCallback();
                    }, null);
            }
            else {
                finishEditing();
                if (self.hasChange()) {
                    msg.warning(lang.info, lang.SaveOrNot,
                        function () {
                            self.save(
                                function () {
                                    forwordCallback && forwordCallback();
                                },
                                function () {
                                    waitCallback && waitCallback();
                                },
                                false);
                        },
                        function () {
                            waitCallback && waitCallback();
                        });
                } else {
                    forwordCallback && forwordCallback();
                }
            }
        }
        else {
            if (self.hasChange()) {
                msg.warning(lang.info, lang.SaveOrNot,
                    function () {
                        self.save(
                            function () {
                                forwordCallback && forwordCallback();
                            },
                            function () {
                                waitCallback && waitCallback();
                            },
                            false);
                    },
                    function () {
                        waitCallback && waitCallback();
                    });
            } else {
                forwordCallback && forwordCallback();
            }
        }
    };

    //判断是否保存没
    this.SaveOrNotStatus = function () {
        $table.focus();
        var $editingRow = $tbody.find(".editingRow");
        if ($editingRow.length > 0) {
            return true;
        }
        else {
            if (self.hasChange()) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 保存数据
    // successCallback(data) 保存成功回调 data 返回数据
    // failCallback(data) 保存失败回调
    // remindWhenNothingToSave 是否提示没有数据保存
    this.save = function (successCallback, failCallback, remindWhenNothingToSave) {

        if (!option.editable) {
            return false;
        }

        if (!finishEditing()) {
            return false;
        }

        if (!self.hasChange()) {
            remindWhenNothingToSave && msg.info(lang.info, lang.NothingToSave);
            return true;
        }


        // 打包数据
        var uniqueIdName = option.uniqueId;
        var deleted = [];
        var inserted = [];
        var updated = [];
        console.log(records);

        Object.keys(records)// Object.keys()函数var obj = {'a':'123','b':'345'};console.log(Object.keys(obj));  //['a','b']
            .forEach(function (id) {
                if (records.hasOwnProperty(id)) {//hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。如果有，返回true，否则返false
                    var record = records[id];
                    switch (record.type) {
                        case "add":
                            inserted.push(record.data);
                            break;
                        case "edit":
                            updated.push(record.data);
                            break;
                        case "delete":
                            deleted.push(record.data);
                            break;
                    }
                }
            });

        var saveData = null;

        if (option.isRealDelete) {
            saveData = {
                inserted: inserted,
                updated: updated,
                deleted: []
            };
        }
        else {
            saveData = {
                inserted: inserted,
                updated: updated,
                deleted: deleted
            };
        }

        option.fn_saveData(
                   saveData,
                   function (data, callback) {//callback函数保存成功之后按确认之后调用 2017年9月12日17:52:31
                       self.loadData();
                       console.log(data);

                       var haveError = false,
                       haveInsertedError = false,//@author Alvin
                       haveUpdatedError = false,//@author Alvin
                       haveDeletedError = false,//@author Alvin
                       hasMsg = false;//@author Alvin 判断是否是旧数据返回的接口
                       //@author Alvin 
                       // {"inserted":null,"updated":null,"deleted":{"success":1,"fail":0,"failIDs":null}}
                       // {"inserted":null,"updated":null,"deleted":{"success":1,"fail":0,"failIDs":null,"Msg":"重复代码"}}
                       //代号重复时报错
                       if (data.inserted) {
                           if (data.inserted.fail > 0) {
                               if (data.inserted.msg) {
                                   hasMsg = true;
                               }
                           }
                       }
                       else if (data.updated) {
                           if (data.updated.fail > 0) {
                               if (data.updated.msg) {
                                   hasMsg = true;
                               }
                           }
                       }
                       else if (data.deleted) {
                           if (data.deleted.fail > 0) {
                               if (data.deleted.msg) {
                                   hasMsg = true;
                               }
                           }
                       }
                       if (hasMsg) {
                           if (data.inserted && data.inserted.fail > 0 && data.inserted.msg.length > 0) {
                               haveInsertedError = true;
                           }

                           if (data.updated && data.updated.fail > 0 && data.updated.msg.length > 0) {
                               haveUpdatedError = true;
                           }

                           if (data.deleted && data.deleted.fail > 0) {
                               haveDeletedError = true;
                           }
                       }
                       else {
                           if (data.inserted && data.inserted.fail > 0) {
                               haveError = true;
                               // TODO: 处理添加错误
                           }
                           if (data.updated && data.updated.fail > 0) {
                               haveError = true;
                               // TODO: 处理更新错误
                           }
                           if (data.deleted && data.deleted.fail > 0) {
                               haveError = true;
                               // TODO: 处理删除错误
                           }
                       }
                       //@author Alvin
                       if (haveInsertedError) {
                           //Inserted时识别后台返回的Msg
                           msg.error(lang.info, data.inserted.msg, function () {
                               failCallback && failCallback(data);
                           });
                       }
                       else if (haveUpdatedError) {
                           //Updated时识别后台返回的Msg
                           msg.error(lang.info, data.updated.msg, function () {
                               failCallback && failCallback(data);
                           });
                       }
                       else if (haveDeletedError) {
                           //Deleted错误
                           var tips = data.deleted.msg;
                           if (data.deleted.success > 0) {
                               tips = tips + "," + lang.OtherDataDeleted;
                               console.log(tips + "    " + lang.OtherDataDeleted);
                           }
                           msg.error(lang.info, tips, function () {
                               failCallback && failCallback(data);
                           });
                       }
                       else if (haveError) {
                           msg.error(lang.info, lang.SaveFail, function () {
                               failCallback && failCallback(data);
                           });
                       }
                       else {
                           msg.success(lang.info, lang.SaveSuccess, function () {
                               self.loadData();
                               successCallback && successCallback(data);
                               if (callback && typeof callback == "function") {
                                   callback()
                               }
                           });
                       }

                   },
                   rowsData);
                
        return true;
    };

    this.getSelectedData = function (dontRemind) {
        if (!finishEditing()) {
            return null;
        }

        var $selectedRow = $tbody.find(".active");
        if ($selectedRow.length <= 0) {
            (!dontRemind) && msg.info(lang.info, lang.selectFirst);
            return null;
        }

        var index = $selectedRow.data("index");
        return rowsData[index];
    };

    this.getRowData = function ($row) {
        var index = $row.data("index");
        return rowsData[index];
    };

    this.getAllRowData = function () {
        return rowsData;
    };

    this.addRowInModal = function (title, fn_addData) {
        if (option.editable) {
            return false;
        }

        var data = {};
        $.each(option.columns, function (i, column) {
            if (column.hasOwnProperty("defaultValue")) {
                data[column.field] = column.defaultValue;
            } else {
                data[column.field] = null;
            }
        });

        isAdding = true;
        var $modal = createModal(lang.Add + title, data, fn_addData);
        $modal.modal("show");
        return true;
    };

    this.editRowInModal = function (title, fn_editData) {
        if (option.editable) {
            return false;
        }

        var data = self.getSelectedData(false);
        if (data == null) {
            return false;
        }

        isEditing = true;
        var $modal = createModal(lang.Edit + title, data, fn_editData);
        $modal.modal("show");
        return true;
    };

    this.deleteRowInSync = function (fn_deleteData) {
        if (option.editable) {
            return false;
        }

        var data = self.getSelectedData(false);
        if (data == null) {
            return false;
        }

        msg.warning(lang.info, lang.ComfirmDelete,
            function () {
                // 确定删除
                fn_deleteData && fn_deleteData(data, function (result) {
                    // 删除成功
                    if (result.status === "200") {
                        msg.success(lang.info, lang.DeleteSuccess, function () {
                            isAdding = false;
                            isEditing = false;
                            self.loadData();
                        });
                    } else {
                        msg.error(lang.info, lang.DeleteFail + ":" + result.msg);
                    }
                });
            },
            function () {
                // 取消删除
            });

        return true;
    };

    // 清空列表数据
    this.clean = function () {
        isAdding = false;
        isEditing = false;
        records = {};
        $tbody.empty();
    };

    // 设置编辑行$row对象的field列的值，其中$row是tr
    this.setEditingColumnValue = function ($row, field, value) {
        var rander = getRanderByField(field);
        if (rander == null) {
            return false;
        }

        if (!isAdding && !isEditing) {
            return false;
        }

        var $cell = $row.find("#" + field);
        if ($cell.length <= 0) {
            return false;
        }

        if (isAdding) {
            rander.setAddingCellValue($cell, value);
        } else if (isEditing) {
            rander.setEditingCellValue($cell, value);
        }

        return true;
    };

    // 获取编辑行$row对象的field列的值
    this.getEditingColumnValue = function ($row, field) {
        var rander = getRanderByField(field);
        if (rander == null) {
            return null;
        }

        if (!isAdding && !isEditing) {
            return null;
        }

        var $cell = $row.find("#" + field);
        if ($cell.length <= 0) {
            return null;
        }

        if (isAdding) {
            return rander.getAddingCellValue($cell);
        } else if (isEditing) {
            return rander.getEditingCellValue($cell);
        } else {
            return null;
        }
    };

    // 设置某个单元格的值
    this.updateCellValue = function (rowIndex, fieldIndex, field, value) {
        var rander = getRanderByField(field);
        if (rander == null) {
            return false;
        }

        var $rows = $(domStr).find("tr").eq(rowIndex).find("td").eq(fieldIndex).html(rander.createCell(field, value));

        var newData = rowsData[rowIndex];

        newData[field] = value;

        var id = newData[option.uniqueId];
        if (records.hasOwnProperty(id)) {
            var oldRecord = records[id];
            if (oldRecord.type == "add") {
                oldRecord.data = newData;
            }
        } else {
            records[id] = { type: "edit", data: newData };
        }

        return true;
    };

    /**
     * 在表尾插入行
     * @public
     * @param {(Object|Object[])} data - 要插入的行数据
     * @returns {Number} 插入行数 
     * @example
     * var table = new mf.Table(...);
     * // 传入对象插入一行
     * table.pushRow({arg1:"arg1",arg2:"arg2"});
     * // 传入数组插入多行
     * table.pushRow([
     *     {arg1:"arg1",arg2:"arg2"},
     *     {arg1:"arg1",arg2:"arg2"}
     * ]);
     */
    this.pushRow = function (data) {
        var datas = null;
        if (Array.isArray(data)) {
            datas = data;
        } else {
            datas = [data];
        }

        var insertCount = 0;
        datas.forEach(function (d) {

            // @todo 检查d是否包含column配置里的必填参数

            var rowData = $.extend({}, d);
            var id = mf.deal.guid();
            rowData[option.uniqueId] = id;
            rowsData.push(rowData);
            records[id] = { type: "add", data: rowData };

            insertCount++;
        });

        updateRows(rowsData);

        return insertCount;
    };

    /*
 * Amanda
 * 在表尾插入行(pushRow不同处在于流水号要与之前的流水号一致
 修改处：var id = rowData[option.uniqueId];
 ）
 * @public
 * @param {(Object|Object[])} data - 要插入的行数据
 * @returns {Number} 插入行数 
 * @example
 * var table = new mf.Table(...);
 * // 传入对象插入一行
 * table.pushRow({arg1:"arg1",arg2:"arg2"});
 * // 传入数组插入多行
 * table.pushRow([
 *     {arg1:"arg1",arg2:"arg2"},
 *     {arg1:"arg1",arg2:"arg2"}
 * ]);
 */

    this.pushRowOne = function (data) {
        var datas = null;
        if (Array.isArray(data)) {
            datas = data;
        } else {
            datas = [data];
        }

        var insertCount = 0;
        datas.forEach(function (d) {

            // @todo 检查d是否包含column配置里的必填参数

            var rowData = $.extend({}, d);
            var id = rowData[option.uniqueId];
            rowData[option.uniqueId] = id;
            rowsData.push(rowData);
            records[id] = { type: "add", data: rowData };

            insertCount++;
        });

        updateRows(rowsData);

        return insertCount;
    };



    /**
     * 删除行
     * @public
     * @param {Object[]} $rows - 要删除的行对象(tr)数组
     * @returns {Number} 删除行数 
     * @example
     * var table = new mf.Table(...);
     * table.removeRow([$("tr")]);
     */
    this.removeRow = function ($row) {
        var $rows = $row;
        var uniqueId = option.uniqueId,
            deleteCount = 0;
        $.each($rows, function (j, $r) {
            var i = $r.data("index");
            var data = rowsData[i];
            var id = data[uniqueId];
            rowsData.splice(i, 1);
            updateRows(rowsData);
            $r.remove();
            if (records.hasOwnProperty(id)) {
                var oldRecord = records[id];
                if (oldRecord.type === "add") {
                    delete records[id];
                } else if (oldRecord.type === "edit") {
                    oldRecord.type = "delete";
                }
            } else {
                records[data[uniqueId]] = { type: "delete", data: data };
            }

            deleteCount++;
        });

        return deleteCount;
    };

    /**
     * 获取多选选中的jquery tr对象
     * @public
     * @return {Object[]} 选中的jquery tr对象数组
     * @example
     * var table = new mf.Table(...);
     * var $selectedRows = table.getMultiSelectedRows();
     * $selectedRows.each(function (i, $selectedRow) {
     *   var index = $selectedRow.data("index"); // 可以在$selectedRow里获取到对应数据索引
     *   var id = $selectedRow.data("uniqueId"); // 和对应数据的id
     *   var rowData = table.getRowData($selectedRow); // 也可以拿对应的行数据
     * });
     * 
     */
    this.getMultiSelectedRows = function () {
        return $tbody
                    .find(".multiSelected")
                    .map(function () {
                        return $(this);
                    });
    };

    /**
     * 设置指定单元格值，只能在非编辑状态下使用，使用时如果处于编辑状态会自动
     * 退出编辑状态
     * @public 
     * @param {Object} $row - jquery行对象
     * @param {String} columnName - 列名
     * @param {Object} value - 要设置的值
     * @param {boolean} refleash - 是否刷新列表
     * @return {boolean} 是否设置成功
     */
    this.setCellValue = function ($row, columnName, value, refleash) {
        if (!finishEditing()) {
            return false;
        }

        var index = $row.data("index");
        var newData = rowsData[index];
        if (!newData.hasOwnProperty(columnName)) {
            console.error("unexcepted columnName: " + columnName);
            return false;
        }

        newData[columnName] = value;

        var id = newData[option.uniqueId];
        if (records.hasOwnProperty(id)) {
            var oldRecord = records[id];
            if (oldRecord.type == "add") {
                oldRecord.data = newData;
            }
        } else {
            records[id] = { type: "edit", data: newData };
        }

        if (refleash) {
            updateRows(rowsData);
        }

        return true;
    };

    /**
     * 批量设置同一列的值
     * @public
     * @param {String} columnName - 列名
     * @param {Object[]} $rows - jquery行对象数组
     * @param {Object} value - 要设置的值
     * @param {boolean} refleash - 是否刷新列表
     * @return {int} 设置成功的行数
     * @example
     * var table = new mf.Table(...);
     * var $selectedRows = table.getMultiSelectedRows(); // 一般配合getMultiSelectedRows使用来获取选中的行对象
     * // 注意，设置刷新后$selectedRows将会失效，当要设置多列时应在最后的一次调用时刷新
     * if ($selectedRows.length == table.updateColumnValue("testColumn", $selectedRows, "testValue"， true)) {
     *   console.log("update success");
     * } else {
     *   console.log("update fail");
     * }
     */
    this.updateColumnValue = function (columnName, $rows, value, refleash) {
        var updateCount = 0;
        $.each($rows, function (i, $row) {
            if (self.setCellValue($row, columnName, value, false))
                updateCount++;
        });
        if (refleash) {
            updateRows(rowsData);
        }
        return updateCount;
    };


    /**
     * 依照条件批量设置同一列的值
     * Author：Duke
     * @public 
     * @param {columnName}  列名数组
     * @param {conditionColumnName} 匹配列名
     * @param {conditionValue} 需要筛选的值
     * @param {changeValue}  修改值数组
     * @param {boolean} refresh - 是否刷新列表
     * @return {int} 设置成功的行数
     * @example
     * var table = new mf.Table(...);
     * // 注意，设置刷新后$selectedRows将会失效，当要设置多列时应在最后的一次调用时刷新
     *table.updateColumnValueByConditions("columns1",testColumns,"XXXXX",value1,true)
     */
    this.updateColumnValueByCondition = function (columnName, conditionColumnName, conditionValue, changeValue, refresh) {
        var $selectedTrs = self.getRowsByCondition(function (rowData) {
            if (conditionValue != null) {
                console.log("selected:" + rowData[conditionColumnName] === conditionValue);
                return rowData[conditionColumnName] === conditionValue;
            } else {
                return true;
            }
        });
        return self.updateColumnValue(columnName, $selectedTrs, changeValue, refresh);
    }

    /**
     * 批量设置所有行同一列的值
     * @public
     * @param {Object[]} $rows - jquery行对象数组
     * @param {Object} value - 要设置的值
     * @param {boolean} refleash - 是否刷新列表
     * @return {int} 设置成功的行数
     */
    this.updateCurrentPageColumnValue = function (columnName, value, refleash) {
        var $trs = $tbody.find("tr").map(function () { return $(this); });
        return self.updateColumnValue(columnName, $trs, value, refleash);
    };

    /**    　
     * @callback mf.Table~condition
     * @param {Object} pagination - 分页数据
     * @param {Object} searchData - 搜索数据
     * @param {Object} success - 成功回调
     */

    /**
     * 筛选行对象
     * @public
     * @param {mf.Table~condition} fn_condition - 条件判断回调函数
     * @return {Object[]} 符合条件的tr对象数组
     * @example
     * var table = new mf.Table(...);
     * var $selectedRows = table.getRowsByCondition(function (rowData) { 
     *    return rowData["arg1"] === 1 && rowData["arg2"] === 2;
     * });
     */
    this.getRowsByCondition = function (fn_condition) {
        if (!fn_condition) {
            return null;
        }

        var $selectedTrs = [];
        var $trs = $tbody.find("tr").map(function () { return $(this); });
        $.each($trs, function (i, $tr) {
            var index = $tr.data("index");
            if (fn_condition($.extend({}, rowsData[index]))) {
                $selectedTrs.push($tr);
            }
        });

        return $selectedTrs;
    };

    /**
    * 将TABEL结束编辑状态
    * Author：Amanda 2017-3-9  
    */

    this.editFinish = function () {
        return finishEditing();
    };


    /**
     * 批量删除
     * Author：Duke 2017-3-13  
    // */
    this.deleteMultiSelectedRows = function () {
        var $selectedRows = self.getMultiSelectedRows();
        if ($selectedRows.length == 0) {
            msg.info(lang.info, lang.selectFirst);
            return false;
        }
        var newData = $.extend({}, rowsData);
        $.each($selectedRows, function (i, $selectedRow) {
            var index = $selectedRow.data("index");
            var id = null, data = null;
            if ($selectedRow.hasClass("editingRow")) {
                if (isAdding) {
                    $selectedRow.remove();
                    rowsData.splice(index, 1);
                    isAdding = false;
                    return true;
                }

                isEditing = false;
            }
            data = newData[index];

            id = data[option.uniqueId];
            rowsData.splice(index - i, 1);

            if (records.hasOwnProperty(id)) {
                var oldRecord = records[id];
                if (oldRecord.type === "add") {
                    delete records[id];
                } else if (oldRecord.type === "edit") {
                    oldRecord.type = "delete";
                }
            } else {
                records[data[option.uniqueId]] = { type: "delete", data: data };
            }
            return true;
        });
        updateRows(rowsData);
    }

    /**
     * 全选
     * Author：Duke 2017-3-13  
     */
    this.setAllRowsChecked = function () {
        var $allTrs = $tbody.find('tr').map(function () { return $(this); });
        $('.mf-option').prop("checked", true);
        //for (var i = 0; i < $allTrs.length;i++){
        //    $allTrs.eq(i).addClass("multiSelected");
        //}
        $.each($allTrs, function (i, $tr) {
            $tr.addClass("multiSelected");
        });
    }
    /**
     * 取消全选
     * Author：Duke 2017-3-13  
     */
    this.setAllRowsUnChecked = function () {
        var $allRows = $tbody.find('tr').map(function () { return $(this); });
        $('.mf-option').prop("checked", false);
        $.each($allRows, function (i, $row) {
            $row.removeClass("multiSelected");
        });
    }
    /**
    * 重新rebuid table。
    * Author：Duke 2017-3-13  
    */
    this.rebuildTable = function () {
        if (!domStr || domStr.length <= 0) {
            console.error("table domStr is null");
            return null;
        }

        $table = $(domStr);
        if ($table.length <= 0) {
            console.error("invaild table domStr:" + domStr);
            return null;
        }

        if (!option) {
            option = {};
        }
        option = $.extend({}, defaultOption, option);

        var uniqueId = option.uniqueId;
        if (!uniqueId || uniqueId.length <= 0) {
            console.error("you have not configure options.uniqueId.");
            return null;
        }

        var columns = option.columns;
        var length = columns.length;
        if (!columns || length <= 0) {
            console.error("you have not configure any columns.");
            return null;
        }

        for (var i = 0; i < length; i++) {
            var column = columns[i];
            var rander = column.rander;
            if (rander && !(rander instanceof mf.Rander)) {
                console.error("you have configure a invaild Rander of field:" + column.field);
                return null;
            }

            var checkers = column.checkers;
            if (checkers && checkers.length > 0) {
                for (var j = 0, length2 = checkers.length; j < length2; j++) {
                    if (!(checkers[j] instanceof mf.Checker)) {
                        console.error("you have configure a invail EditCheck in field:" + column.field);
                        return null;
                    }
                }
            }

            columns[i] = $.extend({}, defaultColumn, column);
        }

        var paginationBar = option.paginationBar;
        if (paginationBar && !(paginationBar instanceof mf.PaginationBar)) {
            console.error("you have configure a wrong type paginationBar, it must be a mf.PaginationBar.");
            return null;
        }
        if (paginationBar) {
            paginationBar.change(onPaginationBarChange);
        }

        var fn_getData = option.fn_getData;
        if (!fn_getData) {
            console.error("you have not configure fn_getData.");
            return null;
        }
        if (typeof fn_getData != "function") {
            console.error("the fn_getData you configured is not a function.");
            return null;
        }

        if (option.editable) {
            var fn_saveData = option.fn_saveData;
            if (!fn_saveData) {
                console.error("you have not configure fn_saveData.");
                return null;
            }
            if (typeof fn_saveData != "function") {
                console.error("the fn_saveData you configured is not a function.");
                return null;
            }
        }

        // 构建搜索栏
        var searchBarStr = option.searchBarStr;
        if (searchBarStr && searchBarStr.length > 0) {
            $searchBar = $(searchBarStr);
            if ($searchBar.length > 0) {
                $searchBar.append(createSearchBar(columns));
            }
        }

        // 构建table
        $wrapper = $('<div class="mf-table-wrapper"></div>');
        var $parent = $table.parent();
        $parent.append($wrapper);

        $thead = createThHeader(columns);
        var $headTable = $("<table>");
        $headTable
            .addClass("table table-bordered mf-head-table")
            .append($thead);

        var $fixHeadDiv = $('<div>');
        $fixHeadDiv
            .addClass("fix-head")
            .append($headTable)
            
        if (option.IsSetTableWidth) {
            $fixHeadDiv.width(columnWidth + "px")
        }


        var $fixTableDiv = $("<div>");
        if (option.hasOwnProperty("height"))
            $fixTableDiv.height(option.height);
        $fixTableDiv
            .addClass("fix-table")
            .append($table)

        if (option.IsSetTableWidth) {
            $fixTableDiv.width(columnWidth + "px")
        }

        $wrapper
            .append($fixHeadDiv)
            .append($fixTableDiv);

        $tbody = $("<tbody>");
        $table
            .empty()
            .append($tbody)
            .addClass("table table-bordered table-hover mf-body-table")
            .keypress(onTableKeyPress);

        if (option.editable) {
            $table.attr("tabindex", 1); // 添加tabindex属性使列表可以触发keypress事件
        }

        if (option.rowDroppable) {
            $wrapper.droppable({
                drop: option.fn_rowDrop,
                accept: option.rowDroppableAccept
            });
        }

        if (option.rowDraggable) {
            jQuery.browser = {}; (function () {
                jQuery.browser.msie = false;
                jQuery.browser.version = 0;
                if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
                    jQuery.browser.msie = true;
                    jQuery.browser.version = RegExp.$1;
                }
            })();
        }

    }

    //加载数据后执行callBack
    // Jack 2017年5月2日01:08:31
    this.loadDataBack = function (searchData, callBack) {
        if (!finishEditing()) {
            return false;
        }

        var paginationBar = option.paginationBar,
            pagination = null, rows = null;

        searchData = $.extend(getSearchData(option.columns), searchData);

        if (paginationBar) {
            pagination = paginationBar.getPagination();
        }

        option.fn_getData(pagination, searchData, function (data) {
            if (data.hasOwnProperty("rows")) {
                rows = data.rows;
            } else {
                rows = data;
            }

            if (!(Object.prototype.toString.call(rows) === "[object Array]")) {
                console.error("data that get from loadData is not a array.");
                return;
            }

            if (data.hasOwnProperty("total")) {
                if (paginationBar) {
                    paginationBar.setTotal(data.total);
                } else {
                    console.warn("you have configure a paginationBar but data have no 'total'");
                }
            }

            updateRows(rows);
            rowsData = rows;

            records = [];

            callBack && callBack();
        });

        return true;
    };

    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                              init
    // --------------------------------------------------------------------

    if (!domStr || domStr.length <= 0) {
        console.error("table domStr is null");
        return null;
    }

    $table = $(domStr);
    if ($table.length <= 0) {
        console.error("invaild table domStr:" + domStr);
        return null;
    }

    if (!option) {
        option = {};
    }
    option = $.extend({}, defaultOption, option);

    var uniqueId = option.uniqueId;
    if (!uniqueId || uniqueId.length <= 0) {
        console.error("you have not configure options.uniqueId.");
        return null;
    }

    var columns = option.columns;
    var length = columns.length;
    if (!columns || length <= 0) {
        console.error("you have not configure any columns.");
        return null;
    }

    for (var i = 0; i < length; i++) {
        var column = columns[i];
        var rander = column.rander;
        if (rander && !(rander instanceof mf.Rander)) {
            console.error("you have configure a invaild Rander of field:" + column.field);
            return null;
        }

        var checkers = column.checkers;
        if (checkers && checkers.length > 0) {
            for (var j = 0, length2 = checkers.length; j < length2; j++) {
                if (!(checkers[j] instanceof mf.Checker)) {
                    console.error("you have configure a invail EditCheck in field:" + column.field);
                    return null;
                }
            }
        }

        columns[i] = $.extend({}, defaultColumn, column);
    }

    var paginationBar = option.paginationBar;
    if (paginationBar && !(paginationBar instanceof mf.PaginationBar)) {
        console.error("you have configure a wrong type paginationBar, it must be a mf.PaginationBar.");
        return null;
    }
    if (paginationBar) {
        paginationBar.change(onPaginationBarChange);
    }

    var fn_getData = option.fn_getData;
    if (!fn_getData) {
        console.error("you have not configure fn_getData.");
        return null;
    }
    if (typeof fn_getData != "function") {
        console.error("the fn_getData you configured is not a function.");
        return null;
    }

    if (option.editable) {
        var fn_saveData = option.fn_saveData;
        if (!fn_saveData) {
            console.error("you have not configure fn_saveData.");
            return null;
        }
        if (typeof fn_saveData != "function") {
            console.error("the fn_saveData you configured is not a function.");
            return null;
        }
    }

    // 构建搜索栏
    var searchBarStr = option.searchBarStr;
    if (searchBarStr && searchBarStr.length > 0) {
        $searchBar = $(searchBarStr);
        if ($searchBar.length > 0) {
            $searchBar.append(createSearchBar(columns));
        }
    }

    // 构建table
    $wrapper = $('<div class="mf-table-wrapper"></div>');
    var $parent = $table.parent();
    $parent.append($wrapper);

    $thead = createThHeader(columns);
    var $headTable = $("<table>");
    $headTable
        .addClass("table table-bordered mf-head-table")
        .append($thead);

    var $fixHeadDiv = $('<div>');
    $fixHeadDiv
        .addClass("fix-head")
        .append($headTable);

    if (option.IsSetTableWidth) {
         $fixHeadDiv.width(columnWidth + "px")
       }
       

    var $fixTableDiv = $("<div>");
    if (option.hasOwnProperty("height"))
        $fixTableDiv.height(option.height);
    $fixTableDiv
        .addClass("fix-table")
        .append($table)

    if (option.IsSetTableWidth) {
        $fixTableDiv.width(columnWidth + "px")
    }

    $wrapper
        .append($fixHeadDiv)
        .append($fixTableDiv);

    $tbody = $("<tbody>");
    $table
        .empty()
        .append($tbody)
        .addClass("table table-bordered table-hover mf-body-table")
        .keypress(onTableKeyPress);

    if (option.editable) {
        $table.attr("tabindex", 1); // 添加tabindex属性使列表可以触发keypress事件
    }

    if (option.rowDroppable) {
        $wrapper.droppable({
            drop: option.fn_rowDrop,
            accept: option.rowDroppableAccept
        });
    }

    if (option.rowDraggable || option.columnDraggable) {
        jQuery.browser = {}; (function () {
            jQuery.browser.msie = false;
            jQuery.browser.version = 0;
            if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
                jQuery.browser.msie = true;
                jQuery.browser.version = RegExp.$1;
            }
        })();
    }

    // --------------------------------------------------------------------
};
