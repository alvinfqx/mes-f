using MonkeyFly.VirtualPath;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MonkeyFly.MES.Web
{
    public class MESAreaVirtualPathRegistration : IAreaVirtualPathRegistration
    {
        public List<KeyValuePair<string, string>> GetPath()
        {
            var pathList = new List<KeyValuePair<string, string>>();
            pathList.Add(new KeyValuePair<string, string>("MES", "MES"));

            return pathList;
        }
    }
}