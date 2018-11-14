function viewModel() {
    var self = this;

    this.unSelected = function () {
        $('#MenuTable').find("tr").each(function () {
            $(this).removeClass("selected");
        });
    };
    
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    this.addClick = function () {       
        mf.dialog('#AddDialog', {
            viewModel: function () {
                var addSelf = this;

                mf.ajax({
                    type: "GET",
                    url: '/MES/api/Menu/GetAll',
                    async: false,
                    success: function (ret) {
                       
                        var treeData = mf.deal.toTreeData(ret, 'Code', 'ParentCode', 'children');
                        treeData = eval(JSON.stringify(treeData).replace(/Name/g, 'text'));
                        treeData = mf.deal.addCPropertyAndCopy(treeData, 'icon', 'iconCls', 'children')
                        treeData = treeData.map(function (d) { d.icon = "fa fa-folder";  return d; });
                     
                        $("#AddMenuTree").jstree({
                            "core":
                           {
                               "data": treeData
                           }

                        }).bind("activate_node.jstree", function (obj, e) {
                            addSelf.form.ParentName(e.node.original.text);
                            addSelf.form.ParentCode(e.node.original.Code);
                        });
                    }
                });

                this.form = {                   
                    Name: ko.observable(),
                    ParentName: ko.observable(),
                    ParentCode: ko.observable(),
                    IconClass: ko.observable(),
                    URL: ko.observable(),
                    IsParameter: ko.observable(),
                    IsVisible: ko.observable(),
                    IsEnable: ko.observable(),
                    Sequence: ko.observable()
                };

                $('#addSetIcon').click(function () {

                    mf.dialog('#SetIconDialog', {
                        viewModel: function () {

                            var setIconSelf = this;

                            this.SetIcon = function (str) {
                                addSelf.form.IconClass(str);
                                $('#SetIconDialog').modal('hide');
                            };
                        }
                    });

                    addSelf.form.IconClass('');
                });
           
                $("#addSave").click(function () {

                    if (!addSelf.form.Name()) {
                        msg.info('提示', '请填写菜单名称');
                        return;
                    }
            
                    if (addSelf.form.Sequence() && !/^[0-9]*$/.test(addSelf.form.Sequence())) {
                        msg.info("提示", "排序，请输入大于等于0的数字！");
                        return;
                    }
                    
                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Menu/insert',
                        data: ko.toJSON(addSelf.form),
                        success: function (d) {
                            
                            if (d.status == "200") {
                                msg.success("提示", d.msg);
                                $('#AddDialog').modal('hide');
                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                window.location.reload();
                            }
                            else {
                                msg.error("提示", d.msg);
                            }
                        }
                    });
                });
            }
        });
    };



    this.editClick = function () {
       
        var uniqueId = $('#MenuTable').find(".selected").data("uniqueid");

        if (!uniqueId) {
            msg.info('提示', '请选择需要编辑的导航菜单！');
            return;
        }
        var selectContent = $("#MenuTable").bootstrapTable('getRowByUniqueId', uniqueId);
                
        mf.dialog('#EditDialog', {
            viewModel: function () {
                var editSelf = this;
                //上级机构名称
                this.parentName = "";
                //创建组织结构树
                mf.ajax({
                    type: "GET",
                    url: '/MES/api/Menu/GetAll',
                    async: false,
                    success: function (ret) {
                        
                        var list = mf.deal.filterProperties(ret, ['Code as id', 'ParentCode as pid', 'Name as text']);
                        var tree = mf.deal.toTreeData(list, "id", "pid", "children");

                        var treeData = mf.deal.toTreeData(ret, 'Code', 'ParentCode', 'children');
                        treeData = eval(JSON.stringify(treeData).replace(/Name/g, 'text'));
                        treeData = mf.deal.addCPropertyAndCopy(treeData, 'icon', 'iconCls', 'children');
                        treeData = treeData.map(function (d) { d.icon = "fa fa-folder"; return d; });

                        $("#EditMenuTree").jstree({
                            "core":
                           {
                               "data": treeData
                           }
                        }).bind("activate_node.jstree", function (obj, e) {
                            var isChild = mf.deal.isInChild(tree, selectContent.Code, e.node.original.Code);
                            if (isChild) {
                                msg.error("提示", "不能将自己或下级设为上级单位！");
                                return;
                            }
                            editSelf.form.ParentName(e.node.original.text);
                            editSelf.form.ParentCode(e.node.original.Code);

                        });
                    }
                });

                this.form = {
                    ID: ko.observable(selectContent.ID),                  
                    Name: ko.observable(selectContent.Name),
                    ParentName: ko.observable(selectContent.ParentName),
                    ParentCode: ko.observable(selectContent.ParentCode),
                    IconClass: ko.observable(selectContent.IconClass),
                    URL: ko.observable(selectContent.URL),
                    IsParameter: ko.observable(selectContent.IsParameter),
                    IsVisible: ko.observable((selectContent.IsVisible ? 1 : 0)),
                    IsEnable: ko.observable((selectContent.IsEnable ? 1 : 0)),
                    Sequence: ko.observable(selectContent.Sequence)
                };

                $('#editSetIcon').click(function () {

                    mf.dialog('#SetIconDialog', {
                        viewModel: function () {

                            var setIconSelf = this;

                            this.SetIcon = function (str) {
                                editSelf.form.IconClass(str);
                                $('#SetIconDialog').modal('hide');
                            };
                        }
                    });

                    editSelf.form.IconClass(selectContent.IconClass);
                });

                $("#editSave").click(function () {                
                    if (!editSelf.form.Name()) {
                        msg.info('提示', '请填写菜单名称');
                        return;
                    }
                    if (editSelf.form.Sequence() && !/^[0-9]*$/.test(editSelf.form.Sequence())) {
                        msg.error("提示", "排序，请输入大于等于0的数字！");
                        return;
                    }
                   

                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Menu/update',
                        data: ko.toJSON(editSelf.form),
                        success: function (d) {
                            
                            msg.success(
                                "提示",
                                d.msg
                            );

                            if (d.status == "200") {
                                $('#EditDialog').modal('hide');
                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                window.location.reload();

                            }
                        }
                    });
                });
            }
        });
    };
    this.afterCreateEditors = function (editors) {

    };

    this.deleteClick = function () {

        var uniqueId = $('#MenuTable').find(".selected").data("uniqueid");

        if (!uniqueId) {
            msg.info('提示', '请选择需要删除的菜单');
            return;
        }
        var selectContent = $("#MenuTable").bootstrapTable('getRowByUniqueId', uniqueId);

        msg.warning('警告', '确定要删除选中的菜单？', function () {
            var temp = {};
            temp.Token = window.top.mf.token;
            temp.ID = selectContent.ID;

            $.ajax({
                type: 'Post',
                url: window.top.mf.domain + '/MES/api/Menu/delete',
                data: temp,
                success: function (data) {
                    msg.success("删除成功！", data.msg, "success")
                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                    window.location.reload();
                    $('#userTable').bootstrapTable('destroy');
                }
            })
        });
    };
}

