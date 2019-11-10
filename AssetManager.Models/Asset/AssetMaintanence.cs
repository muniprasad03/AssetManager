using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public abstract class AssetMaintanence
    {
        public int Id { get; set; }

        public abstract AssetType AssetType { get; }

        public int AddedBy { get; set; }

        public DateTime AddedOn { get; set; }

        public string Latitiude { get; set; }

        public string Longitude { get; set; }
    }
}
