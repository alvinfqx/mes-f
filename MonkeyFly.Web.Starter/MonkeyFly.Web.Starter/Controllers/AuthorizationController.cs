using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;

namespace MonkeyFly.Web.Starter.Controllers
{
    public class AuthorizationController : Controller
    {
        /// <summary>
        /// 授权检验
        /// Jack 2017年8月9日22:22:22
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            string HostName = System.Net.Dns.GetHostName();
            IPAddress[] IPs = System.Net.Dns.GetHostAddresses(HostName);
            string IP = IPs.GetValue(0).ToString();
            foreach (IPAddress item in IPs)
            {
                if (item.AddressFamily == AddressFamily.InterNetwork)
                {
                    IP = item.ToString();
                    break;
                }
            }
            String result = AuthorizationConfig.checkAuthorizationFile(HostName, IP);
            if ("Authorization" == result)
            {
                return Redirect("Authorization.html");
            }
            else if ("Unauthorized" == result)
            {
                return Redirect("/Authorization/Unauthorized");
            }
            else
            {
                return Redirect("/Logon");
            }
        }

        /// <summary>
        /// 确认授权
        /// Jack 2017年8月9日22:22:42
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public Object Confirmation(JObject request)
        {
            String Name = request.Value<string>("Name");
            String IPAddress = request.Value<string>("IP");
            String HID = request.Value<string>("HID");

            if (String.IsNullOrWhiteSpace(Name) || String.IsNullOrWhiteSpace(IPAddress) || String.IsNullOrWhiteSpace(HID))
            {
                return Json(new { status = "410", msg = "输入信息有误" });
            }
            String data = Utils.EncryptHelper.DESEncrypt(Name + "," + IPAddress + "," + HID);
            if (AuthorizationConfig.setAuthorizationFile(data))
            {
                return Json(new { status = "200", msg = AuthorizationConfig.deleteAuthorizationHTML() });
            }
            else {
                return Json(new { status = "410", msg = "授权失败" });
            }
        }

        /// <summary>
        /// 未授权
        /// Jack 2017年8月9日22:22:54
        /// </summary>
        /// <returns></returns>
        public ActionResult Unauthorized()
        {
            return View();
        }
    }
}