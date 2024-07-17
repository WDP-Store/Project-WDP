import React, { useState, useEffect, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import Swal from "sweetalert2";
import { CartContext } from '../components/CartContext';
import { toast } from "react-toastify";
import axios from "axios";

const SingleProduct = () => {
  const { cartQuantity, setCartQuantity } = useContext(CartContext);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProduct] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const { color } = products;
  const [recentColor, setRecentColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);
  const [brands, setBrands] = useState([]); //brands
  const { images } = products;
  const [wishlist, setWishList] = useState({});
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    axios(`https://wdp.bachgiaphat.vn/feedbacks?product=${id}`)
      .then((res) => {
        setFeedbacks(res.data?.docs);
      })
      .catch((err) => toast.error(err));
  }, []);

  useEffect( //fetch product data by id
    () => {
      axios.get(`https://wdp.bachgiaphat.vn/products/` + id)
        .then(res => res.data)
        .then(
          json => {
            setProducts(json);
            // axios.get(`https://wdp.bachgiaphat.vn/products?&page=1&category=${json.category._id}`)
            //   .then(res => res.data)
            //   .then(json => {
            //     console.log("json")
            //     console.log(json)
            //     setRelatedProduct(json);
            //   });
          }
        );

      axios.get(`https://wdp.bachgiaphat.vn/brands`)
        .then(res => res.data)
        .then(json => setBrands(json));
    }, [id]
  );

  //pre initial , this is for setting the default value for some color states
  useEffect(
    () => {
      setMainImage(images ? images[0] : "not chosen");
      setRecentColor(color ? color[0] : "not chosen");
      if (document.getElementById("btnradio0")) document.getElementById("btnradio0").setAttribute("checked", true);
    }, [images]
  );

  useEffect(
    () => {
      if (JSON.parse(localStorage.getItem("data"))) {
        const user = JSON.parse(localStorage.getItem("data"));
        axios
          .get(`https://wdp.bachgiaphat.vn/wishlists?user=` + user?._id)
          .then((res) => res.data)
          .then(json => {
            setWishList(json);
          });
      }
    }, []
  );

  useEffect(() => {
    axios
      .get(`https://wdp.bachgiaphat.vn/wishlists?product=${id}&user=${JSON.parse(localStorage.getItem("data"))?._id}`)
      .then((res) => res.data.docs[0])
      .then((data) => {
        setWishList(data);
      });
  }, [isWish]);

  //wish list:
  const addToWishList = () => {
    // if (JSON.parse(localStorage.getItem("data"))) { //if user is logged in
    if (wishlist?.product?._id == id) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'You have already added this item to wishlist',
      });
    } else {
      axios
        .post(`https://wdp.bachgiaphat.vn/wishlists`, {
          user: JSON.parse(localStorage.getItem("data"))?._id,
          // user: "65c6e0400a9390c33d67b2c1",
          product: id
        }).then(() => {
          setIsWish(true);
          Swal.fire({
            icon: 'success',
            title: 'Added',
            text: 'Added item to wishlist',
          });
        }).catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
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
  //local storage cart :
  const [cart, setCart] = useState([]);

  //when cart changes, update local storage cart
  useEffect(
    () => {
      if (localStorage.getItem("cart")) { //if cart exist
        var index = JSON.parse(localStorage.getItem("cart")).length;
        var localCart = [
          ...JSON.parse(localStorage.getItem("cart"))
        ];
        localCart.map((s) => s.id = index--);
        if (localCart.some(item => item.product == id && item.color == recentColor)) { //if product is duplicate
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'You have already added this item to cart',
          });
        }
        else {
          if (Object.keys(cart).length != 0) { //if cart(state) is not empty 
            localCart = [
              cart, // new item on the top
              ...localCart
            ];
            Swal.fire({
              icon: 'success',
              title: 'Added',
              text: 'Added item to cart',
            });
            setCartQuantity(cartQuantity + 1);
          }
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
      }
      else localStorage.setItem("cart", JSON.stringify(cart));
      console.log(JSON.parse(localStorage.getItem("cart")));
    }, [cart]
  );

  const addToCart = () => { //cart fearture
    // if (JSON.parse(localStorage.getItem("data"))) { //logged in
    setCart(
      // cart,
      {
        product: id,
        color: recentColor,
        quantity: quantity,
      }
    );
    // }
    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Not logged in',
    //     text: 'Log in to save this product in your cart',
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
    //localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7 row">

            <div className="d-flex flex-column col-2">
              {images && images.length > 0 && images.map((img) =>
                <div key={img} className="mb-2" >
                  <button className="btn" onClick={() => setMainImage(img)}>
                    <img src={img} alt="product" style={{ width: "95%" }} />
                  </button>
                </div>
              )}
            </div>
            <div className="mb-5 col-10">
              {images && images.length > 0 && (
                <img src={mainImage} alt="product" style={{ width: "95%" }} />
              )}
            </div>
            <Container class1="description-wrapper py-5 home-wrapper-2">
              <div className="row">
                <div className="col-12">
                  <h4>Product information</h4>
                  <div className="bg-white p-3">
                    <p>
                      <div className="table editor-table" dangerouslySetInnerHTML={{ __html: products.describe }} />
                    </p>
                  </div>
                </div>
              </div>
            </Container>

          </div>
          <div className="col-5">
            <div className="main-product-details">
              <div className="border-bottom">
                <h2 className="title">
                  {products.name}
                </h2>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {products.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
              </div>
              <div className=" py-3">
                <h3 className="product-heading pb-2">Color :</h3>
                <div className="btn-group2 flex-wrap" role="group" aria-label="Basic radio toggle button group">
                  {color && color.length > 0 && color.map((cl, index) =>
                    <div key={cl}>
                      <input onChange={(e) => { setMainImage(images[e.target.value]); setRecentColor(color[index]); }} value={index} type="radio" className="btn-check" name="btnradio-color" id={"btnradio" + index} autoComplete="off" />
                      <label className="btn btn-outline-primary" htmlFor={"btnradio" + index}>{cl}</label>
                    </div>
                  )}
                </div>

                <div className="d-flex align-items-center gap-15 flex-row mt-5 mb-5">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      min={1}
                      placeholder="1"
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center gap-30 mt-5 mb-5">
                  <button
                    className="button border-0"
                    type="button"
                    onClick={() => addToCart()}
                  >
                    Add to Cart
                  </button>
                  {/* <button className="button signup">Buy It Now</button> */}
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <button onClick={() => addToWishList()} type="button" className="button" style={{ backgroundColor: "pink", border: 0 }}> <AiOutlineHeart className="m-0" size={25} /> Add to Wishlist</button>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3">
              <h4 className="pb-3">Configuration of {products.name}</h4>
              {/* <table className="table">
                <tbody>
                  {detail && detail.length > 0 && detail.map((dtl) =>
                    <tr key={dtl} className="mb-2" >
                      {formatConfiguration(dtl)}
                    </tr>
                  )}
                </tbody>
              </table> */}
              <div className="table editor-table" dangerouslySetInnerHTML={{ __html: products.detail }} />
            </div>

          </div>
        </div>
      </Container>

      {feedbacks?.length > 0 && (
        <Container
          class1="reviews-wrapper home-wrapper-2"
          style={{ margin: "20px 0" }}
        >
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                {feedbacks.map((f) => (
                  <div key={f._id} className="reviews mt-4 review-head">
                    <div className="review">
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="mb-0">{f.user.name}</h6>
                        <ReactStars
                          count={5}
                          size={24}
                          value={f.rating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-3">{f.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      )}

      {/* <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur fugit ut excepturi quos. Id reprehenderit
                    voluptatem placeat consequatur suscipit ex. Accusamus dolore
                    quisquam deserunt voluptate, sit magni perspiciatis quas
                    iste?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {/* <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Related Products</h3>
            <div className="row">
              {
                relatedProducts.map((p) => (
                  <div className="col-3" key={p.id}>
                    <ProductItem product={p} brand={brands.map(b => b.id == p.brand ? b.name : '')}></ProductItem>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="row">

        </div>
      </Container> */}
    </>
  );
};

export default SingleProduct;
