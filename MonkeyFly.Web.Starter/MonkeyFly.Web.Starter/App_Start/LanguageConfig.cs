using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml.Serialization;

namespace MonkeyFly.Web.Starter
{
    public class LanguageConfig
    {
        static Dictionary<String, String> ENTranslateDictionary;
        static Dictionary<String, String> ZHCNTranslateDictionary;
        static Dictionary<String, String> ZHTWTranslateDictionary;

        /// <summary>
        /// 初始化语系字典
        /// </summary>
        /// <param name="path">文件夹路径</param>
        public static void initDictionary(String path)
        {
            ENTranslateDictionary = JSONDeserializeFromFile<Dictionary<string, string>>(path+ "/en.json");
            ZHCNTranslateDictionary = JSONDeserializeFromFile<Dictionary<string, string>>(path + "/zh-cn.json");
            ZHTWTranslateDictionary = JSONDeserializeFromFile<Dictionary<string, string>>(path + "/zh-tw.json");
        }

        /// <summary>
        /// 查询语系列表
        /// </summary>
        /// <param name="code">语言代号：en|zh-tw|zh-cn</param>
        /// <param name="words">语言代号：word1,word2</param>
        /// <returns>JSON格式字符串</returns>
        public static String searchList(string code, string words)
        {
            String result = "{}";
            switch (code)
            {
                case "en":
                    result = getTranslationResults(words.Split(','), ENTranslateDictionary);
                    break;
                case "zh-cn":
                    result = getTranslationResults(words.Split(','), ZHCNTranslateDictionary);
                    break;
                case "zh-tw":
                    result = getTranslationResults(words.Split(','), ZHTWTranslateDictionary);
                    break;
            }
            return result;
        }

        /// <summary>
        /// 获取翻译结果
        /// </summary>
        /// <param name="wordArray">词组</param>
        /// <param name="dictionary">对应的字典</param>
        /// <returns>JSON格式字符串</returns>
        private static String getTranslationResults(String[] wordArray, Dictionary<String, String> dictionary)
        {
            StringBuilder sb = new StringBuilder();
            foreach (String word in wordArray)
            {
                if (dictionary.Keys.Contains(word))
                {
                    sb.Append(String.Format("\"{0}\":\"{1}\",", word, dictionary[word]));
                }
            }

            String result = sb.ToString();
            if (!String.IsNullOrEmpty(result))
            {
                result = "{" + result.Substring(0, result.Length - 1) + "}";
            }
            else
            {
                result = "{}";
            }
            return result;
        }

        /// <summary>
        /// 查询语系列表
        /// </summary>
        /// <param name="code">语言代号：en|zh-tw|zh-cn</param>
        /// <param name="words">语言代号：word1,word2</param>
        /// <param name="path">文件路径</param>
        /// <returns>JSON格式字符串</returns>
        public static String searchList(string code, string words, string path)
        {
            Dictionary<string, string> list = JSONDeserializeFromFile<Dictionary<string, string>>(path);
            String[] wordArray = words.Split(',');
            StringBuilder sb = new StringBuilder();
            foreach (String word in wordArray)
            {
                if (list.Keys.Contains(word))
                {
                    sb.Append(String.Format("\"{0}\":\"{1}\",", word, list[word]));
                }
            }
            String result = sb.ToString();
            if (!String.IsNullOrEmpty(result))
            {
                result = "{" + result.Substring(0, result.Length - 1) + "}";
            }
            else
            {
                result = "{}";
            }

            return result;
        }

        /// <summary>
        /// 从文件反序列化到JSON
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="path">文件路径</param>
        /// <returns></returns>
        private static T JSONDeserializeFromFile<T>(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                throw new ArgumentNullException("path");
            }

            StreamReader sr = new StreamReader(path);
            StringBuilder sb = new StringBuilder();

            while (!sr.EndOfStream)
            {
                sb.Append(sr.ReadLine());
            }

            return JsonConvert.DeserializeObject<T>(sb.ToString());
        }
    }
}