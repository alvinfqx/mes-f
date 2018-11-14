var viewModel = function () {
    var self = this, parameters, Namearry = [];

    this.parameterTypeID;

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //语序
    this.languagesClick = function () {
        if (!table)
            return;
        var ParameterType = "";
        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.ParameterID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }
        
        for (var i = 0; i < Namearry.length; i++) {
            if (Namearry[i].ParameterTypeID == data.ParameterTypeID) {
                ParameterType = Namearry[i].Name;
            }
        }

        var rowData =
            '&nbsp;<label>' + fields.ParameterType + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" title="' + ParameterType + '" value="' + ParameterType + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Text + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" title="' + (data.Name == null ? "" : data.Name) + '" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.DescribeDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" title="' + (data.Comments == null ? "" : data.Comments) + '" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Text,
                halign: 'center',
                align: 'center',
                width: "150",
                require: true
            },
            {
                field: 'Comments',
                title: fields.DescribeDescription,
                halign: 'center',
                align: 'center',
                width: "150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "20",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //添加参数
    this.addClick = function () {
        if (!self.parameterTypeID) {
            msg.info(fields.info, fields.PleaseSelectParameter);
            return;
        }

        mf.dialog('#AddDialog', {
            viewModel: function () {
                var addSelf = this;

                this.parents = ko.observable(mf.deal.filterProperties(parameters, ['ParameterID as value', 'Name as text']));
                
                this.form = {
                    ParameterTypeID: ko.observable("" + self.parameterTypeID),
                    Code: ko.observable(),
                    Name: ko.observable(),
                    Sequence: ko.observable(),
                    Comments: ko.observable(),
                    ParentID: ko.observable(),
                    IsEnable: ko.observable(),
                    IsDefault: ko.observable()
                };

                $("#addSave").click(function () {
                    if (!addSelf.form.Code()) {
                        msg.info(fields.info, fields.CodeIsNull);
                        return;
                    }

                    if (!addSelf.form.Name()) {
                        msg.info(fields.info, fields.TextIsNull);
                        return;
                    }

                    if (addSelf.form.Sequence() && !/^[0-9]*$/.test(addSelf.form.Sequence())) {
                        msg.info(fields.info, fields.SortMoreZero);
                        return;
                    }

                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Parameter/insert',
                        data: ko.toJSON(addSelf.form),
                        success: function (d) {
                           

                            if (d.status == "200") {
                                msg.success(fields.info, d.msg, function () {
                                    $('#AddDialog').modal('hide');
                                    table.loadData();
                                });                               
                            }
                            else {
                                msg.error(fields.info, d.msg);
                            }
                        }
                    });
                });
            }
        });
    };

    //编辑参数
    this.editClick = function () {

        var selectContent = table.getSelectedData();

        if (!selectContent)
            return;

        mf.dialog('#EditDialog', {
            viewModel: function () {
                var editSelf = this;

                this.parents = ko.observable(mf.deal.filterProperties(parameters, ['ParameterID as value', 'Name as text']));

                this.list = mf.deal.filterProperties(parameters, ['ParameterID as id', 'ParentID as pid', 'Name as text']);
                this.tree = mf.deal.toTreeData(editSelf.list, "id", "pid", "children");

                this.form = {
                    ID: ko.observable(selectContent.ID),
                    ParameterID: ko.observable(selectContent.ParameterID),
                    ParameterTypeID: ko.observable(selectContent.ParameterTypeID),
                    Code: ko.observable(selectContent.Code),
                    Name: ko.observable(selectContent.Name),
                    Sequence: ko.observable(selectContent.Sequence),
                    Comments: ko.observable(selectContent.Comments),
                    ParentID: ko.observable(selectContent.ParentID),
                    IsEnable: ko.observable((selectContent.IsEnable ? 1 : 0)),
                    IsDefault: ko.observable((selectContent.IsDefault ? 1 : 0))
                };

                this.ParentClick = function () {
                    var isChild = mf.deal.isInChild(editSelf.tree, editSelf.form.ParameterID(), editSelf.form.ParentID());
                    if (isChild) {
                        msg.info(fields.info, fields.CanNotOwnUnits);
                        editSelf.form.ParentID(selectContent.ParentID);
                        return;
                    }
                };

                $("#editSave").click(function () {
                    if (!editSelf.form.Name()) {
                        msg.info(fields.info, fields.TextIsNull);
                        return;
                    }

                    if (editSelf.form.Sequence() && !/^[0-9]*$/.test(editSelf.form.Sequence())) {
                        msg.info(fields.info, fields.SortMoreZero);
                        editSelf.form.Sequence(selectContent.Sequence);
                        return;
                    }else if (!editSelf.form.Sequence()) {
                        editSelf.form.Sequence(selectContent.Sequence);
                    }

                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Parameter/update',
                        data: ko.toJSON(editSelf.form),
                        success: function (d) {
                          

                            if (d.status == "200") {
                                msg.success(
                              fields.info,
                              d.msg, function () {
                                  $('#EditDialog').modal('hide');
                                  table.loadData();
                              });
                            }
                            else {
                                msg.error(fields.info, d.msg);
                            }
                        }
                    });
                });
            }
        });
    };

    //删除参数
    this.deleteClick = function () {

        var uniqueId = table.getSelectedData();

        if (!uniqueId)
            return;

        if (!uniqueId.IsSystem) {
            msg.info(fields.info, fields.parametersCanNotdelete);
            return;
        }

        msg.warning(fields.info, fields.IsDeleteParameters, function () {
            //提交要删除的系统参数ID
            mf.ajax({
                type: 'post',
                url: '/MES/api/Parameter/delete',
                data: JSON.stringify(uniqueId),
                success: function (d) {
                   
                    if (d.status == "200") {
                        msg.success(
                       fields.info,
                       d.msg,
                       function () {
                           table.loadData();
                       });                      
                    }
                    else {
                        msg.error(fields.info, d.msg);
                    }

                }
            });
        });
    };

    //管理参数类别
    this.typeClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.href = '/Parameter/ParameterType?MID=' + MID;
    };

    //按类型查询
    this.searchClick = function () {
        mf.ajax({
            type: 'get',
            url: '/MES/api/Parameter/GetAllParameters',
            async: false,
            data: { tid: self.parameterTypeID },
            success: function (data) {
                parameters = data;
                $('#parameterTable').bootstrapTable('load', data);
            }
        });
    };

    //创建参数类型树
    mf.ajax({
        type: "GET",
        url: '/MES/api/Parameter/GetAllParameterTypes',
        success: function (ret) {
            var Listdata = ret;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { ParameterTypeID: Listdata[i].ParameterTypeID, Name: Listdata[i].Name }
            }
            var treeData = [{ id: '', text: fields.AllParameterType, children: mf.deal.toTreeData(ret, 'ParameterTypeID', 'ParentID', 'children') }];
            treeData = eval(JSON.stringify(treeData).replace(/Name/g, 'text'));
            treeData = mf.deal.addCPropertyAndCopy(treeData, 'icon', 'iconCls', 'children')
            treeData = treeData.map(function (d) { d.icon = "fa fa-folder"; d.state = { "opened": true }; return d; });

            $("#TypeTree").jstree({
                "core":
               {
                   "data": treeData
               }
            }).bind("activate_node.jstree", function (obj, e) {

                model.parameterTypeID = e.node.original.ParameterTypeID;

                table.loadData();
            });
        }
    });

    //设置系统参数表格
    table = new mf.Table("#parameterTable", {
        uniqueId: "ParameterID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/Parameter/GetAllParameters',
                data: ({ tid: self.parameterTypeID }),
                success: function (data) {                    
                    parameters = data;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: window.innerHeight - 72,
        columns: [
            {
                field: 'Code', title: fields.Code, align: "center", width: "100",
                rander: new mf.TextRander({ size: 20, title: "title" }),
            },
           {
               field: 'Name', title: fields.Text, align: "center", width: "120",
               rander: new mf.TextRander({ size: 9, title: "title" }),
           },
            {
                field: 'ParentName', title: fields.SuperiorType, require: true, align: "center", width: "140",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'Comments', title: fields.DescribeDescription, align: "center", width: "160",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'IsEnable', title: fields.Isenable, align: "center", width: "90",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
            },
            {
                field: 'IsDefault', title: fields.IsDefaults, align: "center", width: "90",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
            },
            {
                field: 'Sequence', title: fields.Sorting, align: "center",
                rander: new mf.TextRander({ size: 9, title: "title" }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    //table.loadData();
};
var URL = "/Parameter";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "Text", "SuperiorType", "DescribeDescription", "Isenable", "IsDefaults", "Sorting", "AllParameterType",
    "PleaseSelectParameter", "info", "SortMoreZero", "TextIsNull", "parametersCanNotdelete", "IsDeleteParameters",
    "CanNotOwnUnits", "ParameterType", "Code", "CodeIsNull"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};