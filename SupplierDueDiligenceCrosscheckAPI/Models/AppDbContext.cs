using Microsoft.EntityFrameworkCore;

namespace SupplierDueDiligenceCrosscheckAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Provider> Providers { get; set; }
        public DbSet<HighRiskList> HighRiskLists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Provider>().HasKey(p => p.Id);
            modelBuilder.Entity<HighRiskList>().HasKey(p => p.Id);
        }
    }
}
