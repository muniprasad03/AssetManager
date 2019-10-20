using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int SectionId { get; set; }
         public StationType StationType { get; set; }

    }

    public class BoardDetails: Board
    {
        public string SectionName { get; set; }

    }
}
