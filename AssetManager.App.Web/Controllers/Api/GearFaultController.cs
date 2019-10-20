using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AssetManager.Models;
using AssetManager.Services;
using AssetManager.App.Web.Core;

namespace AssetManager.App.Web.Controllers.Api
{
    [RoutePrefix("api/gearfault")]
    public class GearFaultController : BaseApiController
    {
        public IGearFaultService GearFaultService { get; set; }

        public GearFaultController(IGearFaultService gearFaultService)
        {
            this.GearFaultService = gearFaultService;
        }

        [Route("detail/{GearFaultId}")]
        public GearFault GetGearFault(int gearFaultId)
        {
            return this.GearFaultService.Get(gearFaultId);
        }

        [Route("getGearFaults")]
        public List<GearFault> GetAll()
        {
            return this.GearFaultService.Get();
        }

        [AdminApiAuthorizeAttribute]
        [Route("saveGearFault")]
        public int Post(GearFault data)
        {
            return this.GearFaultService.Create(data);
        }

        [AdminApiAuthorizeAttribute]
        [Route("updateGearFault")]
        public void Put(GearFault data)
        {
            this.GearFaultService.Update(data);
        }

        [Route("{id}")]
        [AdminApiAuthorizeAttribute]

        public void Delete(int id)
        {
            this.GearFaultService.Delete(id);
        }
    }
}