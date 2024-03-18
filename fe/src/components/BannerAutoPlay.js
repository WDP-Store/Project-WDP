import React from "react";

const BannerAutoPlay = () => {
  const sliderStyle = {
    background:
      "url(https://new-ella-demo.myshopify.com/cdn/shop/files/bg-top-bar-promotion-home-7_2048x.jpg?v=1668153641)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 10px 20px -5px rgba(0, 0, 0, .125)",
    height: "30px",
    margin: "auto",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  };

  const whiteGradientMixin = {
    background:
      "linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)",
  };

  const slideTrackStyle = {
    animation: "scrollRightToLeft 10s linear infinite",
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
  };

  const slideStyle = {
    height: "50%",
    width: "10000px",
  };

  return (
    <div className="slider" style={sliderStyle}>
      <div className="slide-track" style={slideTrackStyle}>
        {[...Array(3)].map((_, index) => (
          <div className="slide" style={slideStyle} key={index}>
            <p style={{ display: 'inline-flex', alignItems: 'center', width: "100%"}}>
              <span>Sale up to 50%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAutoPlay;
