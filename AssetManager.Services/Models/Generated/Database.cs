
// This file was automatically generated by the PetaPoco T4 Template
// Do not make changes directly to this file - edit the template instead
// 
// The following connection settings were used to generate this file
// 
//     Connection String Name: `XAsset`
//     Provider:               `System.Data.SqlClient`
//     Connection String:      `Data Source=.\sqlexpress;Initial Catalog=XAsset;User ID=sa;password=**zapped**;`
//     Schema:                 ``
//     Include Views:          `True`

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PetaPoco;

namespace AssetManager.Data.Model
{
	public partial class XAssetDB : Database
	{
		public XAssetDB() 
			: base("XAsset")
		{
			CommonConstruct();
		}

		public XAssetDB(string connectionStringName) 
			: base(connectionStringName)
		{
			CommonConstruct();
		}
		
		partial void CommonConstruct();
		
		public interface IFactory
		{
			XAssetDB GetInstance();
		}
		
		public static IFactory Factory { get; set; }
        public static XAssetDB GetInstance()
        {
			if (_instance!=null)
				return _instance;
				
			if (Factory!=null)
				return Factory.GetInstance();
			else
				return new XAssetDB();
        }

		[ThreadStatic] static XAssetDB _instance;
		
		public override void OnBeginTransaction()
		{
			if (_instance==null)
				_instance=this;
		}
		
		public override void OnEndTransaction()
		{
			if (_instance==this)
				_instance=null;
		}
        
		public class Record<T> where T:new()
		{
			public static XAssetDB repo { get { return XAssetDB.GetInstance(); } }
			public bool IsNew() { return repo.IsNew(this); }
			public object Insert() { return repo.Insert(this); }
			public int Update(IEnumerable<string> columns) { return repo.Update(this, columns); }
			public static int Update(string sql, params object[] args) { return repo.Update<T>(sql, args); }
			public static int Update(Sql sql) { return repo.Update<T>(sql); }
			public int Delete() { return repo.Delete(this); }
			public static int Delete(string sql, params object[] args) { return repo.Delete<T>(sql, args); }
			public static int Delete(Sql sql) { return repo.Delete<T>(sql); }
			public static int Delete(object primaryKey) { return repo.Delete<T>(primaryKey); }
			public static bool Exists(object primaryKey) { return repo.Exists<T>(primaryKey); }
			public static T SingleOrDefault(object primaryKey) { return repo.SingleOrDefault<T>(primaryKey); }
			public static T SingleOrDefault(string sql, params object[] args) { return repo.SingleOrDefault<T>(sql, args); }
			public static T SingleOrDefault(Sql sql) { return repo.SingleOrDefault<T>(sql); }
			public static T FirstOrDefault(string sql, params object[] args) { return repo.FirstOrDefault<T>(sql, args); }
			public static T FirstOrDefault(Sql sql) { return repo.FirstOrDefault<T>(sql); }
			public static T Single(object primaryKey) { return repo.Single<T>(primaryKey); }
			public static T Single(string sql, params object[] args) { return repo.Single<T>(sql, args); }
			public static T Single(Sql sql) { return repo.Single<T>(sql); }
			public static T First(string sql, params object[] args) { return repo.First<T>(sql, args); }
			public static T First(Sql sql) { return repo.First<T>(sql); }
			public static List<T> Fetch(string sql, params object[] args) { return repo.Fetch<T>(sql, args); }
			public static List<T> Fetch(Sql sql) { return repo.Fetch<T>(sql); }
			public static List<T> Fetch(long page, long itemsPerPage, string sql, params object[] args) { return repo.Fetch<T>(page, itemsPerPage, sql, args); }
			public static List<T> Fetch(long page, long itemsPerPage, Sql sql) { return repo.Fetch<T>(page, itemsPerPage, sql); }
			public static List<T> SkipTake(long skip, long take, string sql, params object[] args) { return repo.SkipTake<T>(skip, take, sql, args); }
			public static List<T> SkipTake(long skip, long take, Sql sql) { return repo.SkipTake<T>(skip, take, sql); }
			public static Page<T> Page(long page, long itemsPerPage, string sql, params object[] args) { return repo.Page<T>(page, itemsPerPage, sql, args); }
			public static Page<T> Page(long page, long itemsPerPage, Sql sql) { return repo.Page<T>(page, itemsPerPage, sql); }
			public static IEnumerable<T> Query(string sql, params object[] args) { return repo.Query<T>(sql, args); }
			public static IEnumerable<T> Query(Sql sql) { return repo.Query<T>(sql); }
			
