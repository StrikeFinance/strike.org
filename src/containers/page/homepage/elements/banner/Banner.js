import React from 'react';
import './Banner.scss';
import BannerImg from 'assets/img/homepage/banner-full.png';
import MouseImg from 'assets/img/homepage/mouse.svg';
import ArrowDownImg from 'assets/img/homepage/arrow-down.svg';
import rectangleOpacityImg from 'assets/img/homepage/rectangle-opacity-1.png';
import BannerBlurImg from 'assets/img/homepage/banner-blur.png';
import ArrowDownFill from 'assets/img/homepage/arrow-down-fill.svg';

const Banner = () => {
  return (
    <div className="banner-homepage">
      <div className="banner-content flex just-between">
        <div className="description">
          <div>The Strike protocol currently has</div>
          <div>
            <span className="text-highlight">$18,456,998</span>
            <span> </span>
            <span>TVL across</span>
          </div>
          <div>
            <span className="text-highlight">10</span>
            <span>sToken markets</span>
          </div>
          <div className="arrow-down-fill">
            <img src={ArrowDownFill} alt="arrow-down-fill" />
          </div>
          <div className="image-opacity">
            <img src={rectangleOpacityImg} alt="" />
          </div>
        </div>
        <div className="image-banner">
          <img src={BannerImg} alt="banner" />
        </div>
        <div className="image-banner-blur">
          <img src={BannerBlurImg} alt="banner-blur" />
        </div>
      </div>
      <div className="scroll-image">
        <div className="flex just-center">
          <img src={MouseImg} alt="" />
        </div>
        <div className="flex just-center mt-1">
          <img src={ArrowDownImg} alt="arrow-down" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
