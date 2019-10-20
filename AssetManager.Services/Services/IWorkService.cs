using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface IWorkService
    {
        List<Pointer> Get();

        Pointer Get(int id);

        int Create(Pointer product);

        bool Update(Pointer product);

        void Delete(int id);
    }
}
