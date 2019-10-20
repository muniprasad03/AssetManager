using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;
using System.Web.Routing;

namespace AssetManager.App.Web.Core
{
    public class AdminAuthorizeAttribute : System.Web.Mvc.AuthorizeAttribute
    {
        /// <summary>
        /// Gets or sets the context.
        /// </summary>
        /// <value>
        /// The context.
        /// </value>
        [Import]
        public XFailureLog.Services.IRequestContext Context { get; set; }

        /// <summary>
        /// When overridden, provides an entry point for custom authorization checks.
        /// </summary>
        /// <param name="httpContext">The HTTP context, which encapsulates all HTTP-specific information about an individual HTTP request.</param>
        /// <returns>
        /// true if the user is authorized; otherwise, false.
        /// </returns>
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return this.Context.User != null && this.Context.User.IsAdmin;
        }

        /// <summary>
        /// Processes HTTP requests that fail authorization.
        /// </summary>
        /// <param name="filterContext">Encapsulates the information for using <see cref="T:System.Web.Mvc.AuthorizeAttribute" />. The <paramref name="filterContext" /> object contains the controller, HTTP context, request context, action result, and route data.</param>
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                base.HandleUnauthorizedRequest(filterContext);
            }
            else
            {
                filterContext.Result = new HttpStatusCodeResult(System.Net.HttpStatusCode.Forbidden, "You don't have enough privileges to view this page.");
            }
        }
    }

    /// <summary>
    /// Authorize attributes that processes HTTP requests that fail subscription.
    /// </summary>
    public class AdminApiAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
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
            var contextBuilder = GlobalConfiguration.Configuration.DependencyResolver
             .GetService(typeof(RequestContextBuilder)) as RequestContextBuilder;
            var context = contextBuilder.Build();
            return context.User != null && context.User.IsAdmin;
        }

        /// <summary>
        /// Processes HTTP requests that fail authorization.
        /// </summary>
        /// <param name="filterContext">Encapsulates the information for using <see cref="T:System.Web.Mvc.AuthorizeAttribute" />. The <paramref name="filterContext" /> object contains the controller, HTTP context, request context, action result, and route data.</param>
        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext filterContext)
        {
            filterContext.Response = filterContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.Forbidden, "You don't have enough privileges to view this page.");
        }
    }

    /// <summary>
    /// Authorize attributes that processes HTTP requests that fail subscription.
    /// </summary>
    public class SFREditorApiAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
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
            var contextBuilder = GlobalConfiguration.Configuration.DependencyResolver
             .GetService(typeof(RequestContextBuilder)) as RequestContextBuilder;
            var context = contextBuilder.Build();
            return context.User != null && (context.User.IsAdmin || context.User.IsSFREditor);
        }

        /// <summary>
        /// Processes HTTP requests that fail authorization.
        /// </summary>
        /// <param name="filterContext">Encapsulates the information for using <see cref="T:System.Web.Mvc.AuthorizeAttribute" />. The <paramref name="filterContext" /> object contains the controller, HTTP context, request context, action result, and route data.</param>
        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext filterContext)
        {
            filterContext.Response = filterContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.Forbidden, "You don't have enough privileges to view this page.");
        }
    }
}