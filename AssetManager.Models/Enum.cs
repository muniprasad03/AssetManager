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
        ElectricalOperatedPoints
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
