
var viewModel = function () {
    var self = this;
    var table = null;
    var ExportTotal = SequenceNum = 0, parameters, ItemID, InspectionType, ProcessID = "", OperationID = urlParameters.OperationID;
    var SettingType = urlParameters.SettingType;
    var detailTable = null;
    var Narray = [{ value: "", text: "" }], Projectarry = [], ProjectData, DisadvantagesOne, DisadvantagesTwo, DisadvantagesThree;
    var ProjectName, ProjectInspectionStandard, ProjectInspectionLevelName, ProjectDisadvantagesName, ProjectAttribute;

    //设置状态值
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "019121300001B,019121300001E,0191213000052,019121300001C" },
        success: function (data) {

            parameters = data;
            for (var i = 0; i < parameters.PT019121300001E.length; i++) {
                Narray[i] = { value: parameters.PT019121300001E[i].value, text: parameters.PT019121300001E[i].Newvalue }
            }
        }
    });

    //设置檢驗項目
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/PopUp/QCS00004GetInspectionProjectList",
        success: function (data) {
            if (data == null) {
                ProjectName = "";
                ProjectInspectionStandard = "";
                ProjectInspectionLevelName = "";
                ProjectDisadvantagesName = "";
                ProjectAttribute = "";
                return;
            }
            console.log("ProjectData" + JSON.stringify(data))
            ProjectData = data;
            DisadvantagesOne = ProjectData[0].Disadvantages;
            DisadvantagesTwo = ProjectData[0].Disadvantages;
            DisadvantagesThree = ProjectData[0].Disadvantages;
            for (var i = 0; i < data.length; i++) {
                Projectarry[i] = { value: data[i].InspectionProjectID, text: data[i].Code + "-" + data[i].Name }
            }
        }
    });

    console.log(urlParameters);
    if (SettingType.substring(5, SettingType.length) == "020121300007C") {
        $("#CheckGroupCodespan").text(fields.CheckGroupCode);
        $("#CheckGroupNamespan").text(fields.CheckGroupName);
        //$("#btn_import").css("display", "none");
        //主表 制程巡检，首件检验，等共用
        table = new mf.Table("#QCS00004SameTable", {
            uniqueId: "ID",
            editable: true,
            paginationBar: new mf.PaginationBar("#paginagionBar"),
            height: (window.innerHeight - 240) / 2,//根据窗口高度变化
            LastWidth: "130",
            IsSetTableWidth: true,
            fn_getData: function (pagination, data, success) {
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/QualityManagement/Qcs00004GroupGetHeaderList',
                    data: ({
                        page: pagination.page,
                        rows: pagination.rows,
                        PartID: urlParameters.ItemID,
                        InspectionType: urlParameters.InspectionType,

                    }),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success) {

                for (var i = 0; i < saveData.inserted.length; i++) {
                    saveData.inserted[i].InspectionType = urlParameters.InspectionType;
                    saveData.inserted[i].GroupID = urlParameters.ItemID;
                }

                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/QualityManagement/Qcs00004GroupHeaderSave',
                    data: JSON.stringify(saveData),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            fn_onRowClick: function (row) {
                ProcessID = row.ProcessID;

                OperationID = row.OperationID;

                if (ProcessID != null) {
                    detailTable.loadData();
                }
                $("#btn_import").attr("disabled", false);
            },
            fn_checkeditable: function ($selectedRow) {
                var row = table.getRowData($selectedRow);
                console.log(row.IsInspection);
                if (row.IsInspection == null) {
                    return true;
                }
                else {
                    return false;
                }
            },
            columns: [

                    //检验群码流水号
                   {
                       field: 'GroupID', title: "", visible: false,
                       rander: new mf.TextRander()
                   },
                    //檢驗種類流水号
                   {
                       field: 'InspectionType', title: "", visible: false,
                       rander: new mf.TextRander()
                   },
                    //檢驗設定型態流水号
                   //{
                   //    field: 'SettingType', title: "", visible: false,
                   //    rander: new mf.TextRander()
                   //},
                    {
                        field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "90",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "100",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'OperationName', title: fields.WorkOrderDescription, align: "center", width: "120",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'Comments', title: fields.Remark, align: "center", width: "130",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'IsInspection', title: fields.IsTest, align: "center", width: "110",
                        rander: new mf.SelectRander([{ value: 1, text: fields.Fulfilled }, { value: 0, text: fields.FreeTest }]),
                    },
                    {
                        field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                        rander: new mf.TextTimeRander({ title: true }),
                    },
                    {
                        field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                        rander: new mf.StaticValueRander({ title: true }),

                    },
                    {
                        field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                        rander: new mf.TextTimeRander({ title: true }),
                    },
                    //制程流水号
                    {
                        field: 'ItemProcessID', title: "", visible: false,
                        rander: new mf.TextRander({ title: "title" }),
                    },
                    //工序流水号
                    {
                        field: 'ItemOperationID', title: "", visible: false,
                        rander: new mf.TextRander({ title: "title" }),
                    }
            ]
        });
        table.loadData();

    }
    else {
        //$("#btn_import").css("display", "inline-block");
        $("#CheckGroupCodespan").text(fields.ItemNo);
        $("#CheckGroupNamespan").text(fields.ItemName);
        //主表 制程巡检，首件检验，等共用
        table = new mf.Table("#QCS00004SameTable", {
            uniqueId: "ID",
            editable: true,
            paginationBar: new mf.PaginationBar("#paginagionBar"),
            height: (window.innerHeight - 240) / 2,//根据窗口高度变化
            LastWidth: "130",
            IsSetTableWidth: true,
            fn_getData: function (pagination, data, success) {
                mf.ajax({
                    type: 'Get',
                    url: '/MES/api/QualityManagement/Qcs00004GetHeaderList',
                    data: ({
                        page: pagination.page,
                        rows: pagination.rows,
                        PartID: urlParameters.ItemID,
                        InspectionType: urlParameters.InspectionType,
                        SettingType: urlParameters.SettingType,

                    }),
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        success(data);
                    }
                });
            },
            fn_saveData: function (saveData, success) {
                var ins = saveData.inserted,
                    del = saveData.deleted,
                    upd = saveData.updated;
                for (var i = 0, len = ins.length; i < len; i++) {
                    ins[i].InspectionType = urlParameters.InspectionType;

                }
                for (var i = 0, len = del.length; i < len; i++) {
                    del[i].InspectionType = urlParameters.InspectionType;

                }
                for (var i = 0, len = upd.length; i < len; i++) {
                    upd[i].InspectionType = urlParameters.InspectionType;

                }

                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/QualityManagement/Qcs00004HeaderSave',
                    data: JSON.stringify(saveData),
                    success: function (data) {
                        success(data);
                    }
                });
            },
            fn_onRowClick: function (row) {
                ProcessID = row.ProcessID;

                OperationID = row.OperationID;

                if (ProcessID != null) {
                    detailTable.loadData();
                }
                $("#btn_import").attr("disabled", false);
            },
            columns: [
                    //料号流水号
                    {
                        field: 'PartID', title: "", visible: false,
                        rander: new mf.DynamicValueRander(function () {
                            return urlParameters.ItemID;
                        })
                    },
                    //檢驗種類流水号
                    //{
                    //    field: 'InspectionType', title: "", visible: false,
                    //    rander: new mf.DynamicValueRander(function () {
                    //        return InspectionType;
                    //    })
                    //},
                    //檢驗設定型態流水号
                    {
                        field: 'SettingType', title: "", visible: false,
                        rander: new mf.DynamicValueRander(function () {
                            return SettingType;
                        })
                    },
                    {
                        field: 'ProcessCode', title: fields.ProcessNo, align: "center", width: "140",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'ProcessName', title: fields.ProcessDescription, align: "center", width: "90",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'OperationCode', title: fields.WorkOrderNo, align: "center", width: "100",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'OperationName', title: fields.WorkOrderDescription, align: "center", width: "120",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'Comments', title: fields.Remark, align: "center", width: "130",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'IsIP', title: fields.IsTest, align: "center", width: "110", visible: urlParameters.IsIP,
                        rander: new mf.SelectRander([{ value: 1, text: fields.Fulfilled }, { value: 0, text: fields.FreeTest }]),
                    },
                    {
                        field: 'IsFPI', title: fields.IsTest, align: "center", width: "110", visible: urlParameters.IsFPI,
                        rander: new mf.SelectRander([{ value: 1, text: fields.Fulfilled }, { value: 0, text: fields.FreeTest }]),
                    },
                    {
                        field: 'IsOSI', title: fields.IsTest, align: "center", width: "110", visible: urlParameters.IsOSI,
                        rander: new mf.SelectRander([{ value: 1, text: fields.Fulfilled }, { value: 0, text: fields.FreeTest }]),
                    },
                    {
                        field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                        rander: new mf.StaticValueRander({ title: true }),
                    },
                    {
                        field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                        rander: new mf.TextTimeRander({ title: true }),
                    },
                    {
                        field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                        rander: new mf.StaticValueRander({ title: true }),

                    },
                    {
                        field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                        rander: new mf.TextTimeRander({ title: true }),
                    },
                    //制程流水号
                    {
                        field: 'ItemProcessID', title: "", visible: false,
                        rander: new mf.TextRander({ title: "title" }),
                    },
                    //工序流水号
                    {
                        field: 'ItemOperationID', title: "", visible: false,
                        rander: new mf.TextRander({ title: "title" }),
                    }
            ]
        });
        table.loadData();        
    }

    detailTable = new mf.Table("#QCS00004SDetailTable", {
        uniqueId: "StaInsSpeSettingID",
        noNumColumn: true,
        focusField: "Sequence",
        focusEditField: "Sequence",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_getData: function (pagination, data, success) {
            var Code = $("#PatrolCategoryNo").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/QualityManagement/Qcs00004GetDetailsList',
                data: ({
                    page: pagination.page,
                    rows: pagination.rows,
                    PartID: urlParameters.ItemID,
                    InspectionType: urlParameters.InspectionType,
                    SettingType: SettingType,
                    ProcessID: ProcessID,
                    OperationID: urlParameters.OperationID || OperationID,
                    Code: Code
                }),
                success: function (data) {
                    //console.log("明细："+JSON.stringify(data))
                    SequenceNum = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            for (var i = 0, len = saveData.inserted.length; i < len; i++) {
                //saveData.inserted[i].DisadvantagesOne = DisadvantagesOne;
                saveData.inserted[i].InspectionType = urlParameters.InspectionType;
                saveData.inserted[i].PartID = urlParameters.ItemID;
                saveData.inserted[i].ProcessID = ProcessID;
                saveData.inserted[i].OperationID = OperationID;
                saveData.inserted[i].SettingType = SettingType;
                //saveData.inserted[i].CategoryID = $("#CategoryID").val();
                //saveData.inserted[i].InspectionMethod = $("#InspectionMethod").val();
                //saveData.inserted[i].Disadvantages = DisadvantagesOne;
            }

            for (var i = 0, len = saveData.deleted.length; i < len; i++) {
                saveData.deleted[i].Disadvantages = DisadvantagesOne;
                saveData.deleted[i].InspectionType = urlParameters.InspectionType;
                saveData.deleted[i].PartID = urlParameters.ItemID;
                saveData.deleted[i].ProcessID = ProcessID;
                saveData.deleted[i].OperationID = OperationID;
                saveData.deleted[i].SettingType = SettingType;
            }

            for (var i = 0, len = saveData.updated.length; i < len; i++) {
                saveData.updated[i].Disadvantages = DisadvantagesOne;
                saveData.updated[i].InspectionType = urlParameters.InspectionType;
                saveData.updated[i].PartID = urlParameters.ItemID;
                saveData.updated[i].ProcessID = ProcessID;
                saveData.updated[i].SettingType = SettingType;
                saveData.updated[i].OperationID = OperationID;
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/QualityManagement/Qcs00004DetailSave',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                    console.log(JSON.stringify(data));
                }
            });
        },
        height: (window.innerHeight - 250) / 2, //根据窗口高度变化

        isRealDelete: true,
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: "Post",
                url: "/MES/api/QualityManagement/Qcs00004DetailDelete",
                data: JSON.stringify({ StaInsSpeSettingID: rowData.StaInsSpeSettingID }),
                success: function (data) {
                    if (data.status == "200")
                        msg.success(fields.Prompt, data.msg);
                    else
                        msg.info(fields.Prompt, data.msg);
                    table.loadData();
                    detailTable.loadData();
                }
            });
        },
        columns: [
           //料号流水号
            {
                field: 'PartID', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return ItemID;
                })
            },


           // 檢驗設定型態流水号
            {
                field: 'SettingType', title: "", visible: false,
                rander: new mf.TextRander({})
            },
            {
                field: 'Sequence', title: fields.Sorting, align: "center", width: "75", require: true,
                rander: new mf.TextRander({ size: 2, title: "title", maxlength: 4 }),
                checkers: [
                    new mf.IsOnlyNumberChecker(fields.SortingIsNum),
                    new mf.TextNotEmptyChecker(fields.SequenceIsNull)
                ],
            },
            {
                field: 'CategoryID', title: fields.InspectionCategoryNo, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander("value", "text", Narray, { title: true })),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var Data = parameters.PT019121300001E;
                    var CategoryID = table.getEditingColumnValue($row, 'CategoryID');
                    for (var i = 0; i < Data.length; i++) {
                        if (CategoryID == Data[i].value) {
                            table.setEditingColumnValue($row, "CategoryName", Data[i].text);
                        }
                    }
                },
            },
            {
                field: 'CategoryName', title: fields.TestCategoryName, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title", disabled: 'disabled' })),
                defaultValue: Narray[0].text,
            },
            {
                field: 'InspectionMethod', title: fields.InspectionMethod, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander("value", "text", parameters.PT019121300001B, { title: true })),
            },
            {
                field: 'InspectionProjectID', title: fields.TestItemsNo, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander("value", "text", Projectarry, { title: true })),
                fn_onEditingChange: function (table, $row, $cell, field, e) {
                    var InspectionProjectID = table.getEditingColumnValue($row, 'InspectionProjectID');


                    for (var i = 0; i < ProjectData.length; i++) {
                        if (InspectionProjectID == ProjectData[i].InspectionProjectID) {
                            table.setEditingColumnValue($row, "InspectionProjectName", ProjectData[i].Name);
                            table.setEditingColumnValue($row, "InspectionStandard", ProjectData[i].InspectionStandard);
                            table.setEditingColumnValue($row, "InspectionLevelName", ProjectData[i].InspectionLevelName);
                            table.setEditingColumnValue($row, "DisadvantagesName", ProjectData[i].DisadvantagesName);
                            table.setEditingColumnValue($row, "Attribute", ProjectData[i].Attribute);
                            //table.setEditingColumnValue($row, "AQL", ProjectData[i].AQL);
                            DisadvantagesOne = ProjectData[i].Disadvantages;
                            console.log(ProjectData[i])
                        }
                    }
                },
            },
            {
                field: 'InspectionProjectName', title: fields.TestItemsDec, align: "center", width: "120",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, title: "title", disabled: 'disabled' })),
                defaultValue: ProjectName,
            },
            {
                field: 'InspectionStandard', title: fields.TestStandard, align: "center", width: "120",
                rander: new mf.TextRander({ size: 10, title: "title" }),
                defaultValue: ProjectInspectionStandard,
            },
            {
                field: 'InspectionLevelName', title: fields.InspectionLevel, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' })),
                defaultValue: ProjectInspectionLevelName,
            },
            {
                field: 'DisadvantagesName', title: fields.Disadvantages, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 8, title: "title", disabled: 'disabled' })),
                defaultValue: ProjectDisadvantagesName,
            },
            //缺点等级流水号
            {
                field: 'Disadvantages', title: "", visible: false,
                rander: new mf.DynamicValueRander(function () {
                    return DisadvantagesOne;
                })
            },
            {
                field: 'AQL', title: fields.AQL, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.AutoSelectRander("value", "text", parameters.PT019121300001C, { noSearchSelectedText: "", title: true, disabled: 'disabled' })),
            },
            {
                field: 'Attribute', title: fields.MeasuredvalueSet, align: "center", width: "120",
                rander: new mf.AutoSelectRander("value", "text", parameters.PT0191213000052, { title: true }),
                defaultValue: ProjectAttribute,
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "140",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 14, title: "title", maxlength: 120 })),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: true }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: true }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
                rander: new mf.StaticValueRander({ title: true }),

            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander({ title: true }),
            },
            //制程流水号
            {
                field: 'ProcessID', title: "", visible: false,
                rander: new mf.TextRander({})
            },
            //工序流水号
            {
                field: 'OperationID', title: "", visible: false,
                rander: new mf.TextRander({})
            },
        ]

    });






 
    //
    //导入
    this.importClick = function () {
        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnImport").unbind();
        $("#BtnBrowse").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectFile);
            }
        });
     

        $("#BtnImport").click(function () {
            var formData = new FormData();
            formData.append("File", document.getElementById("BtnFile").files[0]);
            formData.append("Token", token);
            formData.append("SettingType", urlParameters.SettingType);
            formData.append("InspectionType", urlParameters.InspectionType);
            formData.append("PartID", urlParameters.ItemID);
            formData.append("ProcessID", ProcessID);
            formData.append("OperationID", OperationID);

            $.ajax({
                type: "POST",
                url: window.top.mf.domain + "/MES/api/ImportFile/Qcs00004Import",
                data: formData,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (res) {
                    if (res.status == "200" || res.Status == 200) {
                        msg.success(fields.Prompt, res.msg);
                        detailTable.loadData();
                        $('#ImportDialog').modal('hide');
                    }                   
                    else {
                        msg.info(fields.Prompt, res.msg);
                    }                   
                }
            });
        });
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    }

    //save
    this.saveClick = function () {
        if (table) {          
            table.save(null, null, true);
        }
    }

    //back
    this.backClick = function () {
        //table.goForwordSafely(function () {
        //    detailTable.goForwordSafely(function () {
        //        $("#PatrolCategoryNo").val("");
        //        window.top.page_parameters.Caching.push({ URL: urlParameters.parentUrl, Parameters: urlParameters.parentMID });
        //        window.location.href = urlParameters.parentUrl;
        //    });
        //})
        if (!table)
            return;
        if (table.SaveOrNotStatus()) {
            msg.warning(fields.info,
                    fields.Isleave,
                    function () {
                        window.top.page_parameters.Caching.push({ URL: urlParameters.parentUrl, Parameters: urlParameters.parentMID });
                        window.location.href = urlParameters.parentUrl;
                    }, function () {
                        // 取消查询
                    });
        }
        else if (detailTable.SaveOrNotStatus()) {
            msg.warning(fields.info,
                   fields.Isleave,
                   function () {
                       window.top.page_parameters.Caching.push({ URL: urlParameters.parentUrl, Parameters: urlParameters.parentMID });
                       window.location.href = urlParameters.parentUrl;
                   }, function () {
                       // 取消查询
                   });
        }
        else{
            window.top.page_parameters.Caching.push({ URL: urlParameters.parentUrl, Parameters: urlParameters.parentMID });
            window.location.href = urlParameters.parentUrl;
        }
            
    }

    this.editClick = function () {
        if (table) {
            table.editRow();
        }
    }

    //明细表
    //新增
    this.FirstTestDetailsaddClick = function () {
        if (detailTable) {
            var data = table.getSelectedData();
            if (!data)
                return;
            detailTable.addRow();

    

            $("#Sequence").val(SequenceNum +1);
          

           $("#InspectionProjectName").val(ProjectData[0].Name);
           $("#InspectionStandard").val( ProjectData[0].InspectionStandard);
           $("#InspectionLevelName").val(ProjectData[0].InspectionLevelName);
            $("#DisadvantagesName").val( ProjectData[0].DisadvantagesName);
            $( "#Attribute").val( ProjectData[0].Attribute);
            //table.setEditingColumnValue($row, "AQL", ProjectData[i].AQL);
            $("#DisadvantagesOne").val( ProjectData[0].Disadvantages);
        }
    }

    //edit
    this.FirstTestDetailseditClick = function () {
        if (detailTable) {
            detailTable.editRow();
        }
    }
    //save
    this.FirstTestDetailssaveClick = function () {
        if (detailTable) {
            detailTable.save(function () {
                table.loadData();
            }, null, true);
        }
    }

    //search
    this.ProcessPatrolNoSearch = function () {
        var data = table.getSelectedData();

        if (!data)
            return;

        if (!detailTable)
            return;

        detailTable.goForwordSafely(function () {
            detailTable.loadData(null, null, 1);
        })
        
    }

    this.FirstTestDetailsdeleteClick = function () {
        if (!table) {
            return;
        }

        detailTable.deleteRow();
    }

}
var URL = "/MES/QualityManagement/QCS00004Same";
var urlParameters = window.top.page_parameters.GetParameters("/MES/QualityManagement/QCS00004Same");
var MID = window.top.page_parameters.GetParameters(URL);

