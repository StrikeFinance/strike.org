import React, { useState, useEffect } from 'react';
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
      console.log(data, posts);
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
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
          </div>
          <div className="slider">
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
            <span className="slider-text">BLOGS</span>
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
                        alt={`blog ${idx}`}
                        src={urlFor(item?.featureImage).url()}
                      />
                    </div>
                    <p className="date">
                      {moment(item.publishedAt).format('ll')}
                    </p>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/blog" className="btn-whitepaper">
            <span>View All</span>
            <img src={imgUp} alt="up" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
