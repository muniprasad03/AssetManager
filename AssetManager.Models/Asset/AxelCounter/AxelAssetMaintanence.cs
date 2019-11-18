using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class AxelAssetMaintanence : AssetMaintanence
    {
        public override AssetType AssetType => AssetType.AxelCounter;

        public AxelAssetMaintanenceMetadata Metadata { get; set; }
    }
}
