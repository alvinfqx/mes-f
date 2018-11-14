var viewModel = function () {
    var parameters,
        CodeId,
        Namearry = new Array(),
        IDID, Decisionarry = [],
        QCDecisionarry = new Array(),
        Attribute = [],
        StatusArray = new Array(),
        QcDecision = null;
    var self = this;

    //获取品質判定方式
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentParameter/Inf00020GetValue",
        success: function (data) {           
            QcDecision = data;
        }
    });

    //获取单据编号类别
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/QualityManagement/Qcs00008GetTypeList",
        data: ({ "Code": "QCS03"}),
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#DocumentType").append("<option value='" + data[i].value + "'>" + data[i].Code + "</option>");
            }
        }       
    });

    //状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000006,019121300005C,0191213000061,0191213000052" },
        success: function (data) {
            parameters = data;
            var Listdata1 = data.PT0191213000006;
            console.log(Listdata1);
            $("#Status").append("<option></option>");
            for (var i = 0; i < Listdata1.length; i++) {
                $("#Status").append("<option value='" + Listdata1[i].value + "'>" + Listdata1[i].text + "</option>");
                $("#AddStatus").append("<option value='" + Listdata1[i].value + "'>" + Listdata1[i].text + "</option>");
                StatusArray[i] = { value: Listdata1[i].value, text: Listdata1[i].text };
            }
            var Listdata2 = data.PT019121300005C;
            for (var i = 0; i < Listdata2.length; i++) {
                if (Listdata2[i].value.substring(5,18) == "0201213000081") {
                    $("#TestType").append("<option value='" + Listdata2[i].value + "'>" + Listdata2[i].Newvalue + "</option>");
                    Namearry = [{ value: Listdata2[i].value, text: Listdata2[i].Newvalue }];
                }
            }
            var Listdata3 = data.PT0191213000061;
            $("#AddQcDecision").append("<option></option>");
            for (var i = 0; i < Listdata3.length; i++) {
                Decisionarry[i] = { value: Listdata3[i].value, text: Listdata3[i].Newvalue }
                $("#AddQcDecision").append("<option value='" + Listdata3[i].value + "'>" + Listdata3[i].Newvalue + "</option>");
            }
            Decisionarry.unshift({ value: "", text: "" });
            var Listdata4 = data.PT0191213000052;
            for(var i=0;i<Listdata4.length;i++)
            {
                Attribute[i]={ value: Listdata4[i].value, text: Listdata4[i].Newvalue };
            }
        }
    });

    //获取单据编号
    this.getAutoNumber = function () {
        var date = $("#AddDate").val();
        var value = $("#DocumentType").val()
        mf.ajax({
            type: 'get',
            async: false,
            url: "/MES/api/QualityManagement/Qcs00008GetAutoNumber",
            data: { Date: date, Value: value },
            success: function (data) {
                $("#AddCode").val(data.AutoNumber);
                $("#AddCodeId").val(data.DocumentAutoNumberID);
            }
        });
    }

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };

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

    //日期元件
    var Lang = lang();

    $("#AddDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        language: language,
    });
    $("#AddInspectionDate").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        language: language,
    });
    
    // 刷新
    this.refreshClick = function () {
        if (table.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.IsRefres,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    }, null);
        }
        else {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //保存
    this.saveClick = function () {
        table.save(null, null, true);
    };

    //编辑
    this.editClick = function () {
        table.editRow();
    };

    //导入
    this.importClick = function () {
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');

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
                url: window.top.mf.domain + '/MES/api/ImportFile/QCS00008Import',
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
                        msg.error(fields.Prompt, ret.msg);
                    }
                }
            });
        });
    }

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Qcs00008Export?Token=' + token;

            if ($("#Code").val() && $("#Code").val().length > 0) {
                exportUrl = exportUrl + '&InspectionNo=' + $("#Code").val();
            }
            if ($("#Status").val() && $("#Status").val().length > 0) {
                exportUrl = exportUrl + '&Status=' + $("#Status").val();
            }
            window.location.href = exportUrl;
        });
    };

    //新增
    this.addClick = function () {

        $('#AddDialog').modal({ backdrop: "static", show: true, keyboard: false });
        //获取用户信息
        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/Util/GetUser",
            data: {},
            success: function (data) {
                var Data = data;
                mf.ajax({
                    type: 'Get',
                    async: false,
                    url: "/MES/api/Util/CheckUserRole",
                    data: { UserID: Data.OrganizationID },
                    success: function (ret) {
                        if(ret){
                            $("#AddInspectionUser").val(Data.UserName);
                            $("#AddInspectionUserId").val(Data.OrganizationID);
                        }
                    }
                });
            }
        });
        var myDate = new Date();
        var date = myDate.getFullYear() + '-' +
            (((myDate.getMonth() + 1) < 10) ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-' +
            ((myDate.getDate() < 10) ? '0' + myDate.getDate() : myDate.getDate());
        $("#AddInspectionDate").val(mf.deal.InitHour());
        $("#AddDate").val(date);
        $("#AddDate").datepicker('setDate', date);
        $("#AddInspectionQuantity").val("0");
        $("#AddScrappedQty").val("0");
        $("#AddRepairQuantity").val("0");
        $("#AddQuantity").val("0");
    }

    //新增画面栏位资料清除
    this.ClearAddValue = function () {
        self.clearInput("#AddCode", "#AddDate");
        self.clearInput("#AddTaskId", "#AddTaskCode");
        self.clearInput("#AddFinishSequence", "#AddItemId");
        self.clearInput("#AddItemCode", "#AddItemDesc");
        self.clearInput("#AddFinQuantity", "#AddInspectionQuantity");
        self.clearInput("#AddScrappedQty", "#AddQuantity");
        self.clearInput("#AddUnitDesc", "#AddMoNo");
        self.clearInput("#AddProcessAndDesc", "#AddOperationAndDesc");
        self.clearInput("#AddInspectionUserId", "#AddInspectionUser");
        self.clearInput("#AddInspectionDate", "#AddRepairQuantity");
        self.clearInput("#AddRemark", null);

        if ($("#AddInspectionFlag").is(":checked")) {
            $("#AddInspectionFlag").prop("checked", false);
            self.ChangeFlag("#AddInspectionFlag", 'Y')
        }

        $("#AddQcDecision").val("");
        $("#AddCodeSave").removeAttr("disabled");
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
    };

    //新增画面品质判定变动
    $("#AddQcDecision").change(function () {
        var qc = $("#AddQcDecision").val();
        if (qc.substring(5,18) == "0201213000090") {
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
            $("#AddInspectionDate").val(mf.deal.InitHour());
            $("#AddInspectionDate").datepicker('setDate', date);
            $("#UserStar").show();
            $("#DateStar").show();
        }
    });

    //新增数量变动
    this.NewDataQtyChange = function (str) {
        var qc = $("#AddQcDecision").val();
        var qty = $("#AddInspectionQuantity").val();
        var ngqty = $("#AddRepairQuantity").val();
        var scrappedqty = $("#AddScrappedQty").val();

        if (qc.substring(5, 17) == "0201213000090") {
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
        } else 
        {
            var newqty = Number(qty) - Number(scrappedqty) - Number(ngqty);
            if (newqty < 0) {
                newqty = 0;
            }
            $("#AddQuantity").val(newqty);
        }
    }

    //新增检验数量变动
    this.NewDataInspectionQtyChange = function () {
        var qc = $("#AddQcDecision").val();
        var qty = $("#AddInspectionQuantity").val();
        if (qc.substring(5, 17) == "0201213000090") {
            qty = "0";
        }
        $("#AddQuantity").val(qty);
        $("#AddRepairQuantity").val("0");//重置
        $("#AddScrappedQty").val("0");
    }

    //免检权限修改
    this.ChangeFlag = function (obj, str) {
        //品质判定、检验人员、检验日期、且不做检验数量的数量逻辑管控、可转移量、报废量、反修量栏位不可修改
        if ($(obj).is(":checked")) {
            if (str == "N") {
                self.clearInput("#InspectionUserId", "#Name input");
                self.clearInput("#InspectionDate", "#QcDecision");
                $("#RepairQuantity").val("0");
                $("#ScrappedQuantity").val("0");
                $("#Quantity").val($("#InspectionQuantity").val());
                $("#QcDecision").attr("disabled", "disabled");
                $("#Name input").attr("disabled", "disabled");
                $("#Name button").attr("disabled", true);
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
                //$("#AddQcDecision").attr("disabled", "disabled");
                //$("#AddInspectionUser").attr("disabled", "disabled");
                $("#btnSelectUser").hide();
                $("#AddInspectionDate").attr("disabled", "disabled");
                //$("#AddScrappedQty").attr("disabled", "disabled");
                //$("#AddRepairQuantity").attr("disabled", "disabled");
            }
        }   
        else {
            if (str == "N") {
                $("#QcDecision").removeAttr("disabled");
                $("#Name input").removeAttr("disabled");
                $("#Name button").attr("disabled", false)
                $("#InspectionDate").removeAttr("disabled");
                $("#ScrappedQuantity").removeAttr("disabled");
                $("#RepairQuantity").removeAttr("disabled");
            } else {
                //$("#AddQcDecision").removeAttr("disabled");
                $("#AddInspectionDate").val(mf.deal.InitHour());
                //获取用户信息
                mf.ajax({
                    type: 'Get',
                    async: false,
                    url: "/MES/api/Util/GetUser",
                    data: {},
                    success: function (data) {
                        var Data = data;
                        mf.ajax({
                            type: 'Get',
                            async: false,
                            url: "/MES/api/Util/CheckUserRole",
                            data: { UserID: Data.OrganizationID },
                            success: function (ret) {
                                if (ret) {
                                    $("#AddInspectionUser").val(Data.UserName);
                                    $("#AddInspectionUserId").val(Data.OrganizationID);
                                }
                            }
                        });
                    }
                });
                //$("#AddInspectionUser").removeAttr("disabled");
                $("#btnSelectUser").show();
                $("#AddInspectionDate").removeAttr("disabled");
                //$("#AddScrappedQty").removeAttr("disabled");
                //$("#AddRepairQuantity").removeAttr("disabled");
            }
        }
    }

    //新增保存
    this.AddOrderClick = function () {
        ///** 驗證點1 **///
        if (!$('#DocumentType').val()) {
            msg.info(fields.info, fields.DocumentTypeIsNull);
            return;
        }
        if (!$('#AddCode').val()) {
            msg.info(fields.info, fields.InspectionCodeIsNull);
            return;
        }
        if (!$('#AddDate').val()) {
            msg.info(fields.info, fields.DocumentDateIsNull);
            return;
        }
        if (!$('#AddTaskCode').val()) {
            msg.info(fields.info, fields.TaskNoIsNull);
            return;
        }
        if (!$('#AddInspectionQuantity').val()) {
            msg.info(fields.info, fields.InspNumberIsNull);
            return;
        }
        if ($('#AddInspectionQuantity').val() == 0) {
            msg.info(fields.info, fields.InspNumberIsNotZero);
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
            msg.info(fields.info, fields.SQNETIQ);
            return;
        }

        var qc = $("#AddQcDecision").val();
        if (qc != "") {
            if (!$("#AddInspectionUser").val()) {
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
            InspectionNo: $("#AddCode").val(),
            DocumentDate: $("#AddDate").val(),
            ItemID: $("#AddItemId").val(),
            InspectionMethod: $("#TestType").val(),
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
            DocumentAutoNumberID: $("#AddCodeId").val(),
            DocumentID: $("#DocumentType").val()
        }
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00008AddV3',
            data: JSON.stringify(saveData),
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#AddCodeSave").attr("disabled", true);
            },
            success: function (data) {
                //alert(data.status);
                
                if (data.status == "200" || data.status == "400") {//400为表头新增成功，明细新增失败
                    msg.success(fields.info, data.msg, function () {
                        self.ClearAddValue();
                        $('#AddDialog').modal("hide");
                        table.loadData();
                    });

                }
                else {
                    msg.error(fields.info, data.msg, function () {
                        self.ClearAddValue();
                        $('#AddDialog').modal("hide");
                        table.loadData();
                    });

                }
            },
            complete: function () {
                $("#AddCodeSave").removeAttr("disabled");
            }
        });              
    };

    //不良原因明细关闭
    this.BadReasonDetailCancel = function () {
        if (BadReasonDetailtable.SaveOrNotStatus()) {
            msg.warningOne(fields.info, fields.DataIsNullorNotSave,
                    function () {
                        InspectionDetailtable.loadData();
                        BadReasonDetailtable.loadData();
                        $('#BadReasonDetailCodeDialog').modal("hide");
                    }, null);
        }
        else {
            InspectionDetailtable.loadData();
            BadReasonDetailtable.loadData();
            $('#BadReasonDetailCodeDialog').modal("hide");
        }
    }

    //不良原因明细弹窗显示
    this.BadReasonDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = InspectionDetailtable.getRowData($tr);
        IDID = row.InspectionDocumentDetailID;
        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }
        BadReasonDetailtable.goForword(function () {
            BadReasonDetailtable.loadData();
            $('#BadReasonDetailCodeDialog').modal("show");
        }, null, fields.Isleave);
    };

    //不良原因明细弹窗新增
    this.AddBadReasonDetailClick = function () {
        if (!BadReasonDetailtable) {
            return;
        }
        BadReasonDetailtable.addRow();
    };

    //不良原因明细弹窗修改
    this.ChangeBadReasonDetailClick = function () {
        if (!BadReasonDetailtable)
            return;
        BadReasonDetailtable.editRow();
    };

    //不良原因明细弹窗删除
    this.DeleteBadReasonDetailClick = function () {
        if (!BadReasonDetailtable)
            return;
        BadReasonDetailtable.deleteRow();
    };

    //不良原因明细弹窗保存
    this.SaveBadReasonDetailClick = function () {
        if (!BadReasonDetailtable)
            return;
        BadReasonDetailtable.save(null, null, true);
    };

    //不良原因代码弹窗
    var BadReasonCodetable = new mf.Table("#BadReasonCodetable", {
        uniqueId: "ReasonId",
        paginationBar: new mf.PaginationBar("#BadReasonCodepaginagionBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "QCS" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function () { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ReasonCo, align: "center", width: "50",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.StaticValueRander(),
            },
        ]
    });

    //不良原因明细弹窗
    var BadReasonDetailtable = new mf.Table("#BadReasonDetailtable",{
        uniqueId: "InspectionDocumentReasonID",
        paginationBar: new mf.PaginationBar("#BadReasonDetailpaginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00008GetReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, InspectionDocumentID: CodeId, InspectionDocumentDetailID: IDID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].InspectionDocumentDetailID = IDID;
                saveData.inserted[i].InspectionDocumentID = CodeId;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00008ReasonSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        height: 300,
        columns: [
              //{
              //    field: 'InspectionDocumentDetailID', title: "", visible: false,
              //    rander: new mf.DynamicValueRander(function () {
              //        return IDID;
              //    })
              //},
              {
                  field: 'InspectionDocumentDetailID', title: "", visible: false,
                  rander: new mf.TextRander()
              },
              {
                  field: 'InspectionDocumentID', title: "", visible: false,
                  rander: new mf.TextRander()
              },
              //{
              //    field: 'InspectionDocumentID', title: "", visible: false,
              //    rander: new mf.DynamicValueRander(function () {
              //        return CodeId;
              //    })
              //},
            {
                field: 'ReasonCode', title: fields.BadReasonCode, align: "center", width: "100", require: true,
                rander: new mf.FKRander("#BadReasonCodeDialog",
                                         "#BadReasonCodeComfirm",
                                         BadReasonCodetable,
                                         new mf.TextRander(
                                             {
                                                 size: 24, readonly: 'readonly'
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonName", e.data.Name);
                    table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.BadReasonCodeIsNull)
                ],
            },
            {
                field: 'ReasonName', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'ReasonID', title: "", align: "center", width: "100", visible: false,
                rander: new mf.TextRander()
            },
        ]
    });

    //结果说明明细弹窗显示
    this.ResultsDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = InspectionDetailtable.getRowData($tr);
        RIDID = row.InspectionDocumentDetailID;

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        DetailMaintenancetable.goForword(function () {
            DetailMaintenancetable.loadData();
            $('#ResultsDetailDialog').modal("show");
        }, null, fields.Isleave);
    }
    
    //结果说明明细关闭
    this.ResultsDetailDialogCancel = function () {
        if (DetailMaintenancetable.SaveOrNotStatus()) {
            msg.warningOne(fields.info, fields.DataIsNullorNotSave,
                    function () {
                        InspectionDetailtable.loadData();
                        DetailMaintenancetable.loadData();
                        $('#ResultsDetailDialog').modal("hide");
                    }, null);
        }
        else {
            InspectionDetailtable.loadData();
            DetailMaintenancetable.loadData();
            $('#ResultsDetailDialog').modal("hide");
        }
    }

    //结果说明明细弹窗新增
    this.AddDetailMaintenanceClick = function () {
        if (!DetailMaintenancetable)
            return;
        DetailMaintenancetable.addRow();
    };

    //结果说明明细弹窗修改
    this.ChangeDetailMaintenanceClick = function () {
        if (!DetailMaintenancetable)
            return;
        DetailMaintenancetable.editRow();
    };

    //结果说明明细弹窗删除
    this.DeleteDetailMaintenanceClick = function () {
        if (!DetailMaintenancetable)
            return;
        DetailMaintenancetable.deleteRow();
    };

    //结果说明明细弹窗保存
    this.SaveDetailMaintenanceClick = function () {
        if (!DetailMaintenancetable)
            return;
        DetailMaintenancetable.save(null, null, true);
    };

    //结果说明明细弹窗
    var DetailMaintenancetable = new mf.Table("#DetailMaintenancetable", {
        uniqueId: "InspectionDocumentRemarkID",
        paginationBar: new mf.PaginationBar("#DetailMaintenancepaginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00005GetRemarkList',
                data: ({ page: pagination.page, rows: pagination.rows, InspectionDocumentID: CodeId, InspectionDocumentDetailID: RIDID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].InspectionDocumentDetailID = IDID;
                saveData.inserted[i].InspectionDocumentID = CodeId;
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
        height: 300,
        columns: [
            //{
            //    field: 'InspectionDocumentDetailID', title: "", visible: false,
            //    rander: new mf.DynamicValueRander(function () {
            //        return RIDID;
            //    })
            //},
            //{
            //    field: 'InspectionDocumentID', title: "", visible: false,
            //    rander: new mf.DynamicValueRander(function () {
            //        return CodeId;
            //    })
            //},
            {
                field: 'InspectionDocumentDetailID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'InspectionDocumentID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Remark', title: fields.InspectionInstructions, align: "center", width: "200", require: true,
                rander: new mf.TextRander({ title: "", size: 75, maxLength: 120 }),
                checkers: [new mf.TextNotEmptyChecker(fields.InspectionInstructionsIsNull)]
            },
        ]
    });

    //检验明细弹窗显示
    this.InspectionDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        CodeId = row.InspectionDocumentID;
        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        table.goForword(function () {
            InspectionDetailtable.loadData();
            $("#ItemNo").val(row.ItemCode);
            $("#ItemDescription").val(row.DescAndSpec);
            $("#ProcessNo").val(row.ProcessCode);
            $("#ProcessDescription").val(row.ProcessName);
            $("#WorkOrderNo").val(row.OperationCode);
            $("#WorkOrderDescription").val(row.OperationName);

            $("#InspectionDetailDialog").modal({ backdrop: 'static', keyboard: false });
            $('#InspectionDetailDialog').modal("show");
        }, null, fields.Isleave);
    }

    //检验明细表格
    var InspectionDetailtable = new mf.Table("#InspectionDetailtable", {
        uniqueId: "InspectionDocumentDetailID",
        paginationBar: new mf.PaginationBar("#InspectionDetailpaginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00008GetDetailsList',
                data: ({ page: pagination.page, rows: pagination.rows, InspectionDocumentID:CodeId}),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00008DetailsListSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    table.loadData();
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            if (isEditing) {                
                if (data.Value.substring(5, data.Value.length) == "02012130000B4") {
                    $row.find("#QcDecision").attr("disabled", false);
                }
                else {
                    $row.find("#QcDecision").attr("disabled", true);
                }
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            if (rowdata.AttributeType.substring(5, 18) == "0201213000019") {
                $row.find("#Attribute").attr("disable", true);
            }
            if (rowdata.AttributeType.substring(5, 18) == "0201213000017") {
                if (isNaN(Number($row.find("#Attribute").val())))
                {
                    return fields.MeasuredValuePleaseEnterTheNumber;
                }
            }
        },
        operateColumWidth: "130px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:130px;text-align:center;">');
            var $btn = $('<button id="BadReasonDetail" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.BadReasonDetailClick(this)">' + fields.BadReasonDetail + '</button>&nbsp;' +
                         '<button id="ResultsDetail" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.ResultsDetailClick(this)">' + fields.ResultsDetail + '</button>');
            return $td.append($btn);
        },
        height: 300,
        focusEditField: "Attribute",
        columns: [
            {
                field: 'InspectionDocumentDetailID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'InspectionItemId', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Sequence', title: fields.Sorting, align: "center", width: "40",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'InspectionItemCode', title: fields.TestItemsNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'InspectionItemName', title: fields.TestItemsDec, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'InspectionStandard', title: fields.TestStandard, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'FaultDesc', title: fields.Disadvantages, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'SampleQuantity', title: fields.SamplingQuantity, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'AqlName', title: fields.AQL, align: "center", width: "40",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'AcQuantity', title: fields.AC, align: "center", width: "40",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'ReQuantity', title: fields.RE, align: "center", width: "40",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'NGquantity', title: fields.AdverseQty, align: "center", width: "60",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {   
                field: 'Attribute', title: fields.MeasuredValue, align: "center", width: "60", 
                rander: new mf.TextRander({ title: "title", size: 5, event: "input", eventName: "oninputnum(this)" })
            },
            {
                field: 'QcDecision', title: fields.Decision, align: "center", width: "80",
                rander: new mf.SelectRander(Decisionarry),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "120",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "120",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
        ]
    });

    //检验明细修改
    this.ChangeInspectionDetailClick = function () {
        if (!InspectionDetailtable)
            return;
        InspectionDetailtable.editRow();
    }

    //检验明细取消
    this.CancelInspectionDetailClick = function () {
        if (InspectionDetailtable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#InspectionDetailDialog').modal("hide");
                    }, null);
        }
        else {
            $('#InspectionDetailDialog').modal("hide");
        }
    }

    //检验明细保存
    this.SaveInspectionDetailClick = function () {
        if (!InspectionDetailtable)
            return;
        InspectionDetailtable.save(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, null, true);
    };

    //任务单号弹窗显示
    this.SearchTaskNo = function () {
        $("#TaskNoDialog").modal("show");
        $("#TaskNo").val("")
        TaskOrderAssignmentMastertable.loadData();
        $("#TaskOrderAssignmentMasterComfirm").unbind();
        $("#TaskOrderAssignmentMasterComfirm").click(function () {
            var row = TaskOrderAssignmentMastertable.getSelectedData();
            if (row.OperationCode == null) {
                row.OperationCode = "";
            }
            if (row.OperationDescName == null) {
                row.OperationDescName = "";
            }
            if (row.ProcessCode == null) {
                row.ProcessCode = "";
            }
            if (row.ProcessName == null) {
                row.ProcessName = "";
            }
            //console.log(row);
            if (row) {
                $("#AddTaskCode").val(row.TaskNo);
                $("#AddTaskId").val(row.TaskDispatchID);
                $("#AddItemCode").val(row.ItemCode);
                $("#AddItemId").val(row.ItemID)
                $("#AddItemDesc").val(row.DescriptionSpec);
                $("#AddFinQuantity").val(row.DocumentQuantity);
                $("#AddProcessAndDesc").val(row.ProcessCode + " " + row.ProcessName);
                $("#AddMoNo").val(row.MoCode);
                $("#AddOperationAndDesc").val(row.OperationCode + " " + row.OperationDescName);
                $("#AddDocQuantity").val(row.DocumentQuantity);
                $("#AddUnitDesc").val(row.UnitDescription);
                $('#TaskNoDialog').modal('hide');
            }
        });
    };

    //任务单号查询
    this.TaskNoSearchClick = function () {
        TaskOrderAssignmentMastertable.goForwordSafely(function () {
            TaskOrderAssignmentMastertable.loadData(null, null, 1);
        }, null);
    };
    
    //任务单号弹窗
    var TaskOrderAssignmentMastertable = new mf.Table("#TaskOrderAssignmentMastertable", {
        uniqueId: "ID",
        paginationBar: new mf.PaginationBar("#TaskOrderAssignmentMasterpaginagionBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var TNS = $("#TaskNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Qcs00008TaskDispatchList',
                data: ({ page: pagination.page, rows: pagination.rows, InspectionNo: CodeId, TaskNo: TNS }),
                success: function (data) {
                    //console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function () { },
        height: 300,
        columns: [
            {
                field: 'TaskNo', title: fields.TaskNo, align: "center", width: "250",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'DescriptionSpec', title: fields.ItemDescAndSpec, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'OperationDescName', title: fields.WorkOrderDescription, align: "center",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: "DocumentQuantity", width: 0, visible: false,
                rander: new mf.TextRander()
            },
            {
                field: "MoCode", width: 0, visable: false,
                rander: new mf.TextRander()
            },
            {
                field: "UnitDescription", width: 0, visable: false,
                rander: new mf.TextRander()
            },
        ]
    });

    //检验人员弹窗显示
    this.SearchUser = function () {
        $("#InspectionUserDialog").modal("show");
        Accounttable.loadData();
        $("#AccountComfirm").unbind();
        $("#AccountComfirm").click(function () {
            var row = Accounttable.getSelectedData();
            if (row) {
                $("#AddInspectionUser").val(row.UserName);
                $("#AddInspectionUserId").val(row.MESUserID);
                $("#InspectionUserDialog").modal("hide");
            }
        });
    };

    //检验人员查询
    this.WorkNumberSearchClick = function () {
        Accounttable.goForwordSafely(function () {
            Accounttable.loadData(null, null, 1);
        }, null);
    };

    //检验人员弹窗
    var Accounttable = new mf.Table("#Accounttable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#AccountpaginagionBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var UID = $("#WorkNumber").val();
           mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: UID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function () { },
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'Account', title: fields.LoginAccount, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
        ]
    });

    //制程巡检检验维护
    var table = new mf.Table("#table", {
        uniqueId: "InspectionDocumentID",
        focusEditField: "ScrappedQuantity",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();
            var Status = $("#Status").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00008GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Status: Status, InspectionNo: Code }),
                success: function (data) {
                    //console.log(data);
                    //data = [{ "InspectionNo": "1", "DocumentQuantity": "2","ItemCode":"3"}];
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00008Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isFrozenColumn: true,
        operateColumWidth: "80px",
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            if (isEditing) {
                $row.find("#Flag").attr("disabled", "disabled");
                if (QcDecision.substring(5, QcDecision.length) == "02012130000B2") {
                    $row.find("#QcDecision").attr("disabled", false);
                }
                else{
                    $row.find("#QcDecision").attr("disabled", true);
                }
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var SQ = table.getEditingColumnValue($row, "ScrappedQuantity");
            SQ = parseInt(SQ);
            var RQ = table.getEditingColumnValue($row, "NGquantity");
            RQ = parseInt(RQ);
            var IQ = table.getEditingColumnValue($row, "InspectionQuantity");
            IQ = parseInt(IQ);
            var OKQ = table.getEditingColumnValue($row, "OKQuantity");
            OKQ = parseInt(OKQ);
            var qcDecision = table.getEditingColumnValue($row, "QcDecision");
            
            if (SQ > IQ) {
                return fields.ScrappedQtyMoreThanInspectionQuantity;
            }

            if (RQ > IQ) {
                return fields.NGQtyMoreThanInspectionQuantity;
            }

            if (qcDecision && qcDecision.length > 0) {
                if (qcDecision.substring(5, 18) == "0201213000090") {
                    if (Number(SQ) + Number(RQ) + Number(OKQ) != Number(IQ)) {
                        return fields.CountQuantityNotEqualToInspectionQuantity;
                    }
                }
            }
        },
        fn_checkeditable: function ($selectedRow) {
            var row = table.getRowData($selectedRow);
            for (var i = 0; i < StatusArray.length; i++) {
                if (StatusArray[i].value == row.Status) {
                    Statustext = StatusArray[i].text;
                }
            }
            if (row.Status.substring(5, row.Status.length) == "020121300008E" || row.Status.substring(5, row.Status.length) == "020121300008F") {
                msg.info(fields.info, row.InspectionNo + fields.StatusIs + Statustext + fields.Isnotedit);
                return true;
            }
            else {
                return false;
            }
        },
        isFrozenColumn: true,
        operateColumWidth: "80px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:80px;text-align:center;">');
            var $btn = $('<button id="InspectionDetail" class="btn btn-success btn-xs" style="margin:1px;" onclick="model.InspectionDetailClick(this)">' + fields.InspectionDetail + '</button>');
            return $td.append($btn);
        },
        height: window.innerHeight - 145,
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'InspectionDocumentID', title: "", visible: false,
                rander: new mf.TextRander()          
            },
            {
                field: 'ItemId', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'TaskID', title: "", visible: false,
                rander: new mf.TextRander()
            },
           {
               field: 'InspectionNo', title: fields.InspectionNo, align: "center",  width: "120",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 12 }))
           },
           {
               field: 'DocumentDate', title: fields.DocumentDate, align: "center", width: "120",
               rander: new mf.DateRander({ title: "title" }),
           },
           {
               field: 'InspectionMethod', title: fields.TestType, align: "center", width: "120",
               rander:  new mf.WirteOnceOnlyRander(new mf.SelectRander(Namearry)),
           },
           {
               field: 'TaskCode', title: fields.TaskNo, align: "center", width: "250", 
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({title:"title"}))
           },

           {
               field: 'ItemCode', title: fields.ItemNo, align: "center", width: "120",
               rander:  new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 9 })),
           },
           {
               field: 'DescAndSpec', title: fields.ItemDescAndSpec, align: "center", width: "150",
               rander:  new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 9 })),
           },
           {
               field: 'FinQuantity', title: fields.DocumentQuantity, align: "center", width: "80",
               rander:  new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 4 })),
           },
           {
               field: 'Flag', title: fields.InspectionFlag, align: "center", width: "50",
               rander: new mf.SingleCheckBoxRander({yes: true, no: false }),
           },
           {
               field: 'UnitDesc', title: fields.Unit, align: "center", width: "120",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
           },
           {
               field: 'Name', title: fields.InspectionUser, align: 'center', width: "120",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" }))
           },
          {
              field: 'InspectionDate', title: fields.InspectionDate, align: "center", width: "130",
              rander: new mf.WirteOnceOnlyRander(new mf.TimeRander({ title: "title" })),
          },
          {
              field: 'QcDecision', title: fields.QcDecision, align: "center", width: "100",
              rander: new mf.SelectRander(Decisionarry),
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
                field: 'InspectionQuantity', title: fields.InspectionQuantity, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'ScrappedQuantity', title: fields.ScrappedQty, align: "center", width: "80", 
                rander: new mf.TextRander({ size: 3, title: "title", maxLength: 12, event: "input", eventName: "oninputnum(this)" }),
                checkers: [
                      new mf.IsNonNegativeNumberChecker(fields.ScrappedQty + fields.GreaterThanZero),
                      new mf.IsOverDecimalChecker(fields.ScrappedQtyIsMaxInteger, fields.ScrappedQtyIsMaxDecimal, fields.ScrappedQty + fields.IsOnlyNumber, 12, 6),
                ],
                fn_onEditingChange: function (table_self, $row, $cell, field, e, rowsData, isAdding) {
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
                    
                }
            },
            {
                field: 'NGquantity', title: fields.RepairQuantity, align: "center", width: "80",
                rander: new mf.TextRander({ size: 3, title: "title", maxLength: 12, event: "input", eventName: "oninputnum(this)" }),
                checkers: [
                       new mf.IsNonNegativeNumberChecker(fields.RepairQuantity + fields.GreaterThanZero),
                       new mf.IsOverDecimalChecker(fields.RepairQuantityIntIsOver, fields.RepairQuantityDecIsOver, fields.RepairQuantity + fields.IsOnlyNumber, 12, 6)
                ],
                fn_onEditingChange: function (table_self, $row, $cell, field, e, rowsData, isAdding) {
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
                }
            },
          {
              field: 'OKQuantity', title: fields.OKQuantity, align: "center", width: "80",
              rander: new mf.StaticValueRander({ title: "title" }),
              //rander:new mf.TextRander({size: 3, title: "title", maxLength: 19, readonly: "readonly" }),
          },
          {
              field: 'Status', title: fields.Status, align: "center", width: "60",
              rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(StatusArray)),
          },
          {
              field: 'MoNoAndSequence', title: fields.MoNo, align: "center", width: "120",
              rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 12 }))
          },
          {
              field: 'ProcessDesc', title: fields.ProcessNo, align: "center", width: "120",
              rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 12 }))
          },
          {
              field: 'OperationDesc', title: fields.WorkOrderNo, align: 'center', width: "120",
              rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title", readonly: "readonly", size: 12 }))
          },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title", maxLength: 120,size:15 })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "120",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: "title" })
            }
            ]
        });
        table.loadData();
    }

