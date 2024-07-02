import { LazySingleton } from 'sleepydogs';
import Env from './ExecEnv';

type APIServiceName = 'posts' | 'post' | 'write' | 'events';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

type ServiceCall = `${HttpMethod} ${APIServiceName}`;

class APIClient {
  private static PROD_POST_DATA_URL = '/markdown/' as const;
  private static DEV_POST_DATA_URL = '/markdown/' as const;
  private static PROD_POSTS_DATA_URL = '/api/posts/all' as const;
  private static DEV_POSTS_DATA_URL = '/api/posts/all.json' as const;
  private static PROD_WRITE_DATA_URL = '/api/write' as const;
  private static DEV_WRITE_DATA_URL = '/api/write' as const;
  private static PROD_EVENTS_URL = '/api/events/write' as const;

  getEndpoint(service: APIServiceName): string {
    switch (service) {
      case 'post': {
        return Env.NodeEnv === 'production'
          ? APIClient.PROD_POST_DATA_URL
          : APIClient.DEV_POST_DATA_URL;
      }
      case 'posts': {
        return Env.NodeEnv === 'production'
          ? APIClient.PROD_POSTS_DATA_URL
          : APIClient.DEV_POSTS_DATA_URL;
      }
      case 'write': {
        return Env.NodeEnv === 'production'
          ? APIClient.PROD_WRITE_DATA_URL
          : APIClient.DEV_WRITE_DATA_URL;
      }
      case 'events': {
        return APIClient.PROD_EVENTS_URL;
      }
    }
  }

  getHeaders(serviceCall: ServiceCall): Headers {
    let headers = new Headers();
    headers.set('X-DOT-AFTS-CLIENT-VERSION', '1.0');
    switch (serviceCall) {
      case 'GET posts': {
        headers.set('Accept', 'application/json');
        headers.set('Accept-Encoding', 'gzip, br');
        return headers;
      }
      case 'GET post': {
        headers.set('Accept', 'text/markdown');
        headers.set('Accept-Encoding', 'gzip, br');
        return headers;
      };
      case 'POST events': {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Accept-Encoding', 'gzip, br');
        return headers;
      }
      default: {
        return headers;
      }
    }
  }
}

const APIProvider = LazySingleton(APIClient);

export default APIProvider.getInstance();
