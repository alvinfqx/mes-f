var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal, Namearry = [], Plantarry = [], ParentID, PlantID, ID;

    //获取部门属性下拉框
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000054" },
        success: function (data) {
            var Listdata = data.PT0191213000054;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
        }
    });

    //获取厂别下拉框
    mf.ajax({
        type: 'Get',
        url: '/MES/api/PopUp/GetPlantList',
        data: ({ page: 1, rows: 10000 }),
        async: false,
        success: function (data) {
            var PlantList = data.rows;
            for (var i = 0; i < PlantList.length; i++) {
                Plantarry[i] = { value: PlantList[i].OrganizationID, text: PlantList[i].NewName }
            }
        }
    });

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };
    //刷新
    this.refreshClick = function () {
        if (!table)
            return;
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };
    //添加
    this.addClick = function () {
        if (!table)
            return;
        table.addRow();
    }
    //编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };
    //删除
    this.deleteClick = function () {
        if (!table)
            return;
        table.deleteRow();
    };
    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.OrganizationID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var Type = data.Type;
        if (Type.substring(5, Type.length) != "020121300001D") {
            msg.info(fields.info, fields.PlantIDIsError);
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.DepartmentNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.DepartmentDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.DepartmentDescription,
                halign: 'center',
                align: 'center',
                width: "150",
                require: true
            },
            {
                field: 'Comments',
                title: fields.Remark,
                halign: 'center',
                align: 'center',
                width: "150"
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "5",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var Code = $("#Code").val();
        var Status = $("#Status").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00005Export?Token=' + token + '&Code=' + Code + '&Status=' + Status;
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


                    $.ajax({
                        type: 'POST',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00005Import',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            if (d.status == 200) {
                                msg.success(fields.info, d.msg, function () {
                                    $('#inputDialog').modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.info(fields.info, d.msg);
                            }
                        }
                    });
                })
            }
        });
    };
    //部门结构    
    this.deptStructureClick = function () {
        mf.dialog('#OrganizationDialog', {
            viewModel: function () {
                $("#gridlist").text(fields.DataIsNull);
            }
        });
    };

    //设置弹窗部门表格
    var DeptTable = new mf.Table("#DeptTable", {
        uniqueId: "OrganizationID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDeptBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#DepartmentNo").val();
            if (PlantID == "") {
                PlantID = 1;
            }
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetDeptList',
                data: ({ page: pagination.page, rows: pagination.rows, Plant: PlantID, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        LastWidth: "90",
        height: 350,
        columns: [
            {
                field: 'Code', title: fields.DepartmentNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'Type', title: fields.DepartmentType, align: "center", width: "120",
                rander: new mf.SelectRander(Namearry),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: "title" }),
            },
            {
                field: 'PlantID', title: fields.Site, align: "center", width: "120",
                rander: new mf.SelectRander(Plantarry),
            },
            {
                field: 'IfTop', title: fields.TopLevelNotation, align: "center",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
            }
        ]
    });

    //设置弹窗厂部表格
    var OrgDeptTable = new mf.Table("#OrgDeptTable", {
        uniqueId: "OrganizationID",
        editable: false,
        paginationBar: new mf.PaginationBar("#paginagionOrgDeptBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#OrgDepartmentNo").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetPlantList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        height: 350,
        columns: [
            {
                field: 'Code', title: fields.SiteCode, align: "center", width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 10, title: "title" })),
            },
            {
                field: 'Name', title: fields.SiteDescription, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "165",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 120, title: "title" })),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });

    //未使用
    var UnusedTable = new mf.Table("#UnusedTable", {
        uniqueId: "ID",
        noNumColumn: true,
        dblclick_editable: false,
        LastWidth: "72",
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00005NoClassList',
                data: { OrganizationID: ID },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Name",
        height: 390,
        columns: [
            {
                field: 'Code', title: fields.ShiftNo, align: "center", width: "80",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Name', title: fields.ShiftDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'OnTime', title: fields.WorkingTime, align: "center", width: "70",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'OffTime', title: fields.OffHours, align: "center", width: "70",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });

    //使用
    var UsedTable = new mf.Table("#UsedTable", {
        uniqueId: "ID",
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        LastWidth: "72",
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00005ClassList',
                data: { OrganizationID: ID },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        focusField: "Name",
        height: 390,
        columns: [
             {
                 field: 'Code', title: fields.ShiftNo, align: "center", width: "80",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
             },
            {
                field: 'Name', title: fields.ShiftDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'OnTime', title: fields.WorkingTime, align: "center", width: "70",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'OffTime', title: fields.OffHours, align: "center", width: "70",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });

    //设置表格
    table = new mf.Table("#DepartmentTable", {
        uniqueId: "OrganizationID",
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00005GetList',               
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Status: Status }),
                success: function (data) {
                    ExportTotal = data.total;
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00005Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var Type = null, IfTop = null;
            IfTop = data['IfTop'];
            Type = data['Type'];
            if (Type != null) {
                Type = Type.substring(5, Type.length);
            }
            PlantID = data['PlantID'];
            var $PlantIDEditingCell = $row.find("#PlantID");
            var $IfTopEditingCell = $row.find("#IfTop");
            var $ParentCodeClickEditingCell = $row.find("#ParentCode button");
            var $TypeEditingCell = $row.find("#Type");
            var $ClassSetbuttonEditingCell = $row.find("#ClassSet");
            
            if (Type == "020121300001D" || Type == null) {
                $ParentCodeClickEditingCell.attr('disabled', false);
                $PlantIDEditingCell.attr('disabled', false);
                $IfTopEditingCell.attr('disabled', false);
                if (!IfTop) {
                    $ParentCodeClickEditingCell.attr('disabled', false);
                }
                else {
                    $ParentCodeClickEditingCell.attr('disabled', true);
                }
            }
            else {
                $ParentCodeClickEditingCell.attr('disabled', true);
                $PlantIDEditingCell.attr('disabled', true);
                $IfTopEditingCell.attr('disabled', true);               
            }
            if (isAdding) {
                $TypeEditingCell.attr('disabled', true);
                $ClassSetbuttonEditingCell.attr('disabled', true);
            }
            else {
                $TypeEditingCell.attr('disabled', false);
                $ClassSetbuttonEditingCell.attr('disabled', false);
            }
        },
        operateColumWidth: "90px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:90px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="ClassSet" onclick="model.ClassSetClick(this)" title="' + fields.ClassSet + '" >' + fields.ClassSet + '</button>');
            return $td;
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentParameter/Inf00005Delete",
                data: JSON.stringify({ OrganizationID: rowData.OrganizationID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        focusField: "Code",
        focusEditField: "PlantID",
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.DepartmentNo, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size:6, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DepartmentNoIsNull)
                ],
            },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center", width: "150",
                rander: new mf.TextRander({ size: 16, maxLength: 60, title: "title" }),
            },
            {
                field: 'Type', title: fields.DepartmentType, align: "center", width: "120",visible:false,
                rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(Namearry)),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var Type = table.getEditingColumnValue($row, 'Type');
                    var $PlantIDEditingCell = $row.find("#PlantID");
                    var $IfTopEditingCell = $row.find("#IfTop");
                    var $ParentCodeClickEditingCell = $row.find("#ParentCode button");
                    if (Type.substring(5, Type.length) == "020121300001D") {
                        $ParentCodeClickEditingCell.attr('disabled', false);
                        $PlantIDEditingCell.attr('disabled', false);
                        $IfTopEditingCell.attr('disabled', false);                       
                    }
                    else {
                        $ParentCodeClickEditingCell.attr('disabled', true);
                        $PlantIDEditingCell.attr('disabled', true);
                        $IfTopEditingCell.attr('disabled', true);
                        table.setEditingColumnValue($row, "PlantID", null);
                        table.setEditingColumnValue($row, "IfTop", false);
                        table.setEditingColumnValue($row, "ParentCode", null);
                        ParentID = null;
                    }
                }
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, maxLength: 120, title: "title" }),
            },
            {
                field: 'PlantID', title: fields.Site, align: "center", width: "120",
                rander: new mf.AutoSelectRander("value", "text", Plantarry, { noSearchSelectedText: "", title: true, MaxWidth: "110px" }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    PlantID = table.getEditingColumnValue($row, 'PlantID');
                }
            },
            {
                field: 'IfTop', title: fields.TopLevelNotation, align: "center", width: "90",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var IfTop = table.getEditingColumnValue($row, 'IfTop');
                    var Code = table.getEditingColumnValue($row, 'Code');
                    var $ParentCodeClickEditingCell = $row.find("#ParentCode button");
                    if (!IfTop) {
                        $ParentCodeClickEditingCell.attr('disabled', false);
                        ParentID = null;
                        table.setEditingColumnValue($row, "ParentCode", "");
                    }
                    else {
                        $ParentCodeClickEditingCell.attr('disabled', true);
                        table.setEditingColumnValue($row, "ParentCode", Code);
                    }
                }
            },
            {
                field: 'ParentCode', title: fields.UpperLevelDepartment, align: "center", width: "150",
                rander: new mf.FKRander("#DepartmentDialog",
                                         "#DepartmentDialog #commit",
                                         DeptTable,
                                         new mf.TextRander(
                                             {
                                                 size: 9, readonly: 'readonly'
                                             }
                                         ),
                                         {
                                             btnTitle: "",
                                             btnClass: "btn btn-success btn-xs",
                                         }),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    table.setEditingColumnValue($row, "ParentCode", e.data.Code);
                    ParentID = e.data.OrganizationID;
                }
            },
            {
                field: 'ParentOrganizationID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ParentID;
                })
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", 
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

    //显示班别设定
    this.ClassSetClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.Isedit);
            return;
        }

        table.goForword(function () {
            mf.dialog('#ClassSetDialog', {
                viewModel: function () {
                    $("#DeptCode").val(row.Code);
                    $("#DeptName").val(row.Name);
                    $("#DeptCode").attr("title", row.Code);
                    $("#DeptName").attr("title", row.Name);
                    ID = row.OrganizationID;
                    UnusedTable.loadData();
                    UsedTable.loadData();
                }
            })
        }, function () {
            mf.dialog('#ClassSetDialog', {
                viewModel: function () {
                    $("#DeptCode").val(row.Code);
                    $("#DeptName").val(row.Name);
                    $("#DeptCode").attr("title", row.Code);
                    $("#DeptName").attr("title", row.Name);
                    ID = row.OrganizationID;
                    UnusedTable.loadData();
                    UsedTable.loadData();
                }
            })
        });

        
    };

    //已使用全选
    this.checkboxChangeClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });
        }
    };

    //未使用全选
    this.checkboxClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });
        }
    };

    //右移
    this.ProcessMoveRightClick = function () {
        var rowDataLeftArray = [];
        var $selectedRows = UnusedTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = UnusedTable.getRowData($selectedRow); // 拿对应的行数据
            //alert("右移" + JSON.stringify(rowData));
            rowDataLeftArray.push(rowData);
            UsedTable.pushRow(rowData);
        });

        UnusedTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //左移
    this.ProcessMoveLeftClick = function () {
        var rowDataRightArray = [];
        var $selectedRows = UsedTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = UsedTable.getRowData($selectedRow); // 也可以拿对应的行数据
            //alert("左移" + JSON.stringify(rowData));
            rowDataRightArray.push(rowData);
            UnusedTable.pushRow(rowData);
        });
        UsedTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //班别设定保存
    this.detailSaveClick = function () {
        var SaveData = {};
        var Data = UsedTable.getAllRowData();
        SaveData.data = Data;
        SaveData.OrganizationID = ID;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00005ClassSave',
            data: JSON.stringify(SaveData),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        UsedTable.loadData();
                        UnusedTable.loadData();
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }

            }
        });
    }

    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    };

    //查询
    this.SiteCodeSearch = function () {
        var PlantCode = $("#SiteCode").val();
        mf.ajax({
            type: "GET",
            url: '/MES/api/IntelligentParameter/Inf00005GetDeptList',
            data: ({ PlantCode: PlantCode }),
            async: false,
            success: function (data) {
                var wrapper = $("#gridlist").empty();
                if (data != "") {                    
                    var treeData = mf.deal.toTreeData(data, "OrganizationID", "ParentOrganizationID", "children");
                    var tb = renderTreeGraph(treeData);
                    tb.appendTo(wrapper);
                }
                else {
                    $("#gridlist").text(fields.DataIsNull);
                }

            }
        });

    };

    //组织结构部门弹窗
    this.DepartmentSearch = function () {
        mf.dialog('#OrgDepartmentDialog', {
            viewModel: function () {
                OrgDeptTable.loadData();
                $("#OrgCommit").click(function () {
                    var row = OrgDeptTable.getSelectedData();
                    if (row) {
                        $('#SiteCode').val(row.Code);
                        $("#OrgDepartmentDialog").modal("hide");
                    }
                })
            }
        });
    };

    //表格部门查询
    this.CodeSearch = function () {
        DeptTable.goForwordSafely(function () {
            DeptTable.loadData(null, null, 1);
        }, null);
    };

    //弹窗部门查询
    this.OrgCodeSearch = function () {
        OrgDeptTable.goForwordSafely(function () {
            OrgDeptTable.loadData(null, null, 1);
        }, null);
    };

    //清除数据
    this.clearData = function () {
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    }

}

var URL = "/MES/IntelligentParameters/INF00005";

var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "DepartmentNo", "DepartmentDescription", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "deptStructure", "DepartmentNoIsNull","SiteCode",
    "DepartmentType", "Site", "IfTop", "UpperLevelDepartment", "Comfirm", "DepartmentFile", "TopLevelNotation","Unused",
    "PlantIDIsError", "DataIsNull", "SiteDescription", "SiteIsNull", "ClassSet", "DeptClassSetTable", "Used", "Isedit",
    "ShiftNo", "ShiftDescription", "WorkingTime", "OffHours", "Close"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
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