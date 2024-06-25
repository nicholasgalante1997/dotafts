import { Option } from 'sleepydogs';
import frontmatter from 'front-matter';
import APIClient from '@/lib/models/API';
import { PostData } from '@/types/Post';

async function getPostsData(id: string) {
  const callback = async () => {
    const url = APIClient.getEndpoint('post');
    const res = await fetch(url, {
      mode: 'same-origin',
      method: 'GET',
      headers: APIClient.getHeaders('GET post')
    });
    const text = await res.text();
    const fm = frontmatter(text);
    const { attributes, body, frontmatter: fmstring } = fm;
    return {
      attributes,
      body,
      fmstring
    }
  };
  const $postsDataOption = new Option(callback);
  const { data, error, state } = await $postsDataOption.resolve();
  if (error || state === 'rejected' || data == null) return null;
  return data;
}

export default getPostsData;