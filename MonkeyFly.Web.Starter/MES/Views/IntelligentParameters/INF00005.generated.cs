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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00005.cshtml")]
    public partial class _Views_IntelligentParameters_INF00005_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00005_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentParameters\INF00005.cshtml"
  
    ViewBag.Title = "INF00005";
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

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"刷新\"");

WriteLiteral(" onclick=\"model.refreshClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-arrow_refresh\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Refresh\"");

WriteLiteral("> Refresh</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_search\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"查询\"");

WriteLiteral(" onclick=\"model.searchClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-search\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral("> Search</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_save\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"保存\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral("> Save</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_add\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"新增\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral("> Add</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_edit\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"修改\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral("> Edit</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_delete\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"删除\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral("> Delete</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_languages\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"语系\"");

WriteLiteral(" onclick=\"model.languagesClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-language\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Langwage\"");

WriteLiteral("> Languages</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_import\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"Import\"");

WriteLiteral(" onclick=\"model.importClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-page_white_excel\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral("> Import</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_export\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"Export\"");

WriteLiteral(" onclick=\"model.exportClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-download\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Export\"");

WriteLiteral("> Export</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_deptStructure\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(" title=\"部门结构\"");

WriteLiteral(" onclick=\"model.deptStructureClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-org\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"deptStructure\"");

WriteLiteral("> Dept Structure</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <span");

WriteLiteral(" data-meaning=\"DepartmentNo\"");

WriteLiteral(">Department No.</span>\r\n        <input");

WriteLiteral(" id=\"Code\"");

WriteLiteral(" name=\"Code\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n        &nbsp;&nbsp;\r\n        <span");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</span>\r\n        <select");

WriteLiteral(" id=\"Status\"");

WriteLiteral(" style=\"width: 100px;\"");

WriteLiteral(">\r\n            <option></option>\r\n            <option");

WriteLiteral(" value=\"1\"");

WriteLiteral(" data-meaning=\"Normal\"");

WriteLiteral(">Normal</option>\r\n            <option");

WriteLiteral(" value=\"0\"");

WriteLiteral(" data-meaning=\"Invalid\"");

WriteLiteral(">Invalid</option>\r\n        </select>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"DepartmentTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"DepartmentDialog\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#DepartmentNo\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"DepartmentFile\"");

