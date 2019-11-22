using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class BlockAssetMaintanenceMetadata
    {
        public bool LockAndSeal { get; set; }
        public bool SMLock { get; set; }
        public bool NeedleIndicator { get; set; }
        public bool ConditionOfFitting { get; set; }
        public bool BatteriesCleanliness { get; set; }
        public bool TelephoneChord { get; set; }
        public BlockRecordBook RecordBook { get; set; }
    }

    public class BlockRecordBook
    {
        public bool HandleChangePB { get; set; }
        public bool SealAndLockOfRelay { get; set; }
        public bool HandleChangeTCFOrTGF { get; set; }
        public bool ForceDrobingNToTGF { get; set; }
        public bool LSSLineClear { get; set; }
        public bool LSSTrackCircuit { get; set; }
        public bool LSSLineGear { get; set; }
        public bool HSTrackCircuit { get; set; }
        public bool HandleNormalizeWithSM { get; set; }
        public bool HandleNormalizeWithSMWithBlock { get; set; }
        public bool CancelWithSM { get; set; }
        public bool NToPBCancellation { get; set; }
        public bool SMKeyInstrument { get; set; }
        public bool ShuntingKeyFunction { get; set; }
        public bool CarrierFrequency { get; set; }
        public bool BuzzerAndIndicator { get; set; }
        public bool CountersMovement { get; set; }
        public bool TelphoneWorking { get; set; }
        public bool WirringConnections { get; set; }
        public bool Clean_Spring_Segment_Presure { get; set; }
        public bool InsulatedLead { get; set; }
        public bool ReferenceMessage { get; set; }
        public bool FullDeflectionIndicator { get; set; }
        public bool InstrumentDue { get; set; }
        public bool BatteryClean { get; set; }
        public bool MechanicalPartsCondition { get; set; }
        public bool LineClearSignal { get; set; }
        public bool OpposingLastSignal { get; set; }
        public bool ArrivalTrainSignal { get; set; }
        public bool PushButtonSelfRestore { get; set; }
        public bool BlockBellArmature { get; set; }
        public string LineCurrent { get; set; }
        public string LineVoltage { get; set; }
        public string Remarks { get; set; }
        public bool Faulty { get; set; }
    }
}
