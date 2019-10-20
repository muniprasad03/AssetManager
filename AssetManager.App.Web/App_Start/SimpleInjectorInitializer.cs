using SimpleInjector;
using SimpleInjector.Advanced;
using SimpleInjector.Integration.Web.Mvc;
using SimpleInjector.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(AssetManager.App.Web.SimpleInjectorInitializer), "Initialize")]
namespace AssetManager.App.Web
{
    public class SimpleInjectorInitializer
    {
        public static void Initialize()
        {
            var container = new Container();

            // Added to support property injection in AuthorizeAttribute filter overrides.
            container.Options.PropertySelectionBehavior = new ImportPropertySelectionBehavior();

            SimpleInjectorBootstrap.InitializeContainer(container);

            container.RegisterMvcControllers(Assembly.GetExecutingAssembly());

            container.RegisterMvcIntegratedFilterProvider();

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));

            // Register the dependency resolver for Web API.
            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }
    }

    public class ImportAttribute : Attribute
    {
    }

    /// <summary>
    /// Property selector used to do property injection with simple injector. <See url= "https://simpleinjector.readthedocs.org/en/latest/advanced.html#property-injection" />
    /// </summary>
    internal class ImportPropertySelectionBehavior : IPropertySelectionBehavior
    {
        /// <summary>
        /// Selects the property that should be injected.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="prop">The property.</param>
        /// <returns>True if the property needs to be injected.</returns>
        public bool SelectProperty(Type type, PropertyInfo prop)
        {
            return prop.GetCustomAttributes(typeof(ImportAttribute)).Any();
        }
    }
}