var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = window.parent.PageParameters.Row;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    var resourceID = "";

    $("#ItemCode").val(mainForm.ItemCode);
    $("#ItemName").val(mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").val(mainForm.WorkCenterCode);
    $("#WorkCenterName").val(mainForm.WorkCenterName);
    $("#ProcessCode").val(mainForm.ProcessCode);
    $("#ProcessName").val(mainForm.ProcessName);
    $("#IsOperation").val(mainForm.IsOperation ? "Y" : "N");

    $("#ItemCode").attr("title", mainForm.ItemCode);
    $("#ItemName").attr("title", mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").attr("title", mainForm.WorkCenterCode);
    $("#WorkCenterName").attr("title", mainForm.WorkCenterName);
    $("#ProcessCode").attr("title", mainForm.ProcessCode);
    $("#ProcessName").attr("title", mainForm.ProcessName);
    $("#IsOperation").attr("title", mainForm.IsOperation ? "Y" : "N");

    //资源列表
    var ResourcesTable = new mf.Table("#ResourcesTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResourcesBar"),
        fn_getData: function (pagination, searchData, success) {
            var GroupCode = $("#ResourcesCode").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetMGroupList',
                data: { WorkCenterID: mainForm.WorkCenterID, GroupCode: GroupCode, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.SourceCode, align: "center", require: true, width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true }))
            },
            {
                field: 'Description', title: fields.SourceDescription, require: true, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: true }))
            },
            {
                field: 'Quantity', title: fields.SourceCount, align: "center", width: "80", defaultValue: 1,
                rander: new mf.TextRander({ size: 6, maxLength: 16, title: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true }))
            }
        ]
    });
    $("#ResourcesSearch").click(function () {
        ResourcesTable.loadData(null, null, 1);
    });

    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "ItemResourceID",
        deleteId: "ItemResourceID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        height: 210,
        fn_onRowClick: function (row) {
            var $row = $("#MainTable").find(".active");
            if (!($row && $row.length > 0)) {
                return;
            }
            resourceID = row.ResourceID;
            DetailTable.loadData();
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemProcessID = mainForm.ItemProcessID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetMResourceList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].ItemProcessID = mainForm.ItemProcessID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001MResourceSave',
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
                field: 'Code', title: fields.SourceCode, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#ResourcesDialog",
                    "#ResourcesConfirmBtn",
                    ResourcesTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ResourcesCode", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ResourceID", e.data.ResourceID);
                    table.setEditingColumnValue($row, "Code", e.data.Code);
                    table.setEditingColumnValue($row, "Description", e.data.Description);
                    table.setEditingColumnValue($row, "Quantity", e.data.Quantity);

                    $("#ResourceCode #with-btn-sub-cell").attr("title", e.data.Code);
                    $("#ResourceDescription").attr("title", e.data.Description);
                    $("#ResourceQuantity").attr("title", e.data.Quantity);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ResourcesIsNull)
                ]
            },
            {
                field: 'Description', title: fields.SourceDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },
            {
                field: 'Quantity', title: fields.SourceCount, align: "center", width: "80",
                rander: new mf.TextRander({ size: 6, disabled: "disabled", title: "" })
            },
            {
                field: 'IfMain', title: fields.MainResource, halign: 'center', align: 'center', width: "70",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    if ($cell.prop("checked") && rowsData.length > 1) {
                        for (var i = 0; i < rowsData.length; i++) {
                            if ($row.data("index") != i) {
                                MainTable.updateCellValue(i, 5, field, 0);
                            }
                        }
                    }
                }
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 }),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    MainTable.loadData();

    //资源明细列表
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "ID",
        editable: false,
        height: window.innerHeight - 420,
        paginationBar: new mf.PaginationBar("#paginagionDetailBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001IPRDetailList',
                data: { ResourceID: resourceID, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'DetailCode', title: fields.EquipmentCode, align: "center", require: true, width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true }))
            },
            {
                field: 'DetailName', title: fields.EquipmentDescription, require: true, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: true }))
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80", defaultValue: 1,
                rander: new mf.SelectRander(parameters.PT0191213000001, { title: "" })
            },
            {
                field: 'Placeholder', title: '',
                rander: new mf.PlaceholderRander()
            }
        ]
    });

    //刷新
    this.refreshClick = function () {
        MainTable.goForword(function () {
            window.location.reload();
        }, function () {
            window.location.reload();
        });
    };

    //新增
    this.addClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
        DetailTable.clean();
        MainTable.addRow();
    };

    //编辑
    this.editClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
        DetailTable.clean();
        MainTable.editRow();
    };

    //删除
    this.deleteClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
        DetailTable.clean();
        MainTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
        MainTable.save(null, null, true);
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
    "AttritionRateIsMaxDecimal", "SourceCode", "SourceDescription", "SourceCount", "MainResource",
    "ResourcesIsNull", "ResourceMasterFile", "EquipmentCode", "EquipmentDescription", "SourceDescription"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};