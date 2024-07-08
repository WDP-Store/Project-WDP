import Carousel from "react-bootstrap/Carousel";
const BannerCarousel = () => {
  return (
    <Carousel data-bs-theme="dark" controls={false} indicators={false} interval={2000}>
      <Carousel.Item style={{ height: "20rem" }}>
        <img
          className="d-block w-100"
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/03/banner/y36-720-220-720x220.png"
          // src="https://new-ella-demo.myshopify.com/cdn/shop/files/home-19-banner-custom-4_570x.jpg?v=1645072864"
          alt="First slide"
        />
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
