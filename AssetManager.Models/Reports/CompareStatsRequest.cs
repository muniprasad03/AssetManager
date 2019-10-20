using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    /// <summary>
    /// Compare Stats Request
    /// </summary>
    public class CompareStatsRequest : ExportReportRequest
    {
        public DateTime FromDate1 { get; set; }
        public DateTime ToDate1 { get; set; }
        public DateTime FromDate2 { get; set; }
        public DateTime ToDate2 { get; set; }
        public int SectionFilter { get; set; }
        public int StationFilter { get; set; }
        public int SubGearAtFaultFilter { get; set; }
        public int ManufactureFilter { get; set; }
        public int ReportedFilter { get; set; }
        public int UserFilter { get; set; }
        public int GearAtFaultFilter { get; set; }

        public CompareReportType CompareReportType { get; set; }
    }


    public class CompareStatsFilterRequest : CompareStatsRequest
    {
        public List<int> Sections { get; set; }
        public List<int> Stations { get; set; }
        public List<int> Reporteds { get; set; }
        public List<int> Users { get; set; }
        public List<int> Gears { get; set; }
        public List<int> SubGears { get; set; }
        public List<int> Manufatures { get; set; }

        public CompareStatsFilterRequest()
        {
            this.Sections = new List<int>();
            this.Stations = new List<int>();
            this.Reporteds = new List<int>();
            this.Gears = new List<int>();
            this.SubGears = new List<int>();
            this.Users = new List<int>();
            this.Manufatures = new List<int>();
        }
    }

    public class StationSummaryStatsRequest : ExportReportRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int SectionFilter { get; set; }
        public int StationFilter { get; set; }
        public int ReportedFilter { get; set; }
        public int UserFilter { get; set; }
        public int GearAtFaultFilter { get; set; }
        public int SubGearAtFaultFilter { get; set; }
        public int ManufactureFilter { get; set; }

        public CompareReportType ReportType { get; set; }
    }

    public class StationSummaryStatsFilterRequest : StationSummaryStatsRequest
    {
        public List<int> Sections { get; set; }
        public List<int> Stations { get; set; }
        public List<int> Reporteds { get; set; }
        public List<int> Users { get; set; }
        public List<int> Gears { get; set; }
        public List<int> SubGears { get; set; }
        public List<int> Manufatures { get; set; }

        public StationSummaryStatsFilterRequest()
        {
            this.Sections = new List<int>();
            this.Stations = new List<int>();
            this.Reporteds = new List<int>();
            this.Gears = new List<int>();
            this.SubGears = new List<int>();
            this.Users = new List<int>();
            this.Manufatures = new List<int>();
        }
    }
}
