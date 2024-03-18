import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={blog?.image} className="img-fluid w-100" alt="blog" style={{ maxHeight: "100%", objectFit: 'contain' }} />
      </div>
      <div className="blog-content" >
        <h5 className="title">{blog?.title}</h5>
        <p
          className="desc"
          style={{
            maxHeight: 80,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
          }}
          dangerouslySetInnerHTML={{ __html: blog?.body }}
        >
        </p>
        <Link to={`/blogs/${blog?._id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