var arrayWord = [
    "ItemNo", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "ItemName", "SupplyType",
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export", "Status", "NoDataExport",
    "Normal", "Invalid", "PleaseSelectFile", "Browse", "info", "Cancel", "Langwage", "Unit", "GoodsName", "Specification",
    "Remark", "ItemMasterFile", "Comfirm", "ProcessPatrol", "TestType", "ProcessTest", "FirstTest", "InspectionCategoryNo",
    "IsTest", "ProcessNo", "ProcessDescription", "EnableProcess", "WorkOrderNo", "WorkOrderDescription", "IsTest",
    "Sorting", "InspectionCategoryNo", "TestCategoryName", "InspectionMethod", "Disadvantages", "TestItemsNo", "TestItemsDec",
    "TestStandard", "InspectionLevel", "AQL", "MeasuredvalueSet", "ProductProcessFile", "FreeTest", "Fulfilled", "SortingIsNum",
    "SequenceIsNull", "Isleave", "Back", "Prompt", "CheckGroupName", "CheckGroupCode"
];

words = arrayWord.join();

var model = null;
var parameters = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
   
    $("#PatrolItemNo").val(urlParameters.Code);
    $("#PatrolGoodsName").val(urlParameters.Name);
    $("#PatrolItemNo").attr("title", urlParameters.Code);
    $("#PatrolGoodsName").attr("title", urlParameters.Name);   
    model = new viewModel();
};