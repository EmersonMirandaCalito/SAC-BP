IF OBJECT_ID('[Login]', 'P') IS NOT NULL DROP procedure [Login] 
go
-- =============================================
-- Author:		<Author,,emiranda>
-- Create date: <Create Date,,>
-- Description:	<Description,,sp para autenticacion de usuario>
-- =============================================
CREATE PROCEDURE Login
	@username varchar(50),
	@password varchar(50)
	
AS
BEGIN
	select	*from SAC_User
	where	User_Login = @username
	and		User_Password = @password
	and	    User_Status = 1
END
GO
/*exec Login 1,'emiranda','calito'*/