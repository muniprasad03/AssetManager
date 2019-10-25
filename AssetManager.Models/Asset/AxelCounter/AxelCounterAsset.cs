using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class AxelCounterAsset : Asset
    {
        public override AssetType AssetType => AssetType.AxelCounter;

        public AxelCounterMetadata Metadata { get; set; }
    }
}
