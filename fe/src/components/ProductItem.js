import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import whiteWish from "../images/wish.svg";
import pinkWish from "../images/pink-wishlist.png";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// import prodcompare from "../images/prodcompare.svg";
// import addcart from "../images/add-cart.svg";
// import view from "../images/view.svg";
const ProductItem = (props) => {
  const { product, brand } = props;
  const [wish, setWish] = useState({});
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    axios
      .get(`https://app.vinamall.vn/wishlists?product=${product?._id}&user=${JSON.parse(localStorage.getItem("data"))?._id}`)
      .then((res) => res.data.docs[0])
      .then((data) => {
        if (data) setIsWish(true)
        setWish(data);
      });
  }, [isWish]);

  const addToWishList = () => {
    // if (JSON.parse(localStorage.getItem("data"))) { //if user is logged in
    if (wish?.product?._id === product?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'You have already added this item to wishlist',
      })
    } else {
      axios
        .post(`https://app.vinamall.vn/wishlists`, {
          // user: JSON.parse(localStorage.getItem("data"))._id,
          user: JSON.parse(localStorage.getItem("data"))._id,
          product: product._id
        }).then(() => {
          setIsWish(true);
          Swal.fire({
            icon: 'success',
            title: 'Added',
            text: 'Added item to wishlist',
          })
        }).catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `Failed to add wishlist ${e}`,
          })
        })
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
  }

  const removeFromWishList = () => {
    console.log("wish delete")
    console.log(wish)
    // if (JSON.parse(localStorage.getItem("data"))) { //if user is logged in
    axios
      .delete(`https://app.vinamall.vn/wishlists/${wish._id}`, {
        // user: JSON.parse(localStorage.getItem("data"))._id,
        user: JSON.parse(localStorage.getItem("data"))._id,
        product: product._id
      }).then(() => {
        setIsWish(false)
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Removed item to wishlist',
        })
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `Failed to remove from wishlist ${e}`,
        })
      })
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
  }

  return (
    <>
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute" >
          {isWish ? (
            <button className="border-0 bg-transparent" onClick={() => removeFromWishList()}>
              <img src={pinkWish} style={{ width: '18px', height: '18px' }} alt="wishlist" />
            </button>
          ) : (
            <button className="border-0 bg-transparent" onClick={() => addToWishList()}>
              <img src={whiteWish} alt="wishlist" />
            </button>
          )}
        </div>
        <Link to={"/product/" + product._id}>
          <div style={{ height: "250px" }}>
            {product.images && product.images.length > 0 && (
              <img src={product.images[0]} alt="" style={{ width: "95%" }} />
            )}
          </div>
          <div class="product-card">
          <div className="product-details">
            <h6 className="brand">{brand}</h6>
            <h5 className="product-title">
              {product.name}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">${product.price}</p>
          </div>
          </div>
        </Link>

        {/* <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div> */}
      </div>
    </>
  );
};

export default ProductItem;