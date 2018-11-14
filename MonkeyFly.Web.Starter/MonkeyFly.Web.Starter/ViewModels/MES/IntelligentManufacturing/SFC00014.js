var viewModel = function () {
    var self = this;
    var ExportTotal;

    //開始完工日期
    $('#StartDateOfCompletion').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#StartDateOfCompletion').val(mf.format.Date(new Date()));

    //結束完工日期
    $('#EndDateOfCompletion').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#EndDateOfCompletion').val(mf.format.Date(new Date()));

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var StartWorkCenterCode = $("#StartWorkCenter").val();
        if (StartWorkCenterCode && StartWorkCenterCode.length > 0)
            StartWorkCenterCode = StartWorkCenterCode + "";

        var EndWorkCenterCode = $("#EndWorkCenter").val();
        if (EndWorkCenterCode && EndWorkCenterCode.length > 0)
            EndWorkCenterCode = EndWorkCenterCode + "";

        var StartUserCode = $("#StartEmployeeAccount").val();
        if (StartUserCode && StartUserCode.length > 0)
            StartUserCode = StartUserCode + "";

        var EndUserCode = $("#EndEmployeeAccount").val();
        if (EndUserCode && EndUserCode.length > 0)
            EndUserCode = EndUserCode + "";

        var StartDate = $("#StartDateOfCompletion").val();
        var EndDate = $("#EndDateOfCompletion").val();

        window.location.href = mf.domain + '/MES/api/ExportFile/Sfc00014Export?Token=' + token + '&StartWorkCenterCode=' + StartWorkCenterCode +
            '&EndWorkCenterCode=' + EndWorkCenterCode + '&StartUserCode=' + StartUserCode + '&EndUserCode=' + EndUserCode + '&StartDate=' + StartDate + '&EndDate=' + EndDate;
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    // 刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //显示起始员工帐号號弹窗
    this.showStartEmployeeAccount = function () {
        $("#StartClerkDialog").modal("show");
        $("#StartClerkDialog").modal({ backdrop: 'static', keyboard: false });
        StartAccountTable.loadData();
        $("#StartAccountComfirm").unbind();
        $("#StartAccountComfirm").click(function () {
            var row = StartAccountTable.getSelectedData();
            if (row) {
                $("#StartEmployeeAccount").val(row.Emplno);
                $("#StartClerkDialog").modal("hide");
            }
        })
    };

    //起始员工帐号弹窗查询
    this.StartAccountSearch = function () {
        StartAccountTable.goForwordSafely(function () {
            StartAccountTable.loadData(null, null, 1);
        }, null);
    };

    //设置起始员工帐号弹窗表格
    var StartAccountTable = new mf.Table("#StartAccountTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionStartAccountBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#StartStartAccount").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#StartEndAccount").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //显示结束员工帐号號弹窗
    this.showEndEmployeeAccount = function () {
        $("#EndClerkDialog").modal("show");
        $("#EndClerkDialog").modal({ backdrop: 'static', keyboard: false });
        EndAccountTable.loadData();
        $("#EndAccountComfirm").unbind();
        $("#EndAccountComfirm").click(function () {
            var row = EndAccountTable.getSelectedData();
            if (row) {
                $("#EndEmployeeAccount").val(row.Emplno);
                $("#EndClerkDialog").modal("hide");
            }
        })
    };

    //结束员工帐号弹窗查询
    this.EndAccountSearch = function () {
        EndAccountTable.goForwordSafely(function () {
            EndAccountTable.loadData(null, null, 1);
        }, null);
    };

    //设置结束员工帐号弹窗表格
    var EndAccountTable = new mf.Table("#EndAccountTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionEndAccountBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#EndStartAccount").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#EndEndAccount").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //显示起始工作中心弹窗
    this.showStartWorkCenter = function () {
        $("#StartWorkCenterDialog").modal("show");
        $("#StartWorkCenterDialog").modal({ backdrop: 'static', keyboard: false });
        StartWorkCenterTable.loadData();
        $("#StartWorkCenterComfirm").unbind();
        $("#StartWorkCenterComfirm").click(function () {
            var row = StartWorkCenterTable.getSelectedData();
            if (row) {
                $("#StartWorkCenter").val(row.Code);
                $("#StartWorkCenterDialog").modal("hide");
            }
        })
    };

    //起始工作中心弹窗查询
    this.StartWorkCenterNoSearch = function () {
        StartWorkCenterTable.goForwordSafely(function () {
            StartWorkCenterTable.loadData(null, null, 1);
        }, null);
    };

    //设置起始工作中心弹窗表格
    var StartWorkCenterTable = new mf.Table("#StartWorkCenterTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionStartWorkCenterBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#StartWorkCenterNo").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WorkCenterNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'DeptCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'DeptName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'StatusName', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });

    //显示结束工作中心弹窗
    this.showEndWorkCenter = function () {
        $("#EndWorkCenterDialog").modal("show");
        $("#EndWorkCenterDialog").modal({ backdrop: 'static', keyboard: false });
        EndWorkCenterTable.loadData();
        $("#EndWorkCenterComfirm").unbind();
        $("#EndWorkCenterComfirm").click(function () {
            var row = EndWorkCenterTable.getSelectedData();
            if (row) {
                $("#EndWorkCenter").val(row.Code);
                $("#EndWorkCenterDialog").modal("hide");
            }
        })
    };

    //结束工作中心弹窗查询
    this.EndWorkCenterNoSearch = function () {
        EndWorkCenterTable.goForwordSafely(function () {
            EndWorkCenterTable.loadData(null, null, 1);
        }, null);
    };

    //设置结束工作中心弹窗表格
    var EndWorkCenterTable = new mf.Table("#EndWorkCenterTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionEndWorkCenterBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#EndWorkCenterNo").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WorkCenterNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'DeptCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'DeptName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'StatusName', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });

    //设置表格
    var table = new mf.Table("#SFC00014Table", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var StartWorkCenterCode = $("#StartWorkCenter").val();
            if (StartWorkCenterCode && StartWorkCenterCode.length > 0)
                searchData.StartWorkCenterCode = StartWorkCenterCode + "";

            var EndWorkCenterCode = $("#EndWorkCenter").val();
            if (EndWorkCenterCode && EndWorkCenterCode.length > 0)
                searchData.EndWorkCenterCode = EndWorkCenterCode + "";

            var StartUserCode = $("#StartEmployeeAccount").val();
            if (StartUserCode && StartUserCode.length > 0)
                searchData.StartUserCode = StartUserCode + "";

            var EndUserCode = $("#EndEmployeeAccount").val();
            if (EndUserCode && EndUserCode.length > 0)
                searchData.EndUserCode = EndUserCode + "";

            var StartDate = $("#StartDateOfCompletion").val();
            var EndDate = $("#EndDateOfCompletion").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00014GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    ExportTotal = data.total;
                    console.log(data);
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        LastWidth: "110",
        IsSetTableWidth: true,
        height: window.innerHeight - 183,
        columns: [
            {
                field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", require: true, width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'WorkCenterName', title: fields.CenterDescription, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptCode', title: fields.Department, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Emplno', title: fields.EmployeeAccount, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UserName', title: fields.Name, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UserDeptCode', title: fields.StaffDepartment, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UserDeptName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'LaborHour', title: fields.ValidLaborHour, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UnLaborHour', title: fields.InvalidLaborHour,  align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Hour', title: fields.TotalArtificialHours, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };

}

var URL = "/MES/IntelligentManufacturing/SFC00014";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "StartWorkCenter", "EndWorkCenter", "StartEmployeeAccount", "EndEmployeeAccount", "StartDateOfCompletion", "EndDateOfCompletion",
    "WorkCenter", "CenterDescription", "Department", "DepartmentName", "EmployeeAccount", "Name", "StaffDepartment", "DepartmentName",
    "ValidLaborHour", "InvalidLaborHour", "TotalArtificialHours", "Remark", "Status", "Comfirm", "Cancel", "Search", "AccountNo",
    "DepartmentNo", "AccountMaster", "WorkCenterFile", "StartAccount", "EndAccount", "WorkCenterNo", "WorkCenterDescription",
    "NoDataExport", "info", "NoDataExport"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};