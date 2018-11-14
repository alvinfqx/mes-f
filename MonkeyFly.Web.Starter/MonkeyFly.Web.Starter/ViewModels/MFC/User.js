var viewModel = function () {
    var self = this;
    var OrganizationID = null, MESUserID = null;

    var formModel = {
        Status: ko.observable(),
        Comments: ko.observable(),
        StatusArray: ko.observableArray()
    };
    ko.applyBindings(formModel);

    formModel.StatusArray([{ value: 1, text: fields.yes }, { value: 0, text: fields.no }]);
  
    this.unSelected = function () {
        $('#userTable').find("tr").each(function () {
            $(this).removeClass("selected");
        });
    };

    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //编辑
    this.editClick = function () {
        var selectContent = table.getSelectedData();
        if (!selectContent) {
            msg.info(fields.info, fields.IsEdit);
            return;
        }
        $('#editAccount').val(selectContent.Account);
        $('#editUserName').val(selectContent.UserName);
        formModel.Status(selectContent.Status);
        formModel.Comments(selectContent.Comments);

        $('#EditDialog').modal("show");
        MESUserID = selectContent.MESUserID;
    }

    //编辑保存
    this.editSave = function () {

            var post = {};
            //post.Token = window.top.mf.token;
            post.MESUserID = MESUserID;
            post.Account = $('#editAccount').val();
            post.UserName = $('#editUserName').val();
            post.Status = formModel.Status();
            post.Comments = formModel.Comments();

            mf.ajax({
                type: 'POST',
                url: '/MES/api/User/updated',
                data: JSON.stringify(post),
                success: function (data) {
                    if (data.status == "200") {
                        msg.success(fields.info, data.msg, function () {
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        });
                    }
                    else {
                        msg.error(fields.info, data.msg);
                    }            
                }
            })
    };

    //密码复原
    this.passwordClick = function () {

        var selectContent = table.getSelectedData();

        if (!selectContent) {
            msg.info(fields.info, fields.IsEdit);
            return;
        }

        msg.warning(fields.info, fields.ResetPassword, function () {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/user/PostResetPassword/',
                data: ({ ID: selectContent.MESUserID }),
                success: function (data) {
                    if (data.status == 200) {
                        msg.success(fields.info, fields.ResetPasswordSuccess, function () {
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        });
                    }
                    else {
                        msg.error(fields.info, data.msg);
                    }
                }
            });
        });
    };

    //设置用户表格
    var table = new mf.Table("#userTable", {
        uniqueId: "MESUserID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/User/Get',
                data: ({ OrganizationID: OrganizationID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: window.innerHeight - 165,
        columns: [
            {
                field: 'Account', title: fields.AccountNo, align: "center", width: "100",
                rander: new mf.TextRander({ size: 9, title: "title" }),
            },
            {
                field: 'UserName', title: fields.UserName, require: true, align: "center", width: "120",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'OrganizationName', title: fields.Department, align: "center", width: "120",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'Comments', title: fields.DescribeDescription, require: true, align: "center", width: "150",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'Status', title: fields.Isenable, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.yes }, { value: 0, text: fields.no }]),
            },
            {
                field: 'LogonCount', title: fields.LandingTimes, align: "center", width: "90",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'LastLogonTime', title: fields.LastLogonTime, align: "center",
                rander: new mf.TextTimeRander({ title: "title" } ),
            }
        ]
    });

    table.loadData();

    // 獲取組織結構左側列
    mf.ajax({
        type: 'Get',
        url: '/MES/api/IntelligentParameter/GetOrganization',
        success: function (data) {
            //alert(JSON.stringify(data));
            if (data != null) {
                var treeData = null, treeNode = null;
                treeData = mf.deal.toTreeData(data, 'OrganizationID', 'ParentOrganizationID', 'children');
                treeNode = eval(JSON.stringify(treeData).replace(/Code/g, 'text'));
                treeNode = mf.deal.addCPropertyAndCopy(treeNode, 'icon', 'iconCls', 'children');
                treeNode = treeNode.map(function (d) { d.icon = "fa fa-folder"; d.state = { "opened": true }; return d; });
                $("#jstree1").bind("activate_node.jstree", function (obj, e) {
                    var currentNode = e.node;
                    OrganizationID = currentNode.original.OrganizationID;
                    table.loadData();
                }).jstree({
                    "core":
                   {
                       "data": treeNode
                   }
                });
            }
            else {
                $("#jstree1").html("&nbsp;<span>" + fields.DataIsNull + "</span>");
            }

        }
    });
};

var URL = "/User";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "Organization", "EditUser", "AccountNo", "UserName", "Isenable", "yes", "no",
    "Remark", "Close", "Save", "DescribeDescription", "info", "IsEdit", "DataIsNull",
    "LandingTimes", "LastLogonTime", "ResetPassword", "ResetPasswordSuccess", "Department"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};
