import Carousel from "react-bootstrap/Carousel";
const BannerCarousel = () => {
  return (
    <Carousel data-bs-theme="dark" interval={1500}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/03/banner/y36-720-220-720x220.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/02/banner/reno11-720-220-720x220-2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/02/banner/iPhone-15-Pro-Max-720-220-720x220-4.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
