var URL = "/MES/IntelligentManufacturing/SFC00019WorkCenter",
    URL1 = "/MES/IntelligentManufacturing/SFC00019Product";
var Parameters = window.top.page_parameters.GetParameters(URL) || window.top.page_parameters.GetParameters(URL1);
var MID = Parameters.MID;
var viewModel = function () {
    var WID = Parameters.WID;
    var table = null, total = 0;

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: Parameters.parentUrl, Parameters: Parameters.parentMID });
        window.location.href = Parameters.parentUrl;
    };


    this.printClick = function () {
        $("#tb_list .J-toolbar").hide();
        $("#tb_list .J-content").addClass("contentBorder");
        window.print();
        $("#tb_list .J-content").removeClass("contentBorder");
        $("#tb_list .J-toolbar").show();
    };
    $(".title1").text(fields.SFC00019Title);
    $("#items").html('<span class="title3">' + fields.DateLable + '：' + mf.format.Date(new Date()) + '</span><span class="title3">' + fields.UserLable + '：' + window.top.username + '</span><span class="title3">' + fields.PageLable + '：' + Parameters.page + "/" + Parameters.total + '</span>');


    if (WID == "product") {
        //主表
        table = new mf.Table("#PrintTable", {
            uniqueId: "FabricatedMotherID",
            editable: false,
            height: window.innerHeight - 185,
            fn_getData: function (pagination, searchData, success) {               
                mf.ajax({
                    type: "Get",
                    url: "/MES/api/IntelligentManufacturing/Sfc00019ItemGetList",
                    data: Parameters.PrintSearchData,
                    success: function (data) {
                        success(data);
                    }
                });

            },
            fn_saveData: function (data, success) {
            },
            columns: [
                {
                    field: "ItemCode", align: "center", title: fields.ProductCode, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "MoNo", align: "center", title: fields.MoNo, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "Sequence", align: "center", title: fields.ProcessSequence, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ProcessCode", align: "center", title: fields.ProcessNo, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ProcessName", align: "center", title: fields.ProcessDescription, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ActualHour", align: "center", title: fields.ActualTime, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "StandardHour", align: "center", title: fields.StandardTime, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "DifferenceHour", align: "center", title: fields.Difference, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ItemName", align: "center", title: fields.ItemsName, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ItemSpecification", align: "center", title: fields.Specification, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
            ]
        });
    } else if (WID == "workCenter") {
        table = new mf.Table("#PrintTable", {
            uniqueId: "FabMoProcessID",
            editable: false,
            height: window.innerHeight - 190,
            fn_getData: function (pagination, searchData, success) {
                mf.ajax({
                    type: "Get",
                    url: "/MES/api/IntelligentManufacturing/Sfc00019WorkCenterGetList",
                    data: Parameters.PrintSearchData,
                    success: function (data) {
                        success(data);
                    }
                });

            },
            fn_saveData: function (data, success) {
            },
            columns: [
                {
                    field: "WorkCenterCode", align: "center", title: fields.WorkCenter, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "WorkCenterName", align: "center", title: fields.WorkCenterDescription, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ProcessCode", align: "center", title: fields.ProcessNo, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ProcessName", align: "center", title: fields.ProcessDescription, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ItemCode", align: "center", title: fields.ProductCode, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ActualHour", align: "center", title: fields.ActualTime, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "StandardHour", align: "center", title: fields.StandardTime, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "DifferenceHour", align: "center", title: fields.Difference, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ItemName", align: "center", title: fields.ItemsName, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
                {
                    field: "ItemSpecification", align: "center", title: fields.Specification, width: "130",
                    rander: new mf.StaticValueRander({ title: "title" })
                },
            ]
        });
    }

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();
}

//var Parameters = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC000019Print");

var arrayWord = [
   "Search", "Confirm", "Cancel", "Refresh", "StartItemCode", "EndItemCode", "StartOrderNumber", "EndOrderNumber", "StartSingleDate", "EndSingleDate",
   "SupplyType", "ItemMasterFile", "ItemNo", "ItemDescription", "ItemSpecification", "Confirm", "MoNoMasterFile", "MoNo", "SequenceNo", "Status",
   "Comfirm", "ProductCode", "ProcessSequence", "ProcessNo", "ProcessDescription", "ActualTime", "StandardTime", "Difference", "ItemsName",
   "Specification", "Prompt", "DateError", "PrintBtn", "StartWorkCenter", "EndWorkCenter", "WorkCenterDescription", "WorkCenter", "ProductCode", "ProcessOrderNo", "ActualTime", "StandardTime", "Difference", "ItemsName",
   "Specification", "InoutMark", "DepartmentOrMakerDesc", "WorkCenterFile", "ProcessNo", "ProcessDescription",
   "DateError", "Print", "Back", "UserLable", "DateLable", "PageLable", "SFC00019Title"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};