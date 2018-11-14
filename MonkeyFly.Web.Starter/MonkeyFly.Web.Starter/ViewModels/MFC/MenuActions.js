var viewModel = function () {
    var self = this;

    this.unSelected = function () {
        $('#actionsTable').find("tr").each(function () {
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

                this.form = {
                    Code: ko.observable(),
                    Name: ko.observable(),
                    Icon: ko.observable(),
                    Sequence: ko.observable(),
                    Comments: ko.observable()
                };

                $("#addSave").click(function () {

                    if (!addSelf.form.Code()) {
                        msg.info('提示', '请填写操作按钮编码!');
                        return;
                    }
                    if (!addSelf.form.Name()) {
                        msg.info('提示', '请填写操作按钮名称!');
                        return;
                    }
                    if (!addSelf.form.Icon()) {
                        msg.info('提示', '请填写操作按钮图标!');
                        return;
                    }
                    if (!addSelf.form.Sequence()) {
                        msg.info('提示', '请填写排序!');
                        return;
                    }

                    if (!/^[0-9]*$/.test(addSelf.form.Sequence())) {
                        msg.info("提示", "排序，请输入≥0的数字！");
                        return;
                    }
                    
                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Menu/insertActions',
                        data: ko.toJSON(addSelf.form),
                        success: function (d) {
                            msg.success(
                                "提示",
                                d.msg
                            );

                            if (d.status == "200") {
                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                window.location.reload();
                            }
                        }
                    });
                });
            }
        });
    };

    //编辑
    this.editClick = function () {

        var uniqueId = $('#actionsTable').find(".selected").data("uniqueid");

        if (!uniqueId) {
            msg.info('提示', '请选择需要编辑的操作按钮！');
            return;
        }
        var selectContent = $("#actionsTable").bootstrapTable('getRowByUniqueId', uniqueId);

        mf.dialog('#EditDialog', {
            viewModel: function () {
                var editSelf = this;

                this.form = {
                    ID: ko.observable(selectContent.ID),
                    Code: ko.observable(selectContent.Code),
                    Name: ko.observable(selectContent.Name),
                    Icon: ko.observable(selectContent.Icon),
                    Sequence: ko.observable(selectContent.Sequence),
                    Comments: ko.observable(selectContent.Comments)
                };

                $("#editSave").click(function () {
                    if (!editSelf.form.Code()) {
                        msg.info('提示', '请填写操作按钮编码');
                        return;
                    }
                    if (!editSelf.form.Name()) {
                        msg.info('提示', '请填写操作按钮名称');
                        return;
                    }
                    if (!editSelf.form.Icon()) {
                        msg.info('提示', '请填写操作按钮图标');
                        return;
                    }
                    if (!editSelf.form.Sequence()) {
                        msg.info('提示', '请填写排序!');
                        return;
                    }

                    if (!/^[0-9]*$/.test(editSelf.form.Sequence())) {
                        msg.info("提示", "排序，请输入≥0的数字！");
                        return;
                    }

            


                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Menu/updateActions',
                        data: ko.toJSON(editSelf.form),
                        success: function (d) {
                            msg.success(
                                "提示",
                                d.msg
                            );

                            if (d.status == "200") {
                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                window.location.reload();
                            }
                        }
                    });
                });
            }
        });
    };

    //删除
    this.deleteClick = function () {

        var uniqueId = $('#actionsTable').find(".selected").data("uniqueid");

        if (!uniqueId) {
            msg.info('提示', '请选择需要删除的操作按钮！');
            return;
        }
        var selectContent = $("#actionsTable").bootstrapTable('getRowByUniqueId', uniqueId);
        
        msg.warning('警告', '确认要删除选中的操作按钮吗？', function () {
            //提交要删除的参数类别ID
            mf.ajax({
                type: 'post',
                url: '/MES/api/Menu/deleteActions',
                data: JSON.stringify(selectContent),
                success: function (d) {
                    msg.success(
                        "提示",
                        d.msg
                    );

                    if (d.status == "200") {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    }
                }
            });
        });
    };
};

var URL = '/Menu';
var MID = window.top.page_parameters.GetParameters(URL);

var formatterNumber = function (value, row, index) {
    return index + 1;
}

mf.ajax({
    type: 'Get',
    url: '/MES/api/Menu/GetActions',
    success: function (data) {

        $('#actionsTable').bootstrapTable({
            data: data,
            columns: [
                   { field: 'ID', title: '', visible: false },
                   { field: "Number", title: "序号", halign: 'center', align: 'center', formatter: formatterNumber, width: "50" },
                   { field: 'Code', title: '编码' },
                   { field: 'Name', title: '名称' },
                   { field: 'Icon', title: '图标' },
                   { field: 'Sequence', title: '排序', sortable: true },
                   { field: 'Comments', title: '备注说明' },
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