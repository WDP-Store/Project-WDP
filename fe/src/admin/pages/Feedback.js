import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Form, Row, Table, Button} from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import Paginate from "../components/Paginate";
import InputGroup from "react-bootstrap/InputGroup";
import { DownloadOutlined } from '@ant-design/icons';
import exportToExcel from "../../util/exportToExcel.js";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState("");

  //pagination
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
  //

  const handleFilter = (page) => {
    var url = `https://wdp.bachgiaphat.vn/feedbacks/?_sort=id&_order=desc&_page=${page}&_limit=10`;
    if (product !== "") {
      url += "&productId=" + product;
    }
    if (rating !== "") {
      url += "&rating=" + rating;
    }
    fetch(url)
      .then((res) => {
        const totalCount = res.headers.get("X-Total-Count");
        setTotalPages(Math.ceil(totalCount / 10));
        return res.json();
      })
      .then((json) => setFeedbacks(json))
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    handleFilter(currentPage);
  }, [currentPage, product, rating]);

  const handleExport = () => {
    console.log("export feedbacks", feedbacks);
    const exportData = feedbacks.map((feedback) => ({
      Id: feedback._id,
      User: feedback?.user,
      Product: feedback?.product?.name,
      Rating: feedback.rating,
      Comment: feedback.comment,
    }));
    console.log(exportData);

    exportToExcel(
      "Danh Sách Đánh Giá",
      exportData,
      "Danh Sách Đánh Giá",
      "feedbacks.xlsx"
    );
  };

  return (
    <Col lg={10}>
      <h3 className="mt-2 text-center">Feedbacks List</h3>
      <Row className="my-4">
        <Col xs={12} md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Product id</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="product id..."
              onChange={(e) => setProduct(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Rating</InputGroup.Text>
            <Form.Select
              type="email"
              placeholder="rating..."
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value={""}>All</option>
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12} md={4} className="text-end">
        <Button onClick={handleExport} style={{height: '38px'}}>
            <DownloadOutlined /> Export
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Product id</th>
            <th>rating</th>
            <th>comment</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.user}</td>
              <td>
                <button
                  onClick={() => {
                    window.location = `/product/${u.product._id}`;
                  }}
                  type="button"
                  style={{ minWidth: "10ch" }}
                  className="btn btn-dark"
                >
                  {u.productId} <AiFillCaretRight className="m-0" />
                </button>
              </td>
              <td>
                {Array(u.rating)
                  .fill(<AiFillStar color="#c2c273" />)
                  .map((star, index) => {
                    return <span key={index}>{star}</span>;
                  })}
              </td>
              <td>{u.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination mb-3 justify-content-end">
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </Col>
  );
}
