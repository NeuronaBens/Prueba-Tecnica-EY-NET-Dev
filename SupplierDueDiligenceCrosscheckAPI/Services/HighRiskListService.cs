using System.Collections.Generic;
using SupplierDueDiligenceCrosscheckAPI.Models;
using SupplierDueDiligenceCrosscheckAPI.Repositories;

namespace SupplierDueDiligenceCrosscheckAPI.Services
{
    public interface IHighRiskListService
    {
        IEnumerable<HighRiskList> GetHighRiskLists();
        HighRiskList GetHighRiskListById(int id);
        void AddHighRiskList(HighRiskList highRiskList);
        void UpdateHighRiskList(HighRiskList highRiskList);
        void DeleteHighRiskList(int id);
        // Other methods as needed
    }

    public class HighRiskListService : IHighRiskListService
    {
        private readonly IHighRiskListRepository _highRiskListRepository;

        public HighRiskListService(IHighRiskListRepository highRiskListRepository)
        {
            _highRiskListRepository = highRiskListRepository;
        }

        public IEnumerable<HighRiskList> GetHighRiskLists()
        {
            return _highRiskListRepository.GetAll();
        }

        public HighRiskList GetHighRiskListById(int id)
        {
            return _highRiskListRepository.GetById(id);
        }

        public void AddHighRiskList(HighRiskList highRiskList)
        {
            // Business logic before adding
            _highRiskListRepository.Add(highRiskList);
        }

        public void UpdateHighRiskList(HighRiskList highRiskList)
        {
            // Business logic before updating
            _highRiskListRepository.Update(highRiskList);
        }

        public void DeleteHighRiskList(int id)
        {
            // Business logic before deleting
            _highRiskListRepository.Delete(id);
        }
    }
}
