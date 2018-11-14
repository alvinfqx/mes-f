var Parameters = null;
var viewModel = function () {
    var self = this;

    var table = null;
 
    //table 制程生产计划差异
    table = new mf.Table("#SFC00021Table", {
        uniqueId: "ProcessID",      
        height: window.innerHeight - 130,
        LastWidth: "110",
        IsSetTableWidth: true,
        editable: false,
        dblclick_editable: false,
        fn_getData: function(pagi,searchD, success){
            // success(d);
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00021GetList",
                data: Parameters.PrintSearchData,
                success: function (data) {
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

    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: Parameters.parentUrl, Parameters: Parameters.parentMID });
        window.location.href = Parameters.parentUrl;
    }

    this.printClick = function () {
        $("#tb_list .J-toolbar").hide();
        $("#tb_list .J-content").addClass("contentBorder");
        window.print();
        $("#tb_list .J-content").removeClass("contentBorder");
        $("#tb_list .J-toolbar").show();
    }
    $(".title1").text(fields.SFC00021Title);
    $("#items").html('<span class="title3">' + fields.DateLable + '：' + mf.format.Date(new Date()) + '</span><span class="title3 ">' + fields.UserLable + '：' + window.top.username + '</span><span class="title3">' + fields.PageLable + '：' + Parameters.page + "/" + Parameters.total + '</span>');
    }

var arrayWord = ["StartProcessNo", "EndProcessNo", "StartProcessDate", "EndProcessDate", "Search", "Refresh", "Print",
    "ProcessNo", "StartProcessDate", "EndProcessDate", "WorkCenter", "ProcessDescription", "Cancel", "Comfirm",
    "OutputPlanRatio", "InputPlanRatio", "OutputRatio", "PlanNum", "OutputNum", "InputNum", "UserLable", "DateLable", "PageLable",
    "SFC00021Title"
];

words = arrayWord.join();

var URL = "/MES/IntelligentManufacturing/SFC00021";
var model = null;

Parameters = window.top.page_parameters.GetParameters(URL);
var MID = Parameters.MID;

initPage = function () {
    model = new viewModel();
}