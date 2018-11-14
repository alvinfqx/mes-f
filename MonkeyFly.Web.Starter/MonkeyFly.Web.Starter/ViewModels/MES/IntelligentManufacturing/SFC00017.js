var viewModel = function () {
    var self = this;
    var PrintSearch;
    var total, page, rows;
    var FabricatedMotherID = null;

    // 刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData();
        }, null);
    };

    //打印
    this.printClick = function () {
        if (total == 0) {
            msg.info(fields.info, fields.NoRecord);
            return;
        }
        var all = total / rows;
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: { MID: MID, page: page, rows: rows, total: Math.ceil(all), PrintSearchData: PrintSearch } });
        window.location.href = '/MES/IntelligentManufacturing/SFC00017Print';
    }

    //显示明细
    this.DetailsClick = function (ID) {
        var $tr = $(ID).parent().parent();
        var row = table.getRowData($tr);
        if (row) {
            var Date = row.Date;
            Date = Date.substring(0, 10);
            $("#DetailsMoNo").val(row.MoNo);
            $("#DetailsDate").val(Date);
            $("#DetailsPart").val(row.Code);
            $("#DetailsMoNo").attr("title", row.MoNo);
            $("#DetailsDate").attr("title", Date);
            $("#DetailsPart").attr("title", row.Code);
            FabricatedMotherID = row.FabricatedMotherID;
            DetailsTable.loadData();
            $("#DetailsDialog").modal("show");
            $("#DetailsDialog").modal({ backdrop: 'static', keyboard: false });
        }        
        
    };

    //设置明细表格
    var DetailsTable = new mf.Table("#DetailsTable", {
        uniqueId: "FabMoProcessID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDetailsBar"),
        fn_getData: function (pagination, searchData, success) {

            searchData.FabricatedMotherID = FabricatedMotherID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00017GetDetailList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", require: true, width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, require: true, align: "center", width: "140",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'PreProQuantity', title: fields.PreTransferQty, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Unhealthy', title: fields.BadNumber, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Rate', title: fields.Yield, require: true, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //显示料号代号弹窗
    this.showItemCode = function (ID) {
        var Value = $(ID).val();
        $("#ItemNo").val(Value);
        ItemTable.loadData();
        $("#ItemDialog").modal("show");
        $("#ItemDialog").modal({ backdrop: 'static', keyboard: false });       
        $("#ItemCommit").unbind();
        $("#ItemCommit").click(function () {
            var row = ItemTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#ItemDialog").modal("hide");
            }
        })
    };

    //起始料号代号弹窗查询
    this.ItemNoSearch = function () {
        ItemTable.goForwordSafely(function () {
            ItemTable.loadData();
        }, null);
    };

    //设置料品代号表格
    var ItemTable = new mf.Table("#ItemTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionItemBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ItemNo").val();
            var Name = $("#ItemGoodsName").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/Sfc00017GetItemList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Name: Name }),
                success: function (data) {
                  
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },

            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.Specification, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
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
            searchData.ItemName = $("#GoodsNameTxt").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00017GetFabMoList',
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
                field: 'ItemCode', title: fields.Part, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemName', title: fields.GoodsName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemSpecification', title: fields.Specification, align: "center", width: "190",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.TextRander({ title: "title" })
            },
        ]
    });

    //制令单开窗
    this.MoCodeClick = function (ID) {
        var Value = $(ID).val();
        $("#MoNoTxt").val(Value);
        MoCodeDialogTable.loadData();
        $("#MoCodeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MoCodeDialog").modal('show');      
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
            MoCodeDialogTable.loadData();
        }, null);
    };

    //设置表格
    var table = new mf.Table("#SFC00017Table", {
        uniqueId: "FabricatedMotherID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var StartOrderNumber = $("#StartOrderNumber").val();
            if (StartOrderNumber && StartOrderNumber.length > 0)
                searchData.StartFabMoCode = StartOrderNumber + "";

            var EndOrderNumber = $("#EndOrderNumber").val();
            if (EndOrderNumber && EndOrderNumber.length > 0)
                searchData.EndFabMoCode = EndOrderNumber + "";

            var StartItemCode = $("#StartItemCode").val();
            if (StartItemCode && StartItemCode.length > 0)
                searchData.StartItemCode = StartItemCode + "";

            var EndItemCode = $("#EndItemCode").val();
            if (EndItemCode && EndItemCode.length > 0)
                searchData.EndItemCode = EndItemCode + "";

            PrintSearch = searchData;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00017GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    total = data.total;
                    page = pagination.page;
                    rows = pagination.rows;
                    console.log(data);
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        isFrozenColumn: true,
        operateColumWidth: "109px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:109px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="DetailsClick"  style="width:70px;" onclick="model.DetailsClick(this)" title="' + fields.Details + '" >' + (fields.Details.length > 8 ? fields.Details.substring(0, 8) + "..." : fields.Details) + '</button>');
            return $td;
        },
        LastWidth: "100",
        IsSetTableWidth: true,
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Date', title: fields.Modate, require: true, align: "center", width: "120",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'Code', title: fields.Part, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "170",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.Specification, require: true, align: "center", width: "200",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ThroughRate', title: fields.ThroughRate, require: true, align: "center",
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
    this.clearInput = function (ID,IDS) {
        $(ID).val("");
        $(IDS).val("");
    };

}

var URL = "/MES/IntelligentManufacturing/SFC00017";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "StartOrderNumber", "EndOrderNumber", "StartItemCode", "EndItemCode", "MoNo", "Modate", "Part", "GoodsName",
    "Specification", "ThroughRate", "Details", "MoSeq", "Status", "MoNoMasterFile", "Search", "Cancel", "Comfirm",
    "ItemNo", "SupplyType", "ItemMasterFile", "ProcessSequence", "ProcessNo", "ProcessDescription", "PreTransferQty",
    "BadNumber", "Yield", "OrderStraightforwardDetails", "info", "NoRecord"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};