
using Microsoft.CodeAnalysis.Operations;
using Microsoft.VisualBasic;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using SAC_BP.Models.MiembrosCompartidos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;


namespace SAC_BP.Models
{
    public class User: General
    {
        #region propiedades
        public int Comp_Id { get; set; }
        public int User_Id { get; set; }
        public string User_Code { get; set; }
        public string User_Name { get; set; }
        public string User_Email { get; set; }
        public string User_Phone { get; set; }
        public int Rol_Id { get; set; }
        public string user { get; set; }
        public string Password { get; set; }
        public int User_Status { get; set; }
        public User()
        {
            Comp_Id = -1;
            User_Id = -1;
            User_Code = "";
            User_Name = "";
            User_Email = "";
            User_Phone = "";
            User_Status = 0;
            Rol_Id = ObjetosGenerales.sinRol;
            Data = new DataSet();
            Error = "";
            Result = false;
        }
        public User(int comp_id, int user_id)
        {
            Comp_Id = comp_id;
            User_Id = user_id;
            User_Code = "";
            User_Name = "";
            User_Email = "";
            User_Phone = "";
            User_Status = 0;
            Rol_Id = ObjetosGenerales.sinRol;
            Data = new DataSet();
            Error = "";
            Result = false;
        }

        public override string Delete()
        {
            throw new NotImplementedException();
        }

        public override string Insert()
        {
            try
            {
                int value = -1;
                string query = "";


                FuncionesGenerales.DA.OpenConnection();

                query = "select isnull(max(User_Id),0)+1 from SAC_User with(nolock) where Comp_Id = " + Comp_Id;
                FuncionesGenerales.DA.GetIntegerValue(query,ref value, false);
                User_Id = value;
                Password = FuncionesGenerales.DA.LockPassword(Password);

                query = FuncionesGenerales.PrepareStoredProcedure("SAC_Insert_User",Comp_Id,User_Id,User_Name,User_Code,User_Email,User_Phone,Rol_Id,user,Password,User_Status);
                Error = FuncionesGenerales.DA.ExecuteQuery(query, false);
                verificarError();
                Result = true;
                FuncionesGenerales.DA.CloseConnection();
                return "";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public override string Load()
        {
            throw new NotImplementedException();
        }

        public override string SelectTable()
        {
            string query = FuncionesGenerales.PrepareStoredProcedure("SAC_Select_Users", Comp_Id);
            FuncionesGenerales.DA.OpenConnection();
            Error = FuncionesGenerales.DA.GetDataSet(ObjetosGenerales.TABLA_USERS, ref Data, query);
            verificarError();
            FuncionesGenerales.DA.CloseConnection();
            return "";
        }

        public override string Update()
        {
            throw new NotImplementedException();
        }
        public string Login(User user)
        {
            try
            {
                user.Password = FuncionesGenerales.DA.LockPassword(user.Password);
                string query = FuncionesGenerales.PrepareStoredProcedure("Login", user.user, user.Password);
                FuncionesGenerales.DA.OpenConnection();
                Error = FuncionesGenerales.DA.GetDataSet(ObjetosGenerales.TABLA_USER, ref Data, query);
                verificarError();
                Result = true;
                FuncionesGenerales.DA.CloseConnection();
                setDataUser();
                return "";
            }
            catch (Exception ex)
            {
                Result = false;
                Error = ex.Message;
                return Error;
            }  
        }
        public void setDataUser()
        {
            DataTable tabla = Data.Tables[ObjetosGenerales.TABLA_USER];
            if (tabla.Rows.Count > 0)
            {
                Comp_Id = int.Parse(tabla.Rows[0]["Comp_id"].ToString());
                User_Id = int.Parse(tabla.Rows[0]["User_id"].ToString());
                User_Code = tabla.Rows[0]["User_code"].ToString();
                User_Name = tabla.Rows[0]["User_Name"].ToString();
                User_Email = tabla.Rows[0]["User_Email"].ToString();
                User_Phone = tabla.Rows[0]["User_Phone"].ToString();
                Rol_Id = int.Parse(tabla.Rows[0]["Rol_Id"].ToString());
                User_Status = 1;
            }

            

        }
        #endregion


    }
}
