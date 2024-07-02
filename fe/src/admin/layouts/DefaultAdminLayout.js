import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideNav from "../components/AdminSideNav";
import AdminFooter from "../components/AdminFooter.js";
import { Col, Container, Row } from "react-bootstrap";
import AdminTopNav from "../components/AdminTopNav";

//minhnq
import { Button, Layout, Menu, theme, ConfigProvider } from "antd";
const { Header, Sider, Content, Footer } = Layout;

const DefaultAdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <AdminSideNav className={"p-2 flex-column row"} />
        <Layout>
          <AdminTopNav />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: "auto",
              height: "calc(100vh - 64px - 48px)", // Adjust height to fit within viewport
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* <AdminFooter /> */}
            &copy; {new Date().getFullYear()} Copyright: Made with by group 5
            WDP301 from FPT University
          </Footer>
        </Layout>
      </Layout>
  );
};

//code cũ không xóa

// const DefaultAdminLayout = () => {
//   return (
//     <>
//       <Row style={{ background: "#DCF2F1", margin: 0 }}>
//         <Col lg={2} style={{ paddingLeft: 0 }}>
//           <AdminSideNav className={"p-2 flex-column row"} />
//         </Col>
//         <Col lg={10}>
//           <AdminTopNav />
//           <Outlet />
//           <AdminFooter />
//         </Col>
//       </Row>
//     </>
//   );
// };

export default DefaultAdminLayout;
