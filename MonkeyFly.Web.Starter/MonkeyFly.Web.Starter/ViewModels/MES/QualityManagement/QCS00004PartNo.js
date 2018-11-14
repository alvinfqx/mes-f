var URL = "/MES/QualityManagement/QCS00004PartNo";
var MID = window.top.page_parameters.GetParameters(URL);


var viewModel = function () {
    var self = this;
    var ExportTotal, parameters, ItemID, InspectionType, ProcessID, OperationID;
    var SettingType = mf.systemID +  "020121300007B";
    var Narray = [{ value: "", text: "" }], Projectarry = [], ProjectData, DisadvantagesOne, DisadvantagesTwo, DisadvantagesThree;
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
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

   
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
            ItemID: row.ItemID,
            SettingType: SettingType,
            Code: row.Code,
            Name: row.Name,
            ProcessID: row.ProcessID,
            OperationID: row.OperationID,
            IsIP: true,
            IsFPI: false,
            IsOSI: false
        };

        window.parentUrl = URL;
        window.MID = MID;
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
            ItemID: row.ItemID,
            SettingType: SettingType,
            Code: row.Code,
            Name: row.Name,
            ProcessID: row.ProcessID,
            OperationID: row.OperationID,
            IsIP:false ,
            IsFPI: true,
            IsOSI: false

        };
        
        window.parentUrl = URL;
        window.MID = MID;
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
            tableID: "3",
            InspectionType: mf.systemID +  "0201213000081",
            ItemID: row.ItemID,
            SettingType: SettingType,
            Code: row.Code,
            Name: row.Name,
            ProcessID: row.ProcessID,
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
    var table = new mf.Table("#QCS00004Table", {
        uniqueId: "ItemID",
        editable: false,
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00004GetItemList',
                data: ({ Code: Code, page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        focusEditField: "Attribute",
        isFrozenColumn: true,
        operateColumWidth: "205px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:205px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="ProcessTest" style="width:61px;" onclick="model.ProcessTestClick(this)" title="' + fields.ProcessTest + '" >' + (fields.ProcessTest.length > 8 ? fields.ProcessTest.substring(0, 8) + "..." : fields.ProcessTest) + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="FirstTest" style="width:61px;"  onclick="model.FirstTestClick(this)" title="' + fields.FirstTest + '" >' + (fields.FirstTest.length > 8 ? fields.FirstTest.substring(0, 8) + "..." : fields.FirstTest) + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="ProcessPatrol" style="width:61px;"  onclick="model.ProcessPatrolClick(this)" title="' + fields.ProcessPatrol + '" >' + (fields.ProcessPatrol.length > 8 ? fields.ProcessPatrol.substring(0, 8) + "..." : fields.ProcessPatrol) + '</button>');
            return $td;
        },
        height: window.innerHeight - 144.6,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Type', title: fields.SupplyType, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Unit', title: fields.Unit, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.GoodsName, align: "center", width: "130",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.Specification, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "90",
                rander: new mf.StaticValueRander({ title: true }),
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
                        url: window.top.mf.domain + "/MES/api/ImportFile/Qcs00004ImportV2",
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


var arrayWord = [
    "ItemNo", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "ItemName", "SupplyType",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "Langwage", "Unit", "GoodsName", "Specification",
    "Remark", "ItemMasterFile", "Comfirm", "ProcessPatrol", "TestType", "ProcessTest", "FirstTest", "InspectionCategoryNo",
    "IsTest", "ProcessNo", "ProcessDescription", "EnableProcess", "WorkOrderNo", "WorkOrderDescription", "IsTest",
    "Sorting", "InspectionCategoryNo", "TestCategoryName", "InspectionMethod", "Disadvantages", "TestItemsNo", "TestItemsDec",
    "TestStandard", "InspectionLevel", "AQL", "MeasuredvalueSet", "ProductProcessFile", "FreeTest", "Fulfilled", "SortingIsNum",
    "SequenceIsNull", "Isleave", "Confirm", ""
];

words = arrayWord.join();

var model = null;
//var parameters = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};