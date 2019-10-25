using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class BlockInstrumentAsset : Asset
    {
        public override AssetType AssetType => AssetType.BlockInstrument;

        public BlockInstrumentMetadata Metadata { get; set; }
    }
}
