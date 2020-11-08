IF OBJECT_ID('[SAC_Select_Users]', 'P') IS NOT NULL DROP procedure [SAC_Select_Users] 
go
-- =============================================
-- Author:		<Author,,Emerson Miranda>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SAC_Select_Users]
	@Comp_Id smallint
AS
BEGIN
	select	u.Comp_Id,
			u.User_Id,
			u.User_code,
			u.User_Name,
			u.User_Email,
			u.User_Phone,
			r.Rol_Name,
			u.User_Login,
			u.User_Password,
			case
				when u.User_Status = 1 then 'Activo'
				when u.User_Status = 0 then 'Inactivo'
			end User_Status
	from	SAC_User u with(nolock),
			SAC_Rol r with(nolock)
	where	u.Comp_Id = @Comp_Id
	and		u.Rol_Id = r.Rol_Id	
	order by User_Status asc
END
GO

/*exec SAC_Select_Users 1 */
