var viewModel = function () {
    var self = this;

    this.unSelected = function () {
        $('#memberTable').find("tr").each(function () {
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
        window.location.href = '/Role/ManageMember?MID=' + MID + '&ID=' + ID + '&Name=' + Name + '&Comments=' + Comments;
    };

    //新增
    this.addClick = function () {

        mf.dialog("#AddDialog", {

            viewModel: function () {

                var addSelf = this;

                mf.ajax({
                    type: 'GET',
                    url: '/MES/api/Role/GetOrganize/',
                    async: false,
                    success: function (d) {

                        var html = '<label style="font-size:1.5em;">机构成员：</label><div>';

                        for (var i = 0; i < d.length; i++) {

                            html += '<label class="checkbox-inline i-checks" style="width:17.96%;"><input type="checkbox" name="organizations" style="margin-top: 0 !important;" value="' + d[i].OrganizeCode + '" data-name="' + d[i].OrganizeName + '">' + d[i].OrganizeName + '</label>';

                            if ((i + 1) % 5 == 0) {
                                html += '</div><div>';
                            }
                        }

                        html += "</div>";

                        $('#organizations').html(html);

                        $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
                    }
                });

                mf.ajax({
                    type: 'GET',
                    url: '/MES/api/Role/GetUser/',
                    async: false,
                    success: function (d) {

                        var html = '<label style="font-size:1.5em;">用户成员：</label><div>';

                        for (var i = 0; i < d.length; i++) {

                            html += '<label class="checkbox-inline i-checks" style="width:17.96%;"><input type="checkbox" name="users" style="margin-top: 0 !important;" value="' + d[i].UserCode + '" data-name="' + d[i].UserName + '">' + d[i].UserName + '</label>';

                            if ((i + 1) % 5 == 0) {
                                html += '</div><div>';
                            }
                        }

                        html += "</div>";

                        $('#users').html(html);

                        $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
                    }
                });

                $("#addSave").click(function () {

                    var organizations = $('input[name="organizations"]:checkbox:checked');
                    var users = $('input[name="users"]:checkbox:checked');

                    var data = [];
                    for (var i = 0; i < organizations.length; i++) {

                        if (!$('#memberTable').bootstrapTable('getRowByUniqueId', $(organizations[i]).val())) {
                            data.push({ MemberCode: $(organizations[i]).val(), MemberName: $(organizations[i]).data("name"), MemberType: 'organize' });
                        }
                    }
                    for (var i = 0; i < users.length; i++) {
                        if (!$('#memberTable').bootstrapTable('getRowByUniqueId', $(users[i]).val())) {
                            data.push({ MemberCode: $(users[i]).val(), MemberName: $(users[i]).data("name"), MemberType: 'user' });
                        }
                    }

                    $('#memberTable').bootstrapTable('append', data);

                    $('#AddDialog').modal('hide');

                    self.saveClick();
                });
            }
        });
    };

    //删除
    this.deleteClick = function () {

        var uniqueId = $('#memberTable').find(".selected").data("uniqueid");

        if (!uniqueId) {
            msg.info('提示', "请选择要删除的记录！");
            return;
        }
        var selectContent = $("#memberTable").bootstrapTable('getRowByUniqueId', uniqueId);

        msg.warning('警告', '确认要删除选中的成员吗？', function () {

            $('#memberTable').bootstrapTable('removeByUniqueId', selectContent.MemberCode);

            self.saveClick();
        });
    };

    //保存
    this.saveClick = function () {
        var data = $('#memberTable').bootstrapTable('getData');

        mf.ajax({
            type: 'post',
            url: '/MES/api/Role/EditRoleMembers/',
            data: JSON.stringify({ id: ID, data: data }),
            success: function (d) {
                msg.success("提示", d.msg);

                if (d.status == "200") {
                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                    window.location.href = '/Role/ManageMember?MID=' + MID + '&ID=' + ID + '&Name=' + Name + '&Comments=' + Comments;
                }
            }
        });
    };
};

var URL = "/Role";
var MID = window.top.page_parameters.GetParameters(URL);

var formatterType = function (value, row, index) {
    return value == 'user' ? '用户' : '机构';
};

var formatterNumber = function (value, row, index) {
    return index + 1;
}

mf.ajax({
    type: 'get',
    url: '/MES/api/Role/GetRoleMembers',
    data: { id: ID },
    success: function (data) {
        $('#memberTable').bootstrapTable({
            data: data,
            columns: [
                { field: "Number", title: "序号", halign: 'center', align: 'center', formatter: formatterNumber, width: "50" },
                { field: 'MemberCode', title: '成员编号', halign: 'center', align: 'center' },
                { field: 'MemberName', title: '成员名称', halign: 'center', align: 'center' },
                { field: 'MemberType', title: '成员类型', halign: 'center', align: 'center', formatter: formatterType }
            ],
            uniqueId: 'MemberCode',
            clickToSelect: true,
            height: $('#tb_list').height() - 48.5,
            onClickRow: function (row, tr, field) {
                model.unSelected();
                tr.addClass("selected");
            }
        });
    }
});

var model = new viewModel();