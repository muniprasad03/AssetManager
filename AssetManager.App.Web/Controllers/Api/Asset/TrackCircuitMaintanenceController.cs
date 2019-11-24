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
  [RoutePrefix("api/track/maintanence")]
  public class TrackMaintanenceController : BaseApiController
  {
    public TrackMaintanenceService AssetService { get; set; }


    public TrackMaintanenceController(TrackMaintanenceService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list/{id}")]
    public List<TrackAssetMaintanence> GetAll(int id)
    {
      return this.AssetService.GetSignalListView(id);
    }

    [Route("detail/{id}")]
    public TrackAssetMaintanence Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(TrackAssetMaintanence asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, TrackAssetMaintanence asset)
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
