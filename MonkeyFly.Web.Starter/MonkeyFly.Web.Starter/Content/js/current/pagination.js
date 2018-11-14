/* InitPage */
var InitPage = function (total) {
    pagination.total = total;
    PrintPagination();
}

var PrintPagination = function () {

    if (pagination.total == 0) {

        $('.fixed-table-pagination').html('<span class="pagination-info">' + promptBtn.NoPage + '</span>');
        return;
    }

    var pages = pagination.total % pagination.rows == 0 ? parseInt(pagination.total / pagination.rows) : parseInt(pagination.total / pagination.rows) + 1;

    var pagination_detail = '<span class="pagination-info">' + promptBtn.PageDetail1 + ((pagination.page - 1) * pagination.rows + 1) + promptBtn.PageDetail2 + (pagination.page == pages ? pagination.total : pagination.page * pagination.rows) + promptBtn.PageDetail3 + pagination.total + promptBtn.PageDetail4 + '</span>';

    var page_list = promptBtn.PageList1 + '<span class="btn-group dropup"><button type="button" class="btn btn-default  dropdown-toggle" data-toggle="dropdown"><span class="page-size">' + pagination.rows + '</span> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="active"><a href="javascript:void(0)" onclick="SetRows(10)">10</a></li><li><a href="javascript:void(0)" onclick="SetRows(20)">20</a></li><li><a href="javascript:void(0)" onclick="SetRows(30)">30</a></li></ul></span>' + promptBtn.PageList2;

    var page_options = '';

    if (pagination.page == 1) {
        page_options += '<li class="page-first"><a href="javascript:void(0)">«</a></li><li class="page-pre"><a href="javascript:void(0)">‹</a></li>';
    }
    else {
        page_options += '<li class="page-first"><a href="javascript:void(0)" onclick="SetPageNumber(1)">«</a></li><li class="page-pre"><a href="javascript:void(0)" onclick="SetPageNumber(' + (pagination.page - 1) + ')">‹</a></li>';
    }

    for (var i = pagination.page; i <= pages && i < pagination.page + 5; i++) {
        if (i == pagination.page) {
            page_options += '<li class="page-number active"><a href="javascript:void(0)">' + i + '</a></li>';
        }
        else {
            page_options += '<li class="page-number active"><a href="javascript:void(0)" onclick="SetPageNumber(' + i + ')">' + i + '</a></li>';
        }
    }

    if (pagination.page == pages) {
        page_options += '<li class="page-next"><a href="javascript:void(0)">›</a></li><li class="page-last"><a href="javascript:void(0)">»</a></li>';
    }
    else {
        page_options += '<li class="page-next"><a href="javascript:void(0)" onclick="SetPageNumber(' + (pagination.page + 1) + ')">›</a></li><li class="page-last"><a href="javascript:void(0)" onclick="SetPageNumber(' + pages + ')">»</a></li>';
    }

    $('.fixed-table-pagination').html('<div class="pull-left pagination-detail">' + pagination_detail + '<span class="page-list">' + page_list + '</span></div><div class="pull-right pagination"><ul class="pagination">' + page_options + '</ul></div>');
    
}

var SetRows = function (rows) {

    pagination.rows = rows;

    SetTable();
}

var SetPageNumber = function (page) {
    pagination.page = page;
    SetTable();
}

/* InitPage2 */
var InitPage2 = function (total) {
    pagination.total = total;
    PrintPagination2();
}

var SetRows2 = function (obj) {
    pagination.rows = Number($(obj).find("option:selected").val());
    SetTable();
}

var SetPageNumber2 = function (page) {
    pagination.page = page;
    SetTable();
}

