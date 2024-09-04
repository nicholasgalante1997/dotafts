const workers = new Map<string, Worker>();

type KnownWorker = 'Error';
const WorkerRegistry = new Map<KnownWorker, string>();
WorkerRegistry.set('Error', '/workers/error.js');

/*
 * Create or Use Worker
 */
function couWorker(name: KnownWorker) {
  if (workers.has(name)) {
    return workers.get(name);
  }

  const workerAvailable = typeof window !== 'undefined' && 'Worker' in window;
  if (workerAvailable && WorkerRegistry.has(name)) {
    const worker = new window.Worker(WorkerRegistry.get(name)!);
    workers.set(name, worker);
    return worker;
  }
}

export default couWorker;
