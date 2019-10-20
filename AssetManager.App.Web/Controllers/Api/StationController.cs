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
    [RoutePrefix("api/station")]
    public class StationController : BaseApiController
    {
        public IStationService StationService { get; set; }

        public StationController(IStationService stationService)
        {
            this.StationService = stationService;
        }

        [Route("detail/{stationId}")]
        public Board GetStation(int stationId)
        {
            return this.StationService.Get(stationId);
        }

        [Route("getstations")]
        public List<BoardDetails> GetAll()
        {
            return this.StationService.Get();
        }

        [AdminApiAuthorizeAttribute]
        [Route("saveStation")]
        public int Post(Board data)
        {
            return this.StationService.Create(data);
        }

        [AdminApiAuthorizeAttribute]
        [Route("updateStation")]
        public void Put(Board data)
        {
            this.StationService.Update(data);
        }

        [Route("{id}")]
        [AdminApiAuthorizeAttribute]

        public void Delete(int id)
        {
            this.StationService.Delete(id);
        }
    }
}