import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PlaceHolderImage from 'assets/img/blogs/t-blog-2.png';
import './TopBlogsCard.scss';

const TopBlogsCard = ({ item }) => {
  return (
    <Link
      to={`/blog-detail/${item.slug.current}`}
      className="flex align-center"
    >
      <img alt="blog placeholder" src={PlaceHolderImage} />
      <div className="detail">
        <p className="blog-date">{moment(item.publishedAt).format('ll')}</p>
        <p className="description">{item.title}</p>
      </div>
    </Link>
  );
};

TopBlogsCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default TopBlogsCard;
