using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AssetManager.App.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LeftNav()
        {
            return this.PartialView("_LeftNav", this.Context.User);
        }

        public ActionResult About()
        {
            return View();
        }
    }
}