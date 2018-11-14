//var URL = "/MES/IntelligentManufacturing/SFC00006";
//var MID = window.top.page_parameters.GetParameters(URL);




var URL = "/MES/IntelligentManufacturing/SFC00006";

var MID = window.top.page_parameters.GetParameters(URL);

var typeData = [];


var viewModel = function () {
    var self = this;
    var parameters, parentNode, finishDatas,row;
    var AutoNumberID = "", DTSID = "";
    var TypeList = [];

    /*查询框部分 start*/

    // 获取搜索框的值
    var form = {
        //任务单号
        RCCode: ko.observable(),//单号查询框的值
        RCChange: function () { },     //单号查询值改变触发的函数                             

        WorkOrderNo: ko.observable(),//工单单号
        WorkCenter: ko.observable(),//工作中心
        ManufacturingProcess: ko.observable(),//制程
        Process: ko.observable(),//工序
        Shift: ko.observable(),//班别
        WorkStartDate: ko.observable(),//开工日期
        WorkEndDate: ko.observable(),//完工日期
 
        //状态
          Status: ko.observable(),
          StatusArray: ko.observableArray(),
      //   TaskArray: ko.observableArray(),
      //   WorkOrderArray: ko.observableArray(),
      //   WorkCenterArray:ko.observableArray(),
      //   ManufacturingProArray:ko.observableArray(),
      //   ProcessArray:ko.observableArray(),
      //   ShiftArray:ko.observableArray(),
        DocumentArr: ko.observableArray(),
        DocumentType: ko.observable(),
        TypeChange: function () {
            //for (var i = 0; i < TypeList.length; i++) {
            //    if($("#AdjustmentNoSelect").val() == )
            //}
            DTSID = $("#AdjustmentNoSelect").val()
            console.log(TypeList)
            mf.ajax({
                type: "get",
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetAutoNumber',
                async: false,
                data: { DTSID: $("#AdjustmentNoSelect").val(), date: $("#DocumentDate").val() },
                success: function (data) {
                    if (!data) {
                        msg.info(fields.Prompt, fields.FinishNoIsNull);
                        return
                    }
                    console.log(data)
                    $("#addFinishNo").val(data.AutoNumber);
                    AutoNumberID = data.AutoNumberID
                }
            })
        },
        DocumentDate: ko.observable(mf.format.Date(new Date())),
        DocumentDateChange: function () {
            mf.ajax({
                type: "get",
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetAutoNumber',
                async: false,
                data: { DTSID: $("#AdjustmentNoSelect").val(), date: $("#DocumentDate").val() },
                success: function (data) {
                    if (!data) {
                        msg.info(fields.Prompt, fields.FinishNoIsNull);
                        return
                    }
                    console.log(data)
                    $("#addFinishNo").val(data.AutoNumber);
                    AutoNumberID = data.AutoNumberID
                }
            })
        },

        //新增下一站
        nextSationValue:ko.observable(),
        nextSationArr:ko.observableArray()

    }

    ko.applyBindings(form)


    var statusArr = [
        { id: mf.systemID + "0201213000089", text: fields.AlreadyIN + "(IN)" },
        { id: mf.systemID + "0201213000088", text: fields.ReadyIN + "(OP)" },

        { id: mf.systemID + "020121300008A", text: fields.SP + "(SP)" },
        { id: mf.systemID + "020121300008B", text: fields.Out + "(CL)" },
        { id: mf.systemID + "020121300008C", text: fields.Invalid + "(CA)" },
        { id: "", text: "" }
    ]
    //状态数组
    form.StatusArray(statusArr)

    //格式化日期,boolean参数决定日期精确度，传false精确到日，true精确到秒
    this.formatDate = function (date,boolean) {
        var year = date.getFullYear()
        var m = date.getMonth() + 1;
        var month = m > 9 ? m : "0" + m;
        var d = date.getDate();
        var day = d > 9 ? d : "0" + d;
        var h = date.getHours()
        var hour = h > 9 ? h : "0" + h;
        var m = date.getMinutes();
        var minutes = m > 9 ? m : "0" + m;
        var s = date.getSeconds();
        var seconds = s > 9 ? s : "0" + s;

        if (!boolean) {
            return year + "-" + month + "-" + day
        } else {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        }  
    }

    //开始日期绑定
    $("#startDate").datetimepicker({
        language: language,
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView:3
    }).on("click", function () {
        $("#startDate").datetimepicker("setEndDate", $("#endDate").val())
    });

   // $('#startDate').val(self.formatDate(new Date(),false));

    //结束日期绑定
    $("#endDate").datetimepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView: 3
    }).on("click", function () {
        $("#endDate").datetimepicker("setStartDate", $("#startDate").val())
    });


   // $('#endDate').val(self.formatDate(new Date()));


    /*查询框部分 end*/

    //模态框弹出函数,参数（模态框ID，开窗表格，模态框确认按钮，要填写的输入框，根据返回值需要填写输入框的属性,隐藏的输入框的ID，该字段流水号）
    this.PopUp = function (Dialog, Table, comfirmNode, inputNode, requireData, hiddenNode,ID) {
        return (mf.dialog(Dialog, {
            viewModel: function () {
                Table.loadData();
                $(comfirmNode).click(function () {
                    var row = Table.getSelectedData();
                    if (!row) {
                        msg.info(fields.Prompt, fields.PleaseSelectRecord);
                        
                    } else {
                        $(Dialog).modal("hide");
                        $(inputNode).val(row[requireData])
                        $(hiddenNode).val(row[ID])
                    }
                })
            }
        }))
    }