			private Dictionary<string,bool> ModifiedColumns;
			private void OnLoaded()
			{
				ModifiedColumns = new Dictionary<string,bool>();
			}
			protected void MarkColumnModified(string column_name)
			{
				if (ModifiedColumns!=null)
					ModifiedColumns[column_name]=true;
			}
			public int Update() 
			{ 
				if (ModifiedColumns==null)
					return repo.Update(this); 

				int retv = repo.Update(this, ModifiedColumns.Keys);
				ModifiedColumns.Clear();
				return retv;
			}
			public void Save() 
			{ 
				if (repo.IsNew(this))
					repo.Insert(this);
				else
					Update();
			}
		}
	}

    [TableName("Asset")]
    [PrimaryKey("Id")]
    [ExplicitColumns]
    public partial class Asset : XAssetDB.Record<Asset>
    {
        [Column]
        public int Id
        {
            get
            {
                return _Id;
            }
            set
            {
                _Id = value;
                MarkColumnModified("Id");
            }
        }
        int _Id;

        [Column]
        public int StationId
        {
            get
            {
                return _StationId;
            }
            set
            {
                _StationId = value;
                MarkColumnModified("StationId");
            }
        }
        int _StationId;

        [Column]
        public string Department
        {
            get
            {
                return _Department;
            }
            set
            {
                _Department = value;
                MarkColumnModified("Department");
            }
        }
        string _Department;

        [Column]
        public string MainCategory
        {
            get
            {
                return _MainCategory;
            }
            set
            {
                _MainCategory = value;
                MarkColumnModified("MainCategory");
            }
        }
        string _MainCategory;

        [Column]
        public short AssetType
        {
            get
            {
                return _AssetType;
            }
            set
            {
                _AssetType = value;
                MarkColumnModified("AssetType");
            }
        }
        short _AssetType;

        [Column]
        public string Latitude
        {
            get
            {
                return _Latitude;
            }
            set
            {
                _Latitude = value;
                MarkColumnModified("Latitude");
            }
        }
        string _Latitude;

        [Column]
        public string Longitude
        {
            get
            {
                return _Longitude;
            }
            set
            {
                _Longitude = value;
                MarkColumnModified("Longitude");
            }
        }
        string _Longitude;

        [Column]
        public string Make
        {
            get
            {
                return _Make;
            }
            set
            {
                _Make = value;
                MarkColumnModified("Make");
            }
        }
        string _Make;

        [Column]
        public DateTime? DOM
        {
            get
            {
                return _DOM;
            }
            set
            {
                _DOM = value;
                MarkColumnModified("DOM");
            }
        }
        DateTime? _DOM;

        [Column]
        public DateTime? DOI
        {
            get
            {
                return _DOI;
            }
            set
            {
                _DOI = value;
                MarkColumnModified("DOI");
            }
        }
        DateTime? _DOI;
       
        [Column]
        public string Model
        {
            get
            {
                return _Model;
            }
            set
            {
                _Model = value;
                MarkColumnModified("Model");
            }
        }
        string _Model;

        [Column]
        public string QRCode
        {
            get
            {
                return _QRCode;
            }
            set
            {
                _QRCode = value;
                MarkColumnModified("QRCode");
            }
        }
        string _QRCode;
     
        [Column]
        public string MetaData
        {
            get
            {
                return _MetaData;
            }
            set
            {
                _MetaData = value;
                MarkColumnModified("MetaData");
            }
        }
        string _MetaData;

        [Column]
        public DateTime DateCreated
        {
            get
            {
                return _DateCreated;
            }
            set
            {
                _DateCreated = value;
                MarkColumnModified("DateCreated");
            }
        }
        DateTime _DateCreated;

        [Column]
        public DateTime DateModified
        {
            get
            {
                return _DateModified;
            }
            set
            {
                _DateModified = value;
                MarkColumnModified("DateModified");
            }
        }
        DateTime _DateModified;

        [Column]
        public string CreatedBy
        {
            get
            {
                return _CreatedBy;
            }
            set
            {
                _CreatedBy = value;
                MarkColumnModified("CreatedBy");
            }
        }
        string _CreatedBy;

