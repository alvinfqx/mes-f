var viewModel = function () {
    var self = this;
    var ReasonID;
    var defaultSearchValue = {};

    function colorRandom() {
        var a, b, c;
        var a = parseInt(Math.random() * 256).toString(16);
        var b = parseInt(Math.random() * 256).toString(16);
        var c = parseInt(Math.random() * 128 + 64).toString(16);
        colorStr = '#' + a + b + c;
        return colorStr;
    };

    //时间控件
    $("#StartCallFixDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        language: language,
        todayBtn: "linked"
    });
    //时间控件
    $("#EndCallFixDate").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        language: language,
        todayBtn: "linked"
    });
    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData();
        }, null);
    };
    // 刷新
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
    // 圖餅圖
    this.pieChartClick = function () {
        var data2;
        var ctx = $("#myChart");
        mf.ajax({
            type: 'Get',
            url: '/MES/api/EquipmentManagement/Ems00007GetReason',
            data: defaultSearchValue,
            success: function (data) {
                var countArry = [], codeArry = [], colorArry = [];

                for (var i = 0; i < data.length; i++) {
                    countArry[i] = data[i].Count;
                    if (data[i].Code) {
                        codeArry[i] = data[i].Code;
                    }
                    else {
                        codeArry[i] = "Null";
                    }
                    colorArry[i] = colorRandom();
                }
                //console.log(countArry + "-" + codeArry);
                data2 = {
                    datasets: [{
                        data: countArry,
                        backgroundColor: colorArry,
                        //borderColor: [
                        //    'rgba(0,255,0,1)', 'rgba(255,0,0,1)', 'rgba(0,0,255,1)',
                        //],
                        borderWidth: 1
                    }],
                    labels: codeArry
                };
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: data2
                });
            }
        });
        $("#ChartDialog").modal("show");
        $("#ChartDialog").modal({ backdrop: 'static', keyboard: false });
    }

    //设置设备表格
    var EquipmentTable = new mf.Table("#EquipmentTable", {
        uniqueId: "EquipmentID",
        paginationBar: new mf.PaginationBar("#paginagionEquipmentBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#EquipmentCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 270,
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'Name', title: fields.EquipmentDescription, require: true, align: "center", width: "170",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            },
            {
                field: 'ResourceCategoryName', title: fields.SourceClass, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            }
        ]
    });

    //设置原因弹窗表格
    var ReasonCodeTable = new mf.Table("#ReasonCodeTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionReasonCodeBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#ReasonCode").val();
            var Name = $("#ReasonName").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getReasonList',
                data: ({ page: pagination.page, rows: pagination.rows, Type: "EMS", Code: Code, Description: Name }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.ReasonNo, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.ReasonDescription, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            },
            {
                field: 'GroupCode', title: fields.ReasonGroupCode, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'GroupName', title: fields.ReasonGroupDescription, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),
            }
        ]
    });

    // 資源类别：开窗选取
    var ResourceClassTable = new mf.Table("#ResourceClassTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionResourceClassBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#RResourceClass").val();

            mf.ajax({
                type: 'Get',
                url: "/MES/api/PopUp/getParameterList",
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "000013" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 280,
        columns: [
            {
                field: 'Code', title: fields.SourceClass, align: "center", require: true, width: "200",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),

            },
            {
                field: 'Name', title: fields.CategoryDec, require: true, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: "title" })),

            }
        ]
    });

    //设置表格
    var table = new mf.Table("#EMS00007ReasonTable", {
        uniqueId: "ReasonID",
        editable: false,
        //paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "120px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:120px;text-align:center;">');
            $td.append('<button class="btn btn-success btn-xs" id="OpenCallFixDetail" onclick="model.OpenCallFixDetail(this)" title="叫修單明細" >' + fields.CallFixDetail + '</button>&nbsp;&nbsp;');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var StartReasonCode = $("#StartReasonCode").val();
            if (StartReasonCode && StartReasonCode.length > 0)
                searchData.StartReasonCode = StartReasonCode + "";

            var EndReasonCode = $("#EndReasonCode").val();
            if (EndReasonCode && EndReasonCode.length > 0)
                searchData.EndReasonCode = EndReasonCode + "";

            var StartEquipmentCode = $("#StartEquipmentNo").val();
            if (StartEquipmentCode && StartEquipmentCode.length > 0)
                searchData.StartEquipmentCode = StartEquipmentCode + "";

            var EndEquipmentCode = $("#EndEquipmentNo").val();
            if (EndEquipmentCode && EndEquipmentCode.length > 0)
                searchData.EndEquipmentCode = EndEquipmentCode + "";

            var StartDate = $("#StartCallFixDate").val();
            var EndDate = $("#EndCallFixDate").val();
            var Type = $("#ResourceClass").val();

            searchData.StartDate = StartDate;
            searchData.EndDate = EndDate;
            searchData.Type = Type;

            defaultSearchValue = searchData;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00007GetReasonList',
                data: searchData,
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: window.innerHeight - 135,
        LastWidth: "15",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.ReasonNo, align: "center", width: "240",
                rander: new mf.TextRander({ size: 10, maxLength: 30, title: "title" })

            },
            {
                field: 'Name', title: fields.Description, align: "center", width: "440",
                rander: new mf.TextRander({ size: 10, maxLength: 30, title: "title" })

            },
            {
                field: 'Count', title: fields.Times, align: "center", width: "184",
                rander: new mf.TextRander({ size: 10, maxLength: 30, title: "title" })

            },
            {
                field: 'placeholder',
                title: '',
                rander: new mf.PlaceholderRander()
            }

        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();


    // 叫修單明細表格
    var DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "DetailID",
        paginationBar: new mf.PaginationBar("#paginagionDetailBar"),
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            searchData = defaultSearchValue;

            //alert(JSON.stringify(searchData));

            mf.ajax({
                type: 'Get',
                url: '/MES/api/EquipmentManagement/Ems00007GetReasonDetailList',
                data: $.extend({ page: pagination.page, rows: pagination.rows, ReasonID: ReasonID }, searchData),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 360,
        columns: [
            {
                field: 'Date', title: fields.CallFixDate, align: "center", require: true, width: "100",
                rander: new mf.DateRander({ title: "title" }),

            },
            {
                field: 'Code', title: fields.CalledRepairNo, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'EquipmentName', title: fields.EquipmentDescription, align: "center", width: "160",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'InOutRepair', title: fields.InnerOuterRepair, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'DeptCode', title: fields.ServiceDepartmentVendor, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'DeptName', title: fields.ShowName, align: "center",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            }
        ]
    });

    //清除数据
    this.clear = function () {
        $("#ReasonCode,#ReasonName,#RResourceClass,#EquipmentCode").val("");
    };
    // 設備代碼搜尋
    this.EquipmentCodeSearch = function () {
        EquipmentTable.goForwordSafely(function () {
            EquipmentTable.loadData();
        }, null);
    }
    // 資源代碼搜尋
    this.ResourceClassSearch = function () {
        ResourceClassTable.goForwordSafely(function () {
            ResourceClassTable.loadData();
        }, null);
    }
    // 原因代碼搜尋
    this.ReasonCodeSearch = function () {
        ReasonCodeTable.goForwordSafely(function () {
            ReasonCodeTable.loadData();
        }, null);
    }
    // 開啟廠商彈窗
    this.OpenEquipmentCode = function (ID) {
        $("#EquipmentDialog").modal("show");
        $("#EquipmentDialog").modal({ backdrop: 'static', keyboard: false });
        EquipmentTable.loadData();
        $("#EquipmentCommit").unbind();
        $("#EquipmentCommit").click(function () {
            var row = EquipmentTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#EquipmentDialog").modal("hide");
                self.clear();
            }
        });
    }
    // 開啟原因碼彈窗
    this.OpenReasonCodeCode = function (ID) {
        $("#ReasonCodeDialog").modal("show");
        $("#ReasonCodeDialog").modal({ backdrop: 'static', keyboard: false });
        ReasonCodeTable.loadData();
        $("#ReasonCodeConfirmBtn").unbind();
        $("#ReasonCodeConfirmBtn").click(function () {
            var row = ReasonCodeTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#ReasonCodeDialog").modal("hide");
                self.clear();
            }
        });
    }
    // 開啟資源類別彈窗
    this.OpenResourceClassCode = function (ID) {
        $("#ResourceClassDialog").modal("show");
        $("#ResourceClassDialog").modal({ backdrop: 'static', keyboard: false });
        ResourceClassTable.loadData();
        $("#ResourceClassComfirm").unbind();
        $("#ResourceClassComfirm").click(function () {
            var row = ResourceClassTable.getSelectedData();
            if (row) {
                $(ID).val(row.Code);
                $("#ResourceClassDialog").modal("hide");
                self.clear();
            }
        });
    }
    // 開啟叫修單明細彈窗
    this.OpenCallFixDetail = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            return;
        }

        $("#DetailDialog").modal("show");
        $("#DetailDialog").modal({ backdrop: 'static', keyboard: false });
        ReasonID = row.ReasonID;
        DetailTable.loadData();

    }

}

