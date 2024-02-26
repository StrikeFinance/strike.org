import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from 'utilities/fetchSanityPosts';
import imgUp from 'assets/img/up.svg';
import urlFor from 'utilities/sanityImageBuilder';
import { useWindowResizeMobile } from 'utilities/hook';
import './Blog.scss';

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [isMobile] = useWindowResizeMobile(769);
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
    <div className="blog" id="blog">
      <div className="blog-wrapper">
        <div className="slider-animation">
          <div className="slider">
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
          </div>
          <div className="slider">
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
            <span className="slider-text">
              <FormattedMessage id="BLOGS" />
            </span>
          </div>
        </div>
        <div className="blog-content">
          <div className="blog-content-grid">
            {posts.slice(0, isMobile ? 4 : 3).map((item, idx) => {
              return (
                <Link to={`/blog/${item.slug.current}`} className="linear-bg">
                  <div key={idx} className="inner-wrapper">
                    <div className="image-wrapper">
                      <img
                        className="sanity-image"
                        alt={item?.featureImage?.caption}
                        src={urlFor(item?.featureImage).url()}
                      />
                    </div>
                    <p className="date">
                      {moment.utc(item.publishedAt).format('MMM DD,YYYY')}
                    </p>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/blog" className="btn-whitepaper">
            <span>
              <FormattedMessage id="View_All" />
            </span>
            <img src={imgUp} alt="up" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
