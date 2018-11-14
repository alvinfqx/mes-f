var viewModel = function () {
    var MESUserID, OrganizationID, Namearray = [],IOArray=new Array(),ReasonID, ReasonGroupID, ManufacturerID,
        ServiceReasonLogID = null,RecordsID, parameters;

    //查询状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004,0191213000057" },
        success: function (data) {
            parameters = data;
            var Listdata = data.PT0191213000004;
            var Listdata1 = data.PT0191213000057;
            for (var i = 0; i < Listdata.length; i++) {
                Namearray[i] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
                
                if (Listdata[i].value && Listdata[i].value.substring(5, Listdata[i].value.length) == "0201213000029") {
                    $("#status").append("<option value='" + Listdata[i].value + "' selected>" + Listdata[i].Newvalue + "</option>");
                }
            }
            for (var i = 0; i < Listdata1.length; i++) {
                IOArray[i] = { value: Listdata1[i].value, text: Listdata1[i].text };
            }
            IOArray.unshift({ value: "", text: "" });
            console.log(Listdata);

    }
    });
    //在状态数组前加入空项

    // 刷新
    this.refreshClick = function () {
        if (!Table)
            return;
        Table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    //查询
    this.searchClick = function () {
        Table.goForwordSafely(function () {
            Table.loadData(null, null, 1);
        }, null);
    };

    //保存
    this.saveClick = function () {
        if (!Table)
            return;
        Table.save(null, null, true);
    };

    //编辑
    this.editClick = function () {
        if (!Table)
            return;

        Table.editRow();
    };

    //删除
    //this.deleteClick = function () {
    //    var data = Table.getSelectedData();
    //    msg.warning(fields.info, fields.WhetherToDelete + fields.CalledRepairNo +fields.For+ data.Code + fields.TheData,
    //    function () {
    //        mf.ajax({
    //            type: "post",
    //            url: "/MES/api/EquipmentManagement/Ems00005Delete",
    //            data: JSON.stringify({ CalledRepairOrderID: RecordsID }),
    //            success: function (data) {
    //                if (data.status == "200") {
    //                    msg.success(fields.info, data.msg);
    //                    Table.loadData();
    //                }
    //                else {
    //                    msg.error(fields.info, data.msg);
    //                }
    //            }
    //        });

    //    });
    //}

    //显示叫修原因
    this.CalledRepairClick = function (obj) {

    //    var $tr = $(obj).parent().parent();
    //    var row = Table.getRowData($tr);

    //    if (!row) {
    //        msg.info(fields.info, fields.PleaseSelectRecord);
    //        return;
    //    }
    //    ID = row.CalledRepairOrderID;
    //    RepairReasonTable.loadData();
    //    var Date = row.Date;
    //    Date = Date.substring(0, 10);

    //    $("#CalledRepairNo").val(row.Code);
    //    $("#DocumentDate").val(Date);
    //    $("#CallEquipmentCode").val(row.EquipmentCode);
    //    $('#CalledRepairReasonDialog').modal("show");
    //};

    var $tr = $(obj).parent().parent();
    var row = Table.getRowData($tr);

    if (!row) {
        msg.info(fields.info, fields.PleaseSelectRecord);
        return;
    }
    ID = row.CalledRepairOrderID;
    RepairReasonTable.loadData();
    var Date = row.Date;
    if (Date) {
        Date = Date.substring(0, 10);
    }
   

    if ($tr.hasClass("editingRow")) {       
        return msg.info(fields.info, fields.PleaseSaveDataFirst);
    }

    $("#CalledRepairNo").val(row.Code);
    $("#DocumentDate").val(Date);
    $("#CallEquipmentCode").val(row.EquipmentCode);
    $('#CalledRepairReasonDialog').modal("show");
};

    //显示维修记录  
    this.RecordsClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = Table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        RecordsID = row.CalledRepairOrderID;
        ServiceReasonLogID = null;
        RecordsTable.loadData();
        DetailsTable.loadData();
        var Date = row.Date;
        if (Date) {
            Date = Date.substring(0, 10);
        }
        

        if ($tr.hasClass("editingRow")) {
            return msg.info(fields.info, fields.PleaseSaveDataFirst);
        }

        $("#RecordsCalledRepairNo").val(row.Code);
        $("#RecordsDocumentDate").val(Date);
        $("#RecordsCallEquipmentCode").val(row.EquipmentCode);
        $('#RecordsDialog').modal("show");
    };

    //负责人员弹窗表格
    var AccountMaintenanceTable = new mf.Table("#AccountMaintenanceTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionBarUser"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#AccountNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10,  title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            },
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.DepartmentName, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            }
        ]
    });

    //负责人员查询
    this.AccountNoSearch = function () {
        AccountMaintenanceTable.goForwordSafely(function () {
            AccountMaintenanceTable.loadData(null, null, 1);
        }, null);
    };

    //维修部门弹窗表格
    var DepartmentFileTable = new mf.Table("#DepartmentFileTable", {
        uniqueId: "OrganizationID",
        paginationBar: new mf.PaginationBar("#paginagionBarDepartmentFile"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#DepartmentNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetDeptList',
                data: ({ page: pagination.page, rows: pagination.rows,Code:Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10,title: "title" })),
            },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "50",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16,title: "title" })),
            }
        ]
    });

    //維修部门查询
    this.DepartmentNoSearch = function () {
        DepartmentFileTable.goForwordSafely(function () {
            DepartmentFileTable.loadData(null, null, 1);
        }, null);
    };

    //维修厂商弹窗表格
    var VendorInformationTable = new mf.Table("#VendorInformationTable", {
        uniqueId: "ManufacturerID",
        paginationBar: new mf.PaginationBar("#paginagionBarVendorInformation"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#VendorNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetManufacturerList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code}),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.VendorNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10,  title: "title" })),
            },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "50",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            }
        ]
    });

    //维修厂商查询
    this.VendorNoSearch = function () {
        VendorInformationTable.goForwordSafely(function () {
            VendorInformationTable.loadData(null, null, 1);
        }, null);
    };

    //叫修原因弹窗表格
    var RepairReasonTable = new mf.Table("#RepairReasonTable", {
        uniqueId: "CalledRepairReasonID",
        paginationBar: new mf.PaginationBar("#paginagionRepairReasonBar"),
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
        height: 400,
        columns: [
            {
                field: 'ReasonCode', title: fields.ReasonNo, require: true, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "120",
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

    //原因代号弹窗表格
    var ReasonCodeTable = new mf.Table("#ReasonCodeTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonCodeBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var ReasonCode = $("#ReasonCodeSearch").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: ReasonCode, Type: "EMS" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {;
        },
        height: 300,
        columns: [
            {
                field: 'UseCode', title: fields.UseCode, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.ReasonNo, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "50",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    });

    //原因代号查询
    this.ReasonCodeSearch = function () {
        ReasonCodeTable.goForwordSafely(function () {
            ReasonCodeTable.loadData(null, null, 1);
        }, null);
    };

    //原因群码弹窗表格
    var ReasonGroupCodeTable = new mf.Table("#ReasonGroupCodeTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionReasonGroupCodeBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#ReasonGroupCode").val();
            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, "typeID": "000011" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ReasonGroupCode, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title" })),
            },
            {
                field: 'Name', title: fields.GroupDescription, align: "center", width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 18, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "250",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, title: "title" })),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //原因群码查询
    this.ReasonGroupCodeSearch = function () {
        ReasonGroupCodeTable.goForwordSafely(function () {
            ReasonGroupCodeTable.loadData(null, null, 1);
        }, null);
    };

    //处理人员弹窗表格
    var AccountTable = new mf.Table("#AccountTable", {
        uniqueId: "MESUserID",
        paginationBar: new mf.PaginationBar("#paginagionBarAccount"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Account").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: ({ page: pagination.page, rows: pagination.rows,Code:Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            },
            {
                field: 'OrganizationCode', title: fields.DepartmentNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title" })),
            },
            {
                field: 'OrganizationName', title: fields.DepartmentName, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, title: "title" })),
            }
        ]
    });

    //处理人员查询
    this.AccountSearch = function () {
        AccountTable.goForwordSafely(function () {
            AccountTable.loadData(null, null, 1);
        }, null);
    };

    //处理厂商弹窗表格
    var VendorMasterFileTable = new mf.Table("#VendorMasterFileTable", {
        uniqueId: "ManufacturerID",
        paginationBar: new mf.PaginationBar("#paginagionBarVendorMasterFile"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#DWVendorNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetManufacturerList',
                data: ({ page: pagination.page, rows: pagination.rows,Code:Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.VendorNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10,  title: "title" })),
            },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16,  title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10,  title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "50",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16,  title: "title" })),
            }
        ]
    });

    //处理厂商查询
    this.DWVendorNoSearch = function () {
        VendorMasterFileTable.goForwordSafely(function () {
            VendorMasterFileTable.loadData(null, null, 1);
        }, null);
    };

    //维修记录表头表格
    var RecordsTable = new mf.Table("#RecordsTable", {
        uniqueId: "ServiceReasonLogID",
        paginationBar: new mf.PaginationBar("#paginagionRecordsBar"),
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems00005ServiceDelete",
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                    RecordsTable.loadData();
                }
            });

        },
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00005GetServiceList',
                data: ({ page: pagination.page, rows: pagination.rows, CalledRepairOrderID: RecordsID }),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00005ServiceSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });

        },

        fn_onRowClick: function (row) {
            ServiceReasonLogID = row.ServiceReasonLogID;
            if (ServiceReasonLogID!=null){
                DetailsTable.loadData();
            }
           
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var ReasonCode = data['ReasonCode'];
            var $ReasonDescriptionEditingCell = $row.find("#ReasonDescription");
            if (ReasonCode == null) {
                $ReasonDescriptionEditingCell.attr('readonly', false);
            }
            else {
                $ReasonDescriptionEditingCell.attr('readonly', true);
            }
            var GroupID = data['ReasonCodeID'];
            var $GroupCodebuttonEditingCell = $row.find("#GroupCode button");
            if (GroupID == null) {
                $GroupCodebuttonEditingCell.attr('disabled', false);
            }
            else {
                $GroupCodebuttonEditingCell.attr('disabled', true);
            }
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 原因代号和原因说明是否都为空
            var ReasonCode = RecordsTable.getEditingColumnValue($row, "ReasonCode");
            var ReasonDescription = RecordsTable.getEditingColumnValue($row, "ReasonDescription");
            if (ReasonCode == "" && ReasonDescription == "")
                return fields.CodeAndNameIsNull;

            return null;
        },
        height: 150,
        columns: [
           //叫修单流水号
           {
               field: 'CalledRepairOrderID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return RecordsID;
               })
           },
            {
                field: 'ReasonCode', title: fields.ReasonNo, align: "center", width: "140",
                rander: new mf.FKRander("#ReasonNoDialog",
                                                       "#ComfirmReasonNo",
                                                       ReasonCodeTable,
                                                       new mf.TextRander(
                                                           {
                                                               size: 10, readonly: 'readonly', title: "title"

                                                           }
                                                       ),
                                                       {
                                                           btnTitle: "",
                                                           btnClass: "btn btn-success btn-xs",
                                                           searchID: [{ value: "#ReasonCodeSearch", text: "" }]
                                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var $ReasonDescriptionEditingCell = $row.find("#ReasonDescription");
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonDescription", e.data.Name);
                    table.setEditingColumnValue($row, "GroupCode", e.data.GroupCode);
                    table.setEditingColumnValue($row, "GroupName", e.data.GroupName);
                    if (e.data.Comments) {
                        table.setEditingColumnValue($row, "Comments", e.data.Comments);
                    }
                    else {
                        table.setEditingColumnValue($row, "Comments", "");
                    }
                    $("#ReasonID").val(e.data.ParameterID);
                    $("#ReasonGroupID").val(e.data.ReasonGroupID);
                    var $GroupCodebuttonEditingCell = $row.find("#GroupCode button");
                    if (ReasonID == null) {
                        $GroupCodebuttonEditingCell.attr('disabled', false);
                        $ReasonDescriptionEditingCell.attr('readonly', false);
                    }
                    else {
                        $GroupCodebuttonEditingCell.attr('disabled', true);
                        $ReasonDescriptionEditingCell.attr('readonly', true);
                    }
                },
            },
            //原因代码流水号
            {
                field: 'ReasonID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ReasonDescription', title: fields.ReasonDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 12, title: "title" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    ReasonID = null;
                },
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "140",
                rander: new mf.FKRander("#ReasonGroupCodeDialog",
                                                       "#ComfirmReasonGroupCode",
                                                       ReasonGroupCodeTable,
                                                       new mf.TextRander(
                                                           {
                                                               size: 10, readonly: 'readonly', title: "title"
                                                           }
                                                       ),
                                                       {
                                                           btnTitle: "",
                                                           btnClass: "btn btn-success btn-xs",
                                                           searchID: [{ value: "#ReasonGroupCode", text: "" }]
                                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "GroupCode", e.data.Code);
                    table.setEditingColumnValue($row, "GroupName", e.data.Name);
                    table.setEditingColumnValue($row, "Comments", e.data.Comments);
                    $("#ReasonGroupID").val(e.data.ParameterID);
                },
            },

            //原因群码流水号
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ReasonGroupID', title: "", visible: false,
                rander: new mf.TextRander()
            },
        ]
    });

    var DetailsTable = new mf.Table("#DetailsTable", {
        uniqueId: "SRLDID",
        paginationBar: new mf.PaginationBar("#paginagionDetailsBar"),
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems00005ServiceDetailDelete",
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                    DetailsTable.loadData();
                }
            });

        },
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00005GetServiceDetailsList',
                data: ({ page: pagination.page, rows: pagination.rows, ServiceReasonLogID: ServiceReasonLogID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00005ServiceDetailsSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            // 处理人员是否为空
            var Handler = DetailsTable.getEditingColumnValue($row, "MESUserCode");
            if (!Handler)
            {
                return fields.HandlerIsNull;
            }
            
        },


        isFrozenColumn: true,
        operateColumWidth: "80px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:80px;text-align:center;">');
            var $btn = $('<button id="start" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.startClick(this)">' + fields.Start + '</button>&nbsp;' +
                         '<button id="end" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.endClick(this)">' + fields.End + '</button>');
            return $td.append($btn);
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var $startClick = $row.find("#start");
            var $endClick = $row.find("#end");
            //var $MESUserClick = $row.find("#MESUserCode")
            var $startTime = $row.find("#StartTime");
            var $endTime = $row.find("#EndTime");
            if (isAdding) {
                $startClick.attr('disabled', true);
                $endClick.attr('disabled', true);
                $startTime.attr('hidden', true);
                $endTime.attr('hidden', true);
            }
            else if (isEditing) {
                $startClick.attr('disabled', true);
                $endClick.attr('disabled', true);
                $startTime.attr('hidden', false);
                $endTime.attr('hidden', false);
                $row.find("#IsFee").attr("disabled", true);
                //$MESUserClick.attr("disabled", true);
            }
            else {
                $startClick.attr('disabled', false);
                $endClick.attr('disabled', false);
                $startTime.attr('hidden', true);
                $endTime.attr('hidden', true);

            }
        },

        height: 150,
        columns: [
           //叫修原因流水号
           {
               field: 'ServiceReasonLogID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return ServiceReasonLogID;
               })
           },
            {
                field: 'MESUserCode', title: fields.Handler, align: "center", width: "120", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander("#HandlerDialog",
                                        "#ComfirmAccount",
                                          AccountTable,
                                          new mf.TextRander(
                                              {
                                                  size: 4, readonly: 'readonly', title: "title"
                                              }
                                          ),
                                          {
                                              btnTitle: "",
                                              btnClass: "btn btn-success btn-xs",
                                              searchID: [{ value: "#Account", text: "" }]
                                          })),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "MESUserCode", e.data.Emplno);
                    table.setEditingColumnValue($row, "OrganizationCode", e.data.OrganizationCode);
                    MESUserID = e.data.MESUserID;
                    OrganizationID = e.data.OrganizationID;
                },
            },
            //处理人员流水号
            {
                field: 'MESUserID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return MESUserID;
                })
            },
            //处理部门流水号
            {
                field: 'OrganizationID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return OrganizationID;
                })
            },
            {
                field: 'OrganizationCode', title: fields.Handledept, align: "center", width: "120",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'ManufacturerCode', title: fields.HandleVendor, align: "center", width: "120",
                rander: new mf.FKRander("#HandleVendorDialog",
                                          "#ComfirmVendorMasterFile",
                                          VendorMasterFileTable,
                                          new mf.TextRander(
                                              {
                                                  size: 4, readonly: 'readonly', title: "title"
                                              }
                                          ),
                                          {
                                              btnTitle: "",
                                              btnClass: "btn btn-success btn-xs",
                                              searchID: [{ value: "#DWVendorNo", text: "" }]
                                          }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ManufacturerCode", e.data.Name);
                    ManufacturerID = e.data.ManufacturerID;
                },
            },
            //处理厂商流水号
            {
                field: 'ManufacturerID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ManufacturerID;
                })
            },
            {
                field: 'IsFee', title: fields.IsFee, align: "center", width: "50",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
            },
            {
                field: 'StartTime', title: fields.StartTime, align: "center", width: "120",
                rander: new mf.TimeRander(),
            },
            {
                field: 'EndTime', title: fields.EndTime, align: "center", width: "120",
                rander: new mf.TimeRander(),

            },
            {
                field: 'Hour', title: fields.HandleHour, align: "center", width: "80",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'Description', title: fields.HandleContent, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 120 })),
            },
            {
                field: 'Creator', title: fields.CreateDocumentStaff, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreateDocumentDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    //关闭按钮
    //this.CloseClick = function ()
    //{
    //    RecordsTable.goForword(function () {
    //        DetailsTable.goForword(function () {
    //            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    //            window.location.reload();
    //            $('#RecordsDialog').modal("hide");
    //        }, function () {
    //            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    //            window.location.reload();
    //            $('#RecordsDialog').modal("hide");
    //        });
    //    }, function () {
    //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    //        window.location.reload();
    //        $('#RecordsDialog').modal("hide");
    //    }, fields.Isleave);
    //};

    //维修处理记录上表新增
    this.RecordsTableaddClick = function () {
        if (!RecordsTable)
            return;
        if (DetailsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveDownTableDataFirst);
        }
        RecordsTable.addRow();
    }

    //维修处理记录上表编辑
    this.RecordsTableeditClick = function () {
        if (!RecordsTable)
            return;
        if (DetailsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveDownTableDataFirst);
        }
        RecordsTable.editRow();
    };

    // 维修处理记录上表删除
    this.RecordsTabledeleteClick = function () {
        if (!RecordsTable) {
            return;
        }
        if (DetailsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveDownTableDataFirst);
        }
        RecordsTable.deleteRow();
        RecordsTable.loadData();
    };

    //this.RecordsTabledeleteClick = function () {
    //    mf.ajax({
    //        type: "post",
    //        url: "/MES/api/EquipmentManagement/Ems00005ServiceDelete",
    //        data: JSON.stringify({ ServiceReasonLogID: ServiceReasonLogID }),
    //        success: function (data) {
    //            if (data.status == "200") {
    //                msg.success(fields.info, data.msg);
    //                RecordsTable.loadData();
    //            }
    //            else {
    //                msg.error(fields.info, data.msg);
    //            }
    //        }
    //    });

    //};

    //维修处理记录上表保存
    this.RecordsTablesaveClick = function () {
        if (!RecordsTable)
            return;
        if (DetailsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveDownTableDataFirst);
        }
        RecordsTable.save(null, null, true);
        RecordsTable.loadData();
    };

    //维修处理记录下表新增
    this.DetailsTableaddClick = function () {
        if (!DetailsTable)
            return;
        if (RecordsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveUpTableDataFirst);
        }
        if (ServiceReasonLogID != null) {
            DetailsTable.addRow();
        }
        else {
            msg.info(fields.info, fields.Isedit+fields.ReasonNo);
        }
    }

    //维修处理记录下表编辑
    this.DetailsTableeditClick = function () {
        if (!DetailsTable)
            return;
        if (RecordsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveUpTableDataFirst);
        }
        DetailsTable.editRow();
    };

    //维修处理记录下表删除
    this.DetailsTabledeleteClick = function () {
        if (!DetailsTable) {
            return;
        }
        if (RecordsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveUpTableDataFirst);
        }
        DetailsTable.deleteRow();
        DetailsTable.loadData();
    };

    //this.DetailsTabledeleteClick = function () {
    //        mf.ajax({
    //            type: "post",
    //            url: "/MES/api/EquipmentManagement/Ems00005ServiceDetailDelete",
    //            data: JSON.stringify({ SRLDID: data.SRLDID }),
    //            success: function (data) {
    //                if (data.status == "200") {
    //                    msg.success(fields.info, data.msg);
    //                    DetailsTable.loadData();
    //                }
    //                else {
    //                    msg.error(fields.info, data.msg);
    //                }
    //            }
    //        });
    //};

    //维修处理记录下表保存
    this.DetailsTablesaveClick = function () {
        if (!DetailsTable)
            return;
        if (RecordsTable.SaveOrNotStatus()) {
            return msg.info(fields.info, fields.PleaseSaveUpTableDataFirst);
        }
        DetailsTable.save(null, null, true);
        DetailsTable.loadData();
    };

    //维修处理记录下表开始计时
    this.startClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = DetailsTable.getRowData($tr);

        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00005DetailsStart',
            data: JSON.stringify({ SRLDID: row.SRLDID }),
            success: function (data) {
                if (data.msg = "200") {
                    msg.info(fields.info, fields.RecordSuccess);
                    DetailsTable.loadData();
                }
                else {
                    msg.error(fields.info, fields.RecordFailed);
                }
            }
        });
    }

    //维修处理记录下表结束计时
    this.endClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = DetailsTable.getRowData($tr);
 
        //if (!(row.SRLDID) || DetailsTable.hasChange()) {
        //    msg.info(fields.info, fields.EditingCanNotCounted);
        //    return;
        //}
        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00005DetailsEnd',
            data: JSON.stringify({ SRLDID: row.SRLDID }),
            success: function (data) {
                if (data.msg = "200") {
                    msg.info(fields.info,fields.RecordSuccess);
                    DetailsTable.loadData();
                }
                else {
                    msg.error(fields.info,fields.RecordFailed);
                }
            }
        });
    }

    //开始维修
    this.StartRepairingClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = Table.getRowData($tr);
        EquipmentID = row.EquipmentID;
        if ($tr.hasClass("editingRow")) {
            return msg.info(fields.info, fields.PleaseSaveDataFirst);
        }
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems0005RepairStart",
            data: JSON.stringify({ EquipmentID: EquipmentID }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.info, data.msg);
                    Table.loadData();
                }
                else {
                    msg.error(fields.info, data.msg);
                }
            }
        });
    }

    //结束维修
    this.EndRepairingClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = Table.getRowData($tr);
        EquipmentID = row.EquipmentID;
        console.log(row.CalledRepairOrderID);
        if ($tr.hasClass("editingRow")) {
            return msg.info(fields.info, fields.PleaseSaveDataFirst);
        }
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems0005RepairEnd",
            data: JSON.stringify({ EquipmentID: EquipmentID, CalledRepairOrderID: row.CalledRepairOrderID }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.info, data.msg);
                    Table.loadData();
                }
                else {
                    msg.error(fields.info, data.msg);
                }
            }
        });
    }

    //维修处理记录关闭
    this.RecordsDialogClose = function () {
        //RecordsTable.goForword(function () {
        //    DetailsTable.goForword(function () {
        //        Table.loadData();
        //        DetailsTable.loadData();
        //        $('#RecordsDialog').modal("hide");
        //    },
        //    function () {
        //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //        window.location.reload();
        //        $('#RecordsDialog').modal("hide");
        //    },fields.Isleave)
        //},
        //    function () {
        //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //        window.location.reload();
        //        $('#RecordsDialog').modal("hide");
        //    }, fields.Isleave)
        if (RecordsTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#RecordsDialog').modal("hide");
                    }, null);
        }
        else if (DetailsTable.SaveOrNotStatus()) {
            msg.warning(fields.info, fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                        $('#RecordsDialog').modal("hide");
                    }, null);
        }
        else {
            $('#RecordsDialog').modal("hide");
        }
    };

    //设备维修作业表格
    var Table = new mf.Table("#EMS00005Table", {
        uniqueId: "CalledRepairOrderID",
        focusField: "Code",
        focusEditField: "InOutRepair",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();
            var Status = $("#Status").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00005GetList',
                data: ({ Code: Code, page: pagination.page, rows: pagination.rows,Status:Status }),
                success: function (data) {            
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData,success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00005Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });

        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing){
            var InOutRepair = data['InOutRepair'];
            
            var $DeptCodebuttonEditingCell = $row.find("#DeptCode button");
            var $ManufacturerCodebuttonEditingCell = $row.find("#ManufacturerCode button");
            //if (!InOutRepair) return;
            if (InOutRepair && InOutRepair.substring(5, InOutRepair.length) == "020121300002C") {
                $ManufacturerCodebuttonEditingCell.attr('disabled', true);
                $DeptCodebuttonEditingCell.attr('disabled', false);
            }
            else if (InOutRepair && InOutRepair.substring(5, InOutRepair.length) == "020121300002D") {
                $ManufacturerCodebuttonEditingCell.attr('disabled', false);
                $DeptCodebuttonEditingCell.attr('disabled', true);
            }
            else {
                $ManufacturerCodebuttonEditingCell.attr('disabled', true);
                $DeptCodebuttonEditingCell.attr('disabled', true);
            }
        },
        isFrozenColumn: true,
        operateColumWidth: "300px",
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:300px;text-align:center;">');
            var $btn = $('<button id="reviewClick1" class="btn btn-success btn-xs" style="margin: 2px" onclick="model.CalledRepairClick(this)">' + fields.CalledRepairReason + '</button>' +
                         '<button id="reviewClick2" class="btn btn-success btn-xs" style="margin: 2px" onclick="model.RecordsClick(this)">' + fields.MaintenanceRecords + '</button>')
            var $Service = $('<button id="StartRepairing" class="btn btn-success btn-xs" style="margin: 2px" onclick="model.StartRepairingClick(this)" disabled>' + fields.StartRepairing + '</button>' +
                             '<button id="EndRepairing" class="btn btn-success btn-xs" style="margin: 2px;" onclick="model.EndRepairingClick(this)">' + fields.EndRepairing + '</button>');
            var $Stop = $('<button id="StartRepairing" class="btn btn-success btn-xs" style="margin: 2px" onclick="model.StartRepairingClick(this)" >' + fields.StartRepairing + '</button>' +
                          '<button id="EndRepairing" class="btn btn-success btn-xs" style="margin: 2px;" onclick="model.EndRepairingClick(this)" disabled>' + fields.EndRepairing + '</button>');
            var $Other = $('<button id="StartRepairing" class="btn btn-success btn-xs" style="margin: 2px" onclick="model.StartRepairingClick(this)" disabled>' + fields.StartRepairing + '</button>' +
                          '<button id="EndRepairing" class="btn btn-success btn-xs" style="margin: 2px;" onclick="model.EndRepairingClick(this)" disabled>' + fields.EndRepairing + '</button>');
            //if (!rowData.Condition) return;
            if (rowData.Condition && rowData.Condition.substring(5, rowData.Condition.length) == "0201213000023") {
                return $td.append($btn, $Service);
            }
            else if (rowData.Condition && rowData.Condition.substring(5, rowData.Condition.length) == "02012130000A5") {
                return $td.append($btn, $Stop);
            }
            else
            {
                return $td.append($btn, $Other);
            }
        },
        height: window.innerHeight - 145,
        columns: [
           {
               field: 'Code', title: fields.CalledRepairNo, require: true, align: "center", width: "110",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'Date', title: fields.DocumentDate, align: "center", width: "130",
               rander: new mf.TextTimeRander(),
           },
           {
               field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "110",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'EquipmentManufacturerCode', title: fields.Vendor, align: "center", width: "110",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'Comments', title: fields.Remark, align: "center", width: "130",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'CallMESUserCode', title: fields.CalledClerk, align: "center", width: "110",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'CallMESUserName', title: fields.CalledClerkName, align: "center", width: "120",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'CallOrganizationCode', title: fields.CalledClerkDept, align: "center", width: "110",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'CallOrganizationName', title: fields.DepartmentName, align: "center", width: "120",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'PlantName', title: fields.Site, align: 'center', width: "100",
               rander: new mf.StaticValueRander(),
           },
          {
              field: 'PlantAreaName', title: fields.Factory, align: "center", width: "120",
              rander: new mf.StaticValueRander(),
          },
          {
              field: 'MESUserDept', title: fields.Principal, align: "center", width: "140",
              rander: new mf.FKRander("#PrincipalDialog",
                                        "#ComfirmUser",
                                        AccountMaintenanceTable,
                                        new mf.TextRander(
                                            {
                                                size:7, readonly: 'readonly'
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                            searchID: [{ value: "#AccountNo", text: "" }]
                                        }),
              fn_onEditingChange: function (table, $row, $cell, field, e) {
                  table.setEditingColumnValue($row, "MESUserDept", e.data.Emplno + "-" + e.data.OrganizationCode);
                  table.setEditingColumnValue($row, "MESUserName", e.data.UserName);
                  MESUserID = e.data.MESUserID;
              },
          },
            //负责人流水号
          {
              field: 'MESUserID', title: "", visible: false,
              rander: new mf.DynamicValueRander(function () {
                  return MESUserID;
              })
          },
          {
              field: 'MESUserName', title: fields.Name, align: "center", width: "120",
              rander: new mf.StaticValueRander(),
          },
          {
              field: 'InOutRepair', title: fields.InnerOuterRepair, align: "center", width: "100",
              rander: new mf.SelectRander(IOArray),
              fn_onEditingChange: function (table, $row, $cell, field, e) {
                  var InOutRepair = table.getEditingColumnValue($row, 'InOutRepair');
                  var $DeptCodebuttonEditingCell = $row.find("#DeptCode button");
                  var $ManufacturerCodebuttonEditingCell = $row.find("#ManufacturerCode button");
                 // if (!InOutRepair) return;
                  if (InOutRepair && InOutRepair.substring(5, InOutRepair.length) == "020121300002C") {
                      $ManufacturerCodebuttonEditingCell.attr('disabled', true);
                      $DeptCodebuttonEditingCell.attr('disabled', false);
                  }
                  else if (InOutRepair && InOutRepair.substring(5, InOutRepair.length) == "020121300002D") {
                      $ManufacturerCodebuttonEditingCell.attr('disabled', false);
                      $DeptCodebuttonEditingCell.attr('disabled', true);
                  }
                  else {
                      $ManufacturerCodebuttonEditingCell.attr('disabled', true);
                      $DeptCodebuttonEditingCell.attr('disabled', true);
                  }
              },
          },
          {
              field: 'DeptCode', title: fields.ServiceDepartment, align: "center", width: "140",
              rander: new mf.FKRander("#ServiceDepartmentlDialog",
                                        "#ComfirmServiceDepartmentl",
                                        DepartmentFileTable,
                                        new mf.TextRander(
                                            {
                                                size:7, readonly: 'readonly'
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                            searchID: [{ value: "#DepartmentNo", text: "" }]
                                        }),
              fn_onEditingChange: function (table, $row, $cell, field, e) {
                  table.setEditingColumnValue($row, "DeptCode", e.data.Code);
                  table.setEditingColumnValue($row, "DeptName", e.data.Name);
                  ManufacturerID = e.data.OrganizationID;
              },
          },
              //维修部门流水号
             {
                 field: 'ManufacturerID', title: "", visible: false,
              rander: new mf.DynamicValueRander(function () {
                  return ManufacturerID;
              })
             },
          
          {
              field: 'DeptName', title: fields.DepartmentName, align: "center", width: "120",
              rander: new mf.StaticValueRander(),
          },
          {
              field: 'ManufacturerCode', title: fields.MaintenanceVendor, align: "center", width: "140",
              rander: new mf.FKRander("#MaintenanceVendorDialog",
                                        "#ComfirmMaintenanceVendor",
                                        VendorInformationTable,
                                        new mf.TextRander(
                                            {
                                                size:7, readonly: 'readonly'
                                            }
                                        ),
                                        {
                                            btnTitle: "",
                                            btnClass: "btn btn-success btn-xs",
                                            searchID: [{ value: "#VendorNo", text: "" }]
                                        }),
              fn_onEditingChange: function (table, $row, $cell, field, e) {
                  table.setEditingColumnValue($row, "ManufacturerCode", e.data.Code);
                  table.setEditingColumnValue($row, "ManufacturerName", e.data.Name);
                  ManufacturerID = e.data.ManufacturerID;
              },
          },
          //维修厂商流水号             
           {
               field: 'ManufacturerID', title: "", visible: false,
                 rander: new mf.DynamicValueRander(function () {
                     return ManufacturerID;
                 })
          },
          {
              field: 'ManufacturerName', title: fields.VendorName, align: "center", width: "120",
              rander: new mf.StaticValueRander(),
          },
          {
              field: 'Status', title: fields.Status, align: "center", width: "90",
              rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(Namearray)),
          },
          {
              field: 'Creator', title: fields.CreateDocumentStaff, align: "center", width: "100",
              rander: new mf.StaticValueRander(),
          },
          {
              field: 'CreateTime', title: fields.CreateDocumentDate, align: "center", width: "130",
              rander: new mf.TextTimeRander(),
          },
          {
              field: 'Modifier', title: fields.ModifyStaff, align: "center", width: "100",
              rander: new mf.StaticValueRander(),
          },
          {
              field: 'ModifiedTime', title: fields.ModifyDate, align: "center",
              rander: new mf.TextTimeRander(),
          },
        ]
    });

    if (!Table) {
        console.error("create table faild");
        return;
    }

    Table.loadData();
}

