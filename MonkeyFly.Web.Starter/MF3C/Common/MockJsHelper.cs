using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MonkeyFly.Web.Mvc.Common
{
    public class MockJsHelper
    {
        public static IHtmlString LoadMockJsAndTestJson()
        {
#if DEBUG
            return System.Web.Optimization.Scripts.Render(
                "~/Content/js/mock",
                "~/Data/testJSON/Json");
#else
            return null;
#endif
        }
    }
}