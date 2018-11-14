var URL = "/MES/IntelligentManufacturing/SFC00007";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var parameters = null;
var model = null,reportHour = "00:00:00";
var ExportTotal = 0, Aqty = 0, NextTaskDispatchID = null, NextID, showCompletionOrderID;

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
var BillTypeList = [];
var viewModel = function () {
    
    
    var self = this;
    var Lang = lang();
    // 获取搜索框的值
    //var form = {
    //    
    //};
    //var Statustext = parameters.PT0191213000004[1].text;// OP
    // 时间控件绑定
    
    $("#EndWorkD").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });

    //$("#SelectResourceType").append('<option value=' + mf.systemID + '"0201213000047">'+ fields.Man +'</option>' +
    //                '<option value=' + mf.systemID + '"0201213000048">'+ fields.Equipment +'</option>');

    var formModel = {
        Status: ko.observable(),
        FinishNo: ko.observable(),
        EndWorkD: ko.observable()
    };

    ko.applyBindings(formModel);

    var temp = '';

    for (var i = 0; i < parameters.PT0191213000004.length; i++) {
        if (parameters.PT0191213000004[i].value.substring(5, parameters.PT0191213000004[i].value.length) != "0201213000028") {

            temp += '&nbsp;<input type="checkbox" class="i-checks" value = "' + parameters.PT0191213000004[i].value + '" /><span>' + parameters.PT0191213000004[i].text + '</span>';

            if (i != parameters.PT0191213000004.length - 1) {
                temp = temp + "&nbsp;"
            }
        }       
    }

    $("#SStatus").html(temp);

    $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });

    $(".i-checks").eq(0).iCheck('check');
    var Statusch = $("#SStatus").find(".i-checks");
    formModel.Status(Statusch.eq(0).val());
    
    //$(".i-checks").iCheck('check');

    //工作中心开窗
    this.showWorkCenter = function (ID) {       
        WorkCenterTable.loadData();
        $("#WorkCenterDialog").modal({ backdrop: 'static', keyboard: false });
        $("#WorkCenterDialog").modal('show');
        $("#WorkCenterComfirm").unbind();
        $("#WorkCenterComfirm").click(function () {
            var row = WorkCenterTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#WorkCenterDialog").modal("hide");
            }
        });        
    };
    
    //工作中心弹窗查询
    this.WorkCenterNoSearch = function () {
        WorkCenterTable.goForwordSafely(function () {
            WorkCenterTable.loadData(null, null, 1);
        }, null);
    };

    //设置下一道工序表格
    var NextProcessTable = new mf.Table("#NextProcessTable", {
        uniqueId: "ID",
        editable: false,
        LastWidth: "185",
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetNextList',
                data: ({ TaskDispatchID: NextTaskDispatchID }),
                success: function (data) {
                    console.log(data);
                    if (data == null) {
                        success([]);
                    }
                    else {
                       success(data);
                    }                    
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 210,
        columns: [
            {
                field: 'Code', title: fields.ProcessOperaNo, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.ProcessOperaName, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });

    //设置工作中心弹窗表格
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        editable: false,
        LastWidth: "75",
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#WorkCenterNo").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    //alert(JSON.stringify(data));
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
                field: 'Code', title: fields.WorkCenterNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'DeptCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'DeptName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'StatusName', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });

    //製程代號开窗
    this.showProcessNo = function (ID) {
        ProcessNoTable.loadData();
        $("#ProcessNoDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ProcessNoDialog").modal('show');
        

        $("#ProcessNoCommit").unbind();
        $("#ProcessNoCommit").click(function () {
            var row = ProcessNoTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#ProcessNoDialog").modal("hide");
            }
        });
    };

    //製程代號弹窗查询
    this.ProcessCodeSearch = function () {
        ProcessNoTable.goForwordSafely(function () {
            ProcessNoTable.loadData(null, null, 1);
        }, null);
    };

    //设置製程代號表格
    var ProcessNoTable = new mf.Table("#ProcessNoTable", {
        uniqueId: "ParameterID",
        editable: false,
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionProcessNoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ProcessCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "000017" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //制令单列表
    var MoCodeDialogTable = new mf.Table("#MoCodeTable", {
        uniqueId: "FabricatedMotherID",
        paginationBar: new mf.PaginationBar("#MoCodePageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.MoNo = $("#MoNoTxt").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00010GetFabricatedMother',
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
                field: 'MoNo', title: fields.MoNo, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'SplitSequence', title: fields.MoSeq, align: "center", width: "80",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemName', title: fields.GoodsName, align: "center", width: "150",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'ItemSpecification', title: fields.Specification, align: "center", width: "200",
                rander: new mf.TextRander({ title: "title" })
            },
            {
                field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "120",
                rander: new mf.HourRander({ title: "title" })
            },
            {
                field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "120",
                rander: new mf.HourRander({ title: "title" })
            }
        ]
    });

    //制令单开窗
    this.MoCodeClick = function (ID) {
        $("#MoCodeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MoCodeDialog").modal('show');
        MoCodeDialogTable.loadData();

        $("#MoCodeComfirm").unbind();
        $("#MoCodeComfirm").click(function () {
            var row = MoCodeDialogTable.getSelectedData();
            if (row) {
                $(ID).val(row.MoNo);
                $("#MoCodeDialog").modal("hide");
            }
        });
    };

    //制令单开窗查询
    this.searchMoCodeClick = function () {
        MoCodeDialogTable.goForwordSafely(function () {
            MoCodeDialogTable.loadData(null, null, 1);
        }, null);
    };

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

    //刷新
    this.refreshClick = function () {
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
        
    };
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
            formModel.Status(StatusStr.substring(0, StatusStr.length - 1));
        }
        else {
            formModel.Status('');
        }

        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);

    };
    
    // 导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        
        var sfc00007_exportUrl = "/MES/api/ExportFile/Sfc00007Export?";
        var sfc00007_params;
        var FinishNo = $("#FinishNo").val();
        var EndWorkD = $("#EndWorkD").val();
        sfc00007_params = "Token=" + token;
        sfc00007_params += "&FinishNo=" + FinishNo;
        sfc00007_params += "&EndWorkD=" + EndWorkD;

        window.location.href = mf.domain + sfc00007_exportUrl + sfc00007_params;
    };

    // 导入
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
            var row = table.getRowData($Row);
            var importData = new FormData();
            importData.append("File", document.getElementById('BtnFile').files[0]);
            importData.append("Token", token);//"1"
            importData.append("ComplaintDetailID", row.ComplaintDetailID);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Sfc00007Import',
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

    //设置任务卡弹窗表格
    var TaskTable = new mf.Table("#TaskTable", {
        uniqueId: "TaskDispatchID",
        LastWidth: "80",
        paginationBar: new mf.PaginationBar("#paginagionTaskBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = { Token: token };
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            //success(data1);

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetTaskListV1',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'OrderNum', title: fields.WorkOrderNumber, align: "center", width: "180",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'TaskNo', title: fields.TaskCardNo, align: "center", width: "260",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "120",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: "140",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ManufacturingUnit', title: fields.ManufacturingUnit, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'AuxiliaryUnit', title: fields.AuxiliaryUnit, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'UnitRate', title: fields.UnitRate, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'FinProQtyAble', title: fields.FinProQtyAble, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'TaskDispatchID', title: fields.TaskCardNo, align: "center", width: "100",visible:false,
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ClassCodeName', title: fields.Shift, align: "center", width: "120",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            }
        ]
    });
    
    //主表格
    var table = new mf.Table("#CompletedJobTable", {
        uniqueId: "CompletionOrderID",
        isFrozenColumn: true,
        operateColumWidth: "350px",
        LastWidth: "80",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 185,
        focusField: "DTSID",
        focusEditField: "DTSID",
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.WorkCenter = $("#WorkCenter").val();
            searchData.Process = $("#ProcessNo").val();
            searchData.FabricatedMother = $("#OrderNumber").val();
            searchData.FinishNo = formModel.FinishNo();
            searchData.Date = formModel.EndWorkD();
            searchData.Status = formModel.Status();
            //success(data1);
            //ExportTotal = 4;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/SFC00007GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                    ExportTotal = data.total;
                    console.log("主表"+JSON.stringify(data))
                }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
           
            //1.保存时，判断数量（完工数量、报废量、差异量、返工量）总量与
            //工时（有效人工 / 机器工时、无效人工 / 机器工时）总量不可以同时为零
            //，若同时为零，弹窗提示“数量及工时不得同时为0，是否继续编辑”，点击确定，
            //页面不刷新，数据保持编辑状态，点击取消，页面刷新，数据不保存。
            var FinishQty = parseFloat( table.getEditingColumnValue($row, "FinProQuantity"));
            var ScrappedQty = parseFloat( table.getEditingColumnValue($row, "ScrappedQuantity"));
            var DifferenceQty = parseFloat( table.getEditingColumnValue($row, "DifferenceQuantity"));
            var ReworkQty = parseFloat(table.getEditingColumnValue($row, "RepairQuantity"));
            var ValidLaborHour = parseFloat(table.getEditingColumnValue($row, "LaborHour").replace(":", "").replace(":", ""));
            var InvalidLaborHour = parseFloat(table.getEditingColumnValue($row, "UnLaborHour").replace(":", "").replace(":", ""));
            var ValidMachineHour = parseFloat(table.getEditingColumnValue($row, "MachineHour").replace(":", "").replace(":", ""));
            var InvalidMachineHour = parseFloat(table.getEditingColumnValue($row, "UnMachineHour").replace(":", "").replace(":", ""));
            if ((FinishQty + ScrappedQty + DifferenceQty + ReworkQty) == 0 &&
                (ValidLaborHour + ValidMachineHour + InvalidLaborHour + InvalidMachineHour) == 0) {
                return fields.NumberAndHourIsZero;
                // confirm                
            }
            
            return null;
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/SFC00007Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_checkeditable: function ($selectedRow) {
            var data = table.getRowData($selectedRow);           
            if (data.Status.substring(5, data.Status.length) == "020121300002A") 
            { return true;}
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            Aqty = data['FinProQuantity'];         
            //if (!(isEditing || isAdding)) return;
            /*   
            1.当系统参数的“异常说明”为必输（Y），本栏位不可编辑
“异常说明”为非必输（N），开放做编辑。
            */
            //var uqData = UnusualQtyTable.getAllRowData();
            //for()
            /*
            var isScrappedQtyAlready = 0;
            var isDifferenceQtyAlready = 0;
            var isReworkQtyAlready = 0;
            */
            //var row = table.getRowData($Row);
            // 因为只要是异常说明为Y或者已成说明程序有数据的话。都是不能编辑的
            var CompletionOrderID = "";
            if (isEditing) {
                CompletionOrderID = data.CompletionOrderID;
                NextTaskDispatchID = data.TaskDispatchID;     
                
            } else {
                $row.find("#Status > option").slice(2).remove();// 移除核准之後的狀態
                $row.find("#Status > option:first").remove();// 移除立單
            }           
            $CheckQuantity = {};
            mf.ajax({
                async: false,// 不同步
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007CheckQuantity',
                data: { CompletionOrderID: CompletionOrderID },
                success: function (data) {
                    $CheckQuantity = data;
                    console.log(data);
                    //isScrappedQtyAlready = data                  
                    if (!data.IsScrapped) {
                        $row.find("#ScrappedQuantity").attr('disabled', true);
                    }
                    if (!data.IsDifference) {
                        $row.find("#DifferenceQuantity").attr('disabled', true);
                    }
                    if (!data.IsRepair) {
                        $row.find("#RepairQuantity").attr('disabled', true);
                    }
                    if (!data.IsLaborHour) {
                        $row.find("#LaborHour").attr('disabled', true);
                    }
                    if (!data.IsUnLaborHour) {
                        $row.find("#UnLaborHour").attr('disabled', true);
                    }
                    if (!data.IsMachineHour) {
                        $row.find("#MachineHour").attr('disabled', true);
                    }
                    if (!data.IsUnMachineHour) {
                        $row.find("#UnMachineHour").attr('disabled', true);
                    }
                }
            });
          /*
            var $ScrappedQtyEditingCell = $row.find("#ScrappedQty");
            var $DifferenceQtyEditingCell = $row.find("#DifferenceQty");
            var $ReworkQtyEditingCell = $row.find("#ReworkQty");
            if (parameters.PT0191213000001 == "N") {// 异常说明=N and 異常數量裡的報廢量為0
                if (isScrappedQtyAlready > 0) {
                    $ScrappedQtyEditingCell.attr('readonly', true);
                }
                else {
                    $ScrappedQtyEditingCell.attr('readonly', false);
                }
                if (isDifferenceQtyAlready > 0) {
                    $DifferenceQtyEditingCell.attr('readonly', true);
                }
                else {
                    $DifferenceQtyEditingCell.attr('readonly', false);
                }
                if (isReworkQtyAlready > 0) {
                    $ReworkQtyEditingCell.attr('readonly', true);
                }
                else {
                    $ReworkQtyEditingCell.attr('readonly', false);
                }
                
            }
            else {
                
                $ScrappedQtyEditingCell.attr('readonly', true);
            }
            */
            // 修改日期要重新取得編號
            $row.find("#Date").bind("change", self.GetCompletionNo);
        },
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:350px;'> ");
            var $ResourceReportingClick = $('<button id="ResourceReportingClick" class="btn btn-success btn-xs btn-edit" onclick="model.ResourceReportingClick(this)" title="資源報工" >' + fields.ResourceReporting + '</button>');
            var $UnusualQtyClick = $('<button id="UnusualQtyClick" class="btn btn-success btn-xs btn-edit" style="margin-left:5px;"  onclick="model.UnusualQtyClick(this)" title="異常數量" >' + fields.AberrantAmount + '</button>');
            var $UnusualHourClick = $('<button id="UnusualHourClick" class="btn btn-success btn-xs btn-edit" style="margin-left:5px;"  onclick="model.UnusualHourClick(this)" title="無效工時" >' + fields.InvalidWorkHour + '</button>');
            var $LotClick = $('<button id="LotClick" class="btn btn-success btn-xs btn-edit" onclick="model.LotClick(this)" style="margin-left:5px;"  title="批號屬性" >' + fields.LotsProperty + '</button>');
            var $ConfirmClick = $('<button id="ConfirmClick" class="btn btn-success btn-xs btn-edit" style="margin-left:5px;"  onclick="model.ConfirmClick(this)" title="確認"  disabled>' + fields.Comfirm + '</button>');
            if (!data.IsResourceReport) {
                $ResourceReportingClick.attr("disabled", true);
            }
            console.log(data.Lot);
            if (!data.Lot || data.IfLastProcess == "0") {
                $LotClick.attr("disabled", true);
            }
            if (data.Status != null) {
                if (data.Status.substring(5, data.Status.length) == "0201213000029") {
                    $ConfirmClick.attr("disabled", false);
                }
            }

            $td.append($ResourceReportingClick);
            $td.append($UnusualQtyClick);
            $td.append($UnusualHourClick);
            $td.append($LotClick);
            $td.append($ConfirmClick);
            
            return $td;
        },
        fn_realDelete: function (rowData, success) {
            var ID = rowData.CompletionOrderID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007Delete",
                data: JSON.stringify({ CompletionOrderID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete:true,
        columns: [
            {
                field: 'TaskDispatchID', title: "TaskDispatchID", align: "center", visible: false, require: true, width: "100", 
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, title: "title", maxLength: 30, readonly: 'readonly' })),
               
            },
            {
                field: 'AutoNumberID', title: "AutoNumberID", align: "center", require: true, width: "100", visible: false,
                rander: new mf.TextRander({ title: true }),

            },
            {
                field: 'IsResourceReport', title: "IsResourceReport", align: "center", require: true, width: "100", visible: false,
                rander: new mf.TextRander({ title: true }),

            },
            {
                field: 'DTSID', title: fields.DocumentCategory, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander("value", "text", BillTypeList, { title: true, MaxWidth: "120px" }))
            },
            {
                field: 'LotMethod', title: "LotMethod", align: "center", width: "140", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'Lot', title: "Lot", align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'IfLastProcess', title: "IfLastProcess", align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompletionNo', title: fields.FinishNo, align: "center", require: true, width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, title: "title", maxLength: 30, disabled: true, readonly: 'readonly' })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CompletionNoIsNull)
                ]
            },
            {
                field: 'Date', title: fields.FinishWorkDate, align: "center", require: true, width: "120",
                rander: new mf.DateRander(),
                defaultValue: mf.format.Date(new Date()),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.FinishWorkDateIsNull)
                ]
                
            },
            {
                field: 'TaskNo', title: fields.TaskCardNo, align: "center", require: true, width: "250",
                rander: new mf.FKRander(
                    "#TaskDialog",
                    "#TaskConfirmBtn",
                    TaskTable,
                    new mf.TextRander({ size: 23, readonly: 'readonly', title: "title"}),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#TaskNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    NextTaskDispatchID = e.data.TaskDispatchID;
                    table.setEditingColumnValue($row, "TaskDispatchID", e.data.TaskDispatchID);
                    table.setEditingColumnValue($row, "TaskNo", e.data.TaskNo);
                    //table.setEditingColumnValue($row, "OrderNum", e.data.OrderNum);
                    table.setEditingColumnValue($row, "BatchNumber", e.data.BatchNumber);
                    table.setEditingColumnValue($row, "LotMethod", e.data.LotMethod);
                    table.setEditingColumnValue($row, "ItemID", e.data.ItemID);
                    table.setEditingColumnValue($row, "ItemCode", e.data.ItemCode);
                    table.setEditingColumnValue($row, "ItemName", e.data.ItemName);
                    table.setEditingColumnValue($row, "ItemSpecification", e.data.ItemSpecification);
                    table.setEditingColumnValue($row, "ManufacturingUnit", e.data.ManufacturingUnit);
                    table.setEditingColumnValue($row, "UnitRate", e.data.UnitRate);
                    table.setEditingColumnValue($row, "AuxiliaryUnit", e.data.AuxiliaryUnit);
                    table.setEditingColumnValue($row, "FinProQtyAble", e.data.FinProQtyAble);

                    mf.ajax({
                        type: 'Get',
                        url: '/MES/api/IntelligentManufacturing/Sfc00007GetNextList',
                        data: ({ TaskDispatchID: NextTaskDispatchID }),
                        success: function (data) {   
                            if (data != null) {
                                NextID = data[0].value;
                                table.setEditingColumnValue($row, "NextCode", data[0].Code);
                            }
                        }
                    });
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.TaskCardNoIsNull)
                ]
            },
            {
                field: 'TaskID', title: fields.WorkOrderNumber, align: "center", visible: false, width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            //{
            //    field: 'OrderNum', title: fields.WorkOrderNumber, align: "center",  width: "210",
            //    rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title", readonly: 'readonly', disabled: true}),
            //},
            {
                field: 'ItemID', title: fields.Part, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly', disabled: true }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly', disabled: true}),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center",  width: "140",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title", readonly: 'readonly', disabled: true}),
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly', disabled: true }),
            },
            
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center",  width: "140",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title", readonly: 'readonly', disabled: true}),
            },
            {
                field: 'ManufacturingUnit', title: fields.ManufacturingUnit, align: "center",  width: "100",
                rander: new mf.TextRander({ size: 7, maxLength: 120, title: "title", readonly: 'readonly', disabled: true}),
            },
            {
                field: 'AuxiliaryUnit', title: fields.AuxiliaryUnit, align: "center",  width: "100",
                rander: new mf.TextRander({ size: 7, maxLength: 120, title: "title", readonly: 'readonly', disabled: true }),
            },
            {
                field: 'UnitRate', title: fields.UnitRate, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, maxLength: 120, title: "title", readonly: 'readonly', disabled: true}),
            },
            
            {
                field: 'FinProQtyAble', title: fields.FinProQtyAble, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 80, title: "title", readonly: 'readonly', disabled: true })
            },
            {
                field: 'FinProQuantity', title: fields.FinishQty, align: "center", width: "120", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData, isAdding) {
                    var FinProQtyAble = table.getEditingColumnValue($row, 'FinProQtyAble');
                    FinProQtyAble = parseInt(FinProQtyAble);
                    var index = $row.data("index");
                    var rowdata = rowsData[index];
                    var CompletionOrderID = rowdata.CompletionOrderID;
                    var FinProQuantity = table.getEditingColumnValue($row, 'FinProQuantity');
                    FinProQuantity = parseInt(FinProQuantity);
                    if (!(isNaN(FinProQuantity))) {
                        mf.ajax({
                            type: 'Get',
                            url: '/MES/api/IntelligentManufacturing/Sfc00007CheckFinProQuantity',
                            data: ({ CompletionOrderID: CompletionOrderID, TaskDispatchID: NextTaskDispatchID, FinProQuantity: FinProQuantity }),
                            success: function (data) {
                                if (!data) {
                                    msg.warningOne(fields.info, fields.FinProQuantityIsMore, function () {

                                    }, function () {
                                        table.setEditingColumnValue($row, "FinProQuantity", Aqty);
                                        $row.find("#FinProQuantity").focus();
                                    })
                                }
                            }
                        });
                    }
                    //if (!isAdding) {                       
                    //}
                    //else {
                    //    if (!(isNaN(FinProQuantity))) {
                    //        mf.ajax({
                    //            type: 'Get',
                    //            url: '/MES/api/IntelligentManufacturing/Sfc00007CheckFinProQuantity',
                    //            data: ({ CompletionOrderID: CompletionOrderID, TaskDispatchID: NextTaskDispatchID, FinProQuantity: FinProQuantity }),
                    //            success: function (data) {
                    //                if (!data) {
                    //                    msg.warningOne(fields.info, fields.FinProQuantityIsMore, function () {

                    //                    }, function () {
                    //                        table.setEditingColumnValue($row, "FinProQuantity", Aqty);
                    //                        $row.find("#FinProQuantity").focus();
                    //                    })
                    //                }
                    //            }
                    //        });
                    //    }
                    //}               
                },
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.FinishQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.FinishQtyIsMaxInteger, fields.FinishQtyIsMaxDecimal,
                        fields.FinishQtyIsNonNegativeNumber, 12, 6)
                ],
                
            },
            {
                field: 'ScrappedQuantity', title: fields.ScrappedQty, align: "center", width: "120", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ScrappedQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ScrappedQtyIsMaxInteger, fields.ScrappedQtyIsMaxDecimal,
                        fields.ScrappedQtyIsNonNegativeNumber, 12, 6)
                ],
                
            },
            {
                field: 'DifferenceQuantity', title: fields.DifferenceQty, align: "center", width: "120", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.DifferenceQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.DifferenceQtyIsMaxInteger, fields.DifferenceQtyIsMaxDecimal,
                        fields.DifferenceQtyIsNonNegativeNumber, 12, 6)
                ],
               
            }, 
            {
                field: 'RepairQuantity', title: fields.ReworkQty, align: "center", width: "120", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ReworkQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ReworkQtyIsMaxInteger, fields.ReworkQtyIsMaxDecimal,
                        fields.ReworkQtyIsNonNegativeNumber, 12, 6)
                ],
                
            }, 
           
            {
                field: 'LaborHour', title: fields.ValidLaborHour, align: "center", width: "170",
                rander: new mf.HoursInputRander({ title: "title" }),
                //rander: new mf.TextRander({ size: 7, title: "title", event: "input", eventName: "oninputhour(this)" }),
                defaultValue: "00:00:00",
                //checkers: [
                //    new mf.IsOnlyTimeChecker(fields.OnlyHMS),                    
                //]
            },
            
            {
                field: 'UnLaborHour', title: fields.InvalidLaborHour, align: "center", width: "170",
                rander: new mf.HoursInputRander({ title: "title" }),
                //rander: new mf.TextRander({ size: 7, title: "title", event: "input", eventName: "oninputhour(this)" }),
                defaultValue: "00:00:00",
                //checkers: [
                //    new mf.IsOnlyTimeChecker(fields.OnlyHMS),
                //]
            },
            
            {
                field: 'MachineHour', title: fields.ValidMachineHour, align: "center", width: "170",
                rander: new mf.HoursInputRander({ title: "title" }),
                //rander: new mf.TextRander({ size: 7, title: "title", event: "input", eventName: "oninputhour(this)" }),
                defaultValue: "00:00:00",
                //checkers: [
                //    new mf.IsOnlyTimeChecker(fields.OnlyHMS),
                //]
            },
            
            {
                field: 'UnMachineHour', title: fields.InvalidMachineHour, align: "center", width: "170",
                rander: new mf.HoursInputRander({ title: "title" }),
                //rander: new mf.TextRander({ size: 7, title: "title", event: "input", eventName: "oninputhour(this)" }),
                defaultValue: "00:00:00",
                //checkers: [
                //    new mf.IsOnlyTimeChecker(fields.OnlyHMS),
                //]
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, maxLength: 120, title: "title" }),
            },
            //下一道工序流水号
            {
                field: 'NextID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return NextID;
                })
            },
            {
                field: 'NextCode', title: fields.NextProcessP, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#NextProcessDialog",
                    "#NextProcessCommit",
                    NextProcessTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "",
                        btnClass: "btn btn-success btn-xs",
                    }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    NextID = e.data.value;
                    table.setEditingColumnValue($row, "NextCode", e.data.Code);
                }
            },
            {
                field: 'Status', title: fields.Status, align: "center", disabled:true,
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004, { title: true, disabled: true}),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.StatusIsNull)
                ]
                    
                
            }
        ]
    })

    // 刪除
    this.deleteClick = function () {
        if (!table) {
            return;
        }
        table.deleteRow();
    }
    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }
        table.save(null, null, true);
    };
    
    // 编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };
    // 新增
    this.addClick = function () {
        if (!table)
            return;
        
        table.addRow();
        self.GetCompletionNo();
        // 取得單據種別清單
        $("#DTSID").bind("change", self.GetCompletionNo);
        
        //$("#CompletionNo").val("sfcb121212");

    }
    this.GetCompletionNo = function () {
        
        //获取单号
        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/IntelligentManufacturing/Sfc00007GetAutoNumber",
            data: { DTSID:$("#DTSID").val(),date:$("#Date").val()},
            success: function (data) {
                
                $("#CompletionNo").val(data.AutoNumber);
                $("#AutoNumberID").val(data.AutoNumberID);
                $(".editingRow .btn-edit").hide();
            }
        });
    }
    table.loadData();
    //设置原因弹窗表格
    var ReasonCodeTable = new mf.Table("#ReasonCodeTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonCodeBar"),
        editable: false,
        LastWidth: "140",
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#ReasonCode").val();
            var GroupDept = "";//$("#ReasonCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "SFC", Code: Code, GroupDescription: GroupDept }),
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
                field: 'Code', title: fields.ReasonNo, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center", width: "144",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });
    
    // 資源報工-機台/人員選擇開窗
    var EquipmentOrManTable = new mf.Table("#EquipmentOrManTable", {
        uniqueId: "CompletionResourceID",
        editable: false,
        LastWidth: "325",
        paginationBar: new mf.PaginationBar("#paginagionEquipmentOrManBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            var ResourceType = $("#SelectResourceType").val();
            $ResourceType = ResourceType;// 要return回來的
            var TaskDispatchID = row.TaskDispatchID;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/GetMachineOrManList',
                data: { page: pagination.page, rows: pagination.rows, Token: token, ResourceType: ResourceType, TaskDispatchID: TaskDispatchID},
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
            //success(data1);

        },
        fn_saveData: function (saveData, success) {

        },

        focusField: "DisplayName",
        height: 180,
        columns: [
            
            {
                field: 'EquipmentId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'DisplayName', title: fields.EquipmentOrMan, align: "center",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            }
            

        ]
    });
    // 取消
    this.CancelEquipmentOrManClick = function () {
        $('#EquipmentOrManDialog').modal("hide");
    }
    // 查詢
    this.DialogEquipmentOrManSearch = function () {
        EquipmentOrManTable.loadData(null, null, 1);
    }
    // 資源報工開窗
    var ResourceReportingTable = new mf.Table("#ResourceReportingTable", {
        uniqueId: "CompletionResourceID",
        editable: true,
        LastWidth: "150",
        paginationBar: new mf.PaginationBar("#paginagionResourceReportingBar"),

        fn_getData: function (pagination, searchData, success) {
            
            var row = table.getRowData($Row);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetResourceReportingList',
                data: { page: pagination.page, rows: pagination.rows, Token: token, CompletionOrderID: showCompletionOrderID },
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
            //success(data1);
            

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletionOrderID = showCompletionOrderID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007ResourceReportingSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            ResourceReportingTable.setEditingColumnValue($row, "Hour", reportHour);
        },
        fn_realDelete: function (rowData, success) {
            var ID = rowData.CompletionResourceID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007ResourceReportingDelete",
                data: JSON.stringify({ CompletionResourceID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        focusField: "ResourceReportingGroup",
        height: 300,
        columns: [
            {
                field: 'ResourceClassID', title: fields.ResourceType, align: "center", width: "120",disabled:true,
                rander: new mf.AutoSelectRander("value", "text",
                    [{ value: mf.systemID + "0201213000047", text: fields.Man }, { value: mf.systemID + "0201213000048", text: fields.Equipment }],
                    { title: true, disabled: true }),
               
            },
            {
                field: 'EquipmentID', title: fields.EquipmentOrMan, align: "center", width: "100",visible:false,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'DisplayName', title: fields.EquipmentOrMan, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#EquipmentOrManDialog",
                    "#EquipmentOrManConfirmBtn",
                    EquipmentOrManTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        //searchID: [{ value: "#ResourceClassID", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    //if ($ResourceType == "L")  { table.setEditingColumnValue($row, "ResourceClassID", parameters.PT0191213000064[0].value); }
                    //else { table.setEditingColumnValue($row, "ResourceClassID", parameters.PT0191213000064[1].value); }
                    table.setEditingColumnValue($row, "ResourceClassID", e.data.ResourceClassID);
                    table.setEditingColumnValue($row, "DisplayName", e.data.DisplayName);
                    table.setEditingColumnValue($row, "EquipmentID", e.data.EquipmentID);
                   
                }
            },
            //{
            //    field: 'Hour', title: fields.WorkTime, align: "center", width: "120",
            //    rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
            //    checkers: [
            //        new mf.IsNonNegativeNumberChecker(fields.HourIsNonNegativeNumber),
            //        new mf.IsOverDecimalChecker(fields.HourIsMaxInteger, fields.HourIsMaxDecimal,
            //            fields.HourIsNonNegativeNumber, 12, 6)
            //    ],
            //    fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
            //        checkNumber($cell);
            //    }
            //},
            {
                field: 'Hour', title: fields.WorkTime, align: "center", width: "160",
                rander: new mf.HoursInputRander({ title: "title" }),
                //rander: new mf.TextRander({ size: 9, title: "title", event: "input",eventName: "oninputhour(this)" }),
                defaultValue: reportHour,
                //checkers: [
                //    new mf.IsOnlyTimeChecker(fields.OnlyHMS),
                //]
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120",visible:false,
                rander: new mf.TextRander({ size: 9, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟資源報工
    this.ResourceReportingClick = function (obj) {       
        $Row = $(obj).parents("tr");
        var row = table.getRowData($Row);
        if (row.IsResourceReport) {
            // 判断任务单分派资料的“是否依资源报工”字段，当其为Y时显示，N时则不显示
            table.goForwordSafely(function () {
                showCompletionOrderID = row.CompletionOrderID;
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentManufacturing/Sfc00007GetReportingHour',
                    data: { CompletionOrderID: row.CompletionOrderID },
                    success: function (data) {
                        console.log(data);
                        reportHour = data;
                    }
                });
                ResourceReportingTable.loadData();
                $("#ResourceReportingDialog").modal({ backdrop: 'static', keyboard: false });
                $("#ResourceReportingDialog").modal('show');
            }, null);
        }
        else {
            msg.info(fields.info, fields.Nopermission);
        }
        
    }
    // 取消資源報工
    this.CancelResourceReportingClick = function () {
        if (!ResourceReportingTable)
            return;
        if (ResourceReportingTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#ResourceReportingDialog').modal("hide");
                    }, null);
        }
        else {
            table.loadData();
            $('#ResourceReportingDialog').modal("hide");
        }
        //ResourceReportingTable.goForword(function () {
        //    table.loadData();
        //    ResourceReportingTable.loadData();
        //    $('#ResourceReportingDialog').modal("hide");
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    window.location.reload();
        //    $('#ResourceReportingDialog').modal("hide");
        //}, fields.Isleave);
    }
    // 新增資源報工
    this.AddResourceReportingClick = function () {
        if (!ResourceReportingTable)
            return;

        ResourceReportingTable.addRow();

        var array = $.map(ResourceReportingTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == undefined) return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#ResourceReportingTable").val(sequence);
        } else {
            $("#Sequence", "#ResourceReportingTable").val(1);
        }
    }
    // 修改資源報工
    this.ChangeResourceReportingClick = function () {
        if (!ResourceReportingTable)
            return;

        ResourceReportingTable.editRow();
    }
    // 刪除資源報工
    this.DeleteResourceReportingClick = function () {
        if (!ResourceReportingTable)
            return;
        ResourceReportingTable.deleteRow();
        
    }
    // 保存資源報工
    this.SaveResourceReportingClick = function () {
        if (!ResourceReportingTable)
            return;
        ResourceReportingTable.save(null, null, true);
    }
    
    // 異常數量開窗
    var UnusualQtyTable = new mf.Table("#UnusualQtyTable", {
        uniqueId: "AbnormalQuantityID",
        editable: true,
        LastWidth: "125",
        paginationBar: new mf.PaginationBar("#paginagionUnusualQtyBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetUnusualQtyList',
                data: { page: pagination.page, rows: pagination.rows, CompletionOrderID: showCompletionOrderID },
                success: function (data) {
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletionOrderID = showCompletionOrderID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007UnusualQtySave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            var ID = rowData.AbnormalQuantityID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007UnusualQtyDelete",
                data: JSON.stringify({ AbnormalQuantityID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        focusField: "Type",
        height: 300,
        columns: [
            {
                field: 'Type', title: fields.ExceptionCategory, align: "center", width: "120",
                //rander: new mf.AutoSelectRander(
                //    "value", "text", [{ text: fields.Scrapped, value: 1 }, { text: fields.Difference, value: 2 }, { text: fields.ReworkQty, value: 3 }],
                //    {
                //        title: true
                //    }),
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000063,
                    {
                        title: true
                    }))
            },
            {
                field: 'ReasonID', title: fields.EquipmentOrMan, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ReasonCode', title: fields.ReasonCode, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "180",
                rander: new mf.FKRander(
                    "#ReasonCodeDialog",
                    "#ReasonCodeConfirmBtn",
                    ReasonCodeTable,
                    new mf.TextRander(
                        {
                            size: 12, readonly: 'readonly'
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
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                },
                checkers: [new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)]
            },
            {
                field: 'Quantity', title: fields.Quantity, align: "center",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", event: "input", eventName: "oninputnum(this)" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.QuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.QuantityIsMaxInteger, fields.QuantityIsMaxDecimal,
                        fields.QuantityIsNonNegativeNumber, 12, 6),
                    new mf.TextNotEmptyChecker(fields.QuantityIsNonNegativeNumber)
                ],
                
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟異常數量
    this.UnusualQtyClick = function (obj) {

        $Row = $(obj).parents("tr");

        var row = table.getRowData($Row);
        if (row.Status == null || row.Status.substring(5, row.Status.length) != "0201213000029") {
            $("#UnusualQtyAdd,#UnusualQtyChange,#UnusualQtyDeletion,#UnusualQtyComfirm").hide();
        }
        else {
            $("#UnusualQtyAdd,#UnusualQtyChange,#UnusualQtyDeletion,#UnusualQtyComfirm").show();
        }

        table.goForwordSafely(function () {
            showCompletionOrderID = row.CompletionOrderID;
            UnusualQtyTable.loadData();
            $("#UnusualQtyDialog").modal({ backdrop: 'static', keyboard: false });
            $("#UnusualQtyDialog").modal('show');
        }, null);
              
    }
    // 取消異常數量
    this.CancelUnusualQtyClick = function () {
        if (!UnusualQtyTable)
            return;
        if (UnusualQtyTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#UnusualQtyDialog').modal("hide");
                    }, null);
        }
        else {
            table.loadData();
            $('#UnusualQtyDialog').modal("hide");
        }
        //UnusualQtyTable.goForword(function () {
        //    table.loadData();
        //    UnusualQtyTable.loadData();
        //    $('#UnusualQtyDialog').modal("hide");
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    window.location.reload();
        //    $('#UnusualQtyDialog').modal("hide");
        //}, fields.Isleave);
    }
    // 新增異常數量
    this.AddUnusualQtyClick = function () {
        if (!UnusualQtyTable)
            return;

        UnusualQtyTable.addRow();

        var array = $.map(UnusualQtyTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == undefined) return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#UnusualQtyTable").val(sequence);
        } else {
            $("#Sequence", "#UnusualQtyTable").val(1);
        }
    }
    // 修改異常數量
    this.ChangeUnusualQtyClick = function () {
        if (!UnusualQtyTable)
            return;

        UnusualQtyTable.editRow();
    }
    // 刪除異常數量
    this.DeleteUnusualQtyClick = function () {
        if (!UnusualQtyTable)
            return;
        UnusualQtyTable.deleteRow();
    }
    // 保存異常數量
    this.SaveUnusualQtyClick = function () {
        if (!UnusualQtyTable)
            return;
        UnusualQtyTable.save(null, null, true);
    }
    // 無效工時開窗
    var UnusualHourTable = new mf.Table("#UnusualHourTable", {
        uniqueId: "AbnormalHourID",
        editable: true,
        LastWidth: "125",
        paginationBar: new mf.PaginationBar("#paginagionUnusualHourBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetUnusualHourList',
                data: { page: pagination.page, rows: pagination.rows, CompletionOrderID: showCompletionOrderID },
                success: function (data) {
                    success(data);
                }
            });
            //success(data1);

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletionOrderID = showCompletionOrderID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007UnusualHourSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
           
        },
        fn_realDelete: function (rowData, success) {
            var ID = rowData.AbnormalHourID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007UnusualHourDelete",
                data: JSON.stringify({ AbnormalHourID:  ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        focusField: "Type",
        height: 300,
        columns: [
            {
                field: 'Type', title: fields.InvalidCategory, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000064,
                    {
                        title: true
                    }))
            },
            {
                field: 'ReasonID', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ReasonCode', title: fields.ReasonCode, align: "center", width: "130",
                rander: new mf.TextRander({ size: 11, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#ReasonCodeDialog",
                    "#ReasonCodeConfirmBtn",
                    ReasonCodeTable,
                    new mf.TextRander(
                        {
                            size: 9, readonly: 'readonly'
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
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                },
                checkers: [new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)]
            },
            {
                field: 'Hour', title: fields.WorkTime, align: "center",
                rander: new mf.HoursInputRander({ title: "title" }),
                //rander: new mf.TextRander({ size: 11, title: "title", event: "input",eventName: "oninputhour(this)" }),
                defaultValue: "00:00:00",
                //checkers: [
                //    new mf.IsOnlyTimeChecker(fields.OnlyHMS),

                //]
            },
            //{
            //    field: 'Hour', title: fields.WorkTime, align: "center", width: "120",
            //    rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
            //    checkers: [
            //        new mf.IsNonNegativeNumberChecker(fields.HourIsNonNegativeNumber),
            //        new mf.IsOverDecimalChecker(fields.HourIsMaxInteger, fields.HourIsMaxDecimal,
            //            fields.HourIsNonNegativeNumber, 12, 6),
            //        new mf.TextNotEmptyChecker(fields.HourIsNonNegativeNumber)
                    

            //    ],
                
            //},
            {
                field: 'CompletionOrderID', title: fields.Remark, align: "center", width: "120",visible:false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟無效工時
    this.UnusualHourClick = function (obj) {
        $Row = $(obj).parents("tr");

        var row = table.getRowData($Row);

        if (row.Status == null || row.Status.substring(5, row.Status.length) != "0201213000029") {
            $("#UnusualHourAdd,#UnusualHourChange,#UnusualHourDeletion,#UnusualHourComfirm").hide();
        }
        else {
            $("#UnusualHourAdd,#UnusualHourChange,#UnusualHourDeletion,#UnusualHourComfirm").show();
        }

        table.goForwordSafely(function () {
            showCompletionOrderID = row.CompletionOrderID;
            UnusualHourTable.loadData();
            $("#UnusualHourDialog").modal({ backdrop: 'static', keyboard: false });
            $("#UnusualHourDialog").modal('show');
        }, null);
               
    }
    // 取消無效工時
    this.CancelUnusualHourClick = function () {
        if (!UnusualHourTable)
            return;
        if (UnusualHourTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#UnusualHourDialog').modal("hide");
                    }, null);
        }
        else {
            table.loadData();
            $('#UnusualHourDialog').modal("hide");
        }
        //UnusualHourTable.goForword(function () {
        //    table.loadData();
        //    UnusualHourTable.loadData();
        //    $('#UnusualHourDialog').modal("hide");
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    window.location.reload();
        //    $('#UnusualHourDialog').modal("hide");
        //}, fields.Isleave);
    }
    // 新增無效工時
    this.AddUnusualHourClick = function () {
        if (!UnusualHourTable)
            return;

        UnusualHourTable.addRow();

        var array = $.map(UnusualHourTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == undefined) return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#UnusualHourTable").val(sequence);
        } else {
            $("#Sequence", "#UnusualHourTable").val(1);
        }
    }
    // 修改無效工時
    this.ChangeUnusualHourClick = function () {
        if (!UnusualHourTable)
            return;

        UnusualHourTable.editRow();
    }
    // 刪除無效工時
    this.DeleteUnusualHourClick = function () {
        if (!UnusualHourTable)
            return;
        UnusualHourTable.deleteRow();
        
    }
    // 保存無效工時
    this.SaveUnusualHourClick = function () {
        if (!UnusualHourTable)
            return;
        UnusualHourTable.save(null, null, true);
    }
    // 批號屬性開窗
    var LotTable = new mf.Table("#LotTable", {
        uniqueId: "BatchAttributeID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionLotBar"),
        operateColumWidth: "100px",
        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotList',
                data: { page: pagination.page, rows: pagination.rows, Token: token, CompletionOrderID: showCompletionOrderID },
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
            //success(data1);

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletionOrderID = showCompletionOrderID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007LotSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            if (!(isEditing || isAdding)) return;
            $row.find("#btnLotAttr").hide();// 新增時不顯示
            var row = table.getRowData($Row);
            $row.find("#CompletionNo").val(row.CompletionNo);
            $row.find("#TaskNo").val(row.TaskNo);
            $row.find("#ItemCode").val(row.ItemCode);
            //$row.find("#BatchNo").val(row.BatchNo);
            var ItemID = row.ItemID;// ItemID
            if (isEditing) return;// 修改時不取號
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotNumber',
                data: { Token: token, ItemID: ItemID },
                success: function (data) {
                    console.log(data);

                    if (data.Status != "200") {
                        msg.error(data.msg);
                    }
                    else {
                        
                        $("#AutoNumberRecordID").val(data.AutoNumberRecordID);
                        $("#BatchNo").val(data.BatchNumber);
                    }
                }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            
            // 料品主档的批控为Y时，按“取号”按钮，由批号编号原则直接写入如手动填入，需要检查制令单是否有批号，如果有，直接带入此工单的批号。
            /*
            var LotNo = LotTable.getEditingColumnValue($row, "BatchNo");
            var TaskID = table.getRowData($Row).TaskDispatchID;
            var msg = "";
            mf.ajax({
                async:false,
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007LotNoChecks',
                data: { Token: token, LotNo:LotNo,TaskID:TaskID},
                success: function (data) {
                    if (!data.IsFail) {
                        msg = data.Msg;
                    }
                    else {
                        console.log(data);
                        $row.find("#CompeletedLotId").val(data.LotId);
                        $row.find("#BatchNo").val(data.LotNo);
                        
                    }
                }
            });
            return msg;*/
        },
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:100px;'> ");
            //if (data.LotControl == "Y") {
            //    // 判断任务单分派资料的“是否依资源报工”字段，当其为Y时显示，N时则不显示
            //    $td.append('<button class="btn btn-success btn-xs" onclick="model.GetLotNo(this)" title="取號" >' + fields.GetNo + '</button>&nbsp;&nbsp;');
            //}
            var row = table.getRowData($Row);
            $td.append('<button class="btn btn-success btn-xs" id="btnLotAttr" onclick="model.LotAttributeClick(this)" title="屬性" >' + fields.Attributes + '</button>');
           
            return $td;
        },
        focusField: "BatchNo",
        height: 300,
        fn_realDelete: function (rowData, success) {
            var ID = rowData.BatchAttributeID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007LotDelete",
                data: JSON.stringify({ BatchAttributeID:  ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        columns: [
            {
                field: 'CompletionOrderID', title: fields.ResourceType, align: "center", width: "60", visible: false,
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompletionNo', title: fields.FinishNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'TaskNo', title: fields.TaskCardNo, align: "center", width: "240",
                rander: new mf.TextRander({ size: 26, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'LotControl', title: fields.Part, align: "center", width: "100",visible:false,
                rander: new mf.TextRander({ size: 7, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompeletedLotId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AutoNumberRecordID', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'BatchNo', title: fields.LotNo, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title"}),
            },
            {
                field: 'Quantity', title: fields.Quantity, align: "center", width: "100",
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.QuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.QuantityIsMaxInteger, fields.QuantityIsMaxDecimal,
                        fields.QuantityIsNonNegativeNumber, 12, 6)
                ]
            },
            {
                field: 'EffectDate', title: fields.EffectDate, align: "center",readonly:'readonly',
                rander: new mf.DateRander(),
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 取得批號
    //this.GetLotNo = function (obj) {
    //    var ItemID = $("#LotNo").val();//料品流水号
    //    mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotAutoNumber',
    //            data: { page: pagination.page, rows: pagination.rows, Token: token, ItemID: ItemID},
    //            success: function (data) {
    //                console.log(data);
    //                success(data);
    //    if (data.IsFail) {
    //        msg.error(data.msg);
    //    }
    //    else{
    //        $("#AutoNumberID").val(data.AutoNumberRecordID);
    //        $("#BatchNo").val(data.BatchNumber);
    //    }
    //            }
    //        });

    //}
    // 開啟批號屬性
    this.LotClick = function (obj) {
        $Row = $(obj).parents("tr");
        var row = table.getRowData($Row);
        
        if ((row.Status != null && row.Status.substring(5, row.Status.length) == "020121300002A") || row.IfLastProcess == "0" || row.Lot == false) { //OP 分别是Lot料品是否为批件，以及IfLastProcess 制程是否为最终制程
            $("#LotAdd,#LotChange,#LotDeletion,#LotComfirm").hide();
        }
        else {
            $("#LotAdd,#LotChange,#LotDeletion,#LotComfirm").show();
        }
        if (row.Lot) {
            table.goForwordSafely(function () {
            showCompletionOrderID = row.CompletionOrderID;
            LotTable.loadData();
            $("#LotDialog").modal({ backdrop: 'static', keyboard: false });
            $("#LotDialog").modal('show');
            }, null);
        }
        else {
            msg.info(fields.info, fields.Nopermission);
        }
        
    }
    // 取消批號屬性
    this.CancelLotClick = function () {
        if (!LotTable)
            return;
        if (LotTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#LotDialog').modal("hide");
                    }, null);
        }
        else {
            table.loadData();
            $('#LotDialog').modal("hide");
        }
        //LotTable.goForword(function () {
        //    LotTable.loadData();
        //    $('#LotDialog').modal("hide");
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    window.location.reload();
        //    $('#LotDialog').modal("hide");
        //}, fields.Isleave);
    }
    // 新增批號屬性
    this.AddLotClick = function () {
        if (!LotTable)
            return;

        LotTable.addRow();
        
        
        
        var array = $.map(LotTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == undefined) return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#LotTable").val(sequence);
        } else {
            $("#Sequence", "#LotTable").val(1);
        }

    }
    // 修改批號屬性
    this.ChangeLotClick = function () {
        if (!LotTable)
            return;

        LotTable.editRow();
    }
    // 刪除批號屬性
    this.DeleteLotClick = function () {
        if (!LotTable)
            return;
        
        LotTable.deleteRow();
    }
    // 保存批號屬性
    this.SaveLotClick = function () {
        if (!LotTable)
            return;
        LotTable.save(null, null, true);
    }
    // 批號屬性-屬性選擇開窗
    var AttributeTable = new mf.Table("#AttributeTable", {
        uniqueId: "ParameterID",
        editable: false,
        LastWidth: "210",
        paginationBar: new mf.PaginationBar("#paginagionAttributeBar"),

        fn_getData: function (pagination, searchData, success) {
            var tr = $("#LotAttributeTable").find("tr.active");
            var row = LotAttributeTable.getRowData(tr);
            var AttributeID = row.AttributeID;
            
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetAttributeLList',
                data: { page: pagination.page, rows: pagination.rows, Token: token, AttributeID: AttributeID},
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
            //success(data1);

        },
        fn_saveData: function (saveData, success) {

        },

        focusField: "AttributeCode",
        height: 250,
        columns: [
            //{
            //    field: 'AttributeCode', title: fields.ResourceType, align: "center", width: "60",
            //    rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            //},
            {
                field: 'ParameterID', title: fields.Attributes, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'Name', title: fields.AttributeValue, align: "center", width: "180",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            //{
            //    field: 'TaskId', title: fields.Attribute, align: "center", width: "100", visible: false,
            //    rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            //}

        ]
    });
    // 取消
    this.CancelAttributeClick = function () {
        $('#AttributeDialog').modal("hide");
    }
    // 批號屬性-屬性開窗
    var LotAttributeTable = new mf.Table("#LotAttributeTable", {
        uniqueId: "ID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionLotAttributeBar"),
        LastWidth: "210",
        fn_getData: function (pagination, searchData, success) {
            var row = LotTable.getRowData($LotRow);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotAttributeList',
                data: { page: pagination.page, rows: pagination.rows, Token: token, BatchAttributeID: row.BatchAttributeID},
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
            //success(data1);

        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            
            
        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].BatchAttributeDetailID = row.BatchAttributeDetailID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007LotAttributeSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                    //if (data.IsFail) {

                    //} else {
                    //    LotAttributeTable.loadData();
                    //}
                }
            });
        },
        fn_checkeditable: function ($selectedRow) {
            
        },
        focusField: "AttributeValue",
        height: 300,
        columns: [
            {
                field: 'AttributeID', title: fields.ResourceType, align: "center", width: "60", visible: false,
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompeletedLotId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeCode', title: fields.Code, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' })),
            },
            {
                field: 'AttributeDesc', title: fields.Attributes, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' })),
            },
            {
                field: 'AttributeValueName', title: fields.PropertyDatavalue, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#AttributeDialog",
                    "#AttributeConfirmBtn",
                    AttributeTable,
                    new mf.TextRander(
                        {
                            size: 10, readonly: 'readonly'
                        }
                    ),
                    {
                        btnTitle: "",
                        btnClass: "btn btn-success btn-xs",
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    //table.setEditingColumnValue($row, "AttributeId", e.data.ParameterID);
                    table.setEditingColumnValue($row, "AttributeValueName", e.data.Name);
                    table.setEditingColumnValue($row, "PropertyDatavalue", e.data.Comments);
                    table.setEditingColumnValue($row, "AttributeValue", e.data.ParameterID);
                },
            },
            {
                field: 'AttributeValue', title: "AttributeValue", align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'PropertyDatavalue', title: "PropertyDatavalue", align: "center", width: "120", visible: false,
                rander: new mf.FKRander(
                    "#AttributeDialog",
                    "#AttributeConfirmBtn",
                    AttributeTable,
                    new mf.TextRander(
                        {
                            size: 11, readonly: 'readonly'
                        }
                    ),
                    {
                        btnTitle: "",
                        btnClass: "btn btn-success btn-xs",
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    //table.setEditingColumnValue($row, "AttributeId", e.data.ParameterID);
                    table.setEditingColumnValue($row, "AttributeValueName", e.data.Name);
                    table.setEditingColumnValue($row, "PropertyDatavalue", e.data.Comments);
                    table.setEditingColumnValue($row, "AttributeValue", e.data.ParameterID);
                },
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title" }),
            },
            {
                field: 'CompletionOrderID', title: fields.Sequence, visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            {
                field: 'Sequence', title: fields.Sequence, visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟批號屬性-屬性
    this.LotAttributeClick = function (obj) {
        $("#LotAttributeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#LotAttributeDialog").modal('show');
        $LotRow = $(obj).parents("tr");
        var row = table.getRowData($Row);
        //if (row.Status) return;
        if (row.Status.substring(5, row.Status.length) != "0201213000029") { // 只有OP才能編輯
            $("#LotAttributeChange,#LotAttributeDeletion,#LotAttributeComfirm").hide();
        }
        //var row = table.getRowData($row);
        LotAttributeTable.loadData();

    }
    // 取消批號屬性-屬性
    this.CancelLotAttributeClick = function () {
        if (!LotAttributeTable)
            return;
        LotAttributeTable.goForword(function () {
            LotAttributeTable.loadData();
            $('#LotAttributeDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#LotAttributeDialog').modal("hide");
        }, fields.Isleave);
    }
    // 新增批號屬性-屬性
    this.AddLotAttributeClick = function () {
        if (!LotAttributeTable)
            return;

        LotAttributeTable.addRow();

        var array = $.map(LotAttributeTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == undefined) return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#LotAttributeTable").val(sequence);
        } else {
            $("#Sequence", "#LotAttributeTable").val(1);
        }
    }
    // 修改批號屬性-屬性
    this.ChangeLotAttributeClick = function () {
        if (!LotAttributeTable)
            return;

        LotAttributeTable.editRow();
    }
    // 刪除批號屬性-屬性
    this.DeleteLotAttributeClick = function () {
        if (!LotAttributeTable)
            return;
        LotAttributeTable.deleteRow();
    }
    // 保存批號屬性-屬性
    this.SaveLotAttributeClick = function () {
        if (!LotAttributeTable)
            return;
        LotAttributeTable.save(null, null, true);
    }
    // 確認
    this.ConfirmClick = function (obj) {
    //    $("#ResourceReportingDialog").modal({ backdrop: 'static', keyboard: false });
      //  $("#ResourceReportingDialog").modal('show');
        $Row = $(obj).parents("tr");
        var row = table.getRowData($Row);
        if (row.Status != null && row.Status.substring(5, row.Status.length) == "0201213000029") {
            mf.ajax({
                async: false,// 不同步
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007CompeletedConfirm',
                data: JSON.stringify({ CompletionOrderID: row.CompletionOrderID }),
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.info(fields.info, ret.msg);
                        table.loadData();
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
        }
        else {
            msg.info(fields.info, fields.Nopermission);
        }
        
    }
    // 原因碼查詢
    this.ReasonCodeSearchClick = function () {
        ReasonCodeTable.goForwordSafely(function () {
            ReasonCodeTable.loadData(null, null, 1);
        },null);
    }
};


var arrayWord = [ "WorkOrderNumber","Status","Part","ItemDescription","ItemSpecification",
    "FinProQty", "ScrappedQty", "DifferenceQty", "ReworkQty", "Remark", "Part","FinishQty",
    "Button", "Resources", "Confirm", "Abnormal", "Print", "Finished", "FinishNo", "EndWorkD",
    "ResourceReporting", "AberrantAmount", "InvalidWorkHour", "LotsProperty", 
    "CompletionNo", "DocDate", "TaskCardNo", "Description", "Specification", "ManufacturingUnit",
    "AuxiliaryUnit", "FinProQtyAble", "OrderCompletion", "ScrappedQty", "DifferenceQty",
    "ValidLaborHour", "ValidMachineHour", "InvalidLaborHour", "InvalidMachineHour",
    "FinishNo", "FinishWorkDate", "UnitRate", "Comfirm", "TaskComplaintList", "FinishQtyIsMaxInteger",
    "FinishQtyIsMaxDecimal", "FinishQtyIsNonNegativeNumber", "ReworkQtyIsNonNegativeNumber",
    "ReworkQtyIsMaxInteger", "ReworkQtyIsMaxDecimal", "DifferenceQtyIsNonNegativeNumber", "DifferenceQtyIsMaxInteger",
    "DifferenceQtyIsMaxDecimal", "ScrappedQtyIsMaxInteger", "ScrappedQtyIsMaxDecimal", "ScrappedQtyIsNonNegativeNumber",
    "TaskCardNoIsNull", "CompletionNoIsNull", "Import", "Export", "Browse", "Comfirm", "Cancel",
    "NumberAndHourIsZero", "ResourceReporting", "ResourceType", "EquipmentOrMan","WorkTime","NextProcessP",
    "WorkTimeIsMaxInteger", "WorkTimeIsMaxDecimal", "WorkTimeIsNonNegativeNumber", "Deletion", "Add",
    "Change", "EquipmentOrMan", "Equipment", "Man", "AberrantAmount", "InvalidWorkHour", "BatchAttribute", "Attributes",
    "AttributesList", "Quantity", "QuantityIsNonNegativeNumber", "QuantityIsMaxDecimal", "QuantityIsMaxInteger",
    "Reason", "LotNo", "ReasonDescription", "Scrapped", "Difference", "ReworkQty", "ReasonCode", "Search",
    "ReasonGroupCode", "GroupDescription", "ReasonNo", "EffectDate", "GetNo", "Code", "Description",
    "PropertyDatavalue", "StatusIs", "Isnotedit", "OnlyHMS", "PropertyDatavalue", "ValidLaborHourIsNonNegativeNumber",
    "InvalidLaborHourIsNonNegativeNumber", "InvalidMachineHourIsNonNegativeNumber", "ValidMachineHourIsNonNegativeNumber",
    "InvalidLaborHourStr", "ValidLaborHourStr", "ValidMachineHourStr", "UnMachineHourStr", "PleaseChoose", "StatusIsNull",
    "IsDelete", "info", "HourIsNonNegativeNumber", "Prompt", "AttributeValue", "DocumentCategory", "Man", "Equipment",
    "Save", "ReasonCodeIsNull", "ExceptionCategory", "InvalidCategory", "FinProQuantityIsMore", "FinishWorkDateIsNull",
    "WorkCenter", "ManufacturingProcess", "MoNo", "ProcessNo", "ProcessDescription", "ProcessSerialNo", "WorkOrderNo", "WorkOrderDescription",
    "ProcessReport", "WorkCenter", "DepartmentNo", "DepartmentName", "MoSeq", "GoodsName", "Specification", "EstimatedStartDate",
    "EstimatedFinishDate", "WorkCenterNo", "WorkCenterDescription", "WorkCenterFile", "MoNoMasterFile", "ProcessMaster",
    "WorkOrderDescription", "Isleave", "info", "Nopermission", "ProcessOperaNo", "ProcessOperaName", "Shift"
];

words = arrayWord.join();

function oninputhour(obj) {
    obj.value = obj.value.replace(/[^\d\:]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\:/g, "");  //验证第一个字符是数字而不是.
};

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

//初始页面数据
initPage = function () {
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentManufacturing/Sfc00007GetBillTypeList",
        data: {},
        success: function (data) {
            console.log(data)
            BillTypeList = data;
        }
    });
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,0191213000064,0191213000063" },//参数类型流水号，后端给0191213000001（要改）異常說明還沒編
        success: function (data) {
            
            parameters = data;//调用时parameters.PT0191213000001，是个数组
            //parameters.PT0191213000004.unshift({ text: fields.PleaseChoose,value:"",Code:"",Description:"",IsDefault:true,Newvalue:"",ParameterTypeID:"",ParentParameterID:null})
            model = new viewModel();


        }
    });

};
