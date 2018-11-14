using MonkeyFly.VirtualPath;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MonkeyFly.Web.Mvc
{
    public class MF3CAreaVirtualPathRegistration : IAreaVirtualPathRegistration
    {
        public List<KeyValuePair<string, string>> GetPath()
        {
            var pathList = new List<KeyValuePair<string, string>>();
            pathList.Add(new KeyValuePair<string, string>("MF3C", "MF3C"));

            return pathList;
        }
    }
}