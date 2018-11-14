var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal;
    var attrArray = [];
    var statusArray = [];
    var attrDefaultString="不需要（N）";

    //获取状态下拉框的值
    mf.ajax({
        async: false,
        type: "Get",
        url: "/MES/api/Util/GetParameters",
        data: { "TypeIds": "0191213000001" },
        success: function (data) {
            //console.log(JSON.stringify(data));
            var statusData = data.PT0191213000001;
            for (var i = 0; i < statusData.length; i++) {
                statusArray[i] = { value: statusData[i].value, text: statusData[i].text };
            }
        }
    });

    //获取属性下拉框的值
    mf.ajax({
        async: false,
        type: "Get",
        url: "/MES/api/Util/GetParameters",
        data: { "typeIds": "0191213000052" },
        success: function (data) {
            //console.log(JSON.stringify(data));
            var listData = data.PT0191213000052;
            for (var j = 0; j < listData.length; j++) {
                if (listData[j].text == attrDefaultString) {
                    attrArray.unshift({ value: listData[j].value, text: listData[j].text });
                    continue;
                }
                attrArray[j] = { value: listData[j].value, text: listData[j].text };
            }
            //alert(JSON.stringify(attrArray));
        }
    });

    

    //刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            table.loadData();
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
        
    };

    //语序
    //this.languagesClick = function () {
    //    if (!table) {
    //        return;
    //    }
    //    var data = table.getSelectedData();
    //    if (!data) {
    //        return;
    //    }
    //    var emouserID = data.ProjectID;
    //    if (!emouserID && emouserID.length <= 0) {
    //        console.error("can't get ParameterID from table!");
    //        return;
    //    }
    //    var rowData=
    //        '&nbsp;<label>' + fields.Code + '</label>' +
    //        '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
    //        '&nbsp;&nbsp;<label>' + fields.Description + '</label>' +
    //        '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px;" value="' + (data.Description == null ? "" : data.Description) + '" />' +
    //        '&nbsp;&nbsp;<label>' + fields.remarks + '</label>' +
    //        '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';
    //    var columns = [
    //        {
    //            field: 'Name',
    //            title: fields.Description,
    //            align: 'center',
    //            halign: 'center',
    //            width: '150',
    //            require:true
    //        },
    //        {
    //            field: 'Comments',
    //            title: fields.remarks,
    //            align: 'center',
    //            halign: 'center',
    //            width:'150'
    //        }
    //    ];
    //    var parameters = {
    //        parentUrl: URL,
    //        parentMID: MID,
    //        tableID: "36",
    //        rowID: emouserID,
    //        rowData: rowData,
    //        columns:columns
    //    }
    //    table.goForwordSafely(function () {
    //        window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
    //        window.location.href = '/MES/Util/Languages';
    //    },null);
    //};

    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.ProjectID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table!");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.Code + '</label>' +
            '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Description + '</label>' +
            '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px;" value="' + (data.Description == null ? "" : data.Description) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.remarks + '</label>' +
            '&nbsp;<input type="text" class="search-input" readonly="readonly" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.Description,
                halign: 'center',
                align: 'center',
                width: '150',
                require: true
            },
            {
                field: 'Comments',
                title: fields.remarks,
                halign: 'center',
                align: 'center',
                width: '150'
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: MID,
            tableID: "36",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        }

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null)
    };

    //导入
    this.importClick = function () {
        mf.dialog("#importDialog", {            
            viewModel: function () {
                var importSelf = this;
                //console.log(this);
                $("#FileName").text(fields.NoFileSelected);
                $("#btn_browse").click(function () {
                    $("#File").click();
                });
                $("#File").change(function () {
                    var fileName = $("#File").val();
                    $("#FileName").text(fileName);                    
                    //console.log(fileName);
                });
                $("#addFile").click(function () {
                    var formdata = new FormData();
                    formdata.append("file", document.getElementById("File").files[0]);
                    formdata.append("Token", window.top.mf.token);

                    $.ajax({
                        type: 'Post',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00019Import',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype:'multipart/form-data',
                        success: function (d) {
                            if (d.status == 200) {
                                msg.success(tips.TipTitle, d.msg, function () {
                                    $("#importDialog").modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.info(tips.TipTitle, d.msg);
                            }
                        }
                    });
                });
            }
        });
    };

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(tips.info, tips.NoDataExport);
            return;
        }
        var Code = $("#projectCode").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00019Export?Token=' + token + '&Code=' + Code;
    };

    //设置项目主档表格
    //console.log(attrArray);
    table = new mf.Table("#projectTable",{
        uniqueId: "ProjectID",
        paginationBar:new mf.PaginationBar("#paginationBar"),
        fn_getData:function(pagination,searchData,success){
            searchData.Code=$("#projectCode").val();
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00019List",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    ExportTotal = data.total;
                    //console.log(data);
                    //alert(JSON.stringify(data))
                    success(data);
                }
            });
        },
        fn_saveData:function(saveData,success){
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00019Save",
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        focusField: "Code",
        height: window.innerHeight - 130,
        LastWidth: "120",
        IsSetTableWidth: true,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
  
            var ID = rowData.ProjectID;
            var data = {};
            data.ProjectID = ID;
                    mf.ajax({
                        type: "Post",
                        url: "/MES/api/IntelligentParameter/Inf00019Delete",
                        data: JSON.stringify(data),
                        success: function (data) {
                            success(data);
                        }
                    });
                  
        },
        columns: [
            {
                field: 'Code', title: fields.Code, align: "center", require: true, width: "110",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 7, maxLength: 10, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CodeIsNull)
                ]              
            },
            {
                field: 'Description', title: fields.Description, align: "center", require: true, width: "135",
                rander: new mf.TextRander({ size: 10, title: "title",maxLength:60 }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DescriptionIsNull)
                ]
            },
            {
                field: 'Attribute', title: fields.Attribute, align: "center", width: "100",
                rander: new mf.SelectRander(attrArray)
            },
            {
                field: 'Comments', title: fields.remarks, align: "center", width: "154",
                rander: new mf.TextRander({ size: 15, title: "title", maxLength: 120 })
            },
            {
                field: 'Status', title: fields.state, align: "center", width: "100",
                rander: new mf.SelectRander(statusArray)
            },
            {
                field: 'Creator', title: fields.creator, align: "center", width: "80",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'CreateTime', title: fields.creationDate, align: "center", width: "120",
                rander: new mf.TextTimeRander()
            },
            {
                field: 'Modifier', title: fields.lastRevision, align: 'center', width: "80",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.lastModifiedDate, align: "center",
                rander: new mf.TextTimeRander()
            }
        ]
    });

    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();
};

var URL = "/MES/IntelligentParameters/INF00019";

var MID = window.top.page_parameters.GetParameters(URL);
//console.log(MID);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00019", "INF00019");

var model = new viewModel();
