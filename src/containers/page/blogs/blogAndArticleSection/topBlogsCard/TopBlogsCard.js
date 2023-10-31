import React from 'react';
import PropTypes from 'prop-types';
import './TopBlogsCard.scss';

const TopBlogsCard = ({ PlaceHolderBlog }) => {
  return (
    <div className="flex align-center">
      <img alt="blog placeholder" src={PlaceHolderBlog} />
      <div className="detail">
        <p className="blog-date">Jul 20, 2023</p>
        <p className="description">
          Consectures Content Velitpato officia consequat duis enim velit mollit
        </p>
      </div>
    </div>
  );
};

TopBlogsCard.propTypes = {
  PlaceHolderBlog: PropTypes.string.isRequired
};

export default TopBlogsCard;
