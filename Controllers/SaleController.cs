using grid_evolve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace grid_evolve.Controllers
{
    public class SaleController : Controller
    {

        public static List<SaleData> sale = SaleData.GetData(15).ToList();
        // GET: Sale
        public ActionResult Sale()
        {
            return View(sale);
        }
    }
}