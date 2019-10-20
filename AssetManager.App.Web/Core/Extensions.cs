using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace AssetManager.App.Web.Core
{
    public static class Extensions
    {
#if DEBUG
        public const string myKey = "BFEBFBFF000806EA-/D4X5NV2/CNCMK0094F0162/";
#endif
#if !DEBUG
        public const string myKey = "BFEBFBFF000306A9-M80-51004802810";
#endif

        public static string LicenceKey { get; set; }

        public static string InitializeLicence()
        {
            var s = (from x in new ManagementObjectSearcher("Select ProcessorId From Win32_processor").Get().Cast<ManagementObject>()
                     select x.GetPropertyValue("ProcessorId")).FirstOrDefault().ToString();

            var m = (from x in new ManagementObjectSearcher("Select SerialNumber From Win32_BaseBoard").Get().Cast<ManagementObject>()
                     select x.GetPropertyValue("SerialNumber")).FirstOrDefault().ToString();
            LicenceKey = s + '-' + m;
            return LicenceKey;
        }

        public static bool IsLicenseValid()
        {
            if (string.IsNullOrEmpty(LicenceKey))
            {
                LicenceKey = InitializeLicence();
            }

            return myKey == LicenceKey;
        }

        /// <summary>
        /// Dispatches the PDF.
        /// </summary>
        /// <param name="response">The response.</param>
        /// <param name="buffer">The buffer.</param>
        /// <param name="fileName">Name of the file.</param>
        /// <returns>Http Response Message</returns>
        public static HttpResponseMessage SendPDF(this HttpResponseMessage response, byte[] buffer, string fileName)
        {
            response.Content = new ByteArrayContent(buffer);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = string.Format("{0}.pdf", fileName) };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            return response;
        }

        /// <summary>
        /// Dispatches the excel.
        /// </summary>
        /// <param name="response">The response.</param>
        /// <param name="buffer">The buffer.</param>
        /// <param name="fileName">Name of the file.</param>
        /// <returns>Http Response Message</returns>
        public static HttpResponseMessage SendExcel(this HttpResponseMessage response, byte[] buffer, string fileName)
        {
            response.Content = new ByteArrayContent(buffer);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = string.Format("{0}.xlsx", fileName) };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            return response;
        }

        /// <summary>
        /// Dispatches the text.
        /// </summary>
        /// <param name="response">The response.</param>
        /// <param name="buffer">The buffer.</param>
        /// <param name="fileName">Name of the file.</param>
        /// <returns>Http Response Message</returns>
        public static HttpResponseMessage SendText(this HttpResponseMessage response, string buffer, string fileName)
        {
            response.Content = new StringContent(buffer);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = string.Format("{0}.txt", fileName) };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            return response;
        }

    }
}