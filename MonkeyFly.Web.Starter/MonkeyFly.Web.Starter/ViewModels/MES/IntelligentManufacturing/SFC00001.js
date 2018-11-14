var URL = "/MES/IntelligentManufacturing/SFC00001";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var typearry = [];
    console.log(parameters.PT0191213000003);
    for (var i = 0; i < parameters.PT0191213000003.length; i++) {
        var subValue = parameters.PT0191213000003[i].value.substring(5, parameters.PT0191213000003[i].length)
        if (subValue == "0201213000008" || subValue == "0201213000009") {
            typearry[i] = { value: parameters.PT0191213000003[i].value, text: parameters.PT0191213000003[i].text }
        }
    }
    console.log(typearry)
    //MK出现了数组typearry[0]为undefined，去掉该项 2017年9月27日10:42:24
    for (var i = 0; i < typearry.length; i++) {
        if (!typearry[i]) {
            typearry.splice(i, 1)
        }
    }

    var formData = {
        StartCode: ko.observable(""),
        EndCode: ko.observable(""),
        SupplyType: ko.observable(""),
        SupplyTypeArray: ko.observableArray(typearry)
    };
    ko.applyBindings(formData);

    var itemId = "", MainIndex = -1;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    var height = (window.innerHeight - 216) / 2;

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

    //工作中心列表
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#WorkCenterNo").val();
            var ProcessID = $("#DetailTable .active").find("#ProcessID").val();

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
                field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 30 })
            },
            {
                field: 'DeptName', title: fields.DepartmentDesOrManufacturersDes, align: "center", width: "100",
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
                field: 'Comments', title: fields.Remark, align: "center",
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
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });
    $("#InspectionGroupSearch").click(function () {
        InspectionGroupTable.loadData(null, null, 1);
    });

    //表头
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "ID",
        height: height,
        editable: false,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        operateColumWidth: "248px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:248px;text-align:center;">');
            var $ProcessRelationshipClick = $('<button id="ProcessRelationshipClick" class="operation btn btn-success btn-xs" onclick="model.ProcessRelationshipClick(this)">' + fields.ProcessRelationship + '</button>');
            var $BOMClick = $('<button id="BOMClick" class="operation btn btn-success btn-xs" onclick="model.BOMClick(this)">' + fields.BOM + '</button>');
            var $ResourceClick = $('<button id="ResourceClick" class="operation btn btn-success btn-xs" onclick="model.ResourceClick(this)">' + fields.Resource + '</button>');
            $ProcessRelationshipClick.attr("title", fields.ProcessRelationship);
            $BOMClick.attr("title", fields.BOM);
            $ResourceClick.attr("title", fields.Resource);
            $td.append($ProcessRelationshipClick);
            $td.append($BOMClick);
            $td.append($ResourceClick);
            return $td;
        },
        fn_onRowClick: function (row) {
            var $row = $("#MainTable").find(".active");
            if (!($row && $row.length > 0)) {
                return;
            }

            itemId = row.ItemID;
            MainIndex = Number($row.find("td").eq(0).text());
            DetailTable.goForword(
                function () {
                    DetailTable.loadData();
                }, function () {
                    DetailTable.loadData();
                }, fields.SaveOrNot);
        },
        fn_getData: function (pagination, searchData, success) {
            if (formData.StartCode().length == 0 && formData.EndCode().length == 0) {
                success([]);
                return;
            }

            searchData = {};
            searchData.StartCode = formData.StartCode();
            searchData.EndCode = formData.EndCode();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Type = formData.SupplyType();

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001getList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        LastWidth: "95",
        isFrozenColumn: true,
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.ProductCode, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "150",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Specification', title: fields.Specification, align: "center", width: "160", 
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Unit', title: fields.Unit, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "160",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'OverRate', title: fields.OverRate, align: "center",
                rander: new mf.TextRander({ title: true })
            },
            //{
            //    field: 'RoutingCode', title: fields.RoutingCode, align: "center", width: "100",
            //    rander: new mf.TextRander({ title: true })
            //},
            //{
            //    field: 'RoutingDescription', title: fields.RoutingDescription, align: "center", width: "100",
            //    rander: new mf.TextRander({ title: true })
            //},
            //{
            //    field: 'RC', title: fields.IsEnabledRC, align: "center", width: "80",
            //    rander: new mf.TextRander({ title: true })
            //},
            //{
            //    field: 'Placeholder', title: "",
            //    rander: new mf.PlaceholderRander()
            //}
        ]
    });
    MainTable.loadData();

    //明细
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "ItemProcessID",
        deleteId: "ItemProcessID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: true,
        height: height,
        paginationBar: new mf.PaginationBar("#DetailPageBar"),
        operateColumWidth: "310px",
        fn_onTableEnterPress: function () {
            var $trs = $("#DetailTable").find("tr");
            var $trlength = $trs.length;
            if ($trlength > 1) {
                var array = $.map(DetailTable.getAllRowData(),
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
            var $td = $('<td style="width:310px;text-align:center;">');
            var $BtnProcessMaterials = $('<button id="ProcessMaterials" class="operation btn btn-success btn-xs" onclick="model.ProcessMaterialsClick(this)">' + fields.ProcessMaterials + '</button>');
            var $BtnProcessProcess = $('<button id="ProcessProcess" class="operation btn btn-success btn-xs"  onclick="model.ProcessProcessClick(this)">' + fields.ProcessProcess + '</button>');
            var $BtnProcessResources = $('<button id="ProcessResources" class="operation btn btn-success btn-xs" onclick="model.ProcessResourcesClick(this)">' + fields.ProcessResources + '</button>');
            var $BtnAlternativeProcess = $('<button id="AlternativeProcess" class="operation btn btn-success btn-xs" onclick="model.AlternativeProcessClick(this)">' + fields.AlternativeProcess + '</button>');

            $BtnProcessMaterials.attr("title", fields.ProcessMaterials);
            $BtnProcessProcess.attr("title", fields.ProcessProcess);
            $BtnProcessResources.attr("title", fields.ProcessResources);
            $BtnAlternativeProcess.attr("title", fields.AlternativeProcess);

            if (!rowData.IsOperation) {
                $BtnProcessMaterials.attr("disabled", false);
                $BtnProcessProcess.attr("disabled", true);
                $BtnProcessResources.attr("disabled", false);
            }
            else {
                $BtnProcessMaterials.attr("disabled", true);
                $BtnProcessProcess.attr("disabled", false);
                $BtnProcessResources.attr("disabled", true);
            }

            $td.append($BtnProcessMaterials);
            $td.append($BtnProcessProcess);
            $td.append($BtnProcessResources);
            $td.append($BtnAlternativeProcess);
            return $td;
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var $BtnProcessMaterials = $row.find("#ProcessMaterials");
            var $BtnProcessProcess = $row.find("#ProcessProcess");
            var $BtnProcessResources = $row.find("#ProcessResources");
            var $BtnAlternativeProcess = $row.find("#AlternativeProcess");
            if (isAdding) {
                $BtnProcessMaterials.hide();
                $BtnProcessProcess.hide();
                $BtnProcessResources.hide();
                $BtnAlternativeProcess.hide();
            }
            else {
                $BtnProcessMaterials.show();
                $BtnProcessProcess.show();
                $BtnProcessResources.show();
                $BtnAlternativeProcess.show();
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var AuxUnit = $row.find("#AuxUnit").val();
            var AuxUnitRatio = $row.find("#AuxUnitRatio").val();
            
            if (AuxUnit && AuxUnit.length > 0) {
                if (!(AuxUnitRatio && AuxUnitRatio.length > 0)) {
                    return fields.AuxUnitRatioIsNull;
                }
            }

            return null;
        },
        fn_getData: function (pagination, searchData, success) {
            if (itemId.length == 0) {
                success([]);
                return;
            }

            searchData = {};
            searchData.ItemID = itemId;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetDetailList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            var row = MainTable.getSelectedData();
            if (!row) {
                return;
            }

            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].ItemID = row.ItemID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00001Delete",
                data: JSON.stringify({ ItemProcessID: rowData.ItemProcessID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
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
                    table.setEditingColumnValue($row, "ProcessID", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ProcessIsDefault", e.data.IsDefault);
                    table.setEditingColumnValue($row, "ProcessCode", e.data.Code);
                    table.setEditingColumnValue($row, "ProcessName", e.data.Name);
                    table.setEditingColumnValue($row, "WorkCenterID", "");
                    table.setEditingColumnValue($row, "WorkCenterCode", "");
                    table.setEditingColumnValue($row, "WorkCenterName", "");
                    table.setEditingColumnValue($row, "InoutMark", "");
                    table.setEditingColumnValue($row, "DeptCode", "");
                    table.setEditingColumnValue($row, "DeptName", "");
                    table.setEditingColumnValue($row, "IsOperation", "");
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessIsNull)
                ]
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, disabled: 'disabled', title: "" }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, title: "title", maxLength: 150 })
            },
            {
                field: 'StandardTime', title: fields.StandardWorkingSeconds, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, event: "input", eventName: "oninputnum(this)" }),
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
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: 'disabled' }),
            },
            {
                field: 'PrepareTime', title: fields.PrepareWorkSeconds, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, event: "input", eventName: "oninputnum(this)" }),
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
                rander: new mf.TextRander({ size: 7, title: "", maxLength: 20, disabled: 'disabled' }),
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
                    table.setEditingColumnValue($row, "DeptCode", e.data.DeptCode);
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
                    new mf.TextRander({ size: 15, disabled: 'disabled', title: "" }))
            },                        
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: 'disabled', title: "" }))
            },
            {
                field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: 'disabled', title: "" }))
            },
            {
                field: 'DeptName', title: fields.DepartmentDesOrManufacturersDes, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 15, disabled: 'disabled', title: "" }))
            },
            {
                field: 'AuxUnit', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'AuxUnitCode', title: fields.AuxiliaryUnit, align: "center", width: "150",
                rander: new mf.FKRander(
                    "#AuxUnitDialog",
                    "#AuxUnitConfirmBtn",
                    AuxUnitTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#AuxUnitNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "AuxUnit", e.data.ParameterID);
                    table.setEditingColumnValue($row, "AuxUnitCode", e.data.Code);
                }
            },
            {
                field: 'AuxUnitRatio', title: fields.UnitRate, align: "center", width: "110", defaultValue: 1,
                rander: new mf.TextRander({ size: 8, title: "", event: "input", eventName: "oninputnum1(this)", maxLength: 15 }),
                checkers: [
                    new mf.IsOverDecimalChecker(fields.AuxUnitRatioIsMaxInteger, fields.AuxUnitRatioIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 10, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    $cell.val(mf.deal.ValueCheckNumber($cell.val(), 1));
                }
            },
            {
                field: 'Price', title: fields.UnitPrice, align: "center", width: "110", defaultValue: 0,
                rander: new mf.TextRander({ size: 8, title: "", event: "input", eventName: "oninputnum1(this)", maxLength: 15 }),
                checkers: [
                    //new mf.IsNonNegativeNumberChecker(fields.AuxUnitRatioIsNonNegativeNumber),
                    new mf.IsOverDecimalChecker(fields.AuxUnitRatioIsMaxInteger, fields.AuxUnitRatioIsMaxDecimal,
                        fields.AuxUnitRatioIsNonNegativeNumber, 10, 4)
                ],
                fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    $cell.val(mf.deal.ValueCheckNumber($cell.val(), 0));
                }
            },
            {
                field: 'ResourceReport', title: fields.ResourceReporting, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray,
                    { title: true, IsBoolean: true, disabled: true, noSearchSelectedText: "" })
            },
            {
                field: 'IsOperation', title: fields.IsEnableProcess, align: "center", width: "80",
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
                rander: new mf.TextRander({ size: 13, disabled: 'disabled', title: "" })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });

    //查询
    this.searchClick = function () {
        DetailTable.goForword(
            function () {
                MainTable.loadData(null, null, 1);
                DetailTable.clean();
            },
            function () {
                MainTable.loadData(null, null, 1);
                DetailTable.clean();
            });
    };

    //刷新
    this.refreshClick = function () {
        DetailTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    //添加
    this.addClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        DetailTable.addRow();

        var $trs = $("#DetailTable").find("tr");
        var $trlength = $trs.length;
        if ($trlength > 1) {
            var array = $.map(DetailTable.getAllRowData(),
                                function (item, index) {
                                    return Number(item.Sequence);
                                });
            var sequence = Math.max.apply( Math, array ) + 10;
            $("#Sequence").val(sequence);
        }
        else {
            $("#Sequence").val(10);
        }
    };

    //编辑
    this.editClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        DetailTable.editRow();
    };

    //删除
    this.deleteClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        DetailTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        DetailTable.save(null, null, true);
    };

    //导出
    this.exportClick = function () {
        //table.loadDataBack(null, function () {

        //    var $trLength = $("#INF00008Table").find("tr").length;
        //    if ($trLength == 0) {
        //        msg.info(fields.Prompt, fields.NoDataCanBeExported);
        //        return;
        //    }

        //    var exportUrl = mf.domain + '/MES/api/ExportFile/ManufacturerExport?Token=' + token;

        //    if (formData.Code() && formData.Code().length > 0) {
        //        exportUrl = exportUrl + '&Code=' + formData.Code();
        //    }

        //    if (formData.Type() && formData.Type().length > 0) {
        //        exportUrl = exportUrl + '&Type=' + formData.Type();
        //    }

        //    window.location.href = exportUrl;
        //});
    };

    //导入    
    this.importClick = function () {
        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnBrowse").unbind();
        $("#BtnImport").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectFile);
            }
        });
        $("#BtnBrowse").click(function () {
            $("#BtnFile").click();
        });
        $("#BtnImport").click(function () {
            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);

            if (!(document.getElementById('BtnFile').files[0])) {
                msg.info(fields.info, fields.PleaseSelectFile)
                return;
            }

            $("#BtnImport").attr("disabled", true);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Sfc00001ImportV1',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    console.log(ret)
                    $("#BtnImport").attr("disabled", false);
                    if (ret.Isreason) {
                        msg.infoCall(fields.info, ret.msg, function () {
                            //$('#inputDialog').modal('hide');
                            //MainTable.loadData();
                            window.location.href = mf.domain + '/MES/api/Util/ImportDownload?Token=' + token + '&Name=' + ret.FileName;
                            $('#ImportDialog').modal('hide');
                            MainTable.loadData();
                            DetailTable.loadData();
                        });
                    }
                    else {
                        msg.success(fields.info, ret.msg, function () {
                            $('#ImportDialog').modal('hide');
                            MainTable.loadData();
                            DetailTable.loadData();
                        });
                    }
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };

    //制程关系
    this.ProcessRelationshipClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);
        MainIndex = Number($row.find("td").eq(0).text());
        itemId = row.ItemID;
        
        if (!(itemId && itemId.length > 0)) {
            console.log("itemId is " + itemId);
            return;
        }

        DetailTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: row
            });
            window.top.page_parameters.Caching.push(
                { 
                    URL: "/MES/IntelligentManufacturing/SFC00001ProcessRelationship",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001ProcessRelationship';
        }, null, fields.Isleave);
    };

    //制程用料
    this.ProcessMaterialsClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);
        
        if (!row) {
            console.log("row is null");
            return;
        }

        if (row.IsOperation) {
            return;
        }

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: MainRow
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001ProcessMaterials",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001ProcessMaterials';
        }, null, fields.Isleave);
    };

    //制程资源
    this.ProcessResourcesClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        if (row.IsOperation) {
            return;
        }

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: MainRow
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001ProcessResources",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001ProcessResources';
        }, null, fields.Isleave);
    }

    //替代制程
    this.AlternativeProcessClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: MainRow
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001AlternativeProcess",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001AlternativeProcess';
        }, null, fields.Isleave);
    }

    //制程工序
    this.ProcessProcessClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        if (!row) {
            console.log("row is null");
            return;
        }
        
        if (!row.IsOperation) {
            return;
        }

        DetailTable.goForword(function () {
            var MainRow = MainTable.getSelectedData();
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: MainRow
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001ProcessProcess",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001ProcessProcess';
        }, null, fields.Isleave);
    };

    //BOM
    this.BOMClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);

        DetailTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: row
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001BOM",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001BOM';
        }, null, fields.Isleave);
    };

    //资源
    this.ResourceClick = function (obj) {
        var $row = $(obj).parents("tr");
        var row = MainTable.getRowData($row);

        DetailTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001_Back",
                Parameters: row
            });
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001Resource",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/IntelligentManufacturing/SFC00001",
                        Row: row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001Resource';
        }, null, fields.Isleave);
    };

    //返回时，查询数据
    this.BackSearch = function (rowData) {
        formData.StartCode(rowData.Code);
        formData.EndCode(rowData.Code);
        MainTable.loadData(null, null, 1);
    };
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "Deletion", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "ProductCode", "GoodsName", "Specification", "Unit",
    "OverRate", "ProcessSequence", "ProcessNo", "ProcessDescription", "StandardWorkingSeconds",
    "StandardWorkingHours", "PrepareWorkSeconds", "PrepareWorkHours", "WorkCenter","Description",
    "InoutMark", "DepartmentNoOrManufacturersNo", "AuxiliaryUnit", "UnitRate", "UnitPrice",
    "IsResourceReporting", "IsEnableProcess", "IsProcessInspection", "IsFirstTest",
    "IsPatrolInspection", "InspectionGroup", "InspectionGroupInstructions", "ProcessMaterials",
    "ProcessProcess", "ProcessResources", "AlternativeProcess", "ProcessRelationship",
    "StartProductNo", "EndProductNo", "ProcessSequenceIsError", "ProcessInformation","AuxUnitRatioIsNonNegativeNumber",
    "ProcessIsNull", "StandardWorkingSecondsIsError", "PrepareWorkSecondsIsError","OnlyNum",
    "WorkCenterInformation", "WorkCenter", "WorkCenterNo", "WorkCenterDescription","SupplyType",
    "WorkCenterIsNull", "UnitMasterFile", "Code", "AuxUnitRatioIsNull", "CheckGroupCodeInformation",
    "CheckGroupCode", "CheckGroupName", "SaveOrNot", "ResourceReporting", "Isleave", "IsEnabledRC",
    "RoutingCode", "RoutingDescription", "Resource", "BOM", "DepartmentDesOrManufacturersDes",
    "AuxUnitRatioIsMaxDecimal", "AuxUnitRatioIsMaxInteger", "PleaseSelectFile","info"
];
words = arrayWord.join();
mf.toolBar('#container');

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");  //清除“数字”和“.”以外的字符
};

function oninputnum1(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/\d{11}/g, obj.value.substring(0, 10));
    obj.value = obj.value.replace(/\.(\d{5})/g, ".")    
};

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000058,0191213000003" },
        success: function (data) {
            parameters = data;
            model = new viewModel();

            var rowData = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00001_Back");
            console.log(rowData);
            if (rowData) {
                model.BackSearch(rowData);
            }
        }
    });
};