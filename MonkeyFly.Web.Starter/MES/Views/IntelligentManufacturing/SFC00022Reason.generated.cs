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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00022Reason.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00022Reason_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00022Reason_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n\r\n");

            
            #line 3 "..\..\Views\IntelligentManufacturing\SFC00022Reason.cshtml"
  
    ViewBag.Title = "SFC000022Reason";
    Layout = "~/Views/Shared/_LayoutLang.cshtml";

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n<div");

WriteLiteral(" id=\"tab_list\"");

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

WriteLiteral("> Search</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" style=\"width:970px;\"");

WriteLiteral(">\r\n        ");

WriteLiteral("\r\n\r\n        <lable");

WriteLiteral(" data-meaning=\"TheStartingMaterial\"");

WriteLiteral(">The Starting Material</lable>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"TheStartingMaterial\"");

WriteLiteral(" ");

WriteLiteral(" style=\"width: 160px;\" />\r\n        ");

WriteLiteral("\r\n        ");

WriteLiteral("\r\n        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.TheStartingMaterialClick(\'#TheStartingMaterial\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n\r\n\r\n        <lable");

WriteLiteral(" data-meaning=\"TheEndOfTheMaterial\"");

WriteLiteral(">The End Of Material</lable>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"TheEndOfTheMaterial\"");

WriteLiteral(" ");

WriteLiteral(" style=\"width: 160px;\" />\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"TheEndOfTheMaterialID\"");

WriteLiteral(" style=\"width: 160px;display:none;\"");

WriteLiteral(" />\r\n        ");

WriteLiteral("\r\n        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.TheStartingMaterialClick(\'#TheEndOfTheMaterial\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n\r\n\r\n        <lable");

