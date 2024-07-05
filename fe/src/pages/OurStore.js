import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import ProductItem from "../components/ProductItem";
import Paginate from "../admin/components/Paginate";
import { toast } from "react-toastify";
import { Col, Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";

const OurStore = () => {
  const { key } = useParams(); //search key from header
  const [products, setProducts] = useState([]); //productlist that use for display
  const [categories, setCategories] = useState([]); //category
  const [brands, setBrands] = useState([]); //brands
  const [isLoading, setIsLoading] = useState(false); //loading effect

  // filtering
  const [nameSearch, setNameSearch] = useState(key ? key : "");
  const [brand_f, setBrand_f] = useState([]);
  const [year_f, setYear_f] = useState([]);
  const [category_f, setCategory_f] = useState([]);
  const [max_f, setMax_f] = useState("");
  const [min_f, setMin_f] = useState("");

  // sorting
  const [urlSortKey, setUrlSortKey] = useState("");
  const [urlSortValue, setUrlSortValue] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  //category & brand
  useEffect(() => {
    axios
      .get("https://wdp.bachgiaphat.vn/categories")
      .then((res) => res.data)
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wdp.bachgiaphat.vn/brands")
      .then((res) => res.data)
      .then((data) => {
        setBrands(data);
      });
  }, []);

  var currentYear = new Date().getFullYear();
  const years = [currentYear--, currentYear--, currentYear--, currentYear--];

  const SortProduct = (index) => {
    if (index == 0) {
      setUrlSortKey("featured_s");
      setUrlSortValue("desc");
    }
    if (index == 1) {
      setUrlSortKey("name_s");
      setUrlSortValue("asc");
    }
    if (index == 2) {
      setUrlSortKey("name_s");
      setUrlSortValue("desc");
    }
    if (index == 3) {
      setUrlSortKey("price_s");
      setUrlSortValue("asc");
    }
    if (index == 4) {
      setUrlSortKey("price_s");
      setUrlSortValue("desc");
    }
    if (index == 5) {
      setUrlSortKey("year_s");
      setUrlSortValue("asc");
    }
    if (index == 6) {
      setUrlSortKey("featured_s");
      setUrlSortValue("desc");
    }
  };

  const handleFilter = (page) => {
    var url = `https://wdp.bachgiaphat.vn/products?page=${page}`;

    if (nameSearch) {
      url += `&name=${nameSearch}`;
    }

    if (brand_f.length != 0) {
      brand_f?.map((b) => (url += "&brand=" + b));
    }

    if (category_f.length != 0) {
      category_f?.map((b) => (url += "&category=" + b));
    }

    if (year_f.length != 0) {
      year_f?.map((b) => (url += "&year=" + b));
    }

    if (min_f != "") {
      url += "&price_gte=" + min_f;
    }

    if (max_f != "") {
      url += "&price_lte=" + max_f;
    }

    if (urlSortValue != "" && urlSortKey != "") {
      url += `&${urlSortKey}=` + urlSortValue;
    }

    axios(url)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setProducts(res.data.docs);
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    handleFilter(currentPage);
  }, [
    currentPage,
    year_f,
    category_f,
    brand_f,
    max_f,
    min_f,
    nameSearch,
    urlSortKey,
    urlSortValue,
  ]);

  const handleFilterValue = (attr) => {
    if (attr === "brand") {
      let box = document.getElementsByName("brand-Filter-Box");
      let temp = [];
      for (let i = 0; i < box.length; i++) {
        if (box[i].checked == true) {
          temp = [...temp, box[i].value];
        }
      }
      setBrand_f(temp);
    }

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

    if (attr === "year") {
      let box = document.getElementsByName("year-Filter-Box");
      let temp = [];
      for (let i = 0; i < box.length; i++) {
        if (box[i].checked == true) {
          temp = [...temp, box[i].value];
        }
      }
      setYear_f(temp);
    }
  };
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container className="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            {/* Filters */}
            <div className="filter-card p-4 rounded shadow-sm">
              <h3 className="filter-title mb-3">Shop By Brands</h3>
              <div className="product-tags d-flex flex-column gap-2">
                {brands.map((b) => (
                  <div key={b._id}>
                    <input
                      onChange={() => handleFilterValue("brand")}
                      name="brand-Filter-Box"
                      type="checkbox"
                      className="btn-check"
                      id={"brandCheck" + b._id}
                      autoComplete="off"
                      value={b._id}
                    />
                    <label
                      className="btn btn-outline-primary w-100 text-start"
                      htmlFor={"brandCheck" + b._id}
                    >
                      {b.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-card p-4 rounded shadow-sm mt-4">
              <h3 className="filter-title mb-3">Shop By Categories</h3>
              <div className="btn-group d-flex flex-column gap-2">
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
                      className="btn btn-outline-primary w-100 text-start"
                      htmlFor={"btncheck" + c._id}
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-card p-4 rounded shadow-sm mt-4">
              <h3 className="filter-title mb-3">Filter By</h3>
              <h5 className="sub-title mb-2">Release Year</h5>
              <div className="btn-group d-flex flex-column gap-2">
                {years.map((y) => (
                  <div key={y}>
                    <input
                      onChange={() => handleFilterValue("year")}
                      name="year-Filter-Box"
                      value={y}
                      type="checkbox"
                      className="btn-check"
                      id={"yearCheck" + y}
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary w-100 text-start"
                      htmlFor={"yearCheck" + y}
                    >
                      {y}
                    </label>
                  </div>
                ))}
              </div>

              <h5 className="sub-title mt-4 mb-2">Price</h5>
              <div className="d-flex gap-2">
                <div className="form-floating flex-grow-1">
                  <input
                    onChange={(e) => setMin_f(e.target.value)}
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="From"
                  />
                  <label htmlFor="floatingInput">From</label>
                </div>
                <div className="form-floating flex-grow-1">
                  <input
                    onChange={(e) => setMax_f(e.target.value)}
                    type="number"
                    className="form-control"
                    id="floatingInput1"
                    placeholder="To"
                  />
                  <label htmlFor="floatingInput1">To</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            {/* Sorting and Search */}
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <p className="mb-0">Sort By:</p>
                  <select
                    onChange={(e) => SortProduct(e.target.value)}
                    name="sort"
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id="sort-box"
                  >
                    <option value="0">Featured</option>
                    <option value="1">Alphabetically, A-Z</option>
                    <option value="2">Alphabetically, Z-A</option>
                    <option value="3">Price, low to high</option>
                    <option value="4">Price, high to low</option>
                    <option value="5">Date, old to new</option>
                    <option value="6">Date, new to old</option>
                  </select>
                </div>
                <InputGroup>
                  <InputGroup.Text>
                    <BsSearch size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>

            {/* Product List */}
            <div className="products-list">
              <div className="row g-3">
                {isLoading ? (
                  <div className="text-center w-100">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  products.map((p) =>
                    p.status ? (
                      <div className="col-lg-4 col-md-6 col-sm-12" key={p._id}>
                        <ProductItem
                          product={p}
                          brand={
                            brands.find((b) => b._id === p.brand)?.name || ""
                          }
                        />
                      </div>
                    ) : null
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination mb-3 d-flex justify-content-end">
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </Container>
    </>
  );
};

export default OurStore;
