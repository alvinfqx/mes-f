var URL = "/MES/IntelligentManufacturing/SFC00001OperationMaterials";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var operationRow = PageParameters.OperationRow;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];

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

    //料品列表
    var ItemTable = new mf.Table("#ItemTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionItemBar"),
        fn_getData: function (pagination, searchData, success) {
            var StartCode = $("#ItemStart").val();
            var EndCode = $("#ItemEnd").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetItemList',
                data: { StartCode: StartCode, EndCode: EndCode, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'PartSource', title: fields.ItemSource, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            }
        ]
    });
    $("#ItemSearch").click(function () {
        ItemTable.loadData(null, null, 1);
    });

    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "ID",
        deleteId: "ItemOperationID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemOperationID = operationRow.ItemOperationID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetOperationMaterialList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].ItemOperationID = operationRow.ItemOperationID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001OperationMaterialSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Sequence', title: fields.Sequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander({ size: 2, title: "", maxLength: 4, ConvertNumber: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SequenceIsError),
                    new mf.IsNonNegativeNumberChecker(fields.SequenceIsError)
                ]
            },
            {
                field: 'ItemID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", width: "150", require: true,
                rander: new mf.FKRander(
                    "#ItemDialog",
                    "#ItemConfirmBtn",
                    ItemTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [
                            { value: "#ItemStart", text: "" },
                            { value: "#ItemEnd", text: "" }
                        ]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ItemID", e.data.ItemID);
                    table.setEditingColumnValue($row, "ItemCode", e.data.Code);
                    table.setEditingColumnValue($row, "Description", e.data.Name);
                    table.setEditingColumnValue($row, "PartSource", e.data.PartSource);
                    table.setEditingColumnValue($row, "Drawing", e.data.Drawing);

                    $("#ItemCode #with-btn-sub-cell").attr("title", e.data.Code);
                    $("#NameSpecification").attr("title", e.data.Name + "/" + e.data.Specification);
                    $("#PartSource").attr("title", e.data.PartSource);
                    $("#Drawing").attr("title", e.data.Drawing);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ItemIsNull)
                ]
            },
            {
                field: 'Description', title: fields.SourceDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },           
            {
                field: 'BasicQuantity', title: fields.BasicDosage, align: "center", width: "110", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, title: "", ConvertNumber: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.BasicQuantityIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.BasicQuantityIsMaxInteger, fields.BasicQuantityIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 8, 8)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var base = mf.deal.ValueCheckNumber($cell.val(), 0);
                    var attrition = Number($row.find("#AttritionRate").val());
                    var use = Number((base * (1 + (attrition / 100))).toFixed(6));
                    table.setEditingColumnValue($row, "UseQuantity", use);
                    $cell.val(base);
                }
            },
            {
                field: 'AttritionRate', title: fields.AttritionRate, align: "center", width: "110", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, title: "", ConvertNumber: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AttritionRateIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AttritionRateIsMaxInteger, fields.AttritionRateIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 2, 3)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var attrition = mf.deal.ValueCheckNumber($cell.val(), 0);
                    var base = Number($row.find("#BasicQuantity").val());
                    var use = Number((base * (1 + (attrition / 100))).toFixed(6));
                    table.setEditingColumnValue($row, "UseQuantity", use);
                    $cell.val(attrition);
                }
            },
            {
                field: 'UseQuantity', title: fields.UsageAmount, align: "center", width: "140", defaultValue: 0,
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "", ConvertNumber: true })
            },
            {
                field: 'Drawing', title: fields.EngineeringDrawing, align: "center", width: "140",
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 }),
            },
            {
                field: 'PartSource', title: fields.ItemSource, align: "center", width: "150",
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
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
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    MainTable.loadData();

    // 返回
    this.backClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.BackURL,
                Parameters: PageParameters
            });
            window.location.href = PageParameters.BackURL;
        }, function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.BackURL,
                Parameters: PageParameters
            });
            window.location.href = PageParameters.BackURL;
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

    //新增
    this.addClick = function () {
        MainTable.addRow();

        var $trs = $("#MainTable").find("tr");
        var $trlength = $trs.length;
        if ($trlength > 1) {
            var array = $.map(MainTable.getAllRowData(),
                                function (item, index) {
                                    return Number(item.Sequence);
                                });
            var sequence = Math.max.apply(Math, array) + 1;
            $("#Sequence").val(sequence);
        }
        else {
            $("#Sequence").val(1);
        }
    };

    //编辑
    this.editClick = function () {
        MainTable.editRow();
    };

    //删除
    this.deleteClick = function () {
        MainTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
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
    "AttritionRateIsMaxDecimal", "SourceDescription"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};