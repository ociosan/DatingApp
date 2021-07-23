using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entitites
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; } /*Connect to cloudinary account*/
        public AppUser Appuser { get; set; }
        public int AppUserId { get; set; }
    }
}