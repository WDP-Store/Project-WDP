import { Button, Col, Container, Row } from "react-bootstrap";
import { Checkbox, Image, Select } from "antd";
import * as yup from "yup";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
// import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
// import "react-quill/dist/quill.snow.css";
import axios from "axios";
import MySunEditor from "../components/SunEditor";

const blogSchema = yup.object({
  title: yup.string().required("This field is required"),
  category: yup.string().required("This field is required"),
  body: yup.string().required("This field is required"),
  blog: yup.array().of(
    yup.object().shape({
      image: yup
        .mixed()
        .required("File image is required")
        .test("fileType", "Unsupported file type", (value) => {
          if (!value) return true;
          const supportedTypes = ["image/jpeg", "image/png", "image/gif"];
          return supportedTypes.includes(value.type);
        }),
    })
  )
  // .required("Must provide color and image"),
});

const initialValues = {
  title: "",
  category: "",
  body: "",
  image: "",
  isDeleted: false,
};

const Addblog = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: blogSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      // const image = await uploadImage(values.image);
      await saveBlog(values);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    axios
      .get("https://app.vinamall.vn//categories")
      .then((res) => res.data)
      .then((data) => {
        const c = [];
        data.map((j) => c.push({ value: j._id, label: j.name }));
        setCategories(c);
      });
  }, []);

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "gaxpeofu");
      formData.append("api_key", "337676999889211");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dck2nnfja/upload`,
        formData
      );
      console.log("95_Upload successful:", response.data);
      return response.data.url;
    } catch (error) {
      toast.error("Failed to upload image: " + error.message);
    }
  };

  const saveBlog = (values) => {
    const { title, category, body, isDeleted, image } = values;
    const newBlog = {
      title,
      category,
      body,
      image,
      isDeleted,
    };
    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('category', newBlog.category);
    formData.append('body', newBlog.body);
    formData.append('image', newBlog.image);
    formData.append('isDeleted', newBlog.isDeleted);
    axios
      .post(`https://app.vinamall.vn//blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("data")).accessToken}`
        }
      })
      .then(() => {
        toast.success("Create blog successfully");
        navigate("/admin/blogs");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const removeImagePreview = () => {
    formik.setFieldValue("image", "");
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
          <h3 className="mt-3">Create new blog</h3>
          <Formik initialValues={initialValues} onSubmit={formik.handleSubmit}>
            {({ values }) => (
              <Form>
                <Row>
                  <Col xs={12} lg={12} className="my-3">
                    <label>Title</label>
                    <CustomInput
                      type="text"
                      name="title"
                      placeholder="Tittle blog..."
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      value={formik.values?.title}
                      errMes={formik.touched.title && formik.errors.title}
                    />
                  </Col>

                  <Col xs={12} lg={12}>
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
                  <Col xs={12} className="mt-3">
                    <Row className="mb-3">
                      <Col xs={10} lg={4}>
                        <label>Image</label>
                        <div>
                          <Field
                            type="file"
                            id="image"
                            name="image"
                            accept="image/jpeg, image/png, image/gif"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          {formik.touched.image && formik.errors.image && (
                            <span className="text-danger d-block">
                              {formik.errors.image}
                            </span>
                          )}
                        </div>

                        {formik.values.image && (
                          <div className="mt-2" style={{ position: 'relative' }}>
                            <img
                              src={URL.createObjectURL(formik.values.image)}
                              alt="Preview"
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "5px", // Adjust as needed
                                right: "5px", // Adjust as needed
                                cursor: "pointer", // Add cursor pointer
                              }}
                              onClick={removeImagePreview}
                            >
                              <DeleteOutlined
                                style={{ fontSize: "24px", color: "red" }}
                              />
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} className="mb-3">
                    <label>Blog Body</label>
                    <MySunEditor
                      id="editor2"
                      name="body"
                      onChange={(content) => {
                        formik.setFieldValue("body", content);
                        if (content == "<p><br></p>") {
                          formik.setFieldValue("body", "");
                        }
                      }}
                      data={formik.values?.body}
                    />
                    {formik.touched.body && (
                      <span className="text-danger">{formik.errors.body}</span>
                    )}
                  </Col>
                  <Col xs={12} className="mb-3" style={{ textAlign: "right" }}>
                    <Button className="btn-primary mx-2" type="submit">
                      Submit
                    </Button>
                    <Button className="btn-danger">
                      <Link className="text-white" to={"/admin/blogs"}>
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

export default Addblog;
