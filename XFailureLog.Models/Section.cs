using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class Section
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class SectionView : Section
    {
        public int Stations { get; set; }
        public int IcGates { get; set; }
        public int LBs { get; set; }

        public int Failures { get; set; }
    }
}
