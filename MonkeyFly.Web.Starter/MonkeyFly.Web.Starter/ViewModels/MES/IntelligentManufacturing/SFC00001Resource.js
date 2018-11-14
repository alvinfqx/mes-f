var URL = "/MES/IntelligentManufacturing/SFC00001Resource";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    parameters = mf.format.getMesParameters("0191213000058,0191213000013");
    var treePostData = {};
    treePostData.ItemID = mainForm.ItemID;
    var formData = {
        Code: ko.observable(mainForm.Code),
        Name: ko.observable(mainForm.Name),
        Specification: ko.observable(mainForm.Specification),
        FabMoProcessID: ko.observable(),
        FabMoOperationID: ko.observable(),
        WorkCenterID: ko.observable()
    };
    ko.applyBindings(formData);
    var leftHeight = (window.innerHeight - 162) / 2;
    $("#treeList").height(leftHeight);
    mf.ajax({
        type: 'Get',
        url: '/MES/api/IntelligentManufacturing/Sfc00001GetTreeList',
        data: treePostData,
        success: function (data) {
            console.log(data);
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
                    formData.WorkCenterID("");
                    formData.FabMoProcessID(currentNode.ItemProcessID);//制程ID
                    formData.FabMoOperationID(currentNode.ItemOperationID);//工序ID
                    formData.WorkCenterID(currentNode.WorkCenterID);
                    ResourceMasterFileTable.loadData();
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

    //资源主档
    var ResourceMasterFileTable = new mf.Table("#ResourceMasterFileTable", {
        uniqueId: "ResourceID",
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
            searchData.ItemProcessID = formData.FabMoProcessID();
            searchData.ItemOperationID = formData.FabMoOperationID();
            searchData.WorkCenterID = formData.WorkCenterID();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetNoResourceList',
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
                field: 'Code', title: fields.SourceCode, align: "center", require: true, width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true }))
            },
            {
                field: 'Name', title: fields.SourceDescription, require: true, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: true }))
            },
            {
                field: 'ClassName', title: fields.ResourceType, align: "center", width: "130",
                rander: new mf.TextRander({ size: 6, title: true })
            },
             {
                 field: 'Quantity', title: fields.SourceCount, align: "center", width: "80", defaultValue: 1,
                 rander: new mf.TextRander({ size: 6, title: true })
             },
             {
                 field: 'placeholder', title: '',
                 rander: new mf.PlaceholderRander()
             }
        ]
    });

    //主列表
    var MainTable = new mf.Table("#OrderMaterialTable", {
        uniqueId: "FabMoResourceID",
        focusField: "IfMain",
        noNumColumn: true,
        isFrozenColumn: false,
        enter_addble: false,
        height: window.innerHeight - 136,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedRight"  onclick="model.checkboxMainTableClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ItemProcessID = formData.FabMoProcessID();
            searchData.ItemOperationID = formData.FabMoOperationID();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetBOMResourceList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001ResourceSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [

            {
                field: 'ResourceID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ResourceCode', title: fields.SourceCode, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander())

            },
            {
                field: 'ResourceName', title: fields.SourceDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, title: "" }))
            },
            {
                field: 'ClassName', title: fields.ResourceType, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 10, title: "" })
                )
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", width: "100", defaultValue: 0,
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),

            },
            {
                field: 'Quantity', title: fields.SourceCount, align: "center", width: "140", defaultValue: 0,
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, readonly: "readonly", title: "", ConvertNumber: true })
                    )
            },
             {
                 field: 'ProcessSequence', title: fields.ProcessSequence, align: "center", width: "120",
                 rander: new mf.WirteOnceOnlyRander(
                     new mf.TextRander({ size: 8, title: "title", })
                     )
             },
             {
                 field: 'FabMoProcessID', title: "", visible: false,
                 rander: new mf.TextRander()
             },
             {
                 field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "120",
                 rander: new mf.WirteOnceOnlyRander(
                     new mf.TextRander({ size: 10, disabled: true, title: true })
                     )
             },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 10, disabled: true, title: true })
            },
             {
                 field: 'OperationSequence', title: fields.OperationSequence, align: "center", width: "80",
                 rander: new mf.WirteOnceOnlyRander(
                     new mf.TextRander({ size: 2, title: true, maxLength: 4 })
                     )

             },
              {
                  field: 'FabMoOperationID', title: "", visible: false,
                  rander: new mf.TextRander()
              },
            {
                field: 'OperationIDCode', title: fields.WorkOrderNo, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 8, disabled: true, title: true })
                    )

            },
            {
                field: 'OperationIDName', title: fields.WorkOrderDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 8, disabled: true, title: "" })
                    )
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
    };

    //右移
    this.MoveRightClick = function () {
        var rowDataLeft = {};
        var ResourceIDStr = "";
        var ClassCodeStr = "";
        var $selectedRows = ResourceMasterFileTable.getMultiSelectedRows();
        if (!$selectedRows.length) {
            return;
        }
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ResourceMasterFileTable.getRowData($selectedRow);
            ResourceIDStr += rowData.ResourceID + ",";
            ClassCodeStr += rowData.ClassCode + ",";
        });
        ResourceIDStr = ResourceIDStr.substr(0, ResourceIDStr.length - 1);
        ClassCodeStr = ClassCodeStr.substr(0, ClassCodeStr.length - 1);
        rowDataLeft.ResourceID = ResourceIDStr;
        rowDataLeft.ClassCode = ClassCodeStr;
        rowDataLeft.ItemProcessID = formData.FabMoProcessID();
        rowDataLeft.ItemOperationID = formData.FabMoOperationID();
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00001ResourceAdd',
            data: JSON.stringify(rowDataLeft),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        ResourceMasterFileTable.loadData();
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
        var FabMoResourceIDStr = "";
        var $selectedRows = MainTable.getMultiSelectedRows();
        if (!$selectedRows.length) {
            return;
        }

        $selectedRows.each(function (i, $selectedRow) {
            var rowData = MainTable.getRowData($selectedRow);
            FabMoResourceIDStr += rowData.ItemResourceID + ",";
        });
        FabMoResourceIDStr = FabMoResourceIDStr.substr(0, FabMoResourceIDStr.length - 1);
        rowDataRight.ItemResourceID = FabMoResourceIDStr;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentManufacturing/Sfc00001ResourceDelete',
            data: JSON.stringify(rowDataRight),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        ResourceMasterFileTable.loadData();
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
    "WorkOrderNo", "OperationSequence", "SourceCode", "SourceDescription", "SourceCount", "ResourceType", "MainResource",
    "SourceCount"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};