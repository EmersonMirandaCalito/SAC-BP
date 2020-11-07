using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using SAC_BP.Models;

namespace SAC_BP.Controllers
{
    public class HomeController : Controller
    {
        public ViewResult Index()
        {
            return View();
        }
        public ViewResult Clientes()
        {
            return View("Clientes");
        }
        public ViewResult Contactos()
        {
            return View("Contactos");
        }
        public ViewResult CaracteristicasClientes()
        {
            return View("CaracteristicasClientes");
        }
        public ViewResult CaracteristicasProyectos()
        {
            return View("CaracteristicasProyectos");
        }
        public ViewResult Usuarios()
        {
            return View("Usuarios");
        }
        public ViewResult Proyectos()
        {
            return View("Proyectos");
        }
        public ViewResult Ticket()
        {
            return View("Ticket");
        }

        [Route("/Home/getUser")]
        [HttpPost]
        public JsonResult getUser(User user2)
        {
            var user = new User();
            user.User_Id = 1;
            user.User_Name = "Emerson";

            var jsonString = new JavaScriptSerializer();
            var data = jsonString.Serialize(user);
            return Json(data);
        }
    }
}
