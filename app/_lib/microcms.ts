import { createClient } from 'microcms-js-sdk';

export interface Eyecatch {
  url: string;
  width: number;
  height: number;
  blurDataURL: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface Post {
  id: string;
  title: string;
  slug: string;
  publishDate?: string;
  content?: string;
  eyecatch?: Eyecatch;
  categories?: Category[];
}
interface ResponseBlogs {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}
interface ResponseCategories {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const response: ResponseBlogs = await client.get({
      endpoint: 'blogs',
      queries: {
        fields:
          'id,title,slug,publishDate,content,categories.id,categories.name,categories.slug,eyecatch',
        filters: `slug[equals]${slug}`,
      },
    });
    const post = response.contents[0];
    return post;
  } catch (err) {
    console.error('getPostBySlug : ', err);
    return undefined;
  }
}

export async function getAllSlugs(limit: number = 100): Promise<Post[] | undefined> {
  try {
    const response: ResponseBlogs = await client.get({
      endpoint: 'blogs',
      queries: {
        fields: 'id,title,slug',
        orders: '-publishDate',
        limit: limit,
      },
    });
    const slugs = response.contents;
    return slugs;
  } catch (err) {
    console.error('getAllSlugs : ', err);
    return undefined;
  }
}

export async function getAllPosts(limit: number = 100): Promise<Post[] | undefined> {
  try {
    const response: ResponseBlogs = await client.get({
      endpoint: 'blogs',
      queries: {
        fields: 'id,title,slug,eyecatch',
        orders: '-publishDate',
        limit: limit,
      },
    });
    const posts = response.contents;
    return posts;
  } catch (err) {
    console.error('getAllPosts : ', err);
    return undefined;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  try {
    const response: ResponseCategories = await client.get({
      endpoint: 'categories',
      queries: { fields: 'id,name,slug', filters: `slug[equals]${slug}` },
    });
    const category = response.contents[0];
    return category;
  } catch (err) {
    console.error('getCategoryBySlug : ', err);
    return undefined;
  }
}

export async function getAllCategories(limit: number = 100): Promise<Category[] | undefined> {
  try {
    const response: ResponseCategories = await client.get({
      endpoint: 'categories',
      queries: {
        fields: 'id,name,slug',
        limit: limit,
      },
    });
    const categories = response.contents;
    return categories;
  } catch (err) {
    console.error('getAllCategories : ', err);
    return undefined;
  }
}

export async function getAllPostsByCategory(
  categoryID: string,
  limit: number = 100
): Promise<Post[] | undefined> {
  try {
    const response: ResponseBlogs = await client.get({
      endpoint: 'blogs',
      queries: {
        fields: 'id,title,slug,eyecatch',
        filters: `categories[contains]${categoryID}`,
        orders: '-publishDate',
        limit: limit,
      },
    });
    const posts = response.contents;
    return posts;
  } catch (err) {
    console.error('getAllPostsByCategory : ', err);
    return undefined;
  }
}
