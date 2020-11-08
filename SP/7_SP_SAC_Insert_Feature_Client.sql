IF OBJECT_ID('[SAC_Insert_Feature_Client]', 'P') IS NOT NULL DROP procedure [SAC_Insert_Feature_Client] 
go

-- =============================================
-- Author:		<Author,,Emerson Miranda>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SAC_Insert_Feature_Client
	@Feature_Id smallint,
	@Feature_Name varchar(50),
	@Feature_Detail varchar(100),
	@Feature_Status bit
AS
BEGIN
	insert into SAC_FeatureClient(Feature_Id,Feature_Name,Feature_Detail,Feature_Status)
	values(@Feature_Id,@Feature_Name,@Feature_Detail,@Feature_Status)
END
GO
