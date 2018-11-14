var URL = "/MES/IntelligentManufacturing/SFC00001OperationRelationship";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "true", text: "Y" }, { value: "false", text: "N" }];
    
    $("#ItemCode").val(mainForm.ItemCode);
    $("#ItemName").val(mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").val(mainForm.WorkCenterCode);
    $("#WorkCenterName").val(mainForm.WorkCenterName);
    $("#ProcessCode").val(mainForm.ProcessCode);
    $("#ProcessName").val(mainForm.ProcessName);
    $("#IsOperation").val(mainForm.IsOperation ? "Y" : "N");

    $("#ItemCode").attr("title", mainForm.ItemCode);
    $("#ItemName").attr("title", mainForm.ItemName + "/" + mainForm.Specification);
    $("#WorkCenterCode").attr("title", mainForm.WorkCenterCode);
    $("#WorkCenterName").attr("title", mainForm.WorkCenterName);
    $("#ProcessCode").attr("title", mainForm.ProcessCode);
    $("#ProcessName").attr("title", mainForm.ProcessName);
    $("#IsOperation").attr("title", mainForm.IsOperation ? "Y" : "N");

    //制品制程工序列表
    var OperationTable = new mf.Table("#OperationTable", {
        uniqueId: "ID",
        editable: false,
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionOperationBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#OperationNo").val();;
            searchData.ItemProcessID = mainForm.ItemProcessID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetProcessOperationList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Sequence', title: fields.OperationSequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationCode', title: fields.Operation, align: "center", width: "140", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationName', title: fields.OperationDesc, align: "center", width: "140",
                rander: new mf.TextRander()
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, title: "title", maxLength: 150 })),
            }
        ]
    });
    $("#OperationSearch").click(function () {
        OperationTable.loadData(null, null, 1);
    });

    //前制品制程工序列表
    var PreOperationTable = new mf.Table("#PreOperationTable", {
        uniqueId: "ID",
        editable: false,
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionPreOperationBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#PreOperationNo").val();;
            searchData.ItemProcessID = mainForm.ItemProcessID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetProcessOperationList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Sequence', title: fields.OperationSequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationCode', title: fields.Operation, align: "center", width: "140", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'OperationName', title: fields.OperationDesc, align: "center", width: "140",
                rander: new mf.TextRander()
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, title: "title", maxLength: 150 })),
            }
        ]
    });
    $("#PreOperationSearch").click(function () {
        PreOperationTable.loadData(null, null, 1);
    });

    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "ID",
        deleteId: "PORSID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        height: window.innerHeight - 150,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemProcessID = mainForm.ItemProcessID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetOperationRelationShipList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].ItemProcessID = mainForm.ItemProcessID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00001OperationRelationShipSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'ItemOperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Sequence', title: fields.OperationSequence, align: "center", width: "80",
                rander: new mf.TextRander({ size: 2, readonly: "readonly", title: "" })
            },
            {
                field: 'OperationCode', title: fields.Operation, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#OperationDialog",
                    "#OperationConfirmBtn",
                    OperationTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#OperationNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ItemOperationID", e.data.ItemOperationID);
                    table.setEditingColumnValue($row, "Sequence", e.data.Sequence);
                    table.setEditingColumnValue($row, "OperationCode", e.data.OperationCode);
                    table.setEditingColumnValue($row, "OperationName", e.data.OperationName);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.OperationIsNull)
                ]
            },
            //{
            //    field: 'OperationName', title: fields.OperationDesc, align: "center", width: "140",
            //    rander: new mf.TextRander({ size: 13, readonly: "readonly", title: "" })
            //},
            {
                field: 'PreItemOperationID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'PreSequence', title: fields.PreOperationSequence, align: "center", width: "80",
                rander: new mf.TextRander({ size: 2, readonly: "readonly", title: "" })
            },
            {
                field: 'PreOperationCode', title: fields.PreOperationNo, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#PreOperationDialog",
                    "#PreOperationConfirmBtn",
                    PreOperationTable,
                    new mf.TextRander({ size: 11, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#PreOperationNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "PreItemOperationID", e.data.ItemOperationID);
                    table.setEditingColumnValue($row, "PreSequence", e.data.Sequence);
                    table.setEditingColumnValue($row, "PreOperationCode", e.data.OperationCode);
                    table.setEditingColumnValue($row, "PreOperationName", e.data.OperationName);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.PreOperationCodeIsNull)
                ]
            },
            //{
            //    field: 'PreOperationName', title: fields.PreOperationDescription, align: "center", width: "140",
            //    rander: new mf.TextRander({ size: 13, readonly: "readonly", title: "" })
            //},
            {
                field: 'IfMain', title: fields.MainProcess, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray, { title: true, IsBoolean: true })
            },
            {
                field: 'FinishOperation', title: fields.FinalOperation, align: "center", width: "100",
                rander: new mf.SingleCheckBoxRander({ yes: "1", no: "0", disabled: true })
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    MainTable.loadData();

    // 返回
    this.backClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001ProcessProcess",
                Parameters: PageParameters
            });
            window.location.href = "/MES/IntelligentManufacturing/SFC00001ProcessProcess";
        }, function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00001ProcessProcess",
                Parameters: PageParameters
            });
            window.location.href = "/MES/IntelligentManufacturing/SFC00001ProcessProcess";
        }, fields.Isleave);
    }

    //刷新
    this.refreshClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
            window.location.reload();
        });
    };

    //新增
    this.addClick = function () {
        MainTable.addRow();
    };

    //编辑
    this.editClick = function () {
        MainTable.editRow();
    };

    //删除
    this.deleteClick = function () {
        MainTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        //mf.ajax({
        //    type: "post",
        //    url: "/MES/api/IntelligentManufacturing/CheckProcessOperationRelationShip",
        //    data: JSON.stringify({ "ItemProcessID": mainForm.ItemProcessID }),
        //    success: function (data) {
        //        if (data.status == "200") {
                    
        //        }
        //        else {
        //            msg.error(fields.Prompt, data.msg);
        //        }
        //    }
        //});
        MainTable.save(null, null, true);
    };

    //工序关系图
    this.chartClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001OperationRelationshipChart",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00001OperationRelationship",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001OperationRelationshipChart';
        }, null, fields.Isleave);
    }
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "Deletion", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "ProductCode", "GoodsName", "Specification", "Unit",
    "OverRate", "ProcessSequence", "ProcessNo", "ProcessDescription", "StandardWorkingSeconds",
    "StandardWorkingHours", "PrepareWorkSeconds", "PrepareWorkHours", "WorkCenter", "Description",
    "InoutMark", "DepartmentNoOrManufacturersNo", "AuxiliaryUnit", "UnitRate", "UnitPrice",
    "IsResourceReporting", "IsEnableProcess", "IsProcessInspection", "IsFirstTest",
    "IsPatrolInspection", "InspectionGroup", "InspectionGroupInstructions", "ProcessMaterials",
    "ProcessProcess", "ProcessResources", "AlternativeProcess", "ProcessRelationship",
    "StartProductNo", "EndProductNo", "ProcessSequenceIsError", "ProcessInformation",
    "ProcessIsNull", "StandardWorkingSecondsIsError", "PrepareWorkSecondsIsError",
    "WorkCenterInformation", "WorkCenter", "WorkCenterNo", "WorkCenterDescription",
    "WorkCenterIsNull", "UnitMasterFile", "Code", "AuxUnitRatioIsNull", "CheckGroupCodeInformation",
    "CheckGroupCode", "CheckGroupName", "SaveOrNot", "ResourceReporting", "Isleave",
    "Back", "Refresh", "PreProcessSequence", "PreProcessNo", "PreProcessDescription","PreOperationCodeIsNull",
    "Save", "Change", "MainProcess", "FinalProcess", "Operation", "OperationDesc", "OperationSequence",
    "PreOperationSequence", "PreOperationNo", "PreOperationDescription", "FinalOperation",
    "OperationIsNull", "OperationInformation", "NameSpecification", "OperationRelationshipDiagram"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};