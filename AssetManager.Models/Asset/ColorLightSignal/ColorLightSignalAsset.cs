using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset.ColorLightSignal
{
    public class ColorLightSignalAsset : Asset
    {
        public override AssetType AssetType => AssetType.ColourLightSignal;

        public ColorLightSignalMetadata Metadata { get; set; }
    }
}
