using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Portfolio.Models;
using Microsoft.EntityFrameworkCore;
using File = Database_test1.Models.File;

namespace Portfolio.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options) { }

        public DbSet<Text> Texts { get; set; }

        public DbSet<Skill> Skills { get; set; }

        public DbSet<File> Files { get; set; }

        public DbSet<Portfolio.Models.User> Users { get; set; }



    }
}