//设置按钮
var setButtonClick = function (index) {
   
    var selectContent = $('#MenuTable').bootstrapTable('getRowByUniqueId', index);
   
    if (selectContent==0) {
        msg.error('提示', '请选择设置按钮的菜单');
    }
    else {
        mf.dialog('#SetButtonDialog', {
            viewModel: function () {
                var setButtonSelf = this;
                
                //弹窗获取数据
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/Menu/GetMenuButtons',
                    async: false,
                    data: { id: selectContent.Code },
                    success: function (d) {
                        
                        var html = '<div>';

                        for (var i = 0; i < d.length; i++) {

                            html += '<label class="checkbox-inline i-checks" style="width:17.96%;"><input type="checkbox" name="buttons" style="margin-top: 0 !important;" value="' + d[i].ButtonCode + '"';

                            if (d[i].Selected == '1') {
                                html += 'checked'
                            }

                            html += '>' + d[i].ButtonName + '</label>';

                            if ((i + 1) % 5 == 0) {
                                html += '</div><div>';
                            }
                        }

                        html += "</div>";

                        $('#setButton').html(html);

                        $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
                    }
                });
                //提交数据
                $('#setButtonSave').click(function () {
                    
                    var selected = $('input[name="buttons"]:checkbox:checked');
                   
                    if (selected.length == 0) {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    }
                   
                    var Buttons = [];
                    for (var i = 0; i < selected.length; i++) {
                        Buttons.push({ ButtonCode: $(selected[i]).val() });
                    }
                    var form = { data: ko.toJS(Buttons), id: selectContent.Code };
                    mf.ajax({
                        type:"post",
                        url: '/MES/api/Menu/EditMenuButtons',
                        data: JSON.stringify(form),
                        success: function (d) {                       
                            if (d.status == 200) {
                                msg.success("提示", "保存成功！", function () {                                 
                                   
                                    window.location.reload();
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                });
                            }
                            else {
                                msg.success('提示', d.msg);
                            }

                        }
                    })
                })
            }
        })
    }
};



