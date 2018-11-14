var viewModel = function () {
    var self = this;
    var Namearry = [], ID = null, RecordsID = null, ServiceReasonLogID = null;

    //设置状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            var Listdata = data.PT0191213000004;
            for (var i = 0; i < Listdata.length; i++) {                
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                if (Listdata[i].value.substring(5, Listdata[i].value.length) != "020121300002B" && Listdata[i].value.substring(5, Listdata[i].value.length) != "0201213000028") {
                    $("#Status").append("<option value='" + Listdata[i].value + "'>" + Listdata[i].Newvalue + "</option>");
                }             
            }
        }
    });


    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };
    // 刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    // 编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };

    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };

    //显示叫修原因   
    this.CalledRepairClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        ID = row.CalledRepairOrderID;
        RepairReasonTable.loadData();
        var Date = row.Date;
        Date = Date.substring(0, 10);

        $("#CalledRepairNo").val(row.Code);
        $("#DocumentDate").val(Date);
        $("#CallEquipmentCode").val(row.EquipmentCode);
        $('#CalledRepairReasonDialog').modal("show");
    };

    //显示维修记录  
    this.RecordsClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);        
        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        RecordsID = row.CalledRepairOrderID;
        ServiceReasonLogID = null;
        recordsTable.loadData();
        DetailsTable.loadData();
        //DetailsTable.loadData();
        var Date = row.Date;
        Date = Date.substring(0, 10);

        $("#recordsCalledRepairNo").val(row.Code);
        $("#recordsDocumentDate").val(Date);
        $("#recordsCallEquipmentCode").val(row.EquipmentCode);
        $("#recordsCalledRepairNo").attr("title", row.Code);
        $("#recordsCallEquipmentCode").attr("title", row.EquipmentCode);
        $('#recordsDialog').modal("show");
    };

    //设置叫修原因表格
    var RepairReasonTable = new mf.Table("#RepairReasonTable", {
        uniqueId: "CalledRepairReasonID",
        paginationBar: new mf.PaginationBar("#paginagionRepairReasonBar"),
        LastWidth: "145",
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00004GetReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, CalledRepairOrderID: ID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {;
        },
        height: 300,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonNo, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DealWithDescription', title: fields.DealWithDescription, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    });

    //设置维修记录表头表格
    var recordsTable = new mf.Table("#recordsTable", {
        uniqueId: "ServiceReasonLogID",
        paginationBar: new mf.PaginationBar("#paginagionrecordsBar"),
        LastWidth: "177",
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00005GetServiceList',
                data: ({ page: pagination.page, rows: pagination.rows, CalledRepairOrderID: RecordsID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {;
        },
        fn_onRowClick: function (row) {
            ServiceReasonLogID = row.ServiceReasonLogID;
            DetailsTable.loadData();
        },
        height: 170,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonNo, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DealWithDescription', title: fields.DealWithDescription, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    });

    var DetailsTable = new mf.Table("#DetailsTable", {
        uniqueId: "SRLDID",
        paginationBar: new mf.PaginationBar("#paginagiondetailsBar"),
        LastWidth: "130",
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00005GetServiceDetailsList',
                data: ({ page: pagination.page, rows: pagination.rows, ServiceReasonLogID: ServiceReasonLogID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {;
        },
        height: 200,
        columns: [
            {
                field: 'MESUserCode', title: fields.Handler, require: true, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'OrganizationCode', title: fields.Handledept, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ManufacturerCode', title: fields.HandleVendor, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsFee', title: fields.IsFee, align: "center", width: "80",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
            },
            {
                field: 'StartTime', title: fields.StartTime, align: "center", width: "140",
                rander: new mf.TextTimeRander({ title:true }),
            },
            {
                field: 'EndTime', title: fields.EndTime, align: "center", width: "140",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Hour', title: fields.HandleHour, align: "center", width: "80",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Description', title: fields.HandleContent, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Creator', title: fields.CreateDocumentStaff, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreateDocumentDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    //设置表格
    var table = new mf.Table("#EMS00006Table", {
        uniqueId: "CalledRepairOrderID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        editable: true,
        LastWidth: "90",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00006GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Status: Status }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00006Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_checkeditable: function ($selectedRow) {
            var row = table.getRowData($selectedRow);
            if (row.IsClose) {
                return true;
            }
            else {
                return false;
            }
        },
        isFrozenColumn: true,
        operateColumWidth: "150px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:150px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="CalledRepairClick" style="width:67px;" onclick="model.CalledRepairClick(this)" title="' + fields.CalledRepairReason + '" >' + (fields.CalledRepairReason.length > 9 ? fields.CalledRepairReason.substring(0, 9) + "..." : fields.CalledRepairReason) + '</button>&nbsp;&nbsp;' +
                       '<button id="recordsClick" class="btn btn-success btn-xs" style="margin-right: 5px; width:67px;" onclick="model.RecordsClick(this)"  title="' + fields.MaintenanceRecords + '" >' + (fields.MaintenanceRecords.length > 9 ? fields.MaintenanceRecords.substring(0, 9) + "..." : fields.MaintenanceRecords) + '</button>');
            return $td;
        },
        focusField: "IsClose",
        focusEditField: "IsClose",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.CalledRepairNo, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Date', title: fields.DocumentDate, align: "center", width: "100",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'EquipmentManufacturerCode', title: fields.Vendor, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CallMESUserCode', title: fields.CalledClerk, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CallMESUserName', title: fields.CalledClerkName, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CallOrganizationCode', title: fields.CalledClerkDept, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CallOrganizationName', title: fields.DepartmentName, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'PlantName', title: fields.Site, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'PlantAreaName', title: fields.Factory, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MESUserCode', title: fields.Principal, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MESUserName', title: fields.Name, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'InOutRepair', title: fields.InnerOuterRepair, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptCode', title: fields.ServiceDepartment, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DeptName', title: fields.DepartmentName, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ManufacturerCode', title: fields.MaintenanceVendor, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ManufacturerName', title: fields.VendorName, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsClose', title: fields.Isclose, align: "center", width: "70",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
            },
            {
                field: 'CloseDate', title: fields.ClosingDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'CloseMESUserCode', title: fields.ClosingStaff, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(Namearry)),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

}

var URL = "/MES/EquipmentManagement/EMS00006";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "CalledRepairNo", "Status", "EquipmentCode", "BeginEquipmentCode", "EndEquipmentCode", "Comfirm", "Cancel",
    "AccountMaster", "StartAccount", "EndAccount", "EquipmentCode", "EquipmentDescription", "Remark", "AccountNo",
    "Name", "DepartmentNo", "DepartmentName", "CalledRepairNo", "DocumentDate", "Vendor", "CalledClerk", "CalledClerkName",
    "CalledClerkDept", "DepartmentName", "Site", "Factory", "Principal", "ModifyVendor", "InnerOuterRepair", "Name",
    "VendorName", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Search", "CalledRepairNoIsNull",
    "DocumentDateIsNull", "EquipmentCodeIsNull", "ClosingDate", "ClosingStaff", "ReasonMaster", "GroupDescription",
    "ReasonDescription", "CalledRepairReason", "Cancel", "Add", "Change", "Deletion", "ReasonGroupCode", "GroupDescription",
    "ReasonNo", "ReasonDescription", "GroupDescription", "DealWithDescription", "Invalid", "Normal", "AddCalledRepairOrder",
    "Save", "info", "CodeAndNameIsNull", "StatusIs", "Isnotedit", "EquipmentIsRepair", "MaintenanceRecords", "Isclose",
    "PleaseSelectRecord", "MaintenancedealRecords", "Handler", "Handledept", "HandleVendor", "IsFee", "StartTime",
    "EndTime", "HandleHour", "HandleContent", "CreateDocumentStaff", "CreateDocumentDate", "ServiceDepartment", "MaintenanceVendor"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};