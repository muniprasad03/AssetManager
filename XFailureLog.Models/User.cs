using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string LoginId { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsSFREditor { get; set; }
        public bool IsReportViewer { get; set; }
        public List<int> GroupedStations { get; set; }
        public string PhoneNumber { get; set; }
        public string Designation { get; set; }
    }

    public class DisplayUser
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
    }
}
