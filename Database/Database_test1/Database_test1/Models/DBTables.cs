using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database_test1.Models
{
    public interface IText
    {
        public int TextID { get; set; }
        public string Headline { get; set; }

        public string MainText { get; set; }
    }

    public class Text : IText
    {
        [Key]
        public int TextID { get; set; }

        [MaxLength(50)]
        public string Headline { get; set; }

        public string MainText { get; set; }

    }

}
