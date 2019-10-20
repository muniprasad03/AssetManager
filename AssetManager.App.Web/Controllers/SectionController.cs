using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AssetManager.App.Web.Core;

namespace AssetManager.App.Web.Controllers
{
    [AdminAuthorizeAttribute]
    public class SectionController : BaseController
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
    }
}