IF OBJECT_ID('[SAC_Insert_User]', 'P') IS NOT NULL DROP procedure [SAC_Insert_User] 
go
-- =============================================
-- Author:		<Author,,emiranda>
-- Create date: <Create Date,,>
-- Description:	<Description,,sp para autenticacion de usuario>
-- =============================================
CREATE PROCEDURE SAC_Insert_User
	@Comp_Id smallint,
	@User_Id smallint,
	@User_Code varchar(50),
	@User_Name varchar(50),
	@User_Email varchar(100),
	@User_Phone varchar(50),
	@Rol_Id smallint,
	@User_Login varchar(50),
	@User_Password varchar(50),
	@User_Status bit
AS
	BEGIN

		insert into SAC_User(Comp_Id,User_Id,User_code,User_Name,User_Email,User_Phone,Rol_Id,User_Login,User_Password,User_Status)
		values(@Comp_Id,@User_Id,@User_Code,@User_Name,@User_Email,@USer_Phone,@Rol_Id,@User_Login,@User_Password,@User_Status)

	END