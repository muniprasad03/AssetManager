using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using AssetManager.Models;
using Microsoft.AspNet.Identity;
using AssetManager.Services;
using AssetManager.App.Web.Core;
using AssetManager.App.Web.Models;

namespace AssetManager.App.Web.Controllers.Api
{
    [RoutePrefix("api/user")]
    public class UserController : BaseApiController
    {
        public IUserService UserService { get; set; }

        public ApplicationUserManager UserManager { get; set; }

        public UserController(IUserService userService, ApplicationUserManager userManager)
        {
            this.UserService = userService;
            this.UserManager = userManager;
        }

        [AdminApiAuthorizeAttribute]
        [Route("detail/{userId}")]
        public User GetUser(int userId)
        {
            return this.UserService.GetUser(userId);
        }

        [Route("getUser")]
        public User GetCurrentUser()
        {
            var user = HttpContext.Current.Session["CurrentUser"] != null
                  ? Newtonsoft.Json.JsonConvert.DeserializeObject<User>(
                      (string)HttpContext.Current.Session["CurrentUser"])
                  : null;
            return user;
        }

        [AdminApiAuthorizeAttribute]
        [Route("getUsers")]
        public List<User> GetUsers()
        {
            return this.UserService.GetUsers();
        }

        [Route("getlogins")]
        public List<LoginActivity> GetLogins(DateTime from, DateTime to)
        {
            if (this.RequestContext.User.IsAdmin || this.RequestContext.User.IsReportViewer)
            {
                return this.UserService.GetLogins(from, to.AddDays(1));
            }
            else
            {
                throw new UnauthorizedAccessException("Unathorized to access this data");
            }
        }

        [AdminApiAuthorizeAttribute]
        [Route("add")]
        public async Task<dynamic> PostAddUser(User user)
        {
           user.Id = this.UserService.AddUser(user);
           if (user.Id != 0) {
               var appUser = new ApplicationUser { UserName = user.Email, Email = user.Email, EmailConfirmed = true };
               var result = await UserManager.CreateAsync(appUser, "123456");
               if (result.Succeeded)
               {
                   return new { id = user.Id, user = user };
               }
               else {
                   this.UserService.RevertAddedUser(user.Id);
               }
           }

           return new { id = 0 };
        }

        [AdminApiAuthorizeAttribute]
        [Route("update/{id}")]
        public dynamic PutUser(int id, User user)
        {
            return new { isDeleted = this.UserService.UpdateUser(id, user) };
        }

        [AdminApiAuthorizeAttribute]
        [Route("emailExsits/{email}")]
        public dynamic GetEmailExsits(string email)
        {
            return new { emailExsists = this.UserService.DoesEmailExsists(email) };
        }

        [AdminApiAuthorizeAttribute]
        [Route("resetpassword/{id}")]
        public async Task<dynamic> PutPasswordReset(int id, User user)
        {
            var appUser = await UserManager.FindByNameAsync(user.Email);
            if (user != null)
            {
                UserManager.RemovePassword(appUser.Id);

                UserManager.AddPassword(appUser.Id, "123456");
                return new { isReseted = true };
            }

            return new { isReseted = false };
        }
    }
}