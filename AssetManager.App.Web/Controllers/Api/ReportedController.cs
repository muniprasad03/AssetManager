using AssetManager.Services;
using System.Collections.Generic;
using System.Web.Mvc;
using AssetManager.App.Web.Core;
using AssetManager.Models;

namespace AssetManager.App.Web.Controllers.Api
{
    [RoutePrefix("api/reported")]
    public class ReportedController : BaseApiController
    {
        public IReportedService ReportedService { get; set; }

        public ReportedController(IReportedService reportedService)
        {
            this.ReportedService = reportedService;
        }

        [Route("detail/{ReportedId}")]
        public Department GetReported(int reportedId)
        {
            return this.ReportedService.Get(reportedId);
        }

        [Route("getReporteds")]
        public List<Department> GetAll()
        {
            return this.ReportedService.Get();
        }

        [Route("getFailureCodes")]
        public List<AxleGearCode> GetFailureCodes()
        {
            return this.ReportedService.GetAxleGearCodes();
        }

        [AdminApiAuthorizeAttribute]
        [Route("saveReported")]
        public int Post(Department data)
        {
            return this.ReportedService.Create(data);
        }

        [AdminApiAuthorizeAttribute]
        [Route("updateReported")]
        public void Put(Department data)
        {
            this.ReportedService.Update(data);
        }

        [Route("{id}")]
        [AdminApiAuthorizeAttribute]
        public void Delete(int id)
        {
            this.ReportedService.Delete(id);
        }
    }
}