var URL = "/MES/IntelligentParameters/TRN00002";
var MID = window.top.page_parameters.GetParameters(URL);

var parameters = null;
var model = null;
var viewModel = function () {
    var self = this;
    var table = null;
    mf.deal.InitDateGroup("StartDate", "EndDate");
    var formData = {
        StartDate: ko.observable(),
        EndDate: ko.observable(),
        StartMasterCode: ko.observable(),
        EndMasterCode: ko.observable(),
        Type: ko.observable()
    };
    ko.applyBindings(formData);

    //设置表格
    table = new mf.Table("#TRN00002Table", {
        uniqueId: "ID",
        editable: false,
        LastWidth: "75",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginationBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            searchData.StartDate = formData.StartDate();
            searchData.EndDate = formData.EndDate();
            searchData.StartCode = formData.StartMasterCode();
            searchData.EndCode = formData.EndMasterCode();
            searchData.Type = formData.Type();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Trn00002GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {                  
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},       
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'Data', title: fields.MasterCategory, align: "center", width: "180",
                rander: new mf.TextRander({ size: 13, title: "title" })
            },  
            {
                field: 'KeyColum', title: fields.MasterCode, align: "center", width: "200",
                rander: new mf.TextRander({ size: 13, title: "title" }),
            },         
            {
                field: 'TransferDate', title: fields.DateOfTransfer, align: "center", width: "150",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Log', title: fields.Results, align: "center", width: "400",
                rander: new mf.TextRander({ size: 13, title: "title" }),                
            },
            {
                field: 'placeholder', title: '',rander: new mf.PlaceholderRander()
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }
    table.loadData();


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
   

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

}

var arrayWord = [
    "Remark", "Refresh", "Save", "New", "Change", "Deletion", "Status", "Invalid", "Normal",
    "System", "Isedit", "SaveSuccess", "info", "StartDate", "EndDate", "StartMasterCode", "EndMasterCode",
    "MasterCategory", "DateOfTransfer", "MasterCode", "Results"
];
words = arrayWord.join();
initPage = function () {
    mf.toolBar('#container');
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000021" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};