//创建参数类型树

var URL = "/Information/Util/Parameters";

var MID = window.top.page_parameters.GetParameters(URL);

var fields = GetField("/Data/tables/Information/Util/Parameters", "Parameters");

mf.ajax({
    type: "GET",
    url: '/EMO-MFC/api/Menu/GetUserParameterMenus',
    anysc: false,
    success: function (data) {
        
        data[0].state = { selected: true };
        window.top.setProgram(data[0].URL);
        window.top.page_parameters.Caching.push({ URL: data[0].URL, Parameters: data[0].MenuID });
        document.getElementById("iframe").src = data[0].URL;

        data = window.top.mf.deal.language_conversion(data, "menu");

        for (var i = 0; i < data.length; i++) {
            data[i].ParentMenuID = "";
        }

        var treeData = [{ id: "", text: fields.MasterParameter, children: mf.deal.toTreeData(data, 'MenuID', 'ParentMenuID', 'children') }];
        treeData = eval(JSON.stringify(treeData).replace(/Name/g, 'text'));
        treeData = mf.deal.addCPropertyAndCopy(treeData, 'icon', 'iconCls', 'children')
        treeData = treeData.map(function (d) { d.icon = "fa fa-folder"; d.state = { "opened": true }; return d; });

        $("#TypeTree").jstree({
            "core": { "data": treeData }
        }).bind("activate_node.jstree", function (obj, e) {
            window.top.setProgram(e.node.original.URL);
            window.top.page_parameters.Caching.push({ URL: e.node.original.URL, Parameters: e.node.original.MenuID });
            document.getElementById("iframe").src = e.node.original.URL;
        });
    }
});
