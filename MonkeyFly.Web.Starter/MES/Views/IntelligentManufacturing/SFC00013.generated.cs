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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00013.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00013_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00013_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentManufacturing\SFC00013.cshtml"
  
    ViewBag.Title = "SFC00013";
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

WriteLiteral(">\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" style=\"margin:5px 5px;\"");

WriteLiteral(">\r\n            <span");

WriteLiteral(" data-meaning=\"StartProcessNo\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">Start Process No.</span>\r\n            <input");

WriteLiteral(" id=\"StartProcessNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.showStartProcessNo()\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n            <span");

WriteLiteral(" data-meaning=\"EndProcessNo\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">End Process No.</span>\r\n            <input");

WriteLiteral(" id=\"EndProcessNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.showEndProcessNo()\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n            <span");

WriteLiteral(" data-meaning=\"StartItemCode\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">Start Item Code</span>\r\n            <input");

WriteLiteral(" id=\"StartItemCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />            \r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.showStartItemCode()\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        </div>\r\n        <div");

WriteLiteral(" style=\"margin:5px 5px 0px 5px;\"");

WriteLiteral(">\r\n            <span");

WriteLiteral(" data-meaning=\"EndItemCode\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">End Item Code</span>\r\n            <input");

WriteLiteral(" id=\"EndItemCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.showEndItemCode()\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n            <span");

WriteLiteral(" data-meaning=\"StartDateOfCompletion\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">Start Completion Date</span>\r\n            <input");

WriteLiteral(" id=\"StartDateOfCompletion\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n            <span");

WriteLiteral(" data-meaning=\"EndDateOfCompletion\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">End Completion Date</span>\r\n            <input");

WriteLiteral(" id=\"EndDateOfCompletion\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        </div>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"SFC00013Table\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"StartProcessNoDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:570px;\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#StartProcessCode\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ProcessMaster\"");

WriteLiteral(">Process Master</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ProcessNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Process No.</span>\r\n                <input");

WriteLiteral(" id=\"StartProcessCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.StartProcessCodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0 15px 5px 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"StartProcessNoTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionStartProcessNoBar\"");

WriteLiteral(" style=\"margin:0 10px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:8px 15px;\"");

WriteLiteral(">               \r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#StartProcessCode\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"StartProcessNoCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#StartProcessCode\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"EndProcessNoDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:570px;\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#EndProcessCode\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ProcessMaster\"");

WriteLiteral(">Process Master</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ProcessNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Process No.</span>\r\n                <input");

WriteLiteral(" id=\"EndProcessCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.EndProcessCodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0 15px 5px 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EndProcessNoTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionEndProcessNoBar\"");

WriteLiteral(" style=\"margin:0 10px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:8px 15px;\"");

WriteLiteral(">                \r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#EndProcessCode\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"EndProcessNoCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#EndProcessCode\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"StartItemDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:650px;\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#StartItemNo\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ItemMasterFile\"");

WriteLiteral(">Item File</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ItemNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Item No.</span>\r\n                <input");

WriteLiteral(" id=\"StartItemNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.StartItemNoSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodyUse\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"StartItemTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionStartItemBar\"");

WriteLiteral(" style=\"margin:0 10px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:8px 15px;\"");

WriteLiteral(">                \r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#StartItemNo\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"StartItemCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#StartItemNo\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"EndItemDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:650px;\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#EndItemNo\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ItemMasterFile\"");

WriteLiteral(">Item File</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ItemNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Item No.</span>\r\n                <input");

WriteLiteral(" id=\"EndItemNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.EndItemNoSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodyUse\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EndItemTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionEndItemBar\"");

WriteLiteral(" style=\"margin:0 10px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:8px 15px;\"");

WriteLiteral(">                \r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#EndItemNo\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"EndItemCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#EndItemNo\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"AberrantDetailDialog\"");

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

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"AberrantDetail\"");

WriteLiteral(">Aberrant Detail</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ItemNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:40px;\"");

WriteLiteral(">Item No.</span>\r\n                <input");

WriteLiteral(" id=\"DetailItemNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 140px; margin:3px 2px 5px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n                <span");

WriteLiteral(" data-meaning=\"ItemDescription\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:40px;\"");

WriteLiteral(">Item Dept.</span>\r\n                <input");

WriteLiteral(" id=\"DetailItemDept\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 200px; margin:3px 2px 5px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 5px 10px;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"Detail\"");

WriteLiteral(">\r\n                    <table");

WriteLiteral(" id=\"DetailTable\"");

WriteLiteral("></table>\r\n                </div>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:10px 15px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" id=\"CallCancel\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral("  value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }

        .fix-table, .fix-head {
            width: 100%;
        }
        #table-bodyUse .fix-table, #table-bodyUse .fix-head {
            width: 130%;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12624), Tuple.Create("\"", 12669)
, Tuple.Create(Tuple.Create("", 12630), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 12630), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12716), Tuple.Create("\"", 12797)
, Tuple.Create(Tuple.Create("", 12722), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js")
, 12722), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12821), Tuple.Create("\"", 12902)
, Tuple.Create(Tuple.Create("", 12827), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-TW.min.js")
, 12827), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12926), Tuple.Create("\"", 12966)
, Tuple.Create(Tuple.Create("", 12932), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 12932), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 13013), Tuple.Create("\"", 13049)
, Tuple.Create(Tuple.Create("", 13019), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 13019), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 13096), Tuple.Create("\"", 13133)
, Tuple.Create(Tuple.Create("", 13102), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 13102), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 13180), Tuple.Create("\"", 13239)
, Tuple.Create(Tuple.Create("", 13186), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00013.js")
, 13186), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591