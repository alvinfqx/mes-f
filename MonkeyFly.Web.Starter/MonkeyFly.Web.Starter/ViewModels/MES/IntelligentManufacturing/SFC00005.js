var viewModel = function () {
    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //查询
    this.searchClick = function () {
        RCDPTable.goForwordSafely(function () {
            RCDPTable.loadData(null, null, 1);
        }, null);
    };

    //设备代号查询
    this.EquipmentCodeSearch = function () {
        SourceDetailTable.goForwordSafely(function () {
            SourceDetailTable.loadData(null, null, 1);
        }, null);
    };

    //资源明细弹窗
    this.SourceDetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = RCDPTable.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        RCDPTable.goForword(function () {
            SourceDetailTable.loadData();
            $('#SourceDetailDialog').modal("show");
        }, null, fields.Isleave);
    }

    //是否分派
    this.AssignmentClick = function () {
        msg.warning(fields.info, fields.IsAssignment,
            function () {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/EquipmentManagement/Ems00005Save',
                    data: JSON.stringify(saveData),
                    success: function (data) {
                        success(data);
                    }
                });
            }, null)
        RCDPTable.loadData();
    }

    //列印
    this.PrintClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = RCDPTable.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        var parameter = {parentUrl: URL,parentMID: MID};

        RCDPTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentManufacturing/SFC00005Print", Parameters: parameter });
            window.location.href = '/MES/IntelligentManufacturing/SFC00005Print';
        }, null, fields.Isleave);
    };

    //资源明细弹窗
    var SourceDetailTable = new mf.Table("#SourceDetailTable", {
        uniqueId: "ID",
        paginationBar: new mf.PaginationBar("#SourceDetailpaginagionBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#EquipmentCode").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData:function(){},
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.EquipmentCode, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'UserName', title: fields.EquipmentName, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'OrganizationCode', title: fields.Status, align: "center", width: "50",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'OrganizationName', title: fields.MainResource, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'OrganizationName', title: fields.SourceClass, align: "center",  width: "100",
                rander: new mf.StaticValueRander(),
            }
        ]
    });

    //RUNCARD发派处理
    var RCDPTable = new mf.Table("#RCDPTable", {
        uniqueId: "ID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

                searchData.a = $("#SWC").val();
                searchData.b = $("#EWC").val();
                searchData.c = $("#SON").val();
                searchData.d = $("#EON").val();
                searchData.e = $("IsAssignment").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00005GetList',
                data: ({page: pagination.page, rows: pagination.rows}),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData:function(){},
        isFrozenColumn: true,
        operateColumWidth: "200px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:200px;text-align:center;">');
            var $btn = $('<button id="SourceDetail" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.SourceDetailClick(this)">' + fields.SourceDetail + '</button>&nbsp;' +
                         '<button id="Print" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.PrintClick(this)">' + fields.Print + '</button>&nbsp;'+
                         '<button id="Assignment" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.AssignmentClick(this)">' + fields.Dispatch + '</button>&nbsp;');
            return $td.append($btn);
        },
        height: window.innerHeight - 180,
        LastWidth: "120",
        IsSetTableWidth: true,
        columns: [
           {
               field: 'Code', title: fields.IsAssignment, align: 'center', width: "80", 
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.MoNo, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.MoSeq, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.Version, align: "center", width: "50",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.ProcessSequence, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.ProcessNo, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.ProcessDescription, align: "center", width: "150",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.WorkOrderNo, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.WorkOrderDescription, align: "center", width: "150",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.WorkCenter, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.WorkCenterDescription, align: 'center', width: "150",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.Quantity, align: "center", width: "50",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.InoutMark, align: "center", width: "50",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "120",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.Remark, align: "center", width: "150",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.StartWorkDate, align: 'center', width: "150",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.FinishWorkDate, align: "center", width: "150",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.Status, align: "center", width: "80",
               rander: new mf.StaticValueRander({ title: true }),
           },
           {
               field: 'Code', title: fields.RCNo, align: "center",
               rander: new mf.StaticValueRander({ title: true }),
           }
        ]
    });
    RCDPTable.loadData();
}

var URL = "/MES/IntelligentManufacturing/SFC00005";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = ["RUNCARDDispatchProcessing", "StartWorkCenter", "EndWorkCenter", "StartOrderNumber", "EndOrderNumber", "IsDisplayed",
"SourceDetail", "EquipmentCode", "EquipmentName", "Status", "MainResource", "SourceClass", "MoNo", "MoSeq", "Version", "ProcessSequence",
"ProcessNo", "ProcessDescription", "WorkOrderNo", "WorkOrderDescription", "WorkCenter", "WorkCenterDescription", "Quantity", "InoutMark",
"DepartmentNoOrManufacturersNo", "Remark", "StartWorkDate", "FinishWorkDate", "Status", "IsAssignment", "RCNo", "yes", "no", "Dispatch",
"IsDisplayed", "Print","Search"];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};
