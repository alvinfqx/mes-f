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
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/Shared/_LayoutLang.cshtml")]
    public partial class _Views_Shared__LayoutLang_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_Shared__LayoutLang_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("<!doctype html>\r\n<html>\r\n<head>\r\n    <meta");

WriteLiteral(" http-equiv=\"Content-Type\"");

WriteLiteral(" content=\"text/html; charset=utf-8;no-cache\"");

WriteLiteral(" />\r\n    <title>");

            
            #line 5 "..\..\Views\Shared\_LayoutLang.cshtml"
      Write(ViewBag.Title);

            
            #line default
            #line hidden
WriteLiteral(@"</title>
    <script>
        var token = window.top.token;
        (function Authorize() {
            if (!token) {
                try {
                    window.top.logout();
                }
                catch (e) {
                    window.location.href = ""/Logon"";
                }
            }
        })();

        var language = window.top.language,
            username = window.top.username,
            promptBtn = window.top.promptBtn,
            title = """);

            
            #line 22 "..\..\Views\Shared\_LayoutLang.cshtml"
                Write(ViewBag.Title);

            
            #line default
            #line hidden
WriteLiteral(@""",
            words = null,
            fields = null,
            initPage = null;

        //console.log(title + "", words: "" + words);
        var GetField = function (url, name) {
            if (!language || !(url && name)) return;

            var data;
            var url = url + ""/"" + name + ""-"" + language + "".js"";

            $.ajax({
                url: url,
                async: false,
                dataType: 'json',
                success: function (items) {
                    data = items;
                },
                error: function (data) {
                    console.error(""GetField: can't get "" + url + "":"" + name);
                }
            });

            return data;
        };

    </script>
");

WriteLiteral("    ");

            
            #line 50 "..\..\Views\Shared\_LayoutLang.cshtml"
Write(System.Web.Optimization.Scripts.Render("~/Content/js/index"));

            
            #line default
            #line hidden
WriteLiteral("\r\n");

WriteLiteral("    ");

            
            #line 51 "..\..\Views\Shared\_LayoutLang.cshtml"
Write(RenderSection("head", required: false));

            
            #line default
            #line hidden
WriteLiteral("\r\n");

WriteLiteral("    ");

            
            #line 52 "..\..\Views\Shared\_LayoutLang.cshtml"
Write(System.Web.Optimization.Styles.Render("~/Content/css/index"));

            
            #line default
            #line hidden
WriteLiteral("\r\n</head>\r\n<body");

WriteLiteral(" style=\"display:none;\"");

WriteLiteral(">\r\n");

WriteLiteral("    ");

            
            #line 55 "..\..\Views\Shared\_LayoutLang.cshtml"
Write(RenderBody());

            
            #line default
            #line hidden
WriteLiteral("\r\n");

WriteLiteral("    ");

            
            #line 56 "..\..\Views\Shared\_LayoutLang.cshtml"
Write(System.Web.Optimization.Scripts.Render("~/Content/js/librarys"));

            
            #line default
            #line hidden
WriteLiteral("\r\n");

WriteLiteral("    ");

            
            #line 57 "..\..\Views\Shared\_LayoutLang.cshtml"
Write(RenderSection("scripts", required: false));

            
            #line default
            #line hidden
WriteLiteral(@"
</body>
</html>
<script>
    $(document).ready(function () {
        $.ajax({
            type: ""post"",
            url: ""/Languages/getLanguages"",
            data: JSON.stringify({ Code: language, Words: words }),
            dataType: ""json"",
            contentType: 'application/json',
            success: function (ret) {
                if (words.length > 0) {
                    fields = JSON.parse(ret.list);
                    $('[data-meaning]').each(function (i, elem) {
                        var $elem = $(elem);
                        for (var key in fields) {
                            if ($elem.attr('data-meaning') == key) {
                                if ($elem[0].tagName == ""INPUT"") {
                                    if ($elem[0].type == ""text"") {
                                        $elem.attr('placeholder', fields[key]);
                                    }
                                    else {
                                        $elem.val(fields[key]);
                                    }
                                }
                                else {
                                    $elem.text(fields[key]);
                                }
                            }
                        }
                    });
                }
                
                initPage && initPage();
                $(""body"").show();
            }
        });
    });
</script>
");

        }
    }
}
#pragma warning restore 1591