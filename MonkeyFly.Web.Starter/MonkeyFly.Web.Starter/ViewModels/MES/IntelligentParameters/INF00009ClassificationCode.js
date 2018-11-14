var viewModel = function () {
    var self = this;
    var table = null, tableClassGroup = null;
    var paginationBar, paginagionBarClassGroup, GroupParameterID;
    var ExportTotal;
    var params = mf.format.getMesParameters('019121300000E,019121300000D');
    var form = {
        ClassNo: ko.observable(),
        Use: ko.observable(),
        UseArray: ko.observableArray()
        
    }
    ko.applyBindings(form);
   
    var useList = params.PT019121300000D;
    var useListArray = [];
    for (var i = 0; i < useList.length; i++) {
        useListArray[i] = { value: useList[i].value, text: useList[i].Code + "-" + useList[i].text };
    }
    form.UseArray(useListArray);
    //弹窗
    paginagionBarClassGroup = new mf.PaginationBar("#paginagionBarClassGroup");
    tableClassGroup = new mf.Table("#ClassGroupTable", {
        uniqueId: "ParameterTypeID",
        paginationBar: paginagionBarClassGroup,
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {                 
            if (!searchData)
                searchData = {};
            searchData.Code =$("#GroupNo").val();
            searchData.typeID = "00000E";
            mf.ajax({
                type: "Get",
                url: "/MES/api/PopUp/getParameterList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
           
        },
        fn_saveData: function (saveData, success) { },
        height: 320,
        columns: [
        
             {
                 field: 'Code', title: fields.GroupNo, align: "center", width:'200px',require: true,
                 rander: new mf.TextRander({ title: 'title', size: 12 })
             },
             {
                 field: 'Name', title: fields.GroupDescription, width:'400px', align: "center",
                 rander: new mf.TextRander({title:'title',size:15})
             },                          
             {
                 field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
             }
        ]
    });
    $("#dialog_search").click(function () {
        tableClassGroup.loadData(null, null, 1);
    });

    function initTable(tableStr, paginationBarStr) {
        paginationBar = new mf.PaginationBar(paginationBarStr);
        table = new mf.Table(tableStr, {
            uniqueId: "ParameterID",
            paginationBar: paginationBar,
            LastWidth: "30",
            IsSetTableWidth: true,
            fn_getData: function (pagination, searchData, success) {
                if (!searchData)
                    searchData = {};
                searchData.Code = form.ClassNo();
                searchData.UseCode = form.Use();
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentParameter/Inf00009ClassList',
                    data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                    async: false,
                    success: function (data) {
                        console.log(data);
                        ExportTotal = data.total;
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
                    type: "post",
                    url: "/MES/api/IntelligentParameter/Inf00009ClassDeleted",
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
            fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00009ClassSave',
                    data: JSON.stringify(saveData),
                    async: false,
                    success: function (data) {
                        success(data);
                    }
                });
            },
            focusField: "Code",
            height: window.innerHeight - 145,
            columns: [
                {
                    field: 'UseParameterID', title: fields.WhereUsed, align: "center", width: '140px', require: true,
                    //rander: new mf.SelectRander(useListArray, {}),
                    rander: new mf.AutoSelectRander("value", "text", useListArray,
                    { noSearchSelectedText: "", MaxWidth: '130px', title: true, }),
                    checkers: [
                           new mf.TextNotEmptyChecker(fields.UseIsNull)
                    ]
                },

                 {
                     field: 'Code', title: fields.ClassNo, align: "center", width: '110px', require: true,
                     rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 8 ,maxLength:10})),
                     checkers: [
                           new mf.TextNotEmptyChecker(fields.CodeIsNull)
                     ]
                 },
                {
                    field: 'Description', title: fields.ClassDescription, width: '140px', align: "center",
                    rander: new mf.TextRander({ title: 'title', size: 12, maxLength: 120 })

                },
                {
                    field: 'Comments', title: fields.Remark, align: "center", width: '130px',
                    rander: new mf.TextRander({ title: 'title', size: 10, maxLength: 120 })
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
                    field: 'GroupCode', title: fields.GroupNo, align: "center", width: '140px',
                    rander: new mf.FKRander("#GroupDialog",
                                   "#GroupDialog #GroupID",
                                   tableClassGroup,
                                   new mf.TextRander({ readonly: 'readonly',size:8 }),
                                   {
                                       btnTitle: "",
                                       btnClass: "btn btn-success btn-xs",
                                       searchID: [{ value: "#GroupNo", text: "" }]
                                   }),
                    fn_onEditingChange: function (table, $row, $cell, field, e) {
                        table.setEditingColumnValue($row, "GroupCode", e.data.Code);
                        table.setEditingColumnValue($row, "GroupName", e.data.Name);
                        GroupParameterID = e.data.ParameterID;
                       
                    }
                        
                },
                //群组码流水号
                 {
                     field: 'GroupParameterID', title: "", visible: false,
                     rander: new mf.DynamicValueRander(function () {
                         return GroupParameterID;
                     })
                 },

                {
                    field: 'GroupName', title: fields.GroupDescription, width: '120px', align: "center",
                    rander: new mf.TextRander({ title: 'title', size: 12 , readonly:'readonly' })
                },
                 {
                     field: 'Creator', title: fields.CreatedBy, align: "center", width: '100px',
                     rander: new mf.StaticValueRander()
                 },
                 {
                     field: 'CreateTime', title: fields.CreatedDate, align: "center", width: '130px',
                     rander: new mf.TextTimeRander()
                 },
                 {
                     field: 'Modifier', title: fields.LastChangedBy, align: "center", width: '120px',
                     rander: new mf.StaticValueRander()
                 },
                 {
                     field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", width: '130px',
                     rander: new mf.TextTimeRander()
                 },
                 {
                     field: 'placeholder', title: '', rander: new mf.PlaceholderRander()
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
        table.goForword(function () {          
            window.location.reload();
        }, function () {
            window.location.reload();
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
        if (!table) {
            return;
        }          
        table.save(null, null, true);
    };
    this.deleteClick = function () {
        if (!table)
            return;
        table.deleteRow();
    };
    this.searchClick = function () {
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
           
            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00009ClassExport?Token=' + encodeURIComponent(token);

            if (form.ClassNo() && form.ClassNo().length > 0) {
                exportUrl = exportUrl + '&Code=' + form.ClassNo();
            }

            if (typeof (form.Use()) != "undefined") {
                exportUrl = exportUrl + '&UseCode=' + form.Use();

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
                    formdata.append("Token", token);
                    $.ajax({
                        type: 'Post',
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00009ClassImport',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            if (d.status == 200) {
                                msg.success(tips.TipTitle, d.msg, function () {
                                    $('#importDialog').modal('hide');
                                    //window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
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

        var rowData = '&nbsp;<label>' + fields.ClassNo + '</label>';
        rowData += '&nbsp;<input type="text" class="search-input information" disabled="disabled" value="' + data.Code + '"/>';
        rowData += '&nbsp;&nbsp;<label>' + fields.ClassDescription + '</label>';
        rowData += '&nbsp;<input type="text" class="search-input information" disabled="disabled" value="' + data.Description + '"/>';
        rowData += '&nbsp;&nbsp;<label>' + fields.Remark + '</label>';
        rowData += '&nbsp;<input type="text" class="search-input information" disabled="disabled" value="' + data.Comments + '"/>';

        var columns = [
            {
                field: 'Name',
                title: fields.ClassDescription,
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
var URL = "/MES/IntelligentParameters/INF00009ClassificationCode";
var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00009", "INF00009");
var model = new viewModel();
model.init("#ClassificationCodeTable", "#paginagionBar");