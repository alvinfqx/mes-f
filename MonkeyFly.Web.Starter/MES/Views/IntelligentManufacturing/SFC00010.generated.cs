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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentManufacturing/SFC00010.cshtml")]
    public partial class _Views_IntelligentManufacturing_SFC00010_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentManufacturing_SFC00010_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentManufacturing\SFC00010.cshtml"
  
    ViewBag.Title = "SFC00010 製程完工狀況分析(製令)";
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

WriteLiteral(">\r\n        <label");

WriteLiteral(" data-meaning=\"StartWorkCenter\"");

WriteLiteral(">Start Work Center</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:StartingWorkCenter\"");

WriteLiteral(" id=\"StartingWorkCenter\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:StartingWorkCenterID\"");

WriteLiteral(" id=\"StartingWorkCenters\"");

WriteLiteral(" style=\"width: 80px;display:none;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.WorkCenterClick(\'1\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        <label");

WriteLiteral(" data-meaning=\"EndWorkCenter\"");

WriteLiteral(">End Work Center</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:EndingWorkCenter\"");

WriteLiteral(" id=\"EndingWorkCenter\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:EndingWorkCenterID\"");

WriteLiteral(" id=\"EndingWorkCenters\"");

WriteLiteral(" style=\"width: 80px;display:none;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.WorkCenterClick(\'2\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"StartOrderNumber\"");

WriteLiteral(">Start Order Number</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:StartOrderNumber\"");

WriteLiteral(" id=\"StartOrderNumber\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.MoCodeClick(\'1\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        <label");

WriteLiteral(" data-meaning=\"EndOrderNumber\"");

WriteLiteral(">End Order Number</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:EndOrderNumber\"");

WriteLiteral(" id=\"EndOrderNumber\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.MoCodeClick(\'2\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n\r\n        <label");

WriteLiteral(" data-meaning=\"StartDateOfCompletion\"");

WriteLiteral(">Start Date Of Completion</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:StartDateOfCompletion\"");

WriteLiteral(" id=\"StartDateOfCompletion\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        \r\n\r\n        <div");

WriteLiteral(" style=\"padding-top:5px;\"");

WriteLiteral(">\r\n            <label");

WriteLiteral(" data-meaning=\"EndDateOfCompletion\"");

WriteLiteral(">End Date Of Completion</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:EndDateOfCompletion\"");

WriteLiteral(" id=\"EndDateOfCompletion\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n            <label");

WriteLiteral(" data-meaning=\"StartCustomerNo\"");

WriteLiteral(">Start Customer No.</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:StartCustomerNo\"");

WriteLiteral(" id=\"StartCustomerNo\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.CustomerCodeClick(\'1\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n            <label");

WriteLiteral(" data-meaning=\"EndCustomerNo\"");

WriteLiteral(">End Customer No.</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:EndCustomerNo\"");

WriteLiteral(" id=\"EndCustomerNo\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.CustomerCodeClick(\'2\')\"");

WriteLiteral(" style=\"margin-right:16px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n\r\n            <label");

WriteLiteral(" data-meaning=\"StartClerkNo\"");

WriteLiteral(">Start Clerk No.</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:StartClerkNo\"");

WriteLiteral(" id=\"StartClerkNo\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.SalesmanCodeClick(\'1\')\"");

WriteLiteral(" style=\"margin-right:16px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n            <label");

WriteLiteral(" data-meaning=\"EndClerkNo\"");

WriteLiteral(">End Clerk No.</label>\r\n            <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:EndClerkNo\"");

WriteLiteral(" id=\"EndClerkNo\"");

