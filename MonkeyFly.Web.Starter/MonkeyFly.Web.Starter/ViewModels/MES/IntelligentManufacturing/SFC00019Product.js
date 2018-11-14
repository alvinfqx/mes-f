var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal = 0, printData = '', rows = null, page = null;

    $("#StartDateOfOrder").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    $("#EndDateOfOrder").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    //打印
    this.printClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.Prompt, fields.NoRecord);
            return;
        }
        var all = ExportTotal / rows;
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: { page: page, rows: rows, total: Math.ceil(all), PrintSearchData: printData, WID: "product", parentUrl: URL, parentMID: MID } });
        window.location.href = '/MES/IntelligentManufacturing/SFC00019Print';
    }

    //主表
    table = new mf.Table("#ProductTable", {
        uniqueId: "FabricatedMotherID",
        editable: false,
        height: window.innerHeight - 185,
        paginationBar: new mf.PaginationBar("#paginagionBarP"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {
                page: pagination.page,
                rows: pagination.rows,
                StartFabMoCode: $("#StartOrderNumber").val(),
                EndFabMoCode: $("#EndOrderNumber").val(),
                StartItemCode: $("#StartItemCode").val(),
                EndItemCode: $("#EndItemCode").val(),
                StartDate: $("#StartDateOfOrder").val(),
                EndDate: $("#EndDateOfOrder").val()
            };
            printData = searchData;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00019ItemGetList",
                data: searchData,
                success: function (data) {
                    ExportTotal = data.total;
                    page = pagination.page;
                    rows = pagination.rows;
                    success(data);
                }
            });
           
        },
        fn_saveData: function (data, success) {

        },
        columns: [
            {
                field: "ItemCode", align: "center", title: fields.ProductCode, width: "130",
                rander: new mf.StaticValueRander({title:"title"})
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
    })
    table.loadData();

    //料品代号
    //料品代号资料
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
            searchData.Type = "";
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetItemList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300, 
        LastWidth: "140",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "180",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: "Type", title: fields.SupplyType, align: "center", width: "180",
                rander: new mf.StaticValueRander({title:"title"})
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "180",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //料品代号开窗查询
    this.DialogPartSearch = function () {
        PartTable.goForwordSafely(function () {
            PartTable.loadData();
        }, null);
    };

    //料品代号开窗
    this.SearchItemCode = function (id) {
        $("#TxtPartSearch").val("");
        $("#PartDialog").modal("show");
        $("#PartDialog").modal({ backdrop: 'static', keyboard: false });
        PartTable.loadData();
        $("#PartCommit").unbind();
        $("#PartCommit").click(function () {
            var row = PartTable.getSelectedData();
            console.log(row)
            if (row) {
                if (id == '#StartItemCode') {
                    $("#StartItemCode").val(row.Code);
                    $("#StartItemCodeID").val(row.ItemID);
                } else if (id == '#EndItemCode') {
                    $("#EndItemCode").val(row.Code);
                    $("#EndItemCodeID").val(row.ItemID)
                }
                //   $(id).val(row.Code);
                $("#PartDialog").modal("hide");
            }
        });
    }

    //制令单资料
    var MoNoTable = new mf.Table("#MoNoTable", {
        uniqueId: "FabricatedMotherID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionMoNoBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var monoSearch = $("#TxtMoNoSearch").val();
            if (monoSearch && monoSearch.length > 0) {
                searchData.MoNo = monoSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00020GetFabricatedMother',
                data: searchData,
                success: function (data) {
                    //console.log(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "MoNo",
        height: 300,
        LastWidth: "110",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "160",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {//序号
                field: 'SplitSequence', title: fields.SequenceNo, align: "center", width: "80",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "120",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: "130",
                rander: new mf.StaticValueRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            }
    
        ]
    });

    //制令单开窗查询
    this.DialogMoNoSearch = function () {
        MoNoTable.goForwordSafely(function () {
            MoNoTable.loadData();
        }, null);
    };

    //制令单开窗
    this.SearchCode = function (id, seq) {
        $("#TxtMoNoSearch").val("");
        $("#CodeDialog").modal("show");
        $("#CodeDialog").modal({ backdrop: 'static', keyboard: false });
        MoNoTable.loadData();
        $("#MoNoCommit").unbind();
        $("#MoNoCommit").click(function () {
            var row = MoNoTable.getSelectedData();
            console.log(row)
            if (row) {
                if (id == '#StartOrderNumber') {
                    $("#StartOrderNumber").val(row.MoNo);
                    $("#StartOrderNumberID").val(row.FabricatedMotherID);
                } else if (id == '#EndOrderNumber') {
                    $("#EndOrderNumber").val(row.MoNo);
                    $("#EndOrderNumberID").val(row.FabricatedMotherID);

                }
                // $(id).val(row.MoNo);
                $(seq).val(row.SplitSequence);
                $("#CodeDialog").modal("hide");
            }
        });
    }


    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData();
        }, null);
    };
    // 刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };
    
    //检查结束日期是否大于起始日期
    this.checkDate = function () {
        var end = $("#EndDateOfOrder").val(),
            start = $("#StartDateOfOrder").val();

        var arr1 = end.split("-"),
            arr2 = start.split("-");

        var err = false;

        if (Number(arr1[0])>= Number(arr2[0])){//年
            if (Number(arr1[1]) >= Number(arr2[1])) {//Month月
                if (Number(arr1[2]) >= Number(arr2[2])) {//日

                } else {
                    err = true;
                }
            } else {
                err = true;
            }
        } else {
            err = true;
        }

        if (err) {
            msg.info(fields.Prompt, fields.DateError);
            $("#EndDateOfOrder").val("");
            return;
        }

    }
}

var URL = "/MES/IntelligentManufacturing/SFC00019Product";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
   "Search", "Confirm", "Cancel", "Refresh", "StartItemCode", "EndItemCode", "StartOrderNumber", "EndOrderNumber", "StartSingleDate", "EndSingleDate",
   "SupplyType", "ItemMasterFile", "ItemNo", "ItemDescription", "ItemSpecification", "Confirm", "MoNoMasterFile", "MoNo", "SequenceNo", "Status",
   "Comfirm", "ProductCode", "ProcessSequence", "ProcessNo", "ProcessDescription", "ActualTime", "StandardTime", "Difference", "ItemsName",
   "Specification", "Prompt", "DateError", "PrintBtn", "NoRecord"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};