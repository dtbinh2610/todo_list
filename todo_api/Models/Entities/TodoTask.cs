    namespace todo_api.Models.Entities
    {
        public class TodoTask
        {
            public Guid Id { get; set; }
            public Guid UserId { get; set; }    
            public Guid? GroupId { get; set; }   
            public required string Title { get; set; }  
            public  string Description {  get; set; }    
            public  bool IsCompleted { get; set; }
            public bool IsImportant { get; set; }
            public bool IsMyDay { get; set; }
            public DateTime  CreateAt { get; set; }
        public DateTime? DueDate { get; set;}



    }
    }
