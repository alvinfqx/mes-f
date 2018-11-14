using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.MES.Web
{
    public class MESAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MES";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MES_default",
                "MES/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "MonkeyFly.MES.Web.Controllers" }
            );
        }
    }
}