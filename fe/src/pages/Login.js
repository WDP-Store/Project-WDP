import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { hashCode } from "../util/hashPassword";
import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = handleValidate(formData);
    if (isValid) {
      axios
        .post("https://wdp.bachgiaphat.vn/auth/login", formData)
        .then((response) => {
          localStorage.setItem("data", JSON.stringify(response.data));
          const userTest = localStorage.getItem("data");
          toast.success("Login successfully !");
          navigate("/");
        })
        .catch((err) => {
          toast.error("Wrong email or password !");
        });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // properties need same id
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    //clear error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleValidate = (formData) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    const passwordRegex = /^[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Invalid password format, password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-danger">
                    {errors.email}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                </Form.Group>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
