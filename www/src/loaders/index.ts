import { getPostsData } from './posts';
import { getPostData } from './posts';

type GetPostsDataLoaderKey = '@loaders/posts/all';
type GetPostDataLoaderKey = `@loaders/post/${string}`;

type Loader<Data = any> = (...args: any[]) => Promise<Data>;
type LoaderKey = GetPostsDataLoaderKey | GetPostDataLoaderKey;

const LoaderRegistry = new Map<LoaderKey, Loader<any>>();

LoaderRegistry.set('@loaders/posts/all', getPostsData);

export { LoaderRegistry, getPostsData, getPostData };
