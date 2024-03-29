import { eyecatchDefault } from '@/app/_const/site-config';
import type { Post } from '@/app/_lib/microcms';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

export async function getImageBlurData(src: string) {
  async function getBuffer() {
    if (src.startsWith('http')) {
      const res = await fetch(src);
      return Buffer.from(await res.arrayBuffer());
    } else {
      return await fs.readFile(path.join('./public', src));
    }
  }
  const imageBuffer = await getBuffer();
  const { base64 } = await getPlaiceholder(imageBuffer);
  return base64;
}

export async function setBlurDataURLForPosts(posts: Post[]): Promise<Post[]> {
  const updatedPosts = await Promise.all(
    posts.map(async (post) => {
      if (!post.eyecatch) {
        post.eyecatch = eyecatchDefault;
      }
      post.eyecatch.blurDataURL = await getImageBlurData(post.eyecatch.url);
      return post;
    })
  );
  return updatedPosts;
}
