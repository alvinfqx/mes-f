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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/EquipmentManagement/EMS00009Add.cshtml")]
    public partial class _Views_EquipmentManagement_EMS00009Add_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_EquipmentManagement_EMS00009Add_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 1 "..\..\Views\EquipmentManagement\EMS00009Add.cshtml"
  
    ViewBag.Title = "EMS00009";
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

WriteLiteral(" onclick=\"model.backClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow-left\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Back\"");

WriteLiteral(">Back</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral(">Refresh</span></button>\r\n        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"addSave\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(">Save</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(">\r\n        <table>\r\n            <tr>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"CreateDocumentStaff\"");

WriteLiteral(">CreateDocumentStaff</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" id=\"AddCreateDocumentStaff\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value:CreateDocumentStaff\"");

WriteLiteral(" />\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"Modate\"");

WriteLiteral(">Modate</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" id=\"AddModate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value: Modate\"");

WriteLiteral(" />\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"DocumentCategory\"");

WriteLiteral(">DocumentCategory</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <select");

WriteLiteral(" id=\"AddDocumentCategory\"");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" onchange=\"model.getAutoNumber()\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral("/>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <" +
"td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"MaintenanceNo\"");

WriteLiteral(">MaintenanceNo</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" id=\"AddMaintenanceNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value:MaintenanceNo\"");

WriteLiteral(" />\r\n                    <input");

WriteLiteral(" id=\"AddMaintenanceNoID\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;display:none;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" data-bind=\"value:MaintenanceNo\"");

WriteLiteral(" />\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"MaintenanceDate\"");

WriteLiteral(">MaintenanceDate</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" id=\"AddMaintenanceDate\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" onchange=\"model.getAutoNumber()\"");

WriteLiteral(" data-bind=\"value: MaintenanceDate\"");

WriteLiteral("/>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"Principal\"");

WriteLiteral(">Principal</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: PrincipalName\"");

WriteLiteral(" />\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" id=\"PrincipalOpen\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n  " +
"              <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" data-meaning=\"MaintenanceSupplier\"");

WriteLiteral(">MaintenanceSupplier</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: MaintenanceSupplier\"");

WriteLiteral(" />\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" id=\"ManufacturerOpen\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"TypeDesc\"");

WriteLiteral(">TypeDesc</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" id=\"AddTypeDesc\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: TypeDesc\"");

WriteLiteral(" />\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" id=\"MaintenanceTypeOpen\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"MaintenanceList\"");

WriteLiteral(">MaintenanceList</span>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 130px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: MaintenanceList\"");

WriteLiteral(" />\r\n                    <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" id=\"MaintenanceListOpen\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n  " +
"              <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</span></td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(">\r\n                    <select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width: 160px;\"");

WriteLiteral(" disabled><option");

WriteLiteral(" id=\"Status\"");

WriteLiteral(" value=\"100390201213000028\"");

WriteLiteral(">立單</option></select>\r\n                </td>\r\n                <td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral("><span");

WriteLiteral(" data-meaning=\"Remark\"");

WriteLiteral(">Remark</span></td>\r\n                <td");

WriteLiteral(" class=\"td_padding\"");

WriteLiteral(" colspan=\"3\"");

WriteLiteral(">\r\n                    <input");

WriteLiteral(" id=\"Remark\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 86%;\"");

WriteLiteral(" maxlength=\"120\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"value: Remark\"");

WriteLiteral(" />\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                " +
"<td");

WriteLiteral(" class=\"td_right\"");

WriteLiteral(" style=\"vertical-align:top\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" style=\"color:red\"");

WriteLiteral(">*</span>\r\n                    <span");

WriteLiteral(" data-meaning=\"Equipment\"");

WriteLiteral(">Equipment</span>\r\n                </td>\r\n                <td");

WriteLiteral(" colspan=\"5\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" id=\"Equipments\"");

WriteLiteral("></div>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n" +
"</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"PrincipalDialog\"");

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

WriteLiteral(" data-meaning=\"AccountMaster\"");

WriteLiteral(">AccountMaster</span>\r\n                <button");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"DepartmentNo\"");

