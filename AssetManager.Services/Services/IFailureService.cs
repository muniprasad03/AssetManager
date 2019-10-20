using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface IFailureService
    {
        List<BlockRequestView> Get(DateTime from, DateTime to);

        BlockRequest Get(int id);

        int Create(BlockRequest department);

        bool Update(BlockRequest department);

        void Delete(int id);
    }
}
