import React from 'react';
import { Typography } from 'antd';
import PlaceHolderBlog from 'assets/img/blogs/t-blog-1.png';
import PlaceHolderBlogGridC1 from 'assets/img/blogs/t-blog-2.png';
import TopBlogsCard from './topBlogsCard/TopBlogsCard';
import './BlogAndArticleSection.scss';

const BlogAndArticleSection = () => {
  return (
    <div className="wrap-blogs-top flex">
      <div className="main">
        <img alt="placeholder blog" src={PlaceHolderBlog} />
        <p className="blog-date main-margin">Jul 20, 2023</p>
        <Typography className="blog-titlt-main">
          Consectures Dummy Content Velit officia consequat duis enim velit
          mollit
        </Typography>
        <p className="main-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit xercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
      <div className="col-2 flex flex-column">
        <TopBlogsCard PlaceHolderBlog={PlaceHolderBlogGridC1} />
        <TopBlogsCard PlaceHolderBlog={PlaceHolderBlogGridC1} />
        <TopBlogsCard PlaceHolderBlog={PlaceHolderBlogGridC1} />
      </div>
    </div>
  );
};

export default BlogAndArticleSection;
