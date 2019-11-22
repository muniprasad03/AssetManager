using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class AxelAssetMaintanenceMetadata
    {
        public bool OutDoor { get; set; }
        public bool PackingCondition { get; set; }
        public bool ConnectedEquipmentCondition { get; set; }
        public bool ElectricalCondition { get; set; }
        public RecordBook RecordBook { get; set; }
    }

    public class RecordBook
    {
        public string ChannelType { get; set; }
        public string DCInputVoltage { get; set; }
        public string OSCVoltage { get; set; }
        public string Frequency { get; set; }
        public string Staggering { get; set; }
        public string ChInAChannel { get; set; }
        public string ChInADip { get; set; }
        public string ChInACrossLevel { get; set; }
        public string ChInBChannel { get; set; }
        public string ChInBDip { get; set; }
        public string ChInBCrossLevel { get; set; }
        public string ChInCChannel { get; set; }
        public string ChInCDip { get; set; }
        public string ChInCCrossLevel { get; set; }
        public string ChInDChannel { get; set; }
        public string ChInDDip { get; set; }
        public string ChInDCrossLevel { get; set; }
        public string ChOutAChannel { get; set; }
        public string ChOutADip { get; set; }
        public string ChOutACrossLevel { get; set; }
        public string ChOutBChannel { get; set; }
        public string ChOutBDip { get; set; }
        public string ChOutBCrossLevel { get; set; }
        public string ChOutCChannel { get; set; }
        public string ChOutCDip { get; set; }
        public string ChOutCCrossLevel { get; set; }
        public string ChOutDChannel { get; set; }
        public string ChOutDDip { get; set; }
        public string ChOutDCrossLevel { get; set; }
        public string Remarks { get; set; }
    }
}
