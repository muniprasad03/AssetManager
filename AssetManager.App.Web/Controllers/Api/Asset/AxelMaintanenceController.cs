using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.Models;
using AssetManager.Models.Asset;
using AssetManager.Models.Asset.ColorLightSignal;
using AssetManager.Services;
using AssetManager.Services.Asset;

namespace AssetManager.App.Web.Controllers.Api
{
  [RoutePrefix("api/axel/maintanence")]
  public class AxelMaintanenceController : BaseApiController
  {
    public AxelMaintanenceService AssetService { get; set; }


    public AxelMaintanenceController(AxelMaintanenceService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list/{id}")]
    public List<AxelAssetMaintanence> GetAll(int id)
    {
      return this.AssetService.GetSignalListView(id);
    }

    [Route("detail/{id}")]
    public AxelAssetMaintanence Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(AxelAssetMaintanence asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, AxelAssetMaintanence asset)
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
