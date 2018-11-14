var URL = "/MES/QualityManagement/QCS00005";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;

//时间插件翻译
function lang() {
    var lang = [];
    var Lang;
    if (language.length > 2) {
        lang = language.split('-');
        var Lang = lang[0] + '-' + lang[1].toString().toUpperCase();
    }
    else {
        Lang = "en";
    }
    return Lang;
}

var viewModel = function () {
    var self = this;
    var checkTestSettingID = null, DetailId, CodeId, HeaderStatus, HeaderInspectionFlag, InspectionLevelID;
    var Lang = lang();
    var flag = false;
    var InspectionDocumentReasonID;
    var InspectionDocumentID = ""//单据编号

    var userName = window.top.$parentNode.querySelector("#username").innerText.split(":")[1];
    var userID = "";
    var flags = true;//保养人员查询条件默认显示登录名的时候，获取保养人员窗口的数据，遍历该数据，选取对应名字的id号，当开窗选取保养人员的时候，flags变为false，不在执行以上的遍历
    var documentFlag = true;
    var ones = true;
    var GetValue; //单据类别流水号
    var CategoryArr = []; //单据类别数组
    var GetDate = "";   //单据日期
    var addFlag = false;//控制获取单据类别日期在新增后执行
    var AddCode = "", EQcDecision = null;

        this.changLang = function (datestr) {
        return datestr.toLowerCase()
    }
    var langstr = this.changLang(Lang)
    
    //获取品質判定方式
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentParameter/Inf00020GetValue",
        success: function (data) {
            EQcDecision = data;
        }
    });


    //日期元件
    $("#AddDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        language: langstr,
    });
    
    $("#AddInspectionDate").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        language: langstr,
    });


    var formData = {
        InspectionNo: ko.observable(""),
        Status: ko.observable(""),
        StatusList: ko.observableArray(parameters.PT0191213000006),
        InspectionTypeList: ko.observableArray(parameters.PT019121300005C),
        Qc: ko.observable(""),
        QcList: ko.observableArray(parameters.PT0191213000061),//parameters.PT0191213000061,
        DocumentCategoryList: ko.observableArray(),
        GetValue: ko.observable(),
        GetDate: ko.observable(),
        DocumentType:ko.observable(),
        CteforyChange: function (data) {
            if (!addFlag) {
                this.GetDate(mf.format.Date(new Date()));
            } else {
                this.GetDate($("#AddDate").val());
            }
            console.log(this.GetValue())
            this.GetValue(this.DocumentType().value);
            self.getAutoNo(this.GetValue(), this.GetDate());
            flag = true;
        },
        Dates: ko.observable(),
        dateChange: function () {
            if (flag) {
                this.GetDate($("#AddDate").val());
                this.GetValue(this.DocumentType().value);
                self.getAutoNo(this.GetValue(), this.GetDate());
               // documentFlag = false;
            }
            
        },
        InspectionType: mf.systemID + '020121300007E',
        AddSatus: mf.systemID + '020121300008D',
        DocumentAutoNumberID:ko.observable() //单据流水号
    };
    ko.applyBindings(formData);



    console.log(parameters.PT019121300005C)
    //this.test = function () { console.log(111) }

    this.getAutoNo = function(value, date) {
     
        var searchData = {};
        searchData.value = value;
        searchData.Date = date;
        if (value) {
            mf.ajax({
                type: 'Get',
                async: false,
                url: "/MES/api/QualityManagement/Qcs00005GetAutoNumber",
                data: searchData,
                success: function (data) {
                    formData.DocumentAutoNumberID(data.DocumentAutoNumberID)
                    $("#AddCode").val(data.AutoNumber);
                    AddCode = data.AutoNumber;
                    InspectionDocumentID = data.DocumentAutoNumberID
                }
            });
        }        
    }

    //获取单据类别
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/QualityManagement/Qcs00005GetTypeList",
        data: {},
        success: function (data) {
            console.log(data)
            //  formData.DocumentCategoryList(data)
            //var pushFlag = false;num;
            //for (var i = 0; i < data.length; i++) {     
            //    if (data[i].IfDefault == true) {
            //        CategoryArr.push({ value: data[i].value, text: data[i].Name })
            //        num = i;
            //        pushFlag = true;//是true，则把CategoryArr数组切掉num这一项
            //        break;
            //    } else {
            //        break;
            //    }
               
            //}
            //if (pushFlag) {
            //    data.splice(num, 1);
            //}
            for (var i = 0; i < data.length; i++) {
                 CategoryArr.push({ value: data[i].value, text: data[i].Name })       
            }
           // CategoryArr.push({ value: "12345", text: "显示测试" })
            formData.DocumentCategoryList(CategoryArr)

            // if (data && data.length > 0) {
            // formData.DocumentShow(data[0].Name)
            // formData.DocumentValue(data[0].value)
            // console.log(data[1].value)
          //  CategoryArr.push({ value: "12345", text: "显示测试" })
           // formData.DocumentType(data[0].value)
           // formData.DocumentCategoryList(CategoryArr)
            //AccountTable.loadData();
            // console.log(formData.DocumentType())
            //  }

        }
    });

    //获取参数判断新增时检验人员是否需要预设
    var isNotPreset;

    mf.ajax({
        type: 'get',
        url: '/MES/api/Util/CheckUserRole',
        data: {},
        success: function (data) {
            isNotPreset = data
        }
    })



    //完工单据开窗资料
    var FinishTable = new mf.Table("#FinishTable", {
        uniqueId: "FinishId",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionFinishBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var SearchCode = $("#TxtFinishedNumberSearch").val();
            if (SearchCode && SearchCode.length > 0) {
                searchData.CompletionNo = SearchCode + "";
            }

            var SearchItem = $("#TxtItemCodeSearch").val();
            if (SearchItem && SearchItem.length > 0) {
                searchData.Code = SearchItem + "";
            }
            
          //  searchData.CompletionNo = $("#TxtFinishedNumberSearch").val();
            //  searchData.Code = $("#TxtItemCodeSearch").val();

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
   
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetFinishListV1',
                data: searchData,
                success: function (data) {
      
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "CompletionNo",
        height: 300,
        columns: [
            {
                field: 'CompletionNo', title: fields.FinishNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Sequence', title: fields.FinishSequence, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'DescAndSpec', title: fields.ItemDescAndSpec, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'OperationDescription', title: fields.WorkOrderDescription, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //完工单据开窗查询
    this.DialogFinishedSearch = function () {
       // FinishTable.goForwordSafely(function () {
        FinishTable.loadData(null, null, 1);
        //}, null);
    };

    //完工单据开窗
    this.SearchFinish = function () {
        $("#FinishDialog").modal("show");
        $("#FinishDialog").modal({ backdrop: 'static', keyboard: false });
        FinishTable.loadData();
        $("#FinishCommit").unbind();
        $("#FinishCommit").click(function () {
            var row = FinishTable.getSelectedData();
            if (row) {
                $("#AddFinishId").val(row.CompletionOrderID);
                $("#AddFinishCode").val(row.CompletionNo);
                $("#AddFinishSequence").val(row.Sequence);
                $("#AddItemId").val(row.ItemID);
                $("#AddItemCode").val(row.Code);
                $("#AddItemDesc").val(row.DescAndSpec);
                $("#AddTaskId").val(row.TaskDispatchID);
                $("#AddTaskCode").val(row.TaskNo);
                $("#AddFinQuantity").val(row.Quantity);
                $("#AddInspectionQuantity").attr("max", row.Quantity)
                $("#AddInspectionQuantity").val(row.Quantity);
                $("#AddQuantity").val(row.Quantity);
                $("#AddUnitDesc").val(row.UnitDescription);
                $("#AddMoNo").val(row.MoCode);
                $("#AddProcessAndDesc").val(row.ProcessCode)//row.ProcessCode + " " + row.ProcessDescription);
                $("#AddOperationAndDesc").val(row.OperationCode)//((row.OperationCode) ? row.OperationCode : "") + " " + ((row.OperationDescription) ? row.OperationDescription : ""));
                $("#FinishDialog").modal("hide");
                self.clearInput("#TxtFinishedNumberSearch", "#TxtItemCodeSearch");
            }
        });
    }

    //检验人员开窗资料
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

            accountSearch = $("#TxtAccountSearch").val();
            if (accountSearch && accountSearch.length > 0) {
                searchData.Account = accountSearch + "";
            }

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            //searchData.status = "1";

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: searchData,
                success: function (data) {
                    success(data);
                    if (data.rows.length <= 0) {
                        AccountTable.clean();
                        return;
                    }
                    var num;
                    for (var i = 0; i < data.rows.length; i++) {

                        if (data.rows[i].Account == userName.trim()) {
                            num = i
                            break;
                        }
                    }

                    if (isNotPreset) {
                 
                        userID = data.rows[num].MESUserID;
                        if (flags) {
                            $("#AddInspectionUser").val(data.rows[num].Account);
                            $("#AddInspectionUserId").val(data.rows[num].MESUserID);
                            //  formData.AccountCode(data.rows[num].MESUserID)
                            // formData.Emplno(data.rows[num].Emplno)
                        }
                    }
                    

                    //else {
                    //    $("#AddInspectionUser").val(userName)
                    //}

                   // formData.MaintenanceUser(userName)

                    // MainTable.loadData();
                    
   
                    
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
            },
            {
                field: 'Account', title: fields.LogonAccount, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    AccountTable.loadData();
    




    //检验人员开窗查询
    this.DialogAccountSearch = function () {

        isNotPreset = false;
     //   AccountTable.goForwordSafely(function () {
        AccountTable.loadData(null, null, 1);
       // }, null);
    };

    //检验人员开窗
    this.SearchUser = function () {
        $("#AccountDialog").modal("show");
        $("#AccountDialog").modal({ backdrop: 'static', keyboard: false });
        AccountTable.loadData();
        $("#AccountCommit").unbind();
        $("#AccountCommit").click(function () {
            var row = AccountTable.getSelectedData();
            if (row) {
                $("#AddInspectionUserId").val(row.MESUserID);
                $("#AddInspectionUser").val(row.UserName);
                $("#AccountDialog").modal("hide");
                self.clearInput("#TxtWorkNumberSearch", "#TxtAccountSearch");
                flags = false;
            }
        });
    }

    //原因码资料
    var ReasonList = new mf.Table("#ReasonListTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionReasonListBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Type = "QCS";
            //searchData.status = "1";

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
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
                field: "ParameterID", title: "",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })), 
            },
            {
                field: 'Code', title: fields.ReasonCo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //不良原因明细资料
    var ReasonTable = new mf.Table("#ReasonTable", {
        uniqueId: "ID",
        editable:false,
        paginationBar: new mf.PaginationBar("#paginagionReasonBar"),

        fn_getData: function (pagination, searchData, success) {
            //var ComplaintNoId = $("#InspectionID").val();
            //var StartOrderCode = $("#StartOrderNo").val();
            //var EndOrderCode = $("#EndOrderNo").val();

            searchData = {};
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.InspectionDocumentID = CodeId;
            searchData.InspectionDocumentDetailID = DetailId;
            //searchData.ComplaintID = ComplaintNoId;
            //searchData.StartOrderCode = StartOrderCode;
            //searchData.EndOrderCode = EndOrderCode;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00005GetReasonList',
                data: searchData,
                success: function (data) {
                    //  ReasonTable.setOption({ editable: true })
   
                    success(data);

                }
            });
        },

        fn_saveData: function (saveData, success) {
            var arr = []
            for (var row = 0; row < saveData.deleted.length; row++) {
                saveData.deleted[row].InspectionDocumentReasonID = InspectionDocumentReasonID;
               
                saveData.deleted[row].InspectionDocumentID = CodeId;
                saveData.deleted[row].InspectionDocumentDetailID = DetailId;
             //   saveData.deleted[row].ReasonID = saveData.deleted[row].ReasonId;
            }

            for (var row = 0; row < saveData.inserted.length; row++) {
                saveData.inserted[row].InspectionDocumentReasonID = saveData.inserted[row].ID;
                saveData.inserted[row].InspectionDocumentID = CodeId;
                saveData.inserted[row].InspectionDocumentDetailID = DetailId;
              //  saveData.inserted[row].ReasonID = saveData.inserted[row].ReasonId;
            }

            for (var row = 0; row < saveData.updated.length; row++) {
                saveData.updated[row].InspectionDocumentReasonID = InspectionDocumentReasonID;
               // console.log(saveData.updated[row])
                saveData.updated[row].InspectionDocumentID = CodeId;
                saveData.updated[row].InspectionDocumentDetailID = DetailId;
              //  saveData.updated[row].ReasonID = saveData.updated[row].ReasonId;
            }
            
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00005ReasonSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_checkeditable: function ($selectedRow) {
            if (HeaderStatus.substring(5, 18) == "020121300002A" || HeaderStatus.substring(5, 18) == "020121300002B") {
                return true;
            }
            else {
                return false;
            }
        },
        fn_onRowClick: function (data) {

            InspectionDocumentReasonID = data.InspectionDocumentReasonID;
            ReasonTable.setOption({ editable: true });
        },
        focusField: "ReasonCode",
        focusEditField: "ReasonCode",
        height: 300,
        columns: [
            {
                field: 'Sequence', title: "", align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ReasonCode', title: fields.BadReasonCode, align: "center", require: true,
                rander: new mf.FKRander("#ReasonListDialog",
                                         "#ReasonListCommit",
                                         ReasonList,
                                         new mf.TextRander(
                                             { title: "title", readonly: "readonly" }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonName", e.data.Name);
                    table.setEditingColumnValue($row, "Comments", e.data.Comments);
  
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.BadReasonIsNull)
                ]
            },
            {
                field: 'ReasonID', title: fields.ReasonDescription, align: "center",visible:false,
                rander: new mf.TextRander({ readonly: "readonly", title: "title" })
            },
            {
                field: 'ReasonName', title: fields.ReasonDescription, align: "center",
                rander: new mf.TextRander({ readonly:"readonly", title: "title" })
            },
            {
                field: 'Comments', title: fields.ReasonDescription, align: "center",visible:false,
                rander: new mf.TextRander({ readonly: "readonly", title: "title" })
            }
        ]
    });

    //开启不良原因明细
    this.ReasonClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = DetailTable.getRowData($tr);
        DetailId = row.InspectionDocumentDetailID;
        $('#ReasonDialog').modal("show");
        ReasonTable.loadData();
    }

    //不良原因明细添加
    this.AddReasonClick = function () {
        if (!ReasonTable)
            return;
        ReasonTable.setOption({ editable: true })
        ReasonTable.addRow();
        var $trlength = ReasonTable.getAllRowData().length;
        if ($trlength > 1) {
            var array = $.map(ReasonTable.getAllRowData(),
                function (item, index) {
                    return Number(item.Sequence);
                });
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#ReasonTable").val(sequence);
        } else {
            $("#Sequence", "#ReasonTable").val(1);
        }
    }

    //不良原因明细编辑
    this.ChangeReasonClick = function () {
        if (!ReasonTable)
            return;

        ReasonTable.editRow();
    };

    //不良原因明细删除
    this.DeleteReasonClick = function () {
        if (!ReasonTable)
            return;
        ReasonTable.deleteRow();
    };

    //不良原因明细保存
    this.SaveReasonClick = function () {
        if (!ReasonTable)
            return;
        ReasonTable.save(null, null, true);
    };

    //不良原因明细关闭
    this.CancelReasonClick = function () {
        //if (!ReasonTable) {
        //    return;
        //}

        ReasonTable.goForword(function () {
            ReasonTable.loadData();
            $('#ReasonDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ReasonDialog').modal("hide");
        }, fields.Isleave);
    };

    //结果说明明细资料
    var ResultTable = new mf.Table("#ResultTable", {
        uniqueId: "InspectionDocumentRemarkID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResultBar"),
        fn_getData: function (pagination, searchData, success) {
            //var ComplaintNoId = $("#InspectionID").val();
            //var StartOrderCode = $("#StartOrderNo").val();
            //var EndOrderCode = $("#EndOrderNo").val();

            searchData = {};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.InspectionDocumentID = CodeId;
            searchData.InspectionDocumentDetailID = DetailId;

            //searchData.ComplaintID = ComplaintNoId;
            //searchData.StartOrderCode = StartOrderCode;
            //searchData.EndOrderCode = EndOrderCode;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00005GetRemarkList',
                data: searchData,
                success: function (data) {
                    
                    success(data);
                    ResultTable.setOption({ editable: true })
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var row = 0; row < saveData.deleted.length; row++) {
                saveData.deleted[row].InspectionDocumentID = CodeId;
                saveData.deleted[row].InspectionDocumentDetailID = DetailId;
            }

            for (var row = 0; row < saveData.inserted.length; row++) {
                saveData.inserted[row].InspectionDocumentID = CodeId;
                saveData.inserted[row].InspectionDocumentDetailID = DetailId;
            }

            for (var row = 0; row < saveData.updated.length; row++) {
                saveData.updated[row].InspectionDocumentID = CodeId;
                saveData.updated[row].InspectionDocumentDetailID = DetailId;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00005RemarkSave',
                data: JSON.stringify(saveData),
                success: function (data) {

                    success(data);
                }
            });
        },
        fn_checkeditable: function ($selectedRow) {
            ResultTable.setOption({ editable: true })
            if (HeaderStatus.substring(5,18) == "020121300002A" || HeaderStatus.substring(5, 18) == "020121300002B") {
                return true;
            }
            else {
                return false;
            }
        },
        fn_onRowClick: function () {
            ResultTable.setOption({ editable: true });
        },
        focusField: "Remark",
        focusEditField: "Remark",
        height: 300,
        columns: [
            {
                field: 'Sequence', title: "", align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Remark', title: fields.InspectionInstructions, align: "center", require:true,
                rander: new mf.TextRander({ size: 70, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.InspectionDetailIsNull)
                ]
            }
        ]
    });

    //开启结果说明明细
    this.ResultClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = DetailTable.getRowData($tr);
        DetailId = row.InspectionDocumentDetailID;
        $('#ResultDialog').modal("show");
        ResultTable.loadData();
    }

    //结果说明明细添加
    this.AddResultClick = function () {
        ResultTable.setOption({ editable: true })
        if (!ResultTable)
            return;

        ResultTable.addRow();

        var $trlength;
       

        if (ResultTable.getAllRowData()) {
             $trlength = ResultTable.getAllRowData().length;
        } else {
            $trlength = 0;
        }
        
        if ($trlength > 1) {
            var array = $.map(ResultTable.getAllRowData(),
                function (item, index) {
                    return Number(item.Sequence);
                });
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#ResultTable").val(sequence);
        } else {
            $("#Sequence", "#ResultTable").val(1);
        }
    }

    //结果说明明细编辑
    this.ChangeResultClick = function () {
        if (!ResultTable)
            return;

        ResultTable.editRow();
    };

    //结果说明明细删除
    this.DeleteResultClick = function () {
        if (!ResultTable)
            return;
        ResultTable.deleteRow();
    };

    //结果说明明细保存
    this.SaveResultClick = function () {
        if (!ResultTable)
            return;
        ResultTable.save(null, null, true);
    };

    //结果说明明细关闭
    this.CancelResultClick = function () {
        if (!ResultTable) {
            return;
        }
        ResultTable.goForword(function () {
            ResultTable.loadData();
            $('#ResultDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ResultDialog').modal("hide");
        }, fields.Isleave);
    };

    var AttributeRander = { size: 14, title: true, disabled:"disabled" };
    var AttributeChecker = new mf.IsOnlyNumberChecker(fields.MeasuredValueIsOnlyNo);

    var DetailAttribute = { "字符型（C）": "D", "数值型（D）": "C", "不需要（N）": "N", }
    var SampleQuantity = "";

    var DetailArr = [
                {
                    field: 'Sequence', title: fields.Sequence, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'InspectionItemCode', title: fields.TestItemsNo, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'InspectionItemName', title: fields.TestItemsDec, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'InspectionStandard', title: fields.TestStandard, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'FaultDesc', title: fields.Disadvantages, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'SampleQuantity', title: fields.SamplingQuantity, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'AqlName', title: fields.AQL, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'AcQuantity', title: fields.AC, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'ReQuantity', title: fields.RE, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'Type', title: "", visible: false,
                    rander: new mf.TextRander()
                },
                {
                    field: 'NGquantity', title: fields.AdverseQty, align: "center", width: "150", defaultValue: 0,
                    rander: new mf.TextRander({ title: true, onchange: "model.DetailQtyChang(this)" }),
                    checkers: [
                            new mf.IsNonNegativeNumberChecker(fields.AdverseQty + fields.GreaterThanZero),
                            new mf.ConfigurableChecker(fields.AdverseQtyGreaterThanSamplingQty, function (value, $row) {
                                console.log(value)
                                
                               // var qty = $row.find("#SampleQuantity");
                                if(!SampleQuantity){
                                    SampleQuantity = 0;
                                }
                                if (Number(value) > Number(SampleQuantity)) {
                                    return true;
                                }
                                return false;
                            })
                    ]
                },
                {
                    field: 'AttributeType', title: "", align: "center", width: "400", visible: false,
                    rander: new mf.TextRander()
                },
                {
                    field: 'Attribute', title: fields.MeasuredValue, align: "center", width: "150",
                    rander: new mf.TextRander(AttributeRander),
                    checkers: [
                            new mf.ConfigurableChecker(fields.MeasuredValueIsIncorrect, function (value, $row) {
                                var type = $row.find("#AttributeType").val();
                                if (type.substring(5, 18) == "0201213000017") { //数值型
                                    if (isNaN(Number(value))) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                    ]
                },
                {
                    field: 'QcDecision', title: fields.Decision, align: "center", width: "100", require: true,
                    rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000061,
                        {
                            title: true,
                            fn_onSetEditingValue: function (value) {
                                var list = [];
                                for (var j = 0, i = 0; i < parameters.PT0191213000061.length; i++) {
                                    if (parameters.PT0191213000061[i].value.substring(5,18) != "0201213000098") {
                                        list[j] = parameters.PT0191213000061[i];
                                        j++;
                                    }
                                }
                                return list;
                            }
                        }),
                    checkers: [
                        new mf.ConfigurableChecker("請選擇判定項目", function (value, $row) {
                            if (value == null || value == "") {
                                return true;
                            }
                            return false;
                        })
                    ]
                },
                {
                    field: 'Comments', title: fields.Remark, align: "center", width: "200",
                    rander: new mf.TextRander({ title: true, maxLength: 120 })
                },
                {
                    field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                    rander: new mf.TextTimeRander()
                },
                {
                    field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                    rander: new mf.StaticValueRander()
                },
                {
                    field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                    rander: new mf.TextTimeRander()
                }
    ]

    this.DetailJudge = function () {

    }

    //明细资料
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "InspectionDocumentDetailID",
        paginationBar: new mf.PaginationBar("#paginagionDetailBar"),
        editable:false,
        operateColumWidth: "200px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:200px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="ReasonButton" onclick="model.ReasonClick(this)" title="' + fields.BadReasonDetail + '" >' + fields.BadReasonDetail + '</button>&nbsp;');
            $td.append('<button class="btn btn-success btn-sm" id="ResultButton" onclick="model.ResultClick(this)" title="' + fields.ResultsDetail + '" >' + fields.ResultsDetail + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            //var ComplaintNoId = $("#InspectionID").val();
            //var StartOrderCode = $("#StartOrderNo").val();
            //var EndOrderCode = $("#EndOrderNo").val();

            searchData = {};
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.InspectionDocumentID = CodeId;
            searchData.InspectionLevelID = InspectionLevelID;
            //searchData.ComplaintID = ComplaintNoId;
            //searchData.StartOrderCode = StartOrderCode;
            //searchData.EndOrderCode = EndOrderCode;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00005GetDetailsList',
                data: searchData,
                success: function (data) {
                    console.log(JSON.stringify(data))
                    success(data);
                    if (data.rows.length <= 0) return;
                    var strs = data.rows[0].Value.substring(5, data.rows[0].Value.length)
                        for (var i = 0; i < data.rows.length; i++) {
                            data.rows[i].AttributeType = DetailAttribute[data.rows[i].Attribute]
                        }
      
                    
                        if (strs == "02012130000B3") {
                            DetailArr[13].rander = new mf.AutoSelectRander("value", "text", parameters.PT0191213000061,
                            {
                                title: true,
                                disabled:'disabled',
                                fn_onSetEditingValue: function (value) {
                                    var list = [];
                                    for (var j = 0, i = 0; i < parameters.PT0191213000061.length; i++) {
                                        if (parameters.PT0191213000061[i].value.substring(5,18) != "0201213000098") {
                                            list[j] = parameters.PT0191213000061[i];
                                            j++;
                                        }
                                    }
                                    return list;
                                }
                            }) 
                        } else {
                            DetailArr[13].rander = new mf.AutoSelectRander("value", "text", parameters.PT0191213000061,
                            {
                                title: true,
                                fn_onSetEditingValue: function (value) {
                                    var list = [];
                                    for (var j = 0, i = 0; i < parameters.PT0191213000061.length; i++) {
                                        if (parameters.PT0191213000061[i].value.substring(5,18) != "0201213000098") {
                                            list[j] = parameters.PT0191213000061[i];
                                            j++;
                                        }
                                    }
                                    return list;
                                }
                            })
                        }
                    }
                });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00005DetailSave',
                data: JSON.stringify(saveData),
                success: function (data) {
    
                    DetailTable.setOption({ editable: true, });
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var AttributeType = data['AttributeType'];
            var $TxtAttribute = $row.find("#Attribute");
            var Type = data["Type"];
            var $QcDecision = $row.find("#QcDecision");

            if (AttributeType == "不需要（N）") {
                $TxtAttribute.attr("disabled", true);
            }

            if (Type == "Re") {//待改
                //若為RE且不良數>=RE 拒收
                if (Number($row.find("#NGquantity").val()) >= Number($row.find("#ReQuantity").val())) {
                    $QcDecision.val("NG");
                }
                $QcDecision.attr("disabled", true);
            }
        },
        fn_checkeditable: function ($selectedRow) {
            DetailTable.setOption({ eidtable: true })
        },
        fn_onRowClick: function (data) {
            DetailTable.setOption({ editable: true });
            SampleQuantity = data.SampleQuantity;
            InspectionLevelID = data.InspectionLevelID
            if (data.Attribute && data.Attribute.substring(5, data.Attribute.length) == "0201213000019") {
                  AttributeRander.disabled = "disabled"
            } else {
                  delete(AttributeRander.disabled)
            }
        },
        focusField: "Sequence",
        focusEditField: "InspectionItemId",
        height: 300,
        columns: DetailArr
    });

    //开启明细视窗
    this.BtnDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
      //  console.log(row)
        HeaderInspectionFlag = row.Flag;
        CodeId = row.InspectionDocumentID;
        var proc_split = row.ProcessAndDesc;
        var oper_split = row.OperationAndDesc;
        if (row.ProcessAndDesc) {
             proc_split = row.ProcessAndDesc.split(' ');
        } else {
            proc_split = "";
        }
        if (row.OperationAndDesc) {
             oper_split = row.OperationAndDesc.split(' ');
        } else {
            oper_split = "";
        }
       
        
        HeaderStatus = row.Status;

        if (HeaderInspectionFlag == "N") {
            $("#DetailComfirm").hide();
            $("#DetailChange").hide();
        } else {
            $("#DetailComfirm").show();
            $("#DetailChange").show();
        }

        $("#DialogItemNo").val(row.ItemCode);
        $("#DialogItemNo").attr("title", row.ItemCode);
        $("#DialogItemDescAndSpec").val(row.DescAndSpec);
        $("#DialogItemDescAndSpec").attr("title", row.DescAndSpec);
        $("#DialogProcessNo").val(row.ProcessCode);
        $("#DialogProcessNo").attr("title", row.ProcessCode);
        if (row.ProcessDesc) {
            $("#DialogProcessDescription").val(row.ProcessDesc);
            $("#DialogProcessDescription").attr("title", row.ProcessDesc);
        } else {
            $("#DialogProcessDescription").val("");
            $("#DialogProcessDescription").attr("title", "");
        }
        $("#DialogWorkOrderNo").val(row.OperationCode);
        $("#DialogWorkOrderNo").attr("title", row.OperationCode);
        if (row.OperationDesc) {
            $("#DialogWorkOrderDescription").val(row.OperationDesc);
            $("#DialogWorkOrderDescription").attr("title", row.OperationDesc);
        } else {
            $("#DialogWorkOrderDescription").val("");
            $("#DialogWorkOrderDescription").attr("title", "");
        }
        var flag = true;
        $("#QCS00005Table tr").each(function (index, obj) {
            if ($(obj).hasClass("editingRow")) {
                flag = false;
            }
        })

        if (flag) {
            $('#DetailDialog').modal("show");
            DetailTable.loadData();
        } else {
         
        }

    }

    //明细编辑
    this.ChangeDetailClick = function () {
        if (!DetailTable)
            return;

        DetailTable.editRow();
    };

    //明细保存
    this.SaveDetailClick = function () {
        if (!DetailTable)
            return;
        DetailTable.save(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, null, true);
    };

    //明细关闭
    this.CleartableClick = function () {
        if (!DetailTable) {
            return;
        }
        DetailTable.goForword(function () {
            DetailTable.loadData();
            $('#DetailDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#DetailDialog').modal("hide");
        }, fields.Isleave);
    };

    //免检权限修改
    this.ChangeFlag = function (obj, str) {
        //品质判定、检验人员、检验日期、且不做检验数量的数量逻辑管控、可转移量、报废量、反修量栏位不可修改
        if ($(obj).is(":checked")) {
            if (str == "N") {
                self.clearInput("#InspectionUserId", "#Name input");
                self.clearInput("#InspectionDate", null);
                $("#RepairQuantity").val("0");
                $("#ScrappedQuantity").val("0");
                $("#Quantity").val($("#InspectionQuantity").val());
                $("#QcDecision").attr("disabled", "disabled");
                $("#Name input").attr("disabled", "disabled");
                $("#Name button").hide();
                $("#InspectionDate").attr("disabled", "disabled");
                $("#ScrappedQuantity").attr("disabled", "disabled");
                $("#RepairQuantity").attr("disabled", "disabled");
            } else {
                self.clearInput("#AddInspectionUserId", "#AddInspectionUser");
                self.clearInput("#AddInspectionDate", "#AddQcDecision");
                $("#AddRepairQuantity").val("0");
                $("#AddScrappedQty").val("0");
                $("#AddQuantity").val($("#AddInspectionQuantity").val());
                $("#UserStar").hide();
                $("#DateStar").hide();
                $("#AddQcDecision").attr("disabled", "disabled");
                $("#AddInspectionUser").attr("disabled", "disabled");
                $("#btnSelectUser").hide();
                $("#AddInspectionDate").attr("disabled", "disabled");
               // $("#AddScrappedQty").attr("disabled", "disabled");
               // $("#AddRepairQuantity").attr("disabled", "disabled");
            }
        }
        else {
            if (str == "N") {

                $("#QcDecision").removeAttr("disabled");
                $("#Name input").removeAttr("disabled");
                $("#Name button").show();
                $("#InspectionDate").removeAttr("disabled");
                $("#ScrappedQuantity").removeAttr("disabled");
                $("#RepairQuantity").removeAttr("disabled");
            } else {
               // $("#AddQcDecision").removeAttr("disabled");
              //  $("#AddInspectionUser").removeAttr("disabled");
                $("#btnSelectUser").show();
                $("#AddInspectionDate").removeAttr("disabled");
              //  $("#AddScrappedQty").removeAttr("disabled");
               // $("#AddRepairQuantity").removeAttr("disabled");
            }
        }
    }

    //清空人員资料
    this.ChangeText = function (obj) {
        var text = $(obj).val();
        if (text == "") {
            $("#InspectionUserId").val("");
            $("#AddInspectionUserId").val("");
        }
    }

    //品质判定变动
    this.qcChanges = function () {
        var qc = $("#QcDecision").val();

        if (qc == "NG") {
            $("#Quantity").val("0");
        }
        else
        {
            var qty = $("#InspectionQuantity").val();
            $("#Quantity").val(qty);
        }
    }
    
    //新增画面品质判定变动
    $("#AddQcDecision").change(function () {
        var qc = $("#AddQcDecision").val();
        if (qc == "NG") {
            $("#AddQuantity").val("0");
        }
        else {
            var qty = $("#AddInspectionQuantity").val();
            $("#AddQuantity").val(qty);
        }
        if (qc == "") {
            //$("#AddInspectionUser").removeAttr("disabled");
            self.clearInput("#AddInspectionUserId", "#AddInspectionUser");
            self.clearInput("#AddInspectionDate", null);
            $("#UserStar").hide();
            $("#DateStar").hide();
        } else {
            //$("#AddInspectionUser").attr("disabled", "disabled");
            var myDate = new Date();
            var date = myDate.getFullYear() + '-' +
                (((myDate.getMonth() + 1) < 10) ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-' +
                ((myDate.getDate() < 10) ? '0' + myDate.getDate() : myDate.getDate());
            $("#AddInspectionDate").val(date);
            $("#AddInspectionDate").datepicker('setDate', date);
            $("#UserStar").show();
            $("#DateStar").show();
        }
    });

    //数量变动
    this.QtyChange = function (str) {
        var qc = $("#QcDecision").val();
        var qty = $("#InspectionQuantity").val();
        var ngqty = $("#NGquantity").val();
        var scrappedqty = $("#ScrappedQuantity").val();



        if (qc == "NG") {
            $("#Quantity").val("0");
            if (str == "ng") {
                var newqty = Number(qty) - Number(ngqty);
                if (newqty < 0) {
                    newqty = 0;
                }
                $("#ScrappedQuantity").val(newqty);
            } else {
                var newqty = Number(qty) - Number(scrappedqty);
                if (newqty < 0) {
                    newqty = 0;
                }
                $("#NGquantity").val(newqty);
            }
        } else {
            var newqty = Number(qty) - Number(scrappedqty) - Number(ngqty);
            if (newqty < 0) {
                newqty = 0;
            }
            $("#Quantity").val(newqty);
        }
    }

    //新增画面数量变动
    this.NewDataQtyChange = function (str) {
        var qc = $("#AddQcDecision").val();
        var qty = $("#AddInspectionQuantity").val();
        var ngqty = $("#AddRepairQuantity").val();
        var scrappedqty = $("#AddScrappedQty").val();


        if (qc == "NG") {
            $("#AddQuantity").val("0");
            if (str == "ng") {
                var newqty = Number(qty) - Number(ngqty);
                if (newqty < 0) {
                    newqty = 0;
                }
                $("#AddScrappedQty").val(newqty);
            } else {
                var newqty = Number(qty) - Number(scrappedqty);
                if (newqty < 0) {
                    newqty = 0;
                }
                $("#AddRepairQuantity").val(newqty);
            }
        } else {
            var newqty = Number(qty) - Number(scrappedqty) - Number(ngqty);
            if (newqty < 0) {
                newqty = 0;
            }
            $("#AddQuantity").val(newqty);
        }
    }

    //检验数量变动
    this.InspectionQtyChange = function () {
        var qc = $("#QcDecision").val();
        var qty = $("#InspectionQuantity").val();
        if (qc == "NG") {
            qty = "0";
        }
        $("#Quantity").val(qty);
        $("#RepairQuantity").val("0");//重置
        $("#ScrappedQuantity").val("0");
    }

    //新增画面检验数量变动
    this.NewDataInspectionQtyChange = function () {
        var qc = $("#AddQcDecision").val();
        var qty = $("#AddInspectionQuantity").val();
        if (qc == "NG") {
            qty = "0";
        }
        $("#AddQuantity").val(qty);
        $("#AddRepairQuantity").val("0");//重置
        $("#AddScrappedQty").val("0");
    }

    //明细数量变动
    this.DetailQtyChang = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = DetailTable.getRowData($tr);
        var qty = $("#RepairQuantity").val();
       // var qtys = $("#SampleQuantity").val();
       // console.log(qtys)
        if (row.Type == "RE") {
            if (qty >= row.ReQuantity) {
                $("#QcDecision").val("NG");
                $("#QcDecision").attr("disabled", true);
            } else {
                $("#QcDecision").val("1");
                $("#QcDecision").removeAttr("disabled", true);
            }
        }
    }

    var ChangeFlag1 = false;
    var ChangeFlag2 = false;


    //可转移量、NG、报废量
    this.checkChange = function (e, node, InQuantity) {
        //var reg = /\D/g;
        //var content = $(e).val().trim()
        //if (reg.test(content)) {
        //    msg.info(fields.Prompt, fields.ThereOnlyInputNumber);
        //    $(e).val(content.replace(reg,''))
        //    return
        //}
        var InspectionQuantity = $("#InspectionQuantity").val();
        var ScrappedQuantity = $("#ScrappedQuantity").val();
        var NGquantity = $("#NGquantity").val();
        var QcDecision = $("#QcDecision").val();
        var OKQuantity = $("#OKQuantity").val();
       
        if (!QcDecision) {
            msg.info(fields.Prompt, fields.QcDecisionIsNull);
            return
        }
        var QQcDecision = QcDecision.substring(5, QcDecision.length);

        if (QQcDecision == "0201213000090") {
            $("#OKQuantity").val(0);
            if (node == "ScrappedQuantity") {               
                var midnum = Subtr(Number(InQuantity), Number(ScrappedQuantity));
                $("#NGquantity").val(midnum)
            }
            if (node == "NGquantity") {
                var midnumtwo = Subtr(Number(InQuantity), Number(NGquantity));
                $("#ScrappedQuantity").val(midnumtwo)
            }
            
                  
            var totalNum = 0;
            //$("#NGquantity").val(InspectionQuantity);
            //var N = Number(ScrappedQuantity) + (NGquantity);
            //$("#InspectionQuantity").val(N)
        } else {
            var midnum = Subtr(Number(InQuantity), Number(ScrappedQuantity));
            var N = Subtr(midnum, Number(NGquantity));
            $("#OKQuantity").val(N);
            //if (node == "InspectionQuantity") {
            //    var midnum = Subtr(Number(InspectionQuantity), Number(NGquantity));
            //    var N = Subtr(midnum, Number(ScrappedQuantity));
            //    //var N = Number(InspectionQuantity) - Number(NGquantity) - Number(ScrappedQuantity) //可转移量 = 检验数量-报废量-NG
            //    $("#OKQuantity").val(N);
            //}
            //if (node == "ScrappedQuantity" || node == "NGquantity") {
            //    var midnum = Subtr(Number(InspectionQuantity), Number(ScrappedQuantity));
            //    var N = Subtr(midnum, Number(NGquantity));
            //    $("#OKQuantity").val(N);
            //    //$("#OKQuantity").val(Number(InspectionQuantity) - Number(ScrappedQuantity) - Number(NGquantity));//可转移量 = 检验数量-报废量
            //}

           // var totalNum = Number(InspectionQuantity) - Number(ScrappedQuantity) - Number(NGquantity);
        }
       
       // $("#OKQuantity").val(totalNum)
    }


    //主列表的columns
    var tableArr = [
            {
                field: 'InspectionDocumentID', title: "", align: "center", visible: false,
                rander: new mf.TextRander({ title: "title", disabled:"disabled" }),
            },
            {
                field: 'InspectionNo', title: fields.InspectionNo, align: "center", width: "170",
                rander: new mf.TextRander({ title: "title", disabled: "disabled", size: 16 }),
            },
            {
                field: 'DocumentDate', title: fields.DocumentDate, align: "center", width: "150", require: true,
                rander: new mf.DateRander({ autoclose: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DocumentDateIsNull)
                ]
            },
            {
                field: 'InspectionMethod', title: fields.TestType, align: "center", width: "100",
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT019121300005C,
                    {
                        title: true, disabled: 'disabled',
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            if (value.substring(5,18) == "020121300007E" || value == null || value == "") {
                                for (var j = 0, i = 0; i < parameters.PT019121300005C.length; i++) {
                                    if (parameters.PT019121300005C[i].value.substring(5,18) == "020121300007E") {
                                        list[j] = parameters.PT019121300005C[i];
                                        j++;
                                    }
                                }
                            }
                            else {
                                list = parameters.PT019121300005C;
                            }
                            return list;
                        }
                    })
            },
