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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/EquipmentManagement/EMS00007Reason.cshtml")]
    public partial class _Views_EquipmentManagement_EMS00007Reason_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_EquipmentManagement_EMS00007Reason_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\EquipmentManagement\EMS00007Reason.cshtml"
  
    ViewBag.Title = "EMS00007Reason";
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

WriteLiteral(" id=\"btn_pieChart\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"PieChart\"");

WriteLiteral(" onclick=\"model.pieChartClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-pie-chart\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"PieChart\"");

WriteLiteral("> PieChart</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"StartReasonCode\"");

WriteLiteral(">起始原因代号</span>\r\n        <input");

WriteLiteral(" id=\"StartReasonCode\"");

WriteLiteral(" name=\"StartReasonCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OpenReasonCodeCode(\'#StartReasonCode\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        <span");

WriteLiteral(" data-meaning=\"EndReasonCode\"");

WriteLiteral(">结束原因代号</span>\r\n        <input");

WriteLiteral(" id=\"EndReasonCode\"");

WriteLiteral(" name=\"EndReasonCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OpenReasonCodeCode(\'#EndReasonCode\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        <span");

WriteLiteral(" data-meaning=\"StartCallFixDate\"");

WriteLiteral(">起始叫修日期</span>\r\n        <input");

WriteLiteral(" id=\"StartCallFixDate\"");

WriteLiteral(" name=\"StartCallFixDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <span");

WriteLiteral(" data-meaning=\"EndCallFixDate\"");

WriteLiteral(">结束叫修日期</span>\r\n        <input");

WriteLiteral(" id=\"EndCallFixDate\"");

WriteLiteral(" name=\"EndCallFixDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n    </div>\r\n    <div");

WriteLiteral(" style=\"margin:5px 5px 0px 5px;\"");

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"StartEquipmentNo\"");

WriteLiteral(">起始设备代号</span>\r\n        <input");

WriteLiteral(" id=\"StartEquipmentNo\"");

WriteLiteral(" name=\"StartEquipmentNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OpenEquipmentCode(\'#StartEquipmentNo\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        <span");

WriteLiteral(" data-meaning=\"EndEquipmentNo\"");

WriteLiteral(">结束设备代号</span>\r\n        <input");

WriteLiteral(" id=\"EndEquipmentNo\"");

WriteLiteral(" name=\"EndEquipmentNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OpenEquipmentCode(\'#EndEquipmentNo\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        <span");

WriteLiteral(" data-meaning=\"ResourceClass\"");

WriteLiteral(">资源类别</span>\r\n        <input");

WriteLiteral(" id=\"ResourceClass\"");

WriteLiteral(" name=\"ResourceClass\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OpenResourceClassCode(\'#ResourceClass\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" >\r\n        <table");

WriteLiteral(" id=\"EMS00007ReasonTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ChartDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:540px;\"");

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

WriteLiteral(" data-meaning=\"PieChart\"");

WriteLiteral(">圓餅圖</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 15px;\"");

WriteLiteral(">\r\n                <canvas");

WriteLiteral(" id=\"myChart\"");

WriteLiteral(" style=\"width:520px; height:350px;\"");

WriteLiteral("></canvas>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ReasonCodeDialog\"");

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

WriteLiteral(" data-meaning=\"ReasonCodeMaster\"");

WriteLiteral(">ReasonCodeMaster</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"ReasonNo\"");

WriteLiteral(">ReasonCode</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"ReasonCode\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"ReasonDescription\"");

WriteLiteral(">ReasonDescription</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"ReasonName\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"ReasonCodeSearch\"");

WriteLiteral(" onclick=\"model.ReasonCodeSearch()\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"ReasonCodeContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ReasonCodeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionReasonCodeBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ReasonCodeConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"EquipmentDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:550px;\"");

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

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"EquipmentMasterFile\"");

WriteLiteral(">设备主档</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(" data-meaning=\"EquipmentCode\"");

WriteLiteral(">EquipmentCode</span>\r\n                <input");

WriteLiteral(" id=\"EquipmentCode\"");

WriteLiteral(" name=\"EquipmentCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.EquipmentCodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodycode\"");

WriteLiteral(" style=\"margin:5px 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EquipmentTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionEquipmentBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"EquipmentCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ResourceClassDialog\"");

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

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"SourceClassDoc\"");

WriteLiteral(">資源類別</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(" data-meaning=\"ResourceClass\"");

WriteLiteral(">資源類別</span>\r\n                <input");

WriteLiteral(" id=\"RResourceClass\"");

WriteLiteral(" name=\"ResourceClass\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 120px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.ResourceClassSearch()\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ResourceClassTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionResourceClassBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ResourceClassComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"DetailDialog\"");

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

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"CallFixDetail\"");

WriteLiteral(">叫修單明細</h6>\r\n            </div>\r\n            \r\n            <div");

WriteLiteral(" style=\"margin:5px 15px;\"");

WriteLiteral(" id=\"divDetailTable\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"DetailTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionDetailBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clear()\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
         .mf-table-wrapper {
            overflow-x: auto;
        }

         .fix-table,  .fix-head {
            width: 100%;
        }

        #divDetailTable .mf-table-wrapper {
            overflow-x: auto;
        }

        #divDetailTable .fix-table, #divDetailTable .fix-head {
            width: 140%;
        }

       
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12150), Tuple.Create("\"", 12195)
, Tuple.Create(Tuple.Create("", 12156), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 12156), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12242), Tuple.Create("\"", 12282)
, Tuple.Create(Tuple.Create("", 12248), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 12248), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12329), Tuple.Create("\"", 12365)
, Tuple.Create(Tuple.Create("", 12335), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 12335), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12412), Tuple.Create("\"", 12449)
, Tuple.Create(Tuple.Create("", 12418), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 12418), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12496), Tuple.Create("\"", 12549)
, Tuple.Create(Tuple.Create("", 12502), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/chartJs/Chart.min.js")
, 12502), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 12573), Tuple.Create("\"", 12633)
, Tuple.Create(Tuple.Create("", 12579), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/EquipmentManagement/EMS00007Reason.js")
, 12579), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

WriteLiteral("\r\n");

        }
    }
}
#pragma warning restore 1591
