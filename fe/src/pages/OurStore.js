/* eslint-disable eqeqeq */
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
import Select from "react-select";

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

  const [brandFilters, setBrandFilters] = useState({});
  const [categoryFilters, setCategoryFilters] = useState({});
  const [yearFilters, setYearFilters] = useState({});
  const brandOptions = brands.map((b) => ({ value: b._id, label: b.name }));
  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));
  const handleFilterChange = (attr, selectedOptions) => {
    // Nếu selectedOptions là null hoặc undefined, gán nó thành một mảng rỗng
    const selectedValues = (selectedOptions || []).map(
      (option) => option.value
    );

    const filterState =
      attr === "brand"
        ? brandFilters
        : attr === "category"
        ? categoryFilters
        : yearFilters;

    const newFilters = Object.keys(filterState).reduce((acc, key) => {
      acc[key] = selectedValues.includes(key);
      return acc;
    }, {});

    if (attr === "brand") {
      setBrandFilters(newFilters);
      setBrand_f(selectedValues);
    } else if (attr === "category") {
      setCategoryFilters(newFilters);
      setCategory_f(selectedValues);
    } else if (attr === "year") {
      setYearFilters(newFilters);
      setYear_f(selectedValues);
    }
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container
        className="store-wrapper home-wrapper-2 py-5 zoom-appear-active"
        style={{}} // Updated background color
      >
        <div className="row" style={{ paddingTop: "20px" }}>
          <div className="col-lg-3 col-md-4 mb-4">
            {/* Filters */}
            <div className="filter-card p-4 rounded shadow-sm">
              <h3 className="filter-title mb-3">Shop By Brands</h3>
              <div className="product-tags d-flex flex-column gap-2">
                <Select
                  isMulti
                  options={brandOptions}
                  onChange={(selectedOptions) =>
                    handleFilterChange("brand", selectedOptions)
                  }
                  value={brandOptions.filter((option) =>
                    brand_f.includes(option.value)
                  )}
                  placeholder="Select brand"
                />
              </div>
            </div>
            <div className="filter-card p-4 rounded shadow-sm mt-4">
              <h3 className="filter-title mb-3">Shop By Categories</h3>
              <div className="btn-group d-flex flex-column gap-2">
                <Select
                  isMulti
                  options={categoryOptions}
                  onChange={(selectedOptions) =>
                    handleFilterChange("category", selectedOptions)
                  }
                  value={categoryOptions.filter((option) =>
                    category_f.includes(option.value)
                  )}
                  placeholder="Select category"
                />
              </div>
            </div>
            <div>
              <div className="filter-card p-4 rounded shadow-sm mt-4">
                <h3 className="filter-title mb-3">Filter By</h3>
                <h5 className="sub-title mb-2">Release Year</h5>
                <div className="d-flex flex-column gap-2">
                  <Select
                    isMulti
                    options={years.map((y) => ({ value: y, label: y }))}
                    onChange={(selectedOptions) =>
                      handleFilterChange("year", selectedOptions)
                    }
                    value={years
                      .map((y) => ({ value: y, label: y }))
                      .filter((option) => year_f.includes(option.value))}
                    placeholder="Select year"
                  />
                </div>
              </div>
              <div className="filter-card p-4 rounded shadow-sm mt-4">
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
          </div>

          <div className="col-lg-9 col-md-8">
            {/* Sorting and Search */}
            <div
              className="filter-sort-grid mb-4"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div
                  className="d-flex align-items-center gap-3"
                  style={{ marginRight: "10px" }}
                >
                  <p className="mb-0" style={{ fontWeight: "100" }}>
                    Sort By:
                  </p>
                  <select
                    onChange={(e) => SortProduct(e.target.value)}
                    name="sort"
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id="sort-box"
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                      boxShadow: "none",
                      fontFamily: "Arial, sans-serif",
                    }}
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
                <InputGroup className="search-group">
                  <InputGroup.Text
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderEndEndRadius: "0",
                      border: "1px solid #ced4da",
                      borderRight: "0",
                    }}
                  >
                    <BsSearch size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    style={{
                      border: "1px solid #ced4da",
                      borderStartStartRadius: "0",
                      borderStartEndRadius: "0.25rem",
                      borderLeft: "0",
                      fontFamily: "Arial, sans-serif",
                    }}
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
