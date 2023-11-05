import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urlFor from 'utilities/sanityImageBuilder';
import './TopBlogsCard.scss';

const TopBlogsCard = ({ item }) => {
  return (
    <Link to={`/blog/${item.slug.current}`} className="flex align-center">
      <div className="">
        <img
          className="sanity-image"
          alt="blog placeholder"
          src={urlFor(item.featureImage).url()}
        />
      </div>
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
