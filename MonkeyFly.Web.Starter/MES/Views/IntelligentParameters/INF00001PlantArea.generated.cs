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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00001PlantArea.cshtml")]
    public partial class _Views_IntelligentParameters_INF00001PlantArea_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00001PlantArea_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\IntelligentParameters\INF00001PlantArea.cshtml"
  
    ViewBag.Title = "廠別廠區資料維護-厂区維護";
    ViewBag.LanguageURL = "/Data/Language/MES/IntelligentParameters/INF00001/INF00001";
    ViewBag.TipURL = "/Data/tips/MES/IntelligentParameters/INF00001/INF00001";
    Layout = "~/Views/Shared/_Layout.cshtml";


            
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

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"刷新\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"refresh\"");

WriteLiteral("> Refresh</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_search\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"查询\"");

WriteLiteral(" onclick=\"model.searchClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-search\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral("> Search</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_save\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"保存\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"save\"");

WriteLiteral("> Save</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_add\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"新增\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"add\"");

WriteLiteral("> Add</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_edit\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"修改\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"updated\"");

WriteLiteral("> Edit</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_delete\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"删除\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Delete\"");

WriteLiteral("> Delete</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_languages\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"语系\"");

WriteLiteral(" onclick=\"model.languagesClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-language\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Languages\"");

WriteLiteral("> Languages</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_import\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"Import\"");

WriteLiteral(" onclick=\"model.importClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-page_white_excel\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral("> Import</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_export\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"Export\"");

WriteLiteral(" onclick=\"model.exportClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-download\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Export\"");

WriteLiteral("> Export</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <input");

WriteLiteral(" id=\"Code\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" placeholder=\"Factory Code\"");

WriteLiteral(" data-meaning=\"FactoryCode\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"PlantAreaTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"SiteDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:600px;\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:16px !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" onclick=\"model.clearInput(\'#SiteCode\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"SiteCode\"");

WriteLiteral(">Site Code</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"SiteCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Site Code</span>\r\n                <input");

WriteLiteral(" id=\"SiteCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.CodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodycode\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"SiteTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionSiteBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#SiteCode\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"commit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#SiteCode\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"inputDialog\"");

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

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" id=\"inputTitle\"");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral(">Import</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(" style=\"width:100%;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"width:15%; display:inherit; float:left; margin-left:20px;\"");

WriteLiteral(">\r\n                        <button");

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

WriteLiteral(" style=\"padding:5px; width:70%; display:inherit; float:left;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" id=\"FileName\"");

WriteLiteral("></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r" +
"\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-white\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success\"");

WriteLiteral(" id=\"addFile\"");

WriteLiteral(" data-meaning=\"save\"");

WriteLiteral(">Save</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .checkbox-cell {
            height: 25.5px;
        }

        #table-body .mf-table-wrapper {
            overflow-x: auto;
        }

        #table-body .fix-table, #table-body .fix-head {
            width: 130%;
        }

        #table-bodycode .mf-table-wrapper {
            overflow-x: auto;
        }

        #table-bodycode .fix-table, #table-bodycode .fix-head {
            width: 185%;
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
            width: 65px;
        }

        input[type=number] {
            -moz-appearance: textfield;
            width: 80px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            margin: 0;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8069), Tuple.Create("\"", 8126)
, Tuple.Create(Tuple.Create("", 8075), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 8075), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8150), Tuple.Create("\"", 8195)
, Tuple.Create(Tuple.Create("", 8156), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 8156), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8242), Tuple.Create("\"", 8282)
, Tuple.Create(Tuple.Create("", 8248), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 8248), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8329), Tuple.Create("\"", 8365)
, Tuple.Create(Tuple.Create("", 8335), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 8335), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8412), Tuple.Create("\"", 8449)
, Tuple.Create(Tuple.Create("", 8418), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 8418), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8496), Tuple.Create("\"", 8531)
, Tuple.Create(Tuple.Create("", 8502), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 8502), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8578), Tuple.Create("\"", 8643)
, Tuple.Create(Tuple.Create("", 8584), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00001PlantArea.js")
, 8584), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n\r\n");

});

        }
    }
}
#pragma warning restore 1591
