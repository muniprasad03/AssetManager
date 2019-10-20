using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    public class StationSummaryStats
    {
        public StationSummaryStats()
        {
            this.StatsItems = new List<StatsItem>();
        }
        public int StationId { get; set; }
        public string StationName { get; set; }

        public List<StatsItem> StatsItems { get; set; }

        public int Total { get { return this.StatsItems.Sum(s => s.Count); } }

        /// <summary>
        /// To the data table.
        /// </summary>
        /// <param name="records">The records.</param>
        /// <returns>
        /// the report data table.
        /// </returns>
        public DataTable ToDataTable(List<StationSummaryStats> records, StationSummaryStatsRequest request)
        {
            DataTable dt = new DataTable("Station Summary Report");

            dt.Columns.Add("Station");
            dt.Columns.Add("Total");
            var columnNames = new List<string>();
            columnNames.Add("Station");
            columnNames.Add("Total");
            foreach (StationSummaryStats record in records)
            {
                var row = dt.NewRow();
                row["Station"] = record.StationName;
                record.StatsItems.ForEach(item =>
                {
                    if (!columnNames.Contains(item.Name))
                    {
                        dt.Columns.Add(item.Name, typeof(int));
                        columnNames.Add(item.Name);
                    }

                    if (item.Count > 0)
                    {
                        row[item.Name] = item.Count;
                    }
                });


                row["Total"] = record.Total;
                dt.Rows.Add(row);
            }

            dt.SetColumnsOrder(columnNames);
            return dt;
        }
    }

    public class StatsItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
    }
}
