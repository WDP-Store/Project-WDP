import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Paginate from "../components/Paginate";
import axios from "axios";

const Bloglist = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, titleSearch, categoryId]);

  useEffect(() => {
    axios
      .get("http://wdp.bachgiaphat.vn/categories")
      .then((res) => res.data)
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const fetchBlogs = async (page) => {
    let url = `http://wdp.bachgiaphat.vn/blogs/admin?page=${page}`;

    if (titleSearch) {
      url += `&title=${titleSearch}`;
    }
    if (categoryId) {
      url += `&category=${categoryId}`;
    }

    console.log("url=>", url);
    axios(url)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        const blogActive = res.data.docs.filter(b => !b.isDeleted);
        setBlogs(blogActive);
      })
      .catch((err) => toast.error(err));
  };




  useEffect(() => {
    sortBlogs();
  }, [sortKey, sortOrder]);

  const sortBlogs = () => {
    const sorted = [...blogs].sort((a, b) => {
      const valueA = getSortValue(a);
      const valueB = getSortValue(b);

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    setBlogs(sorted);
  };

  const getSortValue = (blog) => {
    switch (sortKey) {
      case "title":
        return blog.title;
      case "category":
        return getCategoryName(blog.categoryId);
      default:
        return "";
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "";
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    const [key, order] = value.split(":");
    setSortKey(key);
    setSortOrder(order);
  };

  const handleDeleteBlog = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(blogId);
      }
    });
  };

  const deleteBlog = (blogId) => {
    axios
      .patch(`http://wdp.bachgiaphat.vn/blogs/${blogId}`, { isDeleted: true }, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("data")).accessToken}`
        }
      })
      .then(() => {
        toast.success("Remove blog successfully");
        fetchBlogs(currentPage);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
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

  return (
    <Col lg={12}>
      <h3 className="mt-2 text-center">Blogs List</h3>
      <Row className="my-4">
        <Col xs={12} md={3}>
          <Form.Group className="mb-3" controlId="filter">
            <Form.Control
              type="text"
              placeholder="Search by Title"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select
            id="sort"
            value={`${sortKey}:${sortOrder}`}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="title:asc">Title (Ascending)</option>
            <option value="title:desc">Title (Descending)</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select
            aria-label="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={2} style={{ textAlign: "right" }}>
          <Link className="text-white btn btn-primary" to={"/admin/blogs/add-blog"}>
            Add New Blog
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Category</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{blog.title}</td>
              <td>{blog.category?.name}</td>
              <td>
                <Link className="text-white btn btn-primary mx-1" to={`/admin/blogs/${blog._id}`}>
                  View
                </Link>
                <Link className="text-white btn btn-warning mx-1" to={`/admin/blogs/edit/${blog._id}`}>
                  Edit
                </Link>
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </Col>
  );
};

export default Bloglist;
