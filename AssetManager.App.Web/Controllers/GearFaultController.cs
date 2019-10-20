using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XFailureLog.Web.Core;

namespace AssetManager.App.Web.Controllers
{
    [AdminAuthorizeAttribute]
    public class GearFaultController : BaseController
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
    }
}