using EFGetStarted;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    public interface IText
    {
        public int TextId { get; set; }
        public string Headline { get; set; }

        public int MainText { get; set; }
    }

    public class Text : IText
    {
        [Key]
        public int TextId { get; set; }

        [MaxLength(50)]
        public string Headline { get; set; }

        public int MainText { get; set; }


        public List<Text> Texts { get; } = new();
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
