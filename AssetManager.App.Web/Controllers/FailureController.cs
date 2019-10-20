using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AssetManager.App.Web.Core;

namespace AssetManager.App.Web.Controllers
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