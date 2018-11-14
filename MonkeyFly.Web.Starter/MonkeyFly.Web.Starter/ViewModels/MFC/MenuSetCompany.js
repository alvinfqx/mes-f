var viewModel = function () {
    var self = this;

    var CompanyCodeList = [];

    mf.ajax({
        type: "Get",
        url: "/MES/api/CompanyInformation/Sys10400GetLists?page=1&rows=1000000",
        async: false,
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                CompanyCodeList[i] = { value: data.rows[i].OrganizationID, text: data.rows[i].Code + "-" + data.rows[i].Name };
            }
        }
    });

    var table = new mf.Table("#companyTable",
        {
            uniqueId: "ID",
            dblclick_editable: false,
            fn_getData: function (pagination, searchData, success) {
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/CommonInformation/Cnl10200GetCompanyMenuMappingList',
                    data: { MenuID: MenuID },
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success) {

                for (var i = 0; i < saveData.inserted.length; i++) {
                    saveData.inserted[i].MenuID = MenuID;
                }

                for (var i = 0; i < saveData.updated.length; i++) {
                    saveData.updated[i].MenuID = MenuID;
                }

                for (var i = 0; i < saveData.deleted.length; i++) {
                    saveData.deleted[i].MenuID = MenuID;
                }

                console.log(JSON.stringify(saveData));

                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/CommonInformation/Cnl10200SaveCompanyMenuMapping',
                    data: JSON.stringify(saveData),
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        success(data);
                    }
                });
            },
            focusField: "OrganizationID",
            height: window.innerHeight - 78,
            columns: [
                {
                    field: 'OrganizationID', title: fields.CompanyCode, halign: 'center', align: 'center', width: "200px",
                    rander: new mf.SelectRander(CompanyCodeList),
                    checkers: [
                        new mf.TextNotEmptyChecker(fields.CompanyCodeIsNull)
                    ],
                    require: true
                },
                {
                    field: 'placeholder', title: "", rander: new mf.PlaceholderRander()
                }
            ]
        });

    table.loadData();

    this.addClick = function () {
        table.addRow();
    };

    this.deleteClick = function () {
        table.deleteRow();
    };

    this.comfirmClick = function () {
        table.save(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.href = URL;
        }, null);
    };

    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.href = URL;
    };
};

var fields = GetField("/Data/tables/MFC/Menu", "Menu");

var URL = '/Menu';
var Parameters = window.top.page_parameters.GetParameters(URL);
var MID = Parameters.MID;
var MenuID = Parameters.MenuID;
var MenuName = Parameters.MenuName;

var model = new viewModel();

