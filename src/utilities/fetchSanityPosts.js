import groq from 'groq';
import client from './client';

const fetchAllPosts = async () => {
  const posts = await client.fetch(
    groq`
    *[
      _type == "post"
      ]|order(date desc){
      title,
      description,
    publishedAt,
    featureImage,
    "imageUrl": mainImage.asset -> url,
    featured,
    _createdAt,
    slug
      }
    `
  );
  return posts;
};

const fetchPostDetail = async (slug = '') => {
  const posts = await client.fetch(
    groq`
  *[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
  return posts;
};

export { fetchAllPosts, fetchPostDetail };
