using EFGetStarted;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Tables
{
    public interface IProduct
    {
        int ProductId { get; set; }
        string maker { get; set; }
        int model { get; set; }
        string type { get; set; }
        List<Product> Products { get; }
    }

    public class Product : IProduct
    {

        public int ProductId { get; set; }
        public string maker { get; set; }

        public int model { get; set; }

        public string type { get; set; }

        public List<Product> Products { get; } = new();
    }
    
}
