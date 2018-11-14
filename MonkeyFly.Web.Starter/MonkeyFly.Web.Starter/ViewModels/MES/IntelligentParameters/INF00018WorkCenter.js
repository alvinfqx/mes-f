var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var params = mf.format.getMesParameters('0191213000058,0191213000001,0191213000013,0191213000066');
    var statuslist = params.PT0191213000001;
    var calendar_id, department_id, work_center_id, process_id, work_center_source_id, resource_id, resource_detail_id;
    var Plantarry = [];
    var DialogID = null, DialogID_Children = null, Table_Name = null, CodeID = null;
    var ProcessSettingParameterID;
    var formData = {
        Code: ko.observable(),
        Status: ko.observable(),
        StatusList: ko.observableArray(statuslist)
    };
    ko.applyBindings(formData);
    var ProcessMasterFlag = true;
   
    //获取厂别下拉框
    mf.ajax({
        type: 'Get',
        url: '/MES/api/PopUp/GetPlantList',
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            var PlantList = data.rows;
            for (var i = 0; i < PlantList.length; i++) {
                Plantarry[i] = { value: PlantList[i].OrganizationID, text: PlantList[i].NewName }
            }
        }
    });

    //行事历主档开窗
    var CalendarTable = new mf.Table("#CalendarTable", {
        uniqueId: "CalendarID",
        paginationBar: new mf.PaginationBar("#paginagionCalendarBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#CalendarCodeID").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/GetCalendarList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        height: 400,
        columns: [

              {
                  field: 'Code', title: fields.CalendarCode, align: "center",  width: "130",
                  rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" }),
                 
              },
            {
                field: 'Name', title: fields.CalendarDescription,  align: "center", width: "220",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" })            
            },
            {
                field: 'Ifdefault', title: fields.MainCalendar, align: "center", width: "120",
                rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "300",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    $("#dialog_search").click(function () {
        CalendarTable.loadData(null, null, 1);
    });

    //部门主档开窗
    var DeptTable = new mf.Table("#DeptTable", {
        uniqueId: "OrganizationID",
        paginationBar: new mf.PaginationBar("#paginagionDeptBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#DepartmentCodeID").val();
            searchData.IsPlant = false;
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/GetDeptList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(1111);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 400,
        columns: [
              {
                  field: 'Code', title: fields.DepartmentNo, align: "center", width: "130",
                  rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" }),
              },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center", width: "220",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" })
            },
             {
                 field: 'Comments', title: fields.Remark, align: "center", width: "300",
                 rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
             },
            {
                field: 'PlantID', title: fields.Site, align: "center", width: "120",
                rander: new mf.AutoSelectRander("value", "text", Plantarry, { noSearchSelectedText: "", title: true })
            },           
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    //部门查询
    $("#dept_dialog_search").click(function () {
        DeptTable.loadData(null, null, 1);
    });

    //厂商主档开窗
    var VendorTable = new mf.Table("#VendorTable", {
        uniqueId: "ManufacturerID",
        paginationBar: new mf.PaginationBar("#paginagionVendorBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#VendorCodeID").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/GetManufacturerList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(2222);
                    
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 400,
        columns: [
              {
                  field: 'Code', title: fields.VendorNo, align: "center", width: "150",
                  rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" }),
              },
            {
                field: 'Name', title: fields.VendorDescription, align: "center", width: "280",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" })
            },          
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "340",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            },
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    //厂商查询
    $("#vendor_dialog_search").click(function () {
        VendorTable.loadData(null, null, 1);
    });

    //制程主档开窗
    var ProcessMasterTable = new mf.Table("#ProcessDetailTable", {
        uniqueId: "ParameterID",
        editable: false,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#paginagionProcessDataBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#ProcessNoID").val();
            searchData.typeID = "000017";
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/getParameterList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        height: 280,
        columns: [

             {
                 field: 'Code', title: fields.ProcessNo, align: "center", width: '200px',
                 rander: new mf.TextRander({ title: 'title', size: 12, title: true })
             },
             {
                 field: 'Name', title: fields.ProcessDescription, width: '250px', align: "center",
                 rander: new mf.TextRander({ title: 'title', size: 15, title: true })
             },
              {
                  field: 'Comments', title: fields.Remark, align: "center", width: "300",
                  rander: new mf.TextRander({ size: 16, maxLength: 120, title: true }),
              },
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    //制程主档开窗查询
    $("#process_dialog_search").click(function () {
        ProcessMasterTable.loadData(null, null, 1);
    });

    //工作中心--制程明细开窗表格
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "WorkCenterProcessID",
        paginationBar: new mf.PaginationBar("#paginagionDataBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = work_center_id;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00018WorkCenterGetProcessList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].WorkCenterID = work_center_id;
                saveData.inserted[i].ProcessID = process_id;
            };

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00018WorkCenterProcessSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        height: 260,
        columns: [
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140", require: true,                
                rander: new mf.FKRander("#ProcessDetailDialog",
                                   "#ProcessDetailDialog #ProcessDetailComfire",
                                   ProcessMasterTable,
                                   new mf.TextRander({ readonly: 'readonly', size: 8 }),
                                   {
                                       btnTitle: "",
                                       btnClass: "btn btn-success btn-xs",
                                       searchID: [{ value: "#ProcessNoID", text: "" }]
                                   }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ProcessCode", e.data.Code);
                    table.setEditingColumnValue($row, "ProcessName", e.data.Name);
                    table.setEditingColumnValue($row, "Comments", e.data.Comments);
                    process_id = e.data.ParameterID;

                },
                checkers: [
                           new mf.TextNotEmptyChecker(fields.ProcessNoIsNull)
                ]
            },
             //制程流水号
           {
               field: 'ProcessID', title: "", visible: false,
               rander:new mf.TextRander({title:true})
                   //new mf.DynamicValueRander(function () {
                   //return process_id;
               //})
           },
             //该条工作中心流水号
           {
               field: 'WorkCenterID', title: "", visible: false,
               rander: new mf.TextRander({title:true})
               //    new mf.DynamicValueRander(function () {
               //    return work_center_id;
               //})
           },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, maxLength: 60, title: true, readonly: 'readonly' })

            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title", readonly: 'readonly' })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander()

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ]
    });

    //工作中心--资源设定列表开窗获取资源主档列表
    var ResourceMasterTable = new mf.Table("#ResourceDataTable", {
        uniqueId: "ResourceID",
        editable: false,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResourceDataBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#SourceCodeID").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/GetResourceList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);                 
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        height: 400,
        columns: [

             {
                 field: 'Class', title: fields.SourceClass, align: "center", width: '100px',
                 rander: new mf.TextRander({ title: 'title', size: 8 })
             },
             {
                 field: 'Code', title: fields.SourceCode, width: '200px', align: "center",
                 rander: new mf.TextRander({ title: 'title', size: 15})
             },
              {
                  field: 'Description', title: fields.SourceDescription, width: '200px', align: "center",
                  rander: new mf.TextRander({ title: 'title', size: 15})
              },
              {
                  field: 'Comments', title: fields.Remark, align: "center", width: "250",
                  rander: new mf.TextRander({ size: 16, maxLength: 120})
              },
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    //资源代号开窗查询
    $("#resource_dialog_search").click(function () {
        ResourceMasterTable.loadData(null, null, 1);
    });

    //资源明细
    var ResourceDetailTable = new mf.Table("#ResourceDetailTable", {
        uniqueId: "DetailID",
        editable: false,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResourceDetailBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.ResourceID = resource_detail_id;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00015GetDetailsList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 360,
        columns: [
            {
                field: 'DetailCode', title: fields.SourceDetail, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, title: true, readonly: 'readonly' })
            },
            {
                field: 'DetailName', title: fields.Description, align: "center", width: "140",
                rander: new mf.TextRander({ size: 12, title: true, readonly: 'readonly' })

            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title", readonly: 'readonly' })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander()

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ]
    });


    //工作中心--资源设定开窗表格
    //var ResourceSetTable = new mf.Table("#ResourceSetTable", {
    //    uniqueId: "WorkCenterResourcesID",
    //    paginationBar: new mf.PaginationBar("#paginagionResourceSetBar"),
    //    isFrozenColumn: true,
    //    fn_getData: function (pagination, searchData, success) {
    //        if (!searchData)
    //            searchData = {};
    //        searchData.WorkCenterID = work_center_source_id;
    //        mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/IntelligentParameter/Inf00018WorkCenterGetResourcesList',
    //            data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
    //            success: function (data) {
    //                console.log(data);                   
    //                success(data);
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success) {
    //        mf.ajax({
    //            type: 'Post',
    //            url: '/MES/api/IntelligentParameter/Inf00018WorkCenterResourcesSave',
    //            data: JSON.stringify(saveData),
    //            success: function (data) {
    //                console.log(data);
    //                success(data);
    //            }
    //        });
    //    },
    //    fn_onEditingRowRandFinish: function ($row, isAdding, data) {            
    //        var $ResourcesDetailsEditingCell = $row.find("#ResourcesDetailsClick");
    //        if (isAdding) {
    //            $ResourcesDetailsEditingCell.attr('disabled', true);
    //        }
    //        else {
    //            $ResourcesDetailsEditingCell.attr('disabled', false);
    //        }
    //    },
    //    height: 220,
    //    operateColumWidth: "120px",
    //    fn_createBtn: function (data) {
    //        var $td = $("<td style='text-align:center; width:120px;'> ");
    //        $td.append('<button class="btn btn-success btn-xs" style="margin-right:5px;" id="ResourcesDetailsClick" onclick="model.ResourcesDetailsClick(this)" title="' + fields.ResourcesDetails + '" >' + fields.ResourcesDetails + '</button>');
    //        return $td;
    //    },
    //    columns: [
    //         {
    //             field: 'Class', title: fields.SourceClass, align: "center", width: "100",
    //             rander: new mf.TextRander({ size: 8, title: true, readonly: 'readonly' })
    //         },
    //        {
    //            field: 'ResourceCode', title: fields.SourceCode, align: "center", width: "140", require: true,              
    //            rander: new mf.FKRander("#ResourceDataDialog",
    //                               "#ResourceDataDialog #ResourceDataComfire",
    //                               ResourceMasterTable,
    //                               new mf.TextRander({ readonly: 'readonly', size: 8 }),
    //                               {
    //                                   btnTitle: "",
    //                                   btnClass: "btn btn-success btn-xs",
    //                                   searchID: [{ value: "#SourceCodeID", text: "" }]
    //                               }),
    //            fn_onEditingChange: function (table, $row, $cell, field, e) {
    //                table.setEditingColumnValue($row, "Class", e.data.Class);
    //                table.setEditingColumnValue($row, "ResourceCode", e.data.Code);
    //                table.setEditingColumnValue($row, "ResourceName", e.data.Description);
    //                table.setEditingColumnValue($row, "Comments", e.data.Comments);
    //                resource_id = e.data.ResourceID;

    //            },
    //            checkers: [
    //                new mf.TextNotEmptyChecker(fields.SourceCodeIsNull)
    //            ]
    //        },
    //         //资源流水号
    //       {
    //           field: 'ResourceID', title: "", visible: false,
    //           rander: new mf.DynamicValueRander(function () {
    //               return resource_id;
    //           })
    //       },
    //         //该条工作中心流水号
    //       {
    //           field: 'WorkCenterID', title: "", visible: false,
    //           rander: new mf.DynamicValueRander(function () {
    //               return work_center_source_id;
    //           })
    //       },
    //        {
    //            field: 'ResourceName', title: fields.SourceDescription, align: "center", width: "140",
    //            rander: new mf.TextRander({ size: 14, maxLength: 60, title: true, readonly: 'readonly' })

    //        },
    //        {
    //            field: 'Comments', title: fields.Remark, align: "center", width: "150",
    //            rander: new mf.TextRander({ size: 14, maxLength: 120, title: "title", readonly: 'readonly' })
    //        },
    //        {
    //            field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
    //            rander: new mf.StaticValueRander()
    //        },
    //        {
    //            field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
    //            rander: new mf.TextTimeRander()
    //        },
    //        {
    //            field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
    //            rander: new mf.StaticValueRander()

    //        },
    //        {
    //            field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
    //            rander: new mf.TextTimeRander(),
    //        },
           
    //    ]
    //});

   

    //初始化(部门/厂商)开窗
    DialogID = "#DeptDetailDialog";
    DialogID_Children = "#DeptDetailDialog #DeptComfire";
    Table_Name = DeptTable;
    CodeID = "#DepartmentCodeID";

    console.log(params.PT0191213000066)
    //主表
    var table = new mf.Table("#INF00018WorkCenterTable", {
        uniqueId: "WorkCenterID",
        focusField: "Code",
        focusEditField: "Name",
        isFrozenColumn: true,
        height: window.innerHeight - 150,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var InoutMark = data['InoutMark'];
            //var $DetailsClickEditingCell = $row.find("#DetailsClick"),
            //    $ResourceSetClickEditingCell = $row.find("#ResourceSetClick");

            //if (isAdding) {
            //    $DetailsClickEditingCell.attr('disabled', true);
            //    $ResourceSetClickEditingCell.attr('disabled', true);
            //}
            //else {
            //    $DetailsClickEditingCell.attr('disabled', false);
            //    $ResourceSetClickEditingCell.attr('disabled', false);
            //}
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00018GetWorkCenterList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00018WorkCenterSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {

            var ID = rowData.WorkCenterID;

            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00018WorkCenterDeleted",
                data: JSON.stringify({ WorkCenterID: ID }),
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
        operateColumWidth: "150px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:150px;'> ");
            $td.append('<button class="btn btn-success btn-xs" style="margin-right:5px;" id="ProcessSetting" onclick="model.ProcessSettingClick(this)" title="' + fields.ProcessSetting + '" >' + fields.ProcessSetting + '</button>');
            $td.append('<button class="btn btn-success btn-xs" id="ResourceSetClick" onclick="model.ResourceSetClick(this)" title="' + fields.ResourceSet + '" >' + fields.ResourceSet + '</button>');
            return $td;
        },
        //fn_onRowClick: function (data) {
        //    ProcessSettingParameterID = data.WorkCenterID
        //    console.log(ProcessSettingParameterID)
        //},
        LastWidth: "35",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.WorkCenterNo, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WorkCenterNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.WorkCenterDescription, require: true, align: "center", width: "150",
                rander:new mf.TextRander({ size: 14, maxLength: 60, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.WorkCenterDescriptionIsNull)
                ],
            },
            //內外製
            {
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "120",
                rander: new mf.SelectRander(params.PT0191213000058),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "DeptCode", "");
                    table.setEditingColumnValue($row, "DeptName", "");
                }
            },
             //(部门/厂商)开窗
             {
                 field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "160",require:true,
                 rander: new mf.OtherFKRander(DialogID, DialogID_Children, Table_Name,
                                new mf.TextRander({ readonly: 'readonly', size: 8 }),
                                {
                                    btnTitle: "",
                                    btnClass: "btn btn-success btn-xs",
                                    fn_onBtnClick: function ($randerEditingCell, rander, $cell, field, fn_onChange) {
                                        var InoutMark_Value = table.getEditingColumnValue($cell.parents(), 'InoutMark');
                                        
                                        if (InoutMark_Value.substring(5, InoutMark_Value.length) === "020121300002E") {
                                            DialogID = "#DeptDetailDialog";
                                            DialogID_Children = "#DeptDetailDialog #DeptComfire";
                                            Table_Name = DeptTable;
                                            CodeID = "#DepartmentCodeID";
                                        }
                                        else {
                                            DialogID = "#VendorDetailDialog";
                                            DialogID_Children = "#VendorDetailDialog #VendorComfire";
                                            Table_Name = VendorTable;
                                            CodeID = "#VendorCodeID";
                                        }
                                        if (DialogID_Children && DialogID_Children.length > 0) {
                                            var $modalComfirmBtn = $(DialogID_Children);
                                            if ($modalComfirmBtn.length > 0) {
                                                $modalComfirmBtn.click(function () {
                                                    var rowData = Table_Name.getSelectedData();
                                                    if (rowData == null)
                                                        return;
                                                    var e = {
                                                        currentTarget: $cell[0],
                                                        data: rowData
                                                    };
                                                    fn_onChange && fn_onChange(e);
                                                    $(DialogID).modal("hide");
                                                });
                                            }

                                        }

                                        $(CodeID).val("");
                                        Table_Name.loadData();
                                        $(DialogID).modal({ backdrop: 'static', keyboard: false });
                                        $(DialogID).modal("show");
                                    }
                                }),
                 fn_onEditingChange: function (table, $row, $cell, field, e) {
                     table.setEditingColumnValue($row, "DeptCode", e.data.Code);
                     table.setEditingColumnValue($row, "DeptName", e.data.Name);
                     if (e.data.OrganizationID && e.data.OrganizationID.length > 0) {
                         department_id = e.data.OrganizationID;
                     }
                     else {
                         department_id = e.data.ManufacturerID;
                     }
                 },
                 checkers: [
                    new mf.TextNotEmptyChecker(fields.DepartmentNoIsNull)
                 ]
             },
             {
                 field: 'DeptName', title: fields.DepartmentDesOrManufacturersDes, align: "center", width: "160",
                 rander: new mf.TextRander({ readonly: "readonly", size: 12 }),
             },
          //(部门/厂商)流水号
           {
               field: 'DepartmentID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return department_id;
               })
           },
             {
                 field: 'CalendarCode', title: fields.CalendarNo, align: "center", width: "140",require:true,
                 rander: new mf.FKRander("#CalendarDetailDialog",
                                 "#CalendarDetailDialog #CalendarComfire",
                                 CalendarTable,
                                 new mf.TextRander({ readonly: 'readonly', size: 8 }),
                                 {
                                     btnTitle: "",
                                     btnClass: "btn btn-success btn-xs",
                                     searchID: [{ value: "#CalendarCodeID", text: "" }]
                                 }),
                 fn_onEditingChange: function (table, $row, $cell, field, e) {
                     table.setEditingColumnValue($row, "CalendarCode", e.data.Code);
                     calendar_id = e.data.CalendarID;
                 },
                 checkers: [
                    new mf.TextNotEmptyChecker(fields.CalendarCodeIsNull)
                 ]
             },
             //行事历流水号
             {
               field: 'CalendarID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return calendar_id;
               })
             },
              {
                  field: 'EnableShift', title: fields.EnableShift, align: "center", require: true, width: "100",
                  rander: new mf.SelectRander([{ value: false, text: fields.NotEnable }, { value: true, text: fields.Enable }]),
              },
               {
                   field: 'ResourceReport', title: fields.ResourceReporting, align: "center", width: "70",
                   rander: new mf.SingleCheckBoxRander({ yes: true, no: false })
               },
               //派工模式
            {
                field: 'DispatchMode', title: fields.DispatchMode, align: "center", width: "120",
                rander: new mf.SelectRander(params.PT0191213000066),
            },
             {
                 field: 'Status', title: fields.Status, align: "center", width: "100",
                 rander: new mf.SelectRander(params.PT0191213000001),
             },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 120, title: true })
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
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
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
          //  window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00018WorkCenter", Parameters: MID });
            window.location.reload();
            
        }, function () {
          //  window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00018WorkCenter", Parameters: MID });
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

        if (!(row.WorkCenterID && row.WorkCenterID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.WorkCenterNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.WorkCenterDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Code', title: fields.WorkCenterNo,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.WorkCenterDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00018WorkCenter",
            parentMID: "MID",
            tableID: "53",
            rowID: row.WorkCenterID,
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

            var $trLength = $("#INF00018WorkCenterTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00018WorkCenterExport?Token=' + encodeURIComponent(token);

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (typeof (formData.Status()) != "undefined") {
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

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00018WorkCenterImport',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
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

    //明细
    //this.DetailsClick = function (obj) {
    //    var $tr = $(obj).parent().parent();
    //    var row = table.getRowData($tr);

    //    if (!row) {
    //        msg.info(fields.info, fields.PropertyNumberIsEdit);
    //        return;
    //    }
    //    console.log(row);
    //    mf.dialog('#DetailDialog', {
    //        viewModel: function () {
    //            $("#WorkCenterNoID").val(row.Code);
    //            $("#WorkCenterDescriptionID").val(row.Name);
    //            $("#WorkCenterNoID").attr("title", row.Code);
    //            $("#WorkCenterDescriptionID").attr("title", row.Name);
    //            work_center_id = row.WorkCenterID;
    //            DetailTable.loadData();
    //            //提交数据
    //            $("#DetailComfirm").click(function () {
    //                if (!DetailTable) {
    //                    return;
    //                }
    //                DetailTable.save(null, null, true);
    //            })
    //        }
    //    });
    //};

    //資源設定開窗
    var ResourceSetCode, ResourceSetName, ResourceSetParameterID;
    var ResourceDDL = [];
    this.ResourceSetClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        var DDLsearch = {};//資源設定-下拉選單
        DDLsearch.WorkCenterID = row.WorkCenterID;
        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentParameter/Inf00018WorkCenterResourceProcess',
            data: DDLsearch,
            success: function (data) {    
                console.log(data);

                ResourceDDL.length = data.length;
                for (var i = 0; i < data.length; i++) {
                    
                    ResourceDDL[i] = { text: data[i].ProcessDescription, value: data[i].ProcessID, EnableProcess: data[i].EnableProcess }
                }
                console.log(ResourceDDL);


                mf.dialog('#ResourceSetDialog', {
                    viewModel: function () {
                        ResourceSetCode = row.Code;
                        ResourceSetName = row.Name;
                        ResourceSetParameterID = row.WorkCenterID;
                        $('#WorkCenterConditin').val(ResourceSetCode);
                        $('#DescriptionCondition').val(ResourceSetName);
                        ResourceSetTable.loadData();
                        ResourceSetChangeTable.loadData();
                    }
                });
            }
        });
        //console.log(ResourceDDL);
        //for (var i = 0; i < ResourceDDL.length; i++)
        //{
        //    alert("Resource");
        //    alert(ResourceDDL[i].text);
        //}

        


    };

    var ResourceSetTable = new mf.Table("#ResourceSetTable", {
        uniqueId: "Id",
        height: 370,
        noNumColumn: true,
        editable:true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedResource"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = ResourceSetParameterID;

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetNoWorkCenterResourceList",
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
                field: 'Id', title: fields.SourceClass, align: "center", require: true, width: "100",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ClassName', title: fields.SourceClass, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Code', title: fields.SourceCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Name', title: fields.ShowName, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.SelectRander(params.PT0191213000001),
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.SelectRander({ text: 0, value: fields.no }, { text: 1, value: fields.yes }))
            }
        ]
    });

    var DDLWorkCenterData = [];

    this.ProcessIDChanges = function (obj) {
        var row = $(obj).parent().parent();

        var DDLWorkCenter = {};
        
        var ProcessID = row.find("#ProcessID");
        var OperationIDChange = row.find("#with-btn-sub-cell");
        var OperationNameChange = row.find("#OperationName");

        OperationIDChange.val("");
        OperationNameChange.val("");
        var ReSourceBtn = row.find("button");

        DDLWorkCenter.ProcessID = ProcessID.find(":selected").val();
        ProcessResourceId = ProcessID.find(":selected").val();
        ProcessResourceValue = ProcessID.find(":selected").text();

        for (var i = 0; i < ResourceDDL.length; i++) {
            if (ResourceDDL[i].value === ProcessID.find(":selected").val()) {
                if (ResourceDDL[i].EnableProcess === true) {
                    ReSourceBtn.attr('disabled', false);
                }
                else
                {
                    ReSourceBtn.attr('disabled', true);
                }
            }
        }
    }

    //資源設定-工序開窗
    var OperationID;
    tableOperation = new mf.Table("#OperationTable", {
        uniqueId: "OperationID",
        paginationBar: new mf.PaginationBar("#paginagionOperationBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.ProcessID = ProcessResourceId;
            $('#ProcessConditin').val(ProcessResourceValue);

            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018WorkCenterResourceOperation",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) { },
        height: 320,
        columns: [
             {
                 field: 'OperationID', title: fields.ProcessID, align: "center", width: '100px', require: true,visible:false,
                 rander: new mf.TextRander({ title: 'title', size: 12 })
             },
             {
                 field: 'WorkOrderDescription', title: fields.Process, width: '100px', align: "center",
                 rander: new mf.TextRander({ title: 'title', size: 15 })
             }
        ]
    });
    var ProcessResourceId, ProcessResourceValue;
    var ResourceSetChangeTable = new mf.Table("#ResourceSetChangeTable", {
        uniqueId: "Id",
        height: 370,
        noNumColumn: true,
        dblclick_editable: true,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedResourceChange"  onclick="model.checkboxChangeClick(this);"/>',
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditing) {

            var ProcessID = $row.find("#ProcessID");
            ProcessID.attr("onchange", "model.ProcessIDChanges(this)")

            var DDLWorkCenter = {};
            DDLWorkCenter.ProcessID = ProcessID.find(":selected").val();
            
            var OperationID = $row.find("#OperationID");
            var ReSourceBtn = $row.find("button");
            ReSourceBtn.attr('disabled', true);
            
            if (DDLWorkCenter.ProcessID != null) {
                ProcessResourceId = DDLWorkCenter.ProcessID;
                ProcessResourceValue = ProcessID.find(":selected").text();

                for (var i = 0; i < ResourceDDL.length; i++) {
                    if (ResourceDDL[i].value === ProcessID.find(":selected").val()) {
                        if (ResourceDDL[i].EnableProcess === true) {
                            ReSourceBtn.attr('disabled', false);
                        }
                        else {
                            ReSourceBtn.attr('disabled', true);
                        }
                    }
                }
            }
            else {
                ReSourceBtn.attr('disabled', true);
            }
            
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = ResourceSetParameterID;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetWorkCenterResourceList",
                data: searchData,
                success: function (data) {
                  //  console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
            {
                field: 'Id', title: fields.SourceClass, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                 field: 'IfMain', title: fields.MainResource, align: "center", require: true, width: "100",
                 rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
                 fn_onEditingChange: function (self, $row, $cell, field, e, rowsData) {
                    
                     var trList = $cell.parents("tbody").find("tr").not(".editingRow ")//.find("span").text("否")
                     for (var i = 0; i < trList.length; i++) {
                         console.log($(trList[i]).children().eq(2).find("span").text("否"))
                     }
                     for (var i = 0; i < rowsData.length; i++) {
                         rowsData[i].IfMain = "0"
                     }
       
                 }
             },
              {
                  field: 'ClassName', title: fields.SourceClass, align: "center", require: true, width: "100",
                  rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
              },
            {
                field: 'Code', title: fields.SourceCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Name', title: fields.ShowName, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(params.PT0191213000001))
            },
            {
                field: 'ProcessID', title: fields.ManufacturingProcess, align: "center", require: false, width: "140",
                rander: new mf.AutoSelectRander("value", "text", ResourceDDL, { noSearchSelectedText: "", title: true })
            },
            {
                field: 'OperationName', title: fields.Process, align: "center", width: '140px',
                rander: new mf.FKRander("#OperationDialog",
                               "#OperationDialog #GroupID",
                               tableOperation,
                               new mf.TextRander({ readonly: 'readonly', size: 8 }),
                               {
                                   btnTitle: "",
                                   btnClass: "btn btn-success btn-xs",
                                   searchID: [{ value: "#ProcessConditin", text: "" }]
                               }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "OperationName", e.data.WorkOrderDescription);
                    table.setEditingColumnValue($row, "OperationID", e.data.OperationID);


                    OperationID = e.data.OperationID;

                },
                checkers: [
                       new mf.ConfigurableChecker(fields.ManufacturingProcessMsg, function (value, $row) {

                           var ProcessID = $row.find("#ProcessID");

                           for (var i = 0; i < ResourceDDL.length; i++) {
                               if (ResourceDDL[i].value === ProcessID.find(":selected").val())
                               {
                                   if (ResourceDDL[i].EnableProcess === true) {
                                       if (value === "") {
                                           return true;
                                       }
                                   }
                               }
                           }

                           return false;
                       })
                ]

            },
                //群组码流水号
                 {
                     field: 'OperationID', title: "", visible: false,
                     rander: new mf.DynamicValueRander(function () {
                         return OperationID;
                     })
                 },
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
    this.ResourceSetMoveRightClick = function () {
        if (!ResourceSetChangeTable.editFinish()) {
            return false;
        }
        
        var $selectedRows = ResourceSetTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ResourceSetTable.getRowData($selectedRow);
            ResourceSetChangeTable.pushRow(rowData);
        });

        ResourceSetTable.deleteMultiSelectedRows();

        $("#IsCheckedResourceChange").prop("checked", false);
        $("#IsCheckedResource").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;

    };

    //左移
    this.ResourceSetMoveLeftClick = function () {
        //1.帐号
        var $selectedRows = ResourceSetChangeTable.getMultiSelectedRows();
        //console.log($selectedRows)
        var num = 0;
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ResourceSetChangeTable.getRowData($selectedRow);
            console.log(rowData)
            if (rowData.ProcessID) {
                num++;
            }
        });

        if (num > 0) {
            msg.warnings(fields.Prompt, fields.IsRemove, function () {
                $selectedRows.each(function (i, $selectedRow) {
                    var rowData = ResourceSetChangeTable.getRowData($selectedRow);

                    ResourceSetTable.pushRow(rowData);
                    ProcessMasterFlag = false;

                });


                ResourceSetChangeTable.deleteMultiSelectedRows();
                $("#IsChecked").prop("checked", false)
                $("#IsCheckedResourceChange").prop("checked", false);
                $("#IsCheckedResource").prop("checked", false);
                $("#IsDepartmentCheckedChange").prop("checked", false);
                $("#IsDepartmentChecked").prop("checked", false);
            })
        } else {
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = ResourceSetChangeTable.getRowData($selectedRow);

                if (rowData.OperationID) {
                    num++;
                }
                ResourceSetTable.pushRow(rowData);
            });


            ResourceSetChangeTable.deleteMultiSelectedRows();
            $("#IsChecked").prop("checked", false)
            $("#IsCheckedResourceChange").prop("checked", false);
            $("#IsCheckedResource").prop("checked", false);
            $("#IsDepartmentCheckedChange").prop("checked", false);
            $("#IsDepartmentChecked").prop("checked", false);
        }

        ProcessMasterFlag = false;
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.ResourceSetSaveClick = function () {
        var num = 0;
        if (!ResourceSetChangeTable.editFinish()) {
            return false;
        }

        var saveData = {};
        var table_data = ResourceSetChangeTable.getAllRowData();

        for (var i = 0; i < table_data.length ; i++) {
            table_data[i].WorkCenterID = ResourceSetParameterID;
        }
        saveData.data = table_data;
        saveData.WorkCenterID = ResourceSetParameterID;
        console.log(saveData);

        for (var i = 0; i < saveData.data.length; i++) {
            if (saveData.data[i].IfMain == "1") {
                num++
            };
            //if (num >= 2) {
            //    msg.info(fields.Prompt, fields.MainResourceIsOnlyOne);
            //    return
            //}
        };
        if (num >= 2) {
            msg.info(fields.Prompt, fields.MainResourceIsOnlyOne);
            ResourceSetChangeTable.loadData()
            return
        }
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018WorkCenterResourceSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        ResourceSetChangeTable.loadData();
                        ResourceSetTable.loadData();
                        $('#ResourceSetDialog').modal('hide');
                        ProcessMasterFlag = true;
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    };

    this.ResourceSetDialogClose = function (node) {
        if (ProcessSettingTable.hasChange() || ProcessSettingChangeTable.hasChange() ||
            ResourceSetChangeTable.hasChange() || ResourceSetTable.hasChange()) {
            msg.warnings(fields.Prompt, fields.IsOrSave,
                function () {
                    if (node == '#ResourceSetDialog') { setTimeout(function () { self.ResourceSetSaveClick() }, 300); }
                    else if (node == '#ProcessSettingDialog') { setTimeout(function () { self.ProcessSettingSaveClick() }, 300) }

                },
                function () { $(node).modal("hide") })
        } else {
            $(node).modal("hide")
        }

        for (var i = 0;i<ResourceDDL.length;i++)
        {
            console.log(ResourceDDL[i]);
            ResourceDDL[i].EnableProcess = false;
        }
        //alert(ResourceDDL.length);
        //ResourceDDL = [];
        if (!ResourceSetChangeTable.editFinish()) {
            return false;
        }
        ResourceSetChangeTable.clean();
    };

    //制程设定開窗
    var ProcessSettingCode, ProcessSettingName, thisRow;

    this.ProcessSettingClick = function (obj) {
        if (!table) {
            return;
        }

        var $tr = $(obj).parent().parent();
         thisRow = table.getRowData($tr);

         if (!thisRow) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
        }

         if (!(thisRow.WorkCenterID && thisRow.WorkCenterID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }
         ProcessSettingParameterID = thisRow.WorkCenterID
        //var parameters = {
        //    parentUrl: "/MES/IntelligentParameters/INF00018WorkCenter",
        //    rowID: row.WorkCenterID,
        //    Code: row.Code,
        //    Name: row.Name,
        //    arrayWord: arrayWord
        //};
        
        table.goForwordSafely(function () {   
                ProcessSettingTable.loadData();
                ProcessSettingChangeTable.loadData();
                $("#ProcessSettingConditin").val(thisRow.Code)
                $("#ProcessSettingDescriptionCondition").val(thisRow.Name)
            $("#ProcessSettingDialog").modal("show");
            
            //window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00018WorkCenterProcess", Parameters: parameters });
            //window.location.href = '/MES/IntelligentParameters/INF00018WorkCenterProcess';
        }, null);
    }
                                             
   var ProcessSettingTable = new mf.Table("#ProcessSettingTable", {
        uniqueId: "Id",
        height: 350,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = ProcessSettingParameterID;
            console.log(searchData)
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetNoProcessWorkCenterList",
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
                 field: 'Id', title: fields.ProcessNo, align: "center", require: true, width: "100",visible:false,
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'ProcessNo', title: fields.ProcessNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'EnableProcess', title: fields.EnableProcess, align: "center", require: false, width: "100",
                rander: new mf.SelectRander([{ value: false, text: fields.no }, { value: true, text: fields.yes }]),
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    var ProcessSettingChangeTable = new mf.Table("#ProcessSettingChangeTable", {
        uniqueId: "Id",
        height: 350,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckeds"  onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = ProcessSettingParameterID;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00018GetProcessWorkCenterList",
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
                field: 'Id', title: fields.ProcessNo, align: "center", require: true, width: "100", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
             {
                 field: 'ProcessNo', title: fields.ProcessNo, align: "center", require: true, width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'EnableProcess', title: fields.EnableProcess, align: "center", require: false, width: "100",
                rander: new mf.SelectRander([{ value: false, text: fields.no }, { value: true, text: fields.yes }]),
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false, width: "100",
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
    this.ProcessSettingMoveRightClick = function () {

        var $selectedRows = ProcessSettingTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessSettingTable.getRowData($selectedRow);
            ProcessSettingChangeTable.pushRow(rowData);
        });

        ProcessSettingTable.deleteMultiSelectedRows();

        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        ProcessMasterFlag = false;
    };

    //左移
    this.ProcessSettingMoveLeftClick = function () {
        //1.帐号
        //var $selectedRows = ProcessSettingChangeTable.getMultiSelectedRows();
        ////var ProcessId="";
        //var rows = [];
        //$selectedRows.each(function (i, $selectedRow) {
        //    var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
        //    // ProcessId = ProcessId + rowData.ProcessID;
        //    rows.push(rowData)
        //});

        //1.帐号
        var rows = [];
        var $selectedRows = ProcessSettingChangeTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
           // ProcessSettingTable.pushRow(rowData);
            rows.push(rowData)
        });
       // ProcessSettingChangeTable.deleteMultiSelectedRows();
    
       //// $("#IsCheckedChange").prop("checked", false);
       // $("#IsCheckeds").prop("checked", false);
        
       // $("#IsCheckedRight").prop("checked", false);
        
       // $("#IsDepartmentCheckedChange").prop("checked", false);
       // $("#IsDepartmentChecked").prop("checked", false);



        var checkData = {};
        checkData.data = rows;
        checkData.WorkCenterID = thisRow.WorkCenterID;
        
        
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018MasterWorkCenterProcessDelete',
            data: JSON.stringify(checkData),
            success: function (data) {
                console.log(data)
                if (data.status === "200") {
                    $selectedRows.each(function (i, $selectedRow) {
                        var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
                        ProcessSettingTable.pushRow(rowData);
                    });
                    ProcessSettingChangeTable.deleteMultiSelectedRows();
                    $("#IsCheckeds").prop("checked", false)
                    $("#IsCheckedLeft").prop("checked", false);
                    $("#IsCheckedRight").prop("checked", false);
                    $("#IsDepartmentCheckedChange").prop("checked", false);
                    $("#IsDepartmentChecked").prop("checked", false);
                    
                }
                else {
                    msg.warnings(fields.info, data.msg,
                        function () {
                            $selectedRows.each(function (i, $selectedRow) {
                                var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
                                ProcessSettingTable.pushRow(rowData);
                            });
                            ProcessSettingChangeTable.deleteMultiSelectedRows();
                            $("#IsCheckedLeft").prop("checked", false);
                            $("#IsCheckedRight").prop("checked", false);
                            $("#IsDepartmentCheckedChange").prop("checked", false);
                            $("#IsDepartmentChecked").prop("checked", false);

                          //  msg.info(fields.info, fields.Finish);
                        }
                    );
                }
            }
        });
        ProcessMasterFlag = false;
        //$("#IsCheckedChange").prop("checked", false);
        //$("#IsChecked").prop("checked", false);
        //$("#IsDepartmentCheckedChange").prop("checked", false);
        //$("#IsDepartmentChecked").prop("checked", false);
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.ProcessSettingSaveClick = function () {
        var saveData = {};
        var table_data = ProcessSettingChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.WorkCenterID = ProcessSettingParameterID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018MasterWorkCenterProcessSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(JSON.stringify(data))
                if (data.status === "200") {
                    console.log(111)
                    msg.success(fields.info, data.msg, function () {

                        ProcessSettingChangeTable.loadData();
                        ProcessSettingTable.loadData();
                        $('#ProcessSettingDialog').modal('hide');
                        ProcessMasterFlag = true;
                    });
                    console.log(222)
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });

    };

    //验证明细在编辑状态关系弹窗
    this.clearDataBtn = function () {
        if (!DetailTable) {
            return;
        }
        DetailTable.goForwordSafely(function () {
            DetailTable.loadData();
            $('#DetailDialog').modal('hide');
        }, function () {
            DetailTable.loadData();
            $('#DetailDialog').modal('hide');
        });

    };

    //明细添加
    this.addDataClick = function () {
        if (!DetailTable) {
            return;
        }
        DetailTable.addRow();
    };

    //明细编辑
    this.editDataClick = function () {
        if (!DetailTable) {
            return;
        }
        DetailTable.editRow();
    };

    //明细删除
    this.deleteDataClick = function () {
        if (!DetailTable) {
            return;
        }
        DetailTable.deleteRow();
    };

    //资源设定
    //this.ResourceSetClick = function (obj) {
    //    var $tr = $(obj).parent().parent();
    //    var row = table.getRowData($tr);

    //    if (!row) {
    //        msg.info(fields.info, fields.PropertyNumberIsEdit);
    //        return;
    //    }
    //    console.log(row);
    //    mf.dialog('#ResourceSetDialog', {
    //        viewModel: function () {
    //            $("#Resource_WorkCenterNoID").val(row.Code);
    //            $("#Resource_WorkCenterDescriptionID").val(row.Name);
    //            $("#Resource_WorkCenterNoID").attr("title", row.Code);
    //            $("#Resource_WorkCenterDescriptionID").attr("title", row.Name);
    //            work_center_source_id = row.WorkCenterID;
    //            ResourceSetTable.loadData();
    //            //提交数据
    //            $("#ResourceSetComfirm").click(function () {
    //                if (!ResourceSetTable) {
    //                    return;
    //                }
    //                ResourceSetTable.save(null, null, true);
    //            })
    //        }
    //    });
    //};

    ////资源设定在编辑状态关系弹窗操作
    //this.clearResourceSetBtn = function () {
    //    if (!ResourceSetTable) {
    //        return;
    //    }
    //    ResourceSetTable.goForwordSafely(function () {
    //        ResourceSetTable.loadData();
    //        $('#ResourceSetDialog').modal('hide');
    //    }, function () {
    //        ResourceSetTable.loadData();
    //        $('#ResourceSetDialog').modal('hide');
    //    });

    //};

    //// 资源设定添加
    //this.addResourceSetClick = function () {
    //    if (!ResourceSetTable) {
    //        return;
    //    }
    //    ResourceSetTable.addRow();
    //};

    //// 资源设定编辑
    //this.editResourceSetClick = function () {
    //    if (!ResourceSetTable) {
    //        return;
    //    }
    //    ResourceSetTable.editRow();
    //};

    //// 资源设定删除
    //this.deleteResourceSetClick = function () {
    //    if (!ResourceSetTable) {
    //        return;
    //    }
    //    ResourceSetTable.deleteRow();
    //};

    ////资源设定资源明细
    //this.ResourcesDetailsClick = function (obj) {
    //    var $tr = $(obj).parent().parent();
    //    var row = ResourceSetTable.getRowData($tr);

    //    if (!row) {
    //        msg.info(fields.info, fields.PropertyNumberIsEdit);
    //        return;
    //    }
    //    mf.dialog('#ResourceDetailDialog', {
    //        viewModel: function () {
    //            $("#SourceCodeDetailID").val(row.ResourceCode);
    //            $("#SourceDescriptionID").val(row.ResourceName);
    //            $("#SourceCodeDetailID").attr("title", row.ResourceCode);
    //            $("#SourceDescriptionID").attr("title", row.ResourceName);
    //            resource_detail_id = row.ResourceID;
    //            ResourceDetailTable.loadData();
    //        }
    //    });
    //}

}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "WorkCenterNo", "WorkCenterDescription", "InoutMark", "CalendarNo", "DepartmentNoOrManufacturersNo",
    "DepartmentDesOrManufacturersDes", "Remark", "Status", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Normal", "Invalid", "Cancel", "Browse", "Comfirm",
    "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "WorkCenterNoIsNull", "WorkCenterDescriptionIsNull", "Details", "ResourceSet", "CalendarMaster", "CalendarCode",
    "CalendarDescription", "MainCalendar", "no", "yes", "DepartmentMaster", "DepartmentNo", "DepartmentDescription",
    "Site", "VendorNo", "VendorDescription", "VendorMasterFile", "PropertyNumberIsEdit", "WorkCenterProcessRelationship",
    "ProcessNo", "ProcessNoIsNull", "ProcessDescription", "ProcessMaster", "SourceClass", "SourceCode", "SourceDescription",
    "ResourcesDetails", "SourceCodeIsNull", "ResourceDetails", "SourceDetail", "Description", "WorkCenter", "ProcessSetting", "SourceClass", "SourceCode", "ShowName", "EnableProcess",
    "MainResource", "ManufacturingProcess", "Process", "ResourceSetNo", "ResourceCategory", "EnableShift", "Enable", "NotEnable", "ResourceReporting", "DispatchMode", "ResourceReporting", "NotEnable", "Enable",
    "InoutMark", "ProcessNo", "ProcessDescription", "EnableProcess", "ShowName", "SourceCode", "ProcessSetting", "ManufacturingProcessMsg", "DispatchMode", "info", "DepartmentNoIsNull", "CalendarCodeIsNull", "ManufacturingProcessMsg",
    "Select", "NoSelect", "MainResourceIsOnlyOne", "Finish", "IsRemove","IsOrSave"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};