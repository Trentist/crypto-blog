import { groq } from 'next-sanity'

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug
  }
}`

// Returns all posts - filtering by selected IDs happens in the page component
export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    image
  },
  "categories": categories[]->{
    title,
    slug
  }
}`

// Fetch posts by category - filtering by selected IDs happens in the page component
export const postsByCategorySlugQuery = groq`*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    image
  },
  "categories": categories[]->{
    title,
    slug
  }
}`

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  author->{
    name,
    image,
    bio
  },
  categories[]->{
    title,
    slug
  }
}`

// Admin queries - fetch ALL posts
export const adminPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug
  }
}`

export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`

export const postsByCategoryQuery = groq`*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug
  }
}`

