var URL = "/MES/IntelligentManufacturing/SFC00012";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar("#container");

var model = null;
var parameters;

var viewModel = function () {

    var self = this;
    var table = null, ProcessTable = null;
    var startMono, startMoseq, endMono, endMoseq;//查询画面使用
    var process_id, mono, moseq, wkcenter;//工序开窗使用
    var defaultOption = {};
    var lang = [];
    var langStr = "EN";
    if (language != 'en') {
        lang = language.split('-');
        langStr = 'zh-' + lang[1].toUpperCase();
    }
    parameters.PT0191213000004[1].text = fields.Issued;

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
        StartOrderSequence: ko.observable(),
        EndOrderSequence: ko.observable(),
        StartDateOfCompletion: ko.observable(),
        EndDateOfCompletion: ko.observable(),
        StartItemCode: ko.observable(),
        EndItemCode: ko.observable(),
        StartingProcess: ko.observable(),
        EndingProcess: ko.observable()
    }
    ko.applyBindings(form);

    var myDate = new Date();
    var today = myDate.getFullYear() + '-' + (((myDate.getMonth() + 1) < 10) ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-' + myDate.getDate();
  //  form.StartDateOfCompletion(today);
   // form.EndDateOfCompletion(today);
   // $("#StartDateOfCompletion").val(today);
   // $("#EndDateOfCompletion").val(today);
   // $("#StartDateOfCompletion").datepicker('setDate', today);
   // $("#EndDateOfCompletion").datepicker('setDate', today);


    table = new mf.Table("#ProcessComlpletedTable", {
        uniqueId: "CompletionOrderID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 178,
        editable: false,
        dblclick_editable: false,
        isFrozenColumn: true,
        operateColumWidth: "80px",

        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            //var flag = data['OperationFlag'];
            //var $BtnProcess = $row.find("#BtnProcess");

            //if (flag != "Y") {//若不启用，则不使用工序
            //    $BtnProcess.attr("disabled", true);
            //}
        },

        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="BtnProcess" onclick="model.ProcessClick(this)" title="' + fields.Process + '" >' + fields.Process + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.StartWorkCenterCode = form.StartingWorkCenter();
            searchData.EndWorkCenterCode = form.EndingWorkCenter();

            searchData.StartDate = form.StartDateOfCompletion();
            searchData.EndDate = form.EndDateOfCompletion();

            searchData.StartFabMoCode = form.StartOrderNumber();
            searchData.EndFabMoCode = form.EndOrderNumber();

            searchData.StartItemCode = form.StartItemCode();
            searchData.EndItemCode = form.EndItemCode();

            searchData.StartProcessCode = form.StartingProcess();
            searchData.EndingProcessCode = form.EndingProcess();
            
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00012GetList",
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        LastWidth: "110",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'WorkCenterName', title: fields.CenterDescription, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 60 })
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
                field: 'MoNo', title: fields.MoNo, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
            {
                field: 'InOutMark', title: fields.InoutMark, align: "center", width: "130",
                rander: new mf.SelectRander(parameters.PT0191213000058)
                //rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
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
                field: 'LaborHourStr', title: fields.LaborHour, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
            {
                field: 'UnLaborHourStr', title: fields.InvalidLaborHour, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
            {
                field: 'MachineHourStr', title: fields.MachineHour, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
            {
                field: 'UnMachineHourStr', title: fields.InvalidMachineHour, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
            {
                field: 'Status', title: fields.ProcessState, align: "center",
                rander: new mf.SelectRander(parameters.PT0191213000004)
                //rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
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
        uniqueId: "OperationID",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

           // searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            //searchData.WorkCenterCode = wkcenter;
            //searchData.OrderCode = mono;
            //searchData.Sequence = moseq;
            searchData.FabMoProcessID = process_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00012GetOperationList",
                data: searchData,
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
                field: 'Sequence', title: fields.ProcessSerialNo, align: "center", require: true, width: "80",
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
                field: 'LaborHourStr', title: fields.LaborHour, align: "center", width: "130",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'UnLaborHourStr', title: fields.InvalidLaborHour, align: "center", width: "130",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'MachineHourStr', title: fields.MachineHour, align: "center", width: "130",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'UnMachineHourStr', title: fields.InvalidMachineHour, align: "center", width: "130",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "100",
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

    //操作按钮工序
    this.ProcessClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        mf.dialog('#ProcessDialog', {
            viewModel: function () {
                wkcenter = row.WorkCenterCode;
                mono = row.MoNo;
                moseq = row.MoSeq;
                process_id = row.CompletionOrderID;
                ProcessTable.loadData();
            }
        });
    };

    //制程代号资料
    var ProcessNoTable = new mf.Table("#ProcessNoTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionProcessNoBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var processSearch = $("#TxtProcessNoSearch").val();
            if (processSearch && processSearch.length > 0) {
                searchData.Code = processSearch + "";
            }
            searchData.typeID = "000017";
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            //
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
                data: searchData,
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
                field: 'Code', title: fields.ProcessNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //制程代号开窗查询
    this.DialogProcessNoSearch = function () {
        ProcessNoTable.goForwordSafely(function () {
            ProcessNoTable.loadData(null, null, 1);
        }, null);
    };

    //制程代号开窗
    this.SearchProcess = function (id) {
        $("#TxtProcessNoSearch").val("");
        $("#ProcessNoDialog").modal("show");
        $("#ProcessNoDialog").modal({ backdrop: 'static', keyboard: false });
        ProcessNoTable.loadData();
        $("#ProcessNoCommit").unbind();
        $("#ProcessNoCommit").click(function () {
            var row = ProcessNoTable.getSelectedData();
            if (row) {
                //   $(id).val(row.Code);
                if (id == '#StartProcessNo') {
                    form.StartingProcess(row.Code)
                } else if (id == '#EndProcessNo') {
                    form.EndingProcess(row.Code)
                }
                
                $("#ProcessNoDialog").modal("hide");
            }
        });
    }

    //工作中心资料
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "WorkCenterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var wkcenterSearch = $("#TxtWorkCenterSearch").val();
            if (wkcenterSearch && wkcenterSearch.length > 0) {
                searchData.Code = wkcenterSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: searchData,
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
                field: 'Code', title: fields.WorkCenterNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //工作中心开窗查询
    this.DialogWorkCenterSearch = function () {
        WorkCenterTable.goForwordSafely(function () {
            WorkCenterTable.loadData(null, null, 1);
        }, null);
    };

    //工作中心开窗
    this.SearchWorkCenter = function (id) {
        $("#TxtWorkCenterSearch").val("");
        $("#WorkCenterDialog").modal("show");
        $("#WorkCenterDialog").modal({ backdrop: 'static', keyboard: false });
        WorkCenterTable.loadData();
        $("#WorkCenterCommit").unbind();
        $("#WorkCenterCommit").click(function () {
            var row = WorkCenterTable.getSelectedData();
            if (row) {
                if (id == "#StartingWorkCenter") {
                    form.StartingWorkCenter(row.Code)
                } else if (id == '#EndingWorkCenter') {
                    form.EndingWorkCenter(row.Code)
                }
            //    $(id).val(row.Code);
                $("#WorkCenterDialog").modal("hide");
            }
        });
    }

    //制令单资料
    var MoNoTable = new mf.Table("#MoNoTable", {
        uniqueId: "FabricatedMotherID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionMoNoBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var monoSearch = $("#TxtMoNoSearch").val();
            if (monoSearch && monoSearch.length > 0) {
                searchData.MoNo = monoSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00010GetFabricatedMother',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "MoNo",
        height: 300,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.DateRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.DateRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //制令单开窗查询
    this.DialogMoNoSearch = function () {
        MoNoTable.goForwordSafely(function () {
            MoNoTable.loadData(null, null, 1);
        }, null);
    };

    //制令单开窗
    this.SearchCode = function (id, seq) {
        $("#TxtMoNoSearch").val("");
        $("#CodeDialog").modal("show");
        $("#CodeDialog").modal({ backdrop: 'static', keyboard: false });
        MoNoTable.loadData();
        $("#MoNoCommit").unbind();
        $("#MoNoCommit").click(function () {
            var row = MoNoTable.getSelectedData();
            if (row) {
                if (id == '#StartOrderNumber') {
                    form.StartOrderNumber(row.MoNo)
                } else if (id == '#EndOrderNumber') {
                    form.EndOrderNumber(row.MoNo)
                }
               // $(id).val(row.MoNo);
                $(seq).val(row.SplitSequence);
                $("#CodeDialog").modal("hide");
            }
        });
    }




    //料品代号资料
    var PartTable = new mf.Table("#PartTable", {
        uniqueId: "ItemID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionPartBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var partSearch = $("#TxtPartSearch").val();
            if (partSearch && partSearch.length > 0) {
                searchData.Code = partSearch + "";
            }
            searchData.Type = "";
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/SfcGetItemList',
                data: searchData,
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
                field: 'Code', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //料品代号开窗查询
    this.DialogPartSearch = function () {
        PartTable.goForwordSafely(function () {
            PartTable.loadData(null, null, 1);
        }, null);
    };

    //料品代号开窗
    this.SearchItemCode = function (id) {
        $("#TxtPartSearch").val("");
        $("#PartDialog").modal("show");
        $("#PartDialog").modal({ backdrop: 'static', keyboard: false });
        PartTable.loadData();
        $("#PartCommit").unbind();
        $("#PartCommit").click(function () {
            var row = PartTable.getSelectedData();
            if (row) {
                if (id == '#StartItemCode') {
                    form.StartItemCode(row.Code)
                } else if (id == '#EndItemCode') {
                    form.EndItemCode(row.Code)
                }
             //   $(id).val(row.Code);
                $("#PartDialog").modal("hide");
            }
        });
    }

};

var arrayWord = [
    "Import", "Browse", "Save", "Details", "Remark", "CreatedBy", "CreatedDate", "Process",
    "LastChangedBy", "LastChangedDate", "no", "yes", "Cancel", "Comfirm", "PleaseSelectFile", "PleaseSelectRecord",
    "ProcessMaster", "Search", "Add", "Delete", "Normal", "Invalid", "info", "NoDataExport", "SaveOrNot", "PleaseSaveDataFirst",
    "StartWorkCenter", "EndWorkCenter", "StartOrderNumber", "EndOrderNumber", "StartDateOfCompletion", "EndDateOfCompletion",
    "WorkCenter", "CenterDescription", "Status", "MoNo", "MoSeq", "ProcessSequence", "Part", "ProcessNo", "ProcessDescription",
    "InoutMark", "DepartmentNoOrManufacturersNo", "DepartmentDesOrManufacturersDes", "EstimatedStartDate", "EstimatedFinishDate",
    "Qty", "FinProQty", "AmountDeposit", "DifferenceQty", "ScrappedQty", "AuxiliaryUnit", "UnitRate", "Operation", "OperationDesc",
    "ProcessOrderProcessDetails", "ProcessSerialNo", "StartProcessNo", "EndProcessNo", "StartItemCode", "EndItemCode",
    "InvalidLaborHour", "InvalidMachineHour", "LaborHour", "MachineHour", "Issued", "ItemMasterFile", "ItemNo", "ItemDescription",
    "ItemSpecification", "EstimatedStartDate", "EstimatedFinishDate", "WorkCenterNo", "WorkCenterInformation", "WorkCenterDescription",
    "ProcessState", "MoNoMasterFile"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,0191213000058" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
    //model = new viewModel();
};