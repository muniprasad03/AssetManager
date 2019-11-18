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
  [RoutePrefix("api/axel/maintanence")]
  public class AxelMaintanenceController : BaseApiController
  {
    public ColorLightSignalMaintanenceService AssetService { get; set; }


    public AxelMaintanenceController(ColorLightSignalMaintanenceService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list/{id}")]
    public List<ColorLightSignalAssetMaintanence> GetAll(int id)
    {
      return this.AssetService.GetSignalListView(id);
    }

    [Route("detail/{id}")]
    public ColorLightSignalAssetMaintanence Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(ColorLightSignalAssetMaintanence asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, ColorLightSignalAssetMaintanence asset)
    {
      return this.AssetService.UpdateAsset(id, asset);
    }

    [Route("delete/{id}")]
    public bool DeleteSignal(int id)
    {
      return this.AssetService.DeleteAsset(id);
    }
  }
}
