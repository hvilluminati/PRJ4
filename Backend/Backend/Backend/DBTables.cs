using EFGetStarted;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Tables
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
    
}
