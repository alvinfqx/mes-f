
var URL = "/MES/IntelligentManufacturing/SFC00023";
var MID = window.top.page_parameters.GetParameters(URL);
var model = null;
var parameters = null;
mf.toolBar("#container");

var viewModel = function () {
    var self = this;
    var userName = "";


    //获取登录人员
    mf.ajax({
        type: 'Get',
        url: '/MES/api/Util/GetUser',
        data: {},
        success: function (data) {
            console.log(data)
            if (data) {
                userName = data.Account
            }

        }
    })

    //起始完工日期
    $("#StartDateOfCompletion").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#StartDateOfCompletion").datepicker("setEndDate", $("#EndDateOfCompletion").val())
    });

    //结束完工日期
    $("#EndDateOfCompletion").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView:3,
    }).on("click", function () {
        $("#EndDateOfCompletion").datepicker("setStartDate", $("#StartDateOfCompletion").val())
    });


    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        
        Table.loadData(null,null,1);

    };

    //打印
    this.printClick = function () {
        var totalPage = $("#paginagionBar #sp_totalPage").text();
        var pages = "";
        if (totalPage) {
            pages = totalPage.substring(1, totalPage.length - 1);
        } else {
            pages = "0"
        }
        Table.setOption({height:300})
        var pageNum = $("#paginagionBar #in_pageNum").val();
        $("#tb_list .J-toolbar").hide();
        $("#tb_list .J-search").hide();
        $(".J-content .mf-table-wrapper").css({ "border": "1px solid #fff" });
        //给打印加上标题
        var node = $('<div id="printHeader" styl="width:100%;text-align:center"></div>');
        var html = "";
        html += '<h3 id="printTitle" style="text-align:center;">' + fields.CompletionListPrint + '</h3>'
        html += '<div id="printMes" style="text-align:center;width:100%;margin-top:10px;"><span id="printDate" style="display:inline-block;width:35%;s">' + fields.DateLable + ":" + mf.format.Date(new Date()) + '</span>';
        html += '<span id="printer" style="display:inline-block;width:30%;">' + fields.UserLable + ':' + userName + '</span>';
        html += '<span id="printPage" style="display:inline-block;width:35%;">' + fields.PageLable + ':' + pageNum + '/' + pages + '</span>';
        html += '</div>';
        node.html(html);
       
        $(".J-content").prepend(node);

        $("#paginagionBar").hide();
        window.print();
        $("#tb_list #printHeader").remove();
        $(".J-content .mf-table-wrapper").css({ "border": "1px solid  #EBEBEB" });
        $("#tb_list .J-search").show();
        $("#tb_list .J-toolbar").show();
        $("#paginagionBar").show();
        
    };

    //料号开窗
    this.TheStartingMaterialClick = function (node) {
        
        PartTable.loadData();
        var values = $(node).val();
        $("#PartDialog").modal("show");
        $("#TxtPartSearch").val(values)
        if (values && values.length > 0) {
            PartTable.loadData();
        }
        $("#PartCommit").unbind();
        $("#PartCommit").click(function () {
            var rowData = PartTable.getSelectedData();
            if (!rowData) {
                msg.info(fields.Prompt, fields.PleaseSelectRecord);
                return
            };
            if (node == "#TheStartingMaterial") {
                $("#TheStartingMaterial").val(rowData.Code)
            } else if (node == "#TheEndOfTheMaterial") {
                $("#TheEndOfTheMaterial").val(rowData.Code)
            }
            $("#TxtPartSearch").val("");
            $("#PartDialog").modal("hide")
        })
    }

    //料号表格
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
            searchData.Code = $("#TxtPartSearch").val();
            searchData.Type = "";
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00023GetItemList',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        LastWidth: 160,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Type', title: fields.SupplyForm, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Specification', title: fields.Specification, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //料号关闭清除数据
    this.cleanClick = function () {
        console.log(1)
        $("#TxtPartSearch").val("")
    }
    //料号视窗-查询
    this.DialogPartSearch = function () {
        PartTable.loadData(null,null,1);
    }

    //主表
    var Table = new mf.Table("#SFC00023Table", {
        uniqueId: "ID",
        height: window.innerHeight - 185,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        IsSetTableWidth: true,
        LastWidth: 120,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.BatchNo = $("#LotNo").val();
            searchData.ItemStar = $("#TheStartingMaterial").val();
            searchData.ItemEnd = $("#TheEndOfTheMaterial").val();
            searchData.DateStar = $("#StartDateOfCompletion").val();
            searchData.DateEnd = $("#EndDateOfCompletion").val();

            //if (searchData.BatchNo == "") {
            //    searchData.BatchNo = "0"
            //}

            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentManufacturing/sfc00023GetList",
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function () { },
        columns: [
            {
                field: 'Date', title: fields.FinishWorkDate, align: "center", require: false, width: "140",
                rander: new mf.TextTimeDateRander({ title: true }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CompletionNo', title: fields.FinishNo, align: "center", require: false, width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: false, width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'BatchNo', title: fields.LotNo, align: "center", require: false, width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Quantity', title: fields.Quantity, align: "center", require: false, width: "140",
                rander: new mf.TextRander({ title: true }),
            },
            {
                field: 'ItemName', title: fields.ItemsName, align: "center", require: false, width: "140",
                rander: new mf.TextRander({ title: true }),
            },
            {
                field: 'ItemSpecification', title: fields.Specification, align: "center", require: false,
                rander: new mf.TextRander({ title: true }),
            },
        ]
    })

    Table.loadData();
};

var arrayWord = ["refresh", "Search", "Print","Cancel","Comfirm","Save",
    //查询条件
    "LotNo", "TheStartingMaterial", "TheEndOfTheMaterial", "StartDateOfCompletion", "EndDateOfCompletion",
    //料号开窗
    "Prompt", "PleaseSelectRecord", "Code", "Name", "Specification", "ItemNo", "ItemMasterFile", "SupplyForm", "GoodsName",
    //主表
    "Specification", "ItemsName", "Quantity", "LotNo", "MoNo", "FinishNo", "Part", "Modate", "FinishWorkDate",
    //打印
    "CompletionListPrint", "DateLable", "UserLable", "PageLable",
];

words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    })

}