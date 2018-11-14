var URL = "/MES/IntelligentManufacturing/SFC00002ProcessRelationship";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "true", text: "Y" }, { value: "false", text: "N" }];
    parameters = mf.format.getMesParameters("0191213000058");
    var formData = {
        Code: ko.observable(mainForm.ItemCode),
        Name: ko.observable(mainForm.ItemName),
        Specification: ko.observable(mainForm.Specification),
        OrderNum: ko.observable(mainForm.MoNo),
        SequenceNo: ko.observable(mainForm.SplitSequence),
        Quantity: ko.observable(mainForm.Quantity),
        ManufacturingUnit: ko.observable(mainForm.UnitID)
    };
    ko.applyBindings(formData);
    console.log(1234)
    //制品制程列表
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ID",
        editable: false,
        height: 300,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#ProcessNo").val();;
            searchData.FabricatedMotherID = mainForm.FabricatedMotherID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/SfcGetFabMoProcessList',
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
            searchData.FabricatedMotherID = mainForm.FabricatedMotherID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/SfcGetFabMoProcessList',
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
        uniqueId: "FabMoRelationshipID",
        focusField: "Sequence",
        focusEditField: "Sequence",
        isFrozenColumn: false,
        height: window.innerHeight - 182,
        paginationBar: new mf.PaginationBar("#MainPageBar"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.FabricatedMotherID = mainForm.FabricatedMotherID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002GetFabMoRelShipList',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0, length = saveData.inserted.length; i < length; i++) {
                saveData.inserted[i].FabricatedMotherID = mainForm.FabricatedMotherID;
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabMoRelShipSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData) {
            var deleteData = {};
            deleteData.FabMoRelationshipID = rowData.FabMoRelationshipID;
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentManufacturing/FabMoRelShipDelete',
                data: JSON.stringify(deleteData),
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
        },     
        columns: [
            {
                field: 'FabMoProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'Sequence', title: fields.ProcessSequence, align: "center", width: "80",
                rander: new mf.TextRander({ size: 2, disabled:true, title: "" })
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140", require: true,
                rander: new mf.FKRander(
                    "#ProcessDialog",
                    "#ProcessConfirmBtn",
                    ProcessTable,
                    new mf.TextRander({ size: 11, readonly: true, title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#ProcessNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "FabMoProcessID", e.data.FabMoProcessID);
                    table.setEditingColumnValue($row, "Sequence", e.data.Sequence);
                    table.setEditingColumnValue($row, "ProcessCode", e.data.ProcessCode);
                    table.setEditingColumnValue($row, "ProcessName", e.data.ProcessName);
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessIsNull)
                ]
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 13, disabled: true, title: "" })
            },
            {
                field: 'PreFabMoProcessID', title: "", visible: false,
                rander: new mf.TextRander()
            },
            {
                field: 'PreSequence', title: fields.PreProcessSequence, align: "center", width: "80",
                rander: new mf.TextRander({ size: 2, disabled: true, title: "" })
            },
            {
                field: 'PreProcessCode', title: fields.PreProcessNo, align: "center", width: "140",
                rander: new mf.FKRander(
                    "#PreProcessDialog",
                    "#PreProcessConfirmBtn",
                    PreProcessTable,
                    new mf.TextRander({ size: 11, readonly: true, title: "" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#PreProcessNo", text: "" }]
                    }
                ),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "PreFabMoProcessID", e.data.FabMoProcessID);
                    table.setEditingColumnValue($row, "PreSequence", e.data.Sequence);
                    table.setEditingColumnValue($row, "PreProcessCode", e.data.ProcessCode);
                    table.setEditingColumnValue($row, "PreProcessName", e.data.ProcessName);
                }
            },
            {
                field: 'PreProcessName', title: fields.PreProcessDescription, align: "center", width: "140",
                rander: new mf.TextRander({ size: 13, disabled: true, title: "" })
            },
            {
                field: 'IfMain', title: fields.MainProcess, align: "center", width: "100",
                rander: new mf.AutoSelectRander("value", "text", booleanArray, { title: true, IsBoolean: true })
            },
            {
                field: 'IfLastProcess', title: fields.FinalProcess, align: "center", width: "100",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false, disabled: true })
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
        //if (!MainTable)
        //    return;
        //if (MainTable.SaveOrNotStatus()) {
        //    msg.warning(fields.info,
        //            fields.Isleave,
        //            function () {
        //                window.top.page_parameters.Caching.push({ URL: PageParameters.TopBackURL, Parameters: PageParameters.TopMID });
        //                window.location.href = PageParameters.TopBackURL;
        //            }, function () {
        //                // 取消查询
        //            });
        //}
        //else {
        //    window.top.page_parameters.Caching.push({ URL: PageParameters.TopBackURL, Parameters: PageParameters.TopMID });
        //    window.location.href = PageParameters.TopBackURL;
        //}


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
        $("#btn_save").attr({ disabled: "disabled" });
        setTimeout(function () { $("#btn_save").removeAttr("disabled") }, 600);
        MainTable.save(null, null, true);
    };

    //制程关系图
    this.ProcessRelationshipDiagramClick = function () {
        MainTable.goForword(function () {
            window.top.page_parameters.Caching.push(
              {
                  URL: "/MES/IntelligentManufacturing/SFC00002ProcessRelationship",
                  Parameters: {
                      TopMID: PageParameters.TopMID,
                      BackURL: "/MES/IntelligentManufacturing/SFC00002ProcessRelationship",
                      TopBackURL: PageParameters.TopBackURL,
                      Row: mainForm
                  }
              });
            window.location.href = '/MES/IntelligentManufacturing/SFC00002ProcessRelaDiagram';
        }, null, fields.Isleave);
    };
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
    "Save", "Change", "MainProcess", "FinalProcess", "OrderNum", "SequenceNo", "Qty", "ManufacturingUnit",
    "Isleave", "ProcessRelationshipDiagram", "info"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};