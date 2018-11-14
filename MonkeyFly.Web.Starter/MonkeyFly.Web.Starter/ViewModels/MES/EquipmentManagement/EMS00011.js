function lang() {
    var lang = [];
    var Lang;
    if (language.length > 2) {
        lang = language.split('-');
        var Lang = lang[0] + '-' + lang[1].toString().toUpperCase();
    }
    else {
        Lang = "en";
    }
    return Lang;
}
var parameters;
var viewModel = function () {
    var self = this;
    var Namearry = [], ID = null, RecordsID = null, ServiceReasonLogID = null, StatusValue = null, MaintenanceNo = null, MaintenanceOrderID = null;
    var Lang = lang();
    var height = (window.innerHeight - 250) / 2;
    
    //设置状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000004" },
        success: function (data) {
            parameters = data;
            for (var i = 0; i < parameters.PT0191213000004.length; i++) {                
                Namearry[i] = { value: parameters.PT0191213000004[i].value, text: parameters.PT0191213000004[i].Newvalue };
                if (parameters.PT0191213000004[i].value.substring(5, 18) != "020121300002B" && parameters.PT0191213000004[i].value.substring(5, 18) != "0201213000028") {
                    $("#DocumentStatus").append("<option value='" + parameters.PT0191213000004[i].value + "'>" + parameters.PT0191213000004[i].Newvalue + "</option>");
                }             
            }
        }
    });
    this.clear = function () {
        $("#CategoryCode").val("");
        $("#CategoryDec").val("");
        $("#EquipmentCode").val("");
        $("#EquipmentDesc").val("");
        $("#WorkNumber").val("");
    
        $("#Name").val("");
      
    }

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

    // 彈窗保養類型查詢
    this.OpenMaintenanceType = function (code,id) {
        $("#MaintanceTypeDialog").modal("show");
        $("#MaintanceTypeDialog").modal({ backdrop: 'static', keyboard: false });
        MaintanceTypeTable.loadData();
        $("#MaintanceTypeComfirm").unbind();
        $("#MaintanceTypeComfirm").click(function () {
            var row = MaintanceTypeTable.getSelectedData();
            if (row) {
                $(id).val(row.ParameterID);
                $(code).val(row.Code);
                $("#MaintanceTypeDialog").modal("hide");
            }
        })
    };
    // 保養類型查詢
    this.MaintenanceTypeSearch = function () {
        MaintanceTypeTable.goForwordSafely(function () {
            MaintanceTypeTable.loadData(null, null, 1);
        }, null);
    }
    // 彈窗人員查詢
    this.UserSearch = function () {
        UserTable.goForwordSafely(function () {
            UserTable.loadData(null, null, 1);
        }, null);
    }
    // 彈窗人員查詢
    this.OpenMaintenanceUser = function (code,id) {
        $("#UserDialog").modal("show");
        $("#UserDialog").modal({ backdrop: 'static', keyboard: false });
        UserTable.loadData();
        $("#UserComfirm").unbind();
        $("#UserComfirm").click(function () {
            var row = UserTable.getSelectedData();
            if (row) {
                $(id).val(row.MESUserID);
                $(code).val(row.Emplno);
                $("#UserDialog").modal("hide");
            }
        })
    };
    // 人員查詢
    this.MaintenanceUserSearch = function () {
        UserTable.goForwordSafely(function () {
            UserTable.loadData(null, null, 1);
        }, null);
    }
    // 保養類型查詢
    this.MaintanceTypeSearch = function () {
        MaintanceTypeTable.goForwordSafely(function () {
            MaintanceTypeTable.loadData(null, null, 1);
        }, null);
    }
    // 彈窗保養設備查詢
    this.OpenMaintenanceEquipment = function (code,id) {
        $("#EquipmentDialog").modal("show");
        $("#EquipmentDialog").modal({ backdrop: 'static', keyboard: false });
        EquipmentTable.loadData();
        $("#EquipmentComfirm").unbind();
        $("#EquipmentComfirm").click(function () {
            var row = EquipmentTable.getSelectedData();
            if (row) {
                $(id).val(row.EquipmentID);
                $(code).val(row.Code);
                $("#EquipmentDialog").modal("hide");
            }
        })
    };
    // 保養類型查詢
    this.EquipmentSearch = function () {
        EquipmentTable.goForwordSafely(function () {
            EquipmentTable.loadData(null, null, 1);
        }, null);
    }
   
    //设置主表格
    var table = new mf.Table("#EMS00011TopTable", {
        uniqueId: "MaintenanceOrderID",
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Type = $("#MaintenanceTypeID").val();
            var Status = $("#DocumentStatus").val();
            var Equipment = $("#MaintenanceEquipmentID").val();
            var User = $("#MaintenanceUserID").val();
            var StartNo = $("#StartMaintenanceNo").val();
            var EndNo = $("#EndMaintenanceNo").val();
            var StartDate = $("#StartMaintenanceDate").val();
            var EndDate = $("#EndMaintenanceDate").val();
            //success(data1);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00011GetList',
                data: ({
                    page: pagination.page, rows: pagination.rows, Type: Type, Status: Status, EquipmentID: Equipment,
                    UserID: User, StartNo: StartNo, EndNo: EndNo, StartDate: StartDate, EndDate: EndDate
                }),
                success: function (data) {
                    console.log(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            
        },
        fn_checkeditable: function ($selectedRow) {
            
        },
        fn_onRowClick: function (row) {
            var $mRow = $("#EMS00011TopTable").find(".active");
            if (!($mRow && $mRow.length > 0)) {
                return;
            }

            //itemId = row.ItemID;
            //MainIndex = Number($row.find("td").eq(0).text());
            MaintenanceOrderID = row.MaintenanceOrderID;
            MaintenanceNo = row.MaintenanceNo;
            StatusValue = row.Status;
            DetailTable.goForword(
                function () {                   
                    DetailTable.loadData();
                }, function () {
                    DetailTable.loadData();
                }, fields.SaveOrNot);
        },
        //isFrozenColumn: true,
       
        focusField: "MaintenanceNo",
        focusEditField: "MaintenanceNo",
        height: height,
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'MaintenanceNo', title: fields.MaintenanceNo, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Date', title: fields.DocumentDate, align: "center", width: "90",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'MaintenanceDate', title: fields.MaintenanceDate, align: "center", width: "90",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'TypeName', title: fields.MaintenanceType, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'EquMaiListCode', title: fields.MaintenanceList, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'OrganizationName', title: fields.MaintenanceDepartment, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ManufacturerCode', title: fields.MaintenanceSupplier, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MESUserCode', title: fields.ResponsibleWorkNumber, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MESUserName', title: fields.Name, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'StatusName', title: fields.Status, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
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
                rander: new mf.StaticValueRander({ title: true })
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
    // 明细-操作-保养项目 开窗选取
    var DetailTable = new mf.Table("#EMS00011BottomTable", {
        uniqueId: "MaiOrderEquipmentID",
        editable: false,
        operateColumWidth: "200px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:200px;'> ");
            //alert(data.Status);
            if (data.Status.substring(5, 18) == "0201213000029") {
                $td.append('<button class="btn btn-success btn-xs" id="CloseCase" style="width:67px;" onclick="model.OpenCloseCase(this)" title="' + fields.Closed + '" >' + fields.Closed + '</button>&nbsp;&nbsp;');
                
            }
            console.log(data.Status);
            if (data.Status.substring(5, 18) == "020121300002A") {
                $td.append('<button class="btn btn-success btn-xs" id="Restore" style="width:67px;" onclick="model.OpenRestore(this)" title="' + fields.Restore + '" >' + fields.Restore + '</button>&nbsp;&nbsp;');
            }
            $td.append('<button id="MTItem" class="btn btn-success btn-xs" style="margin-right: 5px; width:67px;" onclick="model.OpenMTItem(this)"  title="' + fields.MaintenanceItem + '" >' + fields.MaintenanceItem + '</button>');
            return $td;
        },
        height: height,
        paginationBar: new mf.PaginationBar("#DetailPageBar"),
        fn_getData: function (pagination, searchData, success) {
            //var row = table.getSelectedData();
            if (!MaintenanceOrderID) { return; }
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00011DetailGetList',
                data: ({ page: pagination.page, rows: pagination.rows, MaintenanceOrderID: MaintenanceOrderID }),
                success: function (data) {
                    
                    success(data);
                }
            });
            
        },
        fn_saveData: function (saveData, success) {

        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            
        {
                field: 'Sequence', title: fields.SequenceNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'EquOrganizationCode', title: fields.MaintenanceDept, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'StatusName', title: fields.Status, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
                //rander: new mf.SelectRander(parameters.PT0191213000004),
                //rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004,
                //    { title: true, IsBoolean: true, disabled: true, noSearchSelectedText: "" })

            },
            {
                field: 'Model', title: fields.Model, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'ExpireDate', title: fields.ExpireDate, align: "center", width: "130",
                rander: new mf.DateRander({ title: true })
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
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });
    // 保养类别：开窗选取
    var MaintanceTypeTable = new mf.Table("#MaintanceTypeTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionMaintanceTypeBar"),
        height: 280,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#CategoryCode").val();
            var Desc = $("#CategoryDec").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Name:Desc, typeID:'000023'}),
                success: function (data) {
            
                    success(data);
                }
            });
            
        },
        fn_saveData: function (saveData, success) {

        },
   
        columns: [
            {
                field: 'Code', title: fields.CategoryCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'Name', title: fields.CategoryDec, reqStartMaintenanceDateuire: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            }
        ]
    });
    // 保养设备：开窗选取
    var EquipmentTable = new mf.Table("#EquipmentTable", {
        uniqueId: "EquipmentID",
        editable: false,
        height: 280,
        paginationBar: new mf.PaginationBar("#paginagionEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#EquipmentCode").val();
            var Desc = $("#EquipmentDesc").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Name: Desc}),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },

        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'Name', title: fields.EquipmentDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            }
        ]
    });
    // 保养人员：开窗选取
    var UserTable = new mf.Table("#UserTable", {
        uniqueId: "MESUserID",
        editable: false,
        height: 280,
        paginationBar: new mf.PaginationBar("#paginagionUserBar"),
        fn_getData: function (pagination, searchData, success) {
            var WorkNumber = $("#WorkNumber").val();
            var Name = $("#Name").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: WorkNumber, UserName:Name}),
                success: function (data) {
                    success(data);
                }
            });
            
        },
        fn_saveData: function (saveData, success) {

        },

        columns: [
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'UserName', title: fields.Description, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            }
        ]
    });
    
    // 明细-操作-保养项目 开窗选取
    var MTItemTable = new mf.Table("#MTItemTable", {
        uniqueId: "MaiOrderProjectID",
        editable: false,
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionMTItemBar"),
        fn_getData: function (pagination, searchData, success) {
            var row = DetailTable.getRowData($Row);
            //var row = DetailTable.getSelectedData();
            
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00011MTItemGetList',
                data: ({ page: pagination.page, rows: pagination.rows, MaiOrderEquipmentID: row.MaiOrderEquipmentID}),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },

        columns: [
            {
                field: 'ProjectCode', title: fields.Item, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'ProjectName', title: fields.ItemDirections, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'AttributeName', title: fields.AttributeFlag, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'AttributeValue', title: fields.Attribute, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'Comments', title: fields.Remark, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

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
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });
    // 還原“还原”按钮
    this.OpenRestore = function (obj) {
        $Row = $(obj).closest("tr");
        var row = DetailTable.getRowData($Row);
        
        var data = {};
        data.MaiOrderEquipmentID = row.MaiOrderEquipmentID;
        data.Token = token;
        mf.ajax({
            type: 'POST',
            url: '/MES/api/EquipmentManagement/Ems00011Restore',
            data: JSON.stringify(data),
            success: function (ret) {
                if (ret.status == 200) {
                    msg.success(fields.Prompt, ret.msg, function () {
                        //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        //window.location.reload();
                        $("#StartMaintenanceNo").val(MaintenanceNo);
                        $("#EndMaintenanceNo").val(MaintenanceNo);
                        $("#StartMaintenanceDate").val("");
                        $("#EndMaintenanceDate").val("");
                        table.loadData();
                        DetailTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, ret.msg);
                }
            }
        });
        // confirm
        //msg.warning(fields.Prompt, "ss",
        //    function () {

        //    }, null);
    }
    // 結案“结案”按钮
    this.OpenCloseCase = function (obj) {
        $Row = $(obj).closest("tr");
        var row = DetailTable.getRowData($Row);

        var data = {};
        data.MaiOrderEquipmentID = row.MaiOrderEquipmentID;
        data.Token = token;
        mf.ajax({
            type: 'POST',
            url: '/MES/api/EquipmentManagement/Ems00011CloseCase',
            data: JSON.stringify(data),
            success: function (ret) {
                if (ret.status == 200) {
                    msg.success(fields.Prompt, ret.msg, function () {
                        //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        //window.location.reload();  
                        $("#StartMaintenanceNo").val(MaintenanceNo);
                        $("#EndMaintenanceNo").val(MaintenanceNo);
                        $("#StartMaintenanceDate").val("");
                        $("#EndMaintenanceDate").val("");
                        table.loadData();
                        DetailTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, ret.msg);
                }
            }
        });
    }
    // “保养项目”按钮
    this.OpenMTItem = function (obj) {
        $Row = $(obj).closest("tr");
        $('#MTItemDialog').modal("show");
        //var row = DetailTable.getRowData($row);
        MTItemTable.loadData();
    }
}

var URL = "/MES/EquipmentManagement/EMS00011";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "DocumentStatus", "Status", "MaintenanceType", "Comfirm", "Cancel", "DocumentDate", "MaintenanceSupplier",
    "MaintenanceUser", "MaintenanceEquipment", "StartMaintenanceDate", "EndMaintenanceDate", "StartMaintenanceNo",
    "EndMaintenanceNo", "MaintenanceNo", "MaintenanceDate", "MaintenanceList", "MaintenanceDept", "ResponsibleWorkNumber",
    "Name", "Remark", "CategoryDec", "CategoryCode", "WorkNumber", "Description", "EquipmentCode", "EquipmentDescription",
    "MaintenanceItem", "Item", "AttributeFlag", "Attribute", "ItemDirections", "Model", "ExpireDate", "Closed",
    "Restore", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Search", "Prompt", "SequenceNo",
    "MaintenanceDepartment", //"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
];

words = arrayWord.join();

var model = null;
mf.deal.InitDateGroup("StartMaintenanceDate", "EndMaintenanceDate");
$("#StartMaintenanceDate").data("datepicker").setDate(new Date());
$("#EndMaintenanceDate").data("datepicker").setDate(new Date());

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};