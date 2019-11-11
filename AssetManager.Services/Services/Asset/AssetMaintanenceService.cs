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
    public abstract class AssetMaintanenceService<T> : ServiceBase where T : Models.Asset.AssetMaintanence
    {
        public abstract AssetType AssetType { get; }

        public XAssetDB DB { get; private set; }

        public AssetMaintanenceService(XAssetDB db, IRequestContext context)
            : base(context)
        {
            this.DB = db;
        }

        public List<T> GetAll(int assetId)
        {
            return this.DB.Fetch<Data.Model.AssetMaintanence>("Where IsDeleted = 0 and AssetType = @0 and AssetId =@1", this.AssetType, assetId).MapCollectionTo<Data.Model.AssetMaintanence, T>().ToList();
        }

        public T GetById(int id)
        {
            return this.DB.SingleOrDefault<Data.Model.AssetMaintanence>("Where IsDeleted = 0 and Id = @0 and AssetType = @1", id, this.AssetType).MapTo<T>();
        }

        public AssetManager.Models.Asset.AssetMaintanence GetByQRCode(string qrCode)
        {
            return this.DB.FirstOrDefault<Data.Model.AssetMaintanence>("Where IsDeleted = 0 and QRCode = @0 and AssetType = @1", qrCode, this.AssetType).MapTo<AssetManager.Models.Asset.AssetMaintanence>();
        }

        public int CreateAsset(T asset)
        {
            asset.AddedBy = this.Context.User.Id;
            asset.AddedOn = DateTime.UtcNow;
            var assetModel = asset.MapTo<Data.Model.AssetMaintanence>();
            assetModel.SetAuditFieldsOnCreate(this.Context);
            return Convert.ToInt32(this.DB.Insert(assetModel));
        }

        public bool UpdateAsset(int assetId, T asset)
        {
            var assetModel = this.DB.SingleOrDefault<Data.Model.AssetMaintanence>("Where IsDeleted = 0 and Id = @0 and AssetType = @1", assetId, this.AssetType);
            if (assetModel != null)
            {
                assetModel = asset.MapTo(assetModel);
                assetModel.SetAuditFieldsOnUpdate(this.Context);
                return this.DB.Update(assetModel, new string[] { "Latitude", "Longitude", "addedBy", "addedOn", "MetaData", "DateModified", "ModifiedBy" }) == 1;
            }

            return false;
        }

        public bool DeleteAsset(int assetId)
        {
            var assetModel = this.DB.SingleOrDefault<Data.Model.AssetMaintanence>("Where IsDeleted = 0 and Id = @0 and AssetType = @1", assetId, this.AssetType);
            if (assetModel != null)
            {
                assetModel.Isdeleted = true;
                assetModel.DateDeleted = DateTime.UtcNow;
                assetModel.SetAuditFieldsOnUpdate(this.Context);
                return this.DB.Update(assetModel, new string[] { "IsDeleted", "DateDeleted", "DateModified", "ModifiedBy" }) == 1;
            }

            return false;
        }
    }
}
