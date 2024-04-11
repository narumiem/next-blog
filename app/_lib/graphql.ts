import { gql } from '@apollo/client';

// ---------------------
// Post-related queries
// ---------------------

// Fragment for post's featured image
const postFeaturedImageFragment = gql`
  fragment PostFeaturedImage on Post {
    featuredImage {
      node {
        id
        mediaItemUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }
`;

// Fragment for post's categories
const postCategoriesFragment = gql`
  fragment PostCategories on Post {
    categories(where: { orderby: COUNT, order: ASC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Fragment for post's tags
const postTagsFragment = gql`
  fragment PostTags on Post {
    tags(where: { orderby: COUNT, order: ASC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Combined post fragment incorporating featured image, categories, and tags
const postFragment = gql`
  fragment Post on Post {
    id
    slug
    title
    dateGmt
    modifiedGmt
    content
    ...PostFeaturedImage
    ...PostCategories
    ...PostTags
  }
  ${postFeaturedImageFragment}
  ${postCategoriesFragment}
  ${postTagsFragment}
`;

// Query to get a post by its slug
export const GET_POST_BY_SLUG = gql`
  query getPostBySlug($slug: ID = "") {
    post(id: $slug, idType: SLUG) {
      ...Post
    }
  }
  ${postFragment}
`;

// Query to get a category by its slug
export const GET_CATEGORY_BY_SLUG = gql`
  query getCategoryBySlug($slug: ID = "uncategorized") {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
    }
  }
`;

// Query to get a tag by its slug
export const GET_TAG_BY_SLUG = gql`
  query getTagBySlug($slug: ID = "") {
    tag(id: $slug, idType: SLUG) {
      id
      name
      slug
    }
  }
`;
// Query to get all posts, with a limit parameter
export const GET_ALL_POSTS = gql`
  query getAllPosts($limit: Int = 1000) {
    posts(first: $limit, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...Post
      }
    }
  }
  ${postFragment}
`;

// Query to get all categories
export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    categories(where: { orderby: COUNT, order: ASC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Query to get all tags
export const GET_ALL_TAGS = gql`
  query getAllTags {
    tags(where: { orderby: COUNT, order: ASC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Query to get all posts by a specific category slug
export const GET_ALL_POSTS_BY_CATEGORY = gql`
  query getAllPostsByCategory($slug: ID = "") {
    category(id: $slug, idType: SLUG) {
      id
      posts(where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ...Post
        }
      }
    }
  }
  ${postFragment}
`;

// Query to get all posts tagged with a specific tag slug
export const GET_ALL_POSTS_BY_TAG = gql`
  query getAllPostsByTag($slug: ID = "") {
    tag(id: $slug, idType: SLUG) {
      id
      posts(where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ...Post
        }
      }
    }
  }
  ${postFragment}
`;

// --------------------
// Page-related queries
// --------------------

// Fragment for page's featured image
const pageFeaturedImageFragment = gql`
  fragment PageFeaturedImage on Page {
    featuredImage {
      node {
        id
        mediaItemUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }
`;

// Query to get a page by its slug
export const GET_PAGE_BY_SLUG = gql`
  query getPageBySlug($slug: String = "") {
    pages(where: { name: $slug }) {
      nodes {
        id
        slug
        uri
        title
        dateGmt
        modifiedGmt
        content
        ...PageFeaturedImage
      }
    }
  }
  ${pageFeaturedImageFragment}
`;

// Query to get all pages
export const GET_ALL_PAGES = gql`
  query getAllPages {
    pages(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        menuOrder
        slug
        uri
        title
        dateGmt
        modifiedGmt
        content
        ...PageFeaturedImage
      }
    }
  }
  ${pageFeaturedImageFragment}
`;