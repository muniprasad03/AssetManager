using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class TrackAssetMaintanence : AssetMaintanence
    {
        public override AssetType AssetType => AssetType.TrackCircuit;

        public TrackAssetMaintanenceMetadata Metadata { get; set; }
    }
}
