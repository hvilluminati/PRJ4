using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Database_test1.Models;
using Microsoft.EntityFrameworkCore;

namespace Database_test1.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options) { }

        public DbSet<Text> Texts { get; set; }


    }
}

/*public class MyDBContext : DbContext, IMyDBContext
   {
   DbSet<Texts> Texts { get; set; }
   
   
   public string DbPath { get; }
   
   
   // The following configures EF to create a Sqlite database file in the
   // special "local" folder for your platform.
   protected override void OnConfiguring(DbContextOptionsBuilder options)
   => options.UseSqlServer($"Data Source=127.0.0.1,1433;Database=sql1;User Id=sa;Password=Strong123;TrustServerCertificate=True\r\n");
   }*/