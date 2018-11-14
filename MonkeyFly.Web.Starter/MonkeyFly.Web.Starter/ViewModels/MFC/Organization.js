var viewModel = function () {
    var self = this;

    //组织结构图选择的机构信息
    this.selectNode;

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //添加新单位
    this.addClick = function () {
        mf.dialog('#AddDialog', {
            viewModel: function () {
                var addSelf = this;

                //创建组织结构树
                mf.ajax({
                    type: "GET",
                    url: "/MES/api/Organization/Get",
                    async: false,
                    success: function (ret) {

                        var treeData = mf.deal.toTreeData(ret, 'OrganizationID', 'ParentOrganizationID', 'children');
                        treeData = eval(JSON.stringify(treeData).replace(/Name/g, 'text'));
                        treeData = mf.deal.addCPropertyAndCopy(treeData, 'icon', 'iconCls', 'children')
                        treeData = treeData.map(function (d) { d.icon = "fa fa-folder"; d.state = { "opened": true }; return d; });



                        $("#AddOrgTree").jstree({
                            "core":
                           {
                               "data": treeData
                           }

                        }).bind("activate_node.jstree", function (obj, e) {
                            $("#addParentID").val(e.node.original.text);
                            $("#addParentID").data("parentID", e.node.original.OrganizationID);
                        });
                    }
                });

                //绑定机构信息
                $("#addTip").text("");
                $("addName").val("");
                if (self.selectNode) {
                    $("#addParentID").val(self.selectNode.Name);
                    $("#addParentID").data("parentID", self.selectNode.OrganizationID);
                }

                //提交数据
                $("#addSave").click(function () {

                    //验证信息
                    if (!$("#addName").val()) {
                        $("#addTip").text(tips.AddName);
                        return;
                    }

                    //获取添加的机构信息
                    var post = {};
                    post.ParentID = $("#addParentID").data("parentID");
                    post.Name = $("#addName").val();
                    post.Comments = $("#addComments").val();

                    //添加机构信息
                    mf.ajax({
                        type: 'POST',
                        url: '/MES/api/Organization/Add',
                        data: JSON.stringify(post),
                        success: function (d) {

                            msg.success(tips.TipTitle, tips.SaveSuccess);
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        }
                    });
                });
            }
        });
    };

    //编辑单位
    this.editClick = function () {
        if (!self.selectNode) {
            msg.info(tips.TipTitle, tips.SelectNode);
            return;
        }

        mf.dialog('#EditDialog', {
            viewModel: function () {
                var editSelf = this;

                //上级机构名称
                this.parentName = "";

                //创建组织结构树
                mf.ajax({
                    type: "GET",
                    url: "/MES/api/Organization/Get",
                    async: false,
                    success: function (ret) {

                        for (var i = 0; i < ret.length; i++) {
                            if (self.selectNode.ParentOrganizationID == ret[i].OrganizationID) {
                                editSelf.parentName = ret[i].Name;

                                break;
                            }
                        }

                        var list = mf.deal.filterProperties(ret, ['OrganizationID as id', 'ParentOrganizationID as pid', 'Name as text']);
                        var tree = mf.deal.toTreeData(list, "id", "pid", "children");

                        var treeData = mf.deal.toTreeData(ret, 'OrganizationID', 'ParentOrganizationID', 'children');
                        treeData = eval(JSON.stringify(treeData).replace(/Name/g, 'text'));
                        treeData = mf.deal.addCPropertyAndCopy(treeData, 'icon', 'iconCls', 'children')
                        treeData = treeData.map(function (d) { d.icon = "fa fa-folder"; d.state = { "opened": true }; return d; });

                        $("#EditOrgTree").jstree({
                            "core":
                           {
                               "data": treeData
                           }
                        }).bind("activate_node.jstree", function (obj, e) {
                            var isChild = mf.deal.isInChild(tree, $("#editName").data("OrganizationID"), e.node.original.OrganizationID);
                            if (isChild) {
                                msg.error(tips.TipTitle, tips.IsChild);
                                return;
                            }
                            $("#editParentID").val(e.node.original.text);
                            $("#editParentID").data("parentID", e.node.original.OrganizationID);
                        });
                    }
                });

                //绑定机构信息
                $("#editTip").text("");
                if (self.selectNode) {
                    $("#editParentID").val(editSelf.parentName);
                    $("#editParentID").data("parentID", self.selectNode.ParentOrganizationID);
                    $("#editName").val(self.selectNode.Name);
                    $("#editName").data("ID", self.selectNode.ID);
                    $("#editName").data("OrganizationID", self.selectNode.OrganizationID);
                    $("#editComments").val(self.selectNode.Comments);
                }

                //提交数据
                $("#editSave").click(function () {

                    //验证信息
                    if (!$("#editName").val()) {
                        $("#editTip").text(tips.EditName);
                        return;
                    }

                    //获取修改后的信息
                    var post = {};
                    post.ID = $("#editName").data("ID");
                    post.ParentID = $("#editParentID").data("parentID");
                    post.Name = $("#editName").val();
                    post.Comments = $("#editComments").val();

                    //更新机构信息
                    mf.ajax({
                        type: 'POST',
                        url: '/MES/api/Organization/Update',
                        data: JSON.stringify(post),
                        success: function (d) {
                            msg.success(tips.TipTitle, tips.SaveSuccess);
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        }
                    });
                });
            }
        });
    };

    //删除单位
    this.deleteClick = function () {
        if (!self.selectNode) {
            msg.info(tips.TipTitle, tips.SelectNode);
            return;
        }

        msg.warning(tips.WarningTitle, tips.DeleteTip, function () {
            //提交要删除的机构ID
            mf.ajax({
                type: 'GET',
                url: '/MES/api/Organization/Delete/',
                data: { id: self.selectNode.ID },
                success: function (d) {
                    msg.success(tips.TipTitle, tips.SaveSuccess, function () {
                        self.initGraph(d);
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    });

                }
            });
        });
    };

    //设置角色
    this.roleClick = function () {

        if (!self.selectNode) {
            msg.info(tips.TipTitle, tips.SelectNode);
            return;
        }

        mf.dialog('#SetRoleDialog', {
            viewModel: function () {
                var setRoleSelf = this;

                //获取角色数据
                mf.ajax({
                    type: 'GET',
                    url: '/MES/api/Organization/GetRoleWithOrganizationCheck/',
                    async: false,
                    data: { id: self.selectNode.OrganizationID },
                    success: function (d) {

                        var html = '<div>';

                        for (var i = 0; i < d.length; i++) {

                            html += '<label class="checkbox-inline i-checks" style="width:17.96%;"><input type="checkbox" name="roles" style="margin-top: 0 !important;" value="' + d[i].RoleID + '"';

                            if (d[i].Checked == "True") {
                                html += 'checked'
                            }

                            html += '>' + d[i].Name + '</label>';

                            if ((i + 1) % 5 == 0) {
                                html += '</div><div>';
                            }
                        }

                        html += "</div>";

                        $('#setRoles').html(html);

                        $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
                    }
                });

                //提交数据
                $("#setRoleSave").click(function () {
                    var selected = $('input[name="roles"]:checkbox:checked');

                    if (selected.length == 0) window.location.reload();

                    var roles = [];
                    for (var i = 0; i < selected.length; i++) {
                        roles.push({ RoleCode: $(selected[i]).val() });
                    }

                    var form = { data: roles, id: self.selectNode.OrganizationID };
                    mf.ajax({
                        url: '/MES/api/Organization/EditorGanizeRoles',
                        data: JSON.stringify(form),
                        success: function (d) {

                            if (d.status == "200") {
                                msg.success(tips.TipTitle, tips.SaveSuccess);
                            }
                            else {
                                msg.error(tips.TipTitle, tips.SaveFail);
                            }
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        }
                    });

                });
            }
        });
    };

    //设置主管
    this.directorClick = function () {
        if (!self.selectNode) {
            msg.info(tips.TipTitle, tips.SelectNode);
            return;
        }

        mf.dialog('#SetDirectorDialog', {
            viewModel: function () {
                var setDirectorSelf = this;

                this.users = ko.observable();
                this.status = ko.observable();
                this.form = {
                    ID: ko.observable(),
                    DirectorID: ko.observable(),
                    Status: ko.observable(),
                    ViceDirectorID: ko.observable(),
                    ViceStatus: ko.observable(),
                    TemporaryUserID: ko.observable()
                };

                //该单位所有用户，格式：[{"text":"XXX","value":"XXX"}]
                mf.ajax({
                    type: 'GET',
                    url: '/MES/api/Organization/getUsers',
                    data: { id: self.selectNode.OrganizationID },
                    async: false,
                    success: function (d) {
                        setDirectorSelf.users(d);
                    }
                });

                //状态信息
                setDirectorSelf.status(vicestatus);

                //该单位主管、副主管、临时委托人的信息
                mf.ajax({
                    type: 'GET',
                    url: '/MES/api/Organization/getDarector',
                    data: { id: self.selectNode.OrganizationID },
                    async: false,
                    success: function (d) {
                        if (d) {
                            setDirectorSelf.form.ID(d.ID);
                            setDirectorSelf.form.DirectorID(d.DirectorID);
                            setDirectorSelf.form.Status("" + d.Status);
                            setDirectorSelf.form.ViceDirectorID(d.ViceDirectorID);
                            setDirectorSelf.form.ViceStatus("" + d.ViceStatus);
                            setDirectorSelf.form.TemporaryUserID(d.TemporaryUserID);
                        }
                    }
                });

                this.DirectorClick = function () {
                    if (setDirectorSelf.form.DirectorID()
                        && (setDirectorSelf.form.DirectorID() == setDirectorSelf.form.ViceDirectorID()
                        || setDirectorSelf.form.DirectorID() == setDirectorSelf.form.TemporaryUserID())) {
                        msg.error(tips.TipTitle, tips.IsSelected);
                        setDirectorSelf.form.DirectorID("");
                    }
                }

                this.ViceDirectorClick = function () {
                    if (setDirectorSelf.form.ViceDirectorID()
                        && (setDirectorSelf.form.DirectorID() == setDirectorSelf.form.ViceDirectorID() ||
                        setDirectorSelf.form.ViceDirectorID() == setDirectorSelf.form.TemporaryUserID())) {
                        msg.error(tips.TipTitle, tips.IsSelected);
                        setDirectorSelf.form.ViceDirectorID("");
                    }
                }

                this.TemporaryUserClick = function () {
                    if (setDirectorSelf.form.TemporaryUserID()
                        && (setDirectorSelf.form.TemporaryUserID() == setDirectorSelf.form.ViceDirectorID()
                        || setDirectorSelf.form.DirectorID() == setDirectorSelf.form.TemporaryUserID())) {
                        msg.error(tips.TipTitle, tips.IsSelected);
                        setDirectorSelf.form.TemporaryUserID("");
                    }
                }

                //提交数据
                $("#setDirectorSave").click(function () {
                    if (setDirectorSelf.form.Status() != "0"
                        && setDirectorSelf.form.ViceStatus() != "0"
                        && !setDirectorSelf.form.TemporaryUserID()) {
                        msg.error(tips.TipTitle, tips.TemporaryUser);
                        return;
                    }

                    mf.ajax({
                        url: '/MES/api/Organization/setDarector/' + self.selectNode.OrganizationID,
                        data: ko.toJSON(setDirectorSelf.form),
                        success: function (d) {

                            if (d.status == "200") {
                                msg.success(tips.TipTitle, tips.SaveSuccess);
                            }
                            else {
                                msg.error(tips.TipTitle, tips.SaveFail);
                            }
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        }
                    });
                });
            }
        });
    };

    //绘制组织结构图
    this.initGraph = function (data) {
        self.data = data;
        var wrapper = $("#gridlist").empty();
        var treeData = mf.deal.toTreeData(data, "OrganizationID", "ParentOrganizationID", "children");

        var tb = renderTreeGraph(treeData);
        tb.appendTo(wrapper);

        //绑定事件
        $(wrapper).find(".td-node").click(function () {
            $(".td-node").css({ "background-color": "#f6f6ff", "color": "" });
            $(this).css({ "background-color": "#faffbe", "color": "#FF0000" });
            self.selectNode = $(this).data("node");
        }).dblclick(self.editClick);

        if (self.selectNode) {
            $("#td" + self.selectNode.OrganizationID).css({ "background-color": "#faffbe", "color": "#FF0000" });
        }
    };

    this.initGraph(data);
};

