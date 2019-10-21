using AssetManager.Models.Asset.ColorLightSignal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Services.Asset
{
    public interface IColorLightSignalAssetService : IAssetService<ColorLightSignalAsset>
    {
        List<ColorLightSignalListView> GetSignalListView();
    }
}
