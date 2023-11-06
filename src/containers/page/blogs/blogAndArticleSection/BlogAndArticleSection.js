import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urlFor from 'utilities/sanityImageBuilder';
import TopBlogsCard from './topBlogsCard/TopBlogsCard';
import './BlogAndArticleSection.scss';

const BlogAndArticleSection = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    const filteredData = data.filter(item => item.featured);
    setPosts(filteredData);
  };
  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);
  return (
    posts.length > 0 && (
      <div className="wrap-blogs-top flex">
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to={`/blog/${posts[0].slug.current}`}
          className="main"
        >
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
BlogAndArticleSection.propTypes = {
  data: PropTypes.array.isRequired
};

export default BlogAndArticleSection;
