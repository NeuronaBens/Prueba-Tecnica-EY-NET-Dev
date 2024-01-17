using System;
using System.ComponentModel.DataAnnotations;

namespace SupplierDueDiligenceCrosscheckAPI.Models
{
    public class ProviderDTO
    {
        [Required(ErrorMessage = "Company name is required.")]
        [MaxLength(255, ErrorMessage = "Company name cannot exceed 255 characters.")]
        public string LegalName { get; set; }

        [MaxLength(255, ErrorMessage = "Trade name cannot exceed 255 characters.")]
        public string TradeName { get; set; }

        [Required(ErrorMessage = "Tax identification number is required.")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "Tax identification number must be 11 digits.")]
        public string TaxId { get; set; }

        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [Url(ErrorMessage = "Invalid website URL format.")]
        public string Website { get; set; }

        [MaxLength(255, ErrorMessage = "Physical address cannot exceed 255 characters.")]
        public string PhysicalAddress { get; set; }

        [Required(ErrorMessage = "Country is required.")]
        [MaxLength(255, ErrorMessage = "Country cannot exceed 255 characters.")]
        public string Country { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Annual revenue must be a non-negative number.")]
        public double AnnualRevenueUSD { get; set; }
    }

}
