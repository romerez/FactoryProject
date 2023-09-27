using Microsoft.EntityFrameworkCore;

namespace FactoryServerAPI.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
                
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=workersdb;Trusted_Connection=true;TrustServerCertificate=true;");
        }
        public DbSet<Worker> Workers { get; set; } 

    }
}
