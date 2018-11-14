//AdjustmentTable
var URL = "/MES/IntelligentManufacturing/SFC00008";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var  typeData = [];


var viewModel = function () {


    var self = this;
    var   Description;
    var finishDocId, taskNoId;
    var  TaskDispatchID, CompletionNo, OriginalCompletionOrderID = '', GroupID, AutoNumberID;
    var fQty, dQty, rQty;
    var ResourceType, EquipmentID, BatchAttributeID, ReasonID, Sequence;
    var ExportTotal = 0, $Row, $LotRow, CompletionNo, TaskNo, ItemCode = '', showCompletionOrderID = '';
    var CompletionOrderID = '';
 

    $("#AddDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: "linked",
        language: language,
    });



    var formData = {
        CompletedNo: ko.observable(),
        OldCompletedNo: ko.observable(),      
        billTypeList: ko.observableArray(typeData),
        status: ko.observable(),
        AddCompletedNo: ko.observable(),
        getAutoNum : function () {
            if ($("#AutoType option:selected").val())
                mf.ajax({
                    type: 'Get',
                    url: "/MES/api/IntelligentManufacturing/Sfc00008GetAutoNumber",
                    data: ({ DTSID: formData.AddCompletedNo(), date: $("#AddDate").val() }),
                    success: function (data) {                     
                        $("#AddCode").val(data.AutoNumber);
                        AutoNumberID = data.AutoNumberID;
                   
                    }
                });
        }
    };
    ko.applyBindings(formData);
    
    //原完工单号开窗
    var OldCompletedNoTable = new mf.Table("#OldCompletedNoTable", {
        uniqueId: "OriginalCompletionOrderID",
        paginationBar: new mf.PaginationBar("#pagiOldCompletedNoBar"),
        height: 300,
        editable: false,
        dbclick_editable: false,
        LastWidth: "100",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#OldCompletedNoInput").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/SFC00007GetList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }

            });
        },
        fn_saveData: function (data, success) {
        },
        columns: [

            {//完工单
                field: "CompletionNo", title: fields.OldCompletedNo, width: 120, align: "center",
                rander: new mf.StaticValueRander({ title: 'title' ,size:18})
            },
            /*任务单号*/
             {
                 field: 'TaskNo', require: true, title: fields.TaskNo, align: "center", width: 200,
                 rander: new mf.StaticValueRander({ title: 'title' ,size: 10})
             },
            {/*工单号码*/
                field: 'OrderNum', require: true, title: fields.WorkOrderNum, align: "center", width: 150,
                rander: new mf.StaticValueRander({ title: 'title' })
            },
             {//料号
                 field: 'ItemCode', title: fields.Part, align: "center", width: 140,
                 rander: new mf.StaticValueRander({ title: 'title', size: 14 })
                
             },
            {/*料品名称*/
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: 140,
                rander: new mf.StaticValueRander({ title: 'title', size: 14 })
            },
            {//料品规格
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: 110,
                rander: new mf.StaticValueRander({ title: 'title', size: 10 })
            },
            {//制造单位
                field: 'ManufacturingUnit', title: fields.ManufacturingUnit, align: "center", width: 120,
                rander: new mf.StaticValueRander({ title: 'title', size: 12 })
            },
            {//辅助单位
                field: "AuxiliaryUnit", title: fields.AuxiliaryUnit, align: "center", width: 100,
                rander: new mf.StaticValueRander({ title: 'title', size: 10 })
            },
            {//辅助单位比率
                field: "UnitRate", title: fields.UnitRate, align: "center", 
                rander: new mf.StaticValueRander({ title: 'title', size: 10 })
            }
            
        ]
    });
    OldCompletedNoTable.loadData();



    //主表 sfc00008 zhu
    var table = new mf.Table("#AdjustmentTable", {
        uniqueId: "CompletionOrderID",
        paginationBar: new mf.PaginationBar("#paginationBar"),
        height: window.innerHeight - 145,
        editable: true,
        dbclick_editable: true,
        fn_getData: function (pagination, searchData, success) {
            var Code = formData.CompletedNo();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/SFC00008GetList',
                data: ({ page: pagination.page, rows: pagination.rows, AdjustCode: Code }),
                success: function (data) {
                    ExportTotal = data.total;
                    for (var i = 0, len = data.rows.length; i < len; i++) {
                        if (data.rows[i].CreateTime)
                            data.rows[i].CreateTime = data.rows[i].CreateTime.replace("T", " ");
                        if (data.rows[i].ModifiedTime)
                             data.rows[i].ModifiedTime = data.rows[i].ModifiedTime.replace("T", " ");
                    }

                    success(data);
                }
            });
        },
        fn_saveData: function (data, success) {

            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00008Save",
                data: JSON.stringify(data) ,
                success: function (d) {
                    success(d);
                  
                }
            })
        },
        isFrozenColumn: true,
        operateColumWidth: "320px",
        fn_createBtn:function(data){
            var $td = $("<td style='text-align: center; width:320px; '> ");
           
            if (data.IsResourceReport) {
                // 判断任务单分派资料的“是否依资源报工”字段，当其为Y时显示，N时则不显示
                $td.append("<button onclick='model.resourceReporting(this)' id='ResourceReporting' class='btn btn-success btn-xs '  style='text-align: center; margin-left: 3px;'title='" + fields.ResourceReporting + "'>" + fields.ResourceReporting + "</button>");
            } else {
                $td.append("<button onclick='model.resourceReporting(this)' id='ResourceReporting' class='btn btn-success btn-xs '  style='text-align: center;  margin-left: 3px;'title='" + fields.ResourceReporting + "' disabled>" + fields.ResourceReporting + "</button>");
            }
      
            $td.append($("<button onclick='model.InvalidHour(this)'  class='btn btn-success btn-xs'  style='margin-left: 3px;text-align: center;  ' title='" + fields.InvalidHour + "'>" + fields.InvalidHour + "</button>\
                         <button onclick='model.AberrantAmount(this)'  class='btn btn-success btn-xs '  style='margin-left: 3px;text-align: center;  ' title='" + fields.AberrantAmount + "'>" + fields.AberrantAmount + "</button>"));
            
            if (data.Lot) {
                $td.append($(" <button onclick='model.BatchAttribute(this)' class='btn btn-success btn-xs '  style='margin-left: 3px;text-align: center; ' title='" + fields.BatchAttribute + "'>" + fields.BatchAttribute + "</button>"));
            } else {
                $td.append($(" <button onclick='model.BatchAttribute(this)' class='btn btn-success btn-xs '  style='margin-left: 3px;text-align: center;  ' title='" + fields.BatchAttribute + "' disabled>" + fields.BatchAttribute + "</button>"));
            }

            if (data.Status && data.Status.substring(5, data.Status.length) == "0201213000029") {

                // OP時才能按
                $td.append('<button class="btn btn-success btn-xs " onclick="model.ConfirmClick(this)" title="確認" data-meaning="Confirm" style="text-align:center; margin-left: 3px;">' + fields.Confirm + '</button>');
            } else {
                $td.append('<button class="btn btn-success btn-xs " disabled onclick="model.ConfirmClick(this)" title="確認" data-meaning="Confirm" style="text-align:center; margin-left: 3px;">' + fields.Confirm + '</button>');

            }
          
            return $td;
        },
        fn_onEditingRowArgsCheck: function ($row, rowData, isAdding) {
           
            //1.保存时，判断数量（完工数量、报废量、差异量、返工量）总量与
            //工时（有效人工 / 机器工时、无效人工 / 机器工时）总量不可以同时为零
            //，若同时为零，弹窗提示“数量及工时不得同时为0，是否继续编辑”，点击确定，

            var FinishQty = Number(table.getEditingColumnValue($row, "FinProQuantity"));
            var ScrappedQty = Number(table.getEditingColumnValue($row, "ScrappedQuantity"));
            var DifferenceQty = Number(table.getEditingColumnValue($row, "DifferenceQuantity"));
            var RepairQty = Number(table.getEditingColumnValue($row, "RepairQuantity"));
            var ValidLaborHour =  table.getEditingColumnValue($row, "LaborHour");
            var InvalidLaborHour = table.getEditingColumnValue($row, "UnLaborHour");
            var ValidMachineHour = table.getEditingColumnValue($row, "MachineHour");
            var InvalidMachineHour = table.getEditingColumnValue($row, "UnMachineHour");
            if (((FinishQty + ScrappedQty + DifferenceQty + RepairQty) == 0) &&
                ((ValidLaborHour == "00:00:00") && (ValidMachineHour == "00:00:00") && (InvalidLaborHour == "00:00:00") && (InvalidMachineHour == "00:00:00")) || (((FinishQty + ScrappedQty + DifferenceQty + RepairQty) == 0) && (ValidLaborHour == "0:0:0" && InvalidMachineHour == "0:0:0" && InvalidLaborHour == "0:0:0" && ValidMachineHour == "0:0:0"))) {
                return fields.NumberAndHourIsZero;            
            }            
            fQty = FinishQty;
            sQty = ScrappedQty;
            dQty = DifferenceQty;
            return null;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {         
            //          

          /*   
             1.当系统参数的“异常说明”为必输（Y），本栏位不可编辑
        “异常说明”为非必输（N），开放做编辑。
         */
            // 因为只要是异常说明为Y或者已成说明程序有数据的话。都是不能编辑的
            var CompletionOrderID = "";
            if (isEditing) {
                CompletionOrderID = data.CompletionOrderID;
                // 編輯時才需要check,新增時不會有異常數量
                //2.可编辑时，输入报废量后，又打开异常说明程式输入其异常原因码及数量的时候，需要将数量汇总后回写栏位，同时报废量栏位变成不可编辑。
                $CheckQuantity = {};
                //异常说明是否必输=Y，有效/无效人工(机器)工时 不可编辑。参数异常说明是否必输=N,开放做编辑。
                mf.ajax({
                    async: true,// 不异步
                    type: 'Get',
                    url: '/MES/api/IntelligentManufacturing/Sfc00007CheckQuantity',
                    data: { Token: token, CompletionOrderID: CompletionOrderID },
                    success: function (data) {
                        $CheckQuantity = data;

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
                        if (!data.IsUnMachineHour) { //false表示输入过，将其设置为disabled
                            $row.find("#UnMachineHour").attr('disabled', true);
                        }
                    }
                });
            } else {
                $row.find("#Status > option").slice(1).remove();
            }
                  
        },
        fn_checkeditable: function ($selectedRow) {

            //状态为CL,则所有字段不可维护
            var row = table.getRowData($selectedRow);
            if (row.Status == mf.systemID + "020121300002A") {
                return true;
            } else {
                return false;
            }
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {

            var ID = rowData.CompletionOrderID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00008Delete",
                data: JSON.stringify({ CompletionOrderID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [         
      
              {
                  field: 'IfLastProcess', title: " ", align: "center", width: "100", visible: false,
                  rander: new mf.TextRander({ size: 9, maxLength: 120, title: "title", readonly: 'readonly' }),
              },
             //任务单
             {
                 field: "TaskDispatchID", width: 0, visible: false,  title: "",
                 rander: new mf.TextRander({ title: "", width: 0 })
             },
             //原完工单ID
             {
                 field: "OriginalCompletionOrderID", width: 0, visible: false,  title: "",
                 rander: new mf.TextRander({ title: "", width: 0 })
             },
            {/*调整单号 == CompletedNo*/
                field: 'CompletionNo', title: fields.CompletedNo, align: "center", width: "140", require: true,
                rander: new mf.TextRander({ size: 12, title: "title", disabled: true}),
                checkers: [
                  new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)
                ],
            },
            {/*完工日期*/
                field: 'Date', title: fields.DocDate , align: "center", width: "120",
                rander: new mf.DateRander({  title: "title" ,size: 11})
            },
            {/*原完工单号*/
                field: 'OriginalCompletionNo', require: true, title: fields.OldCompletedNo, align: "center", width: "150",
                rander: new mf.FKRander("#OldCompletedNoDialog",
                                        "#OldCompletedNoConfirmBtn",
                                        OldCompletedNoTable,
                                        new mf.TextRander({ size: 10, title: "title", readonly: 'readonly' }),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                            searchID: [{ value: "#OriginalCompletionNo", text: "" }]
                                        }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    
                    table.setEditingColumnValue($row, "OriginalCompletionNo", e.data.CompletionNo);
                    table.setEditingColumnValue($row, "TaskNo", e.data.TaskNo);
                    table.setEditingColumnValue($row, "OrderNum", e.data.OrderNum);
                    table.setEditingColumnValue($row, "ItemCode", e.data.ItemCode);
                    table.setEditingColumnValue($row, "ItemName", e.data.ItemName);
                    table.setEditingColumnValue($row, "ItemSpecification", e.data.ItemSpecification);
                    table.setEditingColumnValue($row, "ManufacturingUnit", e.data.ManufacturingUnit);
                    table.setEditingColumnValue($row, "AuxiliaryUnit", e.data.AuxiliaryUnit);
                    table.setEditingColumnValue($row, "UnitRate", e.data.UnitRate);
                    OriginalCompletionOrderID = e.data.OriginalCompletionOrderID;
                    TaskDispatchID = e.data.TaskDispatchID;
                    //开窗选完工单,状态为CL ,型态Type=N,但要CHECK 制令制程是否CL,如是需手动重新开启为OP,                   
                    $("#Status option:last").attr("selected", true );              
                },
                checkers: [
                        new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)
                ]
            },
            {/*任务单号*/
                field: 'TaskNo', require: true, title: fields.TaskNo, align: "center", width: "170",
                rander:new mf.TextRander({ size: 14, title: "title",disabled: true }),
                checkers: [
                   new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)
                ]
            },
            {/*工单号码*/
                field: 'OrderNum', require: true, title: fields.WorkOrderNum, align: "center", width: "180",
                rander: new mf.TextRander({ size: 16, title: "title", disabled: true }),
                checkers: [
                   new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)
                ]
            },
             {//料号
                 field: 'ItemCode', title: fields.Part, align: "center", width: "110",
                 rander: new mf.TextRander({ size: 9, title: "title", disabled: true }),
             },
            {/*料品名称*/
                field: 'ItemName', title: fields.ItemDescription, align: "center", width: "110",
                rander: new mf.TextRander({ size: 9, title: "title", disabled: true }),
            },
            {//料品规格
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title", disabled: true }),
            },
            {//制造单位
                field: 'ManufacturingUnit', title: fields.ManufacturingUnit, align: "center", width: 100,
                rander: new mf.TextRander({ size: 8, title: "title", disabled: true }),
            },
            {//辅助单位
                field: "AuxiliaryUnit", title: fields.AuxiliaryUnit, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title", disabled: true }),
            },
            {//辅助单位比率
                field: "UnitRate", title: fields.UnitRate, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title", disabled: true }),
            },
            {//完工量
                field: "FinProQuantity", title: fields.FinishQty, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title" }),
                defaultValue: 0,
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.FinishQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.FinishQtyIsMaxInteger, fields.FinishQtyIsMaxDecimal,
                        fields.FinishQtyIsNonNegativeNumber, 12, 6),
              
                ],
         
            },
            {//报废量 异常说明是否必输=Y，本栏位不可编辑
                field: "ScrappedQuantity", title: fields.ScrappedQty, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title" }),
                defaultValue: 0,
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ScrappedQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ScrappedQtyIsMaxInteger, fields.ScrappedQtyIsMaxDecimal,
                        fields.ScrappedQtyIsNonNegativeNumber, 12, 6),
                   
                    ]
            },
            {//差异量 异常说明是否必输=Y，本栏位不可编辑
                field: "DifferenceQuantity", title: fields.DifferenceQty, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title" }),
                defaultValue: 0,
                checkers: [
                   
                    new mf.IsNonNegativeNumberChecker(fields.DifferenceQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.DifferenceQtyIsMaxInteger, fields.DifferenceQtyIsMaxDecimal,
                        fields.DifferenceQtyIsNonNegativeNumber, 12, 6)
                ]
            },
            {//返修量 异常说明是否必输=Y，本栏位不可编辑
                field: "RepairQuantity", title: fields.RepairQty, align: "center", width: 110,
                rander: new mf.TextRander({ size: 9, title: "title" }),
                defaultValue: 0,
                checkers: [
                    
                    new mf.IsNonNegativeNumberChecker(fields.RepairQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.RepairQtyIsMaxInteger, fields.RepairQtyIsMaxDecimal,
                        fields.RepairQtyIsNonNegativeNumber, 12, 6)
                ]
            },        
       
            {//有效人工工时 异常说明是否必输=Y，本栏位不可编辑
                field: "LaborHour", title: fields.ValidLaborHour, align: "center", width: 120,
                rander: new mf.TextRander({ size: 10, title: "title" }),
                defaultValue: 0,
                checkers: [
                    new mf.IsOnlyTimeChecker2(fields.OnlyHMS)
                ]
            },
       
            {//无效人工工时
                field: "UnLaborHour", title: fields.InvalidLaborHour, align: "center", width: 120,
                rander: new mf.TextRander({ size: 10, title: "title" }),
                defaultValue: 0,
                checkers: [
                    new mf.IsOnlyTimeChecker2(fields.OnlyHMS)
                ]
            },
            {//有效机器工时
                field: "MachineHour", title: fields.ValidMachineHour, align: "center", width: 120,
                rander: new mf.TextRander({ size: 10, title: "title" }),
                defaultValue: 0,
                checkers: [
                    new mf.IsOnlyTimeChecker2(fields.OnlyHMS)
                ]
            },       
            {//无效机器工时
                field: "UnMachineHour", title: fields.InvalidMachineHour, align: "center", width: 120,
                rander: new mf.TextRander({ size: 10, title: "title" }),
                defaultValue: 0,
                checkers: [
                    new mf.IsOnlyTimeChecker2(fields.OnlyHMS)
                ]
            },
         
            {//备注
                field: "Comments", title: fields.Remark, align: "center", width: 160,
                rander: new mf.TextRander({ size: 14, title: "title", maxLength:120 })
            },
            {//Status
                field: "Status", title: fields.Status, align: "center", width: 90,
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000004,
                    {
                        title: true
                    })
            },
      
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",disabled: true,
                rander: new mf.StaticValueRander({ size: 8, title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",disabled: true,
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",disabled: true,
                rander: new mf.StaticValueRander({ size: 8, title: "title" })

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",readonly:"readonly",
                rander: new mf.StaticValueRander({ title: "title" })
            }

        ]

    });

    table.loadData();

    //资源表 设备/人员
    var ResourceMasterTable = new mf.Table("#ResourceDataTable", {
        uniqueId: "EquipmentID",
        paginationBar: new mf.PaginationBar("#paginagionResourceDataBar"),
        height: 280,
        editable: false,
        dblclick_editable: false,
        //LastWidth: "140",
        //IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
  

            ResourceType = $("#SelectResourceType option:selected").val();

            searchData.page = pagination.page;
            searchData.rows = pagination.rows;         
            searchData.TaskDispatchID = TaskDispatchID;
            searchData.ResourceType = ResourceType;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/GetMachineOrManList",
                data:  searchData,
                success: function (data) {
                
                    success(data); 
                }
            });
        },
        fn_saveData: function (data, success) {        },
        columns: [
              {
                  field: 'ResourceClass', title: fields.SourceClass, align: "center",width: "120",
                  rander: new mf.StaticValueRander(new mf.TextRander({ size: 8 }))
              },
              {
                  field: 'DisplayName', title: fields.SourceDescription, align: "center", width: "140",
                  rander: new mf.StaticValueRander( new mf.TextRander({ size: 11 }))
              },
               {
                   field: 'DisplayCode', title: fields.SourceCode, align: "center", 
                   rander: new mf.TextRander({ size: 14, title:"title" })
               },           
                {
                field: 'ResourceClassID', title:"", visible: false, 
                rander: new mf.TextRander({ title: "" })
                },
                {
                    field: 'EquipmentID', title: "", visible: false,
                    rander: new mf.TextRander({ title: "" })
                },
                {
                    field: 'ResourceClassID', title: "", visible: false,
                    rander: new mf.TextRander({ title: "" })
                }
        ]
    });
    //资源代号开窗查询
    $("#resource_dialog_search").click(function () {
        ResourceMasterTable.loadData(null, null, 1);
    });

    //资源报工表
    var resourceReportTable = new mf.Table("#resourceReportTable", {
        uniqueId: "CompletionResourceID",
        height:280,
        focusField: "ResourceType",
        focusEditField: "EquipmentOrMan",
        paginationBar: new mf.PaginationBar("#paginagionRReportBar"),
        isRealDelete: true,

        fn_realDelete: function(rowData, success){
            var ID = rowData.CompletionResourceID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007ResourceReportingDelete",
                data: JSON.stringify({ CompletionResourceID: ID }),
                success: function (data) {                
                    success(data);
                }

            })
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            searchData.CompletionOrderID = CompletionOrderID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00007GetResourceReportingList",
                data:  searchData,
                success: function (d) {                 
                    success(d);
                }
            })
 
        },
        fn_saveData: function (data, success) {          
            
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007ResourceReportingSave",
                data: JSON.stringify(data),
                success: function (data) {
                    success(data);
                 
                }
            });
          
        },
        columns: [
                   
              //设备代号ID   
             {
                 field: "EquipmentID", width: 0, title: "", visible: false,
                 rander: new mf.DynamicValueRander(function () {
                     return EquipmentID;
                 })
             },
             //完工单ID
             {
                 field: "CompletionOrderID", width: 0, title: "", visible: false,
                 rander: new mf.DynamicValueRander(function () {
                     return CompletionOrderID;
                 })
             },
            {//类型
                field: "ResourceClassID", title: fields.ResourceType, width: 100, align: "center",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000013, { title: true,disabled:true })
            },
            //設備/人員
            {
                field: 'DisplayName', title: fields.EquipmentOrMan, align: "center", width: "180",
                rander: new mf.FKRander("#ResourceDataDialog",
                                        "#ResourceDataComfirm",
                                        ResourceMasterTable,
                                        new mf.TextRander(
                                            {
                                                size: 10, readonly: 'readonly'
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                            searchID: [{ value: "#EquipmentID", text: "" }]
                                        }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                   
                    table.setEditingColumnValue($row, "ResourceClassID", e.data.ResourceClassID);
                    table.setEditingColumnValue($row, "DisplayName", e.data.DisplayName);
                    table.setEditingColumnValue($row, "DisplayCode", e.data.DisplayCode);
                    table.setEditingColumnValue($row, "EquipmentID", e.data.EquipmentID);
                    EquipmentID = e.data.EquipmentID;
                }
            },
             {//工时 秒
                 field: "Hour", title: fields.WorkTime, width: 150, align: "center",
                 rander: new mf.TextRander({ size: 9, title: "title", maxLength: 20 }),
                 defaultValue: "00:00:00",
                 checkers: [
                     new mf.IsOnlyTimeChecker2(fields.OnlyHMS)
                 ]

             },
            {
                field: "Comments", title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 18, title: "title", maxLength: 120 })
            }
        ]
    });


    //设置原因群码表格
    var GroupTable = new mf.Table("#GroupTable", {
        uniqueId: "ParameterID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionGroupBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ReasonGroupCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, "typeID": "000011",Token:token }),
                success: function (data) {
                    success(data);
                 
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        LastWidth: "140",
        IsSetTableWidth: true,
        height: 300,
        columns: [  
            {
                field: 'Code', title: fields.ReasonGroupCode, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'Name', title: fields.Description, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.AutoSelectRander("value", "text", [{ value: "1", text: fields.Normal }, { value: "0", text: fields.Invalid }], {title: true,disabled: true}),
            }
        ]
    });

    //设置 无效工时 原因码表格
    var reasonTable = new mf.Table("#ReasonTable", {
        uniqueId: "ParameterID",
        editable: true,
        height: 280,
        LastWidth: "140",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionReasonBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
      
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.GroupID = GroupID;
            searchData.Code = $("#InputReasonCode").val();
            searchData.UseCode = "SFC";
          
       
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetReasonList',
                data:  searchData,
                success: function (data) {
                   
                    success(data);
                   
                }
            });
        },
        fn_saveData: function (data, success) {

        },
        columns: [
              {//原因群组码ID
                  field: "GroupID", title: "", width: 0, visible: false, display:"none",
                  rander: new mf.TextRander({ title: "", width: 0 })
              },

            {//用途别
                field: 'UseCode', title: fields.WhereUsed, align: "center", width: "90", require: true,
                rander: new mf.WirteOnceOnlyRander( new mf.TextRander({size: 9, readonly: 'readonly'}))
            },
     
            {//原因码
                field: 'Code', title: fields.ReasonCode, align: "center", require: true, width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 7, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)
                ],
            },
            {//原因说明
                field: 'Name', title: fields.ReasonDescription, require: true, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 60, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonDescriptionIsNull)
                ],
            },
            {//备注
                field: 'Comments', title: fields.Remark, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 120, title: "title" })),
            },
           {
               field: 'IsEnable', title: fields.Status, align: "center",
               rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }, { title: "title",disabled: true }]),
           }
           ]
    });
    reasonTable.loadData();

    //设置原因码表格
    var reasonTable1 = new mf.Table("#ReasonTable1", {
        uniqueId: "ParameterID",
        editable: true,
        height: 280,
        paginationBar: new mf.PaginationBar("#paginagionReasonBar1"),
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#ReasonCode1").val();
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Code = Code;
                         
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00017GetList',
                data: searchData,
                success: function (data) {
                    success(data);

                }
            });

        },
        fn_saveData: function (data, success) {

        },
        columns: [
       
   
            {//用途别
                field: 'DescriptionCode', title: fields.WhereUsed, align: "center", width: "90", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, readonly: 'readonly' }))
            },

            {//原因码
                field: 'Code', title: fields.ReasonCode, align: "center", require: true, width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 7, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonCodeIsNull)
                ],
            },
            {//原因说明
                field: 'Name', title: fields.ReasonDescription, require: true, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 60, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonDescriptionIsNull)
                ],
            },
            {//备注
                field: 'Comments', title: fields.Remark, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 120, title: "title" })),
            },
           {
               field: 'IsEnable', title: fields.Status, align: "center",
               rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }, {title:"title", readonly:"readonly"}]),
           }
        ]
    });

    reasonTable1.loadData();

    //异常说明
    var ExceptionDescriptionTable = new mf.Table("#ExceptionDescriptionTable", {
        uniqueId: "AbnormalQuantityID",
        paginationBar: new mf.PaginationBar("#pagiExceptionDesBar"),
        height: 280,
        LastWidth: "120",
        IsSetTableWidth: true,
        editable: true,     
        fn_getData: function (pagination, searchData, success) {
            searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.CompletionOrderID = CompletionOrderID;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00007GetUnusualQtyList",
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });       
        },
        fn_saveData: function (data, success) {
            if (!$("#Quantity").val()) {
                msg.info(fields.Prompt, fields.Quantity + fields.MustNotNull);
                return;
            }
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007UnusualQtySave",
                data: JSON.stringify( data),
                success: function (data) {
                    success(data);
                }
            })
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            var ID = rowData.AbnormalQuantityID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007UnusualQtyDelete",
                data: JSON.stringify({ AbnormalQuantityID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
          {
              field: 'Type', title: "", visible: false, width: 0,display: "none",
              rander: new mf.DynamicValueRander(function () {
                  return $("#Type option:selected").val();
              })
          },
            {//類別
                field: "Type", title: fields.Type, width: 80, align: "center",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000063, { title: "title" })
            },
            {//原因码
                field: 'ReasonCode', title: fields.ReasonCode, align: "center", width: "150",
                rander: new mf.FKRander("#ReasonCodeDialog1",
                                        "#ReasonCodeCommit1",
                                        reasonTable1,
                                        new mf.TextRander(
                                            {
                                                size: 10, readonly: 'readonly'
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                        }),
                    fn_onEditingChange: function (table, $row, $cell, field, e) {
                        table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                        table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                        ReasonID = e.data.ParameterID;
                    },
                
                },
          {
              field: 'ReasonID', title: "", visible: false, width: 0,
              rander: new mf.DynamicValueRander(function () {
                  return ReasonID;
              })
          },
            {//说明
                field: "ReasonDescription", title: fields.Description, width: 150, align: "center",
                rander: new mf.TextRander({ title: "title", size: 23, disabled: true})
            },
           {//数量
               field: "Quantity", title: fields.Quantity, align: "center", width: 100,
               rander: new mf.TextRander({ size: 10, title: "title", event:"keyup", eventName:"model.checkNum(this)" }),
               checkers: [
                   new mf.IsOnlyNumberChecker(fields.OnlyNum)
               ]
           },
           //CompletionOrderID完工單PK 
            {
                field: 'CompletionOrderID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return CompletionOrderID;
                })
            },
        
        ]
    });

    //[无效工时] table
    var InvalidHourTable = new mf.Table("#InvalidHourTable", {
        uniqueId: "AbnormalHourID",
        height: 280,
        LastWidth: "120",
        editable: true,
        dbclick_editable: true,
        enter_addble: false,
        focusField: "Remark",
        focusEditField: "Remark",
        paginationBar: new mf.PaginationBar("#pagiInvalidHourBar"),
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007UnusualHourDelete",
                data: JSON.stringify({ AbnormalHourID: rowData.AbnormalHourID }),
                success: function (data) {
                    success(data);
                }
            });

        },
        fn_getData: function (pagination, searchData, success) {
           
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            searchData.CompletionOrderID = CompletionOrderID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00007GetUnusualHourList",
                data: searchData,
                success: function (d) {              
                    success(d);
                }
            })
     
        },
        fn_saveData: function (saveData, success) {        
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007UnusualHourSave",
                data: JSON.stringify(saveData),
                success: function (data) {                   
                    success(data);
                }
            });
     
        },
        fn_checkeditable: function ($selectedRow) {
            //单据状态为OP时,可新增维护,其他只能显示查询资料不可维护
            var data = InvalidHourTable.getRowData($selectedRow);
            if (data.Status == mf.systemID + "0201213000029") {
                return false;
            } else {
                return true;
            }
        },
        columns: [
              {//完工单ID
                  field: "CompletionOrderID", visible: false, display: "none", width:0,
                  rander: new mf.DynamicValueRander(function () {
                      return CompletionOrderID;
                  })
              },
            {//类别
                field: "Type", title: fields.Type,  width: 90,  align: "center", require: true,
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000064, {
                    noSearchSelectedText: "",
                    title: true,
                    size: 10
                }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.Type+ fields.MustNotNull)
                ]
            },
            {//原因群组
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "140",require: true,
                rander: new mf.FKRander("#GroupDialog",
                                         "#GroupCommit",
                                         GroupTable,
                                         new mf.TextRander(
                                             {
                                                 size: 10, readonly: 'readonly'
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    $("#with-btn-sub-cell").val(e.data.Code);
                  
                    GroupID = e.data.ParameterID;
                },              
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonGroupCode + fields.MustNotNull)
                ]
            },
           {
               field: 'GroupID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return GroupID;
               })
           },
           {//原因码
               field: 'ReasonCode', title: fields.ReasonCode, align: "center", width: "140",require: true,
               rander: new mf.FKRander("#ReasonCodeDialog",
                                        "#ReasonCodeCommit",
                                        reasonTable,
                                        new mf.TextRander(
                                            {
                                                size: 10, readonly: 'readonly'
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                        }),
               fn_onEditingChange: function (table, $row, $cell, field, e) {
                   table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                   table.setEditingColumnValue($row, "ReasonDescription", e.data.Comments);
                   ReasonID = e.data.ParameterID;
               },
               checkers: [
                  new mf.TextNotEmptyChecker(fields.ReasonCode + fields.MustNotNull)
               ]
           },
          {
              field: 'ReasonID', title: "", visible: false,
              rander: new mf.DynamicValueRander(function () {
                  return ReasonID;
              })
          },
          {
              field: "ReasonDescription", title: fields.Remark, width: 140, align: "center", 
              rander: new mf.TextRander({ size: 12, title: true, disabled: true , maxLength: 120 })
          },
           {//工时 秒
               field: "Hour", title: fields.WorkTime, width: 110, align: "center", require: true,
               rander: new mf.TextRander({ size: 9, title: "title", maxLength: 20 }),
               defaultValue: "00:00:00",
               checkers: [
                   new mf.IsOnlyTimeChecker2(fields.OnlyHMS),
                   new mf.IsNotChange(fields.PleaseInput + fields.WorkTime, "00:00:00")
               ]

           },
            {
                field: 'Sequence', title: fields.Sequence, visible: false, display: "none",
                rander: new mf.TextRander({ title: "", width: 0 }),
            }
        ]
    });

    //批号属性表
    var BatchAttributeTable = new mf.Table("#BatchAttributeTable", {
        uniqueId: "BatchAttributeID",
        paginationBar: new mf.PaginationBar("#pagiBatchAttrBar"),
        editable: true,
        height: 280,
        LastWidth: "110",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.CompletionOrderID = CompletionOrderID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00007GetLotList",
                data: searchData,
                success: function (data) {
                    console.log("批号属性"+JSON.stringify(data))
                  success(data);
                }
            })
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletionOrderID = showCompletionOrderID;
            }
            console.log("批号属性" + JSON.stringify(saveData))
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007LotSave",
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                    //BatchAttributeTable.loadData();
                }
            })

        },    
        focusField: "BatchNo",
        operateColumWidth: "60px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align: center; width:60px;'> ");
            $td.append($("<button onclick='model.AttributesClick(this)' id='Attributes' class='btn btn-success btn-xs'   style='text-align: center; width:50px; margin-left:3px;'title='" + fields.ItemProperty + "'>" + fields.Attributes + "</button>"));
           
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            if (!(isEditing || isAdding)) return;
            $row.find("#Attributes").attr("disable", true);// 新增時不顯示
            var row = table.getRowData($Row);
            if (isEditing) {//最后一站才可以维护料品属性及批号
                if (row.IfLastProcess == "1") {
                    $("#BatchNo").attr("disabled", false);                   
                    $("#Attributes").attr("disabled", false);
                } 
            }
            //“批号”当料品主档批控参数=N,不可维护 反白显示
            if (data.Lot == "false") {
                $("#BatchNo").attr("disabled", true);
            }
            $row.find("#CompletionNo").val(row.CompletionNo);
            $row.find("#TaskNo").val(row.TaskNo);
            $row.find("#ItemCode").val(row.ItemCode);
            $row.find("#BatchNo").val(row.BatchNo);
            var ItemID = row.ItemID;// ItemID
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotNumber',
                data: { Token: token, ItemID: ItemID },
                success: function (data) {
                    if (data.Status != "200") {
                        msg.info(fields.Prompt,data.msg);
                    }
                    else {

                        $("#AutoNumberRecordID").val(data.AutoNumberRecordID);
                        $("#BatchNo").val(data.BatchNumber);
                    }
                }
            });
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {

            var ID = rowData.BatchAttributeID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007LotDelete",
                data: JSON.stringify({ BatchAttributeID: ID }),
                success: function (data) {
                    success(data);
                }
            });

        },
  
        columns: [

            //TaskNoID
           {
               field: "TaskDispatchID", visible: false, width: 0,
               rander: new mf.DynamicValueRander(function () {
                   return TaskDispatchID;
               })
           },  //ItemCode
           {
               field: "ItemCode", visible: false, width: 0,
               rander: new mf.DynamicValueRander(function () {
                   return ItemCode;
               })
           },
            {
                field: 'AutoNumberRecordID', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,display:"none",
                rander: new mf.TextRander({disabled: true, title: "", width: 0 }),
            },
        
            {//完工单号
                field: "CompletionNo", title: fields.FinishNo, width: 130, align: "center",
                rander: new mf.TextRander({ title: "title", size: 12, disabled: true, })
            },
            {//任务单
                field: "TaskNo", title: fields.TaskNo, width: 170, align: "center",
                rander: new mf.TextRander({ title: "title", size: 15, disabled: true, })
            },
            {//料号
                field: "ItemCode", title: fields.Part, width: 130, align: "center",
                rander: new mf.TextRander({ title: "title", size: 12, disabled: true })
            },
            {//批控参数
                field: 'LotControl', title: fields.Part, align: "center", width: "100", visible: false, display: "none",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", disabled: true }),
            },
            {
                field: 'CompeletedLotId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false, display:"none",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", disabled: true }),
            },
            {//批号
                field: "BatchNo", title: fields.LotNo, width: 150, align: "center",
                rander: new mf.TextRander({ title: "title", size: 13, disabled: true }),
    
            },
            {//数量
                field: "Quantity", title: fields.Number, width: 90, align: "center", require: true,
                rander: new mf.TextRander({ title: "title", size: 6, }),
                checkers: [
                    new mf.IsOnlyNumberChecker(fields.OnlyNum),
                    new mf.IsNonNegativeNumberChecker(fields.BatchNumIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.BatchNumIsMaxInteger, fields.BatchNumIsMaxDecimal,
                        fields.BatchNumIsNonNegativeNumber, 12, 6)
                ]
            },
            {//有效日期
                field: "EffectDate", title: fields.EffectiveDate,  align: "center",
                rander:new mf.DateRander({title:"title", size: 9, maxLength:10})
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", visible: false, display: "none",
                rander: new mf.TextRander({ title: "", width: 0 }),
            }
          ]

    });

    //资料值表
    var DatavalueTable = new mf.Table("#DatavalueTable", {
        uniqueId: "ParameterID",
        editable: false,
        enter_addble: false,
        paginationBar: new mf.PaginationBar("#pagiDatavalueBar"),
        height: 280,
        fn_getData: function (pagination, searchData, success) {
            searchData.Code = $("#Datavalue").val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            searchData.AttributeID = AttributeID ;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00007GetAttributeLList",
                data: searchData,
                success: function (data) {
                    success(data);
                }
            })
       
        },
        fn_saveData: function(data,success){
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00007LotAttributeSave',
                data: JSON.stringify(data),
                success: function (data) {
                    if (data.status != 200) {
                        msg.info(fields.info, data.msg);
                    } else {
                        success(data);
                        LotAttributeTable.loadData();
                    }
                }
            });
        },
        columns: [
         
            {//特性
                field: "Name", title: fields.Attributes, width: 100, align: "center",
                rander: new mf.TextRander({ title: "title", size: 10, disabled: true })
               },
            {//说明
                field: "Comments", title: fields.Description, width: 160, align: "center",
                rander: new mf.TextRander({ title: "title", size: 18, disabled: true })
            }

        ]

    });
  
    //属性表
    var ItemPropertyTable = new mf.Table("#ItemPropertyTable", {
        uniqueId: "BatchAttributeDetailID",
        editable: true,
        paginationBar: new mf.PaginationBar("#pagiItemPropertyBar"),
        height: 280,
        dbclick_editable: true,
        fn_getData: function (pagination, searchData, success) {
            var row = BatchAttributeTable.getRowData($LotRow);
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentManufacturing/Sfc00007GetLotAttributeList",
                data: { page: pagination.page, rows: pagination.rows, Token: token, BatchAttributeID: row.BatchAttributeID },
                success: function (d) {
                    success(d);
                }
            })
        },
        fn_saveData: function (saveData, success) {
           
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentManufacturing/Sfc00007LotAttributeSave",
                data: JSON.stringify( saveData),
                success: function (data) {

                    success(data);
                }
                
                })
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing){
            AttributeID = data.AttributeID;
        },
        columns: [
            
                //完工單批號属性流水号
             {
                 field: "BatchAttributeID", width: 0, visible: false, display: "none",
                 rander: new mf.TextRander({ title: "", width: 0 })
             },
                    //料品屬性流水号
             {
                 field: "AttributeID", width: 0, visible: false, display: "none",
                 rander: new mf.TextRander({ title: "", width: 0 })
             },
        
            {//屬性代號
                field: "AttributeCode", title: fields.Attributes, width: 100, align: "center",
                rander: new mf.TextRander({ title: "title", size: 8,disabled: true })
            },
            {//说明
                field: "AttributeDesc", title: fields.Description, width: 160, align: "center",
                rander: new mf.TextRander({ title: "title", size: 18,disabled: true })
            },
            //資料值流水号
             {
                 field: "AttributeValue", width: 0, visible: false, display: "none",
                 rander: new mf.TextRander({ title: "", width: 0 })
             },
            {//资料值
                field: 'AttributeValueName', title: fields.Datavalue, align: "center", width: "140",
                rander: new mf.FKRander("#DatavalueDialog",
                                         "#DataValueCommit",
                                         DatavalueTable,
                                         new mf.TextRander(
                                             {
                                                 size: 10, disabled: true
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "AttributeValueName", e.data.Name);
                    table.setEditingColumnValue($row, "AttributeValue", e.data.ParameterID);
                   
                   // DatavalueID = e.data.ParameterID;
                }
            },
            {//备注
                field: "Comments", title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title", size: 39 })
            }
            ,
            {
                field: 'Sequence', title: fields.Sequence, align: "center", visible: false, display: "none",
                rander: new mf.TextRander({ title: "", width: 0 }),
            }
        ]

    });



    //资源报工 点击弹窗
    this.resourceReporting = function (obj) {
        var $tr = $(obj).parent().parent();
        $Row = $(obj).parents("tr");
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }


        table.goForwordSafely(function () {
        TaskDispatchID = row.TaskDispatchID;
       
        //OriginalCompletionOrderID = row.OriginalCompletionOrderID;
        CompletionOrderID = row.CompletionOrderID;

       resourceReportTable.loadData();
       $('#resourceReportDialog').modal("show");
        }, null);
    }

    //[无效工时]InvalidHour点击弹窗
    this.InvalidHour = function (obj) {
        InvalidHourTable.loadData();
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        $Row =$(obj).parents();
        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        if (row.Status.substring(5,row.Status.length) != "0201213000029") {
            $("#InvalidHourAdd, #InvalidHourlChange, #InvalidHourDeletion, #InvalidHCommit").hide();
        }

        CompletionOrderID = row.CompletionOrderID;
        OriginalCompletionOrderID = row.OriginalCompletionOrderID;
     
        $('#InvalidHourDialog').modal("show");
      
    }

    //批号属性 点击弹窗BatchAttribute
    this.BatchAttribute = function (obj) {

        $Row = $(obj).parents("tr");      
        var row = table.getRowData($Row);
     
        if (!row) {
            //msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }      
       showCompletionOrderID = row.CompletionOrderID;        

        OriginalCompletionOrderID = row.OriginalCompletionOrderID;
        CompletionOrderID = row.CompletionOrderID;
        CompletionNo = row.CompletionNo;
        TaskDispatchID = row.TaskDispatchID;
        TaskNo = row.TaskNo;
        ItemCode = row.ItemCode;
        

        BatchAttributeTable.loadData();
        $("#BatchAttributeDialog").modal({ backdrop: 'static', keyboard: false });
        $('#BatchAttributeDialog').modal("show");

        //料品主档为批号件且为最终制程,单据状态为OP时,可新增维护
            if (row.Status && row.Status.substring(5, row.Status.length) == "0201213000029" && row.IfLastProcess == "1" && row.Lot == true) {
                $("#CallChange,#CallCommit").show();
            }
            else {
                $("#CallChange,#CallCommit").hide();
            }


    }

    //异常说明 点击弹窗 
    this.AberrantAmount = function (obj) {
     
        $Row = $(obj).parents("tr");
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }
   

        table.goForword(function () {
            CompletionOrderID = row.CompletionOrderID;
            ExceptionDescriptionTable.loadData();
            $("#ExceptionDescriptionDialog").modal({ backdrop: 'static', keyboard: false });           
            $('#ExceptionDescriptionDialog').modal("show");
        }, null, fields.Isleave);
    }  

    this.CancelEv = function (Id) {
        $(Id).modal('hide');
        this.refreshClick();
    }
    // 取消異常數量
    this.CancelUnusualQtyClick = function () {
        if (!ExceptionDescriptionTable)
            return;
        ExceptionDescriptionTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ExceptionDescriptionDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ExceptionDescriptionDialog').modal("hide");
        }, fields.Isleave);
        ExceptionDescriptionTable.loadData();
    }

    //查詢
    this.ReasonCodeSearch = function () {
        reasonTable.loadData(null, null, 1);
    }
    //查詢
    this.ReasonCodeSearch1 = function () {
        reasonTable1.loadData(null, null, 1);
    }

    //主表行內確定
    this.ConfirmClick = function (obj) {
        var data = {};

        data.CompletionOrderID =table.getRowData($(obj).parent().parent()).CompletionOrderID;
        mf.ajax({
            type: "Post",
            url: "/MES/api/intelligentmanufacturing/Sfc00008Confirm",
            data: JSON.stringify(data),
            success: function (res) {
                if (res.stutas == 200) {
                    msg.success(fields.Prompt, res.msg);
                } else {
                    msg.info(fields.Prompt, res.msg);
                }
            }
        });
        //	料品主档批控参数=Y时,需检查批号是否有输入, 若批号件无批号资料时，显示讯息”此料件為批號管控制項,請檢查批號資料”。
    }

    //刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            table.loadData();
        });
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


    
    //检查输入时分秒
    this.isValidHour = function (obj) {
        var value = $(obj).val();
        if (value && value.length > 0) {
            if (value == 0) {
                return null;
            }

            if (!/^(-?)(\d*):([0-5]{0,1}[0-9]{1}):([0-5]{0,1}[0-9]{1})$/.test(value)) {
                msg.info(fields.info, fields.OnlyHMS);
                $(obj).val("");
            }
        }
    }

 

    //add
    this.addClick = function () {
        if (!table)
            return;
        var date = new Date();
        $("#AddDate").val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        var code = null;
      
        model.getAutoNum();
        $("#AddDialog").modal("show");
        $("#AddCode").val(code);
       

    }

    //弹窗 原完工单
    this.SearchOldCompletedNo = function () {
        $("#OldCompletedNoDialog").modal("show");
        $("#OldCompletedNoDialog").modal({ backdrop: 'static', keyboard: false });
        OldCompletedNoTable.loadData();
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

        $("#BtnFile").click(function(){
            $("#BtnFile").click();
        });

        //导入
        $("#BtnImport").click(function () {
   
            var formData = new FormData();
            formData.append("File", document.getElementById("BtnFile").files[0]);
            formData.append("Token", token);

            $.ajax({
                type: "POST",
                url: window.top.mf.domain + "/MES/api/ImportFile/Sfc00008Import",
                data: formData,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (res) {

                    if (res.stutas == 200) {
                        msg.success(fields.Prompt, res.msg);
                        table.loadData();
                        $('#ImportDialog').modal('hide');
                    } else {
                        var message = res.msg;
                        if (message.length > 250) {
                            message = message.substring(0, 250) + "……"
                        }
                        msg.info(fields.Prompt,message);                      
                    }
                }
            });               
        });
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");
    }


    // 导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
   
        window.location.href = mf.domain + "/MES/api/ExportFile/Sfc00008Export?Token=" + token + "&AdjustCode=" + $("#InspectionCode").val();
    };

    //资源报工
    //添加
    this.AddRReportClick = function () {
        if (!resourceReportTable)
            return;
        resourceReportTable.addRow();
    }

    //编辑
    this.ChangeRReportClick = function () {
        if (!resourceReportTable)
            return;
        resourceReportTable.editRow();
    }

    //删除
    this.DeleteRReportClick = function () {
        if (!resourceReportTable)
            return;
        resourceReportTable.deleteRow();
    }

    //保存
    this.ConfirmRReportClick = function () {
        if (!resourceReportTable)
            return;
      
        resourceReportTable.save(null, null, true);
    }

    //无效工时
    // 開啟無效工時
    this.InvalidHourClick = function (obj) {
        $("#InvalidHourDialog").modal({ backdrop: 'static', keyboard: false });
        $("#InvalidHourDialog").modal('show');
        $Row = $(obj).parents("tr");

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        if (row.Status.substring(5, row.Status.length) != "0201213000029") { //OP
            $("#InvalidHourAdd,#InvalidHourlChange,#InvalidHourDeletion,#InvalidHCommit").hide();
        }
        else {
            $("#InvalidHourAdd,#InvalidHourlChange,#InvalidHourDeletion,#InvalidHCommit").show();
        }

        InvalidHourTable.loadData();

    }
    //添加
    this.AddInvHClick = function () {
        if (!InvalidHourTable)
            return;

        InvalidHourTable.addRow();
    }
    //编辑无效工时
    this.ChangeInvHClick = function () {
        if (!InvalidHourTable) {
           
            return;
        }

        InvalidHourTable.editRow();
    }
    //删除
    this.DeleteInvHClick = function () {
        if (!InvalidHourTable) {
       
            return;
        }

        InvalidHourTable.deleteRow();
    }

    //点击提交
    this.ConfirmInvHClick = function () {
        if (!InvalidHourTable)
            return;

        InvalidHourTable.save(null, null, true);

    }

    this.clearInput = function (str) {
        if(str)
            $(str).val("");
    }
    
    //批号属性处理
    //属性点击
    this.AttributesClick = function (obj) {
        $LotRow = $(obj).parents("tr");
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        
        table.goForword(function () {
            
            BatchAttributeID = row.BatchAttributeID;
          //  ItemPropertyTableID = row.ID;
            ItemPropertyTable.loadData();
            $('#ItemPropertyDialog').modal("show");
        }, null, fields.Isleave);
    }


    //修改点击
    this.ChangeBatchAttrClick = function () {
        if(!BatchAttributeTable)
            return;

        BatchAttributeTable.editRow();
    }
    //删除
    this.DelBatchAttrClick = function () {
        if (!BatchAttributeTable)
            return;

        var data = BatchAttributeTable.getSelectedData();
        if (!data)
            return;
        var ID = data.BatchAttributeID;
        if (!ID && ID.length <= 0) {          
            return;
        }
        msg.warning(fields.info, fields.IsDelete + data.BatchNo,
            function () {
                mf.ajax({
                    type: "post",
                    url: "/MES/api/IntelligentManufacturing/Sfc00007LotDelete",
                    data: JSON.stringify({ BatchAttributeID: ID }),
                    success: function (data) {
                        if (data.status == "200") {
                            msg.success(fields.info, data.msg);
                            BatchAttributeTable.loadData();
                        }
                        else {
                            msg.info(fields.info, data.msg);
                        }
                    }
                });
            }
        );
    }
    //确定
    this.ConfirmBatchAttrClick = function () {
        if (!BatchAttributeTable)
            return;

        BatchAttributeTable.save(null, null, true);
    }

    //異常說明
    //新增
    this.AddExcDesClick = function () {
        if (!ExceptionDescriptionTable)
            return;

        ExceptionDescriptionTable.addRow();
    }

    //編輯
    this.ChangeExcDesClick = function () {
        if (!ExceptionDescriptionTable)
            return;

        ExceptionDescriptionTable.editRow();
    }
    //刪除
    this.DeleteExcDesClick = function () {
        if (!ExceptionDescriptionTable)
            return;

        ExceptionDescriptionTable.deleteRow();
    }
    //保存
    this.ConfirmExcDesClick = function () {
        if (!ExceptionDescriptionTable)
            return;

        ExceptionDescriptionTable.save(null, null, true);
       // $('#ExceptionDescriptionDialog').modal("hide");
    }

    //料品属性
    //新增
    this.AddItemPropertyClick = function () {
        if (!ItemPropertyTable)
            return;
        ItemPropertyTable.addRow();
    }

    //修改
    this.ChangeItemPropertyClick = function () {
        if (!ItemPropertyTable)
            return;
        ItemPropertyTable.editRow();
    }
    //删除
    this.DelItemPropertyClick = function () {
        if (!ItemPropertyTable)
            return;
        ItemPropertyTable.deleteRow();
    }
    //搜索资料值
    this.DatavalueSearch = function () {
        if (DatavalueTable)
            DatavalueTable.loadData(null, null, 1);
    }

    //资料值 外表 保存
    this.ConfirmItemPropertyClick = function () {
        if (!DatavalueTable)
            return;

        ItemPropertyTable.save(null, null, true);
    }

  
    // 新增資源報工
    this.AddResourceReportingClick = function () {
        if (!resourceReportTable)
            return;

        resourceReportTable.addRow();

        var array = $.map(resourceReportTable.getAllRowData(),
            function (value, index) {
                if (value.RowNumber == 'undefined') return 0;
                return value.RowNumber;
            });
        if (array.length > 1) {
            // 自動加1號
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence", "#resourceReportTable").val(sequence);
        } else {
            $("#Sequence", "#resourceReportTable").val(1);
        }
    }

    //原完工单号搜索
    this.OldCompNoSearch = function () {
    
        OldCompletedNoTable.loadData(null, null, 1);
   
    }

    //群码搜索
    this.GroupSearch = function () {
        if (GroupTable)
            GroupTable.loadData(null, null, 1);
        else {
            return;
        }
          
    }



    //新增 弹窗 赋值
    $("#OldCompletedNoConfirmBtn").click(function () {
        var row = OldCompletedNoTable.getSelectedData();

        if (row) {
          
            $('#AddOldComCode').val(row.CompletionNo);
            $('#addTaskNo').val(row.TaskNo);
            $('#addWorkOrderNum').val(row.OrderNum);
            $('#addPart').val(row.ItemCode);
            $('#addItemDescription').val(row.ItemName);
            $('#addItemSpecification').val(row.ItemSpecification);
            $('#addManufacturingUnit').val(row.ManufacturingUnit);
            $('#addAuxiliaryUnit').val(row.AuxiliaryUnit);
            $('#addUnitRate').val(row.UnitRate);

            OriginalCompletionOrderID = row.CompletionOrderID;

            $("#OldCompletedNoDialog").modal("hide");

            
        }
    });


    //保存 新增
    this.AddSaveClick = function () {
        if (!table)
            return;

        var finqty = $('#addFinishQty').val(),
            scrqty = $('#addScrappedQty').val(),
            difqty = $('#addDifferenceQty').val(),
            repqty = $('#addRepairQty').val(),
            labh = $("#addValidLaborHour").val(),
            unlabh = $("#addInvalidLaborHour").val(),
            mach = $("#addValidMachine").val(),
            unmach = $("#addInvalidMachine").val();

        if (!$("#AddOldComCode").val()) {
            msg.info(fields.Prompt, fields.OldCompletedNo+ fields.MustNotNull);
            return;
        }
      
        if ((Number(finqty) + Number(scrqty) + Number(difqty) + Number(repqty)) == 0 &&
            labh == "00:00:00" && unlabh == "00:00:00" && mach == "00:00:00" && unmach == "00:00:00") {
            msg.info(fields.Prompt, fields.NumberAndHourIsZero);
            return;
        } else {

            var data = {};
        
            //调整单号  
            CompletionNo = $("#AddCode").val();
            data.Status = mf.systemID + "0201213000029";
            data.CompletionNo = CompletionNo ;
            data.TaskDispatchID = TaskDispatchID ;          
            data.OriginalCompletionOrderID = OriginalCompletionOrderID;
            data.FinProQuantity = finqty;
            data.ScrappedQuantity = scrqty;
            data.DifferenceQuantity = difqty;
            data.RepairQuantity = repqty;
            data.LaborHour = labh;
            data.UnLaborHour =  unlabh;
            data.MachineHour = mach;
            data.UnMachineHour = unmach;
            data.Comments = $("#addRemark").val();
            data.Date = $("#AddDate").val();
            data.AutoNumberID = AutoNumberID;
          
          
            if (!OriginalCompletionOrderID) {//OriginalCompletionOrderID
                msg.info(fields.info, fields.NotAllRequiredMsgIsWrite);
                return;
              }else{
                mf.ajax({
                    type: "Post",
                    url: "/MES/api/IntelligentManufacturing/Sfc00008Add",
                    data: JSON.stringify(data),
     
                    success: function (d) {
                        if (d.status == 200) {
                            msg.success(fields.info, d.msg, function () {
                                table.loadData();
                                $("#AddDialog").modal("hide");
                            });
                         
                            model.ClearAddValue();
                        } else {
                            msg.info(fields.info, d.msg);
                            //$("#AddDialog").modal("hide");
                        }
                        
                    }
                });
             
            }
        }
    }

    //清除 新增 输入内容
    this.ClearAddValue = function () {
        $("#addTable tr td input").val("");
        $("#addFinishQty").val("0");
        $("#addScrappedQty").val("0");
        $("#addDifferenceQty").val("0");
        $("#addRepairQty").val('0');
        $("#addValidLaborHour").val("00:00:00");
        $("#addInvalidLaborHour").val("00:00:00");
        $("#addValidMachine").val("00:00:00");
        $("#addInvalidMachine").val("00:00:00");
    }

    // 取消資源報工
    this.CancelResourceReportingClick = function () {
        if (!resourceReportTable)
            return;
        if (resourceReportTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#resourceReportDialog').modal("hide");
                    }, null);
        }
        else {
            table.loadData();
            $('#resourceReportDialog').modal("hide");
        }
    }

 

    // 取消異常數量
    this.CancelInvHClick = function () {
        if (!InvalidHourTable)
            return;
        if (InvalidHourTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#InvalidHourDialog').modal("hide");
                    }, null);
        }
        else {
            table.loadData();
            $('#InvalidHourDialog').modal("hide");
        }
    }

    this.checkNum = function (obj) {
        if(isNaN($(obj).val())){
            msg.info(fields.Prompt, fields.OnlyNum);
            $(obj).val("");
            return;
        }
    }

    //设备，人员选择
    this.DialogEquipmentOrManSearch = function () {
        if (ResourceMasterTable) {
            ResourceMasterTable.loadData(null, null, 1);
        }
    }

    this.getAutoNum = function () {
        if ($("#AutoType option:selected").val())
            mf.ajax({
                type: 'Get',
                url: "/MES/api/IntelligentManufacturing/Sfc00008GetAutoNumber",
                data: ({ DTSID: formData.AddCompletedNo(), date: $("#AddDate").val() }),
                success: function (data) {
                   
                    $("#AddCode").val(data.AutoNumber);
                    AutoNumberID = data.AutoNumberID;
                   
                }
            });
    }
}



