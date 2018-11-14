var viewModel = function () {
    var self = this;
    var PrintSearch;
    var total, page, rows;

    $("#StartSingleDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    $('#StartSingleDate').val(mf.format.Date(new Date()));

    $("#EndSingleDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    $('#EndSingleDate').val(mf.format.Date(new Date()));

    var formModel = {
        Status: ko.observable()
    };

    ko.applyBindings(formModel);

    var temp = '';

    for (var i = 0; i < parameters.PT0191213000004.length; i++) {
        var StatusValue = parameters.PT0191213000004[i].value;
        if (StatusValue.substring(5, StatusValue.length) == "0201213000028" || StatusValue.substring(5, StatusValue.length) == "020121300002A") {

            temp += '&nbsp;<input type="checkbox" class="i-checks" value = "' + StatusValue + '" /><span>' + parameters.PT0191213000004[i].text + '</span>';

            if (i != parameters.PT0191213000004.length - 1) {
                temp = temp + "&nbsp;"
            }
        }
    }

    $("#SStatus").html(temp);

    $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });

    $(".i-checks").eq(0).iCheck('check');
    var Statusch = $("#SStatus").find(".i-checks");
    formModel.Status(Statusch.eq(0).val());

    // 刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        var SStatus = $("#SStatus").find(".i-checks");
        var StatusStr = "";
        for (var i = 0; i < parameters.PT0191213000004.length; i++) {
            if (SStatus.eq(i).is(':checked')) {
                StatusStr += SStatus.eq(i).val() + ",";
            }
        }
        if (StatusStr.length > 0) {
            formModel.Status(StatusStr.substring(0, StatusStr.length - 1));
        }
        else {
            formModel.Status('');
        }
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
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
        window.location.href = '/MES/IntelligentManufacturing/SFC00018Print';
    }

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
                url: '/MES/api/PopUp/SfcGetFabMoList',
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
        var WValue = $(ID).val();
        $("#MoNoTxt").val(WValue);
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
            MoCodeDialogTable.loadData(null, null, 1);
        }, null);
    };

    //设置表格
    var table = new mf.Table("#SFC00018Table", {
        uniqueId: "FabMoItemID",
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

            var StartDate = $("#StartSingleDate").val();
            var EndDate = $("#EndSingleDate").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;
            searchData.Status = formModel.Status();

            PrintSearch = searchData;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00018GetList',
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
        LastWidth: "150",
        IsSetTableWidth: true,
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.ChildPartNo, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'UseQuantity', title: fields.UsageAmount, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ActualQuantity', title: fields.ActualDosage, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DifferenceNum', title: fields.DifferenceNumber, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ChildGoodsName, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.PartsSpecification, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemCode', title: fields.ProductCode, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Quantity', title: fields.ProductionNum, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemName', title: fields.ProductNames, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemSpecification', title: fields.ProductSpecification, require: true, align: "center",
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

var URL = "/MES/IntelligentManufacturing/SFC00018";

var MID = window.top.page_parameters.GetParameters(URL);

var parameters = null;

mf.toolBar('#container');

var arrayWord = [
    "StartOrderNumber", "EndOrderNumber", "StartSingleDate", "EndSingleDate", "MoNo", "Modate", "Part", "GoodsName",
    "Specification", "MoSeq", "Status", "MoNoMasterFile", "Search", "Cancel", "Comfirm", "ProductSpecification",
    "ItemNo", "SupplyType", "ItemMasterFile", "ProcessSequence", "ProcessNo", "ProcessDescription", "PreTransferQty",
    "BadNumber", "Yield", "OrderStraightforwardDetails", "info", "NoRecord", "ProductNames", "ProductionNum", "ProductCode",
    "PartsSpecification", "ChildGoodsName", "DifferenceNumber", "ActualDosage", "UsageAmount", "ProcessNo", "ChildPartNo"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            parameters = data;
            console.log(parameters);
            model = new viewModel();


        }
    });
};