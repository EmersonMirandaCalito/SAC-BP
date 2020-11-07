using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Nancy.Extensions;
using Nancy.Json;
using Newtonsoft.Json.Linq;
using SAC_BP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Controllers.Api
{
    public class TicketController : Controller
    {
        [Route("/Ticket/getUser")]
        [HttpPost]
        public JsonResult getUser(User user2)
        {
            var user = new User();
           
            user.User_Name = user2.User_Name;
            var jsonString = new JavaScriptSerializer();
            var datos = jsonString.Serialize(user);
            return Json(datos);
;        }  

        public JsonResult objtoJson(ref object item)
        {
            var jsonString = new JavaScriptSerializer();
            var datos = jsonString.Serialize(item);
            return Json(datos);
        }
    }
}
