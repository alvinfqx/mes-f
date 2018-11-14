mf.trees = function (domStr, options) {
    var self = this;

    var defaults = {
        url: "/MES/api/Organization/Get",
        data: [],
        params: {},
    };


    
    this.dom = $(domStr)[0];    //dom对象
    this.jdom = $(domStr);      //dom的JQ对象
    this.options = {};         //传入参数
    this.thisData = [];     
    this.treeData = [];
    this.zTreeObj;
    this.treeNodes;
    
    //setting是ztree的插件内容
    this.setting = {
        data: {
            key: {
                children: "children",      //子节点数据的属性名称
                name: "Name" ,            //节点名称的属性名称

            },
            simpleData: {
                enable: true,
                idKey: "OrganizationID",         //节点数据中保存唯一标识的属性名称
                pIdKey: "ParentOrganizationID",  //节点数据中保存其父节点唯一标识的属性名称
                rootPId: 0                      //用于修正根节点父节点数据，即 pIdKey 指定的属性值
            },
            view: {
                showIcon: true,
                showLine: true
            }
           
        },
     
       
    };
   
    this.init = function () {
        self.options = $.extend({}, defaults, options);  //表示 options 去覆盖了defaults的值，并把值赋给了options。
        self.access();

    };


    //访问后台
    this.access = function () {

        mf.ajax({
            async: false,

            type: 'GET',

            url: '/MES/api/Organization/Get',      //请求的action路径

            error: function () {                   //请求失败处理函数
                alert('请求失败');
            },

            success: function (data) {             //请求成功后处理函数。
                self.treeData = mf.deal.toTreeData(data, 'OrganizationID', 'ParentOrganizationID', 'children');
                self.treeNodes =self.treeData;    //把后台封装好的简单Json格式赋给treeNodes
            
            }
        });

  

        self.createZTree();                         //创建树
        self.expandNodes();                         //展开根节点
    };


    this.createZTree = function () {
        self.zTreeObj = $.fn.zTree.init(self.jdom, self.setting, self.treeNodes);      //调用ztree插件创建树
    };

    this.expandNodes = function () {

        var newDomStr = domStr.substr(1);
        var treeObj = $.fn.zTree.getZTreeObj(newDomStr);                              //展开指定节点
        var node = treeObj.getNodeByParam("ID", "1", null);
        treeObj.expandNode(node, true,false,false,false);


    };
   
   
    self.init();              //执行init

}
