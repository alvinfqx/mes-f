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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/EquipmentManagement/EMS00010.cshtml")]
    public partial class _Views_EquipmentManagement_EMS00010_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_EquipmentManagement_EMS00010_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\EquipmentManagement\EMS00010.cshtml"
  
    ViewBag.Title = "EMS00010";
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

WriteLiteral("></div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" class=\"MainForm\"");

WriteLiteral(">\r\n            <tr");

WriteLiteral(" class=\"MainFormFirst\"");

WriteLiteral(">\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"MaintenanceType\"");

WriteLiteral(">Maintenance Type</label></td>\r\n                <td>\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"MaintenanceType\"");

WriteLiteral(" data-bind=\"value:MaintenanceType\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" onclick=\"model.SearchCategoryCode()\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"DocumentStatus\"");

WriteLiteral(">Document Status</label></td>\r\n                <td>\r\n                    <label");

WriteLiteral(" class=\"checkbox-inline i-checks\"");

WriteLiteral(">\r\n                        <input");

WriteLiteral(" type=\"checkbox\"");

WriteLiteral(" value=\"0\"");

WriteLiteral(" data-bind=\"event:{ifChecked:OPChecked,ifUnchecked:OPUnChecked}\"");

WriteLiteral(" />\r\n                        <span");

WriteLiteral(" data-meaning=\"Issued\"");

WriteLiteral(">Issued</span>\r\n                    </label>\r\n                    <label");

WriteLiteral(" class=\"checkbox-inline i-checks\"");

WriteLiteral(">\r\n                        <input");

WriteLiteral(" type=\"checkbox\"");

WriteLiteral(" value=\"0\"");

WriteLiteral(" data-bind=\"event:{ifChecked:CLChecked,ifUnchecked:CLUnChecked}\"");

WriteLiteral(" />\r\n                        <span");

WriteLiteral(" data-meaning=\"Closed\"");

WriteLiteral(">Closed</span>\r\n                    </label>\r\n                    ");

WriteLiteral("\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"MaintenanceEquipment\"");

WriteLiteral(">Maintenance Equipment</label></td>\r\n                <td>\r\n                    <i" +
"nput");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"MaintenanceEquipment\"");

WriteLiteral(" data-bind=\"value:MaintenanceEquipment\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" onclick=\"model.SearchEquipmentMaster()\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"MaintenanceUser\"");

WriteLiteral(">Maintenance User</label></td>\r\n                <td>\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"MaintenanceUser\"");

WriteLiteral(" data-bind=\"value:MaintenanceUser\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"MaintenanceUserID\"");

WriteLiteral(" data-bind=\"value:MaintenanceUserID\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 100px;display:none\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral(" onclick=\"model.SearchAccountMaster()\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n  " +
"              <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"StartMaintenanceNo\"");

WriteLiteral(">Start Maintenance No.</label></td>\r\n                <td>\r\n                    <i" +
"nput");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"StartMaintenanceNo\"");

WriteLiteral(" data-bind=\"value:StartMaintenanceNo\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 120px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"EndMaintenanceNo\"");

WriteLiteral(">End Maintenance No.</label></td>\r\n                <td>\r\n                    <inp" +
"ut");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"EndMaintenanceNo\"");

WriteLiteral(" data-bind=\"value:EndMaintenanceNo\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 120px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"StartMaintenanceDate\"");

WriteLiteral(">Start Maintenance Date</label></td>\r\n                <td>\r\n                    <" +
"input");

WriteLiteral(" id=\"StartMaintenanceDate\"");

WriteLiteral(" data-bind=\"value:StartMaintenanceDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 120px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_label\"");

WriteLiteral("><label");

WriteLiteral(" data-meaning=\"EndMaintenanceDate\"");

WriteLiteral(">End Maintenance Date</label></td>\r\n                <td>\r\n                    <in" +
"put");

WriteLiteral(" id=\"EndMaintenanceDate\"");

WriteLiteral(" data-bind=\"value:EndMaintenanceDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 120px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <" +
"div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" id=\"MainContent\"");

WriteLiteral(">\r\n            <table");

WriteLiteral(" id=\"MainTable\"");

WriteLiteral("></table>\r\n        </div>\r\n        <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionMainBar\"");

WriteLiteral("></div>\r\n        <div");

WriteLiteral(" id=\"DetailContent\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" style=\"margin-top:5px\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"DetailTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionDetailBar\"");

WriteLiteral("></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"AddEquipmentMaintenanceDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:800px;\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:16px !important\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"AddEquipmentMaintenanceDetails\"");

WriteLiteral(">Add Equipment Maintenance Details</span>\r\n                    <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                    </button>\r\n                </div>             " +
"  \r\n                <div");

