using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public static class Extensions
    {
        /// <summary>
        /// Sets the columns order.
        /// </summary>
        /// <param name="table">The table.</param>
        /// <param name="columnNames">The column names.</param>
        public static void SetColumnsOrder(this System.Data.DataTable table, IEnumerable<string> columnNames)
        {
            int columnIndex = 0;
            foreach (var columnName in columnNames)
            {
                var column = table.Columns[columnName];
                if (column != null)
                {
                    column.SetOrdinal(columnIndex);
                    columnIndex++;
                }
            }
        }
    }
}
