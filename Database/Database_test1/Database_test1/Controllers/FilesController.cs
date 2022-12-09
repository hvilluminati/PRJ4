using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Models;
using Microsoft.CodeAnalysis;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using File = Portfolio.Models.File;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
   // [ApiController, Authorize]
    public class FilesController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public FilesController(PortfolioDbContext context)
        {
            _context = context;
            TypeAdapterConfig<File,File_DTO>.NewConfig().IgnoreNullValues(true);

        }

        // GET: api/Files
        [HttpGet]
        public async Task<ActionResult<IEnumerable<File_DTO>>> GetFiles()
        {
            List<File> filesList= await _context.Files.ToListAsync();


            List<File_DTO> DTOList = filesList.Adapt<List<File_DTO>>();

            DTOList.ForEach(file => file.id = file.DocumentId.ToString());
            return DTOList;



        }


        [HttpGet("FilesSort"), AllowAnonymous]
        public async Task<ActionResult<IEnumerable<File>>> GetFilesSorted(string sort)
        {
            if (sort == "name")
            {
                return await _context.Files.OrderBy(x => x.Name).ToListAsync();
            }
            else if (sort == "date")
            {
                return await _context.Files.OrderByDescending(x => x.CreatedOn).ToListAsync();
            }
            else
            {

                return await _context.Files.ToListAsync();
            }

        }


        [HttpGet("FilesFind"), AllowAnonymous]
        public async Task<ActionResult<IEnumerable<File>>> GetFindFiles(string sort)
        {
            var list = _context.Files.Where(x => x.Language.Contains(sort)).ToList();
            return list;

        }


        // GET: api/Files/5
        [HttpGet("{id}"), AllowAnonymous]
        public async Task<ActionResult<File>> GetFiles(int id)
        {
            var files = await _context.Files.FindAsync(id);

            if (files == null)
            {
                return NotFound();
            }

            string fileName = files.Name;

            byte[] fileBytes = files.DataFiles;

            return File(fileBytes, "application/force-download", fileName);


        }


        // PUT: api/Files/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFiles(int id, File file)
        {
            if (id != file.DocumentId)
            {
                return BadRequest();
            }

            _context.Entry(file).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesExists(id))
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

     

        // POST: api/Files
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<File>> PostFiles(IFormFile files, [FromForm] string language)
        {
            if (files != null)
            {

                if (files.Length > 0)
                {
                    //Getting FileName
                    var fileName = Path.GetFileName(files.FileName);
                    //Getting file Extension
                    var fileExtension = Path.GetExtension(fileName);
                    // concatenating  FileName + FileExtension
                    //var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);

                    //Check if file with same name already exists
                    if ((_context.Files.Where(x => x.Name == fileName).Any() == false))
                    {


                        var objfiles = new File()
                        {
                            Name = fileName,
                            FileType = fileExtension,
                            CreatedOn = DateTime.Now,
                            Language = language,
                        };

                        using (var target = new MemoryStream())
                        {
                            files.CopyTo(target);
                            objfiles.DataFiles = target.ToArray();
                        }

                        _context.Files.Add(objfiles);
                        _context.SaveChanges();


                        var file = await _context.Files.FindAsync(objfiles.DocumentId);
                        return CreatedAtAction("GetFiles", new { id = file.DocumentId }, files);
                    }
                    return StatusCode(403);

                }

            }
            return BadRequest();
        }


        // DELETE: api/Files/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFiles(int id)
        {
            var files = await _context.Files.FindAsync(id);
            if (files == null)
            {
                return NotFound();
            }

            _context.Files.Remove(files);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FilesExists(int id)
        {
            return _context.Files.Any(e => e.DocumentId == id);
        }
    }
}
