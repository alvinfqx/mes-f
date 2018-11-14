var viewModel = function () {
    var self = this;
    var table = null, ExportTotal, PlantID, PlantsID, ItemID, AttributeID, LotClass_ID;
    var paginationBar;
    var Listdata;
    var Namearry = [];
    var arry = [{ value: "", text: "" }];
    var Classarry = [];

   
    var form = {
        ClassCode: ko.observable(),
        Status: ko.observable(),
        StatusArray: ko.observableArray()
    }

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000060" },
        success: function (data) {
            var Listdata = data.PT0191213000001;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
            var typedata = data.PT0191213000060;
            for (var i = 0; i < typedata.length; i++) {
                arry[i + 1] = { value: typedata[i].value, text: typedata[i].text }
            }
        }
    });
    
    

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/PopUp/GetClassList",
        data: ({ page: 1, rows: 10000, type: "INV" }),
        success: function (data) {
            var row = data.rows;
            for (var i = 0; i < data.total; i++) {
                Classarry[i] = { value: row[i].ParameterID, text: row[i].Code }
            }
        }
    });

    ko.applyBindings(form);
    form.StatusArray(Namearry);
    
    //單位彈窗
    var MESUserTable = new mf.Table("#MESUserTable", {
        uniqueId: "ItemID",
        editable: false,
        LastWidth: "90",
        paginationBar: new mf.PaginationBar("#paginagionMESUserBar"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#UserCode").val();
        //    console.log("UserCode:" + Code);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getparameterList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "00000C" }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.TheUnitCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.TheUnitThat, align: "center", width: "145",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });
    $("#MESUserSearch").click(function () {
        MESUserTable.loadData(null, null, 1);
    });
    //單位彈窗
    var MESUserTables = new mf.Table("#MESUserTables", {
        uniqueId: "ItemID",
        editable: false,
        LastWidth: "90",
        paginationBar: new mf.PaginationBar("#paginagionMESUserBars"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#UserCodes").val();
            //    console.log("UserCode:" + Code);
            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getparameterList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, typeID: "00000C" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.TheUnitCode, align: "center", width: "130",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Name', title: fields.TheUnitThat, align: "center", width: "145",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center", width: "160",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center",
                rander: new mf.SelectRander([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]),
            }
        ]
    });
    $("#MESUserSearchs").click(function () {
        MESUserTables.loadData(null, null, 1);
    });

    //批号类别开窗
    var CategoryCodeTables = new mf.Table("#CategoryCodeTables", {
        uniqueId: "AutoNumberID",
        editable: false,
        LastWidth: "280",
        paginationBar: new mf.PaginationBar("#paginagionCategoryCodeBars"),
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#CategoryCodeID").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00023GetVaildList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code }),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CategoryCode, align: "center", width: "250",
                rander: new mf.TextRander({ title: "title" }),
            },
            {
                field: 'Description', title: fields.CategoryDesc, align: "center",
                rander: new mf.TextRander({ title: "title" }),
            }
          
        ]
    });
    $("#CategoryCodeSearchID").click(function () {
        CategoryCodeTables.loadData(null, null, 1);
    });

    //主页面表格
    function initTable(tableStr, paginationBarStr) {
        paginationBar = new mf.PaginationBar(paginationBarStr);
        table = new mf.Table(tableStr, {
            uniqueId: "ItemID",
            paginationBar: paginationBar,
            isFrozenColumn: true,
            LastWidth: "130",
            IsSetTableWidth: true,
            fn_getData: function (pagination, searchData, success) {
                if (!searchData)
                    searchData = {};
                searchData.Code = form.ClassCode();
                searchData.Status = form.Status();
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/IntelligentParameter/Inf00010GetList',
                    data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                    async: false,
                    success: function (data) {
                        ExportTotal = data.total;
                        console.log(data);
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/IntelligentParameter/Inf00010Save',
                    data: JSON.stringify(saveData),
                    async: false,
                    success: function (data) {
                        //$("#btn_save").attr("disabled", false);
                        success(data);
                    }
                });
            },
            fn_onEditingRowRandFinish: function ($row, isAdding, data) {              
                var Unit = data['Unit'];
                var AuxUnit = data['AuxUnit'];
                var IsCutMantissa = data['IsCutMantissa'];
                var $AuxUnitRatioEditingCell = $row.find("#AuxUnitRatio");
                if (Unit == AuxUnit) {
                    $AuxUnitRatioEditingCell.attr("disabled", true);
                }
                else {
                    $AuxUnitRatioEditingCell.attr("disabled", false);
                }
                var $DocumentStatusClickEditingCell = $row.find("#reviewClick");
                if (isAdding) {
                    $DocumentStatusClickEditingCell.attr('disabled', true);
                }
                else {
                    $DocumentStatusClickEditingCell.attr('disabled', false);
                }
                var $CutMantissaEditingCell = $row.find("#CutMantissa");
                if (IsCutMantissa == 0) {
                    $CutMantissaEditingCell.attr("disabled", true);
                }
            },
            fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
                var ClassOne = $row.find("#ClassOne").val();
                var ClassTwo = $row.find("#ClassTwo").val();
                var ClassThree = $row.find("#ClassThree").val();
                var ClassFour = $row.find("#ClassFour").val();
                var ClassFive = $row.find("#ClassFive").val();
                var ClassArry = [];

                var Unit = $row.find("#Unit").val();
                var AuxUnit = $row.find("#AuxUnit").val();
                var AuxUnitRatio = $row.find("#AuxUnitRatio").val();
                if (Unit != AuxUnit) {
                    if (AuxUnitRatio < 0 || AuxUnitRatio == 0 || AuxUnitRatio == 1) {
                        return fields.PleaseEnterValueGreaterThanOne;
                    } 
                } else {
                    if (AuxUnitRatio != 1) {
                        return fields.AuxiliaryUnitRatioCanOnlyBeOne;
                    }
                }

                if (ClassOne != null && ClassTwo.length > 0) {
                    ClassArry.push(ClassOne);
                }
                if (ClassTwo != null && ClassTwo.length > 0) {
                    ClassArry.push(ClassTwo);
                }
                if (ClassThree != null && ClassThree.length > 0) {
                    ClassArry.push(ClassThree);
                }
                if (ClassFour != null && ClassFour.length > 0) {
                    ClassArry.push(ClassFour);
                }
                if (ClassFive != null && ClassFive.length > 0) {
                    ClassArry.push(ClassFive);
                }
                for (var i = 0; i < ClassArry.length; i++) {
              
                    for (var j = 0 ; j < ClassArry.length ; j++) {

                        if (i != j && ClassArry[i] === ClassArry[j]) {
                            return fields.ClassificationOfInformationIsRepeated;
                        }
                    }

                }

                var Lot = table.getEditingColumnValue($row, "Lot");
                var LotClass = table.getEditingColumnValue($row, "LotClass");
                var LotMethod = table.getEditingColumnValue($row, "LotMethod");
                if (Lot) {
                    if (LotClass == "") {
                        return fields.LotClassIsNull;
                    }
                    if (LotMethod == "") {
                        return fields.LotMethodIsNull;
                    }
                }
                return null;
            },
            isRealDelete: true, //是否单个实时删除
            fn_realDelete: function (rowData, success) {
                mf.ajax({
                    type: "post",
                    url: "/MES/api/IntelligentParameter/Inf00010Delete",
                    data: JSON.stringify({ ItemID: rowData.ItemID}),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            focusField: "Code",
            height: window.innerHeight - 145,
            columns: [
                  {
                      field: 'Code', title: fields.ClassCode, align: "center", width: '160px', require: true,
                      rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 10, maxLength: 60 })),
                      checkers: [
                      new mf.TextNotEmptyChecker(fields.ClassCodeIsNull)
                      ]
                  },
                   {
                       field: 'Name', title: fields.ItemName, width: '160px', align: "center", require: true,
                       rander: new mf.TextRander({ title: 'title', size: 10, maxLength: 120 }),
                       checkers: [
                       new mf.TextNotEmptyChecker(fields.ClassDescriptionIsNull)
                       ]
                   },
                  {
                      field: 'Specification', title: fields.ItemSpecifications, width: '110px',align: "center",
                      rander: new mf.TextRander({ size: 8, title: "title", maxLength: 60 }),

                  },
                  {
                      field: 'Status', title: fields.Status, align: "center", width: '80px',
                      rander: new mf.SelectRander(params.PT0191213000001)
                  },
                  {
                      field: 'UnitCode', title: fields.unit, align: "center", width: '150px', require: true,
                      rander: new mf.FKRander(
                     "#MESUserDialog",
                     "#MESUserConfirmBtn",
                     MESUserTable,
                     new mf.TextRander({ size: 8, readonly: 'readonly', title: "title" }),

                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#UserCode", text: "" }]
                    }

                  ),
                      fn_onEditingChange: function (table, $row, $cell, field, e) {                         
                          table.setEditingColumnValue($row, "UnitCode", e.data.Code);
                          table.setEditingColumnValue($row, "AuxUnitCode", e.data.Code);                          
                          PlantID = e.data.ParameterID;
                          var $AuxUnitRatioEditingCell = $row.find("#AuxUnitRatio");
                          table.setEditingColumnValue($row, "Unit", PlantID);
                          table.setEditingColumnValue($row, "AuxUnit", PlantID);
                          PlantsID = PlantID;
                          if (PlantID == PlantsID) {
                              table.setEditingColumnValue($row, "AuxUnitRatio", 1);
                              $AuxUnitRatioEditingCell.attr("disabled", true);
                          }
                          else {
                              table.setEditingColumnValue($row, "AuxUnitRatio", "");
                              $AuxUnitRatioEditingCell.attr("disabled", false);
                          }
                       //   alert(PlantID);
                      },
                      checkers: [
                      new mf.TextNotEmptyChecker(fields.PleaseSelectUnits)
                      ]
                  },
                    {
                        field: 'Unit', title: "", visible: false,
                        rander: new mf.TextRander()
                    },

                 {
                     field: 'ClassOne', title: fields.ClassificationOne, align: "center", width: '100px',
                    // rander: new mf.SelectRander(params.PT019121300000B)
                     rander: new mf.AutoSelectRander("value", "text", Classarry,
                   { noSearchSelectedText: "", MaxWidth: '90px', title: true, })
                   //  checkers: [
                   //new mf.TextNotEmptyChecker(fields.PleaseSelectType)
                   //  ]
                 },
                 {
                     field: 'ClassTwo', title: fields.ClassificationTwo, align: "center", width: '100px', 
                     //   rander: new mf.SelectRander(params.PT019121300000B)
                     rander: new mf.AutoSelectRander("value", "text", Classarry,
                  { noSearchSelectedText: "", MaxWidth: '90px', title: true, })
                   //checkers: [
                   //new mf.TextNotEmptyChecker(fields.PleaseSelectType)
                   //  ]
                 },
                 {
                     field: 'ClassThree', title: fields.ClassificationThree, align: "center", width: '100px',
                     rander: new mf.AutoSelectRander("value", "text", Classarry,
                   { noSearchSelectedText: "", MaxWidth: '90px', title: true, })
                   //  checkers: [
                   //new mf.TextNotEmptyChecker(fields.PleaseSelectType)
                   //  ]
                 },
                 {
                     field: 'ClassFour', title: fields.ClassificationFour, align: "center", width: '100px', 
                     rander: new mf.AutoSelectRander("value", "text", Classarry,
                   { noSearchSelectedText: "", MaxWidth: '90px', title: true, })
                   //  checkers: [
                   //new mf.TextNotEmptyChecker(fields.PleaseSelectType)
                   //  ]
                 },
                 {
                     field: 'ClassFive', title: fields.ClassificationFive, align: "center", width: '100px',
                     rander: new mf.AutoSelectRander("value", "text", Classarry,
                  { noSearchSelectedText: "", MaxWidth: '90px', title: true, })
                 },
                 {
                     field: 'AuxUnitCode', title: fields.AuxiliaryUnit, align: "center", width: '150px', require: true,
                     rander: new mf.FKRander(
                     "#MESUserDialogs",
                     "#MESUserConfirmBtns",
                     MESUserTables,
                     new mf.TextRander({ size: 8, readonly: 'readonly', title: "title" }),
                    {
                        btnTitle: "", btnClass: "btn btn-success btn-xs",
                        searchID: [{ value: "#UserCodes", text: "" }]
                    }
                   ),
                     fn_onEditingChange: function (table, $row, $cell, field, e) {
                         table.setEditingColumnValue($row, "AuxUnitCode", e.data.Code);
                         PlantsID = e.data.ParameterID;
                         var $AuxUnitRatioEditingCell = $row.find("#AuxUnitRatio");
                         table.setEditingColumnValue($row, "AuxUnit", PlantsID);
                         if (PlantID == PlantsID) {
                             table.setEditingColumnValue($row, "AuxUnitRatio", 1);
                             $AuxUnitRatioEditingCell.attr("disabled", true);
                         }
                         else {
                             table.setEditingColumnValue($row, "AuxUnitRatio", "");
                             $AuxUnitRatioEditingCell.attr("disabled", false);
                         }
                     }
                     //checkers: [
                     // new mf.TextNotEmptyChecker(fields.PleaseSelectAuxUnits)
                     //]

                 },
                    {
                        field: 'AuxUnit', title: "", visible: false,
                        rander: new mf.TextRander()
                     
                    },
                 {
                     field: 'AuxUnitRatio', title: fields.AuxiliaryUnitRatio, align: "center", width: '110px',require: true,
                     rander: new mf.TextRander({ size: 8, title: "title", maxLength: 60, event: "input", eventName: "oninputnum(this)" }),
                         checkers: [
                         new mf.TextNotEmptyChecker(fields.PleaseFillInTheAuxiliaryUnitRatio),
                         new mf.IsPercentageChecker(fields.CanOnlyEnterNumber)
                         ]
                 },
                 {
                     field: 'IsCutMantissa', title: fields.CutMantissa, align: "center", width: '120px',
                     rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
                     fn_onEditingChange: function (table, $row, $cell, field, e) {
                         var IsCutMantissa = table.getEditingColumnValue($row, "IsCutMantissa")
                         var $CutMantissaEditingCell = $row.find("#CutMantissa");
                         if (IsCutMantissa != 0) {                             
                             $CutMantissaEditingCell.attr("disabled", false);
                         }
                         else {
                             table.setEditingColumnValue($row, "CutMantissa", mf.systemID + "020121300000C");
                             $CutMantissaEditingCell.attr("disabled", true);
                         }
                     }
                 },
                 {
                     field: 'CutMantissa', title: fields.CutTheMantissaFraction, align: "center", width: '130px',
                     rander: new mf.SelectRander(params.PT0191213000002),
                     defaultValue: mf.systemID + "020121300000C"
                     //checkers: [
                     // new mf.TextNotEmptyChecker(fields.ClassCodeIsNull)
                     //]
                 },
                {
                    field: 'Type', title: fields.SupplyForm, align: "center", width: '130px',
                    rander: new mf.SelectRander(params.PT0191213000003),
                    checkers: [
                     new mf.TextNotEmptyChecker(fields.ClassCodeIsNull)
                    ]
                },
                {
                    field: 'Drawing', title: fields.EngineeringDrawingNumber, align: "center", width: '130px', maxLength: 10,
                    rander: new mf.TextRander({ size: 10, title: "title", maxLength: 30 }),
                },
                 {
                     field: 'PartSource', title: fields.SourceOfTheItem, align: "center", width: '130px',
                     rander: new mf.SelectRander(params.PT0191213000053),

                 },

                 {
                     field: 'Comments', title: fields.Remarks, align: "center", width: "120px",
                     rander: new mf.TextRander({ size: 10, title: "title", maxLength: 120 }),
                 },

                 {
                     field: 'BarCord', title: fields.Barcode, align: "center", width: '110px',
                     rander: new mf.TextRander({ size: 9, title: "title", maxLength: 30 }),
                 },
                 {
                     field: 'GroupID', title: fields.VerifyTheGroupCode, align: "center", width: '200px',
                     //rander: new mf.SelectRander(params.PT0191213000018),
                     rander: new mf.AutoSelectRander("value", "text", params.PT0191213000018,
                   { MaxWidth: '180px', title: true, })
                 },
                 {
                     field: 'Lot', title: fields.BatchControl, align: "center", width: '130px',
                     rander: new mf.SelectRander([{ value: 0, text: fields.NoControl }, { value: 1, text: fields.Control }]),

                  },
                  {
                      field: 'LotClass', title: fields.LotClass, align: "center", width: '150px', 
                      rander: new mf.FKRander(
                          "#CategoryCodeDialogs", "#CategoryCodeConfirmBtns",
                          CategoryCodeTables,
                          new mf.TextRander({ size: 8, readonly: 'readonly', title: "title" }),
                          { btnTitle: "", btnClass: "btn btn-success btn-xs", searchID: [{ value: "#CategoryCodeID", text: "" }] }
                  ),
                      fn_onEditingChange: function (table, $row, $cell, field, e) {
                          table.setEditingColumnValue($row, "LotClass", e.data.Code);
                          LotClass_ID = e.data.AutoNumberID;
                      }
                   
                  },
                   {
                       field: 'LotClassID', title: "", visible: false,
                       rander: new mf.DynamicValueRander(function () {
                           return LotClass_ID;
                       }),
                   },

                  {
                      field: 'LotMethod', title: fields.GroupBatchMode, align: "center", width: '130px',
                      rander: new mf.SelectRander(arry)

                  },
                  {
                     field: 'OverRate', title: fields.SuperCompletionRatio, align: "center", width: '130px', defaultValue:0,
                     rander: new mf.TextRander({ size: 10, title: "title", maxLength: 60, event: "input", eventName: "oninputnum(this)" }),
                     checkers: [
                     new mf.TextNotEmptyChecker(fields.PleaseFillInTheOverbookingRate),
                     new mf.IsNunbertwoChecker(fields.CanOnlyEnterNumbers)
                     ]     
                  },
                  {
                      field: 'SerialPart', title: fields.OrderNumber, align: "center", width: "90",
                      rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
                  },
                  {
                      field: 'KeyPart', title: fields.Keymaterial, align: "center", width: "90",
                      rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
                  },
                 {
                      field: 'Creator', title: fields.CreatePerson, align: "center", width: '130px',
                      rander: new mf.StaticValueRander(),
                 },
                 {
                     field: 'CreateTime', title: fields.CreateDate, align: "center", width: '130px',
                     rander: new mf.TextTimeRander(),
                 },
                  {
                      field: 'Modifier', title: fields.LastModifyPerson, align: "center", width: '130px',
                      rander: new mf.StaticValueRander(),
                  },
                  {
                      field: 'ModifiedTime', title: fields.LastModifyDate, align: "center",
                      rander: new mf.TextTimeRander(),
                  }
            ],
            operateColumWidth: "100px",
            fn_createBtn: function (data) {
                var $td = $('<td style="width:100px;text-align:center;">');
                $td.append('<button id="reviewClick" class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.reviewClick(this)" title="料品属性" >' + fields.ItemProperties + '</button>');
                return $td;
            }

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
        //$("#btn_save").attr("disabled", true);
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
        }, function () {
            table.loadData(null, null, 1);
        });
    };

    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(tips.info, tips.NoDataExport);
            return;
        }
        var Code = $("#ClassCode").val();
        var Status = $("#Status").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00010Export?Token=' + token + '&Code=' + Code + '&Status=' + Status;
    }

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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00010ImportV1',
                        data: formdata,
                        contentType: false,
                        processData: false,
                        enctype: 'multipart/form-data',
                        success: function (d) {
                            if (d.Isreason) {
                                msg.infoCall(tips.info, d.msg, function () {
                                    window.location.href = mf.domain + '/MES/api/Util/ImportDownload?Token=' + token + '&Name=' + d.FileName;
                                });
                            }
                            else {
                                msg.success(tips.info, d.msg, function () {
                                    $('#inputDialog').modal('hide');
                                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                                    window.location.reload();
                                });
                            }
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
                        }
                    });
                })
            }
        });
    }
 
    //设置屬性弹窗表格
    var AttributesTable = new mf.Table("#AttributesTable", {
        uniqueId: "ParameterID",
        paginationBar: new mf.PaginationBar("#paginagionAttributesBar"),
        editable: false,
        LastWidth: "215",
        fn_getData: function (pagination, searchData, success) {

            var Code = $("#AAttributeCode").val();

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getparameterList',
                data: ({ page: pagination.page, rows: pagination.rows, Code: Code, "typeID": "00000F" }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.Attributes, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, maxLength: 20, title: "title" })),
            },
            {
                field: 'Name', title: fields.Description, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 60, title: "title" })),
            },
            {
                field: 'Comments', title: fields.Remarks, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: "title" })),
            }
        ]
    });

    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({
                URL: "/MES/IntelligentParameters/INF00010",
                Parameters: { row: data }
            });
            window.location.href = '/MES/IntelligentParameters/INF00010Languages';
        }, null);
    }

    //料品属性开窗
    this.reviewClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) 
            return;

        table.goForword(function () {
            ItemID = row.ItemID;
            //alert(ItemID);
            if (!ItemID && ItemID.length <= 0) {
                console.error("can't get ParameterID from table");
                return;
            }
            ItemTable.loadData();
            $("#ItemCode").val(row.Code);
            $("#Name").val(row.Name);
            $('#ItemPropertiesDialog').modal("show");
        }, function () {
            ItemID = row.ItemID;
            //alert(ItemID);
            if (!ItemID && ItemID.length <= 0) {
                console.error("can't get ParameterID from table");
                return;
            }
            ItemTable.loadData();
            $("#ItemCode").val(row.Code);
            $("#Name").val(row.Name);
            $('#ItemPropertiesDialog').modal("show");
        }, fields.Isleave);


    };

    //料品属性明细列表
    var ItemTable = new mf.Table("#ItemTable", {
        uniqueId: "ItemAttributeID",
        dblclick_editable: false,
        LastWidth: "222",
        paginationBar: new mf.PaginationBar("#paginagionItemBar"),
        fn_getData: function (pagination, searchData, success) {

            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00010AttributeGetList',
                data: ({ page: pagination.page, rows: pagination.rows, ItemID: ItemID }),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {

            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00010AttributeSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        focusField: "Code",
        height: 300,
        columns: [
             {
                 field: 'AttributeCode', title: fields.Attributes, require: true, align: "center", width: "150",
                 rander: new mf.WirteOnceOnlyRander(new mf.FKRander("#AttributesDialog",
                                          "#AttributesComfirm",
                                          AttributesTable,
                                          new mf.TextRander(
                                              {
                                                  size: 10, readonly: 'readonly'
                                              }
                                          ),
                                          {
                                              btnTitle: "",
                                              btnClass: "btn btn-success btn-xs",
                                          })),
                 fn_onEditingChange: function (table, $row, $cell, field, e) {
                     table.setEditingColumnValue($row, "AttributeCode", e.data.Code);
                     table.setEditingColumnValue($row, "AttributeName", e.data.Name);
                     table.setEditingColumnValue($row, "Comments", e.data.Comments);
                     AttributeID = e.data.ParameterID;
                 },
                 checkers: [
                    new mf.TextNotEmptyChecker(fields.AttributesIsNull)
                 ],
             },
           //属性流水号
           {
               field: 'AttributeID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return AttributeID;
               })
           },
           //料品流水号
           {
               field: 'ItemID', title: "", visible: false,
               rander: new mf.DynamicValueRander(function () {
                   return ItemID;
               })
           },
           {
               field: 'AttributeName', title: fields.Description, align: "center", width: "160",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, maxLength: 60, title: "title", disabled: 'disabled' })),
           },
           {
               field: 'Comments', title: fields.Remarks, align: "center",
               rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 27, maxLength: 120, title: "title", disabled: 'disabled' })),
           }
        ]
    });

    this.AddItemClick = function () {
        if (!ItemTable)
            return;
        ItemTable.addRow();
    }
    this.ChangeItemClick = function () {
        if (!ItemTable)
            return;
        ItemTable.editRow();
    };
    this.DeleteItemClick = function () {
        if (!ItemTable)
            return;
        ItemTable.deleteRow();

    };
    this.SaveItemClick = function () {
        if (!ItemTable)
            return;
        ItemTable.save(null, null, true);
    };
    this.CleartableClick = function () {
        if (!ItemTable)
            return;
        ItemTable.goForword(function () {
            ItemTable.loadData();
            table.loadData();
            $('#ItemPropertiesDialog').modal("hide");
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
            $('#ItemPropertiesDialog').modal("hide");
        }, fields.Isleave);
    };

    //属性弹窗查询
    this.AttributesSearch = function () {
        AttributesTable.goForwordSafely(function () {
            AttributesTable.loadData(null, null, 1);
        }, null);
    };

    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
    };
};

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

var URL = "/MES/IntelligentParameters/INF00010";
var MID = window.top.page_parameters.GetParameters(URL);
var fields = GetField("/Data/tables/MES/IntelligentParameters/INF00010", "INF00010");
var model = new viewModel();
var params = mf.format.getMesParameters('019121300000B,019121300000C,0191213000002,0191213000003,0191213000053,0191213000001,0191213000018,0191213000060');
console.log(params);
model.init("#ClassificationGroupTable", "#paginagionBar");