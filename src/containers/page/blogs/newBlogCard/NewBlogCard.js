import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import moment from 'moment';
import urlFor from 'utilities/sanityImageBuilder';
import './NewBlogCard.scss';

const NewBlogCard = ({ data }) => {
  return (
    <div className="new-blog-card">
      <div className="sanity-image-wrapper">
        <img
          className="sanity-image"
          alt="placeholder blog"
          src={urlFor(data.featureImage).url()}
        />
      </div>
      <p className="date">
        {moment.utc(data.publishedAt).format('MMM DD,YYYY')}
      </p>
      <Typography className="title">{data.title}</Typography>
      <p className="description">{data.description}</p>
      <div className="line" />
    </div>
  );
};

NewBlogCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default NewBlogCard;
