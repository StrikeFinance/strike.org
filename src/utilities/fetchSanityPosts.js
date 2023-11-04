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
  // const posts = await client.fetch(
  //   groq`*[slug.current == $slug]{
  //     title,
  //     description,
  //   publishedAt,
  //   featureImage,
  //   "imageUrl": mainImage.asset -> url,
  //   featured,
  //   _createdAt,
  //   slug,
  //   content
  //  }`,
  //   { slug }
  // );
  console.log(slug);
  const posts = await client.fetch(
    groq`*[
      _type == "post"
    ][0]`
  );
  console.log(posts);
  return posts;
};

export { fetchAllPosts, fetchPostDetail };
