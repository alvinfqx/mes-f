using System;
using System.Web;
using System.Web.UI;
using System.Security.Permissions;
using System.IO;
using System.Reflection;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MonkeyFly.Web.Mvc
{
    public class ResourceVirtualPathBase
    {
        public virtual bool IsEmbeddedPath(string virtualPath)
        {
            return virtualPath.Contains("~/Resource/");
        }

        public virtual string GetAssemblyName(string virtualPath)
        {
            return virtualPath.Split('/')[2]; //Resource/ViewModels/Role.js
        }

        public virtual string GetResourceName(string virtualPath)
        {
            var assemblyName = GetAssemblyName(virtualPath);
            return virtualPath.Trim('~').Replace("/Resource/", string.Empty);
        }
    }
}

