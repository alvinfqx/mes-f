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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00001BOM.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00001BOM_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00001BOM_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\IntelligentManufacturing\SFC00001BOM.cshtml"
  
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

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(">Save</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(">Change</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"ProductCode\"");

WriteLiteral(">ProductCode</span>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value: Code\"");

WriteLiteral(" />\r\n        &nbsp;\r\n        <span");

WriteLiteral(" data-meaning=\"GoodsName\"");

WriteLiteral(">GoodsName</span>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value: Name\"");

WriteLiteral(" />\r\n        &nbsp;\r\n        <span");

WriteLiteral(" data-meaning=\"Specification\"");

WriteLiteral(">Specification</span>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value: Specification\"");

WriteLiteral(" />\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" style=\"height:calc(100% - 77px);margin-top:5px\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" style=\"display: inline-block;width: 40%; height:100%;margin:0 5px;float:left;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"treeList\"");

WriteLiteral(" style=\"border:1px solid #e4eaec;overflow:auto;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" id=\"ProcessProcess_Jstree\"");

WriteLiteral(" style=\"height:100%;\"");

WriteLiteral("></div>\r\n                </div>\r\n                <div");

WriteLiteral(" style=\"margin-top:5px;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" id=\"ItemMasterFile\"");

WriteLiteral(">\r\n                        <div");

WriteLiteral(" id=\"ItemMasterFileTable\"");

WriteLiteral("></div>\r\n                    </div>\r\n                    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n                </div>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"float:left;display: inline-block;width: 4%;margin-top:21%;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"margin-bottom:20%;\"");

WriteLiteral(">\r\n                    <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.MoveRightClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-right\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                </div>\r\n                <div>\r\n               " +
"     <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.MoveLeftClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-left\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                </div>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"display:inline-block;width: 54.6%;height:100%;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"OrderMaterial\"");

WriteLiteral(">\r\n                    <table");

WriteLiteral(" id=\"OrderMaterialTable\"");

WriteLiteral("></table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>" +
"\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ProcessDialog\"");

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

WriteLiteral(" data-meaning=\"ProcessInformation\"");

WriteLiteral(">Process Information</span>\r\n                <button");

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

WriteLiteral(" data-meaning=\"ProcessNo\"");

WriteLiteral(">ProcessNo</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"ProcessNo\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"ProcessSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"ProcessContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ProcessTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionProcessBar\"");

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

WriteLiteral(" id=\"ProcessConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

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

WriteLiteral(" data-meaning=\"WorkOrderNo\"");

WriteLiteral(">WorkOrderNo</span>\r\n                <input");

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

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }


        #ItemMasterFile .fix-table, #ItemMasterFile .fix-head {
            width: 200%;
        }

        #OrderMaterial .fix-table, #OrderMaterial .fix-head {
            width: 260%;
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
    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7158), Tuple.Create("\"", 7207)
, Tuple.Create(Tuple.Create("", 7165), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/jsTree/style.min.css")
, 7165), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7239), Tuple.Create("\"", 7284)
, Tuple.Create(Tuple.Create("", 7245), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 7245), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7331), Tuple.Create("\"", 7371)
, Tuple.Create(Tuple.Create("", 7337), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 7337), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7418), Tuple.Create("\"", 7454)
, Tuple.Create(Tuple.Create("", 7424), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 7424), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7501), Tuple.Create("\"", 7538)
, Tuple.Create(Tuple.Create("", 7507), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 7507), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7585), Tuple.Create("\"", 7647)
, Tuple.Create(Tuple.Create("", 7591), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00001BOM.js")
, 7591), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591