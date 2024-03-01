import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import axios from "axios";
import { toast } from "react-toastify";
import Paginate from "../admin/components/Paginate";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterBy, setFilterBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category_f, setCategory_f] = useState([]);

  const handleFilterValue = (attr) => {
    if (attr === "category") {
      let box = document.getElementsByName("cate-Filter-Box");
      let temp = [];
      for (let i = 0; i < box.length; i++) {
        if (box[i].checked == true) {
          temp = [...temp, box[i].value];
        }
      }
      setCategory_f(temp);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilter = (page) => {
    var url = `http://localhost:9999/blogs?page=${page}`;

    if (category_f.length != 0) {
      category_f?.map((b) => (url += "&category=" + b));
    }

    console.log(category_f)
    axios(url)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setBlogs(res.data.docs);
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    handleFilter(currentPage);
  }, [currentPage, category_f]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/categories")
      .then((res) => res.data)
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories.map((c) => (
                    <div key={c._id}>
                      <input
                        onChange={() => handleFilterValue("category")}
                        name="cate-Filter-Box"
                        type="checkbox"
                        className="btn-check"
                        id={"btncheck" + c._id}
                        autoComplete="off"
                        value={c._id}
                      />
                      <label
                        style={{ width: "150px" }}
                        className="btn btn-outline-primary"
                        htmlFor={"btncheck" + c._id}
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {isLoading ? (
                <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                blogs.map((blog) =>
                  (
                    <div key={blog._id} className="col-6 mb-3">
                      <BlogCard blog={blog} />
                    </div>
                  )
                )
              )}
            </div>

            <div className="pagination mb-3 justify-content-end">
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
