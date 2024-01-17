using Microsoft.EntityFrameworkCore;
using SupplierDueDiligenceCrosscheckAPI.Models;

namespace SupplierDueDiligenceCrosscheckAPI.Repositories
{
    public interface IProviderRepository
    {
        IEnumerable<Provider> GetAll();
        Provider GetById(int id);
        void Add(Provider provider);
        void Update(Provider provider);
        void Delete(int id);
        // Otros métodos según sea necesario
    }

    public class ProviderRepository : IProviderRepository
    {
        private readonly AppDbContext _context;

        public ProviderRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Provider> GetAll()
        {
            return _context.Providers.ToList();
        }

        public Provider GetById(int id) => _context.Providers.Find(id);

        public void Add(Provider provider)
        {
            _context.Providers.Add(provider);
            _context.SaveChanges();
        }

        public void Update(Provider provider)
        {
            _context.Entry(provider).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var provider = _context.Providers.Find(id);
            if (provider != null)
            {
                _context.Providers.Remove(provider);
                _context.SaveChanges();
            }
        }
    }
}
