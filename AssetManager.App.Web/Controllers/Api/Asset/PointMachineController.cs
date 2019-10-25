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
  [RoutePrefix("api/point")]
  public class PointMachineController : BaseApiController
  {
    public PointMachineAssetService AssetService { get; set; }


    public PointMachineController(PointMachineAssetService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list")]
    public List<PointMachineAsset> GetAll()
    {
      return this.AssetService.GetSignalListView();
    }

    [Route("details/{id}")]
    public PointMachineAsset Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(PointMachineAsset asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, PointMachineAsset asset)
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
