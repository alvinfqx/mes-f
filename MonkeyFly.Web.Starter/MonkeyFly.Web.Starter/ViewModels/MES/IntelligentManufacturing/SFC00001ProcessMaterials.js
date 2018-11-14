var URL = "/MES/IntelligentManufacturing/SFC00001ProcessMaterials";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
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
        uniqueId: "ItemMaterialID",
        deleteId: "ItemMaterialID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00001MaterialDelete",
                data: JSON.stringify({ ItemMaterialID: rowData.ItemMaterialID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onTableEnterPress: function () {
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
        },
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemProcessID = mainForm.ItemProcessID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetMaterialList',
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
                url: '/MES/api/IntelligentManufacturing/Sfc00001MaterialSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },        
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
                field: 'ItemCode', title: fields.Part, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#ItemDialog",
                    "#ItemConfirmBtn",
                    ItemTable,
                    new mf.TextRander({ size: 11, title: "", event: "change", eventName: "model.onchangeItem(this)" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [
                            { value: "#ItemStart", text: "" },
                            { value: "#ItemEnd", text: "" }
                        ]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    console.log($row);
                    table.setEditingColumnValue($row, "ItemID", e.data.ItemID);
                    table.setEditingColumnValue($row, "ItemCode", e.data.Code);
                    table.setEditingColumnValue($row, "NameSpecification", e.data.Name + "/" + e.data.Specification);
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
                field: 'NameSpecification', title: fields.NameSpecification, align: "center", width: "140",
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },           
            {
                field: 'BasicQuantity', title: fields.BasicDosage, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 10, title: "", ConvertNumber: true, event: "input", eventName: "oninputnum(this)", maxLength:17 }),
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
                rander: new mf.TextRander({ size: 10, title: "", ConvertNumber: true, event: "input", eventName: "oninputnum(this)", maxLength:6 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AttritionRateIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AttritionRateIsMaxInteger, fields.AttritionRateIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 2, 3)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                    var attrition = mf.deal.ValueCheckNumber($cell.val(), 0);
                    var base = Number($row.find("#BasicQuantity").val());
                    var use = Number((base * (1 + (attrition / 100))).toFixed(8));
                    table.setEditingColumnValue($row, "UseQuantity", use);
                    $cell.val(attrition);
                }
            },
            {
                field: 'UseQuantity', title: fields.UsageAmount, align: "center", width: "140", defaultValue: 0,
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "", ConvertNumber: true, event: "input", eventName: "oninputnum(this)" })
            },
            {
                field: 'Drawing', title: fields.EngineeringDrawing, align: "center", width: "140",
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 21, title: "title", maxLength: 150 }),
            },
            {
                field: 'PartSource', title: fields.ItemSource, align: "center", width: "130",
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    MainTable.loadData();

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

    //新增
    this.addClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
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
        if (mainForm.IsOperation) {
            return;
        }
        MainTable.editRow();
    };

    //删除
    this.deleteClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
        MainTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (mainForm.IsOperation) {
            return;
        }
        MainTable.save(null, null, true);
    };

    this.onchangeItem = function (obj) {
        mf.ajax({
            type: 'Get',
            url: '/MES/api/Util/GetItem',
            data: ({ Code: obj.value }),
            success: function (data) {
                var $row = $("#MainTable .editingRow");
                if (data != null) {
                    MainTable.setEditingColumnValue($row, "ItemID", data.ItemID);
                    MainTable.setEditingColumnValue($row, "ItemCode", data.Code);
                    MainTable.setEditingColumnValue($row, "NameSpecification", data.Name + "/" + data.Specification);
                    MainTable.setEditingColumnValue($row, "PartSource", data.PartSource);
                    MainTable.setEditingColumnValue($row, "Drawing", data.Drawing);
                }
                else {
                    MainTable.setEditingColumnValue($row, "ItemID", "");
                    MainTable.setEditingColumnValue($row, "ItemCode", "");
                    MainTable.setEditingColumnValue($row, "NameSpecification", "");
                    MainTable.setEditingColumnValue($row, "PartSource", "");
                    MainTable.setEditingColumnValue($row, "Drawing", "");
                }
            }
        });
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
    "AttritionRateIsMaxDecimal"
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