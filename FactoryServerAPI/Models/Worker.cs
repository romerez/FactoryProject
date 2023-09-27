namespace FactoryServerAPI.Models
{
    public class Worker
    { 

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Age { get; set; }
        public JobTitle Job { get; set; }
    }
    
}
