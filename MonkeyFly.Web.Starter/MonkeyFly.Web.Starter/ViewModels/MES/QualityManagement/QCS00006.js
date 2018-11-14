var URL = "/MES/QualityManagement/QCS00006";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var model = null, parameters = null;

var viewModel = function () {
    var self = this;
    var table = null, ExportTotal, ID, Namearry = [], NamearryOne = [], NamearryTwo = [], ItemID;
    var typeData;
    //var User;
    var params = mf.format.getMesParameters('0191213000001,019121300005C');
    
  
    ////获取用户信息
    //mf.ajax({
    //    type: 'Get',
    //    async: false,
    //    url: "/MES/api/Util/GetUser",
    //    data: {},
    //    success: function (data) {
    //        User = data;
    //    }
    //});

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
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

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
    };

    var form = {
        InspectionNoStart: ko.observable(""),
        InspectionNoEnd: ko.observable(""),
        RCNoStart: ko.observable(""),
        RCNoEnd: ko.observable(""),
        InspectionType: ko.observable(""),
        InspectionId: ko.observable(""),
        TheStartingMaterial: ko.observable(""),
        TheEndOfTheMaterial: ko.observable(""),
        SDate: ko.observable(""),
        EDate: ko.observable(""),
        InspectionAccount: ko.observable(""),
        InspectionName: ko.observable(""),

    }
    ko.applyBindings(form);



    //主查詢-Start
    table = new mf.Table("#MainSearch", {
        uniqueId: "InspectionDocumentID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 210,
        editable: false,
        dblclick_editable: false,
        isFrozenColumn: true,
        operateColumWidth: "200px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:200px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Comfirm" onclick="model.ComfirmClick(this)" title="" >' + fields.Comfirm + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="Invalid" onclick="model.InvalidClick(this)" title="" >' + fields.Invalid + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="Detail" onclick="model.DetailClick(this)" title="" >' + fields.InspectionDetail + '</button>' + '</td>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            if ($("#InspectionNoStart").val() != "") {
                searchData.StartInspectionNo = $("#InspectionNoStart").val();
            }
            if ($("#InspectionNoEnd").val() != "") {
                searchData.EndInspectionNo = $("#InspectionNoEnd").val();
            }
            if ($("#RCNoStart").val() != "") {
                searchData.StartRCNo = $("#RCNoStart").val();
            }
            if ($("#RCNoEnd").val() != "") {
                searchData.EndRCNo = $("#RCNoEnd").val();
            }
            if ($("#InspectionType").val() != "") {
                searchData.InspectionType = $("#InspectionType").val();
            }
            if ($("#InspectionId").val() != "") {
                searchData.UserID = $("#InspectionId").val();
            }
            
            if ($("#TheStartingMaterial").val() != "") {
                searchData.StartPart = $("#TheStartingMaterial").val();
            }
            if ($("#TheEndOfTheMaterial").val() != "") {
                searchData.EndPart = $("#TheEndOfTheMaterial").val();
            }
            if ($("#SDate").val() != "") {
                searchData.SDate = $("#SDate").val();
            }
            if ($("#EDate").val() != "") {
                searchData.EDate = $("#EDate").val();
            }
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            //正式接口
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00006GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                    console.log(JSON.stringify(data))
                }
            });

        },
        LastWidth: "140",
        IsSetTableWidth: true,
        fn_saveData: function (saveData, success) { },
        columns: [
             {
                 field: 'InspectionNo', title: fields.InspectionNo, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
            {
                field: 'DocumentDate', title: fields.DocumentDate, align: "center", require: true, width: "120",
                rander: new mf.DateRander({title: true})
            },
            {
                field: 'InspectionMethod', title: fields.InspectionType, align: "center", require: true, width: "120",
                rander: new mf.SelectRander(params.PT019121300005C, { title: true })
            },
            {
                field: 'CompletionNo', title: fields.FinishNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {//完工序号
                field: 'CompletionSeq', title: fields.FinishSequence, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'DescriptionSpec', title: fields.ItemDescriptionSpecification, align: "center", require: true, width: "160",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'TaskNo', title: fields.RCNo, align: "center", require: true, width: "255",
                rander: new mf.TextRander({ size: 20, maxLength: 20, title: "title" })
            },
            {
                field: 'FinQuantity', title: fields.FinQty, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            //{
            //    field: 'InspectionFlag', title: fields.InspectionFlag, align: "center", require: true, width: "120",
            //    rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            //},
            {//免检
                field: "InspectionFlag", title: fields.InspectionFlag, width: 50, align: "center",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),

            },
            {
                field: 'Unit', title: fields.Unit, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'InspectionUserName', title: fields.InspectionEmployee, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'InspectionDate', title: fields.InspectionDate, align: "center", require: true, width: "120",
                rander: new mf.TextTimeRander({title: true})
            },
            {
                field: 'QualityControlDecision', title: fields.QcDecision, align: "center", width: "120",
                //rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
                rander: new mf.AutoSelectRander("value", "text", parameters, { title: true })
            },
            {
                field: 'InspectionQuantity', title: fields.InspectionQuantity, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ScrappedQuantity', title: fields.ScrappedQty, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'NGquantity', title: fields.ReworkQty, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'OKQuantity', title: fields.Qty2, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'StatusName', title: fields.Status, align: "center", width: "120",
                rander: new mf.StaticValueRander({size:10, title:"title"})
                //rander: new mf.AutoSelectRander('value','text',params.PT0191213000001,{
                //    noSearchSelectedText:"",
                //    title: true,
                //    size: 11
                //})
            },
            {
                field: 'MoNo', title: fields.MoNo, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Process', title: fields.ProcessNo, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Operation', title: fields.WorkOrderNo, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center",  width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center",  width: "120",
                rander: new mf.TextTimeRander({ size: 12, title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center",  width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ size: 21, title: "title" })
            }
        ]

    });

    if (!table) {
        console.log("create table faild");
        return;
    }
    table.loadData()
    //主查詢-End

    //檢驗種類
    this.InspectionTypeWindow2 = function () {
        InspectionTypeTable.goForwordSafely(function () {
            InspectionTypeTable.loadData();
        }, null);
    }

    this.InspectionTypeWindow = function (id) {
        $("#InspectionTypeDialog").modal("show");
        $("#InspectionTypeDialog").modal({ backdrop: 'static', keyboard: false });
        InspectionTypeTable.loadData();
        $("#InspectionTypeComfirm").unbind();
        $("#InspectionTypeComfirm").click(function () {
            var row = InspectionTypeTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#InspectionTypeDialog").modal("hide");
            }
        })
    };

    var InspectionTypeTable = new mf.Table("#InspectionTypeTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionInspectionTypeBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var InspectionTypeCondition = $("#InspectionTypeCondition").val();
            if (InspectionTypeCondition && InspectionTypeCondition.length > 0)
                searchData.Code = InspectionTypeCondition + "";

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.typeID = "00005C";
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
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
                field: 'Code', title: fields.InspectionType, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'Name', title: fields.InspectionTypeDesc, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            }
        ]
    });
    //檢驗種類-End

    //檢驗人員
    this.InspectionEmployeeWindow2 = function () {
        InspectionEmployeeTable.goForwordSafely(function () {
            InspectionEmployeeTable.loadData();
        }, null);
    }

    this.InspectionEmployeeWindow = function (id,Name) {
        $("#InspectionEmployeeDialog").modal("show");
        $("#InspectionEmployeeDialog").modal({ backdrop: 'static', keyboard: false });
        InspectionEmployeeTable.loadData();
        $("#InspectionEmployeeComfirm").unbind();
        $("#InspectionEmployeeComfirm").click(function () {
            var row = InspectionEmployeeTable.getSelectedData();
            if (row) {
                $(id).val(row.Account);
                $(Name).val(row.UserName);
                $('#InspectionId').val(row.MESUserID);
                $("#InspectionEmployeeDialog").modal("hide");
            }
        })
    };

    var InspectionEmployeeTable = new mf.Table("#InspectionEmployeeTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionInspectionEmployeeBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var InspectionEmployeeCondition = $("#InspectionEmployeeCondition").val();
            if (InspectionEmployeeCondition && InspectionEmployeeCondition.length > 0)
                searchData.Account = InspectionEmployeeCondition + "";

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
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
                field: 'Account', title: fields.LoginAccount, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            }
        ]
    });
    //檢驗人員-End

    //檢驗單號-Start
    this.InspectionNoWindow = function () {
        InspectionNoTable.goForwordSafely(function () {
            InspectionNoTable.loadData();
        }, null);
    }

    this.InspectionNoWindow = function (id) {
        $("#InspectionNoDialog").modal("show");
        $("#InspectionNoDialog").modal({ backdrop: 'static', keyboard: false });
        InspectionNoTable.loadData();
        $("#InspectionNoComfirm").unbind();
        $("#InspectionNoComfirm").click(function () {
            var row = InspectionNoTable.getSelectedData();
            if (row) {
                $(id).val(row.InspectionNo);
                $("#InspectionNoDialog").modal("hide");
            }
        })
    };

    var InspectionNoTable = new mf.Table("#InspectionNoTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionInspectionNoBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var InspectionNoCondition = $("#InspectionNoCondition").val();
            if (InspectionNoCondition && InspectionNoCondition.length > 0)
                searchData.InspectionNo = InspectionNoCondition + "";

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/QCSInspectionDocumentList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "InspectionNo",
        height: 300,
        columns: [
            {
                field: 'InspectionNo', title: fields.InspectionNo, align: "center", width: "200",
                rander: new mf.StaticValueRander({ size: 10, maxLength: 60, title: "title" })
            },
            {
                field: 'DocumentDate', title: fields.InspectionDate, align: "center", width: "150",
                rander: new mf.DateRander({})
            },
            {
                field: 'InspectionUserName', title: fields.InspectionEmployee, align: "center", 
                rander: new mf.StaticValueRander({ size: 10, maxLength: 60, title: "title" })
            }
        ]
    });
    //檢驗單號-End

    //檢驗料號-Start
    this.MaterialWindow = function () {
        MaterialTable.goForwordSafely(function () {
            MaterialTable.loadData();
        }, null);
    }

    this.MaterialWindow = function (id) {
        $("#MaterialDialog").modal("show");
        $("#MaterialDialog").modal({ backdrop: 'static', keyboard: false });
        MaterialTable.loadData();
        $("#MaterialComfirm").unbind();
        $("#MaterialComfirm").click(function () {
            var row = MaterialTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#MaterialDialog").modal("hide");
            }
        })
    };

    var MaterialTable = new mf.Table("#MaterialTable", {
        uniqueId: "InspectionType",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionMaterialBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var MaterialCondition = $("#MaterialCondition").val();
            if (MaterialCondition && MaterialCondition.length > 0)
                searchData.Code = MaterialCondition + "";

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
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "140",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Name', title: fields.ItemName, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            }
        ]
    });
    //檢驗料號-End

    //RC單號-Start
    this.RCNoWindow = function () {
        RCNoTable.goForwordSafely(function () {
            RCNoTable.loadData();
        }, null);
    }

    this.RCNoWindow = function (id) {
        $("#RCNoDialog").modal("show");
        $("#RCNoDialog").modal({ backdrop: 'static', keyboard: false });
        RCNoTable.loadData();
        $("#RCNoComfirm").unbind();
        $("#RCNoComfirm").click(function () {
            var row = RCNoTable.getSelectedData();
            if (row) {
                $(id).val(row.TaskNo);
                $("#RCNoDialog").modal("hide");
            }
        })
    };

    var RCNoTable = new mf.Table("#RCNoTable", {
        uniqueId: "TaskNo",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionRCNoBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var RCNoCondition = $("#RCNoCondition").val();
            if (RCNoCondition && RCNoCondition.length > 0)
                searchData.TaskNo = RCNoCondition + "";

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/TaskDispatchList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "TaskNo",
        height: 300,
        columns: [
            {
                field: 'TaskNo', title: fields.RCDocuments, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'DescriptionSpec', title: fields.ItemDescriptionSpecification, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'OperationDescName', title: fields.WorkOrderDescription, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            }
        ]
    });
    //RC單號-End

    //檢驗日期-Start
    this.DateWindow = function () {
        DateTable.goForwordSafely(function () {
            DateTable.loadData();
        }, null);
    }

    this.DateWindow = function (id) {
        $("#DateDialog").modal("show");
        $("#DateDialog").modal({ backdrop: 'static', keyboard: false });
        DateTable.loadData();
        $("#DateComfirm").unbind();
        $("#DateComfirm").click(function () {
            var row = DateTable.getSelectedData();
            console.log(JSON.stringify(row))
            if (row) {
                var d = row.DocumentDate.substring(0, 10);
                $(id).val(d);
                //alert(row.InspectionDate);
                $("#DateDialog").modal("hide");
            }
        })
    };

    var DateTable = new mf.Table("#DateTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionDateBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var DateCondition = $("#DateCondition").val();
            if (DateCondition && DateCondition.length > 0)
                searchData.InspectionNo = DateCondition + "";

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/QCSInspectionDocumentList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "InspectionNo",
        height: 300,
        columns: [
            {
                field: 'InspectionNo', title: fields.InspectionNo, align: "center", width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'DocumentDate', title: fields.InspectionDate, align: "center", width: "140",
                rander: new mf.DateRander()
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            }
        ]
    });
    //檢驗日期-End

    //檢驗明細-Start

    var InspectionDocumentID;

    this.DetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        $('#DetailPart').val(row.ItemCode);
        $('#DetailPartDesc').val(row.DescriptionSpec);
        $('#DetailProcess').val(row.ProcessCode);
        $('#DetailProcessDesc').val(row.ProcessName);
        $('#DetailOperation').val(row.OperationCode);
        $('#DetailPOperationDesc').val(row.OperationName);
        mf.dialog('#InspectionDetailDialog', {
            viewModel: function () {
                InspectionDocumentID = row.InspectionDocumentID;
                InspectionDetailTable.loadData();
            }
        });
    };

   var  InspectionDetailTable = new mf.Table("#InspectionDetailTable", {
        uniqueId: "InspectionDocumentDetailID",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionInspectionDetailBar"),
        editable: false,
        isFrozenColumn: true,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.InspectionDocumentID = InspectionDocumentID;
            searchData.Token = token;

            mf.ajax({
                type: "Get",
                url: "/MES/api/QualityManagement/QCS00006GetDetailList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        operateColumWidth: "200px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:200px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="FileBrowse" onclick="model.ResultDescriptionClick(this)" title="" >' + fields.ResultDescription + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="Invalid" onclick="model.BadReasonDetailClick(this)" title="" >' + fields.BadReasonDetail + '</button>');

            return $td;
        },
        columns: [
            {
                 field: 'ItemCode', title: fields.CheckItem, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ItemDesc', title: fields.CheckItemDescription, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'StandardDesc', title: fields.TestStandard, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'FaultDesc', title: fields.Disadvantages, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'SampleQuantity', title: fields.SamplingQuantity, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Aql', title: fields.AQL, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'AcQuantity', title: fields.AC, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ReQuantity', title: fields.RE, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'NGquantity', title: fields.AdverseQty, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Attribute', title: fields.MeasuredValue, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'QualityControlDecision', title: fields.Decision, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Comments', title: fields.Remark, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'CreateUser', title: fields.CreatedBy, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'CreateDate', title: fields.CreatedDate, align: "center", require: true, width: "120",
                 rander: new mf.DateRander()
             },
             {
                 field: 'ModifyUser', title: fields.LastChangedBy, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ModifyDate', title: fields.LastChangedDate, align: "center", require: true, width: "120",
                 rander: new mf.DateRander()
             }
        ]
    });
    //檢驗明細-End

    //結果說明明細
    var ResultDescriptionDetailID;

    this.ResultDescriptionClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = InspectionDetailTable.getRowData($tr);

        mf.dialog('#ResultDescriptionDialog', {
            viewModel: function () {
                ResultDescriptionDetailID = row.InspectionDocumentDetailID;
                ResultDescriptionTable.loadData();
            }
        });
    };

    var ResultDescriptionTable = new mf.Table("#ResultDescriptionTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionResultDescriptionBar"),
            fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            searchData.InspectionDocumentDetailID = ResultDescriptionDetailID;
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/QCS00006DetailResult',
                data: searchData,
                success: function (data) {
                    success(data);
                }
                });

            //success([{TEST:'123'}]);
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Reason",
        height: 300,
        columns: [
            {
                field: 'Remark', title: fields.InspectionDescription, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            }
        ]
    });
    //結果說明明細-End

    //不良原因明細
    var BadReasonDetailID;


    this.BadReasonDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = InspectionDetailTable.getRowData($tr);

        mf.dialog('#BadReasonDialog', {
            viewModel: function () {
                BadReasonDetailID = row.InspectionDocumentDetailID;
                BadReasonTable.loadData();
            }
        });
    };

    var BadReasonTable = new mf.Table("#BadReasonTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionBadReasonBar"),
            fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            searchData.InspectionDocumentDetailID = BadReasonDetailID;
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/QualityManagement/QCS00006DetailReason',
                    data: searchData,
                    success: function (data) {
                        success(data);
                    }
                });

            //success([{ TEST: '123' }]);
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Reason', title: fields.BadReasonCode, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ReasonDesc', title: fields.ReasonDescription, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            }
        ]
    });
    //不良原因明細-End

    this.ComfirmClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        var saveData = {
            Token: token,
            InspectionDocumentID: row.InspectionDocumentID
        }

        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/QCS00006ConfirmV710',
            data: JSON.stringify(saveData),
            success: function (data) {
                if (data.status == "200") {
                    console.log(data);
                    msg.success(fields.info, data.msg);
                    table.loadData();
                }
                else {
                    msg.error(fields.info, data.msg);
                    table.loadData();
                }
            }
        });
    };
    
    this.InvalidClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        var saveData = {
            Token: token,
            InspectionDocumentID: row.InspectionDocumentID
        }
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/QCS00006Cancel',
            data: JSON.stringify(saveData),
            success: function (data) {
                if (data.status == "200") {
                    console.log(data);
                    msg.success(fields.info, data.msg);
                    table.loadData();
                }
                else {
                    msg.error(fields.info, data.msg);
                    table.loadData();
                }
            }
        });
    };
}

