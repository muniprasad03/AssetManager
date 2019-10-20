using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;
using AssetManager.Models.Reports;

namespace AssetManager.Services
{
    public interface IReportService
    {
        List<FailureView> GetFailures(DateTime from, DateTime to);
        List<FailureView> GetFailures(FailureFilterRequest failureFilterRequest);

        List<AssetManager.Models.FailureView> GetFailureCauses(FailureCauseFilterRequest request);
        dynamic GetCostStats();

        dynamic GetGearFaultStats();

        List<ReportCompareStats> GetCompareStats(CompareStatsFilterRequest request);

        List<StationSummaryStats> GetStationSummaryStats(StationSummaryStatsFilterRequest request);

        List<AssetManager.Models.FailureView> GetFailureReport(FailureFilterRequest request);
        List<AssetManager.Models.FailureView> GetFailureCauseReport(FailureCauseFilterRequest request);

        byte[] GetFailureExportReport(IEnumerable<FailureView> failures, string workSheetName);

    }
}
