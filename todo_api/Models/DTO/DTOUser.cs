namespace todo_api.Models.DTO
{
    public class DTOUser
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }
}
