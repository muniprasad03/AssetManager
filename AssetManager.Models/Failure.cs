using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class Failure
    {
        public int Id { get; set; }
        public string SFRNo { get; set; }
        public int  ReportedId { get; set; }
        public int StationId { get; set; }
        public int GearFaultId { get; set; }
        public int ManufactureId { get; set; }
        public int SubGearFaultId { get; set; }
        public string Description { get; set; }
        public string CauseOfFailure { get; set; }
        public int CauseOfFailureId { get; set; }
        public int SubCauseOfFailureId { get; set; }
        public string DLInformation { get; set; }
        public string AxleErrorCode { get; set; }
        public string GearId { get; set; }
        public bool IsTrainLate { get; set; }
        public int? NumberOfTrainsLate { get; set; }
        public DateTime? DateOfInstallOn { get; set; }
        public DateTime? ESMLastVisitOn { get; set; }
        public DateTime? JELastVisitOn { get; set; }
        public DateTime? SSELastVisitOn { get; set; }
        public string TrainLossPunctual { get; set; }
        public string TrainDetained { get; set; }
        public string EquipmentSerialNumber { get; set; }
        public bool FailureChargeable { get; set; }
        public string Department { get; set; }
        public DateTime TimeOfOccurance { get; set; }
        public DateTime? TimeSignalMainInformed { get; set; }
        public DateTime? TimeSignalMainReached { get; set; }
        public DateTime? TimeRectified { get; set; }
        public double? TotalDuration { get; set; }
        public int UpdatedBy { get; set; }

        public VerificationStatus VerificationStatus { get; set; }
    }

    public class FailureView : Failure
    {
        public string GearFault { get; set; }
        public string SubGearFault { get; set; }
        public string CauseOfFailureValue { get; set; }
        public string SubCauseOfFailureValue { get; set; }
        public string Station { get; set; }
        public string Reported { get; set; }
        public string Manufacture { get; set; }
        public string UpdatedByName { get; set; }
        public int SectionId { get; set; }
    }
}
