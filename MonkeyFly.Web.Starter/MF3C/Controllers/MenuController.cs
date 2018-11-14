using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Mvc.Controllers
{
    public class MenuController : Controller
    {

     
        //
        // GET: /Text/
        /// <summary>
        /// 导航菜单的界面
        /// Alvin 2016年7月31日09:50
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        
         /// <summary>
         /// 管理按钮库界面
         /// alvin 2016年8月3日09:32
         /// </summary>
         /// <returns></returns>
         public ActionResult MenuButtons()
         {
             return View();
         }

        /// <summary>
        /// 管理操作按钮界面
        /// alvin 2016-08-04
        /// </summary>
        /// <returns></returns>
         public ActionResult MenuActions()
         {
             return View();
         }

        /// <summary>
        /// 设置公司
        /// Jack 2016年11月4日15:08:20
        /// </summary>
        /// <returns></returns>
        public ActionResult MenuSetCompany()
        {
            return View();
        }
	}
}