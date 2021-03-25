using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace grid_evolve
{
    public class Person
    {
        internal static string[] Countries = "China|India|United States|Indonesia|Brazil|Pakistan|Bangladesh|Nigeria|Russia|Japan|Mexico|Philippines|Vietnam|Germany|Ethiopia|Egypt|Iran|Turkey|Congo|France|Thailand|United Kingdom|Italy|Myanmar".Split('|');

        #region ctor

        public Person(int id)
        {
            ID = id;
        }

        #endregion

        #region Object Model

        public int ID { get; set; }
        public string Name { get { return string.Format("{0} {1}", First, Last); } }
        public string Country { get { return Countries[CountryID]; } }
        public int CountryID { get; set; }
        public bool Active { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        public DateTime Hired { get; set; }

        #endregion
    }

    public class SampleData
    {
        private static Random _rnd = new Random();
        private static string[] _firstNames = "Andy|Ben|Charlie|Dan|Ed|Fred|Gil|Herb|Jack|Karl|Larry|Mark|Noah|Oprah|Paul|Quince|Rich|Steve|Ted|Ulrich|Vic|Xavier|Zeb".Split('|');
        private static string[] _lastNames = "Ambers|Bishop|Cole|Danson|Evers|Frommer|Griswold|Heath|Jammers|Krause|Lehman|Myers|Neiman|Orsted|Paulson|Quaid|Richards|Stevens|Trask|Ulam".Split('|');

        private static string GetString(string[] arr)
        {
            return arr[_rnd.Next(arr.Length)];
        }

        public static IEnumerable<Person> GetData()
        {
            var list = Enumerable.Range(0, 50).Select(i =>
            {
                return new Person(i)
                {
                    First = GetString(_firstNames),
                    Last = GetString(_lastNames),
                    CountryID = _rnd.Next() % Person.Countries.Length,
                    Active = _rnd.NextDouble() >= .5,
                    Hired = DateTime.Today.AddDays(-_rnd.Next(1, 365))
                };
            });
            return list;
        }
    }
}
