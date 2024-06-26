import { Button, Col, Container, Row } from "react-bootstrap";
import { Checkbox, Image, Select } from "antd";
import * as yup from "yup";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import MySunEditor from "../components/SunEditor";
import Swal from "sweetalert2";

const productSchema = yup.object({
  name: yup.string().required("This field is required"),
  price: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required")
    .positive("Must be a positive value"),
  year: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required")
    .positive("Must be a positive value")
    .integer()
    .min(1900)
    .max(new Date().getFullYear()),
  originalPrice: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required")
    .positive("Must be a positive value"),
  category: yup.string().required("This field is required"),
  brand: yup.string().required("This field is required"),
  describe: yup.string().required("This field is required"),
  detail: yup.string().required("This field is required"),
  product: yup.array().of(
    yup.object().shape({
      color: yup.string(),
      image: yup.mixed().test("fileType", "Unsupported file type", (value) => {
        if (!value) return true;
        const supportedTypes = ["image/jpeg", "image/png", "image/gif"];
        return supportedTypes.includes(value.type);
      }),
    })
  ),
});

const initialValues = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  brand: "",
  year: "",
  featured: false,
  status: true,
  detail: "",
  describe: "",
  product: [
    {
      color: "",
      image: "",
    },
  ],
};

const EditProduct = () => {
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios(`https://wdp.bachgiaphat.vn/products/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((json) => {
        setProduct(json);
        const {
          name,
          price,
          originalPrice,
          category,
          brand,
          featured,
          status,
          detail,
          describe,
          year,
        } = json;
        formik.setFieldValue("name", name);
        formik.setFieldValue("price", price);
        formik.setFieldValue("originalPrice", originalPrice);
        formik.setFieldValue("category", category._id);
        formik.setFieldValue("brand", brand._id);
        formik.setFieldValue("year", year);
        formik.setFieldValue("featured", featured);
        formik.setFieldValue("status", status);
        formik.setFieldValue("detail", detail);
        formik.setFieldValue("describe", describe);
        // formik.setFieldValue("color", color);
        // formik.setFieldValue("images", images);
      });
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (values.product[0].color !== "" && values.product[0].image !== "") {
        const product = await uploadImage(values.product);
        saveProduct(values, product);
      } else {
        saveProduct(values);
      }
      setIsLoading(false);
    },
  });

  useEffect(() => {
    axios
      .get("https://wdp.bachgiaphat.vn/brands")
      .then((res) => res.data)
      .then((data) => {
        const br = [];
        data.map((j) => br.push({ value: j._id, label: j.name }));
        setBrands(br);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wdp.bachgiaphat.vn/categories")
      .then((res) => res.data)
      .then((data) => {
        const c = [];
        data.map((j) => c.push({ value: j._id, label: j.name }));
        setCategories(c);
      });
  }, []);

  const uploadImage = async (product) => {
    const images = [];
    const color = [];
    try {
      for (const productItem of product) {
        color.push(productItem.color);

        const formData = new FormData();
        formData.append("file", productItem.image);
        formData.append("upload_preset", "gaxpeofu");
        formData.append("api_key", "337676999889211");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dck2nnfja/upload`,
          formData
        );

        console.log("Upload successful:", response.data);
        images.push(response.data.url);
      }

      return {
        images,
        color,
      };
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Failed to upload image: " + error.message);
    }
  };

  const removeProduct = (index) => {
    const valuesCopy = { ...formik.values };
    const errorsCopy = { ...formik.errors };

    valuesCopy.product.splice(index, 1);
    formik.setValues(valuesCopy);

    if (!JSON.stringify(errorsCopy) === "{}") {
      errorsCopy.product.splice(index, 1);
      formik.setErrors(errorsCopy);
    }
  };

  const saveProduct = (values, p) => {
    const {
      name,
      price,
      originalPrice,
      category,
      brand,
      featured,
      status,
      detail,
      describe,
      year,
    } = values;
    console.log("savecate");
    console.log(category);
    let c, i;
    if (p) {
      const { color, images } = p;
      c = [...product.color, ...color];
      i = [...product.images, ...images];
    } else {
      c = [...product.color];
      i = [...product.images];
    }

    axios
      .patch(`https://wdp.bachgiaphat.vn/products/${id}`, {
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        category,
        brand,
        year: Number(year),
        featured,
        status,
        detail,
        describe,
        color: c,
        images: i,
      }, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("data")).accessToken}`
        }
      })
      .then(() => {
        toast.success("Update product successfully");
        navigate("/admin/product");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  };

  const handleDelete = (index) => {
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
        deleteP(index);
      }
    });
  };

  const deleteP = (index) => {
    const color = product.color;
    const images = product.images;
    color.splice(index, 1);
    images.splice(index, 1);

    setIsLoading(true);
    axios
      .patch(`https://wdp.bachgiaphat.vn/products/${id}`, {
        color,
        images,
      }, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("data")).accessToken}`
        }
      })
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
        toast.success("Delete successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Row>
        <Col>
          <h3 className="mt-2 text-center">Create new product</h3>
          <Formik initialValues={initialValues} onSubmit={formik.handleSubmit}>
            {({ values }) => (
              <Form>
                <Row>
                  <Col xs={12} lg={6} className="my-3">
                    <label>Product name</label>
                    <CustomInput
                      type="text"
                      name="name"
                      placeholder="Product name..."
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values?.name}
                      errMes={formik.touched.name && formik.errors.name}
                    />
                  </Col>
                  <Col xs={12} lg={3} className="my-3">
                    <label>Price</label>
                    <CustomInput
                      type="text"
                      name="price"
                      placeholder="Price..."
                      onChange={formik.handleChange("price")}
                      onBlur={formik.handleBlur("price")}
                      value={formik.values?.price}
                      errMes={formik.touched.price && formik.errors.price}
                    />
                  </Col>
                  <Col xs={12} lg={3} className="my-3">
                    <label>Original price</label>
                    <CustomInput
                      type="text"
                      name="originalPrice"
                      placeholder="Original price..."
                      onChange={formik.handleChange("originalPrice")}
                      onBlur={formik.handleBlur("originalPrice")}
                      value={formik.values?.originalPrice}
                      errMes={
                        formik.touched.originalPrice &&
                        formik.errors.originalPrice
                      }
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Category</label>
                    <Select
                      showSearch
                      size="large"
                      placeholder="Select a category"
                      className="w-100"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={categories}
                      name="category"
                      onChange={(value) =>
                        formik.setFieldValue("category", value)
                      }
                      onBlur={formik.handleBlur("category")}
                      value={formik.values?.category}
                    />
                    {formik.touched.category && (
                      <span className="text-danger">
                        {formik.errors.category}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Brand</label>
                    <Select
                      showSearch
                      size="large"
                      placeholder="Select a brand"
                      className="w-100"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={brands}
                      name="brand"
                      onChange={(value) => formik.setFieldValue("brand", value)}
                      onBlur={formik.handleBlur("brand")}
                      value={formik.values?.brand}
                    />
                    {formik.touched.brand && (
                      <span className="text-danger">{formik.errors.brand}</span>
                    )}
                  </Col>
                  <Col xs={12} className="mt-3">
                    {product.color?.map((c, index) => (
                      <Row key={index} className="mb-3">
                        <Col xs={12} lg={6}>
                          <label>Color</label>
                          <CustomInput type="text" defaultValue={c} disabled />
                        </Col>
                        <Col xs={10} lg={4}>
                          <label>Image</label>
                          <div className="mt-2">
                            <img
                              src={product.images[index]}
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </Col>
                        <Col xs={2} style={{ alignSelf: "center" }}>
                          <Button
                            type="button"
                            className="secondary btn-danger"
                            value={index}
                            onClick={() => handleDelete(index)}
                          >
                            X
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <FieldArray name="product">
                      {({ insert, remove, push }) => (
                        <>
                          {values.product.length > 0 &&
                            values.product.map((product, index) => (
                              <Row key={index} className="mb-3">
                                <Col xs={12} lg={6}>
                                  <label>Color</label>
                                  <CustomInput
                                    type="text"
                                    name={`product.${index}.color`}
                                    placeholder="Color..."
                                    onChange={formik.handleChange(
                                      `product.${index}.color`
                                    )}
                                    onBlur={formik.handleBlur(
                                      `product.${index}.color`
                                    )}
                                    value={
                                      formik.values?.product?.[index]?.color
                                    }
                                    errMes={
                                      formik.touched.product?.[index]?.color &&
                                      formik.errors.product?.[index]?.color
                                    }
                                  />
                                </Col>
                                <Col xs={10} lg={4}>
                                  <label>Image</label>
                                  <div>
                                    <Field
                                      type="file"
                                      id={`product.${index}.image`}
                                      name={`product.${index}.image`}
                                      accept="image/jpeg, image/png, image/gif"
                                      onChange={(event) => {
                                        formik.setFieldValue(
                                          `product.${index}.image`,
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                    {formik.touched.product?.[index]?.image && (
                                      <span className="text-danger d-block">
                                        {formik.errors.product?.[index]?.image}
                                      </span>
                                    )}
                                  </div>

                                  {/* Image Preview */}
                                  {formik.values.product[index]?.image && (
                                    <div className="mt-2">
                                      <img
                                        src={URL.createObjectURL(
                                          formik.values.product[index]?.image
                                        )}
                                        alt={`Preview ${product.color}`}
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}
                                </Col>
                                <Col xs={2} style={{ alignSelf: "center" }}>
                                  <Button
                                    type="button"
                                    className="secondary mx-3"
                                    onClick={() =>
                                      push({ color: "", image: "" })
                                    }
                                  >
                                    +
                                  </Button>
                                  <Button
                                    type="button"
                                    className={
                                      index == 0
                                        ? "secondary disabled"
                                        : "secondary"
                                    }
                                    onClick={() => {
                                      removeProduct(index);
                                      remove(index);
                                    }}
                                  >
                                    X
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                        </>
                      )}
                    </FieldArray>
                  </Col>
                  <Col xs={12} lg={6} className="my-3">
                    <label>Year</label>
                    <CustomInput
                      type="text"
                      name="year"
                      placeholder="Year"
                      onChange={formik.handleChange("year")}
                      onBlur={formik.handleBlur("year")}
                      value={formik.values?.year}
                      errMes={formik.touched.year && formik.errors.year}
                    />
                  </Col>
                  <Col xs={6} lg={3} className="my-3">
                    <label className="d-block">Status</label>
                    <Checkbox
                      name="status"
                      onChange={(event) =>
                        formik.setFieldValue("status", event.target.checked)
                      }
                      checked={formik.values.status}
                    >
                      Is active?
                    </Checkbox>
                  </Col>
                  <Col xs={6} lg={3} className="my-3">
                    <label className="d-block">Featured</label>
                    <Checkbox
                      name="featured"
                      onChange={(event) =>
                        formik.setFieldValue("featured", event.target.checked)
                      }
                      checked={formik.values.featured}
                    >
                      Is featured?
                    </Checkbox>
                  </Col>
                  <Col xs={12} lg={12} className="my-3">
                    <label>Product configuration</label>
                    {/* <TextArea
                          showCount
                          style={{ height: 120, marginBottom: 24 }}
                          placeholder="Description"
                          onChange={formik.handleChange('describe')}
                          onBlur={formik.handleBlur('describe')}
                          value={formik.values?.describe}
                        /> */}
                    <MySunEditor
                      id="editor1"
                      name="detail"
                      onInit
                      onChange={(content) => {
                        formik.setFieldValue("detail", content);
                        if (content == "<p><br></p>") {
                          formik.setFieldValue("detail", "");
                        }
                      }}
                      data={formik.values?.detail}
                      setContents={product.detail}
                    />
                    {formik.touched.detail && (
                      <span className="text-danger">
                        {formik.errors.detail}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <label>Product detailed description</label>
                    <MySunEditor
                      id="editor2"
                      name="describe"
                      onInit
                      onChange={(content) => {
                        formik.setFieldValue("describe", content);
                        if (content == "<p><br></p>") {
                          formik.setFieldValue("describe", "");
                        }
                      }}
                      data={formik.values?.describe}
                      setContents={product.describe}
                    />
                    {formik.touched.describe && (
                      <span className="text-danger">
                        {formik.errors.describe}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} className="mb-3" style={{ textAlign: "right" }}>
                    <Button className="btn-primary mx-2" type="submit">
                      Submit
                    </Button>
                    <Button className="btn-danger">
                      <Link className="text-white" to={"/admin/product"}>
                        Back to list
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
