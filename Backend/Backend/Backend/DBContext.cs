using System;
using Database.Tables;
using Microsoft.EntityFrameworkCore;

public interface IMyDBContext
{
    public DbSet<Text> Texts { get; set; }
    string DbPath { get; }
}

public class MyDBContext : DbContext, IMyDBContext
{
    public MyDBContext(DbContextOptions options)
    : base(options)
    {
    }

    public DbSet<Text> Texts { get; set; }


    public string DbPath { get; }


    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer($"Data Source=127.0.0.1,1433;Database=sql1;User Id=sa;Password=Strong123;TrustServerCertificate=True\r\n");
}

