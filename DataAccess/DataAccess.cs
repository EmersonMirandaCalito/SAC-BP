using System;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Win32;
using System.Configuration;
using System.Security.Cryptography;
using System.Security.Permissions;
using Microsoft.AspNetCore.Diagnostics;
using System.IO;
using System.Text;
using SAC_BP.Models.MiembrosCompartidos;

namespace SAC_BP.DataAccess
{
    public class DataAccess
    {
        private SqlConnection Connection = new SqlConnection();
        private SqlCommand Command = new SqlCommand();
        private SqlDataAdapter Adapter = new SqlDataAdapter();
        private string coneccion="";
        private SqlTransaction Transaction;

        public string GetConecctionString()
        {
            return coneccion;
        }
       


        public string OpenConnection()
        {
            
                leerDatosConfig();
                if (Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
                if (Connection.ConnectionString == "")
                {
                    
                    Connection.ConnectionString = GetConecctionString();
                     
                }
                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();
                }
                return "";
           
        }
        public string CloseConnection()
        {
            if (Connection.State == ConnectionState.Open)
            {
                Connection.Close();
            }
            return "";
        }
        public void DeleteDataTable(String TableName, ref DataSet pData)
        {
            try
            {
                
                if (pData.Tables.Contains(TableName))
                {
                    pData.Tables.Remove(TableName);
                }
            }
            catch(Exception ex)
            {
                //no existe la tabla
            }
            
        }

        public string GetDataSet(string TableName, ref DataSet pData, string query)
        {
            try
            {
                
                Command.CommandText = query;
                Command.Connection = Connection;
                Adapter.SelectCommand = Command;
                DeleteDataTable(TableName, ref pData);
                Adapter.Fill(pData, TableName);
                
                return "";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
                    }
        public void leerDatosConfig()
        {

            coneccion = ObjetosGenerales.conexionString;
        }

        public string UnlockPassword(string key)
        {
            string resultado = Convert.ToString(Encoding.UTF8.GetChars(Convert.FromBase64String(key)));
            resultado.Substring(0, resultado.Length);
            return resultado;
        }

        public string LockPassword(string key)
        {
            string value = string.Concat(key);
            byte[] byteValue = Encoding.UTF8.GetBytes(value);
            return (Convert.ToBase64String(byteValue));
        }

        public string ExecuteQuery(string query, bool isTransaction)
        {
            try
            {
                Command.CommandText = query;
                Command.Connection = Connection;
                if (isTransaction)
                {
                    Command.Transaction = Transaction;
                }
                Command.CommandType = CommandType.Text;
                
                Command.ExecuteNonQuery();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            
        }
        public string TransactonBegin()
        {
            try
            {
                String ErrorMenssage = OpenConnection();
                if(ErrorMenssage != "")
                {
                    throw new Exception(ErrorMenssage);
                }
                else
                {
                    Transaction = Connection.BeginTransaction();
                }
                return "";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string TrasactionCommint()
        {
            try
            {
                Transaction.Commit();
                return "";
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }

        public string TransactionRollback()
        {
            try
            {
                Transaction.Rollback();
                return "";
            }catch(Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                CloseConnection();
            }

        }

        public string GetIntegerValue(string Query, ref int Value, bool isInTransaction = true)
        {
            try
            {
                Value = 0;
                Command.Connection = Connection;
                Command.CommandText = Query;
                if (isInTransaction == true)
                    Command.Transaction = Transaction;
                Value = System.Convert.ToInt32(Command.ExecuteScalar());
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}