var URL = "/MES/EquipmentManagement/EMS00005";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = ["CalledRepairNo", "CalledRepairReason", "MaintenanceRecords", "CalledRepairNo", "DocumentDate",
"EquipmentCode", "Vendor", "Remark", "CalledClerk", "CalledClerkName", "CalledClerkDept",
"DepartmentName", "Site", "Factory", "Principal", "Name", "InnerOuterRepair", "ServiceDepartment",
"MaintenanceVendor", "VendorName", "Status", "CreateDocumentStaff", "CreateDocumentDate",
"ModifyStaff", "ModifyDate", "Normal", "Invalid", "InRepair", "OutRepair", "AccountMaintenance", "AccountNo",
"ReasonNo", "ReasonDescription", "ReasonGroupCode", "GroupDescription", "DealWithDescription", "DealWithDescription",
"Cancel", "ReasonCode", "Search", "Comfirm", "DepartmentNo", "DepartmentFile", "DepartmentDescription", "VendorNo",
"VendorDescription", "VendorInformation", "MaintenancedealRecords", "Handler", "Handledept", "HandleVendor", "IsFee",
"Start", "End", "HandleHour", "HandleContent", "LastChangedBy", "LastChangedDate", "New", "Change", "Deletion", "Save",
"UseCode", "VendorMasterFile", "GroupDescription", "CodeAndNameIsNull", "info", "PleaseSelectRecord", "Isedit", "RecordSuccess",
"RecordFailed", "EditingCanNotCounted", "Isleave", "StartTime", "EndTime", "StartRepairing", "EndRepairing", "CalledRepairNo"
, "For", "WhetherToDelete", "TheData", "HandlerIsNull", "PleaseSaveDownTableDataFirst", "PleaseSaveUpTableDataFirst"];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};
