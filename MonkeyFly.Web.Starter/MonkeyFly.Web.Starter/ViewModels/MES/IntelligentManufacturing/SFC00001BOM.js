var URL = "/MES/IntelligentManufacturing/SFC00001BOM";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    parameters = mf.format.getMesParameters("0191213000058");
    var treePostData = {};
    var OperaProcessID = null;
    treePostData.ItemID = mainForm.ItemID;
    var formData = {
        Code: ko.observable(mainForm.Code),
        Name: ko.observable(mainForm.Name),
        Specification: ko.observable(mainForm.Specification),
        FabMoProcessID: ko.observable(),
        FabMoOperationID: ko.observable()
    };
    ko.applyBindings(formData);
    var leftHeight = (window.innerHeight - 162) / 2;
    $("#treeList").height(leftHeight);
    mf.ajax({
        type: 'Get',
        url: '/MES/api/IntelligentManufacturing/Sfc00001GetTreeList',
        data: treePostData,
        success: function (data) {
            var treeData = null,
                treeNode = null;
            treeData = mf.deal.toTreeData(data, 'ItemProcessID', 'Parenter', 'children');
            treeNode = eval(
                JSON.stringify(treeData).replace(/Value/g, 'text')
                );
            treeNode = mf.deal.addCPropertyAndCopy(treeNode, 'icon', 'iconCls', 'children');
            treeNode = treeNode.map(function (d) {
                d.icon = "fa fa-folder";
                d.state = { "opened": true };
                return d;
            });
            $("#ProcessProcess_Jstree").bind("activate_node.jstree",
                function (obj, e) {
                    var currentNode = e.node.original;
                    formData.FabMoProcessID("");
                    formData.FabMoOperationID("");
                    formData.FabMoProcessID(currentNode.ItemProcessID);//制程ID
                    formData.FabMoOperationID(currentNode.ItemOperationID);//工序ID
                    ItemMasterFileTable.loadData();
                    MainTable.loadData();
                    self.clearData();

                }).jstree({
                    "core":
                   {
                       "data": treeNode
                   }
                });
        }
    });

    //工序列表
    var OperationTable = new mf.Table("#OperationTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionOperationBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#OperationNo").val();
            //var OperaProcessID = mainForm.ProcessID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetOperationList',
                data: { ProcessID: OperaProcessID, page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WorkOrderNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.WorkOrderDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            }
        ]
    });
    $("#OperationSearch").click(function () {
        OperationTable.loadData(null, null, 1);
    });

    //制程列表
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ID",
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
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "150",
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
        ProcessTable.loadData(null, null, 1);
    });

    //料品主档
    var ItemMasterFileTable = new mf.Table("#ItemMasterFileTable", {
        uniqueId: "ItemID",
        editable: false,
        height: leftHeight,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedLeft"  onclick="model.checkboxResourceClick(this);"/>',
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabMoProcessID = formData.FabMoProcessID();
            searchData.FabMoOperationID = formData.FabMoOperationID();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetNoBomList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        LastWidth: "20",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
             {
                 field: 'placeholder', title: '',
                 rander: new mf.PlaceholderRander()
             }
        ]
    });

    //主列表
    var MainTable = new mf.Table("#OrderMaterialTable", {
        uniqueId: "FabMoItemID",
        focusField: "BaseQuantity",
        noNumColumn: true,
        isFrozenColumn: false,
        height: window.innerHeight - 136,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        enter_addble:false,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedRight"  onclick="model.checkboxMainTableClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ItemProcessID = formData.FabMoProcessID();
            searchData.ItemOperationID = formData.FabMoOperationID();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetBomList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001BomSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    self.clearData();
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            OperaProcessID = data['ProcessID'];
            var OperationID = data['OperationIDCode'];
            var $OperationIDCodbtnEditingCell = $row.find("#OperationIDCode button");
            var $OperationIDCodinputEditingCell = $row.find("#OperationIDCode input");
            if (!OperationID) {
                $OperationIDCodbtnEditingCell.attr('disabled', true);
                $OperationIDCodinputEditingCell.attr('disabled', true);
            }
            else {
                $OperationIDCodbtnEditingCell.attr('disabled', false);
                $OperationIDCodinputEditingCell.attr('disabled', false);
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 原因代号和原因说明是否都为空
            var OperationIDCode = MainTable.getEditingColumnValue($row, "OperationIDCode");

            return null;
        },
        LastWidth: "220",
        IsSetTableWidth: true,
        columns: [

            {
                field: 'ItemID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Code', title: fields.Part, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander())

            },
            {
                field: 'NameSpecification', title: fields.NameSpecification, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, readonly: "readonly", title: "" }))
            },
            {
                field: 'BasicQuantity', title: fields.BasicDosage, align: "center", width: "110", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, title: "", ConvertNumber: true, event: "input", eventName: "oninputnum(this,8)", maxLength: 17 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.BasicQuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.BasicQuantityIsMaxInteger, fields.BasicQuantityIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 8, 8)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var base = mf.deal.ValueCheckNumber($cell.val(), 0);
                    var attrition = Number($row.find("#AttritionRate").val());
                    var use = Number((base * (1 + (attrition / 100))).toFixed(8));
                    table.setEditingColumnValue($row, "UseQuantity", use);
                    $cell.val(base);
                }
            },
            {
                field: 'AttritionRate', title: fields.AttritionRate, align: "center", width: "110", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, title: "", ConvertNumber: true, event: "input", eventName: "oninputnum(this,2)", maxLength: 6 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AttritionRateIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AttritionRateIsMaxInteger, fields.AttritionRateIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 2, 3)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var attrition = mf.deal.ValueCheckNumber($cell.val(), 0);                    
                    var base = Number(table.getEditingColumnValue($row, 'BasicQuantity'));
                    var use = Number((base * (1 + (attrition / 100))).toFixed(8));
                    table.setEditingColumnValue($row, "UseQuantity", use);
                    $cell.val(attrition);
                }
            },
            {
                field: 'UseQuantity', title: fields.UsageAmount, align: "center", width: "140", defaultValue: 0,
                rander: new mf.TextRander({ size: 12, title: "", ConvertNumber: true, disabled:true })
            },
             {
                 field: 'ProcessSequence', title: fields.ProcessSequence, align: "center", width: "120",
                 rander: new mf.TextRander({ size: 8, title: "title", disabled: "disabled" })

             },
             {
                 field: 'FabMoProcessID', title: "", visible: false,
                 rander: new mf.TextRander()
             },
             {
                 field: 'ProcessID', title: "", visible: false,
                 rander: new mf.TextRander()
             },
             {
                 field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "150", require: true,
                 rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                    "#ProcessDialog",
                    "#ProcessConfirmBtn",
                    ProcessTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ProcessNo", text: "" }]
                    }
                )),
                 fn_onEditingChange: function (table, $row, $cell, field, e) {
                     OperaProcessID = e.data.ParameterID;
                     table.setEditingColumnValue($row, "ProcessID", e.data.ParameterID);
                     table.setEditingColumnValue($row, "ProcessSequence", e.data.Sequence);
                     table.setEditingColumnValue($row, "ProcessCode", e.data.Code);
                     table.setEditingColumnValue($row, "ProcessName", e.data.Name);
                     table.setEditingColumnValue($row, "OperationID", "");
                     table.setEditingColumnValue($row, "OperationIDCode", "");
                     table.setEditingColumnValue($row, "OperationIDName", "");
                     table.setEditingColumnValue($row, "OperationSequence", "");
                 },
                 checkers: [
                     new mf.TextNotEmptyChecker(fields.ProcessIsNull)
                 ]
             },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 10, title: true, disabled: "disabled" })
            },
            {
                 field: 'OperationSequence', title: fields.OperationSequence, align: "center", width: "80",
                 rander: new mf.TextRander({ size: 2, title: true, maxLength: 4,disabled:"disabled" })
            },
            {
                  field: 'FabMoOperationID', title: "", visible: false,
                  rander: new mf.TextRander()
            },
            {
                field: 'OperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationIDCode', title: fields.WorkOrderNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                    "#OperationDialog",
                    "#OperationConfirmBtn",
                    OperationTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#OperationNo", text: "" }]
                    }
                )),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "OperationID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "OperationIDCode", e.data.Code);
                    table.setEditingColumnValue($row, "OperationIDName", e.data.Name);
                    table.setEditingColumnValue($row, "OperationSequence", e.data.Sequence);
                },
            },
            {
                field: 'OperationIDName', title: fields.WorkOrderDescription, align: "center",
                rander: new mf.TextRander({ size: 21, title: "",disabled:"disabled" })
            },

        ]
    });

    // 返回
    this.backClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.TopBackURL,
                Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.TopBackURL;
        }, function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.TopBackURL,
                Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.TopBackURL;
        }, fields.Isleave);
    }

    //刷新
    this.refreshClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
            window.location.reload();
        });
    };

    //编辑
    this.editClick = function () {
        MainTable.editRow();
    };

    //保存
    this.saveClick = function () {
        MainTable.save(null, null, true);
    };

    this.checkboxResourceClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');

        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });

        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });

        }
    };

    this.checkboxMainTableClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');

        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });

        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });

        }
    }

    //右移
    this.MoveRightClick = function () {
        var rowDataLeft = {};
        var ItemIDStr = "";
        var $selectedRows = ItemMasterFileTable.getMultiSelectedRows();
        if (!$selectedRows.length) {
            return;
        }
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ItemMasterFileTable.getRowData($selectedRow);
            ItemIDStr += rowData.ItemID + ",";
        });
        ItemIDStr = ItemIDStr.substr(0, ItemIDStr.length - 1);
        rowDataLeft.ItemID = ItemIDStr;
        rowDataLeft.FabricatedMotherID = mainForm.FabricatedMotherID;
        rowDataLeft.ItemProcessID = formData.FabMoProcessID();
        rowDataLeft.ItemOperationID = formData.FabMoOperationID();
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00001BomAdd',
            data: JSON.stringify(rowDataLeft),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        ItemMasterFileTable.loadData();
                        MainTable.loadData();
                        self.clearData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                    self.clearData();
                }

            }
        });
    };

    //左移
    this.MoveLeftClick = function () {
        var rowDataRight = {};
        var FabMoItemIDStr = "";
        var $selectedRows = MainTable.getMultiSelectedRows();
        if (!$selectedRows.length) {
            return;
        }

        $selectedRows.each(function (i, $selectedRow) {
            var rowData = MainTable.getRowData($selectedRow);
            FabMoItemIDStr += rowData.ItemMaterialID + ",";
        });
        FabMoItemIDStr = FabMoItemIDStr.substr(0, FabMoItemIDStr.length - 1);
        rowDataRight.ItemMaterialID = FabMoItemIDStr;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00001BomDelete',
            data: JSON.stringify(rowDataRight),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        ItemMasterFileTable.loadData();
                        MainTable.loadData();
                        self.clearData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                    self.clearData();
                }

            }
        });

    };

    //制程主档清理查询字段和清除全选状态
    this.clearData = function () {
        $("#IsCheckedLeft").prop("checked", false);
        $("#IsCheckedRight").prop("checked", false);
    };
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "Deletion", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "ProductCode", "GoodsName", "Specification", "Unit",
    "OverRate", "ProcessSequence", "ProcessNo", "ProcessDescription", "StandardWorkingSeconds",
    "StandardWorkingHours", "PrepareWorkSeconds", "PrepareWorkHours", "WorkCenter", "Description",
    "InoutMark", "DepartmentNoOrManufacturersNo", "AuxiliaryUnit", "UnitRate", "UnitPrice",
    "IsResourceReporting", "IsEnableProcess", "IsProcessInspection", "IsFirstTest",
    "IsPatrolInspection", "InspectionGroup", "InspectionGroupInstructions", "ProcessMaterials",
    "ProcessProcess", "ProcessResources", "AlternativeProcess", "ProcessRelationship",
    "StartProductNo", "EndProductNo", "ProcessSequenceIsError", "ProcessInformation",
    "ProcessIsNull", "StandardWorkingSecondsIsError", "PrepareWorkSecondsIsError",
    "WorkCenterInformation", "WorkCenter", "WorkCenterNo", "WorkCenterDescription",
    "WorkCenterIsNull", "UnitMasterFile", "Code", "AuxUnitRatioIsNull", "CheckGroupCodeInformation",
    "CheckGroupCode", "CheckGroupName", "SaveOrNot", "ResourceReporting", "Isleave",
    "Back", "Refresh", "PreProcessSequence", "PreProcessNo", "PreProcessDescription",
    "Save", "Change", "NameSpecification", "Sequence", "SequenceIsError", "Part",
    "ItemSource", "BasicDosage", "AttritionRate", "UsageAmount", "EngineeringDrawing",
    "ItemNo", "ItemDescription", "ItemSpecification", "SupplyType", "ItemInformation",
    "StartItemCode", "EndItemCode", "BasicQuantityIsNonNegativeNumber", "BasicQuantityIsMaxInteger",
    "BasicQuantityIsMaxDecimal", "AttritionRateIsNonNegativeNumber", "AttritionRateIsMaxInteger",
    "AttritionRateIsMaxDecimal", "OrderNum", "SequenceNo", "Qty", "ManufacturingUnit", "WorkOrderDescription",
    "WorkOrderNo", "OperationSequence", "AuxUnitRatioIsNonNegativeNumber", "ProcessIsNull", "OperationInformation"
];
words = arrayWord.join();

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

initPage = function () {
    model = new viewModel();
};