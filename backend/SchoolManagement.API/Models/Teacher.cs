namespace SchoolManagement.API.Models
{
    public class Teacher
    {
        public int Id { get; set; }

        public string TeacherCode { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}