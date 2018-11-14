var viewModel = function () {
    var self = this, ClassID, EquipmentID;

    //開始完工日期
    $('#SStartDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#SStartDate').val(mf.format.Date(new Date()));

    //結束完工日期
    $('#EStartDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#EStartDate').val(mf.format.Date(new Date()));

    // 刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //任務分派显示
    this.TaskAssignment = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            rowData: row
        };

        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004TaskAssignment", Parameters: parameters });
            window.location.href = '/MES/IntelligentManufacturing/SFC00004TaskAssignment';
        }, null, fields.Isleave);
    };

    //工作中心开窗
    this.showWorkCenter = function (ID) {
        $("#WorkCenterDialog").modal({ backdrop: 'static', keyboard: false });
        $("#WorkCenterDialog").modal('show');
        WorkCenterTable.loadData();

        $("#WorkCenterComfirm").unbind();
        $("#WorkCenterComfirm").click(function () {
            var row = WorkCenterTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#WorkCenterDialog").modal("hide");
            }
        });
    };

    //工作中心弹窗查询
    this.WorkCenterNoSearch = function () {
        WorkCenterTable.goForwordSafely(function () {
            WorkCenterTable.loadData(null, null, 1);
        }, null);
    };

    //设置工作中心弹窗表格
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "MESUserID",
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#WorkCenterNo").val();

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

    //製程代號开窗
    this.showProcessNo = function (ID) {
        $("#ProcessNoDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ProcessNoDialog").modal('show');
        ProcessNoTable.loadData();

        $("#ProcessNoCommit").unbind();
        $("#ProcessNoCommit").click(function () {
            var row = ProcessNoTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#ProcessNoDialog").modal("hide");
            }
        });
    };

    //製程代號弹窗查询
    this.ProcessCodeSearch = function () {
        ProcessNoTable.goForwordSafely(function () {
            ProcessNoTable.loadData(null, null, 1);
        }, null);
    };

    //设置製程代號表格
    var ProcessNoTable = new mf.Table("#ProcessNoTable", {
        uniqueId: "ParameterID",
        editable: false,
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionProcessNoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ProcessCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "000017" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //制令单列表
    var MoCodeDialogTable = new mf.Table("#MoCodeTable", {
        uniqueId: "FabricatedMotherID",
        paginationBar: new mf.PaginationBar("#MoCodePageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.MoNo = $("#MoNoTxt").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00010GetFabricatedMother',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "80",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemName', title: fields.GoodsName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemSpecification', title: fields.Specification, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "120",
                rander: new mf.HourRander({ title: "title" })
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "120",
                rander: new mf.HourRander({ title: "title" })
            }
        ]
    });

    //制令单开窗
    this.MoCodeClick = function (ID) {
        $("#MoCodeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MoCodeDialog").modal('show');
        MoCodeDialogTable.loadData();

        $("#MoCodeComfirm").unbind();
        $("#MoCodeComfirm").click(function () {
            var row = MoCodeDialogTable.getSelectedData();
            if (row) {
                $(ID).val(row.MoNo);
                $("#MoCodeDialog").modal("hide");
            }
        });
    };

    //制令单开窗查询
    this.searchMoCodeClick = function () {
        MoCodeDialogTable.goForwordSafely(function () {
            MoCodeDialogTable.loadData(null, null, 1);
        }, null);
    };

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

    //设置表格
    var table = new mf.Table("#SFC00004Table", {
        uniqueId: "ParameterID",
        editable: false,
        LastWidth: "80",
        IsSetTableWidth: true,
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

            var StartProcessCode = $("#StartProcessNo").val();
            if (StartProcessCode && StartProcessCode.length > 0)
                searchData.StartProcessCode = StartProcessCode + "";

            var EndProcessCode = $("#EndProcessNo").val();
            if (EndProcessCode && EndProcessCode.length > 0)
                searchData.EndProcessCode = EndProcessCode + "";

            var StartFabMoCode = $("#StartOrderNumber").val();
            if (StartFabMoCode && StartFabMoCode.length > 0)
                searchData.StartFabMoCode = StartFabMoCode + "";

            var EndFabMoCode = $("#EndOrderNumber").val();
            if (EndFabMoCode && EndFabMoCode.length > 0)
                searchData.EndFabMoCode = EndFabMoCode + "";

            var StartDate = $("#SStartDate").val();
            var EndDate = $("#EStartDate").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00004GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        isFrozenColumn: true,
        operateColumWidth: "90px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:90px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="TaskAssignment" onclick="model.TaskAssignment(this)" title="任務分派" >' + fields.TaskAssignment + '</button>');
            return $td;
        },
        height: window.innerHeight - 182,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "130",
                rander: new mf.StaticValueRander({ title:true }),
            },
            {
                field: 'SplitSequence', title: fields.SequenceNo, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Version', title: fields.Version, align: "center", require: true, width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessSequence', title: fields.ProcessSequence, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'OperationSequence', title: fields.ProcessSerialNo, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'OperationCode', title: fields.WorkOrderNo, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'OperationName', title: fields.WorkOrderDescription, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsOperation', title: fields.ProcessReport, require: true, align: "center", width: "110",
                rander: new mf.SelectRander([{ value: true, text: fields.yes }, { value: false, text: fields.no }]),
            },
            {
                field: 'WorkCenterCode', title: fields.WorkCenter, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'WorkCenterName', title: fields.CenterDescription, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'InoutMark', title: fields.InoutMark, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemCode', title: fields.Part, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Quantity', title: fields.Quantity, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'StartDate', title: fields.StartWorkDate, align: "center", width: "100",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'FinishDate', title: fields.FinishWorkDate, align: "center", width: "100",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

}

var URL = "/MES/IntelligentManufacturing/SFC00004";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "TaskAssignment", "MoNo", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate","Version",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "SequenceNo", "LotNo", "ProcessSequence",
    "ProcessNo", "ProcessDescription", "ProcessSerialNo", "WorkOrderNo", "WorkOrderDescription", "ProcessReport",
    "WorkCenter", "CenterDescription", "InoutMark", "Part", "Quantity", "DepartmentNoOrManufacturersNo", "StartWorkDate",
    "FinishWorkDate", "PropertyNumberIsEdit", "AssignedAmount", "Qty", "TaskProductCode", "ProductCode", "Operation",
    "AssignedAmount", "Comfirm", "Shift", "DispatchAmount", "Dispatch", "TaskCardNo", "Add", "Isleave", "SourceDetail",
    "Print", "ShiftMasterFile", "ShiftNo", "ShiftDescription", "ItemSet", "EquipmentCode", "EquipmentDescription",
    "MainResource", "SourceClass", "MechanicalCondition", "SourceCode", "SourceDescription", "Resource", "BeginEquipmentCode",
    "EndEquipmentCode", "EquipmentCodeIsNull", "yes", "no", "StartWorkCenter", "EndWorkCenter", "StartProcessNo", "EndProcessNo",
    "StartOrderNumber", "EndOrderNumber", "SStartDate", "EStartDate", "WorkCenterFile", "ProcessMaster", "MoNoMasterFile",
    "WorkCenterNo", "WorkCenterDescription", "DepartmentNo", "DepartmentName", "MoSeq", "GoodsName", "Specification",
    "EstimatedStartDate", "EstimatedFinishDate", "CumulativeCompletion"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};