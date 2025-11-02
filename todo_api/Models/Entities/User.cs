using Microsoft.Identity.Client;

namespace todo_api.Models.Entities
{
    public class User
    {
        public Guid Id { get; set; } 
        public required string Username { get; set; }
        public required string Password { get; set; }   
        public required string Email { get; set; }
        public ICollection<TodoTask>? Tasks { get; set; } = new List<TodoTask>();



    }
}
