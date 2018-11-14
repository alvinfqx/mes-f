var URL = "/MES/IntelligentManufacturing/SFC00002BOM";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    parameters = mf.format.getMesParameters("0191213000058");
    var treePostData = {};
    treePostData.FabricatedMotherID = mainForm.FabricatedMotherID;
    var formData = {
        ManufacturingUnit: ko.observable(),
        FabMoProcessID: ko.observable(),//制程流水号
        FabMoOperationID: ko.observable(),//工序流水号
    };
    ko.applyBindings(formData);
    $("#ItemCode").val(mainForm.ItemCode);
    $("#ItemName").val(mainForm.ItemName + "/" + mainForm.Specification);
    $("#OrderNum").val(mainForm.MoNo);
    $("#SequenceNo").val(mainForm.SplitSequence);
    $("#Quantity").val(mainForm.Quantity);
    formData.ManufacturingUnit(mainForm.UnitID);
    $("#ItemCode").attr("title", mainForm.ItemCode);
    $("#ItemName").attr("title", mainForm.ItemName + "/" + mainForm.Specification);

    var leftHeight = (window.innerHeight - 120) / 2;
    $("#treeList").height(leftHeight);

    mf.ajax({
        type: 'Get',
        url: '/MES/api/IntelligentManufacturing/Sfc00002GetTreeList',
        data: treePostData,
        success: function (data) {
            console.log(data);
            var treeData = null,
                treeNode = null;
            treeData = mf.deal.toTreeData(data, 'FabMoProcessID', 'Parenter', 'children');
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
                    formData.FabMoProcessID(currentNode.FabMoProcessID);//制程ID
                    formData.FabMoOperationID(currentNode.FabMoOperationID);//工序ID
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
 
    //料品主档
    var ItemMasterFileTable = new mf.Table("#ItemMasterFileTable", {
        uniqueId: "ItemID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        noNumColumn: true,
      //  IsSetTableWidth: true,
       // LastWidth:"0",
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedLeft"  onclick="model.checkboxResourceClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabMoProcessID = formData.FabMoProcessID();
            searchData.FabMoOperationID = formData.FabMoOperationID();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetNoBomList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: leftHeight,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "130",
                rander:new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "130",
                rander:  new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center",width:"130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ]
    });
  

    //主列表
    var MainTable = new mf.Table("#OrderMaterialTable", {
        uniqueId: "FabMoItemID",
        focusField: "BaseQuantity",
        noNumColumn: true,
        isFrozenColumn: false,
        height: window.innerHeight - 166,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedRight"  onclick="model.checkboxMainTableClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.FabMoProcessID = formData.FabMoProcessID();
            searchData.FabMoOperationID = formData.FabMoOperationID();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetBomList',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
           
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002BomSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    self.clearData();
                    success(data);
                }
            });
        },
        columns: [
           
            {
                field: 'ItemID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Code', title: fields.Part, align: "center", width: "140",
                rander:  new mf.WirteOnceOnlyRander(new mf.TextRander())
             
            },
            {
                field: 'NameSpecification', title: fields.NameSpecification, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander( new mf.TextRander({ size: 13, readonly: "readonly", title: "" }))
            },
            {
                field: 'BaseQuantity', title: fields.BasicDosage, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, title: "", ConvertNumber: true }),
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
                field: 'AttritionRate', title: fields.AttritionRate, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, title: "", ConvertNumber: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AttritionRateIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AttritionRateIsMaxInteger, fields.AttritionRateIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 2, 3)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var attrition = mf.deal.ValueCheckNumber($cell.val(), 0);
                    var base = Number($row.find("#BaseQuantity").val());
                    var use = Number((base * (1 + (attrition / 100))).toFixed(8));
                    table.setEditingColumnValue($row, "UseQuantity", use);
                    $cell.val(attrition);
                }
            },
            {
                field: 'UseQuantity', title: fields.UsageAmount, align: "center", width: "140", defaultValue: 0,
                rander: new mf.TextRander({ size: 13, disabled: true, title: "", ConvertNumber: true })
            },
             {
                 field: 'ProcessSequence', title: fields.ProcessSequence, align: "center", width: "120",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title"}))

             },
             {
                 field: 'FabMoProcessID', title: "", visible: false,
                 rander: new mf.TextRander()
             },
             {
                 field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "120", 
                 rander: new mf.WirteOnceOnlyRander( new mf.TextRander({ size: 11, title: "" }))
             },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: true }))
            },
             {
                 field: 'OperationSequence', title: fields.OperationSequence, align: "center", width: "80", 
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 2, title: true, maxLength: 4 }))             
             },
              {
                  field: 'FabMoOperationID', title: "", visible: false,
                  rander: new mf.TextRander()
              },

            {
                field: 'OperationIDCode', title: fields.WorkOrderNo, align: "center", width: "140", 
                rander:  new mf.WirteOnceOnlyRander(new mf.TextRander({  size: 8 }))              
            },
            {
                field: 'OperationIDName', title: fields.WorkOrderDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander( new mf.TextRander({ size: 8,  title: "" }))
            },

        ]
    });
  

    // 返回
    this.backClick = function () {
        //if (!MainTable)
        //    return;
        //if (MainTable.SaveOrNotStatus()) {
        //    msg.warning(fields.info,
        //            fields.Isleave,
        //            function () {
        //                window.top.page_parameters.Caching.push({ URL: PageParameters.TopBackURL, Parameters: PageParameters.TopMID });
        //                window.location.href = PageParameters.TopBackURL;
        //            }, function () {
        //                // 取消查询
        //            });
        //}
        //else {
        //    window.top.page_parameters.Caching.push({ URL: PageParameters.TopBackURL, Parameters: PageParameters.TopMID });
        //    window.location.href = PageParameters.TopBackURL;
        //}

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
        rowDataLeft.FabMoProcessID = formData.FabMoProcessID();
        rowDataLeft.FabMoOperationID = formData.FabMoOperationID();
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002BomAdd',
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
            FabMoItemIDStr += rowData.FabMoItemID + ",";
        });
        FabMoItemIDStr = FabMoItemIDStr.substr(0, FabMoItemIDStr.length - 1);
        rowDataRight.FabMoItemID = FabMoItemIDStr;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00002BomDelete',
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
    "WorkOrderNo", "OperationSequence", "AuxUnitRatioIsNonNegativeNumber", "info"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};