var URL = "/MES/EquipmentManagement/EMS00003";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container")
 
var parameters = null;



var viewModel = function () {
    var self = this;
    var Namearry = [];
    var Number,
    GroupParameterID,
    EquipmentCode,
    EquipmentName,
    //EquipmentID,
    EquipmentInspectionRecordID,// 带出右边列表需要传的参数
    IDForDetail,
    datas = 1, // 用来判断是否需要提示项目主档视窗有没有数据
    Attr = "",
    ClassID = "",
    TaskDispatchID = "";
    var DocumentAutoNumberID;
    var EquipmentFlag = false;//控制新增任务单号开窗
    var EquipmentID = "";
  

    //开始日期绑定
    $("#startDate").datetimepicker({
        language: 'zh-tw',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#startDate").datetimepicker("setEndDate", $("#endDate").val())
    });

    //结束日期绑定
    $("#endDate").datetimepicker({
        language: 'zh-tw',
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3,
    }).on("click", function () {
        $("#endDate").datetimepicker("setStartDate", $("#startDate").val())
    });


    $("#AddDate").datetimepicker({
        language: 'zh-tw',
        autoclose: true,
        todayBtn: true,
        minView: 3,
        format: "yyyy-mm-dd"
    });

    //新增保存
    this.AddRecordClick = function () {
        if (!$('#AddCode').val()) {
            msg.info(fields.info, fields.EquipmentCodeIsNull);
            return;
        }
        else if (!$('#AddDate').val()) {
            msg.info(fields.info, fields.DateIsNull);
            return;
        }
  
        var saveData = {
            Code: $("#AddInspectionNo").val(),//DocumentAutoNumberID,
            Date: $('#AddDate').val(),
            EquipmentID: EquipmentID,
            ClassID:ClassID,//$("#AddShift").val(),
            MESUserID: "",//记录人，直接从系统获取登陆帐号的姓名
            TaskID: TaskDispatchID,//$("#AddRC").val(),//任务单,扫码获取
           // ItemCode: $("#ProductCode").val(),
           // ItemName:$("#ProductName").val(),
            ItemID: $("#ItmeID").val(),//制品代号,依RC单带入数据
            Comments: "",//$("#ProductName").val()
            DocumentAutoNumberID: DocumentAutoNumberID
        };

      // console.log(saveData)

        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00003Add',
            data: JSON.stringify(saveData),
            success: function (data) {
            if (data.status == "200") {
                    msg.success(fields.info, data.msg, function () {
                        self.clearInput("#AddInspectionNo", "#AddCode");
                        self.clearInput("#AddEquipmentName", "#AddDate");
                        self.clearInput("#AddShift", "#AddUserName");
                        self.clearInput("#ProductCode", "#ProductName");
                        $('#AddDialog').modal("hide");
                        tableLeft.loadData();
                    });    
                } else {
                    msg.error(fields.info, data.msg);
                    $('#AddDialog').modal("hide");
                    tableLeft.loadData();
                } 
            }
        })

        self.clearInput("#AddInspectionNo", "#AddCode");
        self.clearInput("#AddEquipmentName", "#AddDate");
        self.clearInput("#AddShift", "#AddUserName");
        self.clearInput("#ProductCode", "#ProductName");
        self.clearInput("#AddRC", null);
    }

    //新增取消按钮
    this.clearAddValue = function () {
 
        EquipmentCode = null;
        EquipmentName = null;
        EquipmentID = null;
        self.clearInput("#AddInspectionNo", "#AddCode");
        self.clearInput("#AddEquipmentName", "#AddDate");
        self.clearInput("#AddShift", "#AddUserName");
        self.clearInput("#ProductCode", "#ProductName");
        self.clearInput("#AddRC", "#ItmeID");
    };


    // 设备代号弹窗列表
    var EquipmentCodeTable = new mf.Table("#CodeTable", {
        uniqueId: "EIProjectID",
        editable: false,
        height: 200,
        paginationBar:new mf.PaginationBar("#paginagionGetEquipment"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#EquCode").val();
            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/GetEquipmentList",
                data:({page:pagination.page,rows:pagination.rows,Code:Code}),
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        fn_onRowClick:function(data){

        },
        columns: [
             {
                 field: 'Code', title: fields.EquipmentCode, align: "center", width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, title: "title", maxLength: 20 }))

             },
             {
                 field: 'Name', title: fields.EquipmentName, align: "center", width: "100",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, title: "title", maxLength: 20 }))

             },

             {
                 field: 'ResourceCategoryName', title: fields.AssetClass, align: "center", width: "150",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, title: "title"}))

             },
             {
                 field: 'Comments', title: fields.Remark, align: "center",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, title: "title", maxLength: 20 }))

             },

        ]

    });

    
    
    //设备代号弹窗查询
    this.CodeSearch = function () {
        EquipmentCodeTable.loadData(null, null, 1);

    }

    //设备弹窗函数
    this.AddEquipmentCode = function () {
        mf.dialog("#getEquipmentCodeDialog", {
            viewModel: function () {
                EquipmentCodeTable.loadData();
                $("#equipmentCodeCommit").click(function () {
                    var row = EquipmentCodeTable.getSelectedData();
                    if (row) {
                        EquipmentCode = row.Code;
                        EquipmentName = row.Name;
                        EquipmentID = row.EquipmentID;
                        EquipmentFlag = true;
                        $("#AddCode").val(EquipmentCode);
                        $("#AddEquipmentName").val(EquipmentName);
                        $("#getEquipmentCodeDialog").modal("hide");
                        $("#EquCode").val("");
                    }
                })
            }
        })
    };
    
    // 设备弹窗取消按钮
    this.clearItemCode = function () {
        self.clearInput("#EquCode", null);
    }

    //班别弹窗部分记录表
    var AddShiftTable = new mf.Table("#AddShiftTable", {
        uniqueId: "ClassID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionShift"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            var Code = $("#AddShiftCode").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/GetSYSClassList",
                data: ({page:pagination.page,rows:pagination.rows,Code:Code}),
                success: function (data) {
                  //  console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
           {
               field: 'Code', title: fields.ShiftNo, align: "center", width: "140",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, title: "title", maxLength: 20 }))
           },
           {
               field: 'Name', title: fields.ShiftDescription, align: "center", width: "100",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 120 }))
           },
           {
               field: 'Comments', title: fields.Remark, align: "center", width: "100",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
           },
           {
               field: 'Status', title: fields.Status, align: "center", 
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
               
           }
        ]

    });

    // 班别弹窗函数
    this.AddShift = function () {

        mf.dialog("#AddShiftDialog", {
            viewModel: function () {
                AddShiftTable.loadData();
                $("#AddShiftComfirm").click(function () {
                    var row = AddShiftTable.getSelectedData();
                    if (row) {
                        ClassID = row.ClassID;
                        $("#AddShift").val(row.Code);
                        $("#AddShiftDialog").modal("hide");
                        $("#AddShiftCode").val("");
                    }
                })
                
            }
        }) 
    }

    // 班别弹窗部分查询
    this.AddShifIdSearch = function () {
        AddShiftTable.goForwordSafely(function () {
            AddShiftTable.loadData(null, null, 1);
        }, null);
    }

    // 班别弹窗取消按钮
    this.clearShift = function () {
        self.clearInput("#AddShiftCode",null)
    }

    // 任务单弹窗
    this.AddTaskNo = function () {
        if (!EquipmentID) {
            msg.info(fields.Prompt, fields.SelectEquipmentCodeFirst);
            return
        }
        $("#TaskNoDialog").modal("show")
        TaskNoTable.loadData()
    }

    //任务单列表
    var TaskNoTable = new mf.Table("#TaskNoTable", {
        uniqueId: "TaskNoID",
        height: 200,
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionTaskNo"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            searchData.EquipmentID = EquipmentID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Ems0003GetTaskDispatchList',
                data: searchData,
                success: function (data) {
                  //  console.log(data)
                    success(data)
                }

            })
        },
        fn_saveData: function () { },
        columns: [
            {
                field: "TaskNo", title: fields.TaskNo, align: "center", width: "180px",
                rander: new mf.StaticValueRander({title:true})
            },
            {
                field: "MoNo", title: fields.MoNo, align: "center", width: "140px",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "StatusDes", title: fields.Status, align: "center", width: "100px",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "ItemCode", title: fields.Part, align: "center", width: "100px",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: "WorkCenterName", title: fields.WorkCenter, align: "center",
                rander: new mf.StaticValueRander({ title: true })
            }
        ]

    })

    //确认
    this.TaskNoComfirm = function () {
        var row = TaskNoTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord)
            return
        };
        TaskDispatchID = row.TaskDispatchID;
        $("#AddRC").val(row.TaskNo)
        $("#ProductCode").val(row.ItemCode);
        $("#ProductName").val(row.ItemName);
        $("#ItmeID").val(row.ItemID);
        $("#TaskNoDialog").modal("hide");
        // console.log($("#ItmeID").val())
        //EquipmentID = "";
    }


    //设备巡检记录表（左边）
    var tableLeft = new mf.Table("#EMS00003TableLeft", {
        uniqueId: "ID",
        dblclick_editable:false,
        height: window.innerHeight -118,
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = $("#equipmentCode").val();
            searchData.StartDate = $("#startDate").val();
            searchData.EndDate = $("#endDate").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/EMS00003Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    
                    success(data);
                    tableRight.loadData()
                }
            });
        },
        fn_onRowClick: function (row) {
            
            EquipmentInspectionRecordID = row.EquipmentInspectionRecordID;

            // 全局变量，带出右边列表需要传的参数
            

            IDForDetail = row.EquipmentID;
            var Code = EquipmentInspectionRecordID;

            tableRight.loadData();
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            var EquipmentInspectionRecordIDs = rowData.EquipmentInspectionRecordID;
            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems0003Delete",
                data: JSON.stringify({ EquipmentInspectionRecordID: EquipmentInspectionRecordIDs }),
                success: function (data) {
                    success(data);
                }
            });
        },
        columns: [
            {
                field: 'Code', title: fields.InspectionNumber, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 })) 
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 120 }))
            },
            {
                field: 'EquipmentName', title: fields.EquipmentName, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, readonly: 'readonly', maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CodeIsNull)
                ],
            },
            {
                field: 'Date', title: fields.Date, align: "center", width: "90",
                rander: new mf.DateRander()
            },
            {
                field: 'ClassID', title: fields.Shift, align: "center", width: "90",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
                
            },
            {
                field: 'ClassName', title: fields.Shift, align: "center", width: "90",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title"}))

            },
            {
                field: 'Creator', title: fields.Recorder, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))

            },
            {
                field: 'TaskID', title: fields.TaskID, align: "center", width: "180",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            },
            {
                field: 'TaskNo', title: fields.TaskID, align: "center", width: "180",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            },
            {
                field: 'ItemCode', title: fields.ProductCode, align: 'center', width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            },
            {
                field: 'ItemName', title: fields.ProductName, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            }
        ]

    });

    tableLeft.loadData();

    // 刷新
    this.refreshClick = function () {
        tableRight.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        },function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    //查询
    this.searchClick = function () {
        tableRight.goForwordSafely(function () {
            tableLeft.loadData();
            //EquipmentInspectionRecordID = "";
            //tableRight.loadData();
        }, null);
        //tableRight.goForword(function () {
        //    tableLeft.loadData();
        //    tableRight.loadData();
        //    //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    //window.location.reload();
        //}, function () {
        //    //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        //    //window.location.reload();
        //    tableLeft.loadData();
        //    tableRight.loadData();
        //});

    };

    //保存
    this.saveClick = function () {
        if (!tableLeft)
            return;

        tableLeft.save(null, null, true);
    };

    // 新增
    this.addClick = function () {
        tableRight.goForword(function () {
            $('#AddDialog').modal("show");
            //获取单号
            mf.ajax({
                type: 'Get',
                async: false,
                url: "/MES/api/EquipmentManagement/Ems00003GetAutoNumber",
                data: {},
                success: function (data) {
                   // console.log(data)
                    Number = data.AutoNumber;
                    DocumentAutoNumberID = data.DocumentAutoNumberID;
                    $("#AddInspectionNo").val(data.AutoNumber);
                }
            });
        }, function () {
            $('#AddDialog').modal("show");
            //获取单号
            mf.ajax({
                type: 'Get',
                async: false,
                url: "/MES/api/EquipmentManagement/Ems00003GetAutoNumber",
                data: {},
                success: function (data) {
                   // console.log(data)
                    Number = data.AutoNumber;
                    DocumentAutoNumberID = data.DocumentAutoNumberID;
                    $("#AddInspectionNo").val(data.AutoNumber);
                }
            });
        });

        

    }

 
    // 删除
    this.deleteClick = function () {
        if (!tableLeft)
            return;
       // EquipmentInspectionRecordID = "";
     //   flag = true
      //  tableLeft.goForwordSafely(function () {
        tableLeft.deleteRow(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
        //   },null)
            tableRight.clean();
    };


    //明细表设备项目栏弹窗列表（項目主檔）
    var AddItemTable = new mf.Table("#AddItemTable", {
        uniqueId: "ProjectID",
        editable: false,
        operateColumWidth: "90px",
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionItem"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            searchData.EquipmentID = IDForDetail;
            searchData.Code = $("#AddProjectCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentProjectList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function () {

        },

        columns: [
            {
                field: 'ProjectCode', title: fields.ProjectCode, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))

            },
            {
                field: 'ProjectDescription', title: fields.ProjectDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 120 }))

            },
            {
                field: 'AttributeName', title: fields.Property, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            },
            {
                field: 'StandardValue', title: fields.StandardValue, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            },
            {
                field: 'MaxValue', title: fields.UpperLimit, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            },
            {
                field: 'MinValue', title: fields.LowerLimit, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 12, title: "title", maxLength: 20 }))
            }

        ]


    })


    //明细表项目栏弹窗搜索
    this.AddItemCodeSearch = function () {
        AddItemTable.goForwordSafely(function () {
            AddItemTable.loadData(null, null, 1);
        }, null);
    }

    //明细表项目栏弹窗取消按钮
    this.clearEquipmentCode = function () {
        self.clearInput("#AddProjectCode", null)
    }

    //明细表项目栏弹窗确认按钮
    this.ItemComfirmClick = function () {
        var row = AddItemTable.getSelectedData();
        
    }

    var flag = false;

    //明细表（右边表格）
    var tableRight = new mf.Table("#EMS00003TableRight", {
        uniqueId: "EIProjectID",
        height: window.innerHeight - 118,
        focusField: "Sequence",
        focusEditField: "Value",
       
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            searchData.EquipmentInspectionRecordID = EquipmentInspectionRecordID;
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetDetailListV1',
                data: searchData,
                success: function (data) {
                   // console.log(data)
                  //  console.log(data)
                /*    for (var i = 0; i < data.length; i++) {
                        var CreateTime = data[i].CreateTime.split("T")[0];
                        var ModifiedTime = data[i].ModifiedTime.split("T")[0];
                        data[i].CreateTime = CreateTime;
                        data[i].ModifiedTime = ModifiedTime;
                    }
                    */
                    success(data);
                   // flag = false;
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0; i < saveData.inserted.length; i++) {
                saveData.inserted[i].EquipmentProjectID = GroupParameterID;
                saveData.inserted[i].EquipmentInspectionRecordID = EquipmentInspectionRecordID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/EquipmentManagement/Ems00003DetailSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    
                    success(data);
                }
            });
        },
        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            var EIRDID = rowData.EIRDID;
            mf.ajax({
                type: "post",
                url: "/MES/api/EquipmentManagement/Ems0003DetailDelete",
                data: JSON.stringify({ EIRDID: EIRDID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
               
                field: 'Sequence', title: fields.Sorting, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 6, maxLength: 4, title: "title" })),
                checkers: [
                    new mf.IsOnlyNumberChecker(fields.SortingIsNum)
                ]

            },
            {
                field: 'ProjectCode', title: fields.EquipmentItem, align: "center", require: true, width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.FKRander("#AddItemDialog",
                                         "#AddItemComfirm",
                                         AddItemTable,
                                          new mf.TextRander({ size: 10, title: "title", readonly: "readonly", maxLength: 20 }),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                       })),
                fn_onEditingChange: function (table, $row, $cell, field, e) {

                    table.setEditingColumnValue($row, "ProjectCode", e.data.ProjectCode);
                    table.setEditingColumnValue($row, "ProjectName", e.data.ProjectDescription);
                    table.setEditingColumnValue($row, "ProjectID", e.data.ProjectID);
                    table.setEditingColumnValue($row, "StandardValue", e.data.StandardValue);
                    table.setEditingColumnValue($row, "MaxValue", e.data.MaxValue);
                    table.setEditingColumnValue($row, "MinValue", e.data.MinValue);
                    GroupParameterID = e.data.EquipmentProjectID;
                    //var Value = table.getEditingColumnValue($row, "Value");
                    //if (!(isNaN(MinValue)) && !(isNaN(MaxValue))) {
                    //    if (Value < e.data.MinValue || Value > e.data.MaxValue) {
                    //        $("#EMS00003TableRight #Value").css("color", "red");
                    //    }
                    //    else {
                    //        $("#EMS00003TableRight #Value").css("color", "black");
                    //    }
                    //}
                                  
                }
            },
            {
                field: 'ProjectID', title: "", visible: false,
                rander: new mf.TextRander({ size: 18,title: "title" }),
            },
           {
                field: 'EquipmentProjectID', title: "", visible: false,
                rander: new mf.TextRander({title: "title" }),
                //    new mf.DynamicValueRander(function () {
                //    return GroupParameterID;
                //})
            },
             {
                field: 'EquipmentInspectionRecordID', title: "", visible: false,
                rander: new mf.TextRander({ title: "title" }),
                //    new mf.DynamicValueRander(function () {
                //    return EquipmentInspectionRecordID;
                //})
            },
            {
                field: 'ProjectName', title: fields.ItemDirections, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, disabled:"disabled",title: "title" })),
            },
            {
                field: 'Value', title: fields.PresentValue, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 20, title: "title", color: "red" }, "IsRed"),
                //fn_onEditingChange: function (table, $row, $cell, field, e) {
                //    var MinValue = table.getEditingColumnValue($row, "MinValue");
                //    var MaxValue = table.getEditingColumnValue($row, "MaxValue");
                //    var Value = table.getEditingColumnValue($row, "Value");
                //    if (!(isNaN(MinValue)) && !(isNaN(MaxValue))) {
                //        if (Value > MinValue && Value < MaxValue) {
                //            $("#EMS00003TableRight #Value").css("color", "black");
                //        }
                //        else {
                //            $("#EMS00003TableRight #Value").css("color", "red");
                //        }
                //    }
                    
                //}
            },
            {
                field: 'StandardValue', title: fields.StandardValue, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, disabled: "disabled", maxLength: 30, title: "title" })),

            },
            {
                field: 'MaxValue', title: fields.UpperLimit, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, disabled: "disabled", title: "title" })),
            },
            {
                field: 'MinValue', title: fields.LowerLimit, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, disabled: "disabled", title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: 'center', width: "180",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" }),    
            },
            {
                field: 'Creator', title: fields.Builder, align: "center", width: "130",
                rander: new mf.StaticValueRander({ size: 9, disabled: "disabled", title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.DateOfCreation, align: "center", width: "140",readonly:true,
                rander: new mf.TextTimeRander({ size: 9, disabled: "disabled", title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastModifiedPerson, align: "center", width: "130",
                rander: new mf.StaticValueRander({ size: 9, disabled: "disabled", title: "title" }),
                
            },
            {
                field: 'ModifiedTime', title: fields.LastModifiedDate, align: "center",readonly:true,
                rander: new mf.TextTimeRander({ size: 9, disabled: "disabled", title: "title" }),
                
            }

        ],

        //现值条件限制
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            //  console.log($row.eq(0).find("input#Value").eq(0).css("maxLength","2!important")

            var reg1 = /\D+/g; //非数字
            var reg2 = /^$|^\d{1,12}(\.\d{1,6})?$/g; // 数字，包括小数
            var reg3 = /\d+/g; //数字

            function IsNunberbitsChecker(messageint, messagedec, message1,Lenint, Lendec, value) {
                var rateInt, rateDec, ratePoint;
                var rate = $.trim(value);

                if (reg1.test(value) && !reg2.test(value)) {
                    return message1;
                }
                if (rate != "") {
                    rateInt = rate.toString().split(".")[0].length;
                    ratePoint = rate.indexOf(".");
                    if (ratePoint > 0) {
                        rateDec = rate.toString().split(".")[1].length;
                    }
                    else {
                        rateDec = 0;
                    }
                    if (rateDec > Lendec) {
                        return messagedec;
                    }
                    if (rateInt > Lenint) {

                        return messageint;
                    }
                }
                return null;
            }

            function IsTextChecker(messagemis,message, length, value) {
                var len = value.length;
                if (reg3.test(value)) {
                    return messagemis
                }
                if (len > 20) {
                    return message
                }
                return null
            }

            var ReasonCode = tableRight.getEditingColumnValue($row, "Value");
            var Sequence = tableRight.getEditingColumnValue($row, "Sequence");
            var Project = tableRight.getEditingColumnValue($row, "ProjectCode");

            //检查排序是否为空
            if (!Sequence) {
                return fields.SequenceIsNull
            }
            // 检查设备项目是否为空
            if (!Project) {
                return fields.EquipmentItemIsNull
            }

            var searchData = {};
            searchData.EquipmentID = IDForDetail;
            searchData.Code = rowdata.ProjectCode;
            mf.ajax({
                type: 'Get',
                async: false,
                url: '/MES/api/PopUp/GetEquipmentProjectList',
                data: searchData,
                success: function (data) {
                    var datas = JSON.parse(JSON.stringify(data));
                    //console.log(datas)
                    if (datas.total == 0){ 
                        datas = "";
                        return
                    }
                        Attr = datas.rows[0].Attribute      
                }
            });

            var searchData1 = {};
            var data2 = true 
            searchData1.EquipmentInspectionRecordID = EquipmentInspectionRecordID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetDetailList',
                data: searchData1,
                success: function (data) {

                    if (data.length == 0) {
                        data2 = false
                        return
                    }
                }
            });

           // var N = Attr.indexOf("N");// 若是数字，则N>0
           // var S = Attr.indexOf("C");// 若是文字,则S>0

            if (Attr.substring(5,18) == "0201213000019") { //数字
                var data = IsNunberbitsChecker(fields.PrensentValueIsMaxInteger, fields.PrensentValueIsMaxDecimal, fields.OnlyNumber, 12, 6, ReasonCode)
                return data 
            }
            if (Attr.substring(5, 18) == "0201213000018") { // 非数字
                var text = IsTextChecker(fields.OnlyText, fields.PrensentValueIsMaxTest, 20, ReasonCode)
                return text
            }

            Attr = "";
        },

        
    });

   
    // 新增明细
    this.addDetailClick = function () {
        var row = tableLeft.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        tableRight.addRow();

    }

    //编辑明细
    this.editDetailClick = function () {
        var row = tableRight.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        tableRight.editRow();
    }

    // 删除明细
    this.deleteDetailClick = function () {
        if (!tableRight)
            return;
        tableRight.deleteRow();
    }

    // 保存明细
    this.saveDetailClick = function () {
        tableRight.save(null, null, true);


        /*  if (!tableRight)
              return;
          tableRight.save(null, null, true);
          */
    }

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }

    };


    /* fn_onRowClick: function (row) {
             //row 正行的数据
             点击事件
    },*/



}


