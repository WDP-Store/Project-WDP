import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Container, Form, Button } from "react-bootstrap";
import * as bcrypt from "bcryptjs";
import { useAuthentication } from "../util/use-authentication";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const { currentUser } = useAuthentication();

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  //   useEffect(() => {
  //     axios
  //       .get(`https://wdp.bachgiaphat.vn/users/${id}`, {
  //         headers: { Authorization: `Bearer ${currentUser.accessToken}` },
  //       })
  //       .then((response) => {
  //           console.log(response.data);
  //         setUser(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   console.log(user)

  // }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log(form);
    const currentPassword = form.elements["current_password"].value;
    const newPassword = form.elements["new_password"].value;
    const confirmPassword = form.elements["confirm_password"].value;

    const passwordRegex = /^[A-Za-z\d@$!%*?&]{6,}$/;

    if (
      !passwordRegex.test(newPassword) ||
      !passwordRegex.test(confirmPassword) ||
      !passwordRegex.test(currentPassword)
    ) {
      event.preventDefault(); // Prevent form submission
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        event.preventDefault(); // Prevent form submission
        toast.error("new password not match confirm password");
        return;
      }

      axios
        .patch(`https://wdp.bachgiaphat.vn/users/change-password/${id}`, {
          currentPassword,
          newPassword,
          confirmPassword,
        })
        .then((response) => {
          toast.success("Change password successfully, again login system");

          localStorage.removeItem("data");
          localStorage.removeItem("cart"); //remove cart
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred while processing your request");
          }
        });
    }
  };

  return (
    <>
      <Meta title={"Change password"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Change Password</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="current_password">
                  <Form.Label>Old password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    name="currentPassword"
                    // value={currentPassword}
                    required
                  />
                  <Form.Text className="text-danger">
                    {/* {errors.name} */}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="new_password">
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
                    // value={newPassword}
                    required
                  />
                  <Form.Text className="text-danger">
                    {/* {errors.email} */}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirm_password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    // value={confirmPassword}
                    required
                  />
                  <Form.Text className="text-danger">
                    {/* {errors.password} */}
                  </Form.Text>
                </Form.Group>
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <Button type="submit" className="button border-0">
                    Save
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

export default ChangePassword;