        [Column]
        public string ModifiedBy
        {
            get
            {
                return _ModifiedBy;
            }
            set
            {
                _ModifiedBy = value;
                MarkColumnModified("ModifiedBy");
            }
        }
        string _ModifiedBy;

        [Column]
        public bool IsDeleted
        {
            get
            {
                return _IsDeleted;
            }
            set
            {
                _IsDeleted = value;
                MarkColumnModified("IsDeleted");
            }
        }
        bool _IsDeleted;

        [Column]
        public DateTime? DateDeleted
        {
            get
            {
                return _DateDeleted;
            }
            set
            {
                _DateDeleted = value;
                MarkColumnModified("DateDeleted");
            }
        }
        DateTime? _DateDeleted;
    }

    [TableName("User")]
	[PrimaryKey("Id")]
	[ExplicitColumns]
    public partial class User : XAssetDB.Record<User>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public Guid UID 
		{ 
			get
			{
				return _UID;
			}
			set
			{
				_UID = value;
				MarkColumnModified("UID");
			}
		}
		Guid _UID;

        [Column] 
		public string LoginId 
		{ 
			get
			{
				return _LoginId;
			}
			set
			{
				_LoginId = value;
				MarkColumnModified("LoginId");
			}
		}
		string _LoginId;

        [Column] 
		public string UserName 
		{ 
			get
			{
				return _UserName;
			}
			set
			{
				_UserName = value;
				MarkColumnModified("UserName");
			}
		}
		string _UserName;

        [Column] 
		public string Email 
		{ 
			get
			{
				return _Email;
			}
			set
			{
				_Email = value;
				MarkColumnModified("Email");
			}
		}
		string _Email;

        [Column] 
		public string DisplayName 
		{ 
			get
			{
				return _DisplayName;
			}
			set
			{
				_DisplayName = value;
				MarkColumnModified("DisplayName");
			}
		}
		string _DisplayName;

        [Column] 
		public string Designation 
		{ 
			get
			{
				return _Designation;
			}
			set
			{
				_Designation = value;
				MarkColumnModified("Designation");
			}
		}
		string _Designation;

        [Column] 
		public string PhoneNumber 
		{ 
			get
			{
				return _PhoneNumber;
			}
			set
			{
				_PhoneNumber = value;
				MarkColumnModified("PhoneNumber");
			}
		}
		string _PhoneNumber;

        [Column] 
		public bool? IsAdmin 
		{ 
			get
			{
				return _IsAdmin;
			}
			set
			{
				_IsAdmin = value;
				MarkColumnModified("IsAdmin");
			}
		}
		bool? _IsAdmin;

        [Column] 
		public bool? CanAllocateBlock 
		{ 
			get
			{
				return _CanAllocateBlock;
			}
			set
			{
				_CanAllocateBlock = value;
				MarkColumnModified("CanAllocateBlock");
			}
		}
		bool? _CanAllocateBlock;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

        [Column] 
		public bool? IsReportViewer 
		{ 
			get
			{
				return _IsReportViewer;
			}
			set
			{
				_IsReportViewer = value;
				MarkColumnModified("IsReportViewer");
			}
		}
		bool? _IsReportViewer;

        [Column] 
		public string GroupedStations 
		{ 
			get
			{
				return _GroupedStations;
			}
			set
			{
				_GroupedStations = value;
				MarkColumnModified("GroupedStations");
			}
		}
		string _GroupedStations;