/*
    //查询之任务卡号开窗
    this.RCSeClick = function () {
        self.PopUp("#RCDialog", RCTable, "#RCComfirm", "#RCNo", "Code");
    };

    //任务单号开窗表格（RC分派资料档）
    var RCTable = new mf.Table("#RCTable", {
        uniqueId: "RCID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionRC"),

        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
             {
                 field: 'Code', title: fields.MoNo, align: "center", require: false, width: "120",
                 rander: new mf.StaticValueRander({ title: true }),
             },
            {
                field: 'Code', title: fields.SequenceNo, require: false, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.Version, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.LotNo, require: false, align: "center", width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.ProcessSequence, require: false, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    })

    //查询之工单单号开窗
    this.WorkOrderSeClick = function () {
        self.PopUp("#WorkOrderNoDialog", WorkOrderNoTable, "#WorkOrderComfirm", "#WorkOrderNumber", "MoNo");

    };

    //工单单号开窗表格（工单资料档）
    var WorkOrderNoTable = new mf.Table("#WorkOrderNoTable", {
        uniqueId: "RCID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionWorkOrderNo"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00002FabricatedMotherList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) { },

        columns: [
            {
                field: 'MoNo', title: fields.WorkOrderNumber, align: "center", width: "130",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'SplitSequence', title: fields.SequenceNo, align: "center", width: "120",
                rander: new mf.StaticValueRander()

            },
            {
                field: 'Version', title: fields.Version, align: "center", width: "130",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'BatchNumber', title: fields.LotNo, align: "center", width: "120",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ItemCode', title: fields.ItemNo, align: "center",
                rander: new mf.StaticValueRander()

            }
        ]
    })
    */
    //查询之工作中心开窗
    this.WorkCenterSeClick = function () {
        self.PopUp("#WorkCenterDialog", WorkCenterTable, "#WorkCenterComfirm", "#WorkCenter", "Code", "#WorkCenterID", "WorkCenterID")
    };
    
    //工作中心表格
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "WorkCenterID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionWorkCenter"),
        fn_getData: function (pagination, searchData, success) {

            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetWorkCenterList',
                data: ({ page: pagination.page, rows: pagination.rows}),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) { },

        columns: [
            {
                field: 'Code', title: fields.WorkCenterNo, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: "title" })

            },
            {
                field: 'Name', title: fields.WorkCenterDescription, align: "center", require: true, width: "120",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 60 })

            },
            {
                field: 'DeptCode', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
          {
              field: 'DeptName', title: fields.DepartmentDesOrManufacturersDes, align: "center",
              rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
          }
        ]
    })

    //查询之制程开窗
    this.MftProcessSeClick = function () {
        self.PopUp("#ManufacturingProDialog", ManufacturingProTable, "#ManufacturingProComfirm", "#ManufacturingProcess", "Code", "#ManufacturingProcessID", "ParameterID")
    };

    //制程表格
    var ManufacturingProTable = new mf.Table("#ManufacturingProTable", {
        uniqueId: "ManufacturingProID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionManufacturingPro"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
                data: ({ typeID: "000017", page: pagination.page, rows: pagination.rows, Code: "" }),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) { },

        columns: [
            {
                field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
                rander: new mf.TextRander({ size: 9, title: "title", maxLength: 10 })
            },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "130",
                rander: new mf.WirteOnceOnlyRander(
                    new mf.TextRander({ size: 13, title: "title", maxLength: 30 }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ size: 19, title: true, maxLength: 120 })
            }
        ]
    })

    //查询之工序开窗
    this.ProcessSeClick = function () {
        self.PopUp("#ProcessDialog", ProcessTable, "#ProcessComfirm", "#Process", "Code", "#ProcessID", "ParameterID");
    };

    //工序表格（工序资料档）
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ProcessID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionProcess"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
                data: { typeID:"000016",page: pagination.page, rows: pagination.rows },
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) { },

        columns: [
            {
                field: 'Code', title: fields.Operation, align: "center", width: "120", 
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.OperationDesc, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    });

    //查询之班别开窗
    this.ShiftSeClick = function () {
        self.PopUp("#ShiftDialog", ShiftTable, "#ShiftComfirm", "#Shift", "Code", "#ShiftID", "ClassID")
    };

    //班别表格(班别资料档)
    var ShiftTable = new mf.Table("#ShiftTable", {
        uniqueId: "ShiftID",
        editable: false,
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionShift"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetSYSClassList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function (saveData, success) { },

        columns: [
            {
                field: 'Code', title: fields.ClassCode, align: "center", width: '120px', 
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'Name', title: fields.ClassDescription, width: '140px', align: "center",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: '140px',
                rander: new mf.StaticValueRander({ title: true }),
            },
        ]
    })

    //资源按钮
    this.ResourceClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }
        
        window.top.page_parameters.Caching.push({
            URL: "/MES/IntelligentManufacturing/SFC00006_Back",
            Parameters: row
        });

       var parameter = {
            parentUrl: URL,
            parentMID: MID,
            Parameters: parameters,
            rowData: row
        }; 
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Resource", Parameters: parameter });
        window.location.href = '/MES/IntelligentManufacturing/SFC00006Resource';
        
      /*  mf.dialog("#ResouceDialog", {
            viewModel: function () {
                ResourceTable.loadData();
                $("#AddItemComfirm").click(function () {
                    var row = ResourceTable.getSelectedData();
                    if (row) {
                        $("#ResouceDialog").modal("hide");
                    }
                })
            }
        })
        */
    };
