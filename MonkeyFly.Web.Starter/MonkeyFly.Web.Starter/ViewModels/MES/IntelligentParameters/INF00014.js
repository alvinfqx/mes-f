var viewModel = function () {
    var self = this;
    var table = null, Namearry = [];
    var ExportTotal, CalendarID, Month, ECalendarID;
    var IsSave = true, AIfdefault;

    //开始年月
    $('#startDate').datepicker({
        language: language,
        format: 'yyyy-mm',
        autoclose: true,
        startView: 'year',
        maxViewMode: 2,
        minViewMode: 1,
        todayBtn: "linked"
    });

    //结束年月
    $('#endDate').datepicker({
        language: language,
        format: 'yyyy-mm',
        autoclose: true,
        startView: 'year',
        maxViewMode: 2,
        minViewMode: 1,
        todayBtn: "linked"
    });

    //设置状态
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            var Listdata = data.PT0191213000001;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
        }
    });

    var formModel = {
        Code: ko.observable(),
        Name: ko.observable(),
        Ifdefault: ko.observable(),
        startDate: ko.observable(),
        endDate: ko.observable(),
        MON: ko.observable(),
        TUE: ko.observable(),
        WED: ko.observable(),
        THU: ko.observable(),
        FRI: ko.observable(),
        SAT: ko.observable(),
        SUN: ko.observable(),
        Date: ko.observable(),
        Comments: ko.observable(),
        MainCalendar: ko.observable(),
        Status: ko.observable(),
        DMainCalendar: ko.observable(),
        DStatus: ko.observable(),
        //StatusArray: ko.observableArray(),
        //IfdefaultArray: ko.observableArray(),
        //DIfdefaultArray: ko.observableArray(),
        DateArray: ko.observableArray()
    };
    ko.applyBindings(formModel);

    //formModel.DIfdefaultArray([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]);
    //formModel.IfdefaultArray([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]);
    //formModel.StatusArray(Namearry);

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
    //语序
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.CalendarID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.CalendarCode + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.CalendarDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.CalendarDescription,
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
            tableID: "34",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };
    //导出
    this.exportClick = function () {
        if (ExportTotal == 0) {
            msg.info(fields.info, fields.NoDataExport);
            return;
        }
        var Code = $("#Code").val();
        window.location.href = mf.domain + '/MES/api/ExportFile/Inf00014Export?Token=' + token + '&Code=' + Code;
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
                        url: window.top.mf.domain + '/MES/api/ImportFile/Inf00014Import',
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
    //显示单日维护  
    this.DayMaintenanceClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);
        var dateArray = [];

        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var mydate = (year.toString() + "-" + month.toString());
        var nowdate = "";

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }
        $('#DetailsDialog').modal("show");
        $("#DCalendarCode").val(row.Code);
        $("#DCalendarName").val(row.Name);
        $("#DRemark").val(row.Comments);
        if (row.Ifdefault == 0) {
            formModel.DMainCalendar(fields.no);
        }
        else {
            formModel.DMainCalendar(fields.yes);
        }
        formModel.Ifdefault(row.Ifdefault);
        for (var i = 0; i < Namearry.length; i++) {
            if (Namearry[i].value == row.Status) {
                formModel.DStatus(Namearry[i].text);
            }
        }
        //formModel.DMainCalendar(row.Ifdefault);
        //formModel.DStatus(row.Status);
        formModel.DateArray(dateArray);
        $("#DCalendarCode").attr("title", row.Code);
        $("#DCalendarName").attr("title", row.Name);
        $("#DRemark").attr("title", row.Comments);
        CalendarID = row.CalendarID;
        
        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentParameter/Inf00014GetDetailsList',
            data: { CalendarID: CalendarID },
            async: false,
            success: function (data) {                                           
                if (data != "") {
                    nowdate = data[0].Date;
                    for (var i = 0; i < data.length; i++) {
                        dateArray[i] = { value: data[i].Date, text: data[i].Date }
                        if (data[i].Date == mydate) {
                            nowdate = data[i].Date;
                        }
                    }
                    formModel.DateArray(dateArray);
                    formModel.Date(nowdate);
                    mf.ajax({
                        type: 'Get',
                        url: '/MES/api/IntelligentParameter/Inf00014GetMonthList',
                        data: { Month: nowdate, CalendarID: CalendarID },
                        async: false,
                        success: function (ref) {
                            //alert(JSON.stringify(ref));
                            calender("calSchedule", ref.week, ref.num, ref.year, ref.month, ref.day, false);
                        }
                    });
                } else {
                    calender("calSchedule", null, null, null, null, null, true);
                }
            }
        });
        
    };
    //单日維護保存
    this.DaySave = function () {
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var mydate = (year.toString() + "-" + month.toString());

        if (mydate > formModel.Date()) {
            msg.info(fields.info, fields.Dateiserror);
            return;
        }

        var tab = document.getElementById("calSchedule");
        var str = null;
        var num = null;
        for (var i = 0; i < tab.getElementsByTagName("input").length; i++) {
            num = i + 1;
            if (str == null)
                str = num + ":" + tab.getElementsByTagName("input")[i].value;
            else
                str = str + "," + num + ":" + tab.getElementsByTagName("input")[i].value;
        }
        var post = {};
        post.Date = formModel.Date();
        post.CalendarID = CalendarID;
        post.Days = str;
        mf.ajax({
            type: 'post',
            url: '/MES/api/IntelligentParameter/Inf00014UpdateDetails',
            data: JSON.stringify(post),
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#DayComfirm").attr("disabled", true);
            },
            success: function (d) {
                if (d.status == "200") {
                    msg.success(fields.info, d.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    });
                }
                else {
                    msg.error(fields.info, d.msg);
                }
            },
            complete: function () {
               $("#DayComfirm").removeAttr("disabled");
            }
        });
    };
    this.DayCancel = function () {
        $("#DayComfirm").removeAttr("disabled");
        $("#DuringCommit").removeAttr("disabled");
    }
    $("#Date").click(function () {
        mf.ajax({
            type: 'Get',
            url: '/MES/api/IntelligentParameter/Inf00014GetMonthList',
            data: { Month: formModel.Date(), CalendarID: CalendarID },
            async: false,
            success: function (ref) {
                calender("calSchedule", ref.week, ref.num, ref.year, ref.month, ref.day, false);
            }
       });
    });
    //显示期間維護  
    this.DuringMaintenanceClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (!row) {
            msg.info(fields.info, fields.PropertyNumberIsEdit);
            return;
        }

        CalendarID = row.CalendarID;
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var mydate = (year.toString() + "-" + month.toString());
        formModel.startDate("");
        formModel.endDate("");
        $('#DuringMaintenanceDialog').modal("show");
        $("#CalenderCode").val(row.Code);
        $("#CalendarName").val(row.Name);
        $("#Comments").val(row.Comments);
        if (row.Ifdefault == 0) {
            formModel.Ifdefault(fields.no);
        }
        else {
            formModel.Ifdefault(fields.yes);
        }
        for (var i = 0; i < Namearry.length; i++) {
            if (Namearry[i].value == row.Status) {
                formModel.Status(Namearry[i].text);
            }
        }        
        formModel.startDate(mydate);
        formModel.endDate(mydate);
        formModel.MON("8.0");
        formModel.TUE("8.0");
        formModel.WED("8.0");
        formModel.THU("8.0");
        formModel.FRI("8.0");
        formModel.SAT("8.0");
        formModel.SUN("8.0");
        $("#DCalendarCode").attr("title", row.Code);
        $("#DCalendarName").attr("title", row.Name);
        $("#DRemark").attr("title", row.Comments);
    };
    //期間維護保存
    this.duringSave = function () {

        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var mydate = (year.toString() + "-" + month.toString());

        if (!formModel.startDate()) {
            msg.info(fields.info, fields.StartYearIsNull);
            return;
        }

        else if (!formModel.endDate()) {
            msg.info(fields.info, fields.EndYearIsNull);
            return;
        }

        else if (formModel.MON() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.TUE() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.WED() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.THU() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.FRI() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.SAT() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.SUN() > 24) {
            msg.info(fields.info, fields.WorkTimeIsNull);
            return;
        }

        else if (formModel.startDate() > formModel.endDate()) {
            msg.info(fields.info, fields.StartYearisEndYear);
            return;
        }

        else if (formModel.startDate() > formModel.endDate()) {
            msg.info(fields.info, fields.StartYearisEndYear);
            return;
        }

        else if (mydate > formModel.endDate()) {
            msg.info(fields.info, fields.endDateiserror);
            return;
        }

        else if (mydate > formModel.startDate()) {
            msg.info(fields.info, fields.startDateiserror);
            return;
        }

        var saveData = {
            CalendarID:CalendarID,
            startDate: formModel.startDate(),
            endDate: formModel.endDate(),
            MON: formModel.MON(),
            TUE: formModel.TUE(),
            WED: formModel.WED(),
            THU: formModel.THU(),
            FRI: formModel.FRI(),
            SAT: formModel.SAT(),
            SUN: formModel.SUN()
        }

        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00014PeriodUpdate',
            data: JSON.stringify(saveData),
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#DuringCommit").attr("disabled", true);
            },
            success: function (data) {
                console.log(data);
                if (data.status == "200") {
                    msg.success(fields.info, data.msg, function () {
                        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                        window.location.reload();
                    });
                }
                else {
                    msg.error(fields.info, data.msg);
                }
            },
            complete: function () {
                $("#DuringCommit").removeAttr("disabled");
            }
        });
    }

    //设置表格
    table = new mf.Table("#CalendarTable", {
        uniqueId: "CalendarID",
        editable: true,
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        isFrozenColumn: true,
        fn_getData: function (pagination, searchData, success) {
            var Code = $("#Code").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00014GetList',
                data: { page: pagination.page, rows: pagination.rows, Code: Code },
                success: function (data) {
                    ExportTotal = data.total;
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00014Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        isRealDelete: true, //是否单个实时删除
        fn_realDelete: function (rowData, success) {
            var ID = rowData.CalendarID;
            mf.ajax({
                type: "post",
                url: "/MES/api/IntelligentParameter/Inf00014Delete",
                data: JSON.stringify({ CalendarID: ID }),
                success: function (data) {
                    success(data);
                }
            });
        },
        operateColumWidth: "150px",
        fn_createBtn: function (data) {
            var $td = $("<td style='text-align:center; width:150px;'> ");
            $td.append('<button class="btn btn-success btn-xs" id="DuringMaintenance" style="width:63px;" onclick="model.DuringMaintenanceClick(this)" title="' + fields.DuringMaintenance + '" >' + (fields.DuringMaintenance.length > 8 ? fields.DuringMaintenance.substring(0, 8) + "..." : fields.DuringMaintenance) + '</button>&nbsp;&nbsp;' +
                '<button id="DayMaintenance" class="btn btn-success btn-xs" style="margin-right: 5px; width:63px;" onclick="model.DayMaintenanceClick(this)"  title="' + fields.DayMaintenance + '" >' + (fields.DayMaintenance.length > 9 ? fields.DayMaintenance.substring(0, 9) + "..." : fields.DayMaintenance) + '</button>');
            return $td;
        },
        focusField: "Code",       
        height: window.innerHeight - 145,
        columns: [
            {
                field: 'Code', title: fields.CalendarCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 6, maxLength: 30, title: "title" })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CalendarCodeIsNull)
                ],
            },
            {
                field: 'Name', title: fields.CalendarDescription, require: true, align: "center", width: "130",
                rander: new mf.TextRander({ size: 11, maxLength: 120, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.CalendarDescriptionIsNull)
                ],
            },
            {
                field: 'Ifdefault', title: fields.MainCalendar, align: "center", width: "90",
                rander: new mf.SelectRander([{ value: 0, text: fields.no }, { value: 1, text: fields.yes }]),
                //fn_onEditingChange: function (table, $row, $cell, field, e) {
                //    alert(AIfdefault);
                //    if (!AIfdefault) {
                //        mf.ajax({
                //            type: 'Get',
                //            url: '/MES/api/IntelligentParameter/Inf00014CheckIfdefault',
                //            success: function (data) {
                //                if (data) {
                //                    msg.infoCall(fields.info, fields.ExistedMainCalendar, function () {
                //                        table.setEditingColumnValue($row, "Ifdefault", 0);
                //                    });
                //                }
                //            }
                //        });
                //    }                    
                //},
            },
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "150",
                rander: new mf.TextRander({ size: 15, maxLength: 120, title: "title" }),
            },
            {
                field: 'Status', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(Namearry),
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "110",
                rander: new mf.StaticValueRander({ title: "title" }),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander({ title: "title" }),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "100",
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

    //设置明细表格
    //var ParameterTypeTable = new mf.Table("#ParameterTypeTable",
    //{
    //    noNumColumn: true,
    //    uniqueId: "CalendarDetailID",
    //    editable: false,
    //    fn_getData: function (pagination, searchData, success) {

    //        mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/IntelligentParameter/Inf00014GetDetailsList',
    //            data: { CalendarID: CalendarID },
    //            async: false,
    //            success: function (data) {
    //                success(data);
    //                alert(JSON.stringify(data));
    //                if (data != "") {
    //                    mf.ajax({
    //                        type: 'Get',
    //                        url: '/MES/api/IntelligentParameter/Inf00014GetMonthList',
    //                        data: { Month: data[0].Date, CalendarID: CalendarID },
    //                        async: false,
    //                        success: function (ref) {
    //                            //alert(JSON.stringify(ref));
    //                            calender("calSchedule", ref.week, ref.num, ref.year, ref.month, ref.day, false);
    //                        }
    //                    });
    //                } else {
    //                    calender("calSchedule", null, null, null, null, null, true);
    //                }
    //            }
    //        });
    //    },
    //    fn_saveData: function (saveData, success) {
    //        //mf.ajax({
    //        //    type: 'Post',
    //        //    url: '/EMO/api/CommonInformation/Sys10340Save',
    //        //    data: JSON.stringify(saveData),
    //        //    async: false,
    //        //    success: function (data) {
    //        //        success(data);
    //        //    }
    //        //});
    //    },
    //    fn_onRowClick: function (row) {

    //        mf.ajax({
    //            type: 'Get',
    //            url: '/MES/api/IntelligentParameter/Inf00014GetMonthList',
    //            data: { Month: row.Date, CalendarID: CalendarID },
    //            async: false,
    //            success: function (ref) {
    //                calender("calSchedule", ref.week, ref.num, ref.year, ref.month, ref.day, false);
    //            }
    //        });
    //    },
    //    focusField: "Date",
    //    height: 265,
    //    columns: [
    //        {
    //            field: 'Year', title: fields.Year, align: "center", width: "115px", require: true,
    //            rander: new mf.TextRander()
    //        },
    //        {
    //            field: 'Month', title: fields.Month, align: "center", require: true,
    //            rander: new mf.TextRander()
    //        }
    //    ]
    //});

}

