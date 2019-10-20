using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface ISectiontService 
    {
        List<Section> Get();

        Section Get(int id);

        int Create(Section department);

        void Update(Section department);

        void Delete(int id);
    }
}
