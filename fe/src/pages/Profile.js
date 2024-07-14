import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuthentication } from "../util/use-authentication";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Button, Col, Container, Image, Row, Form} from "react-bootstrap";
import { Input } from "antd";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const { currentUser } = useAuthentication();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  useEffect(() => {
    axios
      .get(`https://wdp.bachgiaphat.vn/users/${id}`, {
        headers: { Authorization: `Bearer ${currentUser.accessToken}` },
      })
      .then((response) => {
        setUserData(response.data);
        setEditedData({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .patch(`https://wdp.bachgiaphat.vn/users/${id}`, editedData)
      .then((response) => {
        setUserData(response.data.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  return (
    <>
    <Meta title={"Profile"} />
    <BreadCrumb title="Profile" />
    <Container className="profile-wrapper py-5 home-wrapper-2">
      <div className="profile-container">
        <h1 className="text-center">User Profile</h1>
        <Row className="profile-row">
          <Col xs={12} md={4} className="text-center">
            <Image
              src={
                userData.image ||
                "https://via.placeholder.com/180"
              }
              className="profile-image"
              roundedCircle
            />
          </Col>
          <Col xs={12} md={8}>
            {!isEditing ? (
              <>
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <Button variant="primary" onClick={handleEdit} className="me-3">
                  Edit
                </Button>
                <Link to={`/changePassword/${userData._id}`} className="btn btn-warning">
                  Change Password
                </Link>
              </>
            ) : (
              <>
                <Form.Group controlId="formName">
                  <Form.Label><strong>Name:</strong></Form.Label>
                  <Input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={handleSave} className="me-3">
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  </>
  );
};

export default Profile;
