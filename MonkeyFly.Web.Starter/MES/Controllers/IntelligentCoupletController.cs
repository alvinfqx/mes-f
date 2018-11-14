using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.MES.Web.Controllers
{
    public class IntelligentCoupletController : Controller
    {
        /*****IOT00001 Start*****/
        /// <summary>
        /// 感知器主档维护
        /// Amanda 2017年5月24日15:35:22
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult IOT00001()
        {
            return View();
        }

        /*****IOT00001 End******/
        /*****IOT00003 Start*****/
        /// <summary>
        /// 機台設備監控
        /// Mars 2017年7月4日15:35:22
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult IOT00003()
        {
            return View();
        }

        /*****IOT00003 End******/

        /*****IOT00002 Start*****/
        /// <summary>
        /// 厂区设备监控
        /// Jim 2017年7月4日18:38:52
        /// </summary>
        /// <returns></returns>
        public ActionResult IOT00002()
        {
            return View();
        }

        /// <summary>
        /// 厂区设备监控-機台監控
        /// Amanda 2017年8月9日14:59:44
        /// </summary>
        /// <returns></returns>
        public ActionResult IOT00002Machine()
        {
            return View();
        }

        /*****IOT00002 End******/
    }
}