WriteLiteral(">Department File</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"DepartmentNo\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Department No.</span>\r\n                <input");

WriteLiteral(" id=\"DepartmentNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.CodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodycode\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"DeptTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionDeptBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#DepartmentNo\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"commit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#DepartmentNo\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>               \r\n            </div>\r\n        </div>\r\n    </div>\r\n" +
"</div>\r\n\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"OrganizationDialog\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#SiteCode\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"deptStructure\"");

WriteLiteral(">Dept. Structure</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"SiteCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Site No.</span>\r\n                <input");

WriteLiteral(" id=\"SiteCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:3px 2px 5px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-xs\"");

WriteLiteral(" onclick=\"model.DepartmentSearch()\"");

WriteLiteral(" style=\"margin-right:4px;\"");

WriteLiteral("><span");

WriteLiteral(" class=\"fa fa-desktop\"");

WriteLiteral("></span></button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.SiteCodeSearch()\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"ibox-content\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"gridlist\"");

WriteLiteral(" class=\"wrapper\"");

WriteLiteral(" style=\"width: 100%; height: 400px; margin:3px 5px;\"");

WriteLiteral("></div>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#SiteCode\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"OrgDepartmentDialog\"");

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

WriteLiteral(" onclick=\"model.clearInput(\'#OrgDepartmentNo\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"DepartmentFile\"");

WriteLiteral(">Department File</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"SiteCode\"");

WriteLiteral(" style=\"margin:5px 5px 8px 10px; width:60px;\"");

WriteLiteral(">Site No.</span>\r\n                <input");

WriteLiteral(" id=\"OrgDepartmentNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:5px 5px 8px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.OrgCodeSearch()\"");

WriteLiteral(" id=\"Find\"");

WriteLiteral(" data-meaning=\"Search\"");

WriteLiteral(" value=\"Search\"");

WriteLiteral(">Search</button>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"table-bodycode\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral(">\r\n                <table");

WriteLiteral(" id=\"OrgDeptTable\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionOrgDeptBar\"");

WriteLiteral(" style=\"margin:0 15px;\"");

WriteLiteral("></div>\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right;\"");

WriteLiteral(">               \r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" onclick=\"model.clearInput(\'#OrgDepartmentNo\')\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"OrgCommit\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.clearInput(\'#OrgDepartmentNo\')\"");

WriteLiteral(" value=\"Comfirm\"");

WriteLiteral(">Commit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

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

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral(">Save</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"ClassSetDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:980px;\"");

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

WriteLiteral(" onclick=\"model.clearData()\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"DeptClassSetTable\"");

WriteLiteral(">Dept. Class Set Table</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" style=\"margin:5px 0 8px 0;\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"DepartmentNo\"");

WriteLiteral(" style=\"margin:3px 2px 3px 12px; width:60px;\"");

WriteLiteral(">Department No.</span>\r\n                <input");

WriteLiteral(" id=\"DeptCode\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 160px; margin:3px 5px 3px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n                <span");

WriteLiteral(" data-meaning=\"DepartmentDescription\"");

WriteLiteral(" style=\"margin:3px 2px 3px 4px; width:60px;\"");

WriteLiteral(">Department Description</span>\r\n                <input");

WriteLiteral(" id=\"DeptName\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral("  style=\"width: 250px;  margin:3px 5px 3px 0;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" disabled />\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"width:100%; height:100%;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"display: inline-block;width: 46%; height:100%;margin:3px 5px 3px 15px;flo" +
"at:left;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin:5px 8px 5px 5px;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" data-meaning=\"Unused\"");

WriteLiteral(">Unused</span>\r\n                    </div>\r\n                    <div");

WriteLiteral(" style=\"margin:0px 8px 5px 5px;  height:430px;\"");

WriteLiteral(">\r\n                        <table");

WriteLiteral(" id=\"UnusedTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n                <d" +
"iv");

WriteLiteral(" style=\"float:left;display: inline-block;width: 4%;margin-top:16%;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin-bottom:20%;\"");

WriteLiteral(">\r\n                        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.ProcessMoveRightClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-right\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                    <div>\r\n       " +
"                 <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.ProcessMoveLeftClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-left\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                </div>\r\n          " +
"      <div");

WriteLiteral(" style=\"display: inline-block;width: 46%; height:100%;margin:3px 5px;float:left;\"" +
"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin:5px 8px 5px 5px;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" data-meaning=\"Used\"");

WriteLiteral(">Used</span>\r\n                    </div>\r\n                    <div");

WriteLiteral(" style=\"margin:0px 8px 5px 5px; height:420px;\"");

WriteLiteral(">\r\n                        <table");

WriteLiteral(" id=\"UsedTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n            </div>" +
"\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"text-align:right; padding:0px 10px 5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" id=\"Close\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Close\"");

WriteLiteral(" onclick=\"model.clearData()\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"detailSave\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.detailSaveClick()\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
        #table-body .mf-table-wrapper {
            overflow-x: auto;
        }
        
        .fix-table, .fix-head {
            width: 100%;
        }

        #table-body .fix-table, #table-body .fix-head {
            width: 152%;
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

WriteAttribute("href", Tuple.Create(" href=\"", 15334), Tuple.Create("\"", 15383)
, Tuple.Create(Tuple.Create("", 15341), Tuple.Create<System.Object, System.Int32>(Href("~/Content/css/plugins/jsTree/style.min.css")
, 15341), false)
);

WriteLiteral(" rel=\"stylesheet\"");

WriteLiteral(">\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15415), Tuple.Create("\"", 15472)
, Tuple.Create(Tuple.Create("", 15421), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/hplus/plugins/layer/laydate/laydate.js")
, 15421), false)
);

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15496), Tuple.Create("\"", 15541)
, Tuple.Create(Tuple.Create("", 15502), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 15502), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15588), Tuple.Create("\"", 15628)
, Tuple.Create(Tuple.Create("", 15594), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 15594), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15675), Tuple.Create("\"", 15711)
, Tuple.Create(Tuple.Create("", 15681), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 15681), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15758), Tuple.Create("\"", 15793)
, Tuple.Create(Tuple.Create("", 15764), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/trees.js")
, 15764), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15840), Tuple.Create("\"", 15877)
, Tuple.Create(Tuple.Create("", 15846), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 15846), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15924), Tuple.Create("\"", 15959)
, Tuple.Create(Tuple.Create("", 15930), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/table.js")
, 15930), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 16006), Tuple.Create("\"", 16062)
, Tuple.Create(Tuple.Create("", 16012), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00005.js")
, 16012), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n\r\n");

});

WriteLiteral("\r\n");

        }
    }
}
#pragma warning restore 1591
