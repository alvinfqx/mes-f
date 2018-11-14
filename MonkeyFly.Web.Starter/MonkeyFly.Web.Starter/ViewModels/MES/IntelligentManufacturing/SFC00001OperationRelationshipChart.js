var URL = "/MES/IntelligentManufacturing/SFC00001OperationRelationshipChart";
var PageParameters = window.top.page_parameters.GetParameters(URL);

var model = null;
var parameters = null;
var chartData = null;
var mainform = PageParameters.Row;
var viewModel = function () {
    var self = this;

    //返回
    this.backClick = function () {
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

    //保存修改数据
    this.saveData = function (PORSID, ItemOperationID, PreItemOperationID, IfMain, Comments) {
        mf.ajax({
            type: "post",
            url: "/MES/api/IntelligentManufacturing/Sfc00001OperationRelationShipSave",
            data: JSON.stringify({
                PORSID: PORSID,
                ItemOperationID: ItemOperationID,
                PreItemOperationID: PreItemOperationID,
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
    };
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "Deletion", "LanguageCode", "PleaseSelectLanguage", "PleaseFillLanguageContent",
    "IsDefault", "LanguageRepeats", "ProductCode", "GoodsName", "Specification", "Unit",
    "OverRate", "ProcessSequence", "ProcessNo", "ProcessDescription", "StandardWorkingSeconds",
    "StandardWorkingHours", "PrepareWorkSeconds", "PrepareWorkHours", "WorkCenter", "Description",
    "InoutMark", "DepartmentNoOrManufacturersNo", "AuxiliaryUnit", "UnitRate", "UnitPrice",
    "IsResourceReporting", "IsEnableProcess", "IsProcessInspection", "IsFirstTest",
    "IsPatrolInspection", "InspectionGroup", "InspectionGroupInstructions", "ProcessMaterials",
    "ProcessProcess", "ProcessResources", "AlternativeProcess", "ProcessRelationship",
    "StartProductNo", "EndProductNo", "ProcessSequenceIsError", "ProcessInformation",
    "ProcessIsNull", "StandardWorkingSecondsIsError", "PrepareWorkSecondsIsError",
    "WorkCenterInformation", "WorkCenter", "WorkCenterNo", "WorkCenterDescription",
    "WorkCenterIsNull", "UnitMasterFile", "Code", "AuxUnitRatioIsNull", "CheckGroupCodeInformation",
    "CheckGroupCode", "CheckGroupName", "SaveOrNot", "ResourceReporting", "Isleave",
    "Back", "Refresh", "PreProcessSequence", "PreProcessNo", "PreProcessDescription",
    "Save", "Change", "MainProcess", "FinalProcess", "Operation", "OperationDesc", "OperationSequence",
    "PreOperationSequence", "PreOperationNo", "PreOperationDescription", "FinalOperation",
    "OperationIsNull", "OperationInformation", "NameSpecification"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: "get",
        url: "/MES/api/IntelligentManufacturing/Sfc00001GetOperationRelationShipListNoPage",
        data: { ItemProcessID: mainform.ItemProcessID },
        success: function (data) {
            chartData = eval(JSON.stringify(data).
                replace(/\"PreOperationCode\"/g, "\"ZpCode\"").
                replace(/\"PreOperationName\"/g, "\"ZpName\"").
                replace(/\"PreItemOperationID\"/g, "\"ZpID\"").
                replace(/\"OperationCode\"/g, "\"ZtCode\"").
                replace(/\"OperationName\"/g, "\"ZtName\"").
                replace(/\"ItemOperationID\"/g, "\"ZtID\"").
                replace(/\"PORSID\"/g, "\"ZUniqueId\""));
            model = new viewModel();
            $("#iframe").attr("src", "/MES/Util/JointChart");
            $("#iframe").show();
        }
    });
};