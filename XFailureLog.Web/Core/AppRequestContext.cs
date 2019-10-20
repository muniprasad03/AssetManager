using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using XFailureLog.Models;
using XFailureLog.Services;

namespace XFailureLog.Web.Core
{
    public class AppRequestContext : IRequestContext
    {
        /// <summary>
        /// Gets or sets the request context builder.
        /// </summary>
        /// <value>The request context builder.</value>
        private RequestContextBuilder RequestContextBuilder { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppRequestContext"/> class.
        /// </summary>
        /// <param name="requestContextBuilder">The request context builder.</param>
        public AppRequestContext(RequestContextBuilder requestContextBuilder)
        {
            this.RequestContextBuilder = requestContextBuilder;
        }

        /// <summary>
        /// Gets or sets the user.
        /// </summary>
        /// <value>
        /// The user.
        /// </value>
        public User User
        {
            get;
            set;
        }

        /// <summary>
        /// Updates this instance.
        /// </summary>
        public void Update()
        {
            this.RequestContextBuilder.Build();
        }
    }
}