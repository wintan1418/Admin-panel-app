import React from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import { redirectToUrl } from "../../utilities/generalUtility";
import logo from "../../assets/images/site-logo.png";

export default function SetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Password does not match!");
      return;
    }
    let token = location.search.substring(7);

    try {
      let res = await dispatch(
        User.resetPassword(values.password, values.confirmPassword, token)
      );
      // const { from } = location.state || { from: { path: "/" } };
      redirectToUrl(res?.user?.tenant_name, "/");
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="lc-logo">
          <img src={logo} alt="" />
        </div>
        <Card bordered={false} className="login-card">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password must be atleast 8 characters long!",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <Form.Item className="text-center mb-0">
              <Button
                block
                size="large"
                type="primary"
                className="primary-btn"
                htmlType="submit"
              >
                Done
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </React.Fragment>
  );
}
