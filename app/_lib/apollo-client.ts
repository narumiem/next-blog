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

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
if (!endpoint) {
  console.error(
    'Environment variable for WordPress GraphQL endpoint (WORDPRESS_GRAPHQL_ENDPOINT) is not set.'
  );
}

// Setup HTTP link for Apollo Client
const httpLink = new HttpLink({
  uri: endpoint,
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Generic function to fetch data from GraphQL API
async function fetchGraphQLData(
  query: DocumentNode,
  variables: Record<string, string | number> = {}
) {
  try {
    const { data } = await client.query({
      query,
      variables,
      // fetchPolicy: 'no-cache', // Optionally disable cache
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

// Custom error for not found resources
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Define interfaces for common data structures
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
    node: Eyecatch;
  };
}

// Function to fetch a single post by its slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await fetchGraphQLData(GET_POST_BY_SLUG, { slug });
  if (!data?.post) {
    throw new NotFoundError(`Post with slug "${slug}" not found.`);
  }
  return data.post;
}

// Function to fetch a single category by its slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchGraphQLData(GET_CATEGORY_BY_SLUG, { slug });
  if (!data?.category) {
    throw new NotFoundError(`Category with slug "${slug}" not found.`);
  }
  return data.category;
}

// Function to fetch a single tag by its slug
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await fetchGraphQLData(GET_TAG_BY_SLUG, { slug });
  if (!data?.tag) {
    throw new NotFoundError(`Tag with slug "${slug}" not found.`);
  }
  return data.tag;
}

// Function to fetch all posts with optional limit
export async function getAllPosts(limit: number = 1000): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS, { limit });
  if (!data?.posts?.nodes) {
    throw new NotFoundError(`No posts were found.`);
  }
  return data.posts.nodes;
}

// Function to fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchGraphQLData(GET_ALL_CATEGORIES);
  if (!data?.categories?.nodes) {
    throw new NotFoundError(`No categories were found.`);
  }
  return data.categories.nodes;
}

// Function to fetch all tags
export async function getAllTags(): Promise<Tag[]> {
  const data = await fetchGraphQLData(GET_ALL_TAGS);
  if (!data?.tags?.nodes) {
    throw new NotFoundError(`No tags were found.`);
  }
  return data.tags.nodes;
}

// Function to fetch all posts associated with a category
export async function getAllPostsByCategory(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS_BY_CATEGORY, { slug });
  if (!data?.category?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" category.`);
  }
  return data.category.posts.nodes;
}

// Function to fetch all posts associated with a tag
export async function getAllPostsByTag(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS_BY_TAG, { slug });
  if (!data?.tag?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" tag.`);
  }
  return data.tag.posts.nodes;
}

// Function to fetch a single page by its slug
export async function getPageBySlug(slug: string): Promise<Page> {
  const data = await fetchGraphQLData(GET_PAGE_BY_SLUG, { slug });
  if (!data?.pages?.nodes) {
    throw new NotFoundError(`Page with slug "${slug}" not found.`);
  }
  return data.pages.nodes[0];
}

// Function to fetch all pages
export async function getAllPages(): Promise<Page[]> {
  const data = await fetchGraphQLData(GET_ALL_PAGES);
  if (!data?.pages?.nodes) {
    throw new NotFoundError(`No Pages were found.`);
  }
  return data.pages.nodes;
}
