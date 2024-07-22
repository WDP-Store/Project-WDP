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

import "./home.css";
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoYoutube,
} from "react-icons/bi";

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


  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="content_home home">
      <div className="top_banner">
        <div className="contant">
          <h3>silver aluminum</h3>
          <h2>Apple Watch</h2>
          <p>30% off at your first odder</p>
          <Link to="/product" className="link">
            Shop Now
          </Link>
        </div>
      </div>
      {/* <div class1="home-wrapper-1 py-5" className="container block-item">
        <BannerCarousel />
      </div> */}
      <div class1="home-wrapper-1 py-5" className="container block-item">
        <div className="row"></div>
      </div>
      <div class1="home-wrapper-2 py-5" className="container block-item">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between"></div>
          </div>
        </div>
      </div>
      <div
        class1="featured-wrapper py-5 home-wrapper-2"
        className="container block-item block-product-wrapper"
      >
        <h3 className="section-heading pt-3">Featured Collection</h3>
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

     

      <div
        class1="blog-wrapper py-5 home-wrapper-2"
        className="container block-item  mb-3 block-product-wrapper"
      >
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading pt-3">Our Latest Blogs</h3>
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
      <div className="banners">
        <div className="container">
          <div className="left_box">
            <div className="box_v2">
              <img src="image/Multi-Banner-1.avif" alt="banner"></img>
            </div>
            <div className="box_v2">
              <img src="image/Multi-Banner-2.avif" alt="banner"></img>
            </div>
          </div>
          <div className="right_box">
            <div className="top">
              <img src="image/Multi-Banner-3.webp" alt=""></img>
              <img src="image/Multi-Banner-4.avif" alt=""></img>
            </div>
            <div className="bottom">
              <img src="image/Multi-Banner-5.webp" alt=""></img>
            </div>
          </div>
        </div>
      </div>
      <div className="product_type">
          <div className="container">
            <div className="box_v2">
              <div className="header">
                <h2>New Product</h2>
              </div>
              {shuffleArray(products).map((curElm) => {
                return (
                  <>
                    <div className="productbox">
                      <div className="img-box">
                        <img src={curElm.images[0]} alt=""></img>
                      </div>
                      <div className="detail">
                        <Link to={`/product/${curElm._id}`} className="text-decoration-none" style={{color: "#8a8a8a"}}>{curElm.name}</Link>
                        <p>$ {curElm.price}</p>
                        <div className="icon">
                          <button>
                            {/* <AiFillEye /> */}
                          </button>
                          <button>
                            {/* <AiFillHeart /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="box_v2">
              <div className="header">
                <h2>Featured Product</h2>
              </div>
              {shuffleArray(products).map((curElm) => {
                return (
                  <>
                    <div className="productbox">
                      <div className="img-box">
                        <img src={curElm.images[0]} alt=""></img>
                      </div>
                      <div className="detail">
                        <Link to={`/product/${curElm._id}`} className="text-decoration-none" style={{color: "#8a8a8a"}}>{curElm.name}</Link>

                        <p>$ {curElm.price}</p>
                        <div className="icon">
                          <button>
                            {/* <AiFillEye /> */}
                          </button>
                          <button>
                            {/* <AiFillHeart /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="box_v2">
              <div className="header">
                <h2>Top Product</h2>
              </div>
              {shuffleArray(products).map((curElm) => {
                return (
                  <>
                    <div className="productbox">
                      <div className="img-box">
                        <img src={curElm.images[0]} alt=""></img>
                      </div>
                      <div className="detail">
                      <Link to={`/product/${curElm._id}`} className="text-decoration-none" style={{color: "#8a8a8a"}}>{curElm.name}</Link>

                       
                        <p>$ {curElm.price}</p>
                        <div className="icon">
                          <button>
                            {/* <AiFillEye /> */}
                          </button>
                          <button>
                            {/* <AiFillHeart /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;
