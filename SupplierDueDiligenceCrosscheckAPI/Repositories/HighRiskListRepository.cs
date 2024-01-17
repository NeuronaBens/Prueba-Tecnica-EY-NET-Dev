using Microsoft.EntityFrameworkCore;
using SupplierDueDiligenceCrosscheckAPI.Models;

namespace SupplierDueDiligenceCrosscheckAPI.Repositories
{
    public interface IHighRiskListRepository
    {
        IEnumerable<HighRiskList> GetAll();
        HighRiskList GetById(int id);
        void Add(HighRiskList highRiskList);
        void Update(HighRiskList highRiskList);
        void Delete(int id);
        // Other methods as needed
    }

    public class HighRiskListRepository : IHighRiskListRepository
    {
        private readonly AppDbContext _context;

        public HighRiskListRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<HighRiskList> GetAll()
        {
            return _context.HighRiskLists.ToList();
        }

        public HighRiskList GetById(int id) => _context.HighRiskLists.Find(id);

        public void Add(HighRiskList highRiskList)
        {
            _context.HighRiskLists.Add(highRiskList);
            _context.SaveChanges();
        }

        public void Update(HighRiskList highRiskList)
        {
            _context.Entry(highRiskList).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var highRiskList = _context.HighRiskLists.Find(id);
            if (highRiskList != null)
            {
                _context.HighRiskLists.Remove(highRiskList);
                _context.SaveChanges();
            }
        }

        // Other methods as needed
    }
}
