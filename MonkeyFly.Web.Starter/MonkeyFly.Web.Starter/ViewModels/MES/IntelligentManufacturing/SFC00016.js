var viewModel = function () {
    var self = this, WorkCenterID;

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
    var table = new mf.Table("#SFC00016Table", {
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

            var StartDate = $("#StartDateOfCompletion").val();
            var EndDate = $("#EndDateOfCompletion").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00016GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {                    
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: window.innerHeight - 140,
        isFrozenColumn: true,
        operateColumWidth: "193px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:193px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="ArtificialVoidClick"  style="width:90px;" onclick="model.ArtificialVoidClick(this)" title="' + fields.ArtificialVoidReason + '" >' + (fields.ArtificialVoidReason.length > 16 ? fields.ArtificialVoidReason.substring(0, 15) + "..." : fields.ArtificialVoidReason) + '</button>&nbsp;&nbsp;' +
                       '<button id="MachineVoid" class="btn btn-success btn-xs" style="margin-right: 5px; width:90px;" onclick="model.MachineVoidClick(this)" title="' + fields.MachineVoidReason + '">' + (fields.MachineVoidReason.length > 13 ? fields.MachineVoidReason.substring(0, 13) + "..." : fields.MachineVoidReason) + '</button>');
            return $td;
        },
        LastWidth: "105",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.WorkCenter, align: "center", require: true, width: "105",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptName', title: fields.DepartmentDesOrManufacturersName, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UnLaborHour', title: fields.ArtificialVoidHours, align: "center", width: "104",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UnMachineHour', title: fields.MachineInvalidHours, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //显示人工無效原因  
    this.ArtificialVoidClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        WorkCenterID = row.WorkCenterID;
        ArtificialVoidTable.loadData();
        $("#ArtificialWorkCenter").val(row.Code);
        $("#ArtificialCenterDescription").val(row.Name);
        $("#ArtificialWorkCenter").attr("title", row.Code);
        $("#ArtificialCenterDescription").attr("title", row.Name);
        $('#ArtificialVoidDialog').modal("show");
    };

    //设置人工無效原因 
    var ArtificialVoidTable = new mf.Table("#ArtificialVoidTable", {
        uniqueId: "CalledRepairReasonID",
        paginationBar: new mf.PaginationBar("#paginagionArtificialVoidBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00016GetLDetailList',
                data: ({ page: pagination.page, rows: pagination.rows, WorkCenterID: WorkCenterID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {;
        },
        height: 280,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonCo, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "190",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Count', title: fields.Times, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Hour', title: fields.InvalidWorkHour, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Rate', title: fields.Rate, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //显示機器無效原因  
    this.MachineVoidClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        WorkCenterID = row.WorkCenterID;
        MachineVoidTable.loadData();
        $("#MachineWorkCenter").val(row.Code);
        $("#MachineCenterDescription").val(row.Name);
        $("#MachineWorkCenter").attr("title", row.Code);
        $("#MachineCenterDescription").attr("title", row.Name);
        $('#MachineVoidDialog').modal("show");
    };

    //设置機器無效原因 
    var MachineVoidTable = new mf.Table("#MachineVoidTable", {
        uniqueId: "CalledRepairReasonID",
        paginationBar: new mf.PaginationBar("#paginagionMachineVoidBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00016GetMDetailList',
                data: ({ page: pagination.page, rows: pagination.rows, WorkCenterID: WorkCenterID }),
                success: function (data) {                   
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {;
        },
        height: 280,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonCo, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "190",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Count', title: fields.Times, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Hour', title: fields.InvalidWorkHour, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Rate', title: fields.Rate, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };
}

var URL = "/MES/IntelligentManufacturing/SFC00016";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "StartWorkCenter", "EndWorkCenter", "StartDateOfCompletion", "EndDateOfCompletion","WorkCenterNo", "WorkCenterDescription",
    "WorkCenter", "WorkCenterDescription", "Remark", "Status", "Comfirm", "Cancel", "Search", "WorkCenterFile", "InoutMark",
    "DepartmentNoOrManufacturersNo", "DepartmentDesOrManufacturersName", "ArtificialVoidHours", "MachineInvalidHours","DepartmentNo",
    "ArtificialVoidReason", "MachineVoidReason", "ReasonCo", "ReasonDescription", "Times", "InvalidWorkHour", "Rate", "DepartmentName"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};