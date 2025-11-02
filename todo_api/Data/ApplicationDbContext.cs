using Microsoft.EntityFrameworkCore;
using todo_api.Models.Entities;

namespace todo_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<TodoTask> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoTask>()
                .HasKey(t => t.Id);
        }
    }
}
