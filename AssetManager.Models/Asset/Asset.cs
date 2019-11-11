using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public abstract class Asset
    {
        public int Id { get; set; }

        public abstract AssetType AssetType { get; }

        public int StationId { get; set; }
        public string StationName { get; set; }

        public string Department { get; set; }

        public string MainCategory { get; set; }

        public string Name { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public string Make { get; set; }

        public DateTime? DateOfManufacture { get; set; }

        public string Model { get; set; }

        public DateTime? DateOfInstallation { get; set; }

        public string QRCode { get; set; }
    }
}
