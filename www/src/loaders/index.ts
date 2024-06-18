import { getPostsData } from './posts';

type GetPostsDataLoaderKey = '@loaders/posts/all';

type Loader<Data = any> = (...args: any[]) => Promise<Data>;
type LoaderKey = GetPostsDataLoaderKey;

const LoaderRegistry = new Map<LoaderKey, Loader<any>>();

LoaderRegistry.set('@loaders/posts/all', getPostsData);

export { LoaderRegistry, getPostsData };
