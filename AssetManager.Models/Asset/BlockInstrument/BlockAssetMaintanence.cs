using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class BlockAssetMaintanence : AssetMaintanence
    {
        public override AssetType AssetType => AssetType.BlockInstrument;

        public BlockAssetMaintanenceMetadata Metadata { get; set; }
    }
}
