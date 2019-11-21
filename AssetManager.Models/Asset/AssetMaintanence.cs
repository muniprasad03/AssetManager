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

        public int AssetId { get; set; }

        public int AddedBy { get; set; }

        public DateTime DueOn { get; set; }
        public DateTime AddedOn { get; set; }

        public string Latitiude { get; set; }

        public string Longitude { get; set; }

        public string DisplayName { get; set; }
        public string Designation { get; set; }
        public string Name { get; set; }
        public int StationId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }

        public string SerialNumber { get; set; }
        public string StationName { get; set; }
        public string AssetLatitude { get; set; }
        public string AssetLongitude { get; set; }

        public int DueDays
        {
            get
            {
                if (this.AddedOn.Date >this.DueOn.Date)
                {
                    return (int) (this.AddedOn.Date - this.DueOn.Date).TotalDays;
                }
                return -1;
            }
        }
    }
}
