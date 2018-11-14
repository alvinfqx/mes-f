var viewModel = function () {
    var self = this;

    this.unSelected = function () {
        $('#roleTable').find("tr").each(function () {
            $(this).removeClass("selected");
        });
    };

    //设置角色表格
    var table = new mf.Table("#roleTable", {
        uniqueId: "RoleID",
        editable: false,
        fn_getData: function (pagination, searchData, success) {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/Role/GetAll',
                success: function (data) {
                    success(data, data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        isFrozenColumn: true,
        operateColumWidth: "250px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:250px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="editPermissionClick" onclick="model.editPermissionClick(this)" title="' + fields.editPermission + '" ><i class="fa icon-set1"></i>' + fields.editPermission + '</button>&nbsp;&nbsp;' +
                '<button class="btn btn-success btn-xs" id="manageMemberClick" onclick="model.manageMemberClick(this)" title="' + fields.manageMember + '" ><i class="fa icon-users"></i>' + fields.manageMember + '</button>');
            return $td;
        },
        height: window.innerHeight - 120,
        columns: [
            {
                field: 'Name', title: fields.Name, require: true, align: "center", width: "210",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'Comments', title: fields.Comments, align: "center", width: "360",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "100",
                rander: new mf.SelectRander(param.PT0191213000001),
            },
            {
                field: 'Sequence', title: fields.Sequence, require: true, align: "center",
                rander: new mf.TextRander({ size: 19, title: "title" }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.RoleID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.Name + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled style="width: 176px; margin-right: 5px;" value="' + data.Name + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Comments + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Name,
                halign: 'center',
                align: 'center',
                width: "150",
                require: true
            },
            {
                field: 'Comments',
                title: fields.Comments,
                halign: 'center',
                align: 'center',
                width: "150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "6",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
        window.location.href = '/MES/Util/Languages';

        //table.goForwordSafely(function () {
        //    window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
        //    window.location.href = '/MES/Util/Languages';
        //}, null);
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //添加角色
    this.addClick = function () {
        mf.dialog('#AddDialog', {
            viewModel: function () {
                var addSelf = this;

                var html = '';
                for (var i = 0; i < param.PT0191213000001.length; i++) {
                    html += "<option value='" + param.PT0191213000001[i].value + "'>" + param.PT0191213000001[i].text + "</option>";
                }
                $("#addName").val("");
                $("#addSequence").val("");
                $("#addComments").val("");

                $("#Status").html(html);


                //提交数据
                $('#addSave').click(function () {
                    if (!$("#addName").val()) {
                        msg.info(tips.TipTitle, tips.AddName);
                        return;
                    }

                    if (!/^[0-9]*$/.test($("#addSequence").val())) {
                        msg.info(tips.TipTitle, tips.Sequence);
                        return;
                    }

                    var post = {};
                    post.Name = $("#addName").val();
                    post.Sequence = $("#addSequence").val();
                    post.Comments = $("#addComments").val();
                    post.Status = $("#Status").val();
                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Role/insert',
                        data: JSON.stringify(post),
                        success: function (d) {

                            if (d.status == "200") {
                                msg.success(tips.TipTitle, d.msg, function () {
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.error(tips.TipTitle, d.msg);
                            }
                        }
                    });
                });
            }
        });
    };

    //编辑角色
    this.editClick = function () {
        var selectContent = table.getSelectedData();
        if (!selectContent)
            return;

        //if (!uniqueId) {
        //    msg.info(tips.TipTitle, tips.IsSelected);
        //    return;
        //}

        mf.dialog('#EditDialog', {
            viewModel: function () {
                var editSelf = this;
                var html = '';
                for (var i = 0; i < param.PT0191213000001.length; i++) {
                    html += "<option value='" + param.PT0191213000001[i].value + "'>" + param.PT0191213000001[i].text + "</option>";
                }
                $("#editStatus").html(html);

                $("#editName").val(selectContent.Name);
                $("#editSequence").val(selectContent.Sequence);
                $("#editComments").val(selectContent.Comments);
                $("#editStatus").val(selectContent.Status);

                $("#editSave").click(function () {
                    if (!$("#editName").val()) {
                        msg.info(tips.TipTitle, tips.AddName);
                        return;
                    }

                    if (!/^[0-9]*$/.test($("#editSequence").val())) {
                        msg.info(tips.TipTitle, tips.Sequence);
                        return;
                    }

                    var post = {};
                    post.ID = selectContent.ID;
                    post.RoleID = selectContent.RoleID;
                    post.Name = $("#editName").val();
                    post.Sequence = $("#editSequence").val();
                    post.Comments = $("#editComments").val();
                    post.Status = $("#editStatus").val();

                    mf.ajax({
                        type: 'post',
                        url: '/MES/api/Role/update',
                        data: JSON.stringify(post),
                        success: function (d) {

                            if (d.status == "200") {
                                msg.success(tips.TipTitle, d.msg, function () {
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.error(tips.TipTitle, d.msg);
                            }
                        }
                    });
                });

            }
        });
    };

    //删除角色
    this.deleteClick = function () {
        var data = table.getSelectedData();
        if (!data)
            return;

        var uniqueId = data.RoleID;

        //if (!uniqueId) {
        //    msg.info(tips.TipTitle, tips.IsSelected);   
        //    return;
        //}
        msg.warning(tips.WarningTitle, tips.IsDeleted, function () {
            mf.ajax({
                type: 'post',
                url: '/MES/api/Role/delete',
                data: JSON.stringify(data),
                success: function (d) {

                    if (d.status == "200") {
                        msg.success(tips.TipTitle, d.msg, function () {
                            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            window.location.reload();
                        });
                    }
                    else {
                        msg.error(tips.TipTitle, d.msg);
                    }
                }
            });
        });
    };

    //编辑权限
    this.editPermissionClick = function (index) {

        var $tr = $(index).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(tips.TipTitle, tips.IsSelected);
            return;
        }
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.href = '/Role/EditPermission?ID=' + row.RoleID + '&Name=' + row.Name;

    };

    //管理成员
    this.manageMemberClick = function (index) {

        var $tr = $(index).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(tips.TipTitle, tips.IsSelected);
            return;
        }

        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.href = '/Role/ManageMember?ID=' + row.RoleID + '&Name=' + row.Name + '&Comments=' + row.Comments;

    };

};

var URL = "/Role";
var MID = window.top.page_parameters.GetParameters(URL);

var fields = GetField("/Data/tables/MFC/Role", "Role");
mf.toolBar('#container');

var actionBar = mf.actionBar();

var param = mf.format.getParameters('0191213000001');

var formatterAction = function (value, row, index) {
    return actionBar.replace(/Click\(\)/g, "Click\(\'" + row.RoleID + "\'\)");
};

var formatterNumber = function (value, row, index) {
    return index + 1;
}
var formatterStatus = function (value, row, index) {

    for (var i = 0; i < param.PT0191213000001.length; i++) {
        if (param.PT0191213000001[i].value == value)
            return param.PT0191213000001[i].text;
    }
    return "";
}

var model = new viewModel();