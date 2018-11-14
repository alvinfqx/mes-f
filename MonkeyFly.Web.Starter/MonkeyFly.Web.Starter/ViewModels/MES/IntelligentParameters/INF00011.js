var viewModel = function () {
    var self = this;
    var table = null;    
    var ExportTotal;
    var CodeArr = [];
    

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

  
   

    //导入
    this.importClick = function () {
        mf.dialog("#importDialog", {
            viewModel: function () {
                var importSelf = this;
                $("#FileName").text(fields.NoFileSelected);

                $("#File").change(function () {
                    $("#FileName").text($("#File").val());
                });

                $("#btn_browse").click(function () {
                    $("#File").click();
                });
                $('#addFile').click(function () {
                    var formdata = new FormData();
                    formdata.append("file", document.getElementById('File').files[0]);
                    formdata.append("Token", window.top.mf.token);
                    $.ajax({
                        type: 'Post',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00011Import',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            if (d.status == 200) {
                                msg.success(fields.Prompt, d.msg, function () {
                                    $('#importDialog').modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.info(fields.Prompt, d.msg);

                            }
                        }
                    });
                })
            }
        });
    }

    //导出
    this.exportClick = function () {       
        var Code=$("#unitCode").val();        
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00011Export?Token=' + token + '&Code=' + Code;
    };

    //设置单位主档表格
    table = new mf.Table("#unitTable", {
        uniqueId: "ParameterID",
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),       
        fn_getData: function (pagination, searchData, success) {
            searchData.Code = $("#unitCode").val();            
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00011List',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    
                    ExportTotal = data.total;
                    for (var i = 0; i < data.rows.length; i++) {
                        CodeArr.push(data.rows[i].Code);
                    }
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            
            if (CodeArr.indexOf(saveData.Code) != -1) {
                msg.info(fields.Prompt, fields.CodeIsSame);
                return;

            } else {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00011Save',
                    data: JSON.stringify(saveData),

                    success: function (data) {

                        success(data);
                    }
                });
            }
           
        },
        focusField: "Code",
        height: window.innerHeight - 130,
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            
            var ID = rowData.ParameterID;
            mf.ajax({
                type: "Post",
                url: "/MES/api/IntelligentParameter/Inf00011Delete",
                data: JSON.stringify({ ParameterID: ID }),
                success: function (data) {
                    success(data);
                }
            });
                  
        },
        columns: [          
            {
                field: 'Code', title: fields.unitCode, align: "center", require: true, width: "129",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 10, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.unitCodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.unitDescription, require: true, align: "center", width: "160",
                rander: new mf.TextRander({ size: 14, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.unitDescriptionIsNull)
                ],
            },
            {
                field: 'Comments', title: fields.remarks, align: "center", width: "180",
                rander:new mf.TextRander({ size: 17, title: "title" }),
            },
            {
                field: 'Status', title: fields.state, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 1, text: fields.normal }, { value: 0, text: fields.Invalid }]),
            },
            {
                field: 'Creator', title: fields.creator, align: "center", width: "90",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.creationDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.lastRevision, align: 'center', width: "90",
                rander: new mf.StaticValueRander(),

            },
            {
                field: 'ModifiedTime', title: fields.lastModifiedDate, align: "center",
                rander: new mf.TextTimeRander(),
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

        var parameterID = data.ParameterID;
        if (!parameterID && parameterID.length <= 0) {
            console.error("can't get ParameterID from table!");
            return;
        }
      
        var rowData =
            '&nbsp;<label>' + fields.unitCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.unitDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name ? data.Name : "") + '" />' +
            '&nbsp;&nbsp;<label>' + fields.remarks + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments ? data.Comments : "") + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.unitDescription,
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
            tableID: "20",
            rowID: parameterID,
            rowData: rowData,
            columns: columns
        }

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null)
    };

}

var URL = "/MES/IntelligentParameters/INF00011";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00011", "INF00011");

var model = new viewModel();