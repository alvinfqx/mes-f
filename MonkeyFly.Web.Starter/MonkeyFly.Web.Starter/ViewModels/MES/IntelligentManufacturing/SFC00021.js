

var viewModel = function () {
    var self = this;

    var table = null, ExportTotal = page = rows = 0;
    var printData = {};

    $("#SStartDate").datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    });

    $("#EStartDate").datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    });
   
    //table 制程生产计划差异
    table = new mf.Table("#SFC00021Table", {
        uniqueId: "ProcessID",
        paginationBar: new mf.PaginationBar("#paginagionBar21"),
        height: window.innerHeight - 130,
        LastWidth: "110",
        IsSetTableWidth: true,
        editable: false,
        dblclick_editable: false,
        fn_getData: function(pagi,searchD, success){
            // success(d);
            printData = {
                page: pagi.page, rows: pagi.rows,
                StartProcessCode: $("#StartProcessNo").val(),
                EndProcessCode: $("#EndProcessNo").val(),
                StartDate: $("#SStartDate").val(),
                EndDate: $("#EStartDate").val()
            };
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00021GetList",
                data: printData,
                success: function (data) {
                    ExportTotal = data.total;
                    page = pagi.page;
                    rows = pagi.rows;
                    success(data);
                }
            })
        },
        fn_saveData: function(saveData, success){},
        columns: [
            {
                field: "ProcessCode", title: fields.ProcessNo, width: "150", align: "center",
                rander: new mf.StaticValueRander({title: true})
            },
            {
                field: "ProcessName", title: fields.ProcessDescription, width: "230", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "InputNum", title: fields.InputNum, width: "100", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "OutputNum", title: fields.OutputNum, width: "100", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "PlanNum", title: fields.PlanNum, width: "100", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "OutputRatio", title: fields.OutputRatio, width: "100", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "InputPlanRatio", title: fields.InputPlanRatio, width: "100", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "OutputPlanRatio", title: fields.OutputPlanRatio, align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
        ]

    });
    table.loadData();   

    this.searchClick = function () {
        if (table) {
            table.loadData();
        }
    }

    this.refreshClick = function () {
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            table.loadData();
        });
    }

    this.printClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.Prompt, fields.NoRecord);
            return;
        }
        var all = ExportTotal / rows;
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: { MID: MID, page: page, rows: rows, total: Math.ceil(all), PrintSearchData: printData, parentUrl: URL, parentMID: MID } });
        window.location.href = '/MES/IntelligentManufacturing/SFC00021Print';
    }

    //彈窗
    this.StartProcessNo = function (ID, sequence) {
        ProcessNoTable.loadData();
        $("#CodeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#CodeDialog").modal("show");
        $("#ProcessCommit").unbind();
        $("#ProcessCommit").click(function () {
            var row = ProcessNoTable.getSelectedData();
            if (row) {                
                $(ID).val(row.Code);
                $("#CodeDialog").modal("hide");
            } else {
                return;
            }
         
         
            $("#ProcessNoSs").val("");
            $("#ProcessDescription").val("");
        });
    }

    var ProcessNoTable = new mf.Table("#ProcessNoTable", {
        uniqueId: "ParameterID",
        height: 350,
        paginationBar: new mf.PaginationBar("#paginagionMoNoBar"),
        fn_getData: function (pagi, data, success) {
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/getParameterList",
                data: {
                    page: pagi.page,
                    rows: pagi.rows,
                    Code: $("#ProcessNoSs").val(),
                    Name: $("#ProcessDescription").val(),
                    typeID: "000017"
                },
                success: function (data) {
                    console.log(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData: function (data, success) {
        },
        LastWidth: "160",
        IsSetTableWidth: true,
        columns: [
            {
                field: "Code", title: fields.ProcessNo, width: "180", align: "center",
                rander: new mf.StaticValueRander({title: true})
            },
            {
                field: "Name", title: fields.ProcessDescription, width: "210", align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "Comments", title: fields.ProcessComments,  align: "center",
                rander: new mf.StaticValueRander({ title: true })
            },
      
                 
        ]

    });

    this.DialogProcessSearch = function () {
        if (ProcessNoTable) {
            ProcessNoTable.loadData();
        }
    }

    this.CleanClick = function () {
        $("#ProcessNoSs").val("");
        $("#ProcessDescription").val("");
    }

  
    }

var arrayWord = ["StartProcessNo", "EndProcessNo", "StartProcessDate", "EndProcessDate", "Search", "Refresh", "Print",
    "ProcessNo", "StartProcessDate", "EndProcessDate", "WorkCenter", "ProcessDescription", "Cancel", "Comfirm",
    "OutputPlanRatio", "InputPlanRatio", "OutputRatio", "PlanNum", "OutputNum", "InputNum", "ProcessComments",
    "NoRecord",""
];

words = arrayWord.join();

var URL = "/MES/IntelligentManufacturing/SFC00021";
var MID = window.top.page_parameters.GetParameters(URL);
var model = null;

mf.toolBar("#container");
initPage = function () {
    model = new viewModel();
}