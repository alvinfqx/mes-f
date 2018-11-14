var viewModel = function () {
    var self = this, ItemID, ProcessID;

    //開始完工日期
    $('#StartDateOfCompletion').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#StartDateOfCompletion').val(mf.format.Date(new Date()));

    //結束完工日期
    $('#EndDateOfCompletion').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#EndDateOfCompletion').val(mf.format.Date(new Date()));

    // 刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //显示異常明細
    this.AberrantDetail = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }

        $("#AberrantDetailDialog").modal("show");
        $("#AberrantDetailDialog").modal({ backdrop: 'static', keyboard: false });
        $("#DetailItemNo").val(row.ItemCode);
        $("#DetailItemDept").val(row.ItemName);
        $("#DetailItemNo").attr("title", row.ItemCode);
        $("#DetailItemDept").attr("title", row.ItemName);        
        ItemID = row.ItemID;
        ProcessID = row.ProcessID;
        DetailTable.loadData();
    };

    //显示起始製程代號弹窗
    this.showStartProcessNo = function () {
        $("#StartProcessNoDialog").modal("show");
        $("#StartProcessNoDialog").modal({ backdrop: 'static', keyboard: false });
        StartProcessNoTable.loadData();
        $("#StartProcessNoCommit").unbind();
        $("#StartProcessNoCommit").click(function () {
            var row = StartProcessNoTable.getSelectedData();
            if (row) {
                $("#StartProcessNo").val(row.Code);
                $("#StartProcessNoDialog").modal("hide");
            }
        })
    };

    //起始製程代號弹窗查询
    this.StartProcessCodeSearch = function () {
        StartProcessNoTable.goForwordSafely(function () {
            StartProcessNoTable.loadData(null, null, 1);
        }, null);
    };

    //设置起始製程代號表格
    var StartProcessNoTable = new mf.Table("#StartProcessNoTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionStartProcessNoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#StartProcessCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "000017" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //显示结束製程代號弹窗
    this.showEndProcessNo = function () {
        $("#EndProcessNoDialog").modal("show");
        $("#EndProcessNoDialog").modal({ backdrop: 'static', keyboard: false });
        EndProcessNoTable.loadData();
        $("#EndProcessNoCommit").unbind();
        $("#EndProcessNoCommit").click(function () {
            var row = EndProcessNoTable.getSelectedData();
            if (row) {
                $("#EndProcessNo").val(row.Code);
                $("#EndProcessNoDialog").modal("hide");
            }
        })
    };

    //结束製程代號弹窗查询
    this.EndProcessCodeSearch = function () {
        EndProcessNoTable.goForwordSafely(function () {
            EndProcessNoTable.loadData(null, null, 1);
        }, null);
    };

    //设置结束製程代號表格
    var EndProcessNoTable = new mf.Table("#EndProcessNoTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionEndProcessNoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#EndProcessCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "000017" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //显示起始料号代号弹窗
    this.showStartItemCode = function () {
        $("#StartItemDialog").modal("show");
        $("#StartItemDialog").modal({ backdrop: 'static', keyboard: false });
        StartItemTable.loadData();
        $("#StartItemCommit").unbind();
        $("#StartItemCommit").click(function () {
            var row = StartItemTable.getSelectedData();
            if (row) {
                $("#StartItemCode").val(row.Code);
                $("#StartItemDialog").modal("hide");
            }
        })
    };

    //起始料号代号弹窗查询
    this.StartItemNoSearch = function () {
        StartItemTable.goForwordSafely(function () {
            StartItemTable.loadData(null, null, 1);
        }, null);
    };

    //设置起始料品代号表格
    var StartItemTable = new mf.Table("#StartItemTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionStartItemBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#StartItemNo").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/GetItemList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Unit', title: fields.Unit, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.Specification, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //显示结束料号代号弹窗
    this.showEndItemCode = function () {
        $("#EndItemDialog").modal("show");
        $("#EndItemDialog").modal({ backdrop: 'static', keyboard: false });
        EndItemTable.loadData();
        $("#EndItemCommit").unbind();
        $("#EndItemCommit").click(function () {
            var row = EndItemTable.getSelectedData();
            if (row) {
                $("#EndItemCode").val(row.Code);
                $("#EndItemDialog").modal("hide");
            }
        })
    };

    //结束料号代号弹窗查询
    this.EndItemNoSearch = function () {
        EndItemTable.goForwordSafely(function () {
            EndItemTable.loadData(null, null, 1);
        }, null);
    };

    //设置结束料品代号表格
    var EndItemTable = new mf.Table("#EndItemTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionEndItemBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#EndItemNo").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/GetItemList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Unit', title: fields.Unit, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.Specification, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //设置異常明細表格
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "ParameterID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00013GetDetailList',
                data: ({ ItemID: ItemID, ProcessID: ProcessID }),
                success: function (data) {
                    console.log(data);
                    if (data == null) {
                        success([]);
                    }
                    else {
                        success(data);
                    }                    
                    //alert(JSON.stringify(data));
                    
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonCode, align: "center", require: true, width: "170",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DifferenceQuantity', title: fields.DifferenceNumber, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ScrappedQuantity', title: fields.ScrapNumber, align: "center", require: true, width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'RepairQuantity', title: fields.RepairsNumber, require: true, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Total', title: fields.Total, require: true, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //设置表格
    var table = new mf.Table("#SFC00013Table", {
        uniqueId: "ItemID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var StartProcessCode = $("#StartProcessNo").val();
            if (StartProcessCode && StartProcessCode.length > 0)
                searchData.StartProcessCode = StartProcessCode + "";

            var EndProcessCode = $("#EndProcessNo").val();
            if (EndProcessCode && EndProcessCode.length > 0)
                searchData.EndProcessCode = EndProcessCode + "";

            var StartItemCode = $("#StartItemCode").val();
            if (StartItemCode && StartItemCode.length > 0)
                searchData.StartItemCode = StartItemCode + "";

            var EndItemCode = $("#EndItemCode").val();
            if (EndItemCode && EndItemCode.length > 0)
                searchData.EndItemCode = EndItemCode + "";

            var StartDate = $("#StartDateOfCompletion").val();
            var EndDate = $("#EndDateOfCompletion").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00013GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        isFrozenColumn: true,
        operateColumWidth: "110px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:110px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="AberrantDetail" onclick="model.AberrantDetail(this)" title="任務分派" >' + fields.AberrantDetail + '</button>');
            return $td;
        },
        height: window.innerHeight - 165,
        LastWidth: "94",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", require: true, width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, require: true, align: "center", width: "165",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", require: true, width: "200",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, require: true, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, require: true, align: "center", width: "170",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Quantity', title: fields.AberrantAmount, require: true, align: "center", 
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
    this.clearInput = function (ID) {
        $(ID).val("");
    };

}

var URL = "/MES/IntelligentManufacturing/SFC00013";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "StartProcessNo", "EndProcessNo", "StartItemCode", "EndItemCode", "StartDateOfCompletion", "EndDateOfCompletion",
    "AberrantDetail", "ItemNo", "ItemDescription", "ItemSpecification", "ProcessNo", "ProcessDescription", "AberrantAmount",
    "ItemMasterFile", "ItemNo", "SupplyType", "Unit", "GoodsName", "Specification", "Remark", "Status", "Comfirm",
    "Cancel", "Search", "DifferenceNumber", "ScrapNumber", "RepairsNumber", "Total", "ProcessMaster", "Normal", "Invalid",
    "ReasonCode"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};