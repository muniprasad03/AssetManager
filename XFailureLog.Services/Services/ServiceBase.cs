using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Services
{
    public class ServiceBase
    {
        /// <summary>
        /// Gets the context.
        /// </summary>
        /// <value>
        /// The context.
        /// </value>
        public IRequestContext Context { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceBase"/> class.
        /// </summary>
        /// <param name="requestContext">The request context.</param>
        public ServiceBase(IRequestContext requestContext)
        {
            this.Context = requestContext;
        }
    }
}
