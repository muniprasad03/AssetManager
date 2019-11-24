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
  [RoutePrefix("api/point/maintanence")]
  public class PointMaintanenceController : BaseApiController
  {
    public PointMaintanenceService AssetService { get; set; }


    public PointMaintanenceController(PointMaintanenceService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list/{id}")]
    public List<PointAssetMaintanence> GetAll(int id)
    {
      return this.AssetService.GetSignalListView(id);
    }

    [Route("detail/{id}")]
    public PointAssetMaintanence Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(PointAssetMaintanence asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, PointAssetMaintanence asset)
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
