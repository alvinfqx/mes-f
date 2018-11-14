var URL = "/MES/EquipmentManagement/EMS00009Add";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var now = new Date();
var date = mf.deal.formatDate(now, "yyyy-MM-dd");
var MaintenanceNo = "";

mf.deal.InitDateList("MaintenanceDate");

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;

    var formData = {
        CreateDocumentStaff: ko.observable(username),
        Modate: ko.observable(date),
        DocumentCategory: ko.observable("EMSB"),
        MaintenanceNo: ko.observable(MaintenanceNo),
        MaintenanceDate: ko.observable(date),
        PrincipalName: ko.observable(""),
        MaintenanceSupplier: ko.observable(""),
        TypeDesc: ko.observable(""),
        MaintenanceList: ko.observable(""),
        Status: ko.observable(""),
        Remark: ko.observable(""),
        DocumentStatusList: ko.observableArray([parameters.PT0191213000004[0]]),
        MESUserID: ko.observable(""),
        ManufacturerID: ko.observable(""),
        Type: ko.observable(""),
        MaintenanceListID: ko.observable(""),
        OrganizationID: ko.observable("")
    };
    ko.applyBindings(formData);

    //获取单据类别
    mf.ajax({
        type: 'get',
        async: false,
        url: "/MES/api/EquipmentManagement/Ems00009GetTypeList",
        data: {},
        success: function (data) {
            console.log("单据类别" + JSON.stringify(data))
            if (data) {               
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        $("#AddDocumentCategory").append("<option value='" + data[i].value + "' selected>" + data[i].Code + "</option>");
                    } else {
                        $("#AddDocumentCategory").append("<option value='" + data[i].value + "'>" + data[i].Code + "</option>");
                    }
                }
            }
       
        }
    });

 

    //修改时间格式
    $("#AddMaintenanceDate").datetimepicker({
        language: "zh-tw",
        autoclose: true,
        todaybtn: true,
        minView: 3,
        format: "yyyy-mm-dd"
    });

    //新增取号
    this.getAutoNumber = function () {
        var DID = $("#AddDocumentCategory").val();
        var data = $("AddModate").val();
        mf.ajax({
            type: 'get',
            async: false,
            url: "/MES/api/Util/GetDocumentAutoNumber",
            data: {DocumentID:DID,Date:date},
            success: function (data) {
                console.log(data);
                $("#AddMaintenanceNo").val(data.AutoNumber);
                $("#AddMaintenanceNoID").val(data.DocumentAutoNumberID)
                //MaintenanceNo = data;
            }
        });
    }

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
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'OrganizationName', title: fields.DepartmentDescription, align: "center", width: "130",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'UserName', title: fields.Name, align: "center", 
                rander: new mf.TextRander({ title: true })
            }
        ]
    });
    $("#PrincipalSearch").click(function () {
        PrincipalTable.loadData(null, null, 1);
    });
    $("#PrincipalConfirmBtn").click(function () {
        var row = PrincipalTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        formData.OrganizationID(row.OrganizationID);
        formData.PrincipalName(row.UserName);
        formData.MESUserID(row.MESUserID);
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
                field: 'Name', title: fields.VendorDescription, align: "center", 
                rander: new mf.TextRander({ title: true })
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
        formData.MaintenanceSupplier(row.Name);
        formData.ManufacturerID(row.ManufacturerID);
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
                field: 'Name', title: fields.Description, align: "center",
                rander: new mf.TextRander({ title: true })
            }
        ]
    });
    $("#MaintenanceTypeConfirmBtn").click(function () {
        var row = MaintenanceTypeTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        formData.TypeDesc(row.Code);
        formData.Type(row.ParameterID);
        formData.MaintenanceList("");
        formData.MaintenanceListID("");
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
                data: { Type: formData.Type(), page: pagination.page, rows: pagination.rows },
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
                field: 'Name', title: fields.MaintenanceListsDescription, align: "center",
                rander: new mf.TextRander({ title: true })
            }
        ]
    });
    $("#MaintenanceListSearch").click(function () {
        MaintenanceListTable.loadData(null, null, 1);
    });
    $("#MaintenanceListConfirmBtn").click(function () {
        var row = MaintenanceListTable.getSelectedData();
        console.log(JSON.stringify(row));
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        formData.MaintenanceList(row.Name);
        formData.MaintenanceListID(row.EquipmentMaintenanceListID);
        $("#Equipments").html("");
        $("#MaintenanceListDialog").modal('hide');
        mf.ajax({
            type: "get",
            url: "/MES/api/EquipmentManagement/Ems00009GetEquMaiDetailList",
            data: { EquipmentMaintenanceListID: row.EquipmentMaintenanceListID },
            success: function (data) {
                var html = "<div>";
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var Length = data[i].EquipmentCode.length + data[i].EquipmentName.length;
                    if (Length > 0) {
                        html += '<label class="checkbox-inline i-checks" style="width:25.33%;"><input type="checkbox" name="equipments" style="margin-top: 0 !important;" value="' + data[i].EquipmentID + '" ><span  style="width:60px;" title="' + data[i].EquipmentCode + "-" + data[i].EquipmentName + '">' + (Length > 20 ? data[i].EquipmentCode.substring(0, 9) + "..." + "-" + data[i].EquipmentName.substring(0, 9) + "..." : data[i].EquipmentCode + "-" + data[i].EquipmentName) + '</span></label>';
                    }                   
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
        msg.warning(fields.Prompt, fields.Isleave, function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.TopBackURL,
                Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.TopBackURL;
        }, null);
      
    }

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
        window.location.reload();
    };

    //保存
    this.saveClick = function () {
        $("#addSave").attr("disabled", true);
        var MaintenanceDate = formData.MaintenanceDate();
        if (!(MaintenanceDate && MaintenanceDate.length > 0)) {
            msg.info(fields.Prompt, fields.MaintenanceDateIsNull);
            $("#addSave").attr("disabled", false);
            return;
        }
        var MESUserID = formData.MESUserID();
        if (!(MESUserID && MESUserID.length > 0)) {
            msg.info(fields.Prompt, fields.MESUserIDIsNull);
            $("#addSave").attr("disabled", false);
            return;
        }
        var Type = formData.Type();
        if (!(Type && Type.length > 0)) {
            msg.info(fields.Prompt, fields.MaintenanceTypeIsNull);
            $("#addSave").attr("disabled", false);
            return;
        }
        var EquipmentMaintenanceListID = formData.MaintenanceListID();
        if (!(EquipmentMaintenanceListID && EquipmentMaintenanceListID.length > 0)) {
            msg.info(fields.Prompt, fields.MaintenanceListIsNull);
            $("#addSave").attr("disabled", false);
            return;
        }
        var selected = $('input[name="equipments"]:checkbox:checked');
        if (selected.length == 0) {
            msg.info(fields.Prompt, fields.EquipmentsIsNull);
            $("#addSave").attr("disabled", false);
            return;
        }

        var addD = $("#AddDocumentCategory").val();
        if (!addD) {
            msg.info(fields.Prompt, fields.DocumentCategoryIsNull);
            $("#addSave").attr("disabled", false);
            return;
        }

        var EquipmentIDs = "";
        for (var i = 0; i < selected.length; i++) {
            EquipmentIDs += $(selected[i]).val() + ",";
        }
        EquipmentIDs = EquipmentIDs.substring(0, EquipmentIDs.length - 1);

        //var Date = formData.Modate();
        //var Comments = formData.Remark();
        //var MaintenanceNo = formData.MaintenanceNo();
        var OrganizationID = formData.OrganizationID();
        var ManufacturerID = formData.ManufacturerID();
        var Type = formData.Type();
        var MN = $("#AddMaintenanceNo").val();
        var Md = $("#AddModate").val();
        var MD = $("#AddMaintenanceDate").val();
        var Status = $("#Status").val();
        var Remark = $("#Remark").val();
        var DANID = $("#AddMaintenanceNoID").val();
        
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009Add",
            data: JSON.stringify({
                MaintenanceNo: MN,
                Date: Md,
                Type: Type,
                MaintenanceDate: MD,
                EquipmentMaintenanceListID: EquipmentMaintenanceListID,
                OrganizationID: OrganizationID,
                ManufacturerID: ManufacturerID,
                MESUserID: MESUserID,
                Status: Status,
                Comments: Remark,
                EquipmentIDs: EquipmentIDs,
                DocumentAutoNumberID:DANID
            }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        window.top.page_parameters.Caching.push({
                            URL: PageParameters.TopBackURL,
                            Parameters: PageParameters.TopMID
                        });
                        window.location.href = PageParameters.TopBackURL;
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
                $("#addSave").attr("disabled", false);
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
        "MaintenanceLists", "MaintenanceListsDescription", "EquipmentsIsNull", "DocumentCategoryIsNull"
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
                model.getAutoNumber();
            }
        });
    };
