var viewModel = function () {
    var self = this;
    var ID, parameters, ItemID, InspectionType, ProcessID, OperationID;
    var SettingType = mf.systemID +  "020121300007C";
    var Narray = [{ value: "", text :"" }], Projectarry = [], ProjectData, Checkarry = [], AQLarry = [];
    var DisadvantagesOne, DisadvantagesTwo, DisadvantagesThree;
    var ProjectName, ProjectInspectionStandard, ProjectInspectionLevelName, ProjectDisadvantagesName, ProjectAttribute;

    //设置状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "019121300001B,019121300001E,0191213000052,019121300001C" },
        success: function (data) {
            parameters = data;
            for (var i = 0; i < parameters.PT019121300001E.length; i++) {
                Narray[i] = { value: parameters.PT019121300001E[i].value, text: parameters.PT019121300001E[i].Code }
            }
            for (var i = 0, j = 0; i < parameters.PT019121300001B.length; i++) {
                if (parameters.PT019121300001B[i].value.substring(5, parameters.PT019121300001B[i].value.length) != "0201213000057" && parameters.PT019121300001B[i].value.substring(5, parameters.PT019121300001B[i].value.length) != "020121300005B") {
                    Checkarry[j] = { value: parameters.PT019121300001B[i].value, text: parameters.PT019121300001B[i].text }
                    j++;                 
                }                
            }
        }
    });

    //设置檢驗項目
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/PopUp/QCS00004GetInspectionProjectList",
        success: function (data) {
            if (data == null) {
                ProjectName = "";
                ProjectInspectionStandard = "";
                ProjectInspectionLevelName = "";
                ProjectDisadvantagesName = "";
                ProjectAttribute = "";
            }
            ProjectData = data;
            DisadvantagesOne = ProjectData[0].Disadvantages;
            DisadvantagesTwo = ProjectData[0].Disadvantages;
            DisadvantagesThree = ProjectData[0].Disadvantages;
            for (var i = 0; i < data.length; i++) {
                Projectarry[i] = { value: data[i].InspectionProjectID, text: data[i].Code }
            }
        }
    });

    //查询
    this.searchClick = function () {
        if (!table)
            return;
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };
    //刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

    //料品设定
    this.DetailsClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.Isedit);
            return;
        }

        mf.dialog('#ItemSetDialog', {
            viewModel: function () {               
                ID = row.ParameterID;
                NoItemSetTable.loadData();
                ItemSetTable.loadData();
                $("#CheckGroupCode").val(row.Code);
                $("#CheckGroupName").val(row.Name);
                $("#CheckGroupCode").attr("title", row.Code);
                $("#CheckGroupName").attr("title", row.Name);
            }
        })
    }

    //已归属全选
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

    //未归属全选
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

    //右移
    this.ProcessMoveRightClick = function () {
        var rowDataLeftArray = [];
        var $selectedRows = NoItemSetTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = NoItemSetTable.getRowData($selectedRow); // 拿对应的行数据
           rowDataLeftArray.push(rowData);
            ItemSetTable.pushRow(rowData);
        });

        NoItemSetTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //左移
    this.ProcessMoveLeftClick = function () {
        var rowDataRightArray = [];
        var $selectedRows = ItemSetTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ItemSetTable.getRowData($selectedRow); // 也可以拿对应的行数据
            rowDataRightArray.push(rowData);
            NoItemSetTable.pushRow(rowData);
        });
        ItemSetTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //弹窗查询
    this.ItemSearchClick = function () {
        if (NoItemSetTable.hasChange()) {
            msg.warning(fields.info,
                    fields.SaveOrNot,
                    function () {
                        self.detailSaveClick();
                    }, function () {
                        // 取消查询
                    });
        }
        else {
            NoItemSetTable.loadData();
        }
    }

    //弹窗保存
    this.detailSaveClick = function () {
        var SaveData = {};
        var Data = ItemSetTable.getAllRowData();
        SaveData.data = Data;
        SaveData.GroupID = ID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00003DetailsSaveV2',
            data: JSON.stringify(SaveData),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        ItemSetTable.loadData();
                        NoItemSetTable.loadData();
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    }

    //未归属
    var NoItemSetTable = new mf.Table("#NoItemSetTable", {
        uniqueId: "ID",
        noNumColumn: true,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#paginagionNoItemSetBar"),
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            var startCode = $("#StartCode").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#EndCode").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";

            searchData.GroupID = ID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00003ItemListV2',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        fn_paginationBarisload: function () {
            if (NoItemSetTable.hasChange()) {
                return false;
            }
            else {
                return true;
            }
        },
        fn_paginationBarClick: function () {
            msg.warning(fields.info,
                    fields.SaveOrNot,
                    function () {
                        self.detailSaveClick();
                    }, null);
        },
        focusField: "Name",
        height: 370,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "90",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Type', title: fields.SupplyForm, align: "center", width: "80",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });

    //归属
    var ItemSetTable = new mf.Table("#ItemSetTable", {
        uniqueId: "ID",
        noNumColumn: true,
        LastWidth: "110",
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00003DetailsListV2',
                data: { GroupID: ID },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        focusField: "Name",
        height: 390,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "90",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Type', title: fields.SupplyForm, align: "center", width: "80",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });

    //清除数据
    this.clearData = function () {
        $("#StartCode").val("");
        $("#EndCode").val("");
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    }

    //显示制程检验
    this.ProcessTestClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            InspectionType: mf.systemID + "020121300007E",
            ItemID: row.ParameterID,
            SettingType: SettingType,
            Code: row.Code,
            Name: row.Name,
            ProcessID: null,
            OperationID: row.OperationID,
            IsIP: true,
            IsFPI: false,
            IsOSI: false
        };
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: '/MES/QualityManagement/QCS00004Same', Parameters: parameters });
            window.location.href = '/MES/QualityManagement/QCS00004Same';
        },
        function () {
            window.top.page_parameters.Caching.push({ URL: '/MES/QualityManagement/QCS00004Same', Parameters: parameters });
            window.location.href = '/MES/QualityManagement/QCS00004Same';
        });
    };
   
    //显示首件检验
    this.FirstTestClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
 
        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            InspectionType: mf.systemID + "0201213000080",
            ItemID: row.ParameterID,
            SettingType: SettingType,
            Code: row.Code,
            Name: row.Name,
            ProcessID: null,
            OperationID: row.OperationID,
            IsIP: false,
            IsFPI: true,
            IsOSI: false
        };
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: '/MES/QualityManagement/QCS00004Same', Parameters: parameters });
            window.location.href = '/MES/QualityManagement/QCS00004Same';
        },
        function () {
            window.top.page_parameters.Caching.push({ URL: '/MES/QualityManagement/QCS00004Same', Parameters: parameters });
            window.location.href = '/MES/QualityManagement/QCS00004Same';
        });

    };

   
    //显示制程巡检
    this.ProcessPatrolClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }   
      
        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            InspectionType: mf.systemID +  "0201213000081",
            ItemID: row.ParameterID,
            SettingType: SettingType,
            Code: row.Code,
            Name: row.Name,
            ProcessID: null,
            OperationID: row.OperationID,
            IsIP: false,
            IsFPI: false,
            IsOSI: true
        };
       
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: '/MES/QualityManagement/QCS00004Same', Parameters: parameters });
            window.location.href = '/MES/QualityManagement/QCS00004Same';
        },
        function () {
            window.top.page_parameters.Caching.push({ URL: '/MES/QualityManagement/QCS00004Same', Parameters: parameters });
            window.location.href = '/MES/QualityManagement/QCS00004Same';
        });

    };



    //设置表格
    var table = new mf.Table("#QCS00004GroupTable", {
        uniqueId: "ParameterID",
        LastWidth: "130",
        IsSetTableWidth: true,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00004GetGroupItemList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {                
                    console.log(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $DatavalueClickEditingCell = $row.find("#DatavalueClick");
            if (isAdding) {
                $DatavalueClickEditingCell.attr('disabled', true);
            }
            else {
                $DatavalueClickEditingCell.attr('disabled', false);
            }
        },
        focusField: "Code",
        focusEditField: "Attribute",
        isFrozenColumn: true,
        operateColumWidth: "280px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:280px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="DatavalueClick" onclick="model.DetailsClick(this)" title="料品设定" >' + fields.ItemSetting + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="ProcessTest" onclick="model.ProcessTestClick(this)" title="制程检验" >' + fields.ProcessTest + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="FirstTest" onclick="model.FirstTestClick(this)" title="首件检验" >' + fields.FirstTest + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="ProcessPatrol" onclick="model.ProcessPatrolClick(this)" title="制程巡检" >' + fields.ProcessPatrol + '</button>');
            return $td;
        },
        height: window.innerHeight - 144.6,
        columns: [
            {
                field: 'Code', title: fields.CheckGroupCode, align: "center", require: true, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.CheckGroupName, align: "center", width: "135",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

    //导入    
    this.importClick = function () {
        mf.dialog("#inputDialog", {
            viewModel: function () {
                var importSelf = this;
                $("#FileName").text(fields.PleaseSelectFile);
                $("#BtnFile").val("");

                $("#BtnFile").unbind();
                $("#BtnBrowse").unbind();
                $("#addFile").unbind();

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
                $('#addFile').click(function () {

                    var formData = new FormData();
                    formData.append("File", document.getElementById("BtnFile").files[0]);
                    formData.append("Token", token);

                    $.ajax({
                        type: "POST",
                        url: window.top.mf.domain + "/MES/api/ImportFile/Qcs00004ImportV1",
                        data: formData,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            //if (res.status == "200" || res.Status == 200) {
                            //    msg.success(fields.info, res.msg, function () {
                            //        $('#ImportDialog').modal('hide');
                            //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            //        window.location.reload();
                            //    });                               
                            //}
                            //else {
                            //    msg.info(fields.info, res.msg);
                            //}
                            if (d.Isreason) {
                                msg.infoCall(fields.info, d.msg, function () {
                                    window.location.href = mf.domain + '/MES/api/Util/ImportDownload?Token=' + token + '&Name=' + d.FileName;
                                });
                            }
                            else {
                                msg.success(fields.info, d.msg, function () {
                                    $('#inputDialog').modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                        }
                    });
                })
            }
        });
    };

}

var URL = "/MES/QualityManagement/QCS00004CheckGroupCode";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "CheckGroupCode", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "ItemName", "SupplyType",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "Langwage", "Unit", "GoodsName", "Specification",
    "Remark", "ItemMasterFile", "Comfirm", "ProcessPatrol", "TestType", "ProcessTest", "FirstTest", "InspectionCategoryNo",
    "IsTest", "ProcessNo", "ProcessDescription", "EnableProcess", "WorkOrderNo", "WorkOrderDescription", "IsTest",
    "Sorting", "InspectionCategoryNo", "TestCategoryName", "InspectionMethod", "Disadvantages", "TestItemsNo", "TestItemsDec",
    "TestStandard", "InspectionLevel", "AQL", "MeasuredvalueSet", "ProductProcessFile", "CheckGroupCodeIsNull", "CheckGroupName",
    "Invalid", "Normal", "ItemSetting", "ItemNo", "SupplyForm", "ItemDescription", "ItemSpecification", "NotAttribution", "Attribution",
    "SequenceIsNull", "SortingIsNum", "Isleave", "Fulfilled", "FreeTest", "StartItemCode", "EndItemCode", "Isedit", "SaveOrNot",
    "PleaseSelectFile", "info"
];

words = arrayWord.join();

var model = null;
//var parameters = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};