/*
    //资源视窗表格
    var ResourceTable = new mf.Table("#ResouseTable", {
        uniqueId: "ResourceID",
        editable: false,
        height: 220,
        operateColumWidth: "70px",
        isFrozenColumn:true,
        paginationBar: new mf.PaginationBar("#paginagionResource"),
        
        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) { },
        fn_createBtn: function (data){
            var $td = $("<td style='text-align:center; width:70px;'> ");
            $td.append('<button id="Parameters" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ParametersClick(this)">' + fields.Parameters + '</button>')
            return $td
        },
        columns: [
            {
                field: 'Code', title: fields.SourceClass, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.CategoryName, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Code', title: fields.SourceCode, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.SourceDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.SourceDetailCode, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.SourceDetailDes, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.Quantity, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.Remark, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.Status, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: '', title: fields.MainResource, align: "center", width: "140",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    })

    //资源视窗之参数按钮
    this.ParametersClick = function () {
        mf.dialog("#ParametersDialog", {
            viewModel: function () {
                ParametersTable.loadData();;
                $("#ParametersComfirm").click(function () {
                    var row = ParametersTable.getSelectedData();
                    if (row) {
                        $("#ParametersDialog").modal("hide");
                    }
                })
            }
        })
    }

    //参数视窗(需要保存数据)
    var ParametersTable = new mf.Table("#ParametersTable", {
        uniqueId: "ParametersID",
        height: 220,
        paginationBar: new mf.PaginationBar("#paginagionParameters"),

        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.ParametersCode, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.ParametersDes, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.StandardValue, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.MaxValue, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.MinValue, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.Attributes, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.RecordValue, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, readonly: false, maxLength: "", title: "title" })
            },
            {
                field: 'Code', title: fields.RecordDes, align: "center", width: "140",
                rander: new mf.TextRander({ size: 14, readonly: false, maxLength: "", title: "title" })
            },
            {
                field: 'Code', title: fields.CreatedBy, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.CreatedDate, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.LastChangedBy, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.LastChangedDate, align: "center",width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
        ]
    })

    //参数视窗修改
    this.changeParametersClick = function () {
        var row = ParametersTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        ParametersTable.editRow();
    }

    //参数视窗保存
    this.saveParametersClick = function () {
        if (!ParametersTable)
            return;
        ParametersTable.save(null, null, true);
    }

    //参数视窗之关闭
    this.ClearParametersClick = function () {
        if (!ParametersTable)
            return;
        ParametersTable.goForword(function () {
            ParametersTable.loadData();
            $('#ParametersDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ParametersDialog').modal("hide");
        }, fields.Isleave);
    }
*/
    //用料按钮
    this.MaterialsClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);

        window.top.page_parameters.Caching.push({
            URL: "/MES/IntelligentManufacturing/SFC00006_Back",
            Parameters: row
        });
        var parameter = {
            parentUrl: URL,
            parentMID: MID,
            rowData: row
        };
        self.WorkStationTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Material", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00006Material';
        }, null, fields.Isleave);

    };

    //用料视窗表格
  /*
    //用料视窗表格
    var MaterialsTable = new mf.Table("#MaterialsTable", {
        uniqueId: "MaterialsID",
        editable: false,
        height: 220,
        operateColumWidth: "70px",
        paginationBar: new mf.PaginationBar("#paginagionMaterials"),

        fn_getData: function (pagination, searchData, success) {
            searchData = {};

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/EMS00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    success(data)
                }
            })
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.ItemSource, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))

            },
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: 'Code', title: fields.ItemDescription, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.ItemSpecification, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.EngineeringDrawing, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.Unit, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.BasicDosage, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.AttritionRate, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.UsageAmount, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
            {
                field: '', title: fields.Remark, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
            },
             {
                 field: '', title: fields.Builder, align: "center", width: "140",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, readonly: 'readonly', maxLength: "", title: "title" }))
             },
             {
                field: '', title: fields.DateOfCreation, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.HourRander())
             }
        ]
    })
 */




    //异常视窗按钮
    this.AbnormalClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);

        window.top.page_parameters.Caching.push({
            URL: "/MES/IntelligentManufacturing/SFC00006_Back",
            Parameters: row
        });
        var parameter = {
            parentUrl: URL,
            parentMID: MID,
            rowData: row
        };
        self.WorkStationTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Abnormal", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00006Abnormal';
        }, null, fields.Isleave);
        
    };


    //单据日期

    //开始日期绑定
    $("#DocumentDate").datetimepicker({
        language: 'zh-tw',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 3,
    })

    //完工按钮
    this.FinishClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);
        finishDatas = row;

        console.log(row)
        var Objs = {
            TaskDispatchID: row.TaskDispatchID
        }
        //mf.ajax({
        //    type: "get",
        //    url: '/MES/api/IntelligentManufacturing/Sfc00007GetByTaskDispatchID',
        //    async: false,
        //    data: { TaskDispatchID: row.TaskDispatchID },
        //    success: function (data) {
        //        if (data) {
        //            $("#AddDataComfirm").hide();
        //            $("#InvalidLaborHour").attr("disabled", "disabled");//无效人工工时
        //            $("#ValidLaborHour").attr("disabled","disabled");
        //            $("#ValidMachineHour").attr("disabled", "disabled");//有效机器工时
        //            $("#InvalidMachineHour").attr("disabled", "disabled");//无效机器工时
        //        } else {
        //            $("#AddDataComfirm").show();
        //        }
        //        $("#FinishDialog").modal("show");
        //        addFinishData()
        mf.ajax({
            type: "Get",
            url: "/MES/api/IntelligentManufacturing/Sfc00007GetBillTypeList",
            data: {},
            success: function (data) {
                TypeList = data;
                if (data) {
                        form.DocumentArr(data)
                       // $("#AddDataComfirm").hide();
                      //  $("#InvalidLaborHour").attr("disabled", "disabled");//无效人工工时
                       // $("#ValidLaborHour").attr("disabled","disabled");
                      //  $("#ValidMachineHour").attr("disabled", "disabled");//有效机器工时
                      //  $("#InvalidMachineHour").attr("disabled", "disabled");//无效机器工时
                    } else {
                        $("#AddDataComfirm").show();
                    }
                    $("#FinishDialog").modal("show");
                    addFinishData()             
            }
        });


        function addFinishData() {
            var num;
            console.log(finishDatas)
            mf.ajax({
                type: "get",
                url: '/MES/api/IntelligentManufacturing/Sfc00007GetAutoNumber',
                async: false,
                data: { DTSID: $("#AdjustmentNoSelect").val(), date: $("#DocumentDate").val() },
                success: function (data) {
                    if (!data) {
                        msg.info(fields.Prompt, fields.FinishNoIsNull);
                        return
                    }
                    
                    num = data
                    AutoNumberID = data.AutoNumberID
                    $("#addFinishNo").val(data.AutoNumber);
                    $("#FinishWorkDate").val(finishDatas.FinishDate.split("T")[0]);
                    $("#TaskNo").val(finishDatas.TaskNo);
                    $("#WorkOrderNum").val(finishDatas.MoNo);
                    $("#Part").val(finishDatas.ItemCode);
                    $("#ItemDescription").val(finishDatas.ItemName);
                    $("#ItemSpecification").val(finishDatas.Specification);
                    $("#ManufacturingUnit").val("");//制造单位
                    $("#AuxiliaryUnit").val("");// 辅助单位
                    $("#UnitRate").val("");//辅助单位比值
                    $("#FinProQtyAble").val("");//可完工量
                    $("#FinishQty").val(finishDatas.FinishQuantity);
                    $("#ScrappedQty").val(finishDatas.ScrapQuantity);
                    $("#DifferenceQty").val(finishDatas.DiffQuantity);
                    $("#ReworkQty").val(finishDatas.RepairQuantity);
                    $("#ValidLaborHour").val("00:00:00");//有效人工工时
                    $("#InvalidLaborHour").val("00:00:00");//无效人工工时
                    $("#ValidMachineHour").val("00:00:00");//有效机器工时
                    $("#InvalidMachineHour").val("00:00:00");//无效机器工时
                    $("#AddShift").val(finishDatas.ClassCodeName);
                    $("#Remark").val(finishDatas.Comments);
                    $("#FinishStatus").val(finishDatas.StatusDes);

                    
                }
            })
        }
     //   $("#Status").attr("title", $("#Status").val())
      //  $("#Remark").attr("title", $("#Remark").val())
        console.log(row.TaskDispatchID)
        mf.ajax({
            type: "get",
            url: "/MES/api/IntelligentManufacturing/Sfc00007GetNextList",
            data: { TaskDispatchID: row.TaskDispatchID },
            success: function (data) {
                console.log(data)
                form.nextSationArr(data);
            }
        })


    };


    // 完工确定
    this.AddFinishDataClick = function () {
        var isClose;


        function toJson(data) {
            return JSON.stringify(data)
        }
        var saveData = {

            CompletionNo: $("#addFinishNo").val(),
            Date: finishDatas.FinishDate,

            
            TaskDispatchID: finishDatas.TaskDispatchID,
            FinProQuantity: $("#FinishQty").val(),//完工量
            ScrappedQuantity: $("#ScrappedQty").val(),
            DifferenceQuantity: $("#DifferenceQty").val(),
            RepairQuantity: $("#ReworkQty").val(),

            LaborHour: $("#ValidLaborHour").val(),
            UnLaborHour:$("#InvalidLaborHour").val(),
            MachineHour: $("#ValidMachineHour").val(),
            UnMachineHour: $("#InvalidMachineHour").val(),
            AutoNumberID: AutoNumberID,
            DTSID: DTSID,
            NextID: form.nextSationValue()
           // AutoNumber: $("#addFinishNo").val()
/*
            FabricatedMotherID: finishDatas.FabricatedMotherID,
            FabMoProcessID: finishDatas.FabMoProcessID,
            FabMoOperationID: finishDatas.FabMoOperationID,
            ItemID: finishDatas.ItemID,
            ProcessID: finishDatas.ProcessID,
            OperationID: finishDatas.OperationID,
            NextProcessID: finishDatas.NextProcessCode,
            NextOPerationID: finishDatas.NextOPerationCode,
            InspectionQuantity: "",
            DTSID: "",
            Status: finishDatas.Status,
            Comments: $("#Remark").val(),
            ReasonID: "",
            Sequence: "",
            Type: "",
            OriginalCompletionOrderID: "",
            InspectionID: "",
            ClassID: "",
            NextFabMoProcessID: "",
            NextFabMoOperationID: "",
            IsIF: "",
            InspectionGroupID: "",
*/
        };
        console.log(saveData)
        if (!self.dataFormat(saveData.LaborHour)) {
            msg.info(fields.Prompt, fields.ValidEnterArtificial);
            return
        } else {
            saveData.LaborHour = self.dataFormat(saveData.LaborHour);
        }
        if (!self.dataFormat(saveData.UnLaborHour)) {
            msg.info(fields.Prompt, fields.InvalidEnterArtificial);
            return
        } else {
            saveData.UnLaborHour = self.dataFormat(saveData.UnLaborHour)
        }
        if (!self.dataFormat(saveData.MachineHour)) {
            msg.info(fields.Prompt, fields.ValidEnterMachine);
            return
        } else {
            saveData.MachineHour = self.dataFormat(saveData.MachineHour);
        }
        if (!self.dataFormat(saveData.UnMachineHour)) {
            msg.info(fields.Prompt, fields.InvalidEnterMachine);
            return
        } else {
            saveData.UnMachineHour = self.dataFormat(saveData.UnMachineHour)
        }

        console.log(saveData)

        mf.ajax({
            type: 'get',
            url: '/MES/api/IntelligentManufacturing/Sfc00006CheckCompletion',
            data: { TaskDispatchID:saveData.TaskDispatchID },
            success: function (data) {
                if (data) {
                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/IntelligentManufacturing/Sfc00006CompletionAdd',
                        async: false,
                        data: JSON.stringify(saveData),
                        success: function (data) {
                            if (data.status == "200") {
                                msg.info(fields.Prompt, data.msg);
                                $("#FinishDialog").modal("hide")

                            } else {
                                msg.info(fields.Prompt, data.msg);
                            }
                        }
                    })

                } else {
                    msg.info(fields.Prompt, fields.CheckCompletion);
                }
            }
        })

        
    }
    //清除数据
    this.clearAddValue = function () {
/*
        this.clearInput("#addFinishNo", "#FinishWorkDate")
        this.clearInput("#TaskNo", "#WorkOrderNum")
        this.clearInput("#Part", "#ItemDescription")
        this.clearInput("#ItemSpecification", "#ManufacturingUnit")
        this.clearInput("#AuxiliaryUnit", "#FinProQtyAble")
        this.clearInput("#FinishQty","#ScrappedQty")
        this.clearInput("#DifferenceQty","#ReworkQty")
        this.clearInput("#InvalidLaborHour","#ValidMachineHour")
        this.clearInput("#InvalidMachineHour","#Remark")
        this.clearInput("#Status", null)
*/
    }
    

    //查看输入日期格式是否正确
    this.dataFormat = function (data) {
        var date;
        var reg3 = /^\d{1,}:\d{2}:\d{2}$/

      
        if (!data || reg3.test(data)) {
            if (!data) {
                return data = " "
            }

            if (reg3.test(data)) {
                return data
            }
        } else {
            
            return false
        }
       

    }




    //工作站维护主列表
    this.WorkStationTable = new mf.Table("#WorkStationTable", {
        uniqueId: "ID",
        editable: false,
        operateColumWidth: "370px",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 182,
        isFrozenColumn: true,
        IsSetTableWidth: true,
        LastWidth: 140,
        

        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            searchData.TaskNo = form.RCCode()//$("#RCNo").val();
            searchData.MoNo = $("#WorkOrderNumber").val();
            //searchData.WorkcenterID = $("#WorkCenterID").val();
            searchData.WorkcenterCode = $("#WorkCenter").val();

            //searchData.ProcessID = $("#ManufacturingProcessID").val();
            searchData.ProcessCode = $("#ManufacturingProcess").val();
            //searchData.OperationID = $("#ProcessID").val();

            searchData.OperationCode = $("#Process").val();
            //searchData.ClassID = $("#ShiftID").val();
            searchData.ClassCode = $("#Shift").val();
            searchData.StartDate = $("#startDate").val();
            searchData.EndDate = $("#endDate").val();
            searchData.Status = $("#Status").val();
        
            if (searchData.StartDate && searchData.StartDate.length > 0) {
                searchData.StartDate = searchData.StartDate + "T" + "00:00:00"
            }
            if ( searchData.EndDate && searchData.EndDate.length > 0) {
                searchData.EndDate = searchData.EndDate + "T" + "00:00:00"
            }
            console.log(searchData)
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentManufacturing/Sfc00006GetListV2',
                data: searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
       
        },

        fn_saveData: function (saveData, success) {},
        fn_createBtn: function (data) {
            var N = data.Status.substring(5, data.Status.length)
            var $td = $("<td style='text-align:center; width:370px;'> ");
            if (N == "0201213000088" || N == "0201213000087") { //OP
                $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站">' + fields.IN + '</button>&nbsp;&nbsp;' +
                     '<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站" disabled="disabled">' + fields.Checks + '</button>&nbsp;&nbsp;' +
                     '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                     '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                     '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;' +
                     '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                     '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工" disabled="disabled">' + fields.Reports + '</button>');


              /*  $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站">' + fields.IN + '</button>&nbsp;&nbsp;' +
                           '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                           '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                           '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;'  +
                           '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;')*/
                return $td;
            } else if (N == "0201213000089") {//IN
                $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站" disabled="disabled">' + fields.IN + '</button>&nbsp;&nbsp;' +
                      '<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站">' + fields.Checks + '</button>&nbsp;&nbsp;' +
                      '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                      '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                      '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;' +
                      '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                      '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工">' + fields.Reports + '</button>');


              /*   $td.append('<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站">' + fields.Out + '</button>&nbsp;&nbsp;' +
                           '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;'+
                           '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                           '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;'  +
                           '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                           '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工">' + fields.Finished + '</button>');*/
                return $td;
            } else if (N == "020121300008A") {//sp

                $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站">' + fields.IN + '</button>&nbsp;&nbsp;' +
                      '<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站">' + fields.Checks + '</button>&nbsp;&nbsp;' +
                      '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                      '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                      '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;' +
                      '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                      '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工">' + fields.Reports + '</button>');

              /*  $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站">' + fields.IN + '</button>&nbsp;&nbsp;' +
                           '<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站">' + fields.Out + '</button>&nbsp;&nbsp;' + '</button>' +
                           '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                           '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                           '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;' +
                           '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                           '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工">' + fields.Finished + '</button>');
               */
               return $td;
            } else if (N == "020121300008B") {//CL
                $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站" disabled="disabled">' + fields.IN + '</button>&nbsp;&nbsp;' +
                      '<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站" disabled="disabled">' + fields.Checks + '</button>&nbsp;&nbsp;' +
                      '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                      '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                      '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;' +
                      '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                      '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工" disabled="disabled">' + fields.Reports + '</button>');


              /*  $td.append( '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;'  +
                             '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;'  +
                             '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常">' + fields.Abnormal + '</button>&nbsp;&nbsp;'   +
                             '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' )
              */
              return $td
            } else if (N == "020121300008C") {//作废
                $td.append('<button id="enterClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.EnterClick(this)" title="进站" disabled="disabled">' + fields.IN + '</button>&nbsp;&nbsp;' +
                      '<button id="outClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.GoOutClick(this)" title="出站" disabled="disabled">' + fields.Checks + '</button>&nbsp;&nbsp;' +
                      '<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                      '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                      '<button id="AbnormalClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.AbnormalClick(this)" title="异常" disabled="disabled">' + fields.Abnormal + '</button>&nbsp;&nbsp;' +
                      '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;' +
                      '<button id="FinishClick" class="btn btn-success btn-xs" onclick="model.FinishClick(this)" title="完工" disabled="disabled">' + fields.Reports + '</button>');

              /*  $td.append('<button id="ResourceClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.ResourceClick(this)" title="资源">' + fields.Resources + '</button>&nbsp;&nbsp;' +
                             '<button id="materialClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.MaterialsClick(this)" title="用料">' + fields.Materials + '</button>&nbsp;&nbsp;' +
                             '<button id="PrintClick" class="btn btn-success btn-xs" style="margin-right: 3px" onclick="model.PrintClick(this)" title="列印">' + fields.Print + '</button>&nbsp;&nbsp;')
               */
               return $td
            } 
            

        },
        columns: [
            {
                field: 'TaskNo', title: fields.TaskCardNo, align: "center", require: false, width: "220",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'MoNo', title: fields.WorkOrderNumber, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemCode', title: fields.Part, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ItemName', title: fields.ItemDescription, align: "center", require: false, width: "120",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'AssignQty', title: fields.QuantityDispatch, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'FinishQuantity', title: fields.FinProQty, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'ScrapQuantity', title: fields.ScrappedQty, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'DiffQuantity', title: fields.DifferenceQty, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'RepairQuantity', title: fields.ReworkQty, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'StartDate', title: fields.WorkStartDate, align: "center", require: false, width: "150",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'FinishDate', title: fields.WorkEndDate, align: "center", require: false, width: "150",
                rander: new mf.TextTimeDateRander(),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Next', title: fields.NextStop, align: "center", require: false,width: "160", 
                rander: new mf.StaticValueRander({ title: true}),
            },
            {
                field: 'StatusDes', title: fields.Status, align: "center", require: false, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'InMESUser', title: fields.Pilots, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'InDateTime', title: fields.PitStop, align: "center", width: "140",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'OutMESUser', title: fields.Outbound, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: "title" }),

            },
            {
                field: 'OutDateTime', title: fields.OutboundTime, align: "center",
                rander: new mf.TextTimeRander({ title: "title" }),
            }
        ]
    })
    

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    // 导出
    this.exportClick = function () {
        self.WorkStationTable.loadDataBack(null, function () {

            var $trLength = $("#WorkStationTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Sfc00006Export?Token=' + encodeURIComponent(token);

            var TaskNo = $("#RCNo").val();
            var MoNo = $("#WorkOrderNumber").val();
            var WorkcenterID = $("#WorkCenter").val();
            var ProcessID = $("#ManufacturingProcess").val();
            var OperationID = $("#Process").val();
            var ClassID = $("#Shift").val();
            var StartDate = $("#startDate").val();
            var EndDate = $("#endDate").val();
            var Status = $("#Status").val();
 

            if (TaskNo && TaskNo.length > 0) {
                exportUrl = exportUrl + '&TaskNo=' + TaskNo;
            };
            if (MoNo && MoNo.length > 0) {
                exportUrl = exportUrl + '&MoNo=' + MoNo;
            };
            if (WorkcenterID && WorkcenterID.length > 0) {
                exportUrl = exportUrl + '&WorkCenterName=' + WorkcenterID;
            };
            if (ProcessID && ProcessID.length > 0) {
                exportUrl = exportUrl + '&ProcessName=' + ProcessID;
            };
            if (OperationID && OperationID.length > 0) {
                exportUrl = exportUrl + '&OperationName=' + OperationID;
            };
            if (ClassID && ClassID.length > 0) {
                exportUrl = exportUrl + '&ClassID=' + ClassID;
            };
            if (StartDate && StartDate.length > 0) {
                exportUrl = exportUrl + '&StartDate=' + StartDate;
            };
            if (EndDate && EndDate.length > 0) {
                exportUrl = exportUrl + '&FinishDate=' + EndDate;
            };
            if (Status && Status.length > 0) {
                exportUrl = exportUrl + '&StatusDes=' + Status;
            };

            window.location.href = exportUrl;
        });
    };



    //查询
    this.searchClick = function () {

        self.WorkStationTable.loadData(null, null, 1);
        //self.clearInput("#RCNo", "#WorkOrderNumber");
        //self.clearInput("#WorkCenter", "#ManufacturingProcess");
        //self.clearInput("#WorkCenterID", "#ManufacturingProcessID");
        //self.clearInput("#Process", "#Shift");
        //self.clearInput("#ProcessID", "#ShiftID");
        //self.clearInput("#startDate", "#endDate");
        //self.clearInput("#Status", null);
    };

    //列印
    this.PrintClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);


        var parameter = {
            parentUrl: URL,
            parentMID: MID,
            rowData: row
        };
        self.WorkStationTable.goForword(function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentManufacturing/SFC00006_Back",
                Parameters: row
            });
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00006Print", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00006Print';
        }, null, fields.Isleave);

    };

    //进站
    this.EnterClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);
        var date = self.getDate();
        parentNode = obj.parentNode;
        // $(e).arrt("disabled", "disabled")

        var saveData = {};
        saveData.TaskDispatchID = row.TaskDispatchID;
        mf.ajax({
            type: 'POST',
            url: '/MES/api/IntelligentManufacturing/Sfc00006ArrivalV1',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data)
                if (data.status == "200") {
                    msg.infoCall(fields.Prompt, data.msg, function () {
                        self.WorkStationTable.loadData();
                    });
                    
                } else {
                    msg.info(fields.Prompt, data.msg);
                }
                
            }
        })


    };

    //出站
    this.GoOutClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = self.WorkStationTable.getRowData($tr);

        var saveData = {};
        saveData.TaskDispatchID = row.TaskDispatchID;

        mf.ajax({
            type: 'post',
            url: '/MES/api/IntelligentManufacturing/Sfc00006OutboundV1',
            data: JSON.stringify(saveData),
            success: function (data) {
                
                if (data.status == "200") {
                  
                    msg.infoCall(fields.Prompt, data.msg, function () {
                      
                        self.WorkStationTable.loadData();
                    });
                    
                } else {
  
                    msg.info(fields.Prompt, data.msg);
                }
                
            }
        })


    };
 
    //格式化日期
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //获取系统日期
    this.getDate = function () {
        var date = new Date().Format("yyyy-MM-dd hh:mm:ss");
        return date
    }


    //清除输入框的值函数
    this.clearInput = function (node1, node2) {
        $(node1).val("");
        if (node2) {
            $(node2).val("");
        }
    };

    //返回时，查询数据
    this.BackSearch = function (rowData) {
        // console.log(rowData)
    
        form.RCCode(rowData.TaskNo);
        $("#Status").val("");
        self.searchClick();
     

    };
};


