var URL = "/MES/IntelligentManufacturing/SFC00010";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var model = null;

var viewModel = function () {
    var self = this;
    var table = null, ProcessDetailTable = null, ProcessTable = null;
    var process_id, process_detail_id;

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
        StartingWorkCenterID:ko.observable(),
        EndingWorkCenter: ko.observable(),
        EndingWorkCenterID:ko.observable(),
        StartOrderNumber: ko.observable(),
        EndOrderNumber: ko.observable(),
        StartDateOfCompletion: ko.observable(),
        EndDateOfCompletion: ko.observable(),
        StartCustomerNo: ko.observable(),
        EndCustomerNo: ko.observable(),
        StartClerkNo: ko.observable(),
        EndClerkNo: ko.observable()
    }
    ko.applyBindings(form);

    table = new mf.Table("#ProcessOrderTable", {
        uniqueId: "FabricatedMotherID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 182,
        editable: false,
        dblclick_editable: false,
        isFrozenColumn: true,
        operateColumWidth: "80px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Process" onclick="model.ProcessDetailClick(this)" title="' + fields.ProcessDetail + '" >' + fields.ProcessDetail + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.StartWorkCenterCode = form.StartingWorkCenter();
            searchData.EndWorkCenterCode = form.EndingWorkCenter();
            searchData.StartFabMoCode = form.StartOrderNumber();
            searchData.EndFabMoCode = form.EndOrderNumber();
            searchData.StartDate = form.StartDateOfCompletion();
            searchData.EndDate = form.EndDateOfCompletion();

            searchData.StartCustCode = form.StartCustomerNo();
            searchData.EndCustCode = form.EndCustomerNo();
            searchData.StartMESUserCode = form.StartClerkNo();
            searchData.EndMESUserCode = form.EndClerkNo();
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00010GetList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
            //        console.log(data);
            //var data = [{ ProcessFinishID: 1, MoSeq: "wc01", Modate: "wc01des", MoNo: "adb" }];
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        LastWidth: "150",
        IsSetTableWidth: true,
        columns: [
             {
                 field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })

             },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 60 })

            },
             {
                 field: 'Date', title: fields.Modate, align: "center", width: "130",
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             },
             {
                 field: 'Status', title: fields.Status, align: "center", width: "130",
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
                   field: 'UnitName', title: fields.Unit, align: "center", width: "130",
                   rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
               },
              {
                  field: 'Quantity', title: fields.Qty, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },

            {
                field: 'StartDate', title: fields.StartWorkDate, align: "center", width: "130",
                rander: new mf.TextTimeDateRander({ size: 13, title: "title", maxLength: 120 })
            },
             {
                 field: 'FinishDate', title: fields.FinishWorkDate, align: "center", width: "130",
                 rander: new mf.TextTimeDateRander({ size: 13, title: "title", maxLength: 120 })
             },

              {
                  field: 'StorageQuantity', title: fields.FinProQty, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
              {
                  field: 'CustName', title: fields.CustomerName, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
              },
            {
                field: 'UserName', title: fields.AccountName, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
             {
                 field: 'OrderNo', title: fields.OrderNo, align: "center",
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             }
        ]

    });
    if (!table) {
        console.log("create table faild");
        return;
    }
    table.loadData();

    //操作按钮制程明细表
    ProcessDetailTable = new mf.Table("#ProcessDetailTable", {
        uniqueId: "FabMoProcessID",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionProcessDetailBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabricatedMotherID = process_detail_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00010GetProcessList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
            //        console.log(data);
            //var data = [{ ProcessDetailID: 1, WorkCenter: 'abc', WorkcenterDesc: 'babbsDes' }]
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        isFrozenColumn: true,
        operateColumWidth: "80px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Process" onclick="model.ProcessClick(this)" title="' + fields.Process + '" >' + fields.Process + '</button>');
            return $td;
        },
        columns: [
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
                 field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })

             },
            {
                field: 'WorkCenterName', title: fields.WorkCenterDescription, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 60 })

            },
             {
                 field: 'MoNo', title: fields.MoNo, align: "center", width: "130", visible: false,
                 rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
             },
            {
                field: 'MoSeq', title: fields.MoSeq, align: "center", width: "130", visible: false,
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
          {
              field: 'Part', title: fields.Part, align: "center", width: "130", visible: false,
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
                rander: new mf.TextTimeDateRander({ size: 13, title: "title", maxLength: 120 })
            },
             {
                 field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "130",
                 rander: new mf.TextTimeDateRander({ size: 13, title: "title", maxLength: 120 })
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

    //操作按钮工序表
    ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "FabMoOperationID",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabMoProcessID = process_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00010GetOperationList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
            //        console.log(data);
            //var data = [{ DetailID: 1, Sequence: '10', Operation: 'ba01' }]
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'Sequence', title: fields.ArrangeSequence, align: "center", require: true, width: "130",
                 rander: new mf.StaticValueRander()
             },
             {
                 field: 'OperationCode', title: fields.Operation, align: "center", require: true, width: "130",
                 rander: new mf.StaticValueRander()
             },
            {
                field: 'OperationName', title: fields.OperationDesc, align: "center", width: "140",
                rander: new mf.StaticValueRander()

            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", require: true, width: "130",
                rander: new mf.TextTimeDateRander()
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "140",
                rander: new mf.TextTimeDateRander()

            },
              {
                  field: 'Quantity', title: fields.Qty, align: "center", require: true, width: "130",
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
                  field: 'DifferenceQuantity', title: fields.DifferenceQty, align: "center", require: true, width: "130",
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
                  field: 'Status', title: fields.Status, align: "center",
                  rander: new mf.StaticValueRander()

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

    //制程明细按钮
    this.ProcessDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#ProcessDetailDialog', {
            viewModel: function () {
                process_detail_id = row.FabricatedMotherID;
                ProcessDetailTable.loadData();
            }
        });
    };

    //操作按钮工序
    this.ProcessClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = ProcessDetailTable.getRowData($tr);
        mf.dialog('#ProcessDialog', {
            viewModel: function () {
                process_id = row.FabMoProcessID;
                ProcessTable.loadData();
            }
        });
    };

    //工作中心列表
    this.WkCenterDialogTable = new mf.Table("#WkCenterTable", {
        uniqueId: "WorkCenterID",
        paginationBar: new mf.PaginationBar("#WkCenterPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#WorkCenterTxt").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WorkCenter, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    //工作中心开窗
    this.WorkCenterClick = function (obj) {
        $("#WorkCenterTxt").val("");
        $("#WkCenterDialog").modal({ backdrop: 'static', keyboard: false });
        $("#WkCenterDialog").modal('show');
        self.WkCenterDialogTable.loadData();

        $("#WkCenterComfirm").unbind();
        $("#WkCenterComfirm").click(function () {
            var row = self.WkCenterDialogTable.getSelectedData();
            if (row) {
                if (obj == "1") {
                    $("#StartingWorkCenter").val(row.Code);
                    form.StartingWorkCenter(row.Code);
                    form.StartingWorkCenterID(row.WorkCenterID)
                } else {
                    $("#EndingWorkCenter").val(row.Code);
                    form.EndingWorkCenter(row.Code);
                    form.EndingWorkCenterID(row.WorkCenterID)
                }
                $("#WkCenterDialog").modal("hide");
            }
        });
        //
    };

    //工作中心开窗查询
    this.searchWkCenterClick = function () {
        self.WkCenterDialogTable.loadData(null, null, 1);
    };

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
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" })
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

    //客户列表
    this.CustomerDialogTable = new mf.Table("#CustomerTable", {
        uniqueId: "CustomerID",
        paginationBar: new mf.PaginationBar("#CustomerPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#CustomerTxt").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetCustomerList',
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
                field: 'Code', title: fields.Customer, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.CustomerDesc, align: "center", width: "280",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Status', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    //客户开窗
    this.CustomerCodeClick = function (obj) {
        $("#CustomerTxt").val("");
        $("#CustomerDialog").modal({ backdrop: 'static', keyboard: false });
        $("#CustomerDialog").modal('show');
        self.CustomerDialogTable.loadData();

        $("#CustomerComfirm").unbind();
        $("#CustomerComfirm").click(function () {
            var row = self.CustomerDialogTable.getSelectedData();
            if (row) {
                if (obj == "1") {
                    $("#StartCustomerNo").val(row.Code);
                    form.StartCustomerNo(row.Code);
                } else {
                    $("#EndCustomerNo").val(row.Code);
                    form.EndCustomerNo(row.Code);
                }
                $("#CustomerDialog").modal("hide");
            }
        });
        //
    };

    //客户开窗查询
    this.searchCustomerClick = function () {
        self.CustomerDialogTable.loadData(null, null, 1);
    };

    //业务员列表
    this.SalesManDialogTable = new mf.Table("#SalesManTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#SalesManPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#WorkNumberTxt").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
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
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "280",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    //业务员开窗
    this.SalesmanCodeClick = function (obj) {
        $("#WorkNumberTxt").val("");
        $("#SalesManDialog").modal({ backdrop: 'static', keyboard: false });
        $("#SalesManDialog").modal('show');
        self.SalesManDialogTable.loadData();

        $("#SalesComfirm").unbind();
        $("#SalesComfirm").click(function () {
            var row = self.SalesManDialogTable.getSelectedData();
            if (row) {
                if (obj == "1") {
                    $("#StartClerkNo").val(row.Emplno);
                    form.StartClerkNo(row.Emplno);
                } else {
                    $("#EndClerkNo").val(row.Emplno);
                    form.EndClerkNo(row.Emplno);
                }
                $("#SalesManDialog").modal("hide");
            }
        });
        //
    };

    //业务员开窗查询
    this.searchSalesManClick = function () {
        self.SalesManDialogTable.loadData(null, null, 1);
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
    "ProcessOrderProcessDetails", "ArrangeSequence", "Modate", "GoodsName", "Specification", "StartWorkDate", "FinishWorkDate",
    "CustomerName", "AccountName", "OrderNo", "StartCustomerNo", "EndCustomerNo", "StartClerkNo", "EndClerkNo", "ProcessDetail", "Unit",
    "WorkNumber", "Name", "AccountMaintenance", "CustomerList", "Customer", "CustomerDesc", "MoNoMasterFile", "WorkCenterDoc"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};