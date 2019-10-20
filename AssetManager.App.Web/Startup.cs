
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(XFailureLog.Web.Startup))]
namespace XFailureLog.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
