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

        public string LineType { get; set; }
        public string TurnOutType { get; set; }
        public string RailType { get; set; }
        public string LocationDistance { get; set; }
        public string TypeCurve { get; set; }

        public string HCurveType { get; set; }

        public string SleeperType { get; set; }

        public int? NoOfGaugeTiePlate { get; set; }

        public int? NoOfGaugeTiePlateInsulationsSets { get; set; }
        public int? NoOfWilliamStretcherBar { get; set; }
        public int? NoOfWilliamStretcherBarInsulationsSets { get; set; }
        public string PointMachineType { get; set; }

        public string Strock { get; set; }

        public string SpringSettingDevice { get; set; }

        public int? CodalLife { get; set; }

        public int? ACImmunisation { get; set; }

        public DateTime? GroundConnectionDateOfInstallation { get; set; }
        public string Remarks { get; set; }

        public List<AssetFileAttachment> Attachments { get; set; }
    }
}
