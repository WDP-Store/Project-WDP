import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Layout, Popover } from "antd";
import { FaMessage } from "react-icons/fa6";
import { BiLogOut, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";


import { useAuthentication } from "../../util/use-authentication";

const headerStyle = {
  backgroundColor: "#f0f2f5", // Nền sáng
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // border: "1px solid red",
  backgroundColor: "rgb(237 237 237 / 90%)",
};

const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

export default function AdminTopNav(props) {
  const { Header } = Layout;
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { isLogged, currentUser } = useAuthentication();
  console.log("logged header admin: ", isLogged);
  console.log("currentUser header admin: ", currentUser);
  const [user, setUser] = useState();

  useEffect(() => {
    if (isLogged) {
      setUser(JSON.parse(localStorage.getItem("data")));
    }
  }, [isLogged]);

  const hide = () => {
    setClicked(false);
    setHovered(false);
  };
  const handleHoverChange = (open) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open) => {
    setHovered(false);
    setClicked(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("cart");
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const hoverContent = (
    <ul aria-labelledby="userMenu" className="list-unstyled">
      <li>
        <Link to={`/profile/${currentUser._id}`} className="dropdown-item">
          <BiUser className="me-2" /> My profile
        </Link>
      </li>
      <li>
        <Link to={`/changePassword/${currentUser._id}`} className="dropdown-item">
          <BiUser className="me-2" /> Change Password
        </Link>
      </li>
      <li>
        <button onClick={handleLogout} className="dropdown-item">
          <BiLogOut className="me-2" /> Log out
        </button>
      </li>
    </ul>
  );
  const clickContent = <div></div>;

  return (
    <Header style={headerStyle}>
      <div> Welcome to {props.username} admin </div>
      <Space>
        <div> {user?.name} </div>
        <Popover
          content={hoverContent}
          trigger="hover"
          open={hovered}
          onOpenChange={handleHoverChange}
        >
          <Popover
            content={clickContent}
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}
          >
            <Avatar
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 50, xxl: 50 }}
            >
              U
            </Avatar>
          </Popover>
        </Popover>
      </Space>
    </Header>
  );
}
