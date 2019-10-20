using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;
using AssetManager.Models;

namespace AssetManager.Services
{
    public class UserService : ServiceBase, IUserService
    {
        public XWorkDB DB { get; set; }

        public UserService(IRequestContext requestContext, XWorkDB db)
            : base(requestContext)
        {
            this.DB = db;
        }

        public AssetManager.Models.User GetUser(int userId)
        {
            return this.DB.SingleOrDefault<AssetManager.Data.Model.User>("Where Id = @0", userId).MapTo<AssetManager.Models.User>();
        }

        public List<AssetManager.Models.User> GetUsers()
        {
            return this.DB.Fetch<AssetManager.Data.Model.User>("Select * from [user]").MapCollectionTo<AssetManager.Data.Model.User, AssetManager.Models.User>().ToList();
        }

        public List<DisplayUser> GetUsersList()
        {
            return this.DB.Fetch<AssetManager.Data.Model.User>("Select id, displayName, Email from [user]").MapCollectionTo<AssetManager.Data.Model.User, AssetManager.Models.DisplayUser>().ToList();
        }

        public int AddUser(AssetManager.Models.User user)
        {
            var doesEmailExist = this.DB.SingleOrDefault<AssetManager.Data.Model.User>("WHERE UserName = @0", user.UserName);
            if (doesEmailExist == null)
            {
                try
                {
                    user.UserName = user.Email;
                    var userModel = user.MapTo<AssetManager.Data.Model.User>();
                    userModel.SetAuditFieldsOnCreate(this.Context);
                    user.Id = Convert.ToInt32(this.DB.Insert(userModel));
                    return user.Id;
                }
                catch
                {
                    return 0;
                }
            }
            return 0;
        }

        public void RevertAddedUser(int userID)
        {
            this.DB.Delete<AssetManager.Data.Model.User>("Where id = @0", userID);
        }

        public bool UpdateUser(int userId, AssetManager.Models.User user)
        {
            var userModel = user.MapTo<AssetManager.Data.Model.User>();
            userModel.SetAuditFieldsOnUpdate(this.Context);
            this.DB.Update(userModel, new string[] { "DisplayName", "IsAdmin", "IsSFREditor", "IsReportViewer", "GroupedStations", "PhoneNumber", "Designation", "ModifiedBy", "DateModified" });
            return true;
        }

        public bool DoesEmailExsists(string email)
        {
            var doesEmailExist = this.DB.SingleOrDefault<AssetManager.Data.Model.User>("WHERE UserName = @0", email);
            return doesEmailExist != null;
        }

        public AssetManager.Models.User GetUser(string username)
        {
            var user = this.DB.FirstOrDefault<Data.Model.User>("Select * from [user] where email =@0", username).MapTo<AssetManager.Models.User>();
            return user;
        }

        public void SaveLoginActivity(LoginActivity loginActivity)
        {
            var user = this.Context.User ?? this.GetUser(loginActivity.UserName);

            var loginActivityModel = loginActivity.MapTo<Data.Model.UserLoginActivity>();
            loginActivityModel.UserId = user?.Id;
            loginActivityModel.DisplayName = user?.DisplayName;
            loginActivityModel.Username = loginActivity.UserName ?? this.Context.User.Email;
            loginActivityModel.DateCreated = DateTime.UtcNow;
            loginActivityModel.DateModified = DateTime.UtcNow;
            loginActivityModel.CreatedBy = loginActivityModel.Username;
            loginActivityModel.ModifiedBy = loginActivityModel.Username;
            this.DB.Insert(loginActivityModel);
        }

        public List<LoginActivity> GetLogins(DateTime from, DateTime to)
        {
            return this.DB.Fetch<AssetManager.Data.Model.UserLoginActivity>("Select * from UserLoginActivity Where dateadd(minute, 330, LoginTime) BetWeen @0 and @1", from.Date, to).MapCollectionTo<Data.Model.UserLoginActivity, AssetManager.Models.LoginActivity>().ToList();
        }
    }

}
