using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static BCrypt.Net.BCrypt;
using Database_test1.Data;
using Database_test1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Database_test1.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;

namespace Database_test1.Controllers
{
    [Route("api/[controller]")]
    [ApiController,Authorize]
    public class UsersController : ControllerBase
    {
        private readonly PortfolioDbContext _context;
        private readonly AppSettings _appSettings;
        const int BcryptWorkfactor = 11;

        public UsersController(PortfolioDbContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register"), AllowAnonymous]
        public async Task<ActionResult<TokenDto>> Register(UserDto regUser)
        {
            regUser.Email = regUser.Email.ToLower();
            var emailExist = await _context.Users.Where(u => u.Email == regUser.Email).FirstOrDefaultAsync();
            if (emailExist != null)
                return BadRequest(new { errorMessage = "Email already in use" });
            User user = new User()
            {
                Email = regUser.Email
            };
            user.PwHash = HashPassword(regUser.Password, BcryptWorkfactor);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            var token = new TokenDto();
            token.JWT = GenerateToken(user);
            return CreatedAtAction("Get", new { id = user.UserId }, token);
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("login"), AllowAnonymous]
        public async Task<ActionResult<TokenDto>> Login(UserDto login)
        {
            login.Email = login.Email.ToLower();
            var user = await _context.Users.Where(u => u.Email == login.Email).FirstOrDefaultAsync();
            if(user!= null)
            {
                var validPwd = Verify(login.Password, user.PwHash);
                if(validPwd)
                {
                    var token = new TokenDto();
                    token.JWT = GenerateToken(user);
                    return token;
                }
            }
            ModelState.AddModelError(string.Empty, "Invalid login");
            return BadRequest(ModelState);
        }


        // GET: api/Account/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            var userDto = new UserDto();
            userDto.Email = user.Email;
            return userDto;
        }

        private string GenerateToken(User user)
        {
            //Claim roleClaim;
            //if (isSomething)
            //    roleClaim = new Claim("Role", "Admin");
            //else
            //    roleClaim = new Claim("Role", "Worker");

            //if (user.IsAdmin)
            //{
            //    new Claim("IsAdmin", user.IsAdmin);
            //}
            var claims = new Claim[]
            {
                new Claim("Email", user.Email),
                // roleClaim,
                new Claim("UserId", user.UserId.ToString()),

                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };

            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var token = new JwtSecurityToken(
                 new JwtHeader(new SigningCredentials(
                      new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)),
                      new JwtPayload(claims));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
