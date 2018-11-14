var URL = "/MES/IntelligentManufacturing/SFC00002ProcessRelationship";
var PageParameters = window.top.page_parameters.GetParameters(URL);


var model = null;
var parameters = null;
var mainForm = PageParameters.Row;
var token_value = token;
var viewModel = function () {
    var self = this;
    // 返回
    this.backClick = function () {

        window.top.page_parameters.Caching.push({
            URL: PageParameters.BackURL,
            Parameters:{ 
                    TopMID: PageParameters.TopMID,
                    Row: PageParameters.Row,
                    TopBackURL: PageParameters.TopBackURL,
                }
            });
        window.location.href = PageParameters.BackURL;
    }
    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: PageParameters });
        window.location.reload();
    };

    //单个制令制程关系   FabMoRelShipSave
    this.saveData = function (FabMoRelationshipID, FabMoProcessID, PreFabMoProcessID, IfMain, Comments) {
        mf.ajax({
            type: "post",
            url: "/MES/api/IntelligentManufacturing/FabMoRelShipSave",
            data: JSON.stringify({
                FabMoRelationshipID: FabMoRelationshipID,
                FabMoProcessID: FabMoProcessID,
                PreFabMoProcessID: PreFabMoProcessID,
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
    "IsDefault", "LanguageRepeats", "SaveOrNot", "Isleave", "Back", "Refresh", "Save", "Change","info"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: "Get",
        url: "/MES/api/IntelligentManufacturing/Sfc00002GetFabMoRelShipNoPage",
        data: { FabricatedMotherID: mainForm.FabricatedMotherID },
        success: function (data) {
            console.log(data);
            chartData = eval(JSON.stringify(data).
                replace(/\"PreProcessCode\"/g, "\"ZpCode\"").
                replace(/\"PreProcessName\"/g, "\"ZpName\"").
                replace(/\"PreFabMoProcessID\"/g, "\"ZpID\"").
                replace(/\"ProcessCode\"/g, "\"ZtCode\"").
                replace(/\"ProcessName\"/g, "\"ZtName\"").
                replace(/\"FabMoProcessID\"/g, "\"ZtID\"").
                replace(/\"FabMoRelationshipID\"/g, "\"ZUniqueId\""));
            model = new viewModel();
            $("#iframe").attr("src", "/MES/Util/JointChart");
            $("#iframe").show();

        }
    });
};