using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using XFailureLog.Models;
using XFailureLog.Services.Services;
using XFailureLog.Models.Reports;

namespace AssetManager.App.Web.Controllers.Api
{
    [RoutePrefix("api/report")]
    public class ReportController : BaseApiController
    {
        public IReportService ReportService { get; set; }
        public IStationService BoardService { get; set; }
        public IReportedService DepartmentService { get; set; }
        public IGearFaultService GearFaultService { get; set; }
        public IUserService UserService { get; set; }

        public ISectiontService SectionService { get; set; }

        public ReportController(IReportService reportService, IGearFaultService gearFaultService, IStationService stationService, IReportedService reportedService, ISectiontService sectionService, IUserService userService)
        {
            this.ReportService = reportService;
            this.UserService = userService;
            this.DepartmentService = reportedService;
            this.GearFaultService = gearFaultService;
            this.BoardService = stationService;
            this.SectionService = sectionService;
        }

        [Route("getfailures")]
        public List<FailureView> GetAll(DateTime from, DateTime to)
        {
            return this.ReportService.GetFailures(from, to);
        }

        [Route("failures")]
        public dynamic PostAll(FailureFilterRequest failureFilterRequest)
        {
            return new { data = this.ReportService.GetFailures(failureFilterRequest) };
        }

        [Route("failureCauses")]
        public dynamic PostCauseAll(FailureCauseFilterRequest failureFilterRequest)
        {
            return new { data = this.ReportService.GetFailureCauses(failureFilterRequest) };
        }

        [Route("gearfaultStats")]
        public dynamic GetGearCostStats()
        {
            return this.ReportService.GetGearFaultStats();
        }

        [Route("costStats")]
        public dynamic GetFailureCostStats()
        {
            return this.ReportService.GetCostStats();
        }

        [Route("getfailureManageInfo")]
        public dynamic GetFailureManageInputs()
        {
            return new
            {
                sections = this.SectionService.Get(),   
                departments = this.BoardService.Get(),
                board = this.DepartmentService.Get(),
            };
        }

        [Route("getfailureCauseManageInfo")]
        public dynamic GetFailureCauseManageInputs()
        {
            return new
            {
                sections = this.SectionService.Get(),
                stations = this.BoardService.Get(),
                reporteds = this.DepartmentService.Get(),
                gearFaults = this.GearFaultService.Get(),
                users = this.UserService.GetUsersList(),
                manufactures = this.GearFaultService.GetAllManufactures(),
                subGearFaults = this.GearFaultService.GetAllSubGearFaults(),
                causeOfFailures = this.GearFaultService.GetCauseOfFailures(),
                subCauseOfFailure = this.GearFaultService.GetSubCauseOfFailures(),
                axleGearCodes = this.DepartmentService.GetAxleGearCodes()
            };
        }

        [Route("getfailureDashboardInfo")]
        public dynamic GetFailureDashboardInputs(MonthReportType monthView)
        {

            var sections = this.SectionService.Get();
            var stations = this.BoardService.Get();
            var reporteds = this.DepartmentService.Get();
            var gearFaults = this.GearFaultService.Get();
            var date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            var fromDate = date;
            var toDate = date;
            if (monthView == MonthReportType.ThisMonth)
            {
                fromDate = new DateTime(date.Year, date.Month, 1).Date;
            }
            else if (monthView == MonthReportType.LastMonth)
            {
                var lastMonthDate = date.AddMonths(-1);
                fromDate = new DateTime(lastMonthDate.Year, lastMonthDate.Month, 1).Date;
                toDate = fromDate.AddMonths(1).AddDays(-1).Date;
            }

            var failures = this.ReportService.GetFailures(fromDate, toDate);

            var reportedData = new List<ReportedView>();
            reporteds.ForEach(r =>
           {
               reportedData.Add(new ReportedView()
               {
                   Id = r.Id,
                   Name = r.Name,
                   Failures = failures.Where(f => f.ReportedId == r.Id).Count()
               });
           });

            var sectionData = new List<SectionView>();
            sections.ForEach(s => {
                sectionData.Add(new SectionView() { Id = s.Id, Name = s.Name, Stations = stations.Count(st => st.StationType == StationType.Station && st.SectionId == s.Id), LBs = stations.Count(st => st.StationType == StationType.IB && st.SectionId == s.Id), IcGates = stations.Count(st => st.StationType == StationType.IC && st.SectionId == s.Id), Failures = failures.Count(f => f.SectionId == s.Id) });
            });

            var stationGearData = new List<StationGearFailureView>();
            failures.GroupBy(f => f.StationId).ForEach(sf => {
                sf.ToList().GroupBy(gf => gf.GearFaultId).ForEach(gears =>
                {
                    if (gears.Count() > 1)
                    {
                        var failure = gears.First();
                        stationGearData.Add(new StationGearFailureView() { Id = failure.GearFaultId, Name = failure.GearFault, Station = failure.Station, StationId = failure.StationId, Failures = gears.Count() });
                    }
                });
            });

            return new
            {
                sections = sectionData,
                stations = stations,
                reporteds = reportedData,
                gearFaults = gearFaults,
                failures = failures,
                lateCount = failures.Count(f => f.IsTrainLate),
                stationGearData = stationGearData
                //users = this.UserService.GetUsersList(),
                //manufactures = this.GearFaultService.GetAllManufactures(),
                //subGearFaults = this.GearFaultService.GetAllSubGearFaults(),

            };
        }

        [Route("compare/export")]
        public HttpResponseMessage PostExportCompare(CompareStatsFilterRequest request)
        {
            request.FileName = "CompareStats";
            request.SheetHeader = "CompareStats";
            return this.ExportFile<DataTable>(request, this.ReportService.GetCompareStats(request).ToReportDataTable(request, request.SearchKey));
        }

        [Route("failure/export")]
        public HttpResponseMessage PostExportFailures(FailureFilterRequest request)
        {
            request.FileName = "SFRReport";
            request.SheetHeader = "SFRReport";
            return this.ExportFile<byte[]>(request, this.ReportService.GetFailureExportReport(this.ReportService.GetFailureReport(request).GetSearchResults(request.SearchKey), "SFR Report"));
        }


        [Route("failurecause/export")]
        public HttpResponseMessage PostExportFailureCauses(FailureCauseFilterRequest request)
        {
            request.FileName = "SFRReport";
            request.SheetHeader = "SFRReport";
            return this.ExportFile<byte[]>(request, this.ReportService.GetFailureExportReport(this.ReportService.GetFailureCauseReport(request).GetSearchResults(request.SearchKey), "SFR Report"));
        }

        [Route("StationSummary/export")]
        public HttpResponseMessage PostExportCompare(StationSummaryStatsFilterRequest request)
        {
            request.FileName = "StationSummaryStats";
            request.SheetHeader = "StationSummaryStats";
            return this.ExportFile<DataTable>(request, this.ReportService.GetStationSummaryStats(request).ToReportDataTable(request, request.SearchKey));
        }
    }
}