var URL = "/MES/IntelligentParameters/INF00014";

var MID = window.top.page_parameters.GetParameters(URL);

mf.toolBar('#container');

var arrayWord = [
    "CalendarCode", "CalendarDescription", "Remark", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate", "Import", "Status",
    "Import", "NoDataExport", "PleaseSelectFile", "Browse", "info", "Cancel", "Save", "CalendarCodeIsNull", "CalendarDescriptionIsNull",
    "MainCalendar", "yes", "no", "AddCalendar", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "StartYear",
    "EndYear", "Iscover", "Normal", "Invalid", "Details", "info", "PropertyNumberIsEdit", "Year", "Month", "StartYearIsNull", "EndYearIsNull",
    "WorkTimeIsNull", "IsDelete", "Cancel", "New", "Change", "Deletion", "EditCalendar", "Calendars", "StartYearisEndYear", "endDateiserror",
    "startDateiserror", "Existed", "Iscovered", "DayMaintenance", "DuringMaintenance", "Comfirm", "Cancel", "Date", "Dateiserror", "ExistedMainCalendar"
];

words = arrayWord.join();

var model = null;

function oninputnum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    //obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
    obj.value = obj.value.replace(/\.(\d{3})/g, "."); //只保留第一个. 清除多余的.
    obj.value = obj.value.replace(/\d{3}/g, ""); //只保留二位整数. 清除多余的.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
};

