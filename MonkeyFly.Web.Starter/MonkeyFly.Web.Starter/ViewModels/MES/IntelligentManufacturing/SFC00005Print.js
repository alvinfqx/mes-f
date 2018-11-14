var viewModel = function () {

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
        window.location.href = parameters.parentUrl;
    };

    this.printClick = function () {
        $("#tb_list .J-toolbar").hide();
        $("#tb_list .J-content").addClass("contentBorder");
        window.print();
        $("#tb_list .J-content").removeClass("contentBorder");
        $("#tb_list .J-toolbar").show();
    };

    $("#items").html('<span class="title3" style="width:43%;">' +
        fields.TaskCardNo + '：' + "MM201612001-0030-PR190-0020-OP203-2" +
        '</span><span class="title3">' + fields.StartWorkD + '：' + mf.format.Date(new Date()) +
        '</span><span class="title3">' + fields.EndWorkD + '：' + mf.format.Date(new Date()) +
        '</span><span></span>');

    $("#MoNo").text("MM201612001");
    $("#ItemNo").text("MM201612001");
    $("#GoodsName").text("MM201612001");
    $("#WorkCenter").text("WorkCenter");
    $("#ManufacturingProcess").text("WorkCenter");
    $("#Process").text("WorkCenter");

    var data = [{ SourceClass: "1", EquipmentCode: "A1", EquipmentDescription: "A11", MainResource: "是" }, { SourceClass: "2", EquipmentCode: "B1", EquipmentDescription: "B11", MainResource: "是" }];

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            $("#Equipmentable").append("<tr><td><span>" + data[i].SourceClass + "</span></td>" +
                    "<td><span>" + data[i].EquipmentCode + "</span></td>" +
                    "<td><span>" + data[i].EquipmentDescription + "</span></td>" +
                    "<td style='border-right:2px solid black;'><span>" + data[i].MainResource + "</span></td></tr>")
        }
    }
    else {
        $("#Equipmentable").append("<tr><td colspan='4' style='border-right:2px solid black;'>暂无数据</td></tr>")
    }
    $("#Equipmentable").append("<tr><td style='width:150px;'><span>" + fields.Remark + "</span></td>" +
                    "<td style='width:770px;' style='border-right:2px solid black;' colspan='4'>3</td></tr>")

}

var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00005Print");

var arrayWord = [
    "Cancel", "Print", "TaskCardPrint", "EndWorkD", "TaskCardNo", "StartWorkD", "MoNo", "GoodsName",
    "ItemNo", "DispatchAmount", "WorkCenter", "ManufacturingProcess", "Process", "UnderWorkCenter",
    "UnderCreateProcess", "UnderProcess", "OrderNo", "Client", "FinishNo", "FinProQty", "SourceClass",
    "EquipmentCode", "EquipmentDescription", "MainResource", "Remark"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};