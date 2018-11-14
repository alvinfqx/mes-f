var URL = "/MES/IntelligentManufacturing/SFC00006Abnormal";

var parameters = window.top.page_parameters.GetParameters(URL);



var viewModel = function () {
    var self = this;
    var rowData = parameters.rowData,
        GroupParameterID,
        ResourceParameterID = "",
        ParameterCodeID,
        ClassID,
        FlagID = null,
        NowDate = mf.format.Time(new Date());

    $("#TackNo").val(rowData.TaskNo);
    $("#WorkOrderNumber").val(rowData.MoNo);
    $("#WorkCenter").val(rowData.WorkCenterCode);
    $("#Part").val(rowData.ItemCode);
    $("#ItemDescription").val(rowData.ItemName);
    $("#ItemSpecification").val(rowData.Specification);
    $("#DispatchAmount").val(rowData.AssignQty);



    //返回
    this.AbnormalBackClick = function () {
        if (!AbnormalTable)
            return;
        AbnormalTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, function () {
            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
            window.location.href = parameters.parentUrl;
        }, fields.Isleave);

    };

    //刷新
    this.AbnormalRefreshClick = function () {
        AbnormalTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Abnormal", Parameters: parameters });
            window.location.href = "/MES/IntelligentManufacturing/SFC00006Abnormal";
        }, function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Abnormal", Parameters: parameters });
            window.location.href = "/MES/IntelligentManufacturing/SFC00006Abnormal";
        }, fields.Isleave)
        

    }



    //异常视窗之原因码开窗表格（原因码群组）
    var reasonCodeTable = new mf.Table("#reasonCodeTable", {
        uniqueId: 'reasonID',
        editable: false,
        height: 240,
        operateColumWidth: "90px",
        paginationBar: new mf.PaginationBar("#paginagionReasonCode"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "SFC" }),
                success: function (data) {
                    console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
            {
                field: 'Code', title: fields.ReasonNo, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'GroupName', title: fields.GroupDescription, align: "center", width: "160",
                rander: new mf.StaticValueRander({ title: true }),
            },

        ]
    });

    //原因码开窗之确认按钮
    this.reasonCodeComfirm = function () { }



    //异常视窗之资源类别开窗表格（资源类别主档）
    var AbResouceTable = new mf.Table("#AbResouceTable", {
        uniqueId: "ResourceTypeID",
        height: 240,
        operateColumWidth: "140px",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResourceDoc"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            var Code = $("#SearchTackNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/SfcGetResourceClassList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {

                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.SourceClassNumber, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true })),
            },
            {
                field: 'Name', title: fields.SourceClassDescription, require: true, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center",
                rander: new mf.DateRander({ title: true }),
            },
        ]
    })

    //资源类别弹窗之确认按钮
    this.AbResouceComfirm = function () { };

    //查询
    this.AbSearchClick = function () {
        AbResouceTable.loadData(null, null, 1)
    }

    var AbnormalDetailID = ""; //异常流水号
    //异常视窗之设备代号开窗表格
    var AbResouceCodeTable = new mf.Table("#AbResouceCodeTable", {
        uniqueId: "ResourceCodeID",
        height: 240,
        operateColumWidth: "140px",
        paginationBar: new mf.PaginationBar("#paginagionDetail"),
        fn_getData: function (pagination, searchData, success) {

            searchData = {};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
           // if (!ResourceParameterID) {
           //     ResourceParameterID = ""
           // }
            searchData.ClassID = ResourceParameterID;
            searchData.TaskDispatchID = rowData.TaskDispatchID;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/SfcGetResourceByClass',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) { },
        fn_onRowCick: function (data) {
           // AbnormalDetailID = data.AbnormalDetailID
        },

        columns: [
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "120", require: true,
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Condition', title: fields.MechanicalCondition, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'IfMain', title: fields.MainResource, align: "center", width: "100",
                rander: new mf.SelectRander([{ value: true, text: fields.yes }, { value: false, text: fields.no }]),
            },
            {
                field: 'ClassCode', title: fields.ResourceType, align: "center",
                rander: new mf.TextRander({ size: 14, disabled: "disabled", title: "title" })
            },
        ]
    })

    //异常视窗之资源代号开窗确认
    this.AbResoucCodeComfirm = function () { };




    var ClickFlag = false; //控制按了暂停之后才能按解除
    var disableFlag = true;
    //异常视窗表格
    var AbnormalTable = new mf.Table("#AbnormalTable", {
        uniqueId: "AbnormalDetailID",
        height: window.innerHeight - 180,
        operateColumWidth: "90px",
        isFrozenColumn: true,
        LastWidth: "160",
        IsSetTableWidth:true,
        paginationBar: new mf.PaginationBar("#AbnormalPageBar"),
        fn_checkeditable: function ($row) {
            var StatusStop = $row.find("#StatusStop");
           // var StatusStop = $row.find("#StatusRemove").attr("disabled");
            if (StatusStop.attr("disabled")) {
                //console.log(111)
                setTimeout(function () {
                    $("#ReasonDesc").parent().parent().find("#StatusStop").attr({"disabled":"disabled"})
                    //$row.find("#StatusStop").attr({ "disabled": "disabled" })
                }, 100)
            }
                
                
            
            
        },
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.TaskDispatchID = rowData.TaskDispatchID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00006GetExceptionList',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentManufacturing/Sfc00006SaveException',
                    data: JSON.stringify(saveData),
                    success: function (data) {

                        success(data);
   
                    }
                });
        },
        fn_onRowClick: function (data) {
            AbnormalDetailID = data.AbnormalDetailID;
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentManufacturing/Sfc00006ExceptionDelete",
                data: JSON.stringify({ AbnormalDetailID: rowData.AbnormalDetailID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:90px;'> ");
            
            if (rowData.Status.substring(5, rowData.Status.length) == "020121300008A" && disableFlag) {
                ClickFlag = true;
                $td.append('<button id="StatusStop" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.StatusStopClick(this)" disabled="disabled">' + fields.SP + '</button>' +
                        '<button id="StatusRemove" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.StatusRemoveClick(this)">' + fields.ToLift + '</button>')
                return $td
            } else{
                $td.append('<button id="StatusStop" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.StatusStopClick(this)">' + fields.SP + '</button>' +
                        '<button id="StatusRemove" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.StatusRemoveClick(this)">' + fields.ToLift + '</button>')
                return $td
            }          
        },
        columns: [
            {
                field: 'AbnormalDetailID', title: fields.ReasonDescription, align: "center", width: "140", visible: false,
                rander: new mf.TextRander({ disabled: "disabled", title: 'title' })
            },
            {
                field: 'ReasonCode', title: fields.ReasonCo, align: "center", require: true, width: "160",
                rander: new mf.FKRander("#reasonCodeDialog",
                                         "#resonCodeComfirm",
                                         reasonCodeTable,
                                          new mf.TextRander(
                                           {
                                               size: 11, readonly: 'readonly', title: "title"
                                           }
                                       ),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ReasonCode", e.data.Code);
                    table.setEditingColumnValue($row, "ReasonDesc", e.data.Name);
                    GroupParameterID = e.data.ParameterID;
                },
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ReasonCoIsNull)
                ],
            },
            //流水号
            {
                field: 'ReasonID', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return GroupParameterID;
                })
            },
            {
                field: 'ReasonDesc', title: fields.ReasonDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, disabled:"disabled", title: 'title' }))
            },
            {
                field: 'StartTime', title: fields.TimeOfOccurrence, align: "center", width: "140",
                rander: new mf.TimeRander({ autoclose: true }),
                defaultValue: NowDate,
                
            },
            {
                field: 'EndTime', title: fields.EndTime, align: "center", width: "140",
                rander: new mf.TimeRander({ autoclose: true })
            },
            {
                field: 'ResourceCategory', title: fields.SourceClass, align: "center", width: "160",
                rander: new mf.FKRander("#AbResouceDialog",
                                         "#AbResouceComfirm",
                                         AbResouceTable,
                                          new mf.TextRander(
                                           {
                                               size: 10, readonly: 'readonly', maxLength: "", title: "title"
                                           }
                                       ),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                           searchID: [{ value: "#SearchTackNo", text: "" }]
                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ResourceCategory", e.data.Name);
                    ResourceParameterID = e.data.ParameterID;
                }
            },
            //流水号
            {
                field: 'ResourceCategoryID', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ResourceParameterID;
                })
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "160",
                rander: new mf.FKRander("#AbResouceCodeDialog",
                                         "#AbResouceCodeComfirm",
                                         AbResouceCodeTable,
                                          new mf.TextRander(
                                           {
                                               size: 10, readonly: 'readonly', title: "title"
                                           }
                                       ),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                       }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "EquipmentCode", e.data.EquipmentCode);
                    table.setEditingColumnValue($row, "EquipmentName", e.data.EquipmentName);
                    ParameterCodeID = e.data.EquipmentID;
                },
            },
            //流水号
            {
                field: 'EquipmentID', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ParameterCodeID;
                })
            },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, disabled:"disabled", maxLength: 120, title: 'title' }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ size: 20, readOnly: false, maxLength: "120", title: 'title' })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: 'title' })
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "160",
                rander: new mf.TextTimeRander({ title: true})
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: 'title' })
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",readonly:"readonly",
                rander: new mf.TextTimeRander({ title: true})
            },
        
            {
                field: 'FabMoProcessID', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return rowData.FabMoProcessID;
                })
            },
            {
                field: 'FabMoOperationID', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return rowData.FabMoOperationID;
                })
            },
        
            {
                field: 'TaskDispatchID', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return rowData.TaskDispatchID;
                })
            },
            
            {
                field: 'Status', title: "", align: "center", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return rowData.Status;
                })
            }
            
        ]
    })

    AbnormalTable.loadData();

    // 添加
    this.addClick = function () {
        
        if (!AbnormalTable)
            return;
        console.log(NowDate)
        AbnormalTable.addRow();
    }
    // 编辑
    this.editClick = function () {
        if (!AbnormalTable)
            return;

        AbnormalTable.editRow();
    };
    // 删除
    this.deleteClick = function () {
        if (!AbnormalTable)
            return;

        AbnormalTable.deleteRow();
    };

    //保存
    this.saveClick = function () {
        if (!AbnormalTable)
            return;

        AbnormalTable.save(null, null, true);
    };

    //异常视窗之保存
    this.AbSaveNewClick = function () {
        if (!AbnormalTable) return;
        AbnormalTable.save(null,null,true)
    };

    
   // $("#StatusRemove").attr({ "disabled": "disabled" });
    //暂停
    this.StatusStopClick = function (node) {
        var ParentNode = $("#AbnormalContent #StatusStop");
        var $tr = $(node).parent().parent();
        var row = AbnormalTable.getRowData($tr);
       // console.log(row.AbnormalDetailID)
        var saveData = {};

        saveData.TaskDispatchID = rowData.TaskDispatchID
        saveData.AbnormalDetailID = row.AbnormalDetailID
        console.log(saveData)
        mf.ajax({
            type: 'post',
            url: '/MES/api/IntelligentManufacturing/Sfc00006ExceptionStop',
            data: JSON.stringify(saveData),
            success: function (data) {
                $(node).attr({ "disabled": "disabled" });
                $(node).parent().find("#StatusRemove").removeAttr("disabled");
                ClickFlag = true;
            }
        })
    };

    //解除
    this.StatusRemoveClick = function (node) {
        
        if (!ClickFlag) {

           // $(node).attr({ "disabled": "disabled" });
            return;
        } 
        var $tr = $(node).parent().parent();
        var row = AbnormalTable.getRowData($tr);
        var ParentNode = $("#AbnormalContent #StatusStop");
        var nowTime = mf.format.Time(new Date());
        console.log(row)
        if ($tr.hasClass("editingRow")) {
            $tr.find("#EndTime").val(mf.format.Time(new Date()))
        } else {
          //  $($tr.children()[6]).children()[0].innerText = nowTime
        }
        
        var saveData = {};
        saveData.TaskDispatchID = rowData.TaskDispatchID;
        saveData.AbnormalDetailID = row.AbnormalDetailID;
        console.log(saveData)

        mf.ajax({
            type: 'post',
            url: '/MES/api/IntelligentManufacturing/Sfc00006ExceptionRelieve',
            data: JSON.stringify(saveData),
            success: function (data) {
          
                $(node).parent().find("#StatusStop").removeAttr("disabled");
                //if (ClickFlag) {
                //    $(node).attr({ "disabled": "disabled" });
                //}
                $(node).removeAttr("disabled");
                disableFlag = false;//当按了解除之后，loadData的时候创建的按钮就不在试disabled状态
                AbnormalTable.loadData()
            }
        })
    };


}



