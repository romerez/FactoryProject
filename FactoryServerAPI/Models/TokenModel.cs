namespace FactoryServerAPI.Models
{
    public class TokenModel
    {
        public string Value{ get; set; }
        public TokenModel(string value)
        {
            Value = value;       
        }
    }
}
