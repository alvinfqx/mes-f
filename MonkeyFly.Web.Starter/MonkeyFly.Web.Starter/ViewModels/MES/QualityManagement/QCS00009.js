var URL = "/MES/QualityManagement/QCS00009";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var ExportTotal, CodeNumber, CustomYN="1", HeaderStatus, ComplaintId, uploadCheck;

////时间插件翻译
//function lang() {
//    var lang = [];
//    var Lang;
//    if (language.length > 2) {
//        lang = language.split('-');
//        var Lang = lang[0] + '-' + lang[1].toString().toUpperCase();
//    }
//    else {
//        Lang = "en";
//    }
//    return Lang;
//}

var viewModel = function () {
    var self = this;
    var checkTestSettingID = null, statusCheck;
    //var Lang = lang();
    var actions = mf.actionButton();
    var arr = [];
    var DocumentID = "", GetDate = "",flag = false;
    parameters.PT0191213000004[1].text = fields.Issued;
    var MESUserID = "";

    var formData = {
        StartCode: ko.observable(""),
        EndCode: ko.observable(""),
        StartDate: ko.observable(""),
        EndDate: ko.observable(""),
        StartCustomer: ko.observable(""),
        EndCustomer: ko.observable(""),
        StartOrder: ko.observable(""),
        EndOrder: ko.observable(""),
        Status: ko.observable(""),
        StatusList: ko.observableArray(parameters.PT0191213000004),
        DocumentCategoryList: ko.observableArray(),
        CteforyValue: ko.observable(),
        CteforyChange: function () {
            DocumentID = $("#DocumentCategory").val();
            GetDate = $("#AddDate").val();
            flag = true;
            self.getNumber()
        },
        Dates:ko.observable(),
        DateChange: function () {
            if (flag) {
              //  console.log(11)
                DocumentID = $("#DocumentCategory").val();
                GetDate = $("#AddDate").val();
                self.getNumber()
            }

            
        }
    };
    ko.applyBindings(formData);


    this.getNumber = function () {
        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/Util/GetDocumentAutoNumber",
            data: { DocumentID: DocumentID ,Date: GetDate},
            success: function (data) {
                console.log(data)
                $("#AddCode").val(data.AutoNumber);
                $("#AddDocumentAutoNumberID").val(data.DocumentAutoNumberID);
            }
        });
    }

    //时间控件
    $("#startDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $('#endDate').datepicker('setStartDate', startTime);
    });

    $("#endDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $('#startDate').datepicker('setEndDate', startTime);
    });

    $("#AddDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    //料品开窗
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

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetItemList',
                data: searchData,
                success: function (data) {
                    //去掉资料
                    var count = 0;
                    var new_data = data.rows.filter(function (row) {
                        if (row.Status != '正常') {
                            count++;
                            return false;
                        }
                        return true;
                    });
                    data.total = parseInt(data.total) - count;
                    data.rows = new_data;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center",
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

    //明细资料
    var ComplaintDetailTable = new mf.Table("#ComplaintDetailTable", {
        uniqueId: "ComplaintDetailID",
        paginationBar: new mf.PaginationBar("#paginagionComplaintDetailBar"),
        operateColumWidth: "90px",
        isFrozenColumn: true,
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:90px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="FileDialogClick" onclick="model.FileDialogClick(this)" title="' + fields.UploadAttachments + '" >' + fields.UploadAttachments + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            var ComplaintNoId = $("#CustomerComlpaintNoId").val();
            var StartOrderCode = $("#StartOrderNo").val();
            var EndOrderCode = $("#EndOrderNo").val();
            
            searchData = {};
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.ComplaintID = ComplaintNoId;
            searchData.StartOrderCode = StartOrderCode;
            searchData.EndOrderCode = EndOrderCode;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00009GetDetailsList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            //saveData.Code = saveData.ItemCode;
            //saveData.Name = saveData.ItemName;
            //saveData.ShippingNo = saveData.ShipperNo;
            for (var row = 0; row < saveData.deleted.length; row++) {
                saveData.deleted[row].Code = saveData.deleted[row].ItemCode;
                saveData.deleted[row].Name = saveData.deleted[row].ItemName;
                saveData.deleted[row].ShippingNo = saveData.deleted[row].ShipperNo;
            }

            for (var row = 0; row < saveData.inserted.length; row++) {
                saveData.inserted[row].Code = saveData.inserted[row].ItemCode;
                saveData.inserted[row].Name = saveData.inserted[row].ItemName;
                saveData.inserted[row].ShippingNo = saveData.inserted[row].ShipperNo;
            }

            for (var row = 0; row < saveData.updated.length; row++) {
                saveData.updated[row].Code = saveData.updated[row].ItemCode;
                saveData.updated[row].Name = saveData.updated[row].ItemName;
                saveData.updated[row].ShippingNo = saveData.updated[row].ShipperNo;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00009DetailSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var Code = data['Code'];
            var Status = data['Status'];
            var $Status = $row.find("#Status");
            var $Id = $row.find("#ComplaintID");
            var $BtnClick = $row.find("#FileDialogClick");
            var $Qty = $row.find("#Quantity");

            $Status.attr("disabled", true);
            //$Qty.attr("type", "number");
            //$Qty.attr("max", "");
            $Qty.attr("style", "margin-right:2px;ime-mode:disabled");
            $Qty.attr("onkeyup", "this.value=this.value.replace(/[\u4e00-\u9fa5]/g,'')");
            if (isAdding) {
                $Id.val(ComplaintId);
                $BtnClick.hide();
            } else {
                $BtnClick.show();
            }
        },
        fn_checkeditable: function ($selectedRow) {
            if (HeaderStatus.substring(5, 18) == "0201213000029" ||
                HeaderStatus.substring(5, 18) == "020121300002A" ||
                HeaderStatus.substring(5, 18) == "020121300002B") {
                return true;
            }
            else {
                return false;
            }
        },
        focusField: "Part",
        focusEditField: "Part",
        height: 300,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {

            var ID = rowData.ComplaintDetailID;
            var data = {};
            data.ComplaintDetailID = ID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00009DetailDelete",
                data: JSON.stringify(data),
                success: function (data) {
                    success(data);
                }
            });

        },
        columns: [
            {
                field: 'Comments', title: "", require: true, align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ComplaintID', title: "", require: true, align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ComplaintDetailID', title: "", align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Sequence', title: "", require: true, align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ItemID', title: "", require: true, align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ItemCode', title: fields.ItemNo, require: true, align: "center", width: "215",
                rander: new mf.FKRander("#PartDialog",
                                        "#PartCommit",
                                        PartTable,
                                        new mf.TextRander(
                                            {
                                                title: true,
                                                readonly: "readonly"
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                        }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    self.clearInput("#TxtPartSearch", null);
                    table.setEditingColumnValue($row, "ItemID", e.data.ItemID);
                    table.setEditingColumnValue($row, "ItemCode", e.data.Code);
                    table.setEditingColumnValue($row, "ItemName", e.data.Name);
                    table.setEditingColumnValue($row, "Specification", e.data.Specification);
                },
                //rander: new mf.TextRander({ size: 20, title: true }),//要改FKRander
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ItemNoIsNull)
                ]
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: "200",
                rander: new mf.TextRander({ title: true, maxLength: 30 })
            },
            {
                field: 'ShipperNo', title: fields.ShippingNo, align: "center", width: "200",
                rander: new mf.TextRander({ title: true, maxLength: 30 })
            },
            {
                field: 'OrderNo', title: fields.OrderNo, align: "center", width: "200",
                rander: new mf.TextRander({ title: true, maxLength: 30 })
            },
            {
                field: 'Quantity', title: fields.ComplaintQty, align: "center", width: "200",
                rander: new mf.TextRander({ title: true, maxLength: 19, onkeypress: "console.log(event.keyCode);return (event.keyCode==46||event.keyCode>=48&&event.keyCode<=57)" }),
                defaultValue: 0,
                checkers: [
                       //new mf.IsOnlyNumberChecker(fields.ComplaintQty + fields.IsOnlyNumber),
                       new mf.IsNonNegativeNumberChecker(fields.ComplaintQty + fields.GreaterThanZero),
                       //new mf.TextNotRangeChecker(fields.ComplaintQty + fields.GreaterThanZero)
                       new mf.IsOverDecimalChecker(fields.CompaintQuantityIntIsOver, fields.CompaintQuantityDecIsOver, fields.ComplaintQty + fields.IsOnlyNumber, 12, 6)
                ]
            },
            {
                field: 'Description', title: fields.ComplaintDesc, align: "center", width: "400",
                rander: new mf.TextRander({ size: 40, title: true, maxLength: 255 })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004, {
                    title: true,
                    fn_onSetEditingValue: function (value) {
                        var list = [];
                        if (HeaderStatus.substring(5, 18) == "0201213000028") {
                            for (var j = 0, i = 0; i < parameters.PT0191213000004.length; i++) {
                                if (parameters.PT0191213000004[i].value.substring(5, 18) == "0201213000028") {
                                    list[j] = parameters.PT0191213000004[i];
                                    j++;
                                }
                            }
                        }
                        else {
                            list = parameters.PT0191213000004;
                        }
                        return list;
                    }
                })
                //rander: new mf.TextRander({ size: 20, title: true, readonly: "readonly" })
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "200",
                rander: new mf.TextRander({ title: true, disabled: true})
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "200",
                rander: new mf.TextRander({ title: true, disabled: true})
            }
        ]
    });

    //明细添加
    this.AddDetailClick = function () {
        if (!ComplaintDetailTable)
            return;

        ComplaintDetailTable.addRow();
        var $trlength = ComplaintDetailTable.getAllRowData().length;
        console.log($trlength);
        if ($trlength > 1) {
            var array = $.map(ComplaintDetailTable.getAllRowData(),
                function (item, index) {
                    return Number(item.Sequence);
                });
            console.log(array);
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#ComplaintDetailTable").val(sequence);
        } else {
            $("#Sequence", "#ComplaintDetailTable").val(1);
        }
    }

    //明细编辑
    this.ChangeDetailClick = function () {
        if (!ComplaintDetailTable)
            return;

        ComplaintDetailTable.editRow();
    };

    //明细删除
    this.DeleteDetailClick = function () {
        if (!ComplaintDetailTable)
            return;
        ComplaintDetailTable.deleteRow();
    };

    //明细保存
    this.SaveDetailClick = function () {
        if (!ComplaintDetailTable)
            return;
        ComplaintDetailTable.save(null, null, true);
    };

    //明细关闭
    this.CleartableClick = function () {
        if (!ComplaintDetailTable) {
            return;
        }
        ComplaintDetailTable.goForword(function () {
            ComplaintDetailTable.loadData();
            $('#ComplaintDetailDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ComplaintDetailDialog').modal("hide");
        }, fields.Isleave);
    };

    //客戶开窗-未删作废
    var CustomerTable = new mf.Table("#CustomerTable", {
        uniqueId: "CustomerID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionCustomerBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetCustomerList',
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
        columns: [
            {
                field: 'Code', title: fields.CustomerNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.CustomerName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //客戶开窗-删作废
    var CustomerTable2 = new mf.Table("#CustomerTable2", {
        uniqueId: "CustomerID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionCustomerBar2"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var customerSearch = $("#TxtCustomerSearch2").val();
            if (customerSearch && customerSearch.length > 0) {
                searchData.Code = customerSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetCustomerList',
                data: searchData,
                success: function (data) {
                    var count = 0;
                    var new_data = data.rows.filter(function (row) {
                        if (row.Status == '作廢') {
                            count++;
                            return false;
                        }
                        return true;
                    });
                    data.total = parseInt(data.total) - count;
                    data.rows = new_data;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CustomerNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.CustomerName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //客户代号开窗
    this.SearchCustomer = function (id, name, yn) {
        CustomYN = yn;
        if (yn == "0") {
            $("#CustomerDialog").modal("show");
            $("#CustomerDialog").modal({ backdrop: 'static', keyboard: false });
            CustomerTable.loadData();
            $("#CustomerCommit").unbind();
            $("#CustomerCommit").click(function () {
                var row = CustomerTable.getSelectedData();
                if (row) {
                    $(id + 'Id').val(row.CustomerID);
                    $(id).val(row.Code);
                    $(id + "Name").val(row.Name);
                    self.clearInput("#TxtCustomerSearch", "#TxtCustomerSearch2");
                    $("#CustomerDialog").modal("hide");
                }
            });
        } else {
            $("#CustomerDialog2").modal("show");
            $("#CustomerDialog2").modal({ backdrop: 'static', keyboard: false });
            CustomerTable2.loadData();
            $("#CustomerCommit2").unbind();
            $("#CustomerCommit2").click(function () {
                var row = CustomerTable2.getSelectedData();
                $(id + 'Id').val(row.CustomerID);
                $(id).val(row.Code);
                $(id + "Name").val(row.Name);
                self.clearInput("#TxtCustomerSearch", "#TxtCustomerSearch2");
                $("#CustomerDialog2").modal("hide");
            });
        }


    }

    //客户代号开窗查询
    this.DialogCustomerSearch = function () {
        CustomerTable2.goForwordSafely(function () {
            CustomerTable2.loadData(null, null, 1);
        }, null);
    };

    //人员开窗
    var AccountTable = new mf.Table("#AccountTable", {
        uniqueId: "MESUserID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionAccountBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var accountSearch = $("#TxtWorkNumberSearch").val();
            if (accountSearch && accountSearch.length > 0) {
                searchData.Code = accountSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: searchData,
                success: function (data) {
                    var count= 0;
                    //去掉资料
                    var new_data = data.rows.filter(function (row) {
                        if (row.Status != '1') {
                            count++;
                            return false;
                        }
                        return true;
                    });
                    data.total = parseInt(data.total) - count;
                    data.rows = new_data;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Emplno",
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //人员开窗
    this.SearchUser = function (id, name) {
        $("#AccountDialog").modal("show");
        $("#AccountDialog").modal({ backdrop: 'static', keyboard: false });
        AccountTable.loadData();
        $("#AccountCommit").unbind();
        $("#AccountCommit").click(function () {
           //

            var row = AccountTable.getSelectedData();
            $(id + 'Id').val(row.MESUserID);
            $(id).val(row.Emplno);
            $("#AddName").val(row.UserName);
            self.clearInput("#TxtWorkNumberSearch", null);
            $("#AccountDialog").modal("hide");
        });
    }

    //人员开窗查询
    this.DialogAccountSearch = function () {
        AccountTable.goForwordSafely(function () {
            AccountTable.loadData(null, null, 1);
        }, null);
    };

    //主列表
    var table = new mf.Table("#QCS00009Table", {
        uniqueId: "ComplaintID",
        deleteId: "ComplaintID",
        isFrozenColumn: true,
        focusField: "CustomerCode",
        focusEditField: "CustomerCode",
        height: window.innerHeight - 178 ,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "100px",
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:100px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="DetailDialogClick" onclick="model.DetailDialogClick(this)" title="客诉单明细" >' + fields.CustomerComplaintDetail + '</button>');
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var Code = data['Code'];
            var Status = data['Status'];
            var Statustext;
            var Namearry = parameters.PT0191213000004;
            var $BtnDetailDialogClick = $row.find("#DetailDialogClick");
            if (isAdding) {
                $BtnDetailDialogClick.hide();
            }
            else {
                $BtnDetailDialogClick.show();
            }
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == Status) {
                    Statustext = Namearry[i].text;
                }
            }
            $row.find("#Status").attr("onchange", "model.ClickClose(this)");
            if (Status.substring(5, 18) == "0201213000029" ||
                Status.substring(5, 18) == "020121300002A" ||
                Status.substring(5, 18) == "020121300002B") {
                if (isEditing) {
                    msg.info(fields.info, Code + fields.StatusIs + Statustext + fields.Isnotedit);
                }
            }

            var Customer = data['Customer'];
            if (isEditing) {
                if (Customer == "") {
                    $row.find("#CustomerName").removeAttr("readonly");
                } else {
                    $row.find("#CustomerName").attr("readonly", "readonly");
                }
            }
        },
        fn_checkeditable: function ($selectedRow) {
            var Namearry = parameters.PT0191213000004;
            var row = table.getRowData($selectedRow);
            var Code = row.Code;
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == row.Status) {
                    Statustext = Namearry[i].text;
                }
            }
            if (row.Status.substring(5, 18) == "0201213000029" ||
                row.Status.substring(5, 18) == "020121300002A" ||
                row.Status.substring(5, 18) == "020121300002B") {
                msg.info(fields.info, Code + fields.StatusIs + Statustext + fields.Isnotedit);
                return true;
            }
            else {
                return false;
            }
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            if ($("#StartNo").val() != "") {
                searchData.StartCode = $("#StartNo").val();
            }
            if ($("#EndNo").val() != "") {
                searchData.EndCode = $("#EndNo").val();
            }
            if (formData.StartDate() != "") {
                searchData.StartDate = formData.StartDate();
            }
            if (formData.EndDate() != "") {
                searchData.EndDate = formData.EndDate();
            }
            if ($("#StartCustomer").val() != "") {
                searchData.StartCustCode = $("#StartCustomer").val();
            }
            if ($("#EndCustomer").val() != "") {
                    searchData.EndCustCode = $("#EndCustomer").val();
            }
            if (formData.StartOrder() != "") {
                searchData.StartOrderCode = formData.StartOrder();
            }
            if (formData.EndOrder() != "") {
                searchData.EndOrderCode = formData.EndOrder();
            }
            if (formData.Status() != "") {
                searchData.Status = formData.Status();
            }
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Token = token;

            mf.ajax({
                type: 'get',
                url: '/MES/api/QualityManagement/Qcs00009GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00009Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {

            var ID = rowData.ComplaintID;
            var data = {};
            data.ComplaintID = ID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00009Delete",
                data: JSON.stringify(data),
                success: function (data) {
                    success(data);
                }
            });

        },
        columns: [
            {
                field: "ComplaintID", title: "Id", align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: "Code", title: fields.CustomerComlpaintNo, align: "center", width: "130", require: true,
                rander: new mf.TextRander({ size: 10, title: "title", disabled: true})
            },
            {
                field: "Date", title: fields.DocumentDate, require: true, align: "center", width: "110",
                rander: new mf.DateRander(),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DocumentDateIsNull)
                ],
            },
            {
                field: "CustomerID", title: "", align: "center", width: "110", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: "CustomerCode", title: fields.CustomerNo, align: "center", width: "200",
                rander: new mf.FKRander("#CustomerDialog2",
                                         "#CustomerCommit2",
                                         CustomerTable2,
                                         new mf.TextRander(
                                             {
                                                 onchange: "model.ChangeText('RowCustomer');",
                                                 readonly: "readonly"

                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    self.clearInput("#TxtCustomerSearch2", null);
                    model.ChangeText('RowCustomer');
                    table.setEditingColumnValue($row, "CustomerID", e.data.CustomerID);
                    table.setEditingColumnValue($row, "CustomerCode", e.data.Code);
                    table.setEditingColumnValue($row, "CustomerName", e.data.Name);
                }
            },
            {
                field: "CustomerName", title: fields.CustomerName, align: "center", width: "200", 
                rander: new mf.TextRander({ disabled: true,title: "title" })
            },
            {
                field: "Complaintor", title: fields.Complainer, align: "center", width: "200",
                rander: new mf.TextRander({ size: 20, maxLength: 30, title: "title" })
            },
            {
                field: "Status", title: fields.Status, align: "center", width: "110",
                //rander: new mf.SelectRander(parameters.PT0191213000004)
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004,{ title: true })
            },
            {
                field: "Comments", title: fields.Remark, align: "center", width: "200",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })
            },
            {
                field: "ApplicantID", title: "", align: "center", width: "110", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: "Emplno", title: fields.Applicant, align: "center", width: "200", require: true,
                //rander: new mf.TextRander()
                rander: new mf.FKRander("#AccountDialog",
                                         "#AccountCommit",
                                         AccountTable,
                                         new mf.TextRander(
                                             {
                                                 readonly:'readonly'
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    self.clearInput("#TxtWorkNumberSearch", null);
                    table.setEditingColumnValue($row, "ApplicantID", e.data.MESUserID);
                    table.setEditingColumnValue($row, "Emplno", e.data.Emplno);
                    table.setEditingColumnValue($row, "ApplicantName", e.data.UserName);
                }
            },
            {
                field: "ApplicantName", title: fields.Name, align: "center", width: "200", 
                rander: new mf.TextRander({ disabled: true, title:"title"})
            },
            {
                field: "Creator", title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ readonly: 'readonly', title: "title" })
            },
            {
                field: "CreateTime", title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextTimeRander({ readonly: "readonly", title: true }))
                //rander: new mf.TextTimeRander()
            },
            {
                field: "Modifier", title: fields.LastChangedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ readonly: 'readonly', title: "title" })
            },
            {
                field: "ModifiedTime", title: fields.LastChangedDate, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextTimeRander({ readonly: "readonly", title: true }))
                //rander: new mf.TextTimeRander()
            }
        ]
    });
    table.loadData();

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    // 刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    // 添加
    this.addClick = function () {
  
        mf.ajax({
            type: "Get",
            url: "/MES/api/Util/GetUser",
            data: ({ Token: token }),
            success: function (data) {
                console.log(JSON.stringify(data));
                $("#AddAccount").val(data.Emplno);
                $("#AddName").val(data.UserName);
                MESUserID = data.MESUserID;

                model.getType(data.MESUserID);
            }

        });

        $("#AddDialog").modal({ backdrop: 'static', keyboard: false });
        $('#AddDialog').modal("show");
    }

    this.getType = function (ID) {
        mf.ajax({
            type: 'Get',
            url: "/MES/api/QualityManagement/Qcs00009GetTypeList",
            data: ({ Token: token, MESUserID: ID }),
            success: function (data) {

                var list = [];
                for (var i = 0; i < data.length; i++) {
                    list.push({ value: data[i].value, text: data[i].Code })
                }
                formData.DocumentCategoryList(list);
                $("#DocumentCategory").val(list[0].value);
            
                formData.CteforyValue(list[0].value);
                var myDate = new Date();
                var date = myDate.getFullYear() + '-' +
                                (((myDate.getMonth() + 1) < 10) ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-' +
                                ((myDate.getDate() < 10) ? '0' + myDate.getDate() : myDate.getDate());
                //$("#AddCode").val("");
                $("#AddDate").datepicker('setDate', date);
                DocumentID = $("#DocumentCategory").val();
                GetDate = $("#AddDate").val();
                flag = true;
                self.getNumber();
            }
        });
    }

    // 编辑
    this.editClick = function () {
        if (!table) {
            return;
        }
        table.editRow();
    };

    // 删除
    this.deleteClick = function () {
        if (!table) {
            return;
        }
        table.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }
        table.save(null, null, true);
    };

    //导出 - 表头
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var qcs00009_exportUrl = "/MES/api/ExportFile/Qcs00009Export?";
        var qcs00009_params;
        qcs00009_params = "Token=" + token;
        if ($("#StartNo").val() != "")
            qcs00009_params += "&StartCode=" + $("#StartNo").val();
        if ($("#EndNo").val() != "")
            qcs00009_params += "&EndCode=" + $("#EndNo").val();
        if ($("#startDate").val() != "")
            qcs00009_params += "&StartDate=" + $("#startDate").val();
        if ($("#endDate").val() != "")
            qcs00009_params += "&EndDate=" + $("#endDate").val();
        if ($("#StartCustomer").val() != "")
            qcs00009_params += "&StartCustCode=" + $("#StartCustomer").val();
        if ($("#EndCustomer").val() != "")
            qcs00009_params += "&EndCustCode=" + $("#EndCustomer").val();
        if ($("#StartOrder").val() != "")
            qcs00009_params += "&StartOrderCode=" + $("#StartOrder").val();
        if ($("#EndOrder").val() != "")
            qcs00009_params += "&EndOrderCode=" + $("#EndOrder").val();
        if ($("#SelectStatus").val() != "")
            qcs00009_params += "&Status=" + $("#SelectStatus").val();
        window.location.href = mf.domain + qcs00009_exportUrl + qcs00009_params;
    };

    //导入    
    this.importClick = function () {
        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnBrowse").unbind();
        $("#BtnImport").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectFile);
            }
        });
        $("#BtnBrowse").click(function () {
            $("#BtnFile").click();
        });
        $("#BtnImport").click(function () {
            var importData = new FormData();
            importData.append("File", document.getElementById('BtnFile').files[0]);
            importData.append("Token", token);//"1"
            importData.append("ComplaintID", ComplaintId);
           
            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00009Import',
                data: importData,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            ComplaintDetailTable.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    }
                    else {
                        var message = ret.msg;
                        if (message.length > 250) {
                            message = message.substring(0, 250) + "……"
                        }
                        msg.error(fields.Prompt, message);
                    }
                }
            });
            
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };

    //客诉单明细开窗
    this.DetailDialogClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        $("#CustomerComlpaintNoId").val(row.ComplaintID);

        ComplaintId = row.ComplaintID;
        HeaderStatus = row.Status;
        if (row.Status.substring(5, 18) == "0201213000029" ||
            row.Status.substring(5, 18) == "020121300002A" ||
            row.Status.substring(5, 18) == "020121300002B") {
            $("#DetailImport").css("display", "none");
            $("#DetailAdd").css("display", "none");
            $("#DetailChange").css("display", "none");
            $("#DetailDeletion").css("display", "none");
            $("#DetailComfirm").css("display", "none");
            $("#FileDeletion").css("display", "none");
            $("#FileUpload").css("display", "none");
        }
        else {
            $("#DetailImport").css("display", "inline");
            $("#DetailAdd").css("display", "inline");
            $("#DetailChange").css("display", "inline");
            $("#DetailDeletion").css("display", "inline");
            $("#DetailComfirm").css("display", "inline");
            $("#FileDeletion").css("display", "inline");
            $("#FileUpload").css("display", "inline");
        }
        ComplaintDetailTable.loadData();
        var Date = row.Date;
        Date = Date.toString().substr(0, 10);
        $("#DialogCustomerComplaintNo").val(row.Code);
        $("#DialogDocumentDate").val(Date);
        $("#DialogCustomerComplaintNo").attr("title", row.Code);
        $('#ComplaintDetailDialog').modal("show");
    };

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };

    //新增画面栏位资料清除
    this.ClearAddValue = function () {
        flag = false;
        AddCallMESUserID = null;
        AddCallOrganizationID = null;
        AddEquipmentID = null;
        self.clearInput("#AddCode", "#AddDate");
        self.clearInput("#AddCustomer", "#AddCustomerId");
        self.clearInput("#AddComplainer", "#AddCustomerName");
        self.clearInput("#AddAccountId", "#AddRemark");
        self.clearInput("#AddAccount", "#AddName");
        self.clearInput("#DocumentCategory", null);
        self.clearInput("#AddDocumentAutoNumberID", null);
    };

    //新增保存
    this.AddOrderClick = function () {
        console.log("1");
        if (!$('#AddDate').val()) {
            msg.info(fields.info, fields.DocumentDateIsNull);
            return;
        }
        if (!$('#AddCode').val()) {
            msg.info(fields.info, fields.CustomerComplaintNoIsNull);
            return;
        }
        if (!$('#AddAccount').val()) {
            msg.info(fields.info, fields.ApplicantIsNull);
            return;
        }
        if (!$("#DocumentCategory").val()) {
            msg.info(fields.info, fields.DocumentCategoryIsNull);
            return
        }
        var saveData = {
            Code: $("#AddCode").val(),
            Date: $("#AddDate").val(),
            CustomerID: $("#AddCustomerId").val(),
            CustomerCode: $("#AddCustomer").val(),
            CustomerName: $("#AddCustomerName").val(),
            Complaintor: $('#AddComplainer').val(),
            ApplicantID: $("#AddAccountId").val() || MESUserID,
            Comments: $("#AddRemark").val(),
            Status: $("#AddStatus").val(),
            DocumentAutoNumberID: $("#AddDocumentAutoNumberID").val()
        }

      
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00009Add',
            data: JSON.stringify(saveData),
            success: function (data) {
                if (data.status == "200") {
                    console.log(data);
                    msg.success(fields.info, data.msg);
                    self.ClearAddValue();
                    $('#AddDialog').modal("hide");
                    table.loadData();
                    flag = false;
                }
                else {
                    msg.error(fields.info, data.msg);
                    self.ClearAddValue();
                    $('#AddDialog').modal("hide");
                    table.loadData();
                    flag = false;
                }
            }
        });

    };

    //客诉单开窗
    var DocumentTable = new mf.Table("#DocumentTable", {
        uniqueId: "Code",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDocumentBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Token = token;


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetComplaintList',
                data: searchData,
                success: function (data) {
                    for (var i = 0, len = data.rows.length; i < len; i++) {
                        data.rows[i].Date = data.rows[i].Date.replace("T", " ");
                    }

                    console.log(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.DocumentNo, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Date', title: fields.DocumentDate, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'CustomerCode', title: fields.CustomerNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'CustomerName', title: fields.CustomerName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //客诉单开窗
    this.SearchCode = function (id) {
        $("#CodeDialog").modal("show");
        $("#CodeDialog").modal({ backdrop: 'static', keyboard: false });
        DocumentTable.loadData();
        $("#DocumentCommit").unbind();
        $("#DocumentCommit").click(function () {
            var row = DocumentTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#CodeDialog").modal("hide");
            }
        });
    }

    //针对名称修改权限进行控制
    this.ChangeText = function (obj) {
        if (obj == "Customer") {
            var checkText = $("#AddCustomer").val();
            if (checkText != "" && checkText != null) {
                $("#AddCustomerName").attr("disabled", true);
            } else {
                self.clearInput("#AddCustomerName", "#AddCustomerId");
                $("#AddCustomerName").removeAttr("disabled");
            }
        } else if(obj == "Account") {
            var checkText = $("#AddAccount").val();
            if (checkText.length == 0) {
                self.clearInput("#AddAccountId", "#AddName");
            }
        } else {
            var checkText = $("#CustomerCode input").val();
            console.log(checkText);
            if (checkText != "" && checkText != null) {
                $("#CustomerName").attr("readonly", "readonly");
            } else {
                self.clearInput("#CustomerName", "#CustomerID");
                $("#CustomerName").removeAttr("readonly");
            }
        }
    }

    //附档
    var FileTable = new mf.Table("#FileTable", {
        uniqueId: "AttachmentID",
        paginationBar: new mf.PaginationBar("#paginagionFileBar"),
        operateColumWidth: "90px",
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            //var noId = $("#CustomerComlpaintNoId").val();
            //if (noId && noId.length > 0) {
            //    searchData.ComplaintNoId = noId + "";
            //}

            var itemId = $("#CustomerComlpaintItemId").val();
            if (itemId && itemId.length > 0) {
                searchData.ComplaintDetailID = itemId + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00009GetAttachmentList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:90px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="FileBrowse" onclick="model.FileBrowseClick(this)" title="查看" >' + fields.View + '</button>');

            return $td;
        },
        focusField: "Name",
        height: 300,
        columns: [
            {
                field: 'Name', title: fields.FileName, align: "center", width: "160",
                rander: new mf.StaticValueRander(),
            }
        ]
    });

    //附档上传
    this.FileDialogClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = ComplaintDetailTable.getRowData($tr);
        $("#CustomerComlpaintItemId").val(row.ComplaintDetailID);
        //要有關閉、刪除、上傳按鈕
        FileTable.loadData();

        $("#FileUpload").unbind();
        $("#AddFile").unbind();

        $("#AddFile").change(function () {
            var fileName = $("#AddFile").val();
            if (!(fileName && fileName.length > 0) || !(uploadCheck == "N")) {
                //msg.info(fields.Prompt, fields.IsNotImage);
                return;
            }

            var type = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();

            var formdata = new FormData();
            formdata.append("file", document.getElementById('AddFile').files[0]);
            //formdata.append("ComplaintNoId", $("#CustomerComlpaintNoId").val());
            formdata.append("ComplaintDetailID", $("#CustomerComlpaintItemId").val());
            //formdata.append("ComplaintNo", $("#DialogCustomerComplaintNo").val());
            formdata.append("Token", token);
            
            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00009FileAdd',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            uploadCheck = "Y";
                            FileTable.loadData();
                            //$('#AddEquipmentPictureDialog').modal('hide');
                        });
                    }
                    else {
                        msg.error(fields.Prompt, ret.msg);
                    }
                }
            });
        });

        $("#FileUpload").click(function () {
            console.log("test");
            uploadCheck = "N";
            $("#AddFile").click();
        });

        
        $('#FileDialog').modal("show");
    }

    //附档弹窗关闭
    this.FileCloseClick = function () {
        $('#FileDialog').modal("hide");
    }

    //附档删除
    this.FileDeleteClick = function () {
        var row = FileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectFile);
            return;
        }

        msg.warning(fields.Prompt, fields.WhetherToDelete + row.Name,
            function () {
                //row.ComplaintFileId
                var data = {};
                data.AttachmentID = row.AttachmentID;
                data.Token = token;
                mf.ajax({
                    type: 'POST',
                    url: '/MES/api/QualityManagement/Qcs00009FileDelete',
                    data: JSON.stringify(data),
                    success: function (ret) {
                        if (ret.status == 200) {
                            msg.success(fields.Prompt, ret.msg, function () {
                                FileTable.loadData();
                            });
                        }
                        else {
                            msg.error(fields.Prompt, ret.msg);
                        }
                    }
                });
            }, null);
    }

    //线上浏览与下载
    this.FileBrowseClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = FileTable.getRowData($tr);
        var fileName = row.Name;

        if (fileName.indexOf("bmp") >= 0 ||
            fileName.indexOf("jpg") >= 0 ||
            fileName.indexOf("png") >= 0 ||
            fileName.indexOf("jpeg") >= 0) {//浏览

            $("#PictureFileName").html(fileName);
            $("#ViewImage").attr("src", window.top.mf.domain + "/MES/" + row.Path);
            $("#ViewPictureDialog").modal({ backdrop: 'static', keyboard: false });
            $("#ViewPictureDialog").modal('show');

        } else {//下载

            window.location.href = window.top.mf.domain + "/MES/" + row.Path;

        }
    }

    //点击到结案的事件
    this.ClickClose = function (obj) {
        if ($(obj).val().substring(5, 18) == "020121300002A") {
            msg.info(fields.info, fields.CanNotBeClosed);
            $(obj).val(mf.systemID + "0201213000028");
            return;
        }
    }
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "SamplingInspectionSetMaintenance", "CheckSet", "InspectionStandard", "InspectionLevel", "Sequence",
    "InspectionMethod", "AQL", "StartBatch", "EndBatch", "SamplingQuantity", "AcQuantity", "ReQuantity",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Normal", "Invalid",
    "Cancel", "Browse", "Comfirm", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "SourceDetailMaintenance",
    "PleaseSaveDataFirst", "PleaseSelectFile", "InspectionLevelIsNull", "InspectionMethodIsNull", "AQLIsNull",
    "StartBatchIsNonNegativeNumber", "EndBatchIsNonNegativeNumber", "SamplingQuantityIsNonNegativeNumber",
    "AcQuantityIsNonNegativeNumber", "ReQuantityIsNonNegativeNumber", "StartBatchIsMaxDecimal", "EndBatchIsMaxDecimal",
    "SamplingQuantityIsMaxDecimal", "AcQuantityIsMaxDecimal", "ReQuantityIsMaxDecimal", "StartBatchIsMaxInteger",
    "EndBatchIsMaxInteger", "SamplingQuantityIsMaxInteger", "AcQuantityIsMaxInteger", "ReQuantityIsMaxInteger",
    "StartDocumentNo", "EndDocumentNo", "StartDocumentDate", "EndDocumentDate", "StartCustomerNo", "EndCustomerNo",
    "StartOrderNo", "EndOrderNo", "Status", "CustomerComlpaintNo", "DocumentDate", "CustomerNo", "CustomerName",
    "Complainer", "Applicant", "Status", "Name", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "CustomerComplaintDetail", "AddCustomerComplaint", "CustomerComplaintList", "DocumentNo", "CustomerList", "CustomerData",
    "info", "StatusIs", "Isnotedit", "AccountList", "WorkNumber", "CustomerComplaintNoIsNull", "ApplicantIsNull", "Issued",
    "Isleave", "Add", "AttachmentFile", "ItemNo", "LotNo", "ShippingNo", "OrderNo", "ItemSpecification", "ItemDescription",
    "ComplaintQty", "ComplaintDesc", "ItemNoIsNull", "ItemMasterFile", "Close", "Upload", "View", "PleaseSelectFile",
    "WhetherToDelete", "FileName", "GreaterThanZero", "IsOnlyNumber", "CompaintQuantityIntIsOver", "CompaintQuantityDecIsOver",
    "UploadAttachments", "CanNotBeClosed", "DocumentCategory", "DocumentCategoryIsNull", "Confirm"
];
words = arrayWord.join();

initPage = function () {
    mf.toolBar('#container');
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            parameters = data;
          
            model = new viewModel();
        }
    });
};
