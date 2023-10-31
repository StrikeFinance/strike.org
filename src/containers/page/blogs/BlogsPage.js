import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import Vector from 'assets/img/blogs/Vector.svg';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BlogAndArticleSection from './blogAndArticleSection/BlogAndArticleSection';
import NewBlogCard from './newBlogCard/NewBlogCard';
import './BlogsPage.scss';

const newBlogsData = [
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  },
  {
    title: 'Consectures Content Velit officia consequat duis enim velit mollit',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit...'
  }
];

const BlogPage = () => {
  return (
    <WrapLayout>
      <div className="wrap-blogs-container">
        <p className="bread-crumb">News & Article</p>
        <Typography className="heading-descriptions">
          Blog & Article{' '}
        </Typography>
        <BlogAndArticleSection />
        <div className="new-blogs">
          <Typography className="heading-descriptions">New Blogs </Typography>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur. Molestie est risus lacinia
            luctus orci quisque sagittis.
          </p>
          <div className="flex align-center just-center flex-column">
            <div className="new-blogs-grid">
              {newBlogsData.map((item, idx) => {
                return (
                  <Link key={idx} to={`blog-detail/${idx}`}>
                    <NewBlogCard data={item} />
                  </Link>
                );
              })}
            </div>
            <button type="button" className="flex align-center just-center">
              <span>Learn More</span>
              <img alt="vector" src={Vector} />
            </button>
          </div>
        </div>
      </div>
    </WrapLayout>
  );
};

export default BlogPage;
