var URL = "/MES/QualityManagement/QCS00011";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var model = null;

var viewModel = function () {
    var self = this;
    var table = null, ExportTotal, ID, Namearry = [], NamearryOne = [], NamearryTwo = [], ItemID;
    var User, parameters;

    //获取用户信息
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetUser",
        data: {},
        success: function (data) {
            User = data;
        }
    });


    //$("#OP").val(parameters.PT0191213000004[0].value);// def 核發
    //$("#OP")[0].checked=true;// def 核發

    

    //$(".i-checks").eq(1).iCheck('check');
    //var Statusch = $("#SStatus").find(".i-checks");
    //formData.Status(Statusch.eq(1).val());

    //设置Status状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            parameters = data;
            var Listdata = data.PT0191213000004;
            $("#Status").append("<option></option>");
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text };
            }

            for (var j = 0, i = 0; i < Listdata.length; i++) {
                if (Listdata[i].value.substring(5, 18) != "020121300002A") {
                    NamearryOne[j] = { value: Listdata[i].value, text: Listdata[i].text };
                    j++;
                }
            }
            for (var k = 0, i = 0; i < Listdata.length; i++) {
                if (Listdata[i].value.substring(5, 18) != "020121300002A" &&
                    Listdata[i].value.substring(5, 18) != "0201213000028") {
                    NamearryTwo[k] = { value: Listdata[i].value, text: Listdata[i].text };
                    k++;
                }
            }

            var temp = '';

            for (var i = 0; i < Listdata.length; i++) {
                temp += '&nbsp;<input type="checkbox" class="i-checks" value = "' + Listdata[i].value + '" /><span>' + Listdata[i].text + '</span>';

                if (i != Listdata.length - 1) {
                    temp = temp + "&nbsp;"
                }
            }

            $("#SStatus").html(temp);

            $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
        }
    });

    //查询
    this.searchClick = function () {
        var SStatus = $("#SStatus").find(".i-checks");
        var StatusStr = "";
        for (var i = 0; i < parameters.PT0191213000004.length; i++) {
            if (SStatus.eq(i).is(':checked')) {
                //StatusStr += parameters.PT0191213000004[i].value + ",";
                StatusStr += SStatus.eq(i).val() + ",";
            }
        }
        if (StatusStr.length > 0) {
            form.Status(StatusStr.substring(0, StatusStr.length - 1));
        }
        else {
            form.Status('');
        }

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

    //日期元件-Start
    var langStr = "EN";
    if (language != 'en') {
        lang = language.split('-');
        langStr = 'zh-' + lang[1].toUpperCase();
    }

    $('#SDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var startTime = e.date;
        $('#EDate').datepicker('setStartDate', startTime);
    });

    $('#EDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        startView: 'month',
        todayBtn: "linked"
    }).on('changeDate', function (e) {
        var endTime = e.date;
        $('#SDate').datepicker('setEndDate', endTime);
    });
    //日期元件-End


    var form = {
        SComplaintNoSeq: ko.observable(""),
        EComplaintNoSeq: ko.observable(""),
        SDate: ko.observable(""),
        EDate: ko.observable(""),
        SCstNo: ko.observable(""),
        ECstNo: ko.observable(""),
        NA: ko.observable(""),
        OP: ko.observable(""),
        CL: ko.observable(""),
        CA: ko.observable(""),
        Status: ko.observable()
    }
    ko.applyBindings(form);

    table = new mf.Table("#ComplaintTable", {
        uniqueId: "ComplaintID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 178,
        editable: false,
        dblclick_editable: false,
        isFrozenColumn: true,
        operateColumWidth: "350px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:350px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Closed" onclick="model.ClosedClick(this)" title="" >' + fields.Closed + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="Restore" onclick="model.RestoreClick(this)" title="" >' + fields.Restore + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="WriteOff" onclick="model.WriteOffClick(this)" title="" >' + fields.WriteOff + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="ViewAttachments" onclick="model.ViewAttachmentsClick(this)" title="" >' + fields.ViewAttachments + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="ComplaintReason" onclick="model.ComplaintReasonClick(this)" title="" >' + fields.ComplaintReason + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="ComplaintMethod" onclick="model.ComplaintMethodClick(this)" title="" >' + fields.ComplaintMethod + '</button>' + '</td>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            var NA, OP, CL, CA;
            var StatusString;
            if (!searchData)
                searchData = {};
            if ($("#SComplaintNoSeq").val() != "") {
                searchData.StartCode = $("#SComplaintNoSeq").val();
            }
            if ($("#EComplaintNoSeq").val() != "") {
                searchData.EndCode = $("#EComplaintNoSeq").val();
            }
            if ($("#SDate").val() != "") {
                searchData.StartDate = $("#SDate").val();
            }
            if ($("#EDate").val() != "") {
                searchData.EndDate = $("#EDate").val();
            }
            if ($("#SCstNo").val() != "") {
                searchData.StartCustCode = $("#SCstNo").val();
            }
            if ($("#ECstNo").val() != "") {
                searchData.EndCustCode = $("#ECstNo").val();
            }
            if ($("#ECstNo").val() != "") {
                searchData.EndCustCode = $("#ECstNo").val();
            }
            if ($("#NA").prop("checked")) {
                NA = mf.systemID + "0201213000028";
            }
            else
            {
                NA = "";
            }
            if ($("#OP").prop("checked")) {
                OP = mf.systemID + "0201213000029";
            }
            else {
                OP = "";
            }
            if ($("#CL").prop("checked")) {
                CL = mf.systemID + "020121300002A";
            }
            else {
                CL = "";
            }
            if ($("#CA").prop("checked")) {
                CA = mf.systemID + "020121300002B";
            }
            else {
                CA = "";
            }

            StatusString = NA;
            if (StatusString == "")
                StatusString = OP;
            else
                StatusString = StatusString + "," + OP;

            if (StatusString == "")
                StatusString = CL;
            else
                StatusString = StatusString + "," + CL;

            if (StatusString == "")
                StatusString = CA;
            else
                StatusString = StatusString + "," + CA;

            searchData.Status = form.Status();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            //正式接口
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00011GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var Status = data['Status'];
            var $buttonEditingCell = $row.find("button");
            var $buttonClosed = $row.find("#Closed");
            var $buttonWriteOff = $row.find("#WriteOff");
            var $buttonRestore = $row.find("#Restore");

            switch(Status.substring(5, 18))
            {
                //OP
                case "0201213000029":
                    $buttonRestore.attr('disabled', true);
                    break;
                //CL
                case "020121300002A":
                    $buttonClosed.attr('disabled', true);
                    $buttonWriteOff.attr('disabled', true);
                    break;
                //NA
                case "0201213000028":
                    $buttonClosed.attr('disabled', true);
                    $buttonRestore.attr('disabled', true);
                    break;

                default:
                    $buttonClosed.attr('disabled', true);
                    $buttonWriteOff.attr('disabled', true);
                    $buttonRestore.attr('disabled', true);
                    break;
            }
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
             {
                 field: 'Code', title: fields.ComplaintNo, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
            {
                field: 'Sequence', title: fields.SequenceNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Date', title: fields.DocumentDate, align: "center", require: true, width: "120",
                rander: new mf.DateRander()
            },
            {
                field: 'CustomerCode', title: fields.CustomerNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'CustomerName', title: fields.CustomerName, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Complaintor', title: fields.Complaintor, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Applicant', title: fields.Applicant, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ShipperNo', title: fields.ShippingNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'OrderNo', title: fields.OrderNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Quantity', title: fields.ComplaintQty, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Description', title: fields.ComplaintDesc, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'StatusName', title: fields.Status, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })

            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", require: true, width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", require: true,
                rander: new mf.TextTimeRander()
            }
        ]

    });

    if (!table) {
        console.log("create table faild");
        return;
    }
    table.loadData();

    
    //結案
    this.ClosedClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        var saveData = {
            ComplaintDetailID: row.ComplaintDetailID,
            UserId: User.MESUserID
        }
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00011CL',
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
    //還原按鈕
    this.RestoreClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        var saveData = {
            ComplaintDetailID: row.ComplaintDetailID,
            UserId: User.MESUserID
        }
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00011OP',
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
    //註銷按鈕
    this.WriteOffClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        var saveData = {
            ComplaintDetailID: row.ComplaintDetailID,
            UserId: User.MESUserID
        }

        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00011CA',
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

    //查看附件按鈕 - Start
    var ViewAttachmentsTable = null, Complaintid = null;

    this.ViewAttachmentsClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#ViewAttachmentsDialog', {
            viewModel: function () {
                ComplaintDetailID = row.ComplaintDetailID;
                ViewAttachmentsTable.loadData();
            }
        });
    };
    
    ViewAttachmentsTable = new mf.Table("#ViewAttachmentsTable", {
        uniqueId: "AttachmentID",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionViewAttachmentsBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ComplaintDetailID = ComplaintDetailID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: "Get",
                url: "/MES/api/QualityManagement/Qcs00009GetAttachmentList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                console.log(data);
                success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        isFrozenColumn: true,
        operateColumWidth: "40px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:40px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Open" onclick="model.OpenClick(this)" title="' + fields.Open + '" >' + fields.Open + '</button>');
            return $td;
        },
        columns: [
             {
                 field: 'OriginalName', title: fields.FileName, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })

             }
        ]
    });

    this.OpenClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = ViewAttachmentsTable.getRowData($tr);
        var fileName = row.OriginalName;

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
    //查看附件按鈕 - End

    //客訴原因按鈕 - Start
    var ComplaintReasonTable = null;

    this.ComplaintReasonClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#ComplaintReasonDialog', {
            viewModel: function () {
                ComplaintDetailID = row.ComplaintDetailID;
                ComplaintReasonTable.loadData();
            }
        });
    };

    ComplaintReasonTable = new mf.Table("#ComplaintReasonTable", {
        uniqueId: "ReasonGroupName",
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionComplaintReasonBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ComplaintDetailID = ComplaintDetailID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: "Get",
                url: "/MES/api/QualityManagement/Qcs00010GetReasonList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'ReasonGroupName', title: fields.ReasonGroupCode, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ReasonCode', title: fields.BadReason, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ReasonName', title: fields.ReasonDescription, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Quantity', title: fields.ComplaintQty, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             }
        ]
    });
    //客訴原因按鈕 - End

    //處理對策按鈕 - Start
    var ComplaintMethodTable = null;
    var ComplaintMethodNo;
    this.ComplaintMethodClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#ComplaintMethodDialog', {
            viewModel: function () {
                ComplaintMethodNo = row.ComplaintDetailID;
                ComplaintDetailID = row.ComplaintDetailID;
                ComplaintMethodTable.loadData();
            }
        });
    };

    ComplaintMethodTable = new mf.Table("#ComplaintMethodTable", {
        uniqueId: "ComplaintDetailID",
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionComplaintMethodBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ComplaintDetailID = ComplaintDetailID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: "Get",
                url: "/MES/api/QualityManagement/Qcs00010GetHandleList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'Method', title: fields.ComplaintMethod, align: "center", require: true,
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             }
        ]
    });


    //處理對策附件
    this.ComplainMethodFile = function () {
        mf.dialog('#ComplainMethodFileDialog', {
            viewModel: function () {
                ComplaintDetailID = ComplaintMethodNo;
                ComplainMethodFileTable.loadData();
            }
        });
    };

    ComplainMethodFileTable = new mf.Table("#ComplainMethodFileTable", {
        uniqueId: "FileName",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionComplainMethodFileBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ComplaintDetailID = ComplaintDetailID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: "Get",
                url: "/MES/api/QualityManagement/Qcs00010GetAttachmentList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        operateColumWidth: "50px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:50px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="FileBrowse" onclick="model.FileBrowseClick(this)" title="' + fields.Open + '" >' + fields.Open + '</button>');

            return $td;
        },
        columns: [
             {
                 field: 'Name', title: fields.FileName, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             }
        ]
    });
    //處理對策按鈕 - End

    //單號弹窗查询-Start

    var SelectComplaintNoSeq;

    this.ComplaintNoSeqSearch2 = function () {
        ComplaintNoSeqTable.goForwordSafely(function () {
            ComplaintNoSeqTable.loadData(null, null, 1);
        }, null);
    }
    this.ComplaintNoSeqSearch = function (id) {
        $("#ComplaintNoSeqDialog").modal("show");
        $("#ComplaintNoSeqDialog").modal({ backdrop: 'static', keyboard: false });
        ComplaintNoSeqTable.loadData();
        $("#ComplaintNoSeqComfirm").unbind();
        $("#ComplaintNoSeqComfirm").click(function () {
            var row = ComplaintNoSeqTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#ComplaintNoSeqDialog").modal("hide");
            }
        })
    };

    //
    var ComplaintNoSeqTable = new mf.Table("#ComplaintNoSeqTable", {
        uniqueId: "ComplaintID",
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionComplaintNoSeqFileBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startComplaintNo = $("#SComplaintNoSeqCondition").val();
            if (startComplaintNo && startComplaintNo.length > 0)
                searchData.Code = startComplaintNo + "";
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            var data;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetComplaintList',
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
                field: 'Code', title: fields.DocumentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'Date', title: fields.ComplaintDate, align: "center", width: "100",
                rander: new mf.DateRander()
            },
            {
                field: 'CustomerCode', title: fields.CustomerNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            }

        ]
    });
    //單號弹窗查询-End

    //客戶弹窗查询-Start

    this.CstNoSearch2 = function (id) {
        CstNoTable.goForwordSafely(function () {
            CstNoTable.loadData(null, null, 1);
        }, null);
    }

    this.CstNoSearch = function (id) {
        $("#CstNoDialog").modal("show");
        $("#CstNoDialog").modal({ backdrop: 'static', keyboard: false });
        CstNoTable.loadData();
        $("#CstNoComfirm").unbind();
        $("#CstNoComfirm").click(function () {
            var row = CstNoTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#CstNoDialog").modal("hide");
            }
        })
    }

    var CstNoTable = new mf.Table("#CstNoTable", {
        uniqueId: "CustomerID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionCustomerNoBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#SCstNoCondition").val();
            if (startCode && startCode.length > 0)
                searchData.Code = startCode + "";
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
                field: 'Code', title: fields.CustomerNo, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            },
            {
                field: 'Name', title: fields.CustomerName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" }))
            }

        ]
    });
    //客戶弹窗查询-End

    //线上浏览将下载
    this.FileBrowseClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = ComplainMethodFileTable.getRowData($tr);
        var fileName = row.OriginalName;

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

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }

    };
}

var arrayWord = [
    "Status", "NA", "OP", "CL", "CA", "StartDate", "EndDate", "StartCustomerNo", "EndCustomerNo", "SiteCode", "StartComplaintNoSeq", "EndComplaintNoSeq", "StartOrderNo", "EndOrderNo", "DocumentNo", "ComplaintDetail","CustomerList","Applicant","ReasonGroupCode","ViewFiles",
    "Closed", "WriteOff", "Restore", "ViewAttachments", "ComplaintReason", "ComplaintMethod",
    "ComplaintNo", "SequenceNo", "DocumentDate", "CustomerNo", "CustomerName", "Complaintor", "WorkNumber","ShippingNo",
    "Name", "Remark", "Part", "LotNo", "OrderNo", "ComplaintQty",
    "ComplaintDesc", "Status", "Description", "ItemSpecification", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "FileName", "Open", "Comfirm", "Cancel", "ComplaintDate", "BadReason", "ReasonDescription", "Close", "AttachmentFile", "info", "Search", "ItemNo", "ItemDescription"
];

words = arrayWord.join();

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};