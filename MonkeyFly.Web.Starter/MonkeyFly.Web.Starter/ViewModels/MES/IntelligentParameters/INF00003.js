var viewModel = function () {
    var self = this;
    var ExportTotal, table = null, ID = null, Namearry = [], Deptarry = [];

    var formModel = {
        DepartmentID: ko.observable(),
        DepartmentArray: ko.observableArray()
    };
    ko.applyBindings(formModel);

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000051" },
        success: function (data) {
            var Listdata = data.PT0191213000051;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
        }
    });

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentParameter/Inf00003GetOrganization",
        success: function (data) {
            //alert(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                Deptarry[i] = { value: data[i].OrganizationID, text: data[i].Code }
            }
        }
    });

    formModel.DepartmentArray(Deptarry);

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
                $("#Organizationtree").bind("activate_node.jstree", function (obj, e) {
                    var currentNode = e.node;
                    ID = currentNode.original.OrganizationID;
                    table.loadData();
                }).jstree({
                    "core":
                   {
                       "data": treeNode
                   }
                });
            }
            else {
                $("#Organizationtree").html("&nbsp;<span>" + fields.DataIsNull + "</span>");
            }
           
        }
    });

    //设置帐号信息表格
    table = new mf.Table("#employeeTable", {
            uniqueId: "MESUserID",
            editable: false,
            paginationBar: new mf.PaginationBar("#paginagionBar"),
            fn_getData: function (pagination, searchData, success) {
                searchData.Code = $("#AccountNo").val();
                searchData.Status = $("#Status").val();
                searchData.OrganizationID = ID;
                searchData.DeptID = $("#DepartmentID").val();
                searchData.Account = $("#SearchAccount").val();
                searchData.UserName = $("#SearchUserName").val();

                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentParameter/Inf00003GetListV1',
                    data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                    success: function (data) {
                        ExportTotal = data.total;
                        //alert(JSON.stringify(data));
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success) {
            },
            LastWidth: "130",
            IsSetTableWidth: true,
            focusField: "Account",
            height: window.innerHeight - 145,
            isFrozenColumn: true,
            //operateColumWidth: "190px",
            operateColumWidth: "80px",
            fn_createBtn: function (data) {
                var $td = $("<td style='text-align:center; width:80px;'> ");
                $td.append('<button class="btn btn-success btn-xs" onclick="model.setRoleClick(this)" title="' + fields.setRole + '" >' + fields.setRole + '</button>');
                //'&nbsp;&nbsp;<button class="btn btn-success btn-xs" style="width:61px;" onclick="model.PersonalAuthorityClick(this)" title="' + fields.PersonalAuthority + '" >' + (fields.PersonalAuthority.length > 8 ? fields.PersonalAuthority.substring(0, 8) + "..." : fields.PersonalAuthority) + '</button>');
                return $td;
            },
            columns: [
                {
                    field: 'Account', title: fields.Account, align: "center",  width: "100",
                    rander: new mf.TextRander({ size: 9, title: "title" }),
                },
                {
                    field: 'UserName', title: fields.UserName, require: true, align: "center", width: "100",
                    rander: new mf.TextRander({ size: 19, title: "title" }),
                },
                {
                    field: 'EnglishName', title: fields.EnglishName, require: true, align: "center", width: "100",
                    rander: new mf.TextRander({ size: 19, title: "title" }),
                },
                {
                    field: 'Emplno', title: fields.Emplno, align: "center", width: "130",
                    rander: new mf.TextRander({ size: 19, title: "title" }),
                },
                {
                    field: 'OrganizationID', title: fields.Department, align: "center", width: "130",
                    rander: new mf.AutoSelectRander("value", "text", Deptarry, { title: true }),
                },
                {
                    field: 'Type', title: fields.Type, align: "center", width: "100",
                    rander: new mf.SelectRander(Namearry),
                },
                {
                    field: 'Status', title: fields.Status, align: "center", width: "80",
                    rander: new mf.SelectRander([{ value: 1, text: fields.normal }, { value: 0, text: fields.invalid }]),
                },
                {
                    field: 'Email', title: fields.Email, align: "center", width: "130",
                    rander: new mf.TextRander({ size: 19, title: "title" }),
                },
                {
                    field: 'CardCode', title: fields.CardCode, align: "center", width: "130",
                    rander: new mf.TextRander({ size: 19, title: "title" }),
                },
                {
                    field: 'Comments', title: fields.Comments, align: "center", width: "150",
                    rander: new mf.TextRander({ size: 19, title: "title" }),
                },
                {
                    field: 'Creator', title: fields.CreatePerson, align: "center", width: "100",
                    rander: new mf.StaticValueRander(),
                },
                {
                    field: 'CreateTime', title: fields.CreateDate, align: "center", width: "130",
                    rander: new mf.TextTimeRander(),
                },
                {
                    field: 'Modifier', title: fields.LastModifyPerson, align: 'center', width: "110",
                    rander: new mf.StaticValueRander(),
                },
                {
                    field: 'ModifiedTime', title: fields.LastModifyDate, align: "center", 
                    rander: new mf.TextTimeRander(),
                }
            ]
        });

    table.loadData();

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    // 删除
    this.deleteClick = function () {
        if (!table)
            return;

        var rowData = table.getSelectedData();
        if (!rowData)
            return;

        msg.warning(tips.info, tips.ComfirmDelete,
           function () {
               mf.ajax({
                   type: "post",
                   url: "/MES/api/IntelligentParameter/Inf00003Delete",
                   data: JSON.stringify({ MESUserID: rowData.MESUserID }),
                   success: function (data) {
                       if (data.status == "200") {
                           msg.success(tips.info, data.msg, function () {
                               window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                               window.location.reload();
                           });
                       }
                       else {
                           msg.error(tips.info, data.msg);
                       }
                   }
               });
           }, null);
        
    };

    //新增
    this.addClick = function () {

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: 1
        };

        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00003Add", Parameters: parameters });
        window.location.href = '/MES/IntelligentParameters/INF00003Add';
    };

    //编辑
    this.editClick = function () {
        var row = table.getSelectedData();

        if (!row) {
            msg.info(tips.info, tips.IsEdit);
            return;
        }

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: 0,
            row: row
        };

        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00003Edit", Parameters: parameters });
        window.location.href = '/MES/IntelligentParameters/INF00003Edit';
    };

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //设置机构
    //this.setOrganizeClick = function (obj) {

    //    var $tr = $(obj).parent().parent();        
    //    var row = table.getRowData($tr);

    //    if (!row) {
    //        msg.info(tips.info, tips.setOrganizeIsEdit);
    //        return;
    //    }
         
    //    mf.dialog('#SetOrganizeDialog', {
    //        viewModel: function () {
               
    //            //弹窗获取组织结构数据
    //            mf.ajax({
    //                type: 'GET',
    //                url: '/MES/api/User/GetOrganizeWithUserCheck/',
    //                async: false,
    //                data: { id: row.MESUserID },
    //                success: function (d) {

    //                    var html = '<div>';

    //                    for (var i = 0; i < d.length; i++) {

    //                        html += '<label class="radio-inline i-checks" style="width:17.96%;"><input type="radio" name="organizes" style="margin-top: 0 !important;" value="' + d[i].OrganizeCode + '"';

    //                        if (d[i].Checked == "true") {
    //                            html += 'checked'
    //                        }

    //                        html += '><span  style="width:60px;" title="' + d[i].OrganizeName + '">' + (d[i].OrganizeName.length > 8? d[i].OrganizeName.substring(0,8)+"...": d[i].OrganizeName) + '</span></label>';

    //                        if ((i + 1) % 5 == 0) {
    //                            html += '</div><div style="padding-top:3px;">';
    //                        }
    //                    }
    //                    html += "</div>";
    //                    $('#setOrganize').html(html);
    //                    $(".i-checks").iCheck({ radioClass: "iradio_square-blue" });
    //                }
    //            });
    //            //提交数据
    //            $('#setOrganizeSave').click(function () {

    //                var selected = $('input[name="organizes"]:radio:checked');

    //                if (selected.length == 0) window.location.reload();

    //                var Organize = [];
    //                for (var i = 0; i < selected.length; i++) {
    //                    Organize.push({ OrganizeCode: $(selected[i]).val() });
    //                }
    //                var form = { data: ko.toJS(Organize), id: row.MESUserID };
    //                mf.ajax({
    //                    url: '/MES/api/User/EditUserOrganizes',
    //                    data: JSON.stringify(form),
    //                    success: function (d) {

    //                        if (d.status == 200) {

    //                            msg.success(tips.info, d.msg, function () {
    //                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
    //                                window.location.reload();
    //                            });
    //                        }
    //                        else {
    //                            msg.success(tips.info, d.msg);
    //                        }

    //                    }
    //                })
    //            })
    //        }
    //    })
    //};

    //设置角色
    this.setRoleClick = function (obj) {

        var $tr = $(obj).parent().parent();        
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(tips.info, tips.setRoleIsEdit);
            return;
        }
        $("#SetRoleDialog").modal("show");
        //获取角色数据
        mf.ajax({
            type: 'GET',
            url: '/MES/api/User/GetRoleWithUserCheck/',
            async: false,
            data: { id: row.MESUserID },
            success: function (d) {

                var html = '<div>';

                for (var i = 0; i < d.length; i++) {

                    html += '<label class="checkbox-inline i-checks" style="width:17.96%;"><input type="checkbox" name="roles" style="margin-top: 0 !important;" value="' + d[i].RoleCode + '"';

                    if (d[i].Checked == "true") {
                        html += 'checked'
                    }

                    html += '><span  style="width:60px;" title="' + d[i].RoleName + '">' + (d[i].RoleName.length > 8 ? d[i].RoleName.substring(0, 8) + "..." : d[i].RoleName) + '</span></label>';

                    if ((i + 1) % 5 == 0) {
                        html += '</div><div style="padding-top:4px;">';
                    }
                }

                html += "</div>";

                $('#setRoles').html(html);

                $(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue" });
            }
        });
        //提交数据
        $("#setRoleSave").unbind();
        $("#setRoleSave").click(function () {
            var selected = $('input[name="roles"]:checkbox:checked');
           
            if (selected.length == 0) {
                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                window.location.reload();
            }
            
            var roles = [];
            for (var i = 0; i < selected.length; i++) {
                roles.push({ RoleCode: $(selected[i]).val() });
            }

            var form = { data: ko.toJS(roles), id: row.MESUserID };
            
            mf.ajax({
                url: '/MES/api/User/EditUserRoles',
                data: JSON.stringify(form),
                success: function (d) {
                    if (d.status == "200") {
                        msg.success(
                            tips.info,
                            d.msg,
                            function () {
                                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                window.location.reload();
                            }
                        );
                    }
                    else {
                        msg.error(
                            tips.info,
                            d.msg
                        );
                    }
                }
            });

        });

        //mf.dialog('#SetRoleDialog', {
        //    viewModel: function () {               
        //    }
        //});

    };

    //設置權限
    this.PersonalAuthorityClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        window.top.page_parameters.Caching.push({ URL: URL, Parameters: { MID: MID, MESUserID: row.MESUserID, Account: row.Account, Name: row.UserName } });
        window.location.href = "/MES/IntelligentParameters/INF00003PersonalAuthority";
    };

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(tips.info, tips.NoDataExport);
            return;
        }
        var Code = $("#AccountNo").val();
        var Status = $("#Status").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/UserExport?Token=' + token + '&Code=' + Code + '&Status=' + Status;
    };

    //导入    
    this.importClick = function () {
        mf.dialog("#inputDialog", {
            viewModel: function () {
                var importSelf = this;
                $("#FileName").text(fields.PleaseSelectFile);
                $("#BtnFile").val("");

                $("#BtnFile").unbind();
                $("#BtnBrowse").unbind();
                $("#addFile").unbind();

                $("#BtnFile").change(function () {
                    var fileName = $("#BtnFile").val();
                    if (fileName && fileName.length > 0) {
                        $("#FileName").text(fileName);
                    }
                    else {
                        $("#FileName").text(fields.PleaseSelectFile);
                    }
                });
                $("#BtnBrowse").click(function () {
                    $("#BtnFile").click();
                });
                $('#addFile').click(function () {

                    var formdata = new FormData();
                    formdata.append("file", document.getElementById('BtnFile').files[0]);
                    formdata.append("Token", window.top.mf.token);

                    var Tips = fields.PleaseSelectFile;

                    if (!(document.getElementById('BtnFile').files[0])) {
                        msg.info(tips.info, Tips)
                        return;
                    }

                    $.ajax({
                        type: 'POST',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00003Import',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            //if (d.status == 200) {
                            //    msg.success(tips.info, d.msg, function () {
                            //        $('#inputDialog').modal('hide');
                            //        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                            //        window.location.reload();
                            //    });
                            //}
                            //else {
                            //    msg.info(tips.info, d.msg);
                            //}
                            if (d.Isreason) {
                                msg.infoCall(tips.info, d.msg, function () {
                                    window.location.href = mf.domain + '/MES/api/Util/ImportDownload?Token=' + token + '&Name=' + d.FileName;
                                    $('#inputDialog').modal('hide');
                                    table.loadData();
                                });                               
                            }
                            else {
                                msg.success(tips.info, d.msg, function () {
                                      $('#inputDialog').modal('hide');
                                      table.loadData();
                                });
                            }
                            
                        }
                    });
                })
            }
        });
    };

}

var URL = "/MES/IntelligentParameters/INF00003";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00003", "INF00003");

var model = new viewModel();