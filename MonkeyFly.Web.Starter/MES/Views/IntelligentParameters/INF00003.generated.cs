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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00003.cshtml")]
    public partial class _Views_IntelligentParameters_INF00003_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00003_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\IntelligentParameters\INF00003.cshtml"
  
    ViewBag.Title = "帳號管理";
    ViewBag.LanguageURL = "/Data/Language/MES/IntelligentParameters/INF00003/INF00003";
    ViewBag.TipURL = "/Data/tips/MES/IntelligentParameters/INF00001/INF00001";
    Layout = "~/Views/Shared/_Layout.cshtml";


            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n<div");

WriteLiteral(" id=\"tb_list\"");

WriteLiteral(" class=\"J-main\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" id=\"container\"");

WriteLiteral(" class=\"J-toolbar\"");

WriteLiteral("></div>\r\n    <div");

WriteLiteral(" style=\"height:calc(100% - 47.5px);\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" style=\"display: inline-block;width: 20%;float:left;height:calc(100% - 19px);padd" +
"ing: 5px 0 0 5px;\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" style=\"padding: 4px;font-weight: 600;border: 1px solid #e4eaec;\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"Organization\"");

WriteLiteral(">Organization</span>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"border-left:1px solid #e4eaec;border-right:1px solid #e4eaec;border-botto" +
"m:1px solid #e4eaec;height:100%; overflow-x:auto;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"Organizationtree\"");

WriteLiteral("></div>\r\n            </div>           \r\n        </div>\r\n        <div");

WriteLiteral(" style=\"display: inline-block;width: 80%;\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"AccountNo\"");

WriteLiteral(">Work Number</span>\r\n                <input");

WriteLiteral(" id=\"AccountNo\"");

WriteLiteral("  name=\"Account No.\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                &nbsp;&nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"Account\"");

WriteLiteral(">Account</span>\r\n                <input");

WriteLiteral(" id=\"SearchAccount\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                &nbsp;&nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"UserName\"");

WriteLiteral(">User Name</span>\r\n                <input");

WriteLiteral(" id=\"SearchUserName\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                &nbsp;&nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</span>\r\n                <select");

WriteLiteral(" id=\"Status\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral(" >\r\n                    <option></option>\r\n                    <option");

WriteLiteral(" value=\"1\"");

WriteLiteral(" data-meaning=\"normal\"");

WriteLiteral(">Normal</option>\r\n                    <option");

WriteLiteral(" value=\"0\"");

WriteLiteral(" data-meaning=\"invalid\"");

WriteLiteral(">Invalid</option>\r\n                </select>\r\n                &nbsp;&nbsp;\r\n     " +
"           <span");

WriteLiteral(" data-meaning=\"Department\"");

WriteLiteral(">Department</span>\r\n                <select");

WriteLiteral(" id=\"DepartmentID\"");

WriteLiteral(" data-bind=\"options:DepartmentArray,optionsValue:\'value\',optionsText:\'text\',value" +
":DepartmentID,optionsCaption:\'\'\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("></select>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"padding: 5px 5px 0 5px;\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"employeeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

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

WriteLiteral("\r\n");

WriteLiteral("\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"SetRoleDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">\r\n    <style>\r\n        .ui-state-highlight, .ui-widget-content .ui-state-highlig" +
"ht, .ui-widget-header .ui-state-highlight {\r\n            border: 1px solid red;\r" +
"\n        }\r\n    </style>\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:800px;\"");

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

WriteLiteral(">关闭</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" id=\"editTitle\"");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(">设置角色</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"setRoles\"");

WriteLiteral(">\r\n                </div>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-white\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">关闭</button>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success\"");

WriteLiteral(" id=\"setRoleSave\"");

WriteLiteral(">保存</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>

        #table-body .mf-table-wrapper {
            overflow-x: auto;
        }

        #table-body .fix-table, #table-body .fix-head {
            /*width: 218%;*/
            width: 1736px;
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
    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7692), Tuple.Create("\"", 7736)
, Tuple.Create(Tuple.Create("", 7699), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 7699), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7766), Tuple.Create("\"", 7815)
, Tuple.Create(Tuple.Create("", 7773), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/jsTree/style.min.css")
, 7773), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7847), Tuple.Create("\"", 7904)
, Tuple.Create(Tuple.Create("", 7853), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 7853), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7928), Tuple.Create("\"", 7973)
, Tuple.Create(Tuple.Create("", 7934), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 7934), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8020), Tuple.Create("\"", 8060)
, Tuple.Create(Tuple.Create("", 8026), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 8026), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8107), Tuple.Create("\"", 8143)
, Tuple.Create(Tuple.Create("", 8113), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 8113), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8190), Tuple.Create("\"", 8227)
, Tuple.Create(Tuple.Create("", 8196), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 8196), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8274), Tuple.Create("\"", 8309)
, Tuple.Create(Tuple.Create("", 8280), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 8280), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8356), Tuple.Create("\"", 8412)
, Tuple.Create(Tuple.Create("", 8362), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00003.js")
, 8362), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n\r\n");

});

        }
    }
}
#pragma warning restore 1591
