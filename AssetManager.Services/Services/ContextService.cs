using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;

namespace AssetManager.Services
{
    public class ContextService
    {
        public XAssetDB DB { get; set; }
        public ContextService(XAssetDB db)
        {
            this.DB = db;
        }

        public AssetManager.Models.User GetUser(string username)
        {
            var user = this.DB.FirstOrDefault<Data.Model.User>("Select * from [user] where email =@0", username).MapTo<AssetManager.Models.User>();
            return user;
        }
    }
}
