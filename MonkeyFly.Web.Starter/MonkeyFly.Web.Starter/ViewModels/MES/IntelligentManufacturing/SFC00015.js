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

        var StartEquipmentCode = $("#StartEquipmentNo").val();
        if (StartEquipmentCode && StartEquipmentCode.length > 0)
            StartEquipmentCode = StartEquipmentCode + "";

        var EndEquipmentCode = $("#EndEquipmentNo").val();
        if (EndEquipmentCode && EndEquipmentCode.length > 0)
            EndEquipmentCode = EndEquipmentCode + "";

        var StartDate = $("#StartDateOfCompletion").val();
        var EndDate = $("#EndDateOfCompletion").val();

        window.location.href = mf.domain + '/MES/api/ExportFile/Sfc00015Export?Token=' + token + '&StartWorkCenterCode=' + StartWorkCenterCode + '&EndWorkCenterCode='
            + EndWorkCenterCode + '&StartEquipmentCode=' + StartEquipmentCode + '&EndEquipmentCode=' + EndEquipmentCode + '&StartDate=' + StartDate + '&EndDate=' + EndDate;
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

    //显示起始设备代号號弹窗
    this.showStartEquipmentNo = function () {
        $("#StartEquipmentCodeDialog").modal("show");
        $("#StartEquipmentCodeDialog").modal({ backdrop: 'static', keyboard: false });
        StartEquipmentCodeTable.loadData();
        $("#StartEquipmentCodeComfirm").unbind();
        $("#StartEquipmentCodeComfirm").click(function () {
            var row = StartEquipmentCodeTable.getSelectedData();
            if (row) {
                $("#StartEquipmentNo").val(row.Code);
                $("#StartEquipmentCodeDialog").modal("hide");
            }
        })
    };

    //起始设备代号弹窗查询
    this.StartOpenEndEquipmentCodeSearch = function () {
        StartEquipmentCodeTable.goForwordSafely(function () {
            StartEquipmentCodeTable.loadData(null, null, 1);
        }, null);
    };

    //设置起始设备代号弹窗表格
    var StartEquipmentCodeTable = new mf.Table("#StartEquipmentCodeTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionStartEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#StartBeginEquipmentCode").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#StartEndEquipmentCode").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
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
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "190",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //显示结束设备代号號弹窗
    this.showEndEquipmentNo = function () {
        $("#EndEquipmentCodeDialog").modal("show");
        $("#EndEquipmentCodeDialog").modal({ backdrop: 'static', keyboard: false });
        EndEquipmentCodeTable.loadData();
        $("#EndEquipmentCodeComfirm").unbind();
        $("#EndEquipmentCodeComfirm").click(function () {
            var row = EndEquipmentCodeTable.getSelectedData();
            if (row) {
                $("#EndEquipmentNo").val(row.Code);
                $("#EndEquipmentCodeDialog").modal("hide");
            }
        })
    };

    //结束设备代号弹窗查询
    this.EndOpenEndEquipmentCodeSearch = function () {
        EndEquipmentCodeTable.goForwordSafely(function () {
            EndEquipmentCodeTable.loadData(null, null, 1);
        }, null);
    };

    //设置结束设备代号弹窗表格
    var EndEquipmentCodeTable = new mf.Table("#EndEquipmentCodeTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionEndEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#EndBeginEquipmentCode").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#EndEndEquipmentCode").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
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
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "190",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
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
    var table = new mf.Table("#SFC00015Table", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            var StartWorkCenterCode = $("#StartWorkCenter").val();
            if (StartWorkCenterCode && StartWorkCenterCode.length > 0)
                searchData.StartWorkCenterCode = StartWorkCenterCode + "";

            var EndWorkCenterCode = $("#EndWorkCenter").val();
            if (EndWorkCenterCode && EndWorkCenterCode.length > 0)
                searchData.EndWorkCenterCode = EndWorkCenterCode + "";

            var StartEquipmentCode = $("#StartEquipmentNo").val();
            if (StartEquipmentCode && StartEquipmentCode.length > 0)
                searchData.StartEquipmentCode = StartEquipmentCode + "";

            var EndEquipmentCode = $("#EndEquipmentNo").val();
            if (EndEquipmentCode && EndEquipmentCode.length > 0)
                searchData.EndEquipmentCode = EndEquipmentCode + "";

            var StartDate = $("#StartDateOfCompletion").val();
            var EndDate = $("#EndDateOfCompletion").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00015GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: window.innerHeight - 167,
        LastWidth: "109",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", require: true, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'WorkCenterName', title: fields.CenterDescription, require: true, align: "center", width: "130",
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
                field: 'EquipmentCode', title: fields.EquipmentCode, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MachineHour', title: fields.ValidMachineHour, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UnMachineHour', title: fields.InvalidMachineHour, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Hour', title: fields.TotalMachineHours, align: "center",
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

var URL = "/MES/IntelligentManufacturing/SFC00015";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "StartWorkCenter", "EndWorkCenter", "BeginEquipmentCode", "EndEndEquipmentCode", "StartDateOfCompletion", "EndDateOfCompletion",
    "WorkCenter", "CenterDescription", "Department", "DepartmentName", "EquipmentCode", "EquipmentDescription", "StartEquipmentNo",
    "ValidMachineHour", "InvalidMachineHour", "TotalMachineHours", "Remark", "Status", "Comfirm", "Cancel", "Search", "AccountNo",
    "DepartmentNo", "AccountMaster", "WorkCenterFile", "StartAccount", "EndAccount", "WorkCenterNo", "WorkCenterDescription",
    "EndEquipmentNo", "info", "NoDataExport"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};