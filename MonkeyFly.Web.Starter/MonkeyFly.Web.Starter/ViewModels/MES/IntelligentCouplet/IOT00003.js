var oData = {};
var data1 = {
    total: 0,
    rows: []
}

var data2 = {
    datasets: [{
        label: '現值',
        data: [
        ],
        backgroundColor: [
            'rgba(255, 255, 255, 0)',
        ],
        borderColor: [
            'rgba(255,99,132,1)',
        ],
        borderWidth: 1
    }, {
        label: '上限值',
        data: [],
        borderWidth: 1,
        backgroundColor: [
            'rgba(255, 255, 255, 0)',
        ],
        borderColor: ['rgba(0,0,255,1)'],
    }, {
        label:  '下限值',
        data: [],
        borderWidth: 1,
        backgroundColor: [
            'rgba(255, 255, 255, 0)',
        ],
        borderColor: ['rgba(0,255,0,1)'],
    }]
}
var parameters = null;
var Namearry = [];
var viewModel = function () {
    var self = this;
    var table = null;

    var EquipmentID = '';

    //查询
    this.searchClick = function () {
        //model.SearchCode('#EquipmentCode');
        LoadSensor(EquipmentID);
    };
    // 刷新
    this.refreshClick = function () {
    
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
        var d = new Date();
        //填入时间
   
        var date = d.getFullYear() + "-"
                    + formatDate((d.getMonth() + 1)) + "-"
                    + formatDate(d.getDate()) + " "
                    + formatDate(d.getHours()) + ":"
                    + formatDate(d.getMinutes()) + ":"
                    + formatDate(d.getSeconds());

        $("#myMeasureTime").text(date);
        setTimeout(function () {
            $("#listView").removeClass("k-widget");
        }, 100);

    };

    //设置厂商表格
    var EquipmentTable = new mf.Table("#EquipmentTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionEquipmentBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/Iot00003GetEquipmentV1',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    //console.log("厂商：" + JSON.stringify(data))
                    ExportTotal = data.total;
                    success(data);
                   
                }
            });
            var time = getDateYMDHMS();
            $("#myMeasureTime").text(time);
            $("#pager").removeClass("hide");
            $(".time").removeClass("hide");
            $(".time").addClass("fixP");
            $("#pager").addClass("pageFix");               
        },
        fn_saveData: function (saveData, success) {

        },
        focusField: "Code",
        height: 400,
        LastWidth: "120",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.Equipment, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentName, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'ResourceCategoryCode', title: fields.ResourceType, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'ConditionName', title: fields.MechanicalCondition, align: "center",
                rander: new mf.TextRander({title: true})

            }
        ]
    });



    // 設備主檔查詢
    this.CodeSearch = function () {
        //EquipmentTable.goForwordSafely(function () {
        EquipmentTable.loadData();
        //}, null);
    };

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

    this.loadEqu = function (EquID) {
        
        mf.ajax({
            type: "Get",
            url: "/MES/api/IntelligentCouplet/Iot00003GetEquipmentListV1",
            data: ({ EquipmentID: EquID }),
            success: function (data) {
                console.log(data)
                if (parseInt(data.total) > 0)//
                {
                    console.log(1)
                    $("#Usage").val(data.rows[0].ConditionName);
                    $("#AreaDesc").val(data.rows[0].PlantName);
                    $("#PlantDesc").val(data.rows[0].PlantAreaName);
                    if (data.rows[0].Path)
                        $("#EquipmentImgUrl").attr("src", window.top.mf.domain + "/MES/" + data.rows[0].Path);
                    else {
                        $("#EquipmentImgUrl").attr("src", "about:blank;");
                    }
                    $("#UsageColor").css("background-color", data.rows[0].Description);
                
                    if (timer) clearTimeout(timer);// 已經在跑的先停掉
                    LoadSensor(data.rows[0].EquipmentID);// 啟動定時器
                }
                $("#EquipmentDialog").modal("hide");
            }
        });
    }

   
    // 開啟廠商彈窗
    this.SearchCode = function (id) {
       

        EquipmentID = "";
        $("#EquipmentCommit").unbind();
        $("#EquipmentCommit").click(function () {
            $("#Usage").val("");
            $("#AreaDesc").val("");
            $("#PlantDesc").val("");
            $("#EquipmentImgUrl").attr("src", "about:blank;");
            $("#UsageColor").css("background-color", "#fff");

            var row = EquipmentTable.getSelectedData();
            if (row) {
                $(id).val(row.Code);
                $("#EquipmentDescription").val(row.Name);
                EquipmentID = row.EquipmentID;
                //model.getSensor(EquipmentID);
                $("#EquipmentID").text(row.EquipmentID);
            }           
            model.loadEqu(EquipmentID);
      
        });
        EquipmentTable.loadData();
        $("#EquipmentDialog").modal({ backdrop: 'static', keyboard: false });
        $("#EquipmentDialog").modal("show");
        setTimeout(function () {
            $("#pb_btn_firstPage").click();
        }, 10);      
    }

    var timer = null;// 定時器，可用於停止
    // 定時讀取感知器
    var LoadSensor = function (EID) {
        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentCouplet/Iot00003GetDaqValue',
            data: ({ EquipmentID: EID || EquipmentID }),
            success: function (data) {
                //ExportTotal = data.total;
               data1.rows = data;
                //console.log("感知器"+JSON.stringify(data))
                // todo:要放在ajax success裡
               makeDaq();
                timer = window.setTimeout(LoadSensor, 10000);// 10秒一次
               setTimeout(function () {
                   $("#listView").removeClass("k-widget");
               }, 20);
         
            }
        });  
    }

    function makeDaq() {
        var d = new Date();
        //填入时间

        var date = d.getFullYear() + "-" + formatDate((d.getMonth() + 1)) +
                "-" + formatDate(d.getDate()) + " " + formatDate(d.getHours()) + ":" + formatDate(d.getMinutes()) + ":" + formatDate(d.getSeconds());



        $("#myMeasureTime").text(date);

        var dataSource = new kendo.data.DataSource({
            data: data1.rows,
            pageSize: 8
        });
        $("#pager").kendoPager({
            dataSource: dataSource
        });

        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html()),
            dataBound: function () {
                // 完成後有上下限值的做gauge
                $(data1.rows).each(function () {
                    if (this.MaxValue != null && this.MinValue != null) {
                //绑定sensor
                        $("#gauge_" + this.Sensor).kendoLinearGauge({

                            pointer: {
                                value: this.Measurement,
                                shape: "BARINDICATOR",
                                color: "#ffff00"
                            },
                            gaugeArea: {
                                height: 60,
                                width: 380
                            },
                            scale: {

                                min: this.MinValue,
                                max: this.MaxValue,
                                vertical: false,
                                ranges: [
                                    {
                                        from: this.MaxAlarmValue,
                                        to: this.MinAlarmValue,
                                        color: "#ff0000"

                                    }
                                ]
                            }
                        });
                    }
                });
                // 完成後做語系
                $('#listView [data-meaning]').each(function (i, elem) {
                    var $elem = $(elem);
                    for (var key in fields) {
                        if ($elem.attr('data-meaning') == key) {
                            if ($elem[0].tagName == "INPUT") {
                                if ($elem[0].type == "text") {
                                    $elem.attr('placeholder', fields[key]);
                                }
                                else {
                                    $elem.val(fields[key]);
                                }
                            }
                            else {
                                $elem.text(fields[key]);
                            }
                        }
                    }
                });
            }
        });
    }

    // 開啟趨勢圖
    this.showChart = function (Sensor) {
       
        mf.ajax({
            type: "Get",
            url: "/MES/api/IntelligentCouplet/Iot00003GetMeasurementQST",
            data: ({ Token: token, EquipmentID: EquipmentID, Sensor: Sensor }),
            success: function (data) {
                //拼接数据 x: 横轴 , y : 纵轴
                for (var i = 0, len = data.data.length; i < len; i++) {
                    if (data.data[i]) {
                        data.data[i].x = data.data[i].x.replace("T", " ").substring(0, 19).replace("-", "/").replace("-", "/");
                        data2.datasets[0].data.push({ x: data.data[i].x, y: data.data[i].y });
                        data2.datasets[1].data.push({ x: data.data[i].x, y: data.Value[0].MaxValue });
                        data2.datasets[2].data.push({ x: data.data[i].x, y: data.Value[0].MinValue });
                    }
                   
                 }

                $("#ChartDialog").modal("show");
                $("#ChartDialog").modal({ backdrop: 'static', keyboard: false });
          
                var ctx = $("#myChart");
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: data2,
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                format: "HH:mm",         
                                displayFormats: {
                                    'minute': 'HH:mm',
                                    'hour': 'HH:mm',
                                    
                                },
                                time: {
                                    unit: 'minute'
                                }
                            }]
                        }
                    }
                });
            }
        });
       
    }
    //工作中心表格
    var WorkCenterTable = new mf.Table("#WorkCenterTable", {
        uniqueId: "WorkCenterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionWorkCenterBar"),
        operateColumWidth: "70px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:70px;'> ");
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentCouplet/Iot00003CheckCenterProcess",
                data: { WorkCenterID: data.WorkCenterID },
                success: function (data) {
                    if (data) {
                        // 是否有製程關系
                        // 8.该操作按钮，当该工作中心有制程关系时才显示出来，当工作中心没有制程关系时不显示
                        $td.append('<button class="btn btn-success btn-xs" onclick="model.ProcessClick(this)" title="製程關系" >' + fields.ProcessRelating + '</button>');

                    }
                }
            })
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#EquipmentCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentCouplet/Iot00003GetCenter',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, EquipmentID: EquipmentID }),
                success: function (data) {
                    ExportTotal = data.total;
                    //console.log("工作中心" + JSON.stringify(data))
                    success(data);
                }
            });

        },
        fn_saveData: function (saveData, success) {

        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {

            return null;
        },
        focusField: "WorkCenterNo",
        focusEditField: "WorkCenterNo",
        height: 400,
        columns: [
            {
                field: 'CenterCode', title: fields.WorkCenterNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'CenterName', title: fields.WorkCenterDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'DepartmentCode', title: fields.DepartmentNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'DepartmentName', title: fields.DepartmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            }
        ]
    });
    //製程關係表格
    var ProcessTable = new mf.Table("#ProcessTable", {
        uniqueId: "ProcessID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionProcessBar"),
        fn_getData: function (pagination, searchData, success) {
            var row = WorkCenterTable.getRowData($Row);
            var Code = row.WorkCenterID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentCouplet/Iot00003GetCenterProcess',
                data: ({ page: pagination.page, rows: pagination.rows, WorkCenterID: Code }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
         
        },
        fn_saveData: function (saveData, success) {

        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {

            return null;
        },
        focusField: "ProcessNo",
        focusEditField: "ProcessNo",
        height: 400,
        columns: [
            {//工作中心与制程映射流水号
                field: "WorkCenterProcessID", visible: false,
                rander: new mf.TextRander({})
            },
            {//制程流水号
                field: "ProcessID", visible: false,
                rander: new mf.TextRander({})
            },
            {
                field: 'Code', title: fields.ProcessNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'Name', title: fields.ProcessDescription, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            }
        ]
    });
    //製令工單表格
    var WorkOrderTable = new mf.Table("#WorkOrderTable", {
        uniqueId: "WorkOrderID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionWorkOrderBar"),
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentCouplet/Iot00003GetMomProcess',
                data: ({ page: pagination.page, rows: pagination.rows, EquipmentID: EquipmentID}),
                success: function (data) {
                    //console.log("製令工單"+JSON.stringify(data))
                    //if (data.Status != 200) {
                    //    msg.info(fields.Prompt, data.msg);
                    //    return;
                    //}

                    var len = data.length;
                    //for (var i = 0; i < len; i++) {
                    //    data[i].StartDate = data[i].StartDate.substring(0, 10);
                    //    data[i].FinishDate = data[i].FinishDate.substring(0, 10);
                    //}

                    var d = { "total": len, "rows": data }
                    ExportTotal = len;
                    success(d);
                }
            });
     
        },
        fn_saveData: function (saveData, success) {

        },
        focusField: "Code",
        focusEditField: "Status",
        height: 400,
        columns: [
            {
                field: 'ItemCode', title: fields.Part, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'MoNo', title: fields.MoNo, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'SplitSequence', title: fields.WorkOrderSeq, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'ProcessSequence', title: fields.ProcessSequence, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'CenterCode', title: fields.WorkCenterNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'CenterName', title: fields.WorkCenterDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'OperationSequence', title: fields.OperationSequence, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'OperationCode', title: fields.Operation, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'OperationName', title: fields.WorkOrderDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'StartDate', title: fields.WorkStartDate, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.HourRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'FinishDate', title: fields.WorkEndDate, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.HourRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000004, { title: true })
            }
        ]
    });
    //DAQ事件按钮
    var DAQEventTable = new mf.Table("#DAQEventTable", {
        uniqueId: "DAQEventID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDAQEventBar"),
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#EquipmentCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentCouplet/Iot00003GetDaqEvent',
                data: ({ page: pagination.page, rows: pagination.rows, EquipmentID: EquipmentID }),
                success: function (data) {
                   
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
        },
        focusField: "Code",
        focusEditField: "Status",
        height: 400,
        columns: [
            {
                field: 'MeasureTime', title: fields.MeasureTime, align: "center", require: true, width: "100",
                rander: new mf.TextTimeRander(),

            },
            {
                field: 'EventID', title: fields.DAQEventCode, require: true, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'EventDesc', title: fields.DAQEventDesc, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'DeviceDesc', title: fields.DAQDeviceDesc, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            }
        ]
    });
    // 開啟工作中心
    this.WorkCenter = function () {
        if ($("#EquipmentID").text() == "") {
            msg.info(fields.info, fields.EquipmentIsNull);
            return;
        }

        EquipmentID = $("#EquipmentID").text();

        WorkCenterTable.loadData();
        $("#WorkCenterDialog").modal("show");
        $("#WorkCenterDialog").modal({ backdrop: 'static', keyboard: false });


    }
    // 開啟製令工單
    this.WorkOrder = function () {
        if ($("#EquipmentID").text() == "") {
            msg.info(fields.info, fields.EquipmentIsNull);
            return;
        }

        EquipmentID = $("#EquipmentID").text();
        WorkOrderTable.loadData();
        $("#WorkOrderDialog").modal("show");
        $("#WorkOrderDialog").modal({ backdrop: 'static', keyboard: false });
       

    }
    // 開啟DAQ事件
    this.DAQEvent = function () {
        if ($("#EquipmentID").text() == "") {
            msg.info(fields.info, fields.EquipmentIsNull);
            return;
        }
        DAQEventTable.loadData();
        $("#DAQEventDialog").modal("show");
        $("#DAQEventDialog").modal({ backdrop: 'static', keyboard: false });
 

    }

    // 返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: Parameters.parentUrl, Parameters: Parameters.parentMID });
        window.location.href = Parameters.parentUrl;
    }

    // 開啟製程關係
    this.ProcessClick = function (obj) {


        $Row = $(obj).closest("tr");
        var row = WorkCenterTable.getRowData($Row);
        if (row) {
            $("#WorkCenterCode").val(row.CenterCode);
            $("#WorkCenterDesc").val(row.CenterName);
        }
        ProcessTable.loadData();
        $("#ProcessDialog").modal("show");
        $("#ProcessDialog").modal({ backdrop: 'static', keyboard: false });
    }
    // 關畢製程關係時清除
    this.clearProcess = function () {
        $("#WorkCenterCode").text("");
        $("#WorkCenterDesc").text("");
    }

    //打印
    this.printClick = function () {

    }

    //年-月-日  时：分：秒
    var getDateYMDHMS = function () {
        var d = new Date();
        //填入时间
   
        var date = d.getFullYear() + "-" + formatDate((d.getMonth() + 1)) +
                "-" + formatDate(d.getDate()) + " " + formatDate(d.getHours()) + ":" + formatDate(d.getMinutes()) + ":" + formatDate(d.getSeconds());
        return date;
    }
    //有些时间是7:1分这种，补全为 07:01
    var formatDate = function (date) {
        return date >= 10 ? date : "0" + date;
    }

    
    //iot02跳转过来后执行
    if (Parameters && Parameters.EquipmentID) {
        this.loadEqu(Parameters.EquipmentID);
        $("#EquipmentID").text(Parameters.EquipmentID);
        EquipmentTable.loadData();
    }
}

