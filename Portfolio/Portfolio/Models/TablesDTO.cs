using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    

    public class Text_No_ID 
    {
        
        [MaxLength(50)]
        public string Headline { get; set; }

        public string MainText { get; set; }

    }

}
