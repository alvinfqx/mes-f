var URL = "/MES/IntelligentManufacturing/SFC00001ProcessProcess";
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

    //工序列表
    var OperationTable = new mf.Table("#OperationTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionOperationBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#OperationNo").val();
            var ProcessID = mainForm.ProcessID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetOperationList',
                data: { ProcessID: ProcessID, page: pagination.page, rows: pagination.rows, Code: Code },
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

    //辅助单位列表
    var AuxUnitTable = new mf.Table("#AuxUnitTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionAuxUnitBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#AuxUnitNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID: "00000C", page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CheckGroupCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.CheckGroupName, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });
    $("#AuxUnitSearch").click(function () {
        AuxUnitTable.loadData(null, null, 1);
    });

    //检验群列表
    var InspectionGroupTable = new mf.Table("#InspectionGroupTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionInspectionGroupBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#InspectionGroupNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID: "000018", page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CheckGroupCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.CheckGroupName, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });
    $("#InspectionGroupSearch").click(function () {
        InspectionGroupTable.loadData(null, null, 1);
    });

    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "ID",
        deleteId: "ItemOperationID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: true,
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        operateColumWidth: "138px",
        fn_onTableEnterPress: function () {
            var $trs = $("#MainTable").find("tr");
            var $trlength = $trs.length;
            if ($trlength > 1) {
                var array = $.map(MainTable.getAllRowData(),
                                    function (item, index) {
                                        return Number(item.Sequence);
                                    });
                var sequence = Math.max.apply(Math, array) + 10;
                $("#Sequence").val(sequence);
            }
            else {
                $("#Sequence").val(10);
            }
        },
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:138px;text-align:center;">');
            var $BtnOperationMaterials = $('<button id="OperationMaterials" class="operation btn btn-success btn-xs" onclick="model.OperationMaterialsClick(this)">' + fields.OperationMaterials + '</button>');
            var $BtnOperationResources = $('<button id="OperationResources" class="operation btn btn-success btn-xs" onclick="model.OperationResourcesClick(this)">' + fields.OperationResources + '</button>');

            $BtnOperationMaterials.attr("title", fields.OperationMaterials);
            $BtnOperationResources.attr("title", fields.OperationResources);

            $td.append($BtnOperationMaterials);
            $td.append($BtnOperationResources);
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var $BtnOperationMaterials = $row.find("#OperationMaterials");
            var $BtnOperationResources = $row.find("#OperationResources");
            if (isAdding) {
                $BtnOperationMaterials.hide();
                $BtnOperationResources.hide();
            }
            else {
                $BtnOperationMaterials.show();
                $BtnOperationResources.show();
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var Unit = $row.find("#Unit").val();
            var UnitRatio = $row.find("#UnitRatio").val();

            if (Unit && Unit.length > 0) {
                if (!(UnitRatio && UnitRatio.length > 0)) {
                    return fields.AuxUnitRatioIsNull;
                }
            }

            return null;
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemProcessID = mainForm.ItemProcessID;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetItemOperationList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].ItemProcessID = mainForm.ItemProcessID;
                saveData.inserted[i].ProcessID = mainForm.ProcessID;
                saveData.inserted[i].WorkCenterID = mainForm.WorkCenterID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001ItemOperationSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'Sequence', title: fields.ArrangeSequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander({ size: 2, title: "", maxLength: 4 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessSequenceIsError),
                    new mf.IsNonNegativeNumberChecker(fields.ProcessSequenceIsError)
                ]
            },
            {
                field: 'OperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "140", require: true,
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
                    table.setEditingColumnValue($row, "OperationCode", e.data.Code);
                    table.setEditingColumnValue($row, "OperationName", e.data.Name);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.OperationIsNull)
                ]
            },
            {
                field: 'OperationName', title: fields.WorkOrderDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, readonly: "readonly", title: "" }))
            },
            {
                field: 'StandardTime', title: fields.StandardWorkingSeconds, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.StandardWorkingSecondsIsError)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var value = Number($cell.val());
                    if (isNaN(value)) {
                        return;
                    }
                    table.setEditingColumnValue($row, "StandardHour", mf.deal.HourConverter(value));
                }
            },
            {
                field: 'StandardHour', title: fields.StandardWorkingHours, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: true }),
            },
            {
                field: 'PrepareTime', title: fields.PrepareWorkSeconds, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.PrepareWorkSecondsIsError)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var value = Number($cell.val());
                    if (isNaN(value)) {
                        return;
                    }
                    table.setEditingColumnValue($row, "PrepareHour", mf.deal.HourConverter(value));
                }
            },
            {
                field: 'PrepareHour', title: fields.PrepareWorkHours, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, title: "title", maxLength: 150 })),
            },
            {
                field: 'Unit', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'UtilCode', title: fields.AuxiliaryUnit, align: "center", width: "130",
                rander: new mf.FKRander(
                    "#AuxUnitDialog",
                    "#AuxUnitConfirmBtn",
                    AuxUnitTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#AuxUnitNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "Unit", e.data.ParameterID);
                    table.setEditingColumnValue($row, "UtilCode", e.data.Code);
                }
            },
            {
                field: 'UnitRatio', title: fields.UnitRate, align: "center", width: "100", defaultValue: 1,
                rander: new mf.TextRander({ size: 10, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AuxUnitRatioIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AuxUnitRatioIsMaxInteger, fields.AuxUnitRatioIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 6, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    $cell.val(mf.deal.ValueCheckNumber($cell.val(), 1));
                }
            },
            {
                field: 'ResourceReport', title: fields.ResourceReporting, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray,
                    { title: true, IsBoolean: true, disabled: true, noSearchSelectedText: "" })
            },
            {
                field: 'IsIP', title: fields.IsProcessInspection, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray, { title: true, IsBoolean: true })
            },
            {
                field: 'IsFPI', title: fields.IsFirstTest, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray, { title: true, IsBoolean: true })
            },
            {
                field: 'IsOSI', title: fields.IsPatrolInspection, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray, { title: true, IsBoolean: true })
            },
            {
                field: 'InspectionGroupID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'GroupCode', title: fields.InspectionGroup, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#InspectionGroupDialog",
                    "#InspectionGroupConfirmBtn",
                    InspectionGroupTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#InspectionGroupNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "InspectionGroupID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "GroupCode", e.data.Code);
                    table.setEditingColumnValue($row, "GroupName", e.data.Name);
                }
            },
            {
                field: 'GroupName', title: fields.InspectionGroupInstructions, align: "center", width: "150",
                rander: new mf.TextRander({ size: 13, readonly: "readonly", title: "" })
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

    //返回
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
        MainTable.addRow();

        var $trs = $("#MainTable").find("tr");
        var $trlength = $trs.length;
        if ($trlength > 1) {
            var array = $.map(MainTable.getAllRowData(),
                                function (item, index) {
                                    return Number(item.Sequence);
                                });
            var sequence = Math.max.apply(Math, array) + 10;
            $("#Sequence").val(sequence);
        }
        else {
            $("#Sequence").val(10);
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

    //工序用料
    this.OperationMaterialsClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001OperationMaterials",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00001ProcessProcess",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row,
                        OperationRow: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001OperationMaterials';
        }, null, fields.Isleave);
    };

    //工序资源
    this.OperationResourcesClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001OperationResources",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00001ProcessProcess",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row,
                        OperationRow: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001OperationResources';
        }, null, fields.Isleave);
    }

    //工序关系
    this.OperationRelationshipClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001OperationRelationship",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00001ProcessProcess",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001OperationRelationship';
        }, null, fields.Isleave);
    }
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
    "AttritionRateIsMaxDecimal", "AlternativeProcessCode", "WorkOrderNo", "WorkOrderDescription",
    "OperationIsNull", "OperationMaterials", "OperationResources", "OperationInformation",
    "OperationRelationship", "OperationSequence", "ArrangeSequence"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000058" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};