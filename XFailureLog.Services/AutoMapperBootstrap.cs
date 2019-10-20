using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;
using DataModel = AssetManager.Data.Model;

namespace AssetManager
{
 public class AutoMapperBootstrap
    {
        /// <summary>
        /// The object type handling settings
        /// </summary>
        private static JsonSerializerSettings objectTypeHandlingSettings = new JsonSerializerSettings() { TypeNameHandling = TypeNameHandling.All };

        /// <summary>
        /// The array serializer setting
        /// </summary>
        private static JsonSerializerSettings arraySerializerSetting = new JsonSerializerSettings() { TypeNameHandling = TypeNameHandling.Auto };

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        public static void Init()
        {
            AutoMapper.Mapper.CreateMap<DataModel.User, User>()
                   .ForMember(d => d.GroupedStations, opt => opt.MapFrom(src => src.GroupedStations != null ? JsonConvert.DeserializeObject<List<int>>(src.GroupedStations) : new List<int>()));
            AutoMapper.Mapper.CreateMap<DataModel.User, DisplayUser>();
            AutoMapper.Mapper.CreateMap<DataModel.Section, Section>();
            AutoMapper.Mapper.CreateMap<DataModel.GearFault, GearFault>();
            AutoMapper.Mapper.CreateMap<DataModel.Department, Department>();
            AutoMapper.Mapper.CreateMap<DataModel.Station, Board>()
                    .ForMember(d => d.StationType, opt => opt.MapFrom(src => src.StationType != null ? (StationType)src.StationType : StationType.Station));
            AutoMapper.Mapper.CreateMap<Manufacture, DataModel.Manufacture>();
            AutoMapper.Mapper.CreateMap<DataModel.Manufacture, Manufacture>();
            AutoMapper.Mapper.CreateMap<GearFault, DataModel.GearFault>();
            AutoMapper.Mapper.CreateMap<CauseOfFailure, DataModel.CauseOfFailure>();
            AutoMapper.Mapper.CreateMap<DataModel.CauseOfFailure, CauseOfFailure>();
            AutoMapper.Mapper.CreateMap<DataModel.SubCauseOfFailure, SubCauseOfFailure>();
            AutoMapper.Mapper.CreateMap<SubCauseOfFailure, DataModel.SubCauseOfFailure>();
            AutoMapper.Mapper.CreateMap<SubGearFualt, DataModel.SubGearFualt>();
            AutoMapper.Mapper.CreateMap<DataModel.SubGearFualt, SubGearFualt>();
            AutoMapper.Mapper.CreateMap<Board, DataModel.Station>()
                .ForMember(d => d.StationType, opt => opt.MapFrom(src => (short)src.StationType));
            AutoMapper.Mapper.CreateMap<Department, DataModel.Reported>();
            AutoMapper.Mapper.CreateMap<DataModel.Work, Pointer>();
            AutoMapper.Mapper.CreateMap<DataModel.StationDetail, BoardDetails>()
                    .ForMember(d => d.StationType, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<DataModel.Board, BoardDetails>()
        .ForMember(d => d.StationType, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<DataModel.Failure, Failure>()
                    .ForMember(d => d.VerificationStatus, opt => opt.MapFrom(src => (VerificationStatus)src.VerificationStatus));
            AutoMapper.Mapper.CreateMap<DataModel.FailureView, FailureView>();
            AutoMapper.Mapper.CreateMap<DataModel.BlockRquestView, BlockRequestView>()
                    .ForMember(d => d.Direction, opt => opt.MapFrom(src => (BlockDirection)src.Direction))
                    .ForMember(d => d.VerificationStatus, opt => opt.MapFrom(src => (VerificationStatus)src.VerificationStatus))
                   .ForMember(d => d.AllowedTimings, opt => opt.MapFrom(src => src.AllowedTimings != null ? JsonConvert.DeserializeObject<List<BlockTime>>(src.AllowedTimings) : new List<BlockTime>()));
            AutoMapper.Mapper.CreateMap<DataModel.BlockRquest, BlockRequest>()
                    .ForMember(d => d.Direction, opt => opt.MapFrom(src => (BlockDirection)src.Direction))
                    .ForMember(d => d.VerificationStatus, opt => opt.MapFrom(src => (VerificationStatus)src.VerificationStatus))
              .ForMember(d => d.AllowedTimings, opt => opt.MapFrom(src => src.AllowedTimings != null ? JsonConvert.DeserializeObject<List<BlockTime>>(src.AllowedTimings) : new List<BlockTime>()));

            AutoMapper.Mapper.CreateMap<BlockRequest, DataModel.BlockRquest>()
                .ForMember(d => d.AllowedTimings, opt => opt.MapFrom(src => src.AllowedTimings != null ? JsonConvert.SerializeObject(src.AllowedTimings) : null))
                    .ForMember(d => d.Direction, opt => opt.MapFrom(src => (short)src.Direction))
                    .ForMember(d => d.VerificationStatus, opt => opt.MapFrom(src => (short)src.VerificationStatus));
            AutoMapper.Mapper.CreateMap<Failure, DataModel.Failure>()
                    .ForMember(d => d.VerificationStatus, opt => opt.MapFrom(src => (short)src.VerificationStatus));
            AutoMapper.Mapper.CreateMap<User, DataModel.User>()
                .ForMember(d => d.GroupedStations, opt => opt.MapFrom(src => src.GroupedStations != null ? JsonConvert.SerializeObject(src.GroupedStations) : null));
            //AutoMapper.Mapper.CreateMap<Category, DataModel.Category>();
            AutoMapper.Mapper.CreateMap<Section, DataModel.Section>();
            AutoMapper.Mapper.CreateMap<Pointer, DataModel.Work>();
            AutoMapper.Mapper.CreateMap<DataModel.UserLoginActivity, LoginActivity>()
                    .ForMember(d => d.LoginStatus, opt => opt.MapFrom(src => (LoginStatus)src.LoginStatus));
            AutoMapper.Mapper.CreateMap<LoginActivity, DataModel.UserLoginActivity>()
                    .ForMember(d => d.LoginStatus, opt => opt.MapFrom(src => (short)src.LoginStatus));
            AutoMapper.Mapper.CreateMap<DataModel.AxleGearCode, AxleGearCode>();
            //AutoMapper.Mapper.CreateMap<DataModel.User, DisplayUser>();

        }
    }
}
