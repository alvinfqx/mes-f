var viewModel = function () {
    var self = this;

    this.form = {
        Start: ko.observable(),
        End: ko.observable()
    };

    var start = {
        elem: "#start",
        format: "YYYY/MM/DD hh:mm:ss",
        max: "2099-06-16 23:59:59",
        istime: true,
        istoday: false,
        choose: function (datas) {
            end.min = datas;
            end.start = datas
        }
    };

    var end = {
        elem: "#end",
        format: "YYYY/MM/DD hh:mm:ss",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        istime: true,
        istoday: false,
        choose: function (datas) {
            start.max = datas
        }
    };

    laydate(start);
    laydate(end);

    laydate.skin('yalan');

    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    }

    //查询
    this.searchClick = function () {
        var tabs = $('#liTab li');
        var tabs_active;

        for (var i = 0; i < tabs.length; i++) {
            if ($(tabs[i]).attr('class') && $(tabs[i]).attr('class') == 'active') {
                tabs_active = i;
            }
        }
        if (tabs_active == 0) {
            logTable.goForwordSafely(function () {
                logTable.loadData();
            }, null);
        }
        else if (tabs_active == 1) {
            actionTable.goForwordSafely(function () {
                actionTable.loadData();
            }, null);
        }
        else if (tabs_active == 2) {
            systemTable.goForwordSafely(function () {
                systemTable.loadData();
            }, null);
        }
       
    };

    //设置登录日记表格
    var logTable = new mf.Table("#logTable", {
        uniqueId: "UserID",
        editable: false,
        paginationBar: new mf.PaginationBar("#pagelog"),
        fn_getData: function (pagination, searchData, success) {
            var Start = $('#start').val();
            var End = $('#end').val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/Log/GetLoginLog',
                data: ({ page: pagination.page, rows: pagination.rows, Start: Start, End: End }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: window.innerHeight - 155,
        columns: [
            {
                field: 'Account', title: fields.Account, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 10, title: "title" }),
            },
            {
                field: 'UserName', title: fields.UserName, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'HostIP', title: fields.HostIP, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'HostName', title: fields.HostName, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'LogonCity', title: fields.LogonCity, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'LogonTime', title: fields.LogonTime, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    logTable.loadData();

    //设置操作日记表格
    var actionTable = new mf.Table("#actionTable", {
        uniqueId: "UserID",
        editable: false,
        paginationBar: new mf.PaginationBar("#pageaction"),
        fn_getData: function (pagination, searchData, success) {
            var Start = $('#start').val();
            var End = $('#end').val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/Log/GetOperateLog',
                data: ({ page: pagination.page, rows: pagination.rows, Start: Start, End: End }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: window.innerHeight - 155,
        columns: [
            {
                field: 'Account', title: fields.Account, align: "center", width: "110",
                rander: new mf.TextRander({ size: 10, maxLength: 10, title: "title" }),
            },
            {
                field: 'UserName', title: fields.UserName, align: "center", width: "110",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'Position', title: fields.Position, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'Target', title: fields.Target, align: "center", width: "110",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'Type', title: fields.Type, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'Message', title: fields.Message, align: "center", width: "300",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreateTime, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    actionTable.loadData();

    //设置系统日记表格
    var systemTable = new mf.Table("#systemTable", {
        uniqueId: "UserID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Start = $('#start').val();
            var End = $('#end').val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/Log/GetSystemLog',
                data: ({ Start: Start, End: End }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        fn_onRowClick: function (row) {
            //if (row.Path.indexOf("bmp") >= 0 ||
            //    row.Path.indexOf("jpg") >= 0 ||
            //    row.Path.indexOf("png") >= 0 ||
            //    row.Path.indexOf("jpeg") >= 0) {

            //    $("#imageFile").attr("src", window.top.mf.domain + "/MFOS/" + row.Path);
            //    $("#ImageDialog").modal({ backdrop: 'static', keyboard: false });
            //    $("#ImageDialog").modal('show');
            //}
            //else {
            //    window.location.href = window.top.mf.domain + "/MFOS/" + row.Path;
            //}
        },
        height: window.innerHeight - 120,
        columns: [
            {
                field: 'filename', title: fields.filename, align: "center", width: "200",
                rander: new mf.TextRander({ size: 10, title: "title" }),
                //rander: new mf.ALineRander(),
            },
            {
                field: 'size', title: fields.size, align: "center", width: "200",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            },
            {
                field: 'id', title: fields.id, align: "center",
                rander: new mf.TextRander({ size: 10, title: "title" }),
            }
        ]
    });

    systemTable.loadData();

}

var URL = "/Log";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MFC/Log", "Log");

var model = new viewModel();

