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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00006Finish.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00006Finish_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00006Finish_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentManufacturing\SFC00006Finish.cshtml"
  
    ViewBag.Title = "SFC00006Finish";
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

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.FinishBackClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow-left\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Back\"");

WriteLiteral(">Back</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_refresh\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"刷新\"");

WriteLiteral(" onclick=\"model.FinishRefreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral("> Refresh</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_add\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Add\"");

WriteLiteral(">Add</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_edit\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral("> Change</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_delete\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral(">Deletion</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_save\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral("> Save</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" id=\"search-workStation\"");

WriteLiteral(">\r\n        <label");

WriteLiteral(" data-meaning=\"TaskCardNo\"");

WriteLiteral(" style=\"width:60px;\"");

WriteLiteral(">Task Card No.</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"TackNo\"");

WriteLiteral(" style=\"width: 180px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:RCCode,event:{change:RCChange}\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"WorkOrderNumber\"");

WriteLiteral(">Work Order No.</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"WorkOrderNumber\"");

WriteLiteral(" style=\"width: 150px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: WorkOrderNo\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"WorkCenter\"");

WriteLiteral(">Work Center</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"WorkCenter\"");

WriteLiteral(" style=\"width: 150px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:WorkCenter\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"Part\"");

WriteLiteral(">Part</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"Part\"");

WriteLiteral(" style=\"width: 150px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:ManufacturingProcess\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n\r\n\r\n        <div");

WriteLiteral(" style=\"padding-top:5px;\"");

WriteLiteral(">\r\n            <label");

WriteLiteral(" data-meaning=\"ItemDescription\"");

WriteLiteral(" style=\"width:60px;\"");

WriteLiteral(">ItemDescription </label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"ItemDescription\"");

WriteLiteral(" style=\"width: 180px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:Process\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n\r\n            <label");

WriteLiteral(" data-meaning=\"ItemSpecification\"");

WriteLiteral(">ItemSpecification</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width:150px\"");

WriteLiteral(" id=\"ItemSpecification\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value:Shift\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n            <label");

WriteLiteral(" data-meaning=\"DispatchAmount\"");

WriteLiteral(">DispatchAmount</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"DispatchAmount\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"WorkStartDate\"");

WriteLiteral(" style=\"width: 149px; margin-right:4px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" />\r\n        </div>\r\n\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" id=\"FinishContent\"");

WriteLiteral(">\r\n            <table");

WriteLiteral(" id=\"FinishTable\"");

WriteLiteral("></table>\r\n        </div>\r\n        <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"FinishPageBar\"");

WriteLiteral("></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"AbnormalDecDialog\"");

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

WriteLiteral(" onclick=\"model.clearAbnormalDecClick()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ExceptionDescription\"");

WriteLiteral(">Abnormal Decription</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" id=\"AbnormalDecTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"AbnormalNoTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionAbnormalNo\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AbnormalNoNew\"");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral(" value=\"New\"");

WriteLiteral(" onclick=\"model.AbNoNewClick(this)\"");

WriteLiteral(">New</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AbnormalNoChange\"");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(" value=\"Change\"");

WriteLiteral(" onclick=\"model.AbNoChangeClick(this)\"");

WriteLiteral(">Change</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AbnormalNoDel\"");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral(" value=\"Deletion\"");

WriteLiteral(" onclick=\"model.AbNoDelClick(this)\"");

WriteLiteral(">Deletion</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AbnormalNoSave\"");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(" value=\"Save\"");

WriteLiteral(">Save</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearAbnormalDecClick()\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ReasonNoDialog\"");

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

WriteLiteral(" onclick=\"model.clearReasonClick()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ReasonCode\"");

WriteLiteral(">Reason Code</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"ReasonCode\"");

WriteLiteral(">ReasonCode</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"ReasonCode\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"ReasonCodeSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"ReasonNoTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ReasonNoTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionReasonNo\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ReasonNoComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearReasonClick()\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"InvalidHoursDialog\"");

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

WriteLiteral(" onclick=\"model.clearInvalidClick()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"InvalidWorkHour\"");

WriteLiteral(">Invalid Hours</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"tableCt\"");

WriteLiteral(" id=\"InvalidHoursTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"InvalidHoursTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionInvalidHours\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"InvalidHoursNew\"");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral(" value=\"New\"");

WriteLiteral(" onclick=\"model.InvalidHoursNewClick()\"");

WriteLiteral(">New</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"InvalidHoursChange\"");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(" value=\"Change\"");

WriteLiteral(" onclick=\"model.InvalidHoursChangeClick()\"");

WriteLiteral(">Change</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"InvalidHoursDel\"");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral(" value=\"Deletion\"");

WriteLiteral(" onclick=\"model.InvalidHoursDelClick()\"");

WriteLiteral(">Deletion</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"InvalidHoursSave\"");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(" value=\"Save\"");

WriteLiteral(">Save</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearInvalidClick()\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"InvalidReasonDialog\"");

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

WriteLiteral(" onclick=\"model.clearClick()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ReasonCode\"");

WriteLiteral(">Reason Code</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"ReasonCode\"");

WriteLiteral(">ReasonCode</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"InReasonCode\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"InReasonCodeSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"ReasonNoTable-body\"");

WriteLiteral(" id=\"InvalidReasonTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"InvalidReasonTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionInvalidReason\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"InvalidReasonComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearClick()\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"BatchAttributeDialog\"");

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

WriteLiteral(" onclick=\"model.clearBatchClick()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"BatchAttribute\"");

WriteLiteral(">Batch Attribute</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"tableCt\"");

WriteLiteral(" id=\"BatchAttributeTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"BatchTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBatch\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"BatchNew\"");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral(" value=\"New\"");

WriteLiteral(" onclick=\"model.BatchNewClick()\"");

WriteLiteral(">New</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"BatchChange\"");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(" value=\"Change\"");

WriteLiteral(" onclick=\"model.BatchChangeClick()\"");

WriteLiteral(">Change</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"BatchDel\"");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral(" value=\"Deletion\"");

WriteLiteral(" onclick=\"model.BatchDelClick()\"");

WriteLiteral(">Deletion</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"BatchSave\"");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(" value=\"Save\"");

WriteLiteral(" onclick=\"model.BatchSaveClick()\"");

WriteLiteral(">Save</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearBatchClick()\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"GetCodeDialog\"");

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

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"LotsAutoNumberingMainTable\"");

