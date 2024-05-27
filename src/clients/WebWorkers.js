/** @type {Worker | null} */
let prefetchWorker = null;

function setupPrefetchWorker() {
  if ('Worker' in window) {
    prefetchWorker = new window.Worker('/src/workers/prefetch.js');
    prefetchWorker.onmessage = (event) => {
      const { type, data, ports, origin } = event;
      console.log({ type, data, ports, origin, eId: 'Worker-Prefetch' });
    };
  }
}

function getPrefetchWorkerRef() {
  return prefetchWorker;
}

function setupWorkers() {
  setupPrefetchWorker();
}

export { getPrefetchWorkerRef, setupWorkers };
