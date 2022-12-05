using Database_test1.Controllers;
using Database_test1.Models;
using Microsoft.AspNetCore.Identity;
using static BCrypt.Net.BCrypt;

namespace Database_test1.Data
{
    public static class SeedAdmin
    {
        internal static void SeedData(PortfolioDbContext context, int bcryptWorkfactor)
        {
            context.Database.EnsureCreated();
            if (!context.Users.Any())
                SeedUser(context, bcryptWorkfactor);
        }
        public static void SeedUser(PortfolioDbContext context, int bcryptWorkfactor)
        {
            context.Users.AddRange(
                new User
                {
                    Email = "admin@min.com",
                    PwHash=HashPassword("adminpw", bcryptWorkfactor)
                });
            context.SaveChanges();
        }
    }
}
