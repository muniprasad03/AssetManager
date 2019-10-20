using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class FileAttachment
    {
        public int Id { get; set; }

        public string Location { get; set; }

        public string ContentType { get; set; }

        public string Name { get; set; }

        public string UploadedBy { get; set; }

        public DateTime UploadedOn { get; set; }
    }
}
