var URL = "/MES/IntelligentManufacturing/SFC00002OperationRelationshipDiagram";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var chartData = null;
var mainform = PageParameters.Row;
var viewModel = function () {
    var self = this;

    //返回
    this.backClick = function () {
        //if (!MainTable)
        //    return;
        //if (MainTable.SaveOrNotStatus()) {
        //    msg.warning(fields.info,
        //            fields.Isleave,
        //            function () {
        //                window.top.page_parameters.Caching.push({ URL: PageParameters.BackURL, Parameters: PageParameters });
        //                window.location.href = PageParameters.BackURL;
        //            }, function () {
        //                // 取消查询
        //            });
        //}
        //else {
        //    window.top.page_parameters.Caching.push({ URL: PageParameters.BackURL, Parameters: PageParameters });
        //    window.location.href = PageParameters.BackURL;
        //}



        window.top.page_parameters.Caching.push({
            URL: PageParameters.BackURL,
            Parameters: PageParameters
        });
        window.location.href = PageParameters.BackURL;
    }

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
        window.location.reload();
    };

    //FabMoOperationRelShipSave  单个制令制程工序关系
    this.saveData = function (FabMoOperationRelationshipID, FabMoOperationID, PreFabMoOperationID, IfMain, Comments) {
        mf.ajax({
            type: "post",
            url: "/MES/api/IntelligentManufacturing/FabMoOperationRelShipSave",
            data: JSON.stringify({
                FabMoOperationRelationshipID: FabMoOperationRelationshipID,
                FabMoOperationID: FabMoOperationID,
                PreFabMoOperationID: PreFabMoOperationID,
                IfMain: IfMain,
                Comments: Comments
            }),
            success: function (data) {
                if (data.status == "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        self.refreshClick();
                    });
                } else {
                    msg.error(fields.Prompt, data.msg, function () {
                        self.refreshClick();
                    });
                }
            }
        });
    }
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "Deletion", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "Specification", "Unit", "Save", "Change", "Back", "Refresh", "info"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: "get",
        url: "/MES/api/IntelligentManufacturing/Sfc00002GetFabMoOperationRelShipNoPage",
        data: { FabMoProcessID: mainform.FabMoProcessID },
        success: function (data) {
            console.log(data);
            chartData = eval(JSON.stringify(data).
                replace(/\"PreOperationCode\"/g, "\"ZpCode\"").
                replace(/\"PreOperationNam\"/g, "\"ZpName\"").
                replace(/\"PreFabMoOperationID\"/g, "\"ZpID\"").
                replace(/\"OperationCode\"/g, "\"ZtCode\"").
                replace(/\"OperationName\"/g, "\"ZtName\"").
                replace(/\"FabMoOperationID\"/g, "\"ZtID\"").
                replace(/\"FabMoOperationRelationshipID\"/g, "\"ZUniqueId\""));
            model = new viewModel();
            $("#iframe").attr("src", "/MES/Util/JointChart");
            $("#iframe").show();
        }
    });
};