var URL = "/MES/QualityManagement/QCS00008";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = ["Refresh", "Search", "Save", "Add", "Change", "Import", "Export", "InspectionNo", "Status", "InspectionNo", "DocumentDate",
    "TestType", "TaskNo", "ItemNo", "ItemDescAndSpec", "DocumentQuantity", "InspectionFlag", "Unit", "InspectionUser", "InspectionDate",
    "QcDecision", "InspectionQuantity", "ScrappedQty", "RepairQuantity", "OKQuantity", "Status", "MoNo","Remark",
    "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "WorkOrderNo", "ProcessNo", "InspectionDetail",
    "ProcessDescription", "WorkOrderDescription", "Sorting", "TestItemsNo", "TestItemsDec", "TestStandard", "Disadvantages",
    "SamplingQuantity", "AQL", "AC", "RE", "AdverseQty", "MeasuredValue", "Determination", "BadReasonCode", "ResultsDetail",
    "ReasonCo", "ReasonDescription", "UseCode", "Comfirm", "Cancel", "Deletion", "BadReasonDetail", "LineNumber", "InspectionInstructions",
    "DetailMaintenance", "ISOInspectionInspection", "TaskOrderAssignmentMaster", "Account", "WorkNumber", "Name", "LoginAccount", "Invalid",
    "Billing", "Browse", "InspectionUserIsNull", "Add", "InspectionInspection", "Decision", "TaskNoIsNull", "info", "InspectionCodeIsNull",
    "DocumentDateIsNull", "InspectionQuantityIntIsOver", "InspectionQuantityDecIsOver", "ScrappedQtyIsMaxInteger", "ScrappedQtyIsMaxDecimal",
    "RepairQuantityIntIsOver", "RepairQuantityDecIsOver", "InspectionQuantityGreaterThanDocumentQuantity", "DocumentType", "ScrappedQtyMoreThanInspectionQuantity",
    "InspectionDateIsNull", "SQNETIQ", "DocumentTypeIsNull", "InspectionInstructionsIsNull", "IsOnlyNumber", "GreaterThanZero", "SumQuantityNotEqualToInspectionQuantity",
    "CountQuantityNotEqualToInspectionQuantity", "PleaseSelectFile", "Prompt", "NoDataCanBeExported", "Isleave", "info", "MeasuredValuePleaseEnterTheNumber",
    "IsRefres", "DataIsNullorNotSave", "StatusIs", "Isnotedit", "InspNumberIsNull", "InspNumberIsNotZero", "NGQtyMoreThanInspectionQuantity",
    "BadReasonCodeIsNull"
];

words = arrayWord.join();

var model = null;

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

function Subtr(arg1, arg2) {
    return ((arg1 * 1000000 - arg2 * 1000000) / 1000000).toFixed(6);
}

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};