/*            {
                field: 'FinishCode', title: "", align: "center", visible: false,
                rander: new mf.TextRander({ title: "title", readonly: "readonly" }),
            },*/
            {
                field: 'FinishCode', title: fields.FinishNo, align: "center", width: "200", 
                rander: new mf.TextRander({ title: "title",disabled:"disabled" }),
                /*               rander: new mf.FKRander("#FinishDialog",
                                                         "#FinishCommit",
                                                         FinishTable,
                                                         new mf.TextRander(
                                                             { title: "title", readonly: "readonly",size:16 }
                                                         ),
                                                         {
                                                             btnTitle: "",
                                                             btnClass: "btn btn-success btn-xs",
                                                         }),
                                fn_onEditingChange: function (table, $row, $cell, field, e) {
                                    self.clearInput("#TxtFinishedNumberSearch", "#TxtItemCodeSearch");
                                    table.setEditingColumnValue($row, "FinishID", e.data.CompletionNo);
                                   // table.setEditingColumnValue($row, "FinishCode", e.data.CompletionNo);
                                    table.setEditingColumnValue($row, "FinishSequence", e.data.Sequence);
                                    table.setEditingColumnValue($row, "ItemId", e.data.ItemId);
                                    table.setEditingColumnValue($row, "ItemCode", e.data.Code);
                                    table.setEditingColumnValue($row, "DescAndSpec", e.data.DescAndSpec);
                                    table.setEditingColumnValue($row, "TaskId", e.data.TaskDispatchID);
                                    table.setEditingColumnValue($row, "TaskCode", e.data.TaskNo);
                                    table.setEditingColumnValue($row, "FinQuantity", e.data.Quantity);
                                    table.setEditingColumnValue($row, "InspectionQuantity", e.data.Quantity);
                                    table.setEditingColumnValue($row, "Quantity", e.data.Quantity);
                                    table.setEditingColumnValue($row, "UnitDesc", e.data.UnitDescription);
                                    table.setEditingColumnValue($row, "ProcessAndDesc", e.data.ProcessCode + " " + e.data.ProcessDescription);
                                    table.setEditingColumnValue($row, "OperationAndDesc", ((e.data.OperationCode) ? e.data.OperationCode : "") + " " + ((e.data.OperationDescription) ? e.data.OperationDescription : ""));
                                    table.setEditingColumnValue($row, "MoNoAndSequence", e.data.MoCode);
                                    
                                    var type = e.data.Type;//检验项目判定方式
                
                                },
                                checkers: [
                                    new mf.TextNotEmptyChecker(fields.CompeletedNoIsNull)
                                ]*/
            },
            {
                field: 'FinishSequence', title: fields.FinishSequence, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", disabled: "disabled",size:16 }),
            },
            {
                field: 'ItemID', title: "", align: "center", visible: false,
                rander: new mf.TextRander({ title: "title", disabled: 'disabled' }),
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 }),
            },
            {
                field: 'DescAndSpec', title: fields.ItemDescAndSpec, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 })
            },
            {
                field: 'TaskId', title: "", align: "center", visible: false,
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 }),
            },
            {
                field: 'TaskCode', title: fields.TaskNo, align: "center", width: "180",
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 }),
            },
            {
                field: 'TaskDispatchID', title: "", align: "center", width: "160", visible: false,
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 }),
            },
            {
                field: 'FinQuantity', title: fields.DocumentQuantity, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 }),
            },
            {
                field: 'Flag', title: fields.InspectionFlag, align: "center", width: "80",
                rander: new mf.SingleCheckBoxRander({yes:true, no:false}),
            },
            {
                field: 'UnitDesc', title: fields.Unit, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", disabled: 'disabled', size: 16 }),
            },
            {
                field: 'Name', title: fields.InspectionUser, align: "center", width: "200", require: true,
                //rander: new mf.TextRander({ title: "title", disabled: "disabled" }),
                rander: new mf.FKRander("#AccountDialog",
                                         "#AccountCommit",
                                         AccountTable,
                                         new mf.TextRander(
                                             { title: "title", readonly: "readonly",size:16, onchange: "model.ChangeText(this);" }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    self.clearInput("#TxtWorkNumberSearch", "#TxtAccountSearch");
                    //model.ChangeText('Row');
                    //    table.setEditingColumnValue($row, "InspectionUserID", e.data.MESUserID);
                    table.setEditingColumnValue($row, "InspectionUserID", e.data.MESUserID);
                    table.setEditingColumnValue($row, "Name", e.data.UserName);
                    //table.setEditingColumnValue($row, "Sequence", e.data.Name);
                }
            },
            {
                field: 'InspectionUserID', title: "", align: "center", width: "80", visible: false,
                rander: new mf.TextRander({ title: "title", disabled: 'disabled' }),
            },
            {
                field: 'InspectionDate', title: fields.InspectionDate, align: "center", width: "140",
                rander: new mf.TimeRander()
            },
            {
                field: 'QcDecision', title: fields.QcDecision, align: "center", width: "100",
                //rander: new mf.SelectRander(status2)
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000061, {
                        title: true,
                        
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            var count = 0;
                            //if (value == "1" || value == null) {
                            //    count = 1;
                            //    list[0] = {
                            //        text: "",
                            //        value: "1"
                            //    }
                            //}
                            for (var j = count, i = 0; i < parameters.PT0191213000061.length; i++) {
                                list[j] = parameters.PT0191213000061[i];
                                j++;
                            }
                            return list;
                        }
                    }
                ),
                fn_onEditingChange: function (table_self, $row, $cell, field, e, rowsData, isAdding) {
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
            {
                field: 'InspectionQuantity', title: fields.InspectionQuantity, align: "center", width: "160", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", maxLength: 19, size: 16, onchange: "model.InspectionQtyChange()", event: "input", eventName: "oninputnum(this)" })),
                fn_onEditingChange:function(table,$row,$cell,field,e){
                    model.checkChange(null, 'InspectionQuantity');
                },
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.InspectionQuantity + fields.GreaterThanZero),
                    new mf.IsOverDecimalChecker(fields.InspectionQuantityIntIsOver, fields.InspectionQuantityDecIsOver, fields.InspectionQuantity + fields.IsOnlyNumber, 12, 6),
                    new mf.ConfigurableChecker(fields.InspectionQuantityGreaterThanDocumentQuantity, function (value, $row) {
                        var qty = $row.find("#FinQuantity").val();
                        if (Number(value) > Number(qty)) {
                            return true;
                        }
                        return false;
                    })
                ],
                
            },
            {
                field: 'ScrappedQuantity', title: fields.ScrappedQtys, align: "center", width: "160", defaultValue: 0,
                rander: new mf.TextRander({ title: "title", maxLength: 19, size: 16, onchange: "model.QtyChange('scrapped')", event: "input", eventName: "oninputnum(this)" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var InQuantity = table.getEditingColumnValue($row, 'InspectionQuantity');
                    model.checkChange(null, 'ScrappedQuantity', InQuantity);
                },
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ScrappedQtys + fields.GreaterThanZero),
                    new mf.IsOverDecimalChecker(fields.ScrappedQtyIsMaxInteger, fields.ScrappedQtyIsMaxDecimal, fields.ScrappedQtys + fields.IsOnlyNumber, 12, 6)
                ]
            },
            {
                field: 'NGquantity', title: fields.RepairQuantity, align: "center", width: "160", defaultValue: 0,
                rander: new mf.TextRander({ title: "title", maxLength: 19, size: 16, onchange: "model.QtyChange('ng')", event: "input", eventName: "oninputnum(this)" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var InQuantity = table.getEditingColumnValue($row, 'InspectionQuantity');
                    model.checkChange(null, 'NGquantity', InQuantity);
                },
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.RepairQuantity + fields.GreaterThanZero),
                    new mf.IsOverDecimalChecker(fields.RepairQuantityIntIsOver, fields.RepairQuantityDecIsOver, fields.RepairQuantity + fields.IsOnlyNumber, 12, 6)
                ]
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                //rander: new mf.SelectRander(status),
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000006,
                    {
                        title: true, disabled: 'disabled',
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            if (value.substring(5,18) == "020121300008D" || value == null || value == "") {
                                for (var j = 0, i = 0; i < parameters.PT0191213000006.length; i++) {
                                    if (parameters.PT0191213000006[i].value.substring(5,18) == "020121300008D") {
                                        list[j] = parameters.PT0191213000006[i];
                                        j++;
                                    }
                                }
                            }
                            else {
                                list = parameters.PT0191213000006;
                            }
                            return list;
                        }
                    })
            },
            {
                field: 'OKQuantity', title: fields.RemovableQuantity, align: "center", width: "160", defaultValue: 0,
                rander: new mf.TextRander({ title: "title", maxLength: 19, size: 16, disabled: 'disabled' }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.RemovableQuantity + fields.GreaterThanZero),
                    new mf.IsOverDecimalChecker(fields.RemovableQuantityIntIsOver, fields.RemovableQuantityDecIsOver, fields.RemovableQuantity + fields.IsOnlyNumber, 12, 6),
                    new mf.ConfigurableChecker(fields.SumQuantityNotEqualToInspectionQuantity, function (value, $row) {
                        var sum = Number($row.find("#ScrappedQuantity").val()) + Number($row.find("#NGquantity").val()) + Number(value);
                        var qty = table.getEditingColumnValue($row, 'InspectionQuantity');
                        if (!(sum == Number(qty))) {
                            return true;
                        }
                        return false;
                    })
                ]
            },
            {
                field: 'MoNoAndSequence', title: fields.MoNo, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", size: 16, disabled: 'disabled' })
            },
            {
                field: 'ProcessDesc', title: fields.ManufacturingProcess, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", size: 16, disabled: 'disabled' })
            },
            {
                field: 'OperationDesc', title: fields.Process, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", size: 16, disabled: 'disabled' })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", size: 16, maxLength: 120 })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander()
            }
    ]

    this.judgment = function () {
        mf.ajax({
            type: "get",
            url: "/MES/api/IntelligentParameter/Inf00020GetValue",
            data: {},
            success: function (data) {
               
                var str = data.substring(5, data.length);
                if (str == "02012130000B1") {
               
                    tableArr[18].rander = new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000061, {
                        title: true,
                        disabled:'disabled',
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            var count = 0;

                            for (var j = count, i = 0; i < parameters.PT0191213000061.length; i++) {
                                list[j] = parameters.PT0191213000061[i];
                                j++;
                            }
                            return list;
                        }
                    }
                    )//= new mf.StaticValueRander({ title: true })
                } else {
                    
                    tableArr[18].rander = new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000061, {
                        title: true,
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            var count = 0;
                            for (var j = count, i = 0; i < parameters.PT0191213000061.length; i++) {
                                list[j] = parameters.PT0191213000061[i];
                                j++;
                            }
                            return list;
                        }
                    }
                    );// = new mf.TextRander({ title: true })
                }
            }
        })
    }
    this.judgment();

    //主列表
    var table = new mf.Table("#QCS00005Table", {
        uniqueId: "InspectionDocumentID",
        deleteId: "InspectionDocumentID",
        editable:true,
        isFrozenColumn: true,
        focusField: "InspectionNo",
        focusEditField: "InspectionNo",
        height: window.innerHeight - 145,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "90px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:90px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="BtnDetail" onclick="model.BtnDetailClick(this)" title="' + fields.InspectionDetail + '" >' + fields.InspectionDetail + '</button>');
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
           
            var $BtnDetail = $row.find("#BtnDetail");
            var $SelType = $row.find("#Type");
            var $ChkFlag = $row.find("#Flag");
            var $SelQc = $row.find("#QcDecision");
            $SelQc.attr("onchange", "model.qcChanges()");

            $ChkFlag.attr("onchange", "model.ChangeFlag(this, 'N')");

            ///** 若自动判定，将不可修改 **/
            //if (data["QcDecisionType"] == "自动判定") {
            //    $SelQc.attr("disabled", "disabled");
            //}
            if (isEditing) {
                if ($ChkFlag.is(":checked")) {
                    
                    $row.find("#QcDecision").attr("disabled", "disabled");
                    $row.find("#Name input").attr("disabled", "disabled");
                    $row.find("#Name button").hide();
                    $row.find("#InspectionDate").attr("disabled", "disabled");
                    $row.find("#Quantity").attr("disabled", "disabled");
                    $row.find("#ScrappedQuantity").attr("disabled", "disabled");
                    $row.find("#NGquantity").attr("disabled", "disabled");
                } else {
                    $row.find("#QcDecision").removeAttr("disabled");
                }

                if (EQcDecision.substring(5, EQcDecision.length) == "02012130000B2") {
                    $row.find("#QcDecision").attr("disabled", false);
                }
                else {
                    $row.find("#QcDecision").attr("disabled", true);
                }

                //if (data["QcDecision"] != "" && data["Flag"] != "N") {
                //    var myDate = new Date();
                //    var date = myDate.getFullYear() + '-' +
                //        (((myDate.getMonth() + 1) < 10) ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-' +
                //        ((myDate.getDate() < 10) ? '0' + myDate.getDate() : myDate.getDate());
                //    $row.find("#InspectionDate").val(date);
                //    $row.find("#InspectionDate").datepicker('setDate', date);
                //}
            } 
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.InspectionNo = formData.InspectionNo();
            searchData.Status = formData.Status();

            mf.ajax({
                type: 'get',
                url: '/MES/api/QualityManagement/Qcs00005GetList',
                data: searchData,
                success: function (data) {
      
                    success(data);
                }
            });
        },
        fn_checkeditable: function ($selectedRow) {

            var Namearry = parameters.PT0191213000004;
            var row = table.getRowData($selectedRow);
            var Listdata1 = parameters.PT0191213000006;
            var StatusTips = "";
            for(var i=0;i<Listdata1.length;i++){
                var Val = Listdata1[i].value
                if (row.Status && row.Status.substring(5, row.Status.length) == Val.substring(5, Val.length)) {
                    StatusTips = Listdata1[i].Newvalue
                }
            }

            console.log(row)
            //var StatusId = row.Status.substring(5, row.Status.length)
            if (row.Status.substring(5, row.Status.length) == "020121300008D") { //处于op状态下才能修改
                return false;
            }
            else {
                msg.info(fields.Prompt, fields.Inspection + row.InspectionNo + fields.StatusIs + StatusTips + fields.Isnotedit)
                return true;
            }
        },
        fn_saveData: function (saveData, success) {

            //N:不可维护：品质判定、检验人员、检验日期、且不做检验数量的数量逻辑管控、可转移量、报废量、反修量栏位不可修改

            for (var row = 0; row < saveData.updated.length; row++) {
                var rowData = saveData.updated[row];

                //if (rowData.Flag == "N") {
                //    rowData.QcDecision = "";
                //    rowData.Name = "";
                //    rowData.InspectionUserId = "";
                //    rowData.InspectionDate = "";
                //    rowData.Quantity = rowData.InspectionQuantity;
                //    rowData.ScrappedQuantity = "0";
                //    rowData.RepairQuantity = "0";
                //}
                if (!rowData.InspectionQuantity) {
                    rowData.InspectionQuantity = "0";
                } else if (!rowData.NGquantity) {
                    rowData.NGquantity = "0";
                } else if (!rowData.ScrappedQuantity) {
                    rowData.ScrappedQuantity = "0"
                }
                rowData.TaskDispatchID = rowData.TaskDispatchID;
                rowData.TaskNo = rowData.TaskCode;
                rowData.QualityControlDecision = rowData.QcDecision;
                rowData.NGquantity = rowData.NGquantity;
              //  rowData.OKQuantity = rowData.Quantity;
                rowData.InspectionFlag = rowData.Flag;
            }

            
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00005Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: tableArr
    });
    

    table.loadData();
    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //刷新
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




    //添加
    this.addClick = function () {
        /*if (!table) {
            return;
        }
        table.addRow();*/
        
        $("#AddInspectionDate").val(mf.format.Time(new Date()));
        //formData.GetValue(formData.DocumentType().value);
        //formData.GetDate($("#AddDate").val());

        flags = true;
        addFlag = true;

        self.getAutoNo(formData.GetValue(), formData.GetDate());
        AccountTable.loadData();

        $('#AddDialog').modal("show");

        var myDate = new Date();
        var date = myDate.getFullYear() + '-' +
            (((myDate.getMonth() + 1) < 10) ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-' +
            ((myDate.getDate() < 10) ? '0' + myDate.getDate() : myDate.getDate());
        // $("#AddCode").val(code);
        $("#AddDate").val(date);
        $("#AddDate").datepicker('setDate', date);
        $("#AddInspectionQuantity").val("0");
        $("#AddScrappedQty").val("0");
        $("#AddRepairQuantity").val("0");
        $("#AddQuantity").val("0");
        $("#AddStatus").val(mf.systemID + "020121300008D");
    }

    //编辑
    this.editClick = function () {
        if (!table) {
            return;
        }
        table.editRow();
    };

    //删除
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

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#QCS00005Table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Qcs00005Export?Token=' + token;
            if (formData.InspectionNo() && formData.InspectionNo().length > 0) {
                exportUrl = exportUrl + '&InspectionNo=' + formData.InspectionNo();
            }
            if (formData.Status() && formData.Status().length > 0) {
                exportUrl = exportUrl + '&Status=' + formData.Status();
            }

            window.location.href = exportUrl;
        });
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
            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00005Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            table.loadData();
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
        CategoryArr = [];
        self.clearInput("#AddCode", "#AddDate");
        self.clearInput("#AddFinishId", "#AddFinishCode");
        self.clearInput("#AddFinishSequence", "#AddItemId");
        self.clearInput("#AddItemCode", "#AddItemDesc");
        self.clearInput("#AddTaskId", "#AddTaskCode");
        self.clearInput("#AddFinQuantity", "#AddInspectionQuantity");
        self.clearInput("#AddScrappedQty", "#AddQuantity");
        self.clearInput("#AddUnitDesc", "#AddMoNo");
        self.clearInput("#AddProcessAndDesc", "#AddOperationAndDesc");
        self.clearInput("#AddInspectionUserId", "#AddInspectionUser");
        self.clearInput("#AddInspectionDate", "#AddRepairQuantity");
        self.clearInput("#AddRemark", "#DocumentCategory");
        $("#AddInspectionUser").val("");
        

        if ($("#AddInspectionFlag").is(":checked")) {
            $("#AddInspectionFlag").prop("checked", false);
            self.ChangeFlag("#AddInspectionFlag", 'Y')
        }

        $("#AddQcDecision").val("");
        $("#UserStar").hide();
        $("#DateStar").hide();
    };

    this.ValueCheck = function (value) {
        var rate = value.split(".");

        var rateInt = rate[0].length;
        if (rateInt > 12) {
            return "Int";
        }

        if (rate.length > 1) {
            var rateDec = rate[1].length;
            if (rateDec > 6) {
                return "Dec";
            }
        }
        return "";
    }

    //新增保存
    this.AddOrderClick = function () {
        ///** 驗證點1 **///

        
        if (!formData.DocumentType() && formData.DocumentType().value.length <= 0) {
            
            msg.info(fields.info, fields.DocumentCategoryIsNull);
            return
        }


        if (!$('#AddCode').val()) {
            msg.info(fields.info, fields.InspectionCodeIsNull);
            return;
        }
        if (!$('#AddDate').val()) {
            msg.info(fields.info, fields.DocumentDateIsNull);
            return;
        }
        if (!$('#AddFinishCode').val()) {
            msg.info(fields.info, fields.CompeletedNoIsNull);
            return;
        }

        var checkValue = self.ValueCheck($("#AddInspectionQuantity").val());
        if (checkValue == "Int") {
            msg.info(fields.info, fields.InspectionQuantityIntIsOver);
            return;
        } else if (checkValue == "Dec") {
            msg.info(fields.info, fields.InspectionQuantityDecIsOver);
            return;
        }
        checkValue = self.ValueCheck($("#AddScrappedQty").val());
        if (checkValue == "Int") {
            msg.info(fields.info, fields.ScrappedQtyIsMaxInteger);
            return;
        } else if (checkValue == "Dec") {
            msg.info(fields.info, fields.ScrappedQtyIsMaxDecimal);
            return;
        }
        checkValue = self.ValueCheck($("#AddRepairQuantity").val());
        if (checkValue == "Int") {
            msg.info(fields.info, fields.RepairQuantityIntIsOver);
            return;
        } else if (checkValue == "Dec") {
            msg.info(fields.info, fields.RepairQuantityDecIsOver);
            return;
        }

        if (Number($('#AddInspectionQuantity').val()) > Number($('#AddFinQuantity').val())) {
            msg.info(fields.info, fields.InspectionQuantityGreaterThanDocumentQuantity);
            return;
        }

        var qty = Number($('#AddInspectionQuantity').val()) - (Number($('#AddScrappedQty').val()) + Number($('#AddRepairQuantity').val()) + Number($('#AddQuantity').val()));
        if (qty != 0) {
            msg.info(fields.info, fields.SumQuantityNotEqualToInspectionQuantity);
            return;
        }

        var qc = $("#AddQcDecision").val();
        if (qc != "") {
            if (!$("#AddInspectionUserId").val()) {
                msg.info(fields.info, fields.InspectionUserIsNull);
                return;
            }
            if (!$("#AddInspectionDate").val()) {
                msg.info(fields.info, fields.InspectionDateIsNull);
                return;
            }
        }

        var flagCheck;
        if ($("#AddInspectionFlag").is(":checked")) {
            flagCheck = "N";
        } else {
            flagCheck = "Y";
        }
        
        var saveData = {
            InspectionNo: AddCode,
            DocumentDate: formData.GetDate(),
            ItemID: $("#AddItemId").val(),
            InspectionMethod: $("#AddType").val(),
            CompletionOrderID: $("#AddFinishId").val(),
            TaskDispatchID: $('#AddTaskId').val(),
            TaskNo: $("#AddTaskCode").val(),
            InspectionDate: $("#AddInspectionDate").val(),
            InspectionUserID: $("#AddInspectionUserId").val(),
            QcDecision: $("#AddQcDecision").val(),
            FinQuantity: $("#AddFinQuantity").val(),
            InspectionQuantity: $("#AddInspectionQuantity").val(),
            ScrappedQuantity: $("#AddScrappedQty").val(),
            NGquantity: $("#AddRepairQuantity").val(),
            OKQuantity: $('#AddQuantity').val(),
            Comments: $("#AddRemark").val(),
            InspectionFlag: $("#AddInspectionFlag").is(":checked"),
            Status: $("#AddStatus").val(),
            DocumentAutoNumberID: InspectionDocumentID,
            DocumentID:formData.GetValue()
        }


        $('#AddDialog').modal("hide");
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00005AddV3',
            data: JSON.stringify(saveData),
            success: function (data) {
              console.log(data)
              if (data.status == "200" || data.status == "400") {//400为表头新增成功，明细新增失败
                    msg.success(fields.info, data.msg, function () {
                        self.ClearAddValue();
                        $('#AddDialog').modal("hide");
                        table.loadData();
                        flag = false;
                    });
                                    

                }
                else {
                    msg.error(fields.info, data.msg, function () {
                        self.ClearAddValue()
                        $('#AddDialog').modal("hide");
                        table.loadData();
                        flag = false;
                    });
                   
                }
            }
        });

    };
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "SamplingInspectionSetMaintenance", "CheckSet", "InspectionStandard", "InspectionLevel", "Sequence",
    "InspectionMethod", "AQL", "StartBatch", "EndBatch", "SamplingQuantity", "AcQuantity", "ReQuantity",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Normal", "Invalid",
    "Cancel", "Browse", "Comfirm", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "SourceDetailMaintenance",
    "PleaseSaveDataFirst", "PleaseSelectFile", "InspectionLevelIsNull", "InspectionMethodIsNull", "AQLIsNull",
    "StartBatchIsNonNegativeNumber",  "EndBatchIsNonNegativeNumber", "SamplingQuantityIsNonNegativeNumber", 
    "AcQuantityIsNonNegativeNumber", "ReQuantityIsNonNegativeNumber", "StartBatchIsMaxDecimal", "EndBatchIsMaxDecimal",
    "SamplingQuantityIsMaxDecimal", "AcQuantityIsMaxDecimal", "ReQuantityIsMaxDecimal", "StartBatchIsMaxInteger", 
    "EndBatchIsMaxInteger", "SamplingQuantityIsMaxInteger", "AcQuantityIsMaxInteger", "ReQuantityIsMaxInteger",
    "InspectionNo", "ItemDescAndSpec", "Operation", "ProcessNo", "MoNo", "InspectionDetail", "DocumentDate",
    "TestType", "FinishNo", "FinishSequence", "TaskNo", "ItemNo", "DocumentQuantity", "InspectionFlag", "Unit",
    "CompeletedNoIsNull", "InspectionUser", "InspectionDate", "QcDecision", "ScrappedQtys", "RepairQuantity",
    "RemovableQuantity", "FinishedReportingOperation", "ProcessDescription", "WorkOrderNo", "WorkOrderDescription",
    "InspectionQuantity", "AccountMaintenance", "WorkNumber", "LogonAccount", "Name", "InspectionQuantityGreaterThanDocumentQuantity",
    "IsOnlyNumber", "InspectionQuantityDecIsOver", "InspectionQuantityIntIsOver", "GreaterThanZero", "ScrappedQtyIsMaxInteger",
    "ScrappedQtyIsMaxDecimal", "RepairQuantityIntIsOver", "RepairQuantityDecIsOver", "RemovableQuantityIntIsOver",
    "RemovableQuantityDecIsOver", "SumQuantityNotEqualToInspectionQuantity", "TestItemsNo", "TestItemsDec",
    "TestStandard", "Disadvantages", "AC", "RE", "AdverseQty", "AdverseQtyGreaterThanSamplingQty", "MeasuredValueIsIncorrect",
    "MeasuredValue", "InspectionResultsDetail", "InspectionInstructions", "ReasonCodeData", "ReasonCo", "ReasonDescription",
    "BadReasonCode", "BadReasonDetail", "ResultsDetail", "ManufacturingProcess", "Process", "AddProcessInspection", "info",
    "InspectionCodeIsNull", "InspectionUserIsNull", "InspectionDateIsNull", "Decision", "Add", "CompeletedNoIsNull", "DocumentCategory",
    "DocumentCategoryIsNull", "MeasuredValueIsOnlyNo", "ScrappedQty", "ThereOnlyInputNumber", "QcDecisionIsNull", "Isleave",
    "Inspection", "InspectionNo", "Isnotedit", "StatusIs", "BadReasonIsNull", "InspectionDetailIsNull"
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

initPage = function () {
    mf.toolBar('#container');
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000052,019121300005C,0191213000006,0191213000061" },
        success: function (data) {
   
            parameters = data;

            model = new viewModel();
        }
    });
};
