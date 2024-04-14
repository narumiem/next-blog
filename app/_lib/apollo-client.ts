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

/**
 * The GraphQL endpoint for WordPress.
 * Make sure to set the environment variable WORDPRESS_GRAPHQL_ENDPOINT.
 */
const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
if (!endpoint) {
  console.error(
    'Environment variable for WordPress GraphQL endpoint (WORDPRESS_GRAPHQL_ENDPOINT) is not set.'
  );
}

const httpLink = new HttpLink({
  uri: endpoint,
});

/**
 * The Apollo client instance.
 */
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

/**
 * Fetches data from GraphQL using the Apollo client.
 * @param query The GraphQL query document.
 * @param variables The variables to be passed to the query.
 * @returns The data returned by the GraphQL query.
 * @throws Error if the GraphQL fetch fails.
 */
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

/**
 * Custom error class for not found errors.
 */
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * Interface for the eyecatch object.
 */
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

/**
 * Interface for the category object.
 */
export interface Category {
  id: string;
  slug: string;
  name: string;
}

/**
 * Interface for the tag object.
 */
export interface Tag {
  id: string;
  slug: string;
  name: string;
}

/**
 * Interface for the post object.
 */
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

/**
 * Interface for the page object.
 */
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

/**
 * Retrieves a post by its slug.
 * @param slug The slug of the post.
 * @returns The post object if found, otherwise null.
 * @throws NotFoundError if the post is not found.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await fetchGraphQLData(GET_POST_BY_SLUG, { slug });
  if (!data?.post) {
    throw new NotFoundError(`Post with slug "${slug}" not found.`);
  }
  return data.post;
}

/**
 * Retrieves a category by its slug.
 * @param slug The slug of the category.
 * @returns The category object if found, otherwise null.
 * @throws NotFoundError if the category is not found.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchGraphQLData(GET_CATEGORY_BY_SLUG, { slug });
  if (!data?.category) {
    throw new NotFoundError(`Category with slug "${slug}" not found.`);
  }
  return data.category;
}

/**
 * Retrieves a tag by its slug.
 * @param slug The slug of the tag.
 * @returns The tag object if found, otherwise null.
 * @throws NotFoundError if the tag is not found.
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await fetchGraphQLData(GET_TAG_BY_SLUG, { slug });
  if (!data?.tag) {
    throw new NotFoundError(`Tag with slug "${slug}" not found.`);
  }
  return data.tag;
}

/**
 * Retrieves all posts.
 * @param limit The maximum number of posts to retrieve.
 * @returns An array of post objects.
 * @throws NotFoundError if no posts are found.
 */
export async function getAllPosts(limit: number = 1000): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS, { limit });
  if (!data?.posts?.nodes) {
    throw new NotFoundError(`No posts were found.`);
  }
  return data.posts.nodes;
}

/**
 * Retrieves all categories.
 * @returns An array of category objects.
 * @throws NotFoundError if no categories are found.
 */
export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchGraphQLData(GET_ALL_CATEGORIES);
  if (!data?.categories?.nodes) {
    throw new NotFoundError(`No categories were found.`);
  }
  return data.categories.nodes;
}

/**
 * Retrieves all tags.
 * @returns An array of tag objects.
 * @throws NotFoundError if no tags are found.
 */
export async function getAllTags(): Promise<Tag[]> {
  const data = await fetchGraphQLData(GET_ALL_TAGS);
  if (!data?.tags?.nodes) {
    throw new NotFoundError(`No tags were found.`);
  }
  return data.tags.nodes;
}

/**
 * Retrieves all posts by category.
 * @param slug The slug of the category.
 * @returns An array of post objects.
 * @throws NotFoundError if no posts are found in the category.
 */
export async function getAllPostsByCategory(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS_BY_CATEGORY, { slug });
  if (!data?.category?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" category.`);
  }
  return data.category.posts.nodes;
}

/**
 * Retrieves all posts by tag.
 * @param slug The slug of the tag.
 * @returns An array of post objects.
 * @throws NotFoundError if no posts are found with the tag.
 */
export async function getAllPostsByTag(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALL_POSTS_BY_TAG, { slug });
  if (!data?.tag?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" tag.`);
  }
  return data.tag.posts.nodes;
}

/**
 * Retrieves a page by its slug.
 * @param slug The slug of the page.
 * @returns The page object.
 * @throws NotFoundError if the page is not found.
 */
export async function getPageBySlug(slug: string): Promise<Page> {
  const data = await fetchGraphQLData(GET_PAGE_BY_SLUG, { slug });
  if (!data?.pages?.nodes) {
    throw new NotFoundError(`Page with slug "${slug}" not found.`);
  }
  return data.pages.nodes[0];
}

/**
 * Retrieves all pages.
 * @returns An array of page objects.
 * @throws NotFoundError if no pages are found.
 */
export async function getAllPages(): Promise<Page[]> {
  const data = await fetchGraphQLData(GET_ALL_PAGES);
  if (!data?.pages?.nodes) {
    throw new NotFoundError(`No Pages were found.`);
  }
  return data.pages.nodes;
}
