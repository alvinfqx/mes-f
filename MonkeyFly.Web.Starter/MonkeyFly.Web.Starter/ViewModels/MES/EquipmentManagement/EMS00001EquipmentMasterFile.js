var model = null;
var parameters = null;
var URL = "/MES/EquipmentManagement/EMS00001EquipmentMasterFile";
var MID = window.top.page_parameters.GetParameters(URL);
var viewModel = function () {
    var self = this;
    var statuslist = [{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }];
    var statisticsFlag = [{ value: "true", text: "Y" }, { value: "false", text: "N" }];
    var ConditionUsed = [];
    var CalledRepair = [];
    var Repairing = [];
    var ConditionValue = null;
    for (var i = 0, length = parameters.PT0191213000055.length; i < length; i++) {
        if (parameters.PT0191213000055[i].value.substring(5, parameters.PT0191213000055[i].value.length) == "0201213000021" ||
            parameters.PT0191213000055[i].value.substring(5, parameters.PT0191213000055[i].value.length) == "0201213000024" ||
            parameters.PT0191213000055[i].value.substring(5, parameters.PT0191213000055[i].value.length) == "0201213000025") {
            ConditionUsed.push(parameters.PT0191213000055[i]);
        }
        else if (parameters.PT0191213000055[i].value.substring(5, parameters.PT0191213000055[i].value.length) == "0201213000022") {
            CalledRepair.push(parameters.PT0191213000055[i]);
        }
        else if (parameters.PT0191213000055[i].value.substring(5, parameters.PT0191213000055[i].value.length) == "0201213000023") {
            Repairing.push(parameters.PT0191213000055[i]);
        }
    }
    for (var i = 0, length = parameters.PT0191213000055.length; i < length; i++) {
        if (parameters.PT0191213000055[i].value.substring(5, parameters.PT0191213000055[i].value.length) == "02012130000A5") {
            ConditionValue = parameters.PT0191213000055[i].value;
        }
    }

    var formData = {
        Code: ko.observable(""),
        Status: ko.observable(""),
        StatusList: ko.observableArray(parameters.PT0191213000001)
    };
    ko.applyBindings(formData);

    //资源类型列表
    var SourceClassTable = new mf.Table("#SourceClassTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionSourceClassBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#SourceClassCode").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID:"000013", page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.SourceClassNumber, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceClassNumberIsNull)
                ],
            },
            {
                field: 'Name', title: fields.SourceClassDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceClassDescriptionIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true })),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(statuslist),
            }
        ]
    });
    $("#SourceClassSearch").click(function () {
        SourceClassTable.loadData(null, null, 1);
    });

    //厂区列表
    var PlantAreaTable = new mf.Table("#PlantAreaTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionPlantAreaBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#FactoryCode").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetPlantAreaList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.FactoryCode, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: true })
            },
            {
                field: 'Name', title: fields.FactoryDescription, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: true })
            },
            {
                field: 'PlantCode', title: fields.SiteCode, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, readonly: "readonly", title: true })
            },
            {
                field: 'PlantName', title: fields.SiteDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, readonly: "readonly", title: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.TextRander()
            }
        ]
    });
    $("#PlantAreaSearch").click(function () {
        PlantAreaTable.loadData(null, null, 1);
    });

    //厂商列表
    var VendorTable = new mf.Table("#VendorTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionVendorBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#VendorNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetManufacturerList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.VendorNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.TextRander()
            }
        ]
    });
    $("#VendorSearch").click(function () {
        VendorTable.loadData(null, null, 1);
    });

    //分類一列表
    var ClassOneTable = new mf.Table("#ClassOneTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionClassOneBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ClassOneNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetClassList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code, type: "EMS" },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ClassNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ClassDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(statuslist),
            }
        ]
    });
    $("#ClassOneSearch").click(function () {
        ClassOneTable.loadData(null, null, 1);
    });

    //分類二列表
    var ClassTwoTable = new mf.Table("#ClassTwoTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionClassTwoBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ClassTwoNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetClassList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code, type: "EMS" },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ClassNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ClassDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(statuslist),
            }
        ]
    });
    $("#ClassTwoSearch").click(function () {
        ClassTwoTable.loadData(null, null, 1);
    });

    //保管部门列表
    var OrganizationTable = new mf.Table("#OrganizationTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionOrganizationBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#DepartmentNo").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetDeptList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.DepartmentNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DepartmentNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.AutoSelectRander("value", "text", statuslist, { title: true })
            }
        ]
    });
    $("#OrganizationSearch").click(function () {
        OrganizationTable.loadData(null, null, 1);
    });

    //设备主档
    var table = new mf.Table("#EMS00001Table", {
        uniqueId: "EquipmentID",
        deleteId: "EquipmentID",
        focusField: "Code",
        focusEditField: "Status",
        height: window.innerHeight - 145,
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00001GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            $("#btn_save").attr("disabled", true);
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00001Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    $("#btn_save").attr("disabled", false);
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00001Delete',
                data: JSON.stringify({ EquipmentID:rowData.EquipmentID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 6, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EquipmentCodeIsNull)
                ]
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 15, maxLength: 60, title: true }))
            },
            {
                field: 'ResourceCategory', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ResourceCategoryCode', title: fields.AssetClass, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#SourceClassDialog",
                    "#SourceClassConfirmBtn",
                    SourceClassTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#SourceClassCode", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ResourceCategory", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ResourceCategoryCode", e.data.Code);
                }
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(parameters.PT0191213000001),
            },
            {
                field: 'Condition', title: fields.MechanicalCondition, align: "center", width: "100",
                //rander: new mf.AutoSelectRander(
                //    "value", "text", parameters.PT0191213000055,
                //    {
                //        title: true,
                //        fn_onSetEditingValue: function (value) {
                //            var list = [];
                //            if (value.substring(5, value.length) == "0201213000021" || value.substring(5, value.length) == "0201213000024" || value.substring(5, value.length) == "0201213000025") {
                //                list = ConditionUsed;
                //            }
                //            else if (value.substring(5, value.length) == "0201213000022") {
                //                list = CalledRepair;
                //            }
                //            else if (value.substring(5, value.length) == "0201213000023") {
                //                list = Repairing;
                //            }
                //            return list;
                //        }
                //    })
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000055, { title: true }),
                defaultValue:ConditionValue
            },
            {
                field: 'AbnormalStatus', title: fields.AbnormalStatus, align: "center", width: "80",
                rander: new mf.SelectRander([{ value: 0, text: fields.Normal }, { value: 1, text: fields.Abnormal }]),
            },
            {
                field: 'FixedAssets', title: fields.FixedAssetCode, align: "center", width: "100",
                rander: new mf.TextRander({ size: 7, maxLength: 20, title: true })
            },
            {
                field: 'PlantAreaID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'PlantID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'PlantAreaCode', title: fields.FactoryCode, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#PlantAreaDialog",
                    "#PlantAreaConfirmBtn",
                    PlantAreaTable,
                    new mf.TextRander({ size: 8, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#FactoryCode", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "PlantAreaID", e.data.PlantAreaID);
                    table.setEditingColumnValue($row, "PlantID", e.data.PlantID);
                    table.setEditingColumnValue($row, "PlantAreaCode", e.data.Code);
                    table.setEditingColumnValue($row, "PlantAreaName", e.data.Name);
                    table.setEditingColumnValue($row, "PlantCode", e.data.PlantCode);
                    table.setEditingColumnValue($row, "PlantName", e.data.PlantName);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.FactoryCodeIsNull)
                ]
            },
            {
                field: 'PlantAreaName', title: fields.FactoryDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'PlantCode', title: fields.SiteCode, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'PlantName', title: fields.SiteDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 15, maxLength: 120, title: true })),
            },
            {
                field: 'PurchaseDate', title: fields.PurchaseDate, align: "center", width: "120",
                rander: new mf.DateRander()
            },
            {
                field: 'ManufacturerID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ManufacturerCode', title: fields.Manufacturer, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#VendorDialog",
                    "#VendorConfirmBtn",
                    VendorTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#VendorNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ManufacturerID", e.data.ManufacturerID);
                    table.setEditingColumnValue($row, "ManufacturerCode", e.data.Code);
                    table.setEditingColumnValue($row, "ManufacturerName", e.data.Name);
                }
            },
            {
                field: 'ManufacturerName', title: fields.ManufacturerName, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'ExpireDate', title: fields.ExpireDate, align: "center", width: "120",
                rander: new mf.DateRander()
            },
            {
                field: 'Model', title: fields.Model, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, maxLength: 60, title: true })
            },
            {
                field: 'MachineNo', title: fields.MachineNo, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, maxLength: 60, title: true })
            },
            {
                field: 'ClassOne', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ClassOneCode', title: fields.EquipmentCategoryOne, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#ClassOneDialog",
                    "#ClassOneConfirmBtn",
                    ClassOneTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ClassOneNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassOne", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ClassOneCode", e.data.Code);
                }
            },
            {
                field: 'ClassTwo', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ClassTwoCode', title: fields.EquipmentCategoryTwo, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#ClassTwoDialog",
                    "#ClassTwoConfirmBtn",
                    ClassTwoTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ClassTwoNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ClassTwo", e.data.ParameterID);
                    table.setEditingColumnValue($row, "ClassTwoCode", e.data.Code);
                }
            },
            {
                field: 'StdCapacity', title: fields.StandardCapacity, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 20, title: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.StandardCapacityIsIncorrect)
                ]
            },
            {
                field: 'TotalOutput', title: fields.CumulativeOutput, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 6, maxLength: 16, title: true, disabled: true }),
                defaultValue: 0
            },
            {
                field: 'UsedTime', title: fields.UsedTime, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 6, maxLength: 16, title: true, disabled: true }),
                defaultValue: 0
            },
            {
                field: 'UsableTime', title: fields.UsableTime, align: "center", width: "100",
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                defaultValue: 0,
                checkers: [
                    new mf.TextNotEmptyChecker(fields.UsableTimeIsIncorrect),
                    new mf.IsNonNegativeNumberChecker(fields.UsableTimeIsIncorrect)
                ]
            },
            {
                field: 'CavityMold', title: fields.ModlsCount, align: "center", width: "100",
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                defaultValue: 0,
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ModlsCountIsIncorrect),
                    new mf.IsNonNegativeNumberChecker(fields.ModlsCountIsIncorrect)
                ]
            },
            {
                field: 'UsedTimes', title: fields.UsedTimes, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 6, maxLength: 16, title: true, disabled: true }),
                defaultValue: 0
            },
            {
                field: 'UsableTimes', title: fields.UsableTimes, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                defaultValue: 0,
                checkers: [
                    new mf.TextNotEmptyChecker(fields.UsableTimesIsIncorrect),
                    new mf.IsNonNegativeNumberChecker(fields.UsableTimesIsIncorrect)
                ]
            },
            {
                field: 'StatisticsFlag', title: fields.StatisticsFlag, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", statisticsFlag, { title: true, IsBoolean: true })
            },
            {
                field: 'OrganizationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'OrganizationCode', title: fields.CustodyDepartment, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#OrganizationDialog",
                    "#OrganizationConfirmBtn",
                    OrganizationTable,
                    new mf.TextRander({ size: 8, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#DepartmentNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "OrganizationID", e.data.OrganizationID);
                    table.setEditingColumnValue($row, "OrganizationCode", e.data.Code);
                    table.setEditingColumnValue($row, "OrganizationName", e.data.Name);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CustodyDepartmentIsNull)
                ]
            },
            {
                field: 'OrganizationName', title: fields.CustodyDepartmentName, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, disabled: "disabled", title: "title" })
            },
            {
                field: 'MaintenanceTime', title: fields.MaintenanceTime, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.MaintenanceTimeIsIncorrect),
                    new mf.IsNonNegativeNumberChecker(fields.MaintenanceTimeIsIncorrect)
                ]
            },
            {
                field: 'MaintenanceNum', title: fields.MaintenanceNum, align: "center", width: "100", defaultValue: 0,
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.MaintenanceNumIsIncorrect),
                    new mf.IsNonNegativeNumberChecker(fields.MaintenanceNumIsIncorrect)
                ]
            },
            {
                field: 'DescriptionOne', title: fields.DescriptionOne, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, title: "title" })
            },
            {
                field: 'DescriptionTwo', title: fields.DescriptionTwo, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, title: "title" })
            },
            {
                field: 'DateOne', title: fields.DateOne, align: "center", width: "120",
                rander: new mf.DateRander()
            },
            {
                field: 'DateTwo', title: fields.DateTwo, align: "center", width: "120",
                rander: new mf.DateRander()
            },
            {
                field: 'NumOne', title: fields.NumberOne, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.NumberOneIsIncorrect)
                ]
            },
            {
                field: 'NumTwo', title: fields.NumberTwo, align: "center", width: "100", 
                rander: new mf.TextRander({ size: 6, maxLength: 10, title: true }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.NumberTwoIsIncorrect)
                ]
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    table.loadData();

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    // 刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForword(function () {
            window.location.reload();
        }, function () {
            window.location.reload();
        });
    };

    // 添加
    this.addClick = function () {
        if (!table) {
            return;
        }
        table.addRow();
    }

    // 编辑
    this.editClick = function () {
        if (!table) {
            return;
        }
        table.editRow();
    };

    // 删除
    this.deleteClick = function () {
        if (!table) {
            return;
        }
        table.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }
        table.save(null, null, true);
    };

    //语序
    this.languagesClick = function () {
        if (!table) {
            return;
        }

        var row = table.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
        }

        if (!(row.EquipmentID && row.EquipmentID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.EquipmentCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 170px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.EquipmentDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
          {
              field: 'Name',
              title: fields.EquipmentDescription,
              halign: 'center',
              align: 'center',
              width: "150",
              require: true
          },
          {
              field: 'Comments',
              title: fields.Remark,
              halign: 'center',
              align: 'center',
              width: "150"
          }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "45",
            rowID: row.EquipmentID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#EMS00001Table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Ems00001Export?Token=' + token;

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (formData.Status() && formData.Status().length > 0) {
                exportUrl = exportUrl + '&Status=' + formData.Status();
            }

            window.location.href = exportUrl;
        });
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
                url: window.top.mf.domain + '/MES/api/ImportFile/Ems00001Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    $("#BtnImport").attr("disabled", false);                  
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            table.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    }
                    else {
                        msg.error(fields.Prompt, ret.msg);
                    }
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Normal", "Invalid", "Cancel", "Browse", "Comfirm", "LanguageCode", "IsDefault",
    "PleaseSelectLanguage", "PleaseFillLanguageContent", "LanguageRepeats", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "EquipmentCode", "EquipmentDescription", "AssetClass", "MechanicalCondition", "FixedAssetCode", "SourceClass",
    "FactoryCode", "FactoryDescription", "SiteCode", "SiteDescription", "PurchaseDate", "Manufacturer",
    "ManufacturerName", "ExpireDate", "Model", "MachineNo", "EquipmentCategoryOne", "EquipmentCategoryTwo",
    "StandardCapacity", "CumulativeOutput", "UsedTime", "UsableTime", "ModlsCount", "UsedTimes",
    "UsableTimes", "StatisticsFlag", "CustodyDepartment", "CustodyDepartmentName", "MaintenanceTime",
    "MaintenanceNum", "DescriptionOne", "DescriptionTwo", "DateOne", "DateTwo", "NumberOne", "NumberTwo",
    "EquipmentPicture", "EquipmentCodeIsNull", "FactoryCodeIsNull", "CustodyDepartmentIsNull",
    "SourceClassNumber", "SourceClassDescription", "SourceClassNumberIsNull", "SourceClassDescriptionIsNull",
    "SiteInformation", "VendorInformation", "VendorNo", "VendorDescription", "ClassMasterFile", "ClassNo",
    "ClassDescription", "CumulativeOutputIsIncorrect", "UsableTimeIsIncorrect", "ModlsCountIsIncorrect",
    "UsableTimesIsIncorrect", "DepartmentFile", "DepartmentDescription", "DepartmentNo","Abnormal",
    "NumberOneIsIncorrect", "NumberTwoIsIncorrect", "AbnormalStatus", "Manufacturer","info"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000013,0191213000055" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};