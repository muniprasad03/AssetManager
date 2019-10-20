using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.Models.Reports;
using AssetManager.Services;
using AssetManager.App.Web.Core;

namespace AssetManager.App.Web.Controllers.Api
{
    /// <summary>
    /// Class BaseApiController.
    /// </summary>
    [Authorize]
    [SessionAuthorize]
    public class BaseApiController : ApiController
    {
        /// <summary>
        /// Gets or sets the request context.
        /// </summary>
        /// <value>
        /// The request context.
        /// </value>
        public IRequestContext RequestContext { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseApiController" /> class.
        /// </summary>
        public BaseApiController()
        {
        }

        /// <summary>
        /// Exports the file.
        /// </summary>
        /// <typeparam name="T">The Type</typeparam>
        /// <param name="request">The request.</param>
        /// <param name="response">The data.</param>
        /// <returns>Http Response Message</returns>
        protected virtual HttpResponseMessage ExportFile<T>(ExportReportRequest request, T response)
        {
            switch (typeof(T).Name)
            {
                case "DataTable":
                    var dataTable = response as DataTable;

                    switch (request.Format.ToLower())
                    {
                        case "pdf":
                            return new HttpResponseMessage(HttpStatusCode.OK)
                            .SendPDF(Xhr.App.One.Core.FileExportExtensions.ToPdfByteArray(dataTable), request.FileName);
                        case "excel":
                            return new HttpResponseMessage(HttpStatusCode.OK)
                            .SendExcel(Xhr.App.One.Core.FileExportExtensions.ToExcelByteArray(dataTable, request.SheetName ?? request.FileName, "", request.SheetHeader), request.FileName);
                        default: break;
                    }

                    break;
                case "String":
                    var st = response as string;

                    switch (request.Format.ToLower())
                    {
                        case "text":
                            return new HttpResponseMessage(HttpStatusCode.OK)
                               .SendText(st, request.FileName);

                        case "pdfform":
                            return new HttpResponseMessage(HttpStatusCode.OK)
                            .SendPDF(Xhr.App.One.Core.FileExportExtensions.ToPdfForm(st, request.ShowPageLabels, request.PageOrientation), request.FileName);

                        default: break;
                    }

                    break;

                case "Byte[]":
                    var byteArr = response as byte[];

                    switch (request.Format.ToLower())
                    {
                        case "excel":
                            return new HttpResponseMessage(HttpStatusCode.OK)
                    .SendExcel(byteArr, request.FileName);

                        default: break;
                    }

                    break;

                default: break;
            }

            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }
    }
}
