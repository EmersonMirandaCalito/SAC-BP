using Microsoft.VisualBasic;
using System;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using System.Xml;
using System.IO;

namespace SAC_BP.Models.MiembrosCompartidos
{
    public static class FuncionesGenerales
    {
        public static string PrepareStoredProcedure(string storedProcedure, params object[] parameters)
        {
            try
            {
                string query = string.Format("EXEC {0} ", storedProcedure);

                if (parameters != null)
                {
                    for (int index = 0; index <= parameters.Length - 1; index++)
                    {
                        var currentParameter = parameters[index];

                        if (index == 0)
                            query += string.Format("{0}", Cast_Variable_To_Database(ref currentParameter));
                        else
                            query += string.Format(", {0}", Cast_Variable_To_Database(ref currentParameter));
                    }
                }

                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string Cast_Variable_To_Database(ref object pVariable)
        {
            string varNullable = "null";

            if (Information.IsDBNull(pVariable))
                varNullable = "null";
            else if (pVariable == null)
                varNullable = "null";
            else if (pVariable is string)
                varNullable = (string)Interaction.IIf(pVariable == null, "null", "'" + Strings.Replace((string)pVariable, "'", "''") + "'");
            else if (Information.IsNumeric(pVariable))
            {
                if (pVariable is int)
                    varNullable = Convert.ToInt32(pVariable).ToString();
                else if (pVariable is double)
                    varNullable = Convert.ToDouble(pVariable).ToString();
                else if (pVariable is bool)
                    varNullable = booleantoint(Convert.ToBoolean(pVariable)).ToString();
                else
                {
                    varNullable = (string)Interaction.IIf((int)pVariable == ObjetosGenerales.NOTHING_INTEGER, "null", pVariable);
                    varNullable = (string)Interaction.IIf((double)pVariable == ObjetosGenerales.NOTHING_DOUBLE, "null", pVariable);
                    varNullable = (string)Interaction.IIf((long)pVariable == ObjetosGenerales.NOTHING_LONG, "null", pVariable);
                }
            }
            else if (pVariable is bool)
                varNullable = booleantoint(Convert.ToBoolean(pVariable)).ToString();
            else if (Information.IsDate(pVariable))
            {
                varNullable = (string)Interaction.IIf(pVariable == null, "null", "'" + Strings.Format(pVariable, "yyyyMMdd HH:mm:ss") + "'");
                varNullable = (string)Interaction.IIf(varNullable == "'00010101 00:00:00'", "null", varNullable);
            }
            
            return varNullable;
        }

        public static bool inttoboolean(int pValor)
        {
            if (pValor == 0)
                return false;
            else
                return true;
        }
        public static string BooleantoStr(bool pvalor)
        {
            if (pvalor == true)
                return "si";
            else
                return "no";
        }

        public static bool StrtoBoolean(string pvalor)
        {
            return (pvalor.ToLower() == "si");
        }

        public static int booleantoint(bool pValor)
        {
            if (pValor == false)
                return 0;
            else
                return 1;
        }

        public static DataAccess.DataAccess DA = new DataAccess.DataAccess();

        private static XmlElement Serialize(object obj)
        {
            XmlElement serializedXmlElement = null;

            try
            {
                System.IO.MemoryStream memoryStream = new MemoryStream();
                System.Xml.Serialization.XmlSerializer xmlSerializer = new System.Xml.Serialization.XmlSerializer(obj.GetType());
                xmlSerializer.Serialize(memoryStream, obj);
                memoryStream.Position = 0;

                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.Load(memoryStream);
                serializedXmlElement = xmlDocument.DocumentElement;
            }
            catch (Exception e)
            {
                //logging statements. You must log exception for review
            }

            return serializedXmlElement;
        }

    }
}
