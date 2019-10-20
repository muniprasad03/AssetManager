using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    public class ExportReportRequest
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExportReportRequest"/> class.
        /// </summary>        
        public ExportReportRequest()
        {
            this.ShowPageLabels = false;
            this.PageOrientation = true;
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the format.
        /// </summary>
        /// <value>
        /// The format.
        /// </value>
        public string Format { get; set; }

        /// <summary>
        /// Gets or sets the search key.
        /// </summary>
        /// <value>
        /// The search key.
        /// </value>
        public string SearchKey { get; set; }

        /// <summary>
        /// Gets or sets the sheet header.
        /// </summary>
        /// <value>
        /// The sheet header.
        /// </value>
        [JsonIgnore]
        public string SheetHeader { get; set; }

        /// <summary>
        /// Gets or sets the name of the file.
        /// </summary>
        /// <value>
        /// The name of the file.
        /// </value>
        [JsonIgnore]
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [show page labels].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [show page labels]; otherwise, <c>false</c>.
        /// </value>
        [JsonIgnore]
        public bool ShowPageLabels { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [page orientation].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [page orientation]; otherwise, <c>false</c>.
        /// </value>
        [JsonIgnore]
        public bool PageOrientation { get; set; }

        /// <summary>
        /// Gets or sets the name of the sheet.
        /// </summary>
        /// <value>
        /// The name of the sheet.
        /// </value>
        [JsonIgnore]
        public string SheetName { get; set; }
    }
}
