IF OBJECT_ID('[SAC_Update_User]', 'P') IS NOT NULL DROP procedure [SAC_Update_User] 
go
-- =============================================
-- Author:		<Author,,Emerson Miranda>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SAC_Update_User
	@Comp_Id smallint,
	@User_Id smallint,
	@User_code varchar(50),
	@User_Name varchar(100),
	@User_Email varchar(100),
	@User_Phone varchar(50),
	@Rol_Id smallint,
	@User_Password varchar(50),
	@User_Status bit
AS
BEGIN
	Update	u
	SET		u.User_Code =		@User_Code,
			u.User_Name =		@User_Name,
			u.user_Email =		@User_Email,
			u.User_Phone =		@User_Phone,
			u.Rol_Id =			@Rol_Id,
			u.User_Password =	@User_Password,
			u.User_Status =		@User_Status
	From	SAC_User u
	WHERE   u.Comp_Id = @Comp_Id
	and		u.User_Id = @User_Id
END
GO
