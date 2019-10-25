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
  [RoutePrefix("api/axel")]
  public class AxelCounterController : BaseApiController
  {
    public AxelCounterAssetService AssetService { get; set; }


    public AxelCounterController(AxelCounterAssetService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list")]
    public List<AxelCounterAsset> GetAll()
    {
      return this.AssetService.GetSignalListView();
    }

    [Route("details/{id}")]
    public AxelCounterAsset Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(AxelCounterAsset asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, AxelCounterAsset asset)
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
