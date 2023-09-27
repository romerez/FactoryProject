using Microsoft.AspNetCore.Mvc;

namespace FactoryServerAPI.Services
{
    public interface IWorkerService
    {
        Task<List<Worker>> GetAllWorkers();
        Task<List<Worker>> AddWorker(Worker worker);
        Task<List<Worker>?> DeleteWorker(int id);
        Task<List<Worker>?> UpdateWorker(int id, Worker request);
    }
}
