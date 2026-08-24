using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.API.Data;
using SchoolManagement.API.Models;

namespace SchoolManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public AttendanceController(SchoolDbContext context)
        {
            _context = context;
        }

        // GET: api/Attendance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetAttendance()
        {
            return await _context.Attendance
                .OrderByDescending(a => a.Date)
                .ToListAsync();
        }

        // GET: api/Attendance/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Attendance>> GetAttendanceById(int id)
        {
            var attendance = await _context.Attendance.FindAsync(id);

            if (attendance == null)
            {
                return NotFound();
            }

            return attendance;
        }

        // POST: api/Attendance
        [HttpPost]
        public async Task<ActionResult<Attendance>> CreateAttendance(
            Attendance attendance)
        {
            attendance.CreatedAt = DateTime.UtcNow;

            _context.Attendance.Add(attendance);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetAttendanceById),
                new { id = attendance.Id },
                attendance
            );
        }

        // PUT: api/Attendance/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(
            int id,
            Attendance attendance)
        {
            var existingAttendance =
                await _context.Attendance.FindAsync(id);

            if (existingAttendance == null)
            {
                return NotFound();
            }

            existingAttendance.StudentId = attendance.StudentId;
            existingAttendance.StudentName = attendance.StudentName;
            existingAttendance.className = attendance.className;
            existingAttendance.Date = attendance.Date;
            existingAttendance.Status = attendance.Status;

            await _context.SaveChangesAsync();

            return Ok(existingAttendance);
        }

        // DELETE: api/Attendance/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var attendance =
                await _context.Attendance.FindAsync(id);

            if (attendance == null)
            {
                return NotFound();
            }

            _context.Attendance.Remove(attendance);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}