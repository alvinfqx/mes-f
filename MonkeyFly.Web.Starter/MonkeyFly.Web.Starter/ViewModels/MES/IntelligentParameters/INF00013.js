var URL = "/MES/IntelligentParameters/INF00013";
var MID = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;

    var form = {
        ClassCode: ko.observable(),
        Status: ko.observable(),
        StatusArray: ko.observableArray(parameters.PT0191213000001)
    }
    ko.applyBindings(form);

    var table = new mf.Table("#ClassificationGroupTable", {
        uniqueId: "ClassID",
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
                searchData = {};
            searchData.Code = form.ClassCode();
            searchData.Status = form.Status();
            var Code = $("#Code").val();
            var Status = $("#Status").val();
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/Inf00013List',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00013Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_realDelete: function (rowData, success) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00013delect',
                data: JSON.stringify(rowData),
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_ResetRow: function (rowData) {
            $("#OnTime").kendoTimePicker({
                format: "HH:mm",
                change: function () { }
            });
            $("#OffTime").kendoTimePicker({
                format: "HH:mm",
                change: function () { }
            });
        },
        fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
            var onTime = $("#OnTime").val();
            if (!/^([01]\d|2[0123]):([0-5]\d)$/.test(onTime)) {
                $("#OnTime").focus();
                return fields.OnTimeIsError;
            }
            var offTime = $("#OffTime").val();
            if (!/^([01]\d|2[0123]):([0-5]\d)$/.test(offTime)) {
                $("#OffTime").focus();
                return fields.OffTimeIsError;
            }
            var offHour = Number($("#OffHour").val());
            if (isNaN(offHour)) {
                $("#OffHour").focus();
                return fields.fields.OffHourIsError;
            }
            onTime = mf.deal.getTimeSpan(onTime);
            offTime = mf.deal.getTimeSpan(offTime);
            var crossDay = $("#CrossDay").val();
            if (crossDay == true) {
                if (offTime <= onTime) {
                    var workHour = Number((24 - (onTime - offTime) / 3600 - offHour).toFixed(4));
                    if (workHour < 0) {
                        workHour = 0;
                    }
                    $("#WorkHour").val(workHour);
                    return null;
                }
                else {
                    return fields.OffTimeIsError;
                }
            }
            else {
                if (offTime >= onTime) {
                    var workHour = Number(((offTime - onTime) / 3600 - offHour).toFixed(4));
                    if (workHour < 0) {
                        workHour = 0;
                    }
                    $("#WorkHour").val(workHour);
                    return null;
                }
                else {
                    return fields.OffTimeIsError;
                }
            }
        },
        isRealDelete: true,
        focusField: "Code",
        focusEditField: "Status",
        height: window.innerHeight - 145,
        LastWidth: "130",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Code', title: fields.ShiftNo, align: "center", width: '120px', require: true,
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 10, maxLength: 30 })),
                checkers: [new mf.TextNotEmptyChecker(fields.ShiftNoIsNull)]
            },
              {
                  field: 'Name', title: fields.ShiftDescription, width: '140px', align: "center", require: true,
                  rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: 'title', size: 12, maxLength: 120 })),
                  checkers: [new mf.TextNotEmptyChecker(fields.ShiftDescriptionIsNull)]
              },
             {
                 field: 'Comments', title: fields.Remark, align: "center", width: '130px',
                 rander: new mf.TextRander({ title: 'title', size: 12, maxLength: 120 })
             },
             {
                 field: 'Status', title: fields.Status, align: "center", width: '80px',
                 rander: new mf.SelectRander(parameters.PT0191213000001)
             },
             {
                 field: 'CrossDay', title: fields.CrossDay, align: "center", width: '80px', require: true,
                 rander: new mf.SelectRander([{ value: false, text: "N" }, { value: true, text: "Y" }])
             },
             {
                 field: 'OnTime', title: fields.WorkingTime, align: "center", width: '120px', require: true,
                 rander: new mf.KendoTimeRander({ title: true }),
                 checkers: [
                        new mf.TextNotEmptyChecker(fields.OnTimeIsNull),
                        new mf.IsHoursChecker(fields.OnTimeIsError)
                 ]
             },
             {
                 field: 'OffTime', title: fields.OffHours, align: "center", width: '120px', require: true,
                 rander: new mf.KendoTimeRander({ title: true }),
                 checkers: [
                        new mf.TextNotEmptyChecker(fields.OffTimeIsNull),
                        new mf.IsHoursChecker(fields.OffTimeIsError)
                 ]
             },
             {
                 field: 'OffHour', title: fields.RestHours, align: "center", width: '120px', defaultValue: 0,
                 rander: new mf.TextRander({ size: 11, title: true }),
                 checkers: [
                        new mf.IsNonNegativeNumberChecker(fields.OffHourIsError),
                        new mf.IsOverDecimalChecker(fields.OffHourIsError, fields.OffHourIsError, fields.OffHourIsError, 2, 4)
                 ]
             },
             {
                 field: 'WorkHour', title: fields.WorkingHours, align: "center", width: '120px', defaultValue: 0,
                 rander: new mf.TextRander({ size: 11, title: true, disabled: "disabled" })
             },
             {
                 field: 'Creator', title: fields.CreatedBy, align: "center", width: '120px',
                 rander: new mf.StaticValueRander({ size: 10 })
             },
             {
                 field: 'CreateTime', title: fields.CreatedDate, align: "center", width: '130px',
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
    table.loadData();

    //刷新
    this.refreshClick = function () {
        table.goForword(
            function () {
                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                window.location.reload();
            }, function () {
                window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                window.location.reload();
            });
    };
    //新增
    this.addClick = function () {
        table.addRow();
    }
    //编辑
    this.editClick = function () {
        table.editRow();
    };
    //保存
    this.saveClick = function () {
        table.save(null, null, true);
    };
    //删除
    this.deleteClick = function () {
        table.deleteRow();
    };
    //查询
    this.searchClick = function () {
        table.goForwordSafely(
            function () {
                table.loadData(null, null, 1);
            }, null);
    };
    //导出
    this.exportClick = function () {
        table.loadDataBack(null, function () {
            var $trLength = $("#ClassificationGroupTable").find("tr").length;
            if ($trLength == 0) {
                msg.info(fields.Prompt, fields.NoDataExport);
                return;
            }
            var Code = $("#ClassCode").val();
            var Name = $("#Status").val();
            window.location.href = mf.domain + '/MES/api/ExportFile/Inf00013Export?Token=' + token + '&Code=' + Code + '&Status=' + Name;
        });

    }
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
                type: 'Post',
                url: window.top.mf.domain + '/MES/api/ImportFile/Inf00013Import',
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
    }
    //语系
    this.languagesClick = function () {
        if (!table)
            return;

        var data = table.getSelectedData();
        if (!data)
            return;

        var emouserID = data.ClassID;
        if (!emouserID && emouserID.length <= 0) {
            console.error("can't get ParameterID from table");
            return;
        }

        var rowData =
            '&nbsp;<label>' + fields.ShiftNo + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px; margin-right: 5px;" value="' + data.Code + '"/>' +
            '&nbsp;&nbsp;<label>' + fields.ShiftDescription + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Name == null ? "" : data.Name) + '" />' +
            '&nbsp;&nbsp;<label>' + fields.Remark + '</label>' +
            '&nbsp;<input type="text" class="search-input" disabled="disabled" style="width: 176px;" value="' + (data.Comments == null ? "" : data.Comments) + '" />';

        var columns = [
            {
                field: 'Name',
                title: fields.ShiftDescription,
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
            tableID: "33",
            rowID: emouserID,
            rowData: rowData,
            columns: columns
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/CommenLanguageModule", Parameters: parameters });
            window.location.href = '/MES/Util/Languages';
        }, null);
    };
};

//语系词组
var arrayWord = [
    "ShiftNo", "ShiftDescription", "CrossDay", "WorkingTime", "OffHours",
    "RestHours", "WorkingHours", "Remark", "Status", "CreatedBy", "CreatedDate",
    "LastChangedBy", "LastChangedDate", "Import", "Cancel", "Browse", "Comfirm",
    "Close", "Search", "EmployeeInformation", "EmployeeCode", "ClassCode", "ClassDescription",
    "Normal", "Invalid", "Prompt", "NoDataCanBeExported", "PleaseSelectRecord",
    "PleaseSaveDataFirst", "PleaseSelectFile", "New", "Deletion", "LanguageCode",
    "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats",
    "Department", "Name", "ShiftNoIsNull", "ShiftDescriptionIsNull", "NoDataExport",
    "OnTimeIsNull", "OnTimeIsError", "OffTimeIsNull", "OffTimeIsError", "OffHourIsNull",
    "OffHourIsError"
];

//拼接字符串
words = arrayWord.join();

mf.toolBar('#container');

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};