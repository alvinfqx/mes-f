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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00003Edit.cshtml")]
    public partial class _Views_IntelligentParameters_INF00003Edit_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00003Edit_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\IntelligentParameters\INF00003Edit.cshtml"
  
    ViewBag.Title = "编辑员工信息";
    Layout = "~/Views/Shared/_LayoutLang.cshtml";

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n<div");

WriteLiteral(" id=\"tb_list\"");

WriteLiteral(" class=\"J-main\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" id=\"container\"");

WriteLiteral(" class=\"J-toolbar\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n        <table>\r\n            <tr>\r\n                <td");

WriteLiteral(" width=\"5px;\"");

WriteLiteral("></td>\r\n                <td");

WriteLiteral(" style=\"text-align:left;  width:59%;\"");

WriteLiteral(">\r\n                    <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.backClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow-left\"");

WriteLiteral("></i>&nbsp;<span");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral("> Cancel</span></button>\r\n                    <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral("> Refresh</span></button>\r\n                    <button");

WriteLiteral(" id=\"btn_Save\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral("> Save</span></button>\r\n                </td>\r\n                <td");

WriteLiteral(" style=\"text-align:right; width:40%; height:28px;\"");

WriteLiteral("></td> \r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"table\"");

WriteLiteral(">\r\n            <tr");

WriteLiteral(" style=\"line-height:35px;\"");

WriteLiteral(">\r\n                <td");

WriteLiteral(" colspan=\"3\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" data-meaning=\"EditEmployee\"");

WriteLiteral(" style=\"font-size:16px; text-align:center; font-weight:600;\"");

WriteLiteral(">Edit Employee</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><span");

WriteLiteral(" style=\"color:red;\"");

WriteLiteral(">* </span><spnan");

WriteLiteral(" data-meaning=\"AccountNo\"");

WriteLiteral(">Account No.</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" maxlength=\"20\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Account\"");

WriteLiteral(" data-bind=\"value:Account\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><spnan");

WriteLiteral(" data-meaning=\"WorkNumber\"");

WriteLiteral(">Work Number</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" maxlength=\"20\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Emplno\"");

WriteLiteral(" data-bind=\"value:Emplno\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><span");

WriteLiteral(" style=\"color:red;\"");

WriteLiteral(">* </span><spnan");

WriteLiteral(" data-meaning=\"Name\"");

WriteLiteral(">Name</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" maxlength=\"20\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"UserName\"");

WriteLiteral(" data-bind=\"value:UserName\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"EnglishName\"");

WriteLiteral(">English Name</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" maxlength=\"60\"");

WriteLiteral(" id=\"EnglishName\"");

WriteLiteral(" data-bind=\"value:EnglishName\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Sex\"");

WriteLiteral(">Sex</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Sex\"");

WriteLiteral(" data-bind=\"options:SexArray,optionsValue:\'value\',optionsText:\'text\',value:Sex\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("></select></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Birthday\"");

WriteLiteral(">Birthday</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"Brith\"");

WriteLiteral(" data-bind=\"value:Brith\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><spnan");

WriteLiteral(" data-meaning=\"IDcard\"");

WriteLiteral(">ID card</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" maxlength=\"18\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"IDcard\"");

WriteLiteral(" data-bind=\"value:IDcard\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><spnan");

WriteLiteral(" data-meaning=\"Phone\"");

WriteLiteral(">Phone</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" maxlength=\"11\"");

WriteLiteral(" id=\"Mobile\"");

WriteLiteral(" data-bind=\"value:Mobile\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Email\"");

WriteLiteral(">E-mail</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" maxlength=\"60\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Email\"");

WriteLiteral(" data-bind=\"value:Email\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Status\"");

WriteLiteral(" data-bind=\"options:StatusArray,optionsValue:\'value\',optionsText:\'text\',value:Sta" +
"tus\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("></select></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"JobType\"");

WriteLiteral(">Job Type</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Sex\"");

WriteLiteral(" data-bind=\"options:TypeArray,optionsValue:\'value\',optionsText:\'text\',value:Type\"" +
"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("></select></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><spnan");

WriteLiteral(" data-meaning=\"EntryTime\"");

WriteLiteral(">Entry Time</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"InTime\"");

WriteLiteral(" data-bind=\"value:InTime\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><spnan");

WriteLiteral(" data-meaning=\"CardNumber\"");

WriteLiteral(">CardNumber</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" maxlength=\"50\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"CardCode\"");

WriteLiteral(" data-bind=\"value:CardCode\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><spnan");

WriteLiteral(" data-meaning=\"Department\"");

WriteLiteral(">Department</spnan></td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Sex\"");

WriteLiteral(" data-bind=\"options:DepartmentArray,optionsValue:\'value\',optionsText:\'text\',value" +
":Department,optionsCaption:PleaseChoose\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("></select></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Remark\"");

WriteLiteral(">Remark</td>\r\n                <td");

WriteLiteral(" colspan=\"3\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:720px;\"");

WriteLiteral(" maxlength=\"120\"");

WriteLiteral(" id=\"Comments\"");

WriteLiteral(" data-bind=\"value:Comments\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" /></td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .td_right {
            text-align: right;
            padding-right: 5px;
            width: 90px;
            font-size: 12px;
            font-weight: bold;
        }

        .td_left {
            width: 310px;
        }

        #table tr {
            line-height: 53px;
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

WriteAttribute("href", Tuple.Create(" href=\"", 6898), Tuple.Create("\"", 6948)
, Tuple.Create(Tuple.Create("", 6905), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/bootstrap.min14ed.css?v=3.3.6")
, 6905), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 6978), Tuple.Create("\"", 7031)
, Tuple.Create(Tuple.Create("", 6985), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/font-awesome.min93e3.css?v=4.4.0")
, 6985), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7061), Tuple.Create("\"", 7097)
, Tuple.Create(Tuple.Create("", 7068), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/animate.min.css")
, 7068), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7127), Tuple.Create("\"", 7173)
, Tuple.Create(Tuple.Create("", 7134), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/style.min862f.css?v=4.1.0")
, 7134), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7203), Tuple.Create("\"", 7247)
, Tuple.Create(Tuple.Create("", 7210), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 7210), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7277), Tuple.Create("\"", 7340)
, Tuple.Create(Tuple.Create("", 7284), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.css")
, 7284), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7374), Tuple.Create("\"", 7431)
, Tuple.Create(Tuple.Create("", 7380), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 7380), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7455), Tuple.Create("\"", 7508)
, Tuple.Create(Tuple.Create("", 7461), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/iCheck/icheck.min.js")
, 7461), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7532), Tuple.Create("\"", 7598)
, Tuple.Create(Tuple.Create("", 7538), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.js")
, 7538), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7622), Tuple.Create("\"", 7692)
, Tuple.Create(Tuple.Create("", 7628), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.min.js")
, 7628), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7716), Tuple.Create("\"", 7797)
, Tuple.Create(Tuple.Create("", 7722), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js")
, 7722), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7821), Tuple.Create("\"", 7902)
, Tuple.Create(Tuple.Create("", 7827), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-TW.min.js")
, 7827), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7926), Tuple.Create("\"", 7971)
, Tuple.Create(Tuple.Create("", 7932), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 7932), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8018), Tuple.Create("\"", 8058)
, Tuple.Create(Tuple.Create("", 8024), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 8024), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8105), Tuple.Create("\"", 8141)
, Tuple.Create(Tuple.Create("", 8111), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 8111), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8188), Tuple.Create("\"", 8225)
, Tuple.Create(Tuple.Create("", 8194), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 8194), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8272), Tuple.Create("\"", 8307)
, Tuple.Create(Tuple.Create("", 8278), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 8278), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8354), Tuple.Create("\"", 8414)
, Tuple.Create(Tuple.Create("", 8360), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00003Edit.js")
, 8360), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n\r\n");

});

        }
    }
}
#pragma warning restore 1591