using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;
using AssetManager.Models;
using PetaPoco;

namespace AssetManager.Services.Asset
{
    public abstract class AssetService<T> : ServiceBase, IAssetService<T> where T : Models.Asset.Asset
    {
        public abstract AssetType AssetType { get; }

        public XAssetDB DB { get; private set; }

        public AssetService(XAssetDB db, IRequestContext context)
            : base(context)
        {
            this.DB = db;
        }

        public List<T> GetAll()
        {
            return this.DB.Fetch<Data.Model.Asset>("Where IsDeleted = 0 and AssetType = @0", this.AssetType).MapCollectionTo<Data.Model.Asset, T>().ToList();
        }

        public T GetById(int id)
        {
            return this.DB.SingleOrDefault<Data.Model.Asset>("Where IsDeleted = 0 and Id = @0 and AssetType = @1", id, this.AssetType).MapTo<T>();
        }

        public AssetManager.Models.Asset.Asset GetByQRCode(string qrCode)
        {
            return this.DB.FirstOrDefault<Data.Model.Asset>("Where IsDeleted = 0 and QRCode = @0 and AssetType = @1", qrCode, this.AssetType).MapTo<AssetManager.Models.Asset.Asset>();
        }

        public int CreateAsset(T asset)
        {
            var assetModel = asset.MapTo<Data.Model.Asset>();
            assetModel.QRCode = Guid.NewGuid().ToString();
            assetModel.SetAuditFieldsOnCreate(this.Context);
            return Convert.ToInt32(this.DB.Insert(assetModel));
        }

        public bool UpdateAsset(int assetId, T asset)
        {
            var assetModel = this.DB.SingleOrDefault<Data.Model.Asset>("Where IsDeleted = 0 and Id = @0 and AssetType = @1", assetId, this.AssetType);
            if (assetModel != null)
            {
                assetModel = asset.MapTo(assetModel);
                assetModel.SetAuditFieldsOnUpdate(this.Context);
                return this.DB.Update(assetModel, new string[] { "Latitude", "name", "Longitude", "Make", "DOM", "Model", "DOI", "MetaData", "DateModified", "ModifiedBy" }) == 1;
            }

            return false;
        }

        public bool DeleteAsset(int assetId)
        {
            var assetModel = this.DB.SingleOrDefault<Data.Model.Asset>("Where IsDeleted = 0 and Id = @0 and AssetType = @1", assetId, this.AssetType);
            if (assetModel != null)
            {
                assetModel.IsDeleted = true;
                assetModel.DateDeleted = DateTime.UtcNow;
                assetModel.SetAuditFieldsOnUpdate(this.Context);
                return this.DB.Update(assetModel, new string[] { "IsDeleted", "DateDeleted", "DateModified", "ModifiedBy" }) == 1;
            }

            return false;
        }
    }
}
