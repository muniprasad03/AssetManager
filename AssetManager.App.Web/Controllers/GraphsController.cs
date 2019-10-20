using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XFailureLog.Web.Controllers
{
    public class GraphsController : Controller
    {
        // GET: Graphs
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Failures()
        {
            return View();
        }

        public ActionResult CompareStats()
        {
            return View();
        }

        public ActionResult GearSummary()
        {
            return View();
        }

        public ActionResult CauseReport()
        {
            return View();
        }

        public ActionResult SignalIncidents()
        {
            return View();
        }

        public ActionResult CostIncidents()
        {
            return View();
        }

        public ActionResult SectionWiseIncidents()
        {
            return View();
        }

        public ActionResult SectionWiseGearIncidents()
        {
            return View();
        }

    }
}