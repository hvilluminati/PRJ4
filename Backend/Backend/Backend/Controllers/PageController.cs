using Database.Tables;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PageController : ControllerBase
    {
        private readonly MyDBContext _context; //will context work like this?

        public PageController(MyDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetPage/{id}")]
        public IActionResult GetPage1(int id)
        {
            var texts = _context.Texts
            .Where(x => x.TextId == id)
            .ToList();
            return Ok(texts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Text>> GetPage2(int id)
        {
            var text = await _context.Texts.FindAsync(id);

            if (text == null)
            {
                return NotFound();
            }

            return text;
        }
    }
}