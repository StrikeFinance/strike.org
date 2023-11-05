import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urlFor from 'utilities/sanityImageBuilder';
import { fetchAllPosts } from 'utilities/fetchSanityPosts';
import TopBlogsCard from './topBlogsCard/TopBlogsCard';
import './BlogAndArticleSection.scss';

const BlogAndArticleSection = () => {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    try {
      const data = await fetchAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    posts.length > 0 && (
      <div className="wrap-blogs-top flex">
        <Link to={`/blog/${posts[0].slug.current}`} className="main">
          <div>
            <img
              className="sanity-image"
              alt="placeholder blog"
              src={urlFor(posts[0].featureImage).url()}
            />
          </div>
          <p className="blog-date main-margin">
            {moment(posts[0].publishedAt).format('ll')}
          </p>
          <Typography className="blog-titlt-main">{posts[0].title}</Typography>
          <p className="main-description">{posts[0].description}</p>
        </Link>
        <div className="col-2 flex flex-column">
          {posts.slice(1, posts.length).map((item, idx) => {
            return <TopBlogsCard key={idx} item={item} />;
          })}
        </div>
      </div>
    )
  );
};

export default BlogAndArticleSection;
