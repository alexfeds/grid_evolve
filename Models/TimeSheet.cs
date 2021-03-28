using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace grid_evolve.Models
{
    public class TimeSheet
    {
        public int ID { get; set; }
        public string Sate { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public DateTime Duration { get; set; }
        public decimal HorlyRate { get; set; }
        public decimal Total { get; set; }
        /// <summary>
        /// Get the data.
        /// </summary>
        /// <param name="total"></param>
        /// <returns></returns>
        public static IEnumerable<SaleData> GetData(int total)
        {
            var countries = new[] { "US", "UK", "Canada", "Japan", "China", "France", "German", "Italy", "Korea", "Australia" };
            var products = new[] { "Widget", "Gadget", "Doohickey" };
            var colors = new[] { "Black", "White", "Red", "Green", "Blue" };
            var rand = new Random(0);
            var dt = DateTime.Now;
            var list = Enumerable.Range(0, total).Select(i =>
            {
                var country = countries[rand.Next(0, countries.Length - 1)];
                var product = products[rand.Next(0, products.Length - 1)];
                var color = colors[rand.Next(0, colors.Length - 1)];
                var date = new DateTime(dt.Year, i % 12 + 1, 25, i % 24, i % 60, i % 60);

                return new SaleData
                {
                    ID = i + 1,
                    Start = date,
                    End = date,
                    Country = country,
                    Product = product,
                    Color = color,
                    Amount = rand.NextDouble() * 10000 - 5000,
                    Amount2 = rand.NextDouble() * 10000 - 5000,
                    Discount = rand.NextDouble() / 4,
                    Active = (i % 4 == 0),
                    Trends = Enumerable.Range(0, 12).Select(x => new MonthData { Month = x + 1, Data = rand.Next(0, 100) }).ToArray(),
                    Rank = rand.Next(1, 6)
                };
            });
            return list;
        }


        public enum State
        {
            Active,
            Submitted,
       
        }
    }

 

}