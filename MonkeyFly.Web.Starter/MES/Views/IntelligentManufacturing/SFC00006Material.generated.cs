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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00006Material.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00006Material_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00006Material_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentManufacturing\SFC00006Material.cshtml"
  
    ViewBag.Title = "SFC00006Material";
    Layout = "~/Views/Shared/_LayoutLang.cshtml";

            
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

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.materialBackClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow-left\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Back\"");

WriteLiteral(">Back</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.materialRefreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral(">Refresh</span></button>\r\n     </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" id=\"search-workStation\"");

WriteLiteral(">\r\n        <label");

WriteLiteral(" data-meaning=\"TaskCardNo\"");

WriteLiteral(" style=\"width:60px;\"");

WriteLiteral(">Task Card No.</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"TackNo\"");

WriteLiteral(" style=\"width: 180px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:RCCode,event:{change:RCChange}\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"WorkOrderNumber\"");

WriteLiteral(">Work Order No.</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"WorkOrderNumber\"");

WriteLiteral(" style=\"width: 150px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: WorkOrderNo\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"WorkCenter\"");

WriteLiteral(">Work Center</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"WorkCenter\"");

WriteLiteral(" style=\"width: 150px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:WorkCenter\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"Part\"");

WriteLiteral(">Part</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"Part\"");

WriteLiteral(" style=\"width: 150px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:ManufacturingProcess\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n\r\n\r\n        <div");

WriteLiteral(" style=\"padding-top:5px;\"");

WriteLiteral(">\r\n            <label");

WriteLiteral(" data-meaning=\"ItemDescription\"");

WriteLiteral(" style=\"width:60px;\"");

WriteLiteral(">ItemDescription </label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"ItemDescription\"");

WriteLiteral(" style=\"width: 180px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:Process\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n            <label");

WriteLiteral(" data-meaning=\"ItemSpecification\"");

WriteLiteral(">ItemSpecification</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:150px\"");

WriteLiteral(" id=\"ItemSpecification\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:Shift\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n            <label");

WriteLiteral(" data-meaning=\"DispatchAmount\"");

WriteLiteral(">DispatchAmount</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"DispatchAmount\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"WorkStartDate\"");

WriteLiteral(" style=\"width: 149px; margin-right:4px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" />\r\n        </div>\r\n\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(">  \r\n            <div");

WriteLiteral(" id=\"MaterialDetailsContent\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"MaterialDetailsTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"MaterialDetailPageBar\"");

WriteLiteral("></div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }
        #MaterialDetailsContent .fix-head,#MaterialDetailsContent .fix-table {
            width:170%;
        }
        .J-search input {
            margin-right: 10px;
        }
       
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3077), Tuple.Create("\"", 3122)
, Tuple.Create(Tuple.Create("", 3083), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 3083), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3169), Tuple.Create("\"", 3209)
, Tuple.Create(Tuple.Create("", 3175), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 3175), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3256), Tuple.Create("\"", 3292)
, Tuple.Create(Tuple.Create("", 3262), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 3262), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3339), Tuple.Create("\"", 3376)
, Tuple.Create(Tuple.Create("", 3345), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 3345), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3423), Tuple.Create("\"", 3490)
, Tuple.Create(Tuple.Create("", 3429), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00006Material.js")
, 3429), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591
