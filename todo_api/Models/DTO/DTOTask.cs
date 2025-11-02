namespace todo_api.Models.DTO
{
    public class DTOTask
    {
        public required string Title { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsImportant { get; set; }

        public bool IsMyDay { get; set; }
        public Guid GroupId { get; set; }
        public DateTime? DueDate { get; set; }

    }
}
