using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class SectionService : ServiceBase, ISectiontService
    {
        public XAssetDB DB { get; set; }

        public SectionService(IRequestContext requestContext, XAssetDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.Section> Get()
        {
            return this.DB.Fetch<Data.Model.Section>("Select * from Section").MapCollectionTo<Data.Model.Section, AssetManager.Models.Section>().ToList();
        }

        public AssetManager.Models.Section Get(int id)
        {
            return this.DB.SingleOrDefault<Data.Model.Section>("Where Id = @0", id).MapTo<AssetManager.Models.Section>();
        }

        public int Create(AssetManager.Models.Section department)
        {
            Data.Model.Section dept = department.MapTo<Data.Model.Section>();
            dept.SetAuditFieldsOnCreate<Data.Model.Section>(this.Context);
            department.Id = Convert.ToInt32(this.DB.Insert(dept));
            return department.Id;
        }

        public void Update(AssetManager.Models.Section department)
        {
            Data.Model.Section dept = department.MapTo<Data.Model.Section>();
            dept.SetAuditFieldsOnUpdate<Data.Model.Section>(this.Context);
            this.DB.Update(dept, new List<string> { "Name", "ModifiedBy", "DateModified" });
        }

        public void Delete(int id)
        {
            this.DB.Delete<Data.Model.Section>("WHERE id=@0", id);
            return;
        }
    }
}
