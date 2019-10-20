using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using XFailureLog.Services;
using XFailureLog.Services.Services;
using XFailureLog.Web.Controllers;
using XFailureLog.Web.Controllers.Api;
using XFailureLog.Web.Models;

namespace XFailureLog.Web
{
    public sealed class SimpleInjectorBootstrap
    {
        public static void InitializeContainer(Container container)
        {
            container.RegisterPerWebRequest<XFailureLog.Services.IRequestContext>(() => container.GetInstance<Core.RequestContextBuilder>().Build());

            container.RegisterSingleton<Func<IRequestContext>>(
               () => container.GetInstance<Core.RequestContextBuilder>().Build());

            container.RegisterInitializer<BaseController>(c => c.Context = container.GetInstance<IRequestContext>());

            container.RegisterInitializer<BaseApiController>(c => c.RequestContext = container.GetInstance<IRequestContext>());

            container.RegisterPerWebRequest<XFailureLog.Data.Model.XWorkDB>(() => new XFailureLog.Data.Model.XWorkDB("XWork"));

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