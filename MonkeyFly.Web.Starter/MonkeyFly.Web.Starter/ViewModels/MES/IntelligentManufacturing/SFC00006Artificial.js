var model = null;
var parameters = null;


var parameters = window.parent.Paparameters;

var URL = "/MES/IntelligentManufacturing/SFC00006Artificial";

var MID = window.top.page_parameters.GetParameters(URL);




var viewModel = function () {
    var self = this;
    var EquipmentID, ResourceID, ClassID;
    var rowData = parameters.rowData;

    //根据状态判断是否可以新增删除编辑

    var StatusId = rowData.Status.substring(5, rowData.Status.length)
    if (StatusId == "0201213000088" || StatusId == "0201213000087") {
        $("#btn_add").show()
        $("#btn_edit").show()
        $("#btn_delete").show()
        $("#btn_save").show()
    } else {
        $("#btn_add").hide()
        $("#btn_edit").hide()
        $("#btn_delete").hide()
        $("#btn_save").hide()
    }




    $("#TackNo").val(rowData.TaskNo);
    $("#WorkOrderNumber").val(rowData.MoNo);
    $("#WorkCenter").val(rowData.WorkCenterCode);
    $("#Part").val(rowData.ItemCode);
    $("#ItemDescription").val(rowData.ItemName);
    $("#ItemSpecification").val(rowData.Specification);
    $("#DispatchAmount").val(rowData.AssignQty);



    this.refreshClick = function () {
        ArtificialDetailsTable.goForword(function () {
            var parameter = parameters.Parameters;
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Resources", Parameters: parameters });
            window.location.href = URL;
        }, function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Resources", Parameters: parameters });
            window.location.href = URL;
        }, null);
    }


    // 添加
    this.addClick = function () {
        if (!ArtificialDetailsTable)
            return;

        ArtificialDetailsTable.addRow();
    }
    // 编辑
    this.editClick = function () {
        if (!ArtificialDetailsTable)
            return;

        ArtificialDetailsTable.editRow();
    };

    // 删除
    this.deleteClick = function () {
        if (!ArtificialDetailsTable)
            return;

        ArtificialDetailsTable.deleteRow();
    };
    //保存
    this.saveClick = function () {
        if (!ArtificialDetailsTable)
            return;

        ArtificialDetailsTable.save(null, null, true);
    };

    //设置设备代号弹窗表格
    var artificialTable = new mf.Table("#artificialTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionartificialBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00004GetResourceDetailList',
                data: ({ page: pagination.page, rows: pagination.rows, FabMoProcessID: rowData.FabMoProcessID, FabMoOperationID: rowData.FabMoOperationID, Code: "L" }),
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
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.yes }, { value: 0, text: fields.no }]),
            },
            {
                field: 'ClassCode', title: fields.SourceClass, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'ResourceCode', title: fields.SourceCode, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });


    //明细
    var ArtificialDetailsTable = new mf.Table("#ArtificialDetailsTable", {
        uniqueId: "ArtificialDetailsID",
        editable: true,
        dblclick_editable: false,
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#ArtificialDetailPageBar"),

        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00004GetResourceList',
                data: ({ page: pagination.page, rows: pagination.rows, TaskDispatchID: rowData.TaskDispatchID, Type: mf.systemID + "0201213000085" }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {
            var TaskDispatchResourceID = rowData.TaskDispatchResourceID;
            mf.ajax({
                type: "Post",
                url: '/MES/api/IntelligentManufacturing/Sfc00004ResourceSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $IfMainEditingCell = $row.find("#IfMain");
            $IfMainEditingCell.attr('disabled', true);
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            var TaskDispatchResourceID = rowData.TaskDispatchResourceID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00004ResourceDelete",
                data: JSON.stringify({ TaskDispatchResourceID: TaskDispatchResourceID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
             //任务卡流水号
            {
                field: 'TaskDispatchID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return rowData.TaskDispatchID;
                })
            },
            //类型
            {
                field: 'Type', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return mf.systemID + "0201213000085";
                })
            },
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "140",require:true,
                rander: new mf.FKRander("#ArtificialDialog",
                                          "#ArtificialDialog #Comfirm",
                                          artificialTable,
                                          new mf.TextRander(
                                              {
                                                  size: 18, title: "title", readonly: 'readonly'
                                              }
                                          ),
                                          {
                                              btnTitle: "",
                                              btnClass: "btn btn-success btn-xs",
                                          }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "Emplno", e.data.Emplno);
                    table.setEditingColumnValue($row, "UserName", e.data.UserName);
                    table.setEditingColumnValue($row, "IfMain", e.data.IfMain);
                    table.setEditingColumnValue($row, "ClassCode", e.data.ClassCode);
                    table.setEditingColumnValue($row, "ResourceCode", e.data.ResourceCode);
                    table.setEditingColumnValue($row, "Status", e.data.Status);
                    EquipmentID = e.data.EquipmentID;
                    ClassID = e.data.ClassID;
                    ResourceID = e.data.ResourceID;
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EmplnoIsNull)
                ],

            },
            {
                field: 'EquipmentID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return EquipmentID;
                })
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", width: "140",
                rander: new mf.SelectRander([{ value: 1, text: fields.yes }, { value: 0, text: fields.no }]),
            },
            {
                field: 'ResourceClassID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ClassID;
                })
            },
            {
                field: 'ClassCode', title: fields.ResourceType, align: "center", width: "140",visible:false,
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
            {
                field: 'ClassName', title: fields.ResourceType, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
           {
               field: 'ResourceID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return ResourceID;
               })
           }
        ]
    })

    if (!ArtificialDetailsTable) {
        console.error("create table faild");
        return;
    }
    if (StatusId == "0201213000088" || StatusId == "0201213000087") {
        ArtificialDetailsTable.setOption({ dblclick_editable: true, })
    }

    ArtificialDetailsTable.loadData();


}





//var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00006Artificial");

var arrayWord = [
"Refresh", "Add", "Change", "Save", "ItemNo", "WorkCenter", "Refresh", "Part", "ItemDescription", "ItemSpecification", "DispatchAmount", "Deletion",
"WorkOrderNumber", "TaskNo", "WorkNumber", "Name", "Status", "MainResource", "ResourceType", "Isleave", "EmplnoIsNull", "yes", "no", "EquipmentInformation",
"Comfirm", "Cancel", "SourceClass", "SourceCode", "TaskCardNo", "EquipmentInformation", "AccountMaster", "Cancel"
  ];


words = arrayWord.join();



var model = null;


initPage = function () {
    model = new viewModel();
};