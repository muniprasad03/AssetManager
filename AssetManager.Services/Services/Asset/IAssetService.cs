using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Services.Asset
{
    public interface IAssetService<T> where T : Models.Asset.Asset
    {      
        Models.AssetType AssetType { get; }

        T GetById(int id);

        AssetManager.Models.Asset.Asset GetByQRCode(string qrCode);
        
        List<T> GetAll();
        
        int CreateAsset(T asset);

        bool UpdateAsset(int assetId, T asset);

        bool DeleteAsset(int assetId);
    }
}
