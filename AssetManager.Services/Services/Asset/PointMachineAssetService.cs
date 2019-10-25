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
    public class PointMachineAssetService : AssetService<PointMachineAsset>
    {
        public PointMachineAssetService(XAssetDB db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.ElectricalOperatedPoints;

        public List<PointMachineAsset> GetSignalListView()
        {
            return base.GetAll();
        }
    }
}
