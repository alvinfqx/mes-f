using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Web.Mvc;

namespace MonkeyFly.Web.Starter.Controllers
{
    public class LanguagesController : Controller
    {
        [HttpPost]
        public Object getLanguages(JObject request)
        {
            String code = request.Value<string>("Code");
            String words = request.Value<string>("Words");

            if (String.IsNullOrEmpty(code) || String.IsNullOrEmpty(words))
            {
                return new { status = "410", msg = "输入信息有误" };
            }

            //String path = Server.MapPath(@"/LanguageData/" + code + ".json");
            //String jsonStr = LanguageConfig.searchList(code, words, path);

            String jsonStr = LanguageConfig.searchList(code, words);
            
            return Json(new { list = jsonStr });
        }
    }
}