var URL = "/MES/IntelligentManufacturing/SFC00002ProcessProcess";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    var StandardTime = 0, saveTime = 0;
    var StandardHour = 0,saveHour = 0;
    parameters = mf.format.getMesParameters("0191213000058,0191213000004");
    var formData = {
        ManufacturingUnit: ko.observable()
    };
    ko.applyBindings(formData);
    console.log(mainForm)
    $("#ItemCode").val(mainForm.ItemCode);
    $("#ItemName").val(mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").val(mainForm.WorkCenterCode);
    $("#WorkCenterName").val(mainForm.WorkCenterName);
    $("#ProcessCode").val(mainForm.ProcessCode);
    $("#ProcessName").val(mainForm.ProcessName);
    $("#IsOperation").val(mainForm.IsEnableOperation ? "Y" : "N");

    $("#OrderNum").val(mainForm.MoNo);
    $("#SequenceNo").val(mainForm.Sequence);
    $("#Quantity").val(mainForm.Quantity);
    formData.ManufacturingUnit(mainForm.UnitID)

    $("#ItemCode").attr("title", mainForm.ItemCode);
    $("#ItemName").attr("title", mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").attr("title", mainForm.WorkCenterCode);
    $("#WorkCenterName").attr("title", mainForm.WorkCenterName);
    $("#ProcessCode").attr("title", mainForm.ProcessCode);
    $("#ProcessName").attr("title", mainForm.ProcessName);
    $("#IsOperation").attr("title", mainForm.IsEnableOperation ? "Y" : "N");
    $("#StandardWorkingSeconds").val(mainForm.StandardTime);
    $("#PrepareWorkSeconds").val(mainForm.PrepareTime);

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
                    console.log(data)
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



    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "FabMoOperationID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: true,
       
        height: window.innerHeight - 250,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        operateColumWidth: "138px",
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
            //StandardTime += rowdata.StandardTime;
            //StandardHour += rowdata.PrepareTime;
            ////console.log($row.find("#StandardTime").val())
            //if ($row.find(".editingRow ")) {
            //    StandardTime -= Number(2 * rowdata.StandardTime);
            //    StandardHour -= Number(2 * rowdata.PrepareTime);
            //    StandardTime += Number($row.find("#StandardTime").val());
            //    StandardHour += Number($row.find("#PrepareTime").val());
            //}
            var Unit = $row.find("#Unit").val();
            var UnitRatio = $row.find("#UnitRatio").val();
            
            if (Unit && Unit.length > 0) {
                if (!(UnitRatio && UnitRatio.length > 0)) {
                    return fields.AuxUnitRatioIsNull;
                }
            }
            //console.log(StandardTime + ":::" + StandardHour)
            //if (mainForm.StandardTime == null) {
            //    // msg.info(fields.Prompt, fields.ProcessAllTimeIsNull)
            //    mainForm.StandardTime = 0;
            //  //  StandardTime = 0;
            //  //  return fields.ProcessAllTimeIsNull
            //}
            //if (mainForm.PrepareTime == null) {
            //    //   console.log(1111)
            //    // msg.info(fields.Prompt, fields.ProcessAllTimeIsNull)
            //    mainForm.PrepareTime = 0;
            //    //  StandardHour = 0;
            //    //   return fields.StandardHourIsNull
            //}
            //if (StandardTime > Number(mainForm.StandardTime)) {
            //    // msg.info(fields.Prompt, fields.ProcessStandarTimeIsMore);
            //    StandardTime = 0;
            //    return fields.ProcessStandarTimeIsMore
            //}
            
            //if (mainForm.PrepareTime == null) {
            // //   console.log(1111)
            //    // msg.info(fields.Prompt, fields.ProcessAllTimeIsNull)
            //    mainForm.PrepareTime = 0;
            //  //  StandardHour = 0;
            // //   return fields.StandardHourIsNull
            //}
            //if (StandardHour > Number(mainForm.PrepareTime)) {
            //    // msg.info(fields.Prompt, fields.ProcessStandarTimeIsMore);
            //    StandardHour = 0;
            //    return fields.StandardHourIsMore
            //}

           // StandardTime = saveTime;
           // StandardHour = saveHour;
           // console.log("StandardTime"+":"+StandardTime)

            return null;
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.FabMoProcessID = mainForm.FabMoProcessID;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabMoOperationList',
                data: searchData,
                success: function (data) {
                   // console.log(data)
                    success(data);
                    for (var i=0; i < data.rows.length; i++) {
                        StandardTime += Number(data.rows[i].StandardTime)
                        StandardHour += Number(data.rows[i].PrepareTime)
                        saveTime += Number(data.rows[i].StandardTime);
                        saveHour += Number(data.rows[i].PrepareTime)
                    }
                }
            });
         
        },
        fn_saveData: function (saveData, success) {

            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].FabMoProcessID = mainForm.FabMoProcessID;
                saveData.inserted[i].ProcessID = mainForm.ProcessID;
                saveData.inserted[i].WorkCenterID = mainForm.WorkCenterID;
                saveData.inserted[i].FabricatedMotherID = mainForm.FabricatedMotherID;
               // StandarTime += Number(saveData.inserted[i].StandardTime)
            }
           // console.log(StandarTime)
            //console.log(saveData.inserted)
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabMoOperationSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData) {
            var deleteDetailData = {};
            deleteDetailData.FabMoOperationID = rowData.FabMoOperationID;
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabMoOperationDelete',
                data: JSON.stringify(deleteDetailData),
                success: function (data) {
                    if (data.status == "200") {
                        msg.success(fields.Prompt, data.msg, function () {
                            MainTable.loadData();
                        });
                    }
                    else {
                        msg.error(fields.Prompt, data.msg);
                    }
                }
            });
        },
        columns: [
            {
                field: 'Sequence', title: fields.OperationSequence, align: "center", width: "80", require: true,
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
                    new mf.TextRander({ size: 13, disabled: "disabled", title: "" }))
            },
            {
                field: 'StandardTime', title: fields.StandardWorkingSeconds, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "true", maxLength: 20 }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.StandardWorkingSecondsIsError)
                ],
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData) {
                   
                    var value = Number($cell.val());
                    if (isNaN(value)) {
                        return;
                    }
                    table.setEditingColumnValue($row, "StandardHour", mf.deal.HourConverter(value));
                    //table.setEditingColumnValue($row, "StandardTime", 0);
                    
                   // for (var i = 0; i < rowsData.length; i++) {
                   //     StandardTime += Number(rowsData[i].StandardTime)
                        
                   // }

                   //// StandardTime += Number(rowsData.StandardTime);
                    
                   // if (mainForm.StandardTime == null) {
                   //     msg.info(fields.Prompt, fields.ProcessAllTimeIsNull)
                   //     return
                   // }
                   // if (StandardTime > Number(mainForm.StandardTime)) {
                   //     msg.info(fields.Prompt, fields.ProcessStandarTimeIsMore);
                   //     return
                   // }

                }
            },
            {
                field: 'StandardHour', title: fields.StandardWorkingHours, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: true }),
            },
            {
                field: 'PrepareTime', title: fields.PrepareWorkSeconds, align: "center", width: "100",
                rander: 
                    new mf.TextRander({ size: 7, title: "", maxLength: 20 }),
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
                field: 'UnitID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'UnitCode', title: fields.AuxiliaryUnit, align: "center", width: "130",
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
                    table.setEditingColumnValue($row, "UnitCode", e.data.Code);
                }
            },
            {
                field: 'UnitRate', title: fields.UnitRate, align: "center", width: "100", defaultValue: 1,
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
                field: 'PreProQuantity', title: fields.PreTransferQty, align: "center", width: "180",visible:false,
                rander: new mf.StaticValueRander()
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 })
            },
             {
                 field: 'Status', title: fields.Status, align: "center", width: "100",
                 rander: new mf.DontSelectRander(parameters.PT0191213000004)
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
            },
            {
                field: 'ResourceReport', title: fields.ResourceReporting, align: "center", width: "100",visible:false,
                rander: new mf.SelectRander([
                    { value: true, text: "Y" },
                    { value: false, text: "N" }])
            },
        ]
    });

    MainTable.loadData();


    //返回
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

    //删除
    this.deleteClick = function () {
        MainTable.deleteRow();
    };

    //保存
    this.saveClick = function () {

        MainTable.save(function (data) {
             StandardTime = 0;
             StandardHour = 0;
        }, null, true);


     //   MainTable.loadData();

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
                    URL: "/MES/IntelligentManufacturing/SFC00002OperationMaterials",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00002ProcessProcess",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row,
                        OperationRow: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002OperationMaterials';
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
                    URL: "/MES/IntelligentManufacturing/SFC00002OperationResources",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00002ProcessProcess",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row,
                        OperationRow: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002OperationResources';
        }, null, fields.Isleave);
    }

    //工序关系
    this.OperationRelationshipClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00002OperationRelationship",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00002ProcessProcess",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002OperationRelationship';
        }, function () { }, fields.Isleave);
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
    "OperationIsNull", "OperationMaterials", "OperationResources", "OperationInformation", "PreTransferQty",
    "OperationRelationship", "OperationSequence", "WorkNumber", "Name", "OrderNum", "SequenceNo","ResourceReporting",
    "Qty", "ManufacturingUnit", "AuxUnitRatioIsNonNegativeNumber", "AuxUnitRatioIsMaxInteger", "AuxUnitRatioIsMaxDecimal",

    "ProcessStandarTimeIsMore", "ProcessAllTimeIsNull", "StandardHourIsNull", "StandardHourIsMore", "info"
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