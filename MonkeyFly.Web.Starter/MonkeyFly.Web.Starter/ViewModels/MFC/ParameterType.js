var viewModel = function () {
    var self = this;

    this.unSelected = function () {
        $('#typeTable').find("tr").each(function () {
            $(this).removeClass("selected");
        });
    };

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });

        window.location.href = URL;
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //新增
    this.addClick = function () {

        mf.dialog('#AddDialog', {
            viewModel: function () {
                var addSelf = this;

                this.parents = ko.observable(mf.deal.filterProperties(types, ['ParameterTypeID as value', 'Name as text']));

                this.form = {
                    ParentID:ko.observable(),
                    Name:ko.observable(),
                    Sequence:ko.observable(),
                    Comments:ko.observable()
                };

                $("#addSave").click(function () {

                    if (!addSelf.form.Name()) {
                        msg.info('提示', '请填写类别名称');
                        return;
                    }

                    if (addSelf.form.Sequence() && !/^[0-9]*$/.test(addSelf.form.Sequence())) {
                        msg.info("提示", "排序，请输入≥0的数字！");
                        return;
                    }

                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Parameter/inserteType',
                        data: ko.toJSON(addSelf.form),
                        success: function (d) {
                         
                            if (d.status == "200") {
                                msg.success(
                              "提示",
                              d.msg,
                              function () {
                                  window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                  window.location.reload();
                              } );
                               
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

    //编辑
    this.editClick = function () {

        var uniqueId = $('#typeTable').find(".selected").data("uniqueid");
        var selectContent = $("#typeTable").bootstrapTable('getRowByUniqueId', uniqueId);

        mf.dialog('#EditDialog', {
            viewModel: function () {
                var editSelf = this;

                this.parents = ko.observable(mf.deal.filterProperties(types, ['ParameterTypeID as value', 'Name as text']));

                this.list = mf.deal.filterProperties(types, ['ParameterTypeID as id', 'ParentID as pid', 'Name as text']);
                this.tree = mf.deal.toTreeData(editSelf.list, "id", "pid", "children");

                this.form = {
                    ID: ko.observable(selectContent.ID),
                    ParameterTypeID: ko.observable(selectContent.ParameterTypeID),
                    Name: ko.observable(selectContent.Name),
                    ParentID: ko.observable(selectContent.ParentID),
                    Sequence: ko.observable(selectContent.Sequence),
                    Comments: ko.observable(selectContent.Comments)
                };

                this.ParentClick = function () {
                    var isChild = mf.deal.isInChild(editSelf.tree, editSelf.form.ParameterTypeID(), editSelf.form.ParentID());
                    if (isChild) {
                        msg.info("提示", "不能将自己或下级设为上级单位！");
                        editSelf.form.ParentID(selectContent.ParentID);
                        return;
                    }
                };

                $("#editSave").click(function () {
                    if (!editSelf.form.Name()) {
                        msg.info('提示', '请填写类别名称');
                        return;
                    }

                    if (editSelf.form.Sequence() && !/^[0-9]*$/.test(editSelf.form.Sequence())) {
                        msg.info("提示", "排序，请输入≥0的数字！");
                        editSelf.form.Sequence(selectContent.Sequence);
                        return;
                    } else if (!editSelf.form.Sequence()) {
                        editSelf.form.Sequence(selectContent.Sequence);
                    }

                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Parameter/updateType',
                        data: ko.toJSON(editSelf.form),
                        success: function (d) {
                           

                            if (d.status == "200") {
                                msg.success(
                               "提示",
                               d.msg,
                               function () {
                                   window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                   window.location.reload(); 
                               } );                              
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

    //删除
    this.deleteClick = function () {

        var uniqueId = $('#typeTable').find(".selected").data("uniqueid");

        if (!uniqueId) {
            msg.info('提示', '请选择需要删除的参数类别！');
            return;
        }

        var selectContent = $("#typeTable").bootstrapTable('getRowByUniqueId', uniqueId);

        if (!selectContent.IsSystem) {
            msg.info('提示', '该参数类别不能删除！');
            return;
        }

        msg.warning('警告', '删除该参数类别，该类别下的所有参数都将被删除', function () {
            //提交要删除的参数类别ID
            mf.ajax({
                type: 'post',
                url: '/MES/api/Parameter/deleteType',
                data: JSON.stringify(selectContent),
                success: function (d) {                  
                    if (d.status == "200") {
                        msg.success(
                       "提示",
                       d.msg,
                       function () {
                           window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                           window.location.reload();
                       });
                    }
                    else {
                        msg.error("提示", d.msg);
                    }
                }
            });
        });
    };
};

var URL = '/Parameter';
var MID = window.top.page_parameters.GetParameters(URL);

var types = [];

var formatterNumber = function (value, row, index) {
    return index + 1;
}

mf.ajax({
    type: 'get',
    url: '/MES/api/Parameter/GetAllParameterTypes',
    success: function (data) {

        types = data;

        $('#typeTable').bootstrapTable({
            data: data,
            columns: [
                { field: "Number", title: "序号", halign: 'center', align: 'center', formatter: formatterNumber, width: "50" },
                { field: 'Name', title: '类别名称', width: '16%', halign: 'center', align: 'center' },
                { field: 'ParentName', title: '上级类型', width: '16%', halign: 'center', align: 'center' },
                { field: 'Comments', title: '描述', width: '60%', halign: 'center', align: 'center' },
                { field: 'Sequence', title: '排序', halign: 'center', align: 'center' }
            ],
            uniqueId: 'ID',
            clickToSelect: true,
            undefinedText: "",
            height: $('#tb_list').height() - 43.5,
            onClickRow: function (row, tr, field) {
                model.unSelected();
                tr.addClass("selected");
            }
        });
    },
    error: function () {
        $('#typeTable').bootstrapTable({
            data: [],
            columns: [
                { field: "Number", title: "序号", halign: 'center', align: 'center', formatter: formatterNumber, width: "50" },
                { field: 'TypeName', title: '类别名称', width: '16%', halign: 'center' },
                { field: 'ParentName', title: '上级类型', width: '16%', halign: 'center' },
                { field: 'Comments', title: '描述', width: '60%', halign: 'center' },
                { field: 'Sequence', title: '排序', halign: 'center', align: 'center' }
            ],
            uniqueId: 'ID',
            clickToSelect: true,
            height: $('#tb_list').height() - 43.5,
            onClickRow: function (row, tr, field) {
                model.unSelected();
                tr.addClass("selected");
            }
        });
    }
});

var model = new viewModel();