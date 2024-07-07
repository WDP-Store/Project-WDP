import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import whiteWish from "../images/wish.svg";
import pinkWish from "../images/pink-wishlist.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthentication } from "../util/use-authentication";
import { toast, ToastContainer } from "react-toastify";

const ProductItem = (props) => {
  const { isLogged } = useAuthentication();
  const { product, brand } = props;
  const [wish, setWish] = useState({});
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    if (isLogged) {
      axios
        .get(
          `https://wdp.bachgiaphat.vn/wishlists?product=${product?._id}&user=${
            JSON.parse(localStorage.getItem("data"))?._id
          }`
        )
        .then((res) => res.data.docs[0])
        .then((data) => {
          if (data) setIsWish(true);
          setWish(data);
        });
    }
  }, [isWish]);

  const addToWishList = () => {
    // if (JSON.parse(localStorage.getItem("data"))) { //if user is logged in
    if (!isLogged) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please login to add item to wishlist",
      });

      return;
    }

    if (wish?.product?._id === product?._id) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "You have already added this item to wishlist",
      });
    } else {
      axios
        .post(`https://wdp.bachgiaphat.vn/wishlists`, {
          // user: JSON.parse(localStorage.getItem("data"))._id,
          user: JSON.parse(localStorage.getItem("data"))._id,
          product: product._id,
        })
        .then(() => {
          setIsWish(true);
          toast.success("Added item to wishlist!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            style: {
              backgroundColor: "#F5F7F8", // Green background
              color: "#FF4191", // White text color
              fontSize: "16px", // Font size
              borderRadius: "8px", // Rounded corners
            },
            progressStyle: {
              backgroundColor: "#FF4191",
            },
          });
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: `Failed to add wishlist ${e}`,
          });
        });
    }
    // } else { //not logged in
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Not logged in',
    //     text: 'Log in to save this product along with your account',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     cancelButtonText: "Cancel",
    //     confirmButtonText: 'Login'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location = "/login";
    //     }
    //   })
    // }
  };

  const removeFromWishList = () => {
    if (!isLogged) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please login to remove item from wishlist",
      });

      return;
    }
    console.log("wish delete");
    console.log(wish);
    // if (JSON.parse(localStorage.getItem("data"))) { //if user is logged in
    axios
      .delete(`https://wdp.bachgiaphat.vn/wishlists/${wish._id}`, {
        // user: JSON.parse(localStorage.getItem("data"))._id,
        user: JSON.parse(localStorage.getItem("data"))._id,
        product: product._id,
      })
      .then(() => {
        setIsWish(false);
        toast.success("Removed item to wishlist!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          style: {
            backgroundColor: "#F5F7F8", // Green background
            color: "#FF4191", // White text color
            fontSize: "16px", // Font size
            borderRadius: "8px", // Rounded corners
          },
          progressStyle: {
            backgroundColor: "#FF4191",
          },
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: `Failed to remove from wishlist ${e}`,
        });
      });
    // } else { //not logged in
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Not logged in',
    //     text: 'Log in to remove this product from wishlist',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     cancelButtonText: "Cancel",
    //     confirmButtonText: 'Login'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location = "/login";
    //     }
    //   })
    // }
  };

  return (
    <>
      <div
        className="product-card position-relative mb-4"
        style={{
          // backgroundColor: "#f9f9f9", // Light background color for the card
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          textAlign: "center", // Center-align text within the card
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div
          className="wishlist-icon position-absolute"
          style={{ top: "0", right: "0", margin: "8px", zIndex: "1" }}
        >
          {isWish ? (
            <button
              className="border-0 bg-transparent"
              onClick={removeFromWishList}
            >
              <img
                src={pinkWish}
                style={{ width: "18px", height: "18px" }}
                alt="wishlist"
              />
            </button>
          ) : (
            <button className="border-0 bg-transparent" onClick={addToWishList}>
              <img
                src={whiteWish}
                style={{ width: "18px", height: "18px" }}
                alt="wishlist"
              />
            </button>
          )}
        </div>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <div
            className="product-image-wrapper"
            style={{
              height: "250px",
              overflow: "hidden",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center-align image within the wrapper
            }}
          >
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "87%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            )}
          </div>
          <div
            className="product-details p-3"
            style={{
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center-align content within product details
            }}
          >
            <h6 className="brand text-uppercase text-secondary">{brand}</h6>
            <h5 className="product-title text-dark">{product.name}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <p className="price text-primary">${product.price}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;
