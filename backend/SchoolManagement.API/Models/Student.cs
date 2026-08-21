using System.Data;

namespace SchoolManagement.API.Models
{
    public class Student
    {
        public int Id { get; set; }

        public string StudentCode { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public string ClassName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}