var URL = "/MES/IntelligentCouplet/IOT00003";
var MID = window.top.page_parameters.GetMID(URL);
//新增 iot02 传值
var Parameters = window.top.page_parameters.GetParameters("/MES/IntelligentCouplet/IOT00002");
console.log(Parameters)


    if (Parameters != undefined) {
        $("#bbtn_back").css("display", "inline-block");
        //$("#bbtn_refresh").css("display", "inline-block");
        //$("#bbtn_search").css("display", "inline-block");
        $("#EquipmentCode").val(Parameters.Code);
        $("#EquipmentDescription").val(Parameters.Name);
       // model.loadEqu(Parameters.EquipmentID)
    }



mf.toolBar('#container');

var arrayWord = [
    "Equipment", "EquipmentName", "ResourceType", "MechanicalCondition", "EquipmentInformation", "EquipmentCode", "EquipmentMasterFile",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "Site", "Factory", "Usage", "SourceClass", "TrendChart",
    "WorkCenter", "WorkOrder2", "DAQEvent", "WorkCenterNo", "WorkCenterDescription", "DepartmentNo", "DepartmentDescription",
    "ProcessRelating", "DAQDeviceDesc", "DAQEventDesc", "DAQEventCode", "WorkOrderNo", "WorkOrderSeq", "ProcessSequence",
    "ProcessNo", "ProcessDescription", "OperationSequence", "Operation", "MoNo", "WorkStartDate", "WorkEndDate", "MeasureTime",
    "Comfirm", "Remark", "Part", "EquipmentIsNull", "SensorNo", "SensorDescription", "PresentValue", "OperationDescription", "WorkOrderDescription", "EquipmentDescription", ""
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {


    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000055,0191213000004" },// 機況， 狀態
        success: function (data) {
            parameters = data;
            var Listdata = data.PT0191213000055;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
            model = new viewModel();
                       
        }
    });
    var h = $(window).height() - 368;
    //console.log(h + "offsetH:");

    $("#viewList").css("height", h + "px");
};