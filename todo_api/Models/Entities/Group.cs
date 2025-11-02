namespace todo_api.Models.Entities
{
    public class Group
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public required string Name { get; set; }
        public ICollection<TodoTask>? Tasks { get; set; }

    }
}