function calender(tableID, week, leng, year, month, day, Clear) {

    var tab = document.getElementById(tableID);
    for (var i = 0; i < 40 ; i++) {
        tab.getElementsByTagName("td")[i].innerHTML = "";
    }
    if (!Clear) {
        var strs = new Array();
        strs = day.split(";");
        for (var i = 1; i <= Number(leng) ; i++) {
            tab.getElementsByTagName("td")[Number(Number(week) + i) - 2].innerHTML = i;
            var a = document.createElement("input");
            var br = document.createElement("br");
            a.style.color = "blue";
            a.style.width = "40px";
            a.style.textAlign = "center";
            a.type = 'text';
            a.maxLength = 5;
            var str = "|" + i + "|";
            for (var x = 0; x < strs.length ; x++) {
                if (strs[x].indexOf(str) >= 0) {
                    a.value = strs[x].split(':')[1];
                }
            }
            a.disabled = false;
            a.oninput = function () {
                this.value = this.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                this.value = this.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
                //this.value = this.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
                this.value = this.value.replace(/\.(\d{3})/g, "."); //只保留第一个. 清除多余的.
                this.value = this.value.replace(/\d{3}/g, ""); //只保留二位整数. 清除多余的.
                this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                if (this.value > 24) {                    
                    msg.info(fields.info, fields.WorkTimeIsNull);
                    this.value = 8.0;
                }
            };
            a.onafterpaste = "this.value=this.value.replace(/\D/g,'')";
            tab.getElementsByTagName("td")[Number(Number(week) + i) - 2].appendChild(br);
            tab.getElementsByTagName("td")[Number(Number(week) + i) - 2].appendChild(a);
        }
    }
}

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};