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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/EquipmentManagement/EMS00001EquipmentPicture.cshtml")]
    public partial class _Views_EquipmentManagement_EMS00001EquipmentPicture_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_EquipmentManagement_EMS00001EquipmentPicture_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\EquipmentManagement\EMS00001EquipmentPicture.cshtml"
  
    ViewBag.Title = "EMS00001EquipmentPicture";
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

WriteLiteral("> Delete</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"EquipmentCode\"");

WriteLiteral(">Equipment Code</span>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" data-bind=\"value: Code\"");

WriteLiteral(" />\r\n    </div>\r\n    <div");

WriteLiteral(" style=\"height:calc(100% - 77px);margin-top:5px\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" style=\"display: inline-block;width: 28%; height:100%;margin:0 5px;float:left;\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"EquipmentContent\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EquipmentMasterFileTable\"");

WriteLiteral("></table>\r\n            </div>\r\n        </div>\r\n        <div");

WriteLiteral(" style=\"display:inline-block;width: 70.3%;height:100%;\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" style=\"padding: 5px; border-top: 1px solid #ebebeb;\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"EquipmentCode\"");

WriteLiteral(">Equipment Code</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" id=\"TextEquipmentCode\"");

WriteLiteral(" disabled />\r\n                &nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"EquipmentDescription\"");

WriteLiteral(">Equipment Description</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" id=\"TextEquipmentDescription\"");

WriteLiteral(" disabled />\r\n                &nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"Remark\"");

WriteLiteral(">Remark</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" id=\"TextEquipmentRemark\"");

WriteLiteral(" disabled />\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"EquipmentPictureContent\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EquipmentPictureTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionEquipmentPictureBar\"");

WriteLiteral("></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"AddEquipmentPictureDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" style=\"z-index:99\"");

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

WriteLiteral(" data-meaning=\"AddEquipmentPicture\"");

WriteLiteral(">Add Equipment Picture</span>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" id=\"AddClose\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"padding: 10px 12px 5px;\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" data-meaning=\"DefaultName\"");

WriteLiteral(">DefaultName</span>\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" maxlength=\"20\"");

WriteLiteral(" id=\"AddDefaultName\"");

WriteLiteral(">\r\n                    &nbsp;\r\n                    <span");

WriteLiteral(" data-meaning=\"Default\"");

WriteLiteral(">Default</span>\r\n                    <select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" id=\"AddDefault\"");

WriteLiteral(" data-bind=\"options: Default, optionsText: \'text\', optionsValue: \'value\'\"");

WriteLiteral("></select>\r\n                </div>\r\n                <div");

WriteLiteral(" id=\"AddDrawing\"");

WriteLiteral(" style=\"padding:5px; text-align:center; height:400px;\"");

WriteLiteral("></div>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" id=\"AddCancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"AddComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div");

WriteLiteral(" id=\"color\"");

WriteLiteral(" class=\"color\"");

WriteLiteral("></div>\r\n<div");

WriteLiteral(" id=\"line_size\"");

WriteLiteral(" class=\"border_nochoose\"");

WriteLiteral("></div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"EditEquipmentPictureDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

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

WriteLiteral(" data-meaning=\"EditEquipmentPicture\"");

WriteLiteral(">Edit Equipment Picture</span>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" id=\"EditClose\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"padding: 10px 12px 5px;\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" data-meaning=\"DefaultName\"");

WriteLiteral(">DefaultName</span>\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" maxlength=\"20\"");

WriteLiteral(" id=\"EditDefaultName\"");

WriteLiteral(">\r\n                    &nbsp;\r\n                    <span");

WriteLiteral(" data-meaning=\"Default\"");

WriteLiteral(">Default</span>\r\n                    <select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" id=\"EditDefault\"");

WriteLiteral(" data-bind=\"options: Default, optionsText: \'text\', optionsValue: \'value\'\"");

WriteLiteral("></select>\r\n                </div>\r\n                <div");

WriteLiteral(" id=\"EditDrawing\"");

WriteLiteral(" style=\"padding:5px; text-align:center; height:400px;\"");

WriteLiteral("></div>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" id=\"EditCancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"EditComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div");

WriteLiteral(" id=\"editcolor\"");

WriteLiteral(" class=\"color\"");

WriteLiteral("></div>\r\n<div");

WriteLiteral(" id=\"editline_size\"");

WriteLiteral(" class=\"border_nochoose\"");

WriteLiteral("></div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ViewEquipmentPictureDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

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

WriteLiteral(" data-meaning=\"EquipmentPicture\"");

WriteLiteral(">Equipment Picture</span>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"padding:5px; text-align:center;\"");

WriteLiteral(">\r\n                    <img");

WriteLiteral(" id=\'ViewImage\'");

WriteLiteral(" style=\"width:560px;height:350px;text-align:center\"");

WriteLiteral(" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</di" +
"v>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }

        .EquipmentContent .fix-table, .EquipmentContent .fix-head {
            width: 138%;
        }

        .EquipmentPictureContent .fix-table, .EquipmentPictureContent .fix-head {
            width: 120%;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7566), Tuple.Create("\"", 7608)
, Tuple.Create(Tuple.Create("", 7572), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/drawingboard.js")
, 7572), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7655), Tuple.Create("\"", 7700)
, Tuple.Create(Tuple.Create("", 7661), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 7661), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7747), Tuple.Create("\"", 7787)
, Tuple.Create(Tuple.Create("", 7753), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 7753), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7834), Tuple.Create("\"", 7870)
, Tuple.Create(Tuple.Create("", 7840), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 7840), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7917), Tuple.Create("\"", 7954)
, Tuple.Create(Tuple.Create("", 7923), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 7923), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8001), Tuple.Create("\"", 8035)
, Tuple.Create(Tuple.Create("", 8007), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/draw.js")
, 8007), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8082), Tuple.Create("\"", 8152)
, Tuple.Create(Tuple.Create("", 8088), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/EquipmentManagement/EMS00001EquipmentPicture.js")
, 8088), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

WriteLiteral("\r\n");

        }
    }
}
#pragma warning restore 1591