WriteLiteral(">Lots Auto Numbering Maintenance Table</h6>\r\n            </div>\r\n            <div" +
"");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"tableCt\"");

WriteLiteral(" id=\"GetCodeTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"GetCodeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionGetCode\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"getCodeComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"GetAttrDialog\"");

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

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"Attributes\"");

WriteLiteral(">Attributes</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"tableCt\"");

WriteLiteral(" id=\"GetAttrTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"GetAttrTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionGetAttr\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"GetAttrChange\"");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral(" value=\"Change\"");

WriteLiteral(" onclick=\"model.GetAttrChangeClick()\"");

WriteLiteral(">Change</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"GetAttrSave\"");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(" value=\"Save\"");

WriteLiteral(">Save</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ResourceDocDialog\"");

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

WriteLiteral(" onclick=\"model.clearAbnormalClick()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"TaskDoc\"");

WriteLiteral(">Task Order Assignment Data File</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"tableCt\"");

WriteLiteral(" id=\"ResourceDocTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ResourceDocTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionResourceDoc\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ResourceDocComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearAbnormalClick()\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"TaskDialog\"");

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

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"TaskDoc\"");

WriteLiteral(">Task Document</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:5px 10px 0px 10px;\"");

WriteLiteral(" class=\"tableCt-body\"");

WriteLiteral(" id=\"TaskTable-body\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"TaskTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionTask\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"TaskComfirm\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(" ");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Cancel\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }
        #FinishContent .fix-head,#FinishContent .fix-table {
            width: 280%;
        }
        .ReasonNoTable-body .fix-head,.ReasonNoTable-body .fix-table {
           width: 150%;
       }
        #BatchAttributeTable-body .fix-table, #BatchAttributeTable-body .fix-head {
            width:160%;
        }
        .J-search input {
           margin-right: 10px;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 19933), Tuple.Create("\"", 19978)
, Tuple.Create(Tuple.Create("", 19939), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 19939), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 20025), Tuple.Create("\"", 20065)
, Tuple.Create(Tuple.Create("", 20031), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 20031), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 20112), Tuple.Create("\"", 20148)
, Tuple.Create(Tuple.Create("", 20118), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 20118), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 20195), Tuple.Create("\"", 20232)
, Tuple.Create(Tuple.Create("", 20201), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 20201), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 20279), Tuple.Create("\"", 20344)
, Tuple.Create(Tuple.Create("", 20285), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00006Finish.js")
, 20285), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591