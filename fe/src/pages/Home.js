import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import logoBanner1 from "../images/main-banner-1.jpg";
import BannerCarousel from "../components/BannerCarousel";
//import { services } from "../utils/Data";
import ProductCarouselV1 from "./../components/ProductCarouselV1";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [last8Product, setlast8Product] = useState([]);
  const [last4Blogs, setLast4Blogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://wdp.bachgiaphat.vn/products/fe")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setProducts(data.slice(-4));
      });

    axios
      .get("https://wdp.bachgiaphat.vn/products?featured=true&status=true")
      .then((res) => res.data.docs)
      .then((data) => {
        setlast8Product(data.slice(-8));
      });

    axios
      .get("https://wdp.bachgiaphat.vn/blogs")
      .then((res) => res.data.docs)
      .then((data) => {
        setLast4Blogs(data.slice(-4));
      });
  }, []);

  return (
    <div className="content_home">
      <div
        className="adaptive_height image slide-pc"
        style={{ position: "relative", zIndex: 1 }}
      >
        <img
          srcset="//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=375 375w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=740 740w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=750 750w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=1100 1100w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=1370 1370w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=1500 1500w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=1770 1770w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=1780 1780w,//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=1880 1880w,"
          sizes="100vw"
          src="//new-ella-demo.myshopify.com/cdn/shop/files/home-19-slider-1.jpg?v=1645001949&amp;width=750"
          alt="Slider-image"
          width="1800"
          height="400"
          className="w-100 object-fit-cover"
        />
        <div className="content-over-image">
          <h2
            className="slide-heading slide-pc"
            style={{
              fontSize: "50px",
              lineHeight: "60px",
              color: "#ffffff",
              fontStyle: "normal",
              // marginBottom: "23px",
            }}
          >
            <strong style={{ color: "#10ffda" }}>Huge Saving</strong> on <br />{" "}
            UHD Televisions
          </h2>
          <p class="slide-text slide-pc">
            Sale up to 70% off on selected items*
          </p>
          <Link
            to="/product"
            className="slide-button button"
            style={{ textDecoration: "none", marginTop: "1rem" }}
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div class1="home-wrapper-1 py-5" className="container block-item">
        <BannerCarousel />
      </div>
      <div class1="home-wrapper-1 py-5" className="container block-item">
        <div className="row">
          {/* <div className="col-12">
            <div className="main-banner position-relative ">
              <img
                src={logoBanner1}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div> */}
          {/* <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              {products.map((p, index) => (
                <div key={index} className="small-banner position-relative">
                  <img
                    src={p.image}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>{index === 3 ? "Best sake" : "NEW ARRIVAL"}</h4>
                    <h5>{p.name}</h5>
                    <p>${p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <div class1="home-wrapper-2 py-5" className="container block-item">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {/* {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
      {/* <div class1="home-wrapper-2 py-5" className="container block-item">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="../images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div
        class1="featured-wrapper py-5 home-wrapper-2"
        className="container block-item block-product-wrapper"
      >
        <h3 className="section-heading">Featured Collection</h3>
        <div className="row">
          {last8Product.map((p, index) => (
            <div key={index} className="col-3" style={{ padding: "0.5rem" }}>
              <ProductItem product={p} />
            </div>
          ))}
        </div>
      </div>
      <div
        class1="featured-wrapper py-5 home-wrapper-2"
        className="container block-item block-product-wrapper"
      >
        <div className="row mb-3">
          <div className="col-12">
            <img
              className="w-100"
              src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/02/banner/Tagline-HS-1200x120.png"
              alt=""
            />
          </div>
        </div>
        {/* <h3 className="section-heading">Best Seller</h3> */}
        <div className="row">
          <ProductCarouselV1 products={last8Product.reverse()} />
        </div>
        {/* <div className="row">
          <div className="col-3">
            <Link className="vie">View</Link>
          </div>
        </div> */}
      </div>


      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container> */}

      <div
        class1="blog-wrapper py-5 home-wrapper-2"
        className="container block-item  mb-3 block-product-wrapper"
      >
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {last4Blogs.map((blog) => (
            <div key={blog._id} className="col-3" style={{ padding: "0.5rem" }}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
