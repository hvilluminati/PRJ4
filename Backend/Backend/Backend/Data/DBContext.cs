using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
    : base(options) {}

    public DbSet<Text> Texts { get; set; }

}

