using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XFailureLog.Services;

namespace AssetManager.App.Web.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        public IRequestContext Context { get; set; }

        /// Initializes a new instance of the <see cref="BaseController"/> class.
        /// </summary>
        public BaseController()
        {

        }
    }
}