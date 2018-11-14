var model = null;
var parameters = null;
var lScourceClass = "";
var SelectRow = null;
var viewModel = function () {
    var self = this;
    var statuslist = [{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }];
    var formData = {
        Code: ko.observable(""),
        Status: ko.observable(""),
        StatusList: ko.observableArray(parameters.PT0191213000001)
    };
    ko.applyBindings(formData);

    var table = new mf.Table("#INF00015Table", {
        uniqueId: "ResourceID",
        deleteId: "ResourceID",
        isFrozenColumn: true,
        LastWidth: "50",
        IsSetTableWidth: true,
        focusField: "Code",
        focusEditField: "Quantity",
        height: window.innerHeight - 145,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "90px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:90px;text-align:center;">');
            var $btn = $('<button id="reviewClick" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.reviewClick(this)">' + fields.SourceDetail + '</button>');
            return $td.append($btn);
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $BtnReviewClick = $row.find("#reviewClick");
            if (isAdding) {
                $BtnReviewClick.hide();
            }
            else {
                $BtnReviewClick.show();
            }
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00015GetList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            $("#btn_save").attr("disabled", true);
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00015Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    $("#btn_save").attr("disabled", false);
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00015Delete',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        isRealDelete: true,
        columns: [
            {
                field: 'ClassID', title: fields.SourceClass, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander("value", "Newvalue",
                    parameters.PT0191213000013, { noSearchSelectedText: "", title: true, MaxWidth: "90px" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceClassIsNull)
                ],
            },
            {
                field: 'Code', title: fields.SourceCode, align: "center", require: true, width: "130",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceCodeIsNull)
                ]
            },
            {
                field: 'Description', title: fields.SourceDescription, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: true }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceDescriptionIsNull)
                ]
            },
            {
                field: 'Quantity', title: fields.SourceCount, align: "center", width: "100", defaultValue: 1,
                rander: new mf.TextRander({ size: 6, maxLength: 16, title: true }),
                checkers: [
                    new mf.IsPositiveNumberChecker(fields.SourceCountIsIncorrect)
                ]
            },
            {
                field: 'GroupID', title: fields.SourceGroup, align: "center", require: true, width: "110",
                rander: new mf.AutoSelectRander("value", "Newvalue", parameters.PT0191213000014,
                    { noSearchSelectedText: "", title: true, MaxWidth: "90px" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.SourceGroupIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(parameters.PT0191213000001),
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
            },
            {
                field: 'Placeholder', title: '',
                rander: new mf.PlaceholderRander(),
            }
        ]
    });
    table.loadData();

    //员工列表1
    var NoMESUserTable = new mf.Table("#NoMESUserTable", {
        uniqueId: "ID",
        enter_addble: false,
        dblclick_editable: false,
        noNumColumn: true,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="NoMESUserCheck" />',
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#LEquipmentCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00015NoDetailListV1',
                data: ({ ResourceID: SelectRow.ResourceID, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'DetailCode', title: fields.EmployeeCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'DetailName', title: fields.Name, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //员工列表2
    var MESUserTable = new mf.Table("#MESUserTable", {
        uniqueId: "ID",
        enter_addble: false,
        dblclick_editable: false,
        noNumColumn: true,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="MESUserCheck" />',
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00015DetailList',
                data: ({ ResourceID: SelectRow.ResourceID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'DetailCode', title: fields.EmployeeCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'DetailName', title: fields.Name, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "140",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //设备列表1
    var NoEquipmentTable = new mf.Table("#NoEquipmentTable", {
        uniqueId: "ID",
        enter_addble: false,
        dblclick_editable: false,
        noNumColumn: true,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="NoEquipmentCheck"/>',
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#MEquipmentCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00015NoDetailListV1',
                data: ({ ResourceID: SelectRow.ResourceID, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'DetailCode', title: fields.EquipmentCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "" }),
            },
            {
                field: 'DetailName', title: fields.EquipmentDescription, align: "center", width: "160",
                rander: new mf.TextRander({ title: "" }),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "100",
                rander: new mf.TextRander({ title: "" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "100",
                rander: new mf.TextRander({ title: "" }),
            }
        ]
    });

    //设备列表2
    var EquipmentTable = new mf.Table("#EquipmentTable", {
        uniqueId: "ID",
        enter_addble: false,
        dblclick_editable: false,
        noNumColumn: true,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="EquipmentCheck"/>',
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00015DetailList',
                data: ({ ResourceID: SelectRow.ResourceID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'DetailCode', title: fields.EquipmentCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "" }),
            },
            {
                field: 'DetailName', title: fields.EquipmentDescription, align: "center", width: "160",
                rander: new mf.TextRander({ title: "" }),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "100",
                rander: new mf.TextRander({ title: "" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "100",
                rander: new mf.TextRander({ title: "" }),
            }
        ]
    });

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };
    //人工資源查询
    this.LEquipmentCodeSearch = function () {
        table.goForwordSafely(function () {
            NoMESUserTable.loadData();
        }, null);
    };
    //设备資源查询
    this.MEquipmentCodeSearch = function () {
        table.goForwordSafely(function () {
            NoEquipmentTable.loadData();
        }, null);
    };
    //清除数据
    this.clear = function (ID) {
        $(ID).val("");
    }

    // 刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForword(function () {
            window.location.reload();
        }, function () {
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

        if (!(row.ResourceID && row.ResourceID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.SourceCode + '</label>' +
            '&nbsp;<input type="text" Class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.SourceDescription + '</label>' +
            '&nbsp;<input type="text" Class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Description == null ? "" : row.Description) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" Class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Code', title: fields.SourceCode,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.SourceDescription,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00015SourceCode",
            parentMID: "MID",
            tableID: "32",
            rowID: row.ResourceID,
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

            var $trLength = $("#INF00015Table").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00015Export?Token=' + token;

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (formData.Status() && formData.Status().length > 0) {
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
            $("#BtnImport").attr("disabled", true);
            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00015Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    $("#BtnImport").attr("disabled", false);
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

    //资源明细开窗
    this.reviewClick = function (obj) {
        $row = $(obj).parents("tr");
        var row = table.getRowData($row);
        SelectRow = row;
        if (row.ClassID == lScourceClass) {
            NoMESUserTable.loadDataBack(null, function () {
                $("#NoMESUserCheck").click(function () {
                    var $trCheckbox = $("#NoMESUserTable").find('input[class="mf-option"]:checkbox');
                    if ($("#NoMESUserCheck").is(':checked')) {
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
                });
            });
            MESUserTable.loadDataBack(null, function () {
                $("#MESUserCheck").click(function () {
                    var $trCheckbox = $("#MESUserTable").find('input[class="mf-option"]:checkbox');
                    if ($("#MESUserCheck").is(':checked')) {
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
                });
            });
            $("#LSourceCode").val(row.Code);
            $("#LSourceDescription").val(row.Description);

            $("#AddLResource").unbind();
            $("#AddLResource").click(function () {
                var rowDataLeftArray = [];
                var $selectedRows = NoMESUserTable.getMultiSelectedRows();
                $selectedRows.each(function (i, $selectedRow) {
                    var rowData = NoMESUserTable.getRowData($selectedRow);
                    rowDataLeftArray.push(rowData);
                    MESUserTable.pushRow(rowData);
                });
                NoMESUserTable.deleteMultiSelectedRows();
                $("#NoMESUserCheck").prop("checked", false);
                $("#MESUserCheck").prop("checked", false);
            });
            $("#DeleteLResource").unbind();
            $("#DeleteLResource").click(function () {
                var rowDataRightArray = [];
                var $selectedRows = MESUserTable.getMultiSelectedRows();
                $selectedRows.each(function (i, $selectedRow) {
                    var rowData = MESUserTable.getRowData($selectedRow);
                    rowDataRightArray.push(rowData);
                    NoMESUserTable.pushRow(rowData);
                });
                MESUserTable.deleteMultiSelectedRows();
                $("#NoMESUserCheck").prop("checked", false);
                $("#MESUserCheck").prop("checked", false);
            });
            $("#LResourceDetailsConfirmBtn").unbind();
            $("#LResourceDetailsConfirmBtn").click(function () {
                var SaveData = {};
                var Data = MESUserTable.getAllRowData();
                SaveData.data = Data;
                SaveData.ResourceID = row.ResourceID;
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00015DetailSave',
                    data: JSON.stringify(SaveData),
                    success: function (data) {
                        if (data.status === "200") {
                            msg.success(fields.Prompt, data.msg, function () {
                                NoMESUserTable.loadData();
                                MESUserTable.loadData();
                                $("#NoMESUserCheck").prop("checked", false);
                                $("#MESUserCheck").prop("checked", false);
                            });
                        }
                        else {
                            msg.error(fields.Prompt, data.msg);
                        }
                    }
                });
            });

            $("#LResourceDetailsDialog").modal({ backdrop: 'static', keyboard: false });
            $("#LResourceDetailsDialog").modal('show');
        }
        else {
            NoEquipmentTable.loadDataBack(null, function () {
                $("#NoEquipmentCheck").click(function () {
                    var $trCheckbox = $("#NoEquipmentTable").find('input[class="mf-option"]:checkbox');
                    if ($("#NoEquipmentCheck").is(':checked')) {
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
                });
            });
            EquipmentTable.loadDataBack(null, function () {
                $("#EquipmentCheck").click(function () {
                    var $trCheckbox = $("#EquipmentTable").find('input[class="mf-option"]:checkbox');
                    if ($("#EquipmentCheck").is(':checked')) {
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
                });
            });
            $("#MSourceCode").val(row.Code);
            $("#MSourceDescription").val(row.Description);

            $("#AddMResource").unbind();
            $("#AddMResource").click(function () {
                var $selectedRows = NoEquipmentTable.getMultiSelectedRows();
                console.log($selectedRows);
                $selectedRows.each(function (i, $selectedRow) {
                    var rowData = NoEquipmentTable.getRowData($selectedRow);
                    EquipmentTable.pushRow(rowData);
                });
                NoEquipmentTable.deleteMultiSelectedRows();
                $("#NoEquipmentCheck").prop("checked", false);
                $("#EquipmentCheck").prop("checked", false);
            });
            $("#DeleteMResource").unbind();
            $("#DeleteMResource").click(function () {
                var rowDataRightArray = [];
                var $selectedRows = EquipmentTable.getMultiSelectedRows();
                $selectedRows.each(function (i, $selectedRow) {
                    var rowData = EquipmentTable.getRowData($selectedRow);
                    rowDataRightArray.push(rowData);
                    NoEquipmentTable.pushRow(rowData);
                });
                EquipmentTable.deleteMultiSelectedRows();
                $("#NoEquipmentCheck").prop("checked", false);
                $("#EquipmentCheck").prop("checked", false);
            });
            $("#MResourceDetailsConfirmBtn").unbind();
            $("#MResourceDetailsConfirmBtn").click(function () {
                var SaveData = {};
                var Data = EquipmentTable.getAllRowData();
                SaveData.data = Data;
                SaveData.ResourceID = row.ResourceID;
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00015DetailSave',
                    data: JSON.stringify(SaveData),
                    success: function (data) {
                        if (data.status === "200") {
                            msg.success(fields.Prompt, data.msg, function () {
                                NoEquipmentTable.loadData();
                                EquipmentTable.loadData();
                                $("#NoEquipmentCheck").prop("checked", false);
                                $("#EquipmentCheck").prop("checked", false);
                            });
                        }
                        else {
                            msg.error(fields.Prompt, data.msg);
                        }
                    }
                });
            });

            $("#MResourceDetailsDialog").modal({ backdrop: 'static', keyboard: false });
            $("#MResourceDetailsDialog").modal('show');
        }
    };
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "SourceDetail", "SourceClass", "SourceCode", "SourceDescription", "SourceCount", "SourceGroup",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Normal", "Invalid",
    "Cancel", "Browse", "Comfirm", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "SourceDetailMaintenance",
    "PleaseSaveDataFirst", "PleaseSelectFile", "SourceClassIsNull", "SourceCodeIsNull", "SourceDescriptionIsNull",
    "SourceCountIsIncorrect", "SourceGroupIsNull", "Description", "EmployeeInformation", "EmployeeCode", "SourceDetailIsNull",
    "EquipmentInformation", "EquipmentCode", "EquipmentDescription", "Name", "Department", "NotAttribution",
    "Attribution"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000013,0191213000014" },
        success: function (data) {
            parameters = data;

            var list = parameters.PT0191213000013;
            var length = parameters.PT0191213000013.length;
            for (var i = 0; i < length; i++) {
                if (list[i].Code == "L") {
                    lScourceClass = list[i].value;
                    break;
                }
            }

            model = new viewModel();
        }
    });
};
