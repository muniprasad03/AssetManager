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
  [RoutePrefix("api/block/maintanence")]
  public class BlockMaintanenceController : BaseApiController
  {
    public BlockMaintanenceService AssetService { get; set; }


    public BlockMaintanenceController(BlockMaintanenceService assetService)
    {
      this.AssetService = assetService;
    }

    [Route("list/{id}")]
    public List<BlockAssetMaintanence> GetAll(int id)
    {
      return this.AssetService.GetSignalListView(id);
    }

    [Route("detail/{id}")]
    public BlockAssetMaintanence Get(int id)
    {
      return this.AssetService.GetById(id);
    }

    [Route("add")]
    [HttpPost]
    public int AddSignal(BlockAssetMaintanence asset)
    {
      return this.AssetService.CreateAsset(asset);
    }

    [Route("update/{id}")]
    [HttpPut]
    public bool UpdateSignal(int id, BlockAssetMaintanence asset)
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
