using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    public class FailureReportRequest : ExportReportRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int SectionFilter { get; set; }
        public int StationFilter { get; set; }
        public int StationTypeFilter { get; set; }
        public int ReportedFilter { get; set; }
        public int UserFilter { get; set; }
        public int GearAtFaultFilter { get; set; }
        public int SubGearAtFaultFilter { get; set; }
        public int ManufactureFilter { get; set; }
        public int? PunctualityFilter { get; set; }

        public SortOrder TimeOfOccurenceOrder { get; set; }
        public SortOrder TotalTimeOrder { get; set; }

    }

    public class FailureFilterRequest : FailureReportRequest
    {
        public List<int> Sections { get; set; }
        public List<int> Stations { get; set; }
        public List<int> Reporteds { get; set; }
        public List<int> StationTypes { get; set; }

        public List<int> Users { get; set; }
        public List<int> Gears { get; set; }
        public List<int> SubGears { get; set; }
        public List<int> Manufatures { get; set; }

        public FailureFilterRequest()
        {
            this.Sections = new List<int>();
            this.Stations = new List<int>();
            this.StationTypes = new List<int>();
            this.Reporteds = new List<int>();
            this.Gears = new List<int>();
            this.SubGears = new List<int>();
            this.Users = new List<int>();
            this.Manufatures = new List<int>();
        }
    }

    public class FailureCauseFilterRequest : FailureFilterRequest
    {
        public FailureCauseFilterRequest()
        {
            this.Causes = new List<int>();
            this.SubCauses = new List<int>();
        }

        public int CauseFilter { get; set; }
        public int SubCauseFilter { get; set; }
        public List<int> Causes { get; set; }
         public List<int> SubCauses { get; set; }
    }
}
