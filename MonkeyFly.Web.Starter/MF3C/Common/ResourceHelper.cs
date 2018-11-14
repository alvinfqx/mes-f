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
	[AspNetHostingPermission(SecurityAction.Demand, Level = AspNetHostingPermissionLevel.Minimal)]
	public class ResourceHelper
	{
        private static Dictionary<string, Dictionary<string, string>> assemblyResourceMap = new Dictionary<string, Dictionary<string, string>>();
 
        public static Stream GetFileStream(Assembly assembly, string url)
        {
            if (!assemblyResourceMap.ContainsKey(assembly.FullName))
                assemblyResourceMap[assembly.FullName] = GetEmbeddedResourceMapping(assembly);
 
            var embedFileName = GetEmbedFileName(assemblyResourceMap[assembly.FullName], url);
            return assembly.GetManifestResourceStream(embedFileName);
        }

        private static string GetEmbedFileName(Dictionary<string, string> map, string url)
        {
            var urls = url.Split('/'); // Zephyr.Web.Resource/Content/js/core/json2.min.js
            urls[0] = urls[0].Replace(".", "/");
            url = string.Join("/", urls);

            var str = Regex.Replace(url.Replace("~/", "/"), @"(\/)(\d)", @"$1_$2");    // /css/960/grid.css          => /css/_960/grid.css//str = Regex.Replace(embedFileName, @"\.(.*\/)", "._$1");          // /easyui-1.3.2/easyui.css   => /easyui-1._3._2/easyui.css//str = Regex.Replace(embedFileName, @"\-(.*\/)", "_$1");           // /jquery-plugin/xx.js       => /jquery_plugin/xx.js
            var index = str.LastIndexOf("/");
            str = str.Substring(0, index).Replace(".", "._").Replace("-", "_") + str.Substring(index, str.Length - index);
            str = str.Replace("/", ".").TrimStart('.').ToLower();
            return map.ContainsKey(str) ? map[str] : str; //解决大小写问题
        }
       
        private static Dictionary<string, string> GetEmbeddedResourceMapping(Assembly assembly = null)
        {
            if (assembly==null)
                assembly = System.Reflection.Assembly.GetExecutingAssembly();

            string[] resources = assembly.GetManifestResourceNames();

            Dictionary<string, string> resourceMap = new Dictionary<string, string>();

            foreach (string resource in resources)
                resourceMap.Add(resource.ToLower(), resource);

            return resourceMap;
        }

        //public static string GetResourceUrl(string url)
        //{
        //   var page = new Page();
        //   var embedFileName = GetEmbedFileName(resourceMap, url);
        //   return new Page().ClientScript.GetWebResourceUrl(typeof(ResourceHelper), embedFileName);
        //}

        #region GetContentType
        public static string GetContentType(string url)
        {
            var dict = new Dictionary<string, string>(){
                {"ez","application/andrew-inset"},
                {"hqx","application/mac-binhex40"},
                {"cpt","application/mac-compactpro"},
                {"doc","application/msword"},
                {"bin","application/octet-stream"},
                {"dms","application/octet-stream"},
                {"lha","application/octet-stream"},
                {"lzh","application/octet-stream"},
                {"exe","application/octet-stream"},
                {"class","application/octet-stream"},
                {"so","application/octet-stream"},
                {"dll","application/octet-stream"},
                {"oda","application/oda"},
                {"pdf","application/pdf"},
                {"ai","application/postscript"},
                {"eps","application/postscript"},
                {"ps","application/postscript"},
                {"smi","application/smil"},
                {"smil","application/smil"},
                {"mif","application/vnd.mif"},
                {"xls","application/vnd.ms-excel"},
                {"ppt","application/vnd.ms-powerpoint"},
                {"wbxml","application/vnd.wap.wbxml"},
                {"wmlc","application/vnd.wap.wmlc"},
                {"wmlsc","application/vnd.wap.wmlscriptc"},
                {"bcpio","application/x-bcpio"},
                {"vcd","application/x-cdlink"},
                {"pgn","application/x-chess-pgn"},
                {"cpio","application/x-cpio"},
                {"csh","application/x-csh"},
                {"dcr","application/x-director"},
                {"dir","application/x-director"},
                {"dxr","application/x-director"},
                {"dvi","application/x-dvi"},
                {"spl","application/x-futuresplash"},
                {"gtar","application/x-gtar"},
                {"hdf","application/x-hdf"},
                {"js","application/x-javascript"},
                {"skp","application/x-koan"},
                {"skd","application/x-koan"},
                {"skt","application/x-koan"},
                {"skm","application/x-koan"},
                {"latex","application/x-latex"},
                {"nc","application/x-netcdf"},
                {"cdf","application/x-netcdf"},
                {"sh","application/x-sh"},
                {"shar","application/x-shar"},
                {"swf","application/x-shockwave-flash"},
                {"sit","application/x-stuffit"},
                {"sv4cpio","application/x-sv4cpio"},
                {"sv4crc","application/x-sv4crc"},
                {"tar","application/x-tar"},
                {"tcl","application/x-tcl"},
                {"tex","application/x-tex"},
                {"texinfo","application/x-texinfo"},
                {"texi","application/x-texinfo"},
                {"t","application/x-troff"},
                {"tr","application/x-troff"},
                {"roff","application/x-troff"},
                {"man","application/x-troff-man"},
                {"me","application/x-troff-me"},
                {"ms","application/x-troff-ms"},
                {"ustar","application/x-ustar"},
                {"src","application/x-wais-source"},
                {"xhtml","application/xhtml+xml"},
                {"xht","application/xhtml+xml"},
                {"zip","application/zip"},
                {"au","audio/basic"},
                {"snd","audio/basic"},
                {"mid","audio/midi"},
                {"midi","audio/midi"},
                {"kar","audio/midi"},
                {"mpga","audio/mpeg"},
                {"mp2","audio/mpeg"},
                {"mp3","audio/mpeg"},
                {"aif","audio/x-aiff"},
                {"aiff","audio/x-aiff"},
                {"aifc","audio/x-aiff"},
                {"m3u","audio/x-mpegurl"},
                {"ram","audio/x-pn-realaudio"},
                {"rm","audio/x-pn-realaudio"},
                {"rpm","audio/x-pn-realaudio-plugin"},
                {"ra","audio/x-realaudio"},
                {"wav","audio/x-wav"},
                {"pdb","chemical/x-pdb"},
                {"xyz","chemical/x-xyz"},
                {"bmp","image/bmp"},
                {"gif","image/gif"},
                {"ico","image/x-icon"},
                {"ief","image/ief"},
                {"jpeg","image/jpeg"},
                {"jpg","image/jpeg"},
                {"jpe","image/jpeg"},
                {"png","image/png"},
                {"tiff","image/tiff"},
                {"tif","image/tiff"},
                {"djvu","image/vnd.djvu"},
                {"djv","image/vnd.djvu"},
                {"wbmp","image/vnd.wap.wbmp"},
                {"ras","image/x-cmu-raster"},
                {"pnm","image/x-portable-anymap"},
                {"pbm","image/x-portable-bitmap"},
                {"pgm","image/x-portable-graymap"},
                {"ppm","image/x-portable-pixmap"},
                {"rgb","image/x-rgb"},
                {"xbm","image/x-xbitmap"},
                {"xpm","image/x-xpixmap"},
                {"xwd","image/x-xwindowdump"},
                {"igs","model/iges"},
                {"iges","model/iges"},
                {"msh","model/mesh"},
                {"mesh","model/mesh"},
                {"silo","model/mesh"},
                {"wrl","model/vrml"},
                {"vrml","model/vrml"},
                {"css","text/css"},
                {"html","text/html"},
                {"htm","text/html"},
                {"asc","text/plain"},
                {"txt","text/plain"},
                {"rtx","text/richtext"},
                {"rtf","text/rtf"},
                {"sgml","text/sgml"},
                {"sgm","text/sgml"},
                {"tsv","text/tab-separated-values"},
                {"wml","text/vnd.wap.wml"},
                {"wmls","text/vnd.wap.wmlscript"},
                {"etx","text/x-setext"},
                {"xsl","text/xml"},
                {"xml","text/xml"},
                {"mpeg","video/mpeg"},
                {"mpg","video/mpeg"},
                {"mpe","video/mpeg"},
                {"qt","video/quicktime"},
                {"mov","video/quicktime"},
                {"mxu","video/vnd.mpegurl"},
                {"avi","video/x-msvideo"},
                {"movie","video/x-sgi-movie"},
                {"ice","x-conference/x-cooltalk"}
            };

            var suffix = Path.GetExtension(url).Replace(".","");
            return dict.ContainsKey(suffix) ? dict[suffix] : "application/octet-stream";
        }
        #endregion
    }
}

