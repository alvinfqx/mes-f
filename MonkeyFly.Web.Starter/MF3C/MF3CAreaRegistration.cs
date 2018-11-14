using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Mvc
{
    public class MF3CAreaRegistration: AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MF3C";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MF3C_default",
                "MF3C/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "MonkeyFly.Web.Mvc.Controllers" }
            );
        }
    }
}