var arrayWord = ["LastChangedBy", "LastChangedDate", "AQL", "EquipmentCode", "New", "Add", "Change", "Deletion", "Save",
"Cancel", "Export", "Import", "Search", "StartDate", "EndDate", "InspectionNumber", "EquipmentCode", "EquipmentDescription",
"Date", "Shift", "Recorder", "RCDocuments", "ProductCode", "ProductName", "ItemDirections", "EquipmentItem", "PresentValue",
"StandardValue", "UpperLimit", "LowerLimit", "DateOfCreation", "LastModifiedPerson", "LastModifiedDate", "Builder", "Remark",
"AddInspectionRecords", "EquipmentName", "ShiftNo", "Status", "ShiftDescription", "ShiftMasterFile", "Property", "Comfirm",
"EquipmentInspectionItem", "InspectionItem", "CalendarMaster", "Close", "Sorting", "SequenceNo", "ProjectInformation", "ProjectCode",
"ProjectDescription", "Years", "PropertyNumberIsEdit", "EquipmentCodeIsNull", "DocumentDateIsNull", "PleaseSelectRecord", "info",
"NoDataExport", "Prompt", "NoDataCanBeExported", "SequenceIsNull", "Browse", "PleaseSelectFile", "EquipmentItemIsNull", "SequenceOnlyNum",
"Prompt", "FinishQtyIsMaxInteger", "FinishQtyIsMaxDecimal", "FinishQtyIsNonNegativeNumber", "ProjectOnlyNum", "OnlyText","WhetherToDelete",
"PrensentValueIsMaxInteger", "PrensentValueIsMaxDecimal", "OnlyNumber", "PrensentValueIsMaxTest", "SortingIsNum", "ProjectIsNoDatas",
"EquipmentCodeIsNull", "NoDataCanBeExported", "TaskNo", "MoNo", "Part", "WorkCenter", "TaskID", "AssetClass", "DateIsNull", "PleaseSelectRecord",
"SelectEquipmentCodeFirst"
];
words = arrayWord.join();

var model = null
initPage = function () {
    model = new viewModel();
}