﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class PointMachineAsset : Asset
    {
        public override AssetType AssetType => AssetType.ElectricalOperatedPoints;
        public PointMachineMetadata Metadata { get; set; }
    }
}
