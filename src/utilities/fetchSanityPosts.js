import client from './client';

const fetchAllPosts = async () => {
  const posts = await client.fetch(
    `
    *[
      _type == "post"
      ]|order(date desc){
      title,
      description,
    publishedAt,
    featureImage,
    featured,
    _createdAt,
    slug
      }
    `
  );
  return posts;
};

const fetchPostDetail = async id => {
  const posts = await client.fetch(
    `
    *[
      _type == "post" && references(*[_type == "postCategory" && slug.current == "${id}"]._id)
      ]|order(date desc){
      title,
      description,
    publishedAt,
    featureImage,
    featured,
    _createdAt,
    content,
      }
    `
  );
  return posts;
};

export { fetchAllPosts, fetchPostDetail };
