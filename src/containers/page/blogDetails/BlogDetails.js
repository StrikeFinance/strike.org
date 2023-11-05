import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import moment from 'moment';
import client from 'utilities/client';
import urlFor from 'utilities/sanityImageBuilder';
// import AuthorImage from 'assets/img/blogs/author.png';
// import FavouriteSVG from 'assets/img/blogs/svgs/icons8.svg';
// import ShareSVG from 'assets/img/blogs/svgs/icons8_right.svg';
// import GlassesSVG from 'assets/img/blogs/svgs/icons8_glasses.svg';
import { fetchPostDetail } from 'utilities/fetchSanityPosts';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BlogAndArticleSection from '../blogs/blogAndArticleSection/BlogAndArticleSection';
import './BlogDetails.scss';

const BlogDetails = props => {
  const { match } = props;
  const [postData, setPostData] = useState(null);
  const fetchData = async () => {
    try {
      const data = await fetchPostDetail(match.params.id);
      setPostData(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [match]);
  return (
    <WrapLayout>
      {postData && (
        <div className="wrap-blogs-container">
          <div className="blog-details">
            <div className="top">
              {/* <div className="flex align-center">
                <img alt="author" src={AuthorImage} className="author" />
                <div className="line" />
                <span className="author-name">Mathew</span>
              </div> */}
              <div className="blog-image-container flex align-center just-center">
                {/* <div className="first-column flex flex-column">
                  <button type="button">
                    <img alt="favourite" src={FavouriteSVG} />
                  </button>
                  <button type="button">
                    <img alt="favourite" src={ShareSVG} />
                  </button>
                  <button type="button">
                    <img alt="favourite" src={GlassesSVG} />
                  </button>
                </div> */}
                <div>
                  <img
                    className="sanity-image"
                    alt="placeholder blog"
                    src={urlFor(postData.featureImage).url()}
                  />
                </div>
                <div className="date">
                  <div className="day">
                    {moment.utc(postData.publishedAt).date()}
                  </div>
                  <div className="month flex flex-column align-center just-center">
                    {moment.utc(postData.publishedAt).month() + 1}
                  </div>
                  <div className="year">
                    {' '}
                    {moment.utc(postData.publishedAt).year()}
                  </div>
                </div>
              </div>
            </div>
            <div className="content-blocks">
              <BlockContent
                className="content"
                blocks={postData.content}
                projectId={client.projectId}
                dataset={client.dataset}
              />
            </div>
          </div>
          <p className="bread-crumb">News & Article</p>
          <BlogAndArticleSection />
        </div>
      )}
    </WrapLayout>
  );
};

BlogDetails.propTypes = {
  match: PropTypes.object.isRequired
};

export default BlogDetails;
