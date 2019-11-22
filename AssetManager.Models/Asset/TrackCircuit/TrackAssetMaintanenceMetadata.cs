using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models.Asset
{
    public class TrackAssetMaintanenceMetadata
    {
        public bool OutSideConnections { get; set; }
        public bool FirmnessAndInsulation { get; set; }
        public bool ReplacingCorredBonds { get; set; }
        public bool VisualCheckAndClean { get; set; }
        public bool ShortCircuits { get; set; }
        public bool EngineeringFittness { get; set; }
        public bool BugsAndGluedJoint { get; set; }
        public bool GapsInGlueJoint { get; set; }
        public bool PositionOfBurr { get; set; }
        public SMC9LH SMC9LH { get; set; }
        public SMC9RH SMC9RH { get; set; }
        public SMC10 SMC10 { get; set; }
        public TrackRecordBook RecordBook { get; set; }
    }

    public class SMC9LH
    {
        public string TypeOfRelay { get; set; }
        public DateTime? DateOfInstallation { get; set; }
        public string PUVolt { get; set; }
        public string DAVolts { get; set; }
        public string PUCurrent { get; set; }
        public string DACurrent { get; set; }
        public string RelayResistance { get; set; }
        public string TrackLength { get; set; }
        public string FeedToTrackLength { get; set; }
        public string RelayToTrackLength { get; set; }
        public string TypeOfBallast { get; set; }
        public string TypeOfTrackFeed { get; set; }
        public string TrackFeedSize { get; set; }
        public string ConductorToRelayLength { get; set; }
        public string TypeOfSleeper { get; set; }
        public string TypeOfInsulatedJoints { get; set; }
        public string NoOfBridgesInTrack { get; set; }
        public string NoOfLevelCrossInTrack { get; set; }
    }

    public class SMC9RH
    {
        public string Weather { get; set; }
        public string BallastCondition { get; set; }
        public string PercentageOfBallast { get; set; }
        public string DrainingTrack { get; set; }
        public string ConditionOfRail { get; set; }
        public string ConditionOfBonds { get; set; }
        public string ConditionOfInsulatedJoint { get; set; }
        public string ConditionOfTrackBattery { get; set; }
        public string FeedResistance { get; set; }
        public string TrackFeedVoltage { get; set; }
        public string VFVoltage { get; set; }
        public string IFCurrentOnRails { get; set; }
        public string VRVoltageOnRails { get; set; }
        public string VoltageAtRelayTerminals { get; set; }
        public string IRCurrentAtRelay { get; set; }
        public string BallastResistance { get; set; }
        public string RailResistance { get; set; }
        public string DropShuntValue { get; set; }
        public string PickUpShuntValue { get; set; }
        public string PhaseAngle { get; set; }
        public string NoOfFailures { get; set; }
        public string CauseOfFailure { get; set; }
        public string Remarks { get; set; }
    }

    public class SMC10
    {
        public string JointType { get; set; }
        public string EndPost { get; set; }
        public string ChannelPlate1 { get; set; }
        public string ChannelPlate2 { get; set; }
        public string ChannelPlate3 { get; set; }
        public string ChannelPlate4 { get; set; }
        public string Collet1 { get; set; }
        public string Collet2 { get; set; }
        public string Collet3 { get; set; }
        public string Collet4 { get; set; }
        public string Collet5 { get; set; }
        public string Collet6 { get; set; }
        public string Collet7 { get; set; }
        public string Collet8 { get; set; }
        public bool IsFailed { get; set; }
        public string Remarks { get; set; }
    }

    public class TrackRecordBook
    {
        public string BatteryVoltage { get; set; }
        public string SpecificGravity { get; set; }
        public string ChargerOffLoad { get; set; }
        public string ChargerOnLoad { get; set; }
        public string ChargerCurrent { get; set; }
        public string DropAcrossChock { get; set; }
        public string DropAcrossResistance { get; set; }
        public string FeedEndVoltage { get; set; }
        public string FeedEndCurrent { get; set; }
        public string RelayEndVoltage { get; set; }
        public string RelayEndCurrent { get; set; }
        public string ScheduleDone { get; set; }
        public string Remarks { get; set; }
        public bool Faulty { get; set; }
    }
}
