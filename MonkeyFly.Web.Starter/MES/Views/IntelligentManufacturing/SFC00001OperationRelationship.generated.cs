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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00001OperationRelationship.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00001OperationRelationship_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00001OperationRelationship_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\IntelligentManufacturing\SFC00001OperationRelationship.cshtml"
  
    ViewBag.Title = "SFC00001";
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

WriteLiteral(" onclick=\"model.backClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow-left\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Back\"");

WriteLiteral(">Back</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral(">Refresh</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral(">New</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(">Change</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral(">Deletion</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(">Save</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.chartClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"OperationRelationshipDiagram\"");

WriteLiteral(">OperationRelationshipDiagram</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" class=\"MainForm\"");

WriteLiteral(">\r\n            <tr");

WriteLiteral(" class=\"MainFormFirst\"");

WriteLiteral(">\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"ProductCode\"");

WriteLiteral(">ProductCode</span></td>\r\n                <td><input");

WriteLiteral(" id=\"ItemCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"NameSpecification\"");

WriteLiteral(">NameSpecification</span></td>\r\n                <td><input");

WriteLiteral(" id=\"ItemName\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"WorkCenterNo\"");

WriteLiteral(">WorkCenterNo</span></td>\r\n                <td><input");

WriteLiteral(" id=\"WorkCenterCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"WorkCenterDescription\"");

WriteLiteral(">WorkCenterDescription</span></td>\r\n                <td><input");

WriteLiteral(" id=\"WorkCenterName\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"ProcessNo\"");

WriteLiteral(">ProcessNo</span></td>\r\n                <td><input");

WriteLiteral(" id=\"ProcessCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"ProcessDescription\"");

WriteLiteral(">ProcessDescription</span></td>\r\n                <td><input");

WriteLiteral(" id=\"ProcessName\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"IsEnableProcess\"");

WriteLiteral(">IsEnableProcess</span></td>\r\n                <td><input");

WriteLiteral(" id=\"IsOperation\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 30px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>" +
"\r\n        </table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" id=\"MainContent\"");

WriteLiteral(">\r\n            <table");

WriteLiteral(" id=\"MainTable\"");

WriteLiteral("></table>\r\n        </div>\r\n        <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"MainPageBar\"");

WriteLiteral("></div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"OperationDialog\"");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"OperationInformation\"");

WriteLiteral(">Operation Information</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"Operation\"");

WriteLiteral(">Operation</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"OperationNo\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"OperationSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"OperationContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"OperationTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionOperationBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"OperationConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"PreOperationDialog\"");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"OperationInformation\"");

WriteLiteral(">Operation Information</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"Operation\"");

WriteLiteral(">Operation</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"PreOperationNo\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"PreOperationSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"PreOperationContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"PreOperationTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionPreOperationBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"PreOperationConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }

        #MainContent .fix-table, #MainContent .fix-head {
            width: 150%;
        }

        .OperationContent .fix-table, .OperationContent .fix-head {
            width: 110%;
        }

        .PreOperationContent .fix-table, .PreOperationContent .fix-head {
            width: 110%;
        }

        .MainForm {
            width: 100%;
        }

        .MainFormFirst td {
            padding-bottom: 5px;
            vertical-align: middle;
        }

        .MainForm .td_label {
            text-align: right;
            padding-right: 5px;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7788), Tuple.Create("\"", 7833)
, Tuple.Create(Tuple.Create("", 7794), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 7794), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7880), Tuple.Create("\"", 7920)
, Tuple.Create(Tuple.Create("", 7886), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 7886), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7967), Tuple.Create("\"", 8003)
, Tuple.Create(Tuple.Create("", 7973), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 7973), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8050), Tuple.Create("\"", 8087)
, Tuple.Create(Tuple.Create("", 8056), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 8056), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8134), Tuple.Create("\"", 8214)
, Tuple.Create(Tuple.Create("", 8140), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00001OperationRelationship.js")
, 8140), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591
