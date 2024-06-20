import { Option } from 'sleepydogs';
import APIClient from '@/lib/models/API';
import { PostData } from '@/types/Post';

async function getPostsData() {
  const callback = async () => {
    const url = APIClient.getEndpoint('posts');
    const res = await fetch(url, {
      mode: 'same-origin',
      method: 'GET',
      headers: APIClient.getHeaders('GET posts')
    });
    const json = await res.json();
    return json as PostData[];
  };
  const $postsDataOption = new Option(callback);
  const { data, error, state } = await $postsDataOption.resolve();
  if (error || state === 'rejected' || data == null) return null;
  return data;
}

export default getPostsData;
