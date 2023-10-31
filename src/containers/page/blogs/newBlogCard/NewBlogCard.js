import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import PlaceHolderImage from 'assets/img/blogs/t-blog-3.png';
import './NewBlogCard.scss';

const NewBlogCard = ({ data }) => {
  return (
    <div className="new-blog-card">
      <img alt="placeholder blog" src={PlaceHolderImage} />
      <p className="date">Jul 20, 2023</p>
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
