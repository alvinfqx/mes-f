var viewModel = function () {
    var self = this;
    var table = null, ExportTotal, ID;

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    // 刷新
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

    // 添加
    this.addClick = function () {
        if (!table)
            return;
        table.addRow();
    }

    // 编辑
    this.editClick = function () {
        if (!table)
            return;

        table.editRow();
    };

    // 删除
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

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var Code = $("#Code").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00024Export?Token=' + token + '&Code=' + Code;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00024Import',
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

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.ParameterID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.PropertyNumber + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Description + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Description,
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

    //设置资料值表格
    var DataValueTable = new mf.Table("#DataValueTable", {
        uniqueId: "ParameterID",
        editable: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00024DetailsGetList',
                data: { page: pagination.page, rows: pagination.rows, ParameterID: ID },
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00024DetailsSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        focusField: "Name",
        height: 400,
        LastWidth: "130",
        columns: [
            {
                field: 'Name', title: fields.Datavalue, align: "center", width: "110", require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DatavalueIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "165",
                rander: new mf.TextRander({ size: 16, maxLength: 120, title: "title" }),
            },
            {
                field: 'ParentParameterID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                        return ID;
               })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });

    //设置属性表格
    table = new mf.Table("#PropertyTable", {
        uniqueId: "ParameterID",
        isFrozenColumn: true,        
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00024GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                    //console.log(JSON.stringify(data))
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00024Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var IsDefault = data['IsDefault'];
            var $DatavalueClickEditingCell = $row.find("#DatavalueClick");
            if (isAdding || !IsDefault) {
                $DatavalueClickEditingCell.attr('disabled', true);
            }
            else {
                $DatavalueClickEditingCell.attr('disabled', false);
            }
        },
        operateColumWidth:"80px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="DatavalueClick" onclick="model.DetailsClick(this)" title="资料值" >' + fields.Datavalue + '</button>');
            return $td;
        },
        focusField: "Code",
        focusEditField: "IsDefault",
        height: window.innerHeight - 148,
        LastWidth: "130",
        IsSetTableWidth: true,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {

            //料品主檔inf00010”及现场管制模块是否使用该料品属性
    
                        //执行删除
            var ID = rowData.ParameterID;
            var data = {};
            data.ParameterID = ID;
            data.Token = token;
            console.log(JSON.stringify(data))
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00024Delete",
                data: JSON.stringify(data),
                success: function (data) {
                   
                    success(data);
                }
            });
                   
        },
        columns: [
            {
                field: 'Code', title: fields.PropertyNumber, align: "center", require: true, width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 9, maxLength: 20, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.PropertyNumberIsNull)
                ],
            },
            {
                field: 'Name', title: fields.Description, require: true, align: "center", width: "160",
                rander: new mf.TextRander({ size: 15, maxLength: 60, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DescriptionIsNull)
                ],
            },
            {
                field: 'IsDefault', title: fields.ManualEntry, align: "center", width: "70",
                rander: new mf.SingleCheckBoxRander({ yes: true, no: false }),
                //rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
                //fn_onEditingChange: function (table, $row, $cell, field, e) {
                //    var ManualEntry = table.getEditingColumnValue($row, 'IsDefault');
                //    var $DatavalueClickEditingCell = $row.find("#DatavalueClick");
                //    if (!ManualEntry) {
                //        $DatavalueClickEditingCell.attr('disabled', true);
                //    }
                //    else {
                //        $DatavalueClickEditingCell.attr('disabled', false);
                //    }
                //}
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "170",
                rander: new mf.TextRander({ size: 17, maxLength: 120, title: "title" }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: 90,
                rander: new mf.AutoSelectRander("value", "text", [{ value: 0, text: fields.Normal }, { value: 1, text: fields.Invalid }], {
                title:"title"})
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander({ title: "title" }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: "title" }),
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();


    //清除数据
    this.clearInput = function (ID) {
        $(ID).val("");
    }

    //资料值
    this.DetailsClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

   
        table.goForwordSafely(function () {
            mf.dialog('#DatavalueDialog', {
                viewModel: function () {
                    $("#PropertyNumber").val(row.Code);
                    $("#Description").val(row.Name);
                    $("#PropertyNumber").attr("title", row.Code);
                    $("#Description").attr("title", row.Name);
                    ID = row.ParameterID;
                    DataValueTable.loadData();
                    //提交数据
                    $("#DatavalueCommit").click(function () {
                        DataValueTable.save(null, null, true);
                    })
                }
            })


        }, null);
        
    }

    // 资料值添加
    this.addDataClick = function () {
        DataValueTable.addRow();
    }

    // 资料值编辑
    this.editDataClick = function () {
        DataValueTable.editRow();
    };

    // 资料值删除
    this.deleteDataClick = function () {
        DataValueTable.deleteRow();
    };

    //资料值关闭
    this.CleartableClick = function () {
        if (!DataValueTable)
            return;
        DataValueTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#DatavalueDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#DatavalueDialog').modal("hide");
        }, fields.Isleave);
    };

}

var URL = "/MES/IntelligentParameters/INF00024";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "PropertyNumber", "Datavalue", "Description", "Cancel", "New", "Change", "Deletion", "Comfirm",
    "ManualEntry", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "PropertyDatavalue",
    "Save", "Import", "Description", "Remark", "PropertyNumberIsNull", "info", "PropertyNumberIsEdit",
    "DescriptionIsNull", "yes", "no", "DatavalueIsNull", "NoDataExport", "PleaseSelectFile", "Browse",
    "Isleave", "CodeUsedCannotDelete", "Normal", "Invalid", "Status", "Prompt"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};