var arrayWord = ["RCNo", "WorkOrderNumber", "WorkCenter", "ManufacturingProcess", "Process","AuxiliaryUnit",
"Shift", "WorkStartDate", "WorkEndDate", "Status","Part","ItemDescription","ItemSpecification","FinProQtyAbleU",
"QuantityDispatch", "FinProQty", "ScrappedQty", "DifferenceQty", "ReworkQty", "NextStop","FinishWindow",
"Button", "Resources", "Materials", "Abnormal", "Print", "Finished", "IN", "Out",  "LotsProperty",
"pleaseSelectRecord", "Invalid", "ReadyIN", "AlreadyIN", "SP", "ResourceWindow", "New", "Change","InvalidWorkHour",
"Deletion", "Comfirm", "Close", "SourceClass", "CategoryName", "SourceCode", "SourceDescription","AberrantAmount",
"SourceDetailCode", "SourceDetailDes", "Quantity", "MainResource", "Save", "Parameters", "ResourceMasterFile",
"ParametersWindow", "ParametersCode", "ParametersDes", "StandardValue", "MaxValue", "MinValue", "Attributes",
"RecordValue", "RecordDes", "CreatedBy", "CreatedDate", "LastChangedDate", "LastChangedBy", "MaterialsWindow",
"ItemSource", "ItemDescription", "ItemSpecification", "EngineeringDrawing", "Unit", "BasicDosage", "AttritionRate",
"UsageAmount", "Remark", "Builder", "DateOfCreation", "LastModifiedPerson", "LastModifiedDate", "ItemNo", "Change",
"Save", "PleaseSelectRecord", "ReasonCo", "Description", "TimeOfOccurrence", "EndTime", "SourceClass",
"EquipmentCode", "EquipmentDescription", "RCStatus", "AbnormalWindow", "ReasonDescription", "ToLift", "FinProQtyAble",
"ScrappedQty", "LaborHour", "InvalidLaborHour", "nullMachineHour", "MachineHour", "FinQuantity", "NextProcess",
"ReasonGroupCode", "ReasonGroupCode", "SourceClassNumber", "SourceClassDescription", "SourceClass", "SourceDetail",
"PleaseSelectRecord", "Prompt", "TaskNo", "MoNo", "SequenceNo", "Version", "LotNo", "ProcessSequence", "WorkCenterNo",
"WorkCenterDescription", "InoutMark", "CalendarNo", "DepartmentNoOrManufacturersNo", "TaskAssignmentDoc", "WorkOrderDoc",
"WorkCenterDoc", "MakeProcessDoc", "ProcessDoc", "ShiftDoc", "ProcessNo", "ProcessDescription", "OperationSequence",
"Operation", "OperationDesc", "Remark", "ClassCode", "ClassDescription", "SourceClassDoc", "EquipmentCodeIsNull",
"ReasonCoIsNull", "TaskDoc", "FinishNo", "TaskNo", "NullMachineHour", "WorkCenterDescription", "MoSeq", "OrderNum", "SequenceNo",
"Version", "LotNo", "ItemNo", "DepartmentDesOrManufacturersDes", "ScrappedQty", "DifferenceQty", "ReworkQty", "AbNoReason",
"Class", "ExceptionDescription", "ArtificialL", "Machine", "GetNo", "Property", "EffectDate", "BatchAttribute", "CategoryCode",
"CategoryDec", "RunningNo", "CurrentNumber", "LotsAutoNumberingMainTable", "Datavalue", "QuantityIsNonNegativeNumber",
"QuantityIsMaxInteger", "QuantityIsMaxDecimal", "QuantityIsNonNegativeNumber", "ResourceType", "ReasonCode", "Search", "WhetherToDelete",
"TaskCardNo", "NoDataCanBeExported", "WorkCenterNo", "AddFinishData", "FinishWorkDate", "WorkOrderNum", "ManufacturingUnit", "UnitRate",
"FinishQty", "ValidMachineHour", "InvalidMachineHour", "Cancel", "FinishNoIsNull", "HaveFinish","ValidLaborHour", "ValidEnterArtificial",
"InvalidEnterArtificial", "ValidEnterMachine", "InvalidEnterMachine", "AddIsFalse", "DocumentDate", "AdjustmentNoSelect",
"Check", "Report", "Pilots", "PitStop", "Outbound", "OutboundTime", "CheckCompletion", "Reports", "Checks"];

words = arrayWord.join();


mf.toolBar("#container");
var model = null;
//初始页面数据
initPage = function () {

    model = new viewModel();

    var rowData = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00006_Back");
     console.log(rowData);
    if (rowData) {
        model.BackSearch(rowData);
    }
    model.WorkStationTable.loadData()
};
     