using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class CauseOfFailure
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int SubGearId { get; set; }
    }

    public class SubCauseOfFailure
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int CauseOfFailureId { get; set; }
    }
}
