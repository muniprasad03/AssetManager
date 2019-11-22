using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class PointAssetMaintanenceMetadata
    {
        public bool IsRustFree { get; set; }
        public bool IsPointChairsOiled { get; set; }
        public bool IsPointGearsOiled { get; set; }
        public bool SwitchSetting { get; set; }
        public bool IsObservationTest { get; set; }
        public bool SSDCondition { get; set; }
        public PointSMCData NRSMCData { get; set; }
        public PointSMCData RNSMCData { get; set; }
    }

    public class PointSMCData
    {
        public string MotorMake { get; set; }
        public string MotorSerialNumber { get; set; }
        public DateTime? DateOfManufacture { get; set; }
        public DateTime? DateOfInstallation { get; set; }
        public string PeakLoad { get; set; }
        public string NormalLoad { get; set; }
        public string ObstructionLoad { get; set; }
        public string VoltageObstruction { get; set; }
        public string VoltageNormal { get; set; }
        public string WJRTiming { get; set; }
        public string OperationFrom { get; set; }
        public string OperationTo { get; set; }
        public string Remarks { get; set; }
    }
}
