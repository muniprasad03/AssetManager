using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XFailureLog.Web
{
    public static class Extensions
    {
        /// <summary>
        /// Gets the IP address.
        /// </summary>
        /// <param name="controller">The controller.</param>
        /// <returns>Return remote Address.</returns>
        public static string GetIPAddress(this Controller controller)
        {
            // if proxy is used, then http_via is not null. so we will can get the original ip address.
            if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_VIA"] != null)
            {
                return System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            }

            return System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
        }
    }
}