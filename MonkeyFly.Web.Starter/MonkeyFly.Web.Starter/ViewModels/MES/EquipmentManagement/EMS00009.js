var URL = "/MES/EquipmentManagement/EMS00009";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;

    var formData = {
        Type: ko.observable(""),
        EquipmentID: ko.observable(""),
        UserID: ko.observable(""),
        Status: ko.observable(""),
        StartCode: ko.observable(),
        EndCode: ko.observable(),
        StartDate: ko.observable(),
        EndDate: ko.observable(),
        MaintenanceTypeName: ko.observable(""),
        MaintenanceEquipmentName: ko.observable(""),
        MaintenanceUserName: ko.observable(""),
        DocumentStatusList: ko.observableArray(parameters.PT0191213000004)
    };
    ko.applyBindings(formData);
    var MaintenanceOrderID = null;
    var MOEID = null;
    var tableHeight = (window.innerHeight - 250) / 2;



    //表头
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "MaintenanceOrderID",
        height: tableHeight,
        dblclick_editable: false,
        enter_addble: false,
        isFrozenColumn: true,
        isRealDelete: true,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        operateColumWidth: "134px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:134px;text-align:center;">');
            if (rowData.Status.substring(5, 18) == "0201213000028") {
                var $btn = $('<button id="IssuedClick"  style="margin:2px" class="operation btn btn-success btn-xs" onclick="model.IssuedClick(this)">' + fields.Issued + '</button>'
                            + '<button id="InvalidClick" style="margin:2px" class="operation btn btn-success btn-xs" onclick="model.InvalidClick(this)">' + fields.Invalid + '</button>');
                return $td.append($btn);
            }
            else
            {
                var $btn = $('<button id="IssuedClick"  style="margin:2px" class="operation btn btn-success btn-xs" onclick="model.IssuedClick(this)" disabled>' + fields.Issued + '</button>'
            + '<button id="InvalidClick" style="margin:2px" class="operation btn btn-success btn-xs" onclick="model.InvalidClick(this)" disabled>' + fields.Invalid + '</button>');
                return $td.append($btn);
            }
        },
        fn_onRowClick: function (row) {
            var $row = $("#MainTable").find(".active");
            if (!($row && $row.length > 0)) {
                return;
            }

            MaintenanceOrderID = row.MaintenanceOrderID;
            DetailTable.goForword(
                function () {
                    DetailTable.loadData();
                }, function () {
                    DetailTable.loadData();
                }, fields.SaveOrNot);
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Type = formData.Type();
            searchData.UserID = formData.UserID();
            searchData.Status = formData.Status();
            searchData.EquipmentID = formData.EquipmentID();
            searchData.StartCode = $("#StartCode").val();
            searchData.EndCode = $("#EndCode").val();
            searchData.StartDate = $("#StartDate").val();
            searchData.EndDate = $("#EndDate").val();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00009GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                    console.log(JSON.stringify(data));
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        fn_realDelete: function(rowData, success){
            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems00009Delete",
                data: JSON.stringify({ MaintenanceOrderID: rowData.MaintenanceOrderID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'MaintenanceNo', title: fields.MaintenanceNo, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Date', title: fields.DocumentDate, align: "center", width: "150",
                rander: new mf.DateRander({ title: true })
            },
            {
                field: 'MaintenanceDate', title: fields.MaintenanceDate, align: "center", width: "150",
                rander: new mf.DateRander({ title: true })
            },
            {
                field: 'TypeName', title: fields.MaintenanceTypes, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ListCode', title: fields.MaintenanceList, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'OrganizationName', title: fields.MaintenanceDept, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ManufacturerName', title: fields.MaintenanceSupplier, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'MESUserCode', title: fields.ResponsibleWorkNumber, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'MESUserName', title: fields.Name, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ title: true , maxLength: 120})
            },
            {
                field: 'StatusName', title: fields.Status, align: 'center', width: "50",
                rander: new mf.StaticValueRander(),
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    MainTable.loadData();

    //明细
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "MaiOrderEquipmentID",
        height: tableHeight,
        editable: false,
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#DetailPageBar"),
        operateColumWidth: "100px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:100px;text-align:center;">');
            var $btn = $('<button id="MaintenanceItemClick" class="operation btn btn-success btn-xs" onclick="model.MaintenanceItemClick(this)">' + fields.MaintenanceItem + '</button>');
            $btn.attr("title", fields.MaintenanceItem);
            return $td.append($btn);
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.MaintenanceOrderID = MaintenanceOrderID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00009GetDetailList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        columns: [
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'EquOrganizationCode', title: fields.CustodyDepartment, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'StatusName', title: fields.Status, align: "center", width: "80",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Model', title: fields.Model, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ExpireDate', title: fields.ExpireDate, align: "center", width: "120",
                rander: new mf.DateRander({})
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander()
            }
        ]
    });

    //明细新增弹窗
    var AddDetailTable = new mf.Table("#AddDetailTable",{
        uniqueId: "ID",
        height: 300,
        isFrozenColumn: true,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#AddDetailBar"),
        operateColumWidth: "50px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:50px;text-align:center;">');
            var $btn = $('<input type="checkbox" class="check"/>');
            return $td.append($btn);
        },
        fn_getData: function (pagination, searchData, success) {
            var row = MainTable.getSelectedData();
            EquipmentMaintenanceListID = row.EquipmentMaintenanceListID;
            searchData = {};
            searchData.MaintenanceOrderID = MaintenanceOrderID;
           // searchData.EquipmentMaintenanceListID = EquipmentMaintenanceListID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Code = $("#EquipmentCodeSearch").val();
            searchData.Name = $("#EquipmentDescriptionSearch").val();

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/EMSGetEquMaiEquipmentList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.EquipmentName, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Model', title: fields.EquipmentModel, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ResourceCategory', title: fields.SourceClass, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ClassOneName', title: fields.EquipmentCategoryOne, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ClassTwoName', title: fields.EquipmentCategoryTwo, align: "center", width: "120",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'OrganizationName', title: fields.CustodyDepartment, align: "center", width: "120",
                rander: new mf.StaticValueRander()
            },
        ]
    });

    //明细新增弹窗-查询
    this.ECSEDSSearch = function () {
        AddDetailTable.goForwordSafely(function () {
            AddDetailTable.loadData(null, null, 1);
        }, null);
    }

    //保养项目弹窗-查询
    this.MIMDSearch = function () {
        MaintenanceItemsTable.goForwordSafely(function () {
            MaintenanceItemsTable.loadData(null, null, 1);
        }, null);
    }

    //操作-保养项目弹窗
    var MaintenanceItemsTable = new mf.Table("#MaintenanceItemsTable", {
        uniqueId: "MaiOrderEquipmentID",
        editable: true,
        paginationBar: new mf.PaginationBar("#MaintenanceItemspaginagionBar"),
             
        fn_getData: function (pagination, searchData, success) {
            var MaintenanceItems = $("#MaintenanceItems").val();
            var MaintenanceDescription = $("#MaintenanceDescription").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00009GetProjectList',
                data: { page: pagination.page, rows: pagination.rows, Code: MaintenanceItems, Name: MaintenanceDescription, MaiOrderEquipmentID: MOEID },
                success: function (data) {
                    success(data);
                    console.log("-保养项目弹窗"+JSON.stringify(data))
                }
            });
        },
        fn_saveData: function (saveData, success) {
           
        },
        height: 300,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            var ID = rowData.MaiOrderProjectID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/EquipmentManagement/Ems00009ProjectDelete",
                data: JSON.stringify({ MaiOrderProjectID: ID }),
                success: function (data) {
                    success(data);
                    DetailTable.loadData();
                }
            });
        },
        columns: [
            {
                field: 'Sequence', title: fields.SequenceNo, align: "center", width: "50",
                rander: new mf.TextRander({ title: true ,disabled: true})
            },
            {
                field: 'ProjectCode', title: fields.MaintenanceItem, align: "center", width: "100",
                rander: new mf.TextRander({ title: true, disabled: true })
            },
            {
                field: 'ProjectName', title: fields.MaintenanceDescription, align: "center", width: "120",
                rander: new mf.TextRander({ title: true, disabled: true })
            },
            {
                field: 'AttributeName', title: fields.AttributeFlag, align: "center", width: "100",
                rander: new mf.TextRander({ title: true, disabled: true })
            },
            {
                field: 'AttributeValue', title: fields.Attribute, align: "center", width: "100",
                rander: new mf.TextRander({ title: true, disabled: true })
            },
            {
                field: 'Remark', title: fields.Remark, align: "center",width: "130",
                rander: new mf.TextRander({ title: "title", maxLength: 120, disabled: true })
            }
        ]
    });

    //操作-保养项目弹窗-新增弹窗
    var AddMaintenanceItemsTable = new mf.Table("#AddMaintenanceItemsTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#AddMaintenanceItemspaginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/EMSGetEquMaiProjectList',
                data: { page: pagination.page, rows: pagination.rows, MaintenanceOrderID: MaintenanceOrderID },
                success: function (data) {
                    success(data);
                }
            });
        },
        operateColumWidth: "50px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:50px;text-align:center;">');
            var $btn = $('<input type="checkbox" class="check1"/>');
            return $td.append($btn);
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.MaintenanceItem, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.MaintenanceDescription, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Attribute', title: fields.AttributeFlag, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "100",
                rander: new mf.TextRander({ title: true })
            },
        ]
    });

    //明细新增弹窗-确认
    $("#AddDetailConfirmBtn").click(function () {
        $("#AddDetailConfirmBtn").attr("disabled", true);
        var selected = $('.check:checked');
        if (selected.length == 0) {
            msg.info(fields.Prompt, fields.EquipmentsIsNull);
            return;
        }
        var EquipmentIDs = "";
        for (var i = 0; i < selected.length; i++) {
            var $CheckedTr = $(selected[i]).parent().parent();
            var row = AddDetailTable.getRowData($CheckedTr);
            var CheckedId = row.EquipmentID;
            EquipmentIDs = EquipmentIDs + "," + CheckedId;
        }
        EquipmentIDs = EquipmentIDs.substring(1, EquipmentIDs.length);
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009DetailAdd",
            data: JSON.stringify({ EquipmentIDs: EquipmentIDs, MaintenanceOrderID: MaintenanceOrderID }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        $('#AddDetailDialog').modal('hide');
                        DetailTable.loadData();
                        $("#AddDetailConfirmBtn").attr("disabled", false);
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    });

    //操作-保养项目弹窗显示
    this.MaintenanceItemClick=function(obj)
    {
        var $tr = $(obj).parent().parent();
        var row = DetailTable.getRowData($tr);
        MOEID = row.MaiOrderEquipmentID;
        self.clearInput("#MaintenanceItems", "#MaintenanceDescription");
     
        MaintenanceItemsTable.loadData();
        $('#MaintenanceItemsDialog').modal("show");

    };

    //操作-保养项目弹窗-新增-确认
    $("#AddMaintenanceItemsConfirmBtn").click(function () {
        $("#AddMaintenanceItemsConfirmBtn").attr("disabled", true);
        var selected = $('.check1:checked');
        if (selected.length == 0) {
            msg.info(fields.Prompt, fields.EquipmentsIsNull);
            return;
        }
        var ParameterIDs = "";
        for (var i = 0; i < selected.length; i++) {
            var $CheckedTr = $(selected[i]).parent().parent();
            var row = AddMaintenanceItemsTable.getRowData($CheckedTr);
            console.log(row);
            var CheckedId = row.ParameterID;
            ParameterIDs = ParameterIDs + "," + CheckedId;
        }
        ParameterIDs = ParameterIDs.substring(1, ParameterIDs.length);
        console.log(ParameterIDs);
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009ProjectAdd",
            data: JSON.stringify({ Projects: ParameterIDs, MaintenanceOrderID: MaintenanceOrderID, MaiOrderEquipmentID: MOEID }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        $('#AddMaintenanceItemsDialog').modal('hide');
                        $("#AddMaintenanceItemsConfirmBtn").attr("disabled", false);
                        MaintenanceItemsTable.loadData();
                        DetailTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    });

    this.DeletedMaintenanceItemsBtn = function () {
        if (!MaintenanceItemsTable) {
                    return;
        }
       
     
        MaintenanceItemsTable.deleteRow();
    }

    //操作-保养项目弹窗-新增弹窗显示
    $("#AddMaintenanceItemsBtn").click(function () {
        AddMaintenanceItemsTable.loadData();
        $('#AddMaintenanceItemsDialog').modal("show");

    });

    //查询
    this.searchClick = function () {
        MainTable.loadData(null, null, 1);
        DetailTable.clean();
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //添加
    this.addClick = function () {
        window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/EquipmentManagement/EMS00009Add",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/EquipmentManagement/EMS00009"
                    }
                });
        window.location.href = '/MES/EquipmentManagement/EMS00009Add';
    };

    //编辑
    this.editClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        if (row.Status.substring(5, 18) != "0201213000028") {
            msg.info(fields.Prompt, fields.CanOnlyModifyTheStatusOfOPOfTheNo);
            return;
        }

        window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/EquipmentManagement/EMS00009Edit",
                    Parameters: {
                        TopMID: MID,
                        TopBackURL: "/MES/EquipmentManagement/EMS00009",
                        RowData: row
                    }
                });
        window.location.href = '/MES/EquipmentManagement/EMS00009Edit';
    };

    //删除
    this.deleteClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        MainTable.deleteRow();
        DetailTable.clean();
    };

    //明细添加
    this.addDetailClick = function () {
    var row = MainTable.getSelectedData();
    if (!row) {
        msg.info(fields.Prompt, fields.PleaseSelectRecord);
        return;
    }
        self.clearInput("#EquipmentCodeSearch", "#EquipmentDescriptionSearch");
        AddDetailTable.loadData();
        $('#AddDetailDialog').modal("show");
    };

    //明细删除
    this.deleteDetailClick = function () {
        var row = DetailTable.getSelectedData();
        console.log(row);
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009DetailDelete",
            data: JSON.stringify({ MaiOrderEquipmentID: row.MaiOrderEquipmentID }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg);
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
                DetailTable.loadData();
            }
        });
    };

    //导出
    this.exportClick = function () {
        MainTable.loadDataBack(null, function () {

            var $trLength = $("#MainTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Ems00009Export?Token=' + token;

            if (formData.Type() && formData.Type().length > 0) {
                exportUrl = exportUrl + '&Type=' + formData.Type();
            }

            if (formData.EquipmentID() && formData.EquipmentID().length > 0) {
                exportUrl = exportUrl + '&EquipmentID=' + formData.EquipmentID();
            }

            if (formData.UserID() && formData.UserID().length > 0) {
                exportUrl = exportUrl + '&UserID=' + formData.UserID();
            }

            if (formData.Status() && formData.Status().length > 0) {
                exportUrl = exportUrl + '&Status=' + formData.Status();
            }
    
            if ($("#StartCode").val() && $("#StartCode").val().length > 0) {
                exportUrl = exportUrl + '&StartCode=' + $("#StartCode").val();
            }

            if ($("#EndCode").val() && $("#EndCode").val().length > 0) {
                exportUrl = exportUrl + '&EndCode=' + $("#EndCode").val();
            }

            if ($("#StartDate").val() && $("#StartDate").val().length > 0) {
                exportUrl = exportUrl + '&StartDate=' + $("#StartDate").val();
            }

            if ($("#EndDate").val() && $("#EndDate").val().length > 0) {
                exportUrl = exportUrl + '&EndDate=' + $("#EndDate").val();
            }

            window.location.href = exportUrl;
        });
    };

    //导入    
    this.importClick = function () {
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');

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
                url: window.top.mf.domain + '/MES/api/ImportFile/Ems00009Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    console.log("导入" + JSON.stringify(ret));
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            MainTable.loadData();
                            DetailTable.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    } else {
                        msg.info(fields.Prompt, ret.msg, function () {
                            MainTable.loadData();
                            DetailTable.loadData();
                           
                        });
                    }                                   
                }
            });
        });


    };

    //核发
    this.IssuedClick = function (obj) {
        $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);

        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009OP",
            data: JSON.stringify({ MaintenanceOrderID: MaintenanceOrderID }),
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
    };

    //作废
    this.InvalidClick = function (obj) {
        $row = $(obj).parents("tr");
        var row = DetailTable.getRowData($row);
        mf.ajax({
            type: "post",
            url: "/MES/api/EquipmentManagement/Ems00009CA",
            data: JSON.stringify({ MaintenanceOrderID: MaintenanceOrderID }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg);
                    MainTable.loadData();
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };

    //保养类型弹窗显示
    this.MaintenanceTypeClick = function () {
        self.clearInput("#CategoryCode", "#CategoryDec");
        MaintenanceTypeTable.loadData();
        $('#MaintenanceTypeDialog').modal("show");
    };

    //保养类型确认
    $("#MaintenanceTypeConfirmBtn").click(function () {
        var row = MaintenanceTypeTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#MaintenanceType").val(row.Code);
        formData.Type(row.ParameterID);
        $("#MaintenanceTypeDialog").modal('hide');
        
    });

    //保养类型弹窗-查询
    this.CCCDSearch = function () {
        MaintenanceTypeTable.goForwordSafely(function () {
            MaintenanceTypeTable.loadData(null, null, 1);
        }, null);
    };

    //保养类型弹窗
    var MaintenanceTypeTable = new mf.Table("#MaintenanceTypeTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionMaintenanceTypeBar"),
        fn_getData: function (pagination, searchData, success) {
            ParameterID=formData.Type();
            var CategoryCode = $("#CategoryCode").val();
            var CategoryDec = $("#CategoryDec").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID: "000023", page: pagination.page, rows: pagination.rows, Code: CategoryCode, Name: CategoryDec },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CategoryCode, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.CategoryDec, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
        ]
    });

    //保养设备弹窗显示
    this.MaintenanceEquipmentClick = function () {
        self.clearInput("#EquipmentCode", "#EquipmentDescription");
        EquipmentMasterFileTable.loadData();
        $('#EquipmentMasterFileDialog').modal("show");
    };

    //保养设备确认
    $("#EquipmentMasterFileConfirmBtn").click(function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#MaintenanceEquipment").val(row.Code);
        formData.EquipmentID(row.EquipmentID);
        $("#EquipmentMasterFileDialog").modal('hide');
    });

    //保养设备弹窗-查询
    this.ECEDSearch = function () {
        EquipmentMasterFileTable.goForwordSafely(function () {
            EquipmentMasterFileTable.loadData(null, null, 1);
        }, null);
    };


    //保养设备弹窗
    var EquipmentMasterFileTable = new mf.Table("#EquipmentMasterFileTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#EquipmentMasterFilepaginagion"),
        fn_getData: function (pagination, searchData, success) {
            var EquipmentCode = $("#EquipmentCode").val();
            var EquipmentDescription = $("#EquipmentDescription").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetEquipmentList',
                data: { page: pagination.page, rows: pagination.rows, Code: EquipmentCode, Name: EquipmentDescription },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.EquipmentName, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "200",
                rander: new mf.TextRander({ title: true })
            },
        ]
    });

    //保养人员弹窗显示
    this.MaintenanceUserClick = function () {
        PrincipalTable.loadData();
        self.clearInput("#AccountWorkNumber", "#Accountname");
        $('#PrincipalDialog').modal("show");
    };

    //保养人员确认
    $("#PrincipalConfirmBtn").click(function () {
        var row = PrincipalTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        $("#MaintenanceUser").val(row.UserName);
        formData.UserID(row.MESUserID);
        $("#PrincipalDialog").modal('hide');
    });

    //保养人员弹窗-查询
    this.PrincipalSearch = function () {
        PrincipalTable.goForwordSafely(function () {
            PrincipalTable.loadData(null, null, 1);
        }, null);
    };

    //保养人员弹窗
    var PrincipalTable = new mf.Table("#PrincipalTable", {
        uniqueId: "ID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionPrincipalBar"),
        fn_getData: function (pagination, searchData, success) {
            var AccountWorkNumber = $("#AccountWorkNumber").val();
            var Accountname = $("#Accountname").val();
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/GetUserList',
                data: { page: pagination.page, rows: pagination.rows, Code: AccountWorkNumber, UserName: Accountname },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.AccountWorkNumber, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'UserName', title: fields.Accountname, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
        ]
    });

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }
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
    "CustodyDepartment", "Model", "ExpireDate", "Description", "EquipmentName", "EquipmentMasterFile",
    "AccountWorkNumber", "Accountname", "AccountMaster", "EquipmentModel", "SourceClass", "EquipmentCategoryOne",
    "EquipmentCategoryTwo", "CustodyDepartment", "EquipmentMasterFile", "EquipmentsIsNull", "MaintenanceItems",
    "MaintenanceItems", "MaintenanceDescription", "SequenceNo", "AttributeFlag", "Attribute", "Add", "Delete",
    "Save", "AddMaintenanceItems", "CanOnlyModifyTheStatusOfOPOfTheNo", "MaintenanceTypes"
];
words = arrayWord.join();

mf.toolBar('#container');
mf.deal.InitDateGroup("StartDate", "EndDate");

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

    var formatDate = function (date) {
        return date >= 10 ? date : "0" + date;
    }
    //年-月-日 
    var getDateYMDHMS = function () {
        var d = new Date();
        //填入时间
        //有些时间是7:1分这种，补全为 07:01
        var date = d.getFullYear() + "-" + formatDate((d.getMonth() + 1)) +
                "-" + formatDate(d.getDate()) ;
        return date;
    }

    var today =  getDateYMDHMS();
    $("#StartDate").val(today);
    $("#EndDate").val(today);
};