var URL = "/MES/EquipmentManagement/EMS00007Reason";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "Times", "PieChart", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Refresh", "Search", "Status", "EquipmentAnalysis", "StartReasonCode", "EndReasonCode", "StartCallFixDate",
    "EndCallFixDate", "Description", "ReasonNo", "ReasonCodeMaster", "ReasonNo", "ReasonDescription", "ReasonGroupCode",
    "ReasonGroupDescription", "EquipmentMasterFile", "EquipmentCode", "EquipmentDescription", "Confirm", "SourceClassDoc",
    "CategoryDec", "CallFixDetail", "CallFixDate", "CalledRepairNo", "InnerOuterRepair", "ServiceDepartmentVendor",
    "DepartmentDesOrManufacturersDes", "Close", "SourceClass", "Comfirm", "Cancel", "ShowName"//, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""

];

words = arrayWord.join();

var model = null;
var parameters = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
    //mf.ajax({
    //    type: 'get',
    //    url: "/MES/api/Util/GetParameters",
    //    data: { "typeIDs": "0191213000052,019121300001A,019121300001D,0191213000001" },
    //    success: function (data) {
    //        parameters = data;
    //        model = new viewModel();
    //        var Listdata = parameters.PT0191213000001
    //        $("#Status").append("<option></option>");
    //        for (var i = 0; i < Listdata.length; i++) {
    //            $("#Status").append("<option value='" + Listdata[i].value + "'>" + Listdata[i].text + "</option>");
    //        }
    //    }
    //});
};