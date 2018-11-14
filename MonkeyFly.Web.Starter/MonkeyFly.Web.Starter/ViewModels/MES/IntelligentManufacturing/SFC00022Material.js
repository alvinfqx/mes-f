var URL = "/MES/IntelligentManufacturing/SFC00022Material";
//var MID = window.top.pages_parameters_GetParameters(URL);


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

    var temp = '';
    temp = '&nbsp;<input name="Time" type="radio" value = "4" class="checks" id="check_one" style="vertical-align: bottom;width:15px;height:15px;"/><span>' + fields.Year + '</span>';
    temp += '&nbsp;<input name="Time" type="radio" value = "7" class="checks" id="check_two" style="vertical-align: bottom;width:15px;height:15px;margin:0 5px;"/><span>' + fields.Month + '</span>';
    temp += '&nbsp;<input name="Time" type="radio" value = "10" class="checks" id="check_three" style="vertical-align: bottom;width:15px;height:15px;"/><span>' + fields.day + '</span>';

    

    $("#AnalysisInterval").html(temp);
  
    var checkValue_one = "";
    var checkValue_two = "";


   // $(".checks").eq(0).iCheck('check');
  //  console.log($("input:radio[name='Time']:checked").val())

    //刷新
    this.refreshClick = function () {

        //  window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        $("#TheStartingMaterial").val("");
        $("#TheEndOfTheMaterial").val("");
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("input:radio[name='Time']:checked").val("");
        window.location.reload();
    };

    //火狐浏览器确保刷新后查询条件清空
    $("#TheStartingMaterial").val("");
    $("#TheEndOfTheMaterial").val("");
    $("#StartDate").val("");
    $("#EndDate").val("");
    $("input:radio[name='Time']:checked").val("");

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

        if (searchValue && searchValue.length > 0) {
            $("#TxtPartSearch").val(searchValue);          
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
    var Table = new mf.Table("#MaterialTable", {
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
            console.log(searchData)
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentManufacturing/Sfc00022GetItemList",
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        fn_createBtn: function (rowData) {
            var $td = $("<td style='text-align:center;width:100px'>");
            $td.append("<button id='ReasonDetail' class='btn btn-success btn-sm' onclick='model.IntervalClick(this)'>" + fields.IntervalDetail + "</button>")
            return $td;
        },
        columns: [
            {
                field: "Code", title: fields.Part, align: "center", width: "180",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: "Name", title: fields.GoodsName, align: "center", width: "180",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: "Specification", title: fields.Specification, align: "center", width: "180",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: "TypeName", title: fields.SupplyType, align: "center",
                rander: new mf.TextRander({ title: true })
            },
        ]

    })

    Table.loadData();

    //区间明细开窗
    this.IntervalClick = function (node) {
        var $row = $(node).parent().parent();
        var rowData = Table.getRowData($row);
        if (rowData) {
            ItemID = rowData.ItemID
            $("#ItemNo").val(rowData.Code);
            $("#ItemDescription").val(rowData.Name);
        }

        mf.dialog("#IntervalDialog", {
            viewModel: function () {
                ItemID: ItemID
                IntervalDetaiTable.loadData();
            }
        })
        // $("#ReasonDetailDialog").show();
    }

    var XArr = [];
    var YArr = [];

    //区间明细资料
    var IntervalDetaiTable = new mf.Table("#IntervalDetaiTable", {
        uniqueId: "ID",
        height: 220,
        editable: false,
        //PaginationBar: new mf.PaginationBar("#paginagionReasonDetai"),
        fn_getData: function (pagination, searchData, success) {

            if (ItemID) {
                searchData.ItemID = ItemID;
            } else {
                searchData.ItemID = "";
            }
            searchData.StartDate = $("#StartDate").val();
            searchData.EndDate = $("#EndDate").val();
            searchData.Interval = $("input:radio[name='Time']:checked").val();

            console.log(searchData)
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentManufacturing/Sfc00022GetItemDetailList",
                data: searchData,
                success: function (data) {
                    console.log(data)
              
                    if (data && data.length > 0) {
                        success(data)
                        $("#IntervalDetailCommit").prop({ "disabled": false })
                    } else {
                        IntervalDetaiTable.clean()
                        $("#IntervalDetailCommit").prop({ "disabled": true })
                    }

                    YArr = [];
                    XArr = [];
                    if (data && data.length > 1) {
                        data.splice(data.length-1,1)
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].Date && data[i].Date.length > 0) {
                                XArr.push(data[i].Date)
                                YArr.push(data[i].Num)
                            }
                        }

                    }
                }
            })

        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: "Date", title: fields.TimeInterval, align: "center", width: "320",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: "Num", title: fields.Number, align: "center",
                rander: new mf.TextRander({ title: true })
            }
        ]
    })

    //设置全屏的宽高
    var h = window.innerHeight*0.98;
    var w = window.innerWidth*0.98;
    $("#fullGreen_content").css({ "width": w + "px", "height": h + "px" })

    //$(window).resize(function () {
    //    console.log(11)
    //    h = window.innerHeight * 0.98;
    //    w = window.innerWidth * 0.98;
    //    $("#fullGreen_content").css({ "width": w + "px", "height": h + "px" })

    //})


    //趋势图开窗
    this.opencolumnClick = function () {
        console.log(XArr)
        console.log(YArr)
        self.setTrendChart('#images_Trend', XArr, YArr,'');
        $("#TrendDialog").modal("show")

    }

    //趋势图配置
    this.setTrendChart = function (node, XArr, YArr,title) {
        var trendChart = echarts.init(document.querySelector(node));
        option = {
            title: {
                text: title,
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: XArr,//x轴
                name:fields.TimeInterval
            },
            yAxis: {
                type: 'value',
                name:fields.Quantity,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: '数量',
                    type: 'line',
                    data:YArr,//y轴
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }

            ]
        };
        trendChart.setOption(option);
    }

    //全屏
    $("#maxPing").click(function () {
        $("#fullGreen_box").css("display", "block");
     //   $("body").css("overflow","auto")
        self.setTrendChart("#img_Trend", XArr, YArr, fields.Trend)
    })
    
    //全屏后取消
    this.hideClick = function () {
        $("#fullGreen_box").css("display", "none")
    }


}

var arrayWord = [
    //查询
    "Refresh", "Search", "TheEndOfTheMaterial", "StartDate", "TheStartingMaterial", "EndDate", "AnalysisInterval", "ItemNo",
"Specification", "GoodsName", "SupplyForm", "ItemMasterFile", "Cancel", "Comfirm", "Part", "SupplyType", "GoodsName", "Part",
"IntervalDetail", "Year", "Month", "day", "TimeInterval", "Number", "ItemDescription", "Trend", "TrendChart", "FullScreen", "Quantity"
]

words = arrayWord.join();

var model = null;

initPage = function () {
    model = new viewModel()
}