        [Column] 
		public bool? CanRequestBlock 
		{ 
			get
			{
				return _CanRequestBlock;
			}
			set
			{
				_CanRequestBlock = value;
				MarkColumnModified("CanRequestBlock");
			}
		}
		bool? _CanRequestBlock;

	}
    
	[TableName("UserLoginActivity")]
	[PrimaryKey("Id")]
	[ExplicitColumns]
    public partial class UserLoginActivity : XAssetDB.Record<UserLoginActivity>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public int? UserId 
		{ 
			get
			{
				return _UserId;
			}
			set
			{
				_UserId = value;
				MarkColumnModified("UserId");
			}
		}
		int? _UserId;

        [Column] 
		public short LoginStatus 
		{ 
			get
			{
				return _LoginStatus;
			}
			set
			{
				_LoginStatus = value;
				MarkColumnModified("LoginStatus");
			}
		}
		short _LoginStatus;

        [Column] 
		public string Username 
		{ 
			get
			{
				return _Username;
			}
			set
			{
				_Username = value;
				MarkColumnModified("Username");
			}
		}
		string _Username;

        [Column] 
		public DateTime LoginTime 
		{ 
			get
			{
				return _LoginTime;
			}
			set
			{
				_LoginTime = value;
				MarkColumnModified("LoginTime");
			}
		}
		DateTime _LoginTime;

        [Column] 
		public string LoginIPAddress 
		{ 
			get
			{
				return _LoginIPAddress;
			}
			set
			{
				_LoginIPAddress = value;
				MarkColumnModified("LoginIPAddress");
			}
		}
		string _LoginIPAddress;

        [Column] 
		public string LoginFailureReason 
		{ 
			get
			{
				return _LoginFailureReason;
			}
			set
			{
				_LoginFailureReason = value;
				MarkColumnModified("LoginFailureReason");
			}
		}
		string _LoginFailureReason;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

        [Column] 
		public string DisplayName 
		{ 
			get
			{
				return _DisplayName;
			}
			set
			{
				_DisplayName = value;
				MarkColumnModified("DisplayName");
			}
		}
		string _DisplayName;

	}
    
	[TableName("Section")]
	[PrimaryKey("Id")]
	[ExplicitColumns]
    public partial class Section : XAssetDB.Record<Section>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public string Name 
		{ 
			get
			{
				return _Name;
			}
			set
			{
				_Name = value;
				MarkColumnModified("Name");
			}
		}
		string _Name;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

	}
    
	[TableName("Board")]
	[PrimaryKey("Id")]
	[ExplicitColumns]
    public partial class Board : XAssetDB.Record<Board>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public string Name 
		{ 
			get
			{
				return _Name;
			}
			set
			{
				_Name = value;
				MarkColumnModified("Name");
			}
		}
		string _Name;

        [Column] 
		public int? SectionId 
		{ 
			get
			{
				return _SectionId;
			}
			set
			{
				_SectionId = value;
				MarkColumnModified("SectionId");
			}
		}
		int? _SectionId;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

	}
    
	[TableName("BlockRquest")]
	[PrimaryKey("Id")]
	[ExplicitColumns]
    public partial class BlockRquest : XAssetDB.Record<BlockRquest>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public int DepartmentId 
		{ 
			get
			{
				return _DepartmentId;
			}
			set
			{
				_DepartmentId = value;
				MarkColumnModified("DepartmentId");
			}
		}
		int _DepartmentId;

        [Column] 
		public int SectionId 
		{ 
			get
			{
				return _SectionId;
			}
			set
			{
				_SectionId = value;
				MarkColumnModified("SectionId");
			}
		}
		int _SectionId;

        [Column] 
		public int BoardId 
		{ 
			get
			{
				return _BoardId;
			}
			set
			{
				_BoardId = value;
				MarkColumnModified("BoardId");
			}
		}
		int _BoardId;

        [Column] 
		public string BlockSectionName 
		{ 
			get
			{
				return _BlockSectionName;
			}
			set
			{
				_BlockSectionName = value;
				MarkColumnModified("BlockSectionName");
			}
		}
		string _BlockSectionName;

        [Column] 
		public short Direction 
		{ 
			get
			{
				return _Direction;
			}
			set
			{
				_Direction = value;
				MarkColumnModified("Direction");
			}
		}
		short _Direction;

        [Column] 
		public string Description 
		{ 
			get
			{
				return _Description;
			}
			set
			{
				_Description = value;
				MarkColumnModified("Description");
			}
		}
		string _Description;

        [Column] 
		public double? RequestDuration 
		{ 
			get
			{
				return _RequestDuration;
			}
			set
			{
				_RequestDuration = value;
				MarkColumnModified("RequestDuration");
			}
		}
		double? _RequestDuration;

        [Column] 
		public double? AllowedDuration 
		{ 
			get
			{
				return _AllowedDuration;
			}
			set
			{
				_AllowedDuration = value;
				MarkColumnModified("AllowedDuration");
			}
		}
		double? _AllowedDuration;

        [Column] 
		public int? NumberOfBlocks 
		{ 
			get
			{
				return _NumberOfBlocks;
			}
			set
			{
				_NumberOfBlocks = value;
				MarkColumnModified("NumberOfBlocks");
			}
		}
		int? _NumberOfBlocks;

        [Column] 
		public DateTime? RquestedOn 
		{ 
			get
			{
				return _RquestedOn;
			}
			set
			{
				_RquestedOn = value;
				MarkColumnModified("RquestedOn");
			}
		}
		DateTime? _RquestedOn;

        [Column] 
		public DateTime? VerifiedOn 
		{ 
			get
			{
				return _VerifiedOn;
			}
			set
			{
				_VerifiedOn = value;
				MarkColumnModified("VerifiedOn");
			}
		}
		DateTime? _VerifiedOn;

        [Column] 
		public int? VerifiedBy 
		{ 
			get
			{
				return _VerifiedBy;
			}
			set
			{
				_VerifiedBy = value;
				MarkColumnModified("VerifiedBy");
			}
		}
		int? _VerifiedBy;

        [Column] 
		public short VerificationStatus 
		{ 
			get
			{
				return _VerificationStatus;
			}
			set
			{
				_VerificationStatus = value;
				MarkColumnModified("VerificationStatus");
			}
		}
		short _VerificationStatus;

        [Column] 
		public string AllowedTimings 
		{ 
			get
			{
				return _AllowedTimings;
			}
			set
			{
				_AllowedTimings = value;
				MarkColumnModified("AllowedTimings");
			}
		}
		string _AllowedTimings;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime? DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime? _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

        [Column] 
		public int? RequestedBy 
		{ 
			get
			{
				return _RequestedBy;
			}
			set
			{
				_RequestedBy = value;
				MarkColumnModified("RequestedBy");
			}
		}
		int? _RequestedBy;

        [Column] 
		public DateTime? RequestDate 
		{ 
			get
			{
				return _RequestDate;
			}
			set
			{
				_RequestDate = value;
				MarkColumnModified("RequestDate");
			}
		}
		DateTime? _RequestDate;

        [Column] 
		public DateTime? AllowedDate 
		{ 
			get
			{
				return _AllowedDate;
			}
			set
			{
				_AllowedDate = value;
				MarkColumnModified("AllowedDate");
			}
		}
		DateTime? _AllowedDate;

	}
    
	[TableName("BlockRquestView")]
	[ExplicitColumns]
    public partial class BlockRquestView : XAssetDB.Record<BlockRquestView>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public int DepartmentId 
		{ 
			get
			{
				return _DepartmentId;
			}
			set
			{
				_DepartmentId = value;
				MarkColumnModified("DepartmentId");
			}
		}
		int _DepartmentId;

        [Column] 
		public int SectionId 
		{ 
			get
			{
				return _SectionId;
			}
			set
			{
				_SectionId = value;
				MarkColumnModified("SectionId");
			}
		}
		int _SectionId;

        [Column] 
		public int BoardId 
		{ 
			get
			{
				return _BoardId;
			}
			set
			{
				_BoardId = value;
				MarkColumnModified("BoardId");
			}
		}
		int _BoardId;

        [Column] 
		public string BlockSectionName 
		{ 
			get
			{
				return _BlockSectionName;
			}
			set
			{
				_BlockSectionName = value;
				MarkColumnModified("BlockSectionName");
			}
		}
		string _BlockSectionName;

        [Column] 
		public short Direction 
		{ 
			get
			{
				return _Direction;
			}
			set
			{
				_Direction = value;
				MarkColumnModified("Direction");
			}
		}
		short _Direction;

        [Column] 
		public string Description 
		{ 
			get
			{
				return _Description;
			}
			set
			{
				_Description = value;
				MarkColumnModified("Description");
			}
		}
		string _Description;

        [Column] 
		public double? RequestDuration 
		{ 
			get
			{
				return _RequestDuration;
			}
			set
			{
				_RequestDuration = value;
				MarkColumnModified("RequestDuration");
			}
		}
		double? _RequestDuration;

        [Column] 
		public double? AllowedDuration 
		{ 
			get
			{
				return _AllowedDuration;
			}
			set
			{
				_AllowedDuration = value;
				MarkColumnModified("AllowedDuration");
			}
		}
		double? _AllowedDuration;

        [Column] 
		public int? NumberOfBlocks 
		{ 
			get
			{
				return _NumberOfBlocks;
			}
			set
			{
				_NumberOfBlocks = value;
				MarkColumnModified("NumberOfBlocks");
			}
		}
		int? _NumberOfBlocks;

        [Column] 
		public DateTime? RquestedOn 
		{ 
			get
			{
				return _RquestedOn;
			}
			set
			{
				_RquestedOn = value;
				MarkColumnModified("RquestedOn");
			}
		}
		DateTime? _RquestedOn;

        [Column] 
		public DateTime? VerifiedOn 
		{ 
			get
			{
				return _VerifiedOn;
			}
			set
			{
				_VerifiedOn = value;
				MarkColumnModified("VerifiedOn");
			}
		}
		DateTime? _VerifiedOn;

        [Column] 
		public int? VerifiedBy 
		{ 
			get
			{
				return _VerifiedBy;
			}
			set
			{
				_VerifiedBy = value;
				MarkColumnModified("VerifiedBy");
			}
		}
		int? _VerifiedBy;

        [Column] 
		public short VerificationStatus 
		{ 
			get
			{
				return _VerificationStatus;
			}
			set
			{
				_VerificationStatus = value;
				MarkColumnModified("VerificationStatus");
			}
		}
		short _VerificationStatus;

        [Column] 
		public string AllowedTimings 
		{ 
			get
			{
				return _AllowedTimings;
			}
			set
			{
				_AllowedTimings = value;
				MarkColumnModified("AllowedTimings");
			}
		}
		string _AllowedTimings;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime? DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime? _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

        [Column] 
		public int? RequestedBy 
		{ 
			get
			{
				return _RequestedBy;
			}
			set
			{
				_RequestedBy = value;
				MarkColumnModified("RequestedBy");
			}
		}
		int? _RequestedBy;

        [Column] 
		public DateTime? RequestDate 
		{ 
			get
			{
				return _RequestDate;
			}
			set
			{
				_RequestDate = value;
				MarkColumnModified("RequestDate");
			}
		}
		DateTime? _RequestDate;

        [Column] 
		public DateTime? AllowedDate 
		{ 
			get
			{
				return _AllowedDate;
			}
			set
			{
				_AllowedDate = value;
				MarkColumnModified("AllowedDate");
			}
		}
		DateTime? _AllowedDate;

        [Column] 
		public string SectionName 
		{ 
			get
			{
				return _SectionName;
			}
			set
			{
				_SectionName = value;
				MarkColumnModified("SectionName");
			}
		}
		string _SectionName;

        [Column] 
		public string BoardName 
		{ 
			get
			{
				return _BoardName;
			}
			set
			{
				_BoardName = value;
				MarkColumnModified("BoardName");
			}
		}
		string _BoardName;

        [Column] 
		public string DepartmentName 
		{ 
			get
			{
				return _DepartmentName;
			}
			set
			{
				_DepartmentName = value;
				MarkColumnModified("DepartmentName");
			}
		}
		string _DepartmentName;

        [Column] 
		public string RequestedByName 
		{ 
			get
			{
				return _RequestedByName;
			}
			set
			{
				_RequestedByName = value;
				MarkColumnModified("RequestedByName");
			}
		}
		string _RequestedByName;

	}
    
	[TableName("Station")]
	[PrimaryKey("Id")]
	[ExplicitColumns]
    public partial class Station : XAssetDB.Record<Station>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public string Name 
		{ 
			get
			{
				return _Name;
			}
			set
			{
				_Name = value;
				MarkColumnModified("Name");
			}
		}
		string _Name;

        [Column] 
		public int? SectionId 
		{ 
			get
			{
				return _SectionId;
			}
			set
			{
				_SectionId = value;
				MarkColumnModified("SectionId");
			}
		}
		int? _SectionId;

        [Column] 
		public string Code 
		{ 
			get
			{
				return _Code;
			}
			set
			{
				_Code = value;
				MarkColumnModified("Code");
			}
		}
		string _Code;

        [Column] 
		public int? ASTEId 
		{ 
			get
			{
				return _ASTEId;
			}
			set
			{
				_ASTEId = value;
				MarkColumnModified("ASTEId");
			}
		}
		int? _ASTEId;

        [Column] 
		public int? CSEId 
		{ 
			get
			{
				return _CSEId;
			}
			set
			{
				_CSEId = value;
				MarkColumnModified("CSEId");
			}
		}
		int? _CSEId;

        [Column] 
		public int? JEId 
		{ 
			get
			{
				return _JEId;
			}
			set
			{
				_JEId = value;
				MarkColumnModified("JEId");
			}
		}
		int? _JEId;

        [Column] 
		public int? ESMId 
		{ 
			get
			{
				return _ESMId;
			}
			set
			{
				_ESMId = value;
				MarkColumnModified("ESMId");
			}
		}
		int? _ESMId;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

        [Column] 
		public short? Stationtype 
		{ 
			get
			{
				return _Stationtype;
			}
			set
			{
				_Stationtype = value;
				MarkColumnModified("Stationtype");
			}
		}
		short? _Stationtype;

	}
    
	[TableName("StationDetails")]
	[ExplicitColumns]
    public partial class StationDetail : XAssetDB.Record<StationDetail>  
    {
        [Column] 
		public int Id 
		{ 
			get
			{
				return _Id;
			}
			set
			{
				_Id = value;
				MarkColumnModified("Id");
			}
		}
		int _Id;

        [Column] 
		public string Name 
		{ 
			get
			{
				return _Name;
			}
			set
			{
				_Name = value;
				MarkColumnModified("Name");
			}
		}
		string _Name;

        [Column] 
		public int? SectionId 
		{ 
			get
			{
				return _SectionId;
			}
			set
			{
				_SectionId = value;
				MarkColumnModified("SectionId");
			}
		}
		int? _SectionId;

        [Column] 
		public string Code 
		{ 
			get
			{
				return _Code;
			}
			set
			{
				_Code = value;
				MarkColumnModified("Code");
			}
		}
		string _Code;

        [Column] 
		public int? ASTEId 
		{ 
			get
			{
				return _ASTEId;
			}
			set
			{
				_ASTEId = value;
				MarkColumnModified("ASTEId");
			}
		}
		int? _ASTEId;

        [Column] 
		public int? CSEId 
		{ 
			get
			{
				return _CSEId;
			}
			set
			{
				_CSEId = value;
				MarkColumnModified("CSEId");
			}
		}
		int? _CSEId;

        [Column] 
		public int? JEId 
		{ 
			get
			{
				return _JEId;
			}
			set
			{
				_JEId = value;
				MarkColumnModified("JEId");
			}
		}
		int? _JEId;

        [Column] 
		public int? ESMId 
		{ 
			get
			{
				return _ESMId;
			}
			set
			{
				_ESMId = value;
				MarkColumnModified("ESMId");
			}
		}
		int? _ESMId;

        [Column] 
		public DateTime DateCreated 
		{ 
			get
			{
				return _DateCreated;
			}
			set
			{
				_DateCreated = value;
				MarkColumnModified("DateCreated");
			}
		}
		DateTime _DateCreated;

        [Column] 
		public DateTime DateModified 
		{ 
			get
			{
				return _DateModified;
			}
			set
			{
				_DateModified = value;
				MarkColumnModified("DateModified");
			}
		}
		DateTime _DateModified;

        [Column] 
		public string CreatedBy 
		{ 
			get
			{
				return _CreatedBy;
			}
			set
			{
				_CreatedBy = value;
				MarkColumnModified("CreatedBy");
			}
		}
		string _CreatedBy;

        [Column] 
		public string ModifiedBy 
		{ 
			get
			{
				return _ModifiedBy;
			}
			set
			{
				_ModifiedBy = value;
				MarkColumnModified("ModifiedBy");
			}
		}
		string _ModifiedBy;

        [Column] 
		public short? Stationtype 
		{ 
			get
			{
				return _Stationtype;
			}
			set
			{
				_Stationtype = value;
				MarkColumnModified("Stationtype");
			}
		}
		short? _Stationtype;

        [Column] 
		public string SectionName 
		{ 
			get
			{
				return _SectionName;
			}
			set
			{
				_SectionName = value;
				MarkColumnModified("SectionName");
			}
		}
		string _SectionName;

        [Column] 
		public string ASTEName 
		{ 
			get
			{
				return _ASTEName;
			}
			set
			{
				_ASTEName = value;
				MarkColumnModified("ASTEName");
			}
		}
		string _ASTEName;

        [Column] 
		public string CSEName 
		{ 
			get
			{
				return _CSEName;
			}
			set
			{
				_CSEName = value;
				MarkColumnModified("CSEName");
			}
		}
		string _CSEName;

        [Column] 
		public string ESMName 
		{ 
			get
			{
				return _ESMName;
			}
			set
			{
				_ESMName = value;
				MarkColumnModified("ESMName");
			}
		}
		string _ESMName;

        [Column] 
		public string JEName 
		{ 
			get
			{
				return _JEName;
			}
			set
			{
				_JEName = value;
				MarkColumnModified("JEName");
			}
		}
		string _JEName;

	}
}


