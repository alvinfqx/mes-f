
/* �ƫ~�D�� */
CREATE TABLE [dbo].[TRAN_PART](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Part]	[nvarchar](60) NOT NULL,	--�ƫ~�N��
	[Description]	[nvarchar](120) NULL,	--�ƫ~�W��
	[Specification]	[nvarchar](120) NULL,	--�ƫ~�W��
	[Remark]	[nvarchar](120) NULL,	--�Ƶ�
	[Status]	[char](2) NULL,	--���A
	[UnitId]	[nvarchar](4) NULL,	--���
	[Type]	[char](1) NULL,	--�������A
	[Class1Id]	[nvarchar](10) NULL,	--�����@
	[Class2Id]	[nvarchar](10) NULL,	--�����G
	[Class3Id]	[nvarchar](10) NULL,	--�����T
	[Class4Id]	[nvarchar](10) NULL,	--�����|
	[Class5Id]	[nvarchar](10) NULL,	--������
	[AuxiliaryUnitId]	[nvarchar](4) NULL,	--���U���
	[AuxiliaryUnitRatio]	[Numeric](9,4) NULL,	--���U����
	[IfRound]	[char](1) NULL,	--��������Y/N
	[Round]	[char](1) NULL,	--�������ƨ����p�Ʀ�(1/2/3/4/N:���)
	[Drawing]	[nvarchar](30) NULL,	--�u�{�ϸ�
	[PartSource]	[char](1) NULL,	--�ƫ~�ӷ�
	[BarCode]	[nvarchar](30) NULL,	--���X
	[Lot]	[Char](1) NULL,	--�帹����Y/N
	[InspectionGroupId]	[nvarchar](10) NULL,	--����s�սX
	[OverRate]	[numeric](5,2) NULL,	--�W���u��v%
	[TransferFlag]	[char](1) NULL,	--�O�_����
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--����ɶ�
 CONSTRAINT [PK_TRAN_PART] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* �Ȥ�D�� */
CREATE TABLE [dbo].[TRAN_CUSTOMER](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Customer]	[nvarchar](30) NOT NULL,	--�Ȥ�N��
	[CustomerDesc]	[nvarchar](120) NULL,	--�Ȥ�W��
	[Contacts]	[nvarchar](50) NULL,	--�p���H
	[Email]	[nvarchar](80) NULL,	--Email
	[AccountId]	[nvarchar](30) NULL,	--�~�ȭ��N��
	[Class1Id]	[nvarchar](10) NULL,	--�����@
	[Class2Id]	[nvarchar](10) NULL,	--�����G
	[Remark]	[nvarchar](120) NULL,	--�Ƶ�
	[Status]	[char](2) NULL,	--���A
	[TransferFlag]	[char](1) NULL,	--�O�_����
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--����ɶ�
 CONSTRAINT [PK_TRAN_CUSTOMER] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* �t�ӥD�� */
CREATE TABLE [dbo].[TRAN_VENDOR](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[VendorType]	[char](2) NOT NULL,	--�t�����O
	[Vendor]	[nvarchar](30) NOT NULL,	--�t�ӥN��
	[VendorDesc]	[nvarchar](120) NULL,	--�t�ӦW��
	[Contacts]	[nvarchar](50) NULL,	--�p���H
	[Email]	[nvarchar](80) NULL,	--Email
	[AccountId]	[nvarchar](30) NULL,	--���ʭ��N��
	[Class1Id]	[nvarchar](10) NULL,	--�����@
	[Class2Id]	[nvarchar](10) NULL,	--�����G
	[Remark]	[nvarchar](120) NULL,	--�Ƶ�
	[Status]	[char](2) NULL,	--���A
	[TransferFlag]	[char](1) NULL,	--�O�_����
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--����ɶ�
 CONSTRAINT [PK_TRAN_VENDOR] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* �u�@���� */
CREATE TABLE [dbo].[TRAN_WORKCENTER](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Workcenter]	[char](10) NOT NULL,	--�u�@���ߥN��
	[WorkcenterDesc]	[nvarchar](120) NULL,	--�u�@���߻���
	[InoutMark]	[char](1) NULL,	--���~�s
	[DepartmentId]	[nvarchar](30) NULL,	--����/�t��
	[Remark]	[nvarchar](120) NULL,	--�Ƶ�
	[Status]	[char](2) NULL,	--���A
	[TransferFlag]	[char](1) NULL,	--�O�_����
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--����ɶ�
 CONSTRAINT [PK_TRAN_WORKCENTER] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


--/* �s�{�D�� */
CREATE TABLE [dbo].[TRAN_PROCESS](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Process]	[char](10) NOT NULL,	--�s�{�N��
	[ProcessDesc]	[nvarchar](120) NULL,	--�s�{����
	[Workcenter]	[nvarchar](10) NULL,	--���ݤu�@����
	[OperationFlag]	[char](1) NULL,	--�ҥΤu��
	[Remark]	[nvarchar](120) NULL,	--�Ƶ�
	[Status]	[char](2) NULL,	--���A
	[TransferFlag]	[char](1) NULL,	--�O�_����
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--����ɶ�
 CONSTRAINT [PK_TRAN_PROCESS] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/* �u�ǥD�� */
CREATE TABLE [dbo].[TRAN_OPERATION](
	[TranId]	[bigint]	IDENTITY(1,1) NOT NULL ,	--ID
	[Operation]	[char](10) NOT NULL,	--�u�ǥN��
	[OperationDesc]	[nvarchar](120) NULL,	--�u�ǻ���
	[Remark]	[nvarchar](120) NULL,	--�Ƶ�
	[Status]	[char](2) NULL,	--���A
	[TransferFlag]	[char](1) NULL,	--�O�_����
	[TransferFdate]	[datetime] DEFAULT '1900-1-1',	--����ɶ�
 CONSTRAINT [PK_TRAN_OPERATION] PRIMARY KEY CLUSTERED 
(
    [TranId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



/* ����t��DB�]�w�� */
CREATE TABLE [dbo].[TRAN_DB_CONNECTION](
	[System]	[varchar]	(10)	NOT NULL, --��ƨt�ΧO
	[Dbms]	[varchar]	(30)	NOT NULL,	--��Ʈw�D����}
	[DBName]	[varchar]	(20)	NOT NULL,	--��Ʈw�W��
	[DBUser]	[varchar]	(20)	NOT NULL,	--�n�J�b��
	[DBPassword]	[varchar]	(20),	--�n�J�K�X
	[RetriveTime]	[int] DEFAULT 10,	--��ƥ洫���j�ɶ�
	[Remark]	[varchar]	(120)	,	--�Ƶ�����
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



/* ��ƥ洫�O���� */
CREATE TABLE [dbo].[TRAN_TRANSFER_LOG](
	[Data]	nvarchar(60) NOT  NULL,	--�D�ɥN��
	[KeyColum]	nvarchar(120) NOT  NULL,	--�D���
	[TransferDate]	Datetime, 	--�B�z�ɶ�
	[Log]	nvarchar(max) NULL, 	--�B�z���G

)ON [PRIMARY]
GO