using System.ComponentModel.DataAnnotations;

namespace ContosoPizza.Models;

public class Pizza
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string? Name { get; set; }
    public bool IsGlutenFree { get; set; }
    
    [Range(1,100)]
    public int Price { get; set; }
}