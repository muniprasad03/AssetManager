using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.Models.Asset;
using AssetManager.Services.Asset;

namespace AssetManager.App.Web.Controllers.Api
{
  [RoutePrefix("api/Asset")]
  public class AssetController : ApiController
  {
    public IColorLightSignalAssetService AssetService { get; set; }

    public AssetController(IColorLightSignalAssetService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("detail/{qrCode}")]
    public List<Asset> GetByQRCode(string qrCode)
    {
      return this.AssetService.GetByQRCode(qrCode);
    }
  }
}
