Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

var viewModel = function () {
    var self = this;
    var $tr = null;
    //料品代号资料
    var PartTable = new mf.Table("#PartTable", {
        uniqueId: "ItemID",
        editable: false,
        LastWidth: "160",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionPartBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#TxtPartSearch").val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00003GetItemProcessList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });
    //料品代号开窗查询
    this.DialogPartSearch = function () {
        PartTable.goForwordSafely(function () {
            PartTable.loadData(null, null, 1);
        }, null);
    };
    //料品代号开窗
    this.SearchItemCode = function (id) {
        $("#TxtPartSearch").val("");
        $("#PartCommit").unbind();
        $("#PartCommit").click(function () {
            var row = PartTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#PartDialog").modal("hide");
            }
        });
        PartTable.loadData();
        $("#PartDialog").modal({ backdrop: 'static', keyboard: false });
        $("#PartDialog").modal("show");
    }

    //制令单资料
    var MoNoTable = new mf.Table("#MoNoTable", {
        uniqueId: "DetailId",
        editable: false,
        LastWidth: "160",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionMoNoBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.MoNo = $("#TxtMoNoSearch").val();
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00003GetFabricatedMother',
                data: searchData,
                success: function (data) {
                    for (var i = 0, len = data.rows.length; i < len; i++) {
                        if (data.rows[i].Date)
                            data.rows[i].Date = data.rows[i].Date.replace("T", " ");
                    }

                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Date', title: fields.Modate, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'OrderNo', title: fields.OrderNo, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            }
        ]
    });
    //制令单开窗查询
    this.DialogMoNoSearch = function () {
        MoNoTable.goForwordSafely(function () {
            MoNoTable.loadData(null, null, 1);
        }, null);
    };
    // 制令单开窗
    this.SearchMoNo = function (id) {
        $("#TxtMoNoSearch").val("");
        $("#MoNoCommit").unbind();
        $("#MoNoCommit").click(function () {
            var row = MoNoTable.getSelectedData();
            if (row) {
                $(id).val(row.MoNo);
                $("#MoNoDialog").modal("hide");
            }
        });
        MoNoTable.loadData();
        $("#MoNoDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MoNoDialog").modal("show");
    }

    //制令单拆单作业
    var table = new mf.Table("#SFC00003Table", {
        uniqueId: "FabricatedMotherID",
        editable: false,
        isFrozenColumn: true,
        height: window.innerHeight - 130,
        LastWidth: "80",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.StartItemCode = $("#StartItemCode").val();
            searchData.EndItemCode = $("#EndItemCode").val();
            searchData.StartMoNo = $("#StartMoNo").val();
            searchData.EndMoNo = $("#EndMoNo").val();
            searchData.MoNo = "";

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00003GetList',
                data: searchData,
                success: function (data) {
                   // console.log(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        operateColumWidth: "70px",
        fn_createBtn: function (data) {
            var $td = $('<td style="width:70px;text-align:center;">');
            if (data.SplitSequence == "0") {
                $td.append('<button id="reviewClick" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.reviewClick(this)" title="拆單處理" >' + fields.Dismantling + '</button>');
            }
            return $td;
        },
        LastWidth: "69",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: '95',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: '60',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Version', title: fields.Version, align: "center", width: '55',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: '120',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: '90',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: '90',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: '90',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: '90',
                rander: new mf.DateRander({ title: true })
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: '90',
                rander: new mf.DateRander({ title: true })
            },
            {
                field: 'Quantity', title: fields.Qty, align: "center", width: '80',
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: '90', visible: false,
                rander: new mf.SelectRander(parameters.PT0191213000004),
            },
            {
                field: 'UnitID', title: fields.ManufacturingUnit, align: "center",
                rander: new mf.SelectRander(parameters.PT019121300000C),
            }
        ]
    });
    table.loadData();

    //拆單處理列表-数据
    var itemTable_data = [];

    //拆單處理列表  
    var ItemTable = new mf.Table("#ItemTable", {
        uniqueId: "ID",
        enter_addble: false,
        dblclick_editable: false,
        LastWidth: "160",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            success(itemTable_data);
        },
        fn_saveData: function (saveData, success) {},
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            //拆單批量: 系統自動計算，計算後可改，數值欄位，整數十四位小數四位，最後一筆需考慮製造數量
            var array = $.map(ItemTable.getAllRowData(),
                function (value, index) {
                    if (value.ID == rowdata.ID) return 0; // 找到自已
                    if (value.Quantity == undefined) return 0;
                    return parseFloat(value.Quantity);
                });
            array.push(parseFloat(ItemTable.getEditingColumnValue($row, "Quantity")));
            // 加總
            var sum = array.reduce(function (a, b) { return a + b; });
            var row = table.getRowData($tr);
            if (row.Quantity < sum) {
                return fields.DetailQtyBiggerThenQty // 明細拆單量大於製造數量
            }
            return null;
        },
        height: 320,
        columns: [
            {
                field: 'Quantity', title: fields.SeparateQuantity, align: "center", width: "145", require: true,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.SeparateQuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.SeparateQuantityIsMaxInteger, fields.SeparateQuantityIsMaxDecimal,
                        fields.SeparateQuantityIsNonNegativeNumber, 14, 4),
                    new mf.TextNotEmptyChecker(fields.SeparateQuantityIsNull)

                ],
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "160", require: true,
                rander: new mf.DateRander({ title: "title", size: 7 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EstimatedStartDateIsNull)
                ],
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", require: true,width:"160",
                rander: new mf.DateRander({ title: "title", size: 7 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EstimatedFinishDateIsNull)
                ]
            }
        ]
    });
    ItemTable.loadData();

    //初始化时间
    $("#StartWorkDate").datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    });
    mf.deal.InitDateGroup("StartDate", "FinishDate");

    //设置拆單方式、开工日期规划模式
    $("#DemolitionMethod").append("<option value='0'>" + fields.AutoSeparate+"</option>");
    $("#DemolitionMethod").append("<option value='1'>" + fields.HandSeparate +"</option>");
    $("#StartDatePlanningMode").append("<option value=''></option>");
    $("#StartDatePlanningMode").append("<option value='0'>" + fields.AfterWOStartDate +"</option>");
    $("#StartDatePlanningMode").append("<option value='1'>" + fields.AfterWOFinishDate +"</option>");
    $("#StartDatePlanningMode").append("<option value='2'>" + fields.NoneAutoPlan +"</option>");

    //改變拆單方式
    this.ChangeDemolitionMethod = function (obj) {
        var row = table.getRowData($tr);
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        if ($(obj).val() == "0") {
            $("#ItemAdd").hide();
            $("#DoItNow").show();
            $("#row1").show();
            $("#row2").show();
            $("#ItemChange").attr("disabled", true);
        }
        else if ($(obj).val() == "1") {
            $("#ItemAdd").show();
            $("#DoItNow").hide();
            $("#row1").hide();
            $("#row2").hide();
            $("#ItemChange").attr("disabled", false);
        }
        $("#StartDatePlanningMode").val("");
        $("#SeparateQuantity").val("");
        $("#SeparateDays").val("");
        $("#SeparateDays").attr("disabled", false);
        $("#StartWorkDate").datepicker("setDate", mf.format.Date(row.StartDate));

        itemTable_data = [];
        ItemTable.loadData();
    }

    //拆單處理开窗
    this.reviewClick = function (obj) {
        $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        FabricatedMotherID = row.FabricatedMotherID;
        if (!FabricatedMotherID && FabricatedMotherID.length <= 0) {
            //console.error("can't get ParameterID from table");
            return;
        }

        $("#DemolitionMethod").val(0);
        $("#StartDatePlanningMode").val("");
        $("#SeparateQuantity").val("");
        $("#SeparateDays").val("");
        $("#StartWorkDate").datepicker("setDate", mf.format.Date(row.StartDate));
        $("#DoItNow").show();
        $("#row1").show();
        $("#row2").show();
        $("#ItemAdd").hide();
        $("#ItemChange").attr("disabled", true);
        $("#SeparateDays").attr("disabled", false);

        itemTable_data = [];
        ItemTable.loadData();

        $("#ItemPropertiesDialog").modal({ backdrop: 'static', keyboard: false });
        $('#ItemPropertiesDialog').modal("show");
    };

    //手动拆单-新增-开窗
    this.AddItemClick = function () {
        $("#SeparateQuantity2").val("");
        $("#StartDate").val("");
        $("#FinishDate").val("");
        $("#Seq").val("");
        $("#AddItemDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddItemDialog").modal("show");
    };

    //判断拆单数量是否正数
    this.CheckNumber = function (value, Lenint, Lendec, message, messagedec, messageint) {
        if (!(value && value.length > 0)) {
            return message;
        }

        var num = parseFloat(value);
        if (isNaN(num)) {
            return message;
        }
        if (num <= 0) {
            return message;
        }

        value = "" + value;
        var rate = value.split(".");
        if (rate[0].length > Lenint) {
            return messageint;
        }
        if (rate.length > 1) {
            if (rate[1].length > Lendec) {
                return messagedec;
            }
        }
        
        return null;
    }

    //手动拆单-新增-确认
    this.SaveDetailClick = function () {
        // 拆單數量: 輸入拆單數，整數十四位小數四位，不能小於0。
        var flag = self.CheckNumber(
            $("#SeparateQuantity2").val(), 14, 4,
            fields.SeparateQuantityIsNonNegativeNumber,
            fields.SeparateQuantityIsMaxDecimal,
            fields.SeparateQuantityIsMaxInteger
        );
        if (flag) {
            msg.info(fields.Prompt, flag);
            return;
        }
        if ($("#SeparateQuantity2").val() == "") {
            msg.info(fields.Prompt, fields.SeparateQuantityIsNull);
            return;
        }
        if ($("#StartDate").val() == "") {
            msg.info(fields.Prompt, fields.EstimatedStartDateIsNull);
            return;
        }
        if ($("#FinishDate").val() == "") {
            msg.info(fields.Prompt, fields.EstimatedFinishDateIsNull);
            return;
        }
        // 兩日期比較，後者不能大於前者，等於可以
        var StartDateVal = new Date($("#StartDate").val());
        var FinishDateVal = new Date($("#FinishDate").val());

        if (StartDateVal != "" && FinishDateVal != "" && StartDateVal > FinishDateVal) {
            msg.info(fields.Prompt, fields.StartDateCanNotBeGreaterThanTheExpectedCompletionDate);
            return;
        }
        var row = table.getRowData($tr);
        var seq = $("#Seq").val();
        if (seq != "") {
            // 目前數量
            var item_rows = ItemTable.getAllRowData();
            var sum = 0;
            for (var i = 0; i < item_rows.length; i++) {
                if (i != seq) {
                    sum = sum + parseFloat(item_rows[i].Quantity);
                }
                else {
                    sum = sum + parseFloat($("#SeparateQuantity2").val());
                }
            }
            if (sum > row.Quantity) {
                msg.info(fields.Prompt, fields.DetailQtyBiggerThenQty); // 明細拆單量大於製造數量
                return;
            }
            // 修改
            for (var i = 0; i < itemTable_data.length; i++) {
                if (itemTable_data[i].Seq == seq) {
                    itemTable_data[i].StartDate = new Date($("#StartDate").val());
                    itemTable_data[i].FinishDate = new Date($("#FinishDate").val());
                    itemTable_data[i].Quantity = parseFloat($("#SeparateQuantity2").val());
                    break;
                }
            }
        }
        else {
            // 目前數量
            var item_rows = ItemTable.getAllRowData();
            var sum = 0;
            for (var i = 0; i < item_rows.length; i++) {
                sum = sum + parseFloat(item_rows[i].Quantity);
            }
            sum = sum + parseFloat($("#SeparateQuantity2").val());
            if (sum > row.Quantity) {
                msg.info(fields.Prompt, fields.DetailQtyBiggerThenQty); // 明細拆單量大於製造數量
                return;
            }
            // 自動加1號
            var sequence = item_rows.length;
            // 新增
            var newData = {
                FabricatedMotherID: row.FabricatedMotherID,
                Quantity: parseFloat($("#SeparateQuantity2").val()),
                StartDate: new Date($("#StartDate").val()),
                FinishDate: new Date($("#FinishDate").val()),
                Seq: sequence
            }
            itemTable_data.push(newData);
        }
        ItemTable.loadData();
        $("#AddItemDialog").modal("hide");
    };

    // 倍数自動拆單-改變開工日期規劃模式
    this.ChangeStartDatePlanningMode = function (obj) {
        // 不自動規劃，下欄位，拆單倍數工期與行事曆欄位反灰不需輸入。
        if ($("#StartDatePlanningMode").val() == "2") {
            $("#SeparateDays").attr("disabled", true);
            $("#ItemChange").attr("disabled", false);
            $("#SeparateDays").val("");
        }
        else {
            $("#SeparateDays").attr("disabled", false);
            $("#ItemChange").attr("disabled", true);
        }
        ItemTable.clean();
    }

    // 倍数自動拆單-判断是否为整數、空值
    this.CheckIsOnlyNumber = function (value, message) {
        if (value == null || value=="") return message;// 空的
        if (!/^\d*$/.test(value)) {
            return message;
        }
        return null;
    }

    // 倍数自動拆單-立即處理
    this.SaveAutoMode = function (IsDoItNow) {
        itemTable_data = [];
        ItemTable.loadData();
        var row = table.getRowData($tr);
        if (!row) {
            return;
        }

        if ($("#DemolitionMethod").val() != "0") {// 需為自動拆單
            msg.info(fields.Prompt, fields.PleaseSelectDemolitionMethod);
            return;
        }

        var mode = $("#StartDatePlanningMode").val();
        if ($("#StartDatePlanningMode").val() == "") {// 未選模式
            msg.info(fields.Prompt, fields.PleaseSelectStartDatePlanningMode);
            return;
        }

        var flag = "";

        // 拆單數量: 輸入拆單數，整數十四位小數四位，不能小於0。
        flag = self.CheckNumber(
            $("#SeparateQuantity").val(), 14, 4,
            fields.SeparateQuantityIsNonNegativeNumber,
            fields.SeparateQuantityIsMaxDecimal,
            fields.SeparateQuantityIsMaxInteger
        );
        if (flag) {
            msg.info(fields.Prompt, flag);
            return;
        }

        var qty = parseFloat($("#SeparateQuantity").val());
        if (qty > row.Quantity) {// 明細拆單量大於製造數量
            msg.info(fields.Prompt, fields.DetailQtyBiggerThenQty); 
            return;
        }

        // 拆單數量工期：整數
        if (mode != "2") {
            flag = self.CheckIsOnlyNumber($("#SeparateDays").val(), fields.SeparateDaysIsNonNegativeNumber);
            if (flag) {
                msg.info(fields.Prompt, flag);
                return;
            }
        }
        
        var date = new Date($("#StartWorkDate").val());
        var days = parseFloat($("#SeparateDays").val());
        var sum = row.Quantity;
        var seq = 0;
        var startDate = null;
        var endDate = null;
        if (mode == "2") {
            startDate = new Date(row.StartDate);
            endDate = new Date(row.FinishDate);
            while (sum > 0) {
                if (sum - qty < 0) {
                    qty = sum;
                }
                var newData = {
                    FabricatedMotherID: row.FabricatedMotherID,
                    Quantity: qty,
                    StartDate: startDate,
                    FinishDate: endDate,
                    Seq: seq
                }
                itemTable_data.push(newData);
                sum = sum - qty;
                seq++;
            }
        }
        else {
            startDate = date;
            endDate = startDate.addDays(days - 1);
            while (sum > 0) {
                if (sum - qty < 0) {
                    qty = sum;
                }
                var newData = {
                    FabricatedMotherID: row.FabricatedMotherID,
                    Quantity: qty,
                    StartDate: startDate,
                    FinishDate: endDate,
                    Seq: seq
                }
                itemTable_data.push(newData);
                
                if (mode == "0") {// 開始日後一天
                    startDate = startDate.addDays(1);
                    endDate = startDate.addDays(days - 1);
                }
                else if (mode == "1") {// 完工日後一天
                    startDate = endDate.addDays(1);
                    endDate = startDate.addDays(days - 1);
                }
                sum = sum - qty;
                seq++;
            }
        }
        ItemTable.loadData();
    }

    //拆單處理-修改
    this.ChangeItemClick = function () {
        var row = ItemTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#SeparateQuantity2").val(row.Quantity);
        $("#StartDate").val(mf.format.Date(row.StartDate));
        $("#FinishDate").val(mf.format.Date(row.FinishDate));
        $("#Seq").val(row.Seq);
        $("#AddItemDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddItemDialog").modal("show");
    };

    //拆單處理-删除
    this.DeleteItemClick = function () {
        ItemTable.deleteRow();
    };

    //拆單處理-确认
    this.SaveItemClick = function () {
        $("#DemolitionMethod").attr('disabled', true);
        $("#StartWorkDate").attr('disabled', true);
        $("#StartDatePlanningMode").attr('disabled', true);
        $("#SeparateQuantity").attr('disabled', true);
        $("#ItemDelete").attr('disabled', true);
        $("#itemClose").attr('disabled', true);
        $("#ItemCancel").attr('disabled', true);
        $("#SeparateDays").attr('disabled', true);

        var item_rows = ItemTable.getAllRowData();


        var row = table.getSelectedData();
        var data = { FabricatedMotherID: row.FabricatedMotherID, inserted: item_rows };
       
        for (let i = 0, len = data.inserted.length; i < len; i++) {
            data.inserted[i].StartDate = mf.format.Date(data.inserted[i].StartDate);
            data.inserted[i].FinishDate = mf.format.Date(data.inserted[i].FinishDate);
        }
       

        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00003DetailSave',
            data: JSON.stringify(data),
            success: function (data) {
                
                if (Number(data.inserted.fail) <= 0) {
                    msg.success(fields.Prompt, fields.DemolitionOrderSuccess,
                        function () {
                            itemTable_data = [];
                            table.loadData();
                            $('#ItemPropertiesDialog').modal("hide");
                        });
                }
                else {
                    msg.error(fields.Prompt, fields.DemolitionOrderFail);
                }
            }
        });
        $("#DemolitionMethod").attr('disabled', false);
        $("#StartWorkDate").attr('disabled', false);
        $("#StartDatePlanningMode").attr('disabled', false);
        $("#AddItemForm input").attr('disabled', false);
        $("#ItemDelete").attr('disabled', false);
        $("#ItemCancel").attr('disabled', false);
        $("#SeparateDays").attr('disabled', false);
        $("#itemClose").attr('disabled', false);
    };

    //查询
    this.searchClick = function () {
        if (table)
            table.loadData(null, null, 1);
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };
};

