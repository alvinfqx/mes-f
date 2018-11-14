var URL = "/MES/IntelligentManufacturing/SFC00011";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var model = null;
var viewModel = function () {

    var self = this;
    var table = null, ProcessTable = null;
    var ExportTotal, process_id;

    var lang = [];
    var langStr = "EN";
    if (language != 'en') {
        lang = language.split('-');
        langStr = 'zh-' + lang[1].toUpperCase();
    }


    $('#StartDateOfCompletion').datepicker({
        language: langStr,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $('#EndDateOfCompletion').datepicker('setStartDate', startTime);
    });

    $('#EndDateOfCompletion').datepicker({
        language: langStr,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var endTime = e.date;
        $('#StartDateOfCompletion').datepicker('setEndDate', endTime);
    });


    var form = {
        StartingWorkCenter: ko.observable(),
        EndingWorkCenter: ko.observable(),
        StartOrderNumber: ko.observable(),
        EndOrderNumber: ko.observable(),
        StartDateOfCompletion: ko.observable(),
        EndDateOfCompletion: ko.observable()
    }
    ko.applyBindings(form);

    table = new mf.Table("#ProcessComlpletedTable", {
        uniqueId: "FabMoProcessID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 182,
        editable: false,
        dblclick_editable: false,
        isFrozenColumn: true,
        operateColumWidth: "80px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Process" onclick="model.ProcessClick(this)" title="' + fields.Process + '" >' + fields.Process + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.StartWorkCenterCode = $("#StartWorkCenter").val();//form.StartingWorkCenter();
            searchData.EndWorkCenterCode = $("#EndWorkCenter").val(); //form.EndingWorkCenter();
            searchData.StartFabMoCode = $("#StartOrderNumber").val(); //form.StartOrderNumber();
            searchData.EndFabMoCode = $("#EndOrderNumber").val(); //form.EndOrderNumber();
            searchData.StartDate = $("#StartDateOfCompletion").val(); //form.StartDateOfCompletion();
            searchData.EndDate = $("#EndDateOfCompletion").val(); //form.EndDateOfCompletion();

            console.log(searchData)
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00011GetListV1",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);           
                      success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        LastWidth: "180",
        IsSetTableWidth: true,
        columns: [
             {
                 field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })

             },
            {
                field: 'WorkCenterName', title: fields.WorkCenterDescription, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 60 })

            },
             {
                 field: 'MoNo', title: fields.MoNo, align: "center", width: "130",
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
          {
              field: 'ItemCode', title: fields.Part, align: "center", width: "130",
              rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
          },
          {
              field: 'ItemName', title: fields.GoodsName, align: "center", width: "130",
              rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
          },
          {
              field: 'ItemSpecification', title: fields.Specification, align: "center", width: "130",
              rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
          },
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
             {
                 field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "130",
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
               {
                   field: 'InoutMark', title: fields.InoutMark, align: "center", width: "130",
                   rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
               },
            {
                field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
          {
              field: 'DeptName', title: fields.DepartmentDesOrManufacturersDes, align: "center", width: "130",
              rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
          },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "130",
                rander: new mf.TextTimeDateRander()
            },
             {
                 field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "130",
                 rander: new mf.TextTimeDateRander()
             },
              {
                  field: 'Quantity', title: fields.Qty, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
              {
                  field: 'FinProQuantity', title: fields.FinProQty, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
              {
                  field: 'BalanceQuantity', title: fields.AmountDeposit, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
            {
                field: 'DifferenceQuantity', title: fields.DifferenceQty, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
             {
                 field: 'ScrappedQuantity', title: fields.ScrappedQty, align: "center", width: "130",
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             },
              {
                  field: 'UnitName', title: fields.AuxiliaryUnit, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
             {
                 field: 'UnitRate', title: fields.UnitRate, align: "center", width: "130",
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             },
              {
                  field: 'Status', title: fields.Status, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
               {
                   field: 'Comments', title: fields.Remark, align: "center",
                   rander: new mf.TextRander()
               }
        ]

    });
    if (!table) {
        console.log("create table faild");
        return;
    }
    table.loadData();

    //操作按钮工序表
    ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "FabMoOperationID  ",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabMoProcessID = process_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00011GetOperationList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);          
                      success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'Sequence', title: fields.ArrangeSequence, align: "center",  width: "130",
                 rander: new mf.StaticValueRander()
             },
             {
                 field: 'OperationCode', title: fields.Operation, align: "center",  width: "130",
                 rander: new mf.StaticValueRander()
             },
            {
                field: 'OperationName', title: fields.OperationDesc, align: "center", width: "140",
                rander: new mf.StaticValueRander()

            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "130",
                rander: new mf.TextTimeDateRander()
            },
            {
                field: ' FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "130",
                rander: new mf.TextTimeDateRander()

            },
              {
                  field: 'Quantity', title: fields.Qty, align: "center",  width: "130",
                  rander: new mf.StaticValueRander()
              },
            {
                field: 'FinProQuantity', title: fields.FinProQty, align: "center", width: "140",
                rander: new mf.StaticValueRander()

            },
            {
                field: 'BalanceQuantity', title: fields.AmountDeposit, align: "center", width: "140",
                rander: new mf.StaticValueRander()

            },
              {
                  field: 'DifferenceQuantity', title: fields.DifferenceQty, align: "center",  width: "130",
                  rander: new mf.StaticValueRander()
              },
            {
                field: 'ScrappedQuantity', title: fields.ScrappedQty, align: "center", width: "140",
                rander: new mf.StaticValueRander()

            },
             {
                 field: 'UnitName', title: fields.AuxiliaryUnit, align: "center", width: "140",
                 rander: new mf.StaticValueRander()

             },
             {
                 field: 'UnitRate', title: fields.UnitRate, align: "center", width: "140",
                 rander: new mf.StaticValueRander()

             },
              {
                  field: 'Status', title: fields.Status, align: "center", width: "100",
                  rander: new mf.StaticValueRander()
              },
               {
                   field: 'Comments', title: fields.Remark, align: "center",
                   rander: new mf.TextRander()
               }

        ]


    });

    //刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            table.loadData();
        });
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //操作按钮工序
    this.ProcessClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        mf.dialog('#ProcessDialog', {
            viewModel: function () {
                process_id = row.FabMoProcessID;
                ProcessTable.loadData();
            }
        });
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


    //制令单列表
    this.MoCodeDialogTable = new mf.Table("#MoCodeTable", {
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
    this.MoCodeClick = function (obj) {
        $("#MoNoTxt").val("");
        $("#MoCodeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MoCodeDialog").modal('show');
        self.MoCodeDialogTable.loadData();

        $("#MoCodeComfirm").unbind();
        $("#MoCodeComfirm").click(function () {
            var row = self.MoCodeDialogTable.getSelectedData();
            if (row) {
                if (obj == "1") {
                    $("#StartOrderNumber").val(row.MoNo);
                    form.StartOrderNumber(row.MoNo);
                } else {
                    $("#EndOrderNumber").val(row.MoNo);
                    form.EndOrderNumber(row.MoNo);
                }
                $("#MoCodeDialog").modal("hide");
            }
        });
        //
    };

    //制令单开窗查询
    this.searchMoCodeClick = function () {
        self.MoCodeDialogTable.loadData(null, null, 1);
    };



    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };


};

