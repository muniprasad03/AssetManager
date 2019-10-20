using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AssetManager.App.Web.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashbord
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddBlock()
        {
            return View();
        }
    }
}