var PrintPagination2 = function () {

    var pages = pagination.total % pagination.rows == 0 ? parseInt(pagination.total / pagination.rows) : parseInt(pagination.total / pagination.rows) + 1;

    var page_list = '<td><select class="page-page-list" onchange="SetRows2(this)"><option value="10">10</option><option value="20">20</option><option value="50">50</option></select></td>';

    var page_options = "";

    if (pagination.page == 1) {
        page_options += '<td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-first">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-prev">&nbsp;</span></span></span></a></td>';
    }
    else {
        page_options += '<td><a href="javascript:void(0)" onclick="SetPageNumber2(1)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-first">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" onclick="SetPageNumber2(' + (pagination.page - 1) + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-prev">&nbsp;</span></span></span></a></td>';
    }

    page_options += '<td><span style="padding-left:6px;">' + promptBtn.PageEnd1 + '</span></td><td><input class="page-num" value="' + pagination.page + '" size="2" type="text" readonly="readonly"></td><td><span style="padding-right:6px;">' + promptBtn.PageEnd2 + pages + promptBtn.PageEnd3 + '</span></td>';

    if (pagination.page == pages) {
        page_options += '<td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" group="" id=""><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-next">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" ><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-last">&nbsp;</span></span></span></a></td>';
    }
    else {
        page_options += '<td><a href="javascript:void(0)" onclick="SetPageNumber2(' + (pagination.page + 1) + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" ><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-next">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" onclick="SetPageNumber2(' + pages + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" ><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-last">&nbsp;</span></span></span></a></td>';
    }

    var page_end = '<div class="page-info">' + promptBtn.PageDetail1 + ((pagination.page - 1) * pagination.rows + 1) + promptBtn.PageDetail2 + (pagination.page == pages ? pagination.total : pagination.page * pagination.rows) + promptBtn.PageDetail3 + pagination.total + promptBtn.PageDetail4 + '</div><div style="clear:both;"></div>';

    $('.datagrid-pager').html('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr>' + page_options + page_list + '</tr></tbody></table>' + page_end);
    $(".page-page-list").val(pagination.rows);
}

/* InitPage3 */
var InitPage3 = function (total, index) {
    paginations[index].total = total;
    PrintPagination3(index);
}

var SetRows3 = function (obj, index) {
    paginations[index].rows = Number($(obj).find("option:selected").val());
    SetTable();
}

var SetPageNumber3 = function (page, index) {
    paginations[index].page = page;
    SetTable();
}

var PrintPagination3 = function (index) {

    var pages = paginations[index].total % paginations[index].rows == 0 ? parseInt(paginations[index].total / paginations[index].rows) : parseInt(paginations[index].total / paginations[index].rows) + 1;

    var page_list = '<td><select class="page-page-list" onchange="SetRows3(this,' + index + ')"><option value="10">10</option><option value="20">20</option><option value="50">50</option></select></td>';

    var page_options = "";

    if (paginations[index].page == 1) {
        page_options += '<td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-first">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-prev">&nbsp;</span></span></span></a></td>';
    }
    else {
        page_options += '<td><a href="javascript:void(0)" onclick="SetPageNumber3(1,' + index + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-first">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" onclick="SetPageNumber3(' + (paginations[index].page - 1) + ',' + index + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled"><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-prev">&nbsp;</span></span></span></a></td>';
    }

    page_options += '<td><span style="padding-left:6px;">' + promptBtn.PageEnd1 + '</span></td><td><input class="page-num" value="' + paginations[index].page + '" size="2" type="text" readonly="readonly"></td><td><span style="padding-right:6px;">' + promptBtn.PageEnd2 + pages + promptBtn.PageEnd3 + '</span></td>';

    if (paginations[index].page == pages) {
        page_options += '<td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" group="" id=""><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-next">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" ><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-last">&nbsp;</span></span></span></a></td>';
    }
    else {
        page_options += '<td><a href="javascript:void(0)" onclick="SetPageNumber3(' + (paginations[index].page + 1) + ',' + index + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" ><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-next">&nbsp;</span></span></span></a></td><td><a href="javascript:void(0)" onclick="SetPageNumber3(' + pages + ',' + index + ')" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled" ><span class="l-btn-left"><span class="l-btn-text"><span class="l-btn-empty page-last">&nbsp;</span></span></span></a></td>';
    }

    var page_end = '<div class="page-info">' + promptBtn.PageDetail1 + ((paginations[index].page - 1) * paginations[index].rows + 1) + promptBtn.PageDetail2 + (paginations[index].page == pages ? paginations[index].total : paginations[index].page * paginations[index].rows) + promptBtn.PageDetail3 + paginations[index].total + promptBtn.PageDetail4 + '</div><div style="clear:both;"></div>';

    $("#"+table_index).html('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr>' + page_options + page_list + '</tr></tbody></table>' + page_end);
    $("#" + table_index).find(".page-page-list").val(paginations[index].rows);
}

mf.PaginationBar = function (domStr, options) {
    // --------------------------------------------------------------------
    //                            private
    // --------------------------------------------------------------------
    var default_options, pagination,
        $paginationBar, $rowsSelect, $btnFirstPage, $btnPrevPage, $whichPage,
        $btnLastPage, $paginationInfo, $inPageNum, $spTotalPage, $btnNextPage,
        setPaginationBar, getPaginationInfo, calPageCount,
        onPageListChange, onFirstPageClick, onPrevPageClick, onNextPageClick,
        onLastPageClick, onPageNumChange, changeCallBack;
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                             event
    // --------------------------------------------------------------------
    // 分页码变动事件
    onPageListChange = function () {
        pagination.rows = Number($(this).find("option:selected").val());
        if (changeCallBack)
            changeCallBack(pagination.rows, pagination.page, pagination.total);
    };

    // 点击首页事件
    onFirstPageClick = function () {        
        pagination.page = 1;
        setPaginationBar();
        if (changeCallBack)
            changeCallBack(pagination.rows, pagination.page, pagination.total);
    };

    // 点击上一页事件
    onPrevPageClick = function () {
        setPaginationBar();
        pagination.page -= 1;
        if (changeCallBack)
            changeCallBack(pagination.rows, pagination.page, pagination.total);
    };

    // 点击下一页事件
    onNextPageClick = function () {
        pagination.page += 1;
        setPaginationBar();
        if (changeCallBack)
            changeCallBack(pagination.rows, pagination.page, pagination.total);
    };

    // 点击尾页事件
    onLastPageClick = function () {
        pagination.page = calPageCount();
        setPaginationBar();
        if (changeCallBack)
            changeCallBack(pagination.rows, pagination.page, pagination.total);
    };

    // 页数改变事件
    onPageNumChange = function () {
        pagination.page = $(this).val();
        setPaginationBar();
        if (changeCallBack)
            changeCallBack(pagination.rows, pagination.page, pagination.total);
    };
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                            function
    // --------------------------------------------------------------------
    calPageCount = function () {
        return pagination.total % pagination.rows == 0 ?
               parseInt(pagination.total / pagination.rows) :
               parseInt(pagination.total / pagination.rows) + 1;
    };

    getPaginationInfo = function (pageCount) {
        return promptBtn.PageDetail1 +
            ((pagination.page - 1) * pagination.rows + 1) +
            promptBtn.PageDetail2 +
            (pagination.page == pageCount ? pagination.total : pagination.page * pagination.rows) +
            promptBtn.PageDetail3 +
            pagination.total +
            promptBtn.PageDetail4;
    };

    setPaginationBar = function () {
        $rowsSelect = $(
            '<select class="page-page-list">' +
                $.map(options.pageListNums, function (num) {
                    return '<option value="' + num + '">' + num + '</option>'
                }).join("") +
            '</select>')
                .change(onPageListChange);

        $btnFirstPage = $(
            '<a id="pb_btn_firstPage" href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled">' +
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                        '<span class="l-btn-empty page-first">&nbsp;</span>' +
                    '</span>' +
                '</span>' +
            '</a>');

        $btnPrevPage = $(
            '<a id="pb_btn_prevPage" href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled">' +
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                        '<span class="l-btn-empty page-prev">&nbsp;</span>' +
                    '</span>' +
                '</span>' +
            '</a>');

        $whichPage = $(
            '<span>' +
                '<span style="padding-left:6px;">' + promptBtn.PageEnd1 + '</span>' +
                '<input id="in_pageNum" class="page-num" size="2" type="text" readonly="readonly">' +
                '<span id="sp_totalPage" style="padding-right:6px;"></span>' +
            '</span>');
        $inPageNum = $whichPage.find("#in_pageNum");
        $spTotalPage = $whichPage.find("#sp_totalPage");

        $btnNextPage = $(
            '<a id="pb_btn_nextPage" href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled">' +
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                        '<span class="l-btn-empty page-next">&nbsp;</span>' +
                    '</span>' +
                '</span>' +
            '</a>');

        $btnLastPage = $(
            '<a id="pb_btn_lastPage" href="javascript:void(0)" class="l-btn l-btn-plain l-btn-disabled l-btn-plain-disabled">' +
                '<span class="l-btn-left">' +
                    '<span class="l-btn-text">' +
                        '<span class="l-btn-empty page-last">&nbsp;</span>' +
                    '</span>' +
                '</span>' +
            '</a>');

        $paginationInfo = $('<div class="page-info"></div>');

        $paginationBar
            .empty()
            .append('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr>')
            .find("tr")
                .append($("<td>").append($btnFirstPage))
                .append($("<td>").append($btnPrevPage))
                .append($("<td>").append($whichPage))
                .append($("<td>").append($btnNextPage))
                .append($("<td>").append($btnLastPage))
                .append($("<td>").append($rowsSelect));
        $paginationBar
            .append($paginationInfo)
            .append('<div style="clear:both;"></div>');

        var pageCount = calPageCount();

        $rowsSelect.val(pagination.rows);

        if (pagination.page > 1) {
            $btnFirstPage.click(onFirstPageClick);
            $btnPrevPage.click(onPrevPageClick);
        }

        $inPageNum.val(pagination.page);
        $spTotalPage.text(promptBtn.PageEnd2 + pageCount + promptBtn.PageEnd3);

        if (pagination.page < pageCount) {
            $btnNextPage.click(onNextPageClick);
            $btnLastPage.click(onLastPageClick);
        }

        $paginationInfo.text(
            getPaginationInfo(pageCount));
    };
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                             public
    // --------------------------------------------------------------------
    this.setTotal = function (total) {
        pagination.total = total;
        setPaginationBar();
    };

    this.setPage = function (page) {
        pagination.page = page;
        setPaginationBar();
    };

    this.getPagination = function () {
        return $.extend({}, pagination);
    };

    this.change = function (fn_callback) {
        changeCallBack = fn_callback;
    }
    // --------------------------------------------------------------------


    // --------------------------------------------------------------------
    //                              init
    // --------------------------------------------------------------------
    if (!domStr || domStr.length <= 0) {
        console.error("PaginationBar domStr is null");
        return null;
    }    

    $paginationBar = $(domStr);
    if ($paginationBar.length <= 0) {
        console.error("invaild PaginationBar domStr:" + domStr);
        return null;
    }

    default_options = {
        page: 1,
        rows: 50,
        total: 0,
        pageListNums: [10, 20, 50],
        changeCallBack: null
    };

    if (!options)
        options = {};

    options = $.extend(default_options, options);

    pagination = {
        page: options.page,
        rows: options.rows,
        total: options.total
    };

    changeCallBack = options.changeCallBack;    

    setPaginationBar();
    // --------------------------------------------------------------------
};