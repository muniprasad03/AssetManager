using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class BlockRequest
    {
        public int Id { get; set; }
        public int  SectionId { get; set; }
        public int BoardId { get; set; }
        public int DepartmentId { get; set; }
        public double? RequestDuration { get; set; }
        public double? AllowedDuration { get; set; }
        public BlockDirection Direction { get; set; }
        public string Description { get; set; }
        public int? NumberOfBlocks { get; set; }
        public DateTime? RquestedOn { get; set; }
        public DateTime? VerifiedOn { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
        public int VerifiedBy { get; set; }
        public int RequestedBy { get; set; }
        public DateTime? RequestDate { get; set; }
        public DateTime? AllowedDate { get; set; }
        public List<BlockTime> AllowedTimings { get; set; }
    }

    public class BlockTime
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }

    public class BlockRequestView : BlockRequest
    {
        public string SectionName { get; set; }
        public string BoardName { get; set; }
        public string DepartmentName { get; set; }
        public string RequestedByName { get; set; }
        public string VerifiedByName { get; set; }
    }
}
