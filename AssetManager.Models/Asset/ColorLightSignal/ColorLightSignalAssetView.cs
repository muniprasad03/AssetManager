using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset.ColorLightSignal
{
    public class ColorLightSignalListView
    {
        public string SignalName { get; set; }

        public string Station { get; set; }

        public SignalType SignalType { get; set; }

        public DateTime DateOfInstallation { get; set; }

        public float MilegeInKM { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public string Implantation { get; set; }

        public SacrificialMast SacrificialMast { get; set; }

        public float CodalLife { get; set; }

        public string Remarks { get; set; }
    }
}
