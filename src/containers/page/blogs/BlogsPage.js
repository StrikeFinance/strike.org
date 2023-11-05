import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from 'utilities/fetchSanityPosts';
import Vector from 'assets/img/blogs/Vector.svg';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BlogAndArticleSection from './blogAndArticleSection/BlogAndArticleSection';
import NewBlogCard from './newBlogCard/NewBlogCard';
import './BlogsPage.scss';

const BlogPage = () => {
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
    <WrapLayout>
      <div className="wrap-blogs-container">
        <p className="bread-crumb">News & Article</p>
        <Typography className="heading-descriptions">
          Blog & Article{' '}
        </Typography>
        {posts.length > 0 && <BlogAndArticleSection posts={posts} />}
        <div className="new-blogs">
          <Typography className="heading-descriptions">New Blogs </Typography>
          <div className="flex align-center just-center flex-column">
            <div className="new-blogs-grid">
              {posts.length > 0 &&
                posts.map((item, idx) => {
                  return (
                    <Link key={idx} to={`/blog/${item.slug.current}`}>
                      <NewBlogCard data={item} />
                    </Link>
                  );
                })}
            </div>
            <a
              target="__blank"
              className="pointer"
              href="https://docs.strike.org/"
            >
              <button
                type="button"
                className="flex pointer align-center just-cente"
              >
                <span>Learn More</span>
                <img alt="vector" src={Vector} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </WrapLayout>
  );
};

export default BlogPage;
