var URL = "/MES/QualityManagement/QCS00010";
var MID = window.top.page_parameters.GetParameters(URL);
 
var model = null;
var parameters = null;
var ExportTotal = 0;
var GroupID = null,ID = null;
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
    //parameters.PT0191213000004[1].text = fields.Issued;
    var self = this;
    var checkTestSettingID = null;
    var actions = mf.actionButton();
    var Namearry = [];
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
        //StatusList: ko.observableArray(parameters.PT0191213000004)
    };
    ko.applyBindings(formData);
    //$("#OP").val(parameters.PT0191213000004[0].value);// def 核發
    //$("#OP")[0].checked=true;// def 核發

    var temp = '';

    for (var i = 0; i < parameters.PT0191213000004.length; i++) {
        temp += '&nbsp;<input type="checkbox" class="i-checks" value = "' + parameters.PT0191213000004[i].value + '" /><span>' + parameters.PT0191213000004[i].text + '</span>';

        if (i != parameters.PT0191213000004.length - 1) {
            temp = temp + "&nbsp;"
        }
    }

    $("#SStatus").html(temp);

    $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });

    $(".i-checks").eq(1).iCheck('check');
    var Statusch = $("#SStatus").find(".i-checks");
    formData.Status(Statusch.eq(1).val());
    

    var Lang = lang();
    //时间控件
    $("#StartDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        language: language,
    });

    $("#EndDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        language: language,
    });
    //获取list的text
    function getValue(value, list) {
        var result = "";
        for (var i = 0; i < list.length; i++) {
            if (value === list[i].value) {
                result = list[i].text;
                break;
            }
        }
        return result;
    }

    //检查输入框的值
    function checkNumber($cell) {
        var value = $.trim($cell.val());
        if (!(value && value.length > 0)) {
            $cell.val(0);
        }
        value = Number(value);
        if (!isNaN(value)) {
            $cell.val(value);
        }
    }
    this.ViewFiles = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        ID = row.ComplaintDetailID;
            FilesTable.loadData();

            $("#FilesDialog").modal({ backdrop: 'static', keyboard: false });
            $("#FilesDialog").modal('show');
    }

    this.ReasonCodeSearch = function () {
        ReasonCodeTable.goForwordSafely(function () {
            ReasonCodeTable.loadData(null, null, 1);
        }, null);
    };

    //设置原因群碼弹窗表格
    var ReasonGroupTable = new mf.Table("#ReasonGroupTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonGroupBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var ReasonDept = "";//$("#ReasonCode").val();
            var GroupDept = "";
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
                data: ({ page: pagination.page, rows: pagination.rows, typeID: "000011 "}),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            
            {
                field: 'Code', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.GroupDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });
    //设置原因弹窗表格
    var ReasonCodeTable = new mf.Table("#ReasonCodeTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonCodeBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            //var ReasonDept = "";//$("#ReasonCode").val();
            var Code = $("#RReasonCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "QCS", GroupID: GroupID, Code: Code }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ReasonNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });
    //主列表
    var table = new mf.Table("#QCS00010Table", {
        uniqueId: "ComplaintDetailID",
        isFrozenColumn: true,
        editable: false,
        focusField: "ComplaintNo",
        focusEditField: "ComplaintNo",
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "270px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:270px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-xs" id="FilesDialogClick" onclick="model.ViewFiles(this)" title="查看附件" >' + fields.ViewFiles + '</button>&nbsp;&nbsp;');
            $td.append('<button class="btn btn-success btn-xs" id="ReasonDialogClick" onclick="model.OpenReason(this)" title="客诉原因" >' + fields.ComplaintReason + '</button>&nbsp;&nbsp;');
            $td.append('<button class="btn btn-success btn-xs" id="MethodDialogClick" onclick="model.OpenMethod(this)" title="處理對策" >' + fields.ComplaintMethod + '</button>');
            return $td;
        },

        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $BtnCheckSetClick = $row.find("#CheckSetClick");
            if (isAdding) {
                $BtnCheckSetClick.hide();
            }
            else {
                $BtnCheckSetClick.show();
            }
        },
        fn_saveData: function () { },
        fn_getData: function (pagination, searchData, success) {
            var status = $("[name=Status]:checked").map(function (index, value) {
                return value.value
            }).toArray().join();

            searchData = {};
            searchData.StartCode = $("#StartCode").val();
            searchData.EndCode = $("#EndCode").val();
            searchData.StartDate = $("#StartDate").val();
            searchData.EndDate = $("#EndDate").val();
            if (searchData.StartDate > searchData.EndDate) {
                msg.info(fields.info, fields.StartDateThenEndDateBig);
                return;
            }
            searchData.StartCustCode = $("#StartCustomer").val();
            searchData.EndCustCode = $("#EndCustomer").val();
            searchData.StartOrderCode = $("#StartOrder").val();
            searchData.EndOrderCode = $("#EndOrder").val();
            searchData.Status = formData.Status();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            
            //success(data1);// 等有連結後改掉
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00010GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                    ExportTotal = data.total;
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.ComplaintNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })
            },
            {
                field: 'Sequence', title: fields.SequenceNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'Date', title: fields.ComplaintDate, align: "center", width: "100",
                rander: new mf.DateRander({ title: true })
            },
            {
                field: 'CustomerCode', title: fields.Customer, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'CustomerName', title: fields.CustomerDesc, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'Complaintor', title: fields.Complaintor, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'Applicant', title: fields.EmployNoAndName, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "100" ,
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true }) },
            {
                field: 'ShipperNo', title: fields.ShippingNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })
            },
            {
                field: 'OrderNo', title: fields.OrderNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })
            },
            {
                field: 'Quantity', title: fields.ComplaintQty, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'Description', title: fields.ComplaintDesc, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'StatusName', title: fields.Status, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true }) },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })},
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });
    table.loadData();

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
            formData.Status(StatusStr.substring(0, StatusStr.length - 1));
        }
        else {
            formData.Status('');
        }

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
        if (!table) {
            return;
        }
        table.addRow();
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

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var row = table.getSelectedData();
        if (row == null) return;
        var g = $("#TxtReasonSearch").val();
        var qcs00010_exportUrl = "/MES/api/ExportFile/Qcs00010ReasonExport?";
        var qcs00010_params;
        qcs00010_params = "Token=" + token;
        qcs00010_params += "&ComplaintDetailID=" + ID;
        qcs00010_params += "&GroupCode=" + g;
        
        window.location.href = mf.domain + qcs00010_exportUrl + qcs00010_params;
    };
    // 匯入
    this.ImportClick = function () {
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
            //var row = table.getRowData($row);
            var importData = new FormData();
            importData.append("File", document.getElementById('BtnFile').files[0]);
            importData.append("Token", token);//"1"
            importData.append("ComplaintDetailID", ID);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00010ReasonImport',
                data: importData,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            ReasonTable.loadData();
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
        AddCallMESUserID = null;
        AddCallOrganizationID = null;
        AddEquipmentID = null;
        self.clearInput("#AddCode", "#AddDate");
        self.clearInput("#AddCustomer", "#AddCustomerName");
    };
    //客诉单开窗
    var DocumentTable = new mf.Table("#DocumentTable", {
        uniqueId: "ComplaintNoId",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDocumentBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = { Token:token};
            //success(data1);
            searchData.Code = $("#ComplaintNo").val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
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
    // 客訴單查詢
    this.ComplaintNoSearch = function () {
        DocumentTable.goForwordSafely(function () {
            DocumentTable.loadData(null, null, 1);
        }, null);
    }
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

    
    //客戶开窗
    var CustomerTable = new mf.Table("#CustomerTable", {
        uniqueId: "CustomerID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionCustomerBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = { Token:token};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Code = $("#TxtCustomerSearch").val();
            //success(data);
            
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
            ,
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 80, title: "title" })),
            }
        ]
    });

    //客户代号开窗
    this.SearchCustomer = function (id, name, yn) {

        $("#CustomerDialog").modal("show");
        $("#CustomerDialog").modal({ backdrop: 'static', keyboard: false });
        CustomerTable.loadData();
        $("#CustomerCommit").unbind();
        $("#CustomerCommit").click(function () {
            var row = CustomerTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                
                $("#CustomerDialog").modal("hide");
            }
        });
    }

    //客户代号开窗查询
    this.DialogCustomerSearch = function () {
        CustomerTable.goForwordSafely(function () {
            CustomerTable.loadData(null, null, 1);
        }, null);
    };

    //针对名称修改权限进行控制
    this.ChangeText = function () {
        var checkText = $("#AddCustomer").val();
        if (checkText != "" && checkText != null) {
            $("#AddCustomerName").attr("readonly", "readonly");
        } else {
            self.clearInput("#AddCustomerName", null);
            $("#AddCustomerName").removeAttr("readonly");
        }
    }
    // 附件開窗
    var FilesTable = new mf.Table("#FilesTable", {
        uniqueId: "AttachmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionFilesBar"),
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:200px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="DownloadClick" onclick="model.Download(this)" title="開啟" >' + fields.Open + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            //var row = table.getRowData($row);
            
            var param = {
                page: pagination.page,
                rows: pagination.rows,
                Token: token,
                ComplaintDetailID: ID
            }
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00009GetAttachmentList',
                data: param,
                success: function (data) {
                    success(data);
                }
            });


        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Name",
        height: 300,
        columns: [
            {
                field: 'RowNumber', title: fields.Sequence, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.FileName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });
    // 下載附件
    this.Download = function (obj) {
        $row = $(obj).parents("tr");
        var row = FilesTable.getRowData($row);
        window.open(window.top.mf.domain + "/MES/" + row.Path);
    }
    // 處理對策開窗
    var MethodTable = new mf.Table("#MethodTable", {
        uniqueId: "ComplaintHandleID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionMethodBar"),
      
        fn_getData: function (pagination, searchData, success) {
            //var row = table.getRowData($row);
            var param = {
                page: pagination.page,
                rows: pagination.rows,
                Token: token,
                ComplaintDetailID: ID
            }
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00010GetHandleList',
                data: param,
                success: function (data) {
                    success(data);
                }
            });


        },

        fn_saveData: function (saveData, success) {
           

            mf.ajax({
                type: 'post',
                url: '/MES/api/QualityManagement/Qcs00010HandleSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        focusField: "Method",
        height: 300,
        columns: [
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Method', title: fields.ComplaintMethod, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });
    this.OpenMethod = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        ID = row.ComplaintDetailID;
        MethodTable.loadData();

        $("#MethodDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MethodDialog").modal('show');
    }
    // 清除表單資料
    this.clearAddValue = function () {
        $("#Sequence,#ComplaintMethod").val("");

    }
    // 處理對策删除
    this.DeleteMethodClick = function () {
        if (!MethodTable)
            return;
        MethodTable.deleteRow();

    };
    this.DelSaveMethodClick = function () {
        if (!MethodTable)
            return;
        MethodTable.save(null, null, true);
    }
    
    // 新增處理對策
    this.AddSaveMethodClick = function () {
        if (!$('#Sequence').val()) {
            msg.info(fields.info, fields.SequenceIsNull);
            return;
        } else if (!$('#ComplaintMethod').val()) {
            msg.info(fields.info, fields.ComplaintMethodIsNull);
            return;
        }
        //var row = table.getRowData($row);
        var param = {
            ComplaintID: ID,
            ComplaintDetailID: ID,
            Method: $("#ComplaintMethod").val(),
            Sequence: $("#Sequence").val()
        };
        
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00010HandleAdd',
            data: JSON.stringify(param),
            success: function (data) {
                if (data.status == "200") {
                    console.log(data);
                    msg.success(fields.info, data.msg);
                    self.clearAddValue();
                    $('#AddDialog').modal("hide");
                    MethodTable.loadData();
                }
                else {
                    msg.error(fields.info, data.msg);
                    self.clearAddValue();
                    $('#AddDialog').modal("hide");
                    MethodTable.loadData();
                }
            }
        });
    }
    // 更新處理對策
    this.SaveMethodClick = function () {
        if (!$('#Sequence').val()) {
            msg.info(fields.info, fields.SequenceIsNull);
            return;
        } else if (!$('#ComplaintMethod').val()) {
            msg.info(fields.info, fields.ComplaintMethodIsNull);
            return;
        }
        var mid = MethodTable.getSelectedData().ComplaintHandleID;
        //var row = table.getRowData($row);
        var param = {
            ComplaintHandleID:mid,
            ComplaintID: ID,
            ComplaintDetailID: ID,
            Method: $("#ComplaintMethod").val(),
            Sequence: $("#Sequence").val()
        };
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs000010HandleUpdate',
            data: JSON.stringify(param),
            success: function (data) {
                if (data.status == "200") {
                    console.log(data);
                    msg.success(fields.info, data.msg);
                    self.clearAddValue();
                    $('#AddDialog').modal("hide");
                    MethodTable.loadData();
                }
                else {
                    msg.error(fields.info, data.msg);
                    self.clearAddValue();
                    $('#AddDialog').modal("hide");
                    MethodTable.loadData();
                }
            }
        });
        
       
        
    }
    // 處理對策附件開窗
    var UploadFileTable = new mf.Table("#UploadFileTable", {
        uniqueId: "AttachmentID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionUploadFileBar"),
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:200px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-sm" id="DownloadClick" onclick="model.Download2(this)" title="開啟" >' + fields.Open + '</button>&nbsp;&nbsp;');
            $td.append('<button class="btn btn-success btn-sm" id="DeleteClick" onclick="model.FileDeleteClick(this)" title="刪除" >' + fields.Deletion + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            var row = table.getSelectedData();
            if (row == null) return;
            var param = {
                ComplaintDetailID: ID,
                Token: token,
                page: pagination.page,
                rows: pagination.rows
            };
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00010GetAttachmentList',
                data: param,
                success: function (data) {
                    //UploadFileTable.loadData();
                    success(data);
                }
            })
            //var data = file;
            //success(fileData);

        },
        fn_saveData: function (saveData, success) {
           
        },
        focusField: "Name",
        height: 300,
        columns: [
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "160", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.FileName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });
    // 開啟瀏覽
    this.OpenFile = function () {
        $("#AddFile").click();
    }
    
    // 按下刪除
    this.FileDeleteClick = function (obj) {
        if (!UploadFileTable)
            return;
        var row = UploadFileTable.getRowData($(obj).closest("tr"));
        msg.warning(fields.Prompt, fields.WhetherToDelete + row.Name,
            function () {
                //row.ComplaintFileId
                var data = {};
                data.AttachmentID = row.AttachmentID;
                data.Token = token;

                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/QualityManagement/Qcs00010FileDelete',
                    data: JSON.stringify(data),
                    success: function (ret) {
                        //console.log(data);
                        //UploadFileTable.loadData();
                        if (ret.status == 200) {
                            msg.success(fields.Prompt, ret.msg, function () {
                                UploadFileTable.loadData();
                            });
                        }
                        else {
                            msg.error(fields.Prompt, ret.msg);
                        }
                    }
                    
                });
                //mf.ajax({
                //    type: 'POST',
                //    url: '/MES/api/QualityManagement/Qcs00009FileDelete',
                //    data: JSON.stringify(data),
                //    success: function (ret) {
                        
                //    }
                //});
            }, null);
        //if (confirm(fields.WhetherToDelete)){
            
        //}
    };
    // 下載附件
    this.Download2 = function (obj) {
        var $row = $(obj).parents("tr");
        var row = UploadFileTable.getRowData($row);
        window.open(window.top.mf.domain + "/MES/" + row.Path);
    }
    // 客訴原因開窗
    var ReasonTable = new mf.Table("#ReasonTable", {
        uniqueId: "ComplaintReasonID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionReasonBar"),
     
        fn_getData: function (pagination, searchData, success) {
            //var row = table.getRowData($row);
            //var row = table.getSelectedData(true);
            var reasonGroup = $("#TxtReasonSearch").val();
            //var data = file;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00010GetReasonList',
                data: { page: pagination.page, rows: pagination.rows, Token: token, GroupCode: reasonGroup, ComplaintDetailID: ID },
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
            //success(reasonData);

        },
        fn_saveData: function (saveData, success) {
            //var row = table.getRowData($row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].ComplaintDetailID = ID;
            }
            console.log(saveData);
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/QCS00010ReasonSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                    //if (data.IsFail) {

                    //} else {
                    //    ReasonTable.loadData();
                    //}
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var ReasonCode = data['ReasonCode'];
            GroupID = data['ReasonGroupID'];
            var $ReasonDescriptionEditingCell = $row.find("#ReasonDescription");
            if (ReasonCode == null) {
                $ReasonDescriptionEditingCell.attr('readonly', false);
            }
            else {
                $ReasonDescriptionEditingCell.attr('readonly', true);
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 原因代号和原因说明是否都为空
            var ReasonCode = ReasonTable.getEditingColumnValue($row, "ReasonCode");
            if (ReasonCode == "" )
                return fields.BadReasonIsNull;

            return null;
        },
        fn_checkeditable: function ($selectedRow) {
           
        },
        focusField: "ReasonGroup",
        height: 300,
        columns: [
            //{
            //    field: 'Sequence', title: fields.Sequence, align: "center", width: "60",visible:false,
            //    rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            //},
            {
                field: 'ReasonGroupCode', title: fields.ReasonGroupCode, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#ReasonGroupDialog",
                    "#ReasonGroupConfirmBtn",
                    ReasonGroupTable,
                    new mf.TextRander(
                        {
                            size: 8, readonly: 'readonly'
                        }
                    ),
                    {
                        btnTitle: "",
                        btnClass: "btn btn-success btn-xs",
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    GroupID = e.data.ParameterID;
                    table.setEditingColumnValue($row, "ReasonGroupCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonGroupName", e.data.Name);
                    table.setEditingColumnValue($row, "ReasonGroupID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonID", "");
                    table.setEditingColumnValue($row, "ReasonCode", "");
                    table.setEditingColumnValue($row, "ReasonName", "");
                },
            },
            //{
            //    field: 'ReasonGroupName', title: fields.GroupDescription, align: "center", width: "120", visible: false,
            //    rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            //},
            {
                field: 'ReasonID', title: fields.GroupDescription, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ReasonGroupID', title: fields.GroupDescription, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ReasonCode', title: fields.BadReason, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#ReasonCodeDialog",
                    "#ReasonCodeConfirmBtn",
                    ReasonCodeTable,
                    new mf.TextRander(
                        {
                            size: 8, readonly: 'readonly'
                        }
                        ),
                        {
                            btnTitle: "",
                            btnClass: "btn btn-success btn-xs",
                        }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonName", e.data.Name);
                    table.setEditingColumnValue($row, "ReasonGroupCode", e.data.GroupCode);
                    table.setEditingColumnValue($row, "ReasonGroupName", e.data.GroupName);
                    table.setEditingColumnValue($row, "ReasonGroupID", e.data.ReasonGroupID);
                }
            },
            {
                field: 'ReasonName', title: fields.ReasonDescription, align: "center",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'Quantity', title: fields.ComplaintQty, align: "center", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, maxLength: 19, title: "title", event: "input", eventName: "oninputnum(this)" }),
                checkers: [
                    new mf.IsPercentageChecker(fields.ComplaintQtyIsNonNegativeNumber),
                    new mf.IsNonNegativeNumberChecker(fields.ComplaintQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ComplaintQtyIsMaxInteger, fields.ComplaintQtyIsMaxDecimal,
                        fields.ComplaintQtyIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    
                }
            }
        ]
    });
    this.OpenReason = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        ID = row.ComplaintDetailID;
        ReasonTable.loadData();
        $("#ReasonDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ReasonDialog").modal('show');

    }
    //客诉关闭
    this.ReasonCleartableClick = function () {
        self.clear();
        if (!ReasonTable)
            return;
        if (ReasonTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#ReasonDialog').modal("hide");
                    }, null);
        }
        else {
            $('#ReasonDialog').modal("hide");
        }
        //ReasonTable.goForword(function () {
        //    ReasonTable.loadData();
        //    $('#ReasonDialog').modal("hide");
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    window.location.reload();
        //    $('#ReasonDialog').modal("hide");
        //}, fields.Isleave);
    };
    //叫修原因添加
    this.ReasonAddReasonClick = function () {
        if (!ReasonTable)
            return;

        GroupID = null;

        ReasonTable.addRow();
        
        var array = $.map(ReasonTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == undefined) return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence","#ReasonTable").val(sequence);
        } else {
            $("#Sequence", "#ReasonTable").val(1);
        }
    }
    //叫修原因编辑
    this.ReasonChangeReasonClick = function () {
        if (!ReasonTable)
            return;

        ReasonTable.editRow();
    };
    //叫修原因删除
    this.ReasonDeleteReasonClick = function () {
        if (!ReasonTable)
            return;
        ReasonTable.deleteRow();
    };
    //叫修原因保存
    this.ReasonSaveReasonClick = function () {
        if (!ReasonTable)
            return;
        ReasonTable.save(null, null, true);
    };
    this.DialogReasonSearch = function () {
        ReasonTable.goForwordSafely(function () {
            ReasonTable.loadData(null, null, 1);
        }, null);
    }
    this.UploadFileClick = function () {
        UploadFileTable.loadData();        
        $("#UploadFileDialog").modal({ backdrop: 'static', keyboard: false });
        $("#UploadFileDialog").modal('show');      
        $("#AddFile").unbind();
        $("#AddFile").change(function () {

            var fileName = $("#AddFile").val();
            if (!(fileName && fileName.length > 0) || !(uploadCheck == "N")) {
                //msg.info(fields.Prompt, fields.IsNotFile);
                return;
            }

            var formdata = new FormData();
            //var row = table.getRowData($row);
            if (ID == null) return;
            formdata.append("file", document.getElementById('AddFile').files[0]);
            formdata.append("ComplaintDetailID", ID);
            formdata.append("Name", fileName);
            formdata.append("Token", token);



            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/QCS00010FileAdd',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            uploadCheck = "Y";
                            UploadFileTable.loadData();
                            //$('#UploadFileDialog').modal('hide');
                        });
                    }
                    else {
                        msg.error(fields.Prompt, ret.msg);
                    }
                }
            });

        });
    }
    // 處理對策关闭
    this.MethodCleartableClick = function () {
        if (!MethodTable)
            return;
        MethodTable.goForword(function () {
            MethodTable.loadData();
            $('#MethodDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#MethodDialog').modal("hide");
        }, fields.Isleave);
    };
    // 處理對策添加
    this.AddMethodClick = function () {
        if (!MethodTable)
            return;
        $("#AddSaveMethod").show();
        $("#SaveMethod").hide();
        $('#AddDialog').modal("show");// 開窗新增
        var array = $.map(MethodTable.getAllRowData(),
            function (value, index) {

                return value.RowNumber;
            });
        if (array.length == 0) $("#Sequence").val(1);
        else { 
            // 自動加1號
            var sequence = Math.max.apply(Math,array)+1;
            $("#Sequence").val(sequence);
        }
    }
    // 處理對策编辑
    this.ChangeMethodClick = function () {
        if (!MethodTable)
            return;
        var row = MethodTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $('#AddDialog').modal("show");
        $("#Sequence").val(row.Sequence);
        $("#ComplaintMethod").val(row.Method);
        $("#AddSaveMethod").hide();
        $("#SaveMethod").show();

    };
    // 查詢條件清除
    this.clear = function () {
        $("#ComplaintNo,#TxtCustomerSearch,#TxtReasonSearch,#ReasonCode,#ReasonGroup").val("");
    }
    // 原因群碼查詢
    this.ReasonGroupSearch = function (id) {
        $('#ReasonGroupDialog').modal("show");
        ReasonGroupTable.loadData();
        $("#ReasonGroupConfirmBtn").unbind();
        $("#ReasonGroupConfirmBtn").click(function () {
            var row = ReasonGroupTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#ReasonGroupDialog").modal("hide");
            }
        });
    }
    // 上傳
    this.AddBrowse = function () {
        
        console.log("test");
        uploadCheck = "N";
        $("#AddFile").click();
       
    }
    
    // 上傳檔案確認
    this.UploadConfirmClick = function () {
        // 沒用到
    }
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export","Issued",
    "CheckSet", "SequenceNo", "ComplaintNo", "ComplaintDate", "Customer", "CustomerDesc", "Complaintor", "EmployNoAndName", "Part",
    "LotNo", "ShippingNo", "ComplaintQty", "ComplaintDesc", "Description", "Specification","Isleave",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Normal", "Invalid",
    "Cancel", "Browse", "Comfirm", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord","ComplaintReason",
    "PleaseSaveDataFirst", "PleaseSelectFile", "DocumentNo", "ReasonGroupCode", "UploadFile", "ComplaintMethod",
    "StartDocumentNo", "EndDocumentNo", "StartDocumentDate", "EndDocumentDate", "StartCustomerNo", "EndCustomerNo",
    "StartOrderNo", "EndOrderNo",  "CustomerComlpaintNo", "DocumentDate", "CustomerNo", "CustomerName","OrderNo",
    "Complainer", "Applicant",  "Name", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "CustomerComplaintList", "CustomerList", "CustomerData", "ViewFiles", "FilesList", "FilesData", "FileName", "Open",
    "ReasonCode", "ReasonDesc", "Add", "GroupDescription", "ReasonDescription", "ReasonGroupCode", "ReasonNo", "CodeAndNameIsNull",
    "ComplaintQtyIsNonNegativeNumber", "ComplaintQtyIsMaxInteger", "ComplaintQtyIsMaxDecimal", "ComplaintQtyIsNonNegativeNumber",
    "AddComplaintMethod", "SequenceIsNull", "info", "ComplaintMethodIsNull", "IsNotFile", "WhetherToDelete","info",
    "OP", "CL", "CA", "StartDateThenEndDateBig", "ItemDescription", "ItemSpecification", "BadReason", "NA", "Sequence",
    "ReasonGroup", "BadReasonIsNull"
];
words = arrayWord.join();

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

initPage = function () {
    mf.toolBar('#container');

    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            //$("#NA").val(data.PT0191213000004[0].value);
            
            //$("#OP").val(data.PT0191213000004[1].value);
            //$("#CL").val(data.PT0191213000004[2].value);
            //$("#CA").val(data.PT0191213000004[3].value);
            //data.PT0191213000004.splice(0, 1);
            
            parameters = data;
            model = new viewModel();
            
            
        }
    });
};