WriteLiteral(" style=\"width: 80px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" />\r\n            <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.SalesmanCodeClick(\'2\')\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n        </div>\r\n\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"ProcessOrderTable\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ProcessDetailDialog\"");

WriteLiteral(" tabindex=\"0\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:850px;\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:5px 10px 5px 5px  !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(">Shut</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ProcessDetail\"");

WriteLiteral(">Process Details</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(" style=\"padding: 0px 5px 2px!important\"");

WriteLiteral(" id=\"table_body_process_data\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ProcessDetailTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"paginagionProcessDetailBar\"");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" style=\"padding-bottom:5px!important\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"padding: 5px !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ProcessDialog\"");

WriteLiteral(" tabindex=\"0\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:850px;\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:5px 10px 5px 5px  !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(">Shut</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"ProcessOrderProcessDetails\"");

WriteLiteral(">Process Order Process Details</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(" style=\"padding: 0px 5px 2px!important\"");

WriteLiteral(" id=\"table-bodyData\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ProcessTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"paginagionProcessBar\"");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" style=\"padding-bottom:5px!important\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"padding: 5px !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"WkCenterDialog\"");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"WorkCenterDoc\"");

WriteLiteral(">WorkCenterDoc</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <label");

WriteLiteral(" data-meaning=\"WorkCenter\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">WorkCenter</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"WorkCenterTxt\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.searchWkCenterClick()\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"WkCenterTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"WkCenterPageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"WkCenterComfirm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"MoCodeDialog\"");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"MoNoMasterFile\"");

WriteLiteral(">MoNoMasterFile</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <label");

WriteLiteral(" data-meaning=\"MoNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">MoNo</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"MoNoTxt\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.searchMoCodeClick()\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-MoCode\"");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"MoCodeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"MoCodePageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"MoCodeComfirm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"CustomerDialog\"");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"CustomerList\"");

WriteLiteral(">Customer List</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <label");

WriteLiteral(" data-meaning=\"Customer\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">Customer</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"CustomerTxt\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.searchCustomerClick()\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"CustomerTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"CustomerPageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"CustomerComfirm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"SalesManDialog\"");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"AccountMaintenance\"");

WriteLiteral(">Account Maintenance</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <label");

WriteLiteral(" data-meaning=\"WorkNumber\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">Work Number</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" id=\"WorkNumberTxt\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.searchSalesManClick()\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"SalesManTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"SalesManPageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"SalesComfirm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }

        #table-body .fix-table, #table-body .fix-head {
            width: 200%;
        }
        
         #table_body_process_data .fix-table, #table_body_process_data .fix-head {
            width: 355%;
        }

        #table-bodyData .fix-table, #table-bodyData .fix-head {
            width: 220%;
        }

        #table-MoCode .fix-table, #table-MoCode .fix-head {
            width: 160%;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14644), Tuple.Create("\"", 14701)
, Tuple.Create(Tuple.Create("", 14650), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 14650), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14725), Tuple.Create("\"", 14770)
, Tuple.Create(Tuple.Create("", 14731), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 14731), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14817), Tuple.Create("\"", 14857)
, Tuple.Create(Tuple.Create("", 14823), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 14823), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14904), Tuple.Create("\"", 14940)
, Tuple.Create(Tuple.Create("", 14910), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 14910), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14987), Tuple.Create("\"", 15024)
, Tuple.Create(Tuple.Create("", 14993), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 14993), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15071), Tuple.Create("\"", 15137)
, Tuple.Create(Tuple.Create("", 15077), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.js")
, 15077), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15161), Tuple.Create("\"", 15231)
, Tuple.Create(Tuple.Create("", 15167), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.min.js")
, 15167), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15255), Tuple.Create("\"", 15336)
, Tuple.Create(Tuple.Create("", 15261), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js")
, 15261), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15360), Tuple.Create("\"", 15441)
, Tuple.Create(Tuple.Create("", 15366), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-TW.min.js")
, 15366), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15465), Tuple.Create("\"", 15524)
, Tuple.Create(Tuple.Create("", 15471), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentManufacturing/SFC00010.js")
, 15471), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n\r\n");

});

        }
    }
}
#pragma warning restore 1591
