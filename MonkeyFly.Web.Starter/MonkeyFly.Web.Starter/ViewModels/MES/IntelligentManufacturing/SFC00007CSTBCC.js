var URL = "/MES/IntelligentManufacturing/SFC00007CSTBCC";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var parameters = null;
var model = null;
var ExportTotal = 0;
var data1 = {
    "total": 4,
    "rows": [
        {
            AttributeCode: "aaa1",
            AttributeDesc: "aab1",
            AttributeValue:"AttributeValue1",
            LotControl: "Y",
            Part:"123",
            UnusualID: "UnusualID",
            ReasonId: "ReasonId",
            ReasonDescription:"ReDesc",
            Hour: "3.3",
            Type: "1",
            CompletedID: "1",
            CompeletedLotId: "1",
            AttributeId: "AttributeId",
            AttributeValue: "AttributeValue",
            Sequence: "1",
            EffectDate: "2017/06/29",
            LotNoId: "1",
            LotNo: "1",
            Qty: "5",
            ReasonName: "ReasonName",
            DisplayName: "機台名稱/人員名稱",
            EquipmentId: "1",
            ResourceType: "1aaa",
            ResourceClassId: "1sss",
            WorkOrderNumber:"WorkOrderNumber",
            ItemCode:"itemcode",
            ItemName: "abc",
            ItemSpecification: "abcspec",
            UnitRate: "78.87%",
            FinishQty: 8,
            ReworkQty: 7,
            Remark:"test",
            "ID": "1111",
            "TaskID": "T01",
            "TaskCardNo": "TaskCardNo1",
            "CompeletedNo": "CompeletedNo1",
            "DocDate":"2017/06/25",
            "StatusName": "核准",
            "Status": mf.systemID + "0201213000029",
            "ValidLaborHour": "1",
            "ValidMachineHour": "1",
            "InvalidLaborHour": "1",
            "InvalidMachineHour": "1",
            "AuxiliaryUnit": "1",
            "FinProQtyAble": "1",
            "OrderCompletion": "1",
            "ScrappedQty": "1",
            "DifferenceQty": "1",
            "Description": "Description",
            "Specification": "Specification",
            "ManufacturingUnit": "ManufacturingUnit",
            "CreateUser": "CreateUser1",
            "CreateDate": "2017/6/10",
            "ModifyUser": "ModifyUser1",
            "ModifyDate": "2017/6/11",
            "IsResourceReport":"Y"
        },
        {
            AttributeCode: "aaa2",
            AttributeDesc: "aab2",
            AttributeValue: "AttributeValue21",
        Part: "123",
            UnusualID: "UnusualID",
            ReasonId: "ReasonId",
            ReasonDescription: "ReDesc",
            Hour: "3.3",
            Type: "2",
            CompletedID: "12",
            CompeletedLotId: "12",
            AttributeId: "AttributeId",
            AttributeValue: "AttributeValue",
            Sequence: "12",
            EffectDate: "2017/06/29",
            LotNoId: "12",
            LotNo: "12",
            Qty: "52",
            ReasonName: "ReasonName2",
            DisplayName: "機台名稱/人員名稱2",
            EquipmentId: "12",
            ResourceType: "1aaa2",
            ResourceClassId: "1sss2",
            UnitRate: "78.87%",
            FinishQty: 8,
            ReworkQty: 7,
            Remark: "test",
            WorkOrderNumber: "WorkOrderNumber",
            ItemCode: "itemcode",
            ItemName: "abc",
            ItemSpecification: "abcspec",
            "ID": "2",
            "DocDate": "2017/06/25",
            "TaskID": "T02",
            "TaskCardNo": "TaskCardNo2",
            "CompeletedNo": "CompeletedNo2",
            "StatusName": "核准",
            "Status": mf.systemID + "0201213000028",
            "ValidLaborHour": "2",
            "ValidMachineHour": "2",
            "InvalidLaborHour": "2",
            "InvalidMachineHour": "2",
            "AuxiliaryUnit": "2",
            "FinProQtyAble": "2",
            "OrderCompletion": "2",
            "ScrappedQty": "2",
            "DifferenceQty": "2",
            "Description": "Description",
            "Specification": "Specification",
            "ManufacturingUnit": "ManufacturingUnit",
            "CreateUser": "CreateUser2",
            "CreateDate": "2027/6/20",
            "ModifyUser": "ModifyUser2",
            "ModifyDate": "2027/6/22",
            "IsResourceReport": "N"
        }, {
            Part: "123",
            UnusualID: "UnusualID",
            ReasonId: "ReasonId",
            ReasonDescription: "ReDesc",
            Hour: "3.3",
            Type: "3",
            CompletedID: "13",
            CompeletedLotId: "13",
            AttributeId: "AttributeId3",
            AttributeValue: "AttributeValue3",
            Sequence: "13",
            EffectDate: "2017/06/29",
            LotNoId: "13",
            LotNo: "13",
            Qty: "53",
            ReasonName: "ReasonName3",
            DisplayName: "機台名稱/人員名稱3",
            EquipmentId: "3",
            ResourceType: "1aaa3",
            ResourceClassId: "1sss3",
            UnitRate: "78.87%",
            FinishQty: 8,
            ReworkQty: 7,
            Remark: "test",
            WorkOrderNumber: "WorkOrderNumber",
            ItemCode: "itemcode",
            ItemName: "abc",
            ItemSpecification: "abcspec",
            "ID": "3",
            "DocDate": "2017/06/25",
            "TaskID": "T03",
            "TaskCardNo": "TaskCardNo3",
            "CompeletedNo": "CompeletedNo3",
            "StatusName": "核准",
            "Status": mf.systemID + "0201213000028",

            "ValidMachineHour": "3",
            "InvalidLaborHour": "3",
            "InvalidMachineHour": "3",
            "AuxiliaryUnit": "3",
            "FinProQtyAble": "3",
            "OrderCompletion": "3",
            "ScrappedQty": "3",
            "DifferenceQty": "3",
            "Description": "Description",
            "Specification": "Specification",
            "ManufacturingUnit": "ManufacturingUnit",
            "CreateUser": "CreateUser3",
            "CreateDate": "2037/6/30",
            "ModifyUser": "ModifyUser3",
            "ModifyDate": "2037/6/33",
            "IsResourceReport": "N"
        }, {
            LotControl:"Y",
            Part: "123",
            UnusualID: "UnusualID4",
            ReasonId: "ReasonId4",
            ReasonDescription: "ReDesc",
            Hour: "3.3",
            Type: "1",
            CompletedID: "4",
            CompeletedLotId: "41",
            AttributeId: "AttributeId4",
            AttributeValue: "AttributeValue4",
            Sequence: "14",
            EffectDate: "2017/06/29",
            LotNoId: "14",
            LotNo: "14",
            Qty: "54",
            ReasonName: "ReasonName4",
            DisplayName: "機台名稱/人員名稱4",
            EquipmentId: "14",
            ResourceType: "1aaa4",
            ResourceClassId: "1sss4",
            UnitRate: "78.87%",
            FinishQty: 8,
            ReworkQty: 7,
            Remark: "test",
            WorkOrderNumber: "WorkOrderNumber",
            ItemCode: "itemcode",
            ItemName: "abc",
            ItemSpecification: "abcspec",
            "ID": "4",
            "DocDate": "2017/06/25",
            "TaskID": "T04",
            "TaskCardNo": "TaskCardNo4",
            "CompeletedNo": "CompeletedNo4",
            "StatusName": "核准",
            "Status": mf.systemID + "0201213000028",

            "ValidLaborHour": "4",
            "ValidMachineHour": "4",
            "InvalidLaborHour": "4",
            "InvalidMachineHour": "4",
            "AuxiliaryUnit": "4",
            "FinProQtyAble": "4",
            "OrderCompletion": "4",
            "ScrappedQty": "4",
            "DifferenceQty": "4",
            "Description": "Description",
            "Specification": "Specification",
            "ManufacturingUnit": "ManufacturingUnit",
            "CreateUser": "CreateUser4",
            "CreateDate": "2047/6/40",
            "ModifyUser": "ModifyUser4",
            "ModifyDate": "2047/6/44",
            "IsResourceReport": "Y"
        }
    ]
};
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
    var Lang = lang();
    // 获取搜索框的值
    var form = {
        FinishNo: ko.observable(),
        EndWorkD: ko.observable(),
    };
    var Statustext = parameters.PT0191213000004[1].text;// OP
    // 时间控件绑定
    
    $("#EndWorkD").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        language: Lang,
    });
    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };
    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData();
        }, null);

    };
    
    // 导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var row = table.getSelectedData();
        if (row == null) return;
        var g = $("#TxtReasonSearch").val();
        var sfc00007_exportUrl = "/MES/api/ExportFile/Sfc00007Export?";
        var sfc00007_params;
        var FinishNo = $("#FinishNo").val();
        var EndWorkD = $("#EndWorkD").val();
        sfc00007_params = "Token=" + token;
        sfc00007_params += "&FinishNo=" + FinishNo;
        sfc00007_params += "&EndWorkD=" + EndWorkD;

        window.location.href = mf.domain + sfc00007_exportUrl + sfc00007_params;
    };

    // 导出
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
    //设置原因弹窗表格
    var TaskTable = new mf.Table("#TaskTable", {
        uniqueId: "TaskID",
        paginationBar: new mf.PaginationBar("#paginagionTaskBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = { Token: token };
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            success(data1);

            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/PopUp/GetTaskList',
            //    data: searchData,
            //    success: function (data) {
            //        success(data);
            //    }
            //});
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'WorkOrderNumber', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'TaskCardNo', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ItemCode', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ItemName', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ItemSpecification', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'ManufacturingUnit', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'AuxiliaryUnit', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'UnitRate', title: fields.TaskCardNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'TaskID', title: fields.TaskCardNo, align: "center", width: "100",visible:false,
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "120",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            }
        ]
    });
    
    var table = new mf.Table("#CompletedJobTable", {
        uniqueId: "CompeletedID",
        isFrozenColumn: true,
        operateColumWidth: "240px",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 182,

        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.FinishNo = $("#FinishNo").val();
            searchData.EndWorkD = $("#EndWorkD").val();
            success(data1);
            ExportTotal = 4;
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/SFC00007GetList',
            //    data: searchData,
            //    success: function (data) {
            //        console.log(JSON.stringify(data))
            //        success(data);
            //ExportTotal = data.total;
            //    }
            //});
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
           
            //1.保存时，判断数量（完工数量、报废量、差异量、返工量）总量与
            //工时（有效人工 / 机器工时、无效人工 / 机器工时）总量不可以同时为零
            //，若同时为零，弹窗提示“数量及工时不得同时为0，是否继续编辑”，点击确定，
            //页面不刷新，数据保持编辑状态，点击取消，页面刷新，数据不保存。
            var FinishQty = table.getEditingColumnValue($row, "FinishQty");
            var ScrappedQty = table.getEditingColumnValue($row, "ScrappedQty");
            var DifferenceQty = table.getEditingColumnValue($row, "DifferenceQty");
            var ReworkQty = table.getEditingColumnValue($row, "ReworkQty");
            var ValidLaborHour = table.getEditingColumnValue($row, "ValidLaborHour");
            var InvalidLaborHour = table.getEditingColumnValue($row, "InvalidLaborHour");
            var ValidMachineHour = table.getEditingColumnValue($row, "ValidMachineHour");
            var InvalidMachineHour = table.getEditingColumnValue($row, "InvalidMachineHour");
            if ((FinishQty + ScrappedQty + DifferenceQty + ReworkQty) == 0 ||
                (ValidLaborHour + ValidMachineHour + InvalidLaborHour + InvalidMachineHour) == 0) {
                return fields.NumberAndHourIsZero;
                // confirm
                

            }
            return null;
        },
        fn_saveData: function (saveData, success) {
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/SFC00007Save',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        success(data);
            //    }
            //});
        },
        fn_checkeditable: function ($selectedRow) {
      
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            /*   
            1.当系统参数的“异常说明”为必输（Y），本栏位不可编辑
“异常说明”为非必输（N），开放做编辑。
            */
            //var uqData = UnusualQtyTable.getAllRowData();
            //for()
            
            var isScrappedQtyAlready = 0;
            var isDifferenceQtyAlready = 0;
            var isReworkQtyAlready = 0;
            if (!isAdding) {
                // 編輯時才需要check,新增時不會有異常數量
                //2.可编辑时，输入报废量后，又打开异常说明程式输入其异常原因码及数量的时候，需要将数量汇总后回写栏位，同时报废量栏位变成不可编辑。
                //mf.ajax({
                //async:false,// 不同步
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/SFC00007GetScrappedQty',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        isScrappedQtyAlready = data
            //    }
            //});
            }
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
            
            
        },
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:240px;'> ");
            if (data.IsResourceReport == "Y") {
                // 判断任务单分派资料的“是否依资源报工”字段，当其为Y时显示，N时则不显示
                $td.append('<button class="btn btn-success btn-xs" onclick="model.ResourceReportingClick(this)" title="資源報工" >' + fields.ResourceReporting + '</button>&nbsp;&nbsp;');
            }
            $td.append('<button class="btn btn-success btn-xs" onclick="model.UnusualQtyClick(this)" title="異常數量" >' + fields.AberrantAmount + '</button>&nbsp;&nbsp;');
            $td.append('<button class="btn btn-success btn-xs" onclick="model.UnusualHourClick(this)" title="無效工時" >' + fields.InvalidWorkHour + '</button>&nbsp;&nbsp;');
            $td.append('<button class="btn btn-success btn-xs" onclick="model.LotClick(this)" title="批號屬性" >' + fields.LotsProperty + '</button>&nbsp;&nbsp;');
            if (data.Status.substring(5, data.Status.length) == "0201213000028") {
                // 狀態為OP時才能按
                $td.append('<button class="btn btn-success btn-xs" onclick="model.ConfirmClick(this)" title="確認" >' + fields.Comfirm + '</button>');
            }
            return $td;
        },
        columns: [
            {
                field: 'CompeletedNo', title: fields.FinishNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander( new mf.TextRander({ size: 13, title: "title", maxLength: 30, readonly: 'readonly' })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CompeletedNoIsNull)
                ]
            },
            {
                field: 'DocDate', title: fields.FinishWorkDate, align: "center", width: "130",
                rander: new mf.DateRander(),
                
            },
            {
                field: 'TaskCardNo', title: fields.TaskCardNo, align: "center", require: true, width: "100",
                rander: new mf.FKRander(
                    "#TaskDialog",
                    "#TaskConfirmBtn",
                    TaskTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#TaskCardNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "TaskID", e.data.TaskID);
                    table.setEditingColumnValue($row, "TaskCardNo", e.data.TaskCardNo);
                    table.setEditingColumnValue($row, "WorkOrderNumber", e.data.WorkOrderNumber);
                    table.setEditingColumnValue($row, "ItemCode", e.data.ItemCode);
                    table.setEditingColumnValue($row, "ItemName", e.data.ItemName);
                    table.setEditingColumnValue($row, "ItemSpecification", e.data.ItemSpecification);
                    table.setEditingColumnValue($row, "ManufacturingUnit", e.data.ManufacturingUnit);
                    table.setEditingColumnValue($row, "UnitRate", e.data.UnitRate);
                    table.setEditingColumnValue($row, "AuxiliaryUnit", e.data.AuxiliaryUnit);
                    table.setEditingColumnValue($row, "FinProQtyAble", e.data.FinProQtyAble);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.TaskCardNoIsNull)
                ]
            },
            {
                field: 'TaskID', title: fields.WorkOrderNumber, align: "center", visible: false, width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'WorkOrderNumber', title: fields.WorkOrderNumber, align: "center",  width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly'}),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center",  width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'LotControl', title: fields.ItemDescription, align: "center", width: "100", visible:false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ItemSpecification', title: fields.ItemSpecification, align: "center",  width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ManufacturingUnit', title: fields.ManufacturingUnit, align: "center",  width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AuxiliaryUnit', title: fields.AuxiliaryUnit, align: "right",  width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'UnitRate', title: fields.UnitRate, align: "right", width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            
            {
                field: 'FinProQtyAble', title: fields.FinProQtyAble, align: "right", width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' })
            },
            {
                field: 'FinishQty', title: fields.FinishQty, align: "right",  width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.FinishQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.FinishQtyIsMaxInteger, fields.FinishQtyIsMaxDecimal,
                        fields.FinishQtyIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'ScrappedQty', title: fields.ScrappedQty, align: "right",  width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ScrappedQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ScrappedQtyIsMaxInteger, fields.ScrappedQtyIsMaxDecimal,
                        fields.ScrappedQtyIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'DifferenceQty', title: fields.DifferenceQty, align: "right",  width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.DifferenceQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.DifferenceQtyIsMaxInteger, fields.DifferenceQtyIsMaxDecimal,
                        fields.DifferenceQtyIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            }, 
            {
                field: 'ReworkQty', title: fields.ReworkQty, align: "right",  width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.ReworkQtyIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.ReworkQtyIsMaxInteger, fields.ReworkQtyIsMaxDecimal,
                        fields.ReworkQtyIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            }, 
            {
                field: 'ValidLaborHour', title: fields.ValidLaborHour, align: "center",  width: "100",
                rander: new mf.TextNumberRander({ size: 8, maxLength: 120, title: "title" }),
               
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'InvalidLaborHour', title: fields.InvalidLaborHour, align: "center",  width: "100",
                rander: new mf.TextNumberRander({ size: 8, maxLength: 120, title: "title" }),

                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'ValidMachineHour', title: fields.ValidMachineHour, align: "center",  width: "100",defaultValue:0,
                rander: new mf.TextNumberRander({ size: 8, maxLength: 120, title: "title" }),
                
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'InvalidMachineHour', title: fields.InvalidMachineHour, align: "center",  width: "100",
                rander: new mf.TextNumberRander({ size: 8, maxLength: 120, title: "title" }),
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'Remark', title: fields.Remark, align: "center", width: "100",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            //{
            //    field: 'StatusName', title: fields.Status, align: "center", width: "100",
            //    rander: new mf.AutoSelectRander(
            //        "value", "text", parameters.PT0191213000004,
            //        {
            //            title: true
            //        })
            //},
            {
                field: 'Status', title: fields.Status, align: "center", width: "100",
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000004,
                    {
                        title: true
                    })
            }
        ]
    })
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
        //获取单号
        //mf.ajax({
        //    type: 'Get',
        //    async: false,
        //    url: "/MES/api/Util/GetAutoNumberByUser",
        //    data: {},
        //    success: function (data) {
        //        //console.log(data)
        //        table.addRow();
        //        $("#CompeletedNo").val(data);
        //    }
        //});
        table.addRow();
        $("#CompeletedNo").val("sfcb121212");

    }
    table.loadData();
    //设置原因弹窗表格
    var ReasonCodeTable = new mf.Table("#ReasonCodeTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonCodeBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var ReasonDept = "";//$("#ReasonCode").val();
            var GroupDept = $("#ReasonCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "SFC", Description: ReasonDept, GroupDescription: GroupDept }),
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
    // 資源報工-機台/人員選擇開窗
    var EquipmentOrManTable = new mf.Table("#EquipmentOrManTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionEquipmentOrManBar"),

        fn_getData: function (pagination, searchData, success) {
            //var row = table.getRowData($Row);
            var ResourceType = $("#SelectResourceType").val();
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/GetMachineOrManList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, ResourceType: ResourceType},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {

        },

        focusField: "DisplayName",
        height: 300,
        columns: [
            {
                field: 'ResourceType', title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'EquipmentId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'DisplayName', title: fields.EquipmentOrMan, align: "center", width: "100",
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
        EquipmentOrManTable.loadData();
    }
    // 資源報工開窗
    var ResourceReportingTable = new mf.Table("#ResourceReportingTable", {
        uniqueId: "ResourceId",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionResourceReportingBar"),

        fn_getData: function (pagination, searchData, success) {
            
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetResourceReportingList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, CompletedID: row.CompletedID},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);
            

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletedID = row.CompletedID;
            }
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007ResourceReportingSave',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        console.log(data);
            //        //success(data);
            //        if (data.IsFail) {

            //        } else {
            //            ResourceReportingTable.loadData();
            //        }
            //    }
            //});
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
           
        },
        focusField: "ResourceReportingGroup",
        height: 300,
        columns: [
            {
                field: 'ResourceClassId', title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'EquipmentId', title: fields.EquipmentOrMan, align: "center", width: "100",visible:false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'DisplayName', title: fields.EquipmentOrMan, align: "center", width: "100",
                rander: new mf.FKRander(
                    "#EquipmentOrManDialog",
                    "#EquipmentOrManConfirmBtn",
                    EquipmentOrManTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ResourceClassId", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ResourceClassId", e.data.ResourceClassId);
                    table.setEditingColumnValue($row, "DisplayName", e.data.DisplayName);
                    table.setEditingColumnValue($row, "EquipmentId", e.data.EquipmentId);
                   
                }
            },
            {
                field: 'Hour', title: fields.WorkTime, align: "center", width: "120",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.HourIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.HourIsMaxInteger, fields.HourIsMaxDecimal,
                        fields.HourIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'Remark', title: fields.Remark, align: "center", width: "120", 
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120",visible:false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟資源報工
    this.ResourceReportingClick  = function (obj) {
        $("#ResourceReportingDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ResourceReportingDialog").modal('show');
        $Row = $(obj).parents("tr");
        var row = table.getRowData($Row);
        if (row.Status.substring(5, row.Status.length) == "0201213000028") {
            $("#CallAdd,#CallChange,#CallDeletion,#CallComfirm").hide();
        }
        else {
            $("#CallAdd,#CallChange,#CallDeletion,#CallComfirm").show();
        }
        ResourceReportingTable.loadData();

    }
    // 取消資源報工
    this.CancelResourceReportingClick = function () {
        if (!ResourceReportingTable)
            return;
        ResourceReportingTable.goForword(function () {
            ResourceReportingTable.loadData();
            $('#ResourceReportingDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ResourceReportingDialog').modal("hide");
        }, fields.Isleave);
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
        uniqueId: "ComplaintUnusualQtyID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionUnusualQtyBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetUnusualQtyList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, CompletedID: row.CompletedID},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletedID = row.CompletedID;
            }
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007UnusualQtySave',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        console.log(data);
            //        //success(data);
            //        if (data.IsFail) {

            //        } else {
            //            UnusualQtyTable.loadData();
            //        }
            //    }
            //});
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            
        },
        focusField: "Type",
        height: 200,
        columns: [
            {
                field: 'Type', title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.AutoSelectRander(
                    "value", "text", [{ text: fields.Scrapped, value: 1 }, { text: fields.Difference, value: 2 }, { text: fields.ReworkQty, value: 3 }],
                    {
                        title: true
                    }),
            },
            {
                field: 'ReasonId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "100",
                rander: new mf.FKRander(
                    "#ReasonCodeDialog",
                    "#ReasonCodeConfirmBtn",
                    ReasonCodeTable,
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
                    table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                }
            },
            {
                field: 'Qty', title: fields.Quantity, align: "center", width: "120",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    // new mf.IsNonNegativeNumberChecker(fields.QuantityIsNonNegativeNumber),可以打負數
                    new mf.IsOverDecimalChecker(fields.QuantityIsMaxInteger, fields.QuantityIsMaxDecimal,
                        fields.QuantityIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟異常數量
    this.UnusualQtyClick = function (obj) {
        $("#UnusualQtyDialog").modal({ backdrop: 'static', keyboard: false });
        $("#UnusualQtyDialog").modal('show');
        $Row = $(obj).parents("tr");
       
        var row = table.getRowData($Row);
        if (row.Status.substring(5, row.Status.length) == "0201213000028") {
            $("#UnusualQtyAdd,#UnusualQtyChange,#UnusualQtyDeletion,#UnusualQtyComfirm").hide();
        }
        else {
            $("#UnusualQtyAdd,#UnusualQtyChange,#UnusualQtyDeletion,#UnusualQtyComfirm").show();
        }
        UnusualQtyTable.loadData();
        HistoryUnusualQtyTable.loadData();

    }
    // 取消異常數量
    this.CancelUnusualQtyClick = function () {
        if (!UnusualQtyTable)
            return;
        UnusualQtyTable.goForword(function () {
            UnusualQtyTable.loadData();
            $('#UnusualQtyDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#UnusualQtyDialog').modal("hide");
        }, fields.Isleave);
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
    // 歷史異常數量
    var HistoryUnusualQtyTable = new mf.Table("#HistoryUnusualQtyTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionHistoryUnusualQtyBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetTotalUnusualQtyList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {
            
        },
        sumColumn: [{ columnName: "Qty", columnTitle: fields.Total, columnStyle: "", columnClass: "" }],
        focusField: "Type",
        height: 200,
        columns: [
            {
                field: 'Type', title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.AutoSelectRander(
                    "value", "text", [{ text: fields.Scrapped, value: 1 }, { text: fields.Difference, value: 2 }, { text: fields.ReworkQty, value: 3 }],
                    {
                        title: true
                    }),
            },
            {
                field: 'ReasonID', title: fields.ReasonCo, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
            },
            {
                field: 'Reason', title: fields.ReasonCo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
            },
            {
                field: 'Qty', title: fields.Quantity, align: "center", width: "120",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                
            }
        ]
    });
    // 無效工時開窗
    var UnusualHourTable = new mf.Table("#UnusualHourTable", {
        uniqueId: "UnusualId",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionUnusualHourBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetUnusualHourList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, CompletedID: row.CompletedID},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletedID = row.CompletedID;
            }
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007UnusualHourSave',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        console.log(data);
            //        //success(data);
            //        if (data.IsFail) {

            //        } else {
            //            UnusualHourTable.loadData();
            //        }
            //    }
            //});
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
           
        },
        focusField: "Type",
        height: 300,
        columns: [
            {
                field: 'Type', title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.AutoSelectRander(
                    "value", "text", [{ text: fields.Scrapped, value: 1 }, { text: fields.Difference, value: 2 }, { text: fields.ReworkQty, value: 3 }],
                    {
                        title: true
                    }),
            },
            {
                field: 'ReasonId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "100",
                rander: new mf.FKRander(
                    "#ReasonCodeDialog",
                    "#ReasonCodeConfirmBtn",
                    ReasonCodeTable,
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
                    table.setEditingColumnValue($row, "ReasonID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                }
            },
            {
                field: 'Hour', title: fields.WorkTime, align: "center", width: "120",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.HourIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.HourIsMaxInteger, fields.HourIsMaxDecimal,
                        fields.HourIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'CompletedID', title: fields.Remark, align: "center", width: "120",visible:false,
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
        $("#UnusualHourDialog").modal({ backdrop: 'static', keyboard: false });
        $("#UnusualHourDialog").modal('show');
        $Row = $(obj).parents("tr");
       
        var row = table.getRowData($Row);
        if (row.Status.substring(5, row.Status.length) == "0201213000028") {
            $("#UnusualHourAdd,#UnusualHourChange,#UnusualHourDeletion,#UnusualHourComfirm").hide();
        }
        else {
            $("#UnusualHourAdd,#UnusualHourChange,#UnusualHourDeletion,#UnusualHourComfirm").show();
        }
        UnusualHourTable.loadData();

    }
    // 取消無效工時
    this.CancelUnusualHourClick = function () {
        if (!UnusualHourTable)
            return;
        UnusualHourTable.goForword(function () {
            UnusualHourTable.loadData();
            $('#UnusualHourDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#UnusualHourDialog').modal("hide");
        }, fields.Isleave);
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
        uniqueId: "ComplaintLotID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionLotBar"),
        operateColumWidth: "100px",
        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, CompletedID: row.CompletedID},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletedID = row.CompletedID;
            }
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007LotSave',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        console.log(data);
            //        //success(data);
            //        if (data.IsFail) {

            //        } else {
            //            LotTable.loadData();
            //        }
            //    }
            //});
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            
            // 料品主档的批控为Y时，按“取号”按钮，由批号编号原则直接写入如手动填入，需要检查制令单是否有批号，如果有，直接带入此工单的批号。
            //var InvalidMachineHour = table.getEditingColumnValue($row, "InvalidMachineHour");
            //if ((FinishQty + ScrappedQty + DifferenceQty + ReworkQty) == 0 ||
            //    (ValidLaborHour + ValidMachineHour + InvalidLaborHour + InvalidMachineHour) == 0) {
            //    return fields.NumberAndHourIsZero;
            //    // confirm


            //}
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/LotNoChecks',
            //    data: searchData,
            //    success: function (data) {
            //        console.log(JSON.stringify(data))
            //        success(data);
            //ExportTotal = data.total;
            //    }
            //});
            return null;
        },
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:100px;'> ");
            if (data.LotControl == "Y") {
                // 判断任务单分派资料的“是否依资源报工”字段，当其为Y时显示，N时则不显示
                $td.append('<button class="btn btn-success btn-xs" onclick="model.GetLotNo(this)" title="取號" >' + fields.GetNo + '</button>&nbsp;&nbsp;');
            }
            var row = table.getRowData($Row);
            $td.append('<button class="btn btn-success btn-xs" onclick="model.LotAttributeClick(this)" title="屬性" >' + fields.Attributes + '</button>');
           
            return $td;
        },
        focusField: "LotNo",
        height: 300,
        columns: [
            {
                field: 'CompletedID', title: fields.ResourceType, align: "center", width: "60", visible: false,
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompeletedNo', title: fields.FinishNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'TaskCardNo', title: fields.ResourceType, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "80",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'LotControl', title: fields.Part, align: "center", width: "100",visible:false,
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompeletedLotId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'LotNoId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'LotNo', title: fields.LotNo, align: "center", width: "80",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title"}),
            },
            {
                field: 'Qty', title: fields.Quantity, align: "center", width: "60",
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.QuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.QuantityIsMaxInteger, fields.QuantityIsMaxDecimal,
                        fields.QuantityIsNonNegativeNumber, 12, 6)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    checkNumber($cell);
                }
            },
            {
                field: 'EffectDate', title: fields.EffectDate, align: "center", width: "90",readonly:'readonly',
                rander: new mf.DateRander(),
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 取得批號
    this.GetLotNo = function (obj) {
        var LotNo = $("#LotNo").val();
        //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007LotNoChecks',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, LotNo: LotNo},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
        //if (data.IsFail) {
        //    msg.error(data.msg);
        //}
        //else{
        //    $("#LotId").val(data.LotNo);
        //    $("#LotNo").val(data.LotNo);
        //}
            //    }
            //});

    }
    // 開啟批號屬性
    this.LotClick = function (obj) {
        $("#LotDialog").modal({ backdrop: 'static', keyboard: false });
        $("#LotDialog").modal('show');
        $Row = $(obj).parents("tr");
        var row = table.getRowData($Row);
        if (row.Status.substring(5, row.Status.length) == "0201213000028") {
            $("#LotAdd,#LotChange,#LotDeletion,#LotComfirm").hide();
        }
        else {
            $("#LotAdd,#LotChange,#LotDeletion,#LotComfirm").show();
        }
        LotTable.loadData();

    }
    // 取消批號屬性
    this.CancelLotClick = function () {
        if (!LotTable)
            return;
        LotTable.goForword(function () {
            LotTable.loadData();
            $('#LotDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#LotDialog').modal("hide");
        }, fields.Isleave);
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
        uniqueId: "AttributeID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionAttributeBar"),

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetAttributeList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, TaskId: TaskId},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {

        },

        focusField: "AttributeCode",
        height: 300,
        columns: [
            {
                field: 'AttributeCode', title: fields.ResourceType, align: "center", width: "60",
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeId', title: fields.Attribute, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeDesc', title: fields.Attribute, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeValue', title: fields.Attribute, align: "center", width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'TaskId', title: fields.Attribute, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            }

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

        fn_getData: function (pagination, searchData, success) {
            var row = table.getRowData($Row);
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetLotAttributeList',
            //    data: { page: pagination.page, rows: pagination.rows, Token: token, CompletedID: row.CompletedID},
            //    success: function (data) {
            //        console.log(data);
            //        success(data);
            //    }
            //});
            success(data1);

        },
        fn_saveData: function (saveData, success) {
            var row = table.getRowData($Row);
            for (var i = 0; i < saveData.inserted.length; i++) {
                //if (saveData.inserted[i].)
                saveData.inserted[i].CompletedID = row.CompletedID;
            }
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00007LotAttributeSave',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        console.log(data);
            //        //success(data);
            //        if (data.IsFail) {

            //        } else {
            //            LotAttributeTable.loadData();
            //        }
            //    }
            //});
        },
        fn_checkeditable: function ($selectedRow) {
            
        },
        focusField: "AttributeValue",
        height: 300,
        columns: [
            {
                field: 'AttributeId', title: fields.ResourceType, align: "center", width: "60", visible: false,
                rander: new mf.TextRander({ size: 4, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'CompeletedLotId', title: fields.EquipmentOrMan, align: "center", width: "100", visible: false,
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeCode', title: fields.Code, align: "center", width: "120",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeDesc', title: fields.Description, align: "center", width: "120",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title", readonly: 'readonly' }),
            },
            {
                field: 'AttributeValue', title: fields.PropertyDatavalue, align: "center", width: "100",
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
                    table.setEditingColumnValue($row, "AttributeId", e.data.AttributeId);
                    table.setEditingColumnValue($row, "AttributeCode", e.data.AttributeCode);
                    table.setEditingColumnValue($row, "AttributeDesc", e.data.AttributeDesc);
                    table.setEditingColumnValue($row, "AttributeValue", e.data.AttributeValue);
                },
            },
            {
                field: 'Remark', title: fields.Remark, align: "center", width: "120",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            {
                field: 'CompletedID', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "120", visible: false,
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            }
        ]
    });
    // 開啟批號屬性-屬性
    this.LotAttributeClick = function (obj) {
        $("#LotAttributeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#LotAttributeDialog").modal('show');
        $LotRow = $(obj).parents("tr");
    
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
    }
};


var arrayWord = [ "WorkOrderNumber","Status","Part","ItemDescription","ItemSpecification",
    "FinProQty", "ScrappedQty", "DifferenceQty", "ReworkQty", "Remark", "Part","FinishQty",
    "Button", "Resources", "Confirm", "Abnormal", "Print", "Finished", "FinishNo", "EndWorkD",
    "ResourceReporting", "AberrantAmount", "InvalidWorkHour", "LotsProperty", 
    "CompeletedNo", "DocDate", "TaskCardNo", "Description", "Specification", "ManufacturingUnit",
    "AuxiliaryUnit", "FinProQtyAble", "OrderCompletion", "ScrappedQty", "DifferenceQty",
    "ValidLaborHour", "ValidMachineHour", "InvalidLaborHour", "InvalidMachineHour",
    "FinishNo", "FinishWorkDate", "UnitRate", "Comfirm", "TaskComplaintList", "FinishQtyIsMaxInteger",
    "FinishQtyIsMaxDecimal", "FinishQtyIsNonNegativeNumber", "ReworkQtyIsNonNegativeNumber",
    "ReworkQtyIsMaxInteger", "ReworkQtyIsMaxDecimal", "DifferenceQtyIsNonNegativeNumber", "DifferenceQtyIsMaxInteger",
    "DifferenceQtyIsMaxDecimal", "ScrappedQtyIsMaxInteger", "ScrappedQtyIsMaxDecimal", "ScrappedQtyIsNonNegativeNumber",
    "TaskCardNoIsNull", "CompeletedNoIsNull", "Import", "Export", "Browse", "Comfirm", "Cancel",
    "NumberAndHourIsZero", "ResourceReporting", "ResourceType", "EquipmentOrMan","WorkTime",
    "WorkTimeIsMaxInteger", "WorkTimeIsMaxDecimal", "WorkTimeIsNonNegativeNumber", "Deletion", "Add",
    "Change", "EquipmentOrMan", "Equipment", "Man", "AberrantAmount", "InvalidWorkHour", "BatchAttribute", "Attributes",
    "AttributesList", "Quantity", "QuantityIsNonNegativeNumber", "QuantityIsMaxDecimal", "QuantityIsMaxInteger",
    "Reason", "LotNo", "ReasonDescription", "Scrapped", "Difference", "ReworkQty", "ReasonCode", "Search",
    "ReasonGroupCode", "GroupDescription", "ReasonNo", "EffectDate", "GetNo", "Code", "Description",
    "PropertyDatavalue", "StatusIs", "Isnotedit", "ReasonCo", "Total"
];

words = arrayWord.join();



//初始页面数据
initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,0191213000001" },//参数类型流水号，后端给0191213000001（要改）異常說明還沒編
        success: function (data) {
            
            parameters = data;//调用时parameters.PT0191213000001，是个数组
            model = new viewModel();


        }
    });
};
