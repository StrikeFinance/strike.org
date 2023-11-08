import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import urlFor from 'utilities/sanityImageBuilder';
// import AuthorImage from 'assets/img/blogs/author.png';
// import FavouriteSVG from 'assets/img/blogs/svgs/icons8.svg';
// import ShareSVG from 'assets/img/blogs/svgs/icons8_right.svg';
// import GlassesSVG from 'assets/img/blogs/svgs/icons8_glasses.svg';
import { fetchPostDetail, fetchAllPosts } from 'utilities/fetchSanityPosts';
import WrapLayout from 'containers/Layout/WrapLayout/WrapLayout';
import BlogAndArticleSection from '../blogs/blogAndArticleSection/BlogAndArticleSection';
import './BlogDetails.scss';

const BlogDetails = props => {
  const { match } = props;
  const [postData, setPostData] = useState(null);
  const [allPostsData, setAllPostsData] = useState(null);
  const fetchData = async () => {
    try {
      const data = await fetchPostDetail(match.params.id);
      const allPosts = await fetchAllPosts();
      setPostData(data);
      setAllPostsData(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [match]);
  return (
    postData && (
      <>
        <Helmet>
          <title>{postData?.metaTitle || ''}</title>
          <meta name="robots" content="all" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="apple-mobile-web-app-title" content="mph" />
          <meta name="application-name" content="mph" />
          <meta
            name="thumbnail"
            content={urlFor(postData?.featureImage).url() || ''}
          />
          <meta name="title" content={postData?.metaTitle || ''} />
          <meta name="description" content={postData?.description || ''} />
          <meta
            name="keywords"
            content={postData?.keywords || ''}
            data-shuvi-head="true"
          />

          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mph.com/" />
          <meta property="og:site_name" content="mph" />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:title" content={postData?.metaTitle} />
          <meta property="og:description" content={postData?.description} />
          <meta
            property="og:image"
            content={urlFor(postData?.featureImage).url() || ''}
          />
          <meta name="twitter:title" content={postData?.metaTitle} />
          <meta
            property="twitter:description"
            content={postData?.description}
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:image"
            content={urlFor(postData?.featureImage).url() || ''}
          />
        </Helmet>
        <WrapLayout>
          <div className="wrap-blogs-container">
            <div className="blog-details">
              <div className="top">
                {/* <div className="flex align-center">
                <img alt="author" src={AuthorImage} className="author" />
                <div className="line" />
                <span className="author-name">Mathew</span>
              </div> */}
                <div className="blog-image-container">
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
                  <div className="image-wrapper">
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
                <div className="header">
                  <p className="head">{postData.title}</p>
                </div>
                <BlockContent
                  className="content"
                  blocks={postData.content}
                  projectId="m2neccov"
                  dataset="production"
                />
              </div>
            </div>
            <p className="bread-crumb">News & Article</p>
            <BlogAndArticleSection data={allPostsData} />
          </div>
        </WrapLayout>
      </>
    )
  );
};

BlogDetails.propTypes = {
  match: PropTypes.object.isRequired
};

export default BlogDetails;
