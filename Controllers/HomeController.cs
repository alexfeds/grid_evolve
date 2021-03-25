using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace grid_evolve.Controllers
{
    public class HomeController : Controller
    {
        public static List<Person> Persons = SampleData.GetData().ToList();
        public ActionResult Index()
        {
            return View(Persons);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}