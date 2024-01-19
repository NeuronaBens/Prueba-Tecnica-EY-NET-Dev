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

            modelBuilder.Entity<Provider>().HasData(
                new Provider
                {
                    Id = 1,
                    LegalName = "Company1",
                    TradeName = "TradeName1",
                    TaxId = "12345678901",
                    PhoneNumber = "123-456-7890",
                    Email = "company1@example.com",
                    Website = "http://www.company1.com",
                    PhysicalAddress = "123 Main St, City, Country",
                    Country = "Country1",
                    AnnualRevenueUSD = 1000000.00,
                    LastEdited = DateTime.UtcNow
                },
                new Provider
                {
                    Id = 2,
                    LegalName = "Company2",
                    TradeName = "TradeName2",
                    TaxId = "98765432109",
                    PhoneNumber = "987-654-3210",
                    Email = "company2@example.com",
                    Website = "http://www.company2.com",
                    PhysicalAddress = "456 Oak St, Town, Country",
                    Country = "Country2",
                    AnnualRevenueUSD = 2000000.00,
                    LastEdited = DateTime.UtcNow
                }
            );

            modelBuilder.Entity<HighRiskList>().HasData(
                new HighRiskList
                {
                    Id = 1,
                    Name = "HighRiskList1",
                    HighRiskCompanies = new List<string> { "Company1", "CompanyB", "CompanyC" }
                },
                new HighRiskList
                {
                    Id = 2,
                    Name = "HighRiskList2",
                    HighRiskCompanies = new List<string> { "CompanyD", "CompanyE", "CompanyF" }
                },
                new HighRiskList
                {
                    Id = 3,
                    Name = "HighRiskList3",
                    HighRiskCompanies = new List<string> { "CompanyG", "Company2", "CompanyI" }
                },
                new HighRiskList
                {
                    Id = 4,
                    Name = "HighRiskList4",
                    HighRiskCompanies = new List<string> { "CompanyJ", "CompanyK", "CompanyL" }
                }
            );


        }
    }
}
