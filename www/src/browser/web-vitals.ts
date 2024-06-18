import * as webVitals from 'web-vitals';

function initWebVitals() {
  webVitals.onCLS(console.log);
  webVitals.onFCP(console.log);
  webVitals.onINP(console.log);
  webVitals.onLCP(console.log);
  webVitals.onTTFB(console.log);
}

initWebVitals();
