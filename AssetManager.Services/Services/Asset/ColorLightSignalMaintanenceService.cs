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
    public class ColorLightSignalMaintanenceService : AssetMaintanenceService<ColorLightSignalAssetMaintanence>
    {
        public ColorLightSignalMaintanenceService(XAssetDB db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.AxelCounter;

        public List<ColorLightSignalAssetMaintanence> GetSignalListView()
        {
            return base.GetAll();
        }
    }
}
