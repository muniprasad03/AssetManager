using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class PointMachineMetadata
    {
        public string SerialNumber { get; set; }

        public string Version { get; set; }

        public PointLineType LineType { get; set; }
        public TurnOutType TurnOutType { get; set; }
        public RailType RailType { get; set; }

        public TypeCurve TypeCurve { get; set; }

        public HCurveType HTypeCurve { get; set; }

        public SleeperType SleeperType { get; set; }

        public int NoOfGaugeTiePlate { get; set; }


        public string Remarks { get; set; }

        public List<AssetFileAttachment> Attachments { get; set; }
    }
}
