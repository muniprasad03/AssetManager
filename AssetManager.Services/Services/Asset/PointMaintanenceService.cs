using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;
using AssetManager.Models;
using AssetManager.Models.Asset;
using AssetManager.Models.Asset.ColorLightSignal;
using PetaPoco;

namespace AssetManager.Services.Asset
{
    public class PointMaintanenceService : AssetMaintanenceService<PointAssetMaintanence>
    {
        public PointMaintanenceService(XAssetDB db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.ElectricalOperatedPoints;

        public List<PointAssetMaintanence> GetSignalListView(int assetId)
        {
            return base.GetAll(assetId);
        }
    }
}
