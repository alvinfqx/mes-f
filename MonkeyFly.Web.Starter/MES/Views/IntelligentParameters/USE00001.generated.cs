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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/USE00001.cshtml")]
    public partial class _Views_IntelligentParameters_USE00001_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_USE00001_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentParameters\USE00001.cshtml"
  
    ViewBag.Title = "USE00001";
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

WriteLiteral(" data-meaning=\"UseCode\"");

WriteLiteral(">Where-Used No.</span>\r\n        <input");

WriteLiteral(" id=\"Code\"");

WriteLiteral(" name=\"Code\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        &nbsp;&nbsp;\r\n        <span");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</span>\r\n        <select");

WriteLiteral(" id=\"Status\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(">\r\n            <option></option>\r\n            <option");

WriteLiteral(" value=\"1\"");

WriteLiteral(" data-meaning=\"Normal\"");

WriteLiteral(">Normal</option>\r\n            <option");

WriteLiteral(" value=\"0\"");

WriteLiteral(" data-meaning=\"Invalid\"");

WriteLiteral(">Invalid</option>\r\n        </select>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"WhereUsedTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

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

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(">Save</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

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
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3691), Tuple.Create("\"", 3748)
, Tuple.Create(Tuple.Create("", 3697), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 3697), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3772), Tuple.Create("\"", 3817)
, Tuple.Create(Tuple.Create("", 3778), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 3778), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3864), Tuple.Create("\"", 3904)
, Tuple.Create(Tuple.Create("", 3870), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 3870), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 3951), Tuple.Create("\"", 3987)
, Tuple.Create(Tuple.Create("", 3957), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 3957), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4034), Tuple.Create("\"", 4071)
, Tuple.Create(Tuple.Create("", 4040), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 4040), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4118), Tuple.Create("\"", 4153)
, Tuple.Create(Tuple.Create("", 4124), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 4124), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 4200), Tuple.Create("\"", 4256)
, Tuple.Create(Tuple.Create("", 4206), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/USE00001.js")
, 4206), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591
