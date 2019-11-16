using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.Models;
using AssetManager.Models.Asset;
using AssetManager.Services;
using AssetManager.Services.Asset;

namespace AssetManager.App.Web.Controllers.Api
{
  [RoutePrefix("api/track")]
  public class TrackCircuitController : BaseApiController
  {
    public TrackCircuitAssetService AssetService { get; set; }


    public TrackCircuitController(TrackCircuitAssetService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list")]
    public List<TrackCircuitAsset> GetAll()
    {
      return this.AssetService.GetAll();
    }

    [Route("details/{id}")]
    public TrackCircuitAsset Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(TrackCircuitAsset asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("isUnique")]
    public bool GetisUnique(int id, string name)
    {
      return this.AssetService.GetisUnique(id, name);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, TrackCircuitAsset asset)
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