var arrayWord = [
"Refresh", "Add", "Change", "Save", "ItemNo", "WorkCenter", "Refresh", "Deletion", "Back", "EquipmentCode", "EquipmentName", "MechanicalCondition", "MainResource", "EngineeringDrawing",
"ResourceType", "Part", "ItemDescription", "ItemSpecification", "DispatchAmount", "TaskCardNo", "WorkOrderNumber", "SP", "ToLift", "ReasonCo", "Description", "TimeOfOccurrence", "EndTime", "SourceClass",
"EquipmentCode", "EquipmentDescription", "RCStatus", "AbnormalWindow", "ReasonDescription", "ToLift", "FinProQtyAble", "Status","Comfirm","Close","Description",
"ScrappedQty", "LaborHour", "InvalidLaborHour", "nullMachineHour", "MachineHour", "FinQuantity", "NextProcess","Remark","SourceClassDoc","ReasonNo","GroupDescription",
"ReasonGroupCode", "ReasonGroupCode", "SourceClassNumber", "SourceClassDescription", "SourceClass", "SourceDetail", "ReasonGroupCode", "ReasonDescription",
"PleaseSelectRecord", "Prompt", "TaskNo", "MoNo", "SequenceNo", "LastChangedDate", "LastChangedBy", "CreatedDate", "CreatedBy", "Normal", "Invalid", "SourceCode",
"SourceCount", "SourceDescription", "yes", "no", "Search", "ReasonCoIsNull", "SourceClassDescriptionIsNull", "EquipmentCodeIsNull", "Isleave", "Isleave", "Cancel"

];


words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};