var arrayWord = [
    "InspectionType", "Search", "StartDate", "EndDate", "InspectionNoStart", "InspectionNoEnd", "TheStartingMaterial", "TheEndOfTheMaterial", "RCNoStart", "RCNoEnd", "InspectionEmployee", "RCNo",
    "InspectionTypeDesc", "AccountMaintenance", "LoginAccount", "Name", "WorkNumber", "Comfirm", "Invalid", "InspectionDetail", "InspectionNo", "Inspection", "Status", "InspectionDate", "Cancel", "ItemInformation", "ItemNo", "Remark", "ItemName", "RCtitle",
    "RCDocuments", "ItemDescriptionSpecification","ProcessNo","ProcessDescription","WorkOrderNo","WorkOrderDescription","FinishNo",
    "BadReason", "ResultDescription", "FinQty", "Unit", "QualityJudgment", "ScrappedQty", "ReworkQty", "Qty2", "ProcessNo", "MoNo", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Qty2", "DocumentDate", "CompleteSeq", "Close", "BadReasonDetail",
    "RowNumber", "InspectionDescription", "BadReasonCode", "ReasonDescription", "InspectionFlag", "InspectionQuantity", "TestStandard", "Disadvantages",
    "AQL", "AC", "RE", "AdverseQty", "MeasuredValue", "Decision", "CheckItem", "CheckItemDescription", "ItemDescAndSpec", "Process", "OperationDesc", "NameSpecification", "SamplingQuantity", "info", "RepairQuantity", "QcDecision", "RCNoS", "RCNoE", "ReworkQty", "RCDocuments",
    "StartDateOfInspection", "EndDateOfInspection", "FinishSequence"
];

words = arrayWord.join();

//初始页面数据，包括获取语系数据等
initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000061" },// , ,质量判定
        success: function (data) {
            parameters = data.PT0191213000061;
            //alert(JSON.stringify(data))
            model = new viewModel();
        }
    });



};