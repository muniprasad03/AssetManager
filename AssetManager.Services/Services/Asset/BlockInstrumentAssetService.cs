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
    public class BlockInstrumentAssetService : AssetService<BlockInstrumentAsset>
    {
        public BlockInstrumentAssetService(XAssetDB db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.BlockInstrument;

        public List<BlockInstrumentAsset> GetSignalListView()
        {
            return base.GetAll();
        }
    }
}
