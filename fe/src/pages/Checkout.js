import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useState, useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")) || { _id: "65c6e0400a9390c33d67b2c1", name: "abc", phone: "098" });
  const [order, setOrder] = useState([]);
  const { Formik } = formik;

  const schema = yup.object().shape({
    fullName: yup.string().required(),
    detailAddress: yup.string().required(),
    city: yup.string().required(),
    zipcode: yup.string().required(),
    paymentMethod: yup.mixed().oneOf(["COD", "VNPAY"]).required(),
    phone: yup.number().required().typeError('Phone must contain only numbers')
  });

  useEffect( //handle event when quantity or cart is updated
    () => {
      var temp = 0;
      products.map((p, index) =>
        temp += Number(p.price) * cart[index].quantity
      )
      setSubTotal(temp.toFixed(2)); //update subtotal each time cart changes
    }, [cart, products])

  useEffect(() => {
    Promise.all(  //wait for all of the fetch requests to complete before updating the state with the fetched data.
      cart.map((c) => {
        return axios
          .get(`http://localhost:9999/products/${c.product}`)
          .then((res) => res.data)
          .then(json => {
            json.index = c.id;  // index of products will match cart id
            return json;
          });
      })
    ).then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/users/${user._id}`)
      .then((res) => setUser(res.data))
  }, [])

  useEffect(() => {
    setOrder({ //preset the order information based on user's information
      user: user._id,
      name: user.name ?? '',
      phone: user.phone ?? '',
      address: {
        country: 'US',
        state: user.address?.state ?? '',
        city: user.address?.city ?? '',
        detailAddress: user.address?.detailAddress ?? '',
        zipcode: user.address?.zipcode ?? ''
      },
      productList:
        products.map((p, index) => ({
          productId: p._id,
          productName: p.name,
          category: p.category.name,
          brand: p.brand.name,
          quantity: Number(cart[index].quantity),
          color: cart[index].color,
          unitPrice: Number(p.price),
          originalPrice: Number(p.originalPrice)
        })),
      totalAmount: Number(subTotal),
      date: new Date(),
      status: "65c9987222000fd0245fe3e4"
    })
  }, [user, products, subTotal])

  const checkOut = (values) => { //change the order preset by value that inputed from form
    var temp = {
      ...order,
      name: values.fullName,
      phone: values.phone,
      paymentMethod: values.paymentMethod,
      address: {
        ...order.address,
        detailAddress: values.detailAddress,
        city: values.city,
        state: values.state,
        zipcode: values.zipcode
      }
    }
    console.log("temp")
    console.log(temp)

    if (temp.paymentMethod === "VNPAY") {
      axios
        .post(`http://localhost:9999/orders/create-payment-url`, temp)
        .then((res1) => {
          const urlParams = new URLSearchParams(res1.data.url);
          const vnpOrderInfo = urlParams.get('vnp_OrderInfo');

          axios
            .post(`http://localhost:9999/orders`, {
              ...temp,
              orderVnpayId: vnpOrderInfo
            })
            .then((res2) => {
              window.location.replace(res1.data.url);
            })
            .catch(() => toast.error("Something went wrong!"))
        })
        .catch((e) => {
          toast.error("Something went wrong!")
        });
    } else {
      axios
        .post(`http://localhost:9999/orders`, temp)
        .then(() => {
          localStorage.removeItem('cart')
          toast.success("Order created!")
          navigate('/myOrder')
        })
        .catch(() => toast.error("Something went wrong!"));
    }
  }

  useEffect(() => {
    console.log(order)
  }, [order])

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">SDN Store</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="mb-3">Shipping Address</h4>

              <Formik
                validationSchema={schema}
                onSubmit={
                  (values) => {
                    checkOut(values)
                  }
                }
                enableReinitialize={true}
                initialValues={{
                  fullName: user.name,
                  detailAddress: user.address?.detailAddress,
                  city: user.address?.city,
                  state: "Alabama",
                  zipcode: user.address?.zipcode,
                  paymentMethod: "",
                  phone: user.phone,
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form className="row" noValidate onSubmit={handleSubmit}>
                    <div className="col-12">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          Country
                        </InputGroup.Text>
                        <select className="form-control form-select">
                          <option value="US">
                            US
                          </option>
                        </select>
                      </InputGroup>
                    </div>
                    <div className="col-6">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          Full name
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          className="form-control"
                          required
                          value={values.fullName}
                          onChange={handleChange}
                          isValid={touched.fullName && !errors.fullName}
                          isInvalid={!!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </div>
                    <div className="col-6">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          Phone
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          className="form-control"
                          value={values.phone}
                          required
                          onChange={handleChange}
                          isValid={touched.phone && !errors.phone}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </div>
                    <div className="col-12">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          Address
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="detailAddress"
                          placeholder="Detail Address"
                          className="form-control"
                          value={values.detailAddress}
                          required
                          onChange={handleChange}
                          isValid={touched.detailAddress && !errors.detailAddress}
                          isInvalid={!!errors.detailAddress}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.detailAddress}
                        </Form.Control.Feedback>
                      </InputGroup>

                    </div>
                    <div className="col-6">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          City
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="City"
                          className="form-control"
                          value={values.city}
                          required
                          onChange={handleChange}
                          isValid={touched.city && !errors.city}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </InputGroup>

                    </div>
                    <div className="col-6">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          State
                        </InputGroup.Text>
                        <select onChange={handleChange} name="state" className="form-control form-select">
                          {states.map(s => order.address?.state == s ? (<option selected key={s} value={s}>{s}</option>) : (<option key={s} value={s}>{s}</option>))}
                        </select>
                      </InputGroup>
                    </div>
                    <div className="flex-grow-1">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          Zipcode
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="zipcode"
                          placeholder="Zipcode"
                          className="form-control"
                          value={values.zipcode}
                          required
                          onChange={handleChange}
                          isValid={touched.zipcode && !errors.zipcode}
                          isInvalid={!!errors.zipcode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.zipcode}
                        </Form.Control.Feedback>
                      </InputGroup>

                    </div>
                    <div className="flex-grow-1">
                      <InputGroup className="mb-3">
                        <Form.Check
                          id='paymentMethodCOD'
                          name="paymentMethod"
                          type='radio'
                          label="COD"
                          value="COD"
                          checked={values.paymentMethod === "COD"}
                          onChange={handleChange}
                          isInvalid={!!errors.paymentMethod && touched.paymentMethod}
                        />
                        <Form.Check
                          id='paymentMethodVnpay'
                          name="paymentMethod"
                          type='radio'
                          className="mx-3"
                          label="Vnpay"
                          value="VNPAY"
                          checked={values.paymentMethod === "VNPAY"}
                          onChange={handleChange}
                          isInvalid={!!errors.paymentMethod && touched.paymentMethod}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.paymentMethod}
                        </Form.Control.Feedback>
                      </InputGroup>

                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/cart" className="text-dark">
                          <BiArrowBack className="me-2" />
                          Return to Cart
                        </Link>
                        <button type="submit" className="button" style={{ border: 0 }}>
                          Checkout
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

            </div>
          </div>
          <div className="col-5">
            {
              products.map((p, index) =>
                <div key={index} className="product border-bottom py-4">
                  <div className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <img className="img-fluid" src={(p.color.map((i, idx) => (i === cart[index].color ? p.images[idx] : ''))).filter((pt) => pt !== '')} alt="product" />
                      </div>
                      <div>
                        <h5 className="total-price">{p.name}</h5>
                        <p className="total-price">{cart[index].color} x {cart[index].quantity}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">$ {(p.price * cart[index].quantity).toFixed(2)}</h5>
                    </div>
                  </div>
                </div>
              )
            }

            {/* <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ 10000</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 10000</p>
              </div>
            </div> */}
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {subTotal}</h5>
            </div>
          </div>
        </div>
      </Container >
    </>
  );
};

export default Checkout;
