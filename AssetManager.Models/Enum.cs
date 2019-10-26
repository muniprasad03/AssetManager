using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public enum CompareReportType
    {
        GearAtFault,
        Reported
    }

    public enum SortOrder
    {
        None,
        Asc,
        Desc        
    }

    public enum MonthReportType
    {
        Today = 0,
        ThisMonth = 1,
        LastMonth
    }

    public enum LoginStatus
    {
        None = 0,
        Success = 1,
        PasswordIncorrect = 2,
        InvalidTenantLogin = 3,
        LogOut = 4,
        Other = 50
    }

    public enum StationType
    {
        Station = 0,
        IB = 1,
        IC =  2
    }

    public enum VerificationStatus
    {
        None=0,
        Pending = 1
    }

    public enum BlockDirection
    {
        None = 0,
        UP = 1,
        Down = 2
    }

    public enum AssetType
    {
        None,
        ColourLightSignal,
        ElectricalOperatedPoints,
        TrackCircuit,
        AxelCounter,
        BlockInstrument
    }

    public enum SignalType
    {
        Main,
        Shunt,
        Subsidiary
    }

    public enum SubsidiaryType
    {
        None,
        CallingOn,
        RouteIndicator,
        AMarker,
        AGMarker,
        Stencil,
        NumericDisplay,
        TheaterType
    }

    public enum SignalTypeOfUnit
    {
        None = 0,
        Metallic,
        FRP
    }

    public enum SignalLocation
    {
        None,
        LH,
        RH,
        ExtremeLH,
        ExtremeRH,
        Gantry
    }

    public enum AxelType
    {
        None,
        SSDAC,
        HASSDAC,
        MSDAC,
        DAC
    }

    public enum PointLineType
    {
        None,
        MLARoute,
        MLOtherRoute,
        OtherPortion
    }

    public enum TurnOutType
    {
        None,
        SingleEnded,
        XOver,
        DerailSwitch,
        SingleSlip,
        DoubleDiamondSlip
    }

    public enum RailType {
        None,
        KG52,
        KG60,
        ThickWebSwitch,
    }

    public enum TypeCurve
    {
        None,
        OneIn8,
        OneIn10,
        OneIn12,
        OneIn16
    }

    public enum HCurveType
    {
        None,
        LH,
        RH
    }

    public enum SleeperType
    {
        None,
        PRC,
        Wooden,
        Steel
    }

    public enum SacrificialMast
    {
        None,
        Provided,
        NotProvided
    }

    public enum AttachFileType
    {
        None,
        GearImage,
        Specification,
        TenderDoc,
        Manual,
        Other
    }
}
