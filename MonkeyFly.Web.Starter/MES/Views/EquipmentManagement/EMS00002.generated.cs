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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/EquipmentManagement/EMS00002.cshtml")]
    public partial class _Views_EquipmentManagement_EMS00002_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_EquipmentManagement_EMS00002_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\EquipmentManagement\EMS00002.cshtml"
  
    ViewBag.Title = "EMS00002";
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

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"EquipmentCode\"");

WriteLiteral(">Equipment Code</span>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" id=\"Code\"");

WriteLiteral("/>\r\n        &nbsp;&nbsp;\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" style=\"width:100%;\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" style=\"width:30%; display:inline-block; float:left;\"");

WriteLiteral(">\r\n            <table");

WriteLiteral(" id=\"EMS00002LeftTable\"");

WriteLiteral("></table>\r\n        </div>\r\n        <div");

WriteLiteral(" style=\"width:69%; display:inline-block; margin:0 0 0 10px; float:left;\"");

WriteLiteral(" id=\"EMS00002RightCentent\"");

WriteLiteral(">\r\n            <table");

WriteLiteral(" id=\"EMS00002RightTable\"");

WriteLiteral("></table>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"AddDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:980px;\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:16px !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" onclick=\"model.AddDialogClose()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"AddEquipmentInspectionItem\"");

WriteLiteral(">Add Equipment Inspection Item</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" style=\"margin:5px 0 8px 0;\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"EquipmentCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:40px;\"");

WriteLiteral(">Equipment Code.</span>\r\n                <input");

WriteLiteral(" id=\"EquipmentCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:3px 2px 5px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n                <span");

WriteLiteral(" data-meaning=\"EquipmentDescription\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:40px;\"");

WriteLiteral(">Equipment Description</span>\r\n                <input");

WriteLiteral(" id=\"EquipmentDescription\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:3px 2px 5px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n                <span");

WriteLiteral(" data-meaning=\"Remark\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:40px;\"");

WriteLiteral(">Remark.</span>\r\n                <input");

WriteLiteral(" id=\"Remark\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:3px 2px 5px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"width:100%; height:100%;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"display: inline-block;width: 46%; height:100%;margin:3px 5px 3px 15px;flo" +
"at:left;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin:5px 8px 5px 5px;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" data-meaning=\"Unused\"");

WriteLiteral(">Unused</span>\r\n                    </div>\r\n                    <div");

WriteLiteral(" style=\"margin:0px 8px 5px 5px;  height:430px;\"");

WriteLiteral(" id=\"UnusedContent\"");

WriteLiteral(">\r\n                        <table");

WriteLiteral(" id=\"UnusedTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n                <d" +
"iv");

WriteLiteral(" style=\"float:left;display: inline-block;width: 4%;margin-top:16%;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin-bottom:20%;\"");

WriteLiteral(">\r\n                        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.ProcessMoveRightClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-right\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                    <div>\r\n       " +
"                 <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.ProcessMoveLeftClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-left\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                </div>\r\n          " +
"      <div");

WriteLiteral(" style=\"display: inline-block;width: 46%; height:100%;margin:3px 5px;float:left;\"" +
"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin:5px 8px 5px 5px;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" data-meaning=\"Used\"");

WriteLiteral(">Used</span>\r\n                    </div>\r\n                    <div");

WriteLiteral(" style=\"margin:0px 8px 5px 5px; height:420px;\"");

WriteLiteral(" id=\"UsedContent\"");

WriteLiteral(">\r\n                        <table");

WriteLiteral(" id=\"UsedTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n            </div>" +
"\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"Close\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.AddDialogClose()\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AddEquipmentInspectionItemChange\"");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(" onclick=\"model.AddEquipmentInspectionItemChange()\"");

WriteLiteral(">Change</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AddEquipmentInspectionItemComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.AddEquipmentInspectionItemComfirm()\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"EquipmentCodeDialog\"");

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

WriteLiteral(" data-meaning=\"EquipmentMasterFile\"");

WriteLiteral(">Equipment MasterFile</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"BeginEquipmentCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Begin Equipment Code</span>\r\n                <input");

WriteLiteral(" id=\"BeginEquipmentCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 140px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <span");

WriteLiteral(" data-meaning=\"EndEquipmentCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">End Equipment Code</span>\r\n                <input");

WriteLiteral(" id=\"EndEquipmentCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 140px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OpenEndEquipmentCodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(" id=\"EquipmentCodeContent\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EquipmentCodeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"Comfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"InspectionItemDialog\"");

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

WriteLiteral(" data-meaning=\"EquipmentItemBookMark\"");

WriteLiteral(">Equipment Item BookMark</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">  \r\n                <span");

WriteLiteral(" data-meaning=\"ProjectCode\"");

WriteLiteral(" style=\"margin:5px 5 px 8px 10px; width:60px;\"");

WriteLiteral(">Project Code</span>\r\n                <input");

WriteLiteral(" id=\"ProjectCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 140px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.ProjectCodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div ");

WriteLiteral(" style=\"margin:0 15px;\" id=\"InspectionItemContent\">\r\n                <table");

WriteLiteral(" id=\"InspectionItemTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            ");

WriteLiteral("\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"queding\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

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

       #UsedContent .fix-table,#UsedContent .fix-head{
            width: 200%;
       }
       #UnusedContent .fix-table,#UnusedContent .fix-head{
            width: 150%;
       }
       #EMS00002RightCentent .fix-table,#EMS00002RightCentent .fix-head{
            width: 200%;
       }
       .modal-header{
           padding:10px 5px 5px 5px !important;
       }
       .close{
           margin-right:10px;
       }
       .modal-footer{
           padding:5px;
           text-align:right;
       }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9245), Tuple.Create("\"", 9290)
, Tuple.Create(Tuple.Create("", 9251), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 9251), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9337), Tuple.Create("\"", 9377)
, Tuple.Create(Tuple.Create("", 9343), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 9343), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9424), Tuple.Create("\"", 9460)
, Tuple.Create(Tuple.Create("", 9430), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 9430), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9507), Tuple.Create("\"", 9544)
, Tuple.Create(Tuple.Create("", 9513), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 9513), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9591), Tuple.Create("\"", 9645)
, Tuple.Create(Tuple.Create("", 9597), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/EquipmentManagement/EMS00002.js")
, 9597), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591
