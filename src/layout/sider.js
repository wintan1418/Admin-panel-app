import React from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
// import { UserOutlined } from "@ant-design/icons";
//import styles from "./layout.module.scss";
import navigations from "./navigations";
import { isRolePresent } from "../utilities/generalUtility";
import User from "../models/user/user";
import Logo from "../assets/images/site-logo.png";

export default function Sider({ collapsed }) {
  // get current user's role

  const { Sider } = Layout;
  // const { SubMenu } = Menu;

  return (
    <Sider
      width={181}
      className="side-bar"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="ant-layout-sider-logo">
        <img src={Logo} alt="" />
      </div>
      <Menu
        defaultSelectedKeys={["/" + window.location.pathname.split("/")[1]]}
        mode="inline"
      >
        {navigations.map((navigation) => {
          const hasRole = isRolePresent(navigation.roles, User.getRole());

          if (!hasRole) {
            return null;
          }

          return (
            <Menu.Item key={navigation.path} icon={navigation.icon}>
              <Link to={navigation.path}>{navigation.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
}
