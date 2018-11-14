using MonkeyFly.CKCRM.BasicService;
using MonkeyFly.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace MonkeyFly.Web.Starter.Controllers
{
    public class LogonController : Controller
    {
        /// <summary>
        /// 登录界面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            //string HostName = System.Net.Dns.GetHostName();
            //IPAddress[] IPs = System.Net.Dns.GetHostAddresses(HostName);
            //string IP = IPs.GetValue(0).ToString();
            //foreach (IPAddress item in IPs)
            //{
            //    if (item.AddressFamily == AddressFamily.InterNetwork)
            //    {
            //        IP = item.ToString();
            //        break;
            //    }
            //}
            //String result = AuthorizationConfig.checkAuthorizationFile(HostName, IP);
            //if ("Authorization" == result)
            //{
            //    return Redirect("Authorization.html");
            //}
            //else if ("Unauthorized" == result)
            //{
            //    return Redirect("/Authorization/Unauthorized");
            //}
            //else
            //{
                ViewBag.IP = Request.ServerVariables.Get("Remote_Addr").ToString();
                return View();
            //}
        }
    }
}
