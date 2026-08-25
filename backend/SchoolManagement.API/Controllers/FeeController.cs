using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.API.Data;
using SchoolManagement.API.Models;
using System.Data;

namespace SchoolManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeeController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public FeeController(SchoolDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fee>>> GetFees()
        {
            return await _context.Fees
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fee>> GetFeeById(int id)
        {
            var fee = await _context.Fees.FindAsync(id);

            if (fee == null)
            {
                return NotFound();
            }
            return fee;
        }

        [HttpPost]
        public async Task<ActionResult<Fee>> CreateFee(Fee fee)
        {
            fee.CreatedAt = DateTime.UtcNow;

            _context.Fees.Add(fee);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetFeeById),
                new { id = fee.Id },
                fee
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFee(
                int id,
                Fee fee)
        {
            var existingFee = await _context.Fees.FindAsync(id);

            if (existingFee == null)
            {
                return NotFound();
            }

            existingFee.FeeCode = fee.FeeCode;
            existingFee.StudentId = fee.StudentId;
            existingFee.StudentName = fee.StudentName;
            existingFee.ClassName = fee.ClassName;
            existingFee.Amount = fee.Amount;
            existingFee.Status = fee.Status;

            await _context.SaveChangesAsync();

            return Ok(existingFee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFee(int id)
        {
            var fee = await _context.Fees.FindAsync(id);

            if (fee == null)
            {
                return NotFound();
            }

            _context.Fees.Remove(fee);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
