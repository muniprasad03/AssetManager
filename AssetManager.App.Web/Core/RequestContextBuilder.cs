using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using XFailureLog.Models;
using XFailureLog.Services;
using XFailureLog.Services.Services;

namespace XFailureLog.Web.Core
{
    public class RequestContextBuilder
    {
        /// <summary>
        /// The USERSESSIONKEY
        /// </summary>
        private const string USERSESSIONKEY = "CurrentUser";

        /// <summary>
        /// Gets or sets the context service.
        /// </summary>
        /// <value>The context service.</value>
        public ContextService ContextService { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="RequestContextBuilder"/> class.
        /// </summary>
        /// <param name="contextService">The context service.</param>
        public RequestContextBuilder(ContextService contextService)
        {
            this.ContextService = contextService;
        }

        /// <summary>
        /// Builds the specified is force.
        /// </summary>
        /// <returns>Return request context.</returns>
        public IRequestContext Build()
        {
            var context = new AppRequestContext(this)
            {
                User = this.GetUserDetails()
            };

            return context;
        }

        /// <summary>
        /// Gets the user details.
        /// </summary>
        /// <returns>Return the user</returns>
        private User GetUserDetails()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                return null;
            }

            User cachedUserDetails = HttpContext.Current.Session[USERSESSIONKEY] != null ? JsonConvert.DeserializeObject<User>(HttpContext.Current.Session[USERSESSIONKEY].ToString()) : null;
            Claim ci = (HttpContext.Current.User.Identity as ClaimsIdentity).Claims.Single(c => c.Type == ClaimTypes.Name);
            if (cachedUserDetails != null && cachedUserDetails.UserName == ci.Value)
            {
                return cachedUserDetails;
            }
            else
            {
                User userDetails = this.ContextService.GetUser(ci.Value);
                if (userDetails != null)
                {
                    HttpContext.Current.Session[USERSESSIONKEY] = Newtonsoft.Json.JsonConvert.SerializeObject(userDetails);
                }

                return userDetails;
            }
        }
    }
}
