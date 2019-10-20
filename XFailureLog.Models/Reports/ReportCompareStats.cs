using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    /// <summary>
    /// Represents Report Compare stats.
    /// </summary>
    public class ReportCompareStats 
    {
        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        /// <value>
        /// The title.
        /// </value>
        public string  Title { get; set; }

        /// <summary>
        /// Gets or sets the range1 count.
        /// </summary>
        /// <value>
        /// The range1 count.
        /// </value>
        public int Range1Count { get; set; }

        /// <summary>
        /// Gets or sets the range2 count.
        /// </summary>
        /// <value>
        /// The range2 count.
        /// </value>
        public int Range2Count { get; set; }

        /// <summary>
        /// To the data table.
        /// </summary>
        /// <param name="records">The records.</param>
        /// <returns>
        /// the report data table.
        /// </returns>
        public DataTable ToDataTable(List<ReportCompareStats> records, CompareStatsRequest request)
        {
            DataTable dt = new DataTable("Failure Comparision Report");
            switch(request.CompareReportType)
            {
                case CompareReportType.GearAtFault:
                    dt.Columns.Add(new DataColumn("Gear At Fault"));
                    break; ;
                case CompareReportType.Reported:
                    dt.Columns.Add(new DataColumn("Reported"));
                    break;
            }

            //dt.Columns.Add(new DataColumn("Station2", typeof(int)));
            //dt.Columns.Add(new DataColumn("Station1", typeof(int)));

            dt.Columns.Add(new DataColumn(string.Format("Count From {0} To {1} ", request.FromDate1.ToString("dd MMM yy"), request.ToDate1.ToString("dd MMM yy")), typeof(int)));
            dt.Columns.Add(new DataColumn(string.Format("Count From {0} To {1} ", request.FromDate2.ToString("dd MMM yy"), request.ToDate2.ToString("dd MMM yy")), typeof(int)));


            foreach (ReportCompareStats record in records)
            {
                dt.Rows.Add(
                        record.Title,
                        record.Range1Count,
                        record.Range2Count);
            }

            return dt;
        }
    }
}
