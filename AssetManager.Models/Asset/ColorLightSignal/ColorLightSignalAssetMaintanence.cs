using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset.ColorLightSignal
{
    public class ColorLightSignalAssetMaintanence : AssetMaintanence
    {
        public override AssetType AssetType => AssetType.ColourLightSignal;

        public ColorLightSignalMaintanenceMetadata Metadata { get; set; }
    }
}
