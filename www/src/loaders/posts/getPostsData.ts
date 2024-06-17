import { Option } from 'sleepydogs';
import { PostData } from '@/types/Post';

async function getPostsData() {
  const callback = async () => {
    const url = '/api/posts/all';
    const res = await fetch(url, {
      mode: 'same-origin',
      method: 'GET',
      headers: {
        'X-DOT-AFTS-CLIENT-VERSION': '1.0',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, br'
      }
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
