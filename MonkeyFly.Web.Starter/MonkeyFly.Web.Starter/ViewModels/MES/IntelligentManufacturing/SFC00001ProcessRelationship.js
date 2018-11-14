var URL = "/MES/IntelligentManufacturing/SFC00001ProcessRelationship";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "true", text: "Y" }, { value: "false", text: "N" }];
    var formData = {
        Code: ko.observable(mainForm.Code),
        Name: ko.observable(mainForm.Name),
        Specification: ko.observable(mainForm.Specification)
    };
    ko.applyBindings(formData);

    //制品制程列表
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ID",
        editable: false,
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#ProcessNo").val();;
            searchData.ItemID = mainForm.ItemID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetItemProcessList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        columns: [
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessIsDefault', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander()
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, title: "title", maxLength: 150 })),
            }
        ]
    });
    $("#ProcessSearch").click(function () {
        ProcessTable.loadData(null, null, 1);
    });

    //前制品制程列表
    var PreProcessTable = new mf.Table("#PreProcessTable", {
        uniqueId: "ID",
        editable: false,
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionPreProcessBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#PreProcessNo").val();;
            searchData.ItemID = mainForm.ItemID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/Sfc00001GetItemProcessList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "80", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessIsDefault', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140", require: true,
                rander: new mf.TextRander()
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander()
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, title: "title", maxLength: 150 })),
            }
        ]
    });
    $("#PreProcessSearch").click(function () {
        PreProcessTable.loadData(null, null, 1);
    });

    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "IPRSID",
        deleteId: "IPRSID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        height: window.innerHeight - 150,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.ItemID = mainForm.ItemID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00001GetProcessRelationShipList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].ItemID = mainForm.ItemID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/CheckProcessRelationShip',
                data: JSON.stringify(saveData),
                success: function (data) {
                    if(data.status == "200"){
                        mf.ajax({
                            type: 'Post',
                            url: '/MES/api/IntelligentManufacturing/Sfc00001ProcessRelationShipSave',
                            data: JSON.stringify(saveData),
                            success: function (data) {
                                success(data);
                            }
                        });
                    }
                    else {
                        msg.error(fields.info, data.msg, function () {
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
                            window.location.reload();
                        });
                    }
                }
            });
                      
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00001ProcessRelationShipDelete",
                data: JSON.stringify({ IPRSID: rowData.IPRSID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'ItemProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "80",
                rander: new mf.TextRander({ size: 2, disabled: "disabled", title: "" })
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "150", require: true,
                rander: new mf.FKRander(
                    "#ProcessDialog",
                    "#ProcessConfirmBtn",
                    ProcessTable,
                    new mf.TextRander({ size: 10, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ProcessNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ItemProcessID", e.data.ItemProcessID);
                    table.setEditingColumnValue($row, "Sequence", e.data.Sequence);
                    table.setEditingColumnValue($row, "ProcessCode", e.data.ProcessCode);
                    table.setEditingColumnValue($row, "ProcessName", e.data.ProcessName);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessIsNull)
                ]
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140", visible: false,
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },
            {
                field: 'PreItemProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'PreSequence', title: fields.PreProcessSequence, align: "center", width: "80",
                rander: new mf.TextRander({ size: 2, disabled: "disabled", title: "" })
            },
            {
                field: 'PreProcessCode', title: fields.PreProcessNo, align: "center", width: "150", require: true,
                rander: new mf.FKRander(
                    "#PreProcessDialog",
                    "#PreProcessConfirmBtn",
                    PreProcessTable,
                    new mf.TextRander({ size: 9, readonly: 'readonly', title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#PreProcessNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "PreItemProcessID", e.data.ItemProcessID);
                    table.setEditingColumnValue($row, "PreSequence", e.data.Sequence);
                    table.setEditingColumnValue($row, "PreProcessCode", e.data.ProcessCode);
                    table.setEditingColumnValue($row, "PreProcessName", e.data.ProcessName);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.PreProcessNoIsNull)
                ]
            },
            {
                field: 'PreProcessName', title: fields.PreProcessDescription, align: "center", width: "140", visible: false,
                rander: new mf.TextRander({ size: 13, disabled: "disabled", title: "" })
            },
            {
                field: 'IfMain', title: fields.MainProcess, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray, { title: true, IsBoolean: true })
            },
            {
                field: 'FinishProcess', title: fields.FinalProcess, align: "center", width: "100",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false, disabled: true })
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
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });
    MainTable.loadData();

    // 返回
    this.backClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.TopBackURL,
                Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.TopBackURL;
        }, function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.TopBackURL,
                Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.TopBackURL;
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
        //    url: "/MES/api/IntelligentManufacturing/CheckProcessRelationShip",
        //    data: JSON.stringify({ "ItemID": mainForm.ItemID }),
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

    //制程关系图
    this.chartClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
                {
                    URL: "/MES/IntelligentManufacturing/SFC00001ProcessRelationshipChart",
                    Parameters: {
                        BackURL: "/MES/IntelligentManufacturing/SFC00001ProcessRelationship",
                        TopBackURL: PageParameters.TopBackURL,
                        TopMID: PageParameters.TopMID,
                        Row: PageParameters.Row
                    }
                });
            window.location.href = '/MES/IntelligentManufacturing/SFC00001ProcessRelationshipChart';
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
    "Back", "Refresh", "PreProcessSequence", "PreProcessNo", "PreProcessDescription",
    "Save", "Change", "MainProcess", "FinalProcess", "ProcessRelationshipDiagram", "PreProcessNoIsNull"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};