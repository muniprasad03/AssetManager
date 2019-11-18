using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class PointAssetMaintanence : AssetMaintanence
    {
        public override AssetType AssetType => AssetType.BlockInstrument;

        public PointAssetMaintanenceMetadata Metadata { get; set; }
    }
}
