mf.menu = function (domStr, options) {
    var self = this;
    var defaults = {            //默认参数
        url: "/MES/api/Menu/GetUserMenus",       
        data: [],
        params: {},
    };

    this.dom = $(domStr)[0];    //dom对象
    this.jdom = $(domStr);      //dom的JQ对象
    this.options = {};          //传入参数
    this.thisData = [           //当前数据
    ];
    this.treeData = [           //处理后的数据
    ];
    this.levels = ['zero', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    this.init = function () {
        //默认参数
        self.options = $.extend({}, defaults, options);
        //var options = $.extend(defaults, options)的含义:表示 options 去覆盖了defaults的值，并把值赋给了options。
        self.access();
    };
    //访问后台
    this.access = function () { 
        mf.ajax({
            type: "Get",
            url: self.options.url,
            async: false,
            success: function (d) {
                d = $.grep(d, function (row) { return row.IsVisible; });
                d = mf.deal.language_conversion(d, "menu");
                page_parameters.MenuData = d;
                
                self.thisData = d;
                self.treeData = mf.deal.toTreeData(d, 'MenuID', 'ParentMenuID', 'childern');            
                self.createMenu();
            }
        });
    };
    
  
    //初始化菜单
    this.createMenu = function () {    
        for (var i = 0; i < self.treeData.length; i++) {
            self.jdom.append('<li></li>');
            self.addMenu(self.jdom.find('li').last(), self.treeData[i], 2);
        }
    }
  
    //添加菜单
    this.addMenu = function (pjdom, data, level) {
        if (data.MenuID) {
            if (data.childern && data.childern.length > 0) {
                pjdom.append('<a data-href="'+(data.URL || '#')+'"><i class="fa '+data.IconClass+'"></i><span class="nav-label">'+data.Name+'</span><span class="fa arrow"></span></a>');
            }
            else {
                pjdom.append('<a class="J_menuItem" data-href="' + (data.URL == "#" ? "" : data.URL) + '"><i class="fa ' + data.IconClass + '"></i><span class="nav-label">' + data.Name + '</span></a>');
            }
        }
        if (data.childern && data.childern.length > 0) {
            pjdom.append('<ul class="nav nav-' + self.levels[level] + '-level" ></ul>');

            var ul = pjdom.find('ul').last();
            for (var i = 0; i < data.childern.length; i++) {
                ul.append('<li></li>');
                self.addMenu(ul.find('li').last(), data.childern[i], level + 1);
            }
        }
    }

    self.init();
}
