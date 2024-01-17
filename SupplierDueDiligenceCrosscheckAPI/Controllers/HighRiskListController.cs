using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupplierDueDiligenceCrosscheckAPI.Models;
using SupplierDueDiligenceCrosscheckAPI.Services;

namespace SupplierDueDiligenceCrosscheckAPI.Controllers
{
    [ApiController]
    [Route("api/highrisklists")]
    public class HighRiskListController : ControllerBase
    {
        private readonly IHighRiskListService _highRiskListService;

        public HighRiskListController(IHighRiskListService highRiskListService)
        {
            _highRiskListService = highRiskListService;
        }

        // GET: api/highrisklists
        [HttpGet]
        public IActionResult GetHighRiskLists()
        {
            var highRiskLists = _highRiskListService.GetHighRiskLists();
            return Ok(highRiskLists);
        }

        // GET: api/highrisklists/{id}
        [HttpGet("{id}")]
        public IActionResult GetHighRiskListById(int id)
        {
            var highRiskList = _highRiskListService.GetHighRiskListById(id);

            if (highRiskList == null)
            {
                return NotFound();
            }

            return Ok(highRiskList);
        }

        // POST: api/highrisklists
        [HttpPost]
        public IActionResult AddHighRiskList([FromBody] HighRiskListDTO createModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var highRiskList = new HighRiskList
            {
                Name = createModel.Name,
                HighRiskCompanies = createModel.HighRiskCompanies
            };

            _highRiskListService.AddHighRiskList(highRiskList);

            // Return the created highRiskList with the generated id
            return CreatedAtAction("GetHighRiskListById", new { id = highRiskList.Id }, highRiskList);
        }

        // PUT: api/highrisklists/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateHighRiskList(int id, [FromBody] HighRiskList updatedHighRiskList)
        {
            if (id != updatedHighRiskList.Id)
            {
                return BadRequest();
            }

            _highRiskListService.UpdateHighRiskList(updatedHighRiskList);

            return NoContent();
        }

        // DELETE: api/highrisklists/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteHighRiskList(int id)
        {
            var highRiskList = _highRiskListService.GetHighRiskListById(id);

            if (highRiskList == null)
            {
                return NotFound();
            }

            _highRiskListService.DeleteHighRiskList(id);

            return Ok(highRiskList);
        }
    }
}

