using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Models
{
    public class Client : General
    {
        #region propiedades
        public int Comp_Id { get; set; }
        public int Client_Id { get; set; }
        public string Client_Name { get; set; }
        public string Client_Email { get; set; }
        public string Client_Contact { get; set; }
        public string Client_Phone { get; set; }
        public string Client_Position { get; set; }
        public bool Client_Status { get; set; }
        #endregion

        #region contructores
        public Client()
        {
            Comp_Id = -1;
            Client_Id = -1;
            Client_Name = "";
            Client_Email = "";
            Client_Contact = "";
            Client_Position = "";
            Client_Phone = "";
            Data = new DataSet();
            Result = false;
            Error = "";
        }
        public Client(int comp_id, int client_id)
        {
            Comp_Id = comp_id;
            Client_Id = client_id;
            Client_Name = "";
            Client_Email = "";
            Client_Contact = "";
            Client_Phone = "";
            Client_Position = "";
            Data = new DataSet();
            Result = false;
            Error = "";

        }
        #endregion

        #region metodos publicos
        public override string Delete()
        {
            throw new NotImplementedException();
        }

        public override string Insert()
        {
            throw new NotImplementedException();
        }

        public override string Load()
        {
            throw new NotImplementedException();
        }

        public override string SelectTable()
        {
            throw new NotImplementedException();
        }

        public override string Update()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region funciones clase
        public string selectFeature()
        {
            return Error;
        }
        #endregion


    }
}
