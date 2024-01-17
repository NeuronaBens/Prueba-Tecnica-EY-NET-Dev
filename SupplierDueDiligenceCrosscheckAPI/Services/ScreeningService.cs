namespace SupplierDueDiligenceCrosscheckAPI.Services
{
    public interface IScreeningService
    {
        bool IsProviderOnHighRiskLists(int providerId, params int[] highRiskListIds);
    }

    public class ScreeningService : IScreeningService
    {
        private readonly IProviderService _providerService;
        private readonly IHighRiskListService _highRiskListService;

        public ScreeningService(IProviderService providerService, IHighRiskListService highRiskListService)
        {
            _providerService = providerService;
            _highRiskListService = highRiskListService;
        }

        public bool IsProviderOnHighRiskLists(int providerId, params int[] highRiskListIds)
        {
            var provider = _providerService.GetProviderById(providerId);

            if (provider == null)
            {
                return false;
            }

            foreach (var highRiskListId in highRiskListIds)
            {
                var highRiskList = _highRiskListService.GetHighRiskListById(highRiskListId);
                if (highRiskList != null && highRiskList.HighRiskCompanies.Contains(provider.LegalName))
                {
                    return true;
                }
            }

            return false;
        }
    }

}
