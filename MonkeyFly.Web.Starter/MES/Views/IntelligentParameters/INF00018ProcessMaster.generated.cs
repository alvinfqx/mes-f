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
    [System.Web.WebPages.PageVirtualPathAttribute("~/Views/IntelligentParameters/INF00018ProcessMaster.cshtml")]
    public partial class _Views_IntelligentParameters_INF00018ProcessMaster_cshtml : System.Web.Mvc.WebViewPage<dynamic>
    {
        public _Views_IntelligentParameters_INF00018ProcessMaster_cshtml()
        {
        }
        public override void Execute()
        {
WriteLiteral("\r\n");

            
            #line 2 "..\..\Views\IntelligentParameters\INF00018ProcessMaster.cshtml"
  
    ViewBag.Title = "INF00018ProcessMaster";
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

WriteLiteral(" id=\"btn_save\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Save\"");

WriteLiteral(" onclick=\"model.saveClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-save\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Save\"");

WriteLiteral("> Save</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_add\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Add\"");

WriteLiteral(" onclick=\"model.addClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-add\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"New\"");

WriteLiteral("> Add</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_edit\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Edit\"");

WriteLiteral(" onclick=\"model.editClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-edit\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Change\"");

WriteLiteral("> Edit</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_delete\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Delete\"");

WriteLiteral(" onclick=\"model.deleteClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-delete\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Deletion\"");

WriteLiteral("> Delete</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_languages\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Languages\"");

WriteLiteral(" onclick=\"model.languagesClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-language\"");

WriteLiteral("></i> <span");

WriteLiteral(" data-meaning=\"Langwage\"");

WriteLiteral("> Languages</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_import\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Import\"");

WriteLiteral(" onclick=\"model.importClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-page_white_excel\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral("> Import</span></button>\r\n        <button");

WriteLiteral(" id=\"btn_export\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" title=\"Export\"");

WriteLiteral(" onclick=\"model.exportClick()\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa icon-download\"");

WriteLiteral("></i><span");

WriteLiteral(" data-meaning=\"Export\"");

WriteLiteral("> Export</span></button>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(">\r\n        <label");

WriteLiteral(" data-meaning=\"ProcessNo\"");

WriteLiteral(">Process No.</label>\r\n        <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" data-bind=\"value: Code\"");

WriteLiteral(" />\r\n        &nbsp;&nbsp;\r\n        <label");

WriteLiteral(" data-meaning=\"Status\"");

WriteLiteral(">Status</label>\r\n        <select");

WriteLiteral(" class=\"search-select\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" data-bind=\"options: StatusList, optionsText: \'text\', optionsValue: \'value\', opti" +
"onsCaption: \'\', value: Status\"");

WriteLiteral("></select>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"J-content\"");

WriteLiteral(" id=\"table-body\"");

WriteLiteral(">\r\n        <table");

WriteLiteral(" id=\"INF00018ProcessTable\"");

WriteLiteral("></table>\r\n    </div>\r\n    <div");

WriteLiteral(" class=\"datagrid-pager page\"");

WriteLiteral(" id=\"paginagionBar\"");

WriteLiteral("></div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n");

WriteLiteral("\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"WorkOrderSettingDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:900px\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:5px 10px 5px 5px  !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" onclick=\"model.clearData(\'#WorkOrderSettingDialog\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"AddWorkOrderSetting\"");

WriteLiteral(">Add WorkOrder Setting</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" style=\"margin:5px 0 8px 0;\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ProcessNo\"");

WriteLiteral(">Process No</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"ProcessNoCondition\"");

WriteLiteral("  disabled=\"disabled\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" />\r\n                &nbsp;&nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"Description\"");

WriteLiteral(">Description</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"DescriptionCondition\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" />\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"width:100%; height:90%;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"display: inline-block;width: 45%; height:100%;margin:3px 5px;float:left;\"" +
"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" id=\"table-bodydetail\"");

WriteLiteral(" style=\"margin:5px 8px; height:430px;\"");

WriteLiteral(">\r\n                        <h4");

WriteLiteral(" data-meaning=\"NoSelect\"");

WriteLiteral(" style=\"text-align:center\"");

WriteLiteral(">NoSelect</h4>\r\n                        <table");

WriteLiteral(" id=\"WorkOrderSettingTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n                <d" +
"iv");

WriteLiteral(" style=\"float:left;display: inline-block;width: 4%;margin-top:16%;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin-bottom:20%;\"");

WriteLiteral(">\r\n                        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.WorkOrderSettingMoveRightClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-right\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                    <div>\r\n       " +
"                 <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.WorkOrderSettingMoveLeftClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-left\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                </div>\r\n          " +
"      <div");

WriteLiteral(" style=\"display: inline-block;width: 45%; height:100%;margin:3px 5px;float:left;\"" +
"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" id=\"table-bodydetailone\"");

WriteLiteral(" style=\"margin:5px 8px; height:430px;\"");

WriteLiteral(">\r\n                        <h4");

WriteLiteral(" data-meaning=\"Select\"");

WriteLiteral(" style=\"text-align:center\"");

WriteLiteral(">Select</h4>\r\n                        <table");

WriteLiteral(" id=\"WorkOrderSettingChangeTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n            </div>" +
"\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"padding: 5px !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(" onclick=\"model.clearData(\'#WorkOrderSettingDialog\')\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ProcessSettingSave\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.WorkOrderSettingSaveClick()\"");

WriteLiteral(">Comfirm</button>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"WorkCenterDialog\"");

WriteLiteral(" tabindex=\"-1\"");

WriteLiteral(" role=\"dialog\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(" data-backdrop=\"static\"");

WriteLiteral(" data-keyboard=\"false\"");

WriteLiteral(">\r\n    <div");

WriteLiteral(" class=\"modal-dialog\"");

WriteLiteral(" style=\"width:1050px\"");

WriteLiteral(">\r\n        <div");

WriteLiteral(" class=\"modal-content animated bounceInRight\"");

WriteLiteral(">\r\n            <div");

WriteLiteral(" class=\"modal-header\"");

WriteLiteral(" style=\"padding:5px 10px 5px 5px  !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" id=\"close\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" onclick=\"model.clearData(\'#WorkCenterDialog\')\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Close\"");

WriteLiteral(">Close</span>\r\n                </button>\r\n                <h6");

WriteLiteral(" class=\"modal-title\"");

WriteLiteral(" data-meaning=\"WorkCenterSetting\"");

WriteLiteral(">Work Center Setting</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"J-search\"");

WriteLiteral(" style=\"margin:5px 0 8px 0;\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" data-meaning=\"ProgramCode\"");

WriteLiteral(">WorkOrderNo</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"ProgramCodeCondition\"");

WriteLiteral("  disabled=\"disabled\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" />\r\n                &nbsp;&nbsp;\r\n                <span");

WriteLiteral(" data-meaning=\"Description\"");

WriteLiteral(">WorkOrder Description</span>\r\n                <input");

WriteLiteral(" type=\"text\"");

WriteLiteral(" id=\"ProgramCodeDescriptionCondition\"");

WriteLiteral("  disabled=\"disabled\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" readonly=\"readonly\"");

WriteLiteral(" style=\"width: 170px;\"");

WriteLiteral(" />\r\n            </div>\r\n            <div");

WriteLiteral(" style=\"width:100%; height:90%;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" style=\"display: inline-block;width: 45%; height:100%;margin:3px 5px;float:left;\"" +
"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" id=\"table-bodydetail\"");

WriteLiteral(" style=\"margin:5px 8px; height:430px;\"");

WriteLiteral(">\r\n                        <h4");

WriteLiteral(" data-meaning=\"NoSelect\"");

WriteLiteral(" style=\"text-align:center\"");

WriteLiteral(">NoSelect</h4>\r\n                        <table");

WriteLiteral(" id=\"WorkCenterTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n                <d" +
"iv");

WriteLiteral(" style=\"float:left;display: inline-block;width: 4%;margin-top:16%;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"margin-bottom:20%;\"");

WriteLiteral(">\r\n                        <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.WorkCenterMoveRightClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-right\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                    <div>\r\n       " +
"                 <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" onclick=\"model.WorkCenterMoveLeftClick();\"");

WriteLiteral("><span");

WriteLiteral(" class=\"glyphicon glyphicon-triangle-left\"");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral("></span></button>\r\n                    </div>\r\n                </div>\r\n          " +
"      <div");

WriteLiteral(" style=\"display: inline-block;width: 45%; height:100%;margin:3px 5px;float:left;\"" +
"");

WriteLiteral(">\r\n                    <h4");

WriteLiteral(" data-meaning=\"Select\"");

WriteLiteral(" style=\"text-align:center\"");

WriteLiteral(">Select</h4>\r\n                    <div");

WriteLiteral(" id=\"table-bodydetailone\"");

WriteLiteral(" style=\"margin:5px 8px; height:430px;\"");

WriteLiteral(">\r\n                        <table");

WriteLiteral(" id=\"WorkCenterChangeTable\"");

WriteLiteral("></table>\r\n                    </div>\r\n                </div>\r\n            </div>" +
"\r\n            <div");

WriteLiteral(" class=\"modal-footer\"");

WriteLiteral(" style=\"padding: 5px !important\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"cancel\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(" value=\"Cancel\"");

WriteLiteral(" onclick=\"model.clearData(\'#WorkCenterDialog\')\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" type=\"button\"");

WriteLiteral(" id=\"ProcessSettingSave\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(" onclick=\"model.WorkCenterSaveClick()\"");

WriteLiteral(">Comfirm</button>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

WriteLiteral("\r\n<div");

WriteLiteral(" class=\"modal inmodal\"");

WriteLiteral(" id=\"OperationDetailDialog\"");

WriteLiteral(" tabindex=\"50\"");

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

WriteLiteral(" data-meaning=\"WorkOrderMaster\"");

WriteLiteral(">Work Order Master</h6>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(" style=\"padding: 0px 5px 2px!important;background-color:#fff;\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" id=\"windowSearch\"");

WriteLiteral(" style=\"margin:5px 0;\"");

WriteLiteral(">\r\n                    <label");

WriteLiteral(" data-meaning=\"WorkOrderNo\"");

WriteLiteral(">Operation No.</label>\r\n                    <input");

WriteLiteral(" id=\"OperationNo\"");

WriteLiteral(" type=\"text\"");

WriteLiteral(" class=\"search-input\"");

WriteLiteral(" autocomplete=\"off\"");

WriteLiteral(" />\r\n                    <button");

WriteLiteral(" id=\"dialog_search\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral("><i");

WriteLiteral(" class=\"fa fa-search\"");

WriteLiteral("></i></button>\r\n                </div>\r\n                <table");

WriteLiteral(" id=\"OperationMasterTable\"");

WriteLiteral(" data-toggle=\"true\"");

WriteLiteral(" data-mobile-responsive=\"true\"");

WriteLiteral("></table>\r\n            </div>\r\n            <div");

WriteLiteral(" id=\"paginagionOperationMasterBar\"");

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

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"OperationComfire\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

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

WriteLiteral(">\r\n                <span");

WriteLiteral(" style=\"font-size:20px\"");

WriteLiteral(" data-meaning=\"Import\"");

WriteLiteral(">Import</span>\r\n                <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"close\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(">\r\n                    <span");

WriteLiteral(" aria-hidden=\"true\"");

WriteLiteral(">&times;</span><span");

WriteLiteral(" class=\"sr-only\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</span>\r\n                </button>\r\n            </div>\r\n            <div");

WriteLiteral(" class=\"modal-body\"");

WriteLiteral(">\r\n                <div");

WriteLiteral(" class=\"form-group\"");

WriteLiteral(" style=\"width:100%;\"");

WriteLiteral(">\r\n                    <div");

WriteLiteral(" style=\"width:15%; display:inherit; float:left; margin-left:20px;\"");

WriteLiteral(">\r\n                        <button");

WriteLiteral(" id=\"BtnBrowse\"");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-toggle=\"tooltip\"");

WriteLiteral(" data-placement=\"left\"");

WriteLiteral(">\r\n                            <span");

WriteLiteral(" data-meaning=\"Browse\"");

WriteLiteral(">Browse</span>\r\n                        </button>\r\n                        <input" +
"");

WriteLiteral(" id=\"BtnFile\"");

WriteLiteral(" type=\"file\"");

WriteLiteral(" style=\"opacity:0\"");

WriteLiteral(" />\r\n                    </div>\r\n                    <div");

WriteLiteral(" style=\"padding:5px;width:70%; display:inherit; float:left;\"");

WriteLiteral(">\r\n                        <span");

WriteLiteral(" id=\"FileName\"");

WriteLiteral("></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r" +
"\n            <div");

WriteLiteral(" style=\"text-align:right;padding:5px 10px;\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" data-dismiss=\"modal\"");

WriteLiteral(" data-meaning=\"Cancel\"");

WriteLiteral(">Cancel</button>\r\n                <button");

WriteLiteral(" class=\"btn btn-success btn-sm\"");

WriteLiteral(" id=\"BtnImport\"");

WriteLiteral(" data-meaning=\"Comfirm\"");

WriteLiteral(">Comfirm</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

DefineSection("scripts", () => {

WriteLiteral(@"
    <style>
      #table-body  .mf-table-wrapper {
            overflow-x: auto;
        }

       #table-body .fix-table,#table-body .fix-head {
            width: 120%;
        }
        #table-bodyData  .mf-table-wrapper {
            overflow-x: auto;
        }

       #table-bodyData .fix-table,#table-bodyData .fix-head {
            width: 100%;
        }
       #WorkCenterDialog .mf-table-wrapper,#WorkCenterDialog .fix-table,#WorkCenterDialog .fix-head {
            width: 100%;
        }
    </style>
    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15723), Tuple.Create("\"", 15768)
, Tuple.Create(Tuple.Create("", 15729), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/knockout/knockout-3.0.0.js")
, 15729), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15815), Tuple.Create("\"", 15855)
, Tuple.Create(Tuple.Create("", 15821), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/pagination.js")
, 15821), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15902), Tuple.Create("\"", 15938)
, Tuple.Create(Tuple.Create("", 15908), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Rander.js")
, 15908), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 15985), Tuple.Create("\"", 16022)
, Tuple.Create(Tuple.Create("", 15991), Tuple.Create<System.Object, System.Int32>(Href("~/Content/js/current/Checker.js")
, 15991), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n    <script");

WriteAttribute("src", Tuple.Create(" src=\"", 16069), Tuple.Create("\"", 16138)
, Tuple.Create(Tuple.Create("", 16075), Tuple.Create<System.Object, System.Int32>(Href("~/ViewModels/MES/IntelligentParameters/INF00018ProcessMaster.js")
, 16075), false)
);

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral("></script>\r\n");

});

WriteLiteral("\r\n");

        }
    }
}
#pragma warning restore 1591
