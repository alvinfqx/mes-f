var URL = "/MES/IntelligentParameters/INF00021";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar("#container");
var model = null;
var viewModel = function () {
    var self = this;
    var table = null;
    var flag = true;
    var DetailTable = null, ProcessTable = null, ProcessChangeTable = null;
    var ExportTotal, group_id, detail_id, group_process_id,ID="";
    var form = {
        ProcessAlternateGroup: ko.observable(),       
        Status: ko.observable(),
        StatusArray: ko.observableArray(),
    }
      
    ko.applyBindings(form);
    form.StatusArray([
        { value: 1, text: fields.Normal },
        { value: 0, text: fields.Invalid }
    ]);

    //製程替代群組維護表
    table = new mf.Table("#ProcessAlternateGroupTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        height: window.innerHeight - 128,
        focusField: "Code",
        LastWidth: "133",
        IsSetTableWidth: true,
        fn_onEditingRowRandFinish: function ($row, isAdding, data) {
            var IsEnable = data['IsEnable'];
            var $DatavalueClickEditingCell = $row.find("#Details");
            if (isAdding || !IsEnable) {
                $DatavalueClickEditingCell.attr('disabled', true);
            }
            else {
                $DatavalueClickEditingCell.attr('disabled', false);
            }
        },
        operateColumWidth: "80px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center;width:80px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="Details" onclick="model.DetailClick(this)" title="' + fields.Details + '" >' + fields.Details + '</button>');
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = form.ProcessAlternateGroup();
            searchData.Status = form.Status();
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00021GetList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    ExportTotal = data.total;
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00021Save",
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_onRowClick:function(data){
            ID = data.ParameterID;
        },
        isRealDelete: true,
        fn_realDelete: function(rowData,success){

            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentParameter/Inf00021Delete",
                data: JSON.stringify({ Token: token, ParameterID: ID }),
                success: function (data) {
                    success(data)
                }
            })
        },
        focusField: "Code",
        focusEditField: "IsEnable",
        columns: [
             {
                 field: 'Code', title: fields.ProcessAlternateGroup, align: "center", require: true, width: "120",
                 rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
                 checkers: [
                     new mf.TextNotEmptyChecker(fields.ProcessAlternateGroupIsNull)
                 ]
             },
            {
                field: 'Name', title: fields.ProcessAlternateGroupDescription, align: "center", require: true, width: "140",
                rander: new mf.TextRander({ size: 12, title: "title", maxLength: 60 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.ProcessAlternateGroupDescriptionIsNull)
                ]
            },                    
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "130",
                rander: new mf.TextRander({ size: 13, title: "title", maxLength: 120 })
            },
             {
                 field: 'IsEnable', title: fields.Status, align: "center", width: '80px',
                 rander: new mf.SelectRander([
                    { value: 1, text: fields.Normal },
                    { value: 0, text: fields.Invalid }
                 ]),
                 defaultValue: 1
             },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "90",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "133",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", width: "90",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander()
            }
           
        ]
       
    });
    if (!table) {
        console.log("create table faild");
        return;
    }
    table.loadData();

    //操作按钮明细表
    DetailTable = new mf.Table("#DetailTable", {
        uniqueId: "AGDetailID",
        height:  220,
        paginationBar: new mf.PaginationBar("#paginagionGroupDetailBar"),
        //isFrozenColumn: true,
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.GroupID = group_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00021GetDetailsList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                   console.log(data);
                   success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
           
        },
        columns: [/*等後端*/
             {
                 field: 'Code', title: fields.ProcessNo, align: "center", require: true, width: "120",
                 rander: new mf.StaticValueRander()
             },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander()
             
            },
           //制程流水号
           {
               field: 'DetailID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return detail_id;
               })
           },
           //该条制程替代群组的流水号
           {
               field: 'GroupID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return group_id;
               })
           },
            {//工作中心
                field: 'Workcenter', title: fields.WorkCenter, align: "center", width: "110",
                rander: new mf.StaticValueRander()
            },
            {//工作中心說明
                field: 'WorkcenterName', title: fields.WorkCenterDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander()
            },
            {//內外制
                field: 'InoutMark', title: fields.InoutMark, align: "center", width: "80",
                rander: new mf.StaticValueRander()
            },
            {//部門/廠商
                field: 'Dept', title: fields.DepartmentNoOrManufacturersNo, align: "center", width: "110",
                rander: new mf.StaticValueRander()
            },
            {//部門/廠商名稱
                field: 'Description', title: fields.DepartmentDesOrManufacturersDes, align: "center", width: "140",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }

        ],
       

    });

    //替代群组获取不属于他的制程列表
    ProcessTable = new mf.Table("#ProcessMasterTable", {
        uniqueId: "ProcessID",
        height: 350,
        //noNumColumn: true,
        isFrozenColumn: true,
        editable:false,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0, 
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            
            if (!searchData)
                searchData = {};
            searchData.Code = $("#ProcessNo").val();
            searchData.GroupID = group_process_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00021ProcessList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                    flag = true;
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        columns: [
             {
                 field: 'Code', title: fields.ProcessNo, align: "center", width: "140",
                 rander: new mf.StaticValueRander()
             },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "170",
                rander: new mf.StaticValueRander()
            },
            {//工作中心
                field: 'Workcenter', title: fields.WorkCenter, align: "center", width: "110",
                rander: new mf.StaticValueRander()
            },
            {//工作中心說明
                field: 'WorkcenterName', title: fields.WorkCenterDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }
        ]      
    });

    //替代群组获取他的替代制程
    ProcessChangeTable = new mf.Table("#ProcessMasterChangeTable", {
        uniqueId: "ProcessID",
        height: 350,
        //noNumColumn: true,
        isFrozenColumn: true,
        editable: false,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0, 
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.GroupID = group_process_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00021DetailsList",
                data:  searchData,
                success: function (data) {
                    console.log(data)
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
           
        },
        columns: [
             {
                 field: 'Code', title: fields.ProcessNo, align: "center", require: true, width: "140",
                 rander: new mf.StaticValueRander()
             },
            {
                field: 'Name', title: fields.ProcessDescription, align: "center", width: "170",
                rander: new mf.StaticValueRander()
            },
            {//工作中心
                field: 'Workcenter', title: fields.WorkCenter, align: "center", width: "110",
                rander: new mf.StaticValueRander()
            },
            {//工作中心說明
                field: 'WorkcenterName', title: fields.WorkCenterDescription, align: "center", width: "140",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
            }

        ],
        
    });
   

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

    //查询
    this.searchClick = function () {
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //添加
    this.addClick = function () {
        if (!table)
            return;

        table.addRow();
    };

    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };

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
        table.loadData();

        /*
        var data = table.getSelectedData();//取得被選取的資料列
        if (!data)
            return;

        var ID = data.ParameterID;
        if (!ID && ID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }


        

        msg.warning(fields.info, fields.WhetherToDelete + fields.CodeNamed + data.Code + fields.TheData,
            function () {
                mf.ajax({
                    type: "post",
                    url: "/MES/api/IntelligentParameter/Inf00021Delete",
                    data: JSON.stringify({ Token: token, ParameterID: ID }),
                    success: function (data) {
                        if (data.status == "200") {
                            msg.success(fields.info, data.msg);
                            table.loadData();
                        }
                        else {
                            msg.error(fields.info, data.msg);
                        }
                    }
                });
            });
        */
    };

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var ParameterID = data.ParameterID;
        if (!ParameterID && ParameterID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.ProcessAlternateGroup + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.ProcessAlternateGroupDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.ProcessAlternateGroupDescription,
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
            tableID: "43",
            rowID: ParameterID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };

    //导入    
    this.importClick = function () {
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');


        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnBrowse").unbind();
        $("#BtnImport").unbind();

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
        $("#BtnImport").click(function () {
           
            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00021Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {                   
                    if (ret.status == "200") {
                        msg.success(fields.info, ret.msg, function () {
                            $('#ImportDialog').modal('hide');
                            table.loadData();
                        });
                    }
                    else {
                        msg.error(fields.info, ret.msg);
                    }
                }
            });
        });      
    };


    //导出
    this.exportClick = function () {
            
        table.loadDataBack(null, function () {

            if (ExportTotal == 0) {
                msg.info(fields.info, fields.NoDataExport);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00021Export?Token=' + encodeURIComponent(token);

            if (form.ProcessAlternateGroup() && form.ProcessAlternateGroup().length > 0) {
                exportUrl = exportUrl + '&Code=' + form.ProcessAlternateGroup();
            }

            if (typeof(form.Status()) != "undefined") {               
                exportUrl = exportUrl + '&Status=' + form.Status();
                
            }
           
            window.location.href = exportUrl;
        });
    };

    //操作按钮明细
    this.DetailClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }
        
        if (!row.IsEnable) {
            msg.info(fields.info, fields.PleaseSaveDataFirst);
            return;
        }
        mf.dialog('#DetailDialog', {
            viewModel: function () {
                $("#ProcessAlternateGroupID").val(row.Code);
                $("#ProcessAlternateGroupDesID").val(row.Name);               
                $("#ProcessAlternateGroupID").attr("title", row.Code);
                $("#ProcessAlternateGroupDesID").attr("title", row.Name);
                group_id = row.ParameterID;
                DetailTable.loadData();
            }
        });
    };

    //批量新增制程代号开窗
    this.addBatchProcessClick = function () {
      
        $('#ProcessDialog').modal('show')
        group_process_id = group_id;
        ProcessTable.loadData();
        ProcessChangeTable.loadData();

/*        mf.dialog('#ProcessDialog', {
            viewModel: function () {
                group_process_id = group_id;
                ProcessTable.loadData();
                ProcessChangeTable.loadData();
            }
        });*/
    };

    //制程主档查询
    this.SearchProcessNoClick = function () {
        if (ProcessTable.hasChange()) {
            msg.warning(fields.info, fields.SaveOrNot, function () {
                flag = false;
                self.detailSaveClick();               
             }, null);
        }
        else {
            ProcessTable.loadData();
        }
       
    };

    //左表格全选check
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

    //右表格全选check
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

    //右移
    this.ProcessMoveRightClick = function () {
        var rowDataLeftArray = [];
        var $selectedRows = ProcessTable.getMultiSelectedRows();
        console.log($selectedRows)
        $selectedRows.each(function (i, $selectedRow) {            
             var rowData = ProcessTable.getRowData($selectedRow); // 也可以拿对应的行数据
             ProcessChangeTable.pushRow(rowData);
        });

        ProcessTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //左移
    this.ProcessMoveLeftClick = function () {
        var rowDataRightArray = [];
        var $selectedRows = ProcessChangeTable.getMultiSelectedRows();
        console.log($selectedRows)
        $selectedRows.each(function (i, $selectedRow) {
            var rowData = ProcessChangeTable.getRowData($selectedRow); // 也可以拿对应的行数据
            //rowDataRightArray.push(rowData);
            ProcessTable.pushRow(rowData);
        });
        ProcessChangeTable.deleteMultiSelectedRows();
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
    };

    //制程主档清理查询字段和清除全选状态
    this.clearData = function () {
        $("#ProcessNo").val("");
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
      //  $('#ProcessDialog').unbind()
        
    };

    //批量数据点击确定按钮放到制程替代群组明细开窗处
    this.detailSaveClick = function () {
        var saveData = {};
        var table_data = ProcessChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.GroupID = group_id;
        console.log(saveData)
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00021DetailsSave',
            data: JSON.stringify(saveData),
            success: function (data) {
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        ProcessChangeTable.loadData();
                        ProcessTable.loadData();
                        if (flag) {
                            $('#ProcessDialog').modal('hide');
                        }                      
                        DetailTable.loadData();
                        self.clearData();
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                    self.clearData();
                }

            }
        });
    };
   
};

var arrayWord = [
    "ProcessAlternateGroup", "Status", "Description", "ProcessAlternateGroupDetail", "Import", "Browse", "Save", "Details",
    "ProcessAlternateGroupIsNull", "ProcessAlternateGroupDescriptionIsNull", "Remark", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "no", "yes", "Cancel", "Comfirm", "PleaseSelectFile", "PleaseSelectRecord",
    "ProcessAlternateGroupDescription", "ProcessNo", "ProcessDescription", "ProcessMaster", "Search", "Add", "Delete",
    "BatchProcessing", "Normal", "Invalid", "PleaseSaveDataFirst", "info", "NoDataExport", "SaveOrNot",
    "WorkCenter", "WorkCenterDescription", "InoutMark", "DepartmentNoOrManufacturersNo", "DepartmentDesOrManufacturersDes",
    "Authorized", "Unauthorized", "BatchOperation", "WhetherToDelete", "CodeNamed", "TheData"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};