using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface IReportedService
    {
        List<Department> Get();

        List<AxleGearCode> GetAxleGearCodes();

        Department Get(int id);

        int Create(Department department);

        void Update(Department department);

        void Delete(int id);
    }
}
