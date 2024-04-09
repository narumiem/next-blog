import { gql } from '@apollo/client';

export const GET_POST_BY_SLUG = gql`
  query getPostBySlug($slug: ID = "") {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      dateGmt
      modifiedGmt
      content
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
      categories(where: { orderby: COUNT, order: ASC }) {
        nodes {
          id
          name
          slug
        }
      }
      tags(where: { orderby: COUNT, order: ASC }) {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query getCategoryBySlug($slug: ID = "uncategorized") {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
    }
  }
`;

export const GET_TAG_BY_SLUG = gql`
  query getTagBySlug($slug: ID = "") {
    tag(id: $slug, idType: SLUG) {
      id
      name
      slug
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query getAllPosts($limit: Int) {
    posts(first: $limit, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        dateGmt
        modifiedGmt
        content
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
        categories(where: { orderby: COUNT, order: ASC }) {
          nodes {
            id
            name
            slug
          }
        }
        tags(where: { orderby: COUNT, order: ASC }) {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    categories(where: { orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query getAllTags {
    tags(where: { orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_CATEGORY = gql`
  query getAllPostsByCategory($slug: ID = "") {
    category(id: $slug, idType: SLUG) {
      id
      posts(where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          dateGmt
          modifiedGmt
          content
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
          categories(where: { orderby: COUNT, order: ASC }) {
            nodes {
              id
              name
              slug
            }
          }
          tags(where: { orderby: COUNT, order: ASC }) {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TAG = gql`
  query getAllPostsByTag($slug: ID = "") {
    tag(id: $slug, idType: SLUG) {
      id
      posts(where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          dateGmt
          modifiedGmt
          content
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
          categories(where: { orderby: COUNT, order: ASC }) {
            nodes {
              id
              name
              slug
            }
          }
          tags(where: { orderby: COUNT, order: ASC }) {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

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
    }
  }
`;

export const GET_ALL_PAGES = gql`
  query getAllPages {
    pages(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        slug
        uri
        title
        dateGmt
        modifiedGmt
        content
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
    }
  }
`;