using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class Pointer
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }
        public string Name { get; set; }

        public string Area { get; set; }

        public string Program { get; set; }

        public string WorkInvolved { get; set; }

        public string StaffNominated { get; set; }

        public string Substitude { get; set; }
        public bool Result
        {
            get
            {
                return this.TerminalTightness && this.GaugeTest && this.OutOfCorrespondense && this.NormalIndication && this.ReverseIndication && this.TongueFloating && this.CutOut;
            }
        }

        public string Remarks { get; set; }

        public bool TerminalTightness { get; set; }

        public bool GaugeTest { get; set; }

        public bool OutOfCorrespondense { get; set; }

        public bool NormalIndication { get; set; }

        public bool ReverseIndication { get; set; }

        public bool TongueFloating { get; set; }

        public bool CutOut { get; set; }
    }
}
