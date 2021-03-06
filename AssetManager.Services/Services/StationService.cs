﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class StationService : ServiceBase, IStationService
    {
          public AssetManager.Data.Model.XAssetDB DB { get; set; }

          public StationService(IRequestContext requestContext, XAssetDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public List<AssetManager.Models.Board> Get()
        {
            return this.DB.Fetch<Data.Model.Station>("Select * from Station").MapCollectionTo<Data.Model.Station, AssetManager.Models.Board>().ToList();
        }

        public AssetManager.Models.Board Get(int id)
        {
            //return this.DB.SingleOrDefault<Data.Model.Station>("Where Id = @0", id).MapTo<AssetManager.Models.Board>();
            return null;
        }

        public int Create(AssetManager.Models.Board department)
        {
            //Data.Model.Station dept = department.MapTo<Data.Model.Station>();
            //dept.SetAuditFieldsOnCreate<Data.Model.Station>(this.Context);
            //department.Id = Convert.ToInt32(this.DB.Insert(dept));
            //return department.Id;
            return 0;
        }

        public void Update(AssetManager.Models.Board department)
        {
            //Data.Model.Station dept = department.MapTo<Data.Model.Station>();
            //dept.SetAuditFieldsOnUpdate<Data.Model.Station>(this.Context);
            //this.DB.Update(dept, new List<string> { "Name", "SectionId", "Code", "ASTEId", "CSEId", "JEId", "ESMId", "ModifiedBy", "DateModified" });
        }

        public void Delete(int id)
        {
            //this.DB.Delete<Data.Model.Station>("WHERE id=@0", id);
            return;
        }
    }
}
