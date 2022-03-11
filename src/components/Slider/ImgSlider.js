import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImgSlider = () => {
  let settings = {
    className: 'center',
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Slide>
        <Img src="/images/slide-1.jpg" />
      </Slide>
      <Slide>
        <Img src="/images/slide-2.jpg" />
      </Slide>
      <Slide>
        <Img src="/images/slide-3.jpg" />
      </Slide>
      <Slide>
        <Img src="/images/slide-4.jpg" />
      </Slide>
      <Slide>
        <Img src="/images/slide-5.jpg" />
      </Slide>
    </Carousel>
  );
};

export default ImgSlider;

const Carousel = styled(Slider)`
  margin-top: 20px;

  /* .slick-list {
    overflow: visible;
  } */

  button {
    z-index: 555;
  }

  ul li button {
    &:before {
      font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }
`;

const Slide = styled.div``;

const Img = styled.div`
  border: 8px solid transparent;
  background-image: ${({ src }) => `url(${src})`};
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 30vh;
  cursor: pointer;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.008);
  }
`;
