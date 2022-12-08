using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static BCrypt.Net.BCrypt;
using Portfolio.Data;
using Portfolio.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Portfolio.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using NuGet.Common;
using System.Security.Principal;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController,Authorize]
    public class UsersController : ControllerBase
    {
        private readonly PortfolioDbContext _context;
        private readonly AppSettings _appSettings;

        public UsersController(PortfolioDbContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost("register"), AllowAnonymous]
        //public async Task<ActionResult<TokenDto>> Register(UserDto regUser)
        //{
        //    regUser.Email = regUser.Email.ToLower();
        //    var emailExist = await _context.Users.Where(u => u.Email == regUser.Email).FirstOrDefaultAsync();
        //    if (emailExist != null)
        //        return BadRequest(new { errorMessage = "Email already in use" });
        //    User user = new User()
        //    {
        //        Email = regUser.Email
        //    };
        //    user.PwHash = HashPassword(regUser.Password, BcryptWorkfactor);
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();
        //    var token = new TokenDto();
        //    token.JWT = GenerateToken(user);
        //    return CreatedAtAction("Get", new { id = user.UserId }, token);
        //}


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("login"), AllowAnonymous]
        public async Task<ActionResult<TokenDto>> Login([FromBody]UserDto login)
        {
            if (login != null)
            {
                login.Email = login.Email.ToLowerInvariant();
                var user = await _context.Users.Where(u => u.Email == login.Email).FirstOrDefaultAsync();
                if (user != null)
                {
                    var validPwd = Verify(login.Password, user.PwHash);
                    if (validPwd)
                    {
                        var jwt = GenerateToken(user);
                        var token = new TokenDto() { JWT = jwt };
                        return token;

                        //var token = new TokenDto();
                        //token.JWT = GenerateToken(user);
                        //return token;
                    }
                }
            }
            ModelState.AddModelError(string.Empty, "Invalid login"); 
            return BadRequest(ModelState);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/Account/5
        [HttpGet("{id}", Name = "Get"),AllowAnonymous]
        public async Task<ActionResult<UserDto>> Get(long id)
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


        //Junk get call, only used to check authorize status on frontend
        //[HttpGet(Name = "LoggedIn")]
        //public async Task<ActionResult<bool>> LoggedIn()
        //{
        //    return true;
        //}

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

                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddMinutes(1)).ToUnixTimeSeconds().ToString()),
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
