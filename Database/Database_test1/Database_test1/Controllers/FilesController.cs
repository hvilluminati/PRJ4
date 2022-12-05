using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database_test1.Data;
using Database_test1.Models;
using Microsoft.CodeAnalysis;
using Mapster;
using Microsoft.AspNetCore.Authorization;

File = Database_test1.Models.ZipFile;
namespace Database_test1.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class FilesController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public FilesController(PortfolioDbContext context)
        {
            _context = context;
            TypeAdapterConfig<File,ZipFile_DTO>.NewConfig().IgnoreNullValues(true);

        }

        // GET: api/Files
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WebRequestMethods.File>>> GetFiles()
        {
            List<WebRequestMethods.File> filesList= await _context.Files.ToListAsync();

            return filesList.Adapt<List<ZipFile_DTO>>();



        }

        // GET: api/Files/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WebRequestMethods.File>> GetFiles(int id)
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
        public async Task<IActionResult> PutFiles(int id, WebRequestMethods.File file)
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
        public async Task<ActionResult<WebRequestMethods.File>> PostFiles(IFormFile files,string language)
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
                    if (fileExtension!=".zip")
                    {
                        return BadRequest("Not a zipped file");
                    }
                    var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);

                    var objfiles = new WebRequestMethods.File()
                    {
                        Name = newFileName,
                        FileType = fileExtension,
                        CreatedOn = DateTime.Now,
                        Language = language
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
