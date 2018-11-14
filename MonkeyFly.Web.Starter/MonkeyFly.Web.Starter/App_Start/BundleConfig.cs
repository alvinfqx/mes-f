using MonkeyFly.Web.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.Hosting;
using System.Web.Optimization;

namespace MonkeyFly.Web.Starter
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            ResetIgnorePatterns(bundles.IgnoreList);
            //@Script.Render("~/Resource/...");
            BundleTable.VirtualPathProvider = new ResourceVirtualPathProvider(HostingEnvironment.VirtualPathProvider);

            //脚本，不依赖页面，较基础的js
            bundles.Add(new ScriptBundle("~/Content/js/index").Include(
                "~/Content/js/jquery/jquery-2.0.3.min.js",
                "~/Content/js/jquery-plugins/jquery-ui/js/jquery-ui.min.js",
                "~/Content/js/jquery-plugins/showloading/jquery.showLoading.min.js",
                "~/Content/js/hplus/bootstrap.min.js",
                "~/Content/js/content.min.js",
                "~/Content/js/bootstrap-datepicker/js/bootstrap-datepicker.js",
                "~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-cn.min.js",
                "~/Content/js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-tw.min.js",
                "~/Content/js/hplus/plugins/bootstrap-table/bootstrap-table.min.js",
                "~/Content/js/hplus/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js",
                "~/Content/js/hplus/plugins/bootstrap-table/bootstrap-table-mobile.min.js",
                "~/Content/js/datetimepicker/bootstrap-datetimepicker.js",
                "~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-cn.js",
                "~/Content/js/datetimepicker/bootstrap-datetimepicker.zh-tw.js",
                "~/Content/js/hplus/plugins/sweetalert/sweetalert.min.js",
                "~/Content/js/hplus/plugins/validate/jquery.validate.min.js",
                "~/Content/js/hplus/plugins/validate/messages_zh.min.js",
                "~/Content/js/hplus/plugins/jsTree/jstree.min.js",
                "~/Content/js/monkeyfly/monkeyfly.js",
                "~/Content/js/current/page_parameters.js",
                "~/Content/js/current/deal.js",
                "~/Content/js/current/menu.js",
                "~/Content/js/current/trees.js",
                "~/Content/js/current/format.js",
                "~/Content/js/current/bar.js",
                "~/Content/js/current/dialog.js",
                "~/Content/js/current/prompt.js",
                "~/Content/js/current/table.js",
                "~/Content/js/current/verification.js",
                "~/Content/js/hplus/plugins/iCheck/icheck.min.js"
                ));

            //脚本，依赖页面，多是插件的js
            bundles.Add(new ScriptBundle("~/Content/js/librarys").Include(
                
                ));

            #if DEBUG
            // 调试状态下才加载测试数据文件和mock.js
            //bundles.Add(new ScriptBundle("~/Content/js/mock").Include("~/Content/js/mock-min.js"));

            // 递归添加~/Data/testJson下的js文件
            //List<String> dirList = new List<string>();
            //EnumDir("/Data/testJSON/", dirList);
            //bundles.Add(new ScriptBundle("~/Data/testJSON/Json")
            //        .Include(dirList.ToArray()));                         
            #endif

            bundles.Add(new StyleBundle("~/Content/css/index").Include(
                "~/Content/css/bootstrap.min14ed.css",
               "~/Content/css/font-awesome.min93e3.css",
               "~/Content/css/animate.min.css",
               "~/Content/css/style.min862f.css",
               "~/Content/css/plugins/bootstrap-table/bootstrap-table.min.css",
               "~/Content/css/plugins/sweetalert/sweetalert.css",
               "~/Content/css/plugins/jsTree/style.min.css",
               "~/Content/js/jquery-plugins/showLoading/showLoading.css",
               "~/Content/css/icon.css",
               "~/Content/css/plugins/pagination/pagination.css",
               "~/Content/css/search.css",
               "~/Content/css/plugins/table/table.css",
               "~/Content/js/bootstrap-datepicker/css/bootstrap-datepicker.css",
               "~/Content/js/datetimepicker/bootstrap-datetimepicker.css",
               "~/Content/css/plugins/iCheck/blue.css"
                ));

            RegisterViewModels();
        }


        private static void RegisterViewModels()
        {
            String[] jsList = new string[] {
                "Organization.js"
            };

            foreach (var js in jsList)
                BundleTable.Bundles.Add(new ScriptBundle("~/Resource/MFC/" + js).Include("~/ViewModels/MFC/" + js));
        }

        public static void ResetIgnorePatterns(IgnoreList ignoreList)
        {
            ignoreList.Clear();
            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }

        private static void EnumDir(String path, List<String> pathList)
        {
            pathList.Add("~" + path + "*.js");
            IEnumerable subDir = BundleTable.VirtualPathProvider.GetDirectory(path).Directories;
            foreach (VirtualDirectory dir in subDir)
            {
                EnumDir(dir.VirtualPath, pathList);
            }
        }
    }
}