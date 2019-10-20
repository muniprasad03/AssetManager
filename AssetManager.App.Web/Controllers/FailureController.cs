using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XFailureLog.Web.Core;

namespace XFailureLog.Web.Controllers
{
    [SFREditorApiAuthorizeAttribute]
    public class FailureController : Controller
    {
        // GET: Failure
        public ActionResult Index()
        {
            return View();
        }
    }
}