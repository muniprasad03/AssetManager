using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class PointService : ServiceBase, IWorkService
    {
        public AssetManager.Data.Model.XAssetDB DB { get; set; }

        public PointService(IRequestContext requestContext, XAssetDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.Pointer> Get()
        {
            if (this.Context.User.IsAdmin)
            {
                return null; 
                    //this.DB.Fetch<AssetManager.Data.Model.Work>("Select * from Work").MapCollectionTo<Data.Model.Work, AssetManager.Models.Pointer>().ToList();
            }
            else
            {
                return null;
                    //this.DB.Fetch<Data.Model.Work>("Select * from Work Where UserId = @0", this.Context.User.Id).MapCollectionTo<Data.Model.Work, AssetManager.Models.Pointer>().ToList();
            }
        }

        public AssetManager.Models.Pointer Get(int id)
        {
            return null;
                //this.DB.SingleOrDefault<Data.Model.Work>("Where Id = @0", id).MapTo<AssetManager.Models.Pointer>();
        }

        public int Create(AssetManager.Models.Pointer product)
        {
            //Data.Model.Work prdct = product.MapTo<Data.Model.Work>();
            //prdct.SetAuditFieldsOnCreate<Data.Model.Work>(this.Context);
            //product.Id = Convert.ToInt32(this.DB.Insert(prdct));
            return product.Id;
        }

        public bool Update(AssetManager.Models.Pointer product)
        {
            //var exisitingProduct = this.DB.SingleOrDefault<Data.Model.Work>("Where id =@0", product.Id);
            //Data.Model.Work prdct = product.MapTo<Data.Model.Work>();
            //prdct.SetAuditFieldsOnUpdate<Data.Model.Work>(this.Context);
            //this.DB.Update(prdct, new List<string> { "Date", "Name", "Area", "Program", "WorkInvolved", "StaffNominated", "Substitude", "Result", "Remarks", "TerminalTightness", "GaugeTest", "OutOfCorrespondense", "NormalIndication", "ReverseIndication", "TongueFloating", "CutOut", "ModifiedBy", "DateModified" });
            return true;
        }

        public void Delete(int id)
        {
            //this.DB.Delete<Data.Model.Work>("WHERE id=@0", id);
            return;
        }

        private bool IsProductExsists(string name, int userId, int productId)
        {
            //var exsisting = this.DB.FirstOrDefault<Data.Model.Work>("Where Name = @0 and Id != @1", name, productId);
            return  true;
                //exsisting != null;
        }
    }
}
