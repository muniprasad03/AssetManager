using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    public interface IBaseReportView
    {
        /// <summary>
        /// To the data table.
        /// </summary>
        /// <param name="records">The records.</param>
        /// <returns>the report data table.</returns>
        DataTable ToDataTable(List<IBaseReportView> records);
    }
}
