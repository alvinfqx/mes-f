var URL = "/MES/IntelligentManufacturing/SFC00022Reason";
//var MID = window.top.pages_parameters_GetParameters(URL);

//mf.tooBar("#container")

var viewModel = function () {
    var self = this;
    var ItemID = null;//料品流水号


    //日期绑定
    $("#StartDate").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#StartDate").datetimepicker("setEndDate", $("#EndDate").val())
    });

    //结束日期绑定
    $("#EndDate").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#EndDate").datetimepicker("setStartDate", $("#StartDate").val())
    });



    //刷新
    this.refreshClick = function () {
     
        //  window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        $("#TheStartingMaterial").val("");
        $("#TheEndOfTheMaterial").val("");
        $("#StartDate").val("");
        $("#EndDate").val("");
        window.location.reload();
    };


    //火狐浏览器确保刷新后查询条件清空
    $("#TheStartingMaterial").val("");
    $("#TheEndOfTheMaterial").val("");
    $("#StartDate").val("");
    $("#EndDate").val("");

    //查询
    this.searchClick = function () {
        Table.loadData(null, null, 1);
    }

    //料号开窗
    this.TheStartingMaterialClick = function (node) {

        var searchValue = $(node).val();
        if (searchValue && searchValue.length > 0) {
            $("#TxtPartSearch").val(searchValue);
        }

        PartTable.loadData();
        $("#PartDialog").modal("show");



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

            //var partSearch = $("#TxtPartSearch").val();
            //if (partSearch && partSearch.length > 0) {
            //    searchData.Code = partSearch + "";
            //}
            searchData.Code = $("#TxtPartSearch").val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/SfcItemList',
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
    this.cleanClick = function (node1, node2) {
        $(node1).val("");
        if (node2) {
            $(node2).val("")
        }
    }
    //料号视窗-查询
    this.DialogPartSearch = function () {
        PartTable.loadData(null, null, 1);
    }



    //主表
    var Table = new mf.Table("#Sfc22ReasonTable", {
        uniqueId: "ID",
        height: window.innerHeight - 130,
        eidtable: false,
        operateColumWidth: "100px",
        //IsSetTableWidth: true,
        //LastWidth:"120px",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            searchData.StartItemCode = $("#TheStartingMaterial").val();
            searchData.EndItemCode = $("#TheEndOfTheMaterial").val();
            searchData.StartDate = $("#StartDate").val();
            searchData.EndDate = $("#EndDate").val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentManufacturing/Sfc00022GetReasonList",
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        fn_createBtn:function(rowData){
            var $td = $("<td style='text-align:center;width:100px'>");
            $td.append("<button id='ReasonDetail' class='btn btn-success btn-sm' onclick='model.ReasonClick(this)'>" + fields.ReasonDetail + "</button>")
            return $td;
        },
        columns: [
            {
                field: "Code", title: fields.Part, align: "center", width: "180",
                rander:new mf.TextRander({title:true})
            },
            {
                field: "Name", title: fields.GoodsName, align: "center", width: "180",
                rander:new mf.TextRander({title:true})
            },
            {
                field: "Specification", title: fields.Specification, align: "center", width: "180",
                rander:new mf.TextRander({title:true})
            },
            {
                field: "TypeName", title: fields.SupplyType, align: "center",
                rander:new mf.TextRander({title:true})
            },
        ]

    })

    Table.loadData();


    var tipArr = [];//圆饼图表头提示部分数组[]
    var contentArr = [];//圆饼图分配数组[ {value:335, name:'335'},{}]
    var pieContentObj = {};//contentArr里面的对象
    //原因明细开窗
    this.ReasonClick = function (node) {
        var $row = $(node).parent().parent();
        var rowData = Table.getRowData($row);
        if (rowData) {
            ItemID = rowData.ItemID
            $("#ItemNo").val(rowData.Code);
            $("#ItemDescription").val(rowData.Name);
        }
        
        mf.dialog("#ReasonDetailDialog", {
            viewModel: function () {
                ItemID: ItemID
                ReasonDetaiTable.loadData();
            }
        })
       // $("#ReasonDetailDialog").show();
    }

    //原因明细资料
    var ReasonDetaiTable = new mf.Table("#ReasonDetaiTable", {
        uniqueId: "ID",
        height: 220,
        editable:false,
        //PaginationBar: new mf.PaginationBar("#paginagionReasonDetai"),
        fn_getData: function (pagination, searchData, success) {

            if (ItemID) {
                searchData.ItemID = ItemID;
            } else {
                searchData.ItemID = "";
            }

            console.log(searchData)
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentManufacturing/Sfc00022GetReasonDetailList",
                data: searchData,
                success: function (data) {
                    console.log(data)
                    if (data.rows && data.rows.length > 0) {
                        success(data)
                        $("#ReasonDetaiCommit").prop({"disabled":false})
                    } else {
                        ReasonDetaiTable.clean()
                        $("#ReasonDetaiCommit").prop({"disabled":true})
                    }
                    
                    contentArr = [];
                    tipArr = [];
                    pieContentObj = {};
                    if (data.rows && data.rows.length > 1) {
                        for (var i = 0; i < data.rows.length; i++) {
                            pieContentObj = {};
                            if (data.rows[i].ReasonID && data.rows[i].ReasonID.length > 0) {
                                tipArr.push(data.rows[i].ReasonCode)
                                pieContentObj.value = data.rows[i].Num;
                                pieContentObj.name = data.rows[i].ReasonCode;
                                contentArr.push(pieContentObj)
                            }
                        }
                                      
                    }
                }
            })

        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: "ReasonCode", title: fields.BadReason, align: "center", width: "320",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: "Num", title: fields.Number, align: "center",
                rander: new mf.TextRander({ title: true })
            }
        ]
    })

   

    //圆饼图开窗
    this.openPieClick = function () {
        console.log(tipArr)
        console.log(contentArr)
        self.setPieChart('#images_pie', '', '65%', ['50%', '55%']);
        $("#pieDialog").show();     
    }


    $("#maxPing").click(function () {
        var h = window.innerHeight;
        var w = window.innerWidth;
        $("#content").css({ "width": w });
        $(".mf-dialog").css({ "left": "0", "top": "0", "margin": "0" });
        $("#images").css({ "height": h+"px" });
    })

    //圆饼图关闭
    this.pieClose = function () {
      //  $("#MyDialog").fadeOut("fast");
     //   $("body").removeClass("over");
    }

    //关闭弹窗
    this.closeClick = function (node) {
        $(node).hide();
    }

    /*圆饼图配置 */
   
    this.setPieChart = function (node, title, radiusStr, centerArr) {
        var pieChart = echarts.init(document.querySelector(node));

        option = {
            title: {
                text: title,
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: tipArr
            },
            series: [
                {
                    name: fields.AberrantAmount,
                    type: 'pie',
                    radius: radiusStr,
                    center: centerArr,
                    data: contentArr,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        pieChart.setOption(option);
    }

    //设置全屏的宽高
    var h = window.innerHeight * 0.98;
    var w = window.innerWidth * 0.98;
    $("#fullGreen_content").css({ "width": w + "px", "height": h + "px" })

    //$(window).resize(function () {
    //     h = window.innerHeight * 0.98;
    //     w = window.innerWidth * 0.98;
    //    $("#fullGreen_content").css({ "width": w + "px", "height": h + "px" })
    //})

    //全屏
    $("#maxPing").click(function () {
        $("#fullGreen_box").css("display", "block");
        self.setPieChart("#img_Trend", fields.PieChart, "70%", ['50%', '55%'])
    })

    //全屏后取消
    this.hideClick = function () {
        $("#fullGreen_box").css("display", "none")
    }


}

var arrayWord = ["Refresh", "Search", "ReasonStatistics", "ItemStatistics", "TheEndOfTheMaterial", "StartDate", "TheStartingMaterial", "EndDate",
"Part", "GoodsName", "Specification", "SupplyType", "ItemNo", "SupplyForm", "Comfirm", "Cancel", "ItemMasterFile", "ReasonDetail",
"BadReason", "Number", "Total", "ItemDescription", "PieChart", "PieChart", "FullScreen", "AberrantAmount", 
]

words = arrayWord.join();

var model = null;

initPage = function () {
    model = new viewModel()
}
