using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace MonkeyFly.Web.Starter
{
    public class AuthorizationConfig
    {
        static String AuthorizationFilePath;
        static String AuthorizationHTMLPath;

        /// <summary>
        /// 初始化授权文件目录
        /// Jack 2017年8月9日23:15:05
        /// </summary>
        /// <param name="path">文件夹路径</param>
        public static void initAuthorizationFilePath(String path)
        {
            AuthorizationFilePath = path + "/monkeyfly.dat";
            AuthorizationHTMLPath = path + "/Authorization.html";
        }

        /// <summary>
        /// 检验是否已授权
        /// Jack 2017年8月9日23:20:41
        /// </summary>
        /// <returns></returns>
        public static String checkAuthorizationFile(String HostName, String IP)
        {
            if (!File.Exists(@AuthorizationFilePath))
            {
                return "Authorization";
            }
            String file = getAuthorizationFile();
            if (String.IsNullOrWhiteSpace(file))
            {
                return "Unauthorized";
            }
            String data = Utils.EncryptHelper.DESDecrypt(file);
            String[] list = data.Split(',');
            if (list.Length < 3)
            {
                return "Unauthorized";
            }
            if (HostName != list[0])
            {
                return "Unauthorized";
            }
            if (IP != list[1])
            {
                return "Unauthorized";
            }

            return "Authorized";
        }
        
        /// <summary>
        /// 从授权文件读取data
        /// Jack 2017年8月9日23:20:41
        /// </summary>
        /// <returns></returns>
        private static String getAuthorizationFile()
        {
            if (string.IsNullOrEmpty(AuthorizationFilePath))
            {
                return null;
            }

            if (!File.Exists(@AuthorizationFilePath))
            {
                return null;
            }

            StreamReader sr = new StreamReader(AuthorizationFilePath);
            StringBuilder sb = new StringBuilder();

            while (!sr.EndOfStream)
            {
                sb.Append(sr.ReadLine());
            }

            return sb.ToString();
        }

        /// <summary>
        /// 创建授权文件，写入data
        /// Jack 2017年8月9日23:21:56
        /// </summary>
        /// <returns></returns>
        public static bool setAuthorizationFile(string data)
        {
            try
            {
                using (FileStream file = new FileStream(AuthorizationFilePath, FileMode.Create, FileAccess.Write))
                {
                    using (StreamWriter sw = new StreamWriter(file))
                    {
                        sw.Write(data);
                        sw.Flush();
                        sw.Close();
                    }

                    file.Close();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// 删除授权界面
        /// Jack 2017年8月10日00:58:38
        /// </summary>
        /// <returns></returns>
        public static String deleteAuthorizationHTML()
        {
            if (File.Exists(@AuthorizationHTMLPath))
            {
                try
                {
                    File.Delete(@AuthorizationHTMLPath);
                    return "OK";
                }
                catch
                {
                    return "Delete Fail";
                }
            }
            else
            {
                return "No File";
            }
        }
    }
}