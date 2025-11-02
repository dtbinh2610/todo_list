using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using todo_api.Data;
using todo_api.Models.DTO;
using todo_api.Models.Entities;

namespace todo_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public TaskController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("GetTaskByGroup")]
        public IActionResult GetTaskByGroup(Guid userid,Guid groupId)
        {
            var list = dbContext.Tasks.Where(t => t.UserId == userid && t.GroupId==groupId).ToList();
            return Ok(list);
        }
        [HttpGet("SearchTask")]
        public IActionResult SearchTask(Guid userid, string title)
        {
            var list = dbContext.Tasks.Where(t => t.UserId == userid && t.Title==title).ToList();
            return Ok(list);
        }
        [HttpGet("GetTaskIscomplete")]
        public IActionResult GetTaskIsComplete(Guid userid)
        {
            var list = dbContext.Tasks.Where(t => t.UserId == userid && t.IsCompleted== true).ToList();
            return Ok(list);
        }   
        [HttpGet("GetTaskIsMyDay")]
        public IActionResult GetTaskIsMyDay(Guid userid)
        {
            var list = dbContext.Tasks.Where(t => t.UserId == userid && t.IsMyDay == true && t.IsCompleted==false).ToList();
            
            return Ok(list);
        }
        [HttpGet("GetTaskIsImportant")]
        public IActionResult GetTaskIsImportant(Guid userid)
        {
            var list = dbContext.Tasks.Where(t => t.UserId == userid && t.IsImportant == true && t.IsCompleted == false).ToList();
            return Ok(list);
        }
        [HttpGet("GetTaskByUser")]
        public IActionResult GetTaskByUserId(Guid userid) {
            var list =dbContext.Tasks.Where(t =>  t.UserId == userid).ToList();
            return Ok(list);    
        }
        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var list = dbContext.Tasks.ToList();
            return Ok(list);
        }
       
        [HttpPost("add")]
        public IActionResult AddTask(DTOTask taskDTO) 
        {
            var isMyDay = false;
            var isComplete = false;
            var isImportant = false; 
            if (taskDTO.IsMyDay)
            {
                isMyDay = true;
            }
            if(taskDTO.IsCompleted) {
                isComplete = true; 
            }
            if (taskDTO.IsImportant)
            {
                isImportant = true; 
            }

            var task = new TodoTask()
            {
                Id = Guid.NewGuid(),
                UserId = taskDTO.UserId,
                Title = taskDTO.Title,
                Description = taskDTO.Description,
                IsCompleted = isComplete,
                IsImportant = isImportant,
                IsMyDay = isMyDay,
                CreateAt = DateTime.Now,
                DueDate = taskDTO.DueDate,


            };
            
            dbContext.Tasks.Add(task);
            dbContext.SaveChanges();
            return Ok(task);
        }
        [HttpPut("UpdateTitle")]
        public async Task<IActionResult> UpdateTitle (Guid id, string newTitle)
        {
            var task = dbContext.Tasks.Find(id);
            task.Title = newTitle;
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("UpdateDescription")]
        public async Task<IActionResult> UpdateDescription(Guid id, string newDes)
        {
            var task = dbContext.Tasks.Find(id);
            task.Description = newDes;
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("UpdateStatusImportant")]
        public  async Task<IActionResult> UpdateStatusImportant(Guid id, bool StatusImportant)
        {
            var todo = await dbContext.Tasks.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            
            todo.IsImportant= StatusImportant;   
          
            await dbContext.SaveChangesAsync();
            return Ok(todo);


        }

        [HttpPut("UpdateStatusMyDay")]
        public async Task<IActionResult> UpdateStatusMyDay(Guid id, bool StatusMyDay)
        {
            var todo = await dbContext.Tasks.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.IsMyDay = StatusMyDay;

            await dbContext.SaveChangesAsync();
            return Ok(todo);


        }

        [HttpPut("UpdateStatusComplete")]
        public async Task<IActionResult> UpdateStatusComplete(Guid id, bool StatusComplete)
        {
            var todo = await dbContext.Tasks.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.IsCompleted = StatusComplete;
                

            await dbContext.SaveChangesAsync();
            var incompleteTasks = dbContext.Tasks
           .Where(t => t.UserId == todo.UserId && t.IsCompleted == false)
           .ToList();
            return Ok(incompleteTasks);


        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeletTask(Guid id)
        {
            var task = await dbContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound(new { message = "Task không tồn tại." });
            }

            dbContext.Tasks.Remove(task);
            await dbContext.SaveChangesAsync();

            return Ok();


        }
    }

}
