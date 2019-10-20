using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Reports
{
    /// <summary>
    /// This attribute is used to ignore properties on search while exporting records.
    /// </summary>
    /// <seealso cref="System.Attribute" />
    public class IgnoreOnSearchAttribute : Attribute
    {
        /// <summary>
        /// Gets or sets a value indicating whether [ignore on search].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [ignore on search]; otherwise, <c>false</c>.
        /// </value>
        public bool IgnoreOnSearch { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="IgnoreOnSearchAttribute"/> class.
        /// </summary>
        public IgnoreOnSearchAttribute()
        {
            this.IgnoreOnSearch = true;
        }
    }
}
