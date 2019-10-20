using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ReportedView : Department
    {
        public int Failures { get; set; }
    }
}
