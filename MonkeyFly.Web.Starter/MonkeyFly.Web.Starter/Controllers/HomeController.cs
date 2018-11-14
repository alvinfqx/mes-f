using MonkeyFly.Core;
using MonkeyFly.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace MonkeyFly.Web.Starter.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// 主页面
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public ActionResult Index(string username)
        {
            ViewBag.username = username;
            return View();
        }
        
        /// <summary>
        /// 首页内容
        /// </summary>
        /// <returns></returns>
        public ActionResult Wellcome()
        {
            return View();
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        public ActionResult ChangePassword(string username) 
        {
            ViewBag.username = username;
            return View();
        }

        /// <summary>
        /// 主页面，设计新的菜单主页
        /// Jack 2017年2月4日18:21:30
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            return View();
        }
    }
}
