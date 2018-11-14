var URL = "/MES/IntelligentManufacturing/SFC00002AlternativeProcess";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];

    var formData = {
        ManufacturingUnit: ko.observable(),
        Process_ID: ko.observable(),
        Item_ID: ko.observable(),
        AfterSeparateQuantity: ko.observable(),
        OutProQuantity: ko.observable(),
        Quantity: ko.observable()
    };
    ko.applyBindings(formData);
    $("#ItemCode").val(mainForm.ItemCode);
    $("#ItemName").val(mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").val(mainForm.WorkCenterCode);
    $("#WorkCenterName").val(mainForm.WorkCenterName);
    $("#ProcessCode").val(mainForm.ProcessCode);
    $("#ProcessName").val(mainForm.ProcessName);
    $("#OrderNum").val(mainForm.MoNo);
    $("#SequenceNo").val(mainForm.Sequence);
    formData.ManufacturingUnit(mainForm.UnitID);

    $("#ItemCode").attr("title", mainForm.ItemCode);
    $("#ItemName").attr("title", mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").attr("title", mainForm.WorkCenterCode);
    $("#WorkCenterName").attr("title", mainForm.WorkCenterName);
    $("#ProcessCode").attr("title", mainForm.ProcessCode);
    $("#ProcessName").attr("title", mainForm.ProcessName);

    //制令制程刷新表头信息
    var initTitle = function () {
        mf.ajax({
            type: "Get",
            url: "/MES/api/IntelligentManufacturing/Sfc00002GetFabMoProcess",
            data: { FabMoProcessID: mainForm.FabMoProcessID },
            success: function (data) {
                formData.Quantity(data.Quantity);
                formData.OutProQuantity(data.OutProQuantity);
                formData.AfterSeparateQuantity(data.AfterSeparateQuantity);
                formData.Process_ID(data.ProcessID);
                formData.Item_ID(data.ItemID);
            }
        });
    }
    initTitle();

    //制程列表
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ProcessID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ProcessCode").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetFabMoAltRelShipList',
                data: {
                    ProcessID: formData.Process_ID(),
                    ItemID: formData.Item_ID(),
                    page: pagination.page,
                    rows: pagination.rows,
                    Code: Code
                },
                success: function (data) {
                    
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, title: "title", maxLength: 10 }))
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 19, title: true, maxLength: 120 }))
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

  
    //拆解替代主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "FabMoAltRelShipID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        LastWidth: "140",
        IsSetTableWidth:true,
        height: window.innerHeight - 210,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
            searchData = {};
            searchData.FabMoProcessID = mainForm.FabMoProcessID;
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetFabMoSplitList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].FabricatedMotherID = mainForm.FabricatedMotherID;
                saveData.inserted[i].OriginalFabMoProcessID = mainForm.FabMoProcessID;
                saveData.inserted[i].Status = mainForm.Status;

            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabMoProcessSplitSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var SeparateQuantity = Number($row.find("#Quantity").val());
            var AfterSeparateQuantity = Number($("#AfterDismantling").val());

            var QuantityIsValue = MainTable.getEditingColumnValue($row, "Quantity");
            
            if (!QuantityIsValue) {              
                return fields.AmountOfDismantlingIsNull;
            }

            if (SeparateQuantity > AfterSeparateQuantity) {
                return fields.SeparateQuantityThanAfterSeparateQuantity;
            }
           
            return null;
        },
      
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
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "170", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                    "#ProcessDialog",
                    "#ProcessConfirmBtn",
                    ProcessTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "",
                        btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ProcessNo", text: "" }]
                    }
                )),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ProcessID", e.data.ProcessID);
                    table.setEditingColumnValue($row, "ProcessIsDefault", e.data.IsDefault);
                    table.setEditingColumnValue($row, "ProcessCode", e.data.ProcessCode);
                    table.setEditingColumnValue($row, "ProcessName", e.data.ProcessName);
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
                    new mf.TextRander({ size: 13, disabled: true, title: "" }))
            },
            {
                field: 'WorkCenterID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'WorkCenterCode', title: fields.WorkCenter, align: "center", width: "160", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander(
                    "#WorkCenterDialog",
                    "#WorkCenterConfirmBtn",
                    WorkCenterTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
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
                field: 'WorkCenterName', title: fields.WorkCenterDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: true, title: "" }))
            },
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(                  
                    new mf.TextRander({ size:10, disabled: true, title: "" })                    
                    )
                  
            },
            {
                field: 'DeptName', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: true, title: "" }))
            },
             {
                 field: 'Price', title: fields.UnitPrice, align: "center", width: "120", defaultValue: 0,
                 rander: new mf.TextRander({ size: 10, title: "" }),
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
              field: 'Quantity', title: fields.AmountOfDismantling, align: "center", width: "130", require: true,
              rander: new mf.WirteOnceOnlyRander(
                  new mf.TextRander({ size: 9 })
                  ),
              checkers: [
                    // new mf.TextNotEmptyChecker(fields.AmountOfDismantlingIsNull),
                     new mf.IsOnlyNumberChecker(fields.AmountDismantlingNumber)
              ],
              
          },
            {
                field: 'UnitID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Unit', title: fields.AuxiliaryUnit, align: "center", width: "160",
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
                    table.setEditingColumnValue($row, "UnitID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "Unit", e.data.Code);
                }
            },
            {
                field: 'UnitRate', title: fields.UnitRate, align: "center", width: "120", defaultValue: 1,
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
               field: 'StartDate', title: fields.EstimatedStartDate, align: "center", width: "130", require: true,
               rander: new mf.DateRander({ size: 10, title: "title", readonly: 'readonly' }),
               checkers: [
                    new mf.TextNotEmptyChecker(fields.ExpectedStartDateIsRequiredEntry)
               ],
               
           },
             {
                 field: 'FinishDate', title: fields.EstimatedFinishDate, align: "center", width: "130", require: true,
                 rander: new mf.DateRander({ size: 10, title: "title", readonly: 'readonly' }),
                 checkers: [
                    new mf.TextNotEmptyChecker(fields.ExpectedCompletionDateIsRequiredEntry)
                 ],
             },
            {
                field: 'PrepareTime', title: fields.PrepareWorkSeconds, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, title: "", maxLength: 20 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.PrepareWorkSecondsIsError)
                ],
                //fn_onEditingChange: function (table, $row, $cell, field, e) {
                //    var value = Number($cell.val());
                //    if (isNaN(value)) {
                //        return;
                //    }
                //    table.setEditingColumnValue($row, "PrepareTimeStr", mf.deal.HourConverter(value));
                //}
            },
             {
                 field: 'PrepareTimeStr', title: fields.PrepareWorkHours, align: "center", width: "120",
                 rander: new mf.TextRander({ size: 10, title: "", maxLength: 20, disabled: true })
             },
              {
                  field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
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


    //保存
    this.saveClick = function () {
        $("#btn_save").attr({ disabled: "disabled" });
        MainTable.save(function () {
            initTitle();
        }, null, true);
        setTimeout(function () { $("#btn_save").removeAttr("disabled") }, 600)
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
    "AttritionRateIsMaxDecimal", "AlternativeProcessCode", "WorkNumber", "Name", "OrderNum",
    "SequenceNo", "Qty", "ManufacturingUnit", "NumberOfUndistributed", "AfterDismantling",
    "AuxUnitRatioIsNonNegativeNumber", "AuxUnitRatioIsMaxInteger", "AuxUnitRatioIsMaxDecimal",
    "AmountOfDismantling", "EstimatedStartDate", "EstimatedFinishDate", "PrepareWorkSeconds", "PrepareWorkHours",
    "AmountDismantlingNumber", "PreOrderProcessCode", "PreOrderProcessIsNull", "AmountOfDismantlingIsNull",,"info",
    "SeparateQuantityThanAfterSeparateQuantity", "ExpectedStartDateIsRequiredEntry", "ExpectedCompletionDateIsRequiredEntry"
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