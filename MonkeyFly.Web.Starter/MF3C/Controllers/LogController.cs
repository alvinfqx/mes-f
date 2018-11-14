using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Mvc.Controllers
{
    public class LogController : Controller
    {
        //
        // GET: /Log/
        /// <summary>
        /// 日记管理的界面
        /// Alvin 2016年7月31日09:50
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
	}
}