using System.Web;
using System.Web.Optimization;

namespace AssetManager.App.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/libraries").Include(
                "~/Content/Carosole/owl.carousel.js",
                "~/Scripts/libraries.js"));
            bundles.Add(new ScriptBundle("~/bundles/angular").Include("~/Scripts/angularbundle.js",
            "~/Scripts/select.js"));

            bundles.Add(new ScriptBundle("~/bundles/app/common").Include(
                                         "~/Scripts/app/main/app.js",
                                         "~/scripts/app/main/controllers/usercontroller.js",
                                         "~/scripts/app/main/controllers/GearFaultController.js",
                                         "~/scripts/app/main/controllers/FailuresController.js",
                                         "~/scripts/app/main/controllers/FailureReportController.js",
                                         "~/scripts/app/main/controllers/ReportedController.js",
                                         "~/scripts/app/main/controllers/dashboardController.js",
                                         "~/scripts/app/main/controllers/graphs/graphsController.js",
                                         "~/scripts/app/main/controllers/SectionController.js",
                                         "~/scripts/app/main/controllers/StationController.js",
                                         "~/scripts/app/main/controllers/productController.js",
                                         "~/scripts/app/main/controllers/graphs/compareStatsController.js",
                                         "~/scripts/app/main/controllers/graphs/SummaryController.js",
                                         "~/scripts/app/main/controllers/graphs/signalincidentsControlller.js",
                                         "~/scripts/app/main/controllers/graphs/costIncidentsController.js",
                                         "~/scripts/app/main/controllers/graphs/sectionWiseGearIncidents.js",
                                         "~/scripts/app/main/controllers/graphs/sectionWiseIncidents.js",
                                         "~/Scripts/app/main/model.js", 
                                         "~/Scripts/app/main/services.js",
                                         "~/Scripts/app/main/directives.js"));

            bundles.Add(new StyleBundle("~/Content/Plugins/css").Include("~/Content/plugins.css"));

            bundles.Add(new ScriptBundle("~/bundles/d3").Include(
            "~/Scripts/d3/d3.js",
            "~/Scripts/nv.d3.js",
            "~/Scripts/angular-nvd3.js"));

            bundles.Add(new StyleBundle("~/content/carsoule").Include(
                "~/Content/Carosole/owl.carousel.css",
                "~/Content/Carosole/owl.theme.default.css"));

            bundles.Add(new StyleBundle("~/Content/select").Include(
                "~/Content/ui-grid.css",
                "~/Content/nv.d3.css",
                "~/Content/select.css"));

            bundles.Add(new LessBundle("~/Content/css").Include(
            "~/Content/bootstrap/bootstrap.less"));

            bundles.Add(new LessBundle("~/Content/login")
                    .Include("~/Content/Site/login.less"));

            bundles.Add(new Bundle("~/bundles/assetapp").Include(
                 "~/dist/assetManager/*.js"));

      bundles.Add(new StyleBundle("~/bundles/styles").Include(
                    "~/dist/assetManager/Styles.*"));
    }
  }
}
