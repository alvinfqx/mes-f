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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00016.cshtml")]
    public partial class _Views_IntelligentParameters_INF00016_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00016_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentParameters\INF00016.cshtml"
  
    ViewBag.Title = "INF00016單據自動編號維護";
    Layout = "~/Views/Shared/_LayoutLang.cshtml";

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" id=\"tb_lis\"");

WriteLiteral(" class=\"J-main\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" style=\"height:40px;padding: 3px 3px 0;\"");

WriteLiteral(">\r\n        <ul");

WriteLiteral(" class=\"nav nav-tabs\"");

WriteLiteral(" id=\"liTab\"");

WriteLiteral(">\r\n            <li");

WriteLiteral(" class=\"active\"");

WriteLiteral(">\r\n                <a");

WriteLiteral(" data-toggle=\"tab\"");

WriteLiteral(" data-href=\"#tab-1\"");

WriteLiteral(" aria-expanded=\"true\"");

WriteLiteral(" data-meaning=\"DocumentType\"");

WriteLiteral(">Document Type</a>\r\n            </li>\r\n            <li>\r\n                <a");

WriteLiteral(" data-toggle=\"tab\"");

WriteLiteral(" data-href=\"#tab-2\"");

WriteLiteral(" aria-expanded=\"false\"");

WriteLiteral(" data-meaning=\"DocumentSetup\"");

WriteLiteral(">Document Setup</a>\r\n            </li>           \r\n        </ul>\r\n    </div>\r\n   " +
" <div");

WriteLiteral(" style=\"height: calc(100% - 44px);\"");

WriteLiteral(">\r\n        <iframe");

WriteLiteral(" id=\"iframe\"");

WriteLiteral(" style=\"width:100%;height:100%;border:none;\"");

WriteLiteral(" src=\"/MES/IntelligentParameters/INF00016DocumentType\"");

WriteLiteral("></iframe>\r\n        <iframe");

WriteLiteral(" id=\"iframe2\"");

WriteLiteral(" style=\"width:100%;height:100%;border:none;display:none;\"");

WriteLiteral(" src=\"\"");

WriteLiteral("></iframe>       \r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral("\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 972), Tuple.Create("\"", 1028)
, Tuple.Create(Tuple.Create("", 978), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00016.js")
, 978), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <style>\r\n        .nav > li > a {\r\n            font-size: 14px !im" +
"portant;\r\n            font-weight: 500 !important;\r\n        }\r\n    </style>\r\n");

});

WriteLiteral("\r\n\r\n\r\n\r\n");

        }
    }
}
#pragma warning restore 1591
