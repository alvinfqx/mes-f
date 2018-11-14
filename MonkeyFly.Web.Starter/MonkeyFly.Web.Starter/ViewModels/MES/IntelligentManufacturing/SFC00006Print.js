var viewModel = function () {
    var rowData = parameters.rowData;

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

    mf.ajax({
        type: 'Get',
        url: '/MES/api/IntelligentManufacturing/Sfc00004GetTask',
        data: ({ TaskDispatchID: rowData.TaskDispatchID }),
        success: function (data) {
            console.log(data)
            $("#items").html('&nbsp;&nbsp;&nbsp;<span style="width:43%; display: inline-block; text-align: left;">' + fields.TaskCardNo + '：' + data.TaskNo + '</span><span class="title3">' + fields.StartWorkD + '：' + mf.format.Date(data.StartDate) + '</span><span class="title3">' + fields.EndWorkD + '：' + mf.format.Date(data.FinishDate) + '</span>');
            $("#MoNo").text(data.MoNo);
            $("#ItemNo").text(data.ItemCode);
            $("#GoodsName").text(data.ItemName);
            $("#DispatchAmount").text(data.DispatchQuantity);
            $("#WorkCenter").text(data.WorkCenterCode + "-" + data.WorkCenterName);
            $("#ManufacturingProcess").text(data.ProcessCode + "-" + data.ProcessName);
            if (data.OPerationCode != null) {
                $("#Process").text(data.OPerationCode + "-" + data.OPerationName);
            }
            else {
                $("#Process").text("");
            }
            $("#UnderWorkCenter").text(data.NextWorkCenter);
            $("#UnderCreateProcess").text(data.NextProcess);
            $("#UnderProcess").text(data.NextOPeration);
            $("#OrderNo").text(data.OrderNo);
            $("#Client").text(data.CustomerName);
            //Comments = data.Comments;
            $("#TaskNoCode").JsBarcode(data.TaskNo);
            $("#TaskCode").qrcode({
                text: data.TaskNo //任意内容 
            });
        }
    });

    mf.ajax({
        type: 'Get',
        url: '/MES/api/IntelligentManufacturing/Sfc00004GetResource',
        data: ({ TaskDispatchID: rowData.TaskDispatchID }),
        success: function (data) {
            console.log(data)
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $("#TaskCardPrint").append("<tr><td style='width:14%;'><span>" + data[i].ClassCode + "</span></td>" +
                            "<td style='width:21%;'><span>" + data[i].Code + "</span></td>" +
                            "<td style='width:44%;' colspan='3'><span>" + data[i].Name + "</span></td>" +
                            "<td style='width:18%; border-right:2px solid black;'><span>" + data[i].IfMain + "</span></td></tr>")
                }
            }
            else {
                $("#TaskCardPrint").append("<tr><td colspan='6' style='border-right:2px solid black;'>暂无数据</td></tr>")
            }
            mf.ajax({
                type: 'Get',
                url: '/MES/api/IntelligentManufacturing/Sfc00004GetTask',
                data: ({ TaskDispatchID: rowData.TaskDispatchID }),
                success: function (data) {
                   // console.log(data.CompletionNo)
                    $("#FinishNo").text(data.CompletionNo);
                    $("#FinProQty").text(data.FinProQuantity);
                    //$("#FinishNo").val(data.CompletionNo);
                    $("#TaskCardPrint").append("<tr><td style='width:14%;'><span>" + fields.Remark + "</span></td>" +
                    "<td style='width:83%; border-right:2px solid black;' colspan='5'>" + data.Comments + "</td></tr>")

                }
            });
        }
    });
}

var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentManufacturing/SFC00006Print");

var arrayWord = [
    "Cancel", "Print", "TaskCardPrint", "EndWorkD", "TaskCardNo", "StartWorkD", "MoNo", "GoodsName",
    "ItemNo", "DispatchAmount", "WorkCenter", "ManufacturingProcess", "Process", "UnderWorkCenter",
    "UnderCreateProcess", "UnderProcess", "OrderNo", "Client", "FinishNo", "FinProQty", "SourceClass",
    "EquipmentCode", "EquipmentDescription", "MainResource", "Remark", "WorkStationPrint"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
};