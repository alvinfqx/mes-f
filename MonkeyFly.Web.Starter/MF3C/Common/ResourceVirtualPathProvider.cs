using MonkeyFly.Reflector;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Caching;
using System.Web.Hosting;

namespace MonkeyFly.Web.Mvc
{
    public class ResourceVirtualPathProvider : VirtualPathProvider
    {
        public static ResourceVirtualPathBase ResourceVirtualPath = new ResourceVirtualPathBase();

        private VirtualPathProvider _previous;

        public ResourceVirtualPathProvider(VirtualPathProvider previous)
        {
            _previous = previous;
        }

        public override bool FileExists(string virtualPath)
        {
            if (ResourceVirtualPath.IsEmbeddedPath(virtualPath))
                return true;
            else
                return _previous.FileExists(virtualPath);
        }

        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies, DateTime utcStart)
        {
            if (ResourceVirtualPath.IsEmbeddedPath(virtualPath))
                return null;
            else
                return _previous.GetCacheDependency(virtualPath, virtualPathDependencies, utcStart);
        }

        public override VirtualDirectory GetDirectory(string virtualDir)
        {
            return _previous.GetDirectory(virtualDir);
        }

        public override bool DirectoryExists(string virtualDir)
        {
            return _previous.DirectoryExists(virtualDir);
        }

        public override VirtualFile GetFile(string virtualPath)
        {
            if (ResourceVirtualPath.IsEmbeddedPath(virtualPath))
            {
                Stream stream = null;
                var assemblyName = ResourceVirtualPath.GetAssemblyName(virtualPath);
                var filename = ResourceVirtualPath.GetResourceName(virtualPath);
                var assembly = ReflectionHelper.GetAssembly(assemblyName);

                if (assembly != null)
                    stream = ResourceHelper.GetFileStream(assembly, filename);
                 
                return new EmbeddedVirtualFile(virtualPath, stream);
            }
            else
                return _previous.GetFile(virtualPath);
        }
    }

    public class EmbeddedVirtualFile : VirtualFile
    {
        private Stream _stream;

        public EmbeddedVirtualFile(string virtualPath, Stream stream): base(virtualPath)
        {
            _stream = stream;
        }

        public override Stream Open()
        {
            return _stream;
        }
    }
}