var arrayWord = [
    "Import", "Browse", "Save", "Details", "Remark", "CreatedBy", "CreatedDate", "Process",
    "LastChangedBy", "LastChangedDate", "no", "yes", "Cancel", "Comfirm", "PleaseSelectFile", "PleaseSelectRecord",
    "ProcessMaster", "Search", "Add", "Delete", "Normal", "Invalid", "info", "NoDataExport", "SaveOrNot", "PleaseSaveDataFirst",
    "StartWorkCenter", "EndWorkCenter", "StartOrderNumber", "EndOrderNumber", "StartDateOfCompletion", "EndDateOfCompletion",
    "WorkCenter", "WorkCenterDescription", "Status", "MoNo", "MoSeq", "ProcessSequence", "Part", "ProcessNo", "ProcessDescription",
    "InoutMark", "DepartmentNoOrManufacturersNo", "DepartmentDesOrManufacturersDes", "EstimatedStartDate", "EstimatedFinishDate",
    "Qty", "FinProQty", "AmountDeposit", "DifferenceQty", "ScrappedQty", "AuxiliaryUnit", "UnitRate", "Operation", "OperationDesc",
    "ProcessOrderProcessDetails", "ArrangeSequence", "WorkCenterFile", "WorkCenterNo", "DepartmentNo", "DepartmentName", "MoNoMasterFile",
    "MoNo", "EstimatedStartDate", "EstimatedFinishDate", "Specification", "GoodsName", "GoodsName", "Specification"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};