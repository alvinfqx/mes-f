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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/Util/Languages.cshtml")]
    public partial class _Views_Util_Languages_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_Util_Languages_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\Util\Languages.cshtml"
  
    ViewBag.Title = "通用语系维护";
    Layout = "~/Views/Shared/_Layout.cshtml";
    ViewBag.LanguageURL = "/Data/Language/MES/Util/Languages";
    ViewBag.TipURL = "/Data/tips/MES/IntelligentParameters/Languages/Languages";

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" id=\"tb_list\"");

WriteLiteral(" class=\"J-main\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" id=\"container\"");

WriteLiteral(" class=\"J-toolbar\"");

WriteLiteral(">\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.backClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow-left\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Add\"");

WriteLiteral(">Add</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Edit\"");

WriteLiteral(">Edit</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Delete\"");

WriteLiteral(">Delete</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_comfirm\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.comfirmClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        \r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"LanguagesTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
<style>
    #table-body .mf-table-wrapper {
            overflow-x: auto;
    }

    #table-body .fix-table, #table-body .fix-head {
            width: 100%;
    }

    select {
        height: 25.5px;
        font-size: 12px;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
</style>
    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 2158), Tuple.Create("\"", 2202)
, Tuple.Create(Tuple.Create("", 2165), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 2165), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 2234), Tuple.Create("\"", 2287)
, Tuple.Create(Tuple.Create("", 2240), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/iCheck/icheck.min.js")
, 2240), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 2311), Tuple.Create("\"", 2347)
, Tuple.Create(Tuple.Create("", 2317), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 2317), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 2394), Tuple.Create("\"", 2431)
, Tuple.Create(Tuple.Create("", 2400), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 2400), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 2478), Tuple.Create("\"", 2513)
, Tuple.Create(Tuple.Create("", 2484), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 2484), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 2560), Tuple.Create("\"", 2600)
, Tuple.Create(Tuple.Create("", 2566), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/Util/Languages.js")
, 2566), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591