function renderTreeGraph(treeData) {
    //生成图形
    var tb = $('<table class="tb-node" cellspacing="0" cellpadding="0" align="center" border="0" style="border-width:0px;border-collapse:collapse;margin:0 auto;vertical-align:top"></table>');
    var tr = $('<tr></tr>');
    for (var i in treeData) {
        if (i > 0) $('<td>&nbsp;</td>').appendTo(tr);
        $('<td style="vertical-align:top;text-align:center;"></td>').append(createChild(treeData[i])).appendTo(tr);
    }
    tr.appendTo(tb);
    return tb;
}

//递归生成单位树图形
function createChild(node, ischild) {
    var length = (node.children || []).length;
    var colspan = length * 2 - 1;
    if (length == 0)
        colspan = 1;

    var fnTrVert = function () {
        var tr1 = $('<tr class="tr-vline"><td align="center" valign="top" colspan="' + colspan + '"><img class="img-v" src="/Content/images/tree/Tree_Vert.gif" border="0"></td></tr>');
        return tr1;
    };
    //1.创建容器
    var tb = $('<table class="tb-node" cellspacing="0" cellpadding="0" align="center" border="0" style="border-width:0px;border-collapse:collapse;margin:0 auto;vertical-align:top"></table>');

    //2.如果本节点是子节点，添加竖线在节点上面
    if (ischild) {
        fnTrVert().appendTo(tb);
    }

    // 3.添加本节点到图表
    var tr3 = '<tr class="tr-node"><td align="center" valign="top" colspan="{0}"><table align="center" style="border:solid 2px" border="1" cellpadding="2" cellspacing="0"><tr><td class="td-node" id="td{3}" data-node=\'{2}\' align="center" valign="top" style="background-color:#f6f6ff;cursor:pointer;padding:2px;">{1}</td></tr></table></td></tr>';
    tr3 = mf.deal.formatString(tr3, colspan, node.Name, JSON.stringify(node), node.Code);
    $(tr3).appendTo(tb);

    // 4.增加上下级的连接线
    if (length > 1) {
        //增加本级连接下级的首节点竖线，在节点下方
        fnTrVert().appendTo(tb);

        //增加本级连接下级的中间横线
        var tr4 = '<tr class="tr-hline" style="line-height:0;"><td colspan="1"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="50%" style="background:url(/Content/images/tree/Tree_Empty.gif)"></td><td width="3px" height="3px"><img src="/Content/images/tree/Tree_Dot.gif" border="0"></td><td width="50%" style="background:url(/Content/images/tree/Tree_Dot.gif)"></td></tr></tbody></table></td><td style="background:url(/Content/images/tree/Tree_Dot.gif)" colspan="{0}"></td><td colspan="1"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="50%" style="background:url(/Content/images/tree/Tree_Dot.gif)"></td><td width="3px" height="3px"><img src="/Content/images/tree/Tree_Dot.gif" border="0"></td><td width="50%" style="background:url(/Content/images/tree/Tree_Empty.gif)"></td></tr></tbody></table></td></tr>';
        tr4 = mf.deal.formatString(tr4, colspan - 2);
        $(tr4).appendTo(tb);
    }

    //5.递归增加下级所有子节点到图表
    if (length > 0) {
        var tr5 = $('<tr></tr>');

        for (var i in node.children) {
            if (i > 0) {
                $('<td>&nbsp;</td>').appendTo(tr5);
            }
            $('<td style="vertical-align:top;text-align:center;"></td>').append(createChild(node.children[i], true)).appendTo(tr5);
        }

        tr5.appendTo(tb);
    }

    return tb;
}

var URL = "/Organization";
var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');
var data = [];

mf.ajax({
    type: "GET",
    url: "/MES/api/Organization/Get",
    async: false,
    success: function (ret) {
        data = ret;
    }
});

var vicestatus;
$.ajax({
    url: "Data/options/vicestatus/vicestatus-" + language + ".js",
    async: false,
    contentType: 'application/json',
    success: function (data) {
        vicestatus = eval(data);
    }
});

var model = new viewModel();