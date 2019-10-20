using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace AssetManager.App.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AssetManager.AutoMapperBootstrap.Init();
            Core.Extensions.InitializeLicence();
        }

        #region Session Enabling

        /// <summary>
        /// The web API prefix
        /// </summary>
        private const string WebApiPrefix = "api";

        /// <summary>
        /// The web API execution path
        /// </summary>
        private static readonly string WebApiExecutionPath = string.Format("~/{0}", WebApiPrefix);

        /// <summary>
        /// Application_s the post authorize request.
        /// </summary>
        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
            }
        }

        /// <summary>
        /// Determines whether [is web API request].
        /// </summary>
        /// <returns>
        /// return true or false
        /// </returns>
        private static bool IsWebApiRequest()
        {
            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiExecutionPath);
        }
        #endregion
    }
}
