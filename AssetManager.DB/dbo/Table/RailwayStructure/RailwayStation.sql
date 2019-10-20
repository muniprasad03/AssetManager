CREATE TABLE [dbo].[RailwayStation]
(
	[Id] INT NOT NULL PRIMARY KEY,
	[ZoneId] INT NOT NULL, 
	[DivisionId] int not Null,
	[Code] NVARCHAR(10) NOT NULL, 
	[Name] NVARCHAR(256) NOT NULL
)
