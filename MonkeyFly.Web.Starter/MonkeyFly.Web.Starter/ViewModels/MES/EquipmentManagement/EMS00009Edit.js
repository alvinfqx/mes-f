var URL = "/MES/EquipmentManagement/EMS00009Edit";
var PageParameters = window.top.page_parameters.GetParameters(URL);
var rowData = PageParameters.RowData;

mf.ajax({
    type: "get",
    url: "/MES/api/EquipmentManagement/Ems00009GetEquDetailList",
    data: { EquipmentMaintenanceListID: rowData.EquipmentMaintenanceListID, MaintenanceOrderID: rowData.MaintenanceOrderID },
    success: function (data) {
        
        var html = "<div>";
        for (var i = 0; i < data.length; i++) {
            if (data[i].Selected==1)
            {
                if (data[i].EquipmentName) {
                    var Length = data[i].EquipmentCode.length + data[i].EquipmentName.length;
                    html += '<label class="checkbox-inline i-checks" style="width:25.96%;">' +
                        '<input type="checkbox" name="equipments" style="margin-top: 0 !important;" value="' + data[i].EquipmentID + '" checked><span  style="width:60px;" title="' + data[i].EquipmentCode + "-" + data[i].EquipmentName + '">' + (Length > 20 ? data[i].EquipmentCode.substring(0, 10) + "..." + "-" + data[i].EquipmentName.substring(0, 9) + "..." : data[i].EquipmentCode + "-" + data[i].EquipmentName) + '</span></label>';
                }
                else {
                    html += '<label class="checkbox-inline i-checks" style="width:25.96%;"><input type="checkbox" name="equipments" style="margin-top: 0 !important;" value="' + data[i].EquipmentID + '" checked><span  style="width:60px;" title=" ' + data[i].EquipmentCode + '"></span></label>';
                }
            }
            else
            {
                if (data[i].EquipmentName) {
                    var Length = data[i].EquipmentCode.length + data[i].EquipmentName.length;
                    html += '<label class="checkbox-inline i-checks" style="width:25.96%;"><input type="checkbox" name="equipments" style="margin-top: 0 !important;" value="' + data[i].EquipmentID + '"><span  style="width:60px;" title="' + data[i].EquipmentCode + "-" + data[i].EquipmentName + '">' + (Length > 20 ? data[i].EquipmentCode.substring(0, 10) + "..." + "-" + data[i].EquipmentName.substring(0, 9) + "..." : data[i].EquipmentCode + "-" + data[i].EquipmentName) + '</span></label>';
                }
                else {
                    html += '<label class="checkbox-inline i-checks" style="width:25.96%;"><input type="checkbox" name="equipments" style="margin-top: 0 !important;" value="' + data[i].EquipmentID + '"><span  style="width:60px;" title=" "></span></label>';
                }                
            }
            if ((i + 1) % 3 == 0) {
                html += '</div><div style="padding-top:4px;">';
            }
        }
        $('#Equipments').html(html);
        $("#Equipments .i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
    }
});

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var MUID, MFID, MOID,ParameterID;

    $("#EditMaintenanceDate").datetimepicker({
        language: "zh-tw",
        autoclose: true,
        todaybtn: true,
        minView: 3,
        format: "yyyy-mm-dd"
    });

    $("#EditCreateDocumentStaff").val(rowData.Creator);
    $("#EditModate").val(rowData.Date.split("T", 1));
    //$("#EditDocumentCategory").val(rowData.Type);
    $("#EditMaintenanceNo").val(rowData.MaintenanceNo);
    $("#EditMaintenanceDate").val(rowData.MaintenanceDate.split("T", 1));
    $("#Status").text(rowData.StatusName).val(rowData.Status);
    $("#EditMaintenanceList").val(rowData.ListCode)
    $("#EditTypeDesc").val(rowData.Type)
    $("#EditMaintenanceSupplier").val(rowData.ManufacturerName)
    $("#EditPrincipal").val(rowData.MESUserName);
    $("#Remark").val(rowData.Comments);
    MUID = rowData.MESUserID;
    MFID = rowData.ManufacturerID;
    MOID = rowData.MaintenanceOrderID;

    //负责人
    var PrincipalTable = new mf.Table("#PrincipalTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionPrincipalBar"),
        fn_getData: function (pagination, searchData, success) {
            var DeptCode = $("#DeptCode").val();
            var DeptDesc = $("#DeptDesc").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Ems00009GetUserList',
                data: { OrganizationCode: DeptCode, OrganizationName: DeptDesc, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'OrganizationName', title: fields.DepartmentDescription, align: "center", width: "130",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: '', title: '',
                ranser: new mf.PlaceholderRander()
            }
        ]
    });
    $("#PrincipalSearch").click(function () {
        PrincipalTable.loadData(null, null, 1);
    });
    $("#PrincipalConfirmBtn").click(function () {
        var row = PrincipalTable.getSelectedData();
        console.log(row);

        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#EditPrincipal").val(row.UserName);
        MUID = row.MESUserID;
        $("#PrincipalDialog").modal('hide');
    });
    $("#PrincipalOpen").click(function () {
        $("#DeptCode").val("");
        $("#DeptDesc").val("");
        PrincipalTable.loadData();
        $("#PrincipalDialog").modal({ backdrop: 'static', keyboard: false });
        $("#PrincipalDialog").modal('show');
    });

    //保养厂商
    var ManufacturerTable = new mf.Table("#ManufacturerTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionManufacturerBar"),
        fn_getData: function (pagination, searchData, success) {
            var ManufacturerCode = $("#ManufacturerCode").val();
            var ManufacturerDesc = $("#ManufacturerDesc").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetManufacturerList',
                data: { Code: ManufacturerCode, Name: ManufacturerDesc, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.VendorNo, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: '', title: '',
                ranser: new mf.PlaceholderRander()
            }
        ]
    });
    $("#ManufacturerSearch").click(function () {
        ManufacturerTable.loadData(null, null, 1);
    });
    $("#ManufacturerConfirmBtn").click(function () {
        var row = ManufacturerTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#EditMaintenanceSupplier").val(row.Name);
        MFID = row.ManufacturerID;
        $("#ManufacturerDialog").modal('hide');
    });
    $("#ManufacturerOpen").click(function () {
        $("#ManufacturerCode").val("");
        $("#ManufacturerDesc").val("");
        ManufacturerTable.loadData();
        $("#ManufacturerDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ManufacturerDialog").modal('show');
    });

    //保养类型
    var MaintenanceTypeTable = new mf.Table("#MaintenanceTypeTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionMaintenanceTypeBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID: "000023", page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.MaintenanceType, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.Description, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: '', title: '',
                ranser: new mf.PlaceholderRander()
            }
        ]
    });
    $("#MaintenanceTypeConfirmBtn").click(function () {
        var row = MaintenanceTypeTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#EditTypeDesc").val(row.Name);
        ParameterID=row.ParameterID;
        $("#MaintenanceTypeDialog").modal('hide');
    });
    $("#MaintenanceTypeOpen").click(function () {
        MaintenanceTypeTable.loadData();
        $("#MaintenanceTypeDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MaintenanceTypeDialog").modal('show');
    });

    //保养清单
    var MaintenanceListTable = new mf.Table("#MaintenanceListTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionMaintenanceListBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00009GetEquMaiList',
                data: { Type: ParameterID, page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.MaintenanceLists, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.MaintenanceListsDescription, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: '', title: '',
                ranser: new mf.PlaceholderRander()
            }
        ]
    });
    $("#MaintenanceListSearch").click(function () {
        MaintenanceListTable.loadData(null, null, 1);
    });
    $("#MaintenanceListConfirmBtn").click(function () {
        var row = MaintenanceListTable.getSelectedData();
        console.log(row);
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#EditMaintenanceList").val(row.Name);
        $("#Equipments").html("");
        $("#MaintenanceListDialog").modal('hide');
        mf.ajax({
            type: "get",
            url: "/MES/api/EquipmentManagement/Ems00009GetEquMaiDetailList",
            data: { EquipmentMaintenanceListID: row.EquipmentMaintenanceListID },
            success: function (data) {
                console.log("设备："+JSON.stringify(data));
                var html = "<div>";
                for (var i = 0; i < data.length; i++) {

                    html += '<label class="checkbox-inline i-checks" style="width:25.96%;"><input type="checkbox" name="equipments" style="margin-top: 0 !important;" value="' + data[i].EquipmentID + '" ><span  style="width:60px;" title="' + data[i].EquipmentName + '">' + (data[i].EquipmentName.length > 5 ? data[i].EquipmentName.substring(0, 5) + "..." : data[i].EquipmentName) + '</span></label>';
                    if ((i + 1) % 3 == 0) {
                        html += '</div><div style="padding-top:4px;">';
                    }
                }
                $('#Equipments').html(html);
                $("#Equipments .i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
            }
        });
    });
    $("#MaintenanceListOpen").click(function () {
        MaintenanceListTable.loadData();
        $("#MaintenanceListDialog").modal({ backdrop: 'static', keyboard: false });
        $("#MaintenanceListDialog").modal('show');
    });

    // 返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({
            URL: PageParameters.TopBackURL,
            Parameters: PageParameters.TopMID
        });
        window.location.href = PageParameters.TopBackURL;
    }

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
        window.location.reload();
    };

    //保存
    this.saveClick = function () {

        if (!(MUID && MUID.length > 0)) {
            msg.info(fields.Prompt, fields.MESUserIDIsNull);
            return;
        }
        var selected = $('input[name="equipments"]:checkbox:checked');
        if (selected.length == 0) {
            msg.info(fields.Prompt, fields.EquipmentsIsNull);
            return;
        }
        var EquipmentIDs = "";
        for (var i = 0; i < selected.length; i++) {
            EquipmentIDs += $(selected[i]).val() + ",";
        }
        EquipmentIDs = EquipmentIDs.substring(0, EquipmentIDs.length - 1);
        var Remark = $("#Remark").val();
        var MD = $("#EditMaintenanceDate").val();
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009Update",
            data: JSON.stringify({
                MaintenanceDate:MD,
                ManufacturerID: MFID,
                MESUserID: MUID,
                Comments: Remark,
                MaintenanceOrderID: MOID,
                EquipmentIDs: EquipmentIDs
            }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        self.backClick();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "MaintenanceType", "MaintenanceEquipment", "MaintenanceUser", "StartMaintenanceNo",
    "EndMaintenanceNo", "StartMaintenanceDate", "EndMaintenanceDate", "DocumentStatus",
    "MaintenanceTypeMaster", "CategoryCode", "CategoryDec", "Invalid", "Issued", "MaintenanceNo",
    "MaintenanceDate", "MaintenanceList", "MaintenanceDept", "MaintenanceSupplier", "ResponsibleWorkNumber",
    "MaintenanceItem", "DocumentDate", "Name", "TypeDesc", "EquipmentCode", "EquipmentDescription",
    "CustodyDepartment", "Model", "ExpireDate", "CreateDocumentStaff", "Isleave", "Modate",
    "DocumentCategory", "Equipment", "Back", "Refresh", "Save", "Principal", "AccountMaster",
    "DepartmentNo", "DepartmentDescription", "WorkNumber", "VendorMasterFile", "VendorNo",
    "VendorDescription", "Description", "MaintenanceTypeMaster", "MaintenanceListMasterFile",
    "MaintenanceDateIsNull", "MESUserIDIsNull", "MaintenanceTypeIsNull", "MaintenanceListIsNull",
    "MaintenanceLists", "MaintenanceListsDescription", "EquipmentsIsNull"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,0191213000023" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};