using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.MES.Web.Controllers
{
    public class IntelligentManufacturingController : Controller
    {
        /*****SFC00011 Start*****/
        /// <summary>
        /// 制程完工状态分析(工作中心)
        /// Alvin 2017年6月9日14:50:39
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00011()
        {
            return View();
        }
        /*****SFC00011 End******/


        /*****SFC00010 Start*****/
        /// <summary>
        /// 製程完工狀況分析(製令)
        /// Alvin 2017年6月13日15:30:49
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00010()
        {
            return View();
        }
        /*****SFC00010 End******/

        /*****SFC00001 Start*****/
        /// <summary>
        /// 製品製造資料維護
        /// Jack 2017年6月19日17:25:20
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程关系
        /// Jack 2017年6月22日09:23:26
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessRelationship()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程用料
        /// Jack 2017年6月22日17:08:39
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessMaterials()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程资源
        /// Jack 2017年6月26日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessResources()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程资源(设备)
        /// Jack 2017年6月26日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessResourcesEquipment()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程资源(人工)
        /// Jack 2017年6月26日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessResourcesArtificial()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程资源(其他)
        /// Jack 2017年6月26日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessResourcesOther()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-替代制程
        /// Jack 2017年6月26日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001AlternativeProcess()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程工序
        /// Jack 2017年6月26日18:48:09
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessProcess()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序用料
        /// Jack 2017年6月27日17:08:39
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationMaterials()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序资源
        /// Jack 2017年6月27日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationResources()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序资源(设备)
        /// Jack 2017年6月27日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationResourcesEquipment()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序资源(人工)
        /// Jack 2017年6月27日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationResourcesArtificial()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序资源(其他)
        /// Jack 2017年6月27日09:21:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationResourcesOther()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序关系
        /// Jack 2017年6月27日21:57:46
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationRelationship()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-制程关系图
        /// Jack 2017年6月28日09:07:54
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001ProcessRelationshipChart()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-工序关系图
        /// Jack 2017年6月28日09:08:01
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001OperationRelationshipChart()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-BOM
        /// Jack 2017年7月26日11:45:16
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001BOM()
        {
            return View();
        }

        /// <summary>
        /// 制品制程-资源
        /// Jack 2017年7月26日11:45:16
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00001Resource()
        {
            return View();
        }

        /*****SFC00001 End******/

        /*****SFC00004 Start*****/
        /// <summary>
        /// 任务分派与维护
        /// Amanda 2017年6月20日14:06:06
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004()
        {
            return View();
        }

        /// <summary>
        /// 任务分派与维护-任務分派
        /// Amanda 2017年6月21日17:03:30
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004TaskAssignment()
        {
            return View();
        }

        /// <summary>
        /// 任务分派与维护-打印
        /// Amanda 2017年6月21日17:03:30
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004Print()
        {
            return View();
        }

        /// <summary>
        /// 任务分派与维护-资源明细
        /// Amanda 2017年6月21日17:03:30
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004Resources()
        {
            return View();
        }

        /// <summary>
        /// 任务分派与维护-资源明细人员
        /// Amanda 2017年7月6日17:20:21
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004Artificial()
        {
            return View();
        }

        /// <summary>
        /// 任务分派与维护-资源明细人员
        /// Amanda 2017年7月6日17:20:24
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004Equipment()
        {
            return View();
        }

        /// <summary>
        /// 任务分派与维护-资源明细其它
        /// Amanda 2017年7月6日17:20:28
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00004Other()
        {
            return View();
        }
        /*****SFC00004 End******/

        /*****SFC00006 Start*****/
        /// <summary>
        /// 工作站作業維護
        /// Jim 2017年6月20日14:42:28
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006()
        {
            return View();
        }
        /*****SFC00006 End******/
        /*****SFC00007 Start*****/
        /// <summary>
        /// 完工回報作業
        /// Mars 2017年6月22日17:12:28
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00007()
        {
            return View();
        }
        /*****SFC00007 End******/
        /*****SFC00007 Start*****/
        /// <summary>
        /// 品一完工回報作業
        /// Mars 2017年6月30日15:12:28
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00007CSTBCC()
        {
            return View();
        }
        /*****SFC00007 End******/




        /*****SFC00002 Start*****/
        /// <summary>
        /// 制令单维护
        /// Alvin 2017年6月20日16:45:55
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002()
        {
            return View();
        }

        /// <summary>
        /// 制令单维护-BOM
        /// Alvin 2017年7月3日14:41:51
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002BOM()
        {
            return View();
        }

        /// <summary>
        /// 制令单维护-制程关系
        /// Alvin 2017年7月12日14:30:25
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessRelaDiagram()
        {
            return View();
        }
        /// <summary>
        /// 制令单维护-制程关系图(iframe)
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessRelaDiagramView()
        {
            return View();
        }

        /// <summary>
        /// 制令单维护-资源
        /// Alvin 2017年7月4日09:24:25
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002Resource()
        {
            return View();
        }

        /// <summary>
        /// 制令单维护-制程关系
        /// Alvin 2017年7月3日09:52:51
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessRelationship()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细--制程用料
        /// Alvin 2017年6月29日17:33:18
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessMaterials()
        {
            return View();
        }
        /// <summary>
        /// 制令单明细--制程资源
        /// Alvin 2017年6月30日11:34:29
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessResources()
        {
            return View();
        }
        /// <summary>
        /// 制令单明细--制程资源--设备
        /// Alvin 2017年6月30日11:38:04
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessResourcesEquipment()
        {
            return View();
        }
        /// <summary>
        /// 制令单明细--制程资源--人工
        /// Alvin 2017年6月30日11:38:04
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessResourcesArtificial()
        {
            return View();
        }
        /// <summary>
        /// 制令单明细--制程资源--其他
        /// Alvin 2017年6月30日11:38:04
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessResourcesOther()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002ProcessProcess()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序-工序用料
        /// Alvin 2017年7月3日10:29:45
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationMaterials()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序-工序资源
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationResources()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序-工序资源(设备)
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationResourcesEquipment()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序-工序资源(人工)
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationResourcesArtificial()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序-工序资源(其他)
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationResourcesOther()
        {
            return View();
        }

        /// <summary>
        /// 制令单明细-制程工序-工序关系
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationRelationship()
        {
            return View();
        }
        /// <summary>
        /// 制令制程-工序关系图
        /// Alvin 2017年7月17日16:54:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002OperationRelationshipDiagram()
        {
            return View();
        }


        /// <summary>
        /// 制令单明细-替代拆解
        /// Alvin 2017年7月3日09:53:40
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00002AlternativeProcess()
        {
            return View();
        }


        /*****SFC00002 End******/

        /*****SFC00003 Start*****/
        /// <summary>
        /// 制令单拆单作业
        /// Darren 2017年6月21日9:42:28
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00003()
        {
            return View();
        }
        /*****SFC00003 End******/

        /*****SFC00005 Start*****/
        /// <summary>
        /// RunCard发派处理
        /// Armin 2017年6月21日14:22:22
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00005()
        {
            return View();
        }
        /// <summary>
        /// RunCard发派处理-打印
        /// Armin 2017年6月26日9:20:45
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00005Print()
        {
            return View();
        }
        /*****SFC00005 End******/

        /*****SFC00013 Start*****/
        /// <summary>
        /// 制程完工异常分析
        /// Amanda 2017年6月22日17:08:34
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00013()
        {
            return View();
        }
        /*****SFC00013 End******/

        /*****SFC00014 Start*****/
        /// <summary>
        /// 人工時統計分析
        /// Amanda 2017年6月26日09:31:55
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00014()
        {
            return View();
        }
        /*****SFC00014 End******/

        /*****SFC00015 Start*****/
        /// <summary>
        /// 機器工時統計分析
        /// Amanda 2017年6月26日15:53:03
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00015()
        {
            return View();
        }
        /*****SFC00015 End******/

        /*****SFC00008 Start*****/
        /// <summary>
        /// 完工调整作业
        /// Johnny 2017年6月26日11:59:00
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00008()
        {
            return View();
        }
        /*****SFC00008 End******/

        /*****SFC00016 Start*****/
        /// <summary>
        /// 无效工时原因分析
        /// Amanda 2017年6月27日16:17:14
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00016()
        {
            return View();
        }
        /*****SFC00016 End******/

        /*****SFC00012 Start*****/
        /// <summary>
        /// 制程工时分析
        /// May 2017年6月26日
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00012()
        {
            return View();
        }
        /*****SFC00012 End******/

        /*****SFC00006 Start*****/
        /// <summary>
        /// 工作站作業維護-打印
        /// Jim 2017年6月27日15:17:03
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Print()
        {
            return View();
        }
        /*****SFC00006 End******/

        /*****SFC00006Material Start*****/
        /// <summary>
        /// 工作站作業維護-用料
        /// Jim 2017年7月18日15:39:22
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Material()
        {
            return View();
        }
        /*****SFC00006Material End******/

        /*****SFC00006Resource Start*****/
        /// <summary>
        /// 工作站作業維護-资源
        /// Jim 2017年7月18日16:55:59
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Resource()
        {
            return View();
        }
        /*****SFC00006Resource End******/

        /*****SFC00006Equipment Start*****/
        /// <summary>
        /// 工作站作業維護-设备页签
        /// Jim 2017年7月19日10:50:08
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Equipment()
        {
            return View();
        }
        /*****SFC00006Equipment  End******/

        /*****SFC00006Artificial Start*****/
        /// <summary>
        /// 工作站作業維護-人工页签
        /// Jim 2017年7月19日11:27:27
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Artificial()
        {
            return View();
        }
        /*****SFC00006Artificial  End******/

        /*****SFC00006SFC00006Other Start*****/
        /// <summary>
        /// 工作站作業維護-其他页签
        /// Jim 2017年7月19日12:12:58
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Other()
        {
            return View();
        }
        /*****SFC00006SFC00006Other  End******/

        /*****SFC00006SFC00006Abnormal Start*****/
        /// <summary>
        /// 工作站作業維護-异常视窗
        /// Jim 2017年7月21日10:38:29
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Abnormal()
        {
            return View();
        }
        /*****SFC00006SFC00006Abnormal  End******/

        /*****SFC00006Finish Start*****/
        /// <summary>
        /// 工作站作業維護-完工视窗
        /// Jim 2017年7月21日10:38:29
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00006Finish()
        {
            return View();
        }
        /*****SFC00006Finish  End******/

        /*****SFC00017 Start*****/
        /// <summary>
        /// 制令直通率分析
        /// Amanda 2017年8月25日16:02:50
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00017()
        {
            return View();
        }

        /// <summary>
        /// 制令直通率分析-打印
        /// Amanda 2017年8月28日17:25:08
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00017Print()
        {
            return View();
        }
        /*****SFC00017 End******/

        /*****SFC00018 Start*****/
        /// <summary>
        /// 制令用料耗用分析(
        /// Amanda 2017年8月31日09:39:56
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00018()
        {
            return View();
        }

        /// <summary>
        /// 制令用料耗用分析-打印
        /// Amanda 2017年8月31日09:40:01
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00018Print()
        {
            return View();
        }
        /*****SFC00018 End******/


        /***********SFC00019Start***********/
        /// <summary>
        /// 制品生产工时分析
        /// Johnny 2017-8-31 17:35:00
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult SFC00019()
        {
            return View();
        }

        /// <summary>
        /// 制品生产工时分析 制品页签
        /// Johnny 2017-8-31 17:35:00
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult SFC00019Product()
        {
            return View();
        }


        /// <summary>
        /// 制品生产工时分析 工作中心页签
        /// Johnny 2017-8-31 17:35:00
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult SFC00019WorkCenter()
        {
            return View();
        }
        /***********SFC00019End***********/

        /*****SFC00020 Start*****/
        /// <summary>
        /// 製令生產計劃表
        /// Jim 2017年9月26日17:05:22
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00020()
        {
            return View();
        }

        /*****SFC00020 End******/
        /***********SFC00019Print Start***********/
        /// <summary>
        /// 制品生产工时分析  打印签
        /// Johnny 2017-9-27 17:35:00
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult SFC00019Print()
        {
            return View();
        }
        /***********SFC00019Print End***********/
        /*****SFC00023 Start*****/
        /// <summary>
        /// 完工批號明細表
        /// Jim 2017年9月27日15:50:55
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00023()
        {
            return View();
        }

        /*****SFC00023 End******/
        /*****SFC00021 Start*****/
        /// <summary>
        /// 完工批號明細表
        /// Jim 2017年9月27日15:50:55
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00021()
        {
            return View();
        }

        /*****SFC00021 End******/

        /***********SFC00021Print Start***********/
        /// <summary>
        /// 制程生产计划差异  打印签
        /// Johnny 2017-9-27 17:35:00
        /// </summary>
        /// <returns></returns>
        // GET: IntelligentParameters
        public ActionResult SFC00021Print()
        {
            return View();
        }
        /***********SFC00021Print End***********/

        /*****SFC00022 Start*****/
        /// <summary>
        /// 製品不良統計分析
        /// Jim 2017年9月30日14:59:41
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00022()
        {
            return View();
        }

        /// <summary>
        /// 製品不良統計分析-原因统计
        /// Jim 2017年9月30日15:11:06
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00022Reason()
        {
            return View();
        }

        /// <summary>
        /// 製品不良統計分析-料品统计
        /// Jim 2017年9月30日15:13:05
        /// </summary>
        /// <returns></returns>
        public ActionResult SFC00022Material()
        {
            return View();
        }

        /*****SFC00022 End******/
    }
}