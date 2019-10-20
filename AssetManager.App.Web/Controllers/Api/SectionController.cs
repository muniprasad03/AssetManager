using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using XFailureLog.Models;
using XFailureLog.Services.Services;
using XFailureLog.Web.Core;

namespace XFailureLog.Web.Controllers.Api
{
    [RoutePrefix("api/section")]
    public class SectionController : BaseApiController
    {
        public ISectiontService SectionService { get; set; }

        public SectionController(ISectiontService sectionService)
        {
            this.SectionService = sectionService;
        }

        [Route("detail/{sectionId}")]
        public Section Getsection(int sectionId)
        {
            return this.SectionService.Get(sectionId);
        }

        [Route("getsections")]
        public List<Section> GetAll()
        {
            return this.SectionService.Get();
        }

        [AdminApiAuthorizeAttribute]
        [Route("savesection")]
        public int Post(Section data)
        {
            return this.SectionService.Create(data);
        }

        [AdminApiAuthorizeAttribute]
        [Route("updatesection")]
        public void Put(Section data)
        {
            this.SectionService.Update(data);
        }

        [Route("{id}")]
        [AdminApiAuthorizeAttribute]

        public void Delete(int id)
        {
            this.SectionService.Delete(id);
        }
    }
}