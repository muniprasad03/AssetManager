﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;
using AssetManager.Models.Asset.ColorLightSignal;
using PetaPoco;

namespace AssetManager.Services.Asset
{
    public class ColorLightSignalAssetService : AssetService<Models.Asset.ColorLightSignal.ColorLightSignalAsset>
    {
        public ColorLightSignalAssetService(Database db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.ColourLightSignal;

        public List<ColorLightSignalListView> GetSignalListView()
        {
            return new List<ColorLightSignalListView>();
        }
    }
}