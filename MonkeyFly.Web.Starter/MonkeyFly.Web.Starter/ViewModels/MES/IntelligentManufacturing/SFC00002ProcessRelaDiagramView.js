var model = null;
var chartData = null;
var viewModel = function () {
    var self = this;
    var Value = parent.window.mainForm;
    var token_iframe = parent.window.token_value;
    var init_view = function () {
        $.ajax({
            type: "Get",
            url: "https://202api.monkeyfly.net/MES/api/IntelligentManufacturing/Sfc00002GetFabMoRelShipNoPage",
            data: { FabricatedMotherID: Value.FabricatedMotherID, Token: token_iframe },
            success: function (data) {
                console.log(data);
                chartData = eval(JSON.stringify(data).
                    replace(/\"PreProcessCode\"/g, "\"ZpCode\"").
                    replace(/\"PreProcessName\"/g, "\"ZpName\"").
                    replace(/\"PreItemProcessID\"/g, "\"ZpID\"").
                    replace(/\"ProcessCode\"/g, "\"ZtCode\"").
                    replace(/\"ProcessName\"/g, "\"ZtName\"").
                    replace(/\"ItemProcessID\"/g, "\"ZtID\"").
                    replace(/\"IPRSID\"/g, "\"ZUniqueId\""));

            }
        });
    }
    init_view();

    //刷新
    this.refreshClick = function () {        
        window.location.reload();
    };

    //保存
    this.saveClick = function () {

    };



};
model = new viewModel();

