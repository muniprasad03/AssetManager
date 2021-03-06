﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data.Model;
using AssetManager.Models;
using AssetManager.Models.Asset;
using AssetManager.Models.Asset.ColorLightSignal;
using PetaPoco;

namespace AssetManager.Services.Asset
{
    public class TrackMaintanenceService : AssetMaintanenceService<TrackAssetMaintanence>
    {
        public TrackMaintanenceService(XAssetDB db, IRequestContext context) : base(db, context)
        {
        }

        public override AssetType AssetType => AssetType.TrackCircuit;

        public List<TrackAssetMaintanence> GetSignalListView(int assetId)
        {
            return base.GetAll(assetId);
        }
    }
}