WriteLiteral(">DepartmentNo</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"DeptCode\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"DepartmentDescription\"");

WriteLiteral(">DepartmentDescription</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"DeptDesc\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"PrincipalSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"PrincipalContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"PrincipalTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionPrincipalBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"PrincipalConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ManufacturerDialog\"");

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

WriteLiteral(" data-meaning=\"VendorMasterFile\"");

WriteLiteral(">VendorMasterFile</span>\r\n                <button");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"VendorNo\"");

WriteLiteral(">VendorNo</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"ManufacturerCode\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <span");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(" data-meaning=\"VendorDescription\"");

WriteLiteral(">VendorDescription</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" id=\"ManufacturerDesc\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"ManufacturerSearch\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"ManufacturerContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"ManufacturerTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionManufacturerBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ManufacturerConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"MaintenanceTypeDialog\"");

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

WriteLiteral(" data-meaning=\"MaintenanceTypeMaster\"");

WriteLiteral(">MaintenanceTypeMaster</span>\r\n                <button");

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

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"MaintenanceTypeContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"MaintenanceTypeTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionMaintenanceTypeBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"MaintenanceTypeConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"MaintenanceListDialog\"");

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

WriteLiteral(" data-meaning=\"MaintenanceListMasterFile\"");

WriteLiteral(">Maintenance List Master</span>\r\n                <button");

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

WriteLiteral(">\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"MaintenanceListContent\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"MaintenanceListTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionMaintenanceListBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"MaintenanceListConfirmBtn\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        .mf-table-wrapper {
            overflow-x: auto;
        }

        #MainContent .fix-table, #MainContent .fix-head {
            width: 200%;
        }

        #DetailContent .fix-table, #DetailContent .fix-head {
            width: 160%;
        }

        .operation {
            margin-right: 5px;
            overflow: hidden;
            width: 60px;
        }

        .J-content table {
            width: 100%;
        }

        .J-content .td_padding {
            padding-bottom: 5px;
        }

        .J-content .td_right {
            text-align: right;
            padding-right: 5px;
        }
    </style>
    <link");

WriteLiteral(" type=\"text/css\"");

WriteLiteral(" rel=\"stylesheet\"");

WriteAttribute("href", Tuple.Create(" href=\"", 14066), Tuple.Create("\"", 14129)
, Tuple.Create(Tuple.Create("", 14073), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.css")
, 14073), false)
);

WriteLiteral("/>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14145), Tuple.Create("\"", 14212)
, Tuple.Create(Tuple.Create("", 14151), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-cn.js")
, 14151), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14236), Tuple.Create("\"", 14303)
, Tuple.Create(Tuple.Create("", 14242), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-tw.js")
, 14242), false)
);

WriteLiteral("></script>\r\n    <link");

WriteAttribute("href", Tuple.Create(" href=\"", 14325), Tuple.Create("\"", 14369)
, Tuple.Create(Tuple.Create("", 14332), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/iCheck/blue.css")
, 14332), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">    \r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14405), Tuple.Create("\"", 14450)
, Tuple.Create(Tuple.Create("", 14411), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 14411), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14497), Tuple.Create("\"", 14542)
, Tuple.Create(Tuple.Create("", 14503), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/koCustomBinding.js")
, 14503), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14589), Tuple.Create("\"", 14629)
, Tuple.Create(Tuple.Create("", 14595), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 14595), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14676), Tuple.Create("\"", 14712)
, Tuple.Create(Tuple.Create("", 14682), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 14682), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14759), Tuple.Create("\"", 14796)
, Tuple.Create(Tuple.Create("", 14765), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 14765), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 14843), Tuple.Create("\"", 14900)
, Tuple.Create(Tuple.Create("", 14849), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/EquipmentManagement/EMS00009Add.js")
, 14849), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

        }
    }
}
#pragma warning restore 1591