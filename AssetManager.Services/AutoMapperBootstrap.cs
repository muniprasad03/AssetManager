using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;
using DataModel = AssetManager.Data.Model;
using AssetManager.Models.Asset.ColorLightSignal;
using AssetManager.Models.Asset;

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
            AutoMapper.Mapper.CreateMap<DataModel.Station, Board>()
                    .ForMember(d => d.StationType, opt => opt.Ignore());

            AutoMapper.Mapper.CreateMap<DataModel.StationDetail, BoardDetails>()
                    .ForMember(d => d.StationType, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<DataModel.Board, BoardDetails>()
        .ForMember(d => d.StationType, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<User, DataModel.User>()
                .ForMember(d => d.GroupedStations, opt => opt.MapFrom(src => src.GroupedStations != null ? JsonConvert.SerializeObject(src.GroupedStations) : null));

            AutoMapper.Mapper.CreateMap<ColorLightSignalAsset, DataModel.Asset>()
                  .ForMember(d => d.MetaData, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                  .ForMember(d => d.DOI, opt => opt.MapFrom(src => src.DateOfInstallation == DateTime.MinValue ? (DateTime?)null : src.DateOfInstallation))
                  .ForMember(d => d.DOM, opt => opt.MapFrom(src => src.DateOfManufacture == DateTime.MinValue ? (DateTime?)null : src.DateOfManufacture))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.Asset, ColorLightSignalAsset>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.MetaData) ? JsonConvert.DeserializeObject<ColorLightSignalMetadata>(src.MetaData) : new ColorLightSignalMetadata()))
                .ForMember(d => d.DateOfInstallation, opt => opt.MapFrom(src => src.DOI))
                  .ForMember(d => d.DateOfManufacture, opt => opt.MapFrom(src => src.DOM))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<ColorLightSignalAssetMaintanence, DataModel.AssetMaintanence>()
                  .ForMember(d => d.Metadata, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintanence, ColorLightSignalAssetMaintanence>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<ColorLightSignalMaintanenceMetadata>(src.Metadata) : new ColorLightSignalMaintanenceMetadata()))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintenanceView, ColorLightSignalAssetMaintanence>()
                  .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<ColorLightSignalMaintanenceMetadata>(src.Metadata) : new ColorLightSignalMaintanenceMetadata()))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<PointAssetMaintanence, DataModel.AssetMaintanence>()
                 .ForMember(d => d.Metadata, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                 .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintanence, PointAssetMaintanence>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<PointAssetMaintanenceMetadata>(src.Metadata) : new PointAssetMaintanenceMetadata()))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintenanceView, PointAssetMaintanence>()
                  .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<PointAssetMaintanenceMetadata>(src.Metadata) : new PointAssetMaintanenceMetadata()))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<AxelAssetMaintanence, DataModel.AssetMaintanence>()
              .ForMember(d => d.Metadata, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
              .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintanence, AxelAssetMaintanence>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<AxelAssetMaintanenceMetadata>(src.Metadata) : new AxelAssetMaintanenceMetadata()))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintenanceView, AxelAssetMaintanence>()
                  .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<AxelAssetMaintanenceMetadata>(src.Metadata) : new AxelAssetMaintanenceMetadata()))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<BlockAssetMaintanence, DataModel.AssetMaintanence>()
              .ForMember(d => d.Metadata, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
              .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintanence, BlockAssetMaintanence>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<BlockAssetMaintanenceMetadata>(src.Metadata) : new BlockAssetMaintanenceMetadata()))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintenanceView, BlockAssetMaintanence>()
                  .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<BlockAssetMaintanenceMetadata>(src.Metadata) : new BlockAssetMaintanenceMetadata()))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<TrackAssetMaintanence, DataModel.AssetMaintanence>()
              .ForMember(d => d.Metadata, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
              .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintanence, TrackAssetMaintanence>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<TrackAssetMaintanenceMetadata>(src.Metadata) : new TrackAssetMaintanenceMetadata()))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.AssetMaintenanceView, TrackAssetMaintanence>()
                  .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Metadata) ? JsonConvert.DeserializeObject<TrackAssetMaintanenceMetadata>(src.Metadata) : new TrackAssetMaintanenceMetadata()))
                  .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));


            AutoMapper.Mapper.CreateMap<PointMachineAsset, DataModel.Asset>()
                 .ForMember(d => d.MetaData, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                 .ForMember(d => d.DOI, opt => opt.MapFrom(src => src.DateOfInstallation == DateTime.MinValue ? (DateTime?)null : src.DateOfInstallation))
                 .ForMember(d => d.DOM, opt => opt.MapFrom(src => src.DateOfManufacture == DateTime.MinValue ? (DateTime?)null : src.DateOfManufacture))
                 .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.Asset, PointMachineAsset>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.MetaData) ? JsonConvert.DeserializeObject<PointMachineMetadata>(src.MetaData) : new PointMachineMetadata()))
                .ForMember(d => d.DateOfInstallation, opt => opt.MapFrom(src => src.DOI))
                  .ForMember(d => d.DateOfManufacture, opt => opt.MapFrom(src => src.DOM))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<AxelCounterAsset, DataModel.Asset>()
                 .ForMember(d => d.MetaData, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                 .ForMember(d => d.DOI, opt => opt.MapFrom(src => src.DateOfInstallation == DateTime.MinValue ? (DateTime?)null : src.DateOfInstallation))
                 .ForMember(d => d.DOM, opt => opt.MapFrom(src => src.DateOfManufacture == DateTime.MinValue ? (DateTime?)null : src.DateOfManufacture))
                 .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.Asset, AxelCounterAsset>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.MetaData) ? JsonConvert.DeserializeObject<AxelCounterMetadata>(src.MetaData) : new AxelCounterMetadata()))
                .ForMember(d => d.DateOfInstallation, opt => opt.MapFrom(src => src.DOI))
                  .ForMember(d => d.DateOfManufacture, opt => opt.MapFrom(src => src.DOM))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<BlockInstrumentAsset, DataModel.Asset>()
                 .ForMember(d => d.MetaData, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                 .ForMember(d => d.DOI, opt => opt.MapFrom(src => src.DateOfInstallation == DateTime.MinValue ? (DateTime?)null : src.DateOfInstallation))
                 .ForMember(d => d.DOM, opt => opt.MapFrom(src => src.DateOfManufacture == DateTime.MinValue ? (DateTime?)null : src.DateOfManufacture))
                 .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.Asset, BlockInstrumentAsset>()
                   .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.MetaData) ? JsonConvert.DeserializeObject<BlockInstrumentMetadata>(src.MetaData) : new BlockInstrumentMetadata()))
                .ForMember(d => d.DateOfInstallation, opt => opt.MapFrom(src => src.DOI))
                  .ForMember(d => d.DateOfManufacture, opt => opt.MapFrom(src => src.DOM))
                   .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));


            AutoMapper.Mapper.CreateMap<TrackCircuitAsset, DataModel.Asset>()
                 .ForMember(d => d.MetaData, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Metadata)))
                 .ForMember(d => d.DOI, opt => opt.MapFrom(src => src.DateOfInstallation == DateTime.MinValue ? (DateTime?)null : src.DateOfInstallation))
                 .ForMember(d => d.DOM, opt => opt.MapFrom(src => src.DateOfManufacture == DateTime.MinValue ? (DateTime?)null : src.DateOfManufacture))
                 .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (short)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.Asset, TrackCircuitAsset>()
                 .ForMember(d => d.Metadata, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.MetaData) ? JsonConvert.DeserializeObject<TrackCircuitMetadata>(src.MetaData) : new TrackCircuitMetadata()))
              .ForMember(d => d.DateOfInstallation, opt => opt.MapFrom(src => src.DOI))
                .ForMember(d => d.DateOfManufacture, opt => opt.MapFrom(src => src.DOM))
                 .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<DataModel.Asset, Models.Asset.Asset>()
             .ForMember(d => d.DateOfInstallation, opt => opt.MapFrom(src => src.DOI))
               .ForMember(d => d.DateOfManufacture, opt => opt.MapFrom(src => src.DOM))
                .ForMember(d => d.AssetType, opt => opt.MapFrom(src => (AssetType)src.AssetType));

            AutoMapper.Mapper.CreateMap<Section, DataModel.Section>();
            AutoMapper.Mapper.CreateMap<DataModel.UserLoginActivity, LoginActivity>()
                    .ForMember(d => d.LoginStatus, opt => opt.MapFrom(src => (LoginStatus)src.LoginStatus));
            AutoMapper.Mapper.CreateMap<LoginActivity, DataModel.UserLoginActivity>()
                    .ForMember(d => d.LoginStatus, opt => opt.MapFrom(src => (short)src.LoginStatus));
            AutoMapper.Mapper.CreateMap<DataModel.User, DisplayUser>();

        }
    }
}
