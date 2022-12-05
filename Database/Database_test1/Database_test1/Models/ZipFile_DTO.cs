using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database_test1.Models
{



    public class ZipFile_DTO
    {
        [Key] 
        public int DocumentId { get; set; }
        
        
        [MaxLength(100)]
        public string Name { get; set; }
        
        [MaxLength(100)]
        public string FileType { get; set; }
        
        public DateTime? CreatedOn { get; set; }

        public string Language { get; set; }

    }
}
    
        
    
