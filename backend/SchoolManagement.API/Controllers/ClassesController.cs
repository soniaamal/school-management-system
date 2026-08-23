using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.API.Data;
using SchoolManagement.API.Models;

namespace SchoolManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassesController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public ClassesController(SchoolDbContext context)
        {
            _context = context;
        }

        // GET: api/Classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            return await _context.Classes.ToListAsync();
        }

        // GET: api/Classes/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Class>> GetClass(int id)
        {
            var classItem = await _context.Classes.FindAsync(id);

            if (classItem == null)
            {
                return NotFound();
            }

            return classItem;
        }

        // POST: api/Classes
        [HttpPost]
        public async Task<ActionResult<Class>> CreateClass(Class classItem)
        {
            classItem.CreatedAt = DateTime.UtcNow;

            _context.Classes.Add(classItem);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetClass),
                new { id = classItem.Id },
                classItem
            );
        }

        // PUT: api/Classes/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(
            int id,
            Class classItem)
        {
            var existingClass = await _context.Classes.FindAsync(id);

            if (existingClass == null)
            {
                return NotFound();
            }

            existingClass.ClassCode = classItem.ClassCode;
            existingClass.Name = classItem.Name;
            existingClass.Section = classItem.Section;
            existingClass.TeacherCode = classItem.TeacherCode;

            await _context.SaveChangesAsync();

            return Ok(existingClass);
        }

        // DELETE: api/Classes/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id)
        {
            var classItem = await _context.Classes.FindAsync(id);

            if (classItem == null)
            {
                return NotFound();
            }

            _context.Classes.Remove(classItem);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}