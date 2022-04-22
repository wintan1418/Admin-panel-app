import React from "react";
import { Layout } from "antd";
import Spinner from '../common/components/spinner/spinner'

export default function GuestPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <React.Fragment>
      <Layout className="app-container login-page">
        <Content>
          {children}
          <Spinner></Spinner>
        </Content>
      </Layout>
    </React.Fragment>
  );
}
