var viewModel = function () {
    var self = this;
    var EquipmentID, AddEquipmentID, AddCallOrganizationID, AddCallMESUserID, CallMESUserID, ID, ReasonID;
    var Number, RepairReasonStatus, CallOrganizationID, Namearry = [], NamearryOne = [], NamearryTwo = [];
    var AddDocumentAutoNumberID;

    $('#AddDate').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    //设置状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            var Listdata = data.PT0191213000004;
            $("#Status").append("<option></option>");
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                $("#Status").append("<option value='" + Listdata[i].value + "'>" + Listdata[i].Newvalue + "</option>");
            }

            for (var j = 0,i = 0; i < Listdata.length; i++) {               
                if (Listdata[i].value.substring(5, Listdata[i].value.length) != "020121300002A") {
                    NamearryOne[j] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                    j++;
                }               
            }
            for (var k = 0,i = 0; i < Listdata.length; i++) {
                if (Listdata[i].value.substring(5, Listdata[i].value.length) != "020121300002A" && Listdata[i].value.substring(5, Listdata[i].value.length) != "0201213000028") {
                    NamearryTwo[k] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                    k++;
                }
            }
        }
    });

    //获取下拉框值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/EquipmentManagement/Ems00004GetTypeList",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#DocumentCategory").append("<option value='" + data[i].value + "'>" + data[i].Code + "</option>");
            }
        }
    });

    //获取单号
    function getNumber(DocumentID, GetDate) {
        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/Util/GetDocumentAutoNumber",
            data: { DocumentID: DocumentID, Date: GetDate },
            success: function (data) {
                console.log(data)
                $("#AddCode").val(data.AutoNumber);
                AddDocumentAutoNumberID = data.DocumentAutoNumberID;
            }
        });
    };

    $("#DocumentCategory").change(function () {
        var DocumentID = $("#DocumentCategory").val();
        var GetDate = $("#AddDate").val();
        getNumber(DocumentID, GetDate);
    });

    $("#AddDate").change(function () {
        var DocumentID = $("#DocumentCategory").val();
        var GetDate = $("#AddDate").val();
        getNumber(DocumentID, GetDate);
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
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };
    // 添加
    this.addClick = function () {
        var date = mf.format.Date(new Date());
        var User;
        //获取用户信息
        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/Util/GetUser",
            data: {},
            success: function (data) {
                User = data;
            }
        });
        
        var DocumentID = $("#DocumentCategory").val();
        var GetDate = $("#AddDate").val();
        getNumber(DocumentID, GetDate);
        AddCallMESUserID = User.MESUserID;
        AddCallOrganizationID = User.OrganizationID;
        $('#AddCalledClerk').val(User.Emplno);
        $('#AddUserName').val(User.UserName);
        $('#AddCallOrganizationID').val(User.DeptCode);
        $('#AddOrganizationName').val(User.DeptName);
        $("#AddDate").val(date);
        $('#AddDialog').modal("show");
        
    }
    // 编辑
    this.editClick = function () {
        if (!table)
            return;
       
        table.editRow();
                    
    };
    // 删除
    this.deleteClick = function () {
        if (!table)
            return;
        table.deleteRow();
    };
    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };

    //叫修原因关闭
    this.CleartableClick = function () {
        if (!RepairReasonTable)
            return;
        if (RepairReasonTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#CalledRepairReasonDialog').modal("hide");
                    }, null);
        }
        else {
            $('#CalledRepairReasonDialog').modal("hide");
        }
        //RepairReasonTable.goForword(function () {
        //    table.loadData();
        //    RepairReasonTable.loadData();
        //    $('#CalledRepairReasonDialog').modal("hide");
        //}, function () {
        //    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    window.location.reload();
        //    $('#CalledRepairReasonDialog').modal("hide");
        //}, fields.Isleave);
    };
    //叫修原因添加
    this.AddReasonClick = function () {
        if (!RepairReasonTable)
            return;

        RepairReasonTable.addRow();
    }
    //叫修原因编辑
    this.ChangeReasonClick = function () {
        if (!RepairReasonTable)
            return;

        RepairReasonTable.editRow();
    };
    //叫修原因删除
    this.DeleteReasonClick = function () {
        if (!RepairReasonTable)
            return;
        RepairReasonTable.deleteRow();
    };
    //叫修原因保存
    this.SaveReasonClick = function () {
        if (!RepairReasonTable)
            return;
        RepairReasonTable.save(null, null, true);
    };
    //显示叫修原因   
    this.CalledRepairClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }
        table.goForwordSafely(function () {
            ID = row.CalledRepairOrderID;
            RepairReasonStatus = row.Status;
            if (RepairReasonStatus.substring(5, RepairReasonStatus.length) == "020121300002A" || RepairReasonStatus.substring(5, RepairReasonStatus.length) == "020121300002B") {
                $("#CallAdd").css("display", "none");
                $("#CallChange").css("display", "none");
                $("#CallDeletion").css("display", "none");
                $("#CallComfirm").css("display", "none");
            }
            else {
                $("#CallAdd").css("display", "inline");
                $("#CallChange").css("display", "inline");
                $("#CallDeletion").css("display", "inline");
                $("#CallComfirm").css("display", "inline");
            }
            RepairReasonTable.loadData();
            var Date = row.Date;
            Date = Date.substring(0, 10);

            $("#CalledRepairNo").val(row.Code);
            $("#DocumentDate").val(Date);
            $("#CallEquipmentCode").val(row.EquipmentCode);
            $("#CalledRepairNo").attr("title", row.Code);
            $("#CallEquipmentCode").attr("title", row.EquipmentCode);
            $('#CalledRepairReasonDialog').modal("show");
        }, function () {
            ID = row.CalledRepairOrderID;
            RepairReasonStatus = row.Status;
            if (RepairReasonStatus.substring(5, RepairReasonStatus.length) == "020121300002A" || RepairReasonStatus.substring(5, RepairReasonStatus.length) == "020121300002B") {
                $("#CallAdd").css("display", "none");
                $("#CallChange").css("display", "none");
                $("#CallDeletion").css("display", "none");
                $("#CallComfirm").css("display", "none");
            }
            else {
                $("#CallAdd").css("display", "inline");
                $("#CallChange").css("display", "inline");
                $("#CallDeletion").css("display", "inline");
                $("#CallComfirm").css("display", "inline");
            }
            RepairReasonTable.loadData();
            var Date = row.Date;
            Date = Date.substring(0, 10);

            $("#CalledRepairNo").val(row.Code);
            $("#DocumentDate").val(Date);
            $("#CallEquipmentCode").val(row.EquipmentCode);
            $("#CalledRepairNo").attr("title", row.Code);
            $("#CallEquipmentCode").attr("title", row.EquipmentCode);
            $('#CalledRepairReasonDialog').modal("show");
        });    
    };

    this.ReasonSearch = function () {
        ReasonTable.goForwordSafely(function () {
            ReasonTable.loadData(null, null, 1);
        }, null);
    }

    //新增保存
    this.AddRepairOrderClick = function () {

        if (!$('#AddDate').val()) {
            msg.info(fields.info, fields.DocumentDateIsNull);
            return;
        }

        else if (!$('#AddEquipmentCode').val()) {
            msg.info(fields.info, fields.EquipmentCodeIsNull);
            return;
        }

        var saveData = {
            Code: $('#AddCode').val(),
            Date: $('#AddDate').val(),
            EquipmentID: AddEquipmentID,
            CallOrganizationID: AddCallOrganizationID,
            CallMESUserID: AddCallMESUserID,
            Comments: $('#AddComments').val(),
            DocumentID: $("#DocumentCategory").val(),
            DocumentAutoNumberID: AddDocumentAutoNumberID
        }

        //msg.saveinfo(fields.info, fields.IsSureSave, function () {
        //})       
        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00004Add',
            data: JSON.stringify(saveData),
            success: function (data) {
                if (data.status == "200") {
                    console.log(data);
                    msg.success(fields.info, data.msg, function () {
                        self.clearAddValue();
                        $('#AddDialog').modal("hide");
                        table.loadData();
                    });
                }
                else {
                    msg.error(fields.info, data.msg, function () {
                        self.clearAddValue();
                        $('#AddDialog').modal("hide");
                        table.loadData();
                    });
                }                               
            }
        });

    };

    //设备代号弹窗查询
    this.OpenEndEquipmentCodeSearch = function () {
        EquipmentCodeTable.goForwordSafely(function () {
            EquipmentCodeTable.loadData(null, null, 1);
        }, null);
    };

    //新增设备代号弹窗查询
    this.AddEquipmentCodeSearch = function () {
        AddEquipmentCodeTable.goForwordSafely(function () {
            AddEquipmentCodeTable.loadData(null, null, 1);
        }, null);
    };

    //新增叫修员弹窗查询
    this.AddAccountSearch = function () {
        AddAccountTable.goForwordSafely(function () {
            AddAccountTable.loadData(null, null, 1);
        }, null);
    };

    this.AccountSearch = function () {
        AccountTable.goForwordSafely(function () {
            AccountTable.loadData(null, null, 1);
        }, null);
    };

    //显示新增设备代号弹窗
    this.AddEquipmentCode = function () {
        var Data;
        $("#AddEquipmentCodeDialog").modal("show");
        $("#AddEquipmentCodeDialog").modal({ backdrop: 'static', keyboard: false });
        AddEquipmentCodeTable.loadData();
        $("#AddEquipmentComfirm").unbind();
        $("#AddEquipmentComfirm").click(function () {
            var row = AddEquipmentCodeTable.getSelectedData();
            if (row) {
                AddEquipmentID = row.EquipmentID;
                $("#AddEquipmentCodeDialog").modal("hide");
                mf.ajax({
                    type: 'Get',
                    async: false,
                    url: "/MES/api/EquipmentManagement/CheckEquipment",
                    data: { EquipmentID: AddEquipmentID },
                    success: function (data) {
                        if (data) {
                            msg.warningOne(fields.info, row.Code + fields.EquipmentIsRepair,
                            function () {
                                $('#AddEquipmentCode').val(row.Code);
                                $('#AddVendor').val(row.ManufacturerCode);
                                $('#AddPlantCode').val(row.PlantName);
                                $('#AddPlantAreaCode').val(row.PlantAreaName);
                            }, function () { });
                        }
                        else {
                            $('#AddEquipmentCode').val(row.Code);
                            $('#AddVendor').val(row.ManufacturerCode);
                            $('#AddPlantCode').val(row.PlantName);
                            $('#AddPlantAreaCode').val(row.PlantAreaName);
                        }
                    }
                });               
            }
        })
    };

    //显示新增叫修员弹窗
    this.AddCalledClerk = function () {
        mf.dialog('#AddClerkDialog', {
            viewModel: function () {
                AddAccountTable.loadData();
                $("#AddAccountComfirm").click(function () {
                    var row = AddAccountTable.getSelectedData();
                    if (row) {
                        AddCallOrganizationID = row.OrganizationID;
                        AddCallMESUserID = row.MESUserID;
                        $('#AddCalledClerk').val(row.Emplno);
                        $('#AddUserName').val(row.UserName);
                        $('#AddCallOrganizationID').val(row.OrganizationCode);
                        $('#AddOrganizationName').val(row.OrganizationName);
                        $("#AddClerkDialog").modal("hide");
                    }
                })
            }
        });
    };

    //设置新增设备代号弹窗表格
    var AddEquipmentCodeTable = new mf.Table("#AddEquipmentCodeTable", {
        uniqueId: "EquipmentID",
        editable: false,
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionAddEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#AddBeginEquipmentCode").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#AddEndEquipmentCode").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "190",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //设置新增叫修员弹窗表格
    var AddAccountTable = new mf.Table("#AddAccountTable", {
        uniqueId: "MESUserID",
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionAddAccountBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#AddStartAccount").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#AddEndAccount").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //设置设备代号弹窗表格
    var EquipmentCodeTable = new mf.Table("#EquipmentCodeTable", {
        uniqueId: "EquipmentID",
        editable: false,
        LastWidth: "75",
        paginationBar: new mf.PaginationBar("#paginagionEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#BeginEquipmentCode").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#EndEquipmentCode").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "190",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //设置叫修员弹窗表格
    var AccountTable = new mf.Table("#AccountTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionAccountBar"),
        LastWidth: "75",
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var startCode = $("#StartAccount").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#EndAccount").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";


            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {                   
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.DepartmentName, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //设置原因弹窗表格
    var ReasonTable = new mf.Table("#ReasonTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonBar"),
        LastWidth: "150",
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var GroupDept = $("#GroupDept").val();
            var ReasonDept = $("#ReasonDept").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "EMS", Description: ReasonDept, GroupDescription: GroupDept }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ReasonNo, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center", width: "145",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });

    //设置叫修原因表格
    var RepairReasonTable = new mf.Table("#RepairReasonTable", {
        uniqueId: "CalledRepairReasonID",
        paginationBar: new mf.PaginationBar("#paginagionRepairReasonBar"),
        LastWidth: "145",
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
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00004ReasonSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems00004ReasonDelete",
                data: JSON.stringify({ CalledRepairReasonID: rowData.CalledRepairReasonID, CalledRepairOrderID: rowData.CalledRepairOrderID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var ReasonCode = data['ReasonCode'];
            ReasonID = data['ReasonID'];
            var $ReasonDescriptionEditingCell = $row.find("#ReasonDescription");
            if (ReasonCode && ReasonCode.length > 0) {
                $ReasonDescriptionEditingCell.attr('disabled', true);               
            }
            else {
                $ReasonDescriptionEditingCell.attr('disabled', false);
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 原因代号和原因说明是否都为空
            var ReasonCode = RepairReasonTable.getEditingColumnValue($row, "ReasonCode");
            var ReasonDescription = RepairReasonTable.getEditingColumnValue($row, "ReasonDescription");
            if (ReasonCode == "" && ReasonDescription == "")
                return fields.CodeAndNameIsNull;

            return null;
        },
        fn_checkeditable: function ($selectedRow) {
            if (RepairReasonStatus.substring(5, RepairReasonStatus.length) == "020121300002A" || RepairReasonStatus.substring(5, RepairReasonStatus.length) == "020121300002B") {
                return true;
            }
            else {
                return false;
            }
        },
        focusField: "ReasonDescription",
        focusEditField: "DealWithDescription",
        height: 300,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonNo, require: true, align: "center", width: "140",
                rander: new mf.FKRander("#ReasonDialog",
                                         "#ReasonComfirm",
                                         ReasonTable,
                                         new mf.TextRander(
                                             {
                                                 size: 8, readonly: 'readonly'
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var $ReasonDescriptionEditingCell = $row.find("#ReasonDescription");
                    $ReasonDescriptionEditingCell.attr('disabled', true);
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                    table.setEditingColumnValue($row, "GroupCode", e.data.GroupCode);
                    table.setEditingColumnValue($row, "GroupName", e.data.GroupName);
                    ReasonID = e.data.ParameterID;
                },
            },
             //原因流水号
           {
               field: 'ReasonID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return ReasonID;
               })
           },
             //叫修流水号
           {
               field: 'CalledRepairOrderID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return ID;
               })
           },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 60, title: "title" }),
                fn_onEditingChange: function (table, $row, $cell, field, e, rowsData, isAdding) {
                    if (isAdding) {
                        ReasonID = null;
                    }
                },
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 120, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'DealWithDescription', title: fields.DealWithDescription, align: "center", width: "130",
                rander: new mf.TextRander({ size: 12, maxLength: 60, title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 13, maxLength: 120, title: "title" }),
            },
        ]
    });

    //设置表格
    table = new mf.Table("#EMS00004Table", {
        uniqueId: "CalledRepairOrderID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        editable: true,
        IsSetTableWidth: true,
        LastWidth: "130",
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00004GetList',
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
                url: '/MES/api/EquipmentManagement/Ems00004Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var Code = data['Code'];
            var Status = data['Status'];
            var Statustext;
            var $buttonEditingCell = $row.find("button");
            var $StatusEditingCell = $row.find("#Status");
            var $CommentsEditingCell = $row.find("#Comments");
            var $EquipmentCodeEditingCell = $row.find("#EquipmentCode button");
            
            var $DateEditingCell = $row.find("#Date");
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == Status) {
                    Statustext = Namearry[i].text;
                }
            }
            
            if (Status.substring(5, Status.length) == "020121300002A" || Status.substring(5, Status.length) == "020121300002B") {
                if (isEditing) {
                    msg.info(fields.info, Code + fields.StatusIs + Statustext + fields.Isnotedit);
                }
                //$StatusEditingCell.attr('disabled', true);
                //$CommentsEditingCell.attr('readonly', true);
                //$buttonEditingCell.attr('disabled', true);
                //$DateEditingCell.attr('disabled', true);
            }
            else {
                //$StatusEditingCell.attr('disabled', false);
                //$CommentsEditingCell.attr('readonly', false);
                //$buttonEditingCell.attr('disabled', false);
                if (Status.substring(5, Status.length) != "0201213000028") {
                    $EquipmentCodeEditingCell.attr('disabled', true);
                }
                //$DateEditingCell.attr('disabled', false);                
            }
        },
        fn_checkeditable: function ($selectedRow) {
            var row = table.getRowData($selectedRow);
            for (var i = 0; i < Namearry.length; i++) {
                if (Namearry[i].value == row.Status) {
                    Statustext = Namearry[i].text;
                }
            }
            if (row.Status.substring(5, row.Status.length) == "020121300002A" || row.Status.substring(5, row.Status.length) == "020121300002B") {
                msg.info(fields.info, row.Code + fields.StatusIs + Statustext + fields.Isnotedit);
                return true;
            }
            else {
                return false;
            }
        },
        isFrozenColumn: true,
        operateColumWidth: "100px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:100px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="CalledRepairClick" style="width:80px;" onclick="model.CalledRepairClick(this)" title="' + fields.CalledRepairReason + '" >' + (fields.CalledRepairReason.length > 8 ? fields.CalledRepairReason.substring(0, 8) + "..." : fields.CalledRepairReason) + '</button>');
            return $td;
        },
        focusField: "Date",
        focusEditField: "Comments",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.CalledRepairNo, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CalledRepairNoIsNull)
                ],
            },
            {
                field: 'Date', title: fields.DocumentDate, require: true, align: "center", width: "120",
                rander: new mf.DateRander(),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DocumentDateIsNull)
                ],
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
                //rander: new mf.FKRanderIsSrue("#EquipmentCodeDialog",
                //                         "#EquipmentCodeDialog #Comfirm",
                //                         EquipmentCodeTable,
                //                         new mf.TextRander(
                //                             {
                //                                 size: 12, readonly: 'readonly', title: "title"
                //                             }
                //                         ),
                //                         {
                //                             btnTitle: "",
                //                             btnClass: "btn btn-success btn-xs",
                //                         }, "/MES/api/EquipmentManagement/CheckEquipment", fields.info, fields.EquipmentIsRepair),
                //fn_onEditingChange: function (table, $row, $cell, field, e) {
                //    table.setEditingColumnValue($row, "EquipmentCode", e.data.Code);
                //    table.setEditingColumnValue($row, "EquipmentManufacturerCode", e.data.ManufacturerCode);
                //    table.setEditingColumnValue($row, "PlantName", e.data.PlantName);
                //    table.setEditingColumnValue($row, "PlantAreaName", e.data.PlantAreaName);
                //    EquipmentID = e.data.EquipmentID;
                //},
                //checkers: [
                //    new mf.TextNotEmptyChecker(fields.EquipmentCodeIsNull)
                //],
            },
            {
                field: 'EquipmentID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return EquipmentID;
                })
            },
            {
                field: 'EquipmentManufacturerCode', title: fields.Vendor, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
                //rander: new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "170",
                rander: new mf.TextRander({ size: 17, maxLength: 120, title: "title" }),
            },
            {
                field: 'CallMESUserCode', title: fields.CalledClerk, align: "center", width: "150",
                rander: new mf.FKRander("#ClerkDialog",
                                         "#AccountComfirm",
                                         AccountTable,
                                         new mf.TextRander(
                                             {
                                                 size: 11, readonly: 'readonly', title: "title"
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "CallMESUserCode", e.data.Emplno);
                    table.setEditingColumnValue($row, "CallMESUserName", e.data.UserName);
                    table.setEditingColumnValue($row, "CallOrganizationCode", e.data.OrganizationCode);
                    table.setEditingColumnValue($row, "CallOrganizationName", e.data.OrganizationName);
                    CallMESUserID = e.data.MESUserID;
                    CallOrganizationID = e.data.OrganizationID;
                }
            },
            {
                field: 'CallMESUserID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return CallMESUserID;
                })
            },
            {
                field: 'CallOrganizationID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return CallOrganizationID;
                })
            },
            {
                field: 'CallMESUserName', title: fields.CalledClerkName, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'CallOrganizationCode', title: fields.CalledClerkDept, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'CallOrganizationName', title: fields.DepartmentName, align: "center", width: "100",
                rander: new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'PlantName', title: fields.Site, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
                //rander: new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' }),
            },
            {
                field: 'PlantAreaName', title: fields.Factory, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
                //rander: new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' }),
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
                field: 'ManufacturerCode', title: fields.MaintenanceVendor, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ManufacturerName', title: fields.VendorName, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
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
                field: 'Status', title: fields.Status, align: "center", width: "100",
                rander: new mf.AutoSelectRander(
                    "value", "text", Namearry,
                    {
                        title: true,
                        fn_onSetEditingValue: function (value) {
                            var list = [];
                            if (value.substring(5, value.length) == "0201213000028") {
                                list = NamearryOne;
                            }
                            else if (value.substring(5, value.length) == "0201213000029") {
                                list = NamearryTwo;
                            }
                            else {
                                list = Namearry;
                            }
                            return list;
                        }
                    }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var Code = table.getEditingColumnValue($row, 'Code');
                    var Status = table.getEditingColumnValue($row, 'Status');
                    var Statustext;
                    var $buttonEditingCell = $row.find("button");
                    var $StatusEditingCell = $row.find("#Status");
                    var $CommentsEditingCell = $row.find("#Comments");
                    var $EquipmentCodeEditingCell = $row.find("#EquipmentCode button");
                    var $DateEditingCell = $row.find("#Date");
                    for (var i = 0; i < Namearry.length; i++) {
                        if (Namearry[i].value == Status) {
                            Statustext = Namearry[i].text;
                        }
                    }
                    if (Status.substring(5, Status.length) == "020121300002A" || Status.substring(5, Status.length) == "020121300002B") {
                        //msg.info(fields.info, Code + fields.StatusIs + Statustext + fields.Isnotedit);
                        //$StatusEditingCell.attr('disabled', true);
                        $CommentsEditingCell.attr('readonly', true);
                        $buttonEditingCell.attr('disabled', true);
                        $DateEditingCell.attr('disabled', true);
                    }
                    else {
                        //$StatusEditingCell.attr('disabled', false);
                        $CommentsEditingCell.attr('readonly', false);
                        $buttonEditingCell.attr('disabled', false);
                        $DateEditingCell.attr('disabled', false);
                        if (Status.substring(5, Status.length) != "0201213000028") {
                            $EquipmentCodeEditingCell.attr('disabled', true);
                        }
                    }
                },
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title:true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //清除数据
    this.clearInput = function (ID,IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }       
    };

    this.clearAddValue = function () {
        AddCallMESUserID = null;
        AddCallOrganizationID = null;
        AddEquipmentID = null;
        self.clearInput("#AddCode", "#AddDate");
        self.clearInput("#AddEquipmentCode", "#AddVendor");
        self.clearInput("#AddComments", null);
        self.clearInput("#AddCalledClerk", "#AddUserName");
        self.clearInput("#AddCallOrganizationID", "#AddOrganizationName");
        self.clearInput("#AddPlantCode", "#AddPlantAreaCode");
        $("#AddCalendar").removeAttr("disabled");
    };
}

var URL = "/MES/EquipmentManagement/EMS00004";

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
    "Save", "info", "CodeAndNameIsNull", "StatusIs", "Isnotedit", "EquipmentIsRepair", "Isleave", "MaintenanceVendor",
    "DocumentCategory", "IsSureSave"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};