WriteLiteral(" class=\"AddEquipmentMaintenanceDetailsContent\"");

WriteLiteral(" style=\"margin:8px 8px;\"");

WriteLiteral(">\r\n                    <table");

WriteLiteral(" id=\"AddEquipmentMaintenanceDetailsTable\"");

WriteLiteral("></table>\r\n                </div>\r\n                <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionMaintenanceDetails\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>               \r\n                <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                    <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                    <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"AddEquipmentMaintenanceDetailsBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n  " +
"  </div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"AddMaintenanceTypeDialog\"");

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

WriteLiteral(" data-meaning=\"TypeDesc\"");

WriteLiteral(">Type Desc</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" onclick=\"model.clearInput(\'#CategoryCode\',null)\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <label");

WriteLiteral(" data-meaning=\"CategoryCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">Category Code</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"CategoryCode\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:searchCategoryCode\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"searchCategoryCodeClick\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"CategoryCode_Content\"");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"CategoryCodeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"CategoryCodePageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#CategoryCode\',null)\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"CategoryCodeComfirmClick\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"SearchEquipmentMasterFileDialog\"");

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

WriteLiteral(" data-meaning=\"EquipmentMasterFile\"");

WriteLiteral(">Equipment Master File</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" onclick=\"model.clearInput(\'#EquipmentCode\', null)\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <label");

WriteLiteral(" data-meaning=\"EquipmentCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">Equipment Code</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"EquipmentCode\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:searchEquipmentCode\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"searchEquipmentCodeClick\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"EquipmentMaster_Content\"");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"EquipmentMasterTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"EquipmentMasterPageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#EquipmentCode\', null)\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"EquipmentMasterComfirmClick\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"SearchAccountMasterDialog\"");

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

WriteLiteral(" data-meaning=\"AccountMaster\"");

WriteLiteral(">Account Master</span>\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" onclick=\"model.clearInput(\'#WorkNumber\', \'#EmployeeName\')\"");

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

WriteLiteral(" id=\"WorkNumber\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:searchWorkNumber\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <label");

WriteLiteral(" data-meaning=\"Name\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px;\"");

WriteLiteral(">Name</label>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"EmployeeName\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" data-bind=\"value:searchEmployeeName\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"searchWorkNumberClick\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"WorkNumber_Content\"");

WriteLiteral(" style=\"margin:0px 10px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"WorkNumberTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"WorkNumberPageBar\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#WorkNumber\', \'#EmployeeName\')\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"WorkNumberComfirmClick\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ImportDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">\r\n    <div");

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

WriteLiteral(" id=\"BtnImport\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }

        #MainContent .fix-table, #MainContent .fix-head {
            width: 220%;
        }

        #DetailContent .fix-table, #DetailContent .fix-head {
            width: 140%;
        }

        .ResourcesContent .fix-table, .ResourcesContent .fix-head {
            width: 100%;
        }

        .MainForm {
            width: 100%;
        }

        .MainFormFirst td {
            padding-bottom: 5px;
            vertical-align: middle;
        }

        .MainForm .td_label {
            text-align: right;
            padding-right: 5px;
        }
    </style>
    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 14626), Tuple.Create("\"", 14670)
, Tuple.Create(Tuple.Create("", 14633), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 14633), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 14702), Tuple.Create("\"", 14765)
, Tuple.Create(Tuple.Create("", 14709), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.css")
, 14709), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(" />\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14799), Tuple.Create("\"", 14866)
, Tuple.Create(Tuple.Create("", 14805), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-cn.js")
, 14805), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14890), Tuple.Create("\"", 14957)
, Tuple.Create(Tuple.Create("", 14896), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-tw.js")
, 14896), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14981), Tuple.Create("\"", 15034)
, Tuple.Create(Tuple.Create("", 14987), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/iCheck/icheck.min.js")
, 14987), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15058), Tuple.Create("\"", 15103)
, Tuple.Create(Tuple.Create("", 15064), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 15064), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15150), Tuple.Create("\"", 15190)
, Tuple.Create(Tuple.Create("", 15156), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 15156), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15237), Tuple.Create("\"", 15273)
, Tuple.Create(Tuple.Create("", 15243), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 15243), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15320), Tuple.Create("\"", 15357)
, Tuple.Create(Tuple.Create("", 15326), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 15326), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15404), Tuple.Create("\"", 15458)
, Tuple.Create(Tuple.Create("", 15410), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/EquipmentManagement/EMS00010.js")
, 15410), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

WriteLiteral("\r\n\r\n\r\n\r\n\r\n\r\n");

        }
    }
}
#pragma warning restore 1591