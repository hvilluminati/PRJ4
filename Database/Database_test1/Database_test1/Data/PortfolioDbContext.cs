﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Database_test1.Models;
using Microsoft.EntityFrameworkCore;
using File = Database_test1.Models.File;

namespace Database_test1.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options) { }

        public DbSet<Text> Texts { get; set; }

        public DbSet<Skill> Skills { get; set; }

        public DbSet<File> Files { get; set; }

        public DbSet<Database_test1.Models.User> Users { get; set; }



    }
}
