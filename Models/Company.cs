using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Models
{
    public class Company : General
    {
        #region propiedades
        public int Comp_Id { get; set; }
        public string Comp_Name { get; set; }
        public string Comp_Address { get; set; }
        public string Comp_Email { get; set; }
        public string Comp_Phone { get; set; }
        public bool Comp_Status { get; set; }
        #endregion

        #region contructores
        public Company()
        {
            Comp_Id = -1;
            Comp_Name = "";
            Comp_Address = "";
            Comp_Email = "";
            Comp_Phone = "";
            Comp_Status = false;
            Data = new DataSet();
            Result = false;
            Error = "";
        }
        public Company(int comp_Id)
        {
            Comp_Id = comp_Id;
            Comp_Name = "";
            Comp_Address = "";
            Comp_Email = "";
            Comp_Phone = "";
            Comp_Status = false;
            Data = new DataSet();
            Result = false;
            Error = "";
        }
        #endregion

        #region metodos publicos
        public override string Insert()
        {
            throw new NotImplementedException();
        }

        public override string Delete()
        {
            throw new NotImplementedException();
        }

        public override string Update()
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
        #endregion

    }
}
