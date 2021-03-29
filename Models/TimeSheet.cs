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
    }
}