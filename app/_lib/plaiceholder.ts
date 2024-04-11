import { PUBLIC_DIR, eyecatchDefault } from '@/app/_const/site-config';
import type { Post } from '@/app/_lib/apollo-client';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

// Fetches image as Buffer from URL or local path.
async function getBuffer(src: string): Promise<Buffer> {
  try {
    if (src.startsWith('http')) {
      const response = await fetch(src);
      return Buffer.from(await response.arrayBuffer());
    } else {
      return await fs.readFile(path.join(PUBLIC_DIR, src));
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error('Failed to fetch image');
  }
}

// Generates a blur data URL for an image source.
export async function getImageBlurData(src: string) {
  try {
    const imageBuffer = await getBuffer(src);
    const { base64 } = await getPlaiceholder(imageBuffer);
    return base64;
  } catch (error) {
    console.error('Error generating blur dataURL:', error);
    return '';
  }
}

// Updates posts with blurDataURL for featured images.
export async function setBlurDataURLForPosts(posts: Post[]): Promise<Post[]> {
  const updatedPosts = await Promise.all(
    posts.map(async (post) => {
      const featuredImage = post?.featuredImage?.node
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
