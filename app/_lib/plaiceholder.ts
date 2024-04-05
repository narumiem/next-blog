import { eyecatchDefault } from '@/app/_const/site-config';
import type { Post } from '@/app/_lib/apollo-client';
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
      const featuredImage =
        post.featuredImage && post.featuredImage.node
          ? {
              ...post.featuredImage.node,
              blurDataURL:
                post.featuredImage.node.blurDataURL ||
                (await getImageBlurData(post.featuredImage.node.mediaItemUrl)),
            }
          : eyecatchDefault;
      return { ...post, featuredImage: { node: featuredImage } };
    })
  );
  return updatedPosts;
}
