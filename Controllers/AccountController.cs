using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Controllers
{
    public class AccountController:Controller
    {
        public ViewResult Login()
        {
            return View();
        }
    }
}
