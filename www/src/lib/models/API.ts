import { LazySingleton } from 'sleepydogs';
import Env from './ExecEnv';

type APIServiceName = "posts" | "post" | "write";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

type ServiceCall = `${HttpMethod} ${APIServiceName}`;

class APIClient {
    private static PROD_POST_DATA_URL = "/api/post/" as const;
    private static DEV_POST_DATA_URL = "/api/post/" as const;
    private static PROD_POSTS_DATA_URL = "/api/posts/all" as const;
    private static DEV_POSTS_DATA_URL = "/api/posts/all.json" as const;
    private static PROD_WRITE_DATA_URL = "/api/write" as const;
    private static DEV_WRITE_DATA_URL = "/api/write" as const;

    getEndpoint(service: APIServiceName): string {
        switch(service) {
            case 'post': {
                return Env.NodeEnv === 'production' ? APIClient.PROD_POST_DATA_URL : APIClient.DEV_POST_DATA_URL;
            };
            case  'posts': {
                return Env.NodeEnv === 'production' ? APIClient.PROD_POSTS_DATA_URL : APIClient.DEV_POSTS_DATA_URL;
            };
            case 'write': {
                return Env.NodeEnv === 'production' ? APIClient.PROD_WRITE_DATA_URL : APIClient.DEV_WRITE_DATA_URL;
            }
        }
    }

    getHeaders(serviceCall: ServiceCall): Headers {
        let headers = new Headers();
        switch(serviceCall) {
            case 'GET posts': {
                headers.set('X-DOT-AFTS-CLIENT-VERSION', '1.0');
                headers.set('Accept', 'application/json');
                headers.set('Accept-Encoding', 'gzip, br');
                return headers;
            }
            default: {
                return headers;
            };
        }
    }
}

const APIProvider = LazySingleton(APIClient);

export default APIProvider.getInstance();