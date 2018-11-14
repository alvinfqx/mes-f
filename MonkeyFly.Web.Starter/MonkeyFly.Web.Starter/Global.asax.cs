using MonkeyFly.Core;
using MonkeyFly.VirtualPath;
using MonkeyFly.Web.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MonkeyFly.Web.Starter
{
    // 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    // 请访问 http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // 在应用程序启动时运行的代码
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            BundleTable.EnableOptimizations = true;
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            ModelBinders.Binders.Add(typeof(JObject), new JObjectModelBinder());

            HostingEnvironment.RegisterVirtualPathProvider(new AreaVirtualPathProvider());

            LanguageConfig.initDictionary(Server.MapPath(@"/LanguageData"));
            AuthorizationConfig.initAuthorizationFilePath(Server.MapPath(@"/"));
        }
    }
}