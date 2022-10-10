using System;
using database.tables;

public interface IMyDBContext
{
    DbSet<Texts> Texts { get; set; }
    string DbPath { get; }
}

public class MyDBContext : DbContext, IMyDBContext
{
    DbSet<Texts> Texts { get; set; }

    public string DbPath { get; }


    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer($"Data Source=127.0.0.1,1433;Database=sql1;User Id=sa;Password=Strong123;TrustServerCertificate=True\r\n");
}