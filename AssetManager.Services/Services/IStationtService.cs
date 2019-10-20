using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface IStationService
    {
        List<BoardDetails> Get();

        Board Get(int id);

        int Create(Board department);

        void Update(Board department);

        void Delete(int id);
    }
}
