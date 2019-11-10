using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset.ColorLightSignal
{
    public class ColorLightSignalMetadata
    {
        public string SignalType { get; set; }

        public string SubsidiaryType { get; set; }

        public string TypeOfUnit { get; set; }

        public string SerialNumber { get; set; }

        public float? MilegeInKM { get; set; }

        public string Location { get; set; }

        public string Implantation { get; set; }

        public string SacrificialMast { get; set; }

        public float? CodalLife { get; set; }

        public DateTime SignalBaseInstallation { get; set; }

        public DateTime SignalPostInstallation { get; set; }

        public string Remarks { get; set; }

        public List<AssetFileAttachment> Attachments { get; set; }
    }
}
