using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Mvc.Controllers
{
    public class RoleController : Controller
    {
        /// <summary>
        /// 角色管理的界面
        /// Jack 2016年7月31日09:50
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RoleLang()
        {
            return View();
        }


        /// <summary>
        /// 角色管理的管理成员
        /// Jack 2016年8月3日15:06
        /// </summary>
        /// <returns></returns>
        public ActionResult ManageMember(string ID, string Name, string Comments) 
        {
            ViewBag.ID = ID;
            ViewBag.Name = Name;
            ViewBag.Comments = Comments;

            return View();
        }
        
        /// <summary>
        /// 角色管理的编辑权限
        /// Jack 2016年8月4日09:36
        /// </summary>
        /// <returns></returns>
        public ActionResult EditPermission(string ID, string Name) 
        {
            ViewBag.ID = ID;
            ViewBag.Name = Name;

            return View();
        }



	}
}