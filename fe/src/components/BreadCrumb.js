import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div
      className="breadcrumb mb-0 py-3"
      style={{
        backgroundColor: "#F1E5D1",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0" style={{ margin: 0 }}>
              <Link
                to="/"
                className="text-dark"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                }}
              >
                Home
              </Link>
              &nbsp;&gt;&nbsp;
              <span
                style={{
                  fontWeight: "bold",
                  color: "#6c757d",
                }}
              >
                {title}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
