using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Models;
using Mapster;
using Microsoft.AspNetCore.Authorization;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class TextsController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public TextsController(PortfolioDbContext context)
        {
            _context = context;
            TypeAdapterConfig<Text_No_ID, Text>.NewConfig().IgnoreNullValues(true).Ignore(Text => Text.TextID);

        }

        // GET: api/Texts
        [HttpGet, AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Text>>> GetTexts()
        {
            return await _context.Texts.ToListAsync();
        }

        // GET: api/Texts/5
        [HttpGet("{id}"), AllowAnonymous]
        public async Task<ActionResult<Text>> GetText(int id)
        {
            var text = await _context.Texts.FindAsync(id);

            if (text == null)
            {
                return NotFound();
            }

            return text;
        }

        // PUT: api/Texts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutText(int id, Text text)
        {
          

            _context.Entry(text).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TextExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Texts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Text>> PostText(Text text)
        {
            _context.Texts.Add(text);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetText", new { id = text.TextID }, text);
        }

        // DELETE: api/Texts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteText(int id)
        {
            var text = await _context.Texts.FindAsync(id);
            if (text == null)
            {
                return NotFound();
            }

            _context.Texts.Remove(text);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TextExists(int id)
        {
            return _context.Texts.Any(e => e.TextID == id);
        }
    }
}
