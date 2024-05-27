import * as WebVitals from 'web-vitals';

const { log } = console;

function setupAnalytics() {
  WebVitals.onFCP(log);
  WebVitals.onCLS(log);
  WebVitals.onLCP(log);
  WebVitals.onTTFB(log);
  WebVitals.onINP(log);
}

export default setupAnalytics;
