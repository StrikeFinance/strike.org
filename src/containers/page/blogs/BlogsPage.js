import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from 'utilities/fetchSanityPosts';
import { useWindowResizeMobile } from 'utilities/hook';
import Vector from 'assets/img/blogs/Vector.svg';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BlogAndArticleSection from './blogAndArticleSection/BlogAndArticleSection';
import NewBlogCard from './newBlogCard/NewBlogCard';
import './BlogsPage.scss';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isMobile] = useWindowResizeMobile(768);
  const [current, setCurrent] = useState(1);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);

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

  const onChangePage = value => {
    setCurrent(value);
    setCurrentPagePosts([...posts.slice((value - 1) * 4, value * 4)]);
  };

  useEffect(() => {
    setCurrentPagePosts([...posts.slice(0, 4)]);
  }, [posts]);

  return (
    <WrapLayout>
      <div className="wrap-blogs-container">
        <p className="bread-crumb">
          <FormattedMessage id="News_Article" />
        </p>
        <h1 className="heading-descriptions">
          <FormattedMessage id="Blog_Article" />
        </h1>
        {posts.length > 0 && <BlogAndArticleSection data={posts} />}
        <div className="new-blogs">
          <Typography className="heading-descriptions">
            <FormattedMessage id="New_Blogs" />
          </Typography>
          <div className="flex align-center just-center flex-column">
            {posts.length > 0 && (
              <div>
                <div className="new-blogs-grid">
                  {currentPagePosts.map((item, idx) => {
                    return (
                      <Link
                        className="blogs-card-single"
                        key={idx}
                        to={`/blog/${item.slug.current}`}
                      >
                        <NewBlogCard data={item} />
                      </Link>
                    );
                  })}
                </div>
                <div className="pagination flex just-center mt-2">
                  <Pagination
                    onChange={onChangePage}
                    total={posts.length}
                    pageSize={4}
                    current={current}
                    size={isMobile ? 'small' : 'default'}
                  />
                </div>
              </div>
            )}
            <a
              target="__blank"
              className="pointer"
              href="https://docs.strike.org/"
            >
              <button
                type="button"
                className="flex pointer align-center just-cente"
              >
                <span>
                  <FormattedMessage id="Learn_More" />
                </span>
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
