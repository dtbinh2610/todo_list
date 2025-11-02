using Microsoft.AspNetCore.Mvc;
using todo_api.Data;
using todo_api.Models.DTO;
using todo_api.Models.Entities;

namespace todo_api.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("getAllUser")]
        public ActionResult GetAllUser() {
            var user = dbContext.Users.ToList();
            return Ok(user);
        }
        [HttpGet("GetUserByEmail")]
        public IActionResult GetUserByEmail(string email) {

            var user = dbContext.Users.SingleOrDefault(x => x.Email == email);
            return Ok(user);


        }
        [HttpPost("Login")]
        public IActionResult Login( string email, string password) {
            var user = dbContext.Users.SingleOrDefault(t => t.Email == email && t.Password==password);
            if ( user == null)
            {
                return NotFound(new { message = "User not found", code = 404 });
            }
            return Ok(user);
        }
        [HttpPost("Register")]
        public IActionResult Register(DTOUser createUser)
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                Email = createUser.Email,
                Username = createUser.Username,
                Password = createUser.Password,
            };
            dbContext.Users.Add(user);  
            dbContext.SaveChanges();
            return Ok(user);
        }
        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser (DTOUser updateUser,Guid id )
        {
            var user = dbContext.Users.SingleOrDefault(t => t.Id == id);
            if (user == null)
            {
                return BadRequest();
            }
            user.Email = updateUser.Email;
            user.Password = updateUser.Password;    
           dbContext.SaveChanges();
            return Ok(user);
        }
    }


}
