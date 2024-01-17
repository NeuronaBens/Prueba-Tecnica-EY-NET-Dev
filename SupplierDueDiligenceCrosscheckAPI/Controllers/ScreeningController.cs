using Microsoft.AspNetCore.Mvc;
using SupplierDueDiligenceCrosscheckAPI.Services;

namespace SupplierDueDiligenceCrosscheckAPI.Controllers
{
    [ApiController]
    [Route("api/screening")]
    public class ScreeningController : ControllerBase
    {
        private readonly IScreeningService _screeningService;

        public ScreeningController(IScreeningService screeningService)
        {
            _screeningService = screeningService;
        }

        // GET: api/screening/{providerId}/onHighRiskLists
        [HttpGet("{providerId}/onHighRiskLists")]
        public IActionResult IsProviderOnHighRiskLists(int providerId, [FromQuery] int[] highRiskListIds)
        {
            var isOnHighRiskLists = _screeningService.IsProviderOnHighRiskLists(providerId, highRiskListIds);

            return Ok(new { IsOnHighRiskLists = isOnHighRiskLists });
        }
    }
}
