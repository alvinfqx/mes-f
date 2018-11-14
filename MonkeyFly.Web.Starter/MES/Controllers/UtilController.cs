using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.MES.Web.Controllers
{
    public class UtilController : Controller
    {
       
        /***** Languages Start *****/
        /// <summary>
        /// 语系通用模块
        /// Jack 2016年10月10日10:29:23
        /// </summary>
        /// <returns></returns>
        public ActionResult Languages()
        {
            return View();
        }

        /// <summary>
        /// 三语系的通用界面
        /// Jack 2017年5月9日09:52:06
        /// </summary>
        /// <returns></returns>
        public ActionResult CNCLanguages()
        {
            return View();
        }
        /***** Languages End *****/

        /***** Parameters Start *****/
        /// <summary>
        /// 参数通用模块
        /// Jack 2016年10月16日17:42:58
        /// </summary>
        /// <returns></returns>
        public ActionResult Parameters()
        {
            return View();
        }
        /***** Parameters End *****/

        /***** Chart Start *****/
        /// <summary>
        /// 关系图通用模块
        /// Jack 2017年7月16日10:34:15
        /// </summary>
        /// <returns></returns>
        public ActionResult JointChart()
        {
            return View();
        }
        /***** Chart End *****/
    }
}