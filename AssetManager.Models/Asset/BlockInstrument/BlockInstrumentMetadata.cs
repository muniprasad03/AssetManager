using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class BlockInstrumentMetadata
    {
        public int? CodalLife { get; set; }
        public string SerialNumber { get; set; }
        public string Type { get; set; }
        public string IdentifierName { get; set; }
        public string Location { get; set; }
        public string LocationDistance { get; set; }
        public float? InternalSupply { get; set; }
        public float? ExternalSupply { get; set; }
        public float? LineSupply { get; set; }
        public float? InternalCurrent { get; set; }
        public float? ExternalCurrent { get; set; }
        public float? LineCurrent { get; set; }
        public string OperatingRange { get; set; }
        public string OverallDimension { get; set; }
        public string Weight { get; set; }
        public string Remarks { get; set; }
        public DateTime? Overhauling { get; set; }
        public List<AssetFileAttachment> Attachments { get; set; }
    }
}
