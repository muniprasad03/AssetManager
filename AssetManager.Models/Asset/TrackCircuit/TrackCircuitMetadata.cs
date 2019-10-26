using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class TrackCircuitMetadata
    {
        public int CodalLife { get; set; }
        public string SerialNumber { get; set; }

        public DetectionDeviceType DetectionDeviceType { get; set; }

        public string Make { get; set; }
        public RedundancyType RedundancyType { get; set; }
        public TCLineType TCLineType { get; set; }
        public string Platform { get; set; }
        public string TCLength { get; set; }
        public float TCLocationFromRelayEnd { get; set; }
        public float TCLocationBxJumperLocation1 { get; set; }
        public float TCLocationBxJumperLocation2 { get; set; }
        public float TCLocationBxJumperLocation3 { get; set; }
        public float TCLocationFromFeedEnd { get; set; }
        public bool FmFm { get; set; }
        public bool FmBSLSt { get; set; }
        public bool FmBSLTO { get; set; }
        public bool FmHomeStraight { get; set; }
        public bool FmHomeTO { get; set; }
        public bool LoopLine { get; set; }
        public bool Sliding { get; set; }
        public bool OtherGoodsLine { get; set; }

        public int LoopLineNo { get; set; }
        public int SlidingNo { get; set; }
        public int OtherGoodsNo { get; set; }

        public string Remarks { get; set; }

        public List<AssetFileAttachment> Attachments { get; set; }
    }
}
