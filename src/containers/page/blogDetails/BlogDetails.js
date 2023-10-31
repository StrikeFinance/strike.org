import React from 'react';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BlogAndArticleSection from '../blogs/blogAndArticleSection/BlogAndArticleSection';
import './BlogDetails.scss';

const BlogDetails = () => {
  return (
    <WrapLayout>
      <div className="wrap-blogs-container">
        {' '}
        TBD
        <p className="bread-crumb">News & Article</p>
        <BlogAndArticleSection />
      </div>
    </WrapLayout>
  );
};

export default BlogDetails;
