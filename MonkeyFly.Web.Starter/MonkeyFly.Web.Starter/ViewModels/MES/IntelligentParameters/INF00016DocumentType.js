var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    var statuslist = [
        { value: 1, text: fields.Normal },
        { value: 0, text: fields.Invalid }
    ];
    var formData = {
        Code: ko.observable(),
        Status: ko.observable(),
        StatusList: ko.observableArray(statuslist)
    };
    ko.applyBindings(formData);

    var table = new mf.Table("#INF00016DocumentTypeTable", {
        uniqueId: "ParameterID",
        editable: true,
        dblclick_editable: false,
        height: window.innerHeight - 128,
        LastWidth: "130",
        IsSetTableWidth: true,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        fn_getData: function (pagination, searchData, success) {
            if (!searchData)
            searchData = {};
            searchData.Code = formData.Code();
            searchData.Status = formData.Status();
            mf.ajax({
                type: 'get',
                url: '/MES/api/IntelligentParameter/Inf00016GetTypeList',
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
                field: 'Code', title: fields.DocumentType, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
               
            },
            {
                field: 'Name', title: fields.DocumentTypeDescription,align: "center", width: "149",
                rander: new mf.TextRander({ title: true })
            },       
            {
                field: 'Comments', title: fields.Remark, align: "center", width: "180",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'IsEnable', title: fields.Status, align: "center", width: "80",
                rander: new mf.SelectRander(statuslist)
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
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander()

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

    //查询
    this.searchClick = function () {
        if (!table) {
            return;
        }
        table.goForwordSafely(function () {
            table.loadData(null, null, 1);
        }, null);
    };

    // 刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForwordSafely(function () {
            window.location.reload();
        }, function () {
            table.loadData();
        });
    };
    // 语系
    this.languagesClick = function () {
        if (!table) {
            return;
        }

        var row = table.getSelectedData();

        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return
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
                field: 'Name', title: fields.CategoryDec,
                halign: 'center', align: 'center', width: "150", require: true
            },
            {
                field: 'Comments', title: fields.Remark,
                halign: 'center', align: 'center', width: "150"
            }
        ];

        var parameters = {
            parentUrl: "/MES/IntelligentParameters/INF00016DocumentType",
            parentMID: "MID",
            tableID: "41",
            rowID: row.ParameterID,
            rowData: rowData,
            columns: columns,
            arrayWord: arrayWord
        };

        table.goForwordSafely(function () {
            window.top.page_parameters.Caching.push({ URL: "/MES/Util/CNCLanguages", Parameters: parameters });
            window.location.href = '/MES/Util/CNCLanguages';
        }, null);
    }





}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export","CategoryCode",
    "DocumentType", "DocumentTypeDescription", "Remark", "Status", "CreatedBy", "CreatedDate","Description",
    "LastChangedBy", "LastChangedDate", "Normal", "Invalid", "Cancel", "Browse", "Comfirm","ClassNo",
    "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent", "IsDefault", "LanguageRepeats","PleaseSelectRecord",
    "Prompt", "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile", "CategoryDec"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};