var setActionClick = function (index) {
    var selectContent = $('#MenuTable').bootstrapTable('getRowByUniqueId', index);
   
    if (selectContent == 0) {
        msg.error('提示', '请选择设置操作的菜单');
    }
    else {
        mf.dialog('#SetActionDialog', {
            viewModel: function () {
                var setButtonSelf = this;
            
               mf.ajax({
                    type: 'Get',
                    url: '/MES/api/Menu/GetMenuActions',
                    async: false,
                    data:{id: selectContent.Code} ,
                    success: function (d) {
                       
                        var html = '<div>';

                        for (var i = 0; i < d.length; i++) {

                            html += '<label class="checkbox-inline i-checks" style="width:17.96%;"><input type="checkbox" name="actions" style="margin-top: 0 !important;" value="' + d[i].ActionCode + '"';

                            if (d[i].Selected == '1') {
                                html += 'checked'
                            }

                            html += '>' + d[i].ActionName + '</label>';

                            if ((i + 1) % 5 == 0) {
                                html += '</div><div>';
                            }
                        }

                        html += "</div>";

                        $('#setAction').html(html);

                        $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
                    }
                });
                //提交数据
                $('#setActionSave').click(function () {

                    var selected = $('input[name="actions"]:checkbox:checked');

                    if (selected.length == 0) {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    }
                       

                    var Actions = [];
                    for (var i = 0; i < selected.length; i++) {
                        Actions.push({ ActionCode: $(selected[i]).val() });
                    }
                    var form = { data: ko.toJS(Actions), id: selectContent.Code };
                    mf.ajax({
                        type: "Post",
                        url: '/MES/api/Menu/EditMenuActions',
                        data: JSON.stringify(form),
                        success: function (d) {

                            if (d.status == 200) {

                                msg.success("提示", "保存成功！", function () {
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.success('提示', d.msg);
                            }

                        }
                    })
                })
            }
        })
    }
};

//设置公司
function setCompanyClick(index) {
    var row = $('#MenuTable').bootstrapTable('getRowByUniqueId', index);
    if (row) {
        var parameters = {
            MID: MID,
            MenuID: row.Code,
            MenuName: row.Name
        };
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: parameters });
        window.location.href = '/Menu/MenuSetCompany';
    }
}

var URL = "/Menu";
var MID = window.top.page_parameters.GetParameters(URL);

//管理按钮库
$('#setButLibrary').click(function () {
    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    window.location.href = '/Menu/MenuButtons';
});
//管理操作按钮库
$('#setActLibrary').click(function () {
    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    window.location.href = '/Menu/MenuActions';
});

var model = new viewModel();
mf.toolBar('#container');

var actionBar = mf.actionBar();

var formatterAction = function (value, row, index) {
    return actionBar.replace(/Click\(\)/g, "Click\(\'" + row.ID + "\'\)");
};

var formatterNumber = function (value, row, index) {
    return index + 1;
}

//获取列表
var parameters = [];
mf.ajax({
    type: 'Get',
    url: '/MES/api/Menu/GetAll',
    success: function (data) {
        parameters = data;
        $('#MenuTable').bootstrapTable({
            data: data,
            columns: [
             { field: '_id', title: '', visible: false },
             { field: "Number", title: "序号", halign: 'center', align: 'center', formatter: formatterNumber, width: "50" },
             { field: 'Name', title: '菜单名称', width: "300" },
             { field: 'ParentName', title: '上级菜单', width: "300" },
             { field: 'IconClass', title: '图标', width: "200" },
             { field: 'URL', title: '链接地址', width: "400" },
             { field: 'IsParameter', title: '是否参数', align: 'center', formatter: mf.format.Checkbox, width: "100" },
             { field: 'IsVisible', title: '是否可见', align: 'center', formatter: mf.format.Checkbox, width: "100" },
             { field: 'IsEnable', title: '是否启用', align: 'center', formatter: mf.format.Checkbox, width: "100" },
             { field: 'Sequence', title: '排序', width: "100" },
             { field: 'ActionsInList', title: '页面按钮', clickToSelect: false, formatter: formatterAction, width: "500" }
            ],
            uniqueId: 'ID',
            contentType: "application/x-www-form-urlencoded",
            undefinedText: "",
            clickToSelect: true,
            height: $('#tb_list').height() - 43.5,
            onClickRow: function (row, tr, field) {
                model.unSelected();
                tr.addClass("selected");
            }
        });
    }
});