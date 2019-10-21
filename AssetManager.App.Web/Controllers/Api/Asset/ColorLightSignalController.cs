using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.Models;
using AssetManager.Models.Asset.ColorLightSignal;
using AssetManager.Services;
using AssetManager.Services.Asset;

namespace AssetManager.App.Web.Controllers.Api
{
    [RoutePrefix("api/signal")]
    public class ColorLightSignalController : BaseApiController
    {
        public IColorLightSignalAssetService AssetService { get; set; }
        

        public ColorLightSignalController(IColorLightSignalAssetService assetService)
        {
            this.AssetService = assetService;            
        }

        [Route("list")]
        public List<ColorLightSignalListView> GetAll()
        {
            return this.AssetService.GetSignalListView();
        }

        [Route("details")]
        public ColorLightSignalAsset Get(int assetId)
        {
            return this.AssetService.GetById(assetId);
        }

        [Route("add")]
        [HttpPost]
        public int AddSignal(ColorLightSignalAsset asset)
        {
            return this.AssetService.CreateAsset(asset);
        }

        [Route("update")]
        [HttpPut]
        public bool UpdateSignal(int assetId, ColorLightSignalAsset asset)
        {
            return this.AssetService.UpdateAsset(assetId, asset);
        }

        [Route("delete")]
        public bool DeleteSignal(int assetId)
        {
            return this.AssetService.DeleteAsset(assetId);
        }
    }
}
