using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AssetManager.Services;
using AssetManager.App.Web.Controllers;
using AssetManager.App.Web.Models;
using AssetManager.App.Web.Controllers.Api;

namespace AssetManager.App.Web
{
    public sealed class SimpleInjectorBootstrap
    {
        public static void InitializeContainer(Container container)
        {
            container.RegisterPerWebRequest<AssetManager.IRequestContext>(() => container.GetInstance<Core.RequestContextBuilder>().Build());

            container.RegisterSingleton<Func<IRequestContext>>(
               () => container.GetInstance<Core.RequestContextBuilder>().Build());

            container.RegisterInitializer<BaseController>(c => c.Context = container.GetInstance<IRequestContext>());

            container.RegisterInitializer<BaseApiController>(c => c.RequestContext = container.GetInstance<IRequestContext>());

            container.RegisterPerWebRequest<AssetManager.Data.Model.XAssetDB>(() => new AssetManager.Data.Model.XAssetDB("XAsset"));

            container.Register<IReportedService, ReportedService>();
            container.Register<IWorkService, PointService>();
            container.Register<IFailureService, FailureService>();
            container.Register<IReportService, ReportService>();
            container.Register<ISectiontService, SectionService>();
            container.Register<IGearFaultService, GearFaultService>();
            container.Register<IStationService, StationService>();
            container.Register<IUserService, UserService>();

            container.RegisterPerWebRequest<Microsoft.AspNet.Identity.IUserStore<ApplicationUser>>(() =>
            {
                // Added this, because this the UserStore has 2 constructor.
                // Default UserStore constructor uses the default connection string named: DefaultConnection
                return new Microsoft.AspNet.Identity.EntityFramework.UserStore<ApplicationUser>(new ApplicationDbContext());
            });

            container.RegisterPerWebRequest<Microsoft.Owin.Security.IAuthenticationManager>(() =>
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            });
        }

    }
}