var viewModel = function () {
    var self = this, buttonColumns = [];

    //保存
    this.saveClick = function () {
        if (!menuTable)
            return;
        menuTable.save(null, null, true);
    };

    //菜单权限Table
    var menuTable = new mf.Table("#menuTable",
        {
            uniqueId: "OrganizationID",
            height: window.innerHeight - 105,
            noNumColumn: true,
            enter_addble:false,
            fn_getData: function (pagination, searchData, success) {
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentParameter/Inf00001getPlantList',
                    data: ({ page: 1, rows: 1000 }),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success, rowsData) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00001PlantSave',
                    data: JSON.stringify(saveData),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            columns: [
                {
                    field: 'Status', title: '<input type="checkbox" onclick="model.checkboxClick(this);"/>', align: 'center', width: '50px',
                    rander: new mf.SingleCheckBoxRander({ yes: 1, no: 0 })
                },
                {
                    field: 'Name', title: fields.MenuName, align: 'center', width: '800px',
                    rander: new mf.StaticValueRander({ title:"title" })
                },
                {
                    field: 'Comments', title: fields.description, align: "center",
                    rander: new mf.StaticValueRander({ title: "title" }),
                }
            ]
        });

    menuTable.loadData();

    //菜单全选
    this.checkboxClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            menuTable.updateCurrentPageColumnValue("Status", 1, true);
        }
        else {
            menuTable.updateCurrentPageColumnValue("Status", 0, true);
        }        
    };

    //按鈕數據，用於菜單按鈕權限的列
    //mf.ajax({
    //    type: "Get",
    //    url: "/EMO/api/CommonInformation/Cnl10200GetButtonList",
    //    async: false,
    //    success: function (data) {
    //        var length = data.length;

    //        buttonList = data;

    //        buttonColumns = [{
    //            field: 'Name', title: fields.MenuName, align: 'center', width: "330px",
    //            rander: new mf.StaticValueRander()
    //        }];

    //        for (var i = 1; i < length; i++) {
    //            if (i != length - 1) {
    //                buttonColumns[i] = {
    //                    field: "B" + data[i].ButtonID, title: data[i].Code, align: 'center', width: "160px",
    //                    rander: new mf.TristateCheckBoxRander({ yes: 1, no: 0, invalid: -1 })
    //                };
    //            }
    //            else {
    //                buttonColumns[i] = {
    //                    field: "B" + data[i].ButtonID, title: data[i].Code, align: 'center',
    //                    rander: new mf.TristateCheckBoxRander({ yes: 1, no: 0, invalid: -1 })
    //                };
    //            }
    //        }
    //    }
    //});

    //菜單按鈕權限Table
    //var buttonTable = new mf.Table("#buttonTable", {
    //    uniqueId: "MenuID",
    //    height: window.innerHeight - 118,
    //    fn_getData: function (pagination, searchData, success) {

    //        mf.ajax({
    //            type: 'Get',
    //            async: false,
    //            url: '/EMO/api/CommonInformation/Cnl10200GetCompanyRoleMenuButton',
    //            data: { RoleID: roleID, OrganizationID: company },
    //            success: function (data) {
    //                设置数据
    //                var menuButtonList;
    //                var menuButtonStr = "";
    //                var companyMenuListLength = companyMenuList.length;
    //                var buttonListLength = buttonList.length;
    //                var i = 0, j = 0, k = 0;

    //                for (i = 0; i < companyMenuListLength; i++) {
    //                    menuButtonStr += "{ 'MenuID': '" + companyMenuList[i].MenuID +
    //                            "', 'Name': '" + companyMenuList[i].Name + "',";
    //                    for (j = 0; j < buttonListLength; j++) {
    //                        menuButtonStr += "'B" + buttonList[j].ButtonID + "':";
    //                        menuButtonStr += self.checkMenuButton(companyMenuList[i].MenuID, buttonList[j].ButtonID, data);
    //                        menuButtonStr += ",";
    //                    }
    //                    menuButtonStr += "},";
    //                }

    //                menuButtonList = eval("[" + menuButtonStr + "]");
    //                success(menuButtonList);
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success, rowsData) {
    //        var organizationID = formModel.Company();

    //        if (!organizationID || organizationID.length == 0) {
    //            msg.info(tips.TipTitle, fields.SelectCompany);
    //            return;
    //        }

    //        var data = [];
    //        var length = rowsData.length;

    //        for (var i = 0; i < length; i++) {
    //            for (var button in rowsData[i]) {
    //                if (rowsData[i][button] == 1) {
    //                    data.push({
    //                        MenuID: rowsData[i].MenuID,
    //                        ButtonID: button.substring(1)
    //                    });
    //                }
    //            }
    //        }

    //        mf.ajax({
    //            type: 'Post',
    //            url: '/EMO/api/CommonInformation/Cnl10200SaveCompanyRoleMenuButton',
    //            data: JSON.stringify({ RoleID: roleID, OrganizationID: organizationID, data: data }),
    //            success: function (data) {
    //                if (data && data.status == "200") {
    //                    msg.info(tips.TipTitle, tips.SaveSuccess);
    //                    self.searchClick();
    //                }
    //                else {
    //                    msg.info(tips.TipTitle, tips.SaveFail);
    //                }
    //            }
    //        });
    //    },
    //    columns: buttonColumns
    //});

    //菜單操作權限Table
    //var actionTable = new mf.Table("#actionTable", {
    //    uniqueId: "MenuID",
    //    height: window.innerHeight - 118,
    //    fn_getData: function (pagination, searchData, success) {

    //        mf.ajax({
    //            type: 'Get',
    //            async: false,
    //            url: '/EMO/api/CommonInformation/Cnl10200GetCompanyRoleMenuAction',
    //            data: { RoleID: roleID, OrganizationID: company },
    //            success: function (data) {
    //                //设置数据
    //                var menuActionList;
    //                var menuActionStr = "";
    //                var companyMenuListLength = companyMenuList.length;
    //                var actionListLength = actionList.length;
    //                var i = 0, j = 0, k = 0;

    //                for (i = 0; i < companyMenuListLength; i++) {
    //                    menuActionStr += "{ 'MenuID': '" + companyMenuList[i].MenuID +
    //                            "', 'Name': '" + companyMenuList[i].Name + "',";
    //                    for (j = 0; j < actionListLength; j++) {
    //                        menuActionStr += "'A" + actionList[j].ActionID + "':";
    //                        menuActionStr += self.checkMenuAction(companyMenuList[i].MenuID, actionList[j].ActionID, data);
    //                        menuActionStr += ",";
    //                    }
    //                    menuActionStr += "},";
    //                }

    //                menuActionList = eval("[" + menuActionStr + "]");
    //                success(menuActionList);
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success, rowsData) {
    //        var organizationID = formModel.Company();

    //        if (!organizationID || organizationID.length == 0) {
    //            msg.info(tips.TipTitle, fields.SelectCompany);
    //            return;
    //        }

    //        var data = [];
    //        var length = rowsData.length;

    //        for (var i = 0; i < length; i++) {
    //            for (var action in rowsData[i]) {
    //                if (rowsData[i][action] == 1) {
    //                    data.push({
    //                        MenuID: rowsData[i].MenuID,
    //                        ActionID: action.substring(1)
    //                    });
    //                }
    //            }
    //        }

    //        mf.ajax({
    //            type: 'Post',
    //            url: '/EMO/api/CommonInformation/Cnl10200SaveCompanyRoleMenuAction',
    //            data: JSON.stringify({ RoleID: roleID, OrganizationID: organizationID, data: data }),
    //            success: function (data) {
    //                if (data && data.status == "200") {
    //                    msg.info(tips.TipTitle, tips.SaveSuccess);
    //                    self.searchClick();
    //                }
    //                else {
    //                    msg.info(tips.TipTitle, tips.SaveFail);
    //                }
    //            }
    //        });
    //    },
    //    columns: actionColumns
    //});


}

var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentParameters/INF00003PersonalAuthority");

var arrayWord = [
    "SelectAll", "Back", "Refresh", "Save", "Name", "Account", "Menus", "Buttons", "Actions", "WorkCenter",
    "MenuName", "description"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    $('#liTab a').click(function (e) {
        var $a = $(this);
        $a.attr('href', $a.data("id"));
        $a.tab('show');
        $a.removeAttr("href");
        var tabs = $("#liTab li");
        var tabs_active;
        for (var i = 0; i < tabs.length; i++) {
            if ($(tabs[i]).attr('class') && $(tabs[i]).attr('class') == 'active') {
                tabs_active = i;
                alert(tabs_active);
            }
        }
    })
    model = new viewModel();
    console.log(fields.Normal);
};