WriteLiteral(" data-meaning=\"StartDate\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">Start Date</lable>\r\n        <input");

WriteLiteral(" id=\"StartDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        <lable");

WriteLiteral(" data-meaning=\"EndDate\"");

WriteLiteral(" style=\"margin:0 5px;\"");

WriteLiteral(">End Date</lable>\r\n        <input");

WriteLiteral(" id=\"EndDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input td_left\"");

WriteLiteral(" style=\"width:160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"Sfc22ReasonTable\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"PartDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:800px;\"");

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

WriteLiteral(" onclick=\"model.cleanClick(\'#TxtPartSearch\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ItemMasterFile\"");

WriteLiteral(">Item Master File</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ItemNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Item No</span>\r\n                <input");

WriteLiteral(" id=\"TxtPartSearch\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.DialogPartSearch()\"");

WriteLiteral(" id=\"CustomerFind\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodyPart\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"PartTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionPartBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(" onclick=\"model.cleanClick(\'#TxtPartSearch\')\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"PartCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ReasonDetailDialog\"");

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

WriteLiteral(" onclick=\"model.closeClick(\'#ReasonDetailDialog\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ReasonDetail\"");

WriteLiteral(">Reason</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ItemNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Item No</span>\r\n                <input");

WriteLiteral(" id=\"ItemNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled/>\r\n                \r\n                <span");

WriteLiteral(" data-meaning=\"ItemDescription\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Item Name</span>\r\n                <input");

WriteLiteral(" id=\"ItemDescription\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled/>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"ReasonDetai-body\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ReasonDetaiTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionReasonDetai\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"ReasonDetaiCancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(" ");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ReasonDetaiCommit\"");

WriteLiteral(" data-meaning=\"PieChart\"");

WriteLiteral(" onclick=\"model.openPieClick()\"");

WriteLiteral(">Pie Chart</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n" +
"\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"pieDialog\"");

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

WriteLiteral(" onclick=\"model.closeClick(\'#pieDialog\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"PieChart\"");

WriteLiteral(">PieChart</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"mf-body\"");

WriteLiteral(" style=\"margin:0 15px;height:350px;width:580px;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"images_pie\"");

WriteLiteral(" style=\"height:350px;width:580px;background:#fff;\"");

WriteLiteral("></div>\r\n            </div>          \r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"pieCancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" onclick=\"model.closeClick(\'#pieDialog\')\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"maxPing\"");

WriteLiteral(" data-meaning=\"FullScreen\"");

WriteLiteral(">Full Screen</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n" +
"//全屏设置\r\n<div");

WriteLiteral(" id=\"fullGreen_box\"");

WriteLiteral(" style=\"position:absolute;left:0;top:0;background:#fff;z-index:100000;width:100%;" +
"height:100%;display:none;overflow:auto;\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" id=\"fullGreen_content\"");

WriteLiteral(" style=\"width:100%;height:100%;\"");

WriteLiteral(">\r\n\r\n        <div");

WriteLiteral(" id=\"fullGreen_body\"");

WriteLiteral(" style=\"margin-left:20px;width:95%;height:94%;\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" id=\"img_Trend\"");

WriteLiteral(" style=\"width:100%;height:100%\"");

WriteLiteral("></div>\r\n        </div>\r\n        <div");

WriteLiteral(" id=\"fullGreen_footer\"");

WriteLiteral(" style=\"margin-left:10px;width:100%;height:40px;line-height:40px;border-top:1px s" +
"olid #ccc;text-align:right;\"");

WriteLiteral(">\r\n            <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" style=\"margin-right:50px;\"");

WriteLiteral(" onclick=\"model.hideClick()\"");

WriteLiteral(">Cancel</button>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@" 
    <style>
.mf-table-wrapper {
    overflow-x: auto;
}
/*.mf {
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);   
    position:absolute;
    left:0;
    top:0;
    z-index:10000;
    display: none;
    background-repeat:no-repeat;
}
.mf .mf-dialog {
    border-radius:8px;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-325px;
    margin-top:-200px;
}
.mf-content {
    padding:2% 3%;
    background:#fff;
    
}
.mf-header {
    width: 100%;
    height:15%; 
    display: flex;
    align-items: center; 
    justify-content: center;
    position:relative;
}
#MyClose {
    position:absolute;
    right:0px;
    top:0px;
}
.mf-body {
    width: 100%;
    height:100%;
    margin-top:20px;
    border-bottom:1px solid #e5e5e5;

}
.mf-footer {
    text-align:right;
    margin-top:10px;
}
.over{
    overflow: auto;
}*/
    </style>

    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 9614), Tuple.Create("\"", 9658)
, Tuple.Create(Tuple.Create("", 9621), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 9621), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 9690), Tuple.Create("\"", 9753)
, Tuple.Create(Tuple.Create("", 9697), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.css")
, 9697), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9787), Tuple.Create("\"", 9840)
, Tuple.Create(Tuple.Create("", 9793), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/iCheck/icheck.min.js")
, 9793), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9864), Tuple.Create("\"", 9931)
, Tuple.Create(Tuple.Create("", 9870), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-cn.js")
, 9870), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 9955), Tuple.Create("\"", 10022)
, Tuple.Create(Tuple.Create("", 9961), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-tw.js")
, 9961), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 10046), Tuple.Create("\"", 10091)
, Tuple.Create(Tuple.Create("", 10052), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 10052), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 10138), Tuple.Create("\"", 10178)
, Tuple.Create(Tuple.Create("", 10144), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 10144), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 10225), Tuple.Create("\"", 10261)
, Tuple.Create(Tuple.Create("", 10231), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 10231), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n<script");

WriteAttribute("src", Tuple.Create(" src=\"", 10304), Tuple.Create("\"", 10360)
, Tuple.Create(Tuple.Create("", 10310), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/EchartJs/echarts.min.js")
, 10310), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 10407), Tuple.Create("\"", 10444)
, Tuple.Create(Tuple.Create("", 10413), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 10413), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 10491), Tuple.Create("\"", 10556)
, Tuple.Create(Tuple.Create("", 10497), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00022Reason.js")
, 10497), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591
