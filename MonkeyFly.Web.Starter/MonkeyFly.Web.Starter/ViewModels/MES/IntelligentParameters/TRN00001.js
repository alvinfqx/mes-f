var URL = "/MES/IntelligentParameters/TRN00001";

var MID = window.top.page_parameters.GetParameters(URL);

var parameters = null;
var model = null;
var pwd = "**********";

var viewModel = function () {
    var self = this;
    var table = null;

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
    // 添加
    this.addClick = function () {
        if (!table)
            return;
        table.addRow();
    }
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
    //保存
    this.saveClick = function () {
        if (!table)
            return;
        table.save(null, null, true);
    };
    // 啟動交換處理
    this.startTranProClick = function () {
        var record = table.getSelectedData();
        if (!record) {
            msg.info(fields.info, fields.Isedit);
            return;
        }
        var saveData = { updated: [], inserted: [], deleted: [] };
        record.StartExchange = "1";
        if (record.DBPassword == pwd) record.DBPassword = "";
        saveData.updated.push(record);

        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/TRN00001Save',
            data: JSON.stringify(saveData),
            success: function (data) {
                console.log(data);
                msg.success(fields.info, fields.StartSyncProcess);
                table.loadData();
            }
        });
    }
    // 停止交換處理
    this.stopTranferProcedureClick = function () {
        var record = table.getSelectedData();
        if (!record) {
            msg.info(fields.info, fields.Isedit);
            return;
        }
        if (record.DBPassword == pwd) record.DBPassword = "";   
        var saveData = { updated: [], inserted: [], deleted: [] };
        record.StartExchange = "0";
        saveData.updated.push(record);

        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/TRN00001Save',
            data: JSON.stringify(saveData),
            success: function (data) {
                debugger;
                console.log(data);
                msg.success(fields.info, fields.EndSyncProcess);
                //msg.info(fields.info, fields.SaveSuccess);
                table.loadData();
            }
        });
    }
    parameters.PT0191213000021.unshift({ value: "", text: "" });

    //设置表格
    table = new mf.Table("#settingTable", {
        uniqueId: "ParameterID",
        IsSetTableWidth: true,
        LastWidth: "114",
        paginationBar: new mf.PaginationBar("#paginationBar"),
        fn_onEditingRowRandFinish: function ($row, isAdding, data, isEditor) {
            var StartExchange = data['StartExchange'];
            var $RetriveTimeEditingCell = $row.find("#RetriveTime");
            if (StartExchange == "1") {
                $RetriveTimeEditingCell.attr('disabled',true);
            }
            else {
                $RetriveTimeEditingCell.attr('disabled', false);
            }
            if (isAdding == true || isEditor == true) {
                
               
                $row.find("#DBPassword").bind('keyup blur', function () {
                    var node = $(this);
                    node.val(node.val().replace(/[^a-zA-Z0-9*]/g, ''));
                }
                );
            }
        },
        fn_getData: function (pagination, searchData, success) {
            

            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentParameter/TRN00001GetList',
                data: ({ page: pagination.page, rows: pagination.rows }),
                success: function (data) {
                    ExportTotal = data.total;
                    for (var i = 0; i < data.total; i++) {
                        data.rows[i].DBPassword = pwd;
                    }
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
            // 如果沒改過密碼，就丟回去空值給後台
            for (var i = 0; i < saveData.updated.length; i++){
                if (saveData.updated[0].DBPassword == pwd) saveData.updated[0].DBPassword = "";   
            }
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/TRN00001Save',
                data: JSON.stringify(saveData),
                success: function (data) {
                    console.log(data);
                    success(data);
                }
            });
        },
        focusField: "System",
        focusEditField: "System",
        height: window.innerHeight - 100,
        columns: [
            {
                field: 'System', title: fields.System, align: "center", require: true, width: "115",
                rander: new mf.AutoSelectRander(
                    "value", "text", parameters.PT0191213000021,
                    {
                        title: true
                    }),
                checkers: [new mf.TextNotEmptyChecker(fields.SystemIsNull)]
            },
            {
                field: 'Dbms', title: fields.Dbms, require: true, align: "center", width: "173", require: true,
                rander: new mf.TextRander({ size: 16, maxLength: 30, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DbmsIsNull)
                ],
            },
            {
                field: 'DBName', title: fields.DBName, align: "center", width: "115", require: true,
                rander: new mf.TextRander({ size: 9, maxLength: 20, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DBNameIsNull)
                ],
            },
            {
                field: 'DBUser', title: fields.DBUser, require: true, align: "center", width: "115", require: true,
                rander: new mf.TextRander({ size: 8, maxLength: 20, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DBUserIsNull)
                ],
            },
            {
                field: 'DBPassword', title: fields.DBPassword, align: "center", width: "92", require: true,
                rander: new mf.TextRander({ size: 5, maxLength: 20, title: "title" }),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.DBPasswordIsNull),
                    new mf.IsLatterOrNumberChecker(fields.PwdOnlyLatterOrNumbers),
                ],
            },
            {
                field: 'RetriveTime', title: fields.RetriveTime, align: "center", width: "126",defaultValue:5,
                rander: new mf.TextRander({ size: 10, maxLength: 10, title: "title" }),
                checkers: [
                    new mf.IsNonNegativeNumberChecker(fields.RetriveTimeIsIncorrect),
                    new mf.IsPercentageChecker(fields.RetriveTimeIsIncorrect)
                ]
            },
            {
                field: 'Remark', title: fields.Remark, align: "center", width: "149",
                rander: new mf.TextRander({ size: 14, maxLength: 60, title: "title" }),
            },
            {
                field: 'StartExchange', title: fields.StartExchange, align: 'center',
                rander: new mf.WirteOnceOnlyRander(new mf.SelectRander([
                    { value: "1", text: fields.yes },
                    { value: "0", text: fields.no }
                ])),
                defaultValue: "0"

            }
        ]
    });
    
    if (!table) {
        console.error("create table faild");
        return;
    }

    table.loadData();

}



var arrayWord = [
    "Remark", "StartExchange", "DBPassword", "RetriveTime", "DBName", "Dbms", "yes", "no", "PwdOnlyLatterOrNumbers",
    "Refresh", "Save", "New", "Change", "Deletion", "Status", "Invalid", "Normal", "SystemIsNull",
    "System", "DbmsIsNull", "DBNameIsNull", "DBPasswordIsNull", "DBUser", "DBUserIsNull",  "StartSyncProcess", "EndSyncProcess",
    "Start TranferProcedure", "StopTranferProcedure", "Isedit", "SaveSuccess", "info", "RetriveTimeIsIncorrect"//, "", ""
];

words = arrayWord.join();



//初始页面数据，包括获取语系数据等
initPage = function () {
    
    
    mf.toolBar('#container');
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000021" },//参数类型流水号，后端给0191213000021（要改）異常說明還沒編
        success: function (data) {
         
            parameters = data;//调用时parameters.PT0191213000021，是个数组
            
            model = new viewModel();


        }
    });
};