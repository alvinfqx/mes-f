var model = null;
var viewModel = function () {
    var self = this;
    var Id = null, TypeId = null;
    var formData = {
        MaintenanceItem: ko.observable(""),
        MaintenanceDescription: ko.observable(""),
    };
    ko.applyBindings(formData);

    var Namearry = [], Typearry=[];

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000062" },
        success: function (data) {
            var Listdata = data.PT0191213000062;
            $("#Status").append("<option></option>");
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].Code, text: Listdata[i].Newvalue }
                $("#Status").append("<option value='" + Listdata[i].Code + "'>" + Listdata[i].Newvalue + "</option>");
            }
        }
    });

    //明細
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "EquipmentMaintenanceListID",
        editable:false,
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionDetailBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.EquipmentMaintenanceListID = Id;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: "Get",
                url: "/MES/api/EquipmentManagement/Ems00008GetDetailList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            saveData.EquipmentMaintenanceListID = Id;
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/EMS00008ListDetailSave',
                data: JSON.stringify(saveData),
                success: function (data) {

                    if (data.status === "200") {
                        msg.success(fields.info, data.msg, function () {
                            $('#DetailDialog').modal('hide');
                            self.clearData();
                        });
                    }
                    else {
                        msg.error(fields.info, data.msg);
                        self.clearData();
                    }
                }
            });
        },
        columns: [
             {
                 field: 'ProjectCode', title: fields.MaintenanceItems, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ProjectName', title: fields.MaintenanceDescription, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Attribute', title: fields.AttributeFlag, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Comments', title: fields.Remark, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             }
        ]
    });
    DetailTable.loadData();

    //設備
    var DeviceTable = new mf.Table("#DeviceTable", {
        uniqueId: "FileName",
        height: 380,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDeviceBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.EquipmentMaintenanceListID = Id
            searchData.Code = $('#DeviceDialogEquipmentCode').val();
            searchData.Name = $('#DeviceDialogEquipmentDescription').val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: "Get",
                url: "/MES/api/EquipmentManagement/Ems00008GetDeviceSettingList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        columns: [
             {
                 field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'Status', title: fields.Status, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             },
             {
                 field: 'ResourceCategory', title: fields.ResourceType, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })
             }
        ]
    });
    DetailTable.loadData();

    //種類表格
    var TypeTable = new mf.Table("#TypeTable", {
        uniqueId: "Code",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionTypeBar"),
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                async: false,
                url: "/MES/api/Util/GetParameters",
                data: { "typeIDs": "0191213000023" },
                success: function (data) {
                    var Listdata = data.PT0191213000023;
                    for (var i = 0; i < Listdata.length; i++) {
                        Typearry[i] = { Code: Listdata[i].Code, text: Listdata[i].text, value: Listdata[i].value }
                    }
                    success(Typearry)
                }
            });

        },
        fn_saveData: function (saveData, success) {

        },
        height: 350,
        columns: [
            {
                field: 'Code', title: fields.MaintenanceTypes, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'text', title: fields.MaintenanceTypeDescription, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 60, title: "title" })),
            },
            {
                field: 'value', title: fields.Remark, align: "center", width: "165",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 120, title: "title" })),
            }
        ]
    });

    //保養清單主檔
    var table = new mf.Table("#MaintenanceListTable", {
        uniqueId: "EquipmentMaintenanceListID",
        deleteId: "EquipmentMaintenanceListID",
        isFrozenColumn: true,
        focusField: "Code",
        focusEditField: "Name",
        isRealDelete: true,
        height: window.innerHeight - 128,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
            var $DetailsClick = $row.find("#Details");
            var $TypeCode = $row.find("#TypeCode button");
            var $TypeCodeInput = $row.find("#TypeCode Input");
            var $MaintenanceListsEquipmentClick = $row.find("#MaintenanceListsEquipment");

            if (isAdding) {
                $DetailsClick.attr('disabled', true);
                $MaintenanceListsEquipmentClick.attr('disabled', true);;
            }
            else {
                $DetailsClick.attr('disabled', false);
                $MaintenanceListsEquipmentClick.attr('disabled', false);
                $TypeCode.hide();
                $TypeCodeInput.attr("readonly", "readonly");
            }
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                        type: "Post",
                        url: "/MES/api/EquipmentManagement/Ems00008Delete",
                        data: JSON.stringify({ EquipmentMaintenanceListID: rowData.EquipmentMaintenanceListID }),
                        success: function (data) {
                            if (data.status == "200") {
                                msg.success(fields.info, data.msg);
                                table.loadData();
                            }
                            else {
                                msg.error(fields.info, data.msg);
                            }
                        }
                    });
                    
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.MaintenanceItem();
            searchData.Name = formData.MaintenanceDescription();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00008GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00008Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        operateColumWidth: "125px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:125px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Details" onclick="model.DetailsClick(this)" title="" >' + fields.Details + '</button>&nbsp;' +
                        '<button class="btn btn-success btn-xs" id="MaintenanceListsEquipment" onclick="model.MaintenanceListsEquipmentClick(this)" title="" >' + fields.MaintenanceListsEquipment + '</button>' + '</td>');
            return $td;
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            //    //rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true })) 可新增不可修改
            //    //rander: new mf.StaticValueRander({ readonly: 'readonly', title: "title" })不可新增修改
                    //rander: new mf.TextRander({ size: 20, maxLength: 30, title: "title" }) 可新增修改
            {
                field: 'EquipmentMaintenanceListID', title: fields.MaintenanceLists, align: "center", require: true, width: "100", visible: false,
                rander: new mf.StaticValueRander({ readonly: 'readonly', title: "title" })
            },
            {
                field: 'Code', title: fields.MaintenanceLists, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 10, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CheckMaintenanceListsIsNull)
                ]
            },
            {
                field: 'Name', title: fields.MaintenanceListsDescriptions, align: "center", require: true, width: "144",
                rander: new mf.TextRander({ size: 12, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CheckMaintenanceListsDescriptionIsNull)
                ]
            },
            {
                field: 'TypeCode', title: fields.MaintenanceTypes, align: "center", require: false, width: "150",
                rander: new mf.WirteOnceOnlyRander( new mf.FKRander("#TypeDialog",
                                         "#commit",
                                         TypeTable,
                                         new mf.TextRander(
                                             {
                                                 size: 9, readonly: 'readonly', title: "title"
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         })),
                fn_onEditingChange: function (TypeTable, $row, $cell, field, e) {
                    TypeTable.setEditingColumnValue($row, "TypeCode", e.data.Code);
                    TypeTable.setEditingColumnValue($row, "TypeName", e.data.text);
                    TypeId = e.data.value;
                }
            },
            {
                field: 'Type', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return TypeId;
                })
            },
            {
                field: 'TypeName', title: fields.MaintenanceTypeDescription, align: "center", width: "120",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120,readonly:'readonly', title: true }))
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", require: false, width: "130",
                rander: new mf.TextTimeRander({ title: "title" })
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: "title" })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", require: false,
                rander: new mf.TextTimeRander({ title: "title" })
            }

        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }
    table.loadData();

    

    //明細刷新
    //this.DetailRefreshClick = function () {
    //    if (!DetailTable) {
    //        return;
    //    }
    //    DetailTable.loadData();
    //};
    //明細添加

    this.DetailNewClick = function (obj) {
        mf.dialog('#DetailAddDialog', {
            viewModel: function () {
                DetailAddDialogTable.loadData();
                DetailAddDialogChangeTable.loadData();
            }
        });
    };


    //this.DetailCloseClick = function (obj) {
    //    $('#DetailDialog').modal('hide');
    //};

    //明細新增-未選擇資料
    var DetailAddDialogTable = new mf.Table("#DetailAddDialogTable", {
        uniqueId: "ID",
        height: 390,
        editable: false,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.EquipmentMaintenanceListID = Id;
            searchData.Code = $("#DetailAddMaintenanceItems").val();
            searchData.Name = $("#DetailAddMaintenanceDescription").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/EquipmentManagement/EMS00008ListDetailAdd",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'ID', title: fields.MaintenanceItems, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                 field: 'Code', title: fields.MaintenanceItems, align: "center", require: true, width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'Name', title: fields.MaintenanceDescription, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Attribute', title: fields.AttributeFlag, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }

        ]
    });

    //明細新增已選擇資料
    var DetailAddDialogChangeTable = new mf.Table("#DetailAddDialogChangeTable", {
        uniqueId: "ID",
        height: 390,
        editable: false,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.EquipmentMaintenanceListID = Id;
            searchData.Code = $("#DetailAddMaintenanceItems").val();
            searchData.Name = $("#DetailAddMaintenanceDescription").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/EquipmentManagement/Ems00008DetailList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
            {
                field: 'ID', title: fields.MaintenanceItems, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                 field: 'Code', title: fields.MaintenanceItems, align: "center", require: true, width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'Name', title: fields.MaintenanceDescription, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Attribute', title: fields.AttributeFlag, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }

        ]

    });

    //右移
    this.DetailAddMoveRightClick = function () {

        var $selectedRows = DetailAddDialogTable.getMultiSelectedRows();
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = DetailAddDialogTable.getRowData($selectedRow);
                DetailAddDialogChangeTable.pushRow(rowData);
            });

            DetailAddDialogTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);

    };

    //左移
    this.DetailAddMoveLeftClick = function () {
        //1.帐号
        var $selectedRows = DetailAddDialogChangeTable.getMultiSelectedRows();
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = DetailAddDialogChangeTable.getRowData($selectedRow);
                DetailAddDialogTable.pushRow(rowData);
            });
            DetailAddDialogChangeTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.DetailAddClick = function () {
        var saveData = {};
        var table_data = DetailAddDialogChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.EquipmentMaintenanceListID = Id;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/EMS00008ListDetailSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        DetailAddDialogChangeTable.loadData();
                        DetailAddDialogTable.loadData();
                        $('#DetailAddDialog').modal('hide');
                        DetailTable.loadData();
                        self.clearData();
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                    self.clearData();
                }

            }
        });
    };

    //清理查询字段,清除全选状态
    this.clearData = function () {
        $("#DetailAddMaintenanceItems").val("");
        $("#DetailAddMaintenanceDescription").val("");
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //明細删除
    this.DetailDeletionClick = function () {
        if (!DetailTable)
            return;
        DetailTable.deleteRow();
    };
    //明細保存
    this.DetailComfirmClick = function () {
        if (!DetailTable)
            return;
        DetailTable.save(null, null, true);
        
    };

    //設備取消
    this.DeviceRefreshClick = function () {
        if (!DeviceTable)
            return;
        DeviceTable.goForword(function () {
            DeviceTable.loadData();
            $('#DeviceTable').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#DeviceTable').modal("hide");
        }, fields.Isleave);
    };

    this.DeviceNewClick = function (obj) {
        mf.dialog('#DeviceAddDialog', {
            viewModel: function () {
                DeviceAddDialogTable.loadData();
                DeviceAddDialogChangeTable.loadData();
            }
        });
    };

    this.SearchClick = function (obj) {
        if (DeviceAddDialogTable.hasChange()) {
            msg.warning(fields.info, fields.SaveOrNot, function () {
                self.DeviceAddClick();
            }, null);
        }
        else {
            DeviceAddDialogTable.loadData();
        }
    };

    this.DetailSearchClick = function (obj) {

        if (DetailAddDialogTable.hasChange()) {
            msg.warning(fields.info, fields.SaveOrNot, function () {
                self.DetailAddClick();
            }, null);
        }
        else {
            DetailAddDialogTable.loadData();
        }
    };

    this.DeviceCloseClick = function (obj) {
        $('#DeviceDialog').modal('hide');
        self.clearData();
    };

    //設備資料-未選擇
    var DeviceAddDialogTable = new mf.Table("#DeviceAddDialogTable", {
        uniqueId: "ID",
        height: 390,
        editable: false,
        //noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.EquipmentMaintenanceListID = Id;
            searchData.Code = $("#DetailAddEquipmentCode").val();
            searchData.Name = $("#DetailAddEquipmentName").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/EquipmentManagement/EMS00008ListDeviceAdd",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
             {
                 field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Model', title: fields.Model, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
            },
            {
                field: 'ResourceCategory', title: fields.ResourceType, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'ClassOne', title: fields.EquipmentCategoryOne, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'ClassTwo', title: fields.EquipmentCategoryTwo, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'OrganizationName', title: fields.CustodyDepartment, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }

        ]
    });

    //帐号主档已授权
    var DeviceAddDialogChangeTable = new mf.Table("#DeviceAddDialogChangeTable", {
        uniqueId: "ID",
        height: 390,
        //noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.EquipmentMaintenanceListID = Id;
            searchData.Code = $("#DetailAddEquipmentCode").val();
            searchData.Name = $("#DetailAddEquipmentName").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/EquipmentManagement/Ems00008DeviceSettingList",
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", require: true, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'Model', title: fields.Model, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
            },
            {
                field: 'ResourceCategory', title: fields.ResourceType, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'ClassOne', title: fields.EquipmentCategoryOne, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'ClassTwo', title: fields.EquipmentCategoryTwo, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
            {
                field: 'OrganizationName', title: fields.CustodyDepartment, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }

        ]

    });

    //左表格全选check
    this.checkboxClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');

        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });

        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });

        }
    };

    //右表格全选check
    this.checkboxChangeClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });
        }
    };

    //右移
    this.DeviceAddMoveRightClick = function () {

        var $selectedRows = DeviceAddDialogTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = DeviceAddDialogTable.getRowData($selectedRow);
            DeviceAddDialogChangeTable.pushRow(rowData);
        });

        DeviceAddDialogTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);

    };

    //左移
    this.DeviceAddMoveLeftClick = function () {
        //1.帐号
        var $selectedRows = DeviceAddDialogChangeTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = DeviceAddDialogChangeTable.getRowData($selectedRow);
            DeviceAddDialogTable.pushRow(rowData);
        });
        DeviceAddDialogChangeTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.DeviceAddClick = function () {
        var saveData = {};
        var table_data = DeviceAddDialogChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.EquipmentMaintenanceListID = Id;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/EMS00008ListDeviceAddSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        DeviceAddDialogChangeTable.loadData();
                        DeviceAddDialogTable.loadData();
                        $('#DeviceAddDialog').modal('hide');
                        self.clearData();
                        DeviceTable.loadData();
                        
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                    self.clearData();
                }

            }
        });
    };

    this.clearData = function () {
        $("#DetailAddEquipmentCode").val("");
        $("#DetailAddEquipmentName").val("");
        $("#DetailAddMaintenanceItems").val("");
        $("#DetailAddMaintenanceDescription").val("");
        $("#DeviceDialogEquipmentCode").val("");
        $("#DeviceDialogEquipmentDescription").val("");
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    this.DeviceDialogSearch = function () {
        DeviceTable.loadData();
    }

    //設備删除
    this.DeviceDeletionClick = function () {
        if (!DeviceTable)
            return;
        DeviceTable.deleteRow();
    };
    //設備保存
    this.DeviceComfirmClick = function () {
        if (!DeviceTable)
            return;
        DeviceTable.save(null, null, true);

        

    };

    //明細點擊

    this.DetailsClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#DetailDialog', {
            viewModel: function () {
                Id = row.EquipmentMaintenanceListID;
                DetailTable.loadData();
            }
        });
    };

    //設備點擊
    this.MaintenanceListsEquipmentClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        mf.dialog('#DeviceDialog', {
            viewModel: function () {
                Id = row.EquipmentMaintenanceListID;
                DeviceTable.loadData();
            }
        });
    };

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

    var isClicked = false;
    //保存
    this.saveClick = function () {
      
        if (!table) {
            return;
        }
        if (!isClicked) {
            table.save(null, null, true);
            isClicked = true;
        } else {
            setTimeout(function () {
                table.save(null, null, true);
            }, 1000);
        }
             
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

        if (!(row.EquipmentMaintenanceListID && row.EquipmentMaintenanceListID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.MaintenanceLists + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" readonly="readonly" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.MaintenanceListsDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" readonly="readonly" style="width: 176px;" value="' + row.Name + '" />';

        var columns = [
            {
                field: 'Code', title: fields.MaintenanceLists,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.MaintenanceListsDescription,
                halign: 'center', align: 'center', width: "150", require: true
            }
        ]; 

        var parameters = {
            parentUrl: "/MES/EquipmentManagement/EMS00008MaintenanceList",
            parentMID: "MID",
            tableID: "105",
            rowID: row.EquipmentMaintenanceListID,
            rowData: rowData,
            columns: columns,
            arrayWord: arrayWord
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/Util/CNCLanguages", Parameters: parameters });
            window.location.href = '/MES/Util/CNCLanguages';
        }, null);
    };

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#MaintenanceListTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Ems00008Export?Token=' + token;

            if (formData.MaintenanceItem() && formData.MaintenanceItem().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.MaintenanceItem();
            }

            if (formData.MaintenanceDescription() && formData.MaintenanceDescription().length > 0) {
                exportUrl = exportUrl + '&Name=' + formData.MaintenanceDescription();
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

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Ems00008Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            table.loadData();
                            $("#ImportDialog").modal('hide');
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
    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Cancel", "Comfirm", "LanguageCode", "IsDefault", "LanguageRepeats",
    "MaintenanceTypes", "MaintenanceTypeDescription", "AttributeFlag", "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "MaintenanceLists", "MaintenanceListsDescription", "MaintenanceListsDescriptions",
    "CheckMaintenanceItemsIsNull", "CheckMaintenanceDescriptionIsNull", "CheckAttributeFlagIsNull", "Normal", "Invalid",
    "Prompt", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectLanguage", "PleaseFillLanguageContent", "LanguageRepeats", "CheckMaintenanceTypesDescriptionIsNull", "CheckMaintenanceTypesIsNull",
     "Details", "MaintenanceListsEquipment","Close", "CheckMaintenanceListsIsNull", "CheckMaintenanceListsDescriptionIsNull", "Details", "MaintenanceItems", "MaintenanceDescription", "AttributeFlag", "EquipmentCode", "EquipmentDescription", "ResourceType",
     "EquipmentMasterFile", "EquipmentCode", "EquipmentName", "Model", "EquipmentCategoryTwo", "EquipmentCategoryOne", "CustodyDepartment", "info", "MaintenanceItemsMasterFile", "SaveOrNot", "MaintenanceNamePublic", "Browse", "MaintenanceTypeDescription", "IsDelete", "PleaseSelectFile",
     "Unused","Used"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};