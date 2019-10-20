using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XFailureLog.Web.Controllers
{
    public class ReportsController : BaseController
    {
        // GET: Reports
        public ActionResult Index()
        {
            return View(this.Context.User);
        }

        public ActionResult Failures()
        {
            return View();
        }

        public ActionResult Logins()
        {
            return View();
        }

        public ActionResult SectionIncidents()
        {
            return View();
        }

        public ActionResult SectionGearIncidents()
        {
            return View();
        }

        public ActionResult Sections()
        {
            return View();
        }
    }
}