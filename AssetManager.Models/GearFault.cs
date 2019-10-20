using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class GearFault
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class StationGearFailureView : GearFault
    {
        public int StationId { get; set; }
        public int Failures { get; set; }
         public string Station { get; set; }
    }
}
