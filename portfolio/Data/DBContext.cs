using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<Text> Texts { get; set; }

        public DbSet<Skill> Skills { get; set; }



        public string DbPath { get; }


        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
       }
}
