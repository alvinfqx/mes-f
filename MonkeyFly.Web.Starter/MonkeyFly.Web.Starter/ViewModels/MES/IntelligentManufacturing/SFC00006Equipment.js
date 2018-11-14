
var parameters = window.parent.Paparameters;

var URL = "/MES/IntelligentManufacturing/SFC00006Equipment";

var MID = window.top.page_parameters.GetParameters(URL);

var rowData = parameters.rowData;


var viewModel = function () {
    var self = this;
    var EquipmentID, ResourceID, ClassID;
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
        MaterialDetailsTable.goForword(function () {
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
        if (!MaterialDetailsTable)
            return;

        MaterialDetailsTable.addRow();
    }
    // 编辑
    this.editClick = function () {
        if (!MaterialDetailsTable)
            return;

        MaterialDetailsTable.editRow();
    };
    // 删除
    this.deleteClick = function () {
        if (!MaterialDetailsTable)
            return;

        MaterialDetailsTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (!MaterialDetailsTable)
            return;

        MaterialDetailsTable.save(null, null, true);
    };



    //设置设备代号弹窗表格
    var EquipmentCodeTable = new mf.Table("#EquipmentCodeTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Sfc00004GetResourceDetailList',
                data: ({ page: pagination.page, rows: pagination.rows, FabMoProcessID: rowData.FabMoProcessID, FabMoOperationID: rowData.FabMoOperationID, Code: "M" }),
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
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentName, align: "center", width: "120",
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
    var MaterialDetailsTable = new mf.Table("#EquipmentDetailsTable", {
        uniqueId: "EquipmentDetailsID",
        editable: true,
        isRealDelete: true,
        dblclick_editable:false,
        height: window.innerHeight - 180,
        paginationBar: new mf.PaginationBar("#EquipmentDetailPageBar"),

        fn_getData: function (pagination, searchData, success) {
            searchData = {}; 
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.Type = mf.systemID + '0201213000084';
            searchData.TaskDispatchID = rowData.TaskDispatchID;
      
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00004GetResourceList',
                data: searchData,
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
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
                    return mf.systemID + "0201213000084";
                })
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "140", require: true,
                rander: new mf.FKRander("#EquipmentCodeDialog",
                                        "#EquipmentCodeDialog #Comfirm",
                                        EquipmentCodeTable,
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
                    table.setEditingColumnValue($row, "EquipmentCode", e.data.Code);
                    table.setEditingColumnValue($row, "EquipmentName", e.data.Name);
                    table.setEditingColumnValue($row, "IfMain", e.data.IfMain);
                    table.setEditingColumnValue($row, "ClassCode", e.data.ClassCode);
                    table.setEditingColumnValue($row, "ResourceCode", e.data.ResourceCode);
                    table.setEditingColumnValue($row, "Condition", e.data.Condition);
                    EquipmentID = e.data.EquipmentID;
                    ClassID = e.data.ClassID;
                    ResourceID = e.data.ResourceID;
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EquipmentCodeIsNull)
                ],

            },
            {
                field: 'EquipmentID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return EquipmentID;
                })
            },
            {
                field: 'EquipmentName', title: fields.EquipmentName, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
            {
                field: 'ResourceClassID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ClassID;
                })
            },
            {
                field: 'Condition', title: fields.MechanicalCondition, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", width: "140",
                rander: new mf.SelectRander([{ value: true, text: fields.yes }, { value: false, text: fields.no }]),
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
            },
            
        ]
    })

    if (!MaterialDetailsTable) {
        console.error("create table faild");
        return;
    }
    if (StatusId == "0201213000088" || StatusId == "0201213000087") {
        MaterialDetailsTable.setOption({ dblclick_editable: true, })
    }

    MaterialDetailsTable.loadData();



}

var parameters = window.parent.Paparameters;

var URL = "/MES/IntelligentManufacturing/SFC00006Equipment";

var MID = window.top.page_parameters.GetParameters(URL);



var arrayWord = [
"Refresh", "Add", "Change", "Save", "ItemNo", "WorkCenter", "Refresh", "EquipmentCode","EquipmentName","MechanicalCondition","MainResource","EngineeringDrawing",
"ResourceType", "Part", "ItemDescription", "ItemSpecification", "DispatchAmount", "WorkOrderNumber", "TaskNo", "Deletion", "EquipmentInformation", "Comfirm",
"Cancel", "SourceClass", "SourceCode", "yes", "no", "TaskCardNo", "Cancel", "EquipmentCodeIsNull"
  ];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};