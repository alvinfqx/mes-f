var viewModel = function () {
    var self = this;
    var table = null, ExportTotal, ID, Namearry = [], ItemID;

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
        var Status = $("#Status").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Qcs00003Export?Token=' + token + '&Code=' + Code + '&Status=' + Status;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Qcs00003Import',
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
            '&nbsp;<label>' + fields.CheckGroupCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.CheckGroupName + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.CheckGroupName,
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

    //未归属
    var NoItemSetTable = new mf.Table("#NoItemSetTable", {
        uniqueId: "ID",
        noNumColumn: true,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#paginagionNoItemSetBar"),
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};

            var startCode = $("#StartCode").val();
            if (startCode && startCode.length > 0)
                searchData.StartCode = startCode + "";

            var endCode = $("#EndCode").val();
            if (endCode && endCode.length > 0)
                searchData.EndCode = endCode + "";

            searchData.GroupID = ID;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00003ItemListV2',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        fn_paginationBarisload:function(){
            if (NoItemSetTable.hasChange()) {
                return false;
            }
            else {
                return true;
            }
        },
        fn_paginationBarClick:function(){
            msg.warning(fields.info,
                    fields.SaveOrNot,
                    function () {
                        self.detailSaveClick();
                    }, null);
        },
        focusField: "Name",
        height: 370,
        columns: [
            {
                field: 'Code', title: fields.ItemNo, align: "center", width: "90",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Type', title: fields.SupplyForm, align: "center", width: "80",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });

    //归属
    var ItemSetTable = new mf.Table("#ItemSetTable", {
        uniqueId: "ID",
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00003DetailsListV2',
                data: { GroupID: ID },
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
                field: 'Code', title: fields.ItemNo, align: "center", width: "90",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Type', title: fields.SupplyForm, align: "center", width: "80",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.ItemDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: "title" })),
            },
            {
                field: 'Specification', title: fields.ItemSpecification, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
        ]
    });

    //设置表格
    table = new mf.Table("#QCS00003Table", {
        uniqueId: "ParameterID",
        isFrozenColumn: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();
            var Status = $("#Status").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00003GetList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, Status: Status }),
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00003Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var $DatavalueClickEditingCell = $row.find("#DatavalueClick");
            if (isAdding) {
                $DatavalueClickEditingCell.attr('disabled', true);
            }
            else {
                $DatavalueClickEditingCell.attr('disabled', false);
            }
        },
        operateColumWidth: "80px",
        LastWidth: "130",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="DatavalueClick" onclick="model.DetailsClick(this)" title="' + fields.ItemSetting + '" >' + fields.ItemSetting + '</button>');
            return $td;
        },
        focusField: "Code",
        focusEditField: "IsEnable",
        IsSetTableWidth: true,
        height: window.innerHeight - 130,
        columns: [
            {
                field: 'Code', title: fields.CheckGroupCode, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 7, maxLength: 30, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CheckGroupCodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.CheckGroupName, require: true, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 13, maxLength: 120, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CheckGroupNameIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 120, title: "title" })),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
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

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();


    //清除数据
    this.clearData = function () {
        $("#StartCode").val("");
        $("#EndCode").val("");
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    }

    //料品设定
    this.DetailsClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.Isedit);
            return;
        }

        ID = row.ParameterID;
        NoItemSetTable.loadData();
        ItemSetTable.loadData();
        $("#CheckGroupCode").val(row.Code);
        $("#CheckGroupName").val(row.Name);
        $("#CheckGroupCode").attr("title", row.Code);
        $("#CheckGroupName").attr("title", row.Name);        
        $('#ItemSetDialog').modal("show");

        //mf.dialog('#ItemSetDialog', {
        //    viewModel: function () {
                           
        //    }
        //})

    }

    //已归属全选
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

    //未归属全选
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
        var $selectedRows = NoItemSetTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = NoItemSetTable.getRowData($selectedRow); // 拿对应的行数据
            //alert("右移" + JSON.stringify(rowData));
            rowDataLeftArray.push(rowData);
            ItemSetTable.pushRow(rowData);
        });

        NoItemSetTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //左移
    this.ProcessMoveLeftClick = function () {
        var rowDataRightArray = [];
        var $selectedRows = ItemSetTable.getMultiSelectedRows();
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ItemSetTable.getRowData($selectedRow); // 也可以拿对应的行数据
            //alert("左移" + JSON.stringify(rowData));
            rowDataRightArray.push(rowData);
            NoItemSetTable.pushRow(rowData);
        });
        ItemSetTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //弹窗查询
    this.ItemSearchClick = function () {
        if (NoItemSetTable.hasChange()) {
            msg.warning(fields.info,
                    fields.SaveOrNot,
                    function () {
                        self.detailSaveClick();
                    }, function () {
                        // 取消查询
                    });
        }
        else {
            NoItemSetTable.loadData(null, null, 1);
            ;
        }
    }

    //弹窗保存
    this.detailSaveClick = function () {
        var SaveData = {};
        var Data = ItemSetTable.getAllRowData();
        SaveData.data = Data;
        SaveData.GroupID = ID;
        console.log(SaveData);
        mf.ajax({
            type: 'Post',
            url: '/MES/api/QualityManagement/Qcs00003DetailsSaveV2',
            data: JSON.stringify(SaveData),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        ItemSetTable.loadData();
                        NoItemSetTable.loadData();
                    });                    
                }
                else {
                    msg.error(fields.info, data.msg);
                }
                
            }
        });
    }

}

var URL = "/MES/QualityManagement/QCS00003";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar('#container');

var arrayWord = [
    "CheckGroupCode", "ItemSetting", "CheckGroupName", "Cancel", "New", "Change", "Deletion", "Comfirm",
    "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "PropertyDatavalue","Search","info",
    "Save", "Import", "Description", "Remark", "StartItemCode", "EndItemCode", "NotAttribution",
    "Attribution", "Normal", "Invalid", "NoDataExport", "PleaseSelectFile", "Browse", "Status",
    "Isedit", "ItemNo", "SupplyForm", "ItemDescription", "ItemSpecification", "SaveOrNot",
    "CheckGroupCodeIsNull", "CheckGroupNameIsNull"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};