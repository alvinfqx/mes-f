using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Mvc.Controllers
{
    public class BackgroundMapController : Controller
    {
        // GET: BackgroundMap
        /// <summary>
        /// 登录背景图列表
        /// Alvin 2017年10月17日14:31:23
        /// </summary>
        /// <returns></returns>
        public ActionResult Basemap()
        {
            return View();
        }
    }
}