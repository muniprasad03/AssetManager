using DocumentFormat.OpenXml.Spreadsheet;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;
using AssetManager.Models.Reports;
using AssetManager.Models;
using AssetManager.Models;

namespace AssetManager.Services
{
    public class ReportService : ServiceBase, IReportService
    {
         public AssetManager.Data.Model.XWorkDB DB { get; set; }

         public ReportService(IRequestContext requestContext, XWorkDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

         public List<AssetManager.Models.FailureView> GetFailures(DateTime from, DateTime to)
         {
             return this.Context.User.IsSFREditor || this.Context.User.IsReportViewer || this.Context.User.IsAdmin ? this.DB.Fetch<AssetManager.Data.Model.FailureView>("Select * from FailureView Where Cast(TimeOfOccurance as Date) BetWeen @0 and @1", from.Date, to.Date).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList() : this.DB.Fetch<Data.Model.FailureView>("Where StationId in (@0) and Cast(TimeOfOccurance as Date) Between @1 and @2", this.Context.User.GroupedStations, from.Date, to.Date).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
         }

        public List<AssetManager.Models.FailureView> GetFailures(FailureFilterRequest request)
        {
            return this.DB.Fetch<Data.Model.FailureView>(";EXEC FailureFilterReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8, @@forSections = @9, @@forStations = @10, @@forUsers = @11, @@forGearfaults = @12, @@forReports = @13, @@forSubGears = @14, @@forManufactures = @15, @@punctualityId = @16, @@stationTypeId = @17, @@forStationTypes = @18", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString(), request.PunctualityFilter.HasValue ? request.PunctualityFilter : -1, request.StationTypeFilter, request.StationTypes.ToFilterCSV().ToString()).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
        }

        public List<AssetManager.Models.FailureView> GetFailureCauses(FailureCauseFilterRequest request)
        {
            return this.DB.Fetch<Data.Model.FailureView>(";EXEC FailureFilterCauseReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8,  @@causeId = @9,  @@subCauseId = @10, @@forSections = @11, @@forStations = @12, @@forUsers = @13, @@forGearfaults = @14, @@forReports = @15, @@forSubGears = @16, @@forManufactures = @17, @@forCauses = @18, @@forSubCauses = @19, @@stationTypeId = @20, @@forStationTypes = @21", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.CauseFilter, request.SubCauseFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString(), request.Causes.ToFilterCSV().ToString(), request.SubCauses.ToFilterCSV().ToString(), request.StationTypeFilter, request.StationTypes.ToFilterCSV().ToString()).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
        }

        public List<AssetManager.Models.FailureView> GetFailureReport(FailureFilterRequest request)
        {
            var data = this.DB.Fetch<Data.Model.FailureView>(";EXEC FailureFilterReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8, @@forSections = @9, @@forStations = @10, @@forUsers = @11, @@forGearfaults = @12, @@forReports = @13, @@forSubGears = @14, @@forManufactures = @15, @@punctualityId = @16, @@stationTypeId = @17, @@forStationTypes = @18", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString(), request.PunctualityFilter.HasValue ? request.PunctualityFilter : -1, request.StationTypeFilter, request.StationTypes.ToFilterCSV().ToString()).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
            //var data = this.DB.Fetch<Data.Model.FailureView>(";EXEC FailureReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
            if (request.TimeOfOccurenceOrder != AssetManager.Models.SortOrder.None || request.TotalTimeOrder != AssetManager.Models.SortOrder.None)
            {
                if (request.TotalTimeOrder == AssetManager.Models.SortOrder.Asc)
                {
                    return data.OrderBy(s => s.TotalDuration).ToList();
                }
                if (request.TotalTimeOrder == AssetManager.Models.SortOrder.Desc)
                {
                    return data.OrderByDescending(s => s.TotalDuration).ToList();
                }
                if (request.TimeOfOccurenceOrder == AssetManager.Models.SortOrder.Asc)
                {
                    return data.OrderBy(s => s.TimeOfOccurance).ToList();
                }
                if (request.TimeOfOccurenceOrder == AssetManager.Models.SortOrder.Desc)
                {
                    return data.OrderByDescending(s => s.TimeOfOccurance).ToList();
                }
            }

            return data;
        }
        
        public List<AssetManager.Models.FailureView> GetFailureCauseReport(FailureCauseFilterRequest request)
        {
            var data = this.DB.Fetch<Data.Model.FailureView>(";EXEC FailureFilterCauseReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8,  @@causeId = @9,  @@subCauseId = @10, @@forSections = @11, @@forStations = @12, @@forUsers = @13, @@forGearfaults = @14, @@forReports = @15, @@forSubGears = @16, @@forManufactures = @17, @@forCauses = @18, @@forSubCauses = @19, @@stationTypeId = @20, @@forStationTypes = @21", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.CauseFilter, request.SubCauseFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString(), request.Causes.ToFilterCSV().ToString(), request.SubCauses.ToFilterCSV().ToString(), request.StationTypeFilter, request.StationTypes.ToFilterCSV().ToString()).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
            //var data = this.DB.Fetch<Data.Model.FailureView>(";EXEC FailureReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter).MapCollectionTo<Data.Model.FailureView, AssetManager.Models.FailureView>().ToList();
            if (request.TimeOfOccurenceOrder != AssetManager.Models.SortOrder.None || request.TotalTimeOrder != AssetManager.Models.SortOrder.None)
            {
                if (request.TotalTimeOrder == AssetManager.Models.SortOrder.Asc)
                {
                    return data.OrderBy(s => s.TotalDuration).ToList();
                }
                if (request.TotalTimeOrder == AssetManager.Models.SortOrder.Desc)
                {
                    return data.OrderByDescending(s => s.TotalDuration).ToList();
                }
                if (request.TimeOfOccurenceOrder == AssetManager.Models.SortOrder.Asc)
                {
                    return data.OrderBy(s => s.TimeOfOccurance).ToList();
                }
                if (request.TimeOfOccurenceOrder == AssetManager.Models.SortOrder.Desc)
                {
                    return data.OrderByDescending(s => s.TimeOfOccurance).ToList();
                }
            }

            return data;
        }
        public dynamic GetCostStats()
         {
             var date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
             var lastMonthDate = date.AddMonths(-1).Date;
             var toDayChargbleCount = this.DB.ExecuteScalar<int>("SELECT COUNT(*) from Failure where IsDeleted = @1 and FailureChargeable=1 and cast(TimeOfOccurance as Date) = @0", date.Date, false);
             var toDayNonChargbleCount = this.DB.ExecuteScalar<int>("SELECT COUNT(*) from Failure where  IsDeleted = @1 and FailureChargeable=0 and cast(TimeOfOccurance as Date) = @0", date.Date, false);
             var lastMonthChargbleCount = this.DB.ExecuteScalar<int>("SELECT COUNT(*) from Failure where  IsDeleted = @2 and FailureChargeable=1 and MONTH(TimeOfOccurance) = @0 and YEAR(TimeOfOccurance) = @1", lastMonthDate.Month, lastMonthDate.Year, false);
             var lastMonthNonChargbleCount = this.DB.ExecuteScalar<int>("SELECT COUNT(*) from Failure where  IsDeleted = @2 and FailureChargeable=0 and MONTH(TimeOfOccurance) = @0 and YEAR(TimeOfOccurance) = @1", lastMonthDate.Month, lastMonthDate.Year, false);
             var thisMonthChargbleCount = this.DB.ExecuteScalar<int>("SELECT COUNT(*) from Failure where  IsDeleted = @2 and FailureChargeable=1 and MONTH(TimeOfOccurance) = @0 and YEAR(TimeOfOccurance) = @1", date.Month, date.Year, false);
             var thisMonthNonChargbleCount = this.DB.ExecuteScalar<int>("SELECT COUNT(*) from Failure where IsDeleted = @2 and FailureChargeable=0 and MONTH(TimeOfOccurance) = @0 and YEAR(TimeOfOccurance) = @1", date.Month, date.Year, false);
             return new
             {
                 toDayChargbleCount = toDayChargbleCount,
                 toDayNonChargbleCount = toDayNonChargbleCount,
                 lastMonthChargbleCount = lastMonthChargbleCount,
                 lastMonthNonChargbleCount = lastMonthNonChargbleCount,
                 thisMonthChargbleCount = thisMonthChargbleCount,
                 thisMonthNonChargbleCount = thisMonthNonChargbleCount
             };

         }
         
         public dynamic GetGearFaultStats()
         {
             var date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
             var lastMonthDate = date.AddMonths(-1).Date;
             var toDayStats = this.DB.Fetch<dynamic>("select GearFaultId, GEARFAULT, FAILURECOUNT = count(*) from FailureView where Cast(TimeOfOccurance as Date) = @0 GROUP by GearFaultId, GearFault", date.Date)
                    .ToDictionary(c => (string)c.GEARFAULT, c => new { id = (int)c.GearFaultId, count = (int)c.FAILURECOUNT });
             var lastMonthStats = this.DB.Fetch<dynamic>("select GearFaultId, GEARFAULT, FAILURECOUNT = count(*) from FailureView where MONTH(TimeOfOccurance) = @0 and YEAR(TimeOfOccurance) = @1 GROUP by GearFaultId, GearFault", lastMonthDate.Month, lastMonthDate.Year)
                 .ToDictionary(c => (string)c.GEARFAULT, c => new { id = (int)c.GearFaultId, count = (int)c.FAILURECOUNT });
            var thisMonthStats = this.DB.Fetch<dynamic>("select GearFaultId, GEARFAULT, FAILURECOUNT = count(*) from FailureView where MONTH(TimeOfOccurance) = @0 and YEAR(TimeOfOccurance) = @1 GROUP by GearFaultId, GearFault", date.Month, date.Year)
                 .ToDictionary(c => (string)c.GEARFAULT, c => new { id = (int)c.GearFaultId, count = (int)c.FAILURECOUNT });
            return new 
             {
                 toDayStats = toDayStats,
                 lastMonthStats = lastMonthStats,
                 thisMonthStats = thisMonthStats
             };
         }

        public List<ReportCompareStats> GetCompareStats(CompareStatsFilterRequest request)
        {
            var result = new List<ReportCompareStats>();
            if (request.CompareReportType == AssetManager.Models.CompareReportType.GearAtFault)
            {
                var data1 = this.DB.Fetch<dynamic>(";EXEC GearFaultCountFilterReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8, @@forSections = @9, @@forStations = @10, @@forUsers = @11, @@forGearfaults = @12, @@forReports = @13, @@forSubGears = @14, @@forManufactures = @15", request.FromDate1.Date, request.ToDate1.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString()).ToDictionary(c => (int)c.GEARFAULTID, c => (int)c.FAILURECOUNT);
                var data2 = this.DB.Fetch<dynamic>(";EXEC GearFaultCountFilterReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8, @@forSections = @9, @@forStations = @10, @@forUsers = @11, @@forGearfaults = @12, @@forReports = @13, @@forSubGears = @14, @@forManufactures = @15", request.FromDate2.Date, request.ToDate2.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString()).ToDictionary(c => (int)c.GEARFAULTID, c => (int)c.FAILURECOUNT);
                var gearFaults = this.DB.Fetch<Data.Model.GearFault>(string.Empty);
                gearFaults.ForEach(gear =>
                {
                    result.Add(new ReportCompareStats() { Title = gear.Name.ToUpper(), Range1Count = data1.ContainsKey(gear.Id) ? data1[gear.Id] : 0, Range2Count = data2.ContainsKey(gear.Id) ? data2[gear.Id] : 0 });
                });
            }
            else
            {
                var data1 = this.DB.Fetch<dynamic>(";EXEC ReportedCountReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6", request.FromDate1.Date, request.ToDate1.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter).ToDictionary(c => (int)c.REPORTEDID, c => (int)c.FAILURECOUNT);
                var data2 = this.DB.Fetch<dynamic>(";EXEC ReportedCountReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6", request.FromDate2.Date, request.ToDate2.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter).ToDictionary(c => (int)c.REPORTEDID, c => (int)c.FAILURECOUNT);
                var reported = this.DB.Fetch<Data.Model.Reported>(string.Empty);
                reported.ForEach(gear =>
                {
                    result.Add(new ReportCompareStats() { Title = gear.Name.ToUpper(), Range1Count = data1.ContainsKey(gear.Id) ? data1[gear.Id] : 0, Range2Count = data2.ContainsKey(gear.Id) ? data2[gear.Id] : 0 });
                });
            }

            var totals = new ReportCompareStats() { Title = "Totals", Range1Count = result.Sum(s => s.Range1Count), Range2Count = result.Sum(s => s.Range2Count) };
            result.Add(totals);
            return result;
        }

        public List<StationSummaryStats> GetStationSummaryStats(StationSummaryStatsFilterRequest request)
        {
            var result = new List<StationSummaryStats>();
            var data1 = this.DB.Fetch<StationStatsModel>(";EXEC StationSummaryFilterReport @@startDate = @0, @@endDate = @1, @@sectionId = @2, @@stationId = @3, @@userId = @4, @@gearfaultId = @5, @@reportedId = @6, @@subGearfaultId =@7, @@manufactureId = @8, @@forSections = @9, @@forStations = @10, @@forUsers = @11, @@forGearfaults = @12, @@forReports = @13, @@forSubGears = @14, @@forManufactures = @15", request.FromDate.Date, request.ToDate.Date, request.SectionFilter, request.StationFilter, request.UserFilter, request.GearAtFaultFilter, request.ReportedFilter, request.SubGearAtFaultFilter, request.ManufactureFilter, request.Sections.ToFilterCSV().ToString(), request.Stations.ToFilterCSV().ToString(), request.Users.ToFilterCSV().ToString(), request.Gears.ToFilterCSV().ToString(), request.Reporteds.ToFilterCSV().ToString(), request.SubGears.ToFilterCSV().ToString(), request.Manufatures.ToFilterCSV().ToString()).ToList();
            var stats = data1.GroupBy(s => s.StationId).ToDictionary(failures => failures.Key, failures => failures.ToList());
            var stations = this.DB.Fetch<Data.Model.Station>(string.Empty);
            var gearFalts = new List<Data.Model.GearFault>();
            if (request.GearAtFaultFilter == 0)
            {
                gearFalts = this.DB.Fetch<Data.Model.GearFault>(string.Empty);
            }
            else
            {
                gearFalts = this.DB.Fetch<Data.Model.GearFault>("Where id in (" + request.Gears.ToFilterCSV() + ")");
            }


            if (request.StationFilter != 0)
            {
                stations = stations.Where(s => request.Stations.Any(fs => fs == s.Id)).ToList();
            }
            else if (request.UserFilter != 0)
            {
                stations = stations.Where(s => request.Users.Contains(s.ASTEId ?? 0)  || request.Users.Contains(s.CSEId ?? 0)|| request.Users.Contains(s.JEId?? 0) || request.Users.Contains(s.ESMId ?? 0)).ToList();
            }
            else if (request.SectionFilter != 0)
            {
                stations = stations.Where(s => request.Sections.Contains(s.SectionId ?? 0)).ToList();
            }


            stations.ForEach(station =>
            {
                var data = new StationSummaryStats() { StationId = station.Id, StationName = station.Name };
                if (stats.ContainsKey(station.Id))
                {
                    stats[station.Id].ForEach(item =>
                    {
                        data.StatsItems.Add(new StatsItem() { Id = item.GearFaultId, Count = item.FailureCount, Name = item.GearFault });
                    });
                }

                if (!result.Any())
                {
                    var addedGearFaults = data.StatsItems.ToDictionary(item => item.Id);
                    gearFalts.ForEach(gear => 
                    {
                        if (!addedGearFaults.ContainsKey(gear.Id))
                        {
                            data.StatsItems.Add(new StatsItem() { Id = gear.Id, Name = gear.Name });
                        }
                    });
                }
                result.Add(data);
            });

            return result;
        }


        /// <summary>
        /// Exports the poll result report.
        /// </summary>
        /// <param name="poll">The poll.</param>
        /// <param name="pollResponse">The poll response.</param>
        /// <param name="workSheetName">Name of the work sheet.</param>
        /// <returns>
        /// excel byte array
        /// </returns>
        public byte[] GetFailureExportReport(IEnumerable<AssetManager.Models.FailureView> failures, string workSheetName)
        {
            var textCenterBold = new SLStyle() { Alignment = new SLAlignment() { Horizontal = HorizontalAlignmentValues.Center, Vertical = VerticalAlignmentValues.Center }, Font = { Bold = true } };
            var textCenter = new SLStyle() { Alignment = { Horizontal = HorizontalAlignmentValues.Center, Vertical = VerticalAlignmentValues.Center } };
            var textLeft = new SLStyle() { Alignment = { Horizontal = HorizontalAlignmentValues.Left } };
            var headColoumnStyle = new SLStyle() { Font = { FontSize = 12 } };
            SLStyle highlightStyle = new SLStyle() { Font = { FontSize = 12, Bold = true } };
            highlightStyle.SetWrapText(true);
            highlightStyle.SetLeftBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            highlightStyle.SetTopBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            highlightStyle.SetRightBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            highlightStyle.SetBottomBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            textCenter.SetLeftBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            textCenter.SetTopBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            textCenter.SetRightBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            textCenter.SetBottomBorder(BorderStyleValues.Thin, System.Drawing.Color.Gray);
            textCenter.SetWrapText(true);
            highlightStyle.Alignment.Horizontal = HorizontalAlignmentValues.Center;
            highlightStyle.Alignment.Vertical = VerticalAlignmentValues.Center;
            MemoryStream memoryStream = new MemoryStream();

            using (SLDocument document = new SLDocument())
            {
                var currentSheetName = document.GetCurrentWorksheetName();
                document.RenameWorksheet(currentSheetName, workSheetName);

                document.SetCellValue(1, 1, string.Format("SFR Report {0}", DateTime.Now.ToString("dd/MM/yyyy")));
                document.SetCellStyle(1, 1, textCenterBold);
                document.MergeWorksheetCells(1, 1, 1, 16);

                document.SetCellValue(2, 1, "SL");
                document.SetColumnWidth(1, 4);
                document.SetColumnWidth(2, 4);
                document.SetColumnWidth(3, 3.84);
                document.SetColumnWidth(4, 8);
                document.SetColumnWidth(5, 8);
                document.SetColumnWidth(6, 8);
                document.SetColumnWidth(7, 8);
                document.SetColumnWidth(8, 19.84);
                document.SetColumnWidth(9, 10);
                document.SetColumnWidth(10, 10);
                document.SetColumnWidth(11, 9.75);
                document.SetColumnWidth(12, 11);
                document.SetColumnWidth(13, 9);
                document.SetColumnWidth(14, 11);
                document.SetColumnWidth(15, 9);
                document.SetColumnWidth(16, 8.75);
                //document.SetColumnWidth(17, 8.75);

                document.SetCellValue(2, 2, "SFRNo");
                document.SetCellValue(2, 3, "Reported");
                document.SetCellValue(2, 4, "Chargeable / Non Chargeable");
                document.SetCellValue(2, 5, "Station");
                document.SetCellValue(2, 6, "Gear at Fault");
                document.SetCellValue(2, 7, "Sub Gear at Fault");
                document.SetCellValue(2, 8, "Brief Description");
                document.SetCellValue(2, 9, "Cause of Failure");
                document.SetCellValue(2, 10, "Sub Cause of Failure");
                //document.SetCellValue(1, 7, "Train Loss Punctuality");
                document.SetCellValue(2, 11, "Train Detained");
                //document.SetCellValue(1, 9, "Failure Chargeable");
                //document.SetCellValue(1, 8, "Department");
                document.SetCellValue(2, 12, "Time of Occ urrence");
                document.SetCellValue(2, 13, "Time Signal Main In formed");
                document.SetCellValue(2, 14, "Time Signal Main Reached");
                document.SetCellValue(2, 15, "Time Rectified");
                document.SetCellValue(2, 16, "Dur ation");
                //document.SetCellValue(2, 17, "Last Visit");
                var pageSettings = document.GetPageSettings();
                pageSettings.ScalePage(95);
                pageSettings.PaperSize = SLPaperSizeValues.A4Paper;
                pageSettings.Orientation = OrientationValues.Landscape;
                pageSettings.HeaderMargin = 0.3;
                pageSettings.TopMargin = 0.2;
                pageSettings.BottomMargin = 0.2;
                pageSettings.LeftMargin = 0.2;
                pageSettings.RightMargin = 0.2;
                pageSettings.FooterMargin = 0.3;
                pageSettings.OddFooterText = "Designed and Developded by Krishna Infotech";
                pageSettings.AppendOddFooter(SLHeaderFooterFormatCodeValues.Right);
                document.SetPageSettings(pageSettings);

                document.SetCellStyle(2, 1, 2, 16, highlightStyle);

                int lastActiveRow = 3;

                failures.ForEach(failure =>
                {
                    document.SetCellValue(lastActiveRow, 1, lastActiveRow -2);
                    document.SetCellValue(lastActiveRow, 2, failure.SFRNo);
                    document.SetCellValue(lastActiveRow, 3, failure.Reported);
                    document.SetCellValue(lastActiveRow, 4, failure.FailureChargeable ? "Yes" : "No");
                    document.SetCellValue(lastActiveRow, 5, failure.Station);
                    document.SetCellValue(lastActiveRow, 6, failure.GearFault);
                    document.SetCellValue(lastActiveRow, 7, failure.SubGearFault);
                    document.SetCellValue(lastActiveRow, 8, $"{failure.Description} ---- SSE:{failure.SSELastVisitOn.ToString()} JE:{failure.JELastVisitOn.ToString()} ESM: {failure.ESMLastVisitOn.ToString()}");
                    document.SetCellValue(lastActiveRow, 9, failure.CauseOfFailureValue);
                    document.SetCellValue(lastActiveRow, 10, failure.SubCauseOfFailureValue);
                    document.SetCellValue(lastActiveRow, 11, failure.TrainDetained);
                    document.SetCellValue(lastActiveRow, 12, failure.TimeOfOccurance.ToString());
                    document.SetCellValue(lastActiveRow, 13, failure.TimeSignalMainInformed.ToString());
                    document.SetCellValue(lastActiveRow, 14, failure.TimeSignalMainReached.ToString());
                    document.SetCellValue(lastActiveRow, 15, failure.TimeRectified.ToString());
                    document.SetCellValue(lastActiveRow, 16, failure.TotalDuration.HasValue ? Math.Round(TimeSpan.FromHours(failure.TotalDuration.Value).TotalMinutes).ToString() : string.Empty);
                    lastActiveRow++;
                });

                document.SetCellStyle(3, 1, lastActiveRow, 16, textCenter);
                var footerIndex = failures.Count() + 6;
                document.SetCellValue(footerIndex, 1, string.Format("Generated on {0}", DateTime.Now.ToString("dd/MM/yyyy")));
                document.MergeWorksheetCells(footerIndex, 1, footerIndex, 3);
                document.SetCellValue(footerIndex, 4, "This report is generated by SFR Software");
                document.MergeWorksheetCells(footerIndex, 4, footerIndex, 9);
                document.SaveAs(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
