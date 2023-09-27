using FactoryServerAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FactoryServerAPI.Controllers
{
    [EnableCors("_myAllowSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IAuthService _authService;
        public WorkerController(IWorkerService workerService, IAuthService authService)
        {
            _workerService = workerService;
            _authService = authService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Worker>>> GetAllWorkers()
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(authHeader) || _authService.ValidateJwtToken(authHeader) == null)
                return Unauthorized("Authorization header is missing or invalid");

            return await _workerService.GetAllWorkers();
        }

        [HttpPost] 
        public async Task<ActionResult<List<Worker>>> AddWorker(Worker worker)
        {
           var result = await _workerService.AddWorker(worker);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Worker>>> UpdateWorker(int id, Worker request)
        {
            var result = await _workerService.UpdateWorker(id, request);
            if (result is null)
                return NotFound("Hero not found.");

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Worker>>> DeleteWorker(int id)
        {
            var result = await _workerService.DeleteWorker(id);
            if (result is null)
                return NotFound("Worker not found.");

            return Ok(result);
        }

        [HttpGet("handCheck")]
        public async Task<ActionResult<TokenModel>> GetHandCheck()
        {
            TokenModel verToken = new TokenModel(_authService.GenerateJwtToken("workerUserName"));       
            return Ok(verToken); // when there is loging, will use real user name. and will put on controller authentication 
        }
    }
}
