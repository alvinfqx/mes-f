var URL = "/MES/QualityManagement/QCS00007";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var JType = null;

var viewModel = function () {
    var self = this;

    var checkTestSettingID = null, DetailId,  HeaderStatus,Flag, TaskCode;
    var  InspectionId, status, Sequence, TaskID;
    var TaskDispatchID, Status, ReasonId, ItemID, InspectionUserID, AutoNumberID, InsDocumentNo, ExportTotal = 0;
    var InspectionNoArr = [], EQcDecision = null;

    //获取品質判定方式
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentParameter/Inf00020GetValue",
        success: function (data) {
            EQcDecision = data;
        }
    });

    $("#AddInspectionDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    $("#AddDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });
    //状态，

    var status = parameters.PT0191213000006,
        status1 = parameters.PT0191213000061,//质量判定
        status2 = parameters.PT019121300005C;//检验种类
    var statusArr = []
    for (var i = 0; i < parameters.PT0191213000061.length; i++) {
        if (parameters.PT0191213000061[i].value.substring(5, parameters.PT0191213000061[i].length) != "0201213000098") {
            statusArr.push(parameters.PT0191213000061[i])
        }
    }
    console.log(statusArr)
    var formData = {
        InspectionNo: ko.observable(""),
        Status: ko.observable(""),
        AccountNo: ko.observable(""),
        TaskNo: ko.observable(""),
        StatusList: ko.observableArray(status),
        QualityJudgment: ko.observableArray(status1),
        TestType: ko.observableArray(status2),
        InspectionTypeList: ko.observableArray(status2),
        Qc: ko.observable(""),
        QcList: ko.observableArray(status1),
        TypeArray: ko.observableArray(),
        DocumentType: ko.observable(),
        autoNoType: ko.observable(),
        myStatus: ko.observable(),
        myInsMethod: ko.observable(),
        allQty: ko.observable(),
        //获取自动编号
        getAutoNum: function () {
            model.getAutoNumber();
        }
    };
    ko.applyBindings(formData);
    

    this.getAutoNumber = function () {
        mf.ajax({
            type: "Get",
            url: "/MES/api/QualityManagement/Qcs00007GetAutoNumber",
            data: ({ Date: $("#AddDate").val(), Value: (formData.autoNoType() || $("#DocumentType").val()) }),
            success: function (data) {
                //console.log("Auto: " + JSON.stringify(data))
                InsDocumentNo = data.AutoNumber;
                $("#AddCode").val(InsDocumentNo);
                AutoNumberID = data.DocumentAutoNumberID;
            }
        });
    }

    //任务单号资料
    var TaskNoTable = new mf.Table("#TaskNoTable", {
        uniqueId: "TaskDispatchID",
        height: 300,
        editable: false,
        dbclick_editable: false,
        LastWidth: "140",
        paginationBar: new mf.PaginationBar("#taskNoPagiBar"),
        fn_getData: function (pagi, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.page = pagi.page;
            searchData.rows = pagi.rows;
            searchData.Token = token;
            searchData.InspectionNo = InspectionId;
            searchData.TaskNo = $("#TaskNoInput").val();
            searchData.ProcessCode = $("#ProcessNo").val();//制程代号
            searchData.ProcessName = $("#ProcessDescription").val();//制程说明
            console.log(searchData);
           // if ($("#InspectionNo").val())
                mf.ajax({
                    type: "Get",
                    url: "/MES/api/PopUp/Qcs00007TaskDispatchListV1",
                    data: searchData,
                    success: function (data) {
                        //console.log(JSON.stringify(data));
                        for (var i = 0, len = data.rows.length; i < len; i++) {
                            data.rows[i].OperationCode = data.rows[i].OperationCode || "";
                            data.rows[i].OperationDescName = data.rows[i].OperationDescName || "";
                        }
                        success(data);
                    }
                });
        
        },
        fn_saveData: function (data, success) {

        },
        columns: [       
            {//任务单单号
                field: "TaskNo", title: fields.TaskNo, width: 175, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {//料品代号
                field: "ItemCode", title: fields.ItemNo, width: 120, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {//料品名称\规格
                field: "DescriptionSpec", title: fields.ItemDescAndSpec, width: 160, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {//制程代号
                field: "ProcessCode", title: fields.ProcessNo, width: 120, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {//制程说明
                field: "ProcessName", title: fields.ProcessDescription, width: 120, align: "center",
                rander: new mf.StaticValueRander({ title: "title"})
            },
            {//工序代號
                field: "OperationCode", title: fields.WorkOrderNo, width: 120, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {//工序说明
                field: "OperationDescName", title: fields.WorkOrderDescription,  align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
               {//制令单号
                   field: "MoCode", width: 0, visible: false, display: "none", title: "",
                   rander: new mf.TextRander({ title: "", width: 0 })
               },
            {//单位
                field: "UnitDescription", width: 0, visible: false, display: "none", title: "",
                rander: new mf.TextRander({ title: "", width: 0 })
            },
            {//
                field: "TaskDispatchID", width: 0, visible: false, display: "none", title: "",
                rander: new mf.TextRander({ title: "", width: 0 })
            },
        ],
    });

    //检验人员开窗
    var InspectorsTable = new mf.Table("#InspectorsTable", {
        uniqueId: "InspectorsId",
        height: 300,
        editable: false,
        enter_addble: false,
        LastWidth: "250",
        paginationBar: new mf.PaginationBar("#InspectorsPagiBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            var accountSearch = $("#AccountNo").val();
           
            if (accountSearch && accountSearch.length > 0) {
                searchData.Code = accountSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
           // searchData.Status = Status;
          
       
            mf.ajax({
                type: "Get",
                url: '/MES/api/PopUp/GetUserList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (data, success) {

        },
        columns: [
            {//工号、姓名、登入帐号
                field: "Emplno", title: fields.WorkNumber, width: 130, align: "center",
                rander:new mf.StaticValueRander({title:"title"})
            },
            {
                field: "UserName", title: fields.Name, width: 120, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: "Account", title: fields.LoginAccount, align: "center",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: "MESUserID", title: "", visible : false,width:0, display:"none",
                rander: new mf.TextRander({ title: "", width: 0 })
            }

        ]
    });
    $("#AccountSearch").click(function () {
        InspectorsTable.goForwordSafely(function () {
            InspectorsTable.loadData(null, null, 1);
        }, null);
    });

  

    //主表 制程首件检验维护 QCS00007
    var table = new mf.Table("#ProcessInspectionTable", {
        uniqueId: "InspectionDocumentID",      
        editable: true,        
        LastWidth: "140",
        IsSetTableWidth: true,
        dblclick_editable: false,
        enter_addble: false,     
        paginationBar: new mf.PaginationBar("#ProcInspectPagiBar"),
        //检验明细
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align: center; width:100px;'> ");
            $td.append($("<button onclick='model.InspectionDetailClick(this)' id='BtnDetail' class='btn btn-success btn-xs'  style='text-align: center; width:70px; margin-left:3px;'title='" + fields.InspectionDetail + "'>" + fields.InspectionDetail + "</button>"));
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Status = formData.Status();
            searchData.InspectionNo = formData.InspectionNo();

            mf.ajax({
                type: "Get",
                url: "/MES/api/QualityManagement/Qcs00007GetList",
                data: searchData,
                success: function (data) {
                  
                   ExportTotal = data.total;

                   for (var i = 0; i < data.rows.length; i++) {
                       InspectionNoArr.push(data.rows[i].InspectionNo);
                   }
                    
                    success(data);  
                }
            });             
        },
        fn_saveData: function (data, success) {                    
            mf.ajax({
                type: "post",
                url: "/MES/api/QualityManagement/Qcs00007Save",
                data: JSON.stringify(data),
                success: function (data) {
                    success(data);           
                }
            });
        },
 
        //表格加载之后，为免检， 判定添加change事件
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var Code = data.InspectionNo;
            var Statustext;
            var Namearry = parameters.PT0191213000006;
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == data.Status) {
                    Statustext = Namearry[i].text;
                }
            }
            //如果是作废或确认，则提示不可编辑
            if (data.Status && data.Status.substring(5, data.Status.length) != "020121300008D") {
                if (isEditing) {
                    msg.info(fields.info, Code + fields.StatusIs + Statustext + fields.Isnotedit);
                }
            }
   
           
            if (JType && JType.substring(5, JType.length) == "02012130000B1") {

                    $("#QcDecision").attr("disabled", true); //设置为不可更改
                }
            

            var $BtnDetail = $row.find("#BtnDetail");
            var $SelType = $row.find("#Type");
            var $ChkFlag = $row.find("#Flag");
            var $SelQc = $row.find("#QcDecision");
            $SelQc.attr("onchange", "model.qcChanges(" + data.InspectionQuantity + ")");

            $ChkFlag.attr("onchange", "model.ChangeFlag(this, 'N')");
        

            //Firefox ：指定input宽度
            setTimeout(function () {
                $("#NGquantity,#ScrrappedQuantity, #InspectionQuantity").css("width", "95px");

            }, 30);

            if (isAdding) {
                $SelType.val(fields.FirstTest);
                $BtnDetail.hide();
            }
            else {
                $BtnDetail.show();
                if (EQcDecision.substring(5, EQcDecision.length) == "02012130000B2") {
                    $row.find("#QcDecision").attr("disabled", false);
                }
                else {
                    $row.find("#QcDecision").attr("disabled", true);
                }
            }

            // alert(data.QcDecision)
            //品质判定维护时，检验人员必输，去掉*
            if (!data.QcDecision) {
                setTimeout(function () {
                    $(".J-required").hide();
                }, 20);
            }

            ////该程序仅有状态码为OP可新增修改资料，状态为CA、CL仅能查询，不得修改任何资料。
            if (data.Status && data.Status.substring(5, data.Status.length) == "020121300008D") { }
            else {
                $row.find("#Name button").hide();
                $row.find("#TaskCode button").hide();

            }       
        },
        //品质判定维护时，检验人员必输，显示品质判定维护时的系统时间
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var qjVal = table.getEditingColumnValue($row, "QcDecision");
            var uIdVal = $("#Name input").val();
            if (qjVal != "") {
                if (!uIdVal) {
                    msg.info(fields.info, fields.InspectionUserIsNull);
                    return fields.InspectionUserIsNull;
                }

            }
        },
        operateColumWidth: "100px",
        fn_checkeditable: function ($selectedRow) {
            var row = table.getRowData($selectedRow);
            var Namearry = parameters.PT0191213000006;
            var Statustext = "";
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == row.Status) {
                    Statustext = Namearry[i].text;
                }
            }
            //状态为OP,则所有字段可维护
       
            if (row.Status && row.Status.substring(5, row.Status.length) != "020121300008D") {
                msg.info(fields.info, row.InspectionNo + fields.StatusIs + Statustext + fields.Isnotedit);
               
                return true;

            } else {
                return false;
            }
        },
         isFrozenColumn: true,
        height: window.innerHeight - 145,
        columns: [
            {//检验单号
                field: "InspectionNo", title: fields.InspectionNo, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title", size: 13, disabled: true, })
            },
            {//日期
                field: "DocumentDate", title: fields.DocumentDate, width: "140", align: "center",
                rander: new mf.DateRander()
            },
            {//检验种类FPI:首件检验
                field: "InspectionMethod", title: fields.TestType, width: "100", align: "center",
                rander: new mf.AutoSelectRander(
                   "value", "text", status2,
                   {
                       title: true, disabled: true
                   })
            },
        
            {//任务单单号
                field: "TaskCode", title: fields.TaskNo, width: "175", align: "center", require: true,
                rander: new mf.FKRander("#TaskNoDialog",
                                        "#TaskNoConfirm",
                                        TaskNoTable,
                        new mf.TextRander({
                            readonly: "readonly", title: "title", size: 10, id: "TaskNoInput"
                        }), {
                            btnTitle: "",
                            btnClass: "btn btn-success btn-xs",
                            searchID: [{ value: "#TaskNoInput", text: "" }, { value: "#ProcessNo", text: "" }, { value: "#ProcessDescription", text: "" }, ]
                        }
                    ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "TaskCode", e.data.TaskNo);
                    table.setEditingColumnValue($row, "ItemNo", e.data.ItemCode);
                    table.setEditingColumnValue($row, "ProcessDesc", e.data.ProcessCode + " " + e.data.ProcessName);
                    table.setEditingColumnValue($row, "OperationDesc", e.data.OperationCode + " " + e.data.OperationName);
                    table.setEditingColumnValue($row, "DescAndSpec", e.data.DescriptionSpec);//料品名称/规格
                    table.setEditingColumnValue($row, "UnitDesc", e.data.UnitDescription);
                    table.setEditingColumnValue($row, "FinQuantity", e.data.DocumentQuantity);
                    table.setEditingColumnValue($row, "MoNoAndSequence", e.data.MoCode);
                    TaskID = e.data.TaskDispatchID;
                    ItemID = e.data.ItemID;

                }
            },
           {//料品代号
                    field: "ItemCode", title: fields.ItemNo, width: "120", align: "center",
                    rander: new mf.TextRander({ disabled: true, title: "title", size: 12 })
                },
            {//料品名称/规格
                field: "DescAndSpec", title: fields.ItemDescAndSpec, width: "130", align: "center",
                rander: new mf.TextRander({  disabled: true , title: "title", size: 13})
            },
            {//单据数量
                field: "FinQuantity", title: fields.DocumentQuantity, width: "110", align: "center",
                rander: new mf.TextRander({ title: "title", size: 9, disabled: true })
            },
            {//免检
                field: "Flag", title: fields.InspectionFlag, width: "50", align: "center",
                rander: new mf.SingleCheckBoxRander({ yes: true , no: false }),
                
            },
            {//單位
                field: "UnitDesc", title: fields.Unit, width: "120", align: "center",
                rander: new mf.TextRander({ disabled: true, title: "title", size: 11 })
            },
             {
                 field: 'InspectionUserID', title: "", visible: false, display: "none",width:0,
                 rander: new mf.DynamicValueRander(function () {
                     return InspectionUserID;
                 })
             },
            {//檢驗人員
                field: "Name", title: fields.Inspectors, width: "150", align: "center", require: true,
                rander: new mf.FKRander("#InspectorsDialog",
                                       "#InspectorsConfirm",
                                       InspectorsTable,
                       new mf.TextRander({
                           readonly: "readonly", title: "title", size: 10, align: "center" //id:"NameInput",
                       }), {
                           btnTitle: "",
                           btnClass: "btn btn-success btn-xs"
                       }
                   ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "Name", e.data.UserName);
                   
                    //帐号id
                    InspectionUserID = e.data.MESUserID;
                  
                }
            },
            {//检验日期: 单据新增时，该栏位允许空白。
                field: "InspectionDate", title: fields.InspectionDate, width: "140", align: "center",
                rander: new mf.DateRander({}),
            },
            {//质量判定 单据新增时，该栏位允许空白。
                field: "QcDecision", title: fields.QualityJudgment, width: "120", align: "center",
                rander: new mf.AutoSelectRander("value", "text", status1,
                    {
                        noSearchSelectedText:"",
                        title: true,
                        size: 11
                    }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    //10-30 添加的代码
                    var QualityJudgment = table.getEditingColumnValue($row, 'QcDecision');
                    if (QualityJudgment && QualityJudgment.substring(5, QualityJudgment.length) == "0201213000090") {
                        //拒收，OK= 0
                        var InspectionQuantity = Number(table.getEditingColumnValue($row, 'InspectionQuantity')),
                            ScrappedQty = Number(table.getEditingColumnValue($row, 'ScrappedQuantity'));
                        table.setEditingColumnValue($row, "OKQuantity", 0);
                        //ng数量 = 检验数量 - 报废- 0
                        table.setEditingColumnValue($row, "NGquantity", InspectionQuantity - ScrappedQty - 0);
                    } else {
                        //如果为OK，SA，则带入OK
                        var InspectionQuantity = Number(table.getEditingColumnValue($row, 'InspectionQuantity')),
                            RepairQuantity = Number(table.getEditingColumnValue($row, 'NGquantity'))
                        ScrappedQty = Number(table.getEditingColumnValue($row, 'ScrappedQuantity'));
                        table.setEditingColumnValue($row, "OKQuantity", InspectionQuantity - RepairQuantity - ScrappedQty);
                    }
                    //10-30 这里结束

                }
            },
           
            {//检验数量:必输项 
                field: "InspectionQuantity", title: fields.InspectionQuantity, width: "110", align: "center",require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", size: 8 })),               
                checkers: [
                    //不得大于[单据数量]栏位
                     //new mf.IsOnlyNumberChecker(fields.InspectionQuantity + fields.OnlyNum),
                     new mf.IsNonNegativeNumberChecker( fields.InspNumberIsNonNegative),
                    // new mf.IsOnlyNumberChecker(fields.InspectionQuantity+ fields.OnlyNum),                          
                     new mf.ConfigurableChecker(fields.InspectionQuantity + fields.InspectionQuantityGreaterThanDocumentQuantity, function (value, $row) {
                         var qty = table.getEditingColumnValue($row, "FinQuantity");

                         if (isNaN(value)) {

                             table.setEditingColumnValue($row, "InspectionQuantity", 0);
                             msg.info(fields.InspectionQuantity + fields.OnlyNum);
                         }
                        if (Number(value) > Number(qty)) {
                            return true;
                        }
                        return false;
                }),
                new mf.ConfigurableChecker(fields.InspectionQuantityIsZero, function (value, $row) {
                    var flag = table.getEditingColumnValue($row, "Flag");
                    if (!flag) {
                        if (value == 0) {
                            return true;
                        }
                    }
                    
                }),
                 new mf.IsOverDecimalChecker(fields.InspectionQuantity + fields.MoreThan12, fields.InspectionQuantity + fields.MoreThan6, fields.InspectionQuantity +fields.InputError, 12, 6)

                ]
            },
            {//報廢量
                field: "ScrappedQuantity", title: fields.ScrappedQty, width: "100", align: "center",
                rander: new mf.TextRander({ title: "title", size: 8, event: "input", eventName: "oninputnum(this)" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var decision = table.getEditingColumnValue($row, 'QcDecision');
                    var InQuantity = table.getEditingColumnValue($row, 'InspectionQuantity');
                    var ScrQuantity = table.getEditingColumnValue($row, 'ScrappedQuantity');
                    var NGQuantity = table.getEditingColumnValue($row, 'NGquantity');
                    if (decision && decision.substring(5, decision.length) == "0201213000090") {

                        table.setEditingColumnValue($row, "OKQuantity", 0);
                        table.setEditingColumnValue($row, "NGquantity", Subtr(InQuantity, ScrQuantity));

                    } else {
                        var midNum = Subtr(InQuantity, ScrQuantity);
                        var OKQ = Subtr(midNum, NGQuantity);
                        //var OKQ = Number(InQuantity) - Number(ScrQuantity) - Number(NGQuantity);
                        table.setEditingColumnValue($row, "OKQuantity", OKQ);
                    }
                },
                defaultValue: 0,
                checkers: [
                   //不得大于[检验数量]栏位
                     // new mf.IsOnlyNumberChecker(fields.ScrappedQty + fields.OnlyNum),
                      new mf.IsNonNegativeNumberChecker(fields.ScrappedQty + fields.GreaterThanZero),
                      new mf.ConfigurableChecker(fields.ScrappedQty+ fields.InspectionQuantityGreaterThanDocumentQuantity, function (value, $row) {
                         
                          var qty = table.getEditingColumnValue($row, "InspectionQuantity");
                          if (isNaN(value)) {

                              table.setEditingColumnValue($row, "ScrappedQuantity", 0);
                              msg.info(fields.ScrappedQty + fields.OnlyNum);
                          }
                           if (Number(value) > Number(qty)) {
                               return true;
                           }
                           return false;
                      }),
                        new mf.IsOverDecimalChecker(fields.ScrappedQty + fields.MoreThan12, fields.ScrappedQty + fields.MoreThan6, fields.ScrappedQty + fields.InputError, 12, 6)

                ],
               
            },
            {//NG数量
                field: "NGquantity", title: fields.RepairQuantity, width: "100", align: "center",
                rander: new mf.TextRander({ title: "title", size: 8, event: "input", eventName: "oninputnum(this)" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var decision = table.getEditingColumnValue($row, 'QcDecision');
                    var InQuantity = table.getEditingColumnValue($row, 'InspectionQuantity');
                    var ScrQuantity = table.getEditingColumnValue($row, 'ScrappedQuantity');
                    var NGQuantity = table.getEditingColumnValue($row, 'NGquantity');
                    if (decision && decision.substring(5, decision.length) == "0201213000090") {

                        table.setEditingColumnValue($row, "OKQuantity", 0);
                        table.setEditingColumnValue($row, "ScrappedQuantity", Subtr(InQuantity, NGQuantity));

                    } else {
                        var midNum = Subtr(InQuantity, ScrQuantity);
                        var OKQ = Subtr(midNum, NGQuantity);
                        //var OKQ = Number(InQuantity) - Number(ScrQuantity) - Number(NGQuantity);
                        table.setEditingColumnValue($row, "OKQuantity", OKQ);
                    }
                },
                defaultValue: 0,
                checkers: [
                   //不得大于[检验数量]栏位
                       new mf.IsNonNegativeNumberChecker(fields.RepairQuantity + fields.GreaterThanZero),
                       new mf.ConfigurableChecker(fields.RepairQuantity + fields.InspectionQuantityGreaterThanDocumentQuantity, function (value, $row) {
                           var qty = table.getEditingColumnValue($row, "InspectionQuantity");
                           if (isNaN(value)) {
                               table.setEditingColumnValue($row, "NGquantity", 0);
                               msg.info(fields.RepairQuantity + fields.OnlyNum);
                           }
                           if (Number(value) > Number(qty)) {
                               return true;
                           }
                           return false;
                       }),
                       new mf.IsOverDecimalChecker(fields.RepairQuantity + fields.MoreThan12, fields.RepairQuantity + fields.MoreThan6, fields.RepairQuantity + fields.InputError, 12, 6)
                ],                            
            },
             {//OK数量
                 field: "OKQuantity", title: fields.TransferAmount, width: "140", align: "center",
                 rander: new mf.TextRander({ title: "title", size: 8, disabled: true }),
                 defaultValue: 0,
                 checkers: [
                   //不得大于[]栏位

                       new mf.IsNonNegativeNumberChecker(fields.RepairQuantity + fields.GreaterThanZero),
                       new mf.ConfigurableChecker(fields.SumQuantityNotEqualToInspectionQuantity, function (value, $row) {
                           var qty = Number(table.getEditingColumnValue($row, "InspectionQuantity")),
                               rty = Number(table.getEditingColumnValue($row, "ScrappedQuantity")),
                               ngty = Number(table.getEditingColumnValue($row, "NGquantity"));
                           var Vvalue = Number(value) * 1000000;
                           rty = rty * 1000000;
                           ngty = ngty * 1000000;
                           var num = (Vvalue + rty + ngty) / 1000000;
                           if (num != qty) {
                               return true;
                           } else {
                               return false;
                           }
                          
                       }),
                       new mf.IsOverDecimalChecker(fields.RemovableQuantity + fields.MoreThan12, fields.RemovableQuantity + fields.MoreThan6, fields.RemovableQuantity + fields.InputError, 12, 6)

                 ]
             },
             {//状态
                 field: "Status", title: fields.Status, width:"99",align:'center',
                 rander: new mf.AutoSelectRander("value", "text",status, { title: "title" , size: 8, readonly: "readonly", disabled:"disable"})
             },
            {//制令单号 制令单号+拆单单号（格式如XXXX-XXX）
                field: "MoNoAndSequence", title: fields.MoNo, width: "175", align: "center", 
                rander: new mf.TextRander({ readonly: "readonly", title: "title", size: 16, disabled: true, })
            },
            {//制程代号 + 制程说明
                field: "ProcessDesc", title: fields.ManufacturingProcess, width: "175", align: "center", disabled: true,
                rander: new mf.TextRander({ readonly: "readonly", title: "title",  size: 16, disabled: true, })
            },
            {//工序代號+说明
                field: "OperationDesc", title: fields.Process, width: "175", align: "center", disabled: true,
                rander: new mf.TextRander({ readonly: "readonly", title: "title", size: 16, disabled: true, })
           },
            {//备注
                field: "Comments", title: fields.Remark, width: "150", align: "center",
                rander: new mf.TextRander({ title: "title" ,maxLength: 120,size: 16})
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ size: 11, title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ size: 12, title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ size: 8, title: "title" })

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ size: 12 ,title:"title"})
            },
            {//任务单id

                field: "TaskDispatchID", width: 0, visible: false, display: "none", title: "",
                rander: new mf.DynamicValueRander(function () {
                    return TaskID;
              })
            },
             {//料品iD
                 field: "ItemID", width: 0, visible: false, display: "none", title: "",
                 rander: new mf.DynamicValueRander(function () {
                     return ItemID;
                 })
             },
        ]
    });
    table.loadData();


    this.checkChange = function (that, ele, InQuantity) {
   
        var decision = $("#QcDecision").val(),
            ng = Number($("#NGquantity").val()),
            sc = Number($("#ScrappedQuantity").val()),
            ok = Number($("#OKQuantity").val()),
            all = Number($("#InspectionQuantity").val());
        if (!isNaN($(that).val())) {
            if (decision && decision.substring(5, decision.length) == "0201213000090") {
           
                    $("#OKQuantity").val(0);
                    if (ele == "NGquantity") {
                        $("#ScrappedQuantity").val(Subtr(all, ng))
                    } else if (ele == "ScrappedQuantity") {
                        $('#NGquantity').val(Subtr(all, sc));
                    }
           

            } else {
                var midnum = Subtr(all, sc);
                var N = Subtr(midnum, ng);
                $("#OKQuantity").val(N);
            }
        } else {
            $(that).val("");
            msg.info(fields.Prompt, fields.ThereOnlyInputNumber);
            return;
        }   
    }

    this.checkIsNG = function (obj) {
        var badNum = $(obj).val(),
            re = $('#ReQuantity').val();
        //if (Number(badNum) > Number(re)) {
        //    $("#QcDecision").val(mf.systemID + "0201213000090");
        //    $("#QcDecision").attr("disabled", true);
        //}

    }

    console.log(parameters.PT0191213000061)
    //检验明细表
    var InspectDetailListTable = new mf.Table("#InspectDetailListTable", {
        uniqueId: "InspectionDocumentDetailID",
        paginationBar: new mf.PaginationBar("#IDLTPagiBar"),
        editable: true,
        LastWidth: "190",
        fn_createBtn: function (data) {
            //不良原因明细 结果说明明细
            var $td = $("<td style='text-align: center; width:200px;'> ");
            $td.append($("<button onclick='model.BadReasonDetailClick(this)' id='BadReasonDetailBtn' class='btn btn-success btn-xs'  style='text-align: center; width:90px; margin-left:3px;'title='" + fields.BadReasonDetail + "'>" + fields.BadReasonDetail + "</button>\
                            <button onclick='model.ResultsDetailClick(this)' id='ResultsDetailBtn' class='btn btn-success btn-xs'  style='text-align: center; width:90px; margin-left:3px;'title='" + fields.ResultsDetail + "'>" + fields.ResultsDetail + "</button>"));
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.InspectionDocumentID = InspectionId;//
            searchData.ItemID= ItemID;   
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00007GetDetailsList',
                data: searchData,
                success: function (data) {
                  //  console.log("【检验明细详】" + JSON.stringify(data));
                    //检验项目判定方式：依Re值自动判定  
                   
                    //for (var i = 0, len = data.rows.length; i < len; i++) {
                    //    if (data.rows[i].Value && data.rows[i].Value.substring(5, data.rows[i].Value.length) == "02012130000B3") {
                    //        //自动判定:不良数≥“RE值”时，自动判定“拒收”
                    //        //if (Number(data.rows[i].NGquantity) >= Number(data.rows[i].ReQuantity)) {
                    //        //    data.rows[i].QcDecision = mf.systemID + "0201213000090";

                    //        //} else {
                    //         //   data.rows[i].QcDecision = mf.systemID + "0201213000091";
                    //       // }
                    //    }
                    //    }                      
                    
                    success(data);
                }
             });
        },
        fn_saveData: function (saveData, success) {
            if (saveData.Value && saveData.Value.substring(5, saveData.Value.length) == "02012130000B3") {
                if (!saveData.NGquantity) {
                    msg.info(fields.AdverseQty + fields.MustNotNull);
                    return;
                }
            }
            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00007DetailsListSave",
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
            table.loadData();   
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
           
            if (data.Value && (data.Value.substring(5, data.Value.length) == "02012130000B3")) {
                setTimeout(function () {
                    $("#QcDecision").attr("disabled", true);
                }, 20);
               
          }
            //设定为“N”时，实测值栏位反灰不可修改
            var atv = data.AttributeType;
            if (atv && atv.substring(5, atv.length) == "0201213000019") {
                $row.find("#MeasuredValue").attr("disabled", true);
            }
        },
        height: 250,
        columns: [
            {
                field: 'Value', title:"",visible:false,
                rander: new mf.TextRander({})
            },
              {
                  field: 'InspectionDocumentID', title: "", visible: false,width:0, display:"none",
                  rander: new mf.DynamicValueRander(function () {
                      return InspectionId;
                  })
              }, 

               {
                   field: 'Status', title: "", visible: false, width: 0, display: "none",
                   rander: new mf.TextRander()
                   //    new mf.DynamicValueRander(function () {
                   //    return status;
                   //})
               },
            
            {//pai xu 
                field: "Sequence", title: fields.Sequence, width: 150, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 10 })
            },
            {//检验项目代号
                field: "InspectionItemCode", title: fields.TestItemsNo, width: 140, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 10 })
            },
         
            {//检验项目说明
                field: "InspectionItemName", title: fields.TestItemsDec, width: 140, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 14 })
            },
            {//检验标准
                field: "InspectionStandard", title: fields.TestStandard, width: 140, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 13 })
            },
            {//缺点等级
                field: "FaultDesc", title: fields.Disadvantages, width: 140, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 13 })
            },

           {//抽样数量SampleQuantity
               field: "SampleQuantity", title: fields.SamplingQuantity, width: 120, align: "center",
               rander: new mf.StaticValueRander({ title: "title", size: 8 })
           },
            {//AQL
                field: "AqlName", title: fields.AQL, width: 110, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 10 })
            },
            {//AC
                field: "AcQuantity", title: fields.AC, width: 110, align: "center",
                rander: new mf.StaticValueRander({ title: "title", size: 10 })
            },
             {//RE
                 field: "ReQuantity", title: fields.RE, width: 120, align: "center",
                 rander: new mf.StaticValueRander({ title: "title", size: 10 })
             },
             {//不良数 <抽样数量
                 // 参数判断      （1）依RE值自动判定，必输栏位，输入后影响“判断”栏位
                 //（2）人工判定，非必输栏位，默认为“0”
                 field: "NGquantity", title: fields.AdverseQty, width: 120, align: "center",
                 rander: new mf.TextRander({ title: "title", size: 9, event:"keyup", eventName:"model.checkIsNG(this)" }),
                 defaultValue: 0,
                 checkers: [
                       new mf.IsNonNegativeNumberChecker(fields.AdverseQty + fields.GreaterThanZero),
                       //new mf.ConfigurableChecker(fields.AdverseQtyGreaterThanSamplingQty, function (value, $row) {
                       //    var val1 = InspectDetailListTable.getEditingColumnValue($row, "SampleQuantity");
                       //   // console.log(val1);
                       //    if (Number(value) > Number(val1)) {                            
                       //        return true;
                       //    } else {
                       //        return false;
                       //    }
                       //})
                 ]
             
             } ,
              
             {//实测值
                 // （1）设定为“N”时，该栏位反灰不可修改
                 //（2）设定为“D数值型”时，开放输入，仅能输入数字
                 //（3）设定为“C字符型”时，开放输入，可输入文字、数字
                 field: "Attribute", title: fields.MeasuredValue, width: 150, align: "center",
                 rander: new mf.TextRander({ title: "title", size: 15 , event:"keyup", eventName: "model.checkAttrVal(this)"}),
             },
             {//判定
                 field: "QcDecision", title: fields.Decision, width: 110, align: "center", readonly: "readonly",
                 rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000061,
                        {
                            title: true,
                            fn_onSetEditingValue: function (value) {
                                var list = [];
                                for (var j = 0, i = 0; i < parameters.PT0191213000061.length; i++) {
                                    if (parameters.PT0191213000061[i].value.substring(5, 18) != "0201213000098") {
                                        list[j] = parameters.PT0191213000061[i];
                                        j++;
                                    }
                                }
                                return list;
                            }
                        })
                     //new mf.AutoSelectRander("value", "text", statusArr, { title: "title", readonly: "readonly" }),
             },
             {//
                 field: "Comments", title: fields.Remark, width: 200, align: "center",
                 rander: new mf.TextRander({ title: "title", size: 21 })
             },
            {
                  field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                  rander: new mf.StaticValueRander({ size: 11, title: "title" })
              },
            {
                field: "CreateTime", title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" })
            },
            {
                field: "Modifier",  title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ size: 8, title: "title" })

            },
            {
                field: "ModifiedTime", title: fields.LastChangedDate, align: "center",  
                rander: new mf.TextTimeRander({  title: "title" })
            },
            //{//检验项目判定方式
            //    field: 'Type', title: "", visible: false, width: 0, display: "none",
            //    rander: new mf.TextRander({})
            //   },
             {//实测值型别
                 field: 'AttributeType', title: "", visible: false, width: 0, display: "none", 
                 rander: new mf.TextRander({ title: "", width: 0 })
             },
                {//检验类别
                    field: "InspectionClassID", title: "", width: 0, visible: false, 
                    rander: new mf.TextRander({ title: "", display: "none", width: 0, padding: 0 })
                },
            {//检验方式InspectionClassID
                field: "InspectionMethodID", title: "", width: 0, visible: false, 
                rander: new mf.TextRander({ title: "", display: "none", width: 0, padding: 0 })
            },
            {//检验项目ID
                field: "InspectionItemID", title: "", width: 0, visible: false,
                rander: new mf.TextRander({ title: "", display: "none", width: 0, padding: 0 })
            },
            {//检验标准ID
                field: "InspectionLevelID", title: "", width: 0, visible: false, 
                rander: new mf.TextRander({ title: "", display: "none", width: 0, padding: 0 })
            },
               {//缺点等级ID
                   field: "InspectionFaultID", title: "", width: 0, visible: false, 
                   rander: new mf.TextRander({ title: "", display: "none", width: 0, })
               },
        ]
    });

    //实测值只能为数字时
    this.checkAttrVal = function (obj) {
        var atv = $("#AttributeType").val();
        if (atv && atv.substring(5, atv.length) == "0201213000017") {
            if (/^\d\.?\d{0,}$/.test($(obj).val())) {
              
            } else {
                $(obj).val("");
                msg.info(fields.Prompt, fields.MeasuredValue + fields.OnlyNum);
                return false;
            }
        } 
    }


    //不良原因码表
    var BadReasonCodeTable = new mf.Table("#ReasonTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#BRCPagiBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Type = "QCS";

            mf.ajax({
                type: "get",
                url: "/MES/api/PopUp/getReasonList",
                data: searchData,
                success: function (data) {
                    console.log("不良原因码表"+JSON.stringify(data));
                     success(data);
                }
             });
          
        },
        fn_saveData: function (saveData, success) {

        },
        height: 300,
        LastWidth: "140",
        columns: [           
            
              {//
                  field: "Sequence", title: "", visible: false,width:0, display:"none",
                  rander: new mf.TextRander({ title: "", width: 0 })
              },
             {////原因码
                 field: "Code", title: fields.ReasonCode, width: 120, align: "center",
                 rander: new mf.TextRander({ title: "title", size: 11 })
             },
              {//原因说明
                  field: "Name", title: fields.ReasonDescription, width: 140, align: "center",
                  rander: new mf.TextRander({ title: "title", size: 13 })
              },
               {//备注
                   field: "Comments", title: fields.Remark,  align: "center",
                   rander: new mf.TextRander({ title: "title", size: 13 ,maxLength:120})
               }
             
          ]
    });

    //不良原因明细 表
    var BadReasonDetailTable = new mf.Table("#BadReasonDetailTable", {
        uniqueId: "InspectionDocumentReasonID",
        paginationBar: new mf.PaginationBar("#BadReasonDetailPagiBar"),
        editable: true,
        height: 600,
        fn_getData: function (pagination, searchData, success) {
            searchData.Token = token;
            searchData.page =  pagination.page;
            searchData.rows = pagination.rows;
            searchData.InspectionDocumentID = InspectionId;
            searchData.InspectionDocumentDetailID = DetailId;
            //console.log(searchData)

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00007GetReasonList',
                data: searchData,
                success: function (data) {
                    //console.log("不良原因明细" + JSON.stringify(data))
                    success(data);
                }
             });     
        },
        fn_saveData: function (saveData, success) {
            //不良原因 保存          
            //if (!$("#ReasonCode input").val()) {
            //    msg.info(fields.Prompt, fields.BadReasonCode + fields.MustNotNull);
            //    return;
            //}
            console.log("不良原因 保存"+ JSON.stringify(saveData))
            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00007ReasonSave",
                data: JSON.stringify(saveData),
                success: function (res) {
                    success(res);
                }
            });
        },
    
        height: 300,
        columns: [
              {
                  field: "InspectionDocumentID", visible: false, width: 0,  title: "",
                  rander: new mf.DynamicValueRander(function () {
                      return InspectionId;
                  })
              },
            
            {
                field: "ReasonID", visible: false, width: 0, display: "none", title: "",
                rander: new mf.DynamicValueRander(function () {
                    return ReasonId;
                })
            },
            {//不良原因码
                field: "ReasonCode", title: fields.BadReasonCode, width: 140, align: "center", require: true,
                rander: new mf.FKRander("#BadReasonCodeDialog",
                                       "#BadReasonCodeConfirm",
                                       BadReasonCodeTable,
                       new mf.TextRander({
                           readonly: "readonly", title: "title", size: 13
                       }), {
                           btnTitle: "",
                           btnClass: "btn btn-success btn-xs"
                       }
                   ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                   // table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonName", e.data.Name);
                    ReasonId = e.data.ParameterID;                  
                    //InspectorsID = e.data.InspectorsID;
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.BadReasonCode + fields.MustNotNull)
                ],
            },
            {//原因说明
                field: "ReasonName", title: fields.ReasonDescription, width: 130, align: "center",
                rander:new mf.TextRander({title:"title", maxLength:120, size: 12, readonly:"readonly"})
            },
             {//
                 field: "Comments", title: fields.Remark, width: 150, align: "center",
                 rander: new mf.TextRander({ title: "title", maxLength: 120, size: 14 })
             },
                {
                field: 'InspectionDocumentDetailID', title: "", visible: false, width: 0,
                rander: new mf.DynamicValueRander(function () {
                    return DetailId;
                })
            },
            {
                field: "Sequence", visible: false, title: "", width: 0, display: "none",
                rander: new mf.TextRander({ title: "" })
            },
            {
                 field: "Status", visible: false, title: "", width: 0, display: "none",
                 rander: new mf.TextRander({ title: "" })
              },
        ]
    });


 
    //结果说明明细表
    var ResultsDetailTable = new mf.Table("#ResultsDetailTable", {
        uniqueId: "InspectionDocumentRemarkID",
        paginationBar: new mf.PaginationBar("#ResultsDetailPagiBar"),
        editable: true,
        height: 300,
        LastWidth: "360",
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            searchData.InspectionDocumentID = InspectionId;
            searchData.InspectionDocumentDetailID = DetailId;

            //console.log("【Qcs00007GetRemarkList】" + JSON.stringify(searchData));
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00005GetRemarkList',
                data: searchData,
                success: function (data) {
                  
                   // console.log(JSON.stringify(data))
                    success(data);
                }
             });          
        },
        fn_saveData: function (saveData, success) {
            //if (!$("#Remark").val()) {
            //    msg.info(fields.Prompt, fields.Remark + fields.MustNotNull);
            //    return;
            //}
            for (var row = 0; row < saveData.deleted.length; row++) {
                saveData.deleted[row].InspectionDocumentID = InspectionId;
                saveData.deleted[row].InspectionDocumentDetailID = DetailId;
            }

            for (var row = 0; row < saveData.inserted.length; row++) {
                saveData.inserted[row].InspectionDocumentID = InspectionId;
                saveData.inserted[row].InspectionDocumentDetailID = DetailId;
            }

            for (var row = 0; row < saveData.updated.length; row++) {
                saveData.updated[row].InspectionDocumentID = InspectionId;
                saveData.updated[row].InspectionDocumentDetailID = DetailId;
            }
            console.log("结果 保存" + JSON.stringify(saveData))

            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00005RemarkSave",
                data: JSON.stringify(saveData),
                success: function (data) {              
                    success(data);
                }
            });
        },

     
        columns: [
      
              {
                  field: 'Sequence', title: fields.Sequence, align: "center", width: "0",visible: false,
                  rander: new mf.TextRander({})
              },
            {//检验说明
                field: "Remark", title: fields.InspectionInstructions, width: 240, align: "center", require: true,
                rander: new mf.TextRander({ title: "title", size: 71, maxLength: 120 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.Remark + fields.MustNotNull)
                ],
            },
             
             {
                 field: "Status", visible: false, title: "", width: 0, display: "none",
                 rander: new mf.TextRander({ title: "" })
             },
        ]
    });


    //主表
    //免检权限修改
    this.ChangeFlag = function (obj, str) {
        //品质判定、检验人员、检验日期、且不做检验数量的数量逻辑管控、可转移量、报废量、反修量栏位不可修改
        console.log("CHANGE FLAG")
        if ($(obj).is(":checked")) {
            if (str == "N") {
                self.clearInput("#InspectionUserID", "#Name input");
                self.clearInput("#InspectionDate", "#QcDecision");
                $("#NGquantity").val("0");
                $("#ScrappedQuantity").val("0");
                $("#OKQuantity").val($("#InspectionQuantity").val());
                $("#Name input").attr("disabled", "disabled");
                $("#Name button").hide();
                $("#InspectionDate").attr("disabled", "disabled");
                $("#ScrappedQuantity").attr("disabled", "disabled");
                $("#NGquantity").attr("disabled", "disabled");
                $("#QcDecision option:first-child").attr("selected", "selected");
                $("#QcDecision").attr("disabled", true);
                $("#InspectionUserID").val("");
            } else {
                console.log("Y")
                self.clearInput("#AddInspectionUserId", "#AddInspectionUser");
                self.clearInput("#AddInspectionDate", "#AddQcDecision");
                $("#AddRepairQuantity").val("0");
                $("#AddScrappedQty").val("0");
                $("#AddQuantity").val(formData.allQty());
               // $("#AddQuantity").val($("#AddInspectionQuantity").val());
                $("#UserStar").hide();
                $("#DateStar").hide();
                $("#AddQcDecision").attr("disabled", "disabled");
                $("#AddInspectionUser").attr("disabled", "disabled");
                $("#btnSelectUser").hide();
                $("#AddInspectionDate").attr("disabled", "disabled");
                $("#AddScrappedQty").attr("disabled", "disabled");
                $("#AddRepairQuantity").attr("disabled", "disabled");
                $("#InspectionUserID").val("");
            }
            }
        else {
            if (str == "N") {
                console.log("false");
                $("#QcDecision").removeAttr("disabled");
                $("#Name button").show();
                $("#btnSelectUser").show();
          
            } else {
                //console.log("Y")
                //$("#AddQcDecision").removeAttr("disabled");
                $("#AddInspectionUser").removeAttr("disabled");
                $("#btnSelectUser").show();
             
            }
            }
    }

    //品质判定变动
    this.qcChanges = function (Qqty) {
        var qc = $("#QcDecision").val();
       // console.log(qc);
        if (qc && qc.substring(5,18) == "0201213000090") {//NG
           // $("#OKQuantity").val(0);
           // $("#NGquantity").val(0);
        }
        else if (qc && qc.substring(5, 18) == "0201213000091") {//Ok
            var qty = $("#InspectionQuantity").val();
            $("#OKQuantity").val(Qqty);
            $("#RepairedQuantity").val(0);
            $("#ScrappedQuantity").val(0);
            $("#NGquantity").val(0);
            
        }

        $(".J-required").show();

    }

    //刷新
    this.refreshClick = function () {
        if (!table)
            return;

        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
          
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();

        }, fields.Isleave);
    };

    //查询
    this.searchClick = function () {
 
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);

        }, null);
    };

    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }          
       table.save(null, null, true);
    }

    //add  
    this.addClick = function () {      

        //如果登录者是品管
        mf.ajax({
            type: "Get",
            url: "/MES/api/Util/CheckUserRole",
            data: {},
            success: function (data) {
                if (data) { //true
                    mf.ajax({
                        type: "Get",
                        url: "/MES/api/Util/GetUser",
                        data: {},
                        success: function (data) {
                            if (data.UserName)
                                $("#AddInspectionUser").val(data.UserName);
                            InspectionUserID = data.MESUserID;
                            //console.log(JSON.stringify(data));
                        }
                    });
                   
                }
            }
        });


        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/QualityManagement/Qcs00007GetTypeList",
            data: ({ "Code": "QCS02", "Token": token }),
            success: function (data) {
                console.log("type"+ JSON.stringify(data))
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr[i] = { text: data[i].Code, value: data[i].value };
                    if (data[i].isDefault) {//预设值
                        $("#DocumentType").val(arr[i].text);
                        formData.autoNoType(arr[i].value);
                    } 
                }

                if (!$("#DocumentType").val()) {
                    // 第一项 qcs02
                    $("#DocumentType").val(arr[0].text);
                    formData.autoNoType(arr[0].value);
                }
           

                formData.TypeArray(arr);     
            }
        });

     
       
        
        $("#AddDate").val(model.getDateYMDHMS());
        $("#AddInspectionDate").val(model.getDateYMDHMS());
     
        var code = "";
      
       // $("#AddCode").val(code);
        $("#AddInspectionQuantity").val("0");
        $("#AddScrappedQty").val("0");
        $("#AddRepairQuantity").val("0");
        $("#AddQuantity").val("0");

        //首件检验
        $("#AddType").val(mf.systemID + "0201213000080");
        formData.myInsMethod(mf.systemID + "0201213000080");

        //状态
        $("#AddStatus option:first-child").attr("selected", true);
       
        model.getAutoNumber();
        $('#AddDialog').modal("show");
    }

    //修改
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    }

    //删除
    this.deleteClick = function () {
        if (!table)
            return;

        table.deleteRow();

    }


    //导入
    this.importClick = function () {
        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnImport").unbind();
        $("#BtnBrowse").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectFile);
            }

        });

        $("#BtnFile").click(function () {
            $("#BtnFile").click();
        });

        $("#BtnImport").click(function () {
            var formData = new FormData();
            formData.append("File", document.getElementById("BtnFile").files[0]);
            formData.append("Token", token);

            mf.ajax({ 
                type: "POST",
                url:  "/MES/api/ImportFile/Qcs00007Import",
                data: formData,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (res) {
                    if (res.status == 200) {
                        msg.success(fields.Prompt, fields.Import + fields.Success);
                        table.loadData();
                        $('#ImportDialog').modal('hide');
                    } else {
                        msg.info(fields.Prompt, res.msg, function () {
                            table.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    }                                 
                }
            })
        });
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    }

    //导出
    this.exportClick = function () {
        table.loadDataBack(null, function () {

           
            if (ExportTotal == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }
     
            window.location.href = mf.domain + '/MES/api/ExportFile/Qcs00007Export?Token=' + token + "&InspectionNo=" + formData.InspectionNo() + "&Status=" + formData.Status();
        });
    }


    //检验详细 
    //点击弹窗
    this.InspectionDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }
        Flag = row.Flag;
        InspectionId = "";
        InspectionId = row.InspectionDocumentID;
       
        ItemID = row.ItemID;
        
        status = row.Status;              
            //料品代號
            //料品名稱 / 規格
            //製程代號
            //製程說明
            //工序代號
            //工序說明
       
            $("#DialogItemNo").val(row.ItemCode);
            $("#DialogItemDescAndSpec").val(row.DescAndSpec);

            var pro = row.ProcessDesc;
            var proArr = [], opeArr = [];
            if (pro)
                proArr = pro.split(" ");
            if (row.OperationDesc)
                opeArr = row.OperationDesc.split(' ');

            $("#DialogProcessNo").val(proArr[0]);
            $("#DialogProcessDescription").val(proArr[1]);

            $("#DialogWorkOrderNo").val(opeArr[0]);
            $("#DialogWorkOrderDescription").val(opeArr[1]);

            InspectDetailListTable.loadData();
            $("#InspectionDetailDialog").modal("show");
    }

    //保存
    this.InspDetailSave = function () {

        if (InspectDetailListTable)
            InspectDetailListTable.save(function () {
                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                window.location.reload();
            }, null, true);
        else
            return;
    }
    //不良原因明细
    this.BadReasonDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = InspectDetailListTable.getRowData($tr);
        DetailId = row.InspectionDocumentDetailID;
        Sequence = row.Sequence;
     
        
        BadReasonDetailTable.loadData();
        $('#BadReasonDetailDialog').modal("show");
    }

    // 结果说明明细 
    this.ResultsDetailClick = function (obj) {
        // 
        var $tr = $(obj).parent().parent();
        var row = InspectDetailListTable.getRowData($tr);
        Sequence = "";
        DetailId = "";

        Sequence = row.Sequence;        
        DetailId = row.InspectionDocumentDetailID;
      
        ResultsDetailTable.loadData();
        $("#ResultsDetailDialog").modal("show");
     
    }

    //不良原因码
    //搜索
    this.ReasonCodeSearch = function () {
        if (BadReasonCodeTable) {
            BadReasonCodeTable.loadData(null, null, 1);
        } else {
            return;
        }
    }

    //不良原因信息
    //增加
    this.AddBadReasonDetailClick = function () {
        if (!BadReasonDetailTable)
            return;
        BadReasonDetailTable.addRow();
    }

    //编辑
    this.ChangeBadReasonDetailClick = function () {
        if (!BadReasonDetailTable)
            return;
        BadReasonDetailTable.editRow();
    }

    //删除
    this.DeleteBadReasonDetailClick = function () {
        if (!BadReasonDetailTable)
            return;
        BadReasonDetailTable.deleteRow();
    }

    //保存不良原因详细
    $("#BadReasonDetailConfirm").click(function () {
        if (!BadReasonDetailTable) return;
        if (!$("#ReasonCode input").val()) {
            msg.info(fields.Prompt, fields.BadReasonCode + fields.MustNotNull);
            return;
        }
        BadReasonDetailTable.save(null, null, true);
        // $("#BadReasonDetailDialog").modal("hide");
});



    //结果说明详细
    //新增
    this.AddResultsDetailClick = function () {
        if (!ResultsDetailTable)
            return;
        ResultsDetailTable.addRow();
    }

    //删除
    this.DeleteResultsDetailClick = function () {
        if (!ResultsDetailTable)
            return;
      
            ResultsDetailTable.deleteRow();    
    }

    //编辑
    this.ChangeResultsDetailClick = function () {
        if (!ResultsDetailTable)
            return;
            ResultsDetailTable.editRow();
    }

    //save
    $("#ResultsDetailConfirm").click(function () {
        if (!ResultsDetailTable)
            return;

        if (!$("#Remark").val()) {
            msg.info(fields.Prompt, fields.Remark + fields.MustNotNull);
            return;
        }
        ResultsDetailTable.save(null, null, true);

    })

    //检验人员
    //保存
    $("#InspectorsConfirm").click(function () {
        var row = InspectorsTable.getSelectedData();
        if (row) {
            InspectionUserID = row.MESUserID;
   
            $("#InspectorsDialog").modal("hide");
            $("#AddInspectionUser").val(row.UserName);
        }
    });

    //任务单单号
    //搜索
    this.TaskNoSearch = function () {
       // TaskCode = formData.TaskNo();
       
        TaskNoTable.goForwordSafely(function () {
            TaskNoTable.loadData(null, null, 1);
        }, null);
    }

    //新增
    //任务单弹窗
    this.SearchTask = function () {
        
        formData.TaskNo("");
        $("#TaskNoInput").val("");
        $("#ProcessNo").val("");
        $("#ProcessDescription").val("");

        TaskNoTable.loadData();
        $("#TaskNoDialog").modal("show");
        $("#TaskNoDialog").modal({ backdrop: 'static', keyboard: false });  
    }

    //检验人员
    this.SearchUser = function () {
      
        $("#InspectorsDialog").modal({ backdrop: 'static', keyboard: false });
        InspectorsTable.loadData();
          $("#InspectorsDialog").modal("show");

    }

    //新增： 检验人员的确认
    $("#InspectorsConfirm").click(function () {
        var row = InspectorsTable.getSelectedData();
        if (row) {
            $("#AddInspectionUser").val(row.UserName);
        }

    });

    //新增：任务单 确认
    $("#TaskNoConfirm").click(function () {
        var row = TaskNoTable.getSelectedData();
        if (row) {
            $("#AddTaskCode").val(row.TaskNo);
            $("#AddTaskCode").attr("title", row.TaskNo);
            $("#AddItemCode").val(row.ItemCode);
            $("#AddItemDesc").val(row.DescriptionSpec);
            $("#AddProcessAndDesc").val(row.ProcessCode + " " + row.ProcessName);
            $("#AddMoNo").val(row.MoCode);
            $("#AddOperationAndDesc").val(row.OperationCode + " " + row.OperationDescName);
            $("#AddDocQuantity").val(row.DocumentQuantity);
            $("#AddUnitDesc").val(row.UnitDescription);

            $('#TaskNoDialog').modal('hide');
            TaskDispatchID = row.TaskDispatchID;
            ItemID = row.ItemID;
        }
    });

      this.formatDate = function(date){
            return date >= 10 ? date : "0"+date;
        }
    //年-月-日 
    this.getDateYMDHMS = function () {
        var d = new Date();
        //填入时间
        //有些时间是7:1分这种，补全为 07:01
 
        var date = d.getFullYear() + "-" + model.formatDate((d.getMonth() + 1)) +
                "-" + model.formatDate(d.getDate()) + " ";
        return date;
    }

    this.getFullTime = function () {
        var d = new Date();
        //填入时间
        //有些时间是7:1分这种，补全为 07:01
   
        var date = d.getFullYear() + "-" + model.formatDate((d.getMonth() + 1)) +
                "-" + model.formatDate(d.getDate()) + " " + model.formatDate(d.getHours()) + ":" + model.formatDate(d.getMinutes()) + ":" + model.formatDate(d.getSeconds()) ;
        return date;
    }

    //主表 新增
    this.AddOrderClick = function () {
        //單號已存在
        if (InspectionNoArr.indexOf($("#AddCode").val()) != -1) {
            msg.info(fields.Prompt, fields.InsCodeExist);
            return;
        }

        var addCode = $('#AddCode').val(),
            addDate = $("#AddDate").val(),
            InspectionMethod = formData.myInsMethod(), //FPI
            addTaskCode = $('#AddTaskCode').val(),
            taskQty = $("#AddDocQuantity").val();
            itemCode = $("#AddItemCode").val(),
            itemDes = $("#AddItemDesc").val(),
            flag = $("#AddInspectionFlag").is(":checked"),
            unit = $("#AddUnitDesc").val(),
            AddInspectionDate = $("#AddInspectionDate").val(),
            selVal =$("#AddQcDecision").val(),
            insQty = $('#AddInspectionQuantity').val(),
            scQty = ($("#AddScrappedQty").val()),
            NG = ($("#AddRepairQuantity").val()),
            OK = ($("#AddQuantity").val()),
            moNo = $("#AddMoNo").val(),
            remark = $("#AddRemark").val();
       
            if (Number(OK) == 0) {
                OK = Number(insQty) - Number(NG) - Number(scQty);
            }
            
            var Decition;
          
        //检验数量大于0
            if (!flag) {
                if (Number(insQty) < 0) {
                    msg.info(fields.info, fields.InspNumberIsNonNegative);
                    return false;
                }
            }
        //检验数量不能为空
            if (!insQty || insQty.length == 0 || Number(insQty) == 0) {
                msg.info(fields.info, fields.InspNumberIsNull);
                return false;
            }

        ///** 驗證 **///

        if (!addDate) {
            msg.info(fields.info, fields.DocumentDateIsNull);
            return;
        }
        if (!addTaskCode) {
            msg.info(fields.info, fields.TaskCardNoIsNull);
            return;
        }

        if (Number(insQty) > Number(taskQty)) {
            msg.info(fields.info, fields.InspectionQuantity + fields.InspectionQuantityGreaterThanDocumentQuantity);
            return;
        }
           
        //判定选择之后，必填人员
        if (selVal) {
            if (!InspectionUserID) {
                msg.info(fields.info, fields.InspectionUserIsNull);
                return;
            }
        }

        //数量：检验数量 = 报废+返修+ok
       
        if ((Number(scQty) + Number(NG) + Number(OK)) != Number(insQty)) {
            msg.info(fields.info, fields.SumQuantityNotEqualToInspectionQuantity);
            console.log(Number(scQty) +" "+ Number(NG) +" "+ Number(OK)+ "==" + Number(insQty))
            return;
        }
        console.log(Number(scQty) + " " + Number(NG) + " " + Number(OK) + "==" + Number(insQty))
        var sta = formData.myStatus();        
        var data = {
            InspectionNo: addCode,
            DocumentDate: addDate,
            ItemID: ItemID,
            InspectionMethod: InspectionMethod,
            TaskDispatchID: TaskDispatchID,
            InspectionDate: AddInspectionDate ,
            InspectionUserID: InspectionUserID,
            QcDecision: selVal,
            FinQuantity: taskQty,
            InspectionQuantity: insQty,
            ScrappedQuantity: scQty,
            NGquantity: NG,
            OKQuantity: OK,
            Comments: remark,
            InspectionFlag: flag,
            Status: sta,
            DocumentAutoNumberID: AutoNumberID,
            DocumentID: formData.autoNoType()
        };
        console.log(data);

        if (!flag) {
            if (!InspectionUserID) {
                msg.info(fields.Prompt, fields.InspectionUserIsNull);
                return;
            }
        }
        if (addCode && itemCode) {
           
            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00007AddV3",
                data: JSON.stringify(data),
                success: function (data) {
                    console.log(data)
                    if (data.status == "200" || data.status == "400") {//400为表头新增成功，明细新增失败
                        
                        msg.success(fields.Prompt, data.msg, function () {
                            table.loadData();
                            $("#AddDialog").modal("hide");
                        });
                        
                    } else {
                        msg.error(fields.Prompt, data.msg, function () {
                            $("#AddDialog").modal("hide");
                        });
                        
                    }              
                }
            });           
        } else {
            msg.info(fields.Prompt, fields.NotAllRequiredMsgIsWrite);
        }

       table.loadData();
        model.ClearAddValue();
    }

    ////限制18位数，12位整数，6位小数
    //this.doCheck = function (that) {
    //    var val = $(that).val(),
    //        str = "";
    //    if (val.indexOf(".") != -1) {
    //        str =  val.replace(" ", "").split(".")
    //        if (str[0].length > 12 || str[1].length > 6) {
    //            msg.info(fields.Prompt, fields.InspectionQuantity + fields.IntMoreThan12OrDecMoreThan6);
    //            return;
    //        }
    //    } else {
    //        if (val.length > 12 ) {
    //            msg.info(fields.Prompt, fields.InspectionQuantity + fields.IntMoreThan12OrDecMoreThan6);
    //            return;
    //        }
    //    }
    //}


    //限制整数位<=12， 小数位<=6
    this.subStrQty = function (val) {
        var res = '';
        if (val.indexOf(".") != -1) {
            var arr = val.split(".");
            if (arr[1].length > 6) {
                var t1 = arr[1].substring(0, 6);
                var t2;
                if (arr[0].length > 12) {
                    t2 = arr[0].substring(0, 12);
                }
                if (t1) {
                    res = (t2 || arr[0]) + "." + (t1);
                } else {
                    res = (t2 || arr[0]) + ".";
                }
               
                //$(that).val((t2 || arr[0]) + "." + t1);
                //console.log(t2 + "." + t1)
            } else {
                res = val;
            }
        } else if (val.length > 12) {
            res = val.substring(0, 12);
            //$(that).val(val.substring(0, 12));
        } else {
            res = val;
        }
        return res;
        
    }

    //新增: 数量变动
    this.NewDataQtyChange = function (str, that, ele) {
        var qc = $("#AddQcDecision").val();
        var qty = $("#AddInspectionQuantity").val();
        var ngqty = $("#AddRepairQuantity").val();
        var scrappedqty = $("#AddScrappedQty").val();
        var docQuantity = $("#AddDocQuantity").val();
        var okQty = $("#AddQuantity").val();


       
        
        //if (qty && (/^\d{1,12}\.?(\d{0,6})$/.test(qty))) {
         var res = model.subStrQty(qty);         
         $("#AddQuantity").val(res);
     

        //限制整数位<=12， 小数位<=6
        var val = $(that).val() || $("#" + ele).val();


        var str = model.subStrQty(val);
        $(that).val(str);

        if (isNaN(scrappedqty)) {
            msg.info(fields.info, fields.ScrappedQtys + fields.OnlyNum);
            return false;
        }
        if (isNaN(ngqty)) {
            msg.info(fields.info, fields.RepairQuantity + fields.OnlyNum);
            return false;
        }

        //判定为拒收 
        if (qc && qc.substring(5, 18)== "0201213000090") {
            $("#AddQuantity").val("0");
            if (str == "ng") {
                var newqty = Number(qty) - Number(ngqty);
                if (newqty < 0) { //NG数量大于检验数量
                    newqty = 0;
                    $("#AddScrappedQty").val(newqty);
                    $("#AddRepairQuantity").val("0");
                    msg.info(fields.info, fields.NGQtyMoreThanInspectionQuantity);
                    return;
                }             
            } else {

                qty = $("#AddInspectionQuantity").val();
                scrappedqty = $("#AddScrappedQty").val();
                var newqty = Number(qty) - Number(scrappedqty);
                if (newqty < 0) {
                    newqty = 0;
                }
                $("#AddRepairQuantity").val(newqty);
            }
        } else {
            //var newqty = Number(qty) - Number(scrappedqty) - Number(ngqty);
            //if (newqty < 0) {
            //    newqty = 0;
            //}
            //$("#AddQuantity").val(newqty);
        }

       // $("#AddQuantity").val(Number(qty) - Number(ngqty) - Number(scrappedqty));

   
        
        //报废数量大于检验数量
        if (Number(scrappedqty) > Number(docQuantity)) {
            $("#AddScrappedQuantity").val("0");
            msg.info(fields.info, fields.NGQtyMoreThanInspectionQuantity);
            return;
        }

        if (Number(okQty) < 0) {
            $("#AddQuantity").val("0");
            msg.info(fields.info, fields.OKQtyIsLessThan0);
            return;
        }

    }



    //新增： 判定之后，日期立即出现
    $("#AddQcDecision").change(function () {
        var date = model.getDateYMDHMS();
        $("#AddInspectionDate").val(date);
        if ($("#AddQcDecision").val())
            $("#UserStar").show();
        else
            $("#UserStar").hide();
       // console.log(date);
    });

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };


    //新增：栏位资料清除
    this.ClearAddValue = function () {
       // $("#AddCode").attr("disabled", false);
        self.clearInput("#AddCode", "#AddDate");
        self.clearInput("#AddFinishSequence", "#AddItemId");
        self.clearInput("#AddItemCode", "#AddItemDesc");
        self.clearInput("#AddTaskId", "#AddTaskCode");
        self.clearInput("#AddFinQuantity", "#AddInspectionQuantity");
        self.clearInput("#AddScrappedQty", "#AddQuantity");
        self.clearInput("#AddUnitDesc", "#AddMoNo");
        self.clearInput("#AddProcessAndDesc", "#AddOperationAndDesc");
        self.clearInput("#AddInspectionUserId", "#AddInspectionUser");
        self.clearInput("#AddInspectionDate", "#AddRepairQuantity");
        self.clearInput("#AddRemark", "#DocumentType");

        if ($("#AddInspectionFlag").is(":checked")) {
            $("#AddInspectionFlag").prop("checked", false);
            self.ChangeFlag("#AddInspectionFlag", 'Y')
        }

        //$("#AddType").val(status2[0]);//首件检验

        $("#AddQcDecision").val("");
        $("#UserStar").hide();
        $("#DateStar").hide();

    };


    //检验明细
  
    //修改
    this.ChangeDetailClick = function(){
        if (InspectDetailListTable) {
            InspectDetailListTable.editRow();
        } else {
            return;
        }
    }

    this.doCancel = function () {
        
        InspectDetailListTable.goForword(function () {
            //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            //window.location.reload();
            $("#InspectionDetailDialog").modal("hide");

        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();

        }, fields.Isleave);
        InspectionId = "";
        DetailId = "";
    }

    //结果说明  取消
    this.cancelResult = function () {
        if (!ResultsDetailTable)
            return;
        ResultsDetailTable.goForword(function () {
            ResultsDetailTable.loadData();
            $('#ResultsDetailDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ResultsDetailDialog').modal("hide");
        }, fields.Isleave);
    }

    //不良原因 取消
    this.cancelBadR = function () {
        if (!BadReasonDetailTable)
            return;
        BadReasonDetailTable.goForword(function () {
            BadReasonDetailTable.loadData();
            $('#BadReasonDetailDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            //$('#BadReasonDetailDialog').modal("hide");
        }, fields.Isleave);
    }

}


