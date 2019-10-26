using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class AxelCounterMetadata
    {
        public AxelType AxelType { get; set; }

        public string SerialNumber { get; set; }
        public float CodalLife { get; set; }
        public float MilegeInKM { get; set; }

        public string Remarks { get; set; }

        public List<AssetFileAttachment> Attachments { get; set; }
    }
}
