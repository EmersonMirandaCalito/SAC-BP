IF OBJECT_ID('[SAC_Select_FeaturesClients]', 'P') IS NOT NULL DROP procedure [SAC_Select_FeaturesClients] 
go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SAC_Select_FeaturesClients
	
AS
BEGIN
	select	Feature_Id, Feature_Name,Feature_Detail,
			case
				when Feature_Status = 0 then 'Inactiva'
				when Feature_Status = 1 then 'Activa'
			end Feature_Status
	from SAC_FeatureClient
END
GO
/*exec SAC_Select_FeaturesClients*/
