import {
  GET_ALL_CATEGORIES,
  GET_ALL_PAGES,
  GET_ALL_POSTS,
  GET_ALL_POSTS_BY_CATEGORY,
  GET_ALL_POSTS_BY_TAG,
  GET_ALL_TAGS,
  GET_CATEGORY_BY_SLUG,
  GET_PAGE_BY_SLUG,
  GET_POST_BY_SLUG,
  GET_TAG_BY_SLUG,
} from '@/app/_lib/graphql';
import { ApolloClient, InMemoryCache, HttpLink, DocumentNode } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

async function fetchGraphQLData(
  query: DocumentNode,
  variables: Record<string, string | number> = {}
) {
  try {
    const { data } = await client.query({
      query,
      variables,
      // Apollo Client のキャッシュを無効にする
      // fetchPolicy: 'no-cache',
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`GraphQL fetch failed: ${error.message}`);
      throw new Error(`GraphQL fetch failed: ${error.message}`);
    }
    console.error(`GraphQL fetch failed with unknown error.`);
    throw new Error(`GraphQL fetch failed with unknown error.`);
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export interface Eyecatch {
  id: string;
  mediaItemUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
  blurDataURL?: string;
}
export interface Category {
  id: string;
  slug: string;
  name: string;
}
export interface Tag {
  id: string;
  slug: string;
  name: string;
}
export interface Post {
  id: string;
  slug: string;
  title: string;
  dateGmt: string;
  modifiedGmt: string;
  content: string;
  featuredImage: {
    node: Eyecatch;
  };
  categories: {
    nodes: Category[];
  };
  tags: {
    nodes: Tag[];
  };
}
export interface Page {
  id: string;
  menuOrder?: number;
  slug: string;
  uri: string;
  title: string;
  dataGmt: string;
  modifiedGmt: string;
  content: string;
  featuredImage: {
    node: {
      id: string;
      mediaItemUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await fetchGraphQLData(GET_POST_BY_SLUG, { slug });
  if (!data?.post) {
    throw new NotFoundError(`Post with slug "${slug}" not found.`);
  }
  return data.post;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchGraphQLData(GET_CATEGORY_BY_SLUG, { slug });
  if (!data?.category) {
    throw new NotFoundError(`Category with slug "${slug}" not found.`);
  }
  return data.category;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await fetchGraphQLData(GET_TAG_BY_SLUG, { slug });
  if (!data?.tag) {
    throw new NotFoundError(`Tag with slug "${slug}" not found.`);
  }
  return data.tag;
}

export async function getAllPosts(limit: number = 100): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS, { limit });
  if (!data?.posts?.nodes) {
    throw new NotFoundError(`No posts were found.`);
  }
  return data.posts.nodes;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchGraphQLData(GET_ALL_CATEGORIES);
  if (!data?.categories?.nodes) {
    throw new NotFoundError(`No categories were found.`);
  }
  return data.categories.nodes;
}

export async function getAllTags(): Promise<Tag[]> {
  const data = await fetchGraphQLData(GET_ALL_TAGS);
  if (!data?.tags?.nodes) {
    throw new NotFoundError(`No tags were found.`);
  }
  return data.tags.nodes;
}

export async function getAllPostsByCategory(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS_BY_CATEGORY, { slug });
  if (!data?.category?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" category.`);
  }
  return data.category.posts.nodes;
}

export async function getAllPostsByTag(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS_BY_TAG, { slug });
  if (!data?.tag?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" tag.`);
  }
  return data.tag.posts.nodes;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const data = await fetchGraphQLData(GET_PAGE_BY_SLUG, { slug });
  if (!data?.pages?.nodes) {
    throw new NotFoundError(`Page with slug "${slug}" not found.`);
  }
  return data.pages.nodes[0];
}

export async function getAllPages(): Promise<Page[]> {
  const data = await fetchGraphQLData(GET_ALL_PAGES);
  if (!data?.pages?.nodes) {
    throw new NotFoundError(`No Pages were found.`);
  }
  return data.pages.nodes;
}
