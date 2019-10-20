using iTextSharp.text;
using iTextSharp.text.pdf;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Xhr.App.One.Core
{
    /// <summary>
    /// Represents the file export extension.
    /// </summary>
    internal static class FileExportExtensions
    {
        /// <summary>
        /// Writes to PDF.
        /// </summary>
        /// <param name="dt">The data table.</param>
        /// <returns>the file byte array</returns>
        public static byte[] WriteToPdf(DataTable dt)
        {
            Document document = new Document();
            System.IO.MemoryStream memStream = new System.IO.MemoryStream();
            PdfWriter writer = PdfWriter.GetInstance(document, memStream);
            document.Open();
            iTextSharp.text.Font font5 = iTextSharp.text.FontFactory.GetFont(FontFactory.HELVETICA, 5);

            PdfPTable table = new PdfPTable(dt.Columns.Count);
            float[] docColWidths = new float[dt.Columns.Count];

            PdfPCell cell = new PdfPCell(new Phrase(string.IsNullOrEmpty(dt.TableName) ? "Report" : dt.TableName));

            cell.Colspan = dt.Columns.Count;
            int colIndex = 0;
            foreach (DataColumn c in dt.Columns)
            {
                table.AddCell(new Phrase(c.ColumnName, font5));
                docColWidths[colIndex++] = 4f;
            }

            table.SetWidths(docColWidths);
            table.WidthPercentage = 100;
            foreach (DataRow drow in dt.Rows)
            {
                foreach (DataColumn clm in dt.Columns)
                {
                    table.AddCell(new Phrase(drow[clm.ColumnName].ToString(), font5));
                }
            }

            document.Add(table);
            document.Close();
            return memStream.ToArray();
        }

        /// <summary>
        /// Generates the PDF from template.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <returns>PDF byte stream</returns>
        public static byte[] GeneratePdfFromTemplate(string template)
        {
            var document = new Document();
            using (var memStream = new System.IO.MemoryStream())
            {
                using (var pdfWriter = PdfWriter.GetInstance(document, memStream))
                {
                    document.Open();
                    var htmlWorker = new iTextSharp.text.html.simpleparser.HTMLWorker(document);
                    htmlWorker.Parse(new System.IO.StringReader(GetTemplateData(template)));
                }

                document.Close();
                return memStream.ToArray();
            }
        }

        /// <summary>
        /// Generates the PDF from HTML.
        /// </summary>
        /// <param name="htmlContent">Content of the HTML.</param>
        /// <param name="showPageLabels">if set to <c>true</c> [show page labels].</param>
        /// <param name="horizontal">if set to <c>true</c> [horizontal].</param>
        /// <returns>
        /// PDF byte stream
        /// </returns>
        public static byte[] GeneratePdfFromHtml(string htmlContent, bool showPageLabels = false, bool horizontal = true)
        {
            byte[] pdfBytes;
            //using (var stream = new MemoryStream())
            //{
            //    using (var htmlStream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(htmlContent)))
            //    {
            //        using (var cssStream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(string.Empty)))
            //        {
            //            var document = new Document(PageSize.A4, 20f, 25f, 20f, 10f);
            //            using (var pdfWriter = PdfWriter.GetInstance(document, stream))
            //            {
            //                if (horizontal)
            //                {
            //                    document.SetPageSize(iTextSharp.text.PageSize.A4.Rotate());
            //                }

            //                if (showPageLabels)
            //                {
            //                    document.SetMargins(5f, 5f, 40f, 40f);
            //                    PageEventHelper pageEventHelper = new PageEventHelper();
            //                    pdfWriter.PageEvent = pageEventHelper;
            //                }

            //                document.Open();
            //                iTextSharp.tool.xml.XMLWorkerHelper.GetInstance().ParseXHtml(pdfWriter, document, htmlStream, cssStream);
            //                document.Close();
            //            }
            //        }
            //    }

            //    pdfBytes = stream.ToArray();
            //}

            return null;
        }

        /// <summary>
        /// Gets the template data.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <returns>Template stream</returns>
        public static string GetTemplateData(string fileName)
        {
            string relativePath = "~/Content/PdfTemplates/" + fileName;
            return System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath(relativePath)).Replace("\r\n", string.Empty);
        }

        /// <summary>
        /// Writes to excel.
        /// </summary>
        /// <param name="dt">The data table.</param>
        /// <param name="sheetName">Name of the sheet.</param>
        /// <returns>
        /// the excel file.
        /// </returns>
        public static byte[] WriteToExcel(DataTable dt, string sheetName)
        {
            MemoryStream stream = new MemoryStream();
            using (SLDocument document = new SLDocument())
            {
                var currentSheet = document.GetCurrentWorksheetName();
                document.RenameWorksheet(currentSheet, sheetName);
                SLStyle columnHeader = document.CreateStyle();
                columnHeader.Font.Bold = true;

                document.ImportDataTable(1, 1, dt, true);
                document.SetCellStyle(1, 1, 1, dt.Columns.Count, columnHeader);
                document.AutoFitColumn(1, dt.Columns.Count);
                document.AutoFitRow(1, dt.Rows.Count);
                document.SaveAs(stream);
            }

            return stream.ToArray();
        }

        /// <summary>
        /// Writes to excel.
        /// </summary>
        /// <param name="dt">The data table.</param>
        /// <param name="sheetName">Name of the sheet.</param>
        /// <param name="orgName">Name of the org.</param>
        /// <param name="sheetHeader">The sheet header.</param>
        /// <returns>
        /// the excel file.
        /// </returns>
        public static byte[] WriteToExcel(DataTable dt, string sheetName, string orgName, string sheetHeader)
        {
            MemoryStream stream = new MemoryStream();
            using (SLDocument document = new SLDocument())
            {
                var currentSheet = document.GetCurrentWorksheetName();
                document.RenameWorksheet(currentSheet, sheetName);

                // Set current Org name as main header for the sheet
                //document.SetCellValue(1, 1, orgName);
                //document.MergeWorksheetCells(1, 1, 1, dt.Columns.Count);

                //SLStyle orgNameStyle = document.CreateStyle();
                //orgNameStyle.Font.FontName = "Calibri";
                //orgNameStyle.Font.FontSize = 14;
                //orgNameStyle.Font.FontColor = System.Drawing.Color.Black;
                //orgNameStyle.Font.Bold = true;
                //orgNameStyle.Alignment.Horizontal = HorizontalAlignmentValues.Center;
                //orgNameStyle.Alignment.Vertical = VerticalAlignmentValues.Center;
                //orgNameStyle.Fill.SetPattern(PatternValues.Solid, System.Drawing.Color.LightGray, SLThemeColorIndexValues.Light1Color);
                //orgNameStyle.Fill.SetPatternBackgroundColor(SLThemeColorIndexValues.Light1Color);
                //document.SetCellStyle(1, 1, orgNameStyle);

                // Set sheet title and merge the sheet name
                document.SetCellValue(1, 1, sheetHeader);
                document.MergeWorksheetCells(1, 1, 1, dt.Columns.Count);

                SLStyle header = document.CreateStyle();
                header.Font.FontName = "Calibri";
                header.Font.FontSize = 12;
                header.Font.FontColor = System.Drawing.Color.Black;
                header.Font.Bold = true;
                header.Alignment.Horizontal = HorizontalAlignmentValues.Center;
                header.Alignment.Vertical = VerticalAlignmentValues.Center;

                document.SetCellStyle(1, 1, header);

                SLStyle columnHeader = document.CreateStyle();
                columnHeader.Font.Bold = true;

                document.ImportDataTable(2, 1, dt, true);
                document.AutoFitColumn(1, dt.Columns.Count);
                document.AutoFitRow(2, dt.Rows.Count);

                document.SetCellStyle(2, 1, 2, dt.Columns.Count, columnHeader);
                var footerIndex = dt.Rows.Count + 5;
                document.SetCellValue(footerIndex, 1, string.Format("Generated on {0}", DateTime.Now.ToString("dd/MM/yyyy")));
                document.MergeWorksheetCells(footerIndex, 1, footerIndex, 2);
                document.SetCellValue(footerIndex, 3, "This report is generated by Krishna Infotech.");
                document.MergeWorksheetCells(footerIndex, 3, footerIndex, dt.Columns.Count);
                document.SaveAs(stream);
            }

            return stream.ToArray();
        }

        /// <summary>
        /// To the PDF byte array.
        /// </summary>
        /// <param name="dt">The data table.</param>
        /// <returns>the content in byte array.</returns>
        public static byte[] ToPdfByteArray(this DataTable dt)
        {
            return FileExportExtensions.WriteToPdf(dt);
        }

        /// <summary>
        /// To the PDF form.
        /// </summary>
        /// <param name="htmlContent">Content of the HTML.</param>
        /// <param name="showPageLabels">if set to <c>true</c> [show page labels].</param>
        /// <param name="horizontal">if set to <c>true</c> [horizontal].</param>
        /// <returns>
        /// PDF file bytes.
        /// </returns>
        public static byte[] ToPdfForm(this string htmlContent, bool showPageLabels, bool horizontal)
        {
            return FileExportExtensions.GeneratePdfFromHtml(htmlContent, showPageLabels, horizontal);
        }

        /// <summary>
        /// To the excel byte array.
        /// </summary>
        /// <param name="dt">The data table.</param>
        /// <param name="sheetName">Name of the sheet.</param>
        /// <param name="orgName">Name of the org.</param>
        /// <param name="sheetHeader">The sheet header.</param>
        /// <returns>
        /// the byte array.
        /// </returns>
        public static byte[] ToExcelByteArray(this DataTable dt, string sheetName, string orgName, string sheetHeader = null)
        {
            return string.IsNullOrEmpty(sheetHeader) ? FileExportExtensions.WriteToExcel(dt, sheetName) : FileExportExtensions.WriteToExcel(dt, sheetName, orgName, sheetHeader);
        }
    }

    ///// <summary>
    ///// page event helper
    ///// </summary>
    //internal class pageeventhelper : pdfpageeventhelper
    //{
    //    /// <summary>
    //    /// gets or sets the content.
    //    /// </summary>
    //    /// <value>
    //    /// the content.
    //    /// </value>
    //    public pdfcontentbyte content { get; set; }

    //    /// <summary>
    //    /// gets or sets the footer template.
    //    /// </summary>
    //    /// <value>
    //    /// the footer template.
    //    /// </value>
    //    public pdftemplate footertemplate { get; set; }

    //    /// <summary>
    //    /// the base font
    //    /// </summary>
    //    private readonly basefont basefont = basefont.createfont(basefont.helvetica, basefont.cp1252, basefont.not_embedded);

    //    /// <summary>
    //    /// called when document is opened
    //    /// </summary>
    //    /// <param name="writer">writer for this document</param>
    //    /// <param name="document">the document</param>
    //    public override void onopendocument(pdfwriter writer, document document)
    //    {
    //        this.content = writer.directcontent;
    //        this.footertemplate = this.content.createtemplate(100, 50);
    //    }

    //    /// <summary>
    //    /// called when [start page].
    //    /// </summary>
    //    /// <param name="writer">the writer.</param>
    //    /// <param name="document">the document.</param>
    //    public override void onstartpage(pdfwriter writer, document document)
    //    {
    //        base.onstartpage(writer, document);
    //        document.setmargins(5f, 5f, 45f, 40f);
    //    }

    //    /// <summary>
    //    /// called when a page is finished, just before being written to the document.
    //    /// </summary>
    //    /// <param name="writer">writer for this document</param>
    //    /// <param name="document">the document</param>
    //    public override void onendpage(pdfwriter writer, document document)
    //    {
    //        base.onendpage(writer, document);

    //        itextsharp.text.font smallfont = new itextsharp.text.font(itextsharp.text.font.fontfamily.helvetica, 8f, itextsharp.text.font.normal, itextsharp.text.basecolor.black);
    //        this.content.addtemplate(this.footertemplate, document.pagesize.getright(57), document.pagesize.getbottom(20));

    //        ////create pdftable object
    //        var pdftab = new pdfptable(3);

    //        //// create footer cells
    //        var leftcell = new pdfpcell(new phrase(string.format("generated on {0}", datetime.utcnow.tostring("dd/mm/yyyy")), smallfont));
    //        var centercell = new pdfpcell(new phrase("this report is generated by keka hr and payroll software", smallfont));
    //        var rightcell = new pdfpcell(new phrase(string.format("page {0} of", writer.pagenumber), smallfont));

    //        ////set the alignment of all three cells and set border to 0
    //        leftcell.horizontalalignment = element.align_left;
    //        centercell.horizontalalignment = element.align_center;
    //        rightcell.horizontalalignment = element.align_right;

    //        leftcell.border = 0;
    //        centercell.border = 0;
    //        rightcell.border = 0;

    //        leftcell.paddingleft = 10;
    //        ////add all three cells into pdftable
    //        pdftab.addcell(leftcell);
    //        pdftab.addcell(centercell);
    //        pdftab.addcell(rightcell);

    //        pdftab.totalwidth = document.pagesize.width - 100f;
    //        pdftab.widthpercentage = 70;

    //        ////call writeselectedrows of pdftable. this writes rows from pdfwriter in pdftable
    //        ////first param is start row. -1 indicates there is no end row and all the rows to be included to write
    //        ////third and fourth param is x and y position to start writing
    //        pdftab.writeselectedrows(0, -1, 40, document.pagesize.getbottom(30), writer.directcontent);
    //    }

    //    /// <summary>
    //    /// called when [close document].
    //    /// </summary>
    //    /// <param name="writer">the writer.</param>
    //    /// <param name="document">the document.</param>
    //    public override void onclosedocument(pdfwriter writer, document document)
    //    {
    //        base.onclosedocument(writer, document);
    //        this.footertemplate.begintext();
    //        this.footertemplate.setfontandsize(this.basefont, 8);
    //        this.footertemplate.settextmatrix(0, 0);
    //        this.footertemplate.showtext(string.format("{0}", writer.pagenumber.tostring()));
    //        this.footertemplate.endtext();
    //    }
    //}
}