import { gql } from '@apollo/client';

export const GET_POSTBYSLUG = gql`
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

export const GET_CATEGORYBYSLUG = gql`
  query getCategoryBySlug($slug: ID = "uncategorized") {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
    }
  }
`;

export const GET_TAGBYSLUG = gql`
  query getTagBySlug($slug: ID = "") {
    tag(id: $slug, idType: SLUG) {
      id
      name
      slug
    }
  }
`;

export const GET_ALLPOSTS = gql`
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

export const GET_ALLSLUGS = gql`
  query getAllSlugs {
    posts(where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
      }
    }
  }
`;

export const GET_ALLCATEGORIES = gql`
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

export const GET_ALLTAGS = gql`
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

export const GET_ALLPOSTSBYCATEGORY = gql`
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

export const GET_ALLPOSTSBYTAG = gql`
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
