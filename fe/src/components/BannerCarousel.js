import Carousel from "react-bootstrap/Carousel";

const BannerCarousel = () => {
  return (
    <Carousel data-bs-theme="dark" interval={1500}>
      <Carousel.Item style={{ height: "20rem" }}>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/flat-world-book-day-social-media-promo-template_23-2149319200.jpg?w=1380&t=st=1710864828~exp=1710865428~hmac=f982356dac17f647561a4e3eef810a2d5d196b903d647c29773b01a7d599474b/https://cdn.tgdd.vn/2024/03/banner/y36-720-220-720x220.png"
          alt="First slide"
          style={{ objectFit: "cover", height: "100%", borderRadius: "10px" }}
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: "20rem" }}>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/flat-world-book-day-social-media-promo-template_23-2149319200.jpg?w=1380&t=st=1710864828~exp=1710865428~hmac=f982356dac17f647561a4e3eef810a2d5d196b903d647c29773b01a7d599474bhttps://cdn.tgdd.vn/2024/02/banner/reno11-720-220-720x220-2.png"
          alt="Second slide"
          style={{ objectFit: "cover", height: "100%", borderRadius: "10px" }}
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: "20rem" }}>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/flat-world-book-day-sale-horizontal-banner_23-2149308923.jpg?size=626&ext=jpg&ga=GA1.1.2097809941.1710864730&semt=ais"
          alt="Third slide"
          style={{ objectFit: "cover", height: "100%", borderRadius: "10px" }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
