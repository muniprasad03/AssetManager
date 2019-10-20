using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class FailureService : ServiceBase, IFailureService
    {
         public AssetManager.Data.Model.XAssetDB DB { get; set; }

         public FailureService(IRequestContext requestContext, XAssetDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.BlockRequestView> Get(DateTime from, DateTime to)
        {
            return this.DB.Fetch<AssetManager.Data.Model.BlockRquestView>("Select * from BlockRquestView Where Cast(RequestDate as Date) BetWeen @0 and @1", from.Date, to.Date).MapCollectionTo<Data.Model.BlockRquestView, AssetManager.Models.BlockRequestView>().ToList();
        }

        public AssetManager.Models.BlockRequest Get(int id)
        {
            return this.DB.SingleOrDefault<Data.Model.BlockRquest>("Where Id = @0", id).MapTo<AssetManager.Models.BlockRequest>();
        }

        public int Create(AssetManager.Models.BlockRequest failure)
        {
            failure.RequestedBy = this.Context.User.Id;
            failure.RquestedOn = DateTime.UtcNow;
            Data.Model.BlockRquest prdct = failure.MapTo<Data.Model.BlockRquest>();
            prdct.SetAuditFieldsOnCreate<Data.Model.BlockRquest>(this.Context);
            failure.Id = Convert.ToInt32(this.DB.Insert(prdct));
            return failure.Id;
        }

        public bool Update(AssetManager.Models.BlockRequest failure)
        {
            var exisitingProduct = this.DB.SingleOrDefault<Data.Model.BlockRquest>("Where id =@0", failure.Id);
            Data.Model.BlockRquest prdct = failure.MapTo<Data.Model.BlockRquest>();
            prdct.SetAuditFieldsOnUpdate<Data.Model.BlockRquest>(this.Context);
            this.DB.Update(prdct, new List<string> { "DepartmentId", "SectionId", "BoardId", "BlockSectionName", "Direction", "Description", "RequestDuration", "AllowedDuration", "NumberOfBlocks", "AllowedDate", "RequestDate", "ModifiedBy", "DateModified" });
            return true;
        }

        public void Delete(int id)
        {
            //this.DB.Update<Data.Model.Failure>("Set IsDeleted = @0, DeletedBy =@1, DateDeleted = @2 Where Id = @3", true, this.Context.User.Id, DateTime.UtcNow, id);
            return;
        }

        private bool IsProductExsists(string name, int userId, int productId)
        {
            //var exsisting = this.DB.FirstOrDefault<Data.Model.Work>("Where Name = @0 and Id != @1", name, productId);
            return false;
        }
    }
}
