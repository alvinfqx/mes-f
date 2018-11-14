
var URL = "/MES/IntelligentManufacturing/SFC00020";
var MID = window.top.page_parameters.GetParameters(URL);
var parameters = null;
var model = null;

mf.toolBar("#container");

var data = {
    total: 1,
    rows: [
        { TaskNo :"123"}
    ]
}

var viewModel = function () {
    var self = this;
    var userName = "";
    //var searchData = {};//制令单查询对象
    //查询-状态栏
    var temp = '';   
    for (var i = 0; i < parameters.PT0191213000004.length; i++) {
        if ((parameters.PT0191213000004[i] && parameters.PT0191213000004[i].value.substring(5, parameters.PT0191213000004[i].length) == "0201213000028") ||//op
            (parameters.PT0191213000004[i] && parameters.PT0191213000004[i].value.substring(5, parameters.PT0191213000004[i].length) == "020121300002A")) {//cl
            temp += '&nbsp;<input type="checkbox" class="i-checks" value = "' + parameters.PT0191213000004[i].value + '" /><span>' + parameters.PT0191213000004[i].text + '</span>';
        }

    };

    $("#Status").html(temp);
    $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
    $(".i-checks").eq(0).iCheck('check');
    

    //获取登录人员
    mf.ajax({
        type: 'Get',
        url: '/MES/api/Util/GetUser',
        data: {},
        success: function (data) {
            if (data) {
                userName = data.Account
            }
            
        }
    })

    //起始制程预计开工日期
    $("#SStartDate").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#SStartDate").datepicker("setEndDate", $("#EStartDate").val())
    });

    //结束制程预计开工日期
    $("#EStartDate").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#EStartDate").datepicker("setStartDate", $("#SStartDate").val())
    });


    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    }

    //获取查询条件状态值
    this.getStatus = function () {
        var SStatus = $("#Status").find(".i-checks");
        var StatusStr = ""
        for (var i = 0; i < 2; i++) {
            if (SStatus.eq(i).is(":checked")) {
                StatusStr += SStatus.eq(i).val() + ",";
            }
        }
        if (StatusStr.length > 0) {
            $("#SStatus").val(StatusStr.substring(0, StatusStr.length - 1));
        }
        else {
            $("#SStatus").val("");
        }
    };

    this.getStatus();

    //查询
    this.searchClick = function () {
        self.getStatus()
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
        
        var pageNum = $("#paginagionBar #in_pageNum").val();
        $("#tb_list .J-toolbar").hide();
        $("#tb_list .J-search").hide();
        $(".J-content .mf-table-wrapper").css({ "border": "1px solid #fff" });

        //给打印加上标题
        var node = $('<div id="printHeader" styl="width:100%;text-align:center"></div>');
        var html = "";
            html += '<h3 id="printTitle" style="text-align:center;">' + fields.OrderProductionPchedule + '</h3>'
            html += '<div id="printMes" style="text-align:center;width:100%;margin-top:10px;"><span id="printDate" style="display:inline-block;width:35%;s">' + fields.DateLable + ":" + mf.format.Date(new Date()) + '</span>';
            html += '<span id="printer" style="display:inline-block;width:30%;">' + fields.UserLable + ':' + userName + '</span>';
            html += '<span id="printPage" style="display:inline-block;width:35%;">' + fields.PageLable + ':' + pageNum + '/' + pages + '</span>';
            html += '</div>';
            node.html(html);
            $("#tb_list .J-content").prepend(node)


        $("#paginagionBar").hide();
        window.print();
        $(".J-content .mf-table-wrapper").css({ "border": "1px solid  #EBEBEB" });
        $("#tb_list #printHeader").remove();
        $("#tb_list .J-search").show();
        $("#tb_list .J-toolbar").show();
        $("#paginagionBar").show();


    };

    //制令单开窗
    this.StartOrderNumber = function (node) {
        var domstr = node;
        MoNoTable.loadData();
        var iptValue = $(node).val()
        $("#CodeDialog").modal("show");
        $("#MoNoCommit").unbind();


        $("#TxtMoNoSearch").val(iptValue)

        if (iptValue && iptValue.length > 0) {
            MoNoTable.loadData();
        }
        //if (node == "#StartOrderNumber") {
        //    searchData.StartMoNo = $(node).val()
        //} else {
        //    searchData.EndMoNo = $(node).val()
        //}

        $("#MoNoCommit").click(function () {
            var rowData = MoNoTable.getSelectedData();
            if (!rowData) {
                msg.info(fields.Prompt, fields.PleaseSelectRecord);
                return
            };

            if (node == "#StartOrderNumber") {          
                $("#StartOrderNumber").val(rowData.MoNo)
            } else if (node == "#EndOrderNumber") {
                console.log(2)
                $("#EndOrderNumber").val(rowData.MoNo)
            };

            $("#TxtMoNoSearch").val("");
            $("#ItemDescription").val("");
            $("#CodeDialog").modal("hide")
        })

    }

    //制令单表格
    var MoNoTable = new mf.Table("#MoNoTable", {
        uniqueId: "FabricatedMotherID",
        height: 260,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionMoNoBar"),
        fn_getData: function (pagination,searchData,success) {
            searchData = {};
            searchData.MoNo = $("#TxtMoNoSearch").val();
            searchData.ItemName = $("#ItemDescription").val();
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            mf.ajax({
                type: "get",
                url: "/MES/api/PopUp/Sfc00020GetFabricatedMother",
                data: searchData,
                success: function (data) {
                    
                    success(data)

                }
            })
        },
        fn_saveData: function () { },
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "160",
                rander: new mf.TextRander({ size: 20,title: "title" }),
            },
            {
                field: 'SplitSequence', title: fields.SequenceNo, align: "center", width: "80",
                rander: new mf.TextRander({ size: 20,title: "title" }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "120",
                rander: new mf.TextRander({ size: 20,title: "title" }),
            },
            {
                field: 'ItemName', title: fields.GoodsName, align: "center", width: "120",
                rander: new mf.TextRander({ size: 20, title: "title" }),
            },
            {
                field: 'ItemSpecification', title: fields.Specification, align: "center", width: "160",
                rander: new mf.TextRander({ size: 20, title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004, {title:true}),
            }

        ]

    })

    //制令单开窗-查询
    this.DialogMoNoSearch = function () {
        MoNoTable.loadData(null, null, 1);
    };

    //制令关闭清除搜索框数据
    this.CleanClick = function () {
        console.log(1)
        $("#TxtMoNoSearch").val("");
        $("#ItemDescription").val("");
        //searchData = {};
       
        $("#CodeDialog").modal("hide");
    }
    

    //主表
    var Table = new mf.Table("#SFC00020Table", {
        uniqueId: "FabMoProcessID",
        height:window.innerHeight - 182,
        IsSetTableWidth: true,
        LastWidth: 140,
        editable:false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            searchData.MoNoStar = $("#StartOrderNumber").val();
            searchData.MoNoEnd = $("#EndOrderNumber").val();
            searchData.StartDate = $("#SStartDate").val();
            searchData.FinishDate = $("#EStartDate").val();
            searchData.Status = $("#SStatus").val();
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            console.log(searchData)
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentManufacturing/sfc00020GetList",
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                    if (data.rows.length <= 0) {
                        Table.clean()
                    }
                }
            })
            
        },
        fn_saveData: function (saveData, success) {
        },
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemCode', title: fields.ProductCode, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessSequence', title: fields.ProcessSequence, align: "center", require: false, width: "80",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", require: false, width: "140",
                rander: new mf.HourRander({ title: true }),
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", require: false, width: "140",
                rander: new mf.HourRander({ title: true }),
            },
            {
                field: 'Quantity', title: fields.ProductionNum, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'FinProQuantity', title: fields.FinishQtys, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Rate', title: fields.ComplianceRate, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "120",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004, { title: true }),
            },
            {
                field: 'ItemName', title: fields.GoodsName, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemSpecification', title: fields.Specification, align: "center", require: false,
                rander: new mf.StaticValueRander({ title: true }),
            },
            //{
            //    field: 'TaskNo', title: fields.TaskCardNo, align: "center", require: false, width: "120",
            //    rander: new mf.StaticValueRander({ title: true }),
            //},
            //{
            //    field: 'TaskNo', title: fields.TaskCardNo, align: "center", require: false,
            //    rander: new mf.StaticValueRander({ title: true }),
            //}
        ]
    });

    Table.loadData();
}

var arrayWord = ["StartOrderNumber", "EndOrderNumber", "ProcessStartDate", "ProcessEndDate", "Status", "Search", "Print", "Refresh", "TaskNo",
    //制令单弹窗
    "MoNo", "MoSeq", "Part", "ItemDescription", "ItemSpecification", "Status", "", "Cancel", "Comfirm", "PleaseSelectRecord", "Prompt",
    "ProcessOrderNo","GoodsName","Specification","SequenceNo",

    //主表
    "Specification", "GoodsName", "Status", "ComplianceRate", "ComplianceRate", "FinishQtys", "ProductionNum", "EstimatedFinishDate", "EstimatedStartDate", "ProcessDescription",
    "ProcessNo", "ProcessSequence", "ProductCode", "OrderProductionPchedule",
    //打印
    "DateLable", "UserLable", "PageLable"

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