var arrayWord = [
    "Import", "Browse","Save", "Details", "Remark", "CreatedBy", "CreatedDate", "Process",
     "no", "yes", "Cancel", "Comfirm", "Search", "Add", "Delete", "Normal", "info", "Status",
     "Operation", "InitialOrderNumber", "EndTheOrderNumber", "TheStartingOrderNumber", "FinishTheOrderNo",
     "TheStartingMaterial", "TheEndOfTheMaterial", "MoNo", "MoSeq", "ItemNo", "ItemDescription", "ItemSpecification",
     "Qty", "ManufacturingUnit","HasBeenSismantled", "EstimatedStartDate", "OrderNo", "Customer", "CustomerDesc",
     "SalesmanCode","ClerkName","EstimatedShippingDate", "PreWarehouse", "OrderSingleState", "CreatedBy", "DocumentSource",
     "CreatedDate", "LastChangedBy", "LastChangedDate", "EstimatedFinishDate", "Dismantling", "MoNoMasterFile", "ItemMasterFile",
    "Change", "DoItNow", "Modate", "Version", "LotNo", "SeparateQuantity", "StartWorkDate2", "WorkDateMode", "SeparateDays",
    "EstimatedFinishDate", "EstimatedStartDate", "PleaseSelectDemolitionMethod", "DetailQtyBiggerThenQty",
    "SeparateQuantityIsNonNegativeNumber", "SeparateQuantityIsMaxInteger", "SeparateQuantityIsMaxDecimal",
    "PleaseSelectStartDatePlanningMode", "WhetherToDelete", "PromptDescription", "SeparateQuantityIsNull",
    "EstimatedStartDateIsNull", "EstimatedFinishDateIsNull", "StartDateCanNotBeGreaterThanTheExpectedCompletionDate",
    "AfterWOStartDate", "AfterWOFinishDate", "NoneAutoPlan", "AutoSeparate", "HandSeparate", "SeparateDaysIsNonNegativeNumber",
    "Prompt", "PleaseSelectRecord", "SaveSuccess", "DemolitionOrderSuccess", "DemolitionOrderFail", "DemolitionOrderIsNull"
]
words = arrayWord.join();
var URL = "/MES/IntelligentManufacturing/SFC00003";
var MID = window.top.page_parameters.GetParameters(URL);
var model = null;
var parameters = null;
mf.toolBar("#container");
initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,019121300001F,019121300000C" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};