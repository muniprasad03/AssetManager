using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XFailureLog.Web.Controllers
{
    public class WorkController : Controller
    {
        // GET: Work
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Pointers()
        {
            return View();
        }
        public ActionResult Track()
        {
            return View();
        }
        public ActionResult Signal()
        {
            return View();
        }
    }
}