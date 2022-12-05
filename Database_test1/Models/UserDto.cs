using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Database_test1.Models
{
    public class UserDto
    {
        [MaxLength(254)]
        public string Email { get; set; }
        [MaxLength(72)]
        public string Password { get; set; }
        //public bool IsAdmin { get; set; }

    }
}
