import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuthentication } from "../util/use-authentication";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Input } from "antd";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const { currentUser } = useAuthentication();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  useEffect(() => {
    axios
      .get(`http://wdp.bachgiaphat.vn/users/${id}`, {
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
      .patch(`http://wdp.bachgiaphat.vn/users/${id}`, editedData)
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
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="profile-container">
          <h1 className="text-center">User Profile</h1>
          <Row style={{ padding: "10px" }}>
            <Col xs={3}>
              <Image
                src={
                  userData.image ||
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC0AKoDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAQFAQIDBgf/xAA+EAACAQIBBgoGCAcAAAAAAAAAAQIDEQQFEiEiMUFCUVJhcXKBkaHREzJzgrHBFSM0YpLS4fAUJENTY6Ky/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APrYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADaSbbSS2tuyXayNPHYOF16TOa3QTl47PECSCF9J4Xk1vwx/MbRyjhJOzlOPXi7f63Alg1hUp1FnQnGS44tPvNgAAAAAAAAAAAAAAAAAAAETFY2nQvCKU6u9cGPW8jGNxXoIKEH9bNaHyI8ry/d6a97t3u9LvvYHSrWrVpXqTcuJcFdCWg5gAAABtGU4SUoScZLfF2ZY4bKF2oYi3Eqi0L3kVgA9KtwKrAYpxcaFR6r0U2+C+T0FqAAAAAAAAAAAAAADEpRhGc5O0Yxcm+ZK5kiZRnm4aS/uTjDs9Z/ACoq1JVqk6kts230LcjQAAAAAAAAAAX2Erenowk3rrUn1lv7ShLDJk7TrU90oqa6Yuz+IFqAAAAAAAAAAAAAFdlR6mHX35vwRYkDKcb0acuTUt2STAqjAAGQYAAAAZMAAZJeTn/Mx54Tv3XIZNybFvESlujSlfpk0l8wLgAAAAAAAAAAAAAOWIpemo1ae+UdXrLSjqAPNadj2rQwT8oYbMm60FqTevbgy4+0gAAAAAAAAAC3ybScKMqjWmrK66kdC+bK7D0JYiqoK+arOpJcGPm936F8kopRikkkkktiS0WAyAAAAAAAAAAAAAAADEoxnFxkk4yTTT2NFPisFOi3OF5UuPbKHNIuQB5oF1WwGHqtyivRye1w2PpjsIc8m4mPqShNdOa/HzAggkvA45f0W+iUPM2jk7GS2qEOtL8twIh1oYetiJWgtVPWm/Vj+vMWNLJlKLTrTdR8lase22nxJ0YxhFRjGMYrQlFWS6EgOdChToQUILnk3tk+NnUAAAAAAAAAAAAAAAGJShCMpSajGKu23ZIxOcYRlObSjFXbfEUmJxNTES3qnF6kL+L5wJdbKW2NCPHrzXwj5kOWLxc3d1qnuvNXdGxwAE2llHEQspqNRaNuiXevIlRynh2taFSL5s2S+PyKgAXP0lhP8AJ+D9TSWU6C9SnUk/vZsV8WVIAnVMpYmV1BQprc0s6Xe9HgcI4rFxd1WqN34Tzl3PQcABZUcpvQq8VblwXxiWMJwqRUoSUovY0zzh2oYirh5Z0HdP14vZJAX4NKVWFaEakHdPat6fEzcAAAAAAAAAAaVaipUqlR8CLl0vcgKzKOIcpqhF6sNM7b58XZ+9hAMtyk5Sk7yk3Jvjb0swAAAAAAAAAAAAAAScHiHQqq7+rm0p83FIvDzRd4Ct6WhFN61N5j6NzAlAAAAAAAAEHKdTNo06a21J3fVjp8icVGU5XrwjuhTXfJt+QEEAAAAABkAYAAAGTAAAACbk6pmV3DdUi17y0r5kI6UZ5lWjPkzi+y+kD0IAAAAAAABR453xVbmcI90UXhQYrTicR7Wfg7AcQAAAAAAAAAAAAAAAAAB6Om86nTlyoRfekzY44X7NhvZQXcrHYAAAAAAFDiEv4jEe1qf9MADlZCyAAWQsgAFkLIABZCyAAWQsgAFkM1AAM1DNQAF7hfs2H9mjsAAAAH//2Q=="
                }
                style={{ width: "180px", height: "180px" }}
                rounded
              />
            </Col>
            <Col xs={6}>
              {!isEditing ? (
                <>
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {userData.role}
                  </p>
                  <Button variant="warning" onClick={handleEdit}>
                    Edit
                  </Button>
                  |
                  <Link to={`/changePassword/${userData._id}`} className="btn btn-warning">
                    Change Password
                  </Link>
                </>
              ) : (
                <>
                  <label>
                    <strong>Name:</strong>
                    <Input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    <strong>Email:</strong>
                    <Input
                      type="text"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <br />
                  <Button variant="warning" onClick={handleSave}>
                    Save
                  </Button>
                  |
                  <Button variant="warning" onClick={handleCancel}>
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
