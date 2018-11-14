  var viewModel = function () {
    var self = this;
    var table = null;
    var paginationBar;
    var ExportTotal;
    var form = {
        GroupNo: ko.observable(),
        Status: ko.observable(),
        StatusArray: ko.observableArray()
    }
    ko.applyBindings(form);
    form.StatusArray([
        { value: 1, text: fields.Normal },
        { value: 0, text: fields.Obsolete }
    ]);

    function initTable(tableStr, paginationBarStr) {
        paginationBar = new mf.PaginationBar(paginationBarStr);
        table = new mf.Table(tableStr, {
            uniqueId: "ParameterID",
            paginationBar: paginationBar,
            LastWidth: "135",
            IsSetTableWidth: true,
            fn_getData: function (pagination, searchData, success) {
                if (!searchData)
                    searchData = {};
                searchData.Code = form.GroupNo();
                searchData.Status = form.Status();
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentParameter/Inf00009GroupCodeList',
                    data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                    async: false,
                    success: function (data) {
                        console.log(data);
                        ExportTotal = data.total;
                        success(data);
                    }
                });                
            },
            fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00009GroupCodeSave',
                    data: JSON.stringify(saveData),
                    async: false,
                    success: function (data) {
                        success(data);
                    }
                });
            },
            fn_realDelete: function (rowData, success) {
                var data = table.getSelectedData();
                if (!data)
                    return;

                var ID = data.ParameterID;
                if (!ID && ID.length <= 0) {
                    console.error("can't get ParameterID from table");
                    return;
                }

                mf.ajax({
                    type: "Post",
                    url: "/MES/api/IntelligentParameter/Inf00009GroupCodeDeleted",
                    data: JSON.stringify({ ParameterID: ID }),
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
            },
            isRealDelete: true,
            focusField: "Code",
            height: window.innerHeight - 128,
            columns: [
                {
                    field: 'Code', title: fields.GroupNo, align: "center", width:'120px',require: true,
                    rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 12, maxLength: 10 })),
                    checkers: [
                           new mf.TextNotEmptyChecker(fields.CodeIsNull)
                    ]
                },
                {
                    field: 'Name', title: fields.GroupDescription, width:'140px', align: "center",
                    rander: new mf.TextRander({ title: 'title', size: 15, maxLength: 120 })
                },
                { 
                    field: 'Comments', title: fields.Remark, align: "center", width:'160px',
                    rander: new mf.TextRander({ title: 'title', size: 15, maxLength: 120 })
                },
                {
                    field: 'Status', title: fields.Status, align: "center", width: '80px',
                    rander: new mf.SelectRander([
                       { value: 1, text: fields.Normal },
                       { value: 0, text: fields.Obsolete }
                    ]),
                    defaultValue: 1
                },
                 {
                     field: 'Creator', title: fields.CreatedBy, align: "center", width: '100px',
                     rander: new mf.StaticValueRander({ size: 10 })
                 },
                 {
                     field: 'CreateTime', title: fields.CreatedDate, align: "center", width: '135px',
                     rander: new mf.TextTimeRander()
                 },
                 {
                     field: 'Modifier', title: fields.LastChangedBy, align: "center", width: '120px',
                     rander: new mf.StaticValueRander({ size: 12 })
                 },
                 {
                     field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                     rander: new mf.TextTimeRander()
                 }
            ]
        });
        if (!table) {
            console.error("create table faild");
            return;
        }
        table.loadData();
    }

    this.init = function (tableStr, paginationBarStr) {
        initTable(tableStr, paginationBarStr);
    };

    this.refreshClick = function () {
        if (!table)
            return;
        table.goForwordSafely(function () {
            window.location.reload();
        }, function () {
            table.loadData();
        });
    };

    this.addClick = function () {
        if (!table)
            return;
        table.addRow();
    }
    this.editClick = function () {
        if (!table)
            return;
        table.editRow();
    };
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };
    this.deleteClick = function () {
        if (!table)
            return;
        table.deleteRow();
       
    };
    this.searchClick = function () {
        if (!table)
            return;
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //导出
    this.exportClick = function () {
      
        table.loadDataBack(null, function () {

            if (ExportTotal == 0) {
                msg.info(tips.TipTitle, tips.NoDataExport);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00009GroupCodeExport?Token=' + encodeURIComponent(token);

            if (form.GroupNo() && form.GroupNo().length > 0) {
                exportUrl = exportUrl + '&Code=' + form.GroupNo();
            }

            if (typeof (form.Status()) != "undefined") {
                exportUrl = exportUrl + '&Status=' + form.Status();

            }

            window.location.href = exportUrl;
        });
    }
   
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00009GroupCodeImport',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            if (d.status == 200) {
                                msg.success(tips.TipTitle, d.msg, function () {
                                    $('#importDialog').modal('hide');
                                    window.location.reload();
                                });
                            }
                            else {
                                msg.info(tips.TipTitle, d.msg);

                            }
                        }
                    });
                })
            }
        });
    }

    //语序
    this.languagesClick = function () {
        var data = table.getSelectedData();
        if (!data) {
            msg.info(tips.info, tips.selectFirst);
            return;
        }

        var parameterID = data.ParameterID;
        if (!parameterID && parameterID.length <= 0) {
            console.error("can't get ParameterID from table!");
            return;
        }

        var rowData = '&nbsp;<label>' + fields.GroupNo + '</label>';
        rowData += '&nbsp;<input type="text" class="search-input information" disabled="disabled" value="' + data.Code + '"/>';
        rowData += '&nbsp;&nbsp;<label>' + fields.GroupDescription + '</label>';
        rowData += '&nbsp;<input type="text" class="search-input information" disabled="disabled" value="' + data.Name + '"/>';
        rowData += '&nbsp;&nbsp;<label>' + fields.Remark + '</label>';
        rowData += '&nbsp;<input type="text" class="search-input information" disabled="disabled" value="' + data.Comments + '"/>';

        var columns = [
            {
                field: 'Name',
                title: fields.GroupDescription,
                halign: 'center',
                align: 'center',
                width: '150',
                require: true
            },
            {
                field: 'Comments',
                title: fields.Remark,
                halign: 'center',
                align: 'center',
                width: '150'
            }
        ];

        var parameters = {
            parentUrl: URL,
            parentMID: "",
            tableID: "20",
            rowID: parameterID,
            rowData: rowData,
            columns: columns
        }

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    }

};
var URL = "/MES/IntelligentParameters/INF00009ClassificationGroup";

var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00009", "INF00009");
var model = new viewModel();
model.init("#ClassificationGroupTable", "#paginagionBar");