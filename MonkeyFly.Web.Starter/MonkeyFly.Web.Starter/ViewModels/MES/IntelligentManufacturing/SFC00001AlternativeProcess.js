var URL = "/MES/IntelligentManufacturing/SFC00001AlternativeProcess";
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
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "130",
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

    //工作中心列表
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#WorkCenterNo").val();
            var ProcessID = $("#MainTable .active").find("#ProcessID").val();

            if (!(ProcessID && ProcessID.length > 0)) {
                success([]);
                return;
            }

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: { ProcessID: ProcessID, Code: Code, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.WorkCenterNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "100",
                rander: new mf.SelectRander(parameters.PT0191213000058, { title: "" })
            },
            {
                field: 'DeptName', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            }
        ]
    });
    $("#WorkCenterSearch").click(function () {
        WorkCenterTable.loadData(null, null, 1);
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

    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "ID",
        deleteId: "IPARSID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemProcessID = mainForm.ItemProcessID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetLAlternativeRelationList',
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
                url: '/MES/api/IntelligentManufacturing/Sfc00001AlternativeRelationSave',
                data: JSON.stringify(saveData),
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
                var sequence = Math.max.apply(Math, array) + 10;
                $("#Sequence").val(sequence);
            }
            else {
                $("#Sequence").val(10);
            }
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander({ size: 2, title: "", maxLength: 4 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessSequenceIsError),
                    new mf.IsNonNegativeNumberChecker(fields.ProcessSequenceIsError)
                ]
            },
            {
                field: 'ProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessIsDefault', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessCode', title: fields.AlternativeProcessCode, align: "center", width: "150", require: true,
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
                    table.setEditingColumnValue($row, "ProcessID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ProcessIsDefault", e.data.IsDefault);
                    table.setEditingColumnValue($row, "ProcessCode", e.data.Code);
                    table.setEditingColumnValue($row, "ProcessName", e.data.Name);
                    table.setEditingColumnValue($row, "WorkCenterID", "");
                    table.setEditingColumnValue($row, "WorkCenterCode", "");
                    table.setEditingColumnValue($row, "WorkCenterName", "");
                    table.setEditingColumnValue($row, "InoutMark", "");
                    table.setEditingColumnValue($row, "DepartmentNoOrManufacturersNo", "");
                    table.setEditingColumnValue($row, "IsOperation", "");
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessIsNull)
                ]
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, disabled: "disabled", title: "" }))
            },
            {
                field: 'WorkCenterID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", width: "150", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                    "#WorkCenterDialog",
                    "#WorkCenterConfirmBtn",
                    WorkCenterTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#WorkCenterNo", text: "" }]
                    }
                )),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var inoutMark = e.data.InoutMark;
                    var ProcessIsDefault = $row.find("#ProcessIsDefault").val();
                    var IsOperation = "";
                    for (var i = 0; i < parameters.PT0191213000058.length; i++) {
                        if (inoutMark == parameters.PT0191213000058[i].value) {
                            inoutMark = parameters.PT0191213000058[i].text;
                            break;
                        }
                    }

                    if (e.data.InoutMark.substring(5, 18) == "020121300002E") {
                        IsOperation = ("true" == ProcessIsDefault) ? true : false;
                    }
                    else if (e.data.InoutMark.substring(5, 18) == "020121300002F") {
                        IsOperation = false;
                    }

                    table.setEditingColumnValue($row, "WorkCenterID", e.data.WorkCenterID);
                    table.setEditingColumnValue($row, "WorkCenterCode", e.data.Code);
                    table.setEditingColumnValue($row, "WorkCenterName", e.data.Name);
                    table.setEditingColumnValue($row, "DeptName", e.data.DeptName);
                    table.setEditingColumnValue($row, "ResourceReport", e.data.ResourceReport);
                    table.setEditingColumnValue($row, "InoutMark", inoutMark);
                    table.setEditingColumnValue($row, "IsOperation", IsOperation);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WorkCenterIsNull)
                ]
            },
            {
                field: 'WorkCenterName', title: fields.Description, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: "disabled", title: "" }))
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: "disabled", title: "" }))
            },
            {
                field: 'DeptName', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: "disabled", title: "" }))
            },
            {
                field: 'Price', title: fields.UnitPrice, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 7, title: "" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.AuxUnitRatioIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AuxUnitRatioIsMaxInteger, fields.AuxUnitRatioIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 6, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    $cell.val(mf.deal.ValueCheckNumber($cell.val(), 0));
                }
            },
            {
                field: 'Unit', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'UtilCode', title: fields.AuxiliaryUnit, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#AuxUnitDialog",
                    "#AuxUnitConfirmBtn",
                    AuxUnitTable,
                    new mf.TextRander({ size: 8, readonly: 'readonly', title: "" }),
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
                rander: new mf.TextRander({ size: 7, title: "" }),
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
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
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
    "AttritionRateIsMaxDecimal", "AlternativeProcessCode"
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