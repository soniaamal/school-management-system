namespace SchoolManagement.API.Models
{
    public class Class
    {
        public int Id { get; set; }

        public string ClassCode { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public string TeacherCode { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}