using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;

namespace AssetManager.App.Web.Core
{
    public class SessionAuthorize : System.Web.Http.AuthorizeAttribute
    {
        /// <summary>
        /// Indicates whether the specified control is authorized.
        /// </summary>
        /// <param name="actionContext">The context.</param>
        /// <returns>
        /// true if the control is authorized; otherwise, false.
        /// </returns>
        protected override bool IsAuthorized(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            return Extensions.IsLicenseValid();
        }

        /// <summary>
        /// Processes HTTP requests that fail authorization.
        /// </summary>
        /// <param name="filterContext">Encapsulates the information for using <see cref="T:System.Web.Mvc.AuthorizeAttribute" />. The <paramref name="filterContext" /> object contains the controller, HTTP context, request context, action result, and route data.</param>
        protected override void HandleUnauthorizedRequest(HttpActionContext filterContext)
        {
            // Need to review once 
            if (!filterContext.RequestContext.Principal.Identity.IsAuthenticated)
            {
                filterContext.Response = filterContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.Unauthorized, "Session expired.");
            }
            else
            {
                filterContext.Response = filterContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.Forbidden, "Session expired.");
            }
        }
    }
}