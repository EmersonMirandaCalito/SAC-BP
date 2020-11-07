using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Models
{
    public abstract class General
    {
        public DataSet Data;
        public string Error;
        public bool Result;

        public abstract string Insert();
        public abstract string Delete();
        public abstract string Update();
        public abstract string Load();
        public abstract string SelectTable();

        public void verificarError()
        {
            if(Error != "")
            {
                throw new System.ArgumentException(Error);
            }
            
        }

    }
}
