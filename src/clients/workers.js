/** @type {Worker | null} */
let prefetchWorker = null;

function setupPrefetchWorker() {
    if ("Worker" in window) {
        prefetchWorker = new window.Worker("/src/workers/prefetch.js");
    }
}

function getPrefetchWorkerRef() {
    return prefetchWorker;
}

function setupWorkers() {
    setupPrefetchWorker();
}

export {
    getPrefetchWorkerRef,
    setupWorkers
}