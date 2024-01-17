using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SupplierDueDiligenceCrosscheckAPI.Models
{
    public class HighRiskListDTO
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(255, ErrorMessage = "Name cannot exceed 255 characters.")]
        public string Name { get; set; }

        // A list of LegalNames of companies that are high risk
        public List<string> HighRiskCompanies { get; set; }
    }
}

