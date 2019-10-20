using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class StationService : ServiceBase, IStationService
    {
          public XWorkDB DB { get; set; }

          public StationService(IRequestContext requestContext, XWorkDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.BoardDetails> Get()
        {
            return this.DB.Fetch<Data.Model.Board>("Select * from board").MapCollectionTo<Data.Model.Board, AssetManager.Models.BoardDetails>().ToList();
        }

        public AssetManager.Models.Board Get(int id)
        {
            return this.DB.SingleOrDefault<Data.Model.Station>("Where Id = @0", id).MapTo<AssetManager.Models.Board>();
        }

        public int Create(AssetManager.Models.Board department)
        {
            Data.Model.Station dept = department.MapTo<Data.Model.Station>();
            dept.SetAuditFieldsOnCreate<Data.Model.Station>(this.Context);
            department.Id = Convert.ToInt32(this.DB.Insert(dept));
            return department.Id;
        }

        public void Update(AssetManager.Models.Board department)
        {
            Data.Model.Station dept = department.MapTo<Data.Model.Station>();
            dept.SetAuditFieldsOnUpdate<Data.Model.Station>(this.Context);
            this.DB.Update(dept, new List<string> { "Name", "SectionId", "Code", "ASTEId", "CSEId", "JEId", "ESMId", "ModifiedBy", "DateModified" });
        }

        public void Delete(int id)
        {
            this.DB.Delete<Data.Model.Station>("WHERE id=@0", id);
            return;
        }
    }
}
