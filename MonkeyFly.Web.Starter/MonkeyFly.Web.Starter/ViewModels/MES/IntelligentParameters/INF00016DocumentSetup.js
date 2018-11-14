var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var table = null;
    var document_type_id, dts_id, authority_id, status_dts_id;
    var params = mf.format.getMesParameters('0191213000001,0191213000059,019121300005A');
    var statuslist = [
        { value: 1, text: fields.Normal },
        { value: 0, text: fields.Invalid }
    ];
    var formData = {
        DocumentTypeCode:ko.observable(),
        Code: ko.observable(),
        Status: ko.observable(),
        StatusList: ko.observableArray()
    };
    ko.applyBindings(formData);
    formData.StatusList(params.PT0191213000001);

    //单据种别主档开窗
    var DocumentTypeMasterTable = new mf.Table("#DocumentTypeTable", {
        uniqueId: "ParameterID",
        editable: false,
        dblclick_editable: false,
        paginationBar: new mf.PaginationBar("#paginagionDocumentTypeBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#DocumentTypeID").val();
            searchData.typeID = "000019";
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
        height: 400,
        columns: [

             {
                 field: 'Code', title: fields.DocumentType, align: "center", width: '200px',
                 rander: new mf.TextRander({ title: 'title', size: 12, title: true })
             },
             {
                 field: 'Name', title: fields.DocumentTypeDescription, align: "center", width: '250px',
                 rander: new mf.TextRander({ title: 'title', size: 15, title: true })
             },
              {
                  field: 'Comments', title: fields.Remark, align: "center", width: "250",
                  rander: new mf.TextRander({ size: 16, maxLength: 120, title: true }),
              },
              {
                  field: 'IsEnable', title: fields.Status, align: "center", 
                  rander: new mf.SelectRander(statuslist)
              }
            
        ]
    });
    //单据种别主档开窗查询
    $("#type_dialog_search").click(function () {
        DocumentTypeMasterTable.loadData(null, null, 1);
    });


    //操作权限按钮列表
    var AuthorityTable = new mf.Table("#AuthorityTable", {
        uniqueId: "DocumentAuthorityID",
        height: 220,
        paginationBar: new mf.PaginationBar("#paginagionAuthorityBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.DTSID = dts_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00016GetAuthorityList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'AuthorityCode', title: fields.Code, align: "center", require: true, width: "120",
                 rander: new mf.TextRander({ size: 12, title: true })
             },
            {
                field: 'AuthorityName', title: fields.Description, align: "center", width: "180",
                rander: new mf.TextRander({ size: 12, title: true })

            },
           //权限列表流水号
           {
               field: 'AuthorityID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return authority_id;
               })
           },
           //该条单据设定的流水号
           {
               field: 'DTSID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return dts_id;
               })
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
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center", 
                rander: new mf.TextTimeRander()
            }
            
        ]

    });

    //操作单据状态按钮列表
    var DocumentStatusTable = new mf.Table("#DocumentStatusTable", {
        uniqueId: "DocumentAutoNumberID",
        height: 380,
        paginationBar: new mf.PaginationBar("#paginagionDocumentStatusBar"),
        editable: false,
        dblclick_editable: false,
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.DTSID = status_dts_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00016GetAutoNumberList",
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        columns: [
             {
                 field: 'DefaultCharacter', title: fields.DefaultCharacter, align: "center", require: true, width: "160",
                 rander: new mf.TextRander({ size: 12, title: true })
             },
            {
                field: 'Num', title: fields.CurrentNumber, align: "center", width: "200",
                rander: new mf.TextRander({ size: 12, title: true })

            },
            {
                field: 'Name', title: fields.Description, align: "center", width: "200",
                rander: new mf.TextRander({ size: 12, title: true })

            },
           {
               field: 'Attribute', title: fields.Property, align: "center",
               rander: new mf.SelectRander([
                        { value: 0, text: fields.Shared },
                        { value: 1, text: fields.Dedicated }
               ])

           }
        ]

    });


    //帐号主档未授权数据
    var AccountTable = new mf.Table("#AccountMasterTable", {
        uniqueId: "ID",
        height: 400,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#AccountNo").val();
            searchData.DTSID = open_dts_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00016GetNotAuthorityList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.AccountNo, align: "center", require: true, width: "130",
                rander: new mf.TextRander({ size: 12, title: true })
            },
              {
                  field: 'AuthorityID', title: "", visible: false,
                  rander: new mf.StaticValueRander()
              },
            {
                field: 'Name', title: fields.Name, align: "center",
                rander: new mf.TextRander({ size: 12, title: true })
            }
            
        ]
    });

    //帐号主档已授权
    var AccountChangeTable = new mf.Table("#AccountMasterChangeTable", {
        uniqueId: "ID",
        height: 400,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.DTSID = open_dts_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00016AuthorityList",
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

        },
        columns: [
             {
                 field: 'Code', title: fields.AccountNo, align: "center", require: true, width: "130",
                 rander: new mf.TextRander({ size: 12, title: true })
             },
               {
                   field: 'AuthorityID', title: "", visible: false,
                   rander: new mf.StaticValueRander()
               },
            {
                field: 'Name', title: fields.Name, align: "center",
                rander: new mf.TextRander({ size: 12, title: true })

            }
           
        ]

    });


    //部门主档未授权数据
    var DepartmentTable = new mf.Table("#DepartmentMasterTable", {
        uniqueId: "ID",
        height: 400,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsDepartmentChecked"  onclick="model.checkboxClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = $("#DepartmentNo").val();
            searchData.DTSID = open_dts_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00016GetNotAuthorityList",
                data: searchData,
                success: function (data) {
                   
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        columns: [
            {
                field: 'Code', title: fields.DepartmentNo, align: "center", require: true, width: "130",
                rander: new mf.TextRander({ size: 12, title: true })
            },
           {
               field: 'AuthorityID', title: "", visible: false,
               rander: new mf.StaticValueRander()
           },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center",
                rander: new mf.TextRander({ size: 12, title: true })
            }
        ]
    });

    //部门主档已授权
    var DepartmentChangeTable = new mf.Table("#DepartmentMasterChangeTable", {
        uniqueId: "ID",
        height: 400,
        noNumColumn: true,
        dblclick_editable: false,
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsDepartmentCheckedChange" onclick="model.checkboxChangeClick(this);"/>',
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.DTSID = open_dts_id;
            mf.ajax({
                type: "Get",
                url: "/MES/api/IntelligentParameter/Inf00016AuthorityList",
                data: searchData,
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        columns: [
              {
                  field: 'Code', title: fields.DepartmentNo, align: "center", require: true, width: "130",
                  rander: new mf.TextRander({ size: 12, title: true })
              },
                {
                    field: 'AuthorityID', title: "", visible: false,
                    rander: new mf.StaticValueRander()
                },
            {
                field: 'Name', title: fields.DepartmentDescription, align: "center",
                rander: new mf.TextRander({ size: 12, title: true })
            }
        ]
    });

   
    function initTable(tableStr, paginationBarStr) {
        paginationBar = new mf.PaginationBar(paginationBarStr);
         table = new mf.Table("#INF00016DocumentSetupTable", {
            uniqueId: "DTSID",
            isFrozenColumn: true,
            height: window.innerHeight - 145,
            LastWidth: "130",
            IsSetTableWidth: true,
            paginationBar: paginationBar,
            fn_getData: function (pagination, searchData, success) {
                if (!searchData)
                    searchData = {};
                searchData.Code = formData.Code();
                searchData.Status = formData.Status();
                searchData.TypeCode = formData.DocumentTypeCode();
                searchData.page = pagination.page;
                searchData.rows = pagination.rows;
                mf.ajax({
                    type: 'get',
                    url: '/MES/api/IntelligentParameter/Inf00016GetList',
                    data: searchData,
                    success: function (data) {
                        console.log(data);
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00016Save',
                    data: JSON.stringify(saveData),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            focusField: "Code",
            focusEditField: "Name",
            operateColumTitle: fields.AuthoritySetup,
            fn_onEditingRowRandFinish: function ($row, isAdding, data) {
                var property = data['Property'];
                var $DocumentStatusClickEditingCell = $row.find("#DocumentStatusClick"),
                    $AuthorityClickEditingCell = $row.find("#AuthorityClick");

                if (isAdding) {
                    $DocumentStatusClickEditingCell.attr('disabled', true);
                    $AuthorityClickEditingCell.attr('disabled', true);
                }
                else {
                    $DocumentStatusClickEditingCell.attr('disabled', false);
                    $AuthorityClickEditingCell.attr('disabled', false);
                }
            },
            operateColumWidth: "130px",
            fn_createBtn: function (data) {
                var $td = $("<td style='text-align:center; width:130px;'> ");
                $td.append('<button class="btn btn-success btn-xs" style="margin-right:5px;" id="DocumentStatusClick" onclick="model.DocumentStatusClick(this)" title="' + fields.DocumentStatus + '" >' + fields.DocumentStatus + '</button>');
                $td.append('<button class="btn btn-success btn-xs" id="AuthorityClick" onclick="model.AuthorityClick(this)" title="' + fields.Authority + '" >' + fields.Authority + '</button>');
                return $td;
            },
            isRealDelete: true,
            fn_realDelete: function (rowData, success) {
                mf.ajax({
                    type: 'post',
                    url: '/MES/api/IntelligentParameter/Inf00016Delete',
                    data: JSON.stringify({ DTSID: rowData.DTSID }),
                    success: function (data) {
                        if (data.status == "200") {
                            msg.success(fields.info, data.msg);
                            table.loadData();
                        }
                        else {
                            msg.error(fields.info, data.msg);
                        }
                    }
                })
            },
            columns: [
                    {
                        field: 'TypeCode', title: fields.DocumentTypeNo, align: "center", width: '150px', require: true,
                        rander: new mf.FKRander("#DocTypeDetailDialog",
                                       "#DocTypeDetailDialog #DocumentTypeComfire",
                                       DocumentTypeMasterTable,
                                       new mf.TextRander({ readonly: 'readonly', size: 8 }),
                                       {
                                           btnTitle: "",
                                           btnClass: "btn btn-success btn-xs",
                                           searchID: [{ value: "#DocumentTypeID", text: "" }]
                                       }),
                        fn_onEditingChange: function (table, $row, $cell, field, e) {
                            table.setEditingColumnValue($row, "TypeCode", e.data.Code);
                            table.setEditingColumnValue($row, "TypeName", e.data.Name);
                            document_type_id = e.data.ParameterID;

                        },
                        checkers: [
                               new mf.TextNotEmptyChecker(fields.DocumentTypeNoIsNull)
                        ]
                    },
                    {
                        field: 'TypeName', title: fields.DocumentTypeDescription, align: "center", width: '120px',
                        rander: new mf.TextRander({ title: 'title', disabled: "disabled", size: 10 })
                    },
                     //單據種別流水号
                     {
                         field: 'TypeID', title: "", visible: false,
                         rander: new mf.DynamicValueRander(function () {
                             return document_type_id;
                         })
                     },
                     {
                         field: 'Code', title: fields.CategoryCode, align: "center", width: '110px', require: true,
                         rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 8, maxLength: 4 })),
                         checkers: [
                               new mf.TextNotEmptyChecker(fields.ClassNoIsNull)
                         ]
                     },
                    {
                        field: 'Name', title: fields.CategoryDec, width: '140px', align: "center", require: true,
                        rander: new mf.TextRander({ title: 'title', size: 12, maxLength: 120 }),
                        checkers: [
                               new mf.TextNotEmptyChecker(fields.CategoryDecIsNull)
                        ]
                    },
                   {
                       field: 'YearLength', title: fields.YearCodeLength, width: '100px', align: "center",
                       rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 8, readonly: 'readonly' })),
                       defaultValue: 2
                   },
                   {
                       field: 'MonthLength', title: fields.MonthCodeLength, width: '100px', align: "center",
                       rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 8, readonly: 'readonly' })),
                       defaultValue: 2
                   },
                   {
                       field: 'DateLength', title: fields.DayCodeLength, width: '100px', align: "center",
                       rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 8, readonly: 'readonly' })),
                       defaultValue: 0
                   },
                   {
                       field: 'CodeLength', title: fields.SerialNumberLength, width: '120px', align: "center",
                       rander: new mf.TextRander({ title: 'title', size: 10 }),
                       defaultValue: 4,
                       checkers: [

                              new mf.IsOnlyNumberChecker(fields.SerialNumberLength + fields.IsOnlyNumber),
                              new mf.IsGreaterThanTwoChecker(fields.SerialNumberLength + fields.GreaterThanTwo)
                       ]
                   },
                    {
                        field: 'Length', title: fields.DocumentNumberLength, width: '120px', align: "center",
                        rander: new mf.StaticValueRander()
                    },
                   {
                       field: 'IfDefault', title: fields.Default, align: "center", width: '80px',
                       rander: new mf.SelectRander([
                          { value: 0, text: "N" },
                          { value: 1, text: "Y" }
                       ]),
                       defaultValue: 0
                   },
                  /*   {
                         field: 'YearType', title: fields.YearType, align: "center", width: '80px',
                         rander: new mf.SelectRander(params.PT019121300005A)
    
                     },*/
                    {
                        field: 'Status', title: fields.Status, align: "center", width: '80px',
                        rander: new mf.SelectRander(params.PT0191213000001)

                    },
                   {
                       field: 'GiveWay', title: fields.DateCode, width: '120px', align: "center",
                       rander: new mf.WirteOnceOnlyRander(new mf.SelectRander(params.PT0191213000059)),
                       fn_onEditingChange: function (table, $row, $cell, field, e) {
                           var GiveWayValue = table.getEditingColumnValue($cell.parents(), 'GiveWay');
                           switch (GiveWayValue.substring(5, 18)) {
                               case "0201213000030":
                                   table.setEditingColumnValue($row, "YearLength", 2);
                                   table.setEditingColumnValue($row, "MonthLength", 0);
                                   table.setEditingColumnValue($row, "DateLength", 0);
                                   break;
                               case "0201213000031":
                                   table.setEditingColumnValue($row, "YearLength", 2);
                                   table.setEditingColumnValue($row, "MonthLength", 2);
                                   table.setEditingColumnValue($row, "DateLength", 0);
                                   break;
                               case "0201213000032":
                                   table.setEditingColumnValue($row, "YearLength", 2);
                                   table.setEditingColumnValue($row, "MonthLength", 2);
                                   table.setEditingColumnValue($row, "DateLength", 2);
                                   break;
                               default:
                                   table.setEditingColumnValue($row, "YearLength", 2);
                                   table.setEditingColumnValue($row, "MonthLength", 2);
                                   table.setEditingColumnValue($row, "DateLength", 0);
                                   break;
                           }
                       },
                       defaultValue: mf.systemID + "0201213000031"
                   },

                    {
                        field: 'Attribute', title: fields.Property, align: "center", width: '80px', require: true,
                        rander: new mf.WirteOnceOnlyRander(new mf.SelectRander([
                            { value: 1, text: fields.Employee },
                            { value: 0, text: fields.Department }
                        ])),
                        defaultValue: 1
                    },
                    {
                        field: 'Comments', title: fields.Remark, align: "center", width: '140px',
                        rander: new mf.TextRander({ title: 'title', size: 14, maxLength: 120 })
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
                         field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                         rander: new mf.TextTimeRander()
                     }
            ]
        })
   

        if (!table) {
            console.error("create table faild");
            return;
        }
        table.loadData();
    };
    this.init = function (tableStr, paginationBarStr) {
        initTable(tableStr, paginationBarStr);
    };

    //查询
    this.searchClick = function () {
        if (!table) {
            return;
        }
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    //刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForword(
             function () {                 
                 window.location.reload();
             }, function () {                 
                 window.location.reload();
             });
    };

    //添加
    this.addClick = function () {
        if (!table) {
            return;
        }
        table.addRow();

    }

    //编辑
    this.editClick = function () {

        if (!table) {
            return;
        }
        table.editRow();
    };

    //删除
    this.deleteClick = function () {
        if (!table) {
            return;
        }
        table.deleteRow();
        table.loadData()
    };

    //保存
    this.saveClick = function () {
        if (!table) {
            return;
        }
        table.save(null, null, true);
    };

    //语序
    this.languagesClick = function () {
        if (!table) {
            return;
        }

        var row = table.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
        }

        if (!(row.DTSID && row.DTSID.length > 0)) {
            msg.info(fields.Prompt, fields.PleaseSaveDataFirst)
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.ClassNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + row.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.Description + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Name == null ? "" : row.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (row.Comments == null ? "" : row.Comments) + '" />';

        var columns = [
            {
                field: 'Code', title: fields.CategoryCode,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Name', title: fields.CategoryDec,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00016DocumentSetup",
            parentMID: "MID",
            tableID: "41",
            rowID: row.DTSID,
            rowData: rowData,
            columns: columns,
            arrayWord: arrayWord
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/Util/CNCLanguages", Parameters: parameters });
            window.location.href = '/MES/Util/CNCLanguages';
        }, null);
    };

    //导出
    this.exportClick = function () {

        table.loadDataBack(null, function () {

            var $trLength = $("#INF00016DocumentSetupTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataCanBeExported);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Inf00016Export?Token=' + encodeURIComponent(token);

            if (formData.DocumentTypeCode() && formData.DocumentTypeCode().length > 0) {
                exportUrl = exportUrl + '&TypeCode=' + formData.DocumentTypeCode();
            }

            if (formData.Code() && formData.Code().length > 0) {
                exportUrl = exportUrl + '&Code=' + formData.Code();
            }

            if (typeof (formData.Status()) != "undefined") {
                exportUrl = exportUrl + '&Status=' + formData.Status();
            }

            window.location.href = exportUrl;
        });
    };

    //导入    
    this.importClick = function () {
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
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00016Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            table.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    }
                    else {
                        msg.error(fields.Prompt, ret.msg);
                    }
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };

    //权限开窗
    var attribute_value, open_dts_id;
    this.AuthorityClick = function (obj) {       
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        attribute_value = row.Attribute;
        open_dts_id = row.DTSID;
        if (!row) {
            msg.info(fields.info, fields.PleaseSelectRecord);
            return;
        }

        if (row.Status.substring(5, 18) == "0201213000002") {
            msg.info(fields.info, fields.InvalidNotBe);
            return;
        }
        mf.dialog('#AuthorityDialog', {
            viewModel: function () {
                $("#ClassNoID").val(row.Code);
                $("#DescriptionID").val(row.Name);
                $("#ClassNoID").attr("title", row.Code);
                $("#DescriptionID").attr("title", row.Name);
                dts_id = row.DTSID;
                AuthorityTable.loadData();
            }
        });
    };

    //批量新增帐号主档或者部门主档开窗
    this.addBatchProcessClick = function () {       
        if (attribute_value === true) {
            mf.dialog('#AccountDialog', {
                //2.帐号主档
                viewModel: function () {
                    AccountTable.loadData();
                    AccountChangeTable.loadData();
                }
            });
        }
        else {
            //1.部门主档
            mf.dialog('#DepartmentDialog', {
                viewModel: function () {
                    DepartmentTable.loadData();
                    DepartmentChangeTable.loadData();
                }
            });            
        }      
    };

    //部门,帐号主档开窗查询
    this.SearchClick = function () {
            //1.帐号
        if (attribute_value === true) {
            if (AccountTable.hasChange()) {
                msg.warning(fields.info, fields.SaveOrNot, function () {
                    self.AccountSaveClick();
                }, null);
            }
            else {
                AccountTable.loadData();
            }
           
        }
            //2.部门
        else {
            if (DepartmentTable.hasChange()) {
                msg.warning(fields.info, fields.SaveOrNot, function () {
                    self.DepartmentSaveClick();
                }, null);
            }
            else {
                DepartmentTable.loadData();
            }           
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
    this.AuthorityMoveRightClick = function () {
        if (attribute_value === true) {
            var $selectedRows = AccountTable.getMultiSelectedRows();
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = AccountTable.getRowData($selectedRow);
                AccountChangeTable.pushRow(rowData);
            });

            AccountTable.deleteMultiSelectedRows();
           
        }
        else {
            var $selectedRows = DepartmentTable.getMultiSelectedRows();
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = DepartmentTable.getRowData($selectedRow);
                DepartmentChangeTable.pushRow(rowData);
            });
            DepartmentTable.deleteMultiSelectedRows();
            
        }
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
        
    };

    //左移
    this.AuthorityMoveLeftClick = function () {
        //1.帐号
        if (attribute_value === true) {
            var $selectedRows = AccountChangeTable.getMultiSelectedRows();
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = AccountChangeTable.getRowData($selectedRow);
                AccountTable.pushRow(rowData);
            });
            AccountChangeTable.deleteMultiSelectedRows();
          
        }
        //2.部门
        else {
            var $selectedRows = DepartmentChangeTable.getMultiSelectedRows();
            $selectedRows.each(function (i, $selectedRow) {
                var rowData = DepartmentChangeTable.getRowData($selectedRow);
                DepartmentTable.pushRow(rowData);
            });
            DepartmentChangeTable.deleteMultiSelectedRows();
            
        }
       
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);
        $("#IsDepartmentCheckedChange").prop("checked", false);
        $("#IsDepartmentChecked").prop("checked", false);
    };


    //清理查询字段,清除全选状态
    this.clearData = function () {
        if (attribute_value === true) {
            $("#AccountNo").val("");          
        }
        else {
            $("#DepartmentNo").val("");
        }
        $("#IsCheckedChange").prop("checked", false);
        $("#IsChecked").prop("checked", false);        
    };

    //帐号批量数据点击确定按钮保存权限开窗
    this.AccountSaveClick = function () {
        var saveData = {};
        var table_data = AccountChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.ClassID = open_dts_id;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00016AuthoritySave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        AccountChangeTable.loadData();
                        AccountTable.loadData();
                        $('#AccountDialog').modal('hide');
                        AuthorityTable.loadData();
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

    //部门批量数据点击确定按钮保存权限开窗
    this.DepartmentSaveClick = function () {
        var saveData = {};
        var table_data = DepartmentChangeTable.getAllRowData();
        saveData.data = table_data;
        saveData.ClassID = open_dts_id;
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00016AuthoritySave',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                if (data.status === "200") {
                    msg.success(fields.info, data.msg, function () {
                        DepartmentChangeTable.loadData();
                        DepartmentTable.loadData();
                        $('#DepartmentDialog').modal('hide');
                        AuthorityTable.loadData();
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
    

    //单据状态开窗
    this.DocumentStatusClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        
        mf.dialog('#DocumentStatusDialog', {
            viewModel: function () {             
                status_dts_id = row.DTSID;
                DocumentStatusTable.loadData();
            }
        });
    };

}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "info",
    "DocumentTypeNo", "DocumentTypeDescription", "ClassNo", "Description", "NumberingPrefix", "Remark",
    "Default", "Status", "DocumentNumberLength", "Property", "Shared", "Dedicated", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Normal", "Invalid", "Cancel", "Browse", "Comfirm", "DocumentStatus",
    "Authority", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "AuthoritySetup", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "ClassNoIsNull", "DocumentTypeNoIsNull", "YearCodeLength", "MonthCodeLength", "MonthCodeLength", "DayCodeLength","DateCode",
    "SerialNumberLength", "YearType", "DocumentTypeMaster", "DocumentType", "IsOnlyNumber", "GreaterThanTwo", "AccountMaintenance",
    "AccountNo", "DepartmentDataMaintenance", "DepartmentNo", "AuthoritySetup", "BatchProcessing", "Code", "Name", "InvalidNotBe",
    "Account", "UserName", "DepartmentDescription", "SaveOrNot", "DefaultCharacter", "CurrentNumber", "CategoryCode", "CategoryDec",
    "CategoryDecIsNull", "Employee", "Department", "info"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
    model.init("#INF00016DocumentSetupTable", "#paginagionBar");
};
