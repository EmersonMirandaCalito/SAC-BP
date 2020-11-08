INSERT INTO SAC_Company(Comp_id,Comp_Name,Comp_Address,Comp_Email,Comp_Phone,Comp_Status)
VALUES('1','BusinessPro','San Jose, La Sabana','businesspro@businessproerp.com','88888888','1')

INSERT INTO SAC_Rol(Rol_Id,Rol_Name,Rol_Detail)
VALUES(1,'Administrador','Administrador del sistema')
INSERT INTO SAC_Rol(Rol_Id,Rol_Name,Rol_Detail)
VALUES(2,'Usuario','Usuario del sistema')

INSERT INTO SAC_User(Comp_Id,User_Id,User_Code,User_Name,User_Email,User_Phone,Rol_Id,User_Login,User_Password)
VALUES(1,1,'801130663','Emerson','emersonedmdir@gmail.com','83373921',1,'emiranda','Y2FsaXRv')


