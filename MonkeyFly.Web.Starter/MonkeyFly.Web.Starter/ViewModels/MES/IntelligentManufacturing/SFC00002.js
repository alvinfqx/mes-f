var URL = "/MES/IntelligentManufacturing/SFC00002";
var MID = window.top.page_parameters.GetParameters(URL);
var model = null;
var parameters = null;



var viewModel = function () {
    /* 全局变量
    *
    * self   viewModel this
    * DetailTable  制令单明细Table
    * MainTable    制令单表头Table
    * langStr 获取登录时语系
    *
    */
    var self = this;
    var MainTable = null,
        DetailTable = null,
        flag = true, //处理管制员为系统登陆者 
        changeFlag = false,//控制ko的change事件在有单据类型返回后执行\
       // sendOneFlag = false,
        //clickFalse = false;//控制新增保存时重复点击保存多次数据问题
        searchEmployeeData = {};
    
    var userName = "";//window.top.$parentNode.querySelector("#username").innerText.split(":")[1];//系统登录人名称
    var Account = "";


    var lang = [];
    var langStr = "EN";
    if (language != 'en') {
        lang = language.split('-');
        langStr = 'zh-' + lang[1].toUpperCase();
    }
    var actionButtons = ["Issued", "Void", "Closed", "Restore", "ProcessRelationship", "BOM", "Resources"];
    var DataValue = (new Date()).getFullYear() + '-' + mf.deal.pad((new Date()).getMonth() + 1, 2) + '-' +
        mf.deal.pad((new Date()).getDate(), 2);
    var Detail_FabricatedMotherID = "";
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];

    var AccountFlag = true;
    var ControllerFlag = true;
    var UserFlag = true;
    //格式化日期,boolean参数决定日期精确度，传false精确到日，true精确到秒
    this.formatDate = function (date, boolean) {
        var year = date.getFullYear()
        var m = date.getMonth() + 1;
        var month = m > 9 ? m : "0" + m;
        var d = date.getDate();
        var day = d > 9 ? d : "0" + d;
        var h = date.getHours()
        var hour = h > 9 ? h : "0" + h;
        var m = date.getMinutes();
        var minutes = m > 9 ? m : "0" + m;
        var s = date.getSeconds();
        var seconds = s > 9 ? s : "0" + s;

        if (!boolean) {
            return year + "-" + month + "-" + day
        } else {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        }
    }


    /* 初始化获取数据
     *  
     * #EstimatedStartDate  #EstimatedFinishDate #AddEstimatedShippingDate  时间控件(新增表头 预计开工日/预计完工日/预设出货日)
     *
     */
   
    $('#AddEstimatedStartDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $('#AddEstimatedFinishDate').datepicker('setStartDate', startTime);
    });

    $('#AddEstimatedFinishDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var endTime = e.date;
        $('#AddEstimatedStartDate').datepicker('setEndDate', endTime);
    });

    $('#AddEstimatedShippingDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) { });


    $('#EditEstimatedStartDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $('#editEstimatedFinishDate').datepicker('setStartDate', startTime);
    });

    $('#editEstimatedFinishDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var endTime = e.date;
        $('#EditEstimatedStartDate').datepicker('setEndDate', endTime);
    });

    $('#EditEstimatedShippingDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) { });


    $('#DocumentDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todyBtn:'linked'
    }).on('changeDate', function (e) {
        
      //  var searchDatas = {};
        //  searchDatas.MFCUserID = self.formData.MESUser_ID();
        if (JSON.stringify(searchEmployeeData) != '{}') {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetBillTypeList',
                data: searchEmployeeData,
                success: function (data) {
                    //  console.log(data)
                    // self.formData.DocumentCategoryArray(data);
                    // console.log(self.addFormData.DocumentCategory());
                    //  var searchEmployeeData = {};
                    var save_data = {};
                    if (!self.addFormData.DocumentCategory()) {
                        save_data.DocumentID = "";
                    } else {
                        save_data.DocumentID = self.addFormData.DocumentCategory()
                    }
                    save_data.Date = self.addFormData.DocumentDate();

                    mf.ajax({
                        type: 'Get',
                        url: '/MES/api/Util/GetDocumentAutoNumber',
                        data: save_data,//{ DocumentID: self.addFormData.DocumentCategory(), Date: self.addFormData.DocumentDate() },
                        success: function (data) {
                            console.log(data)
                            self.addFormData.DocumentAutoNumberID(data.DocumentAutoNumberID),
                            self.addFormData.OrderNum(data.AutoNumber);
                            changeFlag = true
                        }
                    });
                }
            });
        }

    })


    //導入日期
    $('#Import_Date').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) { });

    /* Knockout 绑定
    *
    *  formData={}  查询条件或者存值
    *  addFormData={}  开窗新增(制令表头)
    *  addControllerClick() 开窗获取"管制员"开窗(新增制令表头时)
    *  searchWorkNumberClick()  查询"工号"事件(新增表头时,管制员查询)
    *  WorkNumber  管制员工号查询(新增表头时,管制员查询)
    *  DocumentCategoryArray  "单据类别"下拉数组(新增表头时,单据类别)
    *  DocumentCategoryArray  "单据来源"下拉数组(新增表头时,单据来源)
    *  MESUser_ID   开窗获取管制员流水号
    *  AddEmployeeComfirmClick()  管制员开窗选中数据确定按钮
    *  ko 绑定 onchange 事件  onchangeDocumentCategory() 注意自动初始化
    *  ItemNumber   料品代號查询(新增表头时,製品製程資料維護开窗)
    *  addItemNoClick()  料品代号开窗(新增表头)
    *  searchItemNoClick()  料品代号--制品制程查询(新增表头)
    *  ItemNoComfirmClick()  料品代号确定(新增表头)
    *  Item_ID    开窗获取料品代号流水号
    *
    */
    this.formData = {
        OrderNum: ko.observable(),
        WorkNumber: ko.observable(),
        DocumentCategoryArray: ko.observableArray(),
        DocumentSourceArray: ko.observableArray(parameters.PT019121300001F),
        MESUser_ID: ko.observable(),
        ItemNumber: ko.observable(),
        Item_ID: ko.observable(),
        searchCustomerNo: ko.observable(),
        CustomerMESUserID: ko.observable(),
        CustomerID: ko.observable(),
        OrderSingleStateArray: ko.observableArray(parameters.PT0191213000004),
        PreWarehouseCode: ko.observable(),
        AddUnit: ko.observable(),
        Organization_ID: ko.observable(),

    };

    $("#StartItemCode").val('')
    var DocDate = this.formatDate(new Date())
    this.addFormData = {
        Controller: ko.observable(),
        DocumentCategory: ko.observable(),
       // DocumentNumber: ko.observable(),
        DocumentSource: ko.observable(),
        OrderNum: ko.observable(),
        DocumentDate: ko.observable(DocDate),
        SequenceNo: ko.observable("0"),
        Version: ko.observable("0"),
        LotNo: ko.observable(),
        ItemNo: ko.observable(),
        ItemDescription: ko.observable(),
        ItemSpecification: ko.observable(),
        Qty: ko.observable(),
        OverRate: ko.observable(0),
        OrderCompletion: ko.observable("0"),
        NumberManufBeforeDismantling: ko.observable("0"),
        ManufacturingUnit: ko.observable(),
        EstimatedStartDate: ko.observable(DataValue),
        EstimatedFinishDate: ko.observable(DataValue),
        OrderNo: ko.observable(),
        QuantityOrder: ko.observable(0),
        CustomerNo: ko.observable(),
        CustomerName: ko.observable(),
        SalesmanCode: ko.observable(),
        AccountName: ko.observable(),
        EstimatedShippingDate: ko.observable(DataValue),
        PreWarehouse: ko.observable(),
        OrderSingleState: ko.observable(),
        Remark: ko.observable(),
        DocumentAutoNumberID: ko.observable(),
        AutoNumberRecordID: ko.observable()
    };

    this.editFormData = {
        DocumentSource: ko.observable(),
        DocumentSourceArray: ko.observableArray(parameters.PT019121300001F),
        OrderNum: ko.observable(),
        SequenceNo: ko.observable(),
        Version: ko.observable(),
        LotNo: ko.observable(),
        ItemNo: ko.observable(),
        ItemDescription: ko.observable(),
        ItemSpecification: ko.observable(),
        Qty: ko.observable(),
        OverRate: ko.observable(),
        OrderCompletion: ko.observable(),
        NumberManufBeforeDismantling: ko.observable(),
        ManufacturingUnit: ko.observable(),
        ManufacturingUnitArray: ko.observableArray(parameters.PT019121300000C),
        EstimatedStartDate: ko.observable(),
        EstimatedFinishDate: ko.observable(),
        OrderNo: ko.observable(),
        QuantityOrder: ko.observable(),
        CustomerNo: ko.observable(),
        CustomerName: ko.observable(),
        SalesmanCode: ko.observable(),
        AccountName: ko.observable(),
        EstimatedShippingDate: ko.observable(),
        PreWarehouse: ko.observable(),
        OrderSingleState: ko.observable(),
        OrderSingleStateArray: ko.observableArray(parameters.PT0191213000004),
        Remark: ko.observable(),
        CustomerID: ko.observable(),
        FabricatedMotherID: ko.observable(),
        ItemID: ko.observable(),
        MESUserID: ko.observable(),
        OrganizationID: ko.observable(),
        DocumentDate:ko.observable()
    };
 


    /*查询条件*/

    this.addControllerClick = function () {
        ControllerFlag = false;
        self.formData.WorkNumber("");
        $("#AddEmployeeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddEmployeeDialog").modal('show');
        self.AddEmployeeDialogTable.loadData();


    };

    this.searchWorkNumberClick = function () {
        self.AddEmployeeDialogTable.loadData();
    };

    var temp = '';

    for (var i = 0; i < parameters.PT0191213000004.length; i++) {
        
            temp += '&nbsp;<input type="checkbox" class="i-checks" value = "' + parameters.PT0191213000004[i].value + '" /><span>' + parameters.PT0191213000004[i].text + '</span>';

    }

    $("#Status").html(temp);
    $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
    $(".i-checks").eq(0).iCheck('check');
    //$(".i-checks").eq(1).iCheck('check');
    //console.log($(".i-checks"))

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
                url: '/MES/api/PopUp/SfcGetItemList',
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
        LastWidth:160,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center",width:"180",
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
                url: '/MES/api/PopUp/Sfc00002GetFabricatedMother',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "MoNo",
        height: 300,
        columns: [
            {
                field: 'MoNo', title: fields.MoNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.DateRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.DateRander({ size: 20, maxLength: 120, title: "title" })),
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


    //客户开窗
    this.UserClick = function () {
        UserFlag = true;
        self.EditCustomerNoDialogTable.loadData();
        $("#EditCustomerNoDialog").modal('show');
        
    };

    ////客户表格
    //this.AddCustomerNoDialogTables = new mf.Table("#AddCustomerNoTables", {
    //    uniqueId: "CustomerID",
    //    paginationBar: new mf.PaginationBar("#AddCustomerNoPageBars"),
    //    editable: false,
    //    fn_getData: function (pagination, searchData, success) {
    //        if (!searchData)
    //            searchData = {};
    //        searchData.Code = self.formData.searchCustomerNo();
    //        mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/IntelligentManufacturing/Sfc00002GetCustomerList',
    //            data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
    //            success: function (data) {
    //                console.log(data);
    //                success(data);
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success) { },
    //    height: 300,
    //    columns: [
    //        {
    //            field: 'Code', title: fields.CustomerNo, align: "center", width: "120",
    //            rander: new mf.TextRander({ title: "title" }),
    //        },
    //        {
    //            field: 'Name', title: fields.CustomerName, align: "center", width: "150",
    //            rander: new mf.TextRander({ title: "title" })
    //        },
    //         {
    //             field: 'MesCode', title: fields.SalesmanCode, align: "center", width: "180",
    //             rander: new mf.TextRander({ title: "title" }),
    //         },
    //        {
    //            field: 'MESUserID', title: "", visible: false,
    //            rander: new mf.DynamicValueRander(function () { })
    //        },
    //        {
    //            field: 'MesName', title: fields.AccountName, align: "center", width: "120",
    //            rander: new mf.TextRander({ title: "title" })
    //        },
    //        {
    //            field: 'Comments', title: fields.Remark, align: "center",
    //            rander: new mf.TextRander({ title: "title" })
    //        }
    //    ]
    //});

    //查询之客户确认
    this.seaarchCustomerNoComfirmClick = function () {
        var row = self.AddCustomerNoDialogTables.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord)
            return
        };

        $("#Controller").val(row.UserName);
        $("#ControllerID").val(row.MESUserID);

        $("#SearchCustomerNoDialog").modal('hide');
    }


    //业务员
    self.AccountClick = function () {

        AccountFlag = true;
        self.AddSalesManDialogTable.loadData();
        $("#AddSalesManDialog").modal("show")
    }

    self.ControllerClick = function () {
        ControllerFlag = true;
        self.AddEmployeeDialogTable.loadData();
        $("#AddEmployeeDialog").modal("show");
    }


    this.clearSearchClick = function (id1,id2) {
        $(id1).val("");
        if (id2) {
            $(id2).val("")
        }
    }




    this.AddEmployeeComfirmClick = function () {

        if (!ControllerFlag) {
            var row_employee_data = self.AddEmployeeDialogTable.getSelectedData();
            
            // console.log(row_employee_data)
            self.formData.MESUser_ID(row_employee_data.MESUserID);
            self.addFormData.Controller(row_employee_data.Account);

            searchEmployeeData.MFCUserID = self.formData.MESUser_ID();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetBillTypeList',
                data: searchEmployeeData,
                success: function (data) {
                    //  console.log(data)
                    self.formData.DocumentCategoryArray(data);
                    console.log(data)
                    // console.log(self.addFormData.DocumentCategory());
                    var save_data = {};
                    if (!self.addFormData.DocumentCategory()) {
                        save_data.DocumentID = "";
                    } else {
                        save_data.DocumentID = self.addFormData.DocumentCategory()
                    }
                    save_data.Date = self.addFormData.DocumentDate();


                    mf.ajax({
                        type: 'Get',
                        url: '/MES/api/Util/GetDocumentAutoNumber',
                        data: save_data,//{ DocumentID: self.addFormData.DocumentCategory(), Date: self.addFormData.DocumentDate() },
                        success: function (data) {
                            self.addFormData.DocumentAutoNumberID(data.DocumentAutoNumberID),
                            self.addFormData.OrderNum(data.AutoNumber);
                            changeFlag = true
                        }
                    });
                }
            });
        } else if (ControllerFlag) {
            var row_employee_data = self.AddEmployeeDialogTable.getSelectedData();
            if (!row_employee_data) {
                msg.info(fields.Prompt, fields.PleaseSelectRecord);
                return
            }
            $("#Controller").val(row_employee_data.Account);
            $("#ControllerID").val(row_employee_data.Account);
        }
        $("#AddEmployeeDialog").modal('hide');
        flag = false;
    };



 
    this.onchangeDocumentCategory = function (obj) {

        if (changeFlag) {
            var save_data = {};
            if (!self.addFormData.DocumentCategory()) {
                save_data.DocumentID = "";
            } else {
                save_data.DocumentID = self.addFormData.DocumentCategory()
            }
            save_data.Date = self.addFormData.DocumentDate();


            mf.ajax({
                type: 'Get',
                url: '/MES/api/Util/GetDocumentAutoNumber',
                data: save_data,//{ DocumentID: self.addFormData.DocumentCategory(), Date: self.formatDate(new Date(), false) },
                success: function (data) {

                    if (self.addFormData.Controller().length <= 0) {
                        self.addFormData.DocumentAutoNumberID(""),
                        self.addFormData.OrderNum("");
                    }
                    else {
                        self.addFormData.DocumentAutoNumberID(data.DocumentAutoNumberID),
                        self.addFormData.OrderNum(data.AutoNumber);
                    }
                }
            });
        }


    };
    
    //料品代号改变，获取批号，判断是否重复
    //this.onchangeItemNo = function (obj) {
    //    console.log(111111)
    //    var saveData = {};
    //    saveData.ItemID = self.addFormData.ItemNo();
    //    saveData.Date = self.addFormData.DocumentDate();
    //    console.log(saveData)
    //    mf.ajax({
    //        type: "get",
    //        url: "/MES/api/IntelligentManufacturing/Sfc00002GetLotNumber",
    //        data: saveData,
    //        success: function (data) {
    //            console.log(data)
    //            if (data.Status == "200") {
    //                msg.success(fields.Prompt, data.Msg, function () { })
    //            } else {
    //                msg.warnings(fields.Prompt, data.Msg, function () { }, function () { })
    //            }
    //        }
    //    })
    //}

    this.addItemNoClick = function () {        
        $("#AddItemNoDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddItemNoDialog").modal('show');
        self.AddItemNoDialogTable.loadData();
    }; 

    this.searchItemNoClick = function () {
        self.AddItemNoDialogTable.loadData();
    };

    this.ItemNoComfirmClick = function () {
        var row_itemNo_data = self.AddItemNoDialogTable.getSelectedData();
        self.formData.Item_ID(row_itemNo_data.ItemID);
        self.formData.AddUnit(row_itemNo_data.Unit);
        
        self.addFormData.ItemDescription(row_itemNo_data.Name);
        self.addFormData.ItemSpecification(row_itemNo_data.Specification);
        self.addFormData.ManufacturingUnit(row_itemNo_data.UnitName);
        

        var Lot = row_itemNo_data.Lot; //批号管控  true
        var IsMLotMethod = row_itemNo_data.IsMLotMethod; //组批方式  false
        var LotClassID = row_itemNo_data.LotClassID;   //批号类别
        var LotStatus = row_itemNo_data.LotStatus;    //批号类别状态


        if (Lot === true && IsMLotMethod === "false") {
            $("#IsToLotNo").html("");
            $("#AddLotNoID").attr("disabled", true);
        }
        else if (Lot === true && IsMLotMethod === "true") {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/Util/GetAutoLotNumber',
                data: { LotClassID: LotClassID },
                success: function (data) {
                   // self.addFormData.LotNo(data);
                }
            });
            $("#IsToLotNo").html("*");
            $("#AddLotNoID").attr("disabled", true);

        }
        else if (LotClassID && LotClassID.length <= 0 && LotStatus === "0") {
            $("#IsToLotNo").html("");
            $("#AddLotNoID").attr("disabled", false);
        }
        else {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/Util/GetAutoLotNumber',
                data: { LotClassID: LotClassID },
                success: function (data) {
                   // self.addFormData.LotNo(data);
                }
            });
            $("#AddLotNoID").attr("disabled", true);
        }

        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentManufacturing/Sfc00002GetLotNumber',
            data: { ItemID: row_itemNo_data.ItemID, Date: self.addFormData.DocumentDate() },
            success: function (data) {
                console.log(data)
                if (data.Status == "200") {
                    self.addFormData.LotNo(data.BatchNumber);
                    self.addFormData.ItemNo(row_itemNo_data.Code);
                    self.addFormData.AutoNumberRecordID(data.AutoNumberRecordID);
                    $("#AddItemNoDialog").modal('hide');
                } else {
                    msg.warnings(fields.Prompt, data.Msg + fields.Reselect, function () { }, function () { })
                }
            }
        });

        
    };

    //料品代号开窗取消
    this.clearItem = function () {
        self.addFormData.ItemNo("");
        self.addFormData.LotNo("");
        self.addFormData.AutoNumberRecordID("");
    }

    this.addCustomerNoClick = function (id) {
        UserFlag = false;
      //  if (id == '#addOpen') {
            self.formData.searchCustomerNo("");
            $("#AddCustomerNoDialog").modal({ backdrop: 'static', keyboard: false });
            $("#AddCustomerNoDialog").modal('show');
            self.AddCustomerNoDialogTable.loadData();
       // }
    };

    this.searchCustomerNoClick = function () {
        self.AddCustomerNoDialogTable.loadData();
    };

    this.AddCustomerNoComfirmClick = function () {

            var row_customer_data = self.AddCustomerNoDialogTable.getSelectedData();

            self.formData.CustomerID(row_customer_data.CustomerID);
            self.formData.CustomerMESUserID(row_customer_data.MESUserID);

            self.addFormData.CustomerNo(row_customer_data.Code);
            self.addFormData.CustomerName(row_customer_data.Name);
           // self.addFormData.SalesmanCode(row_customer_data.MesCode);
        

        self.addFormData.AccountName(row_customer_data.MesName);

        $("#AddCustomerNoDialog").modal('hide');
    };

    this.addSalesmanCodeClick = function () {
        AccountFlag = false
        self.formData.WorkNumber("");
        $("#AddSalesManDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddSalesManDialog").modal('show');
        self.AddSalesManDialogTable.loadData();
    };

    this.searchSalesManClick = function () {
        self.AddSalesManDialogTable.loadData();
    };

    this.AddSalesManComfirmClick = function (node) {

        if (!AccountFlag) {
            var row_sales_data = self.AddSalesManDialogTable.getSelectedData();
            self.formData.CustomerMESUserID(row_sales_data.MESUserID);
            self.addFormData.SalesmanCode(row_sales_data.Account);
            self.addFormData.AccountName(row_sales_data.UserName);
        } else if (AccountFlag) {
            var row_sales_data = self.AddSalesManDialogTable.getSelectedData();
            $("#AccountName").val(row_sales_data.Account);
            $("#AccountNameID").val(row_sales_data.Account)
        }


        $("#AddSalesManDialog").modal('hide');
    };

    this.addPreWarehouseClick = function () {
        self.formData.PreWarehouseCode("");
        $("#AddPreWarehouseDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddPreWarehouseDialog").modal('show');
        self.AddPreWarehouseDialogTable.loadData();
    };

    this.searchPreWarehouseClick = function () {
        self.AddPreWarehouseDialogTable.loadData();
    };
 
    this.AddPreWarehouseComfirmClick = function () {
        var row_prewarehouse_data = self.AddPreWarehouseDialogTable.getSelectedData();
        self.formData.Organization_ID(row_prewarehouse_data.OrganizationID);
        self.addFormData.PreWarehouse(row_prewarehouse_data.Code);
        $("#AddPreWarehouseDialog").modal('hide');
    };
  
    this.editCustomerNoClick = function () {
        UserFlag = false;
        self.formData.searchCustomerNo("");
        $("#EditCustomerNoDialog").modal({ backdrop: 'static', keyboard: false });
        $("#EditCustomerNoDialog").modal('show');
        self.EditCustomerNoDialogTable.loadData();
    };

    this.EditSearchCustomerNoClick = function () {
        self.EditCustomerNoDialogTable.loadData();
    };

    this.EditCustomerNoComfirmClick = function () {
        if (!UserFlag) {
            var row_customer_data = self.EditCustomerNoDialogTable.getSelectedData();
            self.editFormData.CustomerID(row_customer_data.CustomerID);
            self.editFormData.MESUserID(row_customer_data.MESUserID);
            self.editFormData.CustomerNo(row_customer_data.Code);
            self.editFormData.CustomerName(row_customer_data.Name);
           // self.editFormData.SalesmanCode(row_customer_data.MesCode);
            self.editFormData.AccountName(row_customer_data.MesName);
        } else if (UserFlag) {
            var row_customer_data = self.EditCustomerNoDialogTable.getSelectedData();
            if (!row_customer_data) {
                msg.info(fields.Prompt, fields.PleaseSelectRecord);
                return
            }
            $("#Client").val(row_customer_data.Code);
            $("#ClientID").val(row_customer_data.Code);
        }

        $("#EditCustomerNoDialog").modal('hide');
    };

    this.editSalesmanCodeClick = function () {
        self.formData.WorkNumber("");
        $("#EditSalesManDialog").modal({ backdrop: 'static', keyboard: false });
        $("#EditSalesManDialog").modal('show');
        self.EditSalesManDialogTable.loadData();
    };

    this.EditSearchSalesManClick = function () {
        self.EditSalesManDialogTable.loadData();
    }

    this.EditSalesManComfirmClick = function () {
        var row_sales_data = self.EditSalesManDialogTable.getSelectedData();
        self.editFormData.MESUserID(row_sales_data.MESUserID);
        self.editFormData.SalesmanCode(row_sales_data.Account);
        self.editFormData.AccountName(row_sales_data.UserName);
        $("#EditSalesManDialog").modal('hide');
    };

    this.editPreWarehouseClick = function () {
        self.formData.PreWarehouseCode("");
        $("#EditPreWarehouseDialog").modal({ backdrop: 'static', keyboard: false });
        $("#EditPreWarehouseDialog").modal('show');
        self.EditPreWarehouseDialogTable.loadData();
    };

    this.EditSearchPreWarehouseClick = function () {
        self.EditPreWarehouseDialogTable.loadData();
    };

    this.EditPreWarehouseComfirmClick = function () {
        var row_prewarehouse_data = self.EditPreWarehouseDialogTable.getSelectedData();
        self.editFormData.OrganizationID(row_prewarehouse_data.OrganizationID);
        self.editFormData.PreWarehouse(row_prewarehouse_data.Code);
        $("#EditPreWarehouseDialog").modal('hide');
    };

    /* 开窗获取Table
    *
    * AddEmployeeDialogTable  管制员开窗
    * AddItemNoDialogTable  料品代号开窗(新增表头,制品制程主档)
    * AddCustomerNoDialogTable    客户代号开窗(新增表头,制品制程主档)
    *
    */
    this.AddEmployeeDialogTable = new mf.Table("#AddEmployeeTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#AddEmployeePageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Account = self.formData.WorkNumber();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log("Sfc00002GetProductManagerList:")
                    console.log(data);
                    success(data);

                    //var num;
                    //for (var i = 0; i < data.rows.length; i++) {
                    //    if (data.rows[i].Account == Account.trim()) {
                    //        num = i
                    //    }
                    //}

                   // AccountID = data.rows[num].MESUserID;
                    self.formData.MESUser_ID();

                    var searchEmployeeData = {};
                    if (!self.formData.MESUser_ID()) {
                        searchEmployeeData.MFCUserID = "";
                    } else {
                        searchEmployeeData.MFCUserID = self.formData.MESUser_ID();
                    }
                    
                    console.log("searchEmployeeData:");
                    console.log(searchEmployeeData);

                    mf.ajax({
                        type: 'get',
                        url: '/MES/api/intelligentmanufacturing/sfc00002getbilltypelist',
                        data: searchEmployeeData,
                        success: function (data) {
                            console.log("sfc00002getbilltypelist:");
                            console.log(data);
                            self.formData.DocumentCategoryArray(data);

                            var save_data = {};
                            if (!self.addFormData.DocumentCategory()) {
                                save_data.DocumentID = "";
                            } else {
                                save_data.DocumentID = self.addFormData.DocumentCategory()
                            }
                            save_data.Date = self.addFormData.DocumentDate();

                            mf.ajax({
                                type: 'Get',
                                url: '/MES/api/Util/GetDocumentAutoNumber',
                                data: save_data,//{ DocumentID: self.addFormData.DocumentCategory(), Date: self.formatDate(new Date(), false) },
                                success: function (data) {
                                    self.addFormData.DocumentAutoNumberID(data.DocumentAutoNumberID),
                                    self.addFormData.OrderNum(data.AutoNumber);
                                }
                            });
                        }
                    });                                     
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        height: 300,
        columns: [
            {
                field: 'Account', title: fields.WorkNumber, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "280",
                rander: new mf.TextRander({ title: "title" })
            },          
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    var OverRate = "";

    this.AddItemNoDialogTable = new mf.Table("#AddItemNoTable", {
        uniqueId: "ItemID",
        paginationBar: new mf.PaginationBar("#AddItemNoPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = self.formData.ItemNumber();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetItemsList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        fn_onRowClick:function(data){
            self.addFormData.OverRate(data.OverRate);//超完工比率
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
             {
                 field: 'Name', title: fields.ItemDescription, align: "center", width: "180",
                 rander: new mf.TextRander({ title: "title" }),
             },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "100",
                rander: new mf.TextRander({ title: "title" })
            },
            
           {
                field: 'Unit', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () { })
           },
            {
                field: 'UnitName', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () { })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    this.AddCustomerNoDialogTable = new mf.Table("#AddCustomerNoTable", {
        uniqueId: "CustomerID",
        paginationBar: new mf.PaginationBar("#AddCustomerNoPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = self.formData.searchCustomerNo();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetCustomerList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CustomerNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.CustomerName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
             {
                 field: 'MesCode', title: fields.SalesmanCode, align: "center", width: "180",
                 rander: new mf.TextRander({ title: "title" }),
             },
            {
                field: 'MESUserID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () { })
            },
            {
                field: 'MesName', title: fields.AccountName, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    this.AddSalesManDialogTable = new mf.Table("#AddSalesManTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#AddSalesManPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Account = self.formData.WorkNumber();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [         
            {
                field: 'Account', title: fields.WorkNumber, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "280",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    this.AddPreWarehouseDialogTable = new mf.Table("#AddPreWarehouseTable", {
        uniqueId: "OrganizationID",
        paginationBar: new mf.PaginationBar("#AddPreWarehousePageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = self.formData.PreWarehouseCode();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWarehouseList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WarehouseNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title:fields.WarehouseName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'PlantCode', title: fields.AffiliatedFactory, align: "center", width: "180",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    this.EditCustomerNoDialogTable = new mf.Table("#EditCustomerNoTable", {
        uniqueId: "CustomerID",
        paginationBar: new mf.PaginationBar("#EditCustomerNoPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = self.formData.searchCustomerNo();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetCustomerList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CustomerNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.CustomerName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
             {
                 field: 'MesCode', title: fields.SalesmanCode, align: "center", width: "180",
                 rander: new mf.TextRander({ title: "title" }),
             },
            {
                field: 'MESUserID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () { })
            },
            {
                field: 'MesName', title: fields.AccountName, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    this.EditSalesManDialogTable = new mf.Table("#EditSalesManTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#EditSalesManPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Account = self.formData.WorkNumber();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Account', title: fields.WorkNumber, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "280",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    this.EditPreWarehouseDialogTable = new mf.Table("#EditPreWarehouseTable", {
        uniqueId: "OrganizationID",
        paginationBar: new mf.PaginationBar("#EditPreWarehousePageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = self.formData.PreWarehouseCode();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWarehouseList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WarehouseNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.WarehouseName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'PlantCode', title: fields.AffiliatedFactory, align: "center", width: "180",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" })
            }
        ]
    });

    //制令单明细--->制程列表
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ProcessNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID: "000017", page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },          
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            }
        ]
    });
    $("#ProcessSearch").click(function () {
        ProcessTable.loadData();
    });

    //制令单明细--->工作中心列表
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#WorkCenterNo").val();
            var ProcessID = $("#DetailTable .active").find("#ProcessID").val();

            if (!(ProcessID && ProcessID.length > 0)) {
                success([]);
                return;
            }

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: { ProcessID: ProcessID, Code: Code, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WorkCenterNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "100",
                rander: new mf.SelectRander(parameters.PT0191213000058, { title: "" })
            },
            {
                field: 'DeptName', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            }
        ]
    });
    $("#WorkCenterSearch").click(function () {
        WorkCenterTable.loadData();
    });

    //制令单明细--->辅助单位列表
    var AuxUnitTable = new mf.Table("#AuxUnitTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionAuxUnitBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#AuxUnitNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID: "00000C", page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CheckGroupCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.CheckGroupName, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });
    $("#AuxUnitSearch").click(function () {
        AuxUnitTable.loadData();
    });


    /* Table实现
    *
    * MainTable  制令单表头
    * MainTable.loadData() 制令单表头数据初始化
    * DetailTable 制令单明细
    *
    */
    MainTable = new mf.Table("#MainTable", {
        uniqueId: "FabricatedMotherID",
        deleteId: "",
        focusField: "",
        focusEditField: "",
        height: 140,
        editable: false,
        LastWidth: "140", //设置最后一列宽度
        IsSetTableWidth: true, //自动计算宽度是否开启
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            


           // searchData.MoNo = self.formData.OrderNum();
            searchData.StartItemCode = $("#StartItemCode").val();
            searchData.EndItemCode = $("#EndItemCode").val();
            searchData.StartFabMoCode = $("#StartOrderNumber").val();
            searchData.EndFabMoCode = $("#EndOrderNumber").val();
            searchData.CustCode = $("#Client").val();
            searchData.MESUserCode = $("#AccountName").val();
            searchData.ControlUser = $("#Controller").val();
            searchData.Status = $("#SStatus").val();
            searchData.MoNo = $("#OrderNum").val();


            console.log(searchData)

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabricatedMotherList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data)
                    if ($("#btn_search").attr("disabled")) {
     
                        $("#btn_search").removeAttr("disabled")
                    }
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        isFrozenColumn: true,
        operateColumWidth: "290px",
        fn_createBtn: function (rowData) {
           
            var $td = $("<td style='text-align:center;width:290px;'> ");
           
            var actionLength = actionButtons.length;

            var $btn = null;
            var functionName = null;
            var isVisiable = false;
            var LanguageName;
            
            for (var i = 0; i < actionLength; i++) {
               
                isVisiable = false;
                switch (actionButtons[i]) {
                    case "Issued":
                        if (rowData.Status.substring(5, 18) == "0201213000028") {
                            isVisiable = true;
                        }
                        break;
                    case "Void":
                        if (rowData.Status.substring(5, 18) == "0201213000028") {
                            isVisiable = true;
                        }
                        break;
                    case "Closed":
                        if (rowData.Status.substring(5,18) == "0201213000029") {
                            isVisiable = true;
                        }
                        break;
                    case "Restore":
                        if (rowData.Status.substring(5,18) == "020121300002A") {
                            isVisiable = true;
                        }
                        break;                 
                    case "ProcessRelationship":
                        isVisiable = true;
                        break;
                    case "BOM":
                        isVisiable = true;
                        break;
                    case "Resources":
                        isVisiable = true;
                        break;
                }

                if (!isVisiable) {
                    continue;
                }

                functionName = "";
                LanguageName = "";
              
                switch (actionButtons[i]) {
                    case "Issued":
                        functionName = 'onclick="model.IssuedClick(this)"';
                        LanguageName = fields.Issued;
                        break;
                    case "Void":
                        functionName = 'onclick="model.VoidClick(this)"';
                        LanguageName = fields.Invalid;
                        break;
                    case "Closed":
                        functionName = 'onclick="model.ClosedClick(this)"';
                        LanguageName = fields.Closed;
                        break;
                    case "Restore":
                        functionName = 'onclick="model.RestoreClick(this)"';
                        LanguageName = fields.Restore;
                        break;
                    case "ProcessRelationship":
                        functionName = 'onclick="model.ProcessRelationshipClick(this)"';
                        LanguageName = fields.ProcessRelationship;
                        break;
                    case "BOM":
                        functionName = 'onclick="model.BOMClick(this)"';
                        LanguageName = fields.BOM;
                        break;
                    case "Resources":
                        functionName = 'onclick="model.ResourcesClick(this)"';
                        LanguageName = fields.Resources;
                        break;                  
                }

                $btn = $('<button class="btn btn-success btn-xs" style="margin-right: 5px" title="' + LanguageName +
                    '" ' + functionName + ' >' + LanguageName + '</button> ');
                $td.append($btn);
            }

            return $td;
          
        },
        fn_onRowClick: function (row) {
            self.editFormData.DocumentDate(mf.format.Date(row.Date))
            //制令母表CL.CA 明细数据和按钮不可编辑
            if (row.Status.substring(5, 18) == "020121300002A" || row.Status.substring(5, 18) == "020121300002B") {
                
            }

            DetailTable.goForword(
                function () {
                    Detail_FabricatedMotherID = row.FabricatedMotherID;                   
                    DetailTable.loadData();
                }, function () {
                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                    window.location.reload();
                }, fields.DetailsNotSavedNeedToRefreshCanOperate);

        },
        columns: [
            {
                field: 'MoNo', title: fields.OrderNum, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'Date', title: fields.DocumentDate, align: "center", width: "120",
                rander: new mf.TextTimeDateRander({ title: true })
            },
            {
                field: 'SplitSequence', title: fields.SequenceNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true })
               
            },
            {
                field: 'Version', title: fields.Version, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: "160",
                rander: new mf.StaticValueRander({title:true})
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true })
                
            },
            
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true })
            },

            {
                field: 'Quantity', title: fields.Qty, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true })
            },       
            {
                field: 'BeforeQuantity', title: fields.NumberManufBeforeDismantling, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'UnitID', title: fields.ManufacturingUnit, align: "center", width: "140",
                rander: new mf.SelectRander(parameters.PT019121300000C)
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "120",
                rander: new mf.DateRander({ title: true })
            },


            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "120",
                rander: new mf.DateRander({title:true})
             },
            {
                field: 'OriginalMoNo', title: fields.OriginalOrderNumber, align: "center", width: "180",
                rander: new mf.StaticValueRander({ title: true })//*
            },
            {
                field: 'OrderNo', title: fields.OrderNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true })
            },

             {
                 field: 'OrderQuantity', title: fields.QuantityOrder, align: "center", width: "150",
                 rander: new mf.StaticValueRander({ title: true })
             },
            {
                field: 'CustomerCode', title: fields.CustomerNo, align: "center", width: "180",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'CustomerName', title: fields.CustomerName, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true })
            },

              {
                  field: 'Emplno', title: fields.SalesmanCode, align: "center", width: "150",
                  rander: new mf.StaticValueRander({ title: true })
              },
            {
                field: 'EmpName', title: fields.AccountName, align: "center", width: "180",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'ShipmentDate', title: fields.EstimatedShippingDate, align: "center", width: "120",
                rander: new mf.DateRander({ title: true })
            },

             {
                 field: 'OrganizationName', title: fields.PreWarehouse, align: "center", width: "150",
                 rander: new mf.StaticValueRander({ title: true })
             },
            {
                field: 'Status', title: fields.OrderSingleState, align: "center", width: "150",
                rander: new mf.SelectRander(parameters.PT0191213000004)
            },
            {
                field: 'StorageQuantity', title: fields.OrderCompletion, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true })
            },
             {
                 field: 'OverRate', title: fields.SuperCompletionRatio, align: "center", width: "150",
                 rander: new mf.StaticValueRander({ title: true })
             },
            {
                field: 'Source', title: fields.DocumentSource, align: "center", width: "150",
                rander: new mf.SelectRander(parameters.PT019121300001F)
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.TextRander({title: "title"})
            },
            {
                field: 'ControlUserName', title: fields.Controller, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", 
                rander: new mf.TextTimeRander({ title: true })
            }
        ]
    });

    this.MainTable = MainTable;




    //明细
    DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "FabMoProcessID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        height: window.innerHeight - 390,
        paginationBar: new mf.PaginationBar("#DetailPageBar"),
        isFrozenColumn: true,
        isRealDelete: true,
        operateColumWidth: "268px",
        LastWidth: "140", //设置最后一列宽度
        IsSetTableWidth: true, //自动计算宽度是否开启
        fn_createBtn: function (rowData) {
            var IsEnableOperation = rowData.IsEnableOperation;
     
            if (!IsEnableOperation) {
                var $BtnProcessProcess = $('<button style="margin-right:5px;" id="ProcessProcess" class="operation btn btn-success btn-xs hide"  onclick="model.ProcessProcessClick(this)" disabled="disabled">' + fields.ProcessProcess + '</button>');
            } else {
                var $BtnProcessProcess = $('<button style="margin-right:5px;" id="ProcessProcess" class="operation btn btn-success btn-xs"  onclick="model.ProcessProcessClick(this)">' + fields.ProcessProcess + '</button>');
            }
            var $td = $('<td style="width:268px;text-align:center;">');
            var $BtnProcessMaterials = $('<button style="margin-right:5px;" id="ProcessMaterials" class="operation btn btn-success btn-xs" onclick="model.ProcessMaterialsClick(this)">' + fields.ProcessMaterials + '</button>');
            var $BtnProcessResources = $('<button style="margin-right:5px;" id="ProcessResources" class="operation btn btn-success btn-xs" onclick="model.ProcessResourcesClick(this)">' + fields.ProcessResources + '</button>');
            
            var $BtnDismantlingAlternative = null;
            if (!(rowData.OriginalFabMoProcessID)) {
                $BtnDismantlingAlternative = $('<button style="margin-right:5px;" id="DismantlingAlternative" class="operation btn btn-success btn-xs" onclick="model.DismantlingAlternativeClick(this)">' + fields.DismantlingAlternative + '</button>');
            }
               

            $BtnProcessMaterials.attr("title", fields.ProcessMaterials);
            $BtnProcessProcess.attr("title", fields.ProcessProcess);
            $BtnProcessResources.attr("title", fields.ProcessResources); 
            //$BtnDismantlingAlternative.attr("title", fields.DismantlingAlternative);

            $td.append($BtnProcessMaterials);
            $td.append($BtnProcessResources);
            $td.append($BtnProcessProcess);           
            $td.append($BtnDismantlingAlternative);
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var $BtnProcessMaterials = $row.find("#ProcessMaterials");
            var $BtnProcessProcess = $row.find("#ProcessProcess");
            var $BtnProcessResources = $row.find("#ProcessResources");
            var $BtnDismantlingAlternative = $row.find("#DismantlingAlternative");
            if (isAdding) {
                $BtnProcessMaterials.hide();
                $BtnProcessProcess.hide();
                $BtnProcessResources.hide();
                $BtnDismantlingAlternative.hide();
            }
            else {
                $BtnProcessMaterials.show();
                $BtnProcessProcess.show();
                $BtnProcessResources.show();
                $BtnDismantlingAlternative.show();
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var AuxUnit = $row.find("#Unit").val();
            var AuxUnitRatio = $row.find("#UnitRate").val();
            var StartDateVal = new Date($row.find("#StartDate").val());
            var FinishDateVal = new Date($row.find("#FinishDate").val());

            if (AuxUnit && AuxUnit.length > 0) {
                if (!(AuxUnitRatio && AuxUnitRatio.length > 0)) {
                    return fields.AuxUnitRatioIsNull;
                }
            }

            if (StartDateVal != "" && FinishDateVal != "" && StartDateVal > FinishDateVal) {
                return fields.StartDateCanNotBeGreaterThanTheExpectedCompletionDate;               
            }

            return null;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabricatedMotherID = Detail_FabricatedMotherID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabricatedProcessList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data)

                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) {

            for (var i = 0; i < saveData.inserted.length; i++) {
               
                saveData.inserted[i].FabricatedMotherID = Detail_FabricatedMotherID;;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002SaveFabricatedProcess',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });

        },
        fn_realDelete: function (rowData) {
            var deleteDetailData = {};
            deleteDetailData.FabMoProcessID = rowData.FabMoProcessID;
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabMoProcessDelete',
                data: JSON.stringify(deleteDetailData),
                success: function (data) {
                    if (data.status == "200") {
                        msg.success(fields.Prompt, data.msg, function () {
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            DetailTable.loadData();
                        });
                    }
                    else {
                        msg.error(fields.Prompt, data.msg);
                    }
                }
            });
        },
        columns: [
             {
                 field: 'FabricatedMotherID', title: "", visible: false,
                 rander: new mf.TextRander({title:true})

             },           
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "120", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title" }))

            },
             {
                 field: 'Status', title: fields.ProcessState, align: "center", width: "100",
                 rander: new mf.DontSelectRander(parameters.PT0191213000004)
             },
               {
                   field: 'ItemCode', title: "", visible: false,
                   rander: new mf.TextRander()
               },
              {
                  field: 'ItemName', title: "", visible: false,
                  rander: new mf.TextRander()
              },
               {
                   field: 'MoNo', title: "", visible: false,
                   rander: new mf.TextRander()
               },
   
             {
                 field: 'Specification', title: "", visible: false,
                 rander: new mf.TextRander()
             },
             {
                 field: 'ProcessID', title: "", visible: false,
                 rander: new mf.TextRander()
             },
            {
                field: 'ProcessIsDefault', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "160", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                      "#ProcessDialog",
                      "#ProcessConfirmBtn",
                      ProcessTable,
                      new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                      {
                          btnTitle: "", btnClass: "btn btn-success btn-xs",
                          searchID: [{ value: "#ProcessNo", text: "" }]
                      }
                  )),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ProcessID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ProcessIsDefault", e.data.IsDefault);
                    table.setEditingColumnValue($row, "ProcessCode", e.data.Code);
                    table.setEditingColumnValue($row, "ProcessName", e.data.Name);
                    table.setEditingColumnValue($row, "WorkCenterID", "");
                    table.setEditingColumnValue($row, "WorkCenterCode", "");
                    table.setEditingColumnValue($row, "WorkCenterName", "");
                    table.setEditingColumnValue($row, "InoutMark", "");
                    table.setEditingColumnValue($row, "DepartmentNoOrManufacturersNo", "");
                    table.setEditingColumnValue($row, "IsEnableOperation", "");
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessIsNull)
                ]
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(
                     new mf.TextRander({ size: 13, disabled: true, title: "" }))
            },
             {
                 field: 'WorkCenterID', title: "", visible: false,
                 rander: new mf.TextRander()
             },
           {
               field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", width: "160", require: true,
               rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                   "#WorkCenterDialog",
                   "#WorkCenterConfirmBtn",
                   WorkCenterTable,
                   new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                   {
                       btnTitle: "", btnClass: "btn btn-success btn-xs",
                       searchID: [{ value: "#WorkCenterNo", text: "" }]
                   }
               )),
               fn_onEditingChange: function (table, $row, $cell, field, e) {
                   var inoutMark = e.data.InoutMark;
                   var ProcessIsDefault = $row.find("#ProcessIsDefault").val();
                   var IsOperation = "";
                   for (var i = 0; i < parameters.PT0191213000058.length; i++) {
                       if (inoutMark == parameters.PT0191213000058[i].value) {
                           inoutMark = parameters.PT0191213000058[i].value;
                           break;
                       }
                   }

                   if (e.data.InoutMark.substring(5, e.data.InoutMark.length) == "020121300002E") {
                       IsOperation = ("true" == ProcessIsDefault) ? true : false;
                   }
                   else if (e.data.InoutMark.substring(5, e.data.InoutMark.length) == "020121300002F") {
                       IsOperation = false;
                   }

                   table.setEditingColumnValue($row, "WorkCenterID", e.data.WorkCenterID);
                   table.setEditingColumnValue($row, "WorkCenterCode", e.data.Code);
                   table.setEditingColumnValue($row, "WorkCenterName", e.data.Name);
                   table.setEditingColumnValue($row, "OrganizationName", e.data.DeptName);
                   table.setEditingColumnValue($row, "ResourceReport", e.data.ResourceReport);
                   table.setEditingColumnValue($row, "InoutMark", inoutMark);
                   table.setEditingColumnValue($row, "IsEnableOperation", IsOperation);
               },
               checkers: [
                   new mf.TextNotEmptyChecker(fields.WorkCenterIsNull)
               ]
           },
            {
                field: 'WorkCenterName', title: fields.WorkCenterDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: true, title: "" }))
            },
              {
                  field: 'InoutMark', title: fields.InoutMark, align: "center", width: "130",
                  rander: new mf.WirteOnceOnlyRander(
                  new mf.AutoSelectRander("value", "text",  parameters.PT0191213000058,
                      { title: true , disabled: true, noSearchSelectedText: "" }))
              },          
            {
                field: 'OrganizationName', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: true, title: "" }))
            },       
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "110", require: true,
                rander: new mf.DateRander({ size: 10, title: "title", readonly: 'readonly' }),
                checkers: [
                  new mf.TextNotEmptyChecker(fields.StartDateIsNull)
                ]
            },
             {
                 field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "110", require: true,
                 rander: new mf.DateRander({ size: 10, title: "title", readonly: 'readonly' }),
                 checkers: [
                  new mf.TextNotEmptyChecker(fields.FinishDateIsNull)
                 ]
             },
              {
                  field: 'IsEnableOperation', title: fields.IsEnableProcess, align: "center", width: "80",
                  rander: new mf.AutoSelectRander("value", "text", booleanArray,
                      { title: true, IsBoolean: true, disabled: true, noSearchSelectedText: "" })
              },

              {
                  field: 'ResourceReport', title: fields.ResourceReporting, align: "center", width: "100",
                  rander: new mf.AutoSelectRander("value", "text", booleanArray,
                     { title: true, IsBoolean: true, disabled: true, noSearchSelectedText: "" })
                  //rander: new mf.SelectRander([
                  //    { value: true, text: "Y" },
                  //    { value: false, text: "N" }])
              },
             {
                 field: 'Quantity', title: fields.Qty, align: "center", width: "120",
                 rander: new mf.TextRander({ size: 10, title: "title", disabled: true })
             },

               {
                   field: 'AfterSeparateQuantity', title: fields.AfterDismantling, align: "center", width: "120",
                   rander: new mf.TextRander({ size: 10, title: "title", disabled: true })
               },
            {
                field: 'PreProQuantity', title: fields.PreTransferQty, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, title: "title", disabled: true })
            },
             {
                 field: 'FinProQuantity', title: fields.FinProQty, align: "center", width: "120",
                 rander: new mf.TextRander({ size: 10, title: "title", disabled: true }),
                 defaultValue:0
             },

                {
                    field: 'OutProQuantity', title: fields.Turnover, align: "center", width: "120",
                    rander: new mf.TextRander({ size: 10, title: "title", disabled: true }),
                    defaultValue: 0
                },
             {
                 field: 'DifferenceQuantity', title: fields.DifferenceQty, align: "center", width: "120",
                 rander: new mf.TextRander({ size: 10, title: "title", disabled: true }),
                 defaultValue: 0
             },

               {
                   field: 'ScrappedQuantity', title: fields.ScrappedQty, align: "center", width: "120",
                   rander: new mf.TextRander({ size: 10, title: "title", disabled: true }),
                   defaultValue: 0
               },
            
                {
                    field: 'UnitID', title: "", visible: false,
                    rander: new mf.TextRander()
                },
             {
                 field: 'Unit', title: fields.AuxiliaryUnit, align: "center", width: "150",
                 rander: new mf.FKRander(
                     "#AuxUnitDialog",
                     "#AuxUnitConfirmBtn",
                     AuxUnitTable,
                     new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                     {
                         btnTitle: "", btnClass: "btn btn-success btn-xs",
                         searchID: [{ value: "#AuxUnitNo", text: "" }]
                     }
                 ),
                 fn_onEditingChange: function (table, $row, $cell, field, e) {
                     table.setEditingColumnValue($row, "UnitID", e.data.ParameterID);
                     table.setEditingColumnValue($row, "Unit", e.data.Code);
                 }
             },
              {
                  field: 'UnitRate', title: fields.UnitRate, align: "center", width: "100", defaultValue: 1,
                  rander: new mf.TextRander({ size: 10, title: "" }),
                  checkers: [
                      new mf.IsNonNegativeNumberChecker(fields.AuxUnitRatioIsNonNegativeNumber),
                      new mf.IsOverDecimalChecker(fields.AuxUnitRatioIsMaxInteger, fields.AuxUnitRatioIsMaxDecimal,
                          fields.AuxUnitRatioIsNonNegativeNumber, 6, 4)
                  ],
                  fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                      $cell.val(mf.deal.ValueCheckNumber($cell.val(), 1));
                  }
              },

                   {
                       field: 'StandardTime', title: fields.StandardWorkingSeconds, align: "center", width: "100",
                       rander: new mf.TextRander({ size: 7, title: "", maxLength: 20 }),
                       checkers: [
                           new mf.IsNonNegativeNumberChecker(fields.StandardWorkingSecondsIsError)
                       ],
                       fn_onEditingChange: function (table, $row, $cell, field, e) {
                           var value = Number($cell.val());
                           if (isNaN(value)) {
                               return;
                           }
                           table.setEditingColumnValue($row, "StandardTimeStr", mf.deal.HourConverter(value));
                       }
                   },

              {
                  field: 'StandardTimeStr', title: fields.StandardWorkingHours, align: "center", width: "100",
                  rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: true }),
              },
            {
                field: 'PrepareTime', title: fields.PrepareWorkSeconds, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.PrepareWorkSecondsIsError)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var value = Number($cell.val());
                    if (isNaN(value)) {
                        return;
                    }
                    table.setEditingColumnValue($row, "PrepareTimeStr", mf.deal.HourConverter(value));
                }
            },
             {
                 field: 'PrepareTimeStr', title: fields.PrepareWorkHours, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: true })
            },                             
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 }),
            },
          
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", 
                rander: new mf.TextTimeRander(),
            }
        ]
    });
     
    
    /* Toolbar按钮事件
    *
    * searchClick  查询表头
    * refreshClick 刷新表头
    * addClick  添加表头
    * editClick 编辑表头
    * deleteClick  删除表头
    * exportClick  导出数据
    * importClick  导入数据
    *
    */
 
    //导入
    this.importClick = function () {
        $("#Import_Date").val(mf.format.Date(new Date()));
        $("#import_StartWorkOrderNum").val("");
        $("#import_EndWorkOrderNum").val("");
        $("#import_Client").val("");
        // if (mf.systemID == "10042") {

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');


        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");
        console.log()
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


            if (!(document.getElementById('BtnFile').files[0])) {
                msg.info(fields.info, fields.PleaseSelectFile)
                return;
            }

            var importDate = $("#Import_Date").val();
            var importStartNo = $("#import_StartWorkOrderNum").val();
            var importEndNo = $("#import_EndWorkOrderNum").val();
            var importClient = $("#import_Client").val();

            if (!importDate) {
                msg.info(fields.Prompt, fields.DateIsNull);
                return
            }
            if (!importStartNo) {
                msg.info(fields.Prompt, fields.StartWorkOrderNumIsNull);
                return
            }
            if (!importEndNo) {
                msg.info(fields.Prompt, fields.EndWorkOrderNumIsNull);
                return
            }

            var w = window.innerWidth;
            var h = window.innerHeight;
            var h2 = h / 2;
            // if (options.type.toLowerCase() == "post") {
            $("body").append("<div id='ajax_tip' style='z-index: 99999; opacity: 0.5; background-color: #000; width:" + w + "px;height:" + h + "px;position: absolute;top: 0; left: 0; text-align:center;'>" +
            "<div style='margin-top:" + h2 + "px;'><span style='font-size:22px;'>Loading..</span></div></div>");
            // }


            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);
            formdata.append("StartMoNo", importStartNo);
            formdata.append("EndMoNo", importEndNo);
            formdata.append("Cust", importClient);
            formdata.append("Date", importDate);
            console.log(importDate + "+" + importStartNo + "+" + importEndNo + "+" + importClient)
            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Sfc00002ImportV2',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    $("#ajax_tip").remove()
                    if (ret.Isreason) {
                        msg.infoCall(fields.info, ret.msg, function () {
                            window.location.href = mf.domain + '/MES/api/Util/ImportDownload?Token=' + token + '&Name=' + ret.FileName;
                            $('#ImportDialog').modal('hide');
                            MainTable.loadData();
                        });
                    }
                    else {
                        msg.success(fields.info, ret.msg, function () {
                            $('#ImportDialog').modal('hide');
                            MainTable.loadData();
                        });
                    }
                }
            });
        });
        //   }
    };

    this.ImportClear = function () {
        $("#Import_Date").val("");
        $("#import_StartWorkOrderNum").val("");
        $("#import_EndWorkOrderNum").val("");
        $("#import_Client").val("");
    }

    this.searchClick = function () {
        $("#btn_search").attr({ disabled: "disabled" });
        var SStatus = $("#Status").find(".i-checks");
        
        var StatusStr = "";
        for (var i = 0; i < parameters.PT0191213000004.length; i++) {
            if (SStatus.eq(i).is(':checked')) {
                //StatusStr += parameters.PT0191213000004[i].value + ",";
                StatusStr += SStatus.eq(i).val() + ",";
            }
        }
        if (StatusStr.length > 0) {
            $("#SStatus").val(StatusStr.substring(0, StatusStr.length - 1));
        }
        else {
            $("#SStatus").val("");
        }

      //  console.log($("#SStatus").val())
   
        DetailTable.goForword(
          function () {
              MainTable.loadData();
              DetailTable.clean();
          },
          function () {
              MainTable.loadData();
              DetailTable.clean();
          });
    };

    

    this.refreshClick = function () {
        DetailTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };
    var stopFlag = true;

    this.addClick = function () {
        DetailTable.goForword(function () {
            $("#btn_add").attr({disabled:"disabled"})
           // sendOneFlag = true;
            //clickFalse = true;

            //获取登录人员,是生管就预设在管制员输入框
            mf.ajax({
                type: 'Get',
                async: false,
                url: "/MES/api/Util/GetUser",
                data: {},
                success: function (data) {
                    console.log(data)
                    if (data) {
                        console.log(111)
                        self.addFormData.Controller(data.Account);
                        self.formData.MESUser_ID(data.MESUserID)
                    } else {
                        self.addFormData.Controller("");
                        self.formData.MESUser_ID("")
                    }
                    // Account = data.Account;
                    // userName = data.UserName;
                    // formData.MaintenanceUserID(data.MESUserID)
                }
            })

           // self.addFormData.Controller();
            self.addFormData.DocumentCategory("");
            //self.formData.MESUser_ID("");
            self.formData.DocumentCategoryArray([]);
            //self.addFormData.DocumentNumber("");
            self.addFormData.DocumentSource("");
            self.addFormData.OrderNum("");
            self.addFormData.SequenceNo("0");
            self.addFormData.Version("0");
            self.addFormData.LotNo("");
            self.addFormData.ItemNo("");
            self.addFormData.ItemDescription("");
            self.addFormData.ItemSpecification("");
            self.addFormData.Qty("");
            self.addFormData.OverRate();
            self.addFormData.OrderCompletion("0");
            self.addFormData.NumberManufBeforeDismantling("0");
            self.addFormData.ManufacturingUnit("");
            self.addFormData.EstimatedStartDate(DataValue);
            self.addFormData.EstimatedFinishDate(DataValue);
            self.addFormData.OrderNo("");
            self.addFormData.QuantityOrder(0);
            self.addFormData.CustomerNo("");
            self.addFormData.CustomerName("");
            self.addFormData.SalesmanCode("");
            self.addFormData.AccountName("");
            self.addFormData.EstimatedShippingDate(DataValue);
            self.addFormData.PreWarehouse("");
            self.addFormData.OrderSingleState("");
            self.addFormData.Remark("");
            self.formData.CustomerID("");
            self.formData.CustomerMESUserID("");
            self.formData.AddUnit("");
            $("#AddLotNoID").attr("disabled", false);
            $("#IsToLotNo").html("");
            $("#AddMainOrderDialog").modal({ backdrop: 'static', keyboard: false });
            $("#AddMainOrderDialog").modal('show');

            $("#AddMainOrderDialog").on("hidden.bs.modal", function () {
                $("#btn_add").removeAttr("disabled")
            })

           // DetailTable.clean();
            self.AddEmployeeDialogTable.loadData();
            //self.checkIsOrNoClick();

        }, function () {         
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, fields.DetailsNotSavedNeedToRefreshCanOperate);

        $("#ItemNos").change(function () {
            console.log(1)
        })
    };

    //新增--异动拆單前製造數量
    this.KeyQty = function (obj) {
        self.addFormData.NumberManufBeforeDismantling(obj.value);
    }

    this.changeItemNo = function () {
        console.log(222)
    }

    this.SaveMainOrderDataClick = function () {

      //  if (clickFalse) {

       //     clickFalse = false;
        var DocumentDate = $("#DocumentDate").val()

            if (self.formData.DocumentCategoryArray().length <= 0) {
                msg.info(fields.Prompt, fields.DocumentCategoryIsNull);
                return false;
            }
            if (!DocumentDate && DocumentDate.length <= 0) {
                msg.info(fields.Prompt, fields.DocumentDateIsNull);
                return false;
            }

            if (self.addFormData.OrderNum().length <= 0) {
                msg.info(fields.Prompt, fields.MoNoIsNull);
                return false;
            }

            if (self.addFormData.ItemNo().length <= 0) {
                msg.info(fields.Prompt, fields.ItemCodeIsRequiredEntry);
                return false;
            }


            if ($("#IsToLotNo").html() == "*") {
                if (self.addFormData.LotNo().length <= 0) {
                    msg.info(fields.Prompt, fields.TheLotIsTheEntry);
                    return false;
                }
            }

            if (self.addFormData.Qty().length <= 0) {
                msg.info(fields.Prompt, fields.NumberManufacturedItemsIsRequired);
                return false;
            }

            if (Number(self.addFormData.OverRate()) < 0) {
                msg.info(fields.Prompt, fields.OverrunRatioIsGreaterThanOrEqualToZero);
                return false;
            }

            if (self.addFormData.EstimatedStartDate().length <= 0) {
                msg.info(fields.Prompt, fields.ExpectedStartDateIsRequiredEntry);
                return false;
            }

            if (self.addFormData.EstimatedFinishDate().length <= 0) {
                msg.info(fields.Prompt, fields.ExpectedCompletionDateIsRequiredEntry);
                return false;
            }

            if (Number(self.addFormData.QuantityOrder()) < 0) {
                msg.info(fields.Prompt, fields.NumberOfOrdersIsGreaterThanOrEqualToZero);
                return false;
            }

            if (self.addFormData.EstimatedShippingDate().length <= 0) {
                msg.info(fields.Prompt, fields.EstimatedShippingDateIsRequiredEntry);
                return false;
            }

            //预计开工日和预计完工日为必输栏位
            if (self.addFormData.EstimatedStartDate().length <= 0 || $("#AddEstimatedStartDate").val().length <= 0) {
                msg.info(fields.Prompt, fields.StartDateIsNull);
                return false;
            }
            if (self.addFormData.EstimatedFinishDate().length <= 0 || $("#AddEstimatedFinishDate").val().length <= 0) {
                msg.info(fields.Prompt, fields.FinishDateIsNull);
                return false;
            }
            

            var saveData = {};
            saveData.MoNo = self.addFormData.OrderNum();//製令單號
            saveData.Version = self.addFormData.Version();//版本
            saveData.SplitSequence = self.addFormData.SequenceNo();//拆單序號
            saveData.BatchNumber = self.addFormData.LotNo();//批號
            saveData.ItemID = self.formData.Item_ID();//料品流水号
            saveData.Quantity = self.addFormData.Qty();//製造數量
            saveData.ClassCode = self.addFormData.DocumentCategory(); //单据类别
            saveData.UnitID = self.formData.AddUnit();//制造单位流水号
            saveData.StartDate = self.addFormData.EstimatedStartDate();//預計開工日
            saveData.FinishDate = self.addFormData.EstimatedFinishDate();//預計完工日
            saveData.OrderNo = self.addFormData.OrderNo();//訂單號碼
            saveData.OrderQuantity = self.addFormData.QuantityOrder();//訂單數量
            saveData.CustomerID = self.formData.CustomerID();//客戶流水号
            saveData.MESUserID = self.formData.CustomerMESUserID();//業務員流水号
            saveData.ShipmentDate = self.addFormData.EstimatedShippingDate();//預計出貨日
            saveData.OrganizationID = self.formData.Organization_ID();//預入倉庫流水号
            saveData.Status = self.addFormData.OrderSingleState();//製令單狀態
            saveData.OverRate = self.addFormData.OverRate();//超完工比率%
            saveData.Source = self.addFormData.DocumentSource();//單據來源
            saveData.Date = self.addFormData.DocumentDate();
            saveData.Comments = self.addFormData.Remark();//备注或描述
            saveData.DocumentAutoNumberID = self.addFormData.DocumentAutoNumberID()
            saveData.ControlUserID = self.formData.MESUser_ID();

            saveData.DocumentID = self.addFormData.DocumentCategory();
            saveData.AutoNumberRecordID = self.addFormData.AutoNumberRecordID();
            //save.BatchNumber = self.addFormData.LotNo();
            //  if (sendOneFlag) {
            //   sendOneFlag = false;
        //   console.log(1)
            console.log(saveData)
           // if (sendOneFlag) {
             //  sendOneFlag = false;
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentManufacturing/Sfc00002AddFabricatedMother',
                    data: JSON.stringify(saveData),
                    success: function (data) {

                        if (data.status == "200") {
                            //setTimeout(function () {
                            //    msg.info(fields.Prompt, data.msg);

                            //    $(".sa-button-container .confirm").click(function () {
                            //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            //        window.location.reload()
                            //        stopFlag = true;
                            //    })
                            //},100)


                            msg.success(fields.Prompt, data.msg, function () {
                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                window.location.reload()
                                //  MainTable.loadData();
                                //    clickFalse = true;
                                //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                //window.location.reload()

                            });

                            //msg.infoCall(fields.Prompt, data.msg, function () {
                            //    sendOneFlag = true;




                            //})

                        } else {
                            msg.error(fields.Prompt, data.msg);
                            // sendOneFlag = true;
                        }
                        // $("#AddMainOrderDialog").modal('hide');
                    }
                });
            



      //  } else {
            
       //     $("#AddMainOrderDialog").modal('hide');
      //  }
    }
    this.editClick = function () {
        var row = MainTable.getSelectedData();

        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        DetailTable.goForword(function () {
            if (row.Status.substring(5, 18) == "020121300002A" || row.Status.substring(5, 18) == "020121300002B") {// || row.Status.substring(5, 18) == "0201213000029"
                msg.info(fields.Prompt, fields.CanOnlyModifyTheOrdersOrIssuedASingleOrder);
                return false;
            }

            self.editFormData.DocumentSource(row.Source);
            self.editFormData.OrderNum(row.MoNo);
            self.editFormData.SequenceNo(row.SplitSequence);
            self.editFormData.Version(row.Version);
            self.editFormData.LotNo(row.BatchNumber);
            self.editFormData.ItemNo(row.ItemCode);
            self.editFormData.ItemDescription(row.ItemName);
            self.editFormData.ItemSpecification(row.Specification);
            self.editFormData.Qty(row.Quantity);
            self.editFormData.OverRate(row.OverRate);
            self.editFormData.OrderCompletion(row.StorageQuantity);
            self.editFormData.NumberManufBeforeDismantling(row.Quantity);
            self.editFormData.ManufacturingUnit(row.UnitID);
            self.editFormData.EstimatedStartDate(mf.format.Date(row.StartDate));
            self.editFormData.EstimatedFinishDate(mf.format.Date(row.FinishDate));
            self.editFormData.OrderNo(row.OrderNo);
            self.editFormData.QuantityOrder(row.OrderQuantity);
            self.editFormData.CustomerNo(row.CustomerCode);
            self.editFormData.CustomerName(row.CustomerName);
            self.editFormData.SalesmanCode(row.Emplno);
            self.editFormData.AccountName(row.EmpName);
            self.editFormData.EstimatedShippingDate(mf.format.Date(row.ShipmentDate));
            self.editFormData.PreWarehouse(row.OrganizationName);
            self.editFormData.OrderSingleState(row.Status);
            self.editFormData.Remark(row.Comments);

            self.editFormData.CustomerID(row.CustomerID);
            self.editFormData.FabricatedMotherID(row.FabricatedMotherID);
            self.editFormData.ItemID(row.ItemID);
            self.editFormData.MESUserID(row.MESUserID);
            self.editFormData.OrganizationID(row.OrganizationID);

            $("#EditMainOrderDialog").modal({ backdrop: 'static', keyboard: false });
            $("#EditMainOrderDialog").modal('show');
            DetailTable.clean();

        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, fields.DetailsNotSavedNeedToRefreshCanOperate);
        
    };
    //编辑--异动拆單前製造數量(NumberManufBeforeDismantling)
    this.EditKeyQty = function (obj) {
        self.editFormData.NumberManufBeforeDismantling(obj.value);
    }

    this.EditSaveMainOrderDataClick = function () {

        if (Number(self.editFormData.OverRate()) < 0) {
            msg.info(fields.Prompt, fields.OverrunRatioIsGreaterThanOrEqualToZero);
            return false;
        }

        if (self.editFormData.EstimatedStartDate().length <= 0) {
            msg.info(fields.Prompt, fields.ExpectedStartDateIsRequiredEntry);
            return false;
        }

        if (self.editFormData.EstimatedFinishDate().length <= 0) {
            msg.info(fields.Prompt, fields.ExpectedCompletionDateIsRequiredEntry);
            return false;
        }

        if (self.editFormData.EstimatedShippingDate().length <= 0) {
            msg.info(fields.Prompt, fields.EstimatedShippingDateIsRequiredEntry);
            return false;
        }

        if (Number(self.editFormData.QuantityOrder()) < 0) {
            msg.info(fields.Prompt, fields.NumberOfOrdersIsGreaterThanOrEqualToZero);
            return false;
        }

        var saveEditData = {};
        saveEditData.MoNo = self.editFormData.OrderNum();//製令單號
        saveEditData.Version = self.editFormData.Version();//版本
        saveEditData.SplitSequence = self.editFormData.SequenceNo();//拆單序號
        saveEditData.BatchNumber = self.editFormData.LotNo();//批號
        saveEditData.ItemID = self.editFormData.ItemID();//料品流水号
        saveEditData.Quantity = self.editFormData.Qty();//製造數量
        saveEditData.UnitID = self.editFormData.ManufacturingUnit();//制造单位流水号
        saveEditData.StartDate = self.editFormData.EstimatedStartDate();//預計開工日
        saveEditData.FinishDate = self.editFormData.EstimatedFinishDate();//預計完工日
        saveEditData.OrderNo = self.editFormData.OrderNo();//訂單號碼
        saveEditData.OrderQuantity = self.editFormData.QuantityOrder();//訂單數量
        saveEditData.CustomerID = self.editFormData.CustomerID();//客戶流水号
        saveEditData.MESUserID = self.editFormData.MESUserID();//業務員流水号
        saveEditData.ShipmentDate = self.editFormData.EstimatedShippingDate();//預計出貨日
        saveEditData.OrganizationID = self.editFormData.OrganizationID();//預入倉庫流水号
        saveEditData.Status = self.editFormData.OrderSingleState();//製令單狀態
        saveEditData.OverRate = self.editFormData.OverRate();//超完工比率%
        saveEditData.Source = self.editFormData.DocumentSource();//單據來源
        saveEditData.Date = self.editFormData.DocumentDate();
        saveEditData.Comments = self.editFormData.Remark();//备注或描述
        saveEditData.FabricatedMotherID = self.editFormData.FabricatedMotherID();//制令母表流水号

        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002UpdateFabricatedMother',
            data: JSON.stringify(saveEditData),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };

    //this.deleteClick = function () {
    //    var row = MainTable.getSelectedData();
    //    if (!row) {
    //        msg.info(fields.Prompt, fields.PleaseSelectRecord);
    //        return;
    //    }      
    //    DetailTable.goForword(function () {
    //        var deleteData = {};
    //        deleteData.FabricatedMotherID = row.FabricatedMotherID;
    //        msg.warning(fields.Prompt, fields.WhetherToDelete, function () {
    //            mf.ajax({
    //                type: 'Post',
    //                url: '/MES/api/IntelligentManufacturing/Sfc00002DeleteFabricatedMother',
    //                data: JSON.stringify(deleteData),
    //                success: function (data) {
    //                    if (data.status == "200") {
    //                        msg.success(fields.Prompt, data.msg, function () {
    //                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    //                            window.location.reload();
    //                        });
    //                    }
    //                    else {
    //                        msg.error(fields.Prompt, data.msg);
    //                    }
    //                }
    //            });
    //        })
    //        DetailTable.clean();
    //    }, function () {
    //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    //        window.location.reload();
    //    },
    //    fields.DetailsNotSavedNeedToRefreshCanOperate);
    //};

    this.addDetailClick = function () {
        var row = MainTable.getSelectedData();

        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        DetailTable.addRow();

        //var $trs = $("#DetailTable").find("tr");
        //var $trlength = $trs.length;
        //if ($trlength > 1) {
        //    var AddRowIndex = $("#DetailTable").find("tr").last().data("index");
        //    var newIndex = Number(AddRowIndex + 1);
        //    var sequence = Number(newIndex * 10);
        //    $("#Sequence").val(sequence);
        //}
        //else {
        //    $("#Sequence").val(10);
        //}

        var $trs = $("#DetailTable").find("tr");
        var $trlength = $trs.length;
        if ($trlength > 1) {
            var array = $.map(DetailTable.getAllRowData(),
                                function (item, index) {
                                    return Number(item.Sequence);
                                });
            var sequence = Math.max.apply(Math, array) + 10;
            $("#Sequence").val(sequence);
        }
        else {
            $("#Sequence").val(10);
        }
    }

    this.editDetailClick = function () {
       // var row = MainTable.getSelectedData();
        var row = DetailTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
       
        //if (!DetailTable) {
        //    msg.info(fields.Prompt, fields.PleaseSelectRecord);
        //    return;
        //}

            
        DetailTable.editRow();
    }

    //制令制程删除
    this.deleteDetailClick = function () {
      //  var row = MainTable.getSelectedData();
        //var rowDetail = DetailTable.getSelectedData();
        //console.log(rowDetail)
        ////if (!row) {
        ////    msg.info(fields.Prompt, fields.PleaseSelectRecord);
        ////    return;
        ////}
        //if (!rowDetail) {
        //    msg.info(fields.Prompt, fields.PleaseSelectRecord);
        //    return;
        //}
        DetailTable.deleteRow();
 
    };

    this.saveDetailClick = function () {
        var row = MainTable.getSelectedData();
        //var row = DetailTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        if (!DetailTable)
            return;
        $("#btn_saveDetail").attr({ disabled: "disabled" });
        DetailTable.save(null, null, true);
        setTimeout(function () { $("#btn_saveDetail").removeAttr("disabled") }, 500);
        
    }

    
 
  


    /* 其他事件
    *
    *  onchangeDocumentCategory
    *  IssuedClick 核发
    *  VoidClick 作废
    *  Closed  结案
    *  Restore  还原
    */

    this.IssuedClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        var IssuedData = {};
        IssuedData.FabricatedMotherID = row.FabricatedMotherID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002Approve',
            data: JSON.stringify(IssuedData),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        DetailTable.clean();
                        MainTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };
    this.VoidClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        var IssuedData = {};
        IssuedData.FabricatedMotherID = row.FabricatedMotherID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002Invalid',
            data: JSON.stringify(IssuedData),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        DetailTable.clean();
                        MainTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };
    this.ClosedClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        var IssuedData = {};
        IssuedData.FabricatedMotherID = row.FabricatedMotherID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002Closed',
            data: JSON.stringify(IssuedData),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        DetailTable.clean();
                        MainTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };
    this.RestoreClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        var IssuedData = {};
        IssuedData.FabricatedMotherID = row.FabricatedMotherID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002Reduction',
            data: JSON.stringify(IssuedData),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        DetailTable.clean();
                        MainTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };
    this.ProcessRelationshipClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        MainIndex = Number($row.find("td").eq(0).text());
        itemId = row.ItemID;

        if (!(itemId && itemId.length > 0)) {
            console.log("itemId is " + itemId);
            return;
        };


        DetailTable.goForword(function () {
            //var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: row
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002ProcessRelationship",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002ProcessRelationship';
            flag = true;
        }, null, fields.Isleave);
    };

    this.BOMClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
       
        DetailTable.goForword(function () {
           // var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: row
            });

            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002BOM",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002BOM';
            flag = true;
        }, null, fields.Isleave);
    };

    this.ResourcesClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        DetailTable.goForword(function () {
           // var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: row
            });

            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002Resource",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002Resource';
            flag = true;
        }, null, fields.Isleave);
    };

    //制程用料
    this.ProcessMaterialsClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);
        
        if (!row) {
            console.log("row is null");
            return;
        }

        //if (row.IsEnableOperation) {
        //    return;
        //}

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: MainRow
            });

            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002ProcessMaterials",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002ProcessMaterials';
        }, null, fields.Isleave);
    };

    //制程资源
    this.ProcessResourcesClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        //if (row.IsEnableOperation) {
        //    return;
        //}


        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: MainRow
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002ProcessResources",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002ProcessResources';
        }, null, fields.Isleave);
    };

    //制程工序
    this.ProcessProcessClick = function (obj) {
      
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        if (!row.IsEnableOperation) {
            
            return;
        }

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: MainRow
            });

            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002ProcessProcess",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002ProcessProcess';
        }, null, fields.Isleave);
    };

    //拆解替代
    this.DismantlingAlternativeClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        if (row.Status.substring(5, 18) == "020121300002A" || row.Status.substring(5, 18) == "020121300002B") {
            console.log("Status is CL or CA!");
            return;
        }

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00002_Back",
                Parameters: MainRow
            });

            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002AlternativeProcess",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00002",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002AlternativeProcess';
        }, null, fields.Isleave);
    }

    //返回时，查询数据
    this.BackSearch = function (rowData) {
        var index;
        var P = parameters.PT0191213000004, S = rowData.Status;
        for (var i = 0; i < P.length; i++) {
            if (S && P && S.substring(5, S.length) == P[i].value.substring(5, P[i].length)) {
                index = i;
            }
        }
        
        $("#EndOrderNumber").val(rowData.MoNo);
        $("#StartOrderNumber").val(rowData.MoNo);
       // $("#EndOrderNumberID").val(rowData.);
        $(".i-checks").eq(0).iCheck("uncheck");
        $(".i-checks").eq(index).iCheck("check");
         //self.formData.OrderNum(rowData.MoNo);
        
            self.searchClick();
        
        
    };

    this.searchClick()
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "Deletion", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats","Save",
    //制令单表头
    "ProcessDetail","OrderNum", "SequenceNo", "Version", "LotNo", "ItemNo", "ItemDescription", "ItemSpecification", "Qty",
    "NumberManufBeforeDismantling", "ManufacturingUnit", "EstimatedStartDate", "EstimatedFinishDate", "OriginalOrderNumber",
    "OrderNo", "QuantityOrder", "CustomerNo", "CustomerName", "SalesmanCode", "AccountName", "EstimatedShippingDate", "PreWarehouse",
    "OrderSingleState", "OrderCompletion", "SuperCompletionRatio", "DocumentSource","SaveOrNot",
    "Issued", "Invalid", "Closed", "Restore", "ProcessRelationship", "BOM", "Resources",
    //制令单明细
    "ProcessSequence", "ProcessState", "ProcessNo", "ProcessDescription", "WorkCenter", "WorkCenterDescription", "InoutMark",
    "DepartmentNoOrManufacturersNo", "DepartmentDesOrManufacturersDes", "ResourceReporting", "AfterDismantling", "FinProQty", 
    "Turnover", "DifferenceQty", "ScrappedQty", "AuxiliaryUnit", "UnitRate", "StandardWorkingSeconds", "StandardWorkingHours",
    "PrepareWorkSeconds", "PrepareWorkHours", "ProcessProcess", "DismantlingAlternative", "StartDateIsNull", "FinishDateIsNull",
    "StartDateCanNotBeGreaterThanTheExpectedCompletionDate","CheckGroupCode","CheckGroupName","UnitMasterFile","Code","Isleave",
    //新增制令单
    "AddOrder", "Controller", "DocumentCategory", "DocumentNo", "OverRate", "AccountMaintenance", "AccountNo", "Name", "WorkNumber",
    "ProductProcessFile", "SupplyType", "CustomerData", "WarehouseNo", "WarehouseName", "AffiliatedFactory", "ItemCodeIsRequiredEntry",
    "TheLotIsTheEntry", "NumberManufacturedItemsIsRequired", "OverrunRatioIsGreaterThanOrEqualToZero", "ExpectedStartDateIsRequiredEntry",
    "ExpectedCompletionDateIsRequiredEntry", "NumberOfOrdersIsGreaterThanOrEqualToZero", "EstimatedShippingDateIsRequiredEntry",
    "DetailsNotSavedNeedToRefreshCanOperate","MoNoIsNull","DocumentDate","DocumentDateIsNull","DocumentCategoryIsNull",
    //删除制令单
    "WhetherToDelete",
    //修改制令单
    "EditOrder","CanOnlyModifyTheOrdersOrIssuedASingleOrder",
    //明细
    "ProcessMaterials", "ProcessMaterials", "ProcessResources", "AlternativeProcess", "ProcessIsNull", "ProcessInformation", "WorkCenterIsNull",
    "AuxUnitRatioIsNonNegativeNumber", "AuxUnitRatioIsMaxInteger", "AuxUnitRatioIsMaxDecimal", "AuxUnitRatioIsNonNegativeNumber",
    "StandardWorkingSecondsIsError", "PrepareWorkSecondsIsError", "WorkCenterNo", "WorkCenterInformation", "IsEnableProcess","PreTransferQty",
    //查询
    "EndOrderNumber", "StartOrderNumber", "EndItemCode", "StartItemCode", "Client", "AccountName", "Controller", "PleaseSelectRecord", "ItemMasterFile",
    "MoNoMasterFile", "MoSeq", "MoNo", "Reselect", "inputTitle", "Browse", "PleaseSelectFile", "info",
    //导入
    "Date", "StartWorkOrderNum", "EndWorkOrderNum", "Client", "DateIsNull", "StartWorkOrderNumIsNull", "EndWorkOrderNumIsNull", "PleaseSelectFile"
   
];
words = arrayWord.join();
mf.toolBar('#container');


// model = new viewModel();

initPage = function () {

    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,019121300001F,0191213000004,019121300000C,0191213000058" },
        success: function (data) {
            parameters = data;
            model = new viewModel();

            ko.applyBindings(model);

            var rowData = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00002_Back");
           // console.log(rowData);
            if (rowData) {
                model.BackSearch(rowData);
            }
            
            model.MainTable.loadData();
        }
    });
   
};


