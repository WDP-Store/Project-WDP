import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import cross from "../images/cross.svg";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const user = JSON.parse(localStorage.getItem("data")) || { _id: "65c6e0400a9390c33d67b2c1" };

  const fetchData = () => {
    axios
      .get(`https://wdp.bachgiaphat.vn/wishlists?user=${user?._id}`)
      .then((res) => res.data.docs)
      .then((data) => {
        setWishList(data);
      });
  };

  useEffect(
    () => {
      fetchData();
    }, []
  );

  const deleteWishList = (wishlistId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://wdp.bachgiaphat.vn/wishlists/${wishlistId}`)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your item has been deleted.',
              'success'
            );
            // setWishList(wishlist.filter(w => w.id != wishlistId));
            fetchData();
          }).catch((e) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: `Failed to remove from wishlist ${e}`,
            });
          });
      }
    });
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {
            wishlist && wishlist.length > 0 && wishlist.map((p, index) =>
              <div key={wishlist[index]?._id} className="col-3">
                <div className="wishlist-card d-flex flex-column justify-content-between position-relative p-2 mb-3" style={{ background: "white", height: "400px" }}>
                  <button onClick={() => deleteWishList(wishlist[index]?._id)} type="button" style={{ border: 0, right: "5%" }} className="btn position-absolute">
                    <img
                      src={cross}
                      alt="cross"
                      className="cross img-fluid"
                    />
                  </button>
                  <div className="wishlist-card-image">
                    <Link to={"/product/" + wishlist[index]?.product?._id}>
                      <img
                        src={wishlist[index].product.images[0]}
                        className="img-fluid w-100 p-5"
                        alt="product"
                      />
                    </Link>
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                      {wishlist[index].product.name}
                    </h5>
                    <h6 className="price">$ {wishlist[index].product.price}</h6>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
