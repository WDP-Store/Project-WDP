import { useEffect, useState } from "react";
import Paginate from "../components/Paginate";
import { toast } from "react-toastify";
import { Col, Form, Row, Table, Badge, Button } from "react-bootstrap";
import { AiOutlineSortAscending } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import exportToExcel from "../../util/exportToExcel.js";

export default function Customer() {
  const [users, setUsers] = useState([]);
  const [emailSearch, setEmailSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState();

  const [nameOrder, setNameOrder] = useState(true);
  const [emailOrder, setEmailOrder] = useState(true);

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

  const fetchUsers = (page) => {
    let url = `https://wdp.bachgiaphat.vn/users?page=${page}`;

    if (nameSearch) {
      url += `&name=${nameSearch}`;
    }
    if (emailSearch) {
      url += `&email=${emailSearch}`;
    }

    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }

    console.log("76_url", url);
    axios(url)
      .then((res) => {
        console.log("res");
        console.log(res);
        setTotalPages(res.data.totalPages);
        setUsers(res.data.docs);
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, emailSearch, nameSearch, statusFilter]);

  const changeStatus = (userId, status) => {
    axios
      .patch(`https://wdp.bachgiaphat.vn/users/${userId}`, {
        status: !status,
      })
      .then((res) => {
        fetchUsers(currentPage);
        toast.success("Change status successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const sortCustomer = (attr) => {
    const newUserList = [...users];
    if (attr == "name") {
      setNameOrder(!nameOrder);
      if (nameOrder) newUserList.sort((a, b) => a.name.localeCompare(b.name));
      else newUserList.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (attr == "email") {
      setEmailOrder(!emailOrder);
      if (emailOrder)
        newUserList.sort((a, b) => a.email.localeCompare(b.email));
      else newUserList.sort((a, b) => b.email.localeCompare(a.email));
    }
    setUsers(newUserList);
  };

  const handleExport = () => {
    const exportData = users.map((user) => ({
      Id: user._id,
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Address: user.address,
      Status: user.status ? "Active" : "Inactive",
    }));
    console.log(exportData);

    exportToExcel(
      "Danh Sách Người Dùng",
      exportData,
      "Danh Sách Người Dùng",
      "customers.xlsx"
    );
  };

  var i = 1; // number on users
  return (
    <Col lg={10}>
      <h3 className="mt-2 text-center">Customer List</h3>
      <Row className="my-4">
        <Col xs={12} md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Search by email..."
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Name</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Search by name..."
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4} className="text-end">
          <Button onClick={handleExport} style={{ height: "38px" }}>
            <DownloadOutlined /> Export
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>
              Email{" "}
              <button
                onClick={() => sortCustomer("email")}
                className="btn btn-light"
              >
                <AiOutlineSortAscending className="m-0" />
              </button>
            </th>
            <th>
              Name{" "}
              <button
                onClick={() => sortCustomer("name")}
                className="btn btn-light"
              >
                <AiOutlineSortAscending className="m-0" />
              </button>
            </th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => (
              <tr key={u.id}>
                <td>{(currentPage - 1) * 10 + i++}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td></td>
                <td className="text-center">
                  {u.status === true ? (
                    <Badge
                      bg="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => changeStatus(u._id, u.status)}
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      bg="warning"
                      style={{ cursor: "pointer" }}
                      onClick={() => changeStatus(u._id, u.status)}
                    >
                      Inactive
                    </Badge>
                  )}
                </td>
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
