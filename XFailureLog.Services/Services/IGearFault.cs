using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager.Services
{
    public interface IGearFaultService
    {
        List<GearFault> Get();

        List<Manufacture> GetAllManufactures();

        List<SubGearFualt> GetAllSubGearFaults();

        List<CauseOfFailure> GetCauseOfFailures();

        List<SubCauseOfFailure> GetSubCauseOfFailures();

        GearFault Get(int id);

        int Create(GearFault department);

        void Update(GearFault department);

        void Delete(int id);
    }
}
