using SAC_BP.Models.MiembrosCompartidos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Models
{
    public class FeatureClient : General
    {
        public int Feature_Id { get; set; }
        public string Feature_Name { get; set; }
        public string Feature_Detail { get; set; }
        public int Feature_Status { get; set; }

        public FeatureClient()
        {
            Feature_Id = -1;
            Feature_Name = "";
            Feature_Detail = "";
            Feature_Status = -1;
            Data = new DataSet();
            Error = "";
            Result = false;
        }
        public FeatureClient(int feature_id)
        {
            Feature_Id = feature_id;
            Feature_Name = "";
            Feature_Detail = "";
            Feature_Status = -1;
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

                query = "select isnull(max(Feature_Id),0)+1 from SAC_FeatureClient with(nolock) ";
                FuncionesGenerales.DA.GetIntegerValue(query, ref value, false);
                Feature_Id = value;
                
                query = FuncionesGenerales.PrepareStoredProcedure("SAC_Insert_Feature_Client", Feature_Id,Feature_Name,Feature_Detail,Feature_Status);
                Error = FuncionesGenerales.DA.ExecuteQuery(query, false);
                verificarError();
                Result = true;
                FuncionesGenerales.DA.CloseConnection();
                return "";
            }
            catch (Exception ex)
            {
                Result = false;
                return ex.Message;
            }
        }

        public override string Load()
        {
            throw new NotImplementedException();
        }

        public override string SelectTable()
        {
            string query = FuncionesGenerales.PrepareStoredProcedure("SAC_Select_FeaturesClients");
            FuncionesGenerales.DA.OpenConnection();
            Error = FuncionesGenerales.DA.GetDataSet(ObjetosGenerales.TABLA_FCLIENTS, ref Data, query);
            verificarError();
            FuncionesGenerales.DA.CloseConnection();
            return "";
        }

        public override string Update()
        {
            throw new NotImplementedException();
        }
    }
}
