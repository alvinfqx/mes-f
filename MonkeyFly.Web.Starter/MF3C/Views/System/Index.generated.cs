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
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/System/Index.cshtml")]
    public partial class _Views_System_Index_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_System_Index_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\System\Index.cshtml"
  
    ViewBag.Title = "系统信息";
    ViewBag.LanguageURL = "/Data/Language/MES-MFC/System/System";
    Layout = "~/Views/Shared/_Layout.cshtml";

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"gray-bg\"");

WriteLiteral(" style=\"height:100%;\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"wrapper wrapper-content animated fadeIn\"");

WriteLiteral(" style=\"box-sizing: content-box; height: calc(100% - 60px); padding: 15px\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"row mf-layer\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"col-md-12\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" class=\"ibox float-e-margins\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" class=\"ibox-title\"");

WriteLiteral(">\r\n                        <h5");

WriteLiteral(" data-meaning=\"System Message\"");

WriteLiteral(">System Message</h5>\r\n                    </div>\r\n                    <div");

WriteLiteral(" class=\"ibox-content\"");

WriteLiteral(">\r\n                        <div");

WriteLiteral(" class=\"form-horizontal m-t\"");

WriteLiteral(">\r\n                            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                                <label");

WriteLiteral(" class=\"col-sm-3 control-label\"");

WriteLiteral(" data-meaning=\"System code：\"");

WriteLiteral(">System code：</label>\r\n                                <div");

WriteLiteral(" class=\"col-sm-8\"");

WriteLiteral(">\r\n                                    <label");

WriteLiteral(" id=\"SystemID\"");

WriteLiteral(" class=\"control-label\"");

WriteLiteral("></label>\r\n                                </div>\r\n                            </" +
"div>\r\n                            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                                <label");

WriteLiteral(" class=\"col-sm-3 control-label\"");

WriteLiteral(" data-meaning=\"System Name：\"");

WriteLiteral(">System Name：</label>\r\n                                <div");

WriteLiteral(" class=\"col-sm-8\"");

WriteLiteral(">\r\n                                    <label");

WriteLiteral(" id=\"SystemName\"");

WriteLiteral(" class=\"control-label\"");

WriteLiteral("></label>\r\n                                </div>\r\n                            </" +
"div>\r\n                            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                                <label");

WriteLiteral(" class=\"col-sm-3 control-label\"");

WriteLiteral(" data-meaning=\"English Name：\"");

WriteLiteral(">English Name：</label>\r\n                                <div");

WriteLiteral(" class=\"col-sm-8\"");

WriteLiteral(">\r\n                                    <label");

WriteLiteral(" id=\"SystemNameEN\"");

WriteLiteral(" class=\"control-label\"");

WriteLiteral("></label>\r\n                                </div>\r\n                            </" +
"div>\r\n                            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                                <label");

WriteLiteral(" class=\"col-sm-3 control-label\"");

WriteLiteral(" data-meaning=\"Customer：\"");

WriteLiteral(">Customer：</label>\r\n                                <div");

WriteLiteral(" class=\"col-sm-8\"");

WriteLiteral(">\r\n                                    <label");

WriteLiteral(" id=\"CustomerName\"");

WriteLiteral(" class=\"control-label\"");

WriteLiteral("></label>\r\n                                </div>\r\n                            </" +
"div>\r\n                            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                                <label");

WriteLiteral(" class=\"col-sm-3 control-label\"");

WriteLiteral(" data-meaning=\"Status：\"");

WriteLiteral(">Status：</label>\r\n                                <div");

WriteLiteral(" class=\"col-sm-8\"");

WriteLiteral(">\r\n                                    <label");

WriteLiteral(" id=\"Status\"");

WriteLiteral(" class=\"control-label\"");

WriteLiteral("></label>\r\n                                </div>\r\n                            </" +
"div>\r\n                            <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(">\r\n                                <label");

WriteLiteral(" class=\"col-sm-3 control-label\"");

WriteLiteral(" data-meaning=\"Comments：\"");

WriteLiteral(">Comments：</label>\r\n                                <div");

WriteLiteral(" class=\"col-sm-8\"");

WriteLiteral(">\r\n                                    <label");

WriteLiteral(" id=\"Comments\"");

WriteLiteral(" class=\"control-label\"");

WriteLiteral("></label>\r\n                                </div>\r\n                            </" +
"div>\r\n                        </div>\r\n                    </div>\r\n              " +
"  </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral("\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3256), Tuple.Create("\"", 3288)
, Tuple.Create(Tuple.Create("", 3262), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MFC/System.js")
, 3262), false)
);

WriteLiteral(@"></script>
    <style>
        .mf-layer {
            box-sizing: content-box;
            height: 100%;
        }

            .mf-layer .col-md-12 {
                box-sizing: content-box;
                height: 96%;
                width: 97%;
            }


            .mf-layer .ibox {
                box-sizing: content-box;
                margin-bottom: 0px;
                height: 100%;
            }

            .mf-layer .ibox-content {
                height: 100%;
                overflow-y: auto;
            }
    </style>
");

});

        }
    }
}
#pragma warning restore 1591