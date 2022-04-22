import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../layout/header";
import Sider from "../layout/sider";
import Spinner from "../common/components/spinner/spinner";
import Footer from "./footer";
import styles from "./layout.module.scss";

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="app-container">
      <Sider collapsed={collapsed} />
      <Layout className={styles["site-layout"]}>
        <Header collapsed={collapsed} toggle={toggle} />
        <Content className="main-content">
          {/* <Breadcrumbs /> */}
          {children}
          <Spinner></Spinner>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
