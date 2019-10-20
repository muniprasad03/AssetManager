
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AssetManager.App.Web.Startup))]
namespace AssetManager.App.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
