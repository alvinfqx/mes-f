var viewModel = function () {

    var rowData = parameters.rowData;
    var EquipmentID, ResourceID, ClassID;

    $("#DetailTaskCardNo").val(rowData.TaskNo);
    $("#DetailTaskCardNo").attr("title", rowData.TaskNo);
    if (rowData.Status.substring(5, rowData.Status.length) != "0201213000087" && rowData.Status.substring(5, rowData.Status.length) != "0201213000088") {
        $("#btn_add").css("display", "none");
        $("#btn_edit").css("display", "none");
        $("#btn_delete").css("display", "none");
        $("#btn_save").css("display", "none");
    }
    else {
        $("#btn_add").css("display", "inline");
        $("#btn_edit").css("display", "inline");
        $("#btn_delete").css("display", "inline");
        $("#btn_save").css("display", "inline");
    }

    // 刷新
    this.refreshClick = function () {
        table.goForword(function () {
            var parameter = parameters.Parameters;
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004Resources", Parameters: parameters });
            window.location.href = URL;
        }, function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00004Resources", Parameters: parameters });
            window.location.href = URL;
        }, fields.Isleave);
    };
    // 添加
    this.addClick = function () {
        if (!table)
            return;

        table.addRow();
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

    //设置设备代号弹窗表格
    var artificialTable = new mf.Table("#artificialTable", {
        uniqueId: "EquipmentID",
        editable: false,
        LastWidth: "125",
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

    //设置设备資源明細表格
    var table = new mf.Table("#table", {
        uniqueId: "RCDispatchResourceID",
        editable: true,
        LastWidth: "219",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00004GetResourceList',
                data: ({ page: pagination.page, rows: pagination.rows, TaskDispatchID: rowData.TaskDispatchID, Type: mf.systemID + "0201213000085" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].TaskDispatchID = rowData.TaskDispatchID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00004ResourceSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
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
        height: window.innerHeight - 142,
        columns: [
            //任务卡流水号
            {
                field: 'TaskDispatchID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            //类型
            {
                field: 'Type', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return mf.systemID + "0201213000085";
                })
            },
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center", width: "200", require: true,
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
                    table.setEditingColumnValue($row, "EquipmentID", e.data.EquipmentID);
                    table.setEditingColumnValue($row, "ResourceClassID", e.data.ClassID);
                    table.setEditingColumnValue($row, "ResourceID", e.data.ResourceID);
                },               
            },
            {
                field: 'EquipmentID', title: "", visible: false,
                rander: new mf.TextRander(),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EmplnoIsNull)
                ],
            },
            {
                field: 'UserName', title: fields.Name, align: "center", width: "200",
                rander: new mf.TextRander({ size: 22, title: "title", disabled: "disabled" }),
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", width: "180",
                rander: new mf.AutoSelectRander("value", "text", [{ value: "true", text: fields.yes }, { value: "false", text: fields.no }], { noSearchSelectedText: "", IsBoolean: true, disabled: "disabled" }),
            },
            {
                field: 'ClassCode', title: fields.SourceClass, align: "center", width: "200",
                rander: new mf.TextRander({ size: 22, title: "title", disabled: "disabled" }),
            },
            {
                field: 'ResourceClassID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ResourceCode', title: fields.SourceCode, align: "center",
                rander: new mf.TextRander({ size: 23, title: "title", disabled: "disabled" }),
            },
            {
                field: 'ResourceID', title: "", visible: false,
                rander: new mf.TextRander()
            },
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();
}

var parameters = window.parent.Paparameters;

var URL = "/MES/IntelligentManufacturing/SFC00004Artificial";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Cancel", "Add", "TaskCardNo",
    "WorkNumber", "Name", "SourceCode", "MainResource", "SourceClass", "EmplnoIsNull",
    "yes", "no", "Comfirm", "AccountMaster", "Artificial","IsDelete", "info"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};