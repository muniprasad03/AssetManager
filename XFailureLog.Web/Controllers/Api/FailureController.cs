using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using XFailureLog.Models;
using XFailureLog.Services.Services;
using XFailureLog.Web.Core;

namespace XFailureLog.Web.Controllers.Api
{
    [SFREditorApiAuthorize]
    [RoutePrefix("api/failure")]
    public class FailureController : BaseApiController
    {
        public IFailureService FailureService { get; set; }
        public IStationService BoardService { get; set; }
        public IReportedService DepartmentService { get; set; }
        public IGearFaultService GearFaultService { get; set; }
        public IUserService UserService { get; set; }
        public ISectiontService SectionService { get; set; }

        public FailureController(IFailureService productService, IGearFaultService gearFaultService, IStationService stationService, IReportedService reportedService, IUserService userService, ISectiontService sectionService)
        {
            this.FailureService = productService;
            this.UserService = userService;
            this.DepartmentService = reportedService;
            this.GearFaultService = gearFaultService;
            this.BoardService = stationService;
            this.SectionService = sectionService;
        }

        [Route("detail/{failureId}")]
        public BlockRequest GetUser(int productId)
        {
            return this.FailureService.Get(productId);
        }

        [Route("getfailures")]
        public List<BlockRequestView> GetAll(DateTime from, DateTime to)
        {
            return this.FailureService.Get(from, to);
        }

        [Route("getfailureManageInfo")]
        public dynamic GetFailureManageInputs()
        {
            return new
            {
                sections = this.SectionService.Get(),
                boards = this.BoardService.Get(),
                departments = this.DepartmentService.Get(),
                //manufactures = this.GearFaultService.GetAllManufactures(),
                //subGearFaults = this.GearFaultService.GetAllSubGearFaults(),
                //causeOfFailures = this.GearFaultService.GetCauseOfFailures(),
                //subCauseOfFailure = this.GearFaultService.GetSubCauseOfFailures(),
                //axleGearCodes = this.ReportedService.GetAxleGearCodes()
            };
        }

        [Route("getUsers")]
        public List<DisplayUser> GetUsers()
        {
            return this.UserService.GetUsersList();
        }

        [Route("savefailure")]
        public dynamic Post(BlockRequest product)
        {
            return new { id = this.FailureService.Create(product) };
        }

        [Route("updatefailure")]
        public dynamic Put(BlockRequest product)
        {
            return new { isUpdated = this.FailureService.Update(product) };
        }

        [Route("{id}")]
        public void Delete(int id)
        {
            this.FailureService.Delete(id);
        }
    }
}
