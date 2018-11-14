
/* 料品主檔 */
CREATE TABLE [dbo].[TRAN_PART](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Part]	[nvarchar](60) NOT NULL,	--料品代號
	[Description]	[nvarchar](120) NULL,	--料品名稱
	[Specification]	[nvarchar](120) NULL,	--料品規格
	[Remark]	[nvarchar](120) NULL,	--備註
	[Status]	[char](2) NULL,	--狀態
	[UnitId]	[nvarchar](4) NULL,	--單位
	[Type]	[char](1) NULL,	--供應型態
	[Class1Id]	[nvarchar](10) NULL,	--分類一
	[Class2Id]	[nvarchar](10) NULL,	--分類二
	[Class3Id]	[nvarchar](10) NULL,	--分類三
	[Class4Id]	[nvarchar](10) NULL,	--分類四
	[Class5Id]	[nvarchar](10) NULL,	--分類五
	[AuxiliaryUnitId]	[nvarchar](4) NULL,	--輔助單位
	[AuxiliaryUnitRatio]	[Numeric](9,4) NULL,	--輔助單位比
	[IfRound]	[char](1) NULL,	--切除尾數Y/N
	[Round]	[char](1) NULL,	--切除尾數取的小數位(1/2/3/4/N:整數)
	[Drawing]	[nvarchar](30) NULL,	--工程圖號
	[PartSource]	[char](1) NULL,	--料品來源
	[BarCode]	[nvarchar](30) NULL,	--條碼
	[Lot]	[Char](1) NULL,	--批號控管Y/N
	[InspectionGroupId]	[nvarchar](10) NULL,	--檢驗群組碼
	[OverRate]	[numeric](5,2) NULL,	--超完工比率%
	[TransferFlag]	[char](1) NULL,	--是否拋轉
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--拋轉時間
 CONSTRAINT [PK_TRAN_PART] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* 客戶主檔 */
CREATE TABLE [dbo].[TRAN_CUSTOMER](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Customer]	[nvarchar](30) NOT NULL,	--客戶代號
	[CustomerDesc]	[nvarchar](120) NULL,	--客戶名稱
	[Contacts]	[nvarchar](50) NULL,	--聯絡人
	[Email]	[nvarchar](80) NULL,	--Email
	[AccountId]	[nvarchar](30) NULL,	--業務員代號
	[Class1Id]	[nvarchar](10) NULL,	--分類一
	[Class2Id]	[nvarchar](10) NULL,	--分類二
	[Remark]	[nvarchar](120) NULL,	--備註
	[Status]	[char](2) NULL,	--狀態
	[TransferFlag]	[char](1) NULL,	--是否拋轉
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--拋轉時間
 CONSTRAINT [PK_TRAN_CUSTOMER] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* 廠商主檔 */
CREATE TABLE [dbo].[TRAN_VENDOR](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[VendorType]	[char](2) NOT NULL,	--廠商類別
	[Vendor]	[nvarchar](30) NOT NULL,	--廠商代號
	[VendorDesc]	[nvarchar](120) NULL,	--廠商名稱
	[Contacts]	[nvarchar](50) NULL,	--聯絡人
	[Email]	[nvarchar](80) NULL,	--Email
	[AccountId]	[nvarchar](30) NULL,	--採購員代號
	[Class1Id]	[nvarchar](10) NULL,	--分類一
	[Class2Id]	[nvarchar](10) NULL,	--分類二
	[Remark]	[nvarchar](120) NULL,	--備註
	[Status]	[char](2) NULL,	--狀態
	[TransferFlag]	[char](1) NULL,	--是否拋轉
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--拋轉時間
 CONSTRAINT [PK_TRAN_VENDOR] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* 工作中心 */
CREATE TABLE [dbo].[TRAN_WORKCENTER](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Workcenter]	[char](10) NOT NULL,	--工作中心代號
	[WorkcenterDesc]	[nvarchar](120) NULL,	--工作中心說明
	[InoutMark]	[char](1) NULL,	--內外製
	[DepartmentId]	[nvarchar](30) NULL,	--部門/廠商
	[Remark]	[nvarchar](120) NULL,	--備註
	[Status]	[char](2) NULL,	--狀態
	[TransferFlag]	[char](1) NULL,	--是否拋轉
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--拋轉時間
 CONSTRAINT [PK_TRAN_WORKCENTER] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


--/* 製程主檔 */
CREATE TABLE [dbo].[TRAN_PROCESS](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Process]	[char](10) NOT NULL,	--製程代號
	[ProcessDesc]	[nvarchar](120) NULL,	--製程說明
	[Workcenter]	[nvarchar](10) NULL,	--隸屬工作中心
	[OperationFlag]	[char](1) NULL,	--啟用工序
	[Remark]	[nvarchar](120) NULL,	--備註
	[Status]	[char](2) NULL,	--狀態
	[TransferFlag]	[char](1) NULL,	--是否拋轉
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--拋轉時間
 CONSTRAINT [PK_TRAN_PROCESS] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* 工序主檔 */
CREATE TABLE [dbo].[TRAN_OPERATION](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Operation]	[char](10) NOT NULL,	--工序代號
	[OperationDesc]	[nvarchar](120) NULL,	--工序說明
	[Remark]	[nvarchar](120) NULL,	--備註
	[Status]	[char](2) NULL,	--狀態
	[TransferFlag]	[char](1) NULL,	--是否拋轉
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--拋轉時間
 CONSTRAINT [PK_TRAN_OPERATION] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



/* 異質系統DB設定檔 */
CREATE TABLE [dbo].[TRAN_DB_CONNECTION](
	[System]	[varchar]	(10)	NOT NULL, --資料系統別
	[Dbms]	[varchar]	(30)	NOT NULL,	--資料庫主機位址
	[DBName]	[varchar]	(20)	NOT NULL,	--資料庫名稱
	[DBUser]	[varchar]	(20)	NOT NULL,	--登入帳號
	[DBPassword]	[varchar]	(20),	--登入密碼
	[RetriveTime]	[int] DEFAULT 10,	--資料交換間隔時間
	[Remark]	[varchar]	(120)	,	--備註說明
 CONSTRAINT [pk_TRAN_DB_CONNECTION] PRIMARY KEY CLUSTERED 
(
	[System] ASC,
	[Dbms] ASC,
	[DBName] ASC
)WITH (PAD_INDEX  = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


insert into TRAN_DB_CONNECTION(System, Dbms, DBName, DBUser) Values('ERP','10.10.10.10','EMSDB','sa')
go
insert into TRAN_DB_CONNECTION(System, Dbms, DBName, DBUser) Values('DAQ','10.10.10.10','DAQDB','sa')
go



/* 資料交換記錄檔 */
CREATE TABLE [dbo].[TRAN_TRANSFER_LOG](
	[Data]	nvarchar(60) NOT  NULL,	--主檔代號
	[KeyColum]	nvarchar(120) NOT  NULL,	--主鍵值
	[TransferDate]	Datetime, 	--處理時間
	[Log]	nvarchar(max) NULL, 	--處理結果

)ON [PRIMARY]
GO