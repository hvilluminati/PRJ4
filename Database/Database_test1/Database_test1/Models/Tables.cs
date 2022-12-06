using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Models
{
   

    public class Text 
    {
        [Key]
        public int TextID { get; set; }

        [MaxLength(50)]
        public string Headline { get; set; }

        public string MainText { get; set; }

    }

    public class Skill
    {
        [Key]
        public int SkillID { get; set; }

        [MaxLength(50)]
        [Required]
        public string SkillName { get; set; }

        [Required]
        [Range(1, 10)]
        public int SkillLevel { get; set; }

        public int MonthsOfExperience { get; set; }

    }
    

}
