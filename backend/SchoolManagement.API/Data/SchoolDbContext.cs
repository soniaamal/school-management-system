using Microsoft.EntityFrameworkCore;
using SchoolManagement.API.Models;

namespace SchoolManagement.API.Data
{
    public class SchoolDbContext : DbContext
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options)
         : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Class> Classes { get; set; }

        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Fee> Fees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Fee>()
                .Property(f => f.Amount)
                .HasPrecision(18, 2);
        }
    }
}