using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface IUserService 
    {
        User GetUser(int userId);
        List<AssetManager.Models.User> GetUsers();
        int AddUser(User user);
        void RevertAddedUser(int userID);
        bool UpdateUser(int userId, AssetManager.Models.User user);
        List<DisplayUser> GetUsersList();
        bool DoesEmailExsists(string email);
        void SaveLoginActivity(LoginActivity loginActivity);
        List<LoginActivity> GetLogins(DateTime from, DateTime to);
    }
}
