import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://wdp.bachgiaphat.vn/blogs/${id}`);
      const data = await response.data;
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      className="main-product-wrapper py-5 home-wrapper-2 mt-2"
      style={{ marginBottom: "15px" }}
    >
      <div className="row">
        <div className="col-12 my-3" style={{ textAlign: "right" }}>
          <Button className="btn-primary mx-2">
            <Link className="text-white" to={`/admin/blogs/edit/${id}`}>
              Edit
            </Link>
          </Button>
          <Button className="btn-danger">
            <Link className="text-white" to="/admin/blogs">
              Back to list
            </Link>
          </Button>
        </div>
        <div className="col-12 row">
          <h2 className="title">{blog.title}</h2>
          <p>{blog.body}</p>
          <div className="col-12 my-3 text-center">
            {blog.image && (
              <img
                src={blog.image}
                alt="blog"
                style={{ width: "100%", maxWidth: "500px" }}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetails;
