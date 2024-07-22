import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
import { BsFire } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="row justify-content-between service_wrapper w-100">
          <div className="col-12 mb-5" style={{marginBottom: "0.3rem"}}>
            <h3 className="text-center">
              <span>
                <strong style={{fontSize: "40px"}}>
                  <b>Why shop</b> with us ?
                </strong>
              </span>
            </h3>
          </div>
          <div className="col-2 identify justify-content-center align-items-center text-center">
            <img
              className="img-fluid"
              src="https://media3.scdn.vn/img4/2020/12_16/gJwXr6FFZKZCGKWaz4RB.png"
              alt=""
            />
            <div className="description">
              <h5 style={{ textAlign: "center" }}>Cashback Reward Program</h5>
              <span>
                Whatever you need, there are 26 categories and 10 million
                products
              </span>
            </div>
          </div>
          <div className="col-2 identify justify-content-center align-items-center text-center">
            <img
              src="https://media3.scdn.vn/img4/2020/12_16/EfZWQVfV6nQzu2vMmnwC.png"
              alt=""
            />
            <div className="description">
              <h5 style={{ textAlign: "center" }}>Weekly Flash Sale</h5>
              <span>
                Whatever you need, there are 26 categories and 10 million
                products
              </span>
            </div>
          </div>
          <div className="col-2 identify justify-content-center align-items-center text-center">
            <img
              src="https://media3.scdn.vn/img4/2020/12_16/j5C6IQz7gIXPgjFJxmRz.png"
              alt=""
            />
            <div className="description">
              <h5 style={{ textAlign: "center" }}>Anual Payment Discount</h5>
              <span>
                Whatever you need, there are 26 categories and 10 million
                products
              </span>
            </div>
          </div>
          <div className="col-2 identify justify-content-center align-items-center text-center">
            <img
              src="https://media3.scdn.vn/img4/2020/12_16/7AJFQGQ5qvS7gGOz8P7a.png"
              alt=""
            />
            <div className="description">
              <h5 style={{ textAlign: "center" }}>Cashback Reward Program</h5>
              <span>
                Whatever you need, there are 26 categories and 10 million
                products
              </span>
            </div>
          </div>
        </div>
        
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-lg-4">
              <h4 className="text-black mb-4">Contact Us</h4>
              <div>
                <address className="text-black fs-6">
                  Hno : Hoa Lac, <br /> Ha Noi <br />
                  PinCode: 131103
                </address>
                <a
                  href="tel:+84 363840808"
                  className="mt-3 d-block mb-1 text-black text-decoration-none"
                >
                  +84 363840808
                </a>
                <a
                  href="mailto:minhdev@gmail.com"
                  className="mt-2 d-block mb-0 text-black text-decoration-none"
                >
                  wdpstore@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-black" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-black" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-black" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-black" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <h4 className="text-black mb-4">Information</h4>
              <div className="footer-link d-flex flex-column ">
                <Link to="/privacy-policy" className="text-black py-2 mb-1 text-decoration-none">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-black py-2 mb-1 text-decoration-none">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-black py-2 mb-1 text-decoration-none">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-black py-2 mb-1 text-decoration-none">
                  Terms & Conditions
                </Link>
                <Link className="text-black py-2 mb-1 text-decoration-none">Blogs</Link>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <h4 className="text-black mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-black py-2 mb-1 text-decoration-none">About Us</Link>
                <Link className="text-black py-2 mb-1 text-decoration-none">Faq</Link>
                <Link className="text-black py-2 mb-1 text-decoration-none">Contact</Link>
              </div>
            </div>
            <div className="col-12 col-lg-2">
              <h4 className="text-black mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-black py-2 mb-1 text-decoration-none">Laptops</Link>
                <Link className="text-black py-2 mb-1 text-decoration-none">Headphones</Link>
                <Link className="text-black py-2 mb-1 text-decoration-none">Tablets</Link>
                <Link className="text-black py-2 mb-1 text-decoration-none">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4 footer_src">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} Copyright: Made with{" "}
                <BsFire style={{ marginBottom: 0 }} size="20px" /> by group 5
                WDP301 from FPT University
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
