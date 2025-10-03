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

export const paginatedPostsQuery = groq`{
  "posts": *[_type == "post"] | order(publishedAt desc)[$offset...$limit] {
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
  },
  "total": count(*[_type == "post"])
}`

export const filteredPostsQuery = groq`{
  "posts": *[_type == "post" && $conditions] | order(publishedAt desc)[$offset...$limit] {
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
  },
  "total": count(*[_type == "post" && $conditions])
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

