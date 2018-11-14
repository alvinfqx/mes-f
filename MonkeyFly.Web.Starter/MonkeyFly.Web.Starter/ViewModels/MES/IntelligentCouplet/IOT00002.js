var URL = "/MES/IntelligentCouplet/IOT00002";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container")

var viewModel = function () {
    var self = this;
    var time;//定时器

    //5s刷新一次
    //this.setUpData = function () {
        
    //}

    //清除定时器
    this.stopUpData = function () {
        clearInterval(time)
    };

    //self.setUpData();

    time = setInterval(function () {
        $("#content-ct").html("");
        $("#statusBar").html("");
        self.CreateNode();
    }, 5000)

    //根据请求返回的数据数量创建格子的数量
    this.CreateNode = function () {
        //if (obj == "") {
        //    $("#content-ct").append("");
        //    alert(0);
        //}       
        var PlantCode = $("#SiteSearch").val();
        var PlantAreaCode = $("#PlantAreaSearch").val();
        mf.ajax({
            type: 'Get',
            async: false,
            url: "/MES/api/IntelligentCouplet/Iot00002GetList",
            data: ({ PlantCode: PlantCode, PlantAreaCode: PlantAreaCode }),
            success: function (data) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var color = data[i].SetColor;
                    var div = $('<div class="messageCt" ondblclick="model.OpenClick(this)" style="background:' + data[i].ColorName + '">');
                    div.append(
                                '<ul class="mesagge">' +
                                    '<li class="MachineID" style="display:none">' + data[i].EquipmentID + '</li>' +
                                    '<li class="MachineCode" title="' + data[i].Code + '">' + data[i].Code + '</li>' +
                                    '<li class="MachineName" title="' + data[i].Name + '">' + (data[i].Name.length > 10 ? data[i].Name.substring(0, 10) + "..." : data[i].Name) + '</li>' +
                                    '<li title="' + data[i].ConditionName + '">' + (data[i].ConditionName.length > 10 ? data[i].ConditionName.substring(0, 10) + "..." : data[i].ConditionName) + '</li>' +
                                '</ul>');
                    if (data[i].Path != null) {
                        div.append('<div class="equipmentImg" style="background-image:url(' + window.top.mf.domain + "/MES/" + data[i].Path + ')"></div>');
                    }
                    else {
                        div.append('<div class="equipmentImg" style="background-image:url(http://pic.58pic.com/58pic/13/82/40/32H58PICTuE_1024.jpg)"></div>');
                    }
                    $("#content-ct").append(div);

                }
            }
        });
        mf.ajax({
            type: 'Get',
            url: '/MES/api/EquipmentManagement/Ems00001GetConditionList',
            data: { page: 1, rows: 1000 },
            success: function (data) {
                var $div = $("<ul>");
                for (var i = 0; i < data.rows.length; i++) {
                    $div.append('<li><span style="background:' + data.rows[i].Description + '"></span>' +
                    '<p style="margin-left:3px;">' + data.rows[i].Name + '</p></li>');
                }
                $div.append("</ul>");
                $("#statusBar").append($div);
            }
        });
    }

    var h = $(window).height() - 112;
    $("#content-ct").css({ "height": h + "px", "overflow": "auto" }) //主界面高度，主要为了把状态栏至于底部，类似于页码栏

    self.CreateNode();

    //双击触发事件
    this.OpenClick = function (e) {
        //需要将机台编号带过去当成查询条件
        //理解为以机台编号作为参数发送一个ajax
        self.stopUpData();
        //$("#MonitorDialog").modal("show");
        var Code = $($(e).find(".MachineCode")).text();
        var Name = $($(e).find(".MachineName")).text();
        var EquipmentID = $($(e).find(".MachineID")).text();
        console.log(EquipmentID);
        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            Code: Code,
            Name: Name,
            EquipmentID: EquipmentID
        };
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentCouplet/IOT00002", Parameters: parameters });
        window.location.href = '/MES/IntelligentCouplet/IOT00003';
        //var Code = $($(e).find(".MachineCode")[0]).text() //取到点击格子的机台编号
    }

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    }

    //查询
    this.searchClick = function () {
        $("#content-ct").html("");
        $("#statusBar").html("");
        self.CreateNode();
    };

    this.clear = function (ID) {
        $(ID).val("");
    }

    /*   搜索栏
     *   厂别开窗--厂别信息
     */

    //开窗
    this.SiteClick = function () {
        //  self.stopUpData()
        SiteInforTable.loadData(null, null, 1);
        $("#SiteMesDialog").modal("show")
    };

    //表格
    var SiteInforTable = new mf.Table("#SiteInforTable", {
        uniqueId: "SiteID",
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionSiteInfor"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#SiteCodeSearch").val();
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentParameter/Inf00001getPlantList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data)
                }
            })

        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.SiteCode, align: "center", require: true, width: "100",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Name', title: fields.SiteDescription, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true }),
            }
        ]
    })

    //确认
    this.SiteInforComfirm = function () {
        var row = SiteInforTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return
        }
        $("#SiteSearch").val(row.Code);
        $("#SiteCodeSearch").val("");
        $("#SiteMesDialog").modal("hide")
    }

    //查询
    this.SiteCodeSearchClick = function () {
        SiteInforTable.loadData(null, null, 1);
    }

    /*  搜索栏
     *  厂区开窗--厂区信息
     */

    //开窗
    this.PlantAreaClick = function () {
        self.stopUpData()
        PlantInforTable.loadData();
        $("#PlantInforDialog").modal("show")
    };

    //表格
    var PlantInforTable = new mf.Table("#PlantInforTable", {
        uniqueId: "PlantAreaID",
        height: 200,
        paginationBar: new mf.PaginationBar("#paginagionPlantInfor"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#FactoryCodeSearch").val();
            mf.ajax({
                type: "get",
                url: "/MES/api/IntelligentParameter/Inf00001getPlantAreaList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data)
                }
            })

        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.FactoryCode, align: "center", require: true, width: "110",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'Name', title: fields.FactoryDescription, require: true, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true })
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.StaticValueRander({ title: true })
            },
        ]
    })

    //确认
    this.PlantInforComfirm = function () {
        var row = PlantInforTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return
        }
        $("#PlantAreaSearch").val(row.Code);
        $("#FactoryCodeSearch").val("");
        $("#PlantInforDialog").modal("hide");
    }

    //查询
    this.FactoryCodeSearchClick = function () {
        PlantInforTable.loadData(null, null, 1);
    }

    /* 机台即时监控
    */

    //查询
    this.EquCodeSearchClick = function () {
        var Code = $("#EquCodeSearch").val();
        $("#EquCodeSearch").val("");
        /*   mf.ajax({
               type: "get",
               async: false,
               url: "",
               data: "",
               success: function (data) {
                   self.getData(data)
               }
           })
           */
    }
};

var arrayWord = ["Site", "Factory", "SiteInfor", "Prompt", "PleaseSelectRecord", "SiteCode", "SiteDescription", "Remark", "Status",
"CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Close", "Comfirm", "FactoryCode", "FactoryDescription", "AttributedSite",
"SiteDescription", "PlantInformation", "Search", "MonitorWindow", "MachineNum", "Using", "Stop", "InMaintenance", "Maintenance", "MonitorAbnormal",
"Invalid", "Cancel"];
words = arrayWord.join();

var model = null
initPage = function () {
    model = new viewModel();
}