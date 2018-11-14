using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.MES.Web.Controllers
{
    public class QualityManagementController : Controller
    {
        /*****QCS00003 Start*****/
        /// <summary>
        /// 检验群组码设定
        /// Amanda 2017年5月27日 9:42:00
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult QCS00003()
        {
            return View();
        }

        /*****QCS00003 End******/

        /*****QCS00001 Start*****/
        /// <summary>
        /// 抽样检验设定维护
        /// Jack 2017年6月5日12:04:25
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00001()
        {
            return View();
        }
        /*****QCS00001 End******/

        /*****QCS00002 Start*****/
        /// <summary>
        /// 检验项目类别维护
        /// Amanda 2017年6月9日09:27:31
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00002()
        {
            return View();
        }

        /// <summary>
        /// 检验项目类别维护-检验项目
        /// Amanda 2017年6月9日09:27:31
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00002TestItems()
        {
            return View();
        }

        /// <summary>
        /// 检验项目类别维护-检验类别
        /// Amanda 2017年6月9日09:27:31
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00002IdentifyCategory()
        {
            return View();
        }
        /*****QCS00002 End******/

        /*****QCS00004 Start*****/
        /// <summary>
        /// 标准检验规范设定
        /// Amanda 2017年6月12日14:11:05
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00004()
        {
            return View();
        }

        /// <summary>
        /// 标准检验规范设定-料号
        /// Amanda 2017年6月12日14:10:45
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00004PartNo()
        {
            return View();
        }

        /// <summary>
        /// 标准检验规范设定-检验群码
        /// Amanda 2017年6月12日14:10:51
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00004CheckGroupCode()
        {
            return View();
        }
        /*****QCS00004 End******/

        /*****QCS00006 Start*****/
        /// <summary>
        /// 製程檢驗確認
        /// Erick 2017年6月28日15:30:0
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00006()
        {
            return View();
        }
        /*****QCS00006 End******/

        /*****QCS00010 Start*****/
        /// <summary>
        /// 客诉分析与改善
        /// Mars 2017年6月13日11:50:0
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00010()
        {
            return View();
        }
        /*****QCS000010 End******/


        /*****QCS00009 Start*****/
        /// <summary>
        /// 客诉单维护
        /// May 2017年6月12日
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00009()
        {
            return View();
        }
        /*****QCS00009 End******/

        /*****QCS00011 Start******/
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>

        public ActionResult QCS00011()
        {
            return View();
        }
        /*****QCS00011 End******/

        /*****QCS00005 Start*****/
        /// <summary>
        /// 制程检验维护
        /// May 2017年6月30日
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00005()
        {
            return View();
        }
        /*****QCS00005 End******/

        /*****QCS00007 Start*****/
        /// <summary>
        /// 制程首件检验维护
        /// Johnny 2017年7月4日
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00007()
        {
            return View();
        }
        /*****QCS00007 End******/

        /*****QCS00008 Start*****/
        /// <summary>
        /// 制程巡检检验维护
        /// Armin 2017年7月4日
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00008()
        {
            return View();
        }
        /*****QCS00008 End******/


        /*****QCS00004Same Start*****/
        /// <summary>
        /// 制程巡检检验维护
        /// Johnny 2017-9-7
        /// </summary>
        /// <returns></returns>
        public ActionResult QCS00004Same()
        {
            return View();
        }
        /*****QCS00004Same End******/

    }
}
 