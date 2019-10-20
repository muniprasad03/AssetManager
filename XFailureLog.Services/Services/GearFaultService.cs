using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class GearFaultService : ServiceBase, IGearFaultService
    {
          public XblockDB DB { get; set; }

          public GearFaultService(IRequestContext requestContext, XblockDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.GearFault> Get()
        {
            return this.DB.Fetch<AssetManager.Models.GearFault>("Select * from GearFault").ToList();
        }

        public List<AssetManager.Models.Manufacture> GetAllManufactures()
        {
            return this.DB.Fetch<AssetManager.Models.Manufacture>("Select * from Manufacture").ToList();
        }

        public List<AssetManager.Models.SubGearFualt> GetAllSubGearFaults()
        {
            return this.DB.Fetch<AssetManager.Models.SubGearFualt>("Select * from SubGearFualt").ToList();
        }

        public List<AssetManager.Models.CauseOfFailure> GetCauseOfFailures()
        {
            return this.DB.Fetch<AssetManager.Models.CauseOfFailure>("Select * from CauseOfFailure").ToList();
        }

        public List<AssetManager.Models.SubCauseOfFailure> GetSubCauseOfFailures()
        {
            return this.DB.Fetch<AssetManager.Models.SubCauseOfFailure>("Select * from SubCauseOfFailure").ToList();
        }

        public AssetManager.Models.GearFault Get(int id)
        {
            return this.DB.SingleOrDefault<AssetManager.Models.GearFault>("Where Id = @0", id).MapTo<AssetManager.Models.GearFault>();
        }

        public int Create(AssetManager.Models.GearFault department)
        {
            AssetManager.Models.GearFault dept = department.MapTo<AssetManager.Models.GearFault>();
            //dept.SetAuditFieldsOnCreate<AssetManager.Models.GearFault>(this.Context);
            department.Id = Convert.ToInt32(this.DB.Insert(dept));
            return department.Id;
        }

        public void Update(AssetManager.Models.GearFault department)
        {
            AssetManager.Models.GearFault dept = department.MapTo<AssetManager.Models.GearFault>();
            //dept.SetAuditFieldsOnUpdate<AssetManager.Models.GearFault>(this.Context);
            this.DB.Update(dept, new List<string> { "Name", "ModifiedBy", "DateModified" });
        }

        public void Delete(int id)
        {
            this.DB.Delete<AssetManager.Models.GearFault>("WHERE id=@0", id);
            return;
        }
    }
}
