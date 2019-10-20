using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class ReportedService : ServiceBase, IReportedService
    {
          public XAssetDB DB { get; set; }

          public ReportedService(IRequestContext requestContext, XAssetDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.Department> Get()
        {
            return null;
            //this.DB.Fetch<Data.Model.Department>("Select * from Department").MapCollectionTo<Data.Model.Department, AssetManager.Models.Department>().ToList();
        }

        public List<AssetManager.Models.AxleGearCode> GetAxleGearCodes()
        {
            //return this.DB.Fetch<Data.Model.AxleGearCode>("").MapCollectionTo<Data.Model.AxleGearCode, AssetManager.Models.AxleGearCode>().ToList();
            return null;
        }

        public AssetManager.Models.Department Get(int id)
        {
            //return this.DB.SingleOrDefault<Data.Model.Reported>("Where Id = @0", id).MapTo<AssetManager.Models.Department>();
            return null;
        }

        public int Create(AssetManager.Models.Department department)
        {
            //Data.Model.Reported dept = department.MapTo<Data.Model.Reported>();
            //dept.SetAuditFieldsOnCreate<Data.Model.Reported>(this.Context);
            //department.Id = Convert.ToInt32(this.DB.Insert(dept));
            return department.Id;
        }

        public void Update(AssetManager.Models.Department department)
        {
            //Data.Model.Reported dept = department.MapTo<Data.Model.Reported>();
            //dept.SetAuditFieldsOnUpdate<Data.Model.Reported>(this.Context);
            //this.DB.Update(dept, new List<string> { "Name", "ModifiedBy", "DateModified" });
        }

        public void Delete(int id)
        {
            //this.DB.Delete<Data.Model.Reported>("WHERE id=@0", id);
            return;
        }
    }
}
