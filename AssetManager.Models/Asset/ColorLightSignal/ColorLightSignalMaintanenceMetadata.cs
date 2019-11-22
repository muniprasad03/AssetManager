using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset.ColorLightSignal
{
    public class ColorLightSignalMaintanenceMetadata
    {
        public bool CleanSignal { get; set; }

        public SMCData SMCData { get; set; }

        public RecordBook RecordBook { get; set; }
    }

    public class SMCData
    {
        public MaintanenceType MaintanenceType { get; set; }
        public string Aspect { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string AspectNumber { get; set; }
        public string Version { get; set; }
        public string AspectColor { get; set; }
        public string SerialNumber { get; set; }
        public DateTime? DateOfManufacture { get; set; }
        public DateTime? DateOfInstallation { get; set; }
        public string LifeInMonths { get; set; }
        public string MidlifeRehabilation { get; set; }
        public string Remarks { get; set; }
    }

    public class RecordBook
    {
        public string RGVoltage { get; set; }
        public string DGVoltage { get; set; }
        public string HGVoltage { get; set; }
        public string HHGVoltage { get; set; }
        public string COGVoltage { get; set; }
        public string AMarker { get; set; }
        public string AGMarker { get; set; }
        public string CMarker { get; set; }
        public string RouteIndicator { get; set; }
        public string Schedule { get; set; }
        public string Remarks { get; set; }
        public bool Faulty { get; set; }
    }

    public enum MaintanenceType
    {
        Installation,
        Replacement,
        Remove
    }
}
