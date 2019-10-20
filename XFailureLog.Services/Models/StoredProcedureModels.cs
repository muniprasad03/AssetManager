using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class StationStatsModel
    {
        public int StationId { get; set; }
        public int GearFaultId { get; set; }
        public string Station { get; set; }
        public string GearFault { get; set; }
        public int FailureCount { get; set; }
    }
}
