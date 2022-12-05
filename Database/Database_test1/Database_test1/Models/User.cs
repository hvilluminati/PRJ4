using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Database_test1.Models
{
    public class User
    {
        [Key]
        public long UserId { get; set; }
        [MaxLength(254)]
        public string Email { get; set; }
        [MaxLength(60)]
        public string PwHash { get; set; }
        //public bool IsAdmin { get; set; }

    }
}