var arrayWord = [
   "Refresh", "Search", "Save", "New", "Change", "Deletion", "Import", "Export","Browse",
   "CompletedNo", "DocDate", "OldCompletedNo", "WorkOrderNum", "Part", "TaskNo", "ManufacturingUnit","ItemSpecification", "ItemDescription", "AuxiliaryUnit", "UnitRate", "FinishQty", "NumberIsTrue", "ScrappedQty", "DifferenceQty", "RepairQty",
    "ValidLaborHour", "InvalidLaborHour", "ValidMachineHour", "InvalidMachineHour", "ItemDescription", "Remark", "Status", "ResourceReporting", "InvalidHour", "BatchAttribute", "AberrantAmount",
    "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Confirm","Cancel",
    "WorkTime", "ResourceType", "EquipmentOrMan", "Equipment", "Man","Add",
    "Class", "ReasonGroupCode", "ReasonCode","GroupFile","ReasonFile","Type","GetPart",
    "WhereUsed", "ReasonDescription", "Description", "Invalid", "Normal",
    "Number", "EffectiveDate", "LotNo", "Attributes", "FinishNo","BatchControlBatchIsNull",
    "ItemProperty", "DataValue", "ExceptionDescription", "Confirm", "NA", "ArtificialL", "Machine",
    "Code", "Comments", "OnlyNum", "SourceCode", "SourceClass", "SourceDescription", "NumberAndHourIsZero",
    "AdjustmentNo", "CompletedNumRepairNumScraNumIsIncorrect", "WorkHourAndMachineHourIsIncorrect",
    "FinishQtyIsMaxInteger", "OnlyHMS", "info","Quantity","Datavalue",
    "FinishQtyIsMaxDecimal", "FinishQtyIsNonNegativeNumber", "RepairsQtyIsNonNegativeNumber",
    "RepairQtyIsMaxInteger", "RepairQtyIsMaxDecimal", "DifferenceQtyIsNonNegativeNumber", "DifferenceQtyIsMaxInteger",
    "DifferenceQtyIsMaxDecimal", "ScrappedQtyIsMaxInteger", "ScrappedQtyIsMaxDecimal", "ScrappedQtyIsNonNegativeNumber",
    "BatchNumIsNonNegativeNumber", "BatchNumIsMaxInteger", "BatchNumIsMaxDecimal", "CompletedAdjustment", "NotAllRequiredMsgIsWrite", "Sequence",
    "Prompt", "BtnImport", "AdjustmentNoSelect", "PropertyNumberIsEdit", "Isleave", "PleaseSelectFile", "IsDelete"
    , "MustNotNull", "PleaseInput",""
];

words = arrayWord.join();

//初始页面数据
mf.toolBar('#container');

initPage = function () {
    //取号下拉框
    mf.ajax({
        type: "Get",
        url: "/MES/api/IntelligentManufacturing/Sfc00008GetTypeList",
        data: ({ token: token }),
        success: function (data) {
          typeData =  data;
         
        }
    });

    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,0191213000013,0191213000063,0191213000064" },//
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });

   
};