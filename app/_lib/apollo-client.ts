import {
  GET_ALLCATEGORIES,
  GET_ALLPOSTS,
  GET_ALLPOSTSBYCATEGORY,
  GET_ALLPOSTSBYTAG,
  GET_ALLSLUGS,
  GET_ALLTAGS,
  GET_CATEGORYBYSLUG,
  GET_POSTBYSLUG,
  GET_TAGBYSLUG,
} from '@/app/_lib/graphql';
import { ApolloClient, InMemoryCache, HttpLink, DocumentNode } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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
export interface Slug {
  id: string;
  slug: string;
  title: string;
}

async function fetchGraphQLData(
  query: DocumentNode,
  variables: Record<string, string | number> = {}
) {
  try {
    const { data } = await client.query({
      query,
      variables,
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await fetchGraphQLData(GET_POSTBYSLUG, { slug });
  if (!data?.post) {
    throw new NotFoundError(`Post with slug "${slug}" not found.`);
  }
  return data.post;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchGraphQLData(GET_CATEGORYBYSLUG, { slug });
  if (!data?.category) {
    throw new NotFoundError(`Category with slug "${slug}" not found.`);
  }
  return data.category;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await fetchGraphQLData(GET_TAGBYSLUG, { slug });
  if (!data?.tag) {
    throw new NotFoundError(`Tag with slug "${slug}" not found.`);
  }
  return data.tag;
}

export async function getAllPosts(limit: number = 100): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALLPOSTS, { limit });
  if (!data?.posts?.nodes) {
    throw new NotFoundError(`No posts were found.`);
  }
  return data.posts.nodes;
}

export async function getAllSlugs(): Promise<Slug[]> {
  const data = await fetchGraphQLData(GET_ALLSLUGS);
  if (!data?.posts?.nodes) {
    throw new NotFoundError(`No posts were found.`);
  }
  return data.posts.nodes;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchGraphQLData(GET_ALLCATEGORIES);
  if (!data?.categories?.nodes) {
    throw new NotFoundError(`No categories were found.`);
  }
  return data.categories.nodes;
}

export async function getAllTags(): Promise<Tag[]> {
  const data = await fetchGraphQLData(GET_ALLTAGS);
  if (!data?.tags?.nodes) {
    throw new NotFoundError(`No tags were found.`);
  }
  return data.tags.nodes;
}

export async function getAllPostsByCategory(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALLPOSTSBYCATEGORY, { slug });
  if (!data?.category?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" category.`);
  }
  return data.category.posts.nodes;
}

export async function getAllPostsByTag(slug: string): Promise<Post[]> {
  const data = await fetchGraphQLData(GET_ALLPOSTSBYTAG, { slug });
  if (!data?.tag?.posts?.nodes) {
    throw new NotFoundError(`No posts found in the "${slug}" tag.`);
  }
  return data.tag.posts.nodes;
}
