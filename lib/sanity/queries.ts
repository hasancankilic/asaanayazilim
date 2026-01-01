import { groq } from 'next-sanity';

export const blogPostsQuery = groq`
  *[_type == "blogPost" && published == true] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url
      }
    },
    publishedAt,
    _createdAt,
    category
  }
`;

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    mainImage {
      asset-> {
        url
      }
    },
    publishedAt,
    _createdAt,
    category,
    seoTitle,
    seoDescription
  }
`;

export const projectsQuery = groq`
  *[_type == "project" && published == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset-> {
        url
      }
    },
    _createdAt
  }
`;

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    mainImage {
      asset-> {
        url
      }
    },
    _createdAt,
    seoTitle,
    seoDescription
  }
`;

export const servicesQuery = groq`
  *[_type == "service" && published == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    _createdAt
  }
`;

export const serviceQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    _createdAt,
    seoTitle,
    seoDescription
  }
`;
