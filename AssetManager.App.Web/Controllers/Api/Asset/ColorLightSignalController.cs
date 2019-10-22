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
    public List<ColorLightSignalAsset> GetAll()
    {
      return this.AssetService.GetSignalListView();
    }

    [Route("details/{id}")]
    public ColorLightSignalAsset Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("details/{qrCode}")]
    public ColorLightSignalAsset GetByQRCode(string qrCode)
    {
      return this.AssetService.GetByQRCode(qrCode);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(ColorLightSignalAsset asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, ColorLightSignalAsset asset)
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
