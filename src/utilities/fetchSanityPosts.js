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
    groq`*[
      _type == "post" && references(*[_type == "postCategory" && slug.current == "${id}"]._id)
    ]|order(date desc){
      title,
      subtitle,
      "imageUrl": mainImage.asset -> url,
      "slug": "blog/"+slug.current,
      "textPreview":pt::text(text[0..1]),
      category->{
        title,
        "slug": slug.current
      },
      date,
      "readingTime": round(length(pt::text(text)) / 5 / 180 )
    }`
  );
  return posts;
};

export { fetchAllPosts, fetchPostDetail };
