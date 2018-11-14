using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.MES.Web.Controllers
{
    public class EquipmentManagementController : Controller
    {
        /*****EMS00001 Start*****/

        /// <summary>
        /// 设备主档资料维护
        /// Jack 2017年5月22日23:27:56
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00001()
        {
            return View();
        }

        /// <summary>
        /// 设备主档资料维护-设备主档
        /// Jack 2017年5月22日23:29:42
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00001EquipmentMasterFile()
        {
            return View();
        }

        /// <summary>
        /// 设备主档资料维护-设备项目维护
        /// Jack 2017年5月22日23:30:51
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00001EquipmentItemMaintenance()
        {
            return View();
        }

        /// <summary>
        /// 设备主档资料维护-设备图样
        /// Jack 2017年5月22日23:35:35
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00001EquipmentPicture()
        {
            return View();
        }

        /// <summary>
        /// 设备主档资料维护-机况设定
        /// Amanda 2017年7月28日16:55:07
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00001ConditionSet()
        {
            return View();
        }

        /*****Inf00001 End******/

        /*****EMS00002 Start*****/

        /// <summary>
        /// 设备巡检项目设定
        /// Armin 2017年5月23日09:30:56
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00002()
        {
            return View();
        }

        /*****EMS00002 End******/

        /*****EMS00004 Start*****/

        /// <summary>
        /// 設備叫修單維護
        /// Amanda 2017年6月1日11:53:56
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00004()
        {
            return View();
        }

        /*****EMS00004 End******/

        /*****EMS00005 Start*****/

        /// <summary>
        /// 設備維修作業
        /// Armin 2017年6月2日10:20:20
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00005()
        {
            return View();
        }

        /*****EMS00005 End******/

        /*****EMS00006 Start*****/

        /// <summary>
        /// 设备叫修结案处理(
        /// Amanda 2017年6月7日17:01:03
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00006()
        {
            return View();
        }

        /*****EMS00006 End******/

        /*****EMS00008 Start*****/
        /// <summary>
        /// 设备保养清单设定
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00008()
        {
            return View();
        }
        /// <summary>
        /// 保養項目
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00008MaintenanceItem()
        {
            return View();
        }
        /// <summary>
        /// 保養類型
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00008MaintenanceType()
        {
            return View();
        }
        /// <summary>
        /// 保養清單
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00008MaintenanceList()
        {
            return View();
        }

        /*****EMS00008 End*****/

        /*****EMS00003 Start*****/

        /// <summary>
        /// 設備巡檢維護
        /// Jim 2017年6月7日10:14:40
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00003()
        {
            return View();
        }

        /*****EMS00003 End******/
        /*****EMS00011 Start*****/

        /// <summary>
        /// 設備保養結案與還原
        /// mars 2017年7月7日09:53:56
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00011()
        {
            return View();
        }

        /*****EMS00011 End******/

		/*****EMS00009 Start*****/

        /// <summary>
        /// 設備保養工單維護
        /// Jack 2017年7月7日15:31:56
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00009()
        {
            return View();
        }

        /// <summary>
        /// 設備保養工單維護-新增
        /// Jack 2017年7月11日11:38:07
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00009Add()
        {
            return View();
        }

        /// <summary>
        /// 設備保養工單維護-编辑
        /// Jack 2017年7月11日11:38:07
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00009Edit()
        {
            return View();
        }

        /*****EMS00009 End******/

        /*****EMS00010 Start*****/
        /// <summary>
        /// 設備保養資料維護
        /// Alvin 2017年7月8日15:36:02
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00010()
        {
            return View();
        }
        /*****EMS00010 End******/
        /*****EMS00007 Start*****/
        /// <summary>
        /// 維修原因統計分析
        /// Mars 2017年7月11日15:36:02
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00007()
        {
            return View();
        }
        /// <summary>
        /// 设备分析页签
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00007Equipment()
        {
            return View();
        }
        /// <summary>
        /// 原因分析页签
        /// </summary>
        /// <returns></returns>
        public ActionResult EMS00007Reason()
        {
            return View();
        }

        /*****EMS00007 End*****/
    }
}