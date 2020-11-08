IF OBJECT_ID('[SAC_Delete_User]', 'P') IS NOT NULL DROP procedure [SAC_Delete_User] 
go

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SAC_Delete_User 
	@Comp_Id smallint,
	@User_Id smallint
AS
BEGIN
	Update	u
	SET		u.User_Status =	0
	From	SAC_User u
	WHERE   u.Comp_Id = @Comp_Id
	and		u.User_Id = @User_Id
END
GO
/*exec SAC_Delete_User 1,12*/