var arrayWord = ["InspectionNo", "Status", "WorkOrderDescription", "WorkOrderNo", "ProcessDescription", "ProcessNo", "QualityJudgment", "InspectionQuantity", "InspectionDate", "Inspectors"
  , "Unit", "InspectionFlag", "DocumentQuantity", "ItemDescAndSpec", "ItemNo", "TaskNo", "TestType", "DocumentDate", "InspectionNo", "LoginAccount", "Name", "WorkNumber",
"DialogTaskNo", "ScrappedQty", "Remark", "Confirm", "Billing", "Invalid", "Inspectors", "WorkNumber", "Quantity", "RepairQuantity", 'CreatedBy', 'CreatedDate', 'LastChangedBy',
'LastChangedBy', 'LastChangedDate', "InspectionDetail", "TestItemsNo", "TestItemsDec", "Sequence", "SamplingQuantity", "AQL", "AC", "RE", "AdverseQty", "MeasuredValue",
"RowNo", "InspectionInstructions", "BadReasonCode", "ReasonDescription", "ReasonCode", "ReasonDescription", "ReasonFile", "BadReasonDetail", "ResultsDetail",
"Add", "Cancel", "Deletion", "Change", "Save", "Search", "TaskOrderAssignmentMaster", "GreaterThanZero", "SumQuantityNotEqualToInspectionQuantity", "AdverseQtyGreaterThanSamplingQty",
"InspNumberIsNonNegative", "InspectionQuantityIntIsOver", "InspectionQuantityGreaterThanDocumentQuantity", "RemovableQuantity", "InspectionUserIsNull", "info",
"MeasuredValueIsIncorrect", "InspectionQuantityIsZero", "InspectionDateIsNull", "Decision", "MoNo", "ManufacturingProcess", "Process", "AddProcessFirstInspection", "DocumentDate", "TestType",
"TaskSequence", "InspectionFlag", "InspectionUser", "InspectionCodeIsNull", "DocumentDateIsNull", "TaskCardNoIsNull", "OKQtyIsLessThan0", "ScrappedQtyMoreThanInspectionQuantity", "NGQtyMoreThanInspectionQuantity",
"NotAllRequiredMsgIsWrite", "WorkNumber", "TestStandard", "Disadvantages", "Prompt", "AccountNo", "DocumentType", "NoDataCanBeExported", "IsRequired", "Browse", "Import", "InspectionUserIsNull",
"OnlyNum", "InsCodeExist", "PleaseSelectFile", "MustNotNull", "ThereOnlyInputNumber", "Success", "ScrappedQtys", "Isnotedit",
"StatusIs", "InspNumberIsNull", "IntMoreThan12OrDecMoreThan6", "MoreThan12", "MoreThan6", "InputError", "QcDecisionIsNull", "ProcessNo", "ProcessDescription", "TransferAmount"
];

words = arrayWord.join();

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

function Subtr(arg1, arg2) {

    return ((arg1 * 1000000 - arg2 * 1000000) / 1000000).toFixed(6);
}

//初始页面数据
mf.toolBar('#container');
initPage = function () {

    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000006,019121300005C,0191213000061,0191213000001" },// , ,质量判定
        success: function (data) {
            parameters = data;         
            model = new viewModel();
       
        }
    });
  
    //获取判定方式
    mf.ajax({
        type: "Get",
        url: "/MES/api/IntelligentParameter/Inf00020GetValue",
        data: { Token: token },
        success: function (pa) {
            console.log(pa)
            JType = pa;
        }
    });
   
}


   
