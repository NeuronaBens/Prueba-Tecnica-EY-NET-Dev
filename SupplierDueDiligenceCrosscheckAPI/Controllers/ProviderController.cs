using Microsoft.AspNetCore.Mvc;
using SupplierDueDiligenceCrosscheckAPI.Models;
using SupplierDueDiligenceCrosscheckAPI.Services;

namespace SupplierDueDiligenceCrosscheckAPI.Controllers
{
    [ApiController]
    [Route("api/providers")]
    public class ProviderController : ControllerBase
    {
        private readonly IProviderService _providerService;

        public ProviderController(IProviderService providerService)
        {
            _providerService = providerService;
        }

        // GET: api/providers
        [HttpGet]
        public IActionResult GetProviders()
        {
            var providers = _providerService.GetProviders();
            return Ok(providers);
        }

        // GET: api/providers/{id}
        [HttpGet("{id}")]
        public IActionResult GetProviderById(int id)
        {
            var provider = _providerService.GetProviderById(id);

            if (provider == null)
            {
                return NotFound();
            }

            return Ok(provider);
        }

        // POST: api/providers
        [HttpPost]
        public IActionResult AddProvider([FromBody] ProviderDTO createModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var provider = new Provider
            {
                LegalName = createModel.LegalName,
                TradeName = createModel.TradeName,
                TaxId = createModel.TaxId,
                PhoneNumber = createModel.PhoneNumber,
                Email = createModel.Email,
                Website = createModel.Website,
                PhysicalAddress = createModel.PhysicalAddress,
                Country = createModel.Country,
                AnnualRevenueUSD = createModel.AnnualRevenueUSD,
                LastEdited = DateTime.UtcNow // Automatically set LastEdited to current timestamp
            };

            _providerService.AddProvider(provider);

            // Return the created provider with the generated id
            return CreatedAtAction("GetProviderById", new { id = provider.Id }, provider);
        }

        // PUT: api/providers/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateProvider(int id, [FromBody] Provider updatedProvider)
        {
            if (id != updatedProvider.Id)
            {
                return BadRequest();
            }

            _providerService.UpdateProvider(updatedProvider);

            return Ok(updatedProvider);
        }

        // DELETE: api/providers/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteProvider(int id)
        {
            var provider = _providerService.GetProviderById(id);

            if (provider == null)
            {
                return NotFound();
            }

            _providerService.DeleteProvider(id);

            return Ok(provider);
        }
    }
}
