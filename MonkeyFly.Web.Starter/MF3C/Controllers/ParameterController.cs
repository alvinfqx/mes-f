using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Mvc.Controllers
{
    public class ParameterController : Controller
    {
        /// <summary>
        /// 系统参数界面
        /// Jack 2016年8月2日09:35
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 管理类型界面
        /// Jack 2016年8月3日09:32
        /// </summary>
        /// <returns></returns>
        public ActionResult ParameterType() 
        {
            return View();
        }
	}
}