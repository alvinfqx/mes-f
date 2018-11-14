var URL = "/MES/IntelligentManufacturing/SFC00006Material";

var parameters = window.top.page_parameters.GetParameters(URL);



var viewModel = function () {
    var self = this;
    var rowData = parameters.rowData

    $("#TackNo").val(rowData.TaskNo);
    $("#WorkOrderNumber").val(rowData.MoNo);
    $("#WorkCenter").val(rowData.WorkCenterCode);
    $("#Part").val(rowData.ItemCode);
    $("#ItemDescription").val(rowData.ItemName);
    $("#ItemSpecification").val(rowData.Specification);
    $("#DispatchAmount").val(rowData.AssignQty);

    //返回
    this.materialBackClick = function () {
        if (!MaterialDetailsTable)
            return;
        MaterialDetailsTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, fields.Isleave);

    };

    //刷新
    this.materialRefreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Material", Parameters: parameters });
        window.location.href = "/MES/IntelligentManufacturing/SFC00006Material";

    };


    //用料视窗表格
    var MaterialDetailsTable = new mf.Table("#MaterialDetailsTable", {
        uniqueId: "MaterialDetailsID",
        editable: false,
        height: window.innerHeight - 182,
        operateColumWidth: "70px",
        paginationBar: new mf.PaginationBar("#MaterialDetailPageBar"),

        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            searchData.TaskDispatchID = rowData.TaskDispatchID;
 
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00006GetItemList',
                data: searchData,
                success: function (data) {
                 console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Sequence', title: fields.Sorting, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))

            },
            {
                field: 'PartSource', title: fields.ItemSource, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))

            },
            {
                field: 'Part', title: fields.ItemNo, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Description', title: fields.ItemDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Drawing', title: fields.EngineeringDrawing, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Unit', title: fields.Unit, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'BaseQty', title: fields.BasicDosage, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'ScrapRate', title: fields.AttritionRate, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'UseQty', title: fields.UsageAmount, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
             {
                 field: 'Creator', title: fields.Builder, align: "center", width: "140",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
             },
             {
                 field: 'CreateTime', title: fields.DateOfCreation, align: "center",
                 rander: new mf.DateRander({title:true})
             },
            {   field: 'Modifier', title: fields.LastChangedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: 'title' })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", readonly: "readonly", width: "160",
                rander: new mf.TextTimeRander({ title: true})
            },
        ]
    })

    MaterialDetailsTable.loadData();



}



var arrayWord = [
    "TaskNo", "WorkOrderNumber", "Part", "ItemDescription", "ItemSpecification", "QuantityDispatch", "FinProQty", "ItemSource",
    "ItemDescription", "ItemSpecification", "EngineeringDrawing", "Unit", "BasicDosage", "AttritionRate", "UsageAmount", "Remark",
    "Builder", "DateOfCreation", "Back", "ItemNo", "WorkCenter", "Refresh", "Part", "ItemDescription", "ItemSpecification", "DispatchAmount",
    "TaskCardNo", "Sorting", "LastChangedBy", "LastChangedDate", "Cancel"
];


words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};