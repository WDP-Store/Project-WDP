import React, { useState, useEffect } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../admin/admin.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const { color } = products;
  const { detail } = products;
  const { images } = products;

  useEffect(() => {
    axios(`https://wdp.bachgiaphat.vn/products/${id}`)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => toast.error(err));
  }, [id]);

  useEffect(() => {
    axios(`https://wdp.bachgiaphat.vn/feedbacks?product=${id}`)
      .then((res) => {
        setFeedbacks(res.data?.docs);
      })
      .catch((err) => toast.error(err));
  }, []);

  useEffect(() => {
    axios(`https://wdp.bachgiaphat.vn/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => toast.error(err));
  }, []);

  useEffect(() => {
    setMainImage(images ? images[0] : "not chosen");
    if (document.getElementById("btnradio0"))
      document.getElementById("btnradio0").setAttribute("checked", true);
  }, [images]);

  return (
    <>
      <Container
        class1="main-product-wrapper py-5 home-wrapper-2 mt-2"
        style={{ marginBottom: "15px" }}
      >
        <div className="row">
          <div className="col-12 my-3" style={{ textAlign: "right" }}>
            <Button className="btn-primary mx-2">
              <Link className="text-white" to={"/admin/product/edit/" + id}>
                Edit
              </Link>
            </Button>
            <Button className="btn-danger">
              <Link className="text-white" to={"/admin/product"}>
                Back to list
              </Link>
            </Button>
          </div>
          <div className="col-7 row">
            <div className="d-flex flex-column col-2">
              {images &&
                images.length > 0 &&
                images.map((img) => (
                  <div key={img} className="mb-2">
                    <button className="btn" onClick={() => setMainImage(img)}>
                      <img src={img} alt="product" style={{ width: "95%" }} />
                    </button>
                  </div>
                ))}
            </div>
            <div className="mb-5 col-10">
              {images && images.length > 0 && (
                <img src={mainImage} alt="product" style={{ width: "95%" }} />
              )}
            </div>

            <h3>Product detailed description</h3>
            <div className="py-4 px-2" style={{ background: "white" }}>
              <div
                className="table editor-table"
                dangerouslySetInnerHTML={{ __html: products.describe }}
              />
            </div>
          </div>
          <div className="col-5">
            <div className="main-product-details">
              <div className="border-bottom">
                <h2 className="title">{products.name}</h2>
                <Row className="mb-3">
                  <Col xs={12}>
                    Status:{" "}
                    {products.status === true ? (
                      <Badge bg="primary"> Active </Badge>
                    ) : (
                      <Badge bg="warning"> Inactive </Badge>
                    )}
                    <span style={{ marginLeft: "10px" }}>Featured: </span>
                    {products.featured === true ? (
                      <Badge bg="primary"> Yes</Badge>
                    ) : (
                      <Badge bg="warning"> No</Badge>
                    )}
                  </Col>
                </Row>
              </div>
              <div className="border-bottom py-3">
                <p className="price">Price: $ {products.price}</p>
                <p className="price">
                  Original Price: $ {products.originalPrice}
                </p>
                {/* <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( {feedbacks.length} Reviews )</p>
                </div> */}
              </div>
              <div className=" py-3">
                <h3 className="product-heading pb-2">Color :</h3>
                <div
                  className="btn-group2"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  {color &&
                    color.length > 0 &&
                    color.map((cl, index) => (
                      <div key={cl} style={{ marginRight: "8px" }}>
                        <input
                          onChange={(e) => {
                            setMainImage(images[e.target.value]);
                          }}
                          value={index}
                          type="radio"
                          className="btn-check"
                          name="btnradio-color"
                          id={"btnradio" + index}
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor={"btnradio" + index}
                        >
                          {cl}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="row pt-3">
              <div className="col-12">
                <h4>Product configuration</h4>
                <div className="bg-white p-3">
                  <div className="bg-white p-3">
                    <div
                      className="table editor-table"
                      dangerouslySetInnerHTML={{ __html: products.detail }}
                    />
                  </div>
                </div>
              </div>
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
    </>
  );
};

export default ProductDetail;
