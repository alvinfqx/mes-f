var viewModel = function () {
    var self = this;
    var parameters = [], EquipmentID = null, Description, Namearry = [], leftEquipmentID = null;


    //状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            parameters = data;
            var Listdata = data.PT0191213000001;      
            //console.log(Listdata);
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].Newvalue };
            }
        }
    });

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        Lefttable.goForwordSafely(function () {
            Lefttable.loadData();
        }, null);
    };

    //设备代号弹窗查询
    this.OpenEndEquipmentCodeSearch = function () {
        EquipmentCodeTable.goForwordSafely(function () {
            EquipmentCodeTable.loadData();
        }, null);
    };

    //新增
    this.addClick = function () {
        //UsedTable.setOption({ editable: true })
        var row = Lefttable.getSelectedData();
        
        
        if (!row) {
            msg.info(fields.Prompt, fields.EquipmentsIsNull);
            return;
        }
        EquipmentID = row.EquipmentID;
        $("#AddDialog").modal("show");
        $("#EquipmentCode").val(row.Code);
        $("#EquipmentDescription").val(row.Name);
        $("#Remark").val(row.Comments);
        UnusedTable.loadData();
        UsedTable.loadData();
    };

    //删除
    //this.deleteClick = function () {
    //    if (!Righttable)
    //        return;
    //    var data = Righttable.getSelectedData();
    //    if (!data)
    //        return;
    //    var ID = data.EIProjectID;
    //    if (!ID && ID.length <= 0) {
    //        console.error("can't get ParameterID from table");
    //        return;
    //    }
    //    msg.warning(fields.info, fields.WhetherToDelete + fields.CodeNamed+data.ProjectCode + fields.TheData,
    //        function () {
    //            mf.ajax({
    //                type: "post",
    //                url: "/MES/api/EquipmentManagement/Ems00002Delete",
    //                data: JSON.stringify({ EIProjectID: ID }),
    //                success: function (data) {
    //                    if (data.status == "200") {
    //                        msg.success(fields.info, data.msg);
    //                        Righttable.loadData();
    //                    }
    //                    else {
    //                        msg.error(fields.info, data.msg);
    //                    }
    //                }
    //            });
    //        });
    //};

    //编辑
    //this.editClick = function () {
    //    //UsedTable.setOption({ editable: true })
    //    var row = Lefttable.getSelectedData();
    //    EquipmentID = row.EquipmentID;
    //    if (!row) {
    //        msg.info(fields.Prompt, fields.EquipmentsIsNull);
    //        return;
    //    }
    //    $("#AddDialog").modal("show");
    //    $("#EquipmentCode").val(row.Code);
    //    $("#EquipmentDescription").val(row.Name);
    //    $("#Remark").val(row.Comments);
    //    UnusedTable.loadData();
    //    UsedTable.loadData();
    //};

    //新增设备代号弹窗
    this.EquipmentCodeSearch = function () {
        mf.dialog('#EquipmentCodeDialog', {
            viewModel: function () {
                EquipmentCodeTable.loadData();
                $("#Comfirm").click(function () {
                    var row = EquipmentCodeTable.getSelectedData();
                    if (row) {
                        $('#EquipmentCode').val(row.Code);
                        $('#EquipmentDescription').val(row.Name);
                        $('#Remark').val(row.Comments);
                        ItemList.loadData();
                        $("#EquipmentCodeDialog").modal("hide");
                    }
                })
            }
        });
    };

    //设置巡检项目弹窗表格
    //var InspectionItemTable = new mf.Table("#InspectionItemTable", {
    //    uniqueId: "EquipmentProjectID",
    //    editable: false,
    //    fn_getData: function (pagination, searchData, success) {
    //       var ProjectCode = $("#ProjectCode").val();
    //        mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/PopUp/GetEquipmentProjectList',
    //            data: ({ EquipmentID: EquipmentID, Code: ProjectCode }),
    //            success: function (data) {
    //                //alert(JSON.stringify(data));
    //                success(data);
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success) {
    //    },
    //    focusField: "Sequence",
    //    focusEditField: "IsEnable",
    //    height: 200,
    //    columns: [
    //       {
    //           field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", require: true, width: "100",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
    //       },
    //       {
    //           field: 'EquipmentName', title: fields.EquipmentDescription, require: true, align: "center", width: "100",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
    //       },
    //       {
    //           field: 'ProjectCode', title: fields.ProjectCode, align: "center", width: "100",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
    //       },
    //       {
    //           field: 'ProjectDescription', title: fields.ProjectDescription, align: "center", width: "100",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
    //       },
    //       {
    //           field: 'AttributeCode', title: fields.Property, align: "center", width: "50",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
    //       },
    //       {
    //           field: 'StandardValue', title: fields.StandardValues, align: "center", width: "80",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
    //       },
    //       {
    //           field: 'MaxValue', title: fields.UpperLimit, align: "center", width: "50",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
    //       },
    //       {
    //           field: 'MinValue', title: fields.LowerLimit, align: "center", width: "50",
    //           rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
    //       },
    //    ]
    //});

    //if (!InspectionItemTable) {
    //    console.error("create table faild");
    //    return;
    //}

    //修改巡检设备项目
    this.ChangeItemClick = function () {
        ItemList.editRow();
    };

    //新增列表
    //未使用
   var UnusedTable = new mf.Table("#UnusedTable", {
       uniqueId: "ID",
       dblclick_editable: false,
       editable: false,
       enableMultiSelectColumn: true,
       multiSelectColumnIndex: 0,
       multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
       fn_getData: function (pagination, searchData, success) {
           mf.ajax({
               type: 'Get',
               url: '/MES/api/EquipmentManagement/Ems00002NoProjectList',
               data: { EquipmentID: EquipmentID },
               success: function (data) {
                   success(data);
               }
           });
       },
       fn_saveData: function (saveData, success) {
       },
       height: 370,
       columns: [
           {
               field: 'ProjectCode', title: fields.InspectionItem, align: "center", width: "100",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'ProjectDescription', title: fields.ItemDirections, align: "center", width: "120",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'AttributeName', title: fields.Property, align: "center", width: "100",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'StandardValue', title: fields.StandardValues, align: "center", width: "50",
               rander: new mf.StaticValueRander(),
           },
       ]
   });

    //未使用全选
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

    //已使用
   var UsedTable = new mf.Table("#UsedTable", {
       uniqueId: "ID",
       dblclick_editable: true,
       editable: false,
       enableMultiSelectColumn: true,
       multiSelectColumnIndex: 0,
       multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
       fn_getData: function (pagination, searchData, success) {

           mf.ajax({
               type: 'Get',
               url: '/MES/api/EquipmentManagement/Ems00002ProjectList',
               data: { EquipmentID: EquipmentID },
               success: function (data) {
                   success(data);
               }
           });
       },
       fn_saveData: function (saveData, success) {

       },
       fn_onRowClick(data)
       {
           UsedTable.setOption({ editable: true })
       },
       focusField: "Sequence",
       height: 370,
       columns: [
           {
               field: 'Sequence', title: fields.Sorting, align: "center", width: "50",require:true,
               rander: new mf.TextRander({ size:1, maxLength: 12, title: "title" }),
           },
           {
               field: 'ProjectCode', title: fields.InspectionItem, align: "center", width: "100",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'ProjectDescription', title: fields.ItemDirections, align: "center", width: "120",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'AttributeName', title: fields.Property, align: "center", width: "100",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'StandardValue', title: fields.StandardValues, align: "center", width: "50",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'MaxValue', title: fields.UpperLimit, align: "center", width: "50",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'MinValue', title: fields.LowerLimit, align: "center", width: "50",
               rander: new mf.StaticValueRander(),
           },
           {
               field: 'Status', title: fields.Status, align: "center", width: "50",
               rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(parameters.PT0191213000001)),
           }
       ]
   });

    //已使用全选
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

    //已使用修改
   this.AddEquipmentInspectionItemChange = function () {
       var data = UsedTable.getSelectedData();
       if (!data)
           return;
       UsedTable.editRow();
   };

    //右移
   this.ProcessMoveRightClick = function () {
       var rowDataLeftArray = [];
       var $selectedRows = UnusedTable.getMultiSelectedRows();
       $selectedRows.each(function (i, $selectedRow) {
           var rowData = UnusedTable.getRowData($selectedRow); // 拿对应的行数据
           //alert("右移" + JSON.stringify(rowData));
           rowDataLeftArray.push(rowData);
           UsedTable.pushRow(rowData);
       });

       UnusedTable.deleteMultiSelectedRows();
       $("#IsCheckedChange").prop("checked", false);
       $("#IsChecked").prop("checked", false);
   };

    //左移
   this.ProcessMoveLeftClick = function () {
       var rowDataRightArray = [];
       var $selectedRows = UsedTable.getMultiSelectedRows();
       $selectedRows.each(function (i, $selectedRow) {
           var rowData = UsedTable.getRowData($selectedRow); // 也可以拿对应的行数据
           //alert("左移" + JSON.stringify(rowData));
           rowDataRightArray.push(rowData);
           UnusedTable.pushRow(rowData);
       });
       UsedTable.deleteMultiSelectedRows();
       $("#IsCheckedChange").prop("checked", false);
       $("#IsChecked").prop("checked", false);
   };

    //新增保存
   this.AddEquipmentInspectionItemComfirm = function () {
       if (!UsedTable.editFinish()) {
           return;
       }
       var SaveData = {};
       var UsedData = UsedTable.getAllRowData();
       console.log(UsedData);
       //var UnusedData = UnusedTable.getAllRowData();

       SaveData.data = UsedData;
       SaveData.EquipmentID = EquipmentID;

       mf.ajax({
           type: 'Post',
           url: '/MES/api/EquipmentManagement/Ems00002ProjectSave',
           data: JSON.stringify(SaveData),
           success: function (data) {
               if (data.status === "200") {
                   msg.success(fields.info, data.msg, function () {
                       UsedTable.loadData();
                       UnusedTable.loadData();
                   });
               }
               else {
                   msg.error(fields.info, data.msg);
               }

           }
       });
   }

    //关闭新增
   this.AddDialogClose = function () {
       $("#IsCheckedChange").prop("checked", false);
       $("#IsChecked").prop("checked", false);
       $('#AddDialog').modal("hide");
       Righttable.loadData();
   };

    //设置左侧表格
    var Lefttable = new mf.Table("#EMS00002LeftTable", {
        uniqueId: "EquipmentID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            //var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00002List',
                data: ({ Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        fn_onRowClick: function (row) {
            leftEquipmentID = row.EquipmentID;
            Righttable.loadData();
        },
        focusField: "Code",
        height: window.innerHeight - 117,
        LastWidth: "120",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center",  width: "70",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });
    Lefttable.loadData();

    //设置右侧表格
    var Righttable = new mf.Table("#EMS00002RightTable", {
        uniqueId: "EIProjectID",
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00002ProjectList',
                data: ({ EquipmentID: leftEquipmentID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00002Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });

        },
        focusField: "Code",
        focusEditField: "IsEnable",
        height: window.innerHeight - 130,
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
           {
               field: 'Sequence', title: fields.Sorting, align: "center", require: true, width: "50",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
           },
           {
               field: 'ProjectCode', title: fields.InspectionItem, require: true, align: "center", width: "100",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
           },
           {
               field: 'ProjectDescription', title: fields.ItemDirections, align: "center", width: "120",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
           },
           {
               field: 'AttributeName', title: fields.Property, align: "center", width: "100",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
           },
           {
               field: 'StandardValue', title: fields.StandardValues, align: "center", width: "50",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
           },
           {
               field: 'MaxValue', title: fields.UpperLimit, align: "center", width: "50",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
           },
           {
               field: 'MinValue', title: fields.LowerLimit, align: "center", width: "50",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
           },
           {
               field: 'Status', title: fields.Status, align: "center", width: "80",
               rander: new mf.SelectRander(Namearry),
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
               field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
               rander: new mf.StaticValueRander(),
           },
          {
              field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
              rander: new mf.TextTimeRander(),
          },
        ]
    });
    Righttable.loadData();
}

var URL = "/MES/EquipmentManagement/EMS00002";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "EquipmentCode", "Status", "Remark", "EquipmentDescription","info",
    "Sorting", "InspectionItem", "ItemDescription", "Property","SequenceIsNull",
    "StandardValues", "UpperLimit", "LowerLimit", "CreatedBy",
    "CreatedDate", "LastChangedBy", "LastChangedDate", "AddEquipmentInspectionItem", "Add", "Change",
    "Deletion", "Save", "Cancel", "ItemDirections", "EndEquipmentCode", "BeginEquipmentCode",
    "Search", "Comfirm", "Normal", "Invalid", "ProjectCode", "ProjectDescription", "SequenceIsNull",
    "ProjectCodeIsNull", "EquipmentIDIsNull", "info", "WhetherToDelete", "CodeNamed", "TheData", "BookMark",
    "EquipmentMasterFile", "EquipmentItemBookMark", "Unused", "Used", "Change"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};
