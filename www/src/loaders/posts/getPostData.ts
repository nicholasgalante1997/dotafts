import { Option } from 'sleepydogs';
import frontmatter from 'front-matter';
import APIClient from '@/lib/models/API';
import { PostData } from '@/types/Post';

export type GetPostDataPayload = {
  attributes: PostData,
  body: string
};

async function getPostData(id: string): Promise<GetPostDataPayload | null> {
  const callback = async () => {
    const url = APIClient.getEndpoint('post') + id + '.md';
    const res = await fetch(url, {
      mode: 'same-origin',
      method: 'GET',
      headers: APIClient.getHeaders('GET post')
    });
    const text = await res.text();
    console.log(`Text from API is ${text}`);
    const fm = frontmatter(text);
    console.log(`Frontmatter is `, fm);
    const { attributes, body, frontmatter: fmstring } = fm;
    return {
      attributes: attributes as PostData,
      body,
    }
  };
  const $postsDataOption = new Option(callback);
  const { data, error, state } = await $postsDataOption.resolve();
  if (error || state === 'rejected' || data == null) return null;
  return data;
}

export default getPostData;