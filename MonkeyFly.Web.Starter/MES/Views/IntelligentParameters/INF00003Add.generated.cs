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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00003Add.cshtml")]
    public partial class _Views_IntelligentParameters_INF00003Add_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00003Add_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\IntelligentParameters\INF00003Add.cshtml"
  
    ViewBag.Title = "新增员工信息";
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

WriteLiteral("> Save</span></button>\r\n                </td>            \r\n                <td");

WriteLiteral(" style=\"text-align:right; width:40%; height:28px;\"");

WriteLiteral(">                   \r\n                </td>            \r\n            </tr>\r\n     " +
"   </table>      \r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">     \r\n    </div>\r\n    <div");

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

WriteLiteral(" data-meaning=\"AddEmployee\"");

WriteLiteral(" style=\"font-size:16px; text-align:center; font-weight:600;\"");

WriteLiteral(">Add Employee</span>\r\n                </td>\r\n                <td");

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

WriteLiteral("  /></td>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Sex\"");

WriteLiteral(">Sex</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width:300px;\"");

WriteLiteral(" id=\"Sex\"");

WriteLiteral(" data-bind=\"options:SexArray,optionsValue:\'value\',optionsText:\'text\',value:Sex\"");

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral(" ></select></td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" data-meaning=\"Birthday\"");

WriteLiteral(">Birthday</td>\r\n                <td");

WriteLiteral(" class=\"td_left\"");

WriteLiteral("><input");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"Brith\"");

WriteLiteral(" data-bind=\"value:Brith\"");

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral(" ></select></td>\r\n            </tr>\r\n            <tr>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral(" ></select></td>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n                <td");

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

WriteLiteral("  autocomplete=\"off\"");

WriteLiteral("  /></td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .td_right{
            text-align:right;
            padding-right: 5px;
            width:90px;     
            font-size:12px;
            font-weight:bold;      
        }
        .td_left{
            width:310px;
        }
        #table tr{
            line-height:53px;
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

WriteAttribute("href", Tuple.Create(" href=\"", 6964), Tuple.Create("\"", 7014)
, Tuple.Create(Tuple.Create("", 6971), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/bootstrap.min14ed.css?v=3.3.6")
, 6971), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7044), Tuple.Create("\"", 7097)
, Tuple.Create(Tuple.Create("", 7051), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/font-awesome.min93e3.css?v=4.4.0")
, 7051), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7127), Tuple.Create("\"", 7163)
, Tuple.Create(Tuple.Create("", 7134), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/animate.min.css")
, 7134), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7193), Tuple.Create("\"", 7239)
, Tuple.Create(Tuple.Create("", 7200), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/style.min862f.css?v=4.1.0")
, 7200), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7269), Tuple.Create("\"", 7313)
, Tuple.Create(Tuple.Create("", 7276), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 7276), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 7343), Tuple.Create("\"", 7406)
, Tuple.Create(Tuple.Create("", 7350), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.css")
, 7350), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7440), Tuple.Create("\"", 7497)
, Tuple.Create(Tuple.Create("", 7446), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 7446), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7521), Tuple.Create("\"", 7574)
, Tuple.Create(Tuple.Create("", 7527), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/iCheck/icheck.min.js")
, 7527), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7598), Tuple.Create("\"", 7664)
, Tuple.Create(Tuple.Create("", 7604), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.js")
, 7604), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7688), Tuple.Create("\"", 7758)
, Tuple.Create(Tuple.Create("", 7694), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.min.js")
, 7694), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7782), Tuple.Create("\"", 7863)
, Tuple.Create(Tuple.Create("", 7788), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js")
, 7788), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7887), Tuple.Create("\"", 7968)
, Tuple.Create(Tuple.Create("", 7893), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-TW.min.js")
, 7893), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 7992), Tuple.Create("\"", 8037)
, Tuple.Create(Tuple.Create("", 7998), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 7998), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8084), Tuple.Create("\"", 8124)
, Tuple.Create(Tuple.Create("", 8090), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 8090), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8171), Tuple.Create("\"", 8207)
, Tuple.Create(Tuple.Create("", 8177), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 8177), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8254), Tuple.Create("\"", 8291)
, Tuple.Create(Tuple.Create("", 8260), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 8260), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8338), Tuple.Create("\"", 8373)
, Tuple.Create(Tuple.Create("", 8344), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 8344), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 8420), Tuple.Create("\"", 8479)
, Tuple.Create(Tuple.Create("", 8426), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00003Add.js")
, 8426), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n\r\n");

});

        }
    }
}
#pragma warning restore 1591
