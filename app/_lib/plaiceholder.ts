import { PUBLIC_DIR, eyecatchDefault } from '@/app/_const/site-config';
import type { Post } from '@/app/_lib/apollo-client';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

/**
 * Retrieves the buffer data of an image from a given source.
 * @param src - The source of the image.
 * @returns A promise that resolves to the image buffer.
 * @throws An error if the image fetching fails.
 */
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

/**
 * Retrieves the base64 data URL of an image with added blur effect.
 * @param src - The source of the image.
 * @returns A promise that resolves to the base64 data URL.
 * If an error occurs, an empty string is returned.
 */
export async function getImageBlurData(src: string): Promise<string> {
  try {
    const imageBuffer = await getBuffer(src);
    const { base64 } = await getPlaiceholder(imageBuffer);
    return base64;
  } catch (error) {
    console.error('Error generating blur dataURL:', error);
    return '';
  }
}

/**
 * Sets the blur data URL for the featured images of an array of posts.
 * @param posts - The array of posts.
 * @returns A promise that resolves to the updated array of posts with blur data URLs.
 */
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
