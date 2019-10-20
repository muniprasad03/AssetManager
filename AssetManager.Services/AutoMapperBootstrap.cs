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
            AutoMapper.Mapper.CreateMap<DataModel.Station, Board>();
            AutoMapper.Mapper.CreateMap<DataModel.StationDetail, BoardDetails>()
                    .ForMember(d => d.StationType, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<DataModel.Board, BoardDetails>()
        .ForMember(d => d.StationType, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<User, DataModel.User>()
                .ForMember(d => d.GroupedStations, opt => opt.MapFrom(src => src.GroupedStations != null ? JsonConvert.SerializeObject(src.GroupedStations) : null));
            //AutoMapper.Mapper.CreateMap<Category, DataModel.Category>();
            AutoMapper.Mapper.CreateMap<Section, DataModel.Section>();
            AutoMapper.Mapper.CreateMap<DataModel.UserLoginActivity, LoginActivity>()
                    .ForMember(d => d.LoginStatus, opt => opt.MapFrom(src => (LoginStatus)src.LoginStatus));
            AutoMapper.Mapper.CreateMap<LoginActivity, DataModel.UserLoginActivity>()
                    .ForMember(d => d.LoginStatus, opt => opt.MapFrom(src => (short)src.LoginStatus));
            AutoMapper.Mapper.CreateMap<DataModel.User, DisplayUser>();

        }
    }
}
