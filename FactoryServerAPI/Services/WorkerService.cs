using Microsoft.EntityFrameworkCore;

namespace FactoryServerAPI.Services
{
    public class WorkerService : IWorkerService
    {
        private static List<Worker> workers = new List<Worker>
            {
            new Worker { Id = 1, FirstName = "Rom", LastName = "Erez", Age = new DateTime(1991, 9, 22), Job = JobTitle.Office },
            new Worker { Id = 2, FirstName = "Moshe", LastName = "Kashe", Age = new DateTime(1990, 5, 20), Job = JobTitle.Storage}
            };
        private readonly DataContext _dataContext;

        public WorkerService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Worker>> AddWorker(Worker worker)
        {
            _dataContext.Workers.Add(worker);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Workers.ToListAsync();
        }

        public async Task<List<Worker>?> DeleteWorker(int id)
        {
            var worker = await _dataContext.Workers.FindAsync(id);
            if (worker is null)
                return null;

            _dataContext.Workers.Remove(worker);
            await _dataContext.SaveChangesAsync();

            return await _dataContext.Workers.ToListAsync();
        }

        public async  Task<List<Worker>> GetAllWorkers()
        {
           List<Worker> workers = await _dataContext.Workers.ToListAsync();
           return workers;
        }

        public async Task<List<Worker>?> UpdateWorker(int id, Worker request)
        {
            var worker = await _dataContext.Workers.FindAsync(id);
            if (worker is null)
                return null;

            worker.FirstName = request.FirstName;
            worker.LastName = request.LastName;
            worker.Age = request.Age;
            worker.Job = request.Job;

            await _dataContext.SaveChangesAsync();

            return await _dataContext.Workers.ToListAsync();
        }
    }
}
