﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ASP
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Mvc;
    using System.Web.Mvc.Ajax;
    using System.Web.Mvc.Html;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.WebPages;
    using MonkeyFly.MES.Web;
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00002ProcessRelaDiagramView.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00002ProcessRelaDiagramView_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00002ProcessRelaDiagramView_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentManufacturing\SFC00002ProcessRelaDiagramView.cshtml"
  
    Layout = null;

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n<!DOCTYPE html>\r\n\r\n<html>\r\n<head>\r\n    <meta");

WriteLiteral(" name=\"viewport\"");

WriteLiteral(" content=\"width=device-width\"");

WriteLiteral(" />\r\n    <title>制程关系图</title>\r\n</head>\r\n<body>\r\n    <div> \r\n        <div");

WriteLiteral(" style=\"margin-bottom:10px;\"");

WriteLiteral(">\r\n            <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral(">Refresh</span></button>\r\n            <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(">Save</span></button>\r\n        </div>       \r\n        <div");

WriteLiteral(" id=\"paper\"");

WriteLiteral("></div>\r\n    </div>\r\n</body>\r\n</html>\r\n<link");

WriteAttribute("href", Tuple.Create(" href=\"", 643), Tuple.Create("\"", 681)
, Tuple.Create(Tuple.Create("", 650), Tuple.Create<System.Object, System.Int32>(Href("~/Content/joint/build/joint.css")
, 650), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 711), Tuple.Create("\"", 767)
, Tuple.Create(Tuple.Create("", 717), Tuple.Create<System.Object, System.Int32>(Href("~/Content/joint/node_modules/jquery/dist/jquery.js")
, 717), false)
);

WriteLiteral("></script>\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 787), Tuple.Create("\"", 837)
, Tuple.Create(Tuple.Create("", 793), Tuple.Create<System.Object, System.Int32>(Href("~/Content/joint/node_modules/lodash/index.js")
, 793), false)
);

WriteLiteral("></script>\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 857), Tuple.Create("\"", 912)
, Tuple.Create(Tuple.Create("", 863), Tuple.Create<System.Object, System.Int32>(Href("~/Content/joint/node_modules/backbone/backbone.js")
, 863), false)
);

WriteLiteral("></script>\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 932), Tuple.Create("\"", 968)
, Tuple.Create(Tuple.Create("", 938), Tuple.Create<System.Object, System.Int32>(Href("~/Content/joint/build/joint.js")
, 938), false)
);

WriteLiteral("></script>\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 988), Tuple.Create("\"", 1069)
, Tuple.Create(Tuple.Create("", 994), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00002ProcessRelaDiagramView.js")
, 994), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 1112), Tuple.Create("\"", 1153)
, Tuple.Create(Tuple.Create("", 1118), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/Util/JointChart.js")
, 1118), false)
);

WriteLiteral("></script>");

        }
    }
}
#pragma warning restore 1591
