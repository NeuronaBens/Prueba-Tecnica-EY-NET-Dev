using SupplierDueDiligenceCrosscheckAPI.Models;
using SupplierDueDiligenceCrosscheckAPI.Repositories;

namespace SupplierDueDiligenceCrosscheckAPI.Services
{
    public interface IProviderService
    {
        IEnumerable<Provider> GetProviders();
        Provider GetProviderById(int id);
        void AddProvider(Provider provider);
        void UpdateProvider(Provider provider);
        void DeleteProvider(int id);
    }

    public class ProviderService : IProviderService
    {
        private readonly IProviderRepository _providerRepository;

        public ProviderService(IProviderRepository providerRepository)
        {
            _providerRepository = providerRepository;
        }

        public IEnumerable<Provider> GetProviders()
        {
            return _providerRepository.GetAll();
        }

        public Provider GetProviderById(int id)
        {
            return _providerRepository.GetById(id);
        }

        public void AddProvider(Provider provider)
        {
            provider.LastEdited = DateTime.Now;
            _providerRepository.Add(provider);
        }

        public void UpdateProvider(Provider provider)
        {
            provider.LastEdited = DateTime.Now;
            _providerRepository.Update(provider);
        }

        public void DeleteProvider(int id)
        {
            _providerRepository.Delete(id);
        }
    }

}
