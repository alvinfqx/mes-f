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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00015SourceGroup.cshtml")]
    public partial class _Views_IntelligentParameters_INF00015SourceGroup_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00015SourceGroup_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentParameters\INF00015SourceGroup.cshtml"
  
    ViewBag.Title = "INF00015SourceGroup";
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

WriteLiteral(" id=\"btn_refresh\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Refresh\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral("> Refresh</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_search\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Search\"");

WriteLiteral(" onclick=\"model.searchClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-search\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral("> Search</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_save\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Save\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral("> Save</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_add\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"New\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral("> Add</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_edit\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Change\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral("> Edit</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_delete\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Deletion\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral("> Delete</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_languages\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Langwage\"");

WriteLiteral(" onclick=\"model.languagesClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-language\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Langwage\"");

WriteLiteral("> Languages</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_import\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Import\"");

WriteLiteral(" onclick=\"model.importClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-page_white_excel\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral("> Import</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_export\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Export\"");

WriteLiteral(" onclick=\"model.exportClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-download\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Export\"");

WriteLiteral("> Export</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"SourceGroupNumber\"");

WriteLiteral(">Source Group Number</span>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" data-bind=\"value: Code\"");

WriteLiteral(" />\r\n        &nbsp;&nbsp;\r\n        <span");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</span>\r\n        <select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"options: StatusList, optionsText: \'text\', optionsValue: \'value\', opti" +
"onsCaption: \'\', value: Status\"");

WriteLiteral("></select>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"INF00015Table\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ImportDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">\r\n    <style>\r\n        .ui-state-highlight, .ui-widget-content .ui-state-highlig" +
"ht, .ui-widget-header .ui-state-highlight {\r\n            border: 1px solid red;\r" +
"\n        }\r\n    </style>\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:400px;\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:16px !important\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral(">Import</span>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(">\r\n                <div>\r\n                    <div>\r\n                        <but" +
"ton");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"BtnBrowse\"");

WriteLiteral(">\r\n                            <span");

WriteLiteral(" data-meaning=\"Browse\"");

WriteLiteral(">Browse</span>\r\n                        </button>\r\n                        <input" +
"");

WriteLiteral(" id=\"BtnFile\"");

WriteLiteral(" type=\"file\"");

WriteLiteral(" style=\"opacity:0\"");

WriteLiteral(" />\r\n                    </div>\r\n                    <div");

WriteLiteral(" style=\"padding:5px;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" id=\"FileName\"");

WriteLiteral("></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r" +
"\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"BtnImport\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral("\r\n    <style>\r\n        .mf-table-wrapper {\r\n            overflow-x: auto;\r\n      " +
"  }\r\n\r\n        .fix-table, .fix-head {\r\n            width: 100%;\r\n        }\r\n   " +
" </style>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4487), Tuple.Create("\"", 4532)
, Tuple.Create(Tuple.Create("", 4493), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 4493), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4579), Tuple.Create("\"", 4619)
, Tuple.Create(Tuple.Create("", 4585), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 4585), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4666), Tuple.Create("\"", 4702)
, Tuple.Create(Tuple.Create("", 4672), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 4672), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4749), Tuple.Create("\"", 4786)
, Tuple.Create(Tuple.Create("", 4755), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 4755), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4833), Tuple.Create("\"", 4900)
, Tuple.Create(Tuple.Create("", 4839), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00015SourceGroup.js")
, 4839), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

WriteLiteral("\r\n");

        }
    }
}
#pragma warning restore 1591
