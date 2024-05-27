const CACHE_VERSION = 0.1;
const ALLOWLISTED_CACHE_RECORD = {
  html: `browser-cache-html-files-prefetch-v${CACHE_VERSION}`
};

/**
 * ***********************************************************
 * event handler: activate
 * invoked when the Worker script is activated from the main script.
 * @abstract
 * Iterates through local `caches` and asynchronously deletes caches that
 * are no longer managed, outversioned, or unknown.
 ************************************************************ */
self.addEventListener('activate', (event) => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic
  // will handle the case where there are multiple versioned caches.
  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  event.waitUntil(
    caches.keys().then(
      async (cacheNames) =>
        await Promise.all(
          cacheNames.map(async (cacheName) => {
            if (!expectedCacheNamesSet.has(cacheName)) {
              // If this cache name isn't present in the set of
              // "expected" cache names, then delete it.
              console.log('Deleting out of date cache: ', cacheName);
              await caches.delete(cacheName);
            }
          })
        )
    )
  );
});

/** ***********************************************************
 * event handler: message
 * invoked whenever the main script calls worker.postMessage on this worker
 * it expects to receieve a same-site URI to fetch, this is typically an html resource
 *********************************************************** */
self.onmessage = function (e) {
  /**
   * Get our current window url
   */
  const url = new URL(self.location.href);

  /**
   * Derive host and protocol from current window url
   */
  const hostname = url.hostname;
  const protocol = url.protocol;

  const isDev = hostname.includes('localhost');
  /**
   * Derive the file path from event.data
   */
  const path = e.data;

  if (typeof path !== 'string') {
    console.warn(
      'e.data is not of type string. This is likely a malicious actor. Please check infosec logs.'
    );
    return;
  }
  /**
   * Create a new URL with the full filepath, assumed to be served from the protocol:hostname/path
   */
  const requestUrl = new URL(`${protocol}//${hostname}${isDev ? `:${url.port}` : ''}/${path}`);
  /**
   * Create a Fetch Request Init Object describing the request we want to prefetch/cache
   */
  const request = new Request(requestUrl, {
    cache: 'default',
    mode: 'same-origin',
    credentials: 'same-origin',
    destination: 'document',
    headers: {
      Accept: 'text/html'
    }
  });
  /**
   * using the global `caches` object made available through globalThis and window,
   * open our specific cache `browser-cache-html-files-prefetch-v0.1`. This action is asynchronous,
   * Once we have access to our cache, we want to *match* the **request** we want to prefetch.
   * Matching is just a function that is made available to us through the cache instance,
   * which will either retrive a `Response` for a given `Request` or not if none exists.
   * If we do have an existing valid cached response, that's great. return it.
   * If we do not have an existing valid cached response, fetch the resource using the request we constructed earlier
   * If we have a successful response to our fetch request (Status 200), then we can update the cache with the response
   * using the asynchronous `put` method that the cache instance makes available to us
   * both `cache.put` and `fetch` consume the request object (If youve worked in Rust, this is similar to a function taking ownership of an argument),
   * but we can avoid this by passing request.clone();
   */
  caches
    .open(ALLOWLISTED_CACHE_RECORD.html)
    .then(async (cache) => {
      return await cache
        .match(request)
        .then((cacheResponse) => {
          if (cacheResponse) {
            console.log('Found response in cache: ', cacheResponse);
            return cacheResponse;
          } else {
            return fetch(request)
              .then((response) => {
                if (
                  response.status === 200 &&
                  response.headers.has('content-type') &&
                  response.headers.get('content-type')?.match(/text\/html/i)
                ) {
                  // This avoids caching responses that we know are errors
                  // (i.e. HTTP status code of 4xx or 5xx).
                  // We also only want to cache responses that correspond
                  // to fonts, i.e. have a Content-Type response header that
                  // starts with "font/".
                  // Note that for opaque filtered responses
                  // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
                  // we can't access to the response headers, so this check will
                  // always fail and the font won't be cached.
                  // All of the Google Web Fonts are served from a domain that
                  // supports CORS, so that isn't an issue here.
                  // It is something to keep in mind if you're attempting
                  // to cache other resources from a cross-origin
                  // domain that doesn't support CORS, though!
                  console.log('Caching the response to', request.url);
                  // We call .clone() on the response to save a copy of it
                  // to the cache. By doing so, we get to keep the original
                  // response object which we will return back to the controlled
                  // page.
                  // https://developer.mozilla.org/en-US/docs/Web/API/Request/clone
                  cache
                    .put(request, response.clone())
                    .then(() => {
                      console.log('Wrote to browser cache.');
                    })
                    .catch((e) => {
                      throw e;
                    });
                }
                return response;
              })
              .catch((e) => {
                throw e;
              });
          }
        })
        .catch((e) => {
          throw e;
        });
    })
    .catch((e) => {
      console.warn('A process in Worker "prefetch.js" has thrown an error.');
      console.error(e.message);
    });
};

self.onerror = function (e) {
  console.warn('An error occurred in workers/prefetch.js');
  console.error(e);
};
