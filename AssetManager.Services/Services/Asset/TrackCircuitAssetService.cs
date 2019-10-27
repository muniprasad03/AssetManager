using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;
using AssetManager.Models;
using AssetManager.Models.Asset;
using PetaPoco;

namespace AssetManager.Services.Asset
{
    public class TrackCircuitAssetService : AssetService<TrackCircuitAsset>
    {
        public TrackCircuitAssetService(XAssetDB db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.TrackCircuit;

        public List<TrackCircuitAsset> GetSignalListView()
        {
            return base.GetAll();
        }
    }
}
