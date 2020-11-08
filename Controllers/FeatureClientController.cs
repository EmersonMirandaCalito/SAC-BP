using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using Newtonsoft.Json;
using SAC_BP.Models;
using SAC_BP.Models.MiembrosCompartidos;
using SAC_BP.Models.ModelResponse;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft;

namespace SAC_BP.Controllers
{
    public class FeatureClientController : Controller
    {
        [Route("/featureClient/insertFeature")]
        [HttpPost]
        public string insertFeature(FeatureClient item)
        {
            try
            {
                item.Insert();
                return itemToJson(item);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [Route("/featureClient/selectTable")]
        [HttpPost]
        public string selectTable(FeatureClient item)
        {
            try
            {
                item.SelectTable();
                if (item.Error == "")
                {
                    return tabletoJson(item.Data.Tables[ObjetosGenerales.TABLA_FCLIENTS]);
                }
                else
                {
                    return item.Error;
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public string itemToJson(FeatureClient _user)
        {
            Response response = new Response();
            response.Error = _user.Error;
            if (_user.Result)
            {
                response.item = _user;
                response.Success = true;
            }
            else
            {
                response.Success = false;
            }
            return JsonConvert.SerializeObject(response);
        }
        public string tabletoJson(DataTable table)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            foreach (DataRow row in table.Rows)
            {
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);
            }
            return jsSerializer.Serialize(parentRow);
        }
    }
}
