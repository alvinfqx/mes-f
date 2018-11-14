var URL = "/MES/IntelligentParameters/INF00018WorkCenterProcess";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var mainForm = PageParameters.Row;
    var booleanArray = [{ value: "false", text: "N" }, { value: "true", text: "Y" }];
    parameters = mf.format.getMesParameters("0191213000058");
    var treePostData = {};
    //treePostData.ItemID = mainForm.ItemID;
    var formData = {
        Code: ko.observable(PageParameters.Code),
        Name: ko.observable(PageParameters.Name),
    };
    ko.applyBindings(formData);
    var leftHeight = (window.innerHeight - 162);

  
    //$("#treeList").height(leftHeight);


    //mf.ajax({
    //    type: 'Get',
    //    url: '/MES/api/IntelligentManufacturing/Sfc00001GetTreeList',
    //    data: treePostData,
    //    success: function (data) {
    //        var treeData = null,
    //            treeNode = null;
    //        treeData = mf.deal.toTreeData(data, 'ItemProcessID', 'Parenter', 'children');
    //        treeNode = eval(
    //            JSON.stringify(treeData).replace(/Value/g, 'text')
    //            );
    //        treeNode = mf.deal.addCPropertyAndCopy(treeNode, 'icon', 'iconCls', 'children');
    //        treeNode = treeNode.map(function (d) {
    //            d.icon = "fa fa-folder";
    //            d.state = { "opened": true };
    //            return d;
    //        });
    //        $("#ProcessProcess_Jstree").bind("activate_node.jstree",
    //            function (obj, e) {
    //                var currentNode = e.node.original;
    //                formData.FabMoProcessID("");
    //                formData.FabMoOperationID("");
    //                formData.FabMoProcessID(currentNode.ItemProcessID);//制程ID
    //                formData.FabMoOperationID(currentNode.ItemOperationID);//工序ID
    //                ItemMasterFileTable.loadData();
    //                MainTable.loadData();
    //                self.clearData();

    //            }).jstree({
    //                "core":
    //               {
    //                   "data": treeNode
    //               }
    //            });
    //    }
    //});

    //未選擇資料
    var ProcessSettingTable = new mf.Table("#ProcessSettingTable", {
        uniqueId: "Id",
        editable: false,
        height: window.innerHeight - 145,
        noNumColumn: true,
        LastWidth: "95",
        IsSetTableWidth: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedLeft"  onclick="model.checkboxResourceClick(this);"/>',
        //paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = PageParameters.rowID;
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
                field: 'Id', title: fields.ProcessNo, align: "center", require: true, width: "110", visible: false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessNo', title: fields.ProcessNo, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'EnableProcess', title: fields.EnableProcess, align: "center", require: false, width: "110",
                rander: new mf.SelectRander([{ value: true, text: fields.yes }, { value: false, text: fields.no }]),
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false,
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    //主列表
    var ProcessSettingChangeTable = new mf.Table("#ProcessSettingChangeTable", {
        uniqueId: "Id",
        dblclick_editable: false,
        noNumColumn: true,
        isFrozenColumn: false,
        LastWidth: "95",
        IsSetTableWidth: true,
        height: window.innerHeight - 150,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedRight"  onclick="model.checkboxMainTableClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.WorkCenterID = PageParameters.rowID;
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
        fn_saveData: function (saveData, success) {
            var saveData = {};
        var table_data = ProcessSettingChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.WorkCenterID = PageParameters.rowID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018MasterWorkCenterProcessSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        //ProcessSettingChangeTable.loadData();
                        //ProcessSettingTable.loadData();
                        //$('#ProcessSettingDialog').modal('hide');
                        window.location.href = PageParameters.parentUrl;
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
            //mf.ajax({
            //    type: 'Post',
            //    url: '/MES/api/IntelligentManufacturing/Sfc00001BomSave',
            //    data: JSON.stringify(saveData),
            //    success: function (data) {
            //        self.clearData();
            //        success(data);
            //    }
            //});
        },
        columns: [
             {
                 field: 'Id', title: fields.ProcessNo, align: "center", require: true, width: "110", visible: false,
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
             {
                 field: 'ProcessNo', title: fields.ProcessNo, align: "center", require: true, width: "110",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
             },
            {
                field: 'ProcessDescription', title: fields.ProcessDescription, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" }))
            },
            {
                field: 'EnableProcess', title: fields.EnableProcess, align: "center", require: false, width: "110",
                rander: new mf.SelectRander([{ value: true, text: fields.yes }, { value: false, text: fields.no }]),
            },
            {
                field: 'Status', title: fields.Status, align: "center", require: false,
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" })
            }
        ]
    });

    // 返回
    this.backClick = function () {
        ProcessSettingChangeTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.parentUrl,
                //Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.parentUrl;
        }, function () {
            window.top.page_parameters.Caching.push({
                URL: PageParameters.parentUrl,
                //Parameters: PageParameters.TopMID
            });
            window.location.href = PageParameters.parentUrl;
        }, fields.Isleave);
    }

    //刷新
    this.refreshClick = function () {
        ProcessSettingChangeTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
            window.location.reload();
        });
    };

    //保存
    this.saveClick = function () {
        //ProcessSettingChangeTable.save(null, null, true);
        var saveData = {};
        var table_data = ProcessSettingChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.WorkCenterID = PageParameters.rowID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018MasterWorkCenterProcessSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        ProcessSettingChangeTable.loadData();
                        ProcessSettingTable.loadData();
                        $('#ProcessSettingDialog').modal('hide');
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    };

    this.checkboxResourceClick = function (obj) {
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

    this.checkboxMainTableClick = function (obj) {
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
    }

    //右移
    this.MoveRightClick = function () {
        var $selectedRows = ProcessSettingTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessSettingTable.getRowData($selectedRow);
            ProcessSettingChangeTable.pushRow(rowData);
        });

        ProcessSettingTable.deleteMultiSelectedRows();

        $("#IsCheckedLeft").prop("checked", false);
        $("#IsCheckedRight").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
    };

    //左移
    this.MoveLeftClick = function () {
        var $selectedRows = ProcessSettingChangeTable.getMultiSelectedRows();

        var rows = [];
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
            rows.push(rowData);
        });

        var checkData = {};
        checkData.data = rows;
        checkData.WorkCenterID = PageParameters.rowID;
        console.log(JSON.stringify(checkData));

        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00018MasterWorkCenterProcessDelete',
            data: JSON.stringify(checkData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    $selectedRows.each(function (i, $selectedRow) {
                        var rowData = ProcessSettingChangeTable.getRowData($selectedRow);
                        ProcessSettingTable.pushRow(rowData);
                    });
                    ProcessSettingChangeTable.deleteMultiSelectedRows();

                    $("#IsCheckedLeft").prop("checked", false);
                    $("#IsCheckedRight").prop("checked", false);
                    $("#IsDepartmentCheckedChange").prop("checked", false);
                    $("#IsDepartmentChecked").prop("checked", false);
                }
                else {
                    msg.warning(fields.info, data.msg,
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

                            msg.info(fields.info, fields.Finish);
                        }
                    );
                }
            }
        });
    };
    ProcessSettingTable.loadData();
    ProcessSettingChangeTable.loadData();
    ////制程主档清理查询字段和清除全选状态
    //this.clearData = function () {
    //    $("#IsCheckedLeft").prop("checked", false);
    //    $("#IsCheckedRight").prop("checked", false);
    //};
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
    "Save", "Change", "NameSpecification", "Sequence", "SequenceIsError", "Part",
    "ItemSource", "BasicDosage", "AttritionRate", "UsageAmount", "EngineeringDrawing",
    "ItemNo", "ItemDescription", "ItemSpecification", "SupplyType", "ItemInformation",
    "StartItemCode", "EndItemCode", "BasicQuantityIsNonNegativeNumber", "BasicQuantityIsMaxInteger",
    "BasicQuantityIsMaxDecimal", "AttritionRateIsNonNegativeNumber", "AttritionRateIsMaxInteger",
    "AttritionRateIsMaxDecimal", "OrderNum", "SequenceNo", "Qty", "ManufacturingUnit", "WorkOrderDescription",
    "WorkOrderNo", "OperationSequence", "AuxUnitRatioIsNonNegativeNumber", "info", "EnableProcess", "yes", "no", "Finish", "NoSelect", "Select"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};