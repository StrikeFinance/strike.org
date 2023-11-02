import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthorImage from 'assets/img/blogs/author.png';
import FavouriteSVG from 'assets/img/blogs/svgs/icons8.svg';
import ShareSVG from 'assets/img/blogs/svgs/icons8_right.svg';
import GlassesSVG from 'assets/img/blogs/svgs/icons8_glasses.svg';
import BlogImage from 'assets/img/blogs/blog.png';
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
      console.log(postData, 'api response');
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
        {' '}
        <div className="blog-details">
          <div className="top">
            <div className="flex align-center">
              <img alt="author" src={AuthorImage} className="author" />
              <div className="line" />
              <span className="author-name">Mathew</span>
            </div>
            <div className="blog-image-container flex align-center just-center">
              <div className="first-column flex flex-column">
                <button type="button">
                  <img alt="favourite" src={FavouriteSVG} />
                </button>
                <button type="button">
                  <img alt="favourite" src={ShareSVG} />
                </button>
                <button type="button">
                  <img alt="favourite" src={GlassesSVG} />
                </button>
              </div>
              <img alt="main blog" src={BlogImage} />
              <div className="date">
                <div className="day">12</div>
                <div className="month flex flex-column align-center just-center">
                  12
                </div>
                <div className="year">2023</div>
              </div>
            </div>
          </div>
          <div className="content-blocks">
            <div className="header">
              <p className="head">Friendly User Interface</p>
              <p className="author">by Mathew</p>
            </div>
            <div className="content">
              Lorem ipsum dolor sit amet consectetur. Id donec placerat tortor
              ultrices montes sed. Lectus tellus leo donec non eu at pharetra.
              Tincidunt vitae imperdiet eros sed praesent turpis libero iaculis.
              Mus enim proin id cras nisl. Elementum gravida in vehicula risus.
              Pellentesque quisque quam donec vitae. Odio sapien a cras at
              habitant aliquam etiam etiam. Praesent pulvinar nulla proin mauris
              consectetur feugiat laoreet. Eget odio volutpat interdum donec
              est. Purus nibh nulla egestas lectus. Blandit malesuada in vitae
              pharetra integer. Id fusce quis et nulla aliquam.
              <br />
              <br />
              Netus volutpat pellentesque a dui. Leo urna pharetra molestie mi
              lacinia turpis. Convallis nisi in consectetur in tortor at sed
              nunc nunc. Ornare auctor enim tortor fermentum nunc vitae
              volutpat. Amet pellentesque elit amet neque vitae arcu faucibus.
              Duis in eget senectus interdum elementum vel.
              <br />
              <br />
              Enim tellus maecenas scelerisque ac. Tristique dui morbi malesuada
              viverra porttitor vitae nunc faucibus. Morbi dictum at enim
              blandit. Tempor proin dui nunc amet at. Diam porttitor velit
              cursus vestibulum. Ipsum sed malesuada ipsum nullam fames amet
              morbi nisl. Blandit fringilla facilisis integer interdum potenti
              magna. Ut sit id duis ac tellus. Et tellus sed amet ultrices nec
              morbi tortor commodo. Arcu dignissim pellentesque sit commodo
              lectus ac consectetur auctor scelerisque. Tellus tincidunt in
              tincidunt fringilla gravida. Tortor risus quam in condimentum.
              Nisl elementum sagittis est rutrum id parturient elementum donec.
              Ante in fringilla sit in vitae magna.
              <br />
              <br />
              Enim tellus maecenas scelerisque ac. Tristique dui morbi malesuada
              viverra porttitor vitae nunc faucibus. Morbi dictum at enim
              blandit. Tempor proin dui nunc amet at. Diam porttitor velit
              cursus vestibulum. Ipsum sed malesuada ipsum nullam fames amet
              morbi nisl. Blandit fringilla facilisis integer interdum potenti
              magna. Ut sit id duis ac tellus. Et tellus sed amet ultrices nec
              morbi tortor commodo. Arcu dignissim pellentesque sit commodo
              lectus ac consectetur auctor scelerisque. Tellus tincidunt in
              tincidunt fringilla gravida. Tortor risus quam in condimentum.
              Nisl elementum sagittis est rutrum id parturient elementum donec.
              Ante in fringilla sit in vitae magna.
            </div>
          </div>
        </div>
        <p className="bread-crumb">News & Article</p>
        <BlogAndArticleSection />
      </div>
    </WrapLayout>
  );
};

BlogDetails.propTypes = {
  match: PropTypes.object.isRequired
};

export default BlogDetails;
