﻿using Microsoft.AspNetCore.Mvc;
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

namespace SAC_BP.Controllers.Api
{
    public class UserController: Controller
    {
        [Route("/User/getUser")]
        [HttpPost]
        public string getUser(User _user)
        {
            var user = new User();
            user.Login(_user);
            return tabletoJson(user, ObjetosGenerales.TABLA_USER);
            
        }

        [Route("/User/insertUser")]
        [HttpPost]
        public string insertUser(User _user)
        {
            try
            {
                _user.Insert();
                if(_user.Error == "")
                {
                   
                    return itemToJson(_user);
                }
                else
                {
                    return _user.Error;
                }
                
            }
            catch(Exception ex)
            {
                return ex.Message;
            }

        }

        [Route("/User/selectTable")]
        [HttpPost]
        public string selectTable(User _user)
        {
            try
            {
                _user.SelectTable();
                if (_user.Error == "")
                {
                    return tabletoJson(_user.Data.Tables[ObjetosGenerales.TABLA_USERS]);
                }
                else
                {
                    return _user.Error;
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

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


        public string tabletoJson(User item, string tableName)
        {
            return JsonConvert.SerializeObject(item.Data.Tables[tableName]);
        }
        public string itemToJson(User _user)
        {
            Response response = new Response();
            response.Error = _user.Error;
            if(_user.Error == "")
            {
                response.Success = true;
            }
            else
            {
                response.Success = false;
            }
            return JsonConvert.SerializeObject(response);
        }
    }
}