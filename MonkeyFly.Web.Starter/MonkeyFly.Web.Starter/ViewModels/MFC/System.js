var viewModel = function () {
    var self = this;
};

mf.ajax({
    type: 'get',
    url: '/MES/api/Systems/getData',
    async: false,
    success: function (data) {

        $('#SystemID').text(data.SystemID);
        $('#SystemName').text(data.SystemName);
        $('#SystemNameEN').text(data.SystemNameEN);
        $('#CustomerName').text(data.CustomerName);
        $('#Comments').text(data.Comments);

        var status = "";
        if (data.Status == 1) {
            status = "正常";
        }
        $('#Status').text(status);
    }
});
