import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img_one from "../img/blogImage.jpg";
import img_three from "../img/blogImage1.jpg";

function Banner(): React.ReactElement {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img src={img_one} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={img_three} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
