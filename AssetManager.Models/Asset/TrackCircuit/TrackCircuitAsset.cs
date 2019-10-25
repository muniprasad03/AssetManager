using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class TrackCircuitAsset : Asset
    {
        public override AssetType AssetType => AssetType.TrackCircuit;

        public TrackCircuitMetadata Metadata { get; set; }
    }
}
