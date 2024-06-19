import logo from "../../images/logo_admin.png";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlinePicRight } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";

//minhnq
import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  ProductOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { MdContactPhone } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import { CiBoxList } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbBrandAdobe } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";

export default function AdminSideNav(props) {
  const location = useLocation();
  console.log(location.pathname);
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children, to) {
    return {
      key,
      icon,
      children,
      label: to ? <Link to={to} style={{textDecoration: "none"}}>{label}</Link> : label,
    };
  }
  const items = [
    getItem(
      "Dashboard",
      "dashboard",
      <DashboardOutlined />,
      null,
      "/admin/dashboard"
    ),
    getItem("Orders", "orders", <UnorderedListOutlined />, null, "/admin/order"),
    getItem("Products", "products", <ProductOutlined />, [
      getItem(
        "Product List",
        "products_list",
        <CiBoxList />,
        // <PieChartOutlined />,
        null,
        "/admin/product"
      ),
      getItem(
        "Add New Product",
        "products_add",
        <IoAddCircleOutline />,
        null,
        "/admin/product/add-product"
      ),
      getItem(
        "Brand",
        "brand",
        <TbBrandAdobe />,
        null,
        "/admin/product/brand-list"
      ),
      getItem(
        "Category",
        "category",
        <MdOutlineCategory />,
        null,
        "/admin/product/category-list"
      ),
    ]),
    getItem("Blogs", "blogs", <UserOutlined />, [
      getItem(
        "Blog List",
        "blogs_list",
        <CiBoxList />,
        null,
        "/admin/product"
      ),
      getItem(
        "Add New Blog",
        "blogs_add",
        <IoAddCircleOutline />,
        null,
        "/admin/product/add-product"
      ),
    ]),
    getItem("Contacts", "contacts", <MdContactPhone />, null, '/admin/contact'),
    getItem("Customers", "customers", <FaUsers />, null, '/admin/customer'),
    getItem("Feedbacks", "feedbacks", <FcFeedback />, null, '/admin/feedback'),
  ];
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="dark"
    >
      {/* logo admin */}
      <Link className={location.pathname === "/" ? "active" : ""} to={"/"}>
        <div className="d-flex justify-content-center">
          <img
            className="p-2"
            style={{ width: "70%" }}
            src={logo}
            alt="logo"
          ></img>
        </div>
      </Link>
      <div
        className="mt-3 mb-3"
        style={{ width: "100%", height: "2px", background: "rgb(177 177 177 / 71%)" }}
      ></div>

      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}

//code cũ, không xóa

// export default function AdminSideNav(props) {
//   const location = useLocation();
//   console.log(location.pathname);
//   return (
//     <Nav
//       fill
//       variant="tabs"
//       defaultActiveKey="/home"
//       style={{
//         border: "none",
//         background: "white",
//         position: "sticky",
//         top: 0,
//         minHeight: "100vh",
//       }}
//       className={props.className}
//     >
//       {/* logo admin */}
//       <Link className={location.pathname === "/" ? "active" : ""} to={"/"}>
//         <div className="d-flex justify-content-center">
//           <img
//             className="p-2"
//             style={{ width: "70%" }}
//             src={logo}
//             alt="logo"
//           ></img>
//         </div>
//       </Link>
//       <div
//         className="mt-3 mb-3"
//         style={{ width: "100%", height: "2px", background: "#00000038" }}
//       ></div>

//       <Accordion>
//         <Link style={{ width: "100%" }} to={"/admin/dashboard"}>
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>
//               <AiOutlineStock
//                 size="30px"
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//               />
//               Dashboard
//             </Accordion.Header>
//           </Accordion.Item>
//         </Link>
//         <Link style={{ width: "100%" }} to={"/admin/order"}>
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>
//               <AiOutlineShopping
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//                 size="30px"
//               />
//               Orders
//             </Accordion.Header>
//           </Accordion.Item>
//         </Link>
//         <div style={{ width: "100%" }}>
//           <Accordion.Item eventKey="2">
//             <Accordion.Header>
//               <AiOutlineShoppingCart
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//                 size="30px"
//               />
//               Products
//             </Accordion.Header>
//             <Accordion.Body>
//               <Link
//                 style={{ width: "100%", borderBottom: "1px solid #ccc" }}
//                 to={"/admin/product"}
//               >
//                 Product list
//               </Link>
//               <Link
//                 style={{ width: "100%", borderBottom: "1px solid #ccc" }}
//                 to={"/admin/product/add-product"}
//               >
//                 Add new product
//               </Link>
//               <Link
//                 style={{ width: "100%", borderBottom: "1px solid #ccc" }}
//                 to={"/admin/product/brand-list"}
//               >
//                 Brand
//               </Link>
//               <Link
//                 style={{ width: "100%" }}
//                 to={"/admin/product/category-list"}
//               >
//                 Category
//               </Link>
//             </Accordion.Body>
//           </Accordion.Item>
//         </div>
//         <div style={{ width: "100%" }}>
//           <Accordion.Item eventKey="4">
//             <Accordion.Header>
//               <AiOutlinePicRight
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//                 size="30px"
//               />
//               Blogs
//             </Accordion.Header>
//             <Accordion.Body>
//               <Link
//                 style={{ width: "100%", borderBottom: "1px solid #ccc" }}
//                 to={"/admin/blogs"}
//               >
//                 Blog list
//               </Link>
//               <Link style={{ width: "100%" }} to={"/admin/blogs/add-blog"}>
//                 Blog add new
//               </Link>
//             </Accordion.Body>
//           </Accordion.Item>
//         </div>
//         <Link style={{ width: "100%" }} to={"/admin/contact"}>
//           <Accordion.Item eventKey="5">
//             <Accordion.Header>
//               <BsTelephone
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//                 size="30px"
//               />
//               Contacts
//             </Accordion.Header>
//           </Accordion.Item>
//         </Link>
//         <Link style={{ width: "100%" }} to={"/admin/customer"}>
//           <Accordion.Item eventKey="6">
//             <Accordion.Header>
//               <BiUser
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//                 size="30px"
//               />
//               Customers
//             </Accordion.Header>
//           </Accordion.Item>
//         </Link>
//         <Link style={{ width: "100%" }} to={"/admin/feedback"}>
//           <Accordion.Item eventKey="7">
//             <Accordion.Header>
//               <BiLogoTelegram
//                 style={{ marginBottom: 0, marginRight: "10px" }}
//                 size="30px"
//               />
//               Feedbacks
//             </Accordion.Header>
//           </Accordion.Item>
//         </Link>
//       </Accordion>
//     </Nav>
//   );
// }
