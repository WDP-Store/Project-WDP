import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSignUp = async (e) => {
    e.preventDefault();
    const isValid = handleValidate(formData);
    if (isValid) {
      axios.post("http://localhost:9999/auth/register", formData)
      .then(response => {
        navigate("/login");
      })
      .catch(err => {
        toast.error("Email has been registered !");
      });
    };
      
    }



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
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
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
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    className="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-danger">
                    {errors.name}
                  </Form.Text>
                </Form.Group>
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
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <Button type="submit" className="button border-0">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
