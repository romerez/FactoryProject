namespace FactoryServerAPI.Services
{
    public interface IAuthService
    {
        public string GenerateJwtToken(string username);
        public string? ValidateJwtToken(string? token);
    }
}
