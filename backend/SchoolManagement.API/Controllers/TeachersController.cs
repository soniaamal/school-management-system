using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.API.Data;
using SchoolManagement.API.Models;

namespace SchoolManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public TeachersController(SchoolDbContext context)
        {
            _context = context;
        }

        // GET: api/Teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
        {
            return await _context.Teachers.ToListAsync();
        }

        // GET: api/Teachers/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            return teacher;
        }

        // POST: api/Teachers
        [HttpPost]
        public async Task<ActionResult<Teacher>> CreateTeacher(Teacher teacher)
        {
            teacher.CreatedAt = DateTime.UtcNow;

            _context.Teachers.Add(teacher);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTeacher),
                new { id = teacher.Id },
                teacher
            );
        }

        // PUT: api/Teachers/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(
            int id,
            Teacher teacher)
        {
            var existingTeacher = await _context.Teachers.FindAsync(id);

            if (existingTeacher == null)
            {
                return NotFound();
            }

            existingTeacher.TeacherCode = teacher.TeacherCode;
            existingTeacher.Name = teacher.Name;
            existingTeacher.Subject = teacher.Subject;
            existingTeacher.Gender = teacher.Gender;

            await _context.SaveChangesAsync();

            return Ok(existingTeacher);
        }

        // DELETE: api/Teachers/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            _context.